import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ServerDataProvider } from './context/ServerContext';
import { Writable } from 'stream';
import App from './App';
import './index.css';

interface RenderOptions {
    path: string;
    context?: any;
    initialData?: any;
}

export async function render({ path, context = {}, initialData = null }: RenderOptions) {
    const helmetContext = {};

    return new Promise((resolve, reject) => {
        let html = '';
        const stream = new Writable({
            write(chunk, _encoding, callback) {
                html += chunk.toString();
                callback();
            }
        });

        const { pipe } = renderToPipeableStream(
            <React.StrictMode>
                <StaticRouter location={path}>
                    <HelmetProvider context={helmetContext}>
                        <ServerDataProvider value={initialData}>
                            <App />
                        </ServerDataProvider>
                    </HelmetProvider>
                </StaticRouter>
            </React.StrictMode>,
            {
                onAllReady() {
                    pipe(stream);
                },
                onError(error) {
                    reject(error);
                }
            }
        );

        stream.on('finish', () => {
            resolve({ html, helmetContext });
        });
    });
}
