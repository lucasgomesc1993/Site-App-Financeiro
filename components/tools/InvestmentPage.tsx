import React, { useState, useEffect } from 'react';
import { TrendingUp, Calculator, HelpCircle, LineChart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const INVESTMENT_FAQS: FAQItem[] = [
    {
        question: "Qual o melhor investimento hoje?",
        answer: "Não existe um 'melhor' universal. Depende do seu objetivo e prazo. Para reserva de emergência, Tesouro Selic ou CDB com liquidez diária. Para longo prazo, ações ou Tesouro IPCA+."
    },
    {
        question: "O que é CDI?",
        answer: "Certificado de Depósito Interbancário. É a taxa que os bancos usam para emprestar dinheiro entre si. A maioria dos investimentos de Renda Fixa (CDB, LCI, LCA) rende uma porcentagem do CDI."
    },
    {
        question: "LCI e LCA são isentos de IR?",
        answer: "Sim! Para pessoas físicas, LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio) são isentos de Imposto de Renda, o que aumenta a rentabilidade líquida."
    }
];

export function InvestmentPage() {
    const [initialAmount, setInitialAmount] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [years, setYears] = useState('');
    const [rate, setRate] = useState('');
    const [result, setResult] = useState<{ totalInvested: number; totalInterest: number; totalAmount: number } | null>(null);

    const calculate = () => {
        const p = parseFloat(initialAmount.replace(/\./g, '').replace(',', '.'));
        const pmt = parseFloat(monthlyContribution.replace(/\./g, '').replace(',', '.'));
        const t = parseInt(years);
        const r = parseFloat(rate.replace(',', '.'));

        if (isNaN(p) || isNaN(pmt) || isNaN(t) || isNaN(r) || t === 0) {
            setResult(null);
            return;
        }

        const months = t * 12;
        const i = r / 100 / 12; // Monthly rate

        // Future Value of Initial Amount
        const fvInitial = p * Math.pow(1 + i, months);

        // Future Value of Monthly Contributions
        const fvContributions = pmt * (Math.pow(1 + i, months) - 1) / i;

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
    }, [initialAmount, monthlyContribution, years, rate]);

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
        "name": "Simulador de Investimentos",
        "description": "Simule o rendimento de seus investimentos em Renda Fixa (CDB, LCI, LCA, Tesouro Direto) e veja seu patrimônio crescer.",
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
                title="Simulador de Investimentos - Renda Fixa e Juros Compostos"
                description="Veja quanto seu dinheiro pode render. Simule investimentos em CDB, Tesouro Direto, LCI e LCA com nossa calculadora de juros compostos."
                canonical="/calculadoras/investimentos"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": INVESTMENT_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Simulador de Investimentos', href: '/calculadoras/investimentos' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Simulador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">Investimentos</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Projete seu futuro financeiro. Compare rentabilidades e veja o poder dos juros compostos.
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
                                    Simular Rendimento
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
                                        <label className="text-sm text-gray-400">Taxa de Juros Anual (%)</label>
                                        <input
                                            type="text"
                                            value={rate}
                                            onChange={(e) => handleNumberInput(e.target.value, setRate)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="Ex: 10,5"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Prazo (Anos)</label>
                                        <input
                                            type="text"
                                            value={years}
                                            onChange={(e) => handleNumberInput(e.target.value, setYears)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="Ex: 10"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">Valor Total Acumulado</span>
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
                                <LineChart className="w-5 h-5 text-emerald-500" />
                                O Poder dos Juros Compostos
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    Albert Einstein chamou os juros compostos de "a oitava maravilha do mundo". Aquele que entende, ganha. Aquele que não entende, paga.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Dica de Investidor</strong>
                                    O tempo é seu maior aliado. Comece cedo, mesmo que com pouco. A constância dos aportes mensais é mais importante que a rentabilidade no curto prazo.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={INVESTMENT_FAQS}
                    title="Dúvidas sobre Investimentos"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
