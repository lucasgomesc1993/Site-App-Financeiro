import React, { useState, useEffect } from 'react';
import { Flame, Calculator, HelpCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const FIRE_FAQS: FAQItem[] = [
    {
        question: "O que é o movimento FIRE?",
        answer: "FIRE significa 'Financial Independence, Retire Early' (Independência Financeira, Aposentadoria Antecipada). É um estilo de vida focado em economizar agressivamente para se aposentar jovem."
    },
    {
        question: "O que é a Regra dos 4%?",
        answer: "É uma regra prática que diz que você pode retirar 4% do seu patrimônio investido anualmente sem que o dinheiro acabe, considerando a inflação e rendimentos históricos."
    },
    {
        question: "Onde devo investir para o FIRE?",
        answer: "Geralmente em uma carteira diversificada com ações (para crescimento) e renda fixa (para segurança), focando no longo prazo e juros compostos."
    }
];

export function FIREPage() {
    const [monthlyExpense, setMonthlyExpense] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [annualReturn, setAnnualReturn] = useState('8'); // Default 8% real return
    const [result, setResult] = useState<{ fireNumber: number; yearsToFire: number } | null>(null);

    const calculate = () => {
        const expense = parseFloat(monthlyExpense.replace(/\./g, '').replace(',', '.'));
        const savings = parseFloat(currentSavings.replace(/\./g, '').replace(',', '.'));
        const contribution = parseFloat(monthlyContribution.replace(/\./g, '').replace(',', '.'));
        const rate = parseFloat(annualReturn.replace(',', '.'));

        if (isNaN(expense) || isNaN(savings) || isNaN(contribution) || isNaN(rate) || expense === 0) {
            setResult(null);
            return;
        }

        // FIRE Number = Annual Expense / Safe Withdrawal Rate (4% or 0.04)
        // Which is equivalent to Monthly Expense * 300 (25 years * 12 months)
        const fireNumber = expense * 300;

        // Calculate time to reach FIRE Number
        // FV = PV * (1+r)^t + PMT * ((1+r)^t - 1) / r
        // We need to solve for t. This requires a logarithm.
        // Let r be monthly rate
        const r = Math.pow(1 + rate / 100, 1 / 12) - 1;

        // Formula for n (months):
        // n = ln((FV * r + PMT) / (PV * r + PMT)) / ln(1 + r)

        const numerator = fireNumber * r + contribution;
        const denominator = savings * r + contribution;

        let months = 0;
        if (denominator > 0) {
            months = Math.log(numerator / denominator) / Math.log(1 + r);
        }

        setResult({
            fireNumber,
            yearsToFire: Math.max(0, months / 12)
        });
    };

    useEffect(() => {
        calculate();
    }, [monthlyExpense, currentSavings, monthlyContribution, annualReturn]);

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
        "name": "Calculadora FIRE - Independência Financeira",
        "description": "Descubra seu número FIRE e quanto tempo falta para você atingir a independência financeira e se aposentar cedo.",
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
                title="Calculadora FIRE - Independência Financeira"
                description="Quer se aposentar cedo? Calcule seu 'Número FIRE' e descubra quanto tempo falta para atingir a liberdade financeira."
                canonical="/calculadoras/fire"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": FIRE_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora FIRE', href: '/calculadoras/fire' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Flame className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-orange-500">FIRE</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Financial Independence, Retire Early. Descubra quanto você precisa para viver de renda.
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
                                    Calcular Liberdade
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Gasto Mensal Desejado na Aposentadoria</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={monthlyExpense}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setMonthlyExpense)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Patrimônio Atual</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={currentSavings}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setCurrentSavings)}
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

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Rentabilidade Real Anual Esperada (%)</label>
                                    <input
                                        type="text"
                                        value={annualReturn}
                                        onChange={(e) => handleNumberInput(e.target.value, setAnnualReturn)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        placeholder="Ex: 8"
                                    />
                                    <p className="text-xs text-gray-500">Acima da inflação. Média histórica do mercado de ações é ~7-10%.</p>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">Seu Número FIRE</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.fireNumber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                        <p className="text-xs text-gray-400 mt-2">Este é o valor que você precisa acumular.</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Tempo Estimado</span>
                                        <span className="text-2xl font-bold text-white">
                                            {result ? `${result.yearsToFire.toFixed(1)} anos` : '---'}
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
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                                Como funciona?
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    O cálculo baseia-se na "Regra dos 4%". Estudos mostram que se você retirar 4% do seu portfólio inicial por ano (ajustado pela inflação), seu dinheiro tem altíssima probabilidade de durar 30 anos ou mais.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Fórmula Simples</strong>
                                    Pegue seu custo de vida mensal e multiplique por 300. Esse é o seu objetivo.
                                    <br />
                                    Ex: R$ 5.000 x 300 = R$ 1.500.000.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={FIRE_FAQS}
                    title="Dúvidas sobre FIRE"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
