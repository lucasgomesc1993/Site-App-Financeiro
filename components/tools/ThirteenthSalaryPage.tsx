import React, { useState, useEffect } from 'react';
import { Gift, Calculator, HelpCircle, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const THIRTEENTH_FAQS: FAQItem[] = [
    {
        question: "Quem tem direito ao 13º salário?",
        answer: "Todo trabalhador com carteira assinada (CLT), aposentados, pensionistas e servidores públicos. É necessário ter trabalhado pelo menos 15 dias no ano."
    },
    {
        question: "Quando é pago?",
        answer: "Geralmente em duas parcelas. A primeira até 30 de novembro (sem descontos) e a segunda até 20 de dezembro (com descontos de INSS e IRRF)."
    },
    {
        question: "Como é calculado?",
        answer: "O valor é proporcional aos meses trabalhados. Divide-se o salário por 12 e multiplica-se pelo número de meses em que você trabalhou pelo menos 15 dias."
    }
];

export function ThirteenthSalaryPage() {
    const [salary, setSalary] = useState('');
    const [monthsWorked, setMonthsWorked] = useState('12');
    const [dependents, setDependents] = useState('0');
    const [firstInstallmentPaid, setFirstInstallmentPaid] = useState(false);
    const [result, setResult] = useState<{ first: number; second: number; total: number } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const months = parseInt(monthsWorked);
        const deps = parseInt(dependents);

        if (isNaN(sal) || isNaN(months) || months < 1 || months > 12) {
            setResult(null);
            return;
        }

        const fullThirteenth = (sal / 12) * months;
        const first = fullThirteenth / 2;

        // Calculate discounts on the FULL amount for the second installment
        // 1. INSS
        let inss = 0;
        if (fullThirteenth <= 1412.00) {
            inss = fullThirteenth * 0.075;
        } else if (fullThirteenth <= 2666.68) {
            inss = 1412.00 * 0.075 + (fullThirteenth - 1412.00) * 0.09;
        } else if (fullThirteenth <= 4000.03) {
            inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (fullThirteenth - 2666.68) * 0.12;
        } else if (fullThirteenth <= 7786.02) {
            inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (fullThirteenth - 4000.03) * 0.14;
        } else {
            inss = 908.85;
        }

        // 2. IRRF
        const deductionPerDependent = 189.59;
        const irrfBase = fullThirteenth - inss - (deps * deductionPerDependent);
        let irrf = 0;
        if (irrfBase <= 2259.20) {
            irrf = 0;
        } else if (irrfBase <= 2826.65) {
            irrf = (irrfBase * 0.075) - 169.44;
        } else if (irrfBase <= 3751.05) {
            irrf = (irrfBase * 0.15) - 381.44;
        } else if (irrfBase <= 4664.68) {
            irrf = (irrfBase * 0.225) - 662.77;
        } else {
            irrf = (irrfBase * 0.275) - 896.00;
        }
        if (irrf < 0) irrf = 0;

        const totalDiscounts = inss + irrf;
        const second = fullThirteenth - first - totalDiscounts;

        setResult({
            first,
            second,
            total: first + second
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, monthsWorked, dependents]);

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
        "name": "Calculadora de Décimo Terceiro",
        "description": "Calcule o valor da primeira e segunda parcela do seu 13º salário.",
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
                title="Calculadora de Décimo Terceiro 2025 - 1ª e 2ª Parcela"
                description="Quanto vou receber de 13º? Calcule o valor exato das parcelas e os descontos de INSS e Imposto de Renda."
                canonical="/calculadoras/decimo-terceiro"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": THIRTEENTH_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Décimo Terceiro', href: '/calculadoras/decimo-terceiro' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Gift className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500">Décimo Terceiro</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            O bônus de natal. Veja quanto você vai receber na primeira e segunda parcela.
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
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Calcular Parcelas
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
                                        <label className="text-sm text-gray-400">Meses Trabalhados</label>
                                        <input
                                            type="number"
                                            value={monthsWorked}
                                            onChange={(e) => setMonthsWorked(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="12"
                                            min="1"
                                            max="12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Dependentes</label>
                                        <input
                                            type="number"
                                            value={dependents}
                                            onChange={(e) => setDependents(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                                            <span className="text-xs text-blue-400 block mb-1">1ª Parcela (Nov)</span>
                                            <span className="text-2xl font-bold text-white">
                                                {result ? `R$ ${result.first.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                                            <span className="text-xs text-blue-400 block mb-1">2ª Parcela (Dez)</span>
                                            <span className="text-2xl font-bold text-white">
                                                {result ? `R$ ${result.second.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Total Líquido</span>
                                        <span className="text-3xl font-bold text-white">
                                            {result ? `R$ ${result.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                                <Calendar className="w-5 h-5 text-blue-500" />
                                Datas Importantes
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>1ª Parcela</span>
                                    <span className="text-white">Até 30 de Novembro</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>2ª Parcela</span>
                                    <span className="text-white">Até 20 de Dezembro</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mt-2">
                                    <strong className="text-white block mb-1">Atenção</strong>
                                    A 2ª parcela é menor porque nela são descontados o INSS e o Imposto de Renda sobre o valor total do benefício.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={THIRTEENTH_FAQS}
                    title="Dúvidas sobre o 13º"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
