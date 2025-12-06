import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ServerDataProvider } from './context/ServerContext';
import App from './App';
import './index.css';

// Get initial data injected by prerender
const initialData = (window as any).__INITIAL_DATA__;

const container = document.getElementById('root') as HTMLElement;

if (container.hasChildNodes()) {
    ReactDOM.hydrateRoot(
        container,
        <React.StrictMode>
            <BrowserRouter>
                <HelmetProvider>
                    <ServerDataProvider value={initialData}>
                        <App />
                    </ServerDataProvider>
                </HelmetProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
} else {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <BrowserRouter>
                <HelmetProvider>
                    <ServerDataProvider value={initialData}>
                        <App />
                    </ServerDataProvider>
                </HelmetProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
}
