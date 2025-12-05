import React, { useState, useEffect } from 'react';
import { Flame, Calculator, HelpCircle, Users, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const BBQ_FAQS: FAQItem[] = [
    {
        question: "Qual a quantidade de carne por pessoa?",
        answer: "Recomendamos 400g de carne por adulto (se houver acompanhamentos) ou 500g se for apenas carne. Para crianças, considere metade dessa quantidade."
    },
    {
        question: "Como calcular a bebida?",
        answer: "Cerveja: 4 a 6 latas por pessoa que bebe. Refrigerante/Água: 600ml por pessoa."
    },
    {
        question: "O que não pode faltar?",
        answer: "Além das carnes, não esqueça: carvão (1 saco de 5kg para cada 6kg de carne), sal grosso, pão de alho e vinagrete."
    }
];

export function BarbecueCalculatorPage() {
    const [men, setMen] = useState(0);
    const [women, setWomen] = useState(0);
    const [kids, setKids] = useState(0);
    const [duration, setDuration] = useState(4); // hours

    const [result, setResult] = useState<{ meat: number; beer: number; soda: number; coal: number } | null>(null);

    const calculate = () => {
        // Base consumption per person for 4 hours
        // Men: 500g meat, 1500ml beer, 500ml soda
        // Women: 350g meat, 1000ml beer, 600ml soda
        // Kids: 200g meat, 0ml beer, 800ml soda

        // Duration factor: +10% per extra hour
        const durationFactor = 1 + Math.max(0, duration - 4) * 0.1;

        const meat = ((men * 0.5) + (women * 0.35) + (kids * 0.2)) * durationFactor;
        const beer = ((men * 1.5) + (women * 1.0)) * durationFactor;
        const soda = ((men * 0.5) + (women * 0.6) + (kids * 0.8)) * durationFactor;
        const coal = meat * 0.8; // approx 1kg coal per 1.2kg meat

        setResult({
            meat: Math.ceil(meat * 10) / 10,
            beer: Math.ceil(beer),
            soda: Math.ceil(soda),
            coal: Math.ceil(coal)
        });
    };

    useEffect(() => {
        calculate();
    }, [men, women, kids, duration]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Churrasco",
        "description": "Calcule a quantidade ideal de carne, bebida e carvão para o seu churrasco.",
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
                title="Calculadora de Churrasco Online - Carne e Bebida"
                description="Vai fazer um churrasco? Calcule a quantidade exata de carne, cerveja e refrigerante por pessoa e evite desperdícios."
                canonical="/calculadoras/churrasco"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": BBQ_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Churrasco', href: '/calculadoras/churrasco' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Flame className="w-4 h-4 text-rose-500" />
                            <span className="text-sm text-gray-300">Dia a Dia e Utilidades</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Churrasco</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto hidden">
                            {/* Description moved below calculator */}
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
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 min-h-[600px]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Users className="w-5 h-5 text-rose-500" />
                                    Convidados
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2 text-center">
                                        <label className="text-sm text-gray-400">Homens</label>
                                        <div className="flex items-center justify-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-xl p-3">
                                            <button onClick={() => setMen(Math.max(0, men - 1))} className="text-gray-400 hover:text-white text-xl font-bold w-8">-</button>
                                            <span className="text-xl font-bold text-white w-8">{men}</span>
                                            <button onClick={() => setMen(men + 1)} className="text-rose-500 hover:text-rose-400 text-xl font-bold w-8">+</button>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <label className="text-sm text-gray-400">Mulheres</label>
                                        <div className="flex items-center justify-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-xl p-3">
                                            <button onClick={() => setWomen(Math.max(0, women - 1))} className="text-gray-400 hover:text-white text-xl font-bold w-8">-</button>
                                            <span className="text-xl font-bold text-white w-8">{women}</span>
                                            <button onClick={() => setWomen(women + 1)} className="text-rose-500 hover:text-rose-400 text-xl font-bold w-8">+</button>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <label className="text-sm text-gray-400">Crianças</label>
                                        <div className="flex items-center justify-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-xl p-3">
                                            <button onClick={() => setKids(Math.max(0, kids - 1))} className="text-gray-400 hover:text-white text-xl font-bold w-8">-</button>
                                            <span className="text-xl font-bold text-white w-8">{kids}</span>
                                            <button onClick={() => setKids(kids + 1)} className="text-rose-500 hover:text-rose-400 text-xl font-bold w-8">+</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 flex justify-between">
                                        <span>Duração do Churrasco</span>
                                        <span className="text-white font-bold">{duration} horas</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="2"
                                        max="12"
                                        value={duration}
                                        onChange={(e) => setDuration(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                    />
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <p className="text-gray-400 text-sm mb-4 text-center">Lista de Compras Estimada</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="block text-2xl font-bold text-white">{result?.meat} kg</span>
                                            <span className="text-xs text-gray-400">Carne</span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="block text-2xl font-bold text-white">{result?.beer} L</span>
                                            <span className="text-xs text-gray-400">Cerveja</span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="block text-2xl font-bold text-white">{result?.soda} L</span>
                                            <span className="text-xs text-gray-400">Refri/Água</span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="block text-2xl font-bold text-white">{result?.coal} kg</span>
                                            <span className="text-xs text-gray-400">Carvão</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center">
                        <p>
                            Garanta que não falte nada (e nem sobre muito). Calcule a quantidade ideal de comida e bebida para seus convidados.
                        </p>
                    </div>

                    {/* Sidebar Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <ShoppingCart className="w-5 h-5 text-rose-500" />
                                Sugestão de Carnes
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Picanha:</strong> A rainha do churrasco. Calcule 1 peça para cada 5-6 pessoas.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Linguiça:</strong> Ótima para entrada. É barata e todo mundo gosta.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Frango:</strong> Coxinha da asa ou coração. Tempere com antecedência.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={BBQ_FAQS}
                    title="Dúvidas sobre Churrasco"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
