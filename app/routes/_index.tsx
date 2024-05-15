import type { LoaderFunctionArgs } from '@remix-run/node';
import {
  type MetaFunction,
  json,
  useLoaderData,
  useSubmit,
} from '@remix-run/react';
import { debounce } from 'radash';
import { getSearchResults } from '~/libs/api/search.server';
import statusCodes from '~/utils/statusCodes.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'EL Hub' },
    { name: 'description', content: 'Github clone assignment in Remix' },
  ];
};

const DEFAULT_QUERY = 'bartek';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') ?? '';

  const res = await getSearchResults(q ?? DEFAULT_QUERY);

  if (res.error ?? !res.data) {
    throw json(`Failed to fetch query: ${q ?? DEFAULT_QUERY}`, {
      status: statusCodes.HTTP_STATUS_NOT_FOUND,
    });
  }

  return json({ data: res.data, q }, { status: statusCodes.HTTP_STATUS_OK });
};

export default function Index() {
  const { data, q } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const debouncedSubmit = debounce<[e: string]>({ delay: 220 }, (value) => {
    submit({ q: value });
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSubmit(e.target.value);
  };

  return (
    <div>
      <input
        type="search"
        name="q"
        placeholder="Search"
        onChange={onChange}
        defaultValue={q}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
