import React, { useState, useEffect } from 'react';
import { TrendingUp, Calculator, HelpCircle, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const MARKUP_FAQS: FAQItem[] = [
    {
        question: "O que é Markup?",
        answer: "É um índice multiplicador aplicado sobre o custo de um produto para formar o preço de venda. Ele deve cobrir os custos fixos, variáveis e garantir a margem de lucro desejada."
    },
    {
        question: "Markup é o mesmo que Margem?",
        answer: "Não! Markup é o índice aplicado SOBRE o custo. Margem é a porcentagem de lucro DENTRO do preço de venda. Um Markup de 100% gera uma Margem de 50%."
    },
    {
        question: "Como calcular?",
        answer: "A fórmula básica é: Preço de Venda = Custo / (1 - (Despesas Variáveis + Despesas Fixas + Lucro Desejado))."
    }
];

export function MarkupPage() {
    const [cost, setCost] = useState('');
    const [fixedExpenses, setFixedExpenses] = useState('');
    const [variableExpenses, setVariableExpenses] = useState('');
    const [profitMargin, setProfitMargin] = useState('');
    const [result, setResult] = useState<{ sellingPrice: number; markup: number } | null>(null);

    const calculate = () => {
        const c = parseFloat(cost.replace(/\./g, '').replace(',', '.') || '0');
        const fe = parseFloat(fixedExpenses.replace(',', '.') || '0');
        const ve = parseFloat(variableExpenses.replace(',', '.') || '0');
        const pm = parseFloat(profitMargin.replace(',', '.') || '0');

        if (c === 0) {
            setResult(null);
            return;
        }

        // Formula: Price = Cost / (1 - ((FE% + VE% + PM%) / 100))
        const totalPercentages = fe + ve + pm;

        if (totalPercentages >= 100) {
            // Impossible to price if costs/margin exceed 100% of price
            setResult(null);
            return;
        }

        const divisor = 1 - (totalPercentages / 100);
        const sellingPrice = c / divisor;
        const markup = ((sellingPrice - c) / c) * 100;

        setResult({
            sellingPrice,
            markup
        });
    };

    useEffect(() => {
        calculate();
    }, [cost, fixedExpenses, variableExpenses, profitMargin]);

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
        "name": "Calculadora de Markup",
        "description": "Calcule o preço de venda ideal dos seus produtos usando o método de Markup.",
        "applicationCategory": "BusinessApplication",
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
                title="Calculadora de Markup - Formação de Preço de Venda"
                description="Não tenha prejuízo! Calcule o preço de venda correto dos seus produtos considerando custos, impostos e margem de lucro."
                canonical="/calculadoras/markup"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": MARKUP_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Markup', href: '/calculadoras/markup' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <TrendingUp className="w-4 h-4 text-amber-500" />
                            <span className="text-sm text-gray-300">Empresariais</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">Markup</span>
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
                                    <Calculator className="w-5 h-5 text-amber-500" />
                                    Calcular Preço
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Custo do Produto (Unitário)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={cost}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setCost)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Despesas Fixas (%)</label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={fixedExpenses}
                                            onChange={(e) => setFixedExpenses(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="Ex: 15"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Despesas Var. (%)</label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={variableExpenses}
                                            onChange={(e) => setVariableExpenses(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="Ex: 10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Lucro Desejado (%)</label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={profitMargin}
                                            onChange={(e) => setProfitMargin(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="Ex: 20"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4">
                                        <span className="text-sm text-amber-400 block mb-2">Preço de Venda Sugerido</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.sellingPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Markup Multiplicador</span>
                                        <span className="text-xl font-bold text-white">
                                            {result ? `${result.markup.toFixed(2)}%` : '---'}
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
                                <DollarSign className="w-5 h-5 text-amber-500" />
                                Entenda os Custos
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <ul className="space-y-2 list-disc pl-4">
                                    <li><strong>Despesas Fixas:</strong> Aluguel, salários, internet (rateados por produto).</li>
                                    <li><strong>Despesas Variáveis:</strong> Impostos sobre venda, comissões, taxas de cartão.</li>
                                    <li><strong>Lucro:</strong> O que sobra limpo para a empresa reinvestir ou distribuir.</li>
                                </ul>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mt-2">
                                    <strong className="text-white block mb-1">Atenção</strong>
                                    Se a soma das porcentagens for próxima de 100%, o preço de venda tenderá ao infinito. Revise seus custos!
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Precifique seus produtos com segurança. Garanta que todos os custos sejam cobertos e o lucro seja real.
                    </p>
                </div>

                <FAQ
                    items={MARKUP_FAQS}
                    title="Dúvidas sobre Precificação"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
