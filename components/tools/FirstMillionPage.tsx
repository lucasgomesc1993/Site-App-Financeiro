import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, Gem, Clock, Target } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const FIRST_MILLION_FAQS: FAQItem[] = [
    {
        question: "É possível ficar milionário investindo pouco?",
        answer: "Sim, mas exige muito tempo. Investindo R$ 500 por mês a uma taxa de 10% ao ano, você levaria cerca de 35 anos para chegar ao milhão. O tempo compensa o valor baixo."
    },
    {
        question: "Onde devo investir para chegar ao milhão?",
        answer: "Não existe um único investimento. O ideal é uma carteira diversificada. Renda Fixa (CDB, Tesouro) garante segurança, enquanto Renda Variável (Ações, Fundos Imobiliários) oferece potencial de retorno maior no longo prazo para acelerar a chegada."
    },
    {
        question: "Devo considerar a inflação?",
        answer: "Com certeza. R$ 1 milhão daqui a 20 anos não comprará a mesma coisa que R$ 1 milhão hoje. Para um planejamento realista, tente buscar uma rentabilidade acima da inflação (juro real) ou ajuste sua meta para um valor maior (ex: R$ 2 milhões) para manter o poder de compra."
    },
    {
        question: "O que fazer depois do primeiro milhão?",
        answer: "Atingir essa marca geralmente significa que você alcançou a \"Velocidade de Cruzeiro\". Com R$ 1 milhão investido a 0,8% ao mês, você recebe R$ 8.000 de renda passiva mensal sem tocar no principal. Muitos consideram esse o ponto da Independência Financeira."
    }
];

export const FirstMillionPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'time' | 'contribution'>('time');

    // Common Inputs
    const [initialCapital, setInitialCapital] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(10); // Yearly

    // Tab Specific Inputs
    const [monthlyContribution, setMonthlyContribution] = useState<number>(0); // For 'time' tab
    const [yearsToGoal, setYearsToGoal] = useState<number>(0); // For 'contribution' tab

    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const target = 1000000;
        const monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;

        if (activeTab === 'time') {
            // Calculate Time needed
            // n = ln( (FV + PMT/r) / (PV + PMT/r) ) / ln(1+r)

            if (monthlyContribution <= 0 && initialCapital < target && monthlyRate <= 0) return; // Infinite time

            let months = 0;

            if (monthlyRate === 0) {
                // Simple division if rate is 0
                if (monthlyContribution > 0) {
                    months = (target - initialCapital) / monthlyContribution;
                } else {
                    months = Infinity;
                }
            } else {
                const numerator = target * monthlyRate + monthlyContribution;
                const denominator = initialCapital * monthlyRate + monthlyContribution;

                if (denominator <= 0) {
                    // Should not happen with positive inputs
                    months = Infinity;
                } else {
                    months = Math.log(numerator / denominator) / Math.log(1 + monthlyRate);
                }
            }

            if (months < 0 || !isFinite(months)) {
                setResult({ error: "Parâmetros inválidos para atingir a meta." });
                return;
            }

            const years = Math.floor(months / 12);
            const remainingMonths = Math.ceil(months % 12);

            setResult({
                type: 'time',
                years,
                months: remainingMonths,
                totalMonths: months
            });

        } else {
            // Calculate Monthly Contribution needed
            // PMT = (FV - PV * (1+r)^n) / [((1+r)^n - 1) / r]

            if (!yearsToGoal) return;

            const months = yearsToGoal * 12;

            let pmt = 0;

            if (monthlyRate === 0) {
                pmt = (target - initialCapital) / months;
            } else {
                const fvInitial = initialCapital * Math.pow(1 + monthlyRate, months);
                const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;

                pmt = (target - fvInitial) / factor;
            }

            if (pmt < 0) pmt = 0; // Already reached or initial capital grows enough

            setResult({
                type: 'contribution',
                monthlyContribution: pmt
            });
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora do Primeiro Milhão",
        "description": "Simule quanto você precisa investir por mês para conquistar o seu primeiro milhão de reais.",
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
                title="Calculadora do Primeiro Milhão - Quanto investir para chegar lá?"
                description="Quer ser milionário? Descubra quanto você precisa investir por mês e quanto tempo vai levar para acumular seu primeiro milhão de reais."
                canonical="/calculadoras/primeiro-milhao"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": FIRST_MILLION_FAQS.map(faq => ({
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
                        { label: 'Primeiro Milhão', href: '/calculadoras/primeiro-milhao' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Gem className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Metas Financeiras</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora do <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Primeiro Milhão</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            O sonho é possível. Simule quanto você precisa investir por mês para conquistar o seu primeiro milhão de reais.
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

                            {/* Tabs */}
                            <div className="flex p-1 bg-black/40 rounded-xl mb-6">
                                <button
                                    onClick={() => { setActiveTab('time'); setResult(null); }}
                                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'time' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Calcular Tempo
                                </button>
                                <button
                                    onClick={() => { setActiveTab('contribution'); setResult(null); }}
                                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'contribution' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Calcular Aporte
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-primary" />
                                {activeTab === 'time' ? 'Quando chego lá?' : 'Quanto investir?'}
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Investimento Inicial (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Ex: 10000"
                                            value={initialCapital || ''}
                                            onChange={(e) => setInitialCapital(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                {activeTab === 'time' ? (
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Aporte Mensal (R$)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                placeholder="Ex: 1000"
                                                value={monthlyContribution || ''}
                                                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Meta de Tempo (Anos)</label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                placeholder="Ex: 10"
                                                value={yearsToGoal || ''}
                                                onChange={(e) => setYearsToGoal(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Rentabilidade Anual (%)</label>
                                    <div className="relative">
                                        <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculate}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Simular Milhão
                                    </button>
                                    <button
                                        onClick={() => {
                                            setInitialCapital(0);
                                            setMonthlyContribution(0);
                                            setYearsToGoal(0);
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
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">
                                                {result.type === 'time' ? 'Tempo até o Milhão' : 'Aporte Mensal Necessário'}
                                            </h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {result.type === 'time'
                                                    ? `${result.years} anos e ${result.months} meses`
                                                    : formatCurrency(result.monthlyContribution)
                                                }
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Para atingir R$ 1.000.000,00
                                            </p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Rentabilidade Considerada</span>
                                                    <span className="text-xs text-gray-500">Nominal anual</span>
                                                </div>
                                                <span className="text-white font-bold">{interestRate}% a.a.</span>
                                            </div>

                                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-emerald-400 font-bold">Renda Passiva Estimada</span>
                                                    <span className="text-xs text-gray-400">Ao atingir o milhão (0,8% a.m.)</span>
                                                </div>
                                                <span className="text-white font-bold text-xl">{formatCurrency(8000)}</span>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-400 mt-4">
                                            <p>
                                                <strong>💡 Insight:</strong> O primeiro milhão é o mais difícil. Depois dele, com R$ 8.000 de renda passiva mensal reinvestida, o segundo milhão chega muito mais rápido!
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Target className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para traçar sua rota</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Primeiro Milhão é o mais difícil</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                No mundo dos investimentos, existe um ditado famoso: "O primeiro milhão é o mais difícil, o segundo é inevitável". Isso acontece por causa do efeito exponencial dos Juros Compostos.
                            </p>
                            <p className="mb-4">
                                No começo, o esforço vem quase todo do seu bolso (seu trabalho). Mas, conforme o patrimônio cresce, os rendimentos mensais começam a superar os seus próprios aportes. Nossa calculadora mostra exatamente essa trajetória.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como chegar lá mais rápido?</h2>
                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">1. Tempo</h3>
                                <p className="text-sm text-gray-400">Quanto mais cedo você começar, menos esforço terá que fazer. O tempo é o melhor amigo dos juros compostos.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">2. Aporte</h3>
                                <p className="text-sm text-gray-400">Aumentar sua renda e seus aportes mensais é a forma mais eficaz de encurtar o caminho.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">3. Rentabilidade</h3>
                                <p className="text-sm text-gray-400">Buscar investimentos que rendam acima da inflação (como Ações, FIIs ou Tesouro IPCA+) faz seu dinheiro trabalhar mais forte.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como usar a calculadora?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">Nossa ferramenta faz a projeção reversa ou direta para você:</p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span><strong>Quero saber o valor mensal:</strong> Insira em quantos anos você quer chegar lá, e nós diremos quanto investir por mês.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span><strong>Quero saber o tempo:</strong> Insira quanto você pode investir por mês, e nós diremos em que data você será milionário.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl mb-16">
                        <h3 className="text-xl font-bold text-white mb-2">💡 O Efeito Bola de Neve</h3>
                        <p className="text-gray-300">
                            Você vai perceber que os primeiros R$ 100 mil demoram muito para juntar. Os segundos R$ 100 mil são mais rápidos. Os últimos R$ 100 mil (para chegar ao milhão) acontecem numa velocidade impressionante. Isso é o juro composto em ação!
                        </p>
                    </div>

                    <FAQ
                        items={FIRST_MILLION_FAQS}
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
