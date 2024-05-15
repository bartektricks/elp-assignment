import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSearchResults } from '~/libs/api/search.server';
import getSearchQueryParam from '~/utils/getSearchQueryParam';
import statusCodes from '~/utils/statusCodes.server';

const DEFAULT_QUERY = 'bartek';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const q = getSearchQueryParam(request);
  const res = await getSearchResults(q ?? DEFAULT_QUERY);

  if (res.error ?? !res.data) {
    throw json(`Failed to fetch query: ${q ?? DEFAULT_QUERY}`, {
      status: statusCodes.HTTP_STATUS_NOT_FOUND,
    });
  }

  return json(res.data, { status: statusCodes.HTTP_STATUS_OK });
};

export default function Index() {
  const { repository, user } = useLoaderData<typeof loader>();

  const totalResults = repository.repositoryCount + user.userCount;

  return (
    <main className="mx-auto max-w-[59.375rem] px-4">
      <h1 className="typography-l pt-8 pb-5">
        {totalResults.toLocaleString()} results
      </h1>
      <pre>{JSON.stringify(repository, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
