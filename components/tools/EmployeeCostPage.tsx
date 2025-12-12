import React, { useState, useEffect } from 'react';
import { Users, Calculator, HelpCircle, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const EMPLOYEE_COST_FAQS: FAQItem[] = [
    {
        question: "Quanto custa um funcionário?",
        answer: "Em média, um funcionário pode custar para a empresa quase o dobro do seu salário nominal, dependendo do regime tributário (Simples Nacional, Lucro Presumido ou Real)."
    },
    {
        question: "O que entra no custo?",
        answer: "Salário, férias + 1/3, 13º salário, FGTS (8%), INSS patronal (20% - exceto Simples), RAT, Sistema S, vale-transporte, vale-refeição e provisões para rescisão."
    },
    {
        question: "Simples Nacional é mais barato?",
        answer: "Geralmente sim, pois as empresas do Simples (anexos I, II, III e V) são isentas do INSS Patronal (20%) sobre a folha de pagamento."
    }
];

export function EmployeeCostPage() {
    const [salary, setSalary] = useState('');
    const [regime, setRegime] = useState('simples');
    const [transport, setTransport] = useState('');
    const [food, setFood] = useState('');
    const [result, setResult] = useState<{ totalCost: number; multiplier: number } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const vt = parseFloat(transport.replace(/\./g, '').replace(',', '.') || '0');
        const vr = parseFloat(food.replace(/\./g, '').replace(',', '.') || '0');

        if (isNaN(sal) || sal === 0) {
            setResult(null);
            return;
        }

        // Basic Provisions (Annualized / 12)
        const vacation = sal / 12;
        const vacationThird = vacation / 3;
        const thirteenth = sal / 12;
        const fgts = sal * 0.08;
        const fgtsProvision = (vacation + vacationThird + thirteenth) * 0.08; // FGTS on provisions

        let taxes = 0;

        if (regime === 'presumido_real') {
            // INSS Patronal (20%) + RAT (~2%) + Sistema S (~5.8%) = ~27.8%
            // Simplified to 28% for estimation
            taxes = sal * 0.28;
            // Taxes on provisions (Vacation + 13th)
            taxes += (vacation + vacationThird + thirteenth) * 0.28;
        }

        const benefits = vt + vr;

        const totalMonthlyCost = sal + vacation + vacationThird + thirteenth + fgts + fgtsProvision + taxes + benefits;

        setResult({
            totalCost: totalMonthlyCost,
            multiplier: totalMonthlyCost / sal
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, regime, transport, food]);

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
        "name": "Calculadora de Custo de Funcionário",
        "description": "Quanto custa contratar? Calcule o custo total de um funcionário para sua empresa (Simples Nacional ou Lucro Presumido).",
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
                title="Custo de Funcionário para Empresa - Calculadora CLT"
                description="Contratar custa caro? Simule o custo total de um funcionário (salário + encargos + benefícios) para sua empresa."
                canonical="/calculadoras/custo-funcionario"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": EMPLOYEE_COST_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Custo de Funcionário', href: '/calculadoras/custo-funcionario' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500">Custo de Funcionário</span>
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
                                    Simular Custo
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Salário Bruto</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={salary}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setSalary)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Regime Tributário</label>
                                    <select
                                        value={regime}
                                        onChange={(e) => setRegime(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                    >
                                        <option value="simples">Simples Nacional</option>
                                        <option value="presumido_real">Lucro Presumido / Real</option>
                                    </select>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Vale Transporte (Mensal)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={transport}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setTransport)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Vale Refeição (Mensal)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={food}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setFood)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Custo Total Mensal</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Multiplicador</span>
                                        <span className="text-xl font-bold text-white">
                                            {result ? `${result.multiplier.toFixed(2)}x o salário` : '---'}
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
                                <Briefcase className="w-5 h-5 text-blue-500" />
                                Custos Invisíveis
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    Além do salário, a empresa deve provisionar mensalmente valores para férias e 13º salário, além de pagar os encargos sociais.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Lucro Real/Presumido</strong>
                                    Nesses regimes, o custo dispara devido aos 20% de INSS Patronal e outras taxas do Sistema S e RAT.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Entenda o peso da folha de pagamento. Simule quanto sua empresa paga além do salário.
                    </p>
                </div>

                <FAQ
                    items={EMPLOYEE_COST_FAQS}
                    title="Dúvidas sobre Custos Trabalhistas"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
