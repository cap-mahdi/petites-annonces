/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/frontend',
  server:{
    port: 4200,
    host: 'localhost',
  },
  preview:{
    port: 4200,
    host: 'localhost',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@my-app/types': resolve(__dirname, '../../libs/types/src/index.ts'),
      '@my-app/schema': resolve(__dirname, '../../libs/schema/src/index.ts'),
      '@my-app/components': resolve(__dirname, '../../libs/components/src/index.tsx'),
      '@my-app/hooks': resolve(__dirname, '../../libs/hooks/src/index.ts'),
    },
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
