import { defineConfig, defineTextStyles } from '@pandacss/dev';

const textStyles = defineTextStyles({
  xl: {
    value: {
      fontSize: '26px',
      lineHeight: '32px',
    },
  },
  l: {
    value: {
      fontSize: '20px',
      lineHeight: '32px',
    },
  },
  m: {
    value: {
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  s: {
    value: {
      fontSize: '14px',
      lineHeight: '18px',
    },
  },
  xs: {
    value: {
      fontSize: '13px',
      lineHeight: '16px',
    },
  },
  xxs: {
    value: {
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
});

export default defineConfig({
  preflight: true,
  include: ['./app/**/*.{ts,tsx}'],
  theme: {
    tokens: {
      colors: {
        blue: {
          value: '#166CD7',
        },
        orange: {
          value: '#FB8D77',
        },
        lightBlue2: {
          value: '#DEF4FF',
        },
        lightBlue: {
          value: '#B9CFF1',
        },
        darkestGray: {
          value: '#24292F',
        },
        darkGray2: {
          value: '#6F7781',
        },
        darkGray1: {
          value: '#8D959F',
        },
        white: {
          value: '#FFF',
        },
        lightGray3: {
          value: '#D0D7DE',
        },
        lightGray2: {
          value: '#EFF1F3',
        },
        lightGray1: {
          value: '#F3F5F7',
        },
      },
    },
    textStyles,
  },
  globalCss: {
    html: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
    },
  },
  outdir: 'styled-system',
});
