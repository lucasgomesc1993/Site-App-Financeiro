
import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Testimonial } from '../types';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

// Helper for the card component
const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => (
    <div className="relative w-[350px] md:w-[400px] bg-[#141414]/80 border border-white/5 p-6 rounded-2xl flex-shrink-0 hover:bg-[#1a1a1a] transition-colors duration-300 group backdrop-blur-md">
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
        </div>

        <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div>
                    <h4 className="text-white font-semibold text-sm">{t.name}</h4>
                    <span className="text-xs text-gray-400">{t.handle}</span>
                </div>
            </div>
            <Quote className="w-5 h-5 text-primary/30" />
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light relative z-10">
            "{t.text}"
        </p>

        <div className="flex items-center gap-1">
            {'★★★★★'.split('').map((star, i) => (
                <span key={i} className="text-[10px] text-[#f5c518]">{star}</span>
            ))}
        </div>
    </div>
);

export const Testimonials: React.FC = () => {
    // Split testimonials into two rows for visual variety
    const firstRow = TESTIMONIALS.slice(0, 5);
    const secondRow = TESTIMONIALS.slice(5, 10);

    return (
        <section id="depoimentos" className="py-24 md:py-32 relative bg-[#0d0d0d] overflow-hidden max-w-[100vw]">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
            <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 mb-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight">
                        O fim da <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">ansiedade financeira</span>
                    </h3>
                    <p className="text-lg text-muted max-w-2xl mx-auto font-light">
                        Junte-se a milhares de pessoas que transformaram sua relação com o dinheiro usando apenas o WhatsApp e a nossa IA.
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="flex flex-col gap-8 relative">
                {/* Left and Right Fade Masks */}
                <div className="absolute top-0 left-0 h-full w-24 md:w-48 bg-gradient-to-r from-[#0d0d0d] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 h-full w-24 md:w-48 bg-gradient-to-l from-[#0d0d0d] to-transparent z-20 pointer-events-none"></div>

                {/* Row 1 - Moves Left */}
                <div className="flex overflow-hidden select-none">
                    <motion.div
                        className="flex gap-6 pr-6"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40
                        }}
                    >
                        {[...firstRow, ...firstRow, ...firstRow].map((t, idx) => (
                            <TestimonialCard key={`row1-${idx}`} t={t} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 - Moves Right */}
                <div className="flex overflow-hidden select-none">
                    <motion.div
                        className="flex gap-6 pr-6"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 45
                        }}
                    >
                        {[...secondRow, ...secondRow, ...secondRow].map((t, idx) => (
                            <TestimonialCard key={`row2-${idx}`} t={t} />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Fade Mask - Added for smooth disappearance */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent z-20 pointer-events-none"></div>
        </section>
    );
};
