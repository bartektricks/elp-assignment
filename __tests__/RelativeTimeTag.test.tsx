import { render } from '@testing-library/react';
import RelativeTimeTag from '~/routes/_index/components/RelativeTimeTag';

describe('RelativeTimeTag', () => {
  it('should render with a relative time', () => {
    const { container } = render(
      <RelativeTimeTag dateTime={new Date().toISOString()} />,
    );

    const time = container.querySelector('time');
    expect(time).toBeInTheDocument();
  });

  it('should render null if date is invalid', () => {
    const { container } = render(<RelativeTimeTag dateTime="invalid" />);

    const time = container.querySelector('time');
    expect(time).not.toBeInTheDocument();
  });
});
