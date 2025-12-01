import React from 'react';
import { Hero } from './Hero';
import { SEO } from './SEO';
import { Hook } from './Hook';
import { Modules } from './Modules';
import { Certificate } from './Certificate';
import { Community } from './Community';
import { Testimonials } from './Testimonials';
import { Price } from './Price';
import { FAQ } from './FAQ';

export const Home: React.FC = () => {
    return (
        <>
            <SEO
                title="FinZap - Controle Financeiro Inteligente"
                description="Gerencie suas finanças, calcule férias, rescisão e investimentos com as ferramentas gratuitas do FinZap."
                canonical="/"
            />
            <Hero />
            <Hook />
            <Modules />
            <Certificate />
            <Community />
            <Testimonials />
            <Price />
            <FAQ />
        </>
    );
};
