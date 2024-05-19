import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor } from '@testing-library/react';
import Header from '~/components/Header';

const renderWithRemixStub = async ({
  children,
}: React.PropsWithChildren = {}) => {
  const RemixStub = createRemixStub([
    {
      path: '/',
      Component: () => <Header>{children}</Header>,
    },
  ]);

  render(<RemixStub />);

  await waitFor(() => screen.getByRole('link'));
};

describe('Header', () => {
  it('should render with a link to the home page', () => {
    renderWithRemixStub();

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('should render with link and children', () => {
    renderWithRemixStub({ children: <span data-testid="child" /> });

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
