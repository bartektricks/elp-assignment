import type { Config } from 'tailwindcss';
import generateFontsPlugin from './plugins/generateFontsPlugin';

export default {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
    colors: {
      blue: '#166CD7',
      orange: '#FB8D77',
      'light-blue': {
        1: '#B9CFF1',
        2: '#DEF4FF',
      },
      'darkest-gray': '#24292F',
      'dark-gray': {
        1: '#8D959F',
        2: '#6F7781',
      },
      white: '#FFF',
      'light-gray': {
        1: '#F3F5F7',
        2: '#EFF1F3',
        3: '#D0D7DE',
      },
      transparent: 'transparent',
      current: 'currentColor',
    },
  },
  plugins: [generateFontsPlugin()],
} satisfies Config;
