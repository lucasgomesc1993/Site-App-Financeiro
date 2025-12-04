import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Percent, AlertTriangle, TrendingUp, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const MARKUP_FAQS: FAQItem[] = [
    {
        question: "O que é Markup?",
        answer: "Markup é um índice multiplicador aplicado sobre o custo de um produto para definir seu preço de venda. Ele serve para cobrir todas as despesas (fixas e variáveis) e ainda garantir a margem de lucro desejada."
    },
    {
        question: "Qual a diferença entre Markup e Margem de Lucro?",
        answer: "A Margem de Lucro é a porcentagem do preço final que sobra para você (Lucro ÷ Preço Venda). O Markup é a porcentagem que você adiciona ao custo para formar o preço. Eles são matematicamente conectados, mas são números diferentes."
    },
    {
        question: "Como calcular o preço de venda correto?",
        answer: "A fórmula básica do Markup Divisor é: Preço de Venda = Custo / (1 - (%Despesas Variáveis + %Despesas Fixas + %Lucro)). Parece complexo, mas nossa calculadora faz essa conta automaticamente."
    },
    {
        question: "Existe um Markup ideal?",
        answer: "Não existe um número mágico. O Markup ideal depende do seu nicho. Restaurantes costumam ter markups altos (200% a 300%) para cobrir perdas e mão de obra intensiva, enquanto revendas de eletrônicos trabalham com markups menores e ganham na quantidade (giro rápido)."
    }
];

export const MarkupPage: React.FC = () => {
    const [costPrice, setCostPrice] = useState<number>(0);
    const [fixedExpenses, setFixedExpenses] = useState<number>(0);
    const [variableExpenses, setVariableExpenses] = useState<number>(0);
    const [profitMargin, setProfitMargin] = useState<number>(0);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        calculateMarkup();
    }, [costPrice, fixedExpenses, variableExpenses, profitMargin]);

    const calculateMarkup = () => {
        const totalPercentage = fixedExpenses + variableExpenses + profitMargin;

        if (totalPercentage >= 100) {
            setResult({ error: "A soma das porcentagens não pode ser igual ou maior que 100%." });
            return;
        }

        if (costPrice <= 0) {
            setResult(null);
            return;
        }

        const divisor = 1 - (totalPercentage / 100);
        const sellingPrice = costPrice / divisor;
        const grossProfit = sellingPrice - costPrice;
        const netProfit = sellingPrice * (profitMargin / 100);
        const markupMultiplier = sellingPrice / costPrice;

        // Breakdown values
        const fixedValue = sellingPrice * (fixedExpenses / 100);
        const variableValue = sellingPrice * (variableExpenses / 100);

        setResult({
            sellingPrice,
            markupMultiplier,
            grossProfit,
            netProfit,
            fixedValue,
            variableValue,
            totalPercentage
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Markup",
        "description": "Calcule o preço de venda ideal para seus produtos usando Markup.",
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
                title="Calculadora de Markup - Como Precificar Produtos Corretamente"
                description="Pare de ter prejuízo. Aprenda a calcular o preço de venda ideal usando Markup. Cubra custos fixos, variáveis e garanta sua margem de lucro real."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de Markup', href: '/calculadoras/markup' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Tag className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-gray-300">Precificação Inteligente</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Markup</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Você está pagando para trabalhar? Descubra o preço de venda exato para cobrir seus custos e colocar lucro de verdade no bolso.
                        </p>
                    </motion.div>
                </div>

                {/* Calculator Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid lg:grid-cols-12 gap-8 mb-24"
                >
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-primary" />
                                Composição do Preço
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Custo do Produto (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={costPrice}
                                            onChange={(e) => setCostPrice(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="Ex: 50.00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Quanto você pagou pelo produto ou matéria-prima.</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Despesas Fixas (%)</label>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={fixedExpenses}
                                            onChange={(e) => setFixedExpenses(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="Ex: 15"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Aluguel, salários, internet, etc.</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Despesas Variáveis (%)</label>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={variableExpenses}
                                            onChange={(e) => setVariableExpenses(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="Ex: 10 (Impostos, Taxas, Comissão)"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Margem de Lucro Desejada (%)</label>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={profitMargin}
                                            onChange={(e) => setProfitMargin(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="Ex: 20"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Quanto você quer que sobre limpo no bolso.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6">
                            <div className="flex gap-3">
                                <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Cuidado com a Taxa da Maquininha!</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        Não esqueça de incluir a taxa do cartão nas <strong>Despesas Variáveis</strong>. Se sua margem é apertada, essa taxa pode comer todo o seu lucro.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {result && !result.error ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-8"
                                    >
                                        <div className="bg-white/5 rounded-2xl p-8 border border-white/5 text-center">
                                            <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Preço de Venda Sugerido</h3>
                                            <div className="text-5xl font-bold text-white mb-4">
                                                {formatCurrency(result.sellingPrice)}
                                            </div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-bold">
                                                Markup: {result.markupMultiplier.toFixed(2)}x
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-green-400" />
                                                    Lucro Real
                                                </h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400">Lucro Bruto:</span>
                                                        <span className="text-white font-bold">{formatCurrency(result.grossProfit)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400">Lucro Líquido:</span>
                                                        <span className="text-green-400 font-bold">{formatCurrency(result.netProfit)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4 text-red-400" />
                                                    Para onde vai o dinheiro?
                                                </h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400">Custo Produto:</span>
                                                        <span className="text-white font-bold">{formatCurrency(costPrice)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400">Despesas Fixas:</span>
                                                        <span className="text-red-400 font-bold">{formatCurrency(result.fixedValue)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400">Despesas Variáveis:</span>
                                                        <span className="text-red-400 font-bold">{formatCurrency(result.variableValue)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : result?.error ? (
                                    <div className="flex flex-col items-center justify-center h-full py-12">
                                        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                                        <p className="text-red-400 text-lg text-center font-bold">{result.error}</p>
                                        <p className="text-gray-500 text-center mt-2">Reduza as porcentagens para que a soma seja menor que 100%.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Tag className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para calcular o preço ideal</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Por que calcular o Markup é vital?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Muitos empreendedores definem o preço "de cabeça", copiando a concorrência ou apenas multiplicando o custo por 2. O resultado? Prejuízo invisível.
                            </p>
                            <p className="mb-4">
                                O Markup é a ferramenta técnica que garante que cada centavo que sai da sua empresa (impostos, luz, taxas de cartão, comissões) seja pago pelo cliente final na hora da venda. Se o preço estiver errado, quanto mais você vende, mais prejuízo você toma.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Os 3 Pilares do Preço</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2">Custo Direto</h3>
                                <p className="text-sm text-gray-400">Quanto você pagou pelo produto, embalagem ou matéria-prima.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2">Despesas Variáveis</h3>
                                <p className="text-sm text-gray-400">Gastos atrelados à venda (Impostos, Taxa de Cartão, Comissão, Frete).</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2">Despesas Fixas</h3>
                                <p className="text-sm text-gray-400">O "custo de existir" (Aluguel, Internet, Pró-labore, Salários).</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Erro Clássico: Markup vs. Margem</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">
                                Essa é a casca de banana onde 90% dos iniciantes escorregam. Imagine que você comprou uma camisa por R$ 50,00 e quer ter 50% de lucro.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                                    <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> O Jeito Errado</h4>
                                    <p className="text-sm text-gray-300 mb-2">Calcular 50% de R$ 50 (R$ 25) e vender por R$ 75,00.</p>
                                    <p className="text-sm text-red-300 font-bold">Problema: R$ 25 representa apenas 33% de R$ 75. Sua margem real caiu!</p>
                                </div>

                                <div className="p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                                    <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> O Jeito Certo (Markup)</h4>
                                    <p className="text-sm text-gray-300 mb-2">Aplicar o Markup correto. O preço de venda deve ser R$ 100,00.</p>
                                    <p className="text-sm text-green-300 font-bold">Prova: Vendeu por 100 &rarr; Tira 50 (custo) &rarr; Sobra 50 (Lucro). Agora sim, 50%!</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <FAQ
                        items={MARKUP_FAQS}
                        title="Perguntas Frequentes sobre Precificação"
                        className="py-12"
                        showSocialProof={false}
                    />
                </div>

                {/* App Promo Banner */}
                <AppPromoBanner />
            </div>
        </section>
    );
};
