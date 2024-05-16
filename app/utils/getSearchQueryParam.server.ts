import { SEARCH_QUERY_PARAM } from './constants';

export default function getSearchQueryParam(request: Request) {
  const url = new URL(request.url);

  return url.searchParams.get(SEARCH_QUERY_PARAM);
}
