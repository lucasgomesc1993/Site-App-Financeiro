import React, { useState, useEffect } from 'react';
import { Clock, Calculator, HelpCircle, Timer, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const OVERTIME_FAQS: FAQItem[] = [
    {
        question: "Quanto vale a hora extra?",
        answer: "No mínimo 50% a mais que a hora normal (dias úteis). Aos domingos e feriados, o adicional costuma ser de 100%."
    },
    {
        question: "Como calcular o valor da hora?",
        answer: "Divida seu salário mensal pela jornada mensal (geralmente 220 horas). O resultado é o valor da sua hora normal."
    },
    {
        question: "Incide INSS e FGTS?",
        answer: "Sim. As horas extras integram o salário para todos os fins, incidindo INSS, FGTS, Férias e 13º salário (reflexos)."
    }
];

export function OvertimePage() {
    const [salary, setSalary] = useState('');
    const [hoursWorked, setHoursWorked] = useState('220');
    const [overtime50, setOvertime50] = useState('');
    const [overtime100, setOvertime100] = useState('');
    const [result, setResult] = useState<{ hourlyRate: number; totalOvertime: number; totalSalary: number } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const hours = parseFloat(hoursWorked);
        const ot50 = parseFloat(overtime50.replace(',', '.') || '0');
        const ot100 = parseFloat(overtime100.replace(',', '.') || '0');

        if (isNaN(sal) || isNaN(hours) || hours === 0) {
            setResult(null);
            return;
        }

        const hourlyRate = sal / hours;
        const value50 = hourlyRate * 1.5 * ot50;
        const value100 = hourlyRate * 2.0 * ot100;
        const totalOvertime = value50 + value100;

        setResult({
            hourlyRate,
            totalOvertime,
            totalSalary: sal + totalOvertime
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, hoursWorked, overtime50, overtime100]);

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
        "name": "Calculadora de Horas Extras",
        "description": "Calcule o valor das suas horas extras (50% e 100%) e veja o impacto no seu salário final.",
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
                title="Calculadora de Horas Extras - 50% e 100%"
                description="Trabalhou a mais? Calcule quanto você vai receber de horas extras. Suporte para adicionais de 50% e 100%."
                canonical="/calculadoras/horas-extras"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": OVERTIME_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Horas Extras', href: '/calculadoras/horas-extras' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Horas Extras</span>
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
                                    Calcular Adicional
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
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
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Jornada Mensal (Horas)</label>
                                        <input
                                            type="number"
                                            value={hoursWorked}
                                            onChange={(e) => setHoursWorked(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="220"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Horas Extras 50%</label>
                                        <input
                                            type="text"
                                            value={overtime50}
                                            onChange={(e) => setOvertime50(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="Qtd horas"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Horas Extras 100%</label>
                                        <input
                                            type="text"
                                            value={overtime100}
                                            onChange={(e) => setOvertime100(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="Qtd horas"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Valor Total das Horas Extras</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.totalOvertime.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Valor da sua Hora</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.hourlyRate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Salário + Extras</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.totalSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                                <Timer className="w-5 h-5 text-blue-500" />
                                Regras Básicas
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Hora Normal</span>
                                    <span className="text-white">Valor Base</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Hora Extra 50%</span>
                                    <span className="text-white">Valor Base x 1,5</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Hora Extra 100%</span>
                                    <span className="text-white">Valor Base x 2,0</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mt-2">
                                    <strong className="text-white block mb-1">Reflexos</strong>
                                    Lembre-se que as horas extras habituais aumentam o valor das suas férias, 13º salário e FGTS.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Valorize seu tempo. Calcule exatamente quanto você tem a receber pelo trabalho extra.
                    </p>
                </div>

                <FAQ
                    items={OVERTIME_FAQS}
                    title="Dúvidas sobre Horas Extras"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
