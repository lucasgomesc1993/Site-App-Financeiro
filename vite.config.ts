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
    plugins: [
      react(),
      {
        name: 'configure-server',
        configureServer(server) {
          server.middlewares.use('/api/currency', async (req, res, next) => {
            const url = new URL(req.url || '', `http://${req.headers.host}`);
            const pair = url.searchParams.get('pair');
            const days = url.searchParams.get('days');

            if (!pair || !days) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing pair or days parameter' }));
              return;
            }

            try {
              const apiRes = await fetch(`https://economia.awesomeapi.com.br/json/daily/${pair}/${days}`);
              const data = await apiRes.json();
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            } catch (error) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to fetch data' }));
            }
          });
        }
      }
    ],
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
      sourcemap: true,
      cssCodeSplit: true,
      modulePreload: false, // OTIMIZAÇÃO CRÍTICA: Desativa preload agressivo para carregar chunks (como Recharts) SÓ quando necessário
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: isSSR ? undefined : {
            // Remove explicit chunks for lazy libs so they bundle with their consumer
            // 'recharts': ['recharts'], // merged into CurrencyChart
            // 'framer-motion': ['framer-motion'], // optimization via LazyMotion

            // Separa o React Core e Lucide (prevenindo erro de forwardRef)
            'ui-vendor': ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
            // CRÍTICO: Isola o Supabase para não carregar em páginas públicas simples
            'supabase-vendor': ['@supabase/supabase-js', '@supabase/auth-js', '@supabase/realtime-js'],
            // Utilitários de UI
            'ui-utils': ['clsx', 'tailwind-merge', 'date-fns']
          }
        }
      }
    },
    ssr: {
      noExternal: ['react-helmet-async']
    }
  };
});
