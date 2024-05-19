import StarIcon from '~/assets/icons/star.svg?react';
import UsersIcon from '~/assets/icons/users.svg?react';
import ContributionGrid from '~/components/ContributionGrid';
import userLoader from './loader.server';
import { useUserLoaderData } from './loaderHooks';

export const loader = userLoader;

export default function User() {
  const {
    name,
    login,
    avatarUrl,
    followers,
    following,
    starredRepositories,
    contributionsCollection,
  } = useUserLoaderData();

  const { weeks, ...contributionGridProps } =
    contributionsCollection.contributionCalendar;

  return (
    <main className="px-6 py-8 md:py-11">
      <div className="mx-auto max-w-screen-lg text-center">
        <img
          className="mb-4 inline-block aspect-square w-full max-w-[18.5rem] rounded-full"
          src={avatarUrl}
          alt={`${name ?? login} Avatar`}
        />
        <h1 className="typography-xl text-darkest-gray">{name ?? login}</h1>
        <h2 className="typography-l mb-3 text-dark-gray-2">{login}</h2>
        <div className="typography-xxs mb-12 flex flex-wrap items-center justify-center gap-x-5 text-nowrap text-dark-gray-2">
          <p className="flex items-center gap-1">
            <UsersIcon /> {followers.totalCount} Followers
          </p>
          <p>{following.totalCount} Following</p>
          <p className="flex items-center gap-1">
            <StarIcon /> {starredRepositories.totalCount}
          </p>
        </div>
        <ContributionGrid
          {...contributionGridProps}
          contributionDays={weeks.flatMap((week) => week.contributionDays)}
        />
      </div>
    </main>
  );
}
