import { type LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import StarIcon from '~/assets/icons/star.svg?react';
import UsersIcon from '~/assets/icons/users.svg?react';
import { graphql } from '~/gql';
import { gqlClient } from '~/libs/gqlClient.server';
import statusCodes from '~/utils/statusCodes.server';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const userParam = params.user;

  if (!userParam)
    return redirect('/', {
      status: 301,
    });

  const res = await gqlClient
    .query(
      graphql(`
        query GetUser($login: String!) {
          user(login: $login) {
            login
            name
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
        }`),
      { login: userParam },
    )
    .toPromise();

  if (!res.data?.user) {
    throw json('Not found', {
      status: statusCodes.HTTP_STATUS_NOT_FOUND,
      statusText: 'User not found',
    });
  }

  return json({ ...res.data.user });
};

export default function User() {
  const { name, login, avatarUrl, followers, following, starredRepositories } =
    useLoaderData<typeof loader>();

  return (
    <main className="px-6 py-8 md:py-11">
      <div className="mx-auto max-w-[18.5rem] text-center">
        <img
          className="mb-4 aspect-square w-full rounded-full"
          src={avatarUrl}
          alt={`${name ?? login} Avatar`}
        />
        <h1 className="typography-xl text-darkest-gray">{name ?? login}</h1>
        <h2 className="typography-l mb-3 text-dark-gray-2">{login}</h2>
        <div className="typography-xxs flex flex-wrap items-center justify-center gap-x-5 text-nowrap text-dark-gray-2">
          <p className="flex items-center gap-1">
            <UsersIcon /> {followers.totalCount} Followers
          </p>
          <p>{following.totalCount} Following</p>
          <p className="flex items-center gap-1">
            <StarIcon /> {starredRepositories.totalCount}
          </p>
        </div>
      </div>
    </main>
  );
}
