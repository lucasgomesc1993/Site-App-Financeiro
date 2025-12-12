import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, Briefcase, AlertCircle, ArrowRight, Calendar, DollarSign, FileText, Clock, Percent, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const TERMINATION_FAQS: FAQItem[] = [
    {
        question: "Qual o prazo para pagamento da rescisão em 2025?",
        answer: "O prazo é unificado para todos os tipos de aviso: a empresa deve pagar as verbas em até 10 dias corridos após o término do contrato. Se o pagamento atrasar, o empregador deve pagar uma multa equivalente a um salário nominal do trabalhador (Art. 477 da CLT)."
    },
    {
        question: "A multa de 40% do FGTS é sobre o saldo atual ou total?",
        answer: "A multa de 40% é calculada sobre o saldo total histórico de depósitos feitos durante todo o contrato, corrigidos monetariamente. Mesmo que você tenha zerado a conta com o Saque-Aniversário, o cálculo considera o histórico global."
    },
    {
        question: "Qual o desconto máximo de INSS na rescisão?",
        answer: "Sim, existe um limite. Para quem ganha acima de R$ 8.157,41, o desconto do INSS trava no teto fixo (R$ 951,63 em 2025). Independentemente se o salário for maior, a contribuição não ultrapassará esse valor."
    },
    {
        question: "Como funciona o desconto do Imposto de Renda na rescisão?",
        answer: "O IRRF incide apenas sobre verbas de natureza salarial (saldo de salário, 13º). Verbas indenizatórias — como aviso prévio indenizado, férias indenizadas e multa do FGTS — são <strong>totalmente isentas</strong> de IRRF. É fundamental verificar a base de cálculo para não pagar imposto indevido. Verifique o impacto com a <a href='/calculadoras/salario-liquido'>calculadora de salário líquido</a>."
    },
    {
        question: "O novo salário mínimo de R$ 1.518 afeta minha rescisão?",
        answer: "Sim. Se sua remuneração base segue o piso nacional, o cálculo deve considerar o novo salário mínimo de R$ 1.518,00 vigente em dezembro de 2025. Isso impacta saldo de salário e aviso prévio."
    },
    {
        question: "Tenho direito a férias proporcionais se tiver faltas?",
        answer: "As faltas injustificadas impactam o período aquisitivo. Até 5 faltas, o direito se mantém integral (30 dias). Entre 6 e 14 faltas, cai para 24 dias. Mais de 32 faltas injustificadas retiram o direito às férias. Consulte a <a href='/calculadoras/ferias'>calculadora de férias</a>."
    },
    {
        question: "Como calcular a rescisão por falecimento?",
        answer: "O cálculo assemelha-se ao pedido de demissão, mas sem aviso prévio. Os herdeiros recebem saldo de salário, 13º e férias. O saque do FGTS é imediato para dependentes e não há multa de 40%."
    }
];

export function TerminationPage() {
    const [salary, setSalary] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('sem_justa_causa');
    const [balanceFGTS, setBalanceFGTS] = useState('');
    const [hasExpiredVacation, setHasExpiredVacation] = useState(false);

    // States for results
    const [result, setResult] = useState<{
        totalGross: number;
        totalNet: number;
        totalDiscounts: number;
        breakdown: any
    } | null>(null);

    // 2025 Tables (Tabelas Oficiais conforme Portaria Interministerial MPS/MF nº 2/2025)
    const INSS_TABLE = [
        { max: 1518.00, rate: 0.075, deduction: 0 },
        { max: 2793.88, rate: 0.09, deduction: 22.77 },
        { max: 4190.83, rate: 0.12, deduction: 106.59 },
        { max: 8157.41, rate: 0.14, deduction: 190.40 },
    ];

    // Tabela IRRF 2025 (Vigência a partir de Maio/2025 - MP 1.294/25)
    const IRRF_TABLE = [
        { max: 2428.80, rate: 0, deduction: 0 },
        { max: 2826.65, rate: 0.075, deduction: 182.16 },
        { max: 3751.05, rate: 0.15, deduction: 394.16 },
        { max: 4664.68, rate: 0.225, deduction: 675.49 },
        { max: Infinity, rate: 0.275, deduction: 908.73 },
    ];

    const calculateINSS = (value: number) => {
        let discount = 0;
        let taxableValue = value;

        // Capped at ceiling
        // Capped at ceiling
        if (taxableValue > 8157.41) taxableValue = 8157.41;

        for (let i = 0; i < INSS_TABLE.length; i++) {
            const range = INSS_TABLE[i];
            const prevMax = i === 0 ? 0 : INSS_TABLE[i - 1].max;

            if (taxableValue > prevMax) {
                const base = Math.min(taxableValue, range.max) - prevMax;
                discount += base * range.rate;
            }
        }
        return discount;
    };

    const calculateIRRF = (grossValue: number, inssValue: number, dependents = 0) => {
        const deductionPerDependent = 189.59;
        const simplifiedDiscount = 607.20; // 2025 Simplified Discount

        // Standard Deduction: INSS + Dependents
        const legalDeduction = inssValue + (dependents * deductionPerDependent);

        // Use the most beneficial deduction
        const effectiveDeduction = Math.max(legalDeduction, simplifiedDiscount);

        const taxableBase = grossValue - effectiveDeduction;

        if (taxableBase <= 0) return 0;

        for (const range of IRRF_TABLE) {
            if (taxableBase <= range.max) {
                return (taxableBase * range.rate) - range.deduction;
            }
        }
        return 0;
    };

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const fgts = parseFloat(balanceFGTS.replace(/\./g, '').replace(',', '.') || '0');

        if (isNaN(sal) || !startDate || !endDate) {
            setResult(null);
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            setResult(null);
            return;
        }

        // Logic estimation
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const yearsWorked = Math.floor(diffDays / 365);
        const monthsWorkedTotal = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        let totalGross = 0;
        let totalDiscounts = 0;
        const breakdown: any = {};

        // 1. Saldo de Salário
        const daysInLastMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
        const lastDay = end.getDate();

        // Logic: Pay 30 days if full month, otherwise days worked
        if (lastDay === 31 || (end.getMonth() === 1 && lastDay >= 28)) breakdown.salaryBalance = sal;
        else breakdown.salaryBalance = (sal / 30) * lastDay;

        totalGross += breakdown.salaryBalance;

        // INSS on Salary Balance
        const inssSalary = calculateINSS(breakdown.salaryBalance);
        breakdown.inssSalary = inssSalary;
        totalDiscounts += inssSalary;

        // IRRF on Salary Balance
        const irrfSalary = Math.max(0, calculateIRRF(breakdown.salaryBalance, inssSalary));
        breakdown.irrfSalary = irrfSalary;
        totalDiscounts += irrfSalary;


        // 2. Aviso Prévio
        let noticeDays = 30; // Min
        if (yearsWorked >= 1) noticeDays += (yearsWorked * 3);
        if (noticeDays > 90) noticeDays = 90;

        if (reason === 'sem_justa_causa') {
            breakdown.noticeIndemnified = (sal / 30) * noticeDays;
            totalGross += breakdown.noticeIndemnified;
        } else if (reason === 'acordo') {
            breakdown.noticeIndemnified = ((sal / 30) * noticeDays) / 2; // Half notice
            totalGross += breakdown.noticeIndemnified;
        }
        // Notice Indemnified is Exempt from INSS and usually IRRF.

        // 3. Férias
        const currentPeriodMonths = monthsWorkedTotal % 12;
        const accruedVacation = (sal / 12) * currentPeriodMonths;
        const vacationThird = accruedVacation / 3;

        breakdown.vacationProportional = accruedVacation;
        breakdown.vacationThird = vacationThird;

        // Expired Vacation
        if (hasExpiredVacation) {
            breakdown.vacationExpired = sal;
            breakdown.vacationExpiredThird = sal / 3;
        } else {
            breakdown.vacationExpired = 0;
            breakdown.vacationExpiredThird = 0;
        }

        if (reason !== 'justa_causa') {
            totalGross += breakdown.vacationProportional + breakdown.vacationThird + breakdown.vacationExpired + breakdown.vacationExpiredThird;
        }
        // Vacations are Indemnified -> Exempt from INSS/IRRF in Rescission (usually)

        // 4. 13º Salário
        let monthsInYear = end.getMonth() + 1;
        if (end.getDate() < 15) monthsInYear -= 1;

        const thirteenth = (sal / 12) * monthsInYear;
        breakdown.thirteenthProportional = thirteenth;

        if (reason !== 'justa_causa') {
            totalGross += breakdown.thirteenthProportional;

            // INSS on 13th
            const inss13 = calculateINSS(thirteenth);
            breakdown.inss13 = inss13;
            totalDiscounts += inss13;

            // IRRF on 13th (Exclusive)
            const irrf13 = Math.max(0, calculateIRRF(thirteenth, inss13));
            breakdown.irrf13 = irrf13;
            totalDiscounts += irrf13;
        }

        // 5. FGTS Fine
        if (reason === 'sem_justa_causa') {
            breakdown.fgtsFine = fgts * 0.40;
            totalGross += breakdown.fgtsFine;
        } else if (reason === 'acordo') {
            breakdown.fgtsFine = fgts * 0.20;
            totalGross += breakdown.fgtsFine;
        }

        const totalNet = totalGross - totalDiscounts;

        setResult({ totalGross, totalNet, totalDiscounts, breakdown });
    };

    useEffect(() => {
        calculate();
    }, [salary, startDate, endDate, reason, balanceFGTS, hasExpiredVacation]);

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
        "name": "Calculadora de Rescisão 2025: Cálculo Exato CLT com Novas Regras",
        "url": "https://www.junny.com.br/calculadoras/rescisao",
        "description": "Use nossa Calculadora de Rescisão para simular regras de Dez/2025. Inclui aviso prévio, multa 40% FGTS e descontos INSS/IRRF. Resultado imediato.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Cálculo de Rescisão CLT 2025",
            "Simulação de Multa do FGTS (40%)",
            "Cálculo de Férias e 13º Proporcionais",
            "Aviso Prévio Indenizado",
            "Cálculo de Descontos INSS e IRRF"
        ],
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        }
    };

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Calculadora de Rescisão 2025: Cálculo Exato CLT"
                description="Use nossa Calculadora de Rescisão para simular regras de Dez/2025. Inclui aviso prévio, multa 40% FGTS e descontos INSS/IRRF. Resultado imediato."
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

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Atualizado para 2025</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Rescisão <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">2025: Guia Completo e Atualizado (CLT)</span>
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Section */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Simular Rescisão
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {/* Dates Row */}
                                <div className="grid md:grid-cols-2 gap-6 w-full">
                                    <div className="space-y-2">
                                        <label htmlFor="startDate" className="text-sm text-gray-400">Data de Admissão</label>
                                        <div className="relative">
                                            <input
                                                id="startDate"
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:bg-transparent"
                                            />
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="endDate" className="text-sm text-gray-400">Data de Afastamento</label>
                                        <div className="relative">
                                            <input
                                                id="endDate"
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:bg-transparent"
                                            />
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Salary & Reason */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="salary" className="text-sm text-gray-400">Salário Bruto</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                            <input
                                                id="salary"
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
                                        <label htmlFor="reason" className="text-sm text-gray-400">Motivo</label>
                                        <div className="relative">
                                            <select
                                                id="reason"
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="sem_justa_causa">Sem Justa Causa</option>
                                                <option value="pedido_demissao">Pedido de Demissão</option>
                                                <option value="com_justa_causa">Justa Causa</option>
                                                <option value="acordo">Acordo (Comum Acordo)</option>
                                            </select>
                                            <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Expired Vacation Checkbox */}
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setHasExpiredVacation(!hasExpiredVacation)}>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${hasExpiredVacation ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
                                        {hasExpiredVacation && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <span className="text-sm text-gray-300">Possui férias vencidas (1 ano)?</span>
                                </div>


                                {/* Conditional Fields */}
                                {(reason === 'sem_justa_causa' || reason === 'acordo') && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label htmlFor="balanceFGTS" className="text-sm text-gray-400">Saldo do FGTS (para multa)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                            <input
                                                id="balanceFGTS"
                                                type="text"
                                                inputMode="decimal"
                                                value={balanceFGTS}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setBalanceFGTS)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400">Informe o saldo total acumulado para cálculo correto da multa.</p>
                                    </div>
                                )}

                                {/* Result Block */}
                                <div className="pt-2">
                                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">
                                            Valor Líquido Estimado
                                        </span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.totalNet.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ 0,00'}
                                        </span>

                                        {result && (
                                            <div className="flex justify-center gap-4 mt-3 text-xs">
                                                <span className="text-gray-400">Bruto: R$ {result.totalGross.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                <span className="text-red-400">Descontos: R$ {result.totalDiscounts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        )}
                                    </div>

                                    {result && result.breakdown && (
                                        <div className="grid grid-cols-1 gap-3 text-sm">
                                            {result.breakdown.salaryBalance > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <span className="text-gray-300">Saldo de Salário</span>
                                                    <span className="text-white font-medium">R$ {result.breakdown.salaryBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {result.breakdown.inssSalary > 0 && (
                                                <div className="flex justify-between p-2 pl-6 text-xs rounded-lg text-red-400">
                                                    <span>- INSS (Sobre Salário)</span>
                                                    <span>R$ {result.breakdown.inssSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {result.breakdown.irrfSalary > 0 && (
                                                <div className="flex justify-between p-2 pl-6 text-xs rounded-lg text-red-400">
                                                    <span>- IRRF (Sobre Salário)</span>
                                                    <span>R$ {result.breakdown.irrfSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}

                                            {(result.breakdown.vacationProportional > 0) && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <span className="text-gray-300">Férias + 1/3 (Prop)</span>
                                                    <span className="text-white font-medium">R$ {(result.breakdown.vacationProportional + result.breakdown.vacationThird).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}

                                            {(result.breakdown.vacationExpired > 0) && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <span className="text-gray-300">Férias Vencidas + 1/3</span>
                                                    <span className="text-white font-medium">R$ {(result.breakdown.vacationExpired + result.breakdown.vacationExpiredThird).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}

                                            {(result.breakdown.thirteenthProportional > 0) && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <span className="text-gray-300">13º Salário Prop.</span>
                                                    <span className="text-white font-medium">R$ {result.breakdown.thirteenthProportional.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {result.breakdown.inss13 > 0 && (
                                                <div className="flex justify-between p-2 pl-6 text-xs rounded-lg text-red-400">
                                                    <span>- INSS (Sobre 13º)</span>
                                                    <span>R$ {result.breakdown.inss13.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {result.breakdown.irrf13 > 0 && (
                                                <div className="flex justify-between p-2 pl-6 text-xs rounded-lg text-red-400">
                                                    <span>- IRRF (Sobre 13º)</span>
                                                    <span>R$ {result.breakdown.irrf13.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}

                                            {result.breakdown.noticeIndemnified > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <span className="text-gray-300">Aviso Prévio Indenizado</span>
                                                    <span className="text-white font-medium">R$ {result.breakdown.noticeIndemnified.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {result.breakdown.fgtsFine > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <span className="text-gray-300">Multa FGTS</span>
                                                    <span className="text-white font-medium">R$ {result.breakdown.fgtsFine.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Content (Quick Summary) */}
                    <div className="lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Resumo Rápido (Dados Oficiais Dezembro/2025)
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Salário Mínimo Base</div>
                                    <div className="text-lg font-bold text-white">R$ 1.518,00</div>
                                    <div className="text-xs text-gray-400">Referência para pisos e seguro-desemprego</div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Teto do INSS</div>
                                    <div className="text-lg font-bold text-white">R$ 8.157,41</div>
                                    <div className="text-xs text-gray-400">Limite máximo de desconto</div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Prazo de Pagamento:</strong> Até 10 dias corridos após o término do contrato.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Percent className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Multa do FGTS:</strong> 40% sobre o saldo total histórico (não apenas o saldo atual).</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <DollarSign className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Isenção de IRRF:</strong> Rendimentos até R$ 2.428,80 estão isentos.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Intro Text (Moved Below Calculator) */}
                <div className="max-w-4xl mx-auto mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        O cálculo da rescisão trabalhista é a etapa final e mais crítica da relação de emprego. Esta <strong>calculadora de rescisão</strong> não apenas soma seus direitos, mas aplica as regras tributárias vigentes em dezembro de 2025, considerando a progressividade do INSS e as deduções atualizadas do Imposto de Renda. Se você foi demitido, pediu demissão ou fez um acordo, use a <strong>calculadora de rescisão</strong> acima para validar se o valor oferecido pela empresa ("homologação") está correto e evitar prejuízos financeiros permanentes.
                    </p>
                </div>

                {/* Resumo em 30 Segundos */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Clock className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Resumo em 30 Segundos: O Que a <strong>Calculadora de Rescisão</strong> Considera
                        </h2>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-4 text-gray-300">
                        <li className="flex gap-3 items-center bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span><strong>Base:</strong> Salário + Médias de horas extras.</span>
                        </li>
                        <li className="flex gap-3 items-center bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <span><strong>Descontos:</strong> INSS (Teto R$ 8.157,41) e IRRF.</span>
                        </li>
                        <li className="flex gap-3 items-center bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                            <span><strong>Isentos:</strong> Aviso Prévio, Férias Indenizadas e Multa 40%.</span>
                        </li>
                        <li className="flex gap-3 items-center bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-yellow-400" />
                            <span><strong>Prazo:</strong> Pagamento em até 10 dias corridos.</span>
                        </li>
                    </ul>
                </div>

                {/* Como funciona a Calculadora de Rescisão (Instructions) */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <HelpCircle className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como funciona a Calculadora de Rescisão
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Para obter o resultado exato na nossa <strong>calculadora de rescisão</strong>, siga estes passos simples:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <div className="text-blue-500 font-bold mb-2">01. Preencha os Dados</div>
                            <p className="text-sm text-gray-300">Informe seu último salário bruto, data de admissão e data de saída.</p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <div className="text-blue-500 font-bold mb-2">02. Selecione o Motivo</div>
                            <p className="text-sm text-gray-300">Escolha o tipo de desligamento (ex: sem justa causa ou pedido de demissão) e o tipo de aviso prévio.</p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <div className="text-blue-500 font-bold mb-2">03. Visualize o Cálculo</div>
                            <p className="text-sm text-gray-300">O sistema processará automaticamente as regras de 2025, exibindo o valor líquido e as deduções legais.</p>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}

                {/* Tabelas Oficiais */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Briefcase className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Tabelas Oficiais para o Cálculo (Vigência 2025)
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-8 max-w-3xl">
                        Para chegar ao valor líquido apresentado pela <strong>calculadora de rescisão</strong>, é necessário deduzir o INSS e o Imposto de Renda (IRRF) incidentes sobre o saldo de salário, 13º proporcional e horas extras. Verbas indenizatórias (como férias indenizadas e multa do FGTS) são isentas destes descontos.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Tabela Progressiva do INSS (Dezembro 2025)</h3>
                            <div className="overflow-x-auto rounded-xl border border-white/10">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-gray-300">
                                        <tr>
                                            <th className="p-3">Faixa Salarial (R$)</th>
                                            <th className="p-3">Alíquota</th>
                                            <th className="p-3">Dedução</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400 divide-y divide-white/5">
                                        <tr><td className="p-3">Até 1.518,00</td><td className="p-3">7,5%</td><td className="p-3">-</td></tr>
                                        <tr><td className="p-3">1.518,01 a 2.793,88</td><td className="p-3">9%</td><td className="p-3">22,77</td></tr>
                                        <tr><td className="p-3">2.793,89 a 4.190,83</td><td className="p-3">12%</td><td className="p-3">106,59</td></tr>
                                        <tr><td className="p-3">4.190,84 a 8.157,41</td><td className="p-3">14%</td><td className="p-3">190,40</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 text-xs text-gray-500 space-y-2">
                                <p><strong>Fonte Oficial:</strong> Dados baseados na <a href="https://www.gov.br/inss/pt-br/noticias/confira-como-ficaram-as-aliquotas-de-contribuicao-ao-inss" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Portaria Interministerial MPS/MF nº 6/2025</a>.</p>
                                <p><strong>Entenda a Progressividade:</strong> Desde a reforma da previdência, o cálculo do INSS é <strong>progressivo por faixas</strong>. Isso significa que a alíquota não incide cheia sobre o total. Quem ganha R$ 4.000,00, por exemplo, não paga 14% sobre tudo, mas sim taxas fatiadas sobre cada pedaço do salário que se encaixa nas faixas acima, resultando em um desconto menor do que no modelo antigo.</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Tabela do Imposto de Renda (IRRF)</h3>
                            <p className="text-xs text-gray-400 mb-4">A partir de maio de 2025, aplica-se o desconto simplificado de <strong>R$ 607,20</strong> caso seja mais vantajoso que as deduções legais.</p>
                            <div className="overflow-x-auto rounded-xl border border-white/10">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-gray-300">
                                        <tr>
                                            <th className="p-3">Base de Cálculo (R$)</th>
                                            <th className="p-3">Alíquota</th>
                                            <th className="p-3">Dedução</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400 divide-y divide-white/5">
                                        <tr><td className="p-3">Até 2.428,80</td><td className="p-3">Isento</td><td className="p-3">-</td></tr>
                                        <tr><td className="p-3">2.428,81 a 2.826,65</td><td className="p-3">7,5%</td><td className="p-3">182,16</td></tr>
                                        <tr><td className="p-3">2.826,66 a 3.751,05</td><td className="p-3">15,0%</td><td className="p-3">394,16</td></tr>
                                        <tr><td className="p-3">3.751,06 a 4.664,68</td><td className="p-3">22,5%</td><td className="p-3">675,49</td></tr>
                                        <tr><td className="p-3">Acima de 4.664,68</td><td className="p-3">27,5%</td><td className="p-3">908,73</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-2 text-xs text-gray-500 space-y-1">
                                <p>*Dedução por dependente: R$ 189,59.</p>
                                <p><strong>Fonte Oficial:</strong> Tabela vigente conforme <a href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Receita Federal do Brasil</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Erros Comuns */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <AlertCircle className="w-8 h-8 text-yellow-500 shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-yellow-200 mb-2">Erros Comuns ao Calcular a Rescisão</h3>
                            <p className="text-yellow-100/80">Evite perder dinheiro ignorando estes detalhes:</p>
                        </div>
                    </div>
                    <ul className="space-y-4 text-yellow-100/70">
                        <li className="flex gap-3">
                            <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span>Muitos trabalhadores perdem dinheiro ao aceitar cálculos simplificados que ignoram as médias variáveis. Se você recebia <strong>comissões, horas extras ou adicional noturno</strong> habitualmente, esses valores devem integrar a base de cálculo para pagamento de férias e 13º salário. Por isso, nossa <strong>calculadora de rescisão</strong> considera esses inputs essenciais para evitar distorções no valor final.</span>
                        </li>
                        <li className="flex gap-3">
                            <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span>Se você fez muitas horas extras nos últimos meses, utilize nossa <Link to="/calculadoras/horas-extras" className="underline hover:text-yellow-200">calculadora de horas extras</Link> para verificar a média correta antes de assinar a rescisão.</span>
                        </li>
                    </ul>
                </div>

                {/* Como Calcular a Rescisão (Passo a Passo) */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Calculator className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como Calcular a Rescisão (Passo a Passo)
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">1. Fórmula Rápida (Conceitual)</h3>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-6 font-mono text-sm text-blue-300">
                                Rescisão Líquida = (Verbas Salariais + Verbas Indenizatórias) - (INSS + IRRF + Adiantamentos)
                            </div>

                            <h3 className="text-lg font-bold text-white mb-4">2. Detalhamento dos Proventos</h3>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span><strong>Saldo de Salário:</strong> Divida seu salário por 30 e multiplique pelos dias trabalhados no mês.</span>
                                </li>
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span><strong>Aviso Prévio (Lei 12.506/11):</strong> Se indenizado, 30 dias + 3 dias por ano (limite 90 dias). Consulte a lei na íntegra no <a href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12506.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Planalto</a>.</span>
                                </li>
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span><strong>13º Salário Proporcional:</strong> 1/12 por mês trabalhado (mês = fração {'>'}= 15 dias).</span>
                                </li>
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span><strong>Férias:</strong> Vencidas (se houver) + Proporcionais + 1/3 Constitucional.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            {/* Exemplo 1 */}
                            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                <h3 className="text-md font-bold text-white mb-2">Exemplo 1: Salário R$ 3.000,00</h3>
                                <p className="text-xs text-gray-400 mb-3">Sem justa causa, 2 anos de casa, saída 10/12/2025.</p>
                                <ul className="space-y-1.5 text-xs text-gray-300">
                                    <li>• <strong>Saldo de Salário (10 dias):</strong> R$ 1.000,00</li>
                                    <li>• <strong>Aviso Prévio (36 dias):</strong> R$ 3.600,00</li>
                                    <li>• <strong>13º Salário (11/12):</strong> R$ 2.750,00</li>
                                    <li>• <strong>Férias Vencidas + 1/3:</strong> R$ 4.000,00</li>
                                    <li>• <strong>Férias Prop. (11/12) + 1/3:</strong> R$ 3.666,66</li>
                                    <li className="text-red-300">• <strong>Desconto INSS (Saldo):</strong> R$ 75,00 (Aprox)</li>
                                    <li className="text-red-300">• <strong>Desconto INSS (13º):</strong> R$ 224,73</li>
                                </ul>
                            </div>

                            {/* Exemplo 2 */}
                            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                <h3 className="text-md font-bold text-white mb-2">Exemplo 2: Salário R$ 8.500,00 (Acima do Teto)</h3>
                                <p className="text-xs text-gray-400 mb-3">Executivo, sem justa causa.</p>
                                <ul className="space-y-1.5 text-xs text-gray-300">
                                    <li>• <strong>Saldo de Salário:</strong> R$ 8.500,00</li>
                                    <li>• <strong>Desconto INSS:</strong> <span className="text-red-300">R$ 951,63 (Travado no Teto)</span></li>
                                    <li>• <strong>Base de Cálculo IRRF:</strong> R$ 7.548,37</li>
                                    <li>• <strong>Desconto IRRF:</strong> 27,5% sobre a base - dedução.</li>
                                    <li className="text-blue-300 italic flex items-start gap-1 mt-1">
                                        <ArrowRight className="w-3 h-3 mt-0.5" />
                                        <span>INSS não incide sobre o que excede R$ 8.157,41.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tipos de Demissão e Direitos Específicos */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Tipos de Demissão e Direitos Específicos</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Demissão Sem Justa Causa</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                O cenário mais comum. Você recebe todas as verbas (aviso prévio, férias, 13º), saca o FGTS e tem direito à multa de 40%.
                            </p>
                            <div className="text-xs text-blue-400 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Direito ao <Link to="/calculadoras/seguro-desemprego" className="underline hover:text-blue-300">Seguro-Desemprego</Link></span>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Pedido de Demissão</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                A iniciativa é sua. Você <strong>perde</strong> o direito ao Aviso Prévio (se não cumprir, a empresa desconta), não saca o FGTS nem a multa de 40%.
                            </p>
                            <div className="text-xs text-red-400 flex items-center gap-1">
                                <XCircle className="w-3 h-3" />
                                <span>Sem Seguro-Desemprego</span>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Acordo Comum (Reforma)</h3>
                            <p className="text-sm text-gray-400 mb-2">
                                Empresa e empregado decidem pelo fim do contrato.
                            </p>
                            <ul className="text-xs text-gray-400 space-y-1 ml-1">
                                <li>• Aviso Prévio Indenizado: 50%</li>
                                <li>• Multa FGTS: 20%</li>
                                <li>• Saque FGTS: Até 80% do saldo (<Link to="/calculadoras/fgts" className="text-blue-400 hover:underline">calculadora de FGTS</Link>)</li>
                            </ul>
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Rescisão Indireta</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                "Justa causa do patrão" (ex: falta de pagamento). Se reconhecida na justiça, garante todos os direitos da demissão sem justa causa.
                            </p>
                            <div className="text-xs text-blue-400 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Verbas Integrais</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-6 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-blue-500" />
                            Aviso Trabalhado vs. Indenizado
                        </h3>
                        <p className="text-sm text-gray-400">
                            No <strong>Aviso Trabalhado</strong>, você continua na empresa por 30 dias (com redução de jornada) e o valor sofre descontos de INSS/IRRF. No <strong>Aviso Indenizado</strong>, a empresa paga sem você trabalhar; o valor é indenizatório e <strong>isento de descontos</strong>.
                        </p>
                    </div>
                </div>

                <FAQ
                    items={TERMINATION_FAQS}
                    title="Dúvidas Frequentes (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
