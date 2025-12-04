import React, { useState } from 'react';
import { Flame, Users, Clock, ShoppingCart, HelpCircle, Lightbulb, Beer, Utensils, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const BARBECUE_FAQS: FAQItem[] = [
    {
        question: "Quanto carvão eu preciso?",
        answer: "Em média, 1 saco de 5kg de carvão é suficiente para assar 6kg de carne. Tenha sempre um saco extra de reserva, pois o vento influencia o consumo."
    },
    {
        question: "Como calcular a cerveja?",
        answer: "Considere que cada adulto bebe, em média, 1,5 a 2 litros de cerveja (4 a 6 latas) em um churrasco de 4 horas. Se estiver muito calor, aumente essa margem."
    },
    {
        question: "O que servir de acompanhamento?",
        answer: "Para economizar na carne sem deixar ninguém com fome, invista nos acompanhamentos: pão de alho, farofa, vinagrete, salada de maionese e arroz são essenciais."
    },
    {
        question: "Qual a regra dos 400g?",
        answer: "Para um churrasco padrão de até 4 horas, calcula-se: Homens (400g-500g), Mulheres (300g-400g) e Crianças (150g-200g) de carne."
    }
];

export function BarbecueCalculatorPage() {
    const [men, setMen] = useState('');
    const [women, setWomen] = useState('');
    const [children, setChildren] = useState('');
    const [duration, setDuration] = useState<'standard' | 'long'>('standard');
    const [result, setResult] = useState<{ meat: number; beer: number; soda: number; charcoal: number } | null>(null);

    const calculateBarbecue = () => {
        const numMen = parseInt(men) || 0;
        const numWomen = parseInt(women) || 0;
        const numChildren = parseInt(children) || 0;

        if (numMen === 0 && numWomen === 0 && numChildren === 0) {
            setResult(null);
            return;
        }

        // Base consumption (Standard duration <= 4h)
        let meatMen = 0.4; // kg
        let meatWomen = 0.3; // kg
        let meatChildren = 0.15; // kg
        let beerAdults = 1.75; // Liters (approx 5 cans)
        let sodaPerson = 0.5; // Liters

        // Long duration adjustment (> 5h)
        if (duration === 'long') {
            const increase = 1.25; // +25%
            meatMen *= increase;
            meatWomen *= increase;
            meatChildren *= increase;
            beerAdults *= increase;
            sodaPerson *= increase;
        }

        const totalMeat = (numMen * meatMen) + (numWomen * meatWomen) + (numChildren * meatChildren);
        const totalBeer = (numMen + numWomen) * beerAdults;
        const totalSoda = (numMen + numWomen + numChildren) * sodaPerson;
        const totalCharcoal = totalMeat / 6; // 1kg charcoal for 6kg meat (approx, safe margin)

        setResult({
            meat: totalMeat,
            beer: totalBeer,
            soda: totalSoda,
            charcoal: Math.ceil(totalCharcoal) // Round up for bags
        });
    };

    const handleNumberInput = (value: string, setter: (value: string) => void) => {
        const numericValue = value.replace(/\D/g, '');
        setter(numericValue);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Churrasco",
        "description": "Calcule a quantidade de carne, cerveja e carvão para o seu churrasco.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        }
    };

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Calculadora de Churrasco - Quantidade de Carne e Bebida"
                description="Vai fazer churrasco? Calcule a quantidade certa de carne (picanha, linguiça), cerveja, refrigerante e carvão por pessoa. Evite desperdício e economize."
                canonical="/calculadoras/churrasco"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": BARBECUE_FAQS.map(faq => ({
                        "@type": "Question",
                        "name": faq.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer
                        }
                    }))
                })}
            </script>

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de Churrasco', href: '/calculadoras/churrasco' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Flame className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Eventos e Festas</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Churrasco</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Nunca mais deixe faltar carne ou cerveja. Calcule a quantidade ideal para sua festa e evite desperdícios.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-24">
                    {/* Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                                <Users className="w-5 h-5 text-primary" />
                                Convidados e Duração
                            </h2>

                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Homens
                                        </label>
                                        <input
                                            type="text"
                                            value={men}
                                            onChange={(e) => handleNumberInput(e.target.value, setMen)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Mulheres
                                        </label>
                                        <input
                                            type="text"
                                            value={women}
                                            onChange={(e) => handleNumberInput(e.target.value, setWomen)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Crianças
                                    </label>
                                    <input
                                        type="text"
                                        value={children}
                                        onChange={(e) => handleNumberInput(e.target.value, setChildren)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                        placeholder="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Duração da Festa
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setDuration('standard')}
                                            className={`py-3 px-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${duration === 'standard' ? 'bg-primary/20 border-primary text-white' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:bg-white/5'}`}
                                        >
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm font-medium">Até 4 horas</span>
                                        </button>
                                        <button
                                            onClick={() => setDuration('long')}
                                            className={`py-3 px-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${duration === 'long' ? 'bg-primary/20 border-primary text-white' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:bg-white/5'}`}
                                        >
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm font-medium">Mais de 5h</span>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={calculateBarbecue}
                                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 mt-4"
                                >
                                    Calcular Churrasco
                                </button>
                            </div>

                            {result && (
                                <div className="mt-8 p-6 rounded-2xl border bg-white/5 border-white/5 animate-in fade-in slide-in-from-top-4">
                                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                        <ShoppingCart className="w-5 h-5 text-primary" />
                                        Lista de Compras Sugerida
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <Utensils className="w-5 h-5 text-red-400" />
                                                <div>
                                                    <p className="font-medium text-white">Carne Total</p>
                                                    <p className="text-xs text-gray-400">Picanha, Linguiça, Frango</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-white">{result.meat.toFixed(1).replace('.', ',')} kg</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <Beer className="w-5 h-5 text-yellow-400" />
                                                <div>
                                                    <p className="font-medium text-white">Cerveja</p>
                                                    <p className="text-xs text-gray-400">Latas de 350ml: ~{Math.ceil((result.beer * 1000) / 350)}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-white">{result.beer.toFixed(1).replace('.', ',')} L</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center text-[10px] font-bold text-blue-400">H2O</div>
                                                <div>
                                                    <p className="font-medium text-white">Refri / Água</p>
                                                    <p className="text-xs text-gray-400">Garrafas de 2L: ~{Math.ceil(result.soda / 2)}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-white">{result.soda.toFixed(1).replace('.', ',')} L</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <Flame className="w-5 h-5 text-orange-400" />
                                                <div>
                                                    <p className="font-medium text-white">Carvão</p>
                                                    <p className="text-xs text-gray-400">Sacos de 5kg (aprox)</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-white">{result.charcoal} kg</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Sidebar Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <HelpCircle className="w-5 h-5 text-primary" />
                                A Regra dos 400g
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    Para um churrasco padrão de até 4 horas, a conta segura é:
                                </p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li><strong>Homens:</strong> 400g a 500g de carne.</li>
                                    <li><strong>Mulheres:</strong> 300g a 400g de carne.</li>
                                    <li><strong>Crianças:</strong> 150g a 200g de carne.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 p-6 rounded-3xl border border-blue-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                <Lightbulb className="w-5 h-5" />
                                Dica de Mestre
                            </h3>
                            <p className="text-sm text-gray-300">
                                Se o churrasco for durar o dia todo (mais de 5 horas), aumente a quantidade em 20% a 30%. As pessoas tendem a "beliscar" continuamente. Não esqueça dos acompanhamentos (pão de alho, farofa) para saciar a fome!
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Lista de Compras Inteligente</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <Utensils className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-semibold text-white mb-2">1. Entradas (Acalmam a fome)</h3>
                                <p className="text-sm text-gray-400">
                                    Servem para petiscar enquanto a carne principal assa.
                                </p>
                                <ul className="list-disc pl-4 text-sm text-gray-400 mt-2">
                                    <li>Linguiça Toscana</li>
                                    <li>Asinha de Frango (Tulipa)</li>
                                    <li>Coraçãozinho</li>
                                    <li>Pão de Alho e Queijo Coalho</li>
                                </ul>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <Flame className="w-8 h-8 text-orange-400 mb-4" />
                                <h3 className="font-semibold text-white mb-2">2. Prato Principal (As estrelas)</h3>
                                <p className="text-sm text-gray-400">
                                    As carnes nobres que todos esperam.
                                </p>
                                <ul className="list-disc pl-4 text-sm text-gray-400 mt-2">
                                    <li><strong>Grelha (Rápido):</strong> Picanha, Maminha, Contra-filé, Alcatra.</li>
                                    <li><strong>Assados (Lentos):</strong> Costela Gaúcha, Cupim, Costelinha BBQ.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                <FAQ
                    items={BARBECUE_FAQS}
                    title="Dúvidas Frequentes sobre Churrasco"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
