import React, { useState, useEffect } from 'react';
import { FileText, Calculator, HelpCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const CET_FAQS: FAQItem[] = [
    {
        question: "O que é CET?",
        answer: "CET significa Custo Efetivo Total. É a taxa real que você paga em um empréstimo, somando os juros, tarifas, seguros e impostos (IOF)."
    },
    {
        question: "Por que o CET é maior que a taxa de juros?",
        answer: "Porque a taxa de juros é apenas uma parte do custo. O banco também cobra taxas administrativas e seguros que encarecem a parcela final."
    },
    {
        question: "Como usar o CET para comparar empréstimos?",
        answer: "Sempre compare o CET anual, e não a taxa de juros. A opção com menor CET é a mais barata, mesmo que a taxa de juros pareça maior."
    }
];

export function CETCalculatorPage() {
    const [loanAmount, setLoanAmount] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [months, setMonths] = useState('');
    const [result, setResult] = useState<{ monthlyRate: number; annualRate: number; totalPaid: number } | null>(null);

    const calculate = () => {
        const pv = parseFloat(loanAmount.replace(/\./g, '').replace(',', '.'));
        const pmt = parseFloat(monthlyPayment.replace(/\./g, '').replace(',', '.'));
        const n = parseInt(months);

        if (isNaN(pv) || isNaN(pmt) || isNaN(n) || n === 0 || pv === 0) {
            setResult(null);
            return;
        }

        // Calculate IRR (Internal Rate of Return) to find the effective monthly rate
        // PV = PMT * (1 - (1+r)^-n) / r
        // We need to solve for r using Newton-Raphson method
        let r = 0.01; // Initial guess 1%
        for (let i = 0; i < 20; i++) {
            const f = (pmt / r) * (1 - Math.pow(1 + r, -n)) - pv;
            const df = (pmt / r) * (n * Math.pow(1 + r, -n - 1)) - (pmt / (r * r)) * (1 - Math.pow(1 + r, -n));
            const newR = r - f / df;
            if (Math.abs(newR - r) < 0.000001) {
                r = newR;
                break;
            }
            r = newR;
        }

        const monthlyRate = r * 100;
        const annualRate = (Math.pow(1 + r, 12) - 1) * 100;
        const totalPaid = pmt * n;

        setResult({
            monthlyRate,
            annualRate,
            totalPaid
        });
    };

    useEffect(() => {
        calculate();
    }, [loanAmount, monthlyPayment, months]);

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
        "name": "Calculadora de CET (Custo Efetivo Total)",
        "description": "Descubra a taxa real de juros do seu empréstimo ou financiamento calculando o CET.",
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
                title="Calculadora de CET - Custo Efetivo Total Online"
                description="Não seja enganado pelos juros. Calcule o Custo Efetivo Total (CET) do seu empréstimo e descubra quanto você realmente vai pagar."
                canonical="/calculadoras/custo-efetivo-total"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CET_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Custo Efetivo Total (CET)', href: '/calculadoras/custo-efetivo-total' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <FileText className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-300">Empréstimos e Financiamentos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">CET</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Descubra a taxa real do seu empréstimo. O CET revela o custo oculto além dos juros.
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
                                    <Calculator className="w-5 h-5 text-purple-500" />
                                    Calcular Custo Real
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor Recebido (Líquido)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={loanAmount}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setLoanAmount)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Valor que realmente caiu na sua conta.</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Valor da Parcela</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={monthlyPayment}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setMonthlyPayment)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Prazo (Meses)</label>
                                        <input
                                            type="text"
                                            value={months}
                                            onChange={(e) => handleNumberInput(e.target.value, setMonths)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="Ex: 24"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center">
                                            <span className="text-xs text-purple-400 block mb-1">CET Mensal</span>
                                            <span className="text-2xl font-bold text-white">
                                                {result ? `${result.monthlyRate.toFixed(2)}%` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center">
                                            <span className="text-xs text-purple-400 block mb-1">CET Anual</span>
                                            <span className="text-2xl font-bold text-white">
                                                {result ? `${result.annualRate.toFixed(2)}%` : '---'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Total a Pagar</span>
                                        <span className="text-xl font-bold text-white">
                                            {result ? `R$ ${result.totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                                <AlertTriangle className="w-5 h-5 text-purple-500" />
                                Atenção às Taxas
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    Muitas vezes o banco anuncia uma taxa de juros de 1,99% a.m., mas quando você calcula o CET, ele salta para 2,50% ou mais.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">O que encarece?</strong>
                                    Seguro Prestamista, Tarifa de Cadastro (TAC), IOF e Taxas de Avaliação. Tudo isso entra no cálculo do CET.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={CET_FAQS}
                    title="Dúvidas sobre CET"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
