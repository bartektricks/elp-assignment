// @vitest-environment node

import { getSearchResults } from '../app/libs/api/search.server';

// TODO: maybe could have also a mocked scenario
describe('getSearchResults', () => {
  it('should request github api', async () => {
    const query = 'example';

    const results = await getSearchResults(query);

    expect(results.operation.context.url).toContain('github');
    expect(results.operation.variables.repoQuery).toBe(query);
    expect(results.operation.variables.userQuery).toBe(`${query} type:user`);
  });
});