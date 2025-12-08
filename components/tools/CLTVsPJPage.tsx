import React, { useState, useEffect } from 'react';
import { Briefcase, Calculator, DollarSign, Scale, ArrowRight, Wallet, TrendingUp, TrendingDown, AlertCircle, Building2, HelpCircle, Info, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const CLT_PJ_FAQS: FAQItem[] = [
    {
        question: "Qual o valor máximo (teto) de desconto do INSS em 2025?",
        answer: "O teto previdenciário para 2025 é de R$ 8.157,41. Quem ganha salários CLT acima desse valor terá o desconto travado em aproximadamente R$ 951,63 mensais, não incidindo contribuição sobre o excedente."
    },
    {
        question: "Qual o multiplicador ideal para sair de CLT para PJ em 2025?",
        answer: "O multiplicador seguro é de 1.5x (50% de aumento sobre o bruto). Para salários baixos (até R$ 4k), 1.3x pode empatar. Para salários altos (acima de R$ 15k), 1.6x gera grande vantagem patrimonial devido à economia tributária."
    },
    {
        question: "PJ tem direito a Seguro-Desemprego?",
        answer: "Não. O seguro-desemprego é exclusivo para trabalhadores CLT demitidos sem justa causa. O PJ deve construir sua própria reserva de emergência (recomendado 6 a 12 meses de custo de vida) para cobrir o risco de encerramento de contrato."
    },
    {
        question: "Quanto custa manter uma empresa PJ (CNPJ)?",
        answer: "Além dos impostos sobre a nota (DAS), considere custos fixos de contabilidade (R$ 150 a R$ 600/mês), Certificado Digital anual (R$ 200) e taxas de alvará/TFE municipal. Esses custos devem ser deduzidos do valor da proposta antes de calcular seu lucro pessoal."
    }
];

export function CLTVsPJPage() {
    // CLT States
    const [salary, setSalary] = useState('');
    const [benefits, setBenefits] = useState('');

    // PJ States
    const [pjSalary, setPjSalary] = useState('');
    const [proLabore, setProLabore] = useState('');
    const [useRFactorOptimization, setUseRFactorOptimization] = useState(true);

    const [result, setResult] = useState<{
        cltTotal: number;
        netClt: number;

        pjDetails: {
            revenue: number;
            taxRate: number;
            taxAmount: number;
            proLabore: number;
            inssProLabore: number;
            irrfProLabore: number;
            netProLabore: number;
            exemptProfit: number;
            finalPjPocket: number;
            annex: string;
            factorR: number;
        };

        difference: number;
    } | null>(null);

    // Auto-update Pro-labore if optimization is checked
    useEffect(() => {
        if (useRFactorOptimization && pjSalary) {
            const pjVal = parseFloat(pjSalary.replace(/\./g, '').replace(',', '.') || '0');
            const optimizedProLabore = Math.max(pjVal * 0.28, 1518.00); // Minimum 28% or min wage (2025: 1518)
            setProLabore((optimizedProLabore * 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }).replace('.', ','));
        }
    }, [pjSalary, useRFactorOptimization]);

    const calculate = () => {
        const salaryVal = parseFloat(salary.replace(/\./g, '').replace(',', '.') || '0');
        const benefitsVal = parseFloat(benefits.replace(/\./g, '').replace(',', '.') || '0');
        const pjVal = parseFloat(pjSalary.replace(/\./g, '').replace(',', '.') || '0');
        const proLaboreVal = parseFloat(proLabore.replace(/\./g, '').replace(',', '.') || '0');

        if (salaryVal === 0 && pjVal === 0) {
            setResult(null);
            return;
        }

        // --- CLT Logic (2025 Rules) ---
        let inss = 0;
        if (salaryVal <= 1518.00) {
            inss = salaryVal * 0.075;
        } else if (salaryVal <= 2793.88) {
            inss = 1518.00 * 0.075 + (salaryVal - 1518.00) * 0.09;
        } else if (salaryVal <= 4190.83) {
            inss = 1518.00 * 0.075 + (2793.88 - 1518.00) * 0.09 + (salaryVal - 2793.88) * 0.12;
        } else if (salaryVal <= 8157.41) {
            inss = 1518.00 * 0.075 + (2793.88 - 1518.00) * 0.09 + (4190.83 - 2793.88) * 0.12 + (salaryVal - 4190.83) * 0.14;
        } else {
            // Ceiling
            inss = 1518.00 * 0.075 +
                (2793.88 - 1518.00) * 0.09 +
                (4190.83 - 2793.88) * 0.12 +
                (8157.41 - 4190.83) * 0.14;
        }

        // IRRF Base Logic (Simplified vs Legal)
        const irrfBaseLegal = salaryVal - inss;
        const irrfBaseSimplified = salaryVal - 607.20;
        const irrfBase = Math.max(0, Math.min(irrfBaseLegal, irrfBaseSimplified));

        // IRRF 2025
        let irrf = 0;
        if (irrfBase <= 2428.80) {
            irrf = 0;
        } else if (irrfBase <= 2826.65) {
            irrf = (irrfBase * 0.075) - 182.16;
        } else if (irrfBase <= 3751.05) {
            irrf = (irrfBase * 0.15) - 394.16;
        } else if (irrfBase <= 4664.68) {
            irrf = (irrfBase * 0.225) - 675.49;
        } else {
            irrf = (irrfBase * 0.275) - 908.73;
        }
        if (irrf < 0) irrf = 0;

        const netCltMonthly = salaryVal - inss - irrf;
        // CLT Comparable = Net + Benefits + (13th + Vacation + FGTS)/12
        const fgts = salaryVal * 0.08;
        const thirteenth = salaryVal / 12;
        const vacation = (salaryVal + salaryVal / 3) / 12;
        const cltComparableMonthly = netCltMonthly + benefitsVal + fgts + thirteenth + vacation;


        // --- PJ Logic (With Progressive Simples Nacional) ---
        const accountantCost = 300; // Est monthly

        // Fator R calc
        const factorR = pjVal > 0 ? (proLaboreVal / pjVal) : 0;

        // Simples Nacional Calculation (Progressive)
        const annualRevenue = pjVal * 12;
        let pjTaxRate = 0;
        let pjTaxAmount = 0;
        let annex = '';

        if (factorR >= 0.28) {
            annex = 'Anexo III (Fator R OK)';
            // Anexo III Brackets (2025)
            // 1: Up to 180k -> 6%
            // 2: 180k-360k -> 11.2% - 9360
            // 3: 360k-720k -> 13.5% - 17640
            // 4: 720k-1.8M -> 16% - 35640
            // 5: 1.8M-3.6M -> 21% - 125640 ... simplified up to typical ranges

            let nominalRate = 0;
            let deduction = 0;

            if (annualRevenue <= 180000) {
                nominalRate = 0.06;
                deduction = 0;
            } else if (annualRevenue <= 360000) {
                nominalRate = 0.112;
                deduction = 9360;
            } else if (annualRevenue <= 720000) {
                nominalRate = 0.135;
                deduction = 17640;
            } else if (annualRevenue <= 1800000) {
                nominalRate = 0.16;
                deduction = 35640;
            } else {
                nominalRate = 0.21;
                deduction = 125640; // Max for this calc scope
            }

            // Effective Rate Formula: ((RBT12 * Aliq) - Ded) / RBT12
            const calculatedTax = (annualRevenue * nominalRate) - deduction;
            pjTaxAmount = calculatedTax / 12; // Monthly tax
            pjTaxRate = pjTaxAmount / pjVal;

        } else {
            annex = 'Anexo V (Fator R < 28%)';
            // Anexo V Brackets (2025)
            // 1: Up to 180k -> 15.5%
            // 2: 180k-360k -> 18% - 4500
            // 3: 360k-720k -> 19.5% - 9900

            let nominalRate = 0;
            let deduction = 0;

            if (annualRevenue <= 180000) {
                nominalRate = 0.155;
                deduction = 0;
            } else if (annualRevenue <= 360000) {
                nominalRate = 0.18;
                deduction = 4500;
            } else if (annualRevenue <= 720000) {
                nominalRate = 0.195;
                deduction = 9900;
            } else {
                nominalRate = 0.205; // 4th bracket approx
                deduction = 17100;
            }

            const calculatedTax = (annualRevenue * nominalRate) - deduction;
            pjTaxAmount = calculatedTax / 12;
            pjTaxRate = pjTaxAmount / pjVal;
        }

        // Pro-labore Taxes (Person)
        // INSS on Pro-labore (11% fixed purely for simplicity on business owner, max ceiling)
        let inssProLabore = 0;
        if (proLaboreVal <= 8157.41) {
            inssProLabore = proLaboreVal * 0.11;
        } else {
            inssProLabore = 8157.41 * 0.11; // Ceiling approximation
        }

        // IRRF on Pro-labore (Same 2025 rules)
        const irrfPLBaseLegal = proLaboreVal - inssProLabore;
        const irrfPLBaseSimplified = proLaboreVal - 607.20;
        const irrfProLaboreBase = Math.max(0, Math.min(irrfPLBaseLegal, irrfPLBaseSimplified));

        let irrfProLabore = 0;
        if (irrfProLaboreBase <= 2428.80) {
            irrfProLabore = 0;
        } else if (irrfProLaboreBase <= 2826.65) {
            irrfProLabore = (irrfProLaboreBase * 0.075) - 182.16;
        } else if (irrfProLaboreBase <= 3751.05) {
            irrfProLabore = (irrfProLaboreBase * 0.15) - 394.16;
        } else if (irrfProLaboreBase <= 4664.68) {
            irrfProLabore = (irrfProLaboreBase * 0.225) - 675.49;
        } else {
            irrfProLabore = (irrfProLaboreBase * 0.275) - 908.73;
        }
        if (irrfProLabore < 0) irrfProLabore = 0;

        const netProLabore = proLaboreVal - inssProLabore - irrfProLabore;
        const companyCost = pjVal - pjTaxAmount - proLaboreVal - accountantCost;
        const exemptProfit = companyCost; // Assuming all remaining is profit logic

        // Owner Pocket = Net Pro Labore + Exempt Profit
        const finalPjPocket = netProLabore + exemptProfit;

        setResult({
            cltTotal: cltComparableMonthly,
            netClt: netCltMonthly,
            pjDetails: {
                revenue: pjVal,
                taxRate: pjTaxRate,
                taxAmount: pjTaxAmount,
                proLabore: proLaboreVal,
                inssProLabore,
                irrfProLabore,
                netProLabore,
                exemptProfit,
                finalPjPocket,
                annex,
                factorR
            },
            difference: finalPjPocket - cltComparableMonthly
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, benefits, pjSalary, proLabore]);

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
        "name": "Calculadora CLT vs PJ: Comparativo Completo 2025",
        "url": "https://www.junny.com.br/calculadoras/clt-vs-pj",
        "description": "Descubra o que vale mais a pena: ser funcionário CLT ou abrir empresa PJ. Compare salários, impostos, benefícios e veja o lucro real.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Comparativo Líquido CLT x PJ",
            "Cálculo de Impostos (Simples Nacional vs IRRF)",
            "Estimativa de Benefícios (Férias, 13º, FGTS)",
            "Análise de Fator R"
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
                title="Calculadora CLT vs PJ 2025: Comparativo Real e Salário Líquido"
                description="Descubra se vale a pena ser PJ ou CLT em 2025. Compare salário líquido, impostos (INSS/IRPF), Fator R e benefícios. Veja cálculo corrigido com o novo teto."
                canonical="/calculadoras/clt-vs-pj"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CLT_PJ_FAQS.map(faq => ({
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
                        { label: 'CLT vs PJ', href: '/calculadoras/clt-vs-pj' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Carreira e Contratos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">CLT vs PJ 2025</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Compare salários, impostos e benefícios. Entenda por que ganhar R$ 10k como PJ não é igual a R$ 10k CLT e evite armadilhas na migração.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Form */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Simule a Comparação
                                </h2>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">Opção CLT</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Salário Bruto Mensal</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
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
                                            <label className="text-sm text-gray-400">Benefícios (VR, VA, Plano)</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                                <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    value={benefits}
                                                    onChange={(e) => handleCurrencyInput(e.target.value, setBenefits)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                    placeholder="0,00"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-6">
                                    <h3 className="text-sm font-medium text-indigo-400 mb-4 uppercase tracking-wider">Opção PJ</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Faturamento Mensal</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                                <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    value={pjSalary}
                                                    onChange={(e) => handleCurrencyInput(e.target.value, setPjSalary)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                                    placeholder="0,00"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm text-gray-400">Pró-labore Definido</label>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-xs text-indigo-400 cursor-pointer flex items-center gap-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={useRFactorOptimization}
                                                            onChange={(e) => setUseRFactorOptimization(e.target.checked)}
                                                            className="rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500"
                                                        />
                                                        Otimizar Fator R (28%)
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                                <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    value={proLabore}
                                                    onChange={(e) => {
                                                        setUseRFactorOptimization(false); // Disable auto-calc if user types
                                                        handleCurrencyInput(e.target.value, setProLabore);
                                                    }}
                                                    className={`w-full bg-[#0a0a0a] border rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none transition-all ${useRFactorOptimization ? 'border-indigo-500/30 text-indigo-300' : 'border-white/10 focus:border-indigo-500/50'}`}
                                                    placeholder="0,00"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {result && (
                                        <div className="mt-4 p-3 rounded-lg bg-white/5 text-xs text-gray-400 flex items-center justify-between">
                                            <span>Fator R Calculado: <strong>{(result.pjDetails.factorR * 100).toFixed(1)}%</strong></span>
                                            <span className={`px-2 py-0.5 rounded ${result.pjDetails.factorR >= 0.28 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {result.pjDetails.annex}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-center">
                            {result ? (
                                <div className="space-y-6">
                                    <div className={`p-4 rounded-xl border ${result.difference > 0 ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                                        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                            <Scale className="w-5 h-5" />
                                            Veredito:
                                        </h3>
                                        <p className="text-2xl font-bold">
                                            {result.difference > 0 ? (
                                                <span className="text-indigo-400">PJ compensa mais</span>
                                            ) : (
                                                <span className="text-blue-400">CLT compensa mais</span>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-400 mt-2">
                                            Diferença aproximada: <strong>R$ {Math.abs(result.difference).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> por mês no bolso.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                            <div>
                                                <span className="text-sm text-gray-400 block">CLT (Pacote Mensal)</span>
                                                <span className="text-xs text-gray-500">Líquido + Benefícios + Provisões</span>
                                            </div>
                                            <span className="text-lg font-bold text-white">
                                                R$ {result.cltTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                            <div>
                                                <span className="text-sm text-gray-400 block">PJ (Disponível Líquido)</span>
                                                <span className="text-xs text-gray-500">Pró-labore Líq. + Lucro Isento</span>
                                            </div>
                                            <span className="text-lg font-bold text-white">
                                                R$ {result.pjDetails.finalPjPocket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Breakdown Mini-Table */}
                                    <div className="mt-2 text-xs text-gray-500 space-y-1 border-t border-white/5 pt-2">
                                        <div className="flex justify-between">
                                            <span>(-) Imposto PJ ({result.pjDetails.taxRate * 100}%)</span>
                                            <span className="text-red-400">R$ {result.pjDetails.taxAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>(-) Contador</span>
                                            <span className="text-red-400">R$ 300,00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>(-) INSS/IRRF (Pessoa Física)</span>
                                            <span className="text-red-400">R$ {(result.pjDetails.inssProLabore + result.pjDetails.irrfProLabore).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <h4 className="text-sm font-medium text-gray-300 mb-3">Na prática (Dinheiro na Mão):</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-xs text-gray-500 block">Salário Líquido CLT</span>
                                                <span className="text-base font-bold text-blue-300">R$ {result.netClt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 block">Entrada Líquida PJ</span>
                                                <span className="text-base font-bold text-indigo-300">R$ {result.pjDetails.finalPjPocket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-400 py-12">
                                    <Scale className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                                    <p>Preencha os dois lados para ver o comparativo detalhado com Fator R.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto space-y-12 mb-24 text-gray-300">

                    {/* Resumo Rápido */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Resumo em 30 Segundos</h2>
                        <div className="space-y-4 leading-relaxed">
                            <p>
                                A escolha entre o regime celetista e a prestação de serviços como Pessoa Jurídica não é apenas sobre quem paga menos imposto, mas sobre <strong>Disponibilidade Líquida Anual</strong>. Enquanto a CLT oferece um pacote de proteção (FGTS, Férias + 1/3, 13º Salário e Multa Rescisória), o modelo PJ exige que você precifique esses benefícios na sua nota fiscal.
                            </p>
                            <p>
                                Em 2025, a regra de ouro para não perder patrimônio é buscar propostas PJ que sejam, no mínimo, <strong>40% a 50% superiores</strong> ao salário bruto CLT equivalente, cobrindo custos de contador, impostos e, principalmente, planos de saúde individuais.
                            </p>

                            <div className="mt-6 grid md:grid-cols-2 gap-4">
                                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                                    <h4 className="font-bold text-emerald-400 mb-2">Dados Oficiais 2025:</h4>
                                    <ul className="text-sm space-y-2 text-emerald-100/80">
                                        <li>• <strong>Teto do INSS:</strong> R$ 8.157,41</li>
                                        <li>• <strong>Isenção IRPF:</strong> Até R$ 2.428,80</li>
                                        <li>• <strong>Fator R:</strong> Reduz imposto PJ para 6%</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                                    <h4 className="font-bold text-blue-400 mb-2">Vantagem PJ (Simples Nacional):</h4>
                                    <p className="text-sm text-blue-100/80">
                                        O PJ no Anexo III paga significativamente menos imposto em faixas de renda alta comparado à alíquota de 27,5% do IRPF na CLT.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabelas Oficiais */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl font-bold text-white mb-6">Tabelas Oficiais de Referência (2025)</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <TrendingDown className="w-5 h-5 text-indigo-500" />
                                    Tabela Progressiva Mensal IRPF (Vigência Maio 2025)
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-white/5 text-gray-300">
                                            <tr>
                                                <th className="px-3 py-3 rounded-l-lg">Base de Cálculo (R$)</th>
                                                <th className="px-3 py-3">Alíquota</th>
                                                <th className="px-3 py-3 rounded-r-lg">Parcela a Deduzir (R$)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-400 divide-y divide-white/5">
                                            <tr><td className="px-3 py-3">Até 2.428,80</td><td className="px-3 py-3 text-green-400">Isento</td><td className="px-3 py-3">0,00</td></tr>
                                            <tr><td className="px-3 py-3">2.428,81 a 2.826,65</td><td className="px-3 py-3">7,5%</td><td className="px-3 py-3">182,16</td></tr>
                                            <tr><td className="px-3 py-3">2.826,66 a 3.751,05</td><td className="px-3 py-3">15,0%</td><td className="px-3 py-3">394,16</td></tr>
                                            <tr><td className="px-3 py-3">3.751,06 a 4.664,68</td><td className="px-3 py-3">22,5%</td><td className="px-3 py-3">675,49</td></tr>
                                            <tr><td className="px-3 py-3">Acima de 4.664,68</td><td className="px-3 py-3">27,5%</td><td className="px-3 py-3">869,36</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-indigo-500" />
                                    Simples Nacional 2025 - Anexo III (Serviços com Fator R)
                                </h3>
                                <p className="text-xs text-gray-500 mb-3">*Aplicável se folha de pagamento for ≥ 28% do faturamento.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-white/5 text-gray-300">
                                            <tr>
                                                <th className="px-3 py-3 rounded-l-lg">Receita Bruta 12 Meses (R$)</th>
                                                <th className="px-3 py-3">Alíquota Nominal</th>
                                                <th className="px-3 py-3 rounded-r-lg">Valor a Deduzir (R$)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-400 divide-y divide-white/5">
                                            <tr><td className="px-3 py-3">Até 180.000,00</td><td className="px-3 py-3 text-green-400 font-bold">6,00%</td><td className="px-3 py-3">-</td></tr>
                                            <tr><td className="px-3 py-3">180.000,01 a 360.000,00</td><td className="px-3 py-3">11,20%</td><td className="px-3 py-3">9.360,00</td></tr>
                                            <tr><td className="px-3 py-3">360.000,01 a 720.000,00</td><td className="px-3 py-3">13,50%</td><td className="px-3 py-3">17.640,00</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fator R & Erros Comuns */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-orange-500" />
                                Erros Comuns
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    O erro mais frequente é a comparação direta entre <strong>Salário Líquido Mensal CLT</strong> e <strong>Valor da Nota Fiscal PJ</strong>. Essa conta ignora que o trabalhador CLT recebe 13,33 salários por ano (13º + 1/3 férias) e FGTS.
                                </p>
                                <p>
                                    Outro ponto crítico é o <strong>Plano de Saúde</strong>. Planos empresariais (CLT) custam até 300% menos que planos individuais por adesão (PJ). Se não calcular isso, seu "lucro" vira prejuízo.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-indigo-500" />
                                Como Funciona o Fator R
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    Em 2025, profissionais liberais e de tecnologia dependem do <strong>Fator R</strong>. Se a sua empresa PJ não tiver funcionários, sua "folha" será o seu próprio <strong>Pró-labore</strong>.
                                </p>
                                <div className="bg-white/5 p-3 rounded-lg text-center font-mono text-xs md:text-sm text-indigo-300 border border-indigo-500/20">
                                    Fator R = Massa Salarial (12m) / Receita (12m) ≥ 0,28
                                </div>
                                <p>
                                    Se atingir 28%, paga Anexo III (inicia em 6%). Se for menor, cai no Anexo V (inicia em 15,5%).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Examples Section */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl font-bold text-white mb-6">Como Calcular (Exemplos Reais)</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Example 1 */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Exemplo 1: Profissional Júnior</h3>
                                <div className="space-y-3 text-sm text-gray-400">
                                    <p><strong className="text-blue-400">Cenário CLT:</strong> Salário R$ 5.000</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Líquido Mensal: R$ 4.177,52</li>
                                        <li>Pacote Anual: ~R$ 60.100 (com benefícios)</li>
                                    </ul>

                                    <p className="mt-4"><strong className="text-indigo-400">Cenário PJ:</strong> Faturamento R$ 7.500 (1.5x)</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Custo: Contador + Saúde (~R$ 600)</li>
                                        <li>Líquido Mensal: ~R$ 6.219</li>
                                        <li>Pacote Anual: ~R$ 74.628</li>
                                    </ul>
                                    <p className="text-emerald-400 text-xs mt-2 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                                        Veredito: Ganho de 20%. Vantajoso, mas exige disciplina.
                                    </p>
                                </div>
                            </div>

                            {/* Example 2 */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Exemplo 2: Profissional Sênior</h3>
                                <div className="space-y-3 text-sm text-gray-400">
                                    <p><strong className="text-blue-400">Cenário CLT:</strong> Salário R$ 15.000</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Descontos: Teto INSS + IR alto</li>
                                        <li>Pacote Anual: ~R$ 175.000</li>
                                    </ul>

                                    <p className="mt-4"><strong className="text-indigo-400">Cenário PJ:</strong> Faturamento R$ 22.500 (1.5x)</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Impostos: Simples Efetivo (~8%)</li>
                                        <li>Líquido Mensal: R$ 19.133,81</li>
                                        <li>Pacote Anual: ~R$ 217.284</li>
                                    </ul>
                                    <p className="text-emerald-400 text-xs mt-2 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                                        Veredito: R$ 42.000 a mais por ano.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Casos Especiais */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                <HelpCircle className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mt-1">
                                Casos Especiais
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Férias e 13º no PJ</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Legalmente, PJ não tem direito a esses benefícios. "Dias não trabalhados são dias não faturados". Você deve calcular 1/12 da sua receita mensal e guardar em uma aplicação financeira para criar sua própria reserva de férias.
                                </p>
                            </div>
                            <div className="h-px bg-white/5" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Profissionais Autônomos vs MEI</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Cuidado: Profissões intelectuais regulamentadas (Programadores, Engenheiros, Médicos) <strong>não podem ser MEI</strong>. Se abrir indevidamente, corre risco de fiscalização. O caminho correto é abrir uma ME (Microempresa).
                                </p>
                            </div>
                            <div className="h-px bg-white/5" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Aposentadoria e INSS</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    No CLT, você contribui sobre o teto. No PJ, geralmente sobre o salário mínimo ou 28%. Isso reduzirá sua aposentadoria oficial. A diferença economizada deve ser investida obrigatoriamente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={CLT_PJ_FAQS}
                    title="Perguntas Frequentes sobre CLT e PJ"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
