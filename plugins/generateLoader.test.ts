import generateLoader from './generateLoader';
import generatePluginCss from './generatePluginCss';

test('should generate loader classes', async () => {
  const css = await generatePluginCss({
    content: [
      {
        raw: 'md:loader',
      },
    ],
    plugins: [generateLoader()],
  });

  expect(css).contain('loader');
  expect(css).contain('mask');
  expect(css).contain('-webkit-mask');
});
