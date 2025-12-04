import React, { useState, useEffect } from 'react';
import { Car, Fuel, MapPin, Users, DollarSign, HelpCircle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const TRAVEL_FAQS: FAQItem[] = [
    {
        question: "Etanol ou Gasolina?",
        answer: "Na estrada, gasolina costuma ser melhor pela autonomia (rende ~30% mais), evitando paradas. O etanol vale a pena se custar menos de 70% do preço da gasolina, mas considere a autonomia."
    },
    {
        question: "Como dividir os custos da viagem?",
        answer: "A etiqueta da 'carona amiga' sugere dividir apenas os custos variáveis (Combustível + Pedágio). Desgaste do carro e manutenção geralmente ficam por conta do dono, a menos que seja uma viagem muito longa combinada previamente."
    },
    {
        question: "Como economizar combustível na estrada?",
        answer: "Mantenha os pneus calibrados, evite acelerações bruscas, use o ar condicionado em vez de janelas abertas (acima de 80km/h) e não carregue peso desnecessário."
    }
];

export function TravelCostCalculatorPage() {
    // Inputs
    const [distance, setDistance] = useState('');
    const [consumption, setConsumption] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');
    const [tolls, setTolls] = useState('');
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [passengers, setPassengers] = useState('1');

    // Results
    const [totalCost, setTotalCost] = useState<number | null>(null);
    const [fuelCost, setFuelCost] = useState<number | null>(null);
    const [costPerPerson, setCostPerPerson] = useState<number | null>(null);
    const [litersNeeded, setLitersNeeded] = useState<number | null>(null);

    const calculate = () => {
        const dist = parseFloat(distance.replace(',', '.'));
        const cons = parseFloat(consumption.replace(',', '.'));
        const price = parseFloat(fuelPrice.replace(',', '.'));
        const tollCost = parseFloat(tolls.replace(',', '.')) || 0;
        const pass = parseInt(passengers) || 1;

        if (isNaN(dist) || isNaN(cons) || isNaN(price) || dist === 0 || cons === 0) {
            setTotalCost(null);
            return;
        }

        const effectiveDistance = isRoundTrip ? dist * 2 : dist;
        const effectiveTolls = isRoundTrip ? tollCost * 2 : tollCost;

        const liters = effectiveDistance / cons;
        const costFuel = liters * price;
        const total = costFuel + effectiveTolls;
        const perPerson = total / pass;

        setLitersNeeded(liters);
        setFuelCost(costFuel);
        setTotalCost(total);
        setCostPerPerson(perPerson);
    };

    useEffect(() => {
        calculate();
    }, [distance, consumption, fuelPrice, tolls, isRoundTrip, passengers]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Viagem",
        "description": "Calcule o custo de combustível e pedágios da sua viagem.",
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
                title="Calculadora de Viagem - Custo de Combustível e Pedágio"
                description="Vai viajar de carro? Simule o custo total da viagem. Calcule o gasto com gasolina, etanol e pedágios para planejar suas férias sem sustos."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de Viagem', href: '/calculadoras/custo-viagem' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Car className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Viagem</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Planeje seu orçamento: saiba exatamente quanto vai gastar com combustível e pedágios e divida os custos com os amigos.
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
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> Distância (km)
                                    </label>
                                    <input
                                        type="text"
                                        value={distance}
                                        onChange={(e) => setDistance(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                        placeholder="Ex: 400"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                            <Fuel className="w-3 h-3" /> Consumo (km/l)
                                        </label>
                                        <input
                                            type="text"
                                            value={consumption}
                                            onChange={(e) => setConsumption(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                            placeholder="Ex: 10"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" /> Preço (R$/l)
                                        </label>
                                        <input
                                            type="text"
                                            value={fuelPrice}
                                            onChange={(e) => setFuelPrice(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                            placeholder="Ex: 5.50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                        <DollarSign className="w-3 h-3" /> Total Pedágios (R$)
                                    </label>
                                    <input
                                        type="text"
                                        value={tolls}
                                        onChange={(e) => setTolls(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                        placeholder="Ex: 50.00"
                                    />
                                </div>

                                <div className="flex items-center justify-between bg-[#0a0a0a] p-3 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="roundTrip"
                                            checked={isRoundTrip}
                                            onChange={(e) => setIsRoundTrip(e.target.checked)}
                                            className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary bg-gray-800"
                                        />
                                        <label htmlFor="roundTrip" className="text-sm text-gray-300 cursor-pointer select-none">
                                            Ida e Volta
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gray-500" />
                                        <select
                                            value={passengers}
                                            onChange={(e) => setPassengers(e.target.value)}
                                            className="bg-transparent text-sm text-gray-300 focus:outline-none text-right"
                                        >
                                            {[1, 2, 3, 4, 5].map(n => (
                                                <option key={n} value={n}>{n} passageiro{n > 1 ? 's' : ''}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <p className="text-center text-gray-400 mb-2">Custo Total da Viagem</p>
                                <div className="text-5xl font-bold text-center text-primary mb-2">
                                    {totalCost !== null ? `R$ ${totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '---'}
                                </div>

                                {totalCost !== null && (
                                    <div className="space-y-2 mt-6 text-sm">
                                        <div className="flex justify-between text-gray-400">
                                            <span>Combustível ({litersNeeded?.toFixed(1)}L):</span>
                                            <span className="text-white">R$ {fuelCost?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400">
                                            <span>Pedágios:</span>
                                            <span className="text-white">R$ {(isRoundTrip ? (parseFloat(tolls.replace(',', '.')) || 0) * 2 : (parseFloat(tolls.replace(',', '.')) || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        {parseInt(passengers) > 1 && (
                                            <div className="flex justify-between text-primary font-medium pt-2 border-t border-white/5">
                                                <span>Por pessoa:</span>
                                                <span>R$ {costPerPerson?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
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
                                <HelpCircle className="w-5 h-5 text-primary" />
                                Como funciona o cálculo?
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    Para chegar ao valor final, cruzamos três informações essenciais:
                                </p>
                                <ul className="space-y-2 list-disc pl-4">
                                    <li><strong>Consumo:</strong> Distância ÷ Autonomia (km/l) = Litros Necessários.</li>
                                    <li><strong>Combustível:</strong> Litros × Preço Médio.</li>
                                    <li><strong>Pedágios:</strong> Soma de todas as tarifas do trajeto.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-green-500/10 p-6 rounded-3xl border border-green-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-400">
                                <Lightbulb className="w-5 h-5" />
                                Dicas de Economia
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>• <strong>Calibre os Pneus:</strong> Pneus murchos aumentam o consumo em até 3%.</li>
                                <li>• <strong>Ar vs. Janelas:</strong> Na estrada, prefira o ar condicionado para evitar resistência aerodinâmica.</li>
                                <li>• <strong>Tags de Pedágio:</strong> Muitas oferecem 5% de desconto na tarifa.</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={TRAVEL_FAQS}
                    title="Dúvidas Frequentes sobre Viagem"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
