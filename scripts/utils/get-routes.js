import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getBlogRoutes } from './get-blog-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getRoutes() {
    const appPath = path.resolve(__dirname, '../../App.tsx');
    const appContent = fs.readFileSync(appPath, 'utf-8');

    // Regex to find Route components with path prop
    const routeRegex = /<Route\s+[^>]*path=["']([^"']+)["']/g;

    const routes = [];
    let match;

    while ((match = routeRegex.exec(appContent)) !== null) {
        const routePath = match[1];

        // Skip dynamic routes with parameters (e.g., /product/:id)
        if (routePath.includes(':')) continue;

        // Skip 404 or catch-all routes if any (usually *)
        if (routePath === '*') continue;

        routes.push({ path: routePath });
    }

    // Add Blog Routes
    const blogRoutes = await getBlogRoutes();
    routes.push(...blogRoutes);

    // Add Story Routes
    const storiesDir = path.resolve(__dirname, '../../public/stories');
    if (fs.existsSync(storiesDir)) {
        const storyFiles = fs.readdirSync(storiesDir).filter(file => file.endsWith('.html'));
        const storyRoutes = storyFiles.map(file => ({ path: `/stories/${file}` }));
        routes.push(...storyRoutes);
    }

    // Sort routes: Home first, then alphabetical
    routes.sort((a, b) => {
        if (a.path === '/') return -1;
        if (b.path === '/') return 1;
        return a.path.localeCompare(b.path);
    });

    return routes;
}
