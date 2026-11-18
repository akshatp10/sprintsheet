import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],

    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:5000',
          changeOrigin: true,

          configure: (proxy) => {
            proxy.on('proxyReq', (_proxyReq, req) => {
              console.log('[proxy request]', req.method, req.url);
            });

            proxy.on('proxyRes', (proxyRes, req) => {
              console.log('[proxy response]', req.url, proxyRes.statusCode);
            });

            proxy.on('error', (err) => {
              console.error('[proxy error]', err.message);
            });
          },
        },
      },
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
