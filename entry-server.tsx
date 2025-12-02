import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ServerDataProvider } from './context/ServerContext';
import App from './App';
import { ServerAppRoutes } from './ServerAppRoutes';
import './index.css';

interface RenderOptions {
    path: string;
    context?: any;
    initialData?: any;
}

export function render({ path, context = {}, initialData = null }: RenderOptions) {
    const helmetContext = {};

    const html = ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouter location={path}>
                <HelmetProvider context={helmetContext}>
                    <ServerDataProvider value={initialData}>
                        <App>
                            <ServerAppRoutes />
                        </App>
                    </ServerDataProvider>
                </HelmetProvider>
            </StaticRouter>
        </React.StrictMode>
    );

    return { html, helmetContext };
}
