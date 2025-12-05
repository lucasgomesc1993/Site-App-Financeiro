import React, { useState, useEffect } from 'react';
import { Home, Calculator, HelpCircle, Building, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const REAL_ESTATE_FAQS: FAQItem[] = [
    {
        question: "Qual a diferença entre Tabela SAC e Price?",
        answer: "Na SAC (Sistema de Amortização Constante), as parcelas começam mais altas e diminuem ao longo do tempo. Na Price, as parcelas são fixas do início ao fim, mas você paga mais juros no total."
    },
    {
        question: "O que compõe a parcela do financiamento?",
        answer: "A parcela é composta por: Amortização (valor que abate a dívida) + Juros + Seguros (MIP e DFI) + Taxas Administrativas."
    },
    {
        question: "Vale a pena antecipar parcelas?",
        answer: "Sim! Ao antecipar, você abate o saldo devedor e deixa de pagar os juros sobre esse valor, reduzindo significativamente o custo total e o tempo da dívida."
    }
];

export function RealEstateFinancingPage() {
    const [propertyValue, setPropertyValue] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [years, setYears] = useState('');
    const [tableType, setTableType] = useState<'SAC' | 'PRICE'>('SAC');
    const [result, setResult] = useState<{ firstInstallment: number; lastInstallment: number; totalInterest: number; totalPaid: number } | null>(null);

    const calculate = () => {
        const pv = parseFloat(propertyValue.replace(/\./g, '').replace(',', '.'));
        const dp = parseFloat(downPayment.replace(/\./g, '').replace(',', '.'));
        const rateYear = parseFloat(interestRate.replace(',', '.'));
        const periodYears = parseInt(years);

        if (isNaN(pv) || isNaN(dp) || isNaN(rateYear) || isNaN(periodYears) || periodYears === 0) {
            setResult(null);
            return;
        }

        const loanAmount = pv - dp;
        const months = periodYears * 12;
        const rateMonth = Math.pow(1 + rateYear / 100, 1 / 12) - 1;

        let totalInterest = 0;
        let firstInstallment = 0;
        let lastInstallment = 0;

        if (tableType === 'SAC') {
            const amortization = loanAmount / months;
            firstInstallment = amortization + (loanAmount * rateMonth);
            lastInstallment = amortization + (amortization * rateMonth); // Last month balance is 1 amortization unit

            // Total Interest SAC = (Total Paid) - Loan Amount
            // Total Paid SAC = Amortization * months + Interest Sum
            // Interest Sum is Arithmetic Progression
            const firstInterest = loanAmount * rateMonth;
            const lastInterest = amortization * rateMonth;
            const totalInterestSAC = ((firstInterest + lastInterest) * months) / 2;
            totalInterest = totalInterestSAC;

        } else {
            // Price
            const pmt = loanAmount * (rateMonth * Math.pow(1 + rateMonth, months)) / (Math.pow(1 + rateMonth, months) - 1);
            firstInstallment = pmt;
            lastInstallment = pmt;
            totalInterest = (pmt * months) - loanAmount;
        }

        setResult({
            firstInstallment,
            lastInstallment,
            totalInterest,
            totalPaid: loanAmount + totalInterest
        });
    };

    useEffect(() => {
        calculate();
    }, [propertyValue, downPayment, interestRate, years, tableType]);

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
        "name": "Simulador de Financiamento Imobiliário",
        "description": "Compare tabelas SAC e Price e simule as parcelas do seu financiamento imobiliário.",
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
                title="Simulador de Financiamento Imobiliário - SAC e Price"
                description="Vai comprar um imóvel? Simule o valor das parcelas e compare as tabelas SAC e Price. Descubra qual a melhor opção para o seu bolso."
                canonical="/calculadoras/financiamento-imobiliario"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": REAL_ESTATE_FAQS.map(faq => ({
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
                        { label: 'Financiamento Imobiliário', href: '/calculadoras/financiamento-imobiliario' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Home className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-300">Empréstimos e Financiamentos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Simulador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">Financiamento Imobiliário</span>
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
                                    Simular Financiamento
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Valor do Imóvel</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={propertyValue}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setPropertyValue)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Valor da Entrada</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={downPayment}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setDownPayment)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Taxa de Juros Anual (%)</label>
                                        <input
                                            type="text"
                                            value={interestRate}
                                            onChange={(e) => handleNumberInput(e.target.value, setInterestRate)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="Ex: 9,5"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Prazo (Anos)</label>
                                        <input
                                            type="text"
                                            value={years}
                                            onChange={(e) => handleNumberInput(e.target.value, setYears)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="Ex: 30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Sistema de Amortização</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setTableType('SAC')}
                                            className={`py-3 rounded-xl text-sm font-medium transition-all border ${tableType === 'SAC' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30'}`}
                                        >
                                            SAC (Parcelas Decrescentes)
                                        </button>
                                        <button
                                            onClick={() => setTableType('PRICE')}
                                            className={`py-3 rounded-xl text-sm font-medium transition-all border ${tableType === 'PRICE' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30'}`}
                                        >
                                            Price (Parcelas Fixas)
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Primeira Parcela</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.firstInstallment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Última Parcela</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.lastInstallment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center">
                                        <span className="text-xs text-purple-400 block mb-1">Total Pago em Juros</span>
                                        <span className="text-2xl font-bold text-white">
                                            {result ? `R$ ${result.totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
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
                                <Building className="w-5 h-5 text-purple-500" />
                                SAC ou Price?
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Tabela SAC</strong>
                                    Melhor para quem quer pagar menos juros no total. A parcela começa alta e vai caindo. Ideal para financiamentos longos.
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Tabela Price</strong>
                                    Melhor para quem precisa de uma parcela inicial menor para caber no orçamento. O valor é fixo, mas paga-se mais juros no final.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Compare SAC vs Price e planeje a compra da sua casa própria com segurança.
                    </p>
                </div>

                <FAQ
                    items={REAL_ESTATE_FAQS}
                    title="Dúvidas sobre Financiamento"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
