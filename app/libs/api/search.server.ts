import { graphql } from '~/gql';
import { gqlClient } from '../gqlClient.server';

export const QUERIES_PER_PAGE = 5;

const SearchQuery = graphql(`
  query Search($repoQuery: String!, $userQuery: String!, $repoCursor: String, $userCursor: String, $first: Int){
    user: search(query: $userQuery, type: USER, first: $first, after: $userCursor) {
      userCount
      edges {
        node {
          ... on User {
            ...UserFragment
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
    repository: search(query: $repoQuery, type: REPOSITORY, first: $first, after: $repoCursor) {
      repositoryCount
        edges {
          node {
          ... on Repository {
            ...RepositoryFragment
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`);

function getBase64EncodedCursor(cursorNumber: number) {
  return Buffer.from(`cursor:${cursorNumber}`).toString('base64');
}

// NOTE: this function returns both user and repo search results
// which means that if one is missing then the maximum number of results will be at least half the size.
// Since the query is cached I could do an additional check and adjust the size accordingly but I'm too lazy.
export function getSearchResults(query: string, pageNumber = 0) {
  const queryPageNumber = Math.abs(pageNumber) * QUERIES_PER_PAGE;
  const cursor =
    queryPageNumber > 0 ? getBase64EncodedCursor(queryPageNumber) : null;

  return gqlClient
    .query(SearchQuery, {
      userQuery: `${query} type:user`,
      repoQuery: query,
      repoCursor: cursor,
      userCursor: cursor,
      first: QUERIES_PER_PAGE,
    })
    .toPromise();
}
