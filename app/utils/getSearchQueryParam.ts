export const SEARCH_QUERY_PARAM = 'q';

export default function getSearchQueryParam(request: Request) {
  const url = new URL(request.url);

  return url.searchParams.get(SEARCH_QUERY_PARAM);
}
