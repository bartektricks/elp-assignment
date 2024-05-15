// @vitest-environment node

describe('getAuthorizationHeader', () => {
  it('should return an object with Authorization header when GH_AUTH_TOKEN is present', () => {
    vi.stubEnv('GH_AUTH_TOKEN', 'YOUR_AUTH_TOKEN');

    import('./getAuthorizationHeader.server').then((response) => {
      const getAuthorizationHeader = response.default;

      const expected = {
        Authorization: 'Bearer YOUR_AUTH_TOKEN',
      };

      const result = getAuthorizationHeader();

      expect(result).toEqual(expected);
    });

    vi.unstubAllEnvs();
  });

  it('should return an object with empty Authorization header when GH_AUTH_TOKEN is not present', () => {
    import('./getAuthorizationHeader.server').then((response) => {
      const getAuthorizationHeader = response.default;

      const expected = {
        Authorization: '',
      };

      const result = getAuthorizationHeader();

      expect(result).toEqual(expected);
    });
  });
});
