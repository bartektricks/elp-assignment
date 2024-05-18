import ArrowLeftIcon from '~/components/ArrowLeftIcon';
import Link from '~/components/Link';
import { useIndexLoaderData } from '~/loaders/index/loader';
import RepositoryCard from '~/routes/_index/RepositoryCard';
import UserCard from '~/routes/_index/UserCard';
import getSearchParamsStringFromObj from '~/utils/getSearchParamsStringFromObj';

import indexLoader from '~/loaders/index/loader.server';

export const loader = indexLoader;

export default function Index() {
  const { results, totalResults } = useIndexLoaderData();

  return (
    <main className="mx-auto w-full max-w-[59.375rem] px-4 pb-16 md:pb-[4.5rem]">
      <h1 className="typography-l pt-8 pb-5">
        {totalResults.toLocaleString()} results
      </h1>
      <ul className="mb-8">
        {/* No destructuring to make typescript happy */}
        {results.map((result) => {
          if (result.__typename === 'Repository') {
            return <RepositoryCard key={result.id} {...result} />;
          }

          return <UserCard key={result.id} {...result} />;
        })}
      </ul>
      {totalResults > 0 && (
        <div className="flex items-center justify-center gap-10">
          <NavigationLink isPrev />
          <NavigationLink />
        </div>
      )}
    </main>
  );
}

export function NavigationLink({ isPrev }: { isPrev?: boolean }) {
  const { query, pageInfo, currentPage } = useIndexLoaderData();
  const isDisabled = !pageInfo[isPrev ? 'hasPreviousPage' : 'hasNextPage'];

  return (
    <Link
      to={{
        search: getSearchParamsStringFromObj({
          q: query,
          page: currentPage + (isPrev ? -1 : 1),
        }),
      }}
      className="px-3 py-2"
      aria-disabled={isDisabled}
    >
      {isPrev && <ArrowLeftIcon />}
      {isPrev ? 'Previous' : 'Next'}
      {isPrev || <ArrowLeftIcon rotate={180} />}
    </Link>
  );
}
