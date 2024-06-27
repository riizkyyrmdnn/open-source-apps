import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/open-source-apps/',
  plugins: [vue()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@asset': path.resolve(__dirname, 'src/assets'),
      '@component': path.resolve(__dirname, 'src/components'),
      '@page': path.resolve(__dirname, 'src/pages'),
      '@style': path.resolve(__dirname, 'src/styles'),
    },
  },
})
