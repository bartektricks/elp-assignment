import { useNavigation, useSubmit } from '@remix-run/react';
import { debounce } from 'radash';
import { useEffect, useRef, useState } from 'react';
import Input from '~/components/Input';
import { SEARCH_FOCUS_KEY, SEARCH_QUERY_PARAM } from '~/utils/constants';
import AnimatedSearchIcon from '../routes/_index/components/AnimatedSearchIcon';

export type SearchInputProps = {
  value?: string;
};

export default function SearchInput({ value }: SearchInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const submit = useSubmit();
  const navigation = useNavigation();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === SEARCH_FOCUS_KEY) {
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
      ) !== value,
  );

  const onChange = debounce<[e: React.ChangeEvent<HTMLInputElement>]>(
    { delay: 300 },
    (e) => {
      const isFirstSearch = value === null;
      const formData = new FormData();
      formData.append(SEARCH_QUERY_PARAM, e.target.value);

      setIsFocused(false);

      submit(formData, {
        replace: !isFirstSearch,
      });
    },
  );

  return (
    <Input
      data-testid="search-input"
      ref={ref}
      type="text"
      role="searchbox"
      name={SEARCH_QUERY_PARAM}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      placeholder="Search"
      onChange={onChange}
      defaultValue={value ?? ''}
      disabled={isSearching}
      icon={<AnimatedSearchIcon isHidden={isFocused} isLoading={isSearching} />}
    />
  );
}
