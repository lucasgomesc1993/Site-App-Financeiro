import React, { useState, useEffect } from 'react';
import { BarChart3, Calculator, HelpCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const INTEREST_FAQS: FAQItem[] = [
    {
        question: "O que são juros compostos?",
        answer: "São 'juros sobre juros'. O rendimento de cada mês é somado ao capital inicial, e no mês seguinte, o juro é calculado sobre esse novo total maior."
    },
    {
        question: "Qual a diferença para juros simples?",
        answer: "Nos juros simples, o rendimento é sempre calculado apenas sobre o valor inicial. Nos compostos, o rendimento cresce exponencialmente com o tempo."
    },
    {
        question: "Como aproveitar os juros compostos?",
        answer: "Comece a investir o quanto antes e mantenha a regularidade. O tempo é o fator que mais influencia o crescimento exponencial da curva de juros."
    }
];

export function CompoundInterestPage() {
    const [initialAmount, setInitialAmount] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [period, setPeriod] = useState('');
    const [periodType, setPeriodType] = useState<'years' | 'months'>('years');
    const [rateType, setRateType] = useState<'yearly' | 'monthly'>('yearly');
    const [result, setResult] = useState<{ totalInvested: number; totalInterest: number; totalAmount: number } | null>(null);

    const calculate = () => {
        const p = parseFloat(initialAmount.replace(/\./g, '').replace(',', '.'));
        const pmt = parseFloat(monthlyContribution.replace(/\./g, '').replace(',', '.'));
        const r = parseFloat(interestRate.replace(',', '.'));
        const t = parseInt(period);

        if (isNaN(p) || isNaN(pmt) || isNaN(r) || isNaN(t) || t === 0) {
            setResult(null);
            return;
        }

        let months = t;
        if (periodType === 'years') {
            months = t * 12;
        }

        let monthlyRate = r / 100;
        if (rateType === 'yearly') {
            monthlyRate = Math.pow(1 + r / 100, 1 / 12) - 1;
        }

        // Future Value of Initial Amount
        const fvInitial = p * Math.pow(1 + monthlyRate, months);

        // Future Value of Monthly Contributions
        const fvContributions = pmt * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;

        const totalAmount = fvInitial + fvContributions;
        const totalInvested = p + (pmt * months);
        const totalInterest = totalAmount - totalInvested;

        setResult({
            totalInvested,
            totalInterest,
            totalAmount
        });
    };

    useEffect(() => {
        calculate();
    }, [initialAmount, monthlyContribution, interestRate, period, periodType, rateType]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const handleNumberInput = (value: string, setter: (value: string) => void) => {
        if (/^[\d.,]*$/.test(value)) {
            setter(value);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Juros Compostos",
        "description": "Simule o crescimento do seu patrimônio com a força dos juros compostos.",
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
                title="Calculadora de Juros Compostos Online"
                description="Veja a mágica dos juros compostos acontecer. Simule seus investimentos e descubra quanto você terá no futuro."
                canonical="/calculadoras/juros-compostos"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": INTEREST_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Juros Compostos', href: '/calculadoras/juros-compostos' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <BarChart3 className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Juros Compostos</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            A força mais poderosa do universo financeiro. Simule o crescimento exponencial do seu dinheiro.
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
                                    Simular Crescimento
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Valor Inicial</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={initialAmount}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setInitialAmount)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Aporte Mensal</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={monthlyContribution}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setMonthlyContribution)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Taxa de Juros (%)</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={interestRate}
                                                onChange={(e) => handleNumberInput(e.target.value, setInterestRate)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="Ex: 10"
                                            />
                                            <select
                                                value={rateType}
                                                onChange={(e) => setRateType(e.target.value as 'yearly' | 'monthly')}
                                                className="bg-[#0a0a0a] border border-white/10 rounded-xl px-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                                            >
                                                <option value="yearly">Anual</option>
                                                <option value="monthly">Mensal</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Período</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={period}
                                                onChange={(e) => handleNumberInput(e.target.value, setPeriod)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="Ex: 5"
                                            />
                                            <select
                                                value={periodType}
                                                onChange={(e) => setPeriodType(e.target.value as 'years' | 'months')}
                                                className="bg-[#0a0a0a] border border-white/10 rounded-xl px-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                                            >
                                                <option value="years">Anos</option>
                                                <option value="months">Meses</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">Valor Final Total</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Total Investido</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Total em Juros</span>
                                            <span className="text-xl font-bold text-emerald-400">
                                                {result ? `+ R$ ${result.totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
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
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                                Juros sobre Juros
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    A diferença entre juros simples e compostos é brutal no longo prazo.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Exemplo</strong>
                                    Investindo R$ 1.000 por mês a 1% a.m. por 30 anos:
                                    <br />
                                    - Total investido: R$ 360.000
                                    <br />
                                    - Total final: <strong>R$ 3.500.000</strong>
                                    <br />
                                    Os juros geraram 10x mais que o seu trabalho!
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={INTEREST_FAQS}
                    title="Dúvidas sobre Juros Compostos"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
