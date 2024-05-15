import plugin from 'tailwindcss/plugin';
import type { CSSRuleObject } from 'tailwindcss/types/config';

const fontStyles = [
  {
    name: 'xl',
    fontSize: '26px',
    lineHeight: '32px',
  },
  {
    name: 'l',
    fontSize: '20px',
    lineHeight: '32px',
  },
  {
    name: 'm',
    fontSize: '16px',
    lineHeight: '24px',
  },
  {
    name: 's',
    fontSize: '14px',
    lineHeight: '18px',
  },
  {
    name: 'xs',
    fontSize: '13px',
    lineHeight: '16px',
  },
  {
    name: 'xxs',
    fontSize: '12px',
    lineHeight: '16px',
  },
];

const generateFonts = () =>
  plugin(({ addUtilities }) => {
    addUtilities(
      fontStyles.reduce(
        (acc: CSSRuleObject, { name, fontSize, lineHeight }) => {
          acc[`.typography-${name}`] = {
            'font-size': fontSize,
            'line-height': lineHeight,
          };
          return acc;
        },
        {},
      ),
    );
  });

export default generateFonts;
