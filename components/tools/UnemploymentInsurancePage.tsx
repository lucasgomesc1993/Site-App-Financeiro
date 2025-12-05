import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calculator, HelpCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const UNEMPLOYMENT_FAQS: FAQItem[] = [
    {
        question: "Quem tem direito?",
        answer: "Trabalhadores demitidos sem justa causa que trabalharam por um período mínimo (12 meses para a 1ª solicitação, 9 meses para a 2ª e 6 meses para as demais)."
    },
    {
        question: "Quantas parcelas vou receber?",
        answer: "Varia de 3 a 5 parcelas, dependendo do tempo de trabalho nos últimos 36 meses antes da demissão."
    },
    {
        question: "Qual o valor da parcela?",
        answer: "É calculado com base na média dos últimos 3 salários. O valor não pode ser inferior ao salário mínimo nem superior ao teto do benefício (R$ 2.313,74 em 2024)."
    }
];

export function UnemploymentInsurancePage() {
    const [salary1, setSalary1] = useState('');
    const [salary2, setSalary2] = useState('');
    const [salary3, setSalary3] = useState('');
    const [monthsWorked, setMonthsWorked] = useState('12');
    const [requestCount, setRequestCount] = useState('1');
    const [result, setResult] = useState<{ installmentValue: number; installmentCount: number } | null>(null);

    const calculate = () => {
        const s1 = parseFloat(salary1.replace(/\./g, '').replace(',', '.') || '0');
        const s2 = parseFloat(salary2.replace(/\./g, '').replace(',', '.') || '0');
        const s3 = parseFloat(salary3.replace(/\./g, '').replace(',', '.') || '0');
        const months = parseInt(monthsWorked);
        const request = parseInt(requestCount);

        if (months === 0) {
            setResult(null);
            return;
        }

        // Calculate Average Salary
        let averageSalary = (s1 + s2 + s3) / 3;

        // Calculate Installment Value (2024 Rules)
        let installmentValue = 0;
        if (averageSalary <= 2041.39) {
            installmentValue = averageSalary * 0.8;
        } else if (averageSalary <= 3402.65) {
            installmentValue = 1633.10 + (averageSalary - 2041.39) * 0.5;
        } else {
            installmentValue = 2313.74; // Ceiling
        }

        // Minimum wage floor
        if (installmentValue < 1412.00) {
            installmentValue = 1412.00;
        }

        // Calculate Installment Count
        let installmentCount = 0;

        if (request === 1) {
            if (months >= 12 && months <= 23) installmentCount = 4;
            else if (months >= 24) installmentCount = 5;
            else installmentCount = 0; // Less than 12 months, no right (simplified)
        } else if (request === 2) {
            if (months >= 9 && months <= 11) installmentCount = 3;
            else if (months >= 12 && months <= 23) installmentCount = 4;
            else if (months >= 24) installmentCount = 5;
            else installmentCount = 0;
        } else {
            if (months >= 6 && months <= 11) installmentCount = 3;
            else if (months >= 12 && months <= 23) installmentCount = 4;
            else if (months >= 24) installmentCount = 5;
            else installmentCount = 0;
        }

        if (installmentCount === 0) {
            setResult(null); // Or handle "No right" state better
            return;
        }

        setResult({
            installmentValue,
            installmentCount
        });
    };

    useEffect(() => {
        calculate();
    }, [salary1, salary2, salary3, monthsWorked, requestCount]);

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
        "name": "Calculadora de Seguro Desemprego",
        "description": "Veja se você tem direito e calcule o valor e a quantidade de parcelas do seu Seguro Desemprego.",
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
                title="Calculadora de Seguro Desemprego 2025 - Valor das Parcelas"
                description="Fui demitido, quanto vou receber? Calcule o valor e a quantidade de parcelas do seu Seguro Desemprego."
                canonical="/calculadoras/seguro-desemprego"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": UNEMPLOYMENT_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Seguro Desemprego', href: '/calculadoras/seguro-desemprego' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <ShieldCheck className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">Seguro Desemprego</span>
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
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Simular Benefício
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Últimos 3 Salários</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={salary1}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setSalary1)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-center"
                                                placeholder="Mês 1"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={salary2}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setSalary2)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-center"
                                                placeholder="Mês 2"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={salary3}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setSalary3)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-center"
                                                placeholder="Mês 3"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Meses Trabalhados</label>
                                        <input
                                            type="number"
                                            value={monthsWorked}
                                            onChange={(e) => setMonthsWorked(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Qual solicitação?</label>
                                        <select
                                            value={requestCount}
                                            onChange={(e) => setRequestCount(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        >
                                            <option value="1">1ª Solicitação</option>
                                            <option value="2">2ª Solicitação</option>
                                            <option value="3">3ª ou mais</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Valor da Parcela</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Quantidade de Parcelas</span>
                                        <span className="text-2xl font-bold text-white">
                                            {result ? `${result.installmentCount}x` : '---'}
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
                                <AlertTriangle className="w-5 h-5 text-blue-500" />
                                Regras de Carência
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>1ª Solicitação</span>
                                    <span className="text-white">Min. 12 meses trabalhados</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>2ª Solicitação</span>
                                    <span className="text-white">Min. 9 meses trabalhados</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>3ª Solicitação</span>
                                    <span className="text-white">Min. 6 meses trabalhados</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mt-2">
                                    <strong className="text-white block mb-1">Prazo</strong>
                                    Você tem de 7 a 120 dias após a demissão para dar entrada no benefício.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Consulte seu direito. Veja o valor e a quantidade de parcelas que você irá receber.
                    </p>
                </div>

                <FAQ
                    items={UNEMPLOYMENT_FAQS}
                    title="Dúvidas sobre o Benefício"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
