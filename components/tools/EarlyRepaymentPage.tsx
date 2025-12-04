import React, { useState, useEffect } from 'react';
import { PiggyBank, Calculator, HelpCircle, TrendingDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const REPAYMENT_FAQS: FAQItem[] = [
    {
        question: "O banco é obrigado a dar desconto?",
        answer: "Sim! Pelo Código de Defesa do Consumidor, ao antecipar parcelas, você tem direito ao abatimento proporcional dos juros."
    },
    {
        question: "Como funciona a antecipação?",
        answer: "Você paga o valor presente da dívida. Ou seja, trazemos o valor da parcela futura para o dia de hoje, descontando a taxa de juros do período."
    },
    {
        question: "É melhor antecipar as primeiras ou as últimas?",
        answer: "Financeiramente, antecipar as últimas é mais vantajoso, pois elas têm mais juros embutidos devido ao tempo maior até o vencimento."
    }
];

export function EarlyRepaymentPage() {
    const [installmentValue, setInstallmentValue] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [monthsAnticipated, setMonthsAnticipated] = useState('');
    const [result, setResult] = useState<{ discount: number; finalValue: number } | null>(null);

    const calculate = () => {
        const val = parseFloat(installmentValue.replace(/\./g, '').replace(',', '.'));
        const rate = parseFloat(interestRate.replace(',', '.'));
        const months = parseInt(monthsAnticipated);

        if (isNaN(val) || isNaN(rate) || isNaN(months) || months === 0) {
            setResult(null);
            return;
        }

        // Present Value Formula: PV = FV / (1 + i)^n
        const i = rate / 100;
        const presentValue = val / Math.pow(1 + i, months);

        setResult({
            discount: val - presentValue,
            finalValue: presentValue
        });
    };

    useEffect(() => {
        calculate();
    }, [installmentValue, interestRate, monthsAnticipated]);

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
        "name": "Calculadora de Quitação Antecipada",
        "description": "Calcule o desconto ao antecipar parcelas de empréstimos ou financiamentos.",
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
                title="Calculadora de Desconto por Antecipação - Quitação de Dívida"
                description="Vai adiantar parcelas do financiamento? Calcule o desconto exato que você deve receber ao quitar sua dívida antecipadamente."
                canonical="/calculadoras/quitacao-antecipada"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": REPAYMENT_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Quitação Antecipada', href: '/calculadoras/quitacao-antecipada' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <PiggyBank className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-300">Empréstimos e Financiamentos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">Quitação Antecipada</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Descubra quanto você economiza ao adiantar o pagamento de parcelas do seu financiamento.
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
                                    <Calculator className="w-5 h-5 text-purple-500" />
                                    Calcular Desconto
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor da Parcela</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={installmentValue}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setInstallmentValue)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Taxa de Juros Mensal (%)</label>
                                        <input
                                            type="text"
                                            value={interestRate}
                                            onChange={(e) => handleNumberInput(e.target.value, setInterestRate)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="Ex: 1,5"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Meses a Antecipar</label>
                                        <input
                                            type="text"
                                            value={monthsAnticipated}
                                            onChange={(e) => handleNumberInput(e.target.value, setMonthsAnticipated)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="Ex: 12"
                                        />
                                        <p className="text-xs text-gray-500">Quantos meses faltam para o vencimento desta parcela?</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center">
                                            <span className="text-xs text-purple-400 block mb-1">Desconto Obtido</span>
                                            <span className="text-2xl font-bold text-white">
                                                {result ? `R$ ${result.discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Valor a Pagar</span>
                                            <span className="text-2xl font-bold text-white">
                                                {result ? `R$ ${result.finalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                                <TrendingDown className="w-5 h-5 text-purple-500" />
                                Por que antecipar?
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    Quando você antecipa uma parcela, você está pagando ela hoje, e não no futuro. Por isso, o banco deve remover os juros que seriam cobrados durante esse tempo.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Exemplo Prático</strong>
                                    Se você tem uma parcela de R$1.000 para daqui a 1 ano e a taxa é 1% ao mês, ao pagar hoje você pagaria cerca de R$887. Uma economia de R$113!
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={REPAYMENT_FAQS}
                    title="Dúvidas sobre Antecipação"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
