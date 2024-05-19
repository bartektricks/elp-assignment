/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />

import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { coverageConfigDefaults } from 'vitest/config';

installGlobals();

export default defineConfig({
  plugins: [!process.env.VITEST && remix(), tsconfigPaths(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
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
