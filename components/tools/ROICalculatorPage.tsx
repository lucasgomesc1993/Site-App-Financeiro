import React, { useState } from 'react';
import { BarChart3, DollarSign, TrendingUp, TrendingDown, HelpCircle, Lightbulb, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const ROI_FAQS: FAQItem[] = [
    {
        question: "Qual é um bom ROI?",
        answer: "Depende do modelo de negócio. Em infoprodutos, 100% é considerado mínimo. No varejo físico, 20% a 30% pode ser excelente devido ao alto volume."
    },
    {
        question: "O que entra no 'Custo do Investimento'?",
        answer: "Tudo! Valor pago aos anúncios, custo da agência/freelancer, ferramentas de e-mail marketing, Custo da Mercadoria Vendida (CMV), impostos, etc. Se esquecer custos, seu ROI será 'mentiroso'."
    },
    {
        question: "ROI de 100% significa que ganhei nada?",
        answer: "Não! Um ROI de 0% significa que você empatou. Um ROI de 100% significa que você recuperou o investimento E lucrou um valor igual. Você dobrou seu capital."
    },
    {
        question: "Qual a diferença entre ROI e ROAS?",
        answer: "ROAS mede o retorno apenas sobre anúncios (mídia). ROI mede o retorno sobre TODOS os custos (mídia, equipe, ferramentas, produto). O ROI é a métrica real de lucratividade."
    }
];

export function ROICalculatorPage() {
    const [revenue, setRevenue] = useState('');
    const [cost, setCost] = useState('');
    const [roi, setRoi] = useState<number | null>(null);

    const calculateROI = () => {
        const rev = parseFloat(revenue.replace(/\./g, '').replace(',', '.')) || 0;
        const cst = parseFloat(cost.replace(/\./g, '').replace(',', '.')) || 0;

        if (cst === 0) {
            setRoi(null);
            return;
        }

        const roiValue = ((rev - cst) / cst) * 100;
        setRoi(roiValue);
    };

    const formatPercentage = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value / 100);
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        const numericValue = value.replace(/\D/g, '');
        const floatValue = parseFloat(numericValue) / 100;
        if (isNaN(floatValue)) {
            setter('');
            return;
        }
        setter(floatValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de ROI",
        "description": "Calcule o Retorno Sobre Investimento (ROI) de suas campanhas e projetos.",
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
                title="Calculadora de ROI - Retorno Sobre Investimento (Marketing e Projetos)"
                description="Sua campanha deu lucro? Calcule o ROI (Return on Investment) de forma simples. Entenda a diferença entre ROI e ROAS e descubra a eficiência real do seu dinheiro."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de ROI', href: '/calculadoras/roi' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <BarChart3 className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Marketing e Vendas</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">ROI</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Sua campanha deu lucro ou prejuízo? Descubra a eficiência real dos seus investimentos e tome decisões baseadas em dados.
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
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                                <DollarSign className="w-5 h-5 text-primary" />
                                Dados do Investimento
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Receita Gerada
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={revenue}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setRevenue)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Total arrecadado com a campanha/projeto.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Custo do Investimento
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={cost}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setCost)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Soma de todos os custos (mídia, ferramentas, equipe, etc).</p>
                                </div>

                                <button
                                    onClick={calculateROI}
                                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 mt-4"
                                >
                                    Calcular ROI
                                </button>
                            </div>

                            {roi !== null && (
                                <div className={`mt-8 p-6 rounded-2xl border ${roi > 0 ? 'bg-green-500/10 border-green-500/20' : roi < 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-gray-500/10 border-gray-500/20'} animate-in fade-in slide-in-from-top-4`}>
                                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Resultado do ROI</h3>
                                    <div className={`text-4xl font-bold mb-4 ${roi > 0 ? 'text-green-400' : roi < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                        {formatPercentage(roi)}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            {roi > 0 ? (
                                                <TrendingUp className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                                            ) : roi < 0 ? (
                                                <TrendingDown className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                                            ) : (
                                                <Target className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                                            )}
                                            <div>
                                                <p className="font-medium text-white mb-1">
                                                    {roi > 0 ? 'O projeto deu lucro!' : roi < 0 ? 'O projeto deu prejuízo.' : 'Ponto de equilíbrio (Zero a Zero).'}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    {roi > 0
                                                        ? `Para cada R$ 1,00 investido, voltaram R$ ${(1 + (roi / 100)).toFixed(2)} (R$ 1,00 de custo + R$ ${(roi / 100).toFixed(2)} de lucro).`
                                                        : roi < 0
                                                            ? `Para cada R$ 1,00 investido, você perdeu R$ ${(Math.abs(roi) / 100).toFixed(2)}.`
                                                            : 'Você recuperou exatamente o valor investido, sem lucro nem prejuízo.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                Entenda o Cálculo
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    <strong className="text-white">A Fórmula:</strong><br />
                                    ROI = [(Receita - Custo) ÷ Custo] × 100
                                </p>
                                <p>
                                    <strong className="text-white">ROI vs ROAS:</strong><br />
                                    ROAS mede o retorno apenas sobre anúncios (mídia). ROI mede o retorno sobre TODOS os custos (mídia, equipe, ferramentas, produto). O ROI é a métrica real de lucratividade.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 p-6 rounded-3xl border border-blue-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                <Lightbulb className="w-5 h-5" />
                                Dica FinZap
                            </h3>
                            <p className="text-sm text-gray-300">
                                É perfeitamente possível ter um ROAS positivo (vendeu bem nos anúncios) e um ROI negativo (a operação foi cara demais e comeu o lucro). Sempre olhe para o ROI final para ter a visão realista da saúde financeira.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como melhorar meu ROI?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <TrendingUp className="w-8 h-8 text-green-400 mb-4" />
                                <h3 className="font-semibold text-white mb-2">Aumentar a Receita</h3>
                                <p className="text-sm text-gray-400">
                                    Melhorar a taxa de conversão, aumentar o preço (ticket médio) ou vender mais vezes para o mesmo cliente (LTV).
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <TrendingDown className="w-8 h-8 text-blue-400 mb-4" />
                                <h3 className="font-semibold text-white mb-2">Diminuir o Custo</h3>
                                <p className="text-sm text-gray-400">
                                    Otimizar campanhas para baixar o custo por clique (CPC) ou negociar melhor com fornecedores e ferramentas.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <FAQ
                    items={ROI_FAQS}
                    title="Dúvidas Frequentes sobre ROI"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
