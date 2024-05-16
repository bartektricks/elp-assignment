import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import clsx from 'clsx';
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
type ListCardProps = {
  image: React.JSX.Element;
  title: React.ReactNode;
  link: string;
  body?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  type: 'User' | 'Repository';
};

type LanguageTagProps = {
  name: string;
  color?: string | null;
};

function LanguageTag({ name, color }: LanguageTagProps) {
  return (
    <span className="flex items-center gap-1">
      <div
        role="presentation"
        className="size-3 rounded-full bg-blue"
        style={{
          backgroundColor: color ?? undefined,
        }}
      />
      {name}
    </span>
  );
}

function ListCard({
  image,
  title,
  subtitle,
  body,
  link,
  footer,
  type,
}: ListCardProps) {
  const isUser = type === 'User';

  return (
    <li className="typography-m grid grid-cols-[theme(spacing.5)_1fr] gap-2 border-light-gray-4 border-t py-4">
      {image}
      <div className="text-dark-gray-2">
        <header className={clsx(isUser ? 'mb-5' : 'mb-1')}>
          <Link className="mb-1 text-blue" to={link}>
            {title}
          </Link>
          {subtitle && <p>{subtitle}</p>}
        </header>
        {body && (
          <p className={clsx(isUser && 'typography-s text-darkest-gray')}>
            {body}
          </p>
        )}
        {footer && (
          <footer
            className={clsx(
              'typography-xxs flex items-center gap-3.5',
              isUser ? 'mt-2' : 'mt-4',
            )}
          >
            {footer}
          </footer>
        )}
      </div>
    </li>
  );
}
