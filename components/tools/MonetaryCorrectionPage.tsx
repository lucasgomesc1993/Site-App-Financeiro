import React, { useState, useEffect } from 'react';
import { TrendingUp, Calculator, LineChart, Calendar, ArrowRight, AlertCircle, Coins, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const CORRECTION_FAQS: FAQItem[] = [
    {
        question: "Qual índice devo usar?",
        answer: "O IPCA é o índice oficial da inflação no Brasil, usado para corrigir salários e contratos de aluguel residenciais recentes. O IGP-M é comum em contratos de aluguel antigos e reajustes de tarifas públicas. A Poupança (TR) é usada para correção de depósitos judiciais e financiamentos imobiliários antigos."
    },
    {
        question: "Como funciona a correção monetária?",
        answer: "A correção monetária não é um ganho real, mas sim uma atualização do valor do dinheiro no tempo para que ele não perca poder de compra devido à inflação. R$ 100 hoje compram menos que R$ 100 há um ano."
    },
    {
        question: "O que é correção pro-rata die?",
        answer: "É a correção proporcional aos dias. Se um índice mensal é 1%, mas você quer corrigir apenas por 15 dias, aplica-se a taxa proporcional àquele período, não o mês cheio."
    }
];

export function MonetaryCorrectionPage() {
    const [initialValue, setInitialValue] = useState('');
    const [indexRate, setIndexRate] = useState('');
    const [months, setMonths] = useState('');
    const [result, setResult] = useState<{ finalValue: number; difference: number } | null>(null);

    const calculate = () => {
        const principal = parseFloat(initialValue.replace(/\./g, '').replace(',', '.') || '0');
        const rate = parseFloat(indexRate.replace(/\./g, '').replace(',', '.') || '0');

        // Simple Correction: Value * (1 + rate/100)
        // Ideally compound interest if rate is monthly and we have months, but usually user inputs "Accumulated Rate" for the period.
        // Let's assume input is "Taxa Acumulada no Período".

        if (principal === 0) {
            setResult(null);
            return;
        }

        const correctionFactor = 1 + (rate / 100);
        const finalValue = principal * correctionFactor;

        setResult({
            finalValue,
            difference: finalValue - principal
        });
    };

    useEffect(() => {
        calculate();
    }, [initialValue, indexRate]);

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
        "name": "Calculadora de Correção Monetária",
        "description": "Atualize valores pela inflação (IPCA, IGP-M). Calcule quanto seu dinheiro deveria valer hoje.",
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
                title="Calculadora de Correção Monetária (IPCA, IGP-M)"
                description="Atualize dívidas, aluguéis ou contratos. Simule a correção de valores por índices de inflação de forma simples."
                canonical="/calculadoras/correcao-monetaria"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CORRECTION_FAQS.map(faq => ({
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
                        { label: 'Correção Monetária', href: '/calculadoras/correcao-monetaria' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Correção Monetária</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Descubra o valor atualizado de uma quantia antiga. Proteja seu patrimônio da erosão da inflação.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Form */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-emerald-500" />
                                    Calcular Correção
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor Original</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={initialValue}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setInitialValue)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Índice Acumulado no Período (%)</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={indexRate}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9,.]/g, '');
                                                setIndexRate(val);
                                            }}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="Ex: 5,45"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Consulte o acumulado do IPCA ou IGP-M para o período desejado (ex: últimos 12 meses).
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center">
                                        <span className="text-sm text-emerald-400 block mb-2">Valor Atualizado</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.finalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                        {result && (
                                            <p className="text-sm text-gray-400 mt-2">
                                                Correção: + R$ {result.difference.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Context */}
                    <div className="lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                    <History className="w-5 h-5 text-emerald-500" />
                                    Principais Índices
                                </h3>
                                <div className="space-y-3">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <div className="flex justify-between items-center mb-1">
                                            <strong className="text-white">IPCA</strong>
                                            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Oficial</span>
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            Índice de Preços ao Consumidor Amplo. Mede a inflação oficial do país.
                                        </p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <div className="flex justify-between items-center mb-1">
                                            <strong className="text-white">IGP-M</strong>
                                            <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Aluguéis</span>
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            Índice Geral de Preços do Mercado. Muito influenciado pelo dólar.
                                        </p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <div className="flex justify-between items-center mb-1">
                                            <strong className="text-white">INPC</strong>
                                            <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Salários</span>
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            Índice Nacional de Preços ao Consumidor. Foca em famílias de menor renda.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-emerald-200">Não perdeu, mas não ganhou</p>
                                    <p className="text-xs text-emerald-200/70">
                                        Corrigir um valor pela inflação apenas mantém seu poder de compra. Para ganhar dinheiro, você precisa de um investimento que pague <strong>Acima da Inflação</strong> (Juro Real).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-teal-500/10 p-3 rounded-xl shrink-0">
                            <Coins className="w-6 h-6 text-teal-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como calcular juros reais?
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Se seu investimento rendeu 10% e a inflação foi 5%, você não ganhou 5%. O cálculo correto é:
                    </p>
                    <div className="bg-black/40 p-4 rounded-xl font-mono text-emerald-400 text-sm md:text-base border border-white/10 text-center">
                        (1 + Rendimento) ÷ (1 + Inflação) - 1
                    </div>
                    <p className="text-gray-400 mt-6">
                        Para simulações de rentabilidade real e crescimento de patrimônio, utilize nossa <Link to="/calculadoras/juros-compostos" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Calculadora de Juros Compostos</Link>.
                    </p>
                </div>

                <FAQ
                    items={CORRECTION_FAQS}
                    title="Perguntas Frequentes"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
