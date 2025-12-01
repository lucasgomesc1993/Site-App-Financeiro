import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { getRoutes } from './utils/get-routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import(pathToFileURL(toAbsolute('.server-build/entry-server.js')).href);

const routesToPrerender = getRoutes();

(async () => {
    // pre-render each route...
    for (const url of routesToPrerender) {
        const context = {};
        const appHtml = render({ path: url, context });

        const html = template.replace(`<!--app-html-->`, appHtml.html).replace(`<!--head-meta-->`, ``);
        // Note: You might want to inject helmet data here if you extracted it in render()
        // For now, let's assume Helmet handles it client-side or we need to extract it.
        // The render function returns { html, helmetContext }.

        // Let's improve this to inject Helmet tags.
        const { helmet } = appHtml.helmetContext;

        let finalHtml = html;

        if (helmet) {
            const helmetHead = `
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${helmet.script.toString()}
        `;
            finalHtml = finalHtml.replace('<!--head-meta-->', helmetHead);
        }

        // Inject the app content
        finalHtml = finalHtml.replace(`<div id="root"></div>`, `<div id="root">${appHtml.html}</div>`);

        const filePath = `dist${url === '/' ? '/index.html' : `${url}/index.html`}`;
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(toAbsolute(filePath), finalHtml);
        console.log('pre-rendered:', filePath);
    }
})();
