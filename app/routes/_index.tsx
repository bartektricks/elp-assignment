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

const USER = graphql(`query User($userName: String!) {
  user(login: $userName) {
    id
    email
    name
    login
    location
    websiteUrl
  }
}`);

export const loader: LoaderFunction = async () => {
  const res = await gqlClient
    .query(USER, {
      userName: 'bartektricks',
    })
    .toPromise();

  if (res.error ?? !res.data) {
    throw json('Failed to fetch user', { status: 404 });
  }

  return json(res.data, { status: 200 });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <div>{JSON.stringify(data)}</div>;
}
