import { graphql } from '~/gql';
import { gqlClient } from '../gqlClient.server';

const UserQuery = graphql(`
  query GetUser($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      followers {
        totalCount
      }
      following {
        totalCount
      }
      starredRepositories {
        totalCount
      }
    }
  }
`);

export function getUser(login: string) {
  return gqlClient.query(UserQuery, { login }).toPromise();
}
