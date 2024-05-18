import {
  Link as RemixLink,
  type LinkProps as RemixLinkProps,
} from '@remix-run/react';
import clsx from 'clsx';

export default function Link({
  children,
  className,
  ...props
}: RemixLinkProps) {
  const isString = typeof children === 'string';
  const isDisabled = [true, 'true'].includes(props['aria-disabled'] ?? false);

  const classes = clsx(
    'typography-s',
    !isString && 'inline-flex items-center gap-1',
    isDisabled
      ? 'pointer-events-none cursor-not-allowed text-dark-gray-1'
      : 'text-blue',
    className,
  );

  return (
    <RemixLink className={classes} {...props}>
      {children}
    </RemixLink>
  );
}
