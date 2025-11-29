import React from 'react';
import { Hero } from './Hero';
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
