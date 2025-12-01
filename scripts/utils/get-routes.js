
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getRoutes() {
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

        routes.push(routePath);
    }

    // Sort routes: Home first, then alphabetical
    routes.sort((a, b) => {
        if (a === '/') return -1;
        if (b === '/') return 1;
        return a.localeCompare(b);
    });

    return routes;
}
