import React from 'react';
import { Hero } from './Hero';
import { SEO } from './SEO';
import { Hook } from './Hook';
import { Modules } from './Modules';
import { Certificate } from './Certificate';
import { Community } from './Community';
import { Testimonials } from './Testimonials';
import { Price } from './Price';
import { RecentStories } from './RecentStories';
import { LatestPosts } from './LatestPosts';
import { FAQ } from './FAQ';

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
            <Hook />
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
