// @vitest-environment node

import {
  QUERIES_PER_PAGE,
  getBase64EncodedCursor,
  getSearchResults,
} from '../app/libs/api/search.server';

import { HttpResponse, graphql } from 'msw';
import { setupServer } from 'msw/node';

const QUERY = 'test';

// Mock to not hit the Github API
setupServer(
  graphql.query('Search', () => {
    return HttpResponse.json({
      data: {
        test: 'mocked data',
      },
    });
  }),
).listen();

describe('getSearchResults', () => {
  it('should request github api and show first 5 elements', async () => {
    const results = await getSearchResults(QUERY);

    expect(results.operation.context.url).toContain('github.com/graphql');
    expect(results.operation.variables.first).toBe(5);
  });

  it('cursors should be null by default', async () => {
    const results = await getSearchResults(QUERY);

    expect(results.operation.variables.repoCursor).toBeNull();
    expect(results.operation.variables.userCursor).toBeNull();
  });

  it('cursors should be a base64 value of cursor:25 when page number is 5', async () => {
    const cursorValue = getBase64EncodedCursor(5 * QUERIES_PER_PAGE);
    const results = await getSearchResults(QUERY, 5);

    expect(results.operation.variables.repoCursor).toBe(cursorValue);
    expect(results.operation.variables.userCursor).toBe(cursorValue);
  });

  it('cursors should be NULL if a page number is below or equal to 0', async () => {
    const results = await getSearchResults(QUERY, -5);

    expect(results.operation.variables.repoCursor).toBeNull();
    expect(results.operation.variables.userCursor).toBeNull();

    const results2 = await getSearchResults(QUERY, 0);

    expect(results2.operation.variables.repoCursor).toBeNull();
    expect(results2.operation.variables.userCursor).toBeNull();
  });
});
