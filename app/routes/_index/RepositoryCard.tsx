import type { RepositoryFragmentType } from '~/libs/fragments';
import LanguageTag from '../../components/LanguageTag';
import ListCard from '../../components/ListCard';
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
      image={
        <img
          loading="lazy"
          width={20}
          height={20}
          src={'/favicon.png'}
          alt={'repo icon'}
        />
      }
      title={`${owner.login}/${name}`}
      link="#"
      body={description}
      footer={
        <>
          <span>star: {stargazerCount}</span>
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
