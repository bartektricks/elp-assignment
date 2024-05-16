import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  test('should render with default styles', () => {
    const { container } = render(<Input name="text" />);

    expect(container.innerHTML).toContain('opacity-0');
  });

  test('should render with loading styles', () => {
    const { container } = render(<Input type="text" isLoading />);

    expect(container.innerHTML).toContain('opacity-100');
    expect(container.innerHTML).toContain('opacity-30');
  });

  test('disabled should not show the loader', () => {
    const { container } = render(
      <Input type="text" data-testid="input" disabled />,
    );

    expect(screen.getByTestId('input')).toHaveAttribute('disabled');

    expect(container.innerHTML).toContain('opacity-0');
    expect(container.innerHTML).not.toContain('opacity-100');
    expect(container.innerHTML).toContain('opacity-30');
  });

  test('isLoading should trigger disabled state', () => {
    const { container } = render(
      <Input type="text" data-testid="input" isLoading />,
    );

    expect(screen.getByTestId('input')).toHaveAttribute('disabled');
    expect(container.innerHTML).not.toContain('opacity-0');
    expect(container.innerHTML).toContain('opacity-100');
    expect(container.innerHTML).toContain('opacity-30');
  });
});
