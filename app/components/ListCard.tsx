import { Link } from '@remix-run/react';
import clsx from 'clsx';

export type ListCardProps = {
  image: React.JSX.Element;
  title: React.ReactNode;
  link?: string;
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
    <li className="typography-m flex items-start gap-2 border-light-gray-4 border-t py-4">
      {image}
      <div className="flex-shrink basis-full text-dark-gray-2">
        <header>
          <Link
            tabIndex={link ? 0 : -1}
            className={clsx('mb-1 text-blue', !link && 'pointer-events-none')}
            to={link ?? ''}
          >
            {title}
          </Link>
          {subtitle && <p>{subtitle}</p>}
        </header>
        {(footer ?? body) && (
          <div className={clsx(isUser ? 'mt-5' : 'mt-1')}>
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
        )}
      </div>
    </li>
  );
}
