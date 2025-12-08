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
        question: "Qual o prazo para a empresa pagar a rescisão em 2025?",
        answer: "A empresa tem até 10 dias corridos após o término do contrato para realizar o pagamento, independentemente se o aviso prévio foi trabalhado ou indenizado. O atraso gera multa no valor de um salário do funcionário."
    },
    {
        question: "O aviso prévio conta para férias e décimo terceiro?",
        answer: "Sim. A Lei determina a \"projeção do aviso prévio\". Isso significa que o tempo do aviso (inclusive os dias extras por ano de casa) conta como tempo de serviço efetivo, gerando mais avos de férias e 13º salário na conta final."
    },
    {
        question: "Como fica o imposto sobre o 13º na rescisão?",
        answer: "O 13º salário possui tributação exclusiva e separada. O cálculo do IRRF sobre o 13º não se mistura com o do saldo de salário ou aviso prévio, o que muitas vezes resulta em um desconto de imposto menor para o trabalhador."
    },
    {
        question: "Posso sacar todo o meu FGTS se pedir demissão?",
        answer: "Não. No pedido de demissão, o trabalhador não tem direito ao saque do FGTS nem à multa de 40%. O valor permanece retido na conta (rendendo juros) e só pode ser sacado em situações específicas, como compra da casa própria, aposentadoria ou após 3 anos sem registro em carteira."
    },
    {
        question: "Qual é o teto máximo de desconto do INSS na rescisão em 2025?",
        answer: "O teto máximo de contribuição para o INSS em 2025 é de R$ 951,63 (soma das parcelas máximas de todas as faixas) para quem recebe acima de R$ 8.157,41. Mesmo que seu salário na rescisão seja de R$ 20.000,00, o desconto não pode ultrapassar esse valor limite."
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

    const calculateIRRF = (value: number, dependents = 0) => {
        const deductionPerDependent = 189.59;
        const taxableBase = value - (dependents * deductionPerDependent);

        for (const range of IRRF_TABLE) {
            if (taxableBase <= range.max) {
                return (taxableBase * range.rate) - range.deduction;
            }
        }
        return 0; // Should be covered by Infinity
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

        // IRRF on Salary Balance (Simplified: Base = Saldo - INSS)
        const irrfSalaryBase = breakdown.salaryBalance - inssSalary;
        const irrfSalary = Math.max(0, calculateIRRF(irrfSalaryBase));
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
            const irrf13Base = thirteenth - inss13;
            const irrf13 = Math.max(0, calculateIRRF(irrf13Base));
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
        "description": "Calcule sua rescisão trabalhista com as regras atualizadas de 2025. Inclui novo salário mínimo (R$ 1.518), tabelas progressivas de INSS e projeção de férias.",
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
                title="Calculadora de Rescisão 2025: Cálculo Exato CLT com Novas Regras"
                description="Calcule sua rescisão trabalhista com as regras atualizadas de 2025. Inclui novo salário mínimo (R$ 1.518), tabelas progressivas de INSS e projeção de férias."
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
                            Calculadora de Rescisão <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Contrato CLT (2025)</span>
                        </h1>
                        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
                            Esta ferramenta simula os valores exatos que você deve receber ao sair de um emprego. Diferente de calculadoras comuns, nosso sistema considera o <strong>INSS progressivo de 2025</strong>, a média de horas extras e as novas faixas de Imposto de Renda.
                        </p>
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
                                Resumo Rápido (2025)
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Salário Mínimo Base</div>
                                    <div className="text-lg font-bold text-white">R$ 1.518,00</div>
                                    <div className="text-xs text-gray-500">Piso nacional vigente</div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Teto do INSS</div>
                                    <div className="text-lg font-bold text-white">R$ 8.157,41</div>
                                    <div className="text-xs text-gray-500">Limite máximo de desconto</div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Prazo de Pagamento:</strong> Até 10 dias corridos após o término do contrato.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Aviso Prévio:</strong> 30 dias + 3 dias por ano completo de empresa (Lei 12.506).</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Percent className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>FGTS:</strong> Multa de 40% sobre o saldo total (ou 20% em acordo mútuo).</span>
                                    </div>
                                </div>
                            </div>
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
                            Tabelas Oficiais e Parâmetros (2025)
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-8 max-w-3xl">
                        Para garantir que o valor final bata com o seu holerite, utilizamos as tabelas de tributação oficiais vigentes a partir de janeiro de 2025. O desconto do INSS agora é fatiado por faixas salariais.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Tabela INSS (2025)</h3>
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
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Tabela IRRF (2025)</h3>
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
                            <p className="text-xs text-gray-500 mt-2">*Dedução por dependente: R$ 189,59.</p>
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
                            <span><strong>Ignorar a Média de Variáveis:</strong> Horas extras, comissões e adicional noturno devem entrar na conta (média dos últimos 12 meses). Calculadoras simples usam apenas o salário base, reduzindo o valor final.</span>
                        </li>
                        <li className="flex gap-3">
                            <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span><strong>Cálculo Linear de INSS:</strong> Aplicar 9% direto sobre o total está errado. O cálculo correto é progressivo, fatiado entre as faixas da tabela oficial.</span>
                        </li>
                        <li className="flex gap-3">
                            <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span><strong>Esquecer a Projeção do Aviso Prévio:</strong> Cada ano trabalhado adiciona 3 dias ao aviso. Esses dias extras contam para gerar mais avos de férias e décimo terceiro.</span>
                        </li>
                    </ul>
                </div>

                {/* Como Funciona o Cálculo / Examples */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Calculator className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como Funciona o Cálculo (Passo a Passo)
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Exemplo 1 */}
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3">Exemplo 1: Salário R$ 3.000,00</h3>
                            <p className="text-sm text-gray-400 mb-4">Funcionário com 2 anos de casa, demissão sem justa causa.</p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>• <strong>Saldo de Salário:</strong> R$ 3.000,00</li>
                                <li>• <strong>Aviso Prévio (36 dias):</strong> R$ 3.600,00</li>
                                <li>
                                    • <strong>Cálculo INSS:</strong>
                                    <ul className="pl-4 mt-1 text-xs text-gray-400 space-y-1">
                                        <li>1ª Faixa (7,5%): R$ 113,85</li>
                                        <li>2ª Faixa (9%): R$ 114,83</li>
                                        <li>3ª Faixa (12%): R$ 24,73 (sobre restante)</li>
                                        <li className="text-red-300 font-bold">Total INSS: R$ 253,41</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        {/* Exemplo 2 */}
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3">Exemplo 2: Salário R$ 7.800,00</h3>
                            <p className="text-sm text-gray-400 mb-4">Gestor com 5 anos de empresa.</p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>• <strong>Base de Cálculo:</strong> R$ 7.800,00</li>
                                <li>
                                    • <strong>Cálculo INSS (4 Faixas):</strong>
                                    <ul className="pl-4 mt-1 text-xs text-gray-400 space-y-1">
                                        <li>1ª Faixa (7,5%): R$ 113,85</li>
                                        <li>2ª Faixa (9%): R$ 114,83</li>
                                        <li>3ª Faixa (12%): R$ 167,63</li>
                                        <li>4ª Faixa (14%): R$ 505,28</li>
                                        <li className="text-red-300 font-bold">Total INSS: R$ 901,59</li>
                                    </ul>
                                </li>
                                <li className="text-xs text-blue-300 mt-2">*Se fosse acima de R$ 8.157,41, travaria no teto.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Casos Especiais */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Casos Especiais e Situações Específicas</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2">Demissão por Acordo</h3>
                            <p className="text-sm text-gray-400">
                                O aviso prévio indenizado é pago pela metade (50%) e a multa do FGTS cai para 20%. O trabalhador saca 80% do saldo, mas não tem direito ao seguro-desemprego.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2">FGTS: Saque-Aniversário</h3>
                            <p className="text-sm text-gray-400">
                                Se você optou pelo Saque-Aniversário, o saldo do FGTS fica bloqueado na demissão. Você recebe apenas a multa de 40%. O valor principal só pode ser sacado nas janelas anuais.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2">Descontos (VT e Banco)</h3>
                            <p className="text-sm text-gray-400">
                                A empresa pode descontar até 6% do salário (Vale-Transporte) e saldo negativo de banco de horas (se previsto em contrato).
                            </p>
                        </div>
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
