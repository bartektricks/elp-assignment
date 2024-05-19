import { Link, useNavigation, useSubmit } from '@remix-run/react';
import { debounce } from 'radash';
import { useEffect, useRef, useState } from 'react';
import GHLogo from '~/assets/gh-logo.svg?react';
import { SEARCH_QUERY_PARAM } from '~/utils/constants';
import Input from '../../components/Input';
import AnimatedSearchIcon from './AnimatedSearchIcon';

export type HeaderProps = {
  queryValue: string | null;
};

export const FOCUS_KEY = '/';

export default function Header({ queryValue }: HeaderProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const submit = useSubmit();
  const navigation = useNavigation();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === FOCUS_KEY) {
      e.preventDefault();
      ref.current?.focus();
      ref.current?.select();
    }

    if (e.key === 'Escape') {
      ref.current?.blur();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const isSearching = Boolean(
    navigation.location &&
      new URLSearchParams(navigation.location.search).get(
        SEARCH_QUERY_PARAM,
      ) !== queryValue,
  );

  const onChange = debounce<[e: React.ChangeEvent<HTMLInputElement>]>(
    { delay: 300 },
    (e) => {
      const isFirstSearch = queryValue === null;
      const formData = new FormData();
      formData.append(SEARCH_QUERY_PARAM, e.target.value);

      setIsFocused(false);

      submit(formData, {
        replace: !isFirstSearch,
      });
    },
  );

  return (
    <header className="flex items-center justify-between gap-x-4 bg-darkest-gray px-5 py-2.5 md:py-4">
      <Link to="/">
        {/* Could use SVGR but it's only one logo */}
        <GHLogo />
      </Link>
      <Input
        data-testid="header-input"
        ref={ref}
        type="text"
        role="searchbox"
        name={SEARCH_QUERY_PARAM}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={() => setIsFocused(false)}
        placeholder="Search"
        onChange={onChange}
        defaultValue={queryValue ?? ''}
        disabled={isSearching}
        icon={
          !isFocused ? <AnimatedSearchIcon isLoading={isSearching} /> : null
        }
      />
    </header>
  );
}
