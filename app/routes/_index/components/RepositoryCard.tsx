import BookIcon from '~/assets/icons/book.svg?react';
import StarIcon from '~/assets/icons/star.svg?react';
import LanguageTag from '~/components/LanguageTag';
import ListCard from '~/components/ListCard';
import type { RepositoryFragmentType } from '~/libs/fragments';
import RelativeTimeTag from './RelativeTimeTag';

export default function RepositoryCard({
  name,
  owner,
  description,
  primaryLanguage,
  licenseInfo,
  updatedAt,
  issues,
  stargazerCount,
}: RepositoryFragmentType) {
  return (
    <ListCard
      type="Repository"
      image={<BookIcon width={20} height={20} className="text-dark-gray-1" />}
      title={`${owner.login}/${name}`}
      link="#"
      body={description}
      footer={
        <>
          <div className="flex items-center gap-1 font-medium">
            <StarIcon height={16} />
            {stargazerCount}
          </div>
          {primaryLanguage && <LanguageTag {...primaryLanguage} />}
          {licenseInfo && licenseInfo.name !== 'Other' && (
            <span>{licenseInfo.name}</span>
          )}
          <RelativeTimeTag dateTime={updatedAt} />
          {issues.totalCount > 0 && (
            <span>{issues.totalCount.toLocaleString()} issues need help</span>
          )}
        </>
      }
    />
  );
}
