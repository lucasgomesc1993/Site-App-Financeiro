import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

interface RenderOptions {
    path: string;
    context?: any;
}

export function render({ path, context = {} }: RenderOptions) {
    const helmetContext = {};

    const html = ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouter location={path}>
                <HelmetProvider context={helmetContext}>
                    <App />
                </HelmetProvider>
            </StaticRouter>
        </React.StrictMode>
    );

    return { html, helmetContext };
}
