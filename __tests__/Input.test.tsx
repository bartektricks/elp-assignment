import { render, screen } from '@testing-library/react';
import Input from '../app/components/Input';

const INPUT_ICON_CLASSES = 'pr-8 pl-4';

describe('Input', () => {
  test('should render with default styles - no icon', () => {
    render(<Input data-testid="input" type="text" />);

    const input = screen.getByTestId('input');

    expect(input).toBeInTheDocument();
    expect(screen.queryByTestId('input-icon')).not.toBeInTheDocument();
    expect(input).toHaveClass('disabled:opacity-30'); // Should have classes for disabled styles
    expect(input).not.toHaveClass(INPUT_ICON_CLASSES);
  });

  test('should render with icon styles', () => {
    render(
      <Input
        data-testid="input"
        type="text"
        icon={<img data-testid="img" src="/test.jpg" alt="test" />}
      />,
    );

    const input = screen.getByTestId('input');

    expect(input).toBeInTheDocument();
    expect(screen.queryByTestId('input-icon')).toBeInTheDocument();
    expect(input).toHaveClass(INPUT_ICON_CLASSES);
  });
});
