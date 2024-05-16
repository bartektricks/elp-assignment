import postcss from 'postcss';
import tailwind from 'tailwindcss';
import generateFonts from './generateFontsPlugin';

// TODO: make an util test function if needed
const generatePluginCss = async () => {
  const res = await postcss(
    tailwind({
      content: [
        {
          raw: 'md:typography-xs', // generate one util class
        },
      ],
      safelist: [
        {
          pattern: /./, // match all
        },
      ],
      corePlugins: [], // disable all core plugins to remove all default CSS classes
      plugins: [generateFonts()],
    }),
  ).process('@tailwind utilities', {
    from: undefined,
  });

  return res.css;
};

test('should generate typography classes', async () => {
  const css = await generatePluginCss();

  expect(css).contain('typography-');
  expect(css).contain('line-height');
  expect(css).contain('font-size');

  expect(css).toContain('.md\\:typography-xs');
});
