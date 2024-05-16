import { graphql } from '~/gql';
import { gqlClient } from '../gqlClient.server';

const SearchQuery = graphql(`
  query Search($repoQuery: String!, $userQuery: String!){
    user: search(query: $userQuery, type: USER, first: 5) {
      userCount
      edges {
        node {
          ... on User {
            name
            login
            bio
            location
            avatarUrl
          }
        }
      }
    }
    repository: search(query: $repoQuery, type: REPOSITORY, first: 5) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            description
            owner {
              login
            }
            primaryLanguage {
              name
              color
            }
            stargazers {
              totalCount
            }
            licenseInfo {
              name
            }
            issues {
              totalCount
            }
            updatedAt
          }
        }
      }
    }
  }`);

export function getSearchResults(query: string) {
  return gqlClient
    .query(SearchQuery, {
      userQuery: `${query} type:user`,
      repoQuery: query,
    })
    .toPromise();
}
