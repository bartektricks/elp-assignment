import { render, screen } from '@testing-library/react';
import LanguageTag from '../app/components/LanguageTag';

const NAME = 'TypeScript';

describe('LanguageTag', () => {
  test('should render a name and default color', () => {
    render(<LanguageTag name={NAME} />);

    expect(screen.getByText(NAME)).toBeInTheDocument();

    expect(screen.getByTestId('language-tag-color')).toHaveClass('bg-blue');
    expect(screen.getByTestId('language-tag-color')).toHaveStyle({
      backgroundColor: undefined,
    });
  });

  test('should render a name and set color', () => {
    const color = '#8a2be2';

    render(<LanguageTag name={NAME} color={color} />);

    expect(screen.getByText(NAME)).toBeInTheDocument();

    expect(screen.getByTestId('language-tag-color')).toHaveClass('bg-blue');
    expect(screen.getByTestId('language-tag-color')).toHaveStyle({
      backgroundColor: color,
    });
  });
});
