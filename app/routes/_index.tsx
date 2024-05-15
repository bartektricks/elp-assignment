import type { LoaderFunction } from '@remix-run/node';
import { type MetaFunction, json, useLoaderData } from '@remix-run/react';
import { getSearchResults } from '~/libs/api/search.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'EL Hub' },
    { name: 'description', content: 'Github clone assignment in Remix' },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') ?? 'michal';

  const res = await getSearchResults(q);

  if (res.error ?? !res.data) {
    throw json(`Failed to fetch query: ${q}`, { status: 404 });
  }

  return json(res.data, { status: 200 });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
