import React, { useState, useEffect } from 'react';
import { Gem, Calculator, HelpCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const MILLION_FAQS: FAQItem[] = [
    {
        question: "É possível ficar milionário investindo pouco?",
        answer: "Sim, mas exige tempo. Com aportes menores, o prazo para atingir o milhão será maior. O segredo é a constância e o tempo de exposição aos juros compostos."
    },
    {
        question: "Onde investir para chegar no milhão?",
        answer: "Uma carteira diversificada é o ideal. Renda fixa para segurança e ações/fundos imobiliários para potencializar o retorno no longo prazo."
    },
    {
        question: "A inflação atrapalha?",
        answer: "Sim. Um milhão hoje compra muito menos do que comprava há 10 anos. Por isso, é importante buscar investimentos que rendam acima da inflação (ganho real)."
    }
];

export function FirstMillionPage() {
    const [initialAmount, setInitialAmount] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [result, setResult] = useState<{ months: number; years: number } | null>(null);

    const calculate = () => {
        const p = parseFloat(initialAmount.replace(/\./g, '').replace(',', '.'));
        const pmt = parseFloat(monthlyContribution.replace(/\./g, '').replace(',', '.'));
        const r = parseFloat(interestRate.replace(',', '.'));

        if (isNaN(p) || isNaN(pmt) || isNaN(r) || r === 0) {
            setResult(null);
            return;
        }

        const target = 1000000;
        const i = r / 100 / 12; // Monthly rate

        // Formula for n (months) to reach Future Value (FV):
        // FV = PV * (1+i)^n + PMT * ((1+i)^n - 1) / i
        // Solving for n:
        // n = ln((FV * i + PMT) / (PV * i + PMT)) / ln(1 + i)

        const numerator = target * i + pmt;
        const denominator = p * i + pmt;

        if (denominator <= 0) {
            setResult(null); // Impossible if denominator is 0 or negative (though unlikely with positive inputs)
            return;
        }

        const months = Math.log(numerator / denominator) / Math.log(1 + i);

        setResult({
            months: Math.ceil(months),
            years: months / 12
        });
    };

    useEffect(() => {
        calculate();
    }, [initialAmount, monthlyContribution, interestRate]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const handleNumberInput = (value: string, setter: (value: string) => void) => {
        if (/^[\d.,]*$/.test(value)) {
            setter(value);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora do Primeiro Milhão",
        "description": "Descubra quanto tempo falta para você conquistar seu primeiro milhão de reais investindo mensalmente.",
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
                title="Calculadora do Primeiro Milhão - Quando vou ficar rico?"
                description="Quer ser milionário? Simule quanto investir por mês e em quanto tempo você alcançará seu primeiro milhão de reais."
                canonical="/calculadoras/primeiro-milhao"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": MILLION_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Primeiro Milhão', href: '/calculadoras/primeiro-milhao' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Gem className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora do <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-yellow-500">Primeiro Milhão</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Trace a rota para a sua liberdade financeira. Quanto falta para o 1º milhão?
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
                                    <Calculator className="w-5 h-5 text-emerald-500" />
                                    Simular Tempo
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Quanto você já tem?</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={initialAmount}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setInitialAmount)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Aporte Mensal</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={monthlyContribution}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setMonthlyContribution)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Rentabilidade Anual Esperada (%)</label>
                                    <input
                                        type="text"
                                        value={interestRate}
                                        onChange={(e) => handleNumberInput(e.target.value, setInterestRate)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        placeholder="Ex: 10"
                                    />
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">Tempo até o Milhão</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `${result.years.toFixed(1)} anos` : '---'}
                                        </span>
                                        {result && (
                                            <p className="text-xs text-gray-400 mt-2">
                                                ou {result.months} meses de disciplina.
                                            </p>
                                        )}
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
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                                Acelere o processo
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    Para chegar mais rápido, você tem três alavancas:
                                </p>
                                <ul className="space-y-2 list-disc pl-4">
                                    <li>Aumentar os aportes mensais (ganhar mais/gastar menos)</li>
                                    <li>Melhorar a rentabilidade (investir melhor)</li>
                                    <li>Começar com mais dinheiro (vender bens parados)</li>
                                </ul>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mt-4">
                                    <strong className="text-white block mb-1">Fato Curioso</strong>
                                    O primeiro milhão é o mais difícil. O segundo vem muito mais rápido graças aos juros compostos de uma base maior.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={MILLION_FAQS}
                    title="Dúvidas sobre o Primeiro Milhão"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
