import { type LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { getUnmaskedFragmentData } from '~/gql';
import type { SearchQuery } from '~/gql/types';
import { getSearchResults } from '~/libs/api/search.server';
import {
  RepositoryFragment,
  type RepositoryFragmentType,
  UserFragment,
  type UserFragmentType,
} from '~/libs/fragments';
import { SEARCH_QUERY_PARAM } from '~/utils/constants';
import statusCodes from '~/utils/statusCodes.server';

/**
 * Returns the name based on the typename of the given node.
 * If the typename is 'Repository', it returns the login of the owner.
 * Otherwise, it returns the login of the node.
 *
 * @param node - The node object of type RepositoryFragmentType or UserFragmentType.
 * @returns The name based on the typename of the node.
 */
function getNameBasedOnTypename(
  node: RepositoryFragmentType | UserFragmentType,
) {
  return node.__typename === 'Repository' ? node.owner.login : node.login;
}

/**
 * Merges the response data from the search query into a single array.
 *
 * Spread syntax keeps losing the type information.
 * It could be done with zod but the it's plugin for codegen doesn't work
 * I wanted to avoid repeating the shape of the response and was able to re-use their unmasking function
 * which originally is named useFragment so I skipped it while reading the docs...
 *
 * @param data - The search query data.
 * @returns An array containing the merged response data.
 */
function getMergedResponse(data: SearchQuery) {
  const mergedResponse = [];

  for (const edge of data.repository.edges ?? []) {
    const repo = getUnmaskedFragmentData(RepositoryFragment, edge?.node);

    if (repo) {
      mergedResponse.push(repo);
    }
  }

  for (const edge of data.user.edges ?? []) {
    const user = getUnmaskedFragmentData(UserFragment, edge?.node);

    if (user) {
      mergedResponse.push(user);
    }
  }

  return mergedResponse;
}

const indexLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get(SEARCH_QUERY_PARAM);
  const currentPage = Number(url.searchParams.get('page')) || 0;

  const res = await getSearchResults(query ?? 'michal', currentPage);

  if (res.error ?? !res.data) {
    throw json(`Failed to fetch query: ${query}`, {
      status: statusCodes.HTTP_STATUS_NOT_FOUND,
    });
  }

  const { user, repository } = res.data;

  const totalResults = repository.repositoryCount + user.userCount;
  const mergedResponse = getMergedResponse(res.data);

  if (mergedResponse.length === 0 && currentPage > 0) {
    throw redirect(`/?${SEARCH_QUERY_PARAM}=${query}`);
  }

  const sorted = mergedResponse.sort((a, b) =>
    getNameBasedOnTypename(a).localeCompare(getNameBasedOnTypename(b)),
  );

  const hasPreviousPage =
    repository.pageInfo.hasPreviousPage || user.pageInfo.hasPreviousPage;
  const hasNextPage =
    repository.pageInfo.hasNextPage || user.pageInfo.hasNextPage;

  return json(
    {
      results: sorted,
      totalResults,
      pageInfo: {
        hasPreviousPage,
        hasNextPage,
      },
      query,
      currentPage,
    },
    { status: statusCodes.HTTP_STATUS_OK },
  );
};

export default indexLoader;
