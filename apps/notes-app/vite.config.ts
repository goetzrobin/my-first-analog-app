/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, Plugin, splitVendorChunkPlugin } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    publicDir: 'src/public',

    server: {
      host: '127.0.0.1',
    },
    ssr: {
      noExternal: '@analogjs/trpc/**',
    },

    build: {
      target: ['es2020'],
    },
    plugins: [
      replace({
        preventAssignment: true,
        'http://127.0.0.1:4200': 'https://my-first-analog-app.vercel.app'
      }),
      analog({
        nitro: {
          output: {
            dir: '../../../.vercel/output',
            publicDir: '../../../.vercel/output/static'
          },
        }
      }),
      tsConfigPaths({
        root: '../../',
      }),
      visualizer() as Plugin,
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      cache: {
        dir: `../../node_modules/.vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
