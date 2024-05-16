import postcss from 'postcss';
import type { Config } from 'tailwindcss';
import tailwindcss from 'tailwindcss';

type GeneratePluginCssArgs = {
  content?: Config['content'];
  plugins: Config['plugins'];
};

const generatePluginCss = async ({
  content,
  plugins,
}: GeneratePluginCssArgs) => {
  const res = await postcss(
    tailwindcss({
      content: content ?? [{ raw: '' }],
      safelist: [
        {
          pattern: /./, // match all
        },
      ],
      corePlugins: [], // disable all core plugins to remove all default CSS classes
      plugins,
    }),
  ).process(
    `@tailwind base;
    @tailwind components;
    @tailwind utilities;`,
    {
      from: undefined,
    },
  );

  return res.css;
};

export default generatePluginCss;
