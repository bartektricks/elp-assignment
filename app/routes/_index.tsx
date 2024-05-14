import { type LoaderFunction, type MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { graphql } from '~/libs/graphql.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'EL Hub' },
    { name: 'description', content: 'Github clone assignment in Remix' },
  ];
};

export const loader: LoaderFunction = async () => {
  const res = await graphql
    .query(
      `query User($userName: String!) {
        user(login: $userName) {
          id
          email
          name
          login
          location
          websiteUrl
        }
      }`,
      {
        userName: 'bartektricks',
      },
    )
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
