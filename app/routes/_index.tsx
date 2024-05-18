import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { SearchQuery } from '__generated__/gql/graphql';
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
import getSearchQueryParam from '~/utils/getSearchQueryParam.server';
import statusCodes from '~/utils/statusCodes.server';

function getNameBasedOnTypename(
  node: RepositoryFragmentType | UserFragmentType,
) {
  return node.__typename === 'Repository' ? node.owner.login : node.login;
}

// spread syntax keeps losing the type information
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
  const q = getSearchQueryParam(request) ?? '';
  const res = await getSearchResults(q);

  if (res.error ?? !res.data) {
    throw json(`Failed to fetch query: ${q}`, {
      status: statusCodes.HTTP_STATUS_NOT_FOUND,
    });
  }

  const totalResults =
    res.data.repository.repositoryCount + res.data.user.userCount;

  const mergedResponse = getMergedResponse(res.data);
  const sorted = mergedResponse.sort((a, b) =>
    getNameBasedOnTypename(a).localeCompare(getNameBasedOnTypename(b)),
  );

  return json(
    { results: sorted, totalResults },
    { status: statusCodes.HTTP_STATUS_OK },
  );
};

export default function Index() {
  const { results, totalResults } = useLoaderData<typeof loader>();

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
      </ul>
    </main>
  );
}
