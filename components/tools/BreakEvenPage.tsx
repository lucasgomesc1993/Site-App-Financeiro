import React, { useState, useEffect } from 'react';
import { Scale, Calculator, HelpCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const BREAK_EVEN_FAQS: FAQItem[] = [
    {
        question: "O que é Ponto de Equilíbrio?",
        answer: "É o momento em que as receitas da empresa igualam os custos e despesas. Nesse ponto, o lucro é zero, mas também não há prejuízo."
    },
    {
        question: "Para que serve?",
        answer: "Para saber quanto você precisa vender (em valor ou quantidade) apenas para pagar as contas. Tudo que vender acima disso é lucro."
    },
    {
        question: "O que é Margem de Contribuição?",
        answer: "É o quanto sobra do preço de venda após pagar os custos variáveis (impostos, comissões, custo do produto). É esse valor que ajuda a pagar as despesas fixas."
    }
];

export function BreakEvenPage() {
    const [fixedCosts, setFixedCosts] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [variableCosts, setVariableCosts] = useState('');
    const [result, setResult] = useState<{ quantity: number; revenue: number; contributionMargin: number } | null>(null);

    const calculate = () => {
        const fc = parseFloat(fixedCosts.replace(/\./g, '').replace(',', '.') || '0');
        const sp = parseFloat(sellingPrice.replace(/\./g, '').replace(',', '.') || '0');
        const vc = parseFloat(variableCosts.replace(/\./g, '').replace(',', '.') || '0');

        if (sp === 0 || sp <= vc) {
            setResult(null);
            return;
        }

        const contributionMargin = sp - vc;
        const quantity = fc / contributionMargin;
        const revenue = quantity * sp;

        setResult({
            quantity,
            revenue,
            contributionMargin
        });
    };

    useEffect(() => {
        calculate();
    }, [fixedCosts, sellingPrice, variableCosts]);

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
        "name": "Calculadora de Ponto de Equilíbrio",
        "description": "Descubra quanto sua empresa precisa vender para não ter prejuízo. Cálculo de Break-even Point.",
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
                title="Calculadora de Ponto de Equilíbrio - Break-even Point"
                description="Quanto preciso vender para pagar as contas? Calcule o Ponto de Equilíbrio da sua empresa e saiba sua meta mínima de vendas."
                canonical="/calculadoras/ponto-de-equilibrio"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": BREAK_EVEN_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Ponto de Equilíbrio', href: '/calculadoras/ponto-de-equilibrio' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Scale className="w-4 h-4 text-amber-500" />
                            <span className="text-sm text-gray-300">Empresariais</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500">Ponto de Equilíbrio</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Descubra sua meta mínima. Saiba exatamente quanto faturar para cobrir todos os custos.
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
                                    <Calculator className="w-5 h-5 text-amber-500" />
                                    Calcular Break-even
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Custos Fixos Totais (Mensal)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={fixedCosts}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setFixedCosts)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Preço de Venda (Unitário)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={sellingPrice}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setSellingPrice)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Custo Variável (Unitário)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={variableCosts}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setVariableCosts)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4">
                                        <span className="text-sm text-amber-400 block mb-2">Faturamento Necessário</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Qtd. Vendas Necessária</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? Math.ceil(result.quantity).toLocaleString('pt-BR') : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Margem Contribuição</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.contributionMargin.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                                <TrendingUp className="w-5 h-5 text-amber-500" />
                                Análise
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    O Ponto de Equilíbrio mostra o nível de segurança do seu negócio.
                                </p>
                                <ul className="space-y-2 list-disc pl-4">
                                    <li><strong>Abaixo dele:</strong> Prejuízo. Você está pagando para trabalhar.</li>
                                    <li><strong>Acima dele:</strong> Lucro. Cada venda adicional gera riqueza.</li>
                                </ul>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mt-2">
                                    <strong className="text-white block mb-1">Dica</strong>
                                    Reduzir custos fixos ou aumentar a margem de contribuição (preço - custo variável) ajuda a atingir o equilíbrio mais rápido.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={BREAK_EVEN_FAQS}
                    title="Dúvidas sobre Ponto de Equilíbrio"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
