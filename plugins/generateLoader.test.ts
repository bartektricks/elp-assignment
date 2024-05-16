import generateLoader from './generateLoader';
import generatePluginCss from './generatePluginCss';

test('should generate loader classes', async () => {
  const css = await generatePluginCss({
    plugins: [generateLoader()],
  });

  // Loader
  expect(css).contain('loader');
  expect(css).contain('mask');
  expect(css).contain('-webkit-mask');

  // Thickness
  expect(css).contain('loader-thickness-0');
  expect(css).contain('loader-thickness-1\\.5');
  expect(css).contain('loader-thickness-10');

  // Color
  expect(css).contain('loader-color-red');
});
