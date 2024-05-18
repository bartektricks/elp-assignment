/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Search($repoQuery: String!, $userQuery: String!, $repoCursor: String, $userCursor: String, $first: Int){\n    user: search(query: $userQuery, type: USER, first: $first, after: $userCursor) {\n      userCount\n      edges {\n        node {\n          ... on User {\n            ...UserFragment\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n    repository: search(query: $repoQuery, type: REPOSITORY, first: $first, after: $repoCursor) {\n      repositoryCount\n        edges {\n          node {\n          ... on Repository {\n            ...RepositoryFragment\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n  }\n": types.SearchDocument,
    "\n  fragment UserFragment on User {\n    __typename\n    id\n    name\n    login\n    bio\n    location\n    avatarUrl\n  }\n": types.UserFragmentFragmentDoc,
    "\n  fragment RepositoryFragment on Repository {\n    __typename\n    id\n    name\n    description\n    stargazerCount\n    stargazerCount\n    updatedAt\n    owner {\n      login\n    }\n    primaryLanguage {\n      name\n      color\n    }\n    issues {\n      totalCount\n    }\n    licenseInfo {\n      name\n    }\n  }\n": types.RepositoryFragmentFragmentDoc,
    "\n        query GetUser($login: String!) {\n          user(login: $login) {\n            login\n            name\n            avatarUrl\n            followers {\n              totalCount\n            }\n            following {\n              totalCount\n            }\n            starredRepositories {\n              totalCount\n            }\n          }\n        }": types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Search($repoQuery: String!, $userQuery: String!, $repoCursor: String, $userCursor: String, $first: Int){\n    user: search(query: $userQuery, type: USER, first: $first, after: $userCursor) {\n      userCount\n      edges {\n        node {\n          ... on User {\n            ...UserFragment\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n    repository: search(query: $repoQuery, type: REPOSITORY, first: $first, after: $repoCursor) {\n      repositoryCount\n        edges {\n          node {\n          ... on Repository {\n            ...RepositoryFragment\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query Search($repoQuery: String!, $userQuery: String!, $repoCursor: String, $userCursor: String, $first: Int){\n    user: search(query: $userQuery, type: USER, first: $first, after: $userCursor) {\n      userCount\n      edges {\n        node {\n          ... on User {\n            ...UserFragment\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n    repository: search(query: $repoQuery, type: REPOSITORY, first: $first, after: $repoCursor) {\n      repositoryCount\n        edges {\n          node {\n          ... on Repository {\n            ...RepositoryFragment\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFragment on User {\n    __typename\n    id\n    name\n    login\n    bio\n    location\n    avatarUrl\n  }\n"): (typeof documents)["\n  fragment UserFragment on User {\n    __typename\n    id\n    name\n    login\n    bio\n    location\n    avatarUrl\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RepositoryFragment on Repository {\n    __typename\n    id\n    name\n    description\n    stargazerCount\n    stargazerCount\n    updatedAt\n    owner {\n      login\n    }\n    primaryLanguage {\n      name\n      color\n    }\n    issues {\n      totalCount\n    }\n    licenseInfo {\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment RepositoryFragment on Repository {\n    __typename\n    id\n    name\n    description\n    stargazerCount\n    stargazerCount\n    updatedAt\n    owner {\n      login\n    }\n    primaryLanguage {\n      name\n      color\n    }\n    issues {\n      totalCount\n    }\n    licenseInfo {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query GetUser($login: String!) {\n          user(login: $login) {\n            login\n            name\n            avatarUrl\n            followers {\n              totalCount\n            }\n            following {\n              totalCount\n            }\n            starredRepositories {\n              totalCount\n            }\n          }\n        }"): (typeof documents)["\n        query GetUser($login: String!) {\n          user(login: $login) {\n            login\n            name\n            avatarUrl\n            followers {\n              totalCount\n            }\n            following {\n              totalCount\n            }\n            starredRepositories {\n              totalCount\n            }\n          }\n        }"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;