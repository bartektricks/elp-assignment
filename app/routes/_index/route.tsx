import BottomNav from './components/BottomNav';
import RepositoryCard from './components/RepositoryCard';
import UserCard from './components/UserCard';
import indexLoader from './loader.server';
import { useIndexLoaderData } from './loaderHooks';

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
      {totalResults > 0 && <BottomNav />}
    </main>
  );
}
