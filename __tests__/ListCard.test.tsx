import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';
import ListCard, { type ListCardProps } from '../app/components/ListCard';

const ImageMock = () => <img data-testid="image" src="test" alt="test" />;

const WithRemixStub = (props: ListCardProps) => {
  const RemixStub = createRemixStub([
    {
      path: '/',
      Component: () => <ListCard {...props} />,
    },
  ]);

  return <RemixStub />;
};

const defaultProps = {
  title: 'Test Title',
  image: <ImageMock />,
  link: '#test',
  type: 'User',
} satisfies ListCardProps;

describe('ListCard User type', () => {
  it('should render with the defaults', () => {
    render(<WithRemixStub {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByTestId('image')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/#test');
  });
  it('should render differently with subtitle', () => {
    const { rerender } = render(
      <WithRemixStub {...defaultProps} subtitle="Test Subtitle" />,
    );

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();

    rerender(<WithRemixStub {...defaultProps} />);

    expect(screen.queryByText('Test Subtitle')).not.toBeInTheDocument();
  });

  it('body and footer props should render different layouts', () => {
    const bodyText = 'Test Body';
    const footerText = 'Test Footer';

    const { rerender, container } = render(
      <WithRemixStub body={bodyText} {...defaultProps} />,
    );

    expect(screen.getByText(bodyText)).toBeInTheDocument();
    expect(document.querySelector('footer')).toBeNull();

    const bodySnapshot = container.innerHTML;

    rerender(<WithRemixStub footer={footerText} {...defaultProps} />);

    expect(screen.queryByText(bodyText)).not.toBeInTheDocument();
    expect(screen.getByText(footerText)).toBeInTheDocument();
    expect(screen.getByText(footerText).tagName).toBe('FOOTER');

    const footerSnapshot = container.innerHTML;

    rerender(
      <WithRemixStub body={bodyText} footer={footerText} {...defaultProps} />,
    );

    expect(screen.getByText(bodyText)).toBeInTheDocument();
    expect(screen.queryByText(footerText)).toBeInTheDocument();

    const bothSnapshot = container.innerHTML;

    // all snapshots should be different
    expect(bodySnapshot).not.toEqual(footerSnapshot);
    expect(bodySnapshot).not.toEqual(bothSnapshot);
    expect(footerSnapshot).not.toEqual(bothSnapshot);
  });

  it('should not render different classes for User and Repository type with default props', () => {
    const { rerender, container } = render(<WithRemixStub {...defaultProps} />);

    const userSnapshot = container.innerHTML;

    rerender(<WithRemixStub {...defaultProps} type="Repository" />);

    const repoSnapshot = container.innerHTML;

    expect(userSnapshot).toEqual(repoSnapshot);
  });

  it('should render different classes for User and Repository type with optional props', () => {
    const allProps = {
      ...defaultProps,
      subtitle: 'test',
      body: 'body',
      footer: 'footer',
    } satisfies ListCardProps;

    const { rerender, container } = render(
      <WithRemixStub {...allProps} type="User" />,
    );

    const userSnapshot = container.innerHTML;

    rerender(<WithRemixStub {...allProps} type="Repository" />);

    const repoSnapshot = container.innerHTML;

    expect(userSnapshot).not.toEqual(repoSnapshot);
  });
});
