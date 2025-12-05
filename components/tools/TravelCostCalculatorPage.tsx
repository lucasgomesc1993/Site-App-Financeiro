import React, { useState, useEffect } from 'react';
import { Car, Calculator, HelpCircle, MapPin, Fuel, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const TRAVEL_FAQS: FAQItem[] = [
    {
        question: "Como calcular o consumo médio do meu carro?",
        answer: "Encha o tanque e zere o hodômetro. Rode até precisar abastecer novamente. Divida a quilometragem rodada pela quantidade de litros que coube no tanque."
    },
    {
        question: "O cálculo inclui desgaste do veículo?",
        answer: "Não, esta calculadora foca nos custos diretos da viagem: combustível e pedágios. Custos de manutenção e depreciação variam muito."
    },
    {
        question: "Como estimar o custo de pedágio?",
        answer: "Recomendamos usar aplicativos de navegação como Waze ou Google Maps, que informam o valor total dos pedágios na rota traçada."
    }
];

export function TravelCostCalculatorPage() {
    const [distance, setDistance] = useState('');
    const [consumption, setConsumption] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');
    const [tolls, setTolls] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const dist = parseFloat(distance.replace(',', '.'));
        const cons = parseFloat(consumption.replace(',', '.'));
        const price = parseFloat(fuelPrice.replace(',', '.'));
        const toll = parseFloat(tolls.replace(',', '.') || '0');

        if (isNaN(dist) || isNaN(cons) || isNaN(price) || cons === 0) {
            setResult(null);
            return;
        }

        const fuelCost = (dist / cons) * price;
        setResult(fuelCost + toll);
    };

    useEffect(() => {
        calculate();
    }, [distance, consumption, fuelPrice, tolls]);

    const handleInput = (value: string, setter: (value: string) => void) => {
        if (/^[\d.,]*$/.test(value)) {
            setter(value);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Custo de Viagem",
        "description": "Calcule quanto vai gastar de combustível e pedágio na sua viagem.",
        "applicationCategory": "TravelApplication",
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
                title="Calculadora de Custo de Viagem - Combustível e Pedágios"
                description="Planeje sua viagem de carro. Calcule o gasto total com combustível e pedágios de forma simples e rápida."
                canonical="/calculadoras/custo-viagem"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": TRAVEL_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Custo de Viagem', href: '/calculadoras/custo-viagem' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Car className="w-4 h-4 text-rose-500" />
                            <span className="text-sm text-gray-300">Dia a Dia e Utilidades</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Custo de Viagem</span>
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
                                    <Calculator className="w-5 h-5 text-rose-500" />
                                    Calcular Custo
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 flex items-center gap-2">
                                            Distância Total (km)
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="text"
                                                value={distance}
                                                onChange={(e) => handleInput(e.target.value, setDistance)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 flex items-center gap-2">
                                            Consumo (km/l)
                                        </label>
                                        <div className="relative">
                                            <Fuel className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="text"
                                                value={consumption}
                                                onChange={(e) => handleInput(e.target.value, setConsumption)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 flex items-center gap-2">
                                            Preço Combustível
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={fuelPrice}
                                                onChange={(e) => handleInput(e.target.value, setFuelPrice)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 flex items-center gap-2">
                                            Pedágios (Total)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={tolls}
                                                onChange={(e) => handleInput(e.target.value, setTolls)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <p className="text-gray-400 text-sm mb-2 text-center">Custo Total Estimado</p>
                                    <div className="text-4xl font-bold text-center mb-2 text-white">
                                        {result !== null ? `R$ ${result.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                    </div>
                                    {result !== null && (
                                        <p className="text-center text-sm text-gray-500">
                                            Apenas ida. Para ida e volta, o valor seria R$ {(result * 2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.
                                        </p>
                                    )}
                                </div>
                            </div>
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
                                <HelpCircle className="w-5 h-5 text-rose-500" />
                                Dicas para Economizar
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Calibragem:</strong> Pneus calibrados economizam até 3% de combustível.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Velocidade:</strong> Manter velocidade constante na estrada reduz o consumo.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Ar Condicionado:</strong> Em altas velocidades, janelas abertas gastam mais que o ar condicionado (devido à aerodinâmica).</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Saiba exatamente quanto vai gastar na estrada. Planeje seu orçamento de viagem com precisão.
                    </p>
                </div>

                <FAQ
                    items={TRAVEL_FAQS}
                    title="Dúvidas sobre Custo de Viagem"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
