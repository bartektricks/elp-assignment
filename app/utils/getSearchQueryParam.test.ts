import getSearchQueryParam from './getSearchQueryParam.server';

describe('getSearchQueryParam', () => {
  it('should return the value of the search query parameter', () => {
    const request = {
      url: 'http://example.com/?q=searchTerm',
    } as Request;

    const result = getSearchQueryParam(request);

    expect(result).toBe('searchTerm');
  });

  it('should return null if the search query parameter is not present', () => {
    const request = {
      url: 'http://example.com/',
    } as Request;

    const result = getSearchQueryParam(request);

    expect(result).toBeNull();
  });

  it('should return empty string if the search query parameter is empty', () => {
    const request = {
      url: 'http://example.com/?q=',
    } as Request;

    const result = getSearchQueryParam(request);

    expect(result).toBe('');
  });
});
