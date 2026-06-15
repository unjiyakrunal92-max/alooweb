import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/proxy': {
        target: 'http://premium-01.gladbyte.in:25841/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, ''),
      },
    },
  },
});