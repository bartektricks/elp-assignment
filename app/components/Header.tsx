import { Link } from '@remix-run/react';
import GHLogo from '~/assets/gh-logo.svg?react';

export default function Header({ children }: React.PropsWithChildren) {
  return (
    <header className="flex items-center justify-between gap-x-4 bg-darkest-gray px-5 py-2.5 md:py-4">
      <Link to="/">
        <GHLogo />
      </Link>
      {children}
    </header>
  );
}
