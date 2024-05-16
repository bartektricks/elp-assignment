import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import LanguageTag from '~/components/LanguageTag';
import ListCard from '~/components/ListCard';
import { getSearchResults } from '~/libs/api/search.server';
import getSearchQueryParam from '~/utils/getSearchQueryParam.server';
import statusCodes from '~/utils/statusCodes.server';

const DEFAULT_QUERY = 'bartek';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const q = getSearchQueryParam(request);
  const res = await getSearchResults(q ?? DEFAULT_QUERY);

  if (res.error ?? !res.data) {
    throw json(`Failed to fetch query: ${q ?? DEFAULT_QUERY}`, {
      status: statusCodes.HTTP_STATUS_NOT_FOUND,
    });
  }

  return json(res.data, { status: statusCodes.HTTP_STATUS_OK });
};

export default function Index() {
  const { repository, user } = useLoaderData<typeof loader>();

  const totalResults = repository.repositoryCount + user.userCount;

  return (
    <main className="mx-auto max-w-[59.375rem] px-4">
      <h1 className="typography-l pt-8 pb-5">
        {totalResults.toLocaleString()} results
      </h1>
      <ul>
        {repository.edges?.map((edge) => {
          if (edge?.node?.__typename !== 'Repository') return null;
          const repo = edge.node;

          const stars = repo.stargazers.totalCount;

          return (
            <ListCard
              key={repo.name}
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
              title={`${repo.owner.login}/${repo.name}`}
              link="#"
              body={repo.description}
              footer={
                <>
                  <span>star: {stars}</span>
                  {repo.primaryLanguage && (
                    <LanguageTag {...repo.primaryLanguage} />
                  )}
                  {repo.licenseInfo && <span>{repo.licenseInfo.name}</span>}
                  {typeof repo.updatedAt === 'string' && (
                    <time dateTime={repo.updatedAt}>{repo.updatedAt}</time>
                  )}
                  {repo.issues.totalCount > 0 && (
                    <span>{repo.issues.totalCount} issues need help</span>
                  )}
                </>
              }
            />
          );
        })}

        {user.edges?.map((edge) => {
          if (edge?.node?.__typename !== 'User') return null;
          const user = edge.node;

          return (
            <ListCard
              key={user.login}
              type={edge.node.__typename}
              image={
                <a href={user.avatarUrl} target="_blank" rel="noreferrer">
                  <img
                    loading="lazy"
                    width={20}
                    height={20}
                    className="rounded-full"
                    src={user.avatarUrl}
                    alt={`${user.name} avatar`.trim()}
                  />
                </a>
              }
              title={user.name ?? user.login}
              subtitle={user.login}
              link={`/users/${user.login}`}
              body={user.bio}
              footer={user.location}
            />
          );
        })}
      </ul>
    </main>
  );
}
