import React, { useState, useEffect } from 'react';
import { Moon, Calculator, HelpCircle, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const NIGHT_SHIFT_FAQS: FAQItem[] = [
    {
        question: "O que é adicional noturno?",
        answer: "É um acréscimo no salário pago a quem trabalha entre 22h de um dia e 5h do dia seguinte (trabalhadores urbanos). O valor é, no mínimo, 20% superior à hora diurna."
    },
    {
        question: "A hora noturna é menor?",
        answer: "Sim! A hora noturna tem 52 minutos e 30 segundos. Isso significa que 7 horas de relógio trabalhadas à noite equivalem a 8 horas de trabalho para fins de pagamento."
    },
    {
        question: "Incide sobre horas extras?",
        answer: "Sim. Se você fizer hora extra no período noturno, deve receber o valor da hora extra + o adicional noturno sobre ela (efeito cascata)."
    }
];

export function NightShiftPage() {
    const [salary, setSalary] = useState('');
    const [hoursWorked, setHoursWorked] = useState('220');
    const [nightHours, setNightHours] = useState('');
    const [result, setResult] = useState<{ hourlyRate: number; nightBonus: number; total: number } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const hours = parseFloat(hoursWorked);
        const night = parseFloat(nightHours.replace(',', '.') || '0');

        if (isNaN(sal) || isNaN(hours) || hours === 0) {
            setResult(null);
            return;
        }

        const hourlyRate = sal / hours;
        const nightBonusRate = hourlyRate * 0.20; // 20% minimum
        const totalNightBonus = nightBonusRate * night;

        setResult({
            hourlyRate,
            nightBonus: totalNightBonus,
            total: sal + totalNightBonus
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, hoursWorked, nightHours]);

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
        "name": "Calculadora de Adicional Noturno",
        "description": "Calcule o valor do seu adicional noturno (20%) e veja quanto vai receber a mais no final do mês.",
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
                title="Calculadora de Adicional Noturno - Hora Noturna Reduzida"
                description="Trabalha à noite? Calcule seu adicional noturno de 20% e entenda como funciona a hora reduzida."
                canonical="/calculadoras/adicional-noturno"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": NIGHT_SHIFT_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Adicional Noturno', href: '/calculadoras/adicional-noturno' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Moon className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Adicional Noturno</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Quem trabalha enquanto os outros dormem merece ganhar mais. Calcule seu direito.
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
                                    Calcular Adicional
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Salário Base</label>
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

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Horas Noturnas Trabalhadas</label>
                                    <input
                                        type="text"
                                        value={nightHours}
                                        onChange={(e) => setNightHours(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        placeholder="Qtd horas"
                                    />
                                    <p className="text-xs text-gray-500">Considere a hora reduzida (52min 30s) se aplicável.</p>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Valor do Adicional</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.nightBonus.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Valor da Hora Normal</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.hourlyRate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Salário + Adicional</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                                <Clock className="w-5 h-5 text-blue-500" />
                                Horário Noturno
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Urbano</span>
                                    <span className="text-white">22h às 05h</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Rural (Lavoura)</span>
                                    <span className="text-white">21h às 05h</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Rural (Pecuária)</span>
                                    <span className="text-white">20h às 04h</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mt-2">
                                    <strong className="text-white block mb-1">Dica</strong>
                                    Se você trabalha a noite toda e estende para o dia (ex: até 7h), o adicional noturno também incide sobre as horas diurnas prorrogadas.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={NIGHT_SHIFT_FAQS}
                    title="Dúvidas sobre Adicional Noturno"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
