/// <reference types="vitest" />

import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { coverageConfigDefaults } from 'vitest/config';

installGlobals();

export default defineConfig({
  plugins: [!process.env.VITEST && remix(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    env: loadEnv('test', process.cwd(), ''),
    coverage: {
      enabled: true,
      exclude: [
        '__generated__',
        'build/**',
        'codegen.ts',
        '*.config.*',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
