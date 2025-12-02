import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, Flame, Target } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const FIRE_FAQS: FAQItem[] = [
    {
        question: "O que é a Regra dos 4%?",
        answer: "É uma regra empírica usada para determinar quanto você pode retirar da sua carteira de investimentos a cada ano sem ficar sem dinheiro. Segundo estudos, 4% é uma taxa de retirada segura para a maioria dos cenários econômicos."
    },
    {
        question: "Quanto dinheiro preciso para parar de trabalhar?",
        answer: "Pela Regra dos 4%, você precisa acumular 25 vezes o seu custo de vida anual. Por exemplo, se você gasta R$ 5.000 por mês (R$ 60.000 por ano), seu 'Número FIRE' seria R$ 1.500.000 (1,5 milhão)."
    },
    {
        question: "A inflação afeta meu plano de aposentadoria?",
        answer: "Sim, drasticamente. R$ 5.000 hoje não comprarão as mesmas coisas daqui a 20 anos. Nossa calculadora desconta a inflação da rentabilidade para mostrar o tempo real até a liberdade."
    },
    {
        question: "Posso me aposentar com pouco dinheiro investido?",
        answer: "Depende do seu custo de vida. O segredo do FIRE não é apenas ganhar muito, mas gastar pouco (frugalidade). Quanto menor for o seu custo mensal, menor será o montante necessário para atingir a liberdade."
    }
];

export const FIREPage: React.FC = () => {
    const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
    const [currentPatrimony, setCurrentPatrimony] = useState<number>(0);
    const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
    const [annualReturn, setAnnualReturn] = useState<number>(10); // 10% nominal default
    const [inflation, setInflation] = useState<number>(4); // 4% inflation default
    const [result, setResult] = useState<any>(null);

    const calculateFIRE = () => {
        if (!monthlyExpenses) return;

        // 1. Calculate FIRE Number (Annual Expenses * 25)
        const annualExpenses = monthlyExpenses * 12;
        const fireNumber = annualExpenses * 25;

        // 2. Calculate Real Return Rate (Fisher Equation approx: Nominal - Inflation)
        // Precise: (1 + nominal) / (1 + inflation) - 1
        const realAnnualRate = ((1 + annualReturn / 100) / (1 + inflation / 100)) - 1;
        const realMonthlyRate = Math.pow(1 + realAnnualRate, 1 / 12) - 1;

        // 3. Calculate Time to Reach FIRE Number
        // Formula: n = ln( (FV * r + PMT) / (PV * r + PMT) ) / ln(1 + r)
        // FV = fireNumber, PV = currentPatrimony, PMT = monthlyContribution, r = realMonthlyRate

        let monthsToFire = 0;

        if (currentPatrimony >= fireNumber) {
            monthsToFire = 0;
        } else {
            // Check if it's possible to reach the goal
            // If interest covers expenses, already FIRE (covered by check above)
            // If contribution + interest on current patrimony is negative or zero, never reaches (unlikely with positive inputs)

            const numerator = (fireNumber * realMonthlyRate) + monthlyContribution;
            const denominator = (currentPatrimony * realMonthlyRate) + monthlyContribution;

            if (denominator <= 0) {
                // Should not happen with positive inputs
                monthsToFire = Infinity;
            } else {
                monthsToFire = Math.log(numerator / denominator) / Math.log(1 + realMonthlyRate);
            }
        }

        const yearsToFire = Math.floor(monthsToFire / 12);
        const remainingMonths = Math.ceil(monthsToFire % 12);

        setResult({
            fireNumber,
            realAnnualRate: realAnnualRate * 100,
            yearsToFire,
            remainingMonths,
            isAlreadyFire: currentPatrimony >= fireNumber
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora FIRE (Independência Financeira)",
        "description": "Quanto preciso juntar para parar de trabalhar? Descubra seu Número FIRE e trace o plano exato para viver de renda.",
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
                title="Calculadora FIRE - Quando posso parar de trabalhar?"
                description="Descubra o seu Número FIRE. Simule quanto dinheiro você precisa investir para alcançar a Independência Financeira e viver de renda passiva (Regra dos 4%)."
                canonical="/calculadoras/fire"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": FIRE_FAQS.map(faq => ({
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
                        { label: 'FIRE (Independência Financeira)', href: '/calculadoras/fire' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Flame className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Planejamento de Vida</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">FIRE</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            "Quanto preciso juntar para parar de trabalhar?" Descubra seu Número FIRE e trace o plano exato para viver de renda.
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
                                Seus Dados
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="expenses" className="block text-sm text-gray-400 mb-2">Custo de Vida Mensal (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="expenses"
                                            type="number"
                                            placeholder="Ex: 5000"
                                            value={monthlyExpenses || ''}
                                            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="patrimony" className="block text-sm text-gray-400 mb-2">Patrimônio Atual (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="patrimony"
                                            type="number"
                                            placeholder="Ex: 50000"
                                            value={currentPatrimony || ''}
                                            onChange={(e) => setCurrentPatrimony(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contribution" className="block text-sm text-gray-400 mb-2">Aporte Mensal (R$)</label>
                                    <div className="relative">
                                        <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="contribution"
                                            type="number"
                                            placeholder="Ex: 1500"
                                            value={monthlyContribution || ''}
                                            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="return" className="block text-sm text-gray-400 mb-2">Rentabilidade Anual (%)</label>
                                        <input
                                            id="return"
                                            type="number"
                                            value={annualReturn}
                                            onChange={(e) => setAnnualReturn(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="inflation" className="block text-sm text-gray-400 mb-2">Inflação Anual (%)</label>
                                        <input
                                            id="inflation"
                                            type="number"
                                            value={inflation}
                                            onChange={(e) => setInflation(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculateFIRE}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Calcular Liberdade
                                    </button>
                                    <button
                                        onClick={() => {
                                            setMonthlyExpenses(0);
                                            setCurrentPatrimony(0);
                                            setMonthlyContribution(0);
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
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Seu Número FIRE</h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {formatCurrency(result.fireNumber)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Meta para viver de renda (Regra dos 4%)
                                            </p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Tempo Estimado</span>
                                                    <span className="text-xs text-gray-500">Considerando juros reais</span>
                                                </div>
                                                <span className="text-white font-bold text-xl">
                                                    {result.isAlreadyFire
                                                        ? "Você já atingiu a liberdade!"
                                                        : `${result.yearsToFire} anos e ${result.remainingMonths} meses`
                                                    }
                                                </span>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Taxa Real (Acima da Inflação)</span>
                                                    <span className="text-xs text-gray-500">Rentabilidade líquida de inflação</span>
                                                </div>
                                                <span className="text-white font-bold">{result.realAnnualRate.toFixed(2)}% a.a.</span>
                                            </div>

                                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-emerald-400 font-bold">Renda Passiva Mensal</span>
                                                    <span className="text-xs text-gray-400">Ao atingir a meta (4% a.a. / 12)</span>
                                                </div>
                                                <span className="text-white font-bold text-xl">{formatCurrency(result.fireNumber * 0.04 / 12)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Target className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para traçar seu plano FIRE</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg"
                >
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O que é o Movimento FIRE?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                FIRE (Financial Independence, Retire Early) não é apenas sobre dinheiro, é sobre tempo. A filosofia se baseia em acumular ativos suficientes para que o rendimento passivo cubra todas as suas despesas de vida, permitindo que você se aposente décadas antes do previsto.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Conceitos Fundamentais</h2>
                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">1. O Número FIRE</h3>
                                <p className="text-sm text-gray-400">É o valor "mágico" que você precisa acumular. A regra básica é simples: <strong>Custo de Vida Anual × 25</strong>.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">2. A Regra dos 4%</h3>
                                <p className="text-sm text-gray-400">Afirma que se você sacar 4% do seu patrimônio investido anualmente, historicamente seu dinheiro não acabará por pelo menos 30 anos.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">3. Aceleração</h3>
                                <p className="text-sm text-gray-400">Quanto maior a porcentagem da sua renda que você investe (taxa de poupança), menos tempo leva para atingir a liberdade.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como usar a calculadora?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">Para descobrir quando você será livre, nossa ferramenta cruza três dados fundamentais:</p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span><strong>Custo de Vida Mensal:</strong> Quanto você precisa para viver confortavelmente hoje? (Seja realista, inclua lazer e saúde).</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span><strong>Patrimônio Atual:</strong> Quanto você já tem investido em ativos geradores de renda?</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span>
                                    <span><strong>Aporte Mensal:</strong> Quanto você consegue poupar e investir rigorosamente todo mês?</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-16">
                        <h3 className="text-xl font-bold text-white mb-2">⚠️ Atenção à Inflação!</h3>
                        <p className="text-gray-300">
                            Muitas calculadoras na internet ignoram a inflação e mostram resultados ilusórios. O FinZap utiliza a <strong>Taxa Real</strong> (Rentabilidade Nominal - Inflação) para garantir que o valor projetado mantenha o poder de compra. Se o seu investimento rende 10% e a inflação é 4%, seu ganho real para fins de liberdade financeira é de apenas 6%.
                        </p>
                    </div>

                    <FAQ
                        items={FIRE_FAQS}
                        title="Dúvidas Frequentes sobre FIRE"
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
