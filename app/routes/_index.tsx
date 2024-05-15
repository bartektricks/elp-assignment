import type { LoaderFunction } from '@remix-run/node';
import { type MetaFunction, json, useLoaderData } from '@remix-run/react';
import { graphql } from '~/gql';
import { gqlClient } from '~/libs/gqlClient.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'EL Hub' },
    { name: 'description', content: 'Github clone assignment in Remix' },
  ];
};

const SearchQuery = graphql(`
  query Search($query: String!){
    user: search(query: $query, type: USER, first: 5) {
      userCount
      edges {
        node {
          ... on User {
            login
            name
            bio
            followers {
              totalCount
            }
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
            url
            description
            primaryLanguage {
              name
            }
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
          }
        }
      }
    }
  }`);

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') ?? 'michal';

  const res = await gqlClient
    .query(SearchQuery, {
      query: q,
    })
    .toPromise();

  if (res.error ?? !res.data) {
    throw json('Failed to fetch user', { status: 404 });
  }

  return json(res.data, { status: 200 });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
