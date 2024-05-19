import ChevronLeftIcon from '~/assets/icons/chevron-left.svg?react';
import Link from '~/components/Link';
import getSearchParamsStringFromObj from '~/utils/getSearchParamsStringFromObj';
import { useIndexLoaderData } from '../loader-hooks';

export default function BottomNav() {
  return (
    <nav className="flex items-center justify-center gap-10">
      <NavigationLink isPrev />
      <NavigationLink />
    </nav>
  );
}

function NavigationLink({ isPrev }: { isPrev?: boolean }) {
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
      {isPrev && <ChevronLeftIcon />}
      {isPrev ? 'Previous' : 'Next'}
      {isPrev || <ChevronLeftIcon transform="rotate(180)" />}
    </Link>
  );
}
