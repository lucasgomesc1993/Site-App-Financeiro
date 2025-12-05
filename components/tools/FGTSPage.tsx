import React, { useState, useEffect } from 'react';
import { PiggyBank, Calculator, HelpCircle, Building, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const FGTS_FAQS: FAQItem[] = [
    {
        question: "Quem tem direito ao FGTS?",
        answer: "Todo trabalhador com carteira assinada (CLT), trabalhadores rurais, temporários, avulsos, safreiros e atletas profissionais. Empregados domésticos também têm direito."
    },
    {
        question: "Qual o valor do depósito?",
        answer: "O empregador deve depositar mensalmente 8% do salário bruto do funcionário. Para Jovem Aprendiz, a alíquota é de 2%."
    },
    {
        question: "Quando posso sacar?",
        answer: "Em caso de demissão sem justa causa, aposentadoria, compra da casa própria, doenças graves ou no Saque-Aniversário (opcional)."
    }
];

export function FGTSPage() {
    const [salary, setSalary] = useState('');
    const [balance, setBalance] = useState('');
    const [months, setMonths] = useState('');
    const [result, setResult] = useState<{ monthlyDeposit: number; totalEstimated: number } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const bal = parseFloat(balance.replace(/\./g, '').replace(',', '.') || '0');
        const m = parseInt(months || '0');

        if (isNaN(sal)) {
            setResult(null);
            return;
        }

        const monthlyDeposit = sal * 0.08;

        // Simple projection: Current Balance + (Monthly Deposit * Months)
        // Ignoring interest (TR + 3%) for simplicity in this basic calculator
        const totalEstimated = bal + (monthlyDeposit * m);

        setResult({
            monthlyDeposit,
            totalEstimated
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, balance, months]);

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
        "name": "Calculadora de FGTS",
        "description": "Calcule quanto sua empresa deve depositar de FGTS por mês e projete seu saldo futuro.",
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
                title="Calculadora de FGTS - Saldo e Depósitos Mensais"
                description="Confira se o valor do seu FGTS está correto. Calcule o depósito mensal de 8% e projete seu saldo."
                canonical="/calculadoras/fgts"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": FGTS_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'FGTS', href: '/calculadoras/fgts' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <PiggyBank className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">FGTS</span>
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
                                    Simular Depósitos
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Salário Bruto</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={salary}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setSalary)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Saldo Atual (Opcional)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={balance}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setBalance)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Meses a Projetar</label>
                                        <input
                                            type="number"
                                            value={months}
                                            onChange={(e) => setMonths(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="Ex: 12"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Depósito Mensal (8%)</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.monthlyDeposit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Saldo Projetado</span>
                                        <span className="text-2xl font-bold text-white">
                                            {result ? `R$ ${result.totalEstimated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                                <Building className="w-5 h-5 text-blue-500" />
                                O que é o FGTS?
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    É uma poupança forçada criada para proteger o trabalhador demitido sem justa causa. O dinheiro pertence a você, mas fica retido na Caixa Econômica Federal.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Rendimento</strong>
                                    O FGTS rende 3% ao ano + TR. Recentemente, houve mudanças para garantir que renda pelo menos a inflação (IPCA).
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Fundo de Garantia do Tempo de Serviço. Seu patrimônio protegido.
                    </p>
                </div>

                <FAQ
                    items={FGTS_FAQS}
                    title="Dúvidas sobre FGTS"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
