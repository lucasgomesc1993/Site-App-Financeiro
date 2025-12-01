import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isSSR = process.argv.includes('--ssr');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve('.'),
      }
    },
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: isSSR ? undefined : {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'framer': ['framer-motion'],
            'ui-libs': ['lucide-react']
          }
        }
      }
    },
    ssr: {
      noExternal: ['react-helmet-async']
    }
  };
});
