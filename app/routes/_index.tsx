import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import LanguageTag from '~/components/LanguageTag';
import ListCard from '~/components/ListCard';
import RelativeTimeTag from '~/components/RelativeTimeTag';
import { getSearchResults } from '~/libs/api/search.server';
import getSearchQueryParam from '~/utils/getSearchQueryParam.server';
import statusCodes from '~/utils/statusCodes.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const q = getSearchQueryParam(request) ?? '';
  const res = await getSearchResults(q);

  if (res.error ?? !res.data) {
    throw json(`Failed to fetch query: ${q}`, {
      status: statusCodes.HTTP_STATUS_NOT_FOUND,
    });
  }

  return json(res.data, { status: statusCodes.HTTP_STATUS_OK });
};

export default function Index() {
  const { repository, user } = useLoaderData<typeof loader>();

  const totalResults = repository.repositoryCount + user.userCount;

  return (
    <main className="mx-auto w-full max-w-[59.375rem] px-4">
      <h1 className="typography-l pt-8 pb-5">
        {totalResults.toLocaleString()} results
      </h1>
      <ul>
        {repository.edges?.map((edge) => {
          if (edge?.node?.__typename !== 'Repository') return null;
          const {
            name,
            owner,
            description,
            primaryLanguage,
            licenseInfo,
            updatedAt,
            issues,
            stargazers,
          } = edge.node;

          return (
            <ListCard
              key={name}
              type={edge.node.__typename}
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
                  <span>star: {stargazers.totalCount}</span>
                  {primaryLanguage && <LanguageTag {...primaryLanguage} />}
                  {licenseInfo && licenseInfo.name !== 'Other' && (
                    <span>{licenseInfo.name}</span>
                  )}
                  {typeof updatedAt === 'string' && (
                    <RelativeTimeTag dateTime={updatedAt} />
                  )}
                  {issues.totalCount > 0 && (
                    <span>
                      {issues.totalCount.toLocaleString()} issues need help
                    </span>
                  )}
                </>
              }
            />
          );
        })}

        {user.edges?.map((edge) => {
          if (edge?.node?.__typename !== 'User') return null;
          const { name, avatarUrl, login, bio, location } = edge.node;

          return (
            <ListCard
              key={login}
              type={edge.node.__typename}
              image={
                <a href={avatarUrl} target="_blank" rel="noreferrer">
                  <img
                    loading="lazy"
                    width={20}
                    height={20}
                    className="rounded-full"
                    src={avatarUrl}
                    alt={`${name} avatar`.trim()}
                  />
                </a>
              }
              title={name ?? login}
              subtitle={login}
              link={`/users/${login}`}
              body={bio}
              footer={location}
            />
          );
        })}
      </ul>
    </main>
  );
}
