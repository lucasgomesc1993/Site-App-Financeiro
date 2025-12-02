import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, Percent, Clock, BarChart3 } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const COMPOUND_INTEREST_FAQS: FAQItem[] = [
    {
        question: "O que são Juros Compostos?",
        answer: "São os famosos \"juros sobre juros\". Diferente dos juros simples, onde o rendimento é calculado apenas sobre o valor inicial, nos juros compostos o rendimento do mês anterior é somado ao capital e passa a render também no mês seguinte. É o efeito bola de neve."
    },
    {
        question: "Qual a diferença entre Juros Simples e Compostos?",
        answer: "Imagine investir R$ 1.000 a 10% ao mês. Nos juros simples, você ganha R$ 100 todo mês, para sempre. Nos juros compostos, você ganha R$ 100 no primeiro mês, R$ 110 no segundo, R$ 121 no terceiro, e assim por diante."
    },
    {
        question: "Para que serve esta calculadora?",
        answer: "Ela é uma ferramenta genérica e flexível. Serve para simular qualquer investimento de renda fixa (CDB, Tesouro, LCI), crescimento de poupança, evolução de dívidas de cartão de crédito ou apenas para estudar o poder do tempo nas suas finanças."
    },
    {
        question: "A frequência dos aportes importa?",
        answer: "Sim! A mágica dos juros compostos depende de manter a roda girando. Fazer aportes mensais aumenta drasticamente o montante final, pois você está sempre aumentando a base sobre a qual os juros incidem."
    }
];

export const CompoundInterestPage: React.FC = () => {
    const [initialCapital, setInitialCapital] = useState<number>(0);
    const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(0);
    const [rateType, setRateType] = useState<'monthly' | 'yearly'>('monthly');
    const [period, setPeriod] = useState<number>(0);
    const [periodType, setPeriodType] = useState<'months' | 'years'>('years');
    const [result, setResult] = useState<any>(null);

    const calculateCompoundInterest = () => {
        if (!initialCapital && !monthlyContribution) return;

        // Convert rate to monthly decimal
        let monthlyRate = 0;
        if (rateType === 'monthly') {
            monthlyRate = interestRate / 100;
        } else {
            monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
        }

        // Convert period to months
        const months = periodType === 'years' ? period * 12 : period;

        // Future Value of Initial Capital: M = C * (1 + i)^t
        const fvInitial = initialCapital * Math.pow(1 + monthlyRate, months);

        // Future Value of Monthly Contributions: M = PMT * [((1 + i)^t - 1) / i]
        let fvContributions = 0;
        if (monthlyContribution > 0) {
            if (monthlyRate === 0) {
                fvContributions = monthlyContribution * months;
            } else {
                fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
            }
        }

        const totalAmount = fvInitial + fvContributions;
        const totalInvested = initialCapital + (monthlyContribution * months);
        const totalInterest = totalAmount - totalInvested;

        setResult({
            totalAmount,
            totalInvested,
            totalInterest,
            months
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Juros Compostos",
        "description": "Simule o crescimento exponencial do seu patrimônio com a força dos juros sobre juros.",
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
                title="Calculadora de Juros Compostos - Simulação Online Gratuita"
                description="O poder dos juros sobre juros. Calcule o retorno de seus investimentos a longo prazo com nossa calculadora de Juros Compostos simples e prática."
                canonical="/calculadoras/juros-compostos"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": COMPOUND_INTEREST_FAQS.map(faq => ({
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
                        { label: 'Juros Compostos', href: '/calculadoras/juros-compostos' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Investimentos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Juros Compostos</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Albert Einstein chamou de "a oitava maravilha do mundo". Simule agora o crescimento exponencial do seu patrimônio com a força dos juros sobre juros.
                        </p>
                    </motion.div>
                </div>

                {/* Calculator Section */}
                <motion.div
                    initial={{ y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid lg:grid-cols-12 gap-8 mb-24"
                >
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-primary" />
                                Parâmetros da Simulação
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="initial" className="block text-sm text-gray-400 mb-2">Valor Inicial (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="initial"
                                            type="number"
                                            placeholder="Ex: 1000"
                                            value={initialCapital || ''}
                                            onChange={(e) => setInitialCapital(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="monthly" className="block text-sm text-gray-400 mb-2">Aporte Mensal (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="monthly"
                                            type="number"
                                            placeholder="Ex: 500"
                                            value={monthlyContribution || ''}
                                            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Taxa de Juros (%)</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                placeholder="Ex: 1"
                                                value={interestRate || ''}
                                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                        <select
                                            value={rateType}
                                            onChange={(e) => setRateType(e.target.value as 'monthly' | 'yearly')}
                                            className="bg-black/30 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        >
                                            <option value="monthly">Mensal</option>
                                            <option value="yearly">Anual</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Período</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                placeholder="Ex: 10"
                                                value={period || ''}
                                                onChange={(e) => setPeriod(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                        <select
                                            value={periodType}
                                            onChange={(e) => setPeriodType(e.target.value as 'months' | 'years')}
                                            className="bg-black/30 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        >
                                            <option value="years">Anos</option>
                                            <option value="months">Meses</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculateCompoundInterest}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Calcular
                                    </button>
                                    <button
                                        onClick={() => {
                                            setInitialCapital(0);
                                            setMonthlyContribution(0);
                                            setInterestRate(0);
                                            setPeriod(0);
                                            setResult(null);
                                        }}
                                        className="px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all"
                                    >
                                        Limpar
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
                                        initial={{ scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Valor Total Acumulado</h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {formatCurrency(result.totalAmount)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Em {result.months} meses
                                            </p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Total Investido</span>
                                                    <span className="text-xs text-gray-500">Seu dinheiro</span>
                                                </div>
                                                <span className="text-white font-bold">{formatCurrency(result.totalInvested)}</span>
                                            </div>

                                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-emerald-400 font-bold">Total em Juros</span>
                                                    <span className="text-xs text-gray-400">Rendimento puro</span>
                                                </div>
                                                <span className="text-white font-bold text-xl">+{formatCurrency(result.totalInterest)}</span>
                                            </div>
                                        </div>

                                        {/* Simple Chart Representation */}
                                        <div className="mt-8">
                                            <h3 className="text-sm text-gray-400 mb-4">Composição do Patrimônio</h3>
                                            <div className="h-4 bg-white/10 rounded-full overflow-hidden flex">
                                                <div
                                                    className="h-full bg-gray-500"
                                                    style={{ width: `${(result.totalInvested / result.totalAmount) * 100}%` }}
                                                />
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${(result.totalInterest / result.totalAmount) * 100}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs mt-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-gray-500" />
                                                    <span className="text-gray-400">Investido ({((result.totalInvested / result.totalAmount) * 100).toFixed(0)}%)</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                                    <span className="text-gray-400">Juros ({((result.totalInterest / result.totalAmount) * 100).toFixed(0)}%)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <BarChart3 className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para ver a mágica acontecer</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg"
                >
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Poder dos Juros sobre Juros</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Se você quer enriquecer, precisa entender uma única força matemática: os Juros Compostos. Diferente do crescimento linear (onde você soma o mesmo valor todo mês), o crescimento composto é exponencial.
                            </p>
                            <p className="mb-4">
                                Nos juros simples, seu dinheiro cresce em linha reta. Nos juros compostos, ele cresce em uma curva que aponta para o céu. Isso acontece porque o lucro de hoje vira a base de cálculo de amanhã — ou seja, você passa a ganhar dinheiro sobre o dinheiro que o investimento já gerou.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Os 3 Pilares do Enriquecimento</h2>
                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">1. Aceleração</h3>
                                <p className="text-sm text-gray-400">Nos primeiros anos, o crescimento parece lento. Mas há um "ponto de virada" onde os rendimentos mensais superam seus próprios aportes.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">2. Consistência</h3>
                                <p className="text-sm text-gray-400">Aportes mensais (mesmo que pequenos) são o combustível que mantém a curva subindo.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">3. Tempo</h3>
                                <p className="text-sm text-gray-400">O fator mais importante. Começar 5 anos antes pode significar o dobro do patrimônio no final.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">A Fórmula Mágica</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">A matemática por trás da nossa calculadora utiliza a fórmula universal dos juros compostos:</p>
                            <div className="text-center text-3xl font-bold text-white mb-6 font-mono">
                                M = C (1 + i)ᵗ
                            </div>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li><strong>M (Montante):</strong> O valor final acumulado.</li>
                                <li><strong>C (Capital):</strong> O dinheiro que você tem hoje.</li>
                                <li><strong>i (Taxa):</strong> A rentabilidade (quanto rende por mês/ano).</li>
                                <li><strong>t (Tempo):</strong> Por quanto tempo o dinheiro ficará trabalhando.</li>
                            </ul>
                        </div>
                    </section>

                    <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl mb-16">
                        <h3 className="text-xl font-bold text-white mb-2">💡 Dica de Investidor</h3>
                        <p className="text-gray-300">
                            Pequenas diferenças na taxa de juros geram impactos gigantescos no longo prazo. Um investimento que rende 1% ao mês resulta em muito mais dinheiro após 20 anos do que um que rende 0,8%. Use a calculadora para comparar taxas e brigar por cada centavo de rentabilidade!
                        </p>
                    </div>

                    <FAQ
                        items={COMPOUND_INTEREST_FAQS}
                        title="Dúvidas Frequentes"
                        className="py-12"
                        showSocialProof={false}
                    />
                </motion.div>

                {/* App Promo Banner */}
                <AppPromoBanner />
            </div>
        </section>
    );
};
