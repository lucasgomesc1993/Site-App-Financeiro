import React, { useState, useEffect } from 'react';
import { Globe, Calculator, HelpCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const CURRENCY_FAQS: FAQItem[] = [
    {
        question: "Qual cotação é usada?",
        answer: "Utilizamos a cotação comercial, que é a taxa usada em transações entre bancos e empresas. Para turismo (compra de papel-moeda), o valor costuma ser mais alto."
    },
    {
        question: "O que é PTAX?",
        answer: "É a taxa de câmbio média calculada pelo Banco Central do Brasil. É a referência oficial para contratos em dólar."
    },
    {
        question: "Como comprar dólar mais barato?",
        answer: "Contas globais digitais (como Wise, Nomad, C6) geralmente oferecem cotações muito próximas do dólar comercial e IOF reduzido (1,1%) em comparação aos cartões de crédito tradicionais (4,38%)."
    }
];

export function CurrencyConverterPage() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('BRL');
    const [toCurrency, setToCurrency] = useState('USD');
    const [result, setResult] = useState<number | null>(null);
    const [rate, setRate] = useState<number | null>(null);

    // Mock rates for demonstration (in a real app, fetch from API)
    const rates: Record<string, number> = {
        'BRL': 1,
        'USD': 0.17, // 1 BRL = 0.17 USD (~5.88 BRL/USD)
        'EUR': 0.16, // 1 BRL = 0.16 EUR
        'GBP': 0.13  // 1 BRL = 0.13 GBP
    };

    // Inverse rates for display
    const displayRates: Record<string, number> = {
        'USD': 5.88,
        'EUR': 6.20,
        'GBP': 7.45,
        'BRL': 1
    };

    const calculate = () => {
        const val = parseFloat(amount.replace(/\./g, '').replace(',', '.'));

        if (isNaN(val) || val === 0) {
            setResult(null);
            return;
        }

        // Convert to base (BRL) then to target
        // Since our rates are relative to BRL (1 BRL = X Currency)
        // But usually APIs give USD base. Let's simplify with fixed pairs logic for this demo.

        // Let's use the displayRates (Value of 1 Unit in BRL)
        const fromRate = displayRates[fromCurrency];
        const toRate = displayRates[toCurrency];

        // Convert From -> BRL -> To
        const valueInBRL = val * fromRate;
        const finalValue = valueInBRL / toRate;

        setResult(finalValue);
        setRate(fromRate / toRate);
    };

    useEffect(() => {
        calculate();
    }, [amount, fromCurrency, toCurrency]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Conversor de Moedas",
        "description": "Converta Real, Dólar, Euro e Libra com a cotação comercial atualizada.",
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
                title="Conversor de Moedas - Dólar, Euro e Real Hoje"
                description="Vai viajar ou fazer compras internacionais? Converta valores entre Real, Dólar, Euro e Libra com nossa calculadora de câmbio."
                canonical="/calculadoras/conversor-moedas"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CURRENCY_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Conversor de Moedas', href: '/calculadoras/conversor-moedas' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Globe className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Conversor de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Moedas</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Cotação comercial atualizada. Converta valores para viagens e compras.
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
                                    Converter Agora
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={amount}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setAmount)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">De</label>
                                        <select
                                            value={fromCurrency}
                                            onChange={(e) => setFromCurrency(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        >
                                            <option value="BRL">Real (BRL)</option>
                                            <option value="USD">Dólar (USD)</option>
                                            <option value="EUR">Euro (EUR)</option>
                                            <option value="GBP">Libra (GBP)</option>
                                        </select>
                                    </div>

                                    <button
                                        onClick={swapCurrencies}
                                        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-[1px]"
                                    >
                                        <RefreshCw className="w-5 h-5 text-emerald-500" />
                                    </button>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Para</label>
                                        <select
                                            value={toCurrency}
                                            onChange={(e) => setToCurrency(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        >
                                            <option value="BRL">Real (BRL)</option>
                                            <option value="USD">Dólar (USD)</option>
                                            <option value="EUR">Euro (EUR)</option>
                                            <option value="GBP">Libra (GBP)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">Valor Convertido</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `${toCurrency === 'BRL' ? 'R$' : toCurrency === 'USD' ? '$' : toCurrency === 'EUR' ? '€' : '£'} ${result.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                        {rate && (
                                            <p className="text-xs text-gray-400 mt-2">
                                                1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
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
                                <Globe className="w-5 h-5 text-emerald-500" />
                                Moedas Globais
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-white">Dólar (USD)</span>
                                    <span className="font-mono text-emerald-400">R$ 5,88</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-white">Euro (EUR)</span>
                                    <span className="font-mono text-emerald-400">R$ 6,20</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-white">Libra (GBP)</span>
                                    <span className="font-mono text-emerald-400">R$ 7,45</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    *Cotação aproximada para fins de demonstração.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={CURRENCY_FAQS}
                    title="Dúvidas sobre Câmbio"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
