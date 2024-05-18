import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header, {
  type HeaderProps,
  FOCUS_KEY,
} from '../app/routes/_index/Header';

const renderWithRemixStub = async (
  { queryValue }: HeaderProps = { queryValue: null },
) => {
  const RemixStub = createRemixStub([
    {
      path: '/',
      Component: () => <Header queryValue={queryValue} />,
      loader: () => {
        return json({ q: '' });
      },
    },
  ]);

  render(<RemixStub />);

  await waitFor(() => screen.getByRole('link'));
};

describe('Header', () => {
  it('should have an SVG link', async () => {
    await renderWithRemixStub();

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/');
    expect(link.querySelector('svg')).not.toBeNull();
  });

  it('should have different default value', async () => {
    await renderWithRemixStub({ queryValue: 'test' });

    const input = screen.getByTestId('header-input');

    expect(input).toHaveValue('test');
  });

  it('should have an input with q as name', async () => {
    await renderWithRemixStub();

    const input = screen.getByTestId('header-input');

    expect(input).toHaveAttribute('name', 'q');
  });

  it(`should focus and select text in input when "${FOCUS_KEY}" is pressed`, async () => {
    const user = userEvent.setup();

    await renderWithRemixStub();

    const input = screen.getByTestId('header-input');

    expect(document.activeElement).not.toBe(input);

    await user.keyboard(FOCUS_KEY);

    expect(document.activeElement).toBe(input);

    await user.keyboard('{backspace}');
    expect(input).toHaveValue('');
  });

  it('should unfocus on esc key', async () => {
    const user = userEvent.setup();

    await renderWithRemixStub();

    const input = screen.getByTestId('header-input');

    await user.keyboard(FOCUS_KEY);

    expect(document.activeElement).toBe(input);

    await user.keyboard('{escape}');

    expect(document.activeElement).not.toBe(input);
  });

  it('icon should match text of the action key', async () => {
    const user = userEvent.setup();

    await renderWithRemixStub();

    const actionIcon = screen.getByTestId('header-key-icon');
    const input = screen.getByTestId('header-input');

    expect(actionIcon.textContent).toBe(FOCUS_KEY);

    await user.keyboard(actionIcon.textContent ?? '');

    expect(document.activeElement).toBe(input);
  });

  it('should show loading icon after typing', async () => {
    const user = userEvent.setup();

    await renderWithRemixStub();

    const input = screen.getByTestId('header-input');

    await user.type(input, 'test');

    await waitFor(() => {
      const loadingIcon = screen.queryByTestId('header-loading-icon');

      expect(loadingIcon).not.toBeNull();
    });
  });
});
