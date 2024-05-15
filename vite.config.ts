/// <reference types="vitest" />

import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { coverageConfigDefaults } from 'vitest/config';

installGlobals();

export default defineConfig({
  plugins: [!process.env.VITEST && remix(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      enabled: true,
      exclude: [
        '__generated__',
        'build/**',
        'codegen.ts',
        '*.config.*',
        'constants.ts', // static values
        'env.ts', // external library
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
