import { defineConfig } from 'vitest/config';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    css: true
  },
  resolve: {
    alias: {
      '@awseen/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@awseen/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@awseen/types': path.resolve(__dirname, '../../packages/types/src'),
      '@/': path.resolve(__dirname, './')
    }
  }
});
