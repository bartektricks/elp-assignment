import { graphql } from '~/gql';
import { gqlClient } from '../gqlClient.server';

const SearchQuery = graphql(`
  query Search($query: String!){
    user: search(query: $query, type: USER, first: 5) {
      userCount
      edges {
        node {
          ... on User {
            name
            bio
            location
            avatarUrl
          }
        }
      }
    }
    repository: search(query: $query, type: REPOSITORY, first: 5) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            description
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
            updatedAt
          }
        }
      }
    }
  }`);

export function getSearchResults(query: string) {
  return gqlClient
    .query(SearchQuery, {
      query,
    })
    .toPromise();
}
