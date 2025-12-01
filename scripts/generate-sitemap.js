import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://site-app-financeiro.vercel.app';

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

const generateSitemap = () => {
    const appPath = path.resolve(__dirname, '../App.tsx');
    const appContent = fs.readFileSync(appPath, 'utf-8');

    // Regex to find Route components with path prop
    // Matches <Route path="/some-path" or <Route path='/some-path'
    const routeRegex = /<Route\s+[^>]*path=["']([^"']+)["']/g;

    const routes = [];
    let match;

    while ((match = routeRegex.exec(appContent)) !== null) {
        const routePath = match[1];

        // Skip dynamic routes with parameters (e.g., /product/:id)
        if (routePath.includes(':')) continue;

        // Skip 404 or catch-all routes if any (usually *)
        if (routePath === '*') continue;

        routes.push({
            path: routePath,
            changefreq: getChangeFreq(routePath),
            priority: getPriority(routePath)
        });
    }

    // Sort routes: Home first, then alphabetical
    routes.sort((a, b) => {
        if (a.path === '/') return -1;
        if (b.path === '/') return 1;
        return a.path.localeCompare(b.path);
    });

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
