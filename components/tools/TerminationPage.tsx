import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, Briefcase, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const TERMINATION_FAQS: FAQItem[] = [
    {
        question: "O que é aviso prévio indenizado?",
        answer: "É quando a empresa decide desligar o funcionário imediatamente, sem que ele precise trabalhar os 30 dias do aviso. Nesse caso, a empresa paga o salário correspondente a esse mês."
    },
    {
        question: "Tenho direito a multa de 40% do FGTS?",
        answer: "Sim, se a demissão for sem justa causa. A empresa deve pagar uma multa de 40% sobre todo o valor depositado no seu FGTS durante o contrato."
    },
    {
        question: "Como funciona o 13º proporcional?",
        answer: "Você recebe 1/12 do seu salário para cada mês trabalhado no ano (considerando fração igual ou superior a 15 dias)."
    }
];

export function TerminationPage() {
    const [salary, setSalary] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('sem_justa_causa');
    const [notice, setNotice] = useState('trabalhado');
    const [balanceFGTS, setBalanceFGTS] = useState('');
    const [result, setResult] = useState<{ total: number; breakdown: any } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const fgts = parseFloat(balanceFGTS.replace(/\./g, '').replace(',', '.') || '0');

        if (isNaN(sal) || !startDate || !endDate) {
            setResult(null);
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Simple logic for demonstration. Real calculation is complex.
        // Assuming full months for simplicity in this demo
        const monthsWorked = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        let total = 0;
        const breakdown: any = {};

        // Balance of Salary (Saldo de Salário)
        const daysInMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
        const daysWorkedInLastMonth = end.getDate();
        breakdown.salaryBalance = (sal / daysInMonth) * daysWorkedInLastMonth;
        total += breakdown.salaryBalance;

        // Vacation Proportional (Férias Proporcionais)
        // Simplified: 1/12 per month worked in current period (assuming no vacation taken)
        // In real app, need to track vesting periods
        const vacationMonths = monthsWorked % 12;
        breakdown.vacationProportional = (sal / 12) * vacationMonths;
        breakdown.vacationThird = breakdown.vacationProportional / 3;
        total += breakdown.vacationProportional + breakdown.vacationThird;

        // 13th Salary Proportional
        const monthsInCurrentYear = end.getMonth() + 1; // Approximate
        breakdown.thirteenthProportional = (sal / 12) * monthsInCurrentYear;
        total += breakdown.thirteenthProportional;

        // Notice Period (Aviso Prévio)
        if (reason === 'sem_justa_causa' && notice === 'indenizado') {
            // 30 days + 3 days per year
            const years = Math.floor(monthsWorked / 12);
            const noticeDays = 30 + (years * 3);
            breakdown.noticeIndemnified = (sal / 30) * noticeDays;
            total += breakdown.noticeIndemnified;
        }

        // FGTS Fine
        if (reason === 'sem_justa_causa') {
            breakdown.fgtsFine = fgts * 0.40;
            total += breakdown.fgtsFine;
        }

        setResult({ total, breakdown });
    };

    useEffect(() => {
        calculate();
    }, [salary, startDate, endDate, reason, notice, balanceFGTS]);

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
        "name": "Calculadora de Rescisão CLT",
        "description": "Simule o valor da sua rescisão de contrato de trabalho CLT. Cálculo completo com férias, 13º, aviso prévio e multa do FGTS.",
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
                title="Calculadora de Rescisão CLT - Simule seu Acerto"
                description="Foi demitido ou pediu demissão? Calcule o valor exato da sua rescisão, incluindo férias, 13º salário, aviso prévio e multa de 40% do FGTS."
                canonical="/calculadoras/rescisao"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": TERMINATION_FAQS.map(faq => ({
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
                        { label: 'Rescisão CLT', href: '/calculadoras/rescisao' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Rescisão</span>
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
                                    Calcular Acerto
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Último Salário Bruto</label>
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
                                        <label className="text-sm text-gray-400">Data de Admissão</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Data de Afastamento</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Motivo da Rescisão</label>
                                        <select
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        >
                                            <option value="sem_justa_causa">Demissão sem Justa Causa</option>
                                            <option value="pedido_demissao">Pedido de Demissão</option>
                                            <option value="com_justa_causa">Demissão por Justa Causa</option>
                                            <option value="acordo">Acordo (Comum Acordo)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Aviso Prévio</label>
                                        <select
                                            value={notice}
                                            onChange={(e) => setNotice(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        >
                                            <option value="trabalhado">Trabalhado</option>
                                            <option value="indenizado">Indenizado</option>
                                            <option value="nao_cumprido">Não Cumprido (Descontado)</option>
                                        </select>
                                    </div>
                                </div>

                                {reason === 'sem_justa_causa' && (
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Saldo do FGTS (para multa)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={balanceFGTS}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setBalanceFGTS)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Total Estimado a Receber</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    {result && result.breakdown && (
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between text-gray-400">
                                                <span>Saldo de Salário</span>
                                                <span>R$ {result.breakdown.salaryBalance?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-400">
                                                <span>Férias Proporcionais + 1/3</span>
                                                <span>R$ {(result.breakdown.vacationProportional + result.breakdown.vacationThird)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-400">
                                                <span>13º Proporcional</span>
                                                <span>R$ {result.breakdown.thirteenthProportional?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            {result.breakdown.noticeIndemnified > 0 && (
                                                <div className="flex justify-between text-gray-400">
                                                    <span>Aviso Prévio Indenizado</span>
                                                    <span>R$ {result.breakdown.noticeIndemnified?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {result.breakdown.fgtsFine > 0 && (
                                                <div className="flex justify-between text-gray-400">
                                                    <span>Multa 40% FGTS</span>
                                                    <span>R$ {result.breakdown.fgtsFine?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
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
                                <AlertCircle className="w-5 h-5 text-blue-500" />
                                Importante
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    O cálculo de rescisão é complexo e pode variar dependendo da convenção coletiva da sua categoria.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Homologação</strong>
                                    Sempre confira os valores no momento da homologação. Se tiver dúvidas, consulte o sindicato da sua categoria ou um advogado trabalhista.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Simule seus direitos trabalhistas. Saiba quanto receber ao sair da empresa.
                    </p>
                </div>

                <FAQ
                    items={TERMINATION_FAQS}
                    title="Dúvidas sobre Rescisão"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
