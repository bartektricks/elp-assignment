// @vitest-environment node

import { getSearchResults } from './search.server';

describe('getSearchResults', () => {
  it('should request github api', async () => {
    const query = 'example';

    const results = await getSearchResults(query);

    expect(results.operation.context.url).toContain('github');
    expect(results.operation.variables.query).toBe(query);
  });
});
