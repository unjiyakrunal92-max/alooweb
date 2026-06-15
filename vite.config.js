import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 1. Leaderboard API Proxy
      '/api/proxy': {
        target: 'http://premium-01.gladbyte.in:25841/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, ''),
      },
      
      // 2. Live Map Proxy (Add this section!)
      '/live-map-proxy': {
        target: 'http://play.mralooyt.fun:25880',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/live-map-proxy/, ''),
      },
    },
  },
});