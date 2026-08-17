import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 1. Leaderboard / Players / Server API Proxy
      '/api/proxy': {
        target: 'http://in2.primenodes.in:19145',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, '/api'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('[VITE PROXY →]', req.method, req.url, '  →  ', options.target + proxyReq.path);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('[VITE PROXY ←]', proxyRes.statusCode, req.url);
          });
          proxy.on('error', (err, req, res) => {
            console.error('[VITE PROXY ERROR]', req.url, '→', err.message);
          });
        },
      },

      // 2. Live Map Proxy
      '/live-map-proxy': {
        target: 'http://play.mralooyt.fun:25880',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/live-map-proxy/, ''),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('[MAP PROXY ERROR]', req.url, '→', err.message);
          });
        },
      },
    },
  },
});