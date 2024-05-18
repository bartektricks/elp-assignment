import { type LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { SearchQuery } from '__generated__/gql/graphql';
import clsx from 'clsx';
import RepositoryCard from '~/components/RepositoryCard';
import UserCard from '~/components/UserCard';
import { getUnmaskedFragmentData } from '~/gql';
import { getSearchResults } from '~/libs/api/search.server';
import {
  RepositoryFragment,
  type RepositoryFragmentType,
  UserFragment,
  type UserFragmentType,
} from '~/libs/fragments';
import { SEARCH_QUERY_PARAM } from '~/utils/constants';
import statusCodes from '~/utils/statusCodes.server';

function getNameBasedOnTypename(
  node: RepositoryFragmentType | UserFragmentType,
) {
  return node.__typename === 'Repository' ? node.owner.login : node.login;
}

/*
  Spread syntax keeps losing the type information.
  It could be done with zod but the it's plugin for codegen doesn't work
  I wanted to avoid repeating the shape of the response and was able to re-use their unmasking function
  which originally is named useFragment so I skipped it while reading the docs...
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get(SEARCH_QUERY_PARAM) ?? '';
  const currentPage = Number(url.searchParams.get('page')) || 0;

  const res = await getSearchResults(query, currentPage);

  if (res.error ?? !res.data) {
    throw json(`Failed to fetch query: ${query}`, {
      status: statusCodes.HTTP_STATUS_NOT_FOUND,
    });
  }

  const totalResults =
    res.data.repository.repositoryCount + res.data.user.userCount;

  const mergedResponse = getMergedResponse(res.data);

  if (mergedResponse.length === 0 && currentPage > 0) {
    throw redirect(`/?${SEARCH_QUERY_PARAM}=${query}`, { status: 301 });
  }

  const sorted = mergedResponse.sort((a, b) =>
    getNameBasedOnTypename(a).localeCompare(getNameBasedOnTypename(b)),
  );

  const hasPreviousPage =
    res.data.repository.pageInfo.hasPreviousPage ||
    res.data.user.pageInfo.hasPreviousPage;
  const hasNextPage =
    res.data.repository.pageInfo.hasNextPage ||
    res.data.user.pageInfo.hasNextPage;

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

export default function Index() {
  const { results, totalResults, pageInfo, query, currentPage } =
    useLoaderData<typeof loader>();

  return (
    <main className="mx-auto w-full max-w-[59.375rem] px-4">
      <h1 className="typography-l pt-8 pb-5">
        {totalResults.toLocaleString()} results
      </h1>
      <ul>
        {results.map((result) => {
          if (result.__typename === 'Repository') {
            return <RepositoryCard key={result.name} {...result} />;
          }

          return <UserCard key={result.login} {...result} />;
        })}

        {totalResults > 0 && (
          <>
            <Link
              to={{
                search: `?q=${query}${
                  currentPage > 1 ? `&page=${currentPage - 1}` : ''
                }`,
              }}
              className={clsx(
                !pageInfo.hasPreviousPage &&
                  'pointer-events-none cursor-not-allowed opacity-50',
              )}
              aria-disabled={!pageInfo.hasPreviousPage}
            >
              Previous
            </Link>
            <Link
              to={{
                search: `?q=${query}&page=${currentPage + 1}`,
              }}
              className={clsx(
                !pageInfo.hasNextPage &&
                  'pointer-events-none cursor-not-allowed opacity-50',
              )}
              aria-disabled={!pageInfo.hasNextPage}
            >
              Next
            </Link>
          </>
        )}
      </ul>
    </main>
  );
}
