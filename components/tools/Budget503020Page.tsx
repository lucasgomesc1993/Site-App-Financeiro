import React, { useState, useEffect } from 'react';
import { PieChart, Calculator, HelpCircle, Wallet, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const BUDGET_FAQS: FAQItem[] = [
    {
        question: "O que é a regra 50-30-20?",
        answer: "É um método simples de divisão de orçamento: 50% para necessidades essenciais, 30% para desejos pessoais e 20% para objetivos financeiros (investimentos/dívidas)."
    },
    {
        question: "Posso adaptar as porcentagens?",
        answer: "Claro! A regra é um guia. Se você tem muitas dívidas, pode ser 50-20-30. Se ganha pouco, talvez seja 60-30-10. O importante é ter um plano."
    },
    {
        question: "Onde entram as dívidas?",
        answer: "Pagamento de dívidas deve entrar nos 20% (Objetivos Financeiros). Se a dívida for essencial para viver (ex: aluguel atrasado), pode entrar nos 50% temporariamente."
    }
];

export function Budget503020Page() {
    const [income, setIncome] = useState('');
    const [result, setResult] = useState<{ needs: number; wants: number; savings: number } | null>(null);

    const calculate = () => {
        const val = parseFloat(income.replace(/\./g, '').replace(',', '.'));

        if (isNaN(val) || val === 0) {
            setResult(null);
            return;
        }

        setResult({
            needs: val * 0.50,
            wants: val * 0.30,
            savings: val * 0.20
        });
    };

    useEffect(() => {
        calculate();
    }, [income]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora Regra 50-30-20",
        "description": "Organize seu orçamento mensal com a regra 50-30-20: Necessidades, Desejos e Investimentos.",
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
                title="Calculadora Regra 50-30-20 - Organização Financeira"
                description="Aprenda a dividir seu salário. Use a regra 50-30-20 para equilibrar contas, lazer e investimentos de forma simples."
                canonical="/calculadoras/regra-50-30-20"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": BUDGET_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Regra 50-30-20', href: '/calculadoras/regra-50-30-20' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <PieChart className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Regra 50-30-20</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            O método mais simples para organizar suas finanças e começar a investir.
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
                                    Dividir Orçamento
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Sua Renda Mensal Líquida</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={income}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setIncome)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 space-y-4">
                                    {/* 50% Needs */}
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-blue-400 font-bold block mb-1">50% - Necessidades</span>
                                            <span className="text-xs text-gray-500">Aluguel, contas, mercado</span>
                                        </div>
                                        <span className="text-xl font-bold text-white">
                                            {result ? `R$ ${result.needs.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>

                                    {/* 30% Wants */}
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-purple-400 font-bold block mb-1">30% - Desejos</span>
                                            <span className="text-xs text-gray-500">Lazer, hobbies, streaming</span>
                                        </div>
                                        <span className="text-xl font-bold text-white">
                                            {result ? `R$ ${result.wants.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>

                                    {/* 20% Savings */}
                                    <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-emerald-400 font-bold block mb-1">20% - Objetivos</span>
                                            <span className="text-xs text-gray-500">Investimentos, reserva, dívidas</span>
                                        </div>
                                        <span className="text-xl font-bold text-white">
                                            {result ? `R$ ${result.savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                                <Wallet className="w-5 h-5 text-emerald-500" />
                                Por que funciona?
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    A regra 50-30-20 funciona porque é simples e flexível. Ela garante que você pague suas contas, se divirta hoje e ainda cuide do seu "eu" do futuro.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Prioridade</strong>
                                    Sempre pague a si mesmo primeiro. Assim que receber, separe os 20% dos investimentos antes de gastar com o resto.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={BUDGET_FAQS}
                    title="Dúvidas sobre a Regra"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
