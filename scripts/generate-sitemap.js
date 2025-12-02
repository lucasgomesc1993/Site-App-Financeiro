import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRoutes } from './utils/get-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://finzap.io';

function getPriority(routePath) {
    if (routePath === '/') return '1.0';
    if (routePath === '/calculadoras') return '0.9';
    if (routePath.startsWith('/calculadoras/')) return '0.8';
    if (['/terms', '/privacy', '/support'].includes(routePath)) return '0.3';
    return '0.7';
}

function getChangeFreq(routePath) {
    if (['/terms', '/privacy', '/support'].includes(routePath)) return 'yearly';
    if (routePath.startsWith('/calculadoras')) return 'weekly';
    return 'monthly';
}

const generateSitemap = async () => {
    const routePaths = await getRoutes();

    const routes = routePaths.map(routePath => ({
        path: routePath,
        changefreq: getChangeFreq(routePath),
        priority: getPriority(routePath)
    }));

    console.log(`Found ${routes.length} routes in App.tsx`);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
            .map(
                (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    const publicDir = path.resolve(__dirname, '../public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');

    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`✅ Sitemap generated at ${sitemapPath}`);
};

generateSitemap();
