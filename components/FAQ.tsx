
import React, { useState } from 'react';
import { FAQS } from '../constants';
// import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';
import { useCalculatorContext } from '../context/CalculatorContext';
import { AuthorBadge } from './AuthorBadge';

interface FAQProps {
    items?: FAQItem[];
    title?: string;
    className?: string;
    showSocialProof?: boolean;
}

export const FAQ: React.FC<FAQProps> = ({ items, title = "Dúvidas frequentes", className = "py-24 md:py-32", showSocialProof = true }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const data = items || FAQS;
    const isCalculator = useCalculatorContext();

    return (
        <section id="faq" className={`px-4 ${className} ${isCalculator ? '-mt-6 !pt-0 bg-transparent' : 'bg-background'}`}>
            <div className={`${isCalculator ? 'max-w-7xl' : 'max-w-3xl'} mx-auto`}>


                {/* Main Card Container with Glow Effect - Conditionally render structure */}
                {isCalculator ? (
                    // Calculator Layout: Grid of open cards
                    <>
                        <div className="text-center mb-8 md:mb-12 relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                                {title}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
                            {data.map((faq, idx) => (
                                <div key={idx} className="group h-full bg-[#0d0d0d] rounded-3xl p-6 md:p-8 border border-white/5 hover:border-primary/20 transition-all duration-300">
                                    <div className='flex items-start gap-4'>
                                        <div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors duration-300'>
                                            <span className="font-bold text-lg">?</span>
                                        </div>
                                        <div className='min-w-0 flex-1'>
                                            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors pr-2">
                                                {faq.question}
                                            </h3>
                                            <div
                                                className="text-gray-400 leading-relaxed text-sm break-words [&>a]:text-blue-400 [&>a]:underline [&>a]:decoration-blue-400/30 hover:[&>a]:text-blue-300"
                                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    // Default Layout: Accordion inside a single card
                    <div className="relative bg-[#0d0d0d] rounded-[40px] p-6 md:p-12 overflow-hidden border border-white/5 shadow-2xl">

                        {/* Glowing Top Border Effect - Stronger Light On */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#47ffb7] to-transparent shadow-[0_0_25px_rgba(71,255,183,1)] z-20"></div>

                        {/* Ambient Top Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-[#47ffb7]/5 blur-[80px] pointer-events-none z-0"></div>

                        {/* Header Section */}
                        <div className="text-center mb-12 md:mb-16 relative z-10">
                            <h3 className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight">
                                {title}
                            </h3>

                            {/* Social Proof */}
                            {showSocialProof && (
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <div className="flex items-center gap-4 bg-white/5 pr-6 pl-2 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0d0d0d] overflow-hidden">
                                                    <img
                                                        src={`https://picsum.photos/100/100?random=${i + 30}`}
                                                        alt="Student"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <div className="flex text-[#f5c518] text-[10px] gap-0.5 mb-0.5">
                                                {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                                            </div>
                                            <span className="text-xs font-medium text-gray-300">6mil + alunos</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQ List */}
                        <div className="flex flex-col relative z-10">
                            {data.map((faq, idx) => {
                                const isOpen = openIndex === idx;
                                return (
                                    <div key={idx} className="border-b border-white/5 last:border-none">
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                                            className="w-full py-5 md:py-8 flex items-start justify-between text-left focus:outline-none group gap-6"
                                        >
                                            <div className="flex flex-col gap-2 md:gap-3 flex-1 pt-1">
                                                <span className={`text-base md:text-xl font-medium transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                                    {faq.question}
                                                </span>
                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}
                                                >
                                                    <div
                                                        className="text-gray-400 text-sm md:text-base leading-relaxed pr-2 md:pr-12 font-light break-words [&>a]:text-blue-400 [&>a]:underline [&>a]:decoration-blue-400/30 hover:[&>a]:text-blue-300"
                                                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Toggle Icon - Specific styling requested */}
                                            <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 mt-1
                                        ${isOpen
                                                    ? 'bg-[#47ffb7]/5 border-[#47ffb7] shadow-[0_0_20px_rgba(71,255,183,0.2)]'
                                                    : 'bg-[#1a1a1a] border-white/10 group-hover:border-[#47ffb7]/50'
                                                }`}
                                            >
                                                {/* Arrows are always the primary green color (#47ffb7) */}
                                                {isOpen ? (
                                                    <ChevronUp size={16} className="text-[#47ffb7] md:w-5 md:h-5" strokeWidth={2} />
                                                ) : (
                                                    <ChevronDown size={16} className="text-[#47ffb7] md:w-5 md:h-5" strokeWidth={2} />
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {isCalculator && <AuthorBadge className="mt-8 md:mt-12" />}
            </div>
        </section>
    );
};
