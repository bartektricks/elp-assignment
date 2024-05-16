import generateFonts from './generateFonts';
import generatePluginCss from './generatePluginCss';

test('should generate typography classes', async () => {
  const css = await generatePluginCss({
    content: [{ raw: 'md:typography-xs' }], // generate one util class
    plugins: [generateFonts()],
  });

  expect(css).contain('typography-');
  expect(css).contain('line-height');
  expect(css).contain('font-size');

  expect(css).toContain('.md\\:typography-xs');
});
