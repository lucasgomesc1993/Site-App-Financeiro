import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

import { getRoutes } from './utils/get-routes.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import(pathToFileURL(toAbsolute('.server-build/entry-server.js')).href);

// Initialize Supabase
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

(async () => {
    const routesToPrerender = await getRoutes();

    // pre-render each route...
    for (const route of routesToPrerender) {
        const url = route.path;
        // Skip static HTML files (like stories)
        if (url.endsWith('.html')) {
            continue;
        }

        let initialData = null;

        // If it's a blog post route (but not a category page), fetch the post data
        if (url.startsWith('/blog/') && !url.startsWith('/blog/categoria')) {
            const slug = url.split('/').pop();
            console.log(`Fetching data for blog post: ${slug}`);

            const { data } = await supabase
                .from('posts')
                .select('*, author:authors(*), category:categories(*)')
                .eq('slug', slug)
                .single();

            initialData = data;
        }

        const appHtml = await render({ path: url, context: {}, initialData });

        let finalHtml = template.replace(`<!--app-html-->`, appHtml.html);

        // Inject Helmet head tags
        const { helmet } = appHtml.helmetContext;

        if (helmet) {
            const helmetHead = `
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${helmet.script.toString()}
        `;
            finalHtml = finalHtml.replace('<meta name="helmet-placeholder" />', helmetHead);
        }

        // Inject the app content
        finalHtml = finalHtml.replace(`<div id="root"></div>`, `<div id="root">${appHtml.html}</div>`);

        // AGGRESSIVE OPTIMIZATION: Remove any modulepreload links that might have slipped in
        // This ensures NO lazy chunks (like recharts) are preloaded/prefetched
        finalHtml = finalHtml.replace(/<link rel="modulepreload".*?>/g, '');

        // Inject initial data for client-side hydration
        if (initialData) {
            const scriptTag = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}</script>`;
            finalHtml = finalHtml.replace('</body>', `${scriptTag}</body>`);
        }

        const filePath = `dist${url === '/' ? '/index.html' : `${url}/index.html`}`;
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(toAbsolute(filePath), finalHtml);
        console.log('pre-rendered:', filePath);
    }
})();
