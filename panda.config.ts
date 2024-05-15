import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  outdir: 'styled-system',
});
