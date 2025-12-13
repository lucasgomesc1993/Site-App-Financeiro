import React, { useState, useEffect } from 'react';
import { Briefcase, Calculator, DollarSign, Scale, ArrowRight, Wallet, TrendingUp, TrendingDown, AlertCircle, Building2, HelpCircle, Info, Check, CheckCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';
import { Tooltip } from '../ui/Tooltip';

const CLT_PJ_FAQS: FAQItem[] = [
    {
        question: "Qual a diferença salarial para valer a pena ser PJ?",
        answer: "A regra de mercado, validada por nossa <strong>Calculadora CLT vs PJ</strong>, indica que o salário PJ deve ser entre <strong>1,5 e 1,6 vezes</strong> o salário bruto CLT. Além do salário bruto, considere que o CLT tem vale-refeição, plano de saúde e estabilidade. Para compensar esses \"custos invisíveis\" e a falta de aviso prévio, a remuneração PJ precisa ser significativamente maior para gerar a mesma segurança patrimonial."
    },
    {
        question: "O que é o Fator R no Simples Nacional?",
        answer: "O governo criou esse mecanismo para incentivar a contratação de funcionários. É um cálculo mensal que define se você paga 6% ou 15,5% de imposto. Se a sua folha de pagamento (incluindo seu próprio Pró-Labore) for igual ou superior a <strong>28%</strong> do faturamento, você paga a alíquota reduzida do Anexo III. Caso contrário, a tributação sobe drasticamente para o Anexo V."
    },
    {
        question: "PJ tem direito a férias e 13º salário?",
        answer: "Por lei, não. O PJ é uma empresa prestadora de serviços e recebe apenas pelo que entrega. Embora a lei não obrigue, muitos contratos de \"PJ Premium\" negociam cláusulas de descanso remunerado (off). Sem essa cláusula escrita no contrato de prestação de serviços, dias não trabalhados (férias ou feriados) significam faturamento zero no final do mês."
    },
    {
        question: "Qual o teto do desconto do INSS em 2025?",
        answer: "O teto do benefício e da contribuição previdenciária em 2025 é de <strong>R$ 8.157,41</strong>. Esse valor é o limite máximo que o governo usa para calcular o desconto em folha e sua futura aposentadoria. Para empregados, o desconto máximo é de <strong>R$ 951,63</strong> mensais. Mesmo que você ganhe acima disso, o valor do INSS não ultrapassa esse limite."
    },
    {
        question: "Como calcular o salário líquido CLT em 2025?",
        answer: "O cálculo começa subtraindo a contribuição do INSS (progressiva de 7,5% a 14%, por faixas). Sobre o valor restante (base de cálculo), desconta-se um valor por dependente legal e aplica-se a alíquota do IRRF (até 27,5%). O resultado final é o dinheiro que efetivamente cai na conta. Você pode usar nossa <strong>Calculadora CLT vs PJ</strong> ou a ferramenta específica de <a href='/calculadoras/salario-liquido'>salário líquido</a> para fazer essa conta exata."
    },
    {
        question: "MEI conta como tempo de aposentadoria?",
        answer: "Sim. O MEI contribui para o INSS e conta como tempo de contribuição. No entanto, o valor do benefício de aposentadoria será <strong>limitado a 1 salário mínimo</strong>, exceto se forem feitas contribuições complementares (facultativas). Profissionais com histórico CLT de salários altos devem considerar previdência privada ou GPS adicional para evitar perda patrimonial na aposentadoria."
    }
];

export function CLTVsPJPage() {
    // CLT States
    const [salary, setSalary] = useState('');
    const [benefits, setBenefits] = useState('');
    const [dependents, setDependents] = useState('0');
    const [otherDiscounts, setOtherDiscounts] = useState('');
    const [hasOvertime, setHasOvertime] = useState(false);
    const [overtimeHours, setOvertimeHours] = useState('');

    // PJ States
    const [pjSalary, setPjSalary] = useState('');
    const [proLabore, setProLabore] = useState('');
    const [useRFactorOptimization, setUseRFactorOptimization] = useState(true);

    // Validation
    const [validationError, setValidationError] = useState<string | null>(null);

    const [result, setResult] = useState<{
        cltTotal: number;
        netClt: number;
        cltDetails: {
            grossSalary: number;
            inss: number;
            irrf: number;
            benefits: number;
            otherDiscounts: number;
            fgts: number;
            thirteenth: number;
            vacation: number;
            overtimeValue: number;
        };
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
            setProLabore(optimizedProLabore.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
        }
    }, [pjSalary, useRFactorOptimization]);

    const calculate = () => {
        setValidationError(null);

        // Validation - require both sides for comparison
        if (!salary || !pjSalary) {
            setValidationError('Preencha o Salário Bruto CLT e o Faturamento PJ para comparar.');
            return;
        }

        const salaryVal = parseFloat(salary.replace(/\./g, '').replace(',', '.') || '0');
        const benefitsVal = parseFloat(benefits.replace(/\./g, '').replace(',', '.') || '0');
        const deps = parseInt(dependents) || 0;
        const others = parseFloat(otherDiscounts.replace(/\./g, '').replace(',', '.') || '0');
        const overtimeHrs = hasOvertime ? (parseFloat(overtimeHours.replace(/\./g, '').replace(',', '.')) || 0) : 0;
        const pjVal = parseFloat(pjSalary.replace(/\./g, '').replace(',', '.') || '0');
        const proLaboreVal = parseFloat(proLabore.replace(/\./g, '').replace(',', '.') || '0');

        // Calculate overtime value (50% adicional)
        const hourlyRate = salaryVal / 220;
        const overtimeValue = overtimeHrs * hourlyRate * 1.5;
        const totalGrossClt = salaryVal + overtimeValue;

        // --- CLT Logic (2025 Rules) ---
        let inss = 0;
        if (totalGrossClt <= 1518.00) {
            inss = totalGrossClt * 0.075;
        } else if (totalGrossClt <= 2793.88) {
            inss = 1518.00 * 0.075 + (totalGrossClt - 1518.00) * 0.09;
        } else if (totalGrossClt <= 4190.83) {
            inss = 1518.00 * 0.075 + (2793.88 - 1518.00) * 0.09 + (totalGrossClt - 2793.88) * 0.12;
        } else if (totalGrossClt <= 8157.41) {
            inss = 1518.00 * 0.075 + (2793.88 - 1518.00) * 0.09 + (4190.83 - 2793.88) * 0.12 + (totalGrossClt - 4190.83) * 0.14;
        } else {
            inss = 1518.00 * 0.075 + (2793.88 - 1518.00) * 0.09 + (4190.83 - 2793.88) * 0.12 + (8157.41 - 4190.83) * 0.14;
        }

        // IRRF Base Logic (Simplified vs Legal with dependents)
        const deductionPerDependent = 189.59;
        const irrfBaseLegal = totalGrossClt - inss - (deps * deductionPerDependent);
        const irrfBaseSimplified = totalGrossClt - inss - 607.20;
        const usedSimplified = irrfBaseSimplified < irrfBaseLegal;
        const irrfBase = Math.max(0, usedSimplified ? irrfBaseSimplified : irrfBaseLegal);

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

        const netCltMonthly = totalGrossClt - inss - irrf - others;
        const fgts = totalGrossClt * 0.08;
        const thirteenth = totalGrossClt / 12;
        const vacation = (totalGrossClt + totalGrossClt / 3) / 12;
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
        // INSS on Pro-labore (11% fixed for business owner contribution, max ceiling)
        let inssProLabore = 0;
        if (proLaboreVal <= 8157.41) {
            inssProLabore = proLaboreVal * 0.11;
        } else {
            inssProLabore = 8157.41 * 0.11; // Ceiling: R$ 897,31
        }

        // IRRF on Pro-labore (Same 2025 rules)
        // Compare Legal vs Simplified and use the more beneficial (lower base = less tax)
        const baseAfterINSSPL = proLaboreVal - inssProLabore;
        const irrfPLBaseLegal = baseAfterINSSPL; // No dependents for PJ owner in this calc
        const irrfPLBaseSimplified = baseAfterINSSPL - 607.20;

        // Use the lower base (results in less tax)
        const usedSimplifiedPL = irrfPLBaseSimplified < irrfPLBaseLegal;
        const irrfProLaboreBase = Math.max(0, usedSimplifiedPL ? irrfPLBaseSimplified : irrfPLBaseLegal);

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

        // Company remaining after taxes, pro-labore and accountant
        const companyRemaining = pjVal - pjTaxAmount - proLaboreVal - accountantCost;
        // Exempt profit cannot be negative (if costs exceed revenue, profit is 0)
        const exemptProfit = Math.max(0, companyRemaining);

        // Owner Pocket = Net Pro Labore + Exempt Profit
        const finalPjPocket = netProLabore + exemptProfit;

        setResult({
            cltTotal: cltComparableMonthly,
            netClt: netCltMonthly,
            cltDetails: {
                grossSalary: totalGrossClt,
                inss,
                irrf,
                benefits: benefitsVal,
                otherDiscounts: others,
                fgts,
                thirteenth,
                vacation,
                overtimeValue
            },
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

    const handleClear = () => {
        setSalary('');
        setBenefits('');
        setDependents('0');
        setOtherDiscounts('');
        setHasOvertime(false);
        setOvertimeHours('');
        setPjSalary('');
        setProLabore('');
        setUseRFactorOptimization(true);
        setResult(null);
        setValidationError(null);
    };

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
        "name": "Calculadora CLT vs PJ 2025: Comparativo Salário Líquido",
        "url": "https://www.junny.com.br/calculadoras/clt-vs-pj",
        "description": "Utilize nossa Calculadora CLT vs PJ 2025 para comparar salário líquido, impostos e benefícios. Descubra se vale a pena migrar de regime com base na equivalência financeira.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Comparação CLT vs PJ 2025",
            "Cálculo de Salário Líquido",
            "Cálculo de Impostos (Simples Nacional vs IRPF)",
            "Análise de Fator R",
            "Estimativa de Benefícios"
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
                title="Calculadora CLT vs PJ 2025: Comparativo Salário Líquido"
                description="Use nossa Calculadora CLT vs PJ 2025 para simular seu salário líquido real. Descubra se a troca compensa a perda de FGTS e férias com o Fator R."
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

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Carreira e Contratos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">CLT vs PJ 2025</span>: Comparativo de Salário Líquido e Impostos
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Form */}
                    <div className="lg:col-span-7">
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
                                            <div className="flex items-center gap-1">
                                                <label className="text-sm text-gray-400">Salário Bruto Mensal</label>
                                                <Tooltip content="Valor total do seu salário sem os descontos (conforme carteira ou holerite)." />
                                            </div>
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
                                            <div className="flex items-center gap-1">
                                                <label className="text-sm text-gray-400">Benefícios (VR, VA, Plano)</label>
                                                <Tooltip content="Valor de benefícios que você RECEBE da empresa. É SOMADO ao salário líquido." />
                                            </div>
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
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-1">
                                                <label className="text-sm text-gray-400">Nº de Dependentes (IRRF)</label>
                                                <Tooltip content="Cada dependente reduz R$ 189,59 da base de cálculo do IRRF." />
                                            </div>
                                            <input
                                                type="number"
                                                inputMode="numeric"
                                                value={dependents}
                                                onChange={(e) => setDependents(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-1">
                                                <label className="text-sm text-gray-400">Outros Descontos</label>
                                                <Tooltip content="Descontos fixos em folha (consignado, pensão, VT, plano de saúde). É SUBTRAÍDO do salário líquido." />
                                            </div>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                                <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    value={otherDiscounts}
                                                    onChange={(e) => handleCurrencyInput(e.target.value, setOtherDiscounts)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                    placeholder="0,00"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Horas Extras */}
                                    <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5 md:flex-row md:items-center md:justify-between mt-4">
                                        <div
                                            className="flex items-center gap-3 cursor-pointer"
                                            onClick={() => setHasOvertime(!hasOvertime)}
                                        >
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${hasOvertime ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
                                                {hasOvertime && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm text-gray-300">
                                                    Horas extras (50%)
                                                </span>
                                                <Tooltip content="Informe a média de horas extras mensais que você faz ou fará. Calcula: (salário ÷ 220) × 1,5 × horas. O valor é SOMADO ao bruto." />
                                            </div>
                                        </div>
                                        {hasOvertime && (
                                            <div className="flex items-center gap-2 ml-8 md:ml-0">
                                                <span className="text-xs text-gray-400">Horas:</span>
                                                <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    value={overtimeHours}
                                                    onChange={(e) => setOvertimeHours(e.target.value.replace(/[^0-9,]/g, ''))}
                                                    className="w-20 bg-[#0a0a0a] border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm text-center focus:outline-none focus:border-blue-500/50"
                                                    placeholder="0"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-6">
                                    <h3 className="text-sm font-medium text-indigo-400 mb-4 uppercase tracking-wider">Opção PJ</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-1">
                                                <label className="text-sm text-gray-400">Faturamento Mensal</label>
                                                <Tooltip content="Valor total que você recebe/fatura como PJ por mês (nota fiscal)." />
                                            </div>
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
                                            <div className="flex items-center gap-1">
                                                <label className="text-sm text-gray-400">Pró-labore Definido</label>
                                                <Tooltip content="Valor que você retira como salário da sua empresa. Base para INSS/IRRF pessoal." />
                                            </div>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                                <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    value={proLabore}
                                                    onChange={(e) => {
                                                        setUseRFactorOptimization(false);
                                                        handleCurrencyInput(e.target.value, setProLabore);
                                                    }}
                                                    className={`w-full bg-[#0a0a0a] border rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none transition-all ${useRFactorOptimization ? 'border-indigo-500/30 text-indigo-300' : 'border-white/10 focus:border-indigo-500/50'}`}
                                                    placeholder="0,00"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Otimizar Fator R - Styled Checkbox */}
                                    <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5 md:flex-row md:items-center md:justify-between mt-4">
                                        <div
                                            className="flex items-center gap-3 cursor-pointer"
                                            onClick={() => setUseRFactorOptimization(!useRFactorOptimization)}
                                        >
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${useRFactorOptimization ? 'bg-indigo-500 border-indigo-500' : 'border-gray-500'}`}>
                                                {useRFactorOptimization && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm text-gray-300">
                                                    Otimizar Fator R (28%)
                                                </span>
                                                <Tooltip content="Define automaticamente o pró-labore em 28% do faturamento para atingir Anexo III (imposto menor)." />
                                            </div>
                                        </div>
                                        {result && (
                                            <span className={`px-2 py-0.5 rounded text-xs ${result.pjDetails.factorR >= 0.28 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                Fator R: {(result.pjDetails.factorR * 100).toFixed(1)}% - {result.pjDetails.annex}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Validation Error Message */}
                                {validationError && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        {validationError}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col-reverse md:flex-row gap-4 pt-4 border-t border-white/5">
                                    <button
                                        onClick={handleClear}
                                        className="md:flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Limpar
                                    </button>
                                    {!result && (
                                        <button
                                            onClick={calculate}
                                            className="md:flex-[2] bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                        >
                                            <Calculator className="w-5 h-5" />
                                            Comparar CLT vs PJ
                                        </button>
                                    )}
                                    {result && (
                                        <button
                                            onClick={calculate}
                                            className="md:flex-[2] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                        >
                                            <Calculator className="w-5 h-5" />
                                            Calcular Novamente
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-5 h-full">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            {result ? (
                                <div className="space-y-6">
                                    {/* Veredito Header */}
                                    <div className={`p-6 rounded-2xl shadow-2xl relative overflow-hidden group ${result.difference > 0 ? 'bg-gradient-to-br from-indigo-600 to-purple-700' : 'bg-gradient-to-br from-blue-600 to-indigo-700'}`}>
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700"></div>

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Scale className="w-5 h-5 text-white/80" />
                                                <span className="text-white/80 text-sm font-medium uppercase tracking-wider">Veredito</span>
                                            </div>
                                            <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                                {result.difference > 0 ? 'PJ compensa mais' : 'CLT compensa mais'}
                                            </p>
                                            <p className="text-white/70 text-sm mt-2">
                                                Diferença: <strong className="text-white">R$ {Math.abs(result.difference).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</strong>
                                            </p>
                                        </div>
                                    </div>

                                    {/* CLT Breakdown */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                            CLT (Pacote Mensal)
                                        </h4>
                                        <div className="space-y-2">
                                            {/* Proventos */}
                                            <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
                                                <span className="text-gray-300 text-sm">Salário Bruto</span>
                                                <span className="text-green-300 font-medium text-sm">+ R$ {result.cltDetails.grossSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            {result.cltDetails.overtimeValue > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
                                                    <span className="text-gray-300 text-sm">Horas Extras (50%)</span>
                                                    <span className="text-green-300 font-medium text-sm">+ R$ {result.cltDetails.overtimeValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {result.cltDetails.benefits > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
                                                    <span className="text-gray-300 text-sm">Benefícios</span>
                                                    <span className="text-green-300 font-medium text-sm">+ R$ {result.cltDetails.benefits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
                                                <span className="text-gray-300 text-sm">FGTS (8%)</span>
                                                <span className="text-green-300 font-medium text-sm">+ R$ {result.cltDetails.fgts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
                                                <span className="text-gray-300 text-sm">13º (proporcional)</span>
                                                <span className="text-green-300 font-medium text-sm">+ R$ {result.cltDetails.thirteenth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
                                                <span className="text-gray-300 text-sm">Férias + 1/3 (proporcional)</span>
                                                <span className="text-green-300 font-medium text-sm">+ R$ {result.cltDetails.vacation.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            {/* Descontos */}
                                            <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors">
                                                <span className="text-red-200/70 text-sm">(-) INSS</span>
                                                <span className="text-red-300 font-medium text-sm">- R$ {result.cltDetails.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            {result.cltDetails.irrf > 0 ? (
                                                <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors">
                                                    <span className="text-red-200/70 text-sm">(-) IRRF</span>
                                                    <span className="text-red-300 font-medium text-sm">- R$ {result.cltDetails.irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            ) : (
                                                <div className="flex justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                                    <div className="flex items-center gap-1">
                                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                        <span className="text-emerald-300 text-sm">IRRF</span>
                                                    </div>
                                                    <span className="text-emerald-400 font-medium text-sm">Isento</span>
                                                </div>
                                            )}
                                            {result.cltDetails.otherDiscounts > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors">
                                                    <span className="text-red-200/70 text-sm">(-) Outros Descontos</span>
                                                    <span className="text-red-300 font-medium text-sm">- R$ {result.cltDetails.otherDiscounts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {/* Total */}
                                            <div className="flex justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                                <span className="text-blue-200 text-sm font-medium">Total CLT no Bolso</span>
                                                <span className="text-blue-300 font-bold text-sm">R$ {result.cltTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PJ Breakdown */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                            PJ (Disponível Líquido)
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
                                                <span className="text-gray-300 text-sm">Faturamento</span>
                                                <span className="text-white font-medium text-sm">R$ {result.pjDetails.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-red-200/70 text-sm">(-) Impostos</span>
                                                    <span className="text-[10px] text-gray-400 bg-white/10 px-1.5 py-0.5 rounded">{result.pjDetails.annex}</span>
                                                </div>
                                                <span className="text-red-300 font-medium text-sm">- R$ {result.pjDetails.taxAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors">
                                                <span className="text-red-200/70 text-sm">(-) Pró-labore (INSS+IRRF)</span>
                                                <span className="text-red-300 font-medium text-sm">- R$ {(result.pjDetails.inssProLabore + result.pjDetails.irrfProLabore).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors">
                                                <span className="text-red-200/70 text-sm">(-) Contador</span>
                                                <span className="text-red-300 font-medium text-sm">- R$ 300,00</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                                <span className="text-green-200 text-sm">Pró-labore Líquido</span>
                                                <span className="text-green-300 font-medium text-sm">+ R$ {result.pjDetails.netProLabore.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                                <span className="text-green-200 text-sm">Lucro Isento</span>
                                                <span className="text-green-300 font-medium text-sm">+ R$ {result.pjDetails.exemptProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                                                <span className="text-indigo-200 text-sm font-medium">Total PJ no Bolso</span>
                                                <span className="text-indigo-300 font-bold text-sm">R$ {result.pjDetails.finalPjPocket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fator R Info */}
                                    <div className={`p-4 rounded-xl border ${result.pjDetails.factorR >= 0.28 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Zap className={`w-4 h-4 ${result.pjDetails.factorR >= 0.28 ? 'text-emerald-400' : 'text-amber-400'}`} />
                                                <span className={`text-sm font-medium ${result.pjDetails.factorR >= 0.28 ? 'text-emerald-300' : 'text-amber-300'}`}>
                                                    Fator R: {(result.pjDetails.factorR * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded ${result.pjDetails.factorR >= 0.28 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                {result.pjDetails.factorR >= 0.28 ? 'Anexo III ✓' : 'Anexo V'}
                                            </span>
                                        </div>
                                        {result.pjDetails.factorR < 0.28 && (
                                            <p className="text-xs text-amber-300/70 mt-2">
                                                ⚠ Aumente o pró-labore para 28% do faturamento para pagar menos imposto.
                                            </p>
                                        )}
                                    </div>

                                    <p className="text-xs text-gray-500 text-center">
                                        *Cálculo estimado. Consulte um contador para valores exatos.
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center text-gray-400 py-12">
                                    <Scale className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                                    <p>Preencha os campos e clique em Comparar para ver o resultado.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Como usar esta Calculadora */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                            <HelpCircle className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como usar esta Calculadora CLT vs PJ
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Para obter uma comparação precisa entre as opções de contratação, siga estes passos:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <div className="text-emerald-400 font-bold mb-2">01. Preencha o lado CLT</div>
                            <p className="text-sm text-gray-300">Informe seu salário bruto, benefícios (VR, VA, plano), dependentes e outros descontos em folha.</p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <div className="text-emerald-400 font-bold mb-2">02. Preencha o lado PJ</div>
                            <p className="text-sm text-gray-300">Informe o faturamento mensal proposto. Use a otimização de Fator R (28%) para pagar menos imposto.</p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <div className="text-emerald-400 font-bold mb-2">03. Compare os resultados</div>
                            <p className="text-sm text-gray-300">Veja o veredito final: qual opção coloca mais dinheiro no seu bolso considerando todos os fatores.</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto space-y-12 mb-24 text-gray-300">

                    {/* Resumo Rápido */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Resumo em 30 Segundos</h2>
                        <div className="space-y-4 leading-relaxed text-gray-300">
                            <ul className="space-y-3">
                                <li className="flex gap-2">
                                    <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <span><strong>Teto do INSS:</strong> A contribuição previdenciária incide até o limite de <strong>R$ 8.157,41</strong>.</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <span><strong>Regra de Ouro:</strong> Para manter o mesmo poder de compra, o faturamento PJ deve ser <strong>1,6x</strong> o salário bruto CLT (ex: R$ 10k CLT = R$ 16k PJ).</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <span><strong>Limite MEI:</strong> Permanece em <strong>R$ 81.000/ano</strong> até a sanção final do PLP 60/2025, que propõe novo limite de enquadramento ainda não divulgado oficialmente.</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <span><strong>Fator R:</strong> Empresas do Simples Nacional pagam menos imposto (Anexo III) se a folha de pagamento for igual ou superior a <strong>28%</strong> do faturamento.</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <span><strong>IRRF 2025:</strong> Isenção para rendimentos até <strong>R$ 2.428,80</strong>.</span>
                                </li>
                            </ul>

                            <p className="text-sm text-gray-400 mt-4 italic">*Atualizado em Dezembro de 2025</p>

                            <div className="mt-8 border-t border-white/5 pt-6">
                                <p className="mb-4">
                                    A escolha entre o regime CLT (Consolidação das Leis do Trabalho) e a prestação de serviços como PJ (Pessoa Jurídica) deixou de ser apenas uma questão burocrática para se tornar uma estratégia de engenharia financeira. Em dezembro de 2025, com as novas tabelas progressivas do INSS e a complexidade do Fator R no Simples Nacional, comparar apenas o "valor bruto mensal" é o caminho mais rápido para perder dinheiro.
                                </p>
                                <p>
                                    Esta <strong>Calculadora CLT vs PJ</strong> utiliza a metodologia de <strong>Equivalência Financeira Anualizada (EFA)</strong>. Diferente de ferramentas simplistas, nós consideramos o pacote anual completo do CLT (13º, férias remuneradas, FGTS) contra os custos operacionais e impostos reais do PJ, oferecendo um veredito preciso sobre qual modelo coloca mais dinheiro no seu bolso.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabelas Oficiais */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl font-bold text-white mb-6">Tabelas Oficiais de Referência (Vigência 2025)</h2>
                        <p className="text-gray-400 mb-8">
                            Para compreender os resultados gerados pela nossa <strong>Calculadora CLT vs PJ</strong> e validar sua simulação, é fundamental consultar as faixas de tributação vigentes neste mês.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                                    Tabela Progressiva INSS 2025 (Teto: R$ 8.157,41)
                                </h3>
                                <div className="overflow-x-auto rounded-xl border border-white/10">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-white/5 text-gray-300">
                                            <tr>
                                                <th className="px-3 py-3 rounded-l-lg">Faixa de Salário de Contribuição (R$)</th>
                                                <th className="px-3 py-3 rounded-r-lg">Alíquota Aplicada</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-400 divide-y divide-white/5">
                                            <tr><td className="px-3 py-3">Até R$ 1.518,00</td><td className="px-3 py-3">7,5%</td></tr>
                                            <tr><td className="px-3 py-3">De R$ 1.518,01 até R$ 2.793,88</td><td className="px-3 py-3">9%</td></tr>
                                            <tr><td className="px-3 py-3">De R$ 2.793,89 até R$ 4.190,83</td><td className="px-3 py-3">12%</td></tr>
                                            <tr><td className="px-3 py-3">De R$ 4.190,84 até R$ 8.157,41</td><td className="px-3 py-3">14%</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 text-xs text-gray-400 space-y-2">
                                    <p><strong>Nota:</strong> O cálculo do INSS para empregados é feito <strong>por faixas cumulativas</strong>, ou seja, cada parcela do salário é tributada com sua respectiva alíquota. <strong>Não há "parcelas a deduzir" no INSS</strong>, ao contrário do IRRF. O valor máximo descontado em 2025 é de <strong>R$ 951,63</strong>.</p>
                                    <p><strong>Entenda o Cálculo Progressivo:</strong> O desconto do INSS não é aplicado sobre o total do salário com uma única alíquota. O cálculo é fatiado: você paga 7,5% sobre a primeira faixa, 9% sobre a parte que excede essa faixa, e assim por diante. Isso garante que o desconto seja realmente progressivo.</p>
                                    <p><strong>Fonte Oficial:</strong> Baseado na <a href="https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Tabela de Contribuição Mensal - INSS</a>.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <TrendingDown className="w-5 h-5 text-indigo-500" />
                                    Tabela Mensal IRRF 2025
                                </h3>
                                <div className="overflow-x-auto rounded-xl border border-white/10">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-white/5 text-gray-300">
                                            <tr>
                                                <th className="px-3 py-3 rounded-l-lg">Base de Cálculo (Salário - INSS - Dependentes)</th>
                                                <th className="px-3 py-3">Alíquota</th>
                                                <th className="px-3 py-3 rounded-r-lg">Parcela a Deduzir (R$)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-400 divide-y divide-white/5">
                                            <tr><td className="px-3 py-3">Até R$ 2.428,80</td><td className="px-3 py-3 text-green-400">Isento</td><td className="px-3 py-3">-</td></tr>
                                            <tr><td className="px-3 py-3">De R$ 2.428,81 até R$ 2.826,65</td><td className="px-3 py-3">7,5%</td><td className="px-3 py-3">R$ 182,16</td></tr>
                                            <tr><td className="px-3 py-3">De R$ 2.826,66 até R$ 3.751,05</td><td className="px-3 py-3">15,0%</td><td className="px-3 py-3">R$ 394,16</td></tr>
                                            <tr><td className="px-3 py-3">De R$ 3.751,06 até R$ 4.664,68</td><td className="px-3 py-3">22,5%</td><td className="px-3 py-3">R$ 675,49</td></tr>
                                            <tr><td className="px-3 py-3">Acima de R$ 4.664,68</td><td className="px-3 py-3">27,5%</td><td className="px-3 py-3">R$ 908,73</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 text-xs text-gray-400">
                                    <p><strong>Fonte Oficial:</strong> Dados da <a href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Receita Federal do Brasil - Tabelas 2025</a>.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Erros Comuns e Fator R */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-yellow-500" />
                                A "Pegadinha" do Salário Bruto
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    O erro mais frequente ao migrar de carreira é comparar o salário mensal CLT diretamente com a nota fiscal PJ. O trabalhador CLT recebe, na prática, <strong>13,33 remunerações por ano</strong> (12 meses + 13º salário + 1/3 de férias), enquanto o PJ recebe apenas pelo que produz. Uma <strong>Calculadora CLT vs PJ</strong> eficiente deve subtrair essa diferença estrutural antes de mostrar o resultado.
                                </p>
                                <p>
                                    Além disso, o CLT possui o depósito compulsório do FGTS (8% do bruto), que funciona como um patrimônio diferido. Ao virar PJ, esse valor desaparece e deve ser embutido na sua precificação.
                                </p>
                                <p>
                                    <strong>A Regra do 1.6x:</strong> O mercado convencionou o "Multiplicador de Ouro" de <strong>1.6x</strong>. Para que a troca valha a pena financeiramente — cobrindo a perda de estabilidade, férias pagas, VR/VA e plano de saúde — o valor bruto PJ deve ser pelo menos 60% maior que o bruto CLT.
                                </p>
                                <p className="text-xs mt-2 border-t border-white/5 pt-2">
                                    Para visualizar o impacto real dessas verbas, você pode usar nossa calculadora de <Link to="/calculadoras/rescisao" className="text-blue-400 hover:underline">rescisão de contrato</Link> para entender o montante acumulado em uma saída CLT.
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
                                    Se você não pode ser MEI (profissionais intelectuais como desenvolvedores, engenheiros e arquitetos), sua empresa será tributada pelo Simples Nacional. Aqui reside o segredo da eficiência tributária em 2025: o <strong>Fator R</strong>.
                                </p>
                                <p>
                                    O governo define a alíquota baseada na proporção entre sua folha de pagamento (Pró-Labore) e seu faturamento. Ao utilizar nossa <strong>Calculadora CLT vs PJ</strong>, esse cálculo é feito automaticamente.
                                </p>
                                <div className="bg-white/5 p-3 rounded-lg text-center font-mono text-xs md:text-sm text-indigo-300 border border-indigo-500/20">
                                    Fator R = Folha de Salários (12m) / Receita Bruta (12m)
                                </div>
                                <ul className="space-y-1 mt-2 text-xs">
                                    <li>• <strong>Cenário Vantajoso (Anexo III):</strong> Se Fator R ≥ 28%, imposto inicia em 6%.</li>
                                    <li>• <strong>Cenário Penalizador (Anexo V):</strong> Se Fator R {'<'} 28%, imposto inicia em 15,5%.</li>
                                </ul>
                                <p className="text-xs mt-2">
                                    <strong>Estratégia Prática:</strong> Para pagar menos imposto, o profissional PJ define um "Pró-Labore" que seja exatamente 28% do faturamento.
                                </p>
                                <p className="text-xs">
                                    <strong>Fonte Oficial:</strong> Consulte no <a href="https://www8.receita.fazenda.gov.br/SimplesNacional/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Portal do Simples Nacional - Receita Federal</a>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Como Calcular e Exemplos */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl font-bold text-white mb-6">Como Calcular o Salário Líquido (Passo a Passo)</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">Metodologia</h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    Para reproduzir manualmente a lógica da <strong>Calculadora CLT vs PJ</strong>, você deve seguir uma ordem rígida de deduções. Primeiro, desconta-se a previdência, e só depois calcula-se o imposto de renda sobre o que sobrou.
                                </p>
                                <div className="bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-sm text-blue-300 mb-4">
                                    Salário Líquido = Bruto - INSS - IRRF
                                </div>
                                <ol className="list-decimal pl-4 space-y-2 text-sm text-gray-400">
                                    <li><strong>Encontre o INSS:</strong> Aplique as alíquotas progressivas por faixa sobre o Salário Bruto.</li>
                                    <li><strong>Base do IR:</strong> Subtraia o INSS (e valor por dependentes, se houver) do Salário Bruto.</li>
                                    <li><strong>Encontre o IRRF:</strong> Aplique a alíquota da tabela de IR sobre a base encontrada no passo anterior.</li>
                                    <li><strong>Resultado:</strong> Subtraia INSS e IRRF do Bruto para chegar ao Líquido.</li>
                                </ol>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Exemplo 1: Nível Júnior</h3>
                                <div className="space-y-1 text-sm text-gray-400">
                                    <p><strong>CLT (R$ 3.500):</strong></p>
                                    <ul className="list-disc pl-5">
                                        <li>INSS: -R$ 313,41</li>
                                        <li>IRRF: -R$ 83,83</li>
                                        <li>Líquido: ~R$ 3.102,76</li>
                                    </ul>
                                </div>
                                <div className="space-y-1 text-sm text-gray-400">
                                    <p><strong>PJ (R$ 5.600):</strong></p>
                                    <ul className="list-disc pl-5">
                                        <li>Impostos: ~R$ 508,00</li>
                                        <li>Líquido: ~R$ 5.092,00</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <h3 className="text-lg font-bold text-white mb-4">Exemplo 2: Nível Sênior (Comparativo Detalhado)</h3>
                            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-400">
                                <div className="space-y-2">
                                    <p><strong className="text-blue-400">CLT (R$ 12.000 Bruto)</strong></p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>INSS (Teto 2025): -R$ 951,63</li>
                                        <li>IRRF (27,5%): ~R$ 2.150,00</li>
                                        <li><strong>Líquido: ~R$ 8.898,37</strong></li>
                                        <li>+ FGTS, 13º, Férias</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <p><strong className="text-indigo-400">PJ (R$ 18.000 Faturamento)</strong></p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Pró-Labore (28%): R$ 5.040,00</li>
                                        <li>Impostos Totais: ~R$ 2.123,00 (DAS + Pessoa Física)</li>
                                        <li>Custos (Contador/Taxas): -R$ 400,00</li>
                                        <li><strong>Líquido Disponível: ~R$ 15.477,00</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Casos Especiais */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl font-bold text-white mb-6">Casos Especiais e Pontos de Atenção</h2>
                        <div className="space-y-6 text-gray-400">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">O Limite do MEI e o "Super MEI"</h3>
                                <p className="leading-relaxed">
                                    Muitos profissionais estão na expectativa do PLP 60/2025 (Super MEI). Porém, até 10 de dezembro de 2025, o projeto ainda aguarda aprovação final. O limite seguro continua sendo <strong>R$ 81.000/ano</strong>. Ultrapassar esse valor sem a lei sancionada gera <Link to="/calculadoras/das-mei" className="text-blue-400 hover:underline">desenquadramento retroativo e multas</Link> pesadas.
                                </p>
                                <p className="text-xs mt-2"><strong>Fonte:</strong> <a href="https://www25.senado.leg.br/web/atividade/materias/-/materia/167495" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Portal do Senado Federal (PLP 60/2025)</a>.</p>
                            </div>
                            <div className="h-px bg-white/5" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Profissionais de TI e o Exterior</h3>
                                <p className="leading-relaxed">
                                    Para quem trabalha para o exterior (exportação de serviços), a alíquota de ISS é isenta em muitas cidades e não há incidência de PIS/COFINS, tornando o PJ imbatível. No mercado nacional, a contratação PJ em TI é padrão, mas exige cuidado com a subordinação.
                                </p>
                            </div>
                            <div className="h-px bg-white/5" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Aposentadoria e Investimentos</h3>
                                <p className="leading-relaxed">
                                    O profissional CLT tem contribuição cheia para o INSS. O PJ, ao pagar INSS sobre o Pró-Labore reduzido ou salário mínimo (MEI), terá uma aposentadoria oficial baixa. É obrigatório investir a diferença salarial. Confira nosso guia sobre <Link to="/blog/investimentos" className="text-blue-400 hover:underline">investimentos</Link> para montar sua carteira de longo prazo.
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
