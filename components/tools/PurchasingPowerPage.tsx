import React, { useState, useEffect } from 'react';
import { History, Calculator, HelpCircle, TrendingDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';
import { INFLATION_DATA } from './inflationData';

const INFLATION_FAQS: FAQItem[] = [
    {
        question: "O que é inflação?",
        answer: "É o aumento generalizado dos preços. Quando a inflação sobe, seu dinheiro perde valor, ou seja, você compra menos coisas com a mesma quantia."
    },
    {
        question: "Qual índice é usado?",
        answer: "Esta calculadora utiliza o IPCA (Índice Nacional de Preços ao Consumidor Amplo), que é o índice oficial de inflação do Brasil, medido pelo IBGE."
    },
    {
        question: "Por que corrigir valores?",
        answer: "Para saber quanto um valor do passado valeria hoje. Por exemplo, um salário de R$ 1.000 em 1994 não compra as mesmas coisas que R$ 1.000 hoje."
    }
];

export function PurchasingPowerPage() {
    const [amount, setAmount] = useState('');
    const [startYear, setStartYear] = useState('2000');
    const [endYear, setEndYear] = useState(new Date().getFullYear().toString());
    const [result, setResult] = useState<{ adjustedAmount: number; inflation: number } | null>(null);

    const calculate = () => {
        const val = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
        const start = parseInt(startYear);
        const end = parseInt(endYear);

        if (isNaN(val) || isNaN(start) || isNaN(end) || start >= end) {
            setResult(null);
            return;
        }

        let accumulatedInflation = 1;

        // Simple simulation using mock data structure logic
        // In a real app, we would iterate through monthly indices between dates
        // Here we will filter the annual data from inflationData

        const relevantData = INFLATION_DATA.filter(d => d.year >= start && d.year < end);

        relevantData.forEach(d => {
            accumulatedInflation *= (1 + d.ipca / 100);
        });

        const adjustedAmount = val * accumulatedInflation;

        setResult({
            adjustedAmount,
            inflation: (accumulatedInflation - 1) * 100
        });
    };

    useEffect(() => {
        calculate();
    }, [amount, startYear, endYear]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const years = Array.from({ length: new Date().getFullYear() - 1994 }, (_, i) => 1995 + i);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Poder de Compra (IPCA)",
        "description": "Corrija valores pela inflação (IPCA) e descubra quanto seu dinheiro valia no passado ou quanto precisa valer hoje.",
        "applicationCategory": "FinanceApplication",
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
                title="Calculadora de Inflação - Correção pelo IPCA"
                description="Seu dinheiro perdeu valor? Corrija valores pela inflação oficial (IPCA) e compare o poder de compra entre diferentes anos."
                canonical="/calculadoras/poder-de-compra"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": INFLATION_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Poder de Compra', href: '/calculadoras/poder-de-compra' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <History className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-red-500">Poder de Compra</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Veja como a inflação corroeu seu dinheiro. Corrija valores pelo IPCA histórico.
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
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-emerald-500" />
                                    Corrigir Valor
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor Original</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={amount}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setAmount)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Ano Inicial</label>
                                        <select
                                            value={startYear}
                                            onChange={(e) => setStartYear(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        >
                                            {years.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Ano Final</label>
                                        <select
                                            value={endYear}
                                            onChange={(e) => setEndYear(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        >
                                            {years.filter(y => y > parseInt(startYear)).map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                            <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">Valor Corrigido (Hoje)</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.adjustedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Inflação Acumulada (IPCA)</span>
                                        <span className="text-xl font-bold text-red-400">
                                            {result ? `${result.inflation.toFixed(2)}%` : '---'}
                                        </span>
                                    </div>
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
                                <TrendingDown className="w-5 h-5 text-red-500" />
                                O vilão invisível
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    A inflação é como um imposto invisível. Se você deixa seu dinheiro parado na conta corrente ou embaixo do colchão, ele está perdendo valor todos os dias.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Proteja-se</strong>
                                    Para não perder poder de compra, seus investimentos precisam render, no mínimo, acima da inflação (IPCA).
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={INFLATION_FAQS}
                    title="Dúvidas sobre Inflação"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
