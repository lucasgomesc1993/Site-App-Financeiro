import React, { useState, useEffect } from 'react';
import { CreditCard, Calculator, HelpCircle, AlertOctagon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const CREDIT_CARD_FAQS: FAQItem[] = [
    {
        question: "Como funciona o rotativo do cartão?",
        answer: "Quando você paga apenas o mínimo ou um valor parcial da fatura, o restante entra no crédito rotativo, que tem as taxas de juros mais altas do mercado."
    },
    {
        question: "Vale a pena pegar empréstimo para pagar o cartão?",
        answer: "Geralmente sim. As taxas de empréstimo pessoal costumam ser muito menores que as do rotativo do cartão. Trocar uma dívida cara por uma barata é inteligente."
    },
    {
        question: "Em quanto tempo a dívida dobra?",
        answer: "Com juros de 14% ao mês (comum no rotativo), a dívida dobra de valor em aproximadamente 5 a 6 meses."
    }
];

export function CreditCardDebtPage() {
    const [debtAmount, setDebtAmount] = useState('');
    const [interestRate, setInterestRate] = useState('14'); // Default average rate
    const [months, setMonths] = useState('12');
    const [result, setResult] = useState<{ totalDebt: number; totalInterest: number } | null>(null);

    const calculate = () => {
        const pv = parseFloat(debtAmount.replace(/\./g, '').replace(',', '.'));
        const rate = parseFloat(interestRate.replace(',', '.'));
        const n = parseInt(months);

        if (isNaN(pv) || isNaN(rate) || isNaN(n) || n === 0) {
            setResult(null);
            return;
        }

        // Compound Interest: FV = PV * (1 + i)^n
        const i = rate / 100;
        const fv = pv * Math.pow(1 + i, n);

        setResult({
            totalDebt: fv,
            totalInterest: fv - pv
        });
    };

    useEffect(() => {
        calculate();
    }, [debtAmount, interestRate, months]);

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
        "name": "Calculadora de Dívida de Cartão de Crédito",
        "description": "Simule o efeito bola de neve dos juros do cartão de crédito e veja quanto sua dívida pode crescer.",
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
                title="Calculadora de Dívida de Cartão de Crédito - Juros Rotativos"
                description="Cuidado com o rotativo! Simule quanto sua dívida de cartão de crédito vai crescer com os juros compostos e evite o efeito bola de neve."
                canonical="/calculadoras/divida-cartao-credito"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CREDIT_CARD_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Dívida de Cartão', href: '/calculadoras/divida-cartao-credito' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <CreditCard className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-300">Empréstimos e Financiamentos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500">Dívida de Cartão</span>
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
                                    <Calculator className="w-5 h-5 text-purple-500" />
                                    Simular Evolução
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor da Fatura em Aberto</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={debtAmount}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setDebtAmount)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Juros do Rotativo (% a.m.)</label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={interestRate}
                                            onChange={(e) => handleNumberInput(e.target.value, setInterestRate)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="Ex: 14"
                                        />
                                        <p className="text-xs text-gray-500">Média de mercado: 12% a 15%</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Meses sem pagar</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={months}
                                            onChange={(e) => handleNumberInput(e.target.value, setMonths)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="Ex: 12"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 text-center mb-4">
                                        <span className="text-sm text-red-400 block mb-2">Dívida Total Estimada</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.totalDebt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Juros Acumulados</span>
                                        <span className="text-xl font-bold text-white">
                                            {result ? `R$ ${result.totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center">
                        <p>
                            Veja o impacto dos juros rotativos no seu bolso. Simule o crescimento da dívida.
                        </p>
                    </div>

                    {/* Sidebar Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <AlertOctagon className="w-5 h-5 text-red-500" />
                                Perigo dos Juros Compostos
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    O cartão de crédito tem os juros mais altos do mercado. Se você deixar de pagar R$1.000 hoje, em 1 ano essa dívida pode virar mais de R$4.000.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Dica de Ouro</strong>
                                    Se não conseguir pagar a fatura total, tente parcelar a fatura (juros menores que o rotativo) ou pegar um empréstimo pessoal para quitar à vista.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={CREDIT_CARD_FAQS}
                    title="Dúvidas sobre Dívida de Cartão"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
