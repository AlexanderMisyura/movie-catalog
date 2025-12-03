/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/',

  build: {
    outDir: 'dist',
    target: 'esnext',
  },

  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },

  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tsconfigPaths(),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup-tests.ts'],
  },
});
