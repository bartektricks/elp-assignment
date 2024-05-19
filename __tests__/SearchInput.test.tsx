import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput, { type SearchInputProps } from '~/components/SearchInput';
import { SEARCH_FOCUS_KEY } from '~/utils/constants';

const SEARCH_INPUT = 'search-input';

const renderWithRemixStub = async ({ value }: SearchInputProps = {}) => {
  const RemixStub = createRemixStub([
    {
      path: '/',
      Component: () => <SearchInput value={value} />,
      loader: () => {
        return json({ q: '' });
      },
    },
  ]);

  render(<RemixStub />);

  await waitFor(() => screen.getByTestId(SEARCH_INPUT));
};

describe('SearchInput', () => {
  it('should have different default value', async () => {
    await renderWithRemixStub({ value: 'test' });

    const input = screen.getByTestId(SEARCH_INPUT);

    expect(input).toHaveValue('test');
  });

  it('should have an input with q as name', async () => {
    await renderWithRemixStub();

    const input = screen.getByTestId(SEARCH_INPUT);

    expect(input).toHaveAttribute('name', 'q');
  });

  it(`should focus and select text in input when "${SEARCH_FOCUS_KEY}" is pressed`, async () => {
    const user = userEvent.setup();

    await renderWithRemixStub();

    const input = screen.getByTestId(SEARCH_INPUT);

    expect(document.activeElement).not.toBe(input);

    await user.keyboard(SEARCH_FOCUS_KEY);

    expect(document.activeElement).toBe(input);

    await user.keyboard('{backspace}');
    expect(input).toHaveValue('');
  });

  it('should unfocus on esc key', async () => {
    const user = userEvent.setup();

    await renderWithRemixStub();

    const input = screen.getByTestId(SEARCH_INPUT);

    await user.keyboard(SEARCH_FOCUS_KEY);

    expect(document.activeElement).toBe(input);

    await user.keyboard('{escape}');

    expect(document.activeElement).not.toBe(input);
  });

  it('icon should match text of the action key', async () => {
    const user = userEvent.setup();

    await renderWithRemixStub();

    const actionIcon = screen.getByTestId('header-key-icon');
    const input = screen.getByTestId(SEARCH_INPUT);

    expect(actionIcon.textContent).toBe(SEARCH_FOCUS_KEY);

    await user.keyboard(actionIcon.textContent ?? '');

    expect(document.activeElement).toBe(input);
  });

  it('should show loading icon after typing', async () => {
    const user = userEvent.setup();

    await renderWithRemixStub();

    const input = screen.getByTestId(SEARCH_INPUT);

    await user.type(input, 'test');

    await waitFor(() => {
      const loadingIcon = screen.queryByTestId('header-loading-icon');

      expect(loadingIcon).not.toBeNull();
    });
  });
});
