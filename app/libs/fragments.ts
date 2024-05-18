import type {
  RepositoryFragmentFragment,
  UserFragmentFragment,
} from '__generated__/gql/graphql';
import { graphql } from '~/gql';

export type UserFragmentType = Omit<UserFragmentFragment, ' $fragmentName'>;

export const UserFragment = graphql(`
  fragment UserFragment on User {
    __typename
    id
    name
    login
    bio
    location
    avatarUrl
  }
`);

export type RepositoryFragmentType = Omit<
  RepositoryFragmentFragment,
  ' $fragmentName'
>;

export const RepositoryFragment = graphql(`
  fragment RepositoryFragment on Repository {
    __typename
    id
    name
    description
    stargazerCount
    stargazerCount
    updatedAt
    owner {
      login
    }
    primaryLanguage {
      name
      color
    }
    issues {
      totalCount
    }
    licenseInfo {
      name
    }
  }
`);
