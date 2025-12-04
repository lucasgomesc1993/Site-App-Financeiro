import React, { useState, useEffect } from 'react';
import { Home, Calculator, HelpCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const RENT_VS_BUY_FAQS: FAQItem[] = [
    {
        question: "Quando vale a pena alugar?",
        answer: "Financeiramente, alugar vale a pena quando o valor do aluguel é muito inferior ao rendimento que você teria se investisse o dinheiro da compra do imóvel. Também é indicado para quem precisa de mobilidade ou não tem certeza de onde vai morar a longo prazo."
    },
    {
        question: "Quando vale a pena comprar?",
        answer: "Comprar é vantajoso para quem busca estabilidade, personalização do imóvel e proteção contra aumentos de aluguel. Financeiramente, compensa se a parcela do financiamento for próxima ao valor do aluguel ou se o imóvel tiver grande potencial de valorização."
    },
    {
        question: "O que é custo de oportunidade?",
        answer: "É o quanto você deixa de ganhar ao escolher uma opção. Ao comprar um imóvel à vista, o custo de oportunidade é o rendimento que esse dinheiro teria se ficasse investido no mercado financeiro."
    }
];

export function RentVsBuyPage() {
    const [propertyValue, setPropertyValue] = useState('');
    const [rentValue, setRentValue] = useState('');
    const [investmentYield, setInvestmentYield] = useState('0.85'); // % per month
    const [appreciationRate, setAppreciationRate] = useState('0.5'); // % per month
    const [years, setYears] = useState('10');

    const [result, setResult] = useState<{
        rentTotalWealth: number;
        buyTotalWealth: number;
        difference: number;
        bestOption: 'rent' | 'buy'
    } | null>(null);

    const calculate = () => {
        const propVal = parseFloat(propertyValue.replace(/\./g, '').replace(',', '.') || '0');
        const rentVal = parseFloat(rentValue.replace(/\./g, '').replace(',', '.') || '0');
        const yieldRate = parseFloat(investmentYield.replace(',', '.') || '0') / 100;
        const apprecRate = parseFloat(appreciationRate.replace(',', '.') || '0') / 100;
        const periodMonths = parseInt(years) * 12;

        if (propVal === 0 || rentVal === 0) {
            setResult(null);
            return;
        }

        // Scenario 1: Renting
        // You invest the property value (assuming you had the cash) and pay rent from the yield or pocket
        // Wealth = Initial Capital * (1 + yield)^n - Future Value of Rent Payments?
        // Let's simplify: You have 'propVal' in cash.
        // Option A (Buy): You spend 'propVal'. You own the house. House appreciates.
        // Wealth A = propVal * (1 + apprecRate)^n

        // Option B (Rent): You keep 'propVal' invested. You pay 'rentVal' monthly (adjusted by inflation? let's keep rent fixed for simplicity or assume yield is real yield).
        // Wealth B = Future Value of Investment - Future Value of Rent Payments
        // Actually, simpler: Monthly, you pay rent. The rest of your capital grows.
        // But wait, if you buy, you don't pay rent.
        // So, Rent Scenario:
        // Month 0: Capital = propVal.
        // Month 1: Capital = Capital * (1 + yield) - Rent.
        // ...

        let capitalRent = propVal;
        let currentRent = rentVal;
        // Assuming rent adjusts by appreciation rate (inflation proxy)

        for (let i = 0; i < periodMonths; i++) {
            capitalRent = capitalRent * (1 + yieldRate) - currentRent;
            currentRent = currentRent * (1 + apprecRate); // Rent increases too
        }

        const rentTotalWealth = capitalRent;

        // Buy Scenario
        // You have the house.
        const buyTotalWealth = propVal * Math.pow(1 + apprecRate, periodMonths);

        setResult({
            rentTotalWealth,
            buyTotalWealth,
            difference: Math.abs(rentTotalWealth - buyTotalWealth),
            bestOption: rentTotalWealth > buyTotalWealth ? 'rent' : 'buy'
        });
    };

    useEffect(() => {
        calculate();
    }, [propertyValue, rentValue, investmentYield, appreciationRate, years]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora Alugar ou Comprar Imóvel",
        "description": "Descubra se vale mais a pena comprar ou alugar um imóvel com base em seus objetivos financeiros.",
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
                title="Alugar ou Comprar Imóvel? Calculadora de Decisão"
                description="Tire a dúvida cruel. Simule se financeiramente vale mais a pena pagar aluguel e investir ou comprar a casa própria."
                canonical="/calculadoras/alugar-ou-financiar"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": RENT_VS_BUY_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Alugar ou Comprar', href: '/calculadoras/alugar-ou-financiar' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Home className="w-4 h-4 text-rose-500" />
                            <span className="text-sm text-gray-300">Utilidades</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Alugar ou <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-500">Comprar?</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            A matemática por trás da casa própria. Descubra qual opção constrói mais patrimônio.
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
                                    <Calculator className="w-5 h-5 text-rose-500" />
                                    Simular Cenários
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor do Imóvel</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={propertyValue}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setPropertyValue)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor do Aluguel (Mensal)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={rentValue}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setRentValue)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Rendimento Invest. (% a.m.)</label>
                                        <input
                                            type="text"
                                            value={investmentYield}
                                            onChange={(e) => setInvestmentYield(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                            placeholder="0.85"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Valorização Imóvel (% a.m.)</label>
                                        <input
                                            type="text"
                                            value={appreciationRate}
                                            onChange={(e) => setAppreciationRate(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                            placeholder="0.5"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Período (Anos)</label>
                                        <input
                                            type="number"
                                            value={years}
                                            onChange={(e) => setYears(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                            placeholder="10"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 text-center mb-4">
                                        <span className="text-sm text-rose-400 block mb-2">Melhor Opção Financeira</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? (result.bestOption === 'rent' ? 'Alugar + Investir' : 'Comprar Imóvel') : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className={`p-4 rounded-xl border text-center ${result && result.bestOption === 'rent' ? 'bg-green-500/10 border-green-500/20' : 'bg-white/5 border-white/5'}`}>
                                            <span className="text-xs text-gray-400 block mb-1">Patrimônio Alugando</span>
                                            <span className="text-lg font-bold text-white">
                                                {result ? `R$ ${result.rentTotalWealth.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className={`p-4 rounded-xl border text-center ${result && result.bestOption === 'buy' ? 'bg-green-500/10 border-green-500/20' : 'bg-white/5 border-white/5'}`}>
                                            <span className="text-xs text-gray-400 block mb-1">Patrimônio Comprando</span>
                                            <span className="text-lg font-bold text-white">
                                                {result ? `R$ ${result.buyTotalWealth.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}` : '---'}
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
                                <TrendingUp className="w-5 h-5 text-rose-500" />
                                Análise
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    Esta simulação compara dois cenários partindo do princípio que você tem o dinheiro à vista:
                                </p>
                                <ul className="space-y-2 list-disc pl-4">
                                    <li><strong>Alugar:</strong> Você investe o dinheiro do imóvel e paga o aluguel com os rendimentos (ou parte deles).</li>
                                    <li><strong>Comprar:</strong> Você compra o imóvel e ganha com a valorização dele ao longo do tempo.</li>
                                </ul>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mt-2">
                                    <strong className="text-white block mb-1">Dica</strong>
                                    Se o aluguel for menor que 0,4% do valor do imóvel, geralmente compensa mais alugar e investir a diferença.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={RENT_VS_BUY_FAQS}
                    title="Dúvidas sobre Imóveis"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
