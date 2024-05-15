import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const user = params.user;

  return json({ user });
};

export default function User() {
  const data = useLoaderData<typeof loader>();

  return <div>{JSON.stringify(data)}</div>;
}
