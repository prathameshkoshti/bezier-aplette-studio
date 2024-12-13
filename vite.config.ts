import { resolve } from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/

const alias = {
  '@appTypes': resolve(__dirname, './ui/types'),
  '@components': resolve(__dirname, './ui/components'),
  '@constants': resolve(__dirname, './ui/constants'),
  '@utils': resolve(__dirname, './ui/utils'),
};

export default defineConfig({
  root: './ui',
  plugins: [reactRefresh(), viteSingleFile()],
  resolve: {
    alias,
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: '../dist',
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
