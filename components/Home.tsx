import React, { Suspense, lazy } from 'react';
import { Hero } from './Hero';
import { SEO } from './SEO';
// import { Hook } from './Hook'; // Lazy loaded below
import { Modules } from './Modules';
import { Certificate } from './Certificate';
import { Community } from './Community';
import { Testimonials } from './Testimonials';
import { Price } from './Price';
import { RecentStories } from './RecentStories';
import { LatestPosts } from './LatestPosts';
import { FAQ } from './FAQ';

const Hook = lazy(() => import('./Hook').then(module => ({ default: module.Hook })));

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
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                <Hook />
            </Suspense>
            <Modules />
            <Certificate />
            <Community />
            <Testimonials />
            <Price />
            <LatestPosts />
            <RecentStories />
            <FAQ />
        </>
    );
};
