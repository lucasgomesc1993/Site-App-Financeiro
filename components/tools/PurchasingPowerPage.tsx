import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, History, AlertCircle, Calendar } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';
import { INFLATION_DATA, calculateInflation, InflationIndex } from './inflationData';

const PURCHASING_POWER_FAQS: FAQItem[] = [
    {
        question: "Para que serve esta calculadora?",
        answer: "Ela é útil para atualizar valores de dívidas antigas, saber quanto o seu salário de 10 anos atrás valeria hoje, corrigir valores de venda de imóveis para declaração de ganho de capital ou simplesmente para matar a curiosidade histórica."
    },
    {
        question: "Qual índice devo usar: IPCA ou IGP-M?",
        answer: "Para consumo do dia a dia (salário, compras, gasolina), use o IPCA. Para imóveis e aluguéis, o contrato geralmente estipula o IGP-M (embora muitos tenham migrado para o IPCA recentemente)."
    },
    {
        question: "O que é deflação?",
        answer: "É o contrário da inflação: quando os preços caem. É raro no Brasil, mas acontece em alguns meses específicos. Nossa calculadora já considera esses meses negativos na conta final."
    },
    {
        question: "Se eu guardasse R$ 100 no colchão desde 1994, quanto valeria?",
        answer: "Valeria os mesmos R$ 100 nominais, mas o poder de compra seria irrisório. Você teria perdido mais de 85% da sua capacidade de adquirir bens. Por isso, nunca deixe dinheiro parado. Ele precisa render, no mínimo, a inflação para não virar pó."
    }
];

export const PurchasingPowerPage: React.FC = () => {
    const [initialValue, setInitialValue] = useState<number>(100);
    const [startYear, setStartYear] = useState<number>(1994);
    const [indexType, setIndexType] = useState<InflationIndex>('IPCA');
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const data = calculateInflation(initialValue, startYear, indexType);
        setResult(data);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Poder de Compra (Correção Monetária)",
        "description": "Descubra como a inflação impactou o dinheiro e atualize valores do passado para os dias de hoje.",
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
                title="Calculadora de Poder de Compra - Correção pelo IPCA e IGP-M"
                description="Quanto valia R$ 100 em 1994? Atualize valores passados pela inflação (IPCA/IGP-M) e descubra o poder de compra real do seu dinheiro hoje."
                canonical="/calculadoras/poder-de-compra"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": PURCHASING_POWER_FAQS.map(faq => ({
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
                        { label: 'Poder de Compra', href: '/calculadoras/poder-de-compra' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <History className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Correção Monetária</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Poder de Compra</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            "Quanto valia R$ 100 em 1994?" Descubra como a inflação impactou o dinheiro e atualize valores do passado para os dias de hoje.
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
                                Dados da Correção
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor Original (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Ex: 100"
                                            value={initialValue}
                                            onChange={(e) => setInitialValue(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Ano Inicial</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <select
                                            value={startYear}
                                            onChange={(e) => setStartYear(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                                        >
                                            {INFLATION_DATA.map((data) => (
                                                <option key={data.year} value={data.year}>{data.year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-3">Índice de Correção</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setIndexType('IPCA')}
                                            className={`py-3 px-4 rounded-xl border transition-all ${indexType === 'IPCA' ? 'bg-primary/20 border-primary text-primary font-bold' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}
                                        >
                                            IPCA (IBGE)
                                        </button>
                                        <button
                                            onClick={() => setIndexType('IGPM')}
                                            className={`py-3 px-4 rounded-xl border transition-all ${indexType === 'IGPM' ? 'bg-primary/20 border-primary text-primary font-bold' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}
                                        >
                                            IGP-M (FGV)
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {indexType === 'IPCA' ? 'Ideal para corrigir salários e consumo geral.' : 'Ideal para corrigir aluguéis e contratos.'}
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={handleCalculate}
                                        className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Calcular Correção
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {result ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center">
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Valor Atualizado</h2>
                                            <div className="text-5xl md:text-6xl font-bold text-primary mb-4">
                                                {formatCurrency(result.correctedValue)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Equivalente a {formatCurrency(initialValue)} em {startYear}
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <TrendingUp className="w-5 h-5 text-red-400" />
                                                    <h3 className="font-bold text-white">Inflação Acumulada</h3>
                                                </div>
                                                <span className="text-2xl font-bold text-white">{result.totalInflation.toFixed(2)}%</span>
                                                <p className="text-xs text-gray-500 mt-1">Variação total do período</p>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <History className="w-5 h-5 text-blue-400" />
                                                    <h3 className="font-bold text-white">Multiplicador</h3>
                                                </div>
                                                <span className="text-2xl font-bold text-white">{result.multiplier.toFixed(2)}x</span>
                                                <p className="text-xs text-gray-500 mt-1">Fator de correção aplicado</p>
                                            </div>
                                        </div>

                                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                                            <div className="flex gap-3">
                                                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-bold text-yellow-200 mb-1">O que isso significa?</h4>
                                                    <p className="text-sm text-yellow-500/80 leading-relaxed">
                                                        Para comprar a mesma quantidade de produtos que você comprava com <strong>{formatCurrency(initialValue)}</strong> em {startYear}, hoje você precisaria de aproximadamente <strong>{formatCurrency(result.correctedValue)}</strong>.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <TrendingUp className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para ver a correção</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Fantasma da Inflação</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Você já ouviu seus pais dizerem que "antigamente, com 50 reais a gente fazia a compra do mês"? Eles não estão mentindo. Isso acontece por causa da Inflação, o fenômeno econômico que corrói o poder de compra da moeda ao longo do tempo.
                            </p>
                            <p className="mb-4">
                                Ter R$ 1.000,00 na gaveta em 2010 não é a mesma coisa que ter R$ 1.000,00 hoje. Embora a nota seja a mesma, a quantidade de produtos que ela compra diminuiu drasticamente. Nossa calculadora utiliza os índices oficiais (IPCA e IGP-M) para mostrar essa diferença brutal.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como corrigir um valor pelo tempo?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">
                                Para saber quanto um valor do passado representa no dinheiro de hoje, precisamos aplicar a Correção Monetária. Isso não significa que o dinheiro "rendeu", mas apenas que ele manteve seu poder de compra original.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-black/20 p-6 rounded-2xl">
                                    <h3 className="text-lg font-bold text-white mb-2 text-primary">IPCA (IBGE)</h3>
                                    <p className="text-sm text-gray-400">É a inflação oficial do Brasil. Mede a variação de preços para o consumidor final (comida, transporte, educação). É o índice ideal para corrigir salários e mesadas.</p>
                                </div>
                                <div className="bg-black/20 p-6 rounded-2xl">
                                    <h3 className="text-lg font-bold text-white mb-2 text-primary">IGP-M (FGV)</h3>
                                    <p className="text-sm text-gray-400">Conhecido como a "inflação do aluguel". É muito influenciado pelo dólar e preços de atacado. Usado para corrigir contratos de aluguel e energia.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">A Nostalgia do Plano Real (1994)</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed mb-8">
                            <p>
                                Em julho de 1994, quando o Real foi lançado, a moeda brasileira valia mais que o Dólar.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3">Em 1994</h3>
                                <p className="text-sm text-gray-400">Com R$ 100,00, você enchia um carrinho de supermercado com itens básicos, carne e produtos de limpeza.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3">Hoje</h3>
                                <p className="text-sm text-gray-400">Para comprar os mesmos itens, você precisaria de aproximadamente R$ 800,00 a R$ 1.000,00 (dependendo da região).</p>
                            </div>
                        </div>

                        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl">
                            <h3 className="text-lg font-bold text-white mb-2">💡 O Teste do Big Mac</h3>
                            <p className="text-gray-300 text-sm">
                                Economistas usam o preço do Big Mac para comparar poder de compra. Nos anos 90, um Big Mac custava cerca de R$ 3,00. Hoje, o mesmo sanduíche passa dos R$ 25,00.
                            </p>
                        </div>
                    </section>

                    <FAQ
                        items={PURCHASING_POWER_FAQS}
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
