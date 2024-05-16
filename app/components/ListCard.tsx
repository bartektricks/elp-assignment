import { Link } from '@remix-run/react';
import clsx from 'clsx';

type ListCardProps = {
  image: React.JSX.Element;
  title: React.ReactNode;
  link: string;
  body?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  type: 'User' | 'Repository';
};

export default function ListCard({
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
              'typography-xxs flex flex-wrap items-center gap-x-3.5 gap-y-1 text-nowrap',
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
