import React, { Suspense, lazy } from 'react';
import { Hero } from './Hero';
import { SEO } from './SEO';

// Lazy load non-critical components to reduce initial bundle size
const Hook = lazy(() => import('./Hook').then(module => ({ default: module.Hook })));
const Modules = lazy(() => import('./Modules').then(module => ({ default: module.Modules })));
const Certificate = lazy(() => import('./Certificate').then(module => ({ default: module.Certificate })));
const Community = lazy(() => import('./Community').then(module => ({ default: module.Community })));
const Testimonials = lazy(() => import('./Testimonials').then(module => ({ default: module.Testimonials })));
const Price = lazy(() => import('./Price').then(module => ({ default: module.Price })));
const RecentStories = lazy(() => import('./RecentStories').then(module => ({ default: module.RecentStories })));
const LatestPosts = lazy(() => import('./LatestPosts').then(module => ({ default: module.LatestPosts })));
const FAQ = lazy(() => import('./FAQ').then(module => ({ default: module.FAQ })));

// Loading fallback component
const SectionLoader = () => (
    <div className="py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
);

export const Home: React.FC = () => {
    return (
        <>
            <SEO
                title="Junny - Controle Financeiro Inteligente"
                description="Gerencie suas finanças, calcule férias, rescisão e investimentos com as ferramentas gratuitas da Junny."
                canonical="/"
            />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Junny",
                    "url": "https://junny.com.br",
                    "logo": "https://junny.com.br/favicon.ico",
                    "description": "Organize suas finanças sem sair do chat. A Junny é a maneira mais simples e rápida de controlar seus gastos usando Inteligência Artificial no WhatsApp.",
                    "sameAs": []
                })}
            </script>
            <Hero />

            <Suspense fallback={<SectionLoader />}>
                <Hook />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Modules />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Certificate />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Community />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Testimonials />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Price />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <LatestPosts />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <RecentStories />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <FAQ />
            </Suspense>
        </>
    );
};
