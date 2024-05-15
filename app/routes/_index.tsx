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
  const data = useLoaderData<typeof loader>();

  return <pre className="overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>;
}
