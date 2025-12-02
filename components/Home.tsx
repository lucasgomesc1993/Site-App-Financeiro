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
import { FAQ } from './FAQ';

export const Home: React.FC = () => {
    return (
        <>
            <SEO
                title="FinZap - Controle Financeiro Inteligente"
                description="Gerencie suas finanças, calcule férias, rescisão e investimentos com as ferramentas gratuitas do FinZap."
                canonical="/"
            />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "FinZap",
                    "url": "https://finzap.io",
                    "logo": "https://finzap.io/favicon.ico",
                    "description": "Organize suas finanças sem sair do chat. O FinZap é a maneira mais simples e rápida de controlar seus gastos usando Inteligência Artificial no WhatsApp.",
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
            <RecentStories />
            <FAQ />
        </>
    );
};
