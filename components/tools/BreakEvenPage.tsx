import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Target, TrendingUp, AlertTriangle, CheckCircle2, AlertCircle, Scale } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const BREAK_EVEN_FAQS: FAQItem[] = [
    {
        question: "O que é Margem de Contribuição?",
        answer: "É o lucro bruto de cada produto. Se você vende uma camisa por R$ 100 e ela custou R$ 60 (tecido + impostos), sua margem de contribuição é R$ 40. São esses R$ 40 que vão ajudar a pagar a luz e o aluguel da loja."
    },
    {
        question: "O Ponto de Equilíbrio inclui meu lucro desejado?",
        answer: "O cálculo padrão mostra onde o lucro é zero. Mas você pode adicionar uma \"Meta de Lucro\" aos seus custos fixos na calculadora. Assim, você descobre quanto precisa vender para pagar tudo E ainda sobrar aquele valor no bolso."
    },
    {
        question: "Por que meu Ponto de Equilíbrio está tão alto?",
        answer: "Geralmente é sinal de Custos Fixos inchados (aluguel caro, equipe ociosa) ou Margem baixa demais (preço errado). A calculadora funciona como um diagnóstico de saúde da empresa."
    },
    {
        question: "Com que frequência devo calcular?",
        answer: "Idealmente, todo mês. Se o aluguel subiu ou o fornecedor aumentou o preço, seu Ponto de Equilíbrio mudou. O empresário que não atualiza esse número está dirigindo no escuro."
    }
];

export const BreakEvenPage: React.FC = () => {
    const [fixedCosts, setFixedCosts] = useState<number>(0);
    const [sellingPrice, setSellingPrice] = useState<number>(0);
    const [variableCosts, setVariableCosts] = useState<number>(0);
    const [desiredProfit, setDesiredProfit] = useState<number>(0);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        calculateBreakEven();
    }, [fixedCosts, sellingPrice, variableCosts, desiredProfit]);

    const calculateBreakEven = () => {
        if (sellingPrice <= 0 || variableCosts >= sellingPrice) {
            setResult({ error: "O Preço de Venda deve ser maior que o Custo Variável." });
            return;
        }

        const contributionMarginUnit = sellingPrice - variableCosts;
        const contributionMarginPercent = contributionMarginUnit / sellingPrice;

        const totalTarget = fixedCosts + desiredProfit;

        const breakEvenUnits = totalTarget / contributionMarginUnit;
        const breakEvenRevenue = totalTarget / contributionMarginPercent;

        setResult({
            contributionMarginUnit,
            contributionMarginPercent,
            breakEvenUnits,
            breakEvenRevenue,
            totalTarget
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const formatNumber = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Ponto de Equilíbrio",
        "description": "Descubra quanto sua empresa precisa vender para cobrir custos e começar a lucrar.",
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
                title="Calculadora de Ponto de Equilíbrio - Break-Even Point Online"
                description="Quanto sua empresa precisa vender para começar a lucrar? Calcule o Ponto de Equilíbrio (Break-Even) financeiro e descubra sua meta mínima de vendas."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Ponto de Equilíbrio', href: '/calculadoras/ponto-de-equilibrio' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Scale className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-gray-300">Gestão Financeira</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Ponto de Equilíbrio</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Sua empresa está no vermelho ou no azul? Descubra exatamente quanto você precisa vender para cobrir todos os custos e começar a lucrar de verdade.
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
                                Dados do Negócio
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Custos Fixos Mensais (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={fixedCosts}
                                            onChange={(e) => setFixedCosts(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="Ex: 10000"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Aluguel, salários, internet, etc.</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Preço de Venda Unitário (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={sellingPrice}
                                            onChange={(e) => setSellingPrice(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="Ex: 100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Custo Variável Unitário (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={variableCosts}
                                            onChange={(e) => setVariableCosts(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="Ex: 60"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Matéria-prima, impostos, comissão.</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Meta de Lucro (Opcional)</label>
                                    <div className="relative">
                                        <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={desiredProfit}
                                            onChange={(e) => setDesiredProfit(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="Ex: 5000"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Quanto você quer lucrar além de pagar as contas.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {result && !result.error ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-8"
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Faturamento Necessário</h3>
                                                <div className="text-3xl font-bold text-white mb-2">
                                                    {formatCurrency(result.breakEvenRevenue)}
                                                </div>
                                                <p className="text-sm text-cyan-400 font-medium">
                                                    Para cobrir custos {desiredProfit > 0 ? '+ lucro' : ''}
                                                </p>
                                            </div>

                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Vendas Necessárias</h3>
                                                <div className="text-3xl font-bold text-white mb-2">
                                                    {formatNumber(Math.ceil(result.breakEvenUnits))} <span className="text-lg text-gray-500">unidades</span>
                                                </div>
                                                <p className="text-sm text-indigo-400 font-medium">
                                                    Meta de vendas mensal
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-green-400" />
                                                Análise de Margem
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                                                    <span className="text-gray-300">Margem de Contribuição Unitária</span>
                                                    <span className="text-white font-bold">{formatCurrency(result.contributionMarginUnit)}</span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                                                    <span className="text-gray-300">Margem de Contribuição (%)</span>
                                                    <span className="text-white font-bold">{(result.contributionMarginPercent * 100).toFixed(2)}%</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                                <p className="text-sm text-gray-300">
                                                    <strong>Interpretação:</strong> Para cada produto vendido, sobram <strong>{formatCurrency(result.contributionMarginUnit)}</strong> para pagar os custos fixos {desiredProfit > 0 ? 'e gerar lucro' : ''}.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : result?.error ? (
                                    <div className="flex flex-col items-center justify-center h-full py-12">
                                        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                                        <p className="text-red-400 text-lg text-center font-bold">{result.error}</p>
                                        <p className="text-gray-500 text-center mt-2">Aumente o preço ou reduza os custos variáveis.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Scale className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para descobrir seu ponto de equilíbrio</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O que é o Ponto de Equilíbrio?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                O Ponto de Equilíbrio (ou Break-Even Point) é o número mágico onde as Receitas da sua empresa se igualam às Despesas. Nesse ponto, o lucro é zero, mas o prejuízo também é zero.
                            </p>
                            <p className="mb-4">
                                É a meta mínima de sobrevivência. Cada real vendido acima desse ponto é lucro líquido. Cada real vendido abaixo significa que você está pagando para trabalhar. Saber esse número não é opcional; é a diferença entre uma empresa que cresce e uma que fecha as portas.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">A Matemática do Lucro</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2">1. Custos Fixos</h3>
                                <p className="text-sm text-gray-400">Contas que chegam todo mês, venda você ou não (Aluguel, salários, internet).</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2">2. Custos Variáveis</h3>
                                <p className="text-sm text-gray-400">Gastos atrelados à venda (Matéria-prima, comissão, impostos).</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2">3. Margem de Contribuição</h3>
                                <p className="text-sm text-gray-400">Quanto sobra de cada venda para pagar os custos fixos.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como interpretar o resultado?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">
                                A calculadora vai te dar dois números cruciais:
                            </p>
                            <ul className="space-y-4 mb-6">
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2.5 flex-shrink-0" />
                                    <span><strong>Em Valor (R$):</strong> "Preciso faturar R$ 50.000,00 por mês para empatar."</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2.5 flex-shrink-0" />
                                    <span><strong>Em Quantidade (Unidades):</strong> "Preciso vender 500 unidades para empatar."</span>
                                </li>
                            </ul>
                            <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Alerta Vermelho</h4>
                                <p className="text-sm text-gray-300">
                                    Se a sua meta de vendas atual é menor que o Ponto de Equilíbrio, você tem três saídas: Cortar custos fixos, Negociar custos variáveis ou Aumentar o preço.
                                </p>
                            </div>
                        </div>
                    </section>

                    <FAQ
                        items={BREAK_EVEN_FAQS}
                        title="Dúvidas Frequentes"
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
