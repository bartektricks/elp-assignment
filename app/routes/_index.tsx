import type { LoaderFunctionArgs } from '@remix-run/node';
import {
  type MetaFunction,
  json,
  useLoaderData,
  useNavigation,
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
const SEARCH_QUERY_PARAM = 'q';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get(SEARCH_QUERY_PARAM) ?? '';

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
  const navigation = useNavigation();

  const isSearching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(SEARCH_QUERY_PARAM);

  const onChange = debounce<[e: React.ChangeEvent<HTMLInputElement>]>(
    { delay: 250 },
    (e) => {
      const isFirstSearch = q === '';

      submit(
        { q: e.target.value },
        {
          replace: !isFirstSearch,
        },
      );
    },
  );

  return (
    <div>
      <input
        type="search"
        name={SEARCH_QUERY_PARAM}
        placeholder="Search"
        onChange={onChange}
        defaultValue={q}
        disabled={isSearching}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
