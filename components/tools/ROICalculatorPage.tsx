import React, { useState, useEffect } from 'react';
import { BarChart3, Calculator, HelpCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const ROI_FAQS: FAQItem[] = [
    {
        question: "O que é ROI?",
        answer: "Return on Investment (Retorno sobre Investimento). É uma métrica usada para saber quanto dinheiro a empresa ganhou ou perdeu em relação ao valor investido."
    },
    {
        question: "Como calcular?",
        answer: "A fórmula é: (Receita Obtida - Custo do Investimento) / Custo do Investimento. O resultado é multiplicado por 100 para obter a porcentagem."
    },
    {
        question: "Qual um bom ROI?",
        answer: "Depende do setor e do risco. Em campanhas de marketing, um ROI de 500% (5x) é excelente. Em investimentos financeiros conservadores, 10% ao ano pode ser bom."
    }
];

export function ROICalculatorPage() {
    const [investment, setInvestment] = useState('');
    const [revenue, setRevenue] = useState('');
    const [result, setResult] = useState<{ roi: number; profit: number } | null>(null);

    const calculate = () => {
        const inv = parseFloat(investment.replace(/\./g, '').replace(',', '.') || '0');
        const rev = parseFloat(revenue.replace(/\./g, '').replace(',', '.') || '0');

        if (inv === 0) {
            setResult(null);
            return;
        }

        const profit = rev - inv;
        const roi = (profit / inv) * 100;

        setResult({
            roi,
            profit
        });
    };

    useEffect(() => {
        calculate();
    }, [investment, revenue]);

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
        "name": "Calculadora de ROI",
        "description": "Calcule o Retorno sobre Investimento (ROI) de seus projetos ou campanhas de marketing.",
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
                title="Calculadora de ROI - Retorno sobre Investimento"
                description="Valeu a pena? Calcule o ROI de seus investimentos, campanhas de marketing ou projetos e descubra a porcentagem de lucro."
                canonical="/calculadoras/roi"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": ROI_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'ROI', href: '/calculadoras/roi' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <BarChart3 className="w-4 h-4 text-amber-500" />
                            <span className="text-sm text-gray-300">Empresariais</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-purple-500">ROI</span>
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
                                    Calcular Retorno
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor Investido</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={investment}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setInvestment)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor Retornado (Receita)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={revenue}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setRevenue)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4">
                                        <span className="text-sm text-amber-400 block mb-2">ROI (Retorno)</span>
                                        <span className={`text-4xl font-bold ${result && result.roi < 0 ? 'text-red-400' : 'text-white'}`}>
                                            {result ? `${result.roi.toFixed(2)}%` : '---'}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Lucro / Prejuízo</span>
                                        <span className={`text-xl font-bold ${result && result.profit < 0 ? 'text-red-400' : 'text-white'}`}>
                                            {result ? `R$ ${result.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                                <TrendingUp className="w-5 h-5 text-amber-500" />
                                Análise
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <ul className="space-y-2 list-disc pl-4">
                                    <li><strong>ROI Positivo:</strong> Você ganhou dinheiro. Ex: 100% significa que você dobrou o investimento.</li>
                                    <li><strong>ROI Negativo:</strong> Você perdeu dinheiro. O retorno foi menor que o custo.</li>
                                    <li><strong>ROI Zero:</strong> Empate. Você recuperou exatamente o que investiu.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Retorno sobre Investimento. Meça a eficiência dos seus aportes financeiros.
                    </p>
                </div>

                <FAQ
                    items={ROI_FAQS}
                    title="Dúvidas sobre ROI"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
