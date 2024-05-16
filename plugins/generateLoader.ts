import plugin from 'tailwindcss/plugin';

const generateLoader = () =>
  plugin(({ matchComponents, theme }) => {
    matchComponents(
      {
        loader: (value: string) => ({
          '--mask':
            'conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box',
          display: 'block',
          '-webkit-mask': 'var(--mask)',
          mask: 'var(--mask)',
          '-webkit-mask-composite': 'source-out',
          maskComposite: 'subtract',
          width: value,
          aspectRatio: '1/1',
          animation: theme('animation.spin'),
          borderRadius: theme('borderRadius.full'),
          padding: theme('spacing.1'),
          backgroundColor: theme('colors.white'),
          '@keyframes spin': theme('keyframes.spin'),
        }),
      },
      { values: theme('spacing') },
    );
    matchComponents(
      {
        'loader-color': (value: string) => ({
          backgroundColor: value,
        }),
      },
      { values: theme('colors') },
    );
    matchComponents(
      {
        'loader-thickness': (value: string) => ({
          padding: value,
        }),
      },
      { values: theme('spacing') },
    );
  });

export default generateLoader;
