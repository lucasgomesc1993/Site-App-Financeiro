import React, { useState } from 'react';
import { Calculator, HelpCircle, Wallet, DollarSign, ArrowRight, Building2, TrendingDown, Check, Coins, Calendar, PiggyBank, Briefcase, Zap, AlertTriangle, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';
import { Tooltip } from '../ui/Tooltip';

const NET_SALARY_FAQS: FAQItem[] = [
    {
        question: "O adiantamento salarial (vale) altera o imposto?",
        answer: "Não. O adiantamento é apenas uma antecipação do dinheiro que você já receberia. Os impostos (INSS e IRRF) são calculados sobre o total bruto no final do mês."
    },
    {
        question: "Quanto é descontado de quem ganha 1 salário mínimo (R$ 1.518,00)?",
        answer: "Para quem recebe o piso nacional de R$ 1.518,00, a incidência é mínima. O único desconto aplicado é o INSS de 7,5% (R$ 113,85). Está isento de IRRF."
    },
    {
        question: "O desconto simplificado de R$ 607,20 é opcional?",
        answer: "Sim, é opcional, mas a legislação obriga a fonte pagadora a utilizar o método mais favorável ao contribuinte. O sistema compara automaticamente."
    },
    {
        question: "Como calcular horas extras no salário líquido?",
        answer: "As horas extras entram como remuneração. Você deve somar o valor das extras ao salário bruto <em>antes</em> de aplicar os descontos. Isso costuma aumentar a base de cálculo e a alíquota de imposto de renda. Para evitar erros no holerite, use nossa <a href='/calculadoras/horas-extras'>Calculadora de Horas Extras</a> para encontrar o valor exato a somar."
    },
    {
        question: "Estagiário tem desconto de INSS?",
        answer: "Não. Estagiários regidos pela Lei do Estágio não sofrem desconto de INSS nem de FGTS."
    },
    {
        question: "Qual o valor máximo que posso pagar de INSS em 2025?",
        answer: "Devido ao teto previdenciário de R$ 8.157,41, o desconto máximo é aproximado de R$ 951,63."
    }
];

export function NetSalaryPage() {
    const [grossSalary, setGrossSalary] = useState('');
    const [dependents, setDependents] = useState('0');
    const [otherDiscounts, setOtherDiscounts] = useState('');
    const [benefits, setBenefits] = useState('');
    const [hasMinorDependents, setHasMinorDependents] = useState(false);
    const [minorDependentsQty, setMinorDependentsQty] = useState('1');
    const [hasOvertime, setHasOvertime] = useState(false);
    const [overtimeHours, setOvertimeHours] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);
    const [result, setResult] = useState<{
        grossSalary: number;
        baseSalary: number;
        overtimeValue: number;
        inss: number;
        irrf: number;
        netSalary: number;
        totalDiscounts: number;
        usedSimplified: boolean;
        irrfBaseLegal: number;
        irrfBaseSimplified: number;
        others: number;
        benefitsValue: number;
    } | null>(null);

    const calculate = () => {
        // Clear previous errors
        setValidationError(null);

        // Validate required fields
        if (!grossSalary) {
            setValidationError('Informe o salário bruto.');
            return;
        }

        const baseSalary = parseFloat(grossSalary.replace(/\./g, '').replace(',', '.'));
        const deps = parseInt(dependents) || 0;
        const others = parseFloat(otherDiscounts.replace(/\./g, '').replace(',', '.') || '0');
        const benefitsValue = parseFloat(benefits.replace(/\./g, '').replace(',', '.') || '0');
        const overtimeHrs = hasOvertime ? (parseFloat(overtimeHours.replace(/\./g, '').replace(',', '.')) || 0) : 0;

        if (isNaN(baseSalary) || baseSalary <= 0) {
            setValidationError('Informe um salário válido maior que zero.');
            return;
        }

        // Calculate overtime value (50% adicional)
        // Hora normal = salário / 220
        const hourlyRate = baseSalary / 220;
        const overtimeValue = overtimeHrs * hourlyRate * 1.5;

        // Total gross salary including overtime
        const salary = baseSalary + overtimeValue;

        // 1. Calculate INSS (2025 Table Logic - Portaria Interministerial MPS/MF nº 6)
        // Ranges: 1518.00 | 2793.88 | 4190.83 | 8157.41
        let inss = 0;
        if (salary <= 1518.00) {
            inss = salary * 0.075;
        } else if (salary <= 2793.88) {
            inss = (salary * 0.09) - 22.77;
        } else if (salary <= 4190.83) {
            inss = (salary * 0.12) - 106.59;
        } else if (salary <= 8157.41) {
            inss = (salary * 0.14) - 190.40;
        } else {
            // Ceiling calculation
            inss = (8157.41 * 0.14) - 190.40;
        }

        // 2. Calculate IRRF Base
        // The INSS is ALWAYS subtracted first.
        // Then we compare: Legal Deductions (dependents × 189.59) vs Simplified Discount (607.20)
        const deductionPerDependent = 189.59;
        const baseAfterINSS = salary - inss;

        // Scenario A: Legal Deductions (INSS already subtracted + dependents deduction)
        const legalDeduction = deps * deductionPerDependent;
        let irrfBaseA = baseAfterINSS - legalDeduction;

        // Scenario B: Simplified Discount (INSS already subtracted + fixed 607.20)
        let irrfBaseB = baseAfterINSS - 607.20;

        // Use the most beneficial deduction (smaller base = less tax)
        let irrfBase = 0;
        let usedSimplified = false;

        if (irrfBaseB < irrfBaseA) {
            irrfBase = irrfBaseB;
            usedSimplified = true;
        } else {
            irrfBase = irrfBaseA;
            usedSimplified = false;
        }

        if (irrfBase < 0) irrfBase = 0;

        // 3. Calculate IRRF (2025 Table)
        // Exempt up to 2428.80
        let irrf = 0;
        if (irrfBase <= 2428.80) {
            irrf = 0;
        } else if (irrfBase <= 2826.65) {
            irrf = (irrfBase * 0.075) - 182.16;
        } else if (irrfBase <= 3751.05) {
            irrf = (irrfBase * 0.150) - 394.16;
        } else if (irrfBase <= 4664.68) {
            irrf = (irrfBase * 0.225) - 675.49;
        } else {
            irrf = (irrfBase * 0.275) - 908.73;
        }

        if (irrf < 0) irrf = 0;

        const totalDiscounts = inss + irrf + others;
        const netSalary = salary - totalDiscounts + benefitsValue; // Benefits are ADDED

        setResult({
            grossSalary: salary,
            baseSalary,
            overtimeValue,
            inss,
            irrf,
            netSalary,
            totalDiscounts,
            usedSimplified,
            irrfBaseLegal: irrfBaseA,
            irrfBaseSimplified: irrfBaseB,
            others,
            benefitsValue
        });
    };

    const handleClear = () => {
        setGrossSalary('');
        setDependents('0');
        setOtherDiscounts('');
        setBenefits('');
        setHasMinorDependents(false);
        setMinorDependentsQty('1');
        setHasOvertime(false);
        setOvertimeHours('');
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
        "name": "Calculadora Salário Líquido 2025: Exata (Lei 15.191)",
        "url": "https://www.junny.com.br/calculadoras/salario-liquido",
        "description": "Calcule seu Salário Líquido Dez/2025 com a Lei 15.191. Veja descontos do INSS (Teto R$ 8.157,41), IRRF e a vantagem do Desconto Simplificado.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "featureList": [
            "Cálculo exato Lei 15.191",
            "Tabela INSS Progressiva 2025",
            "Comparação Desconto Simplificado x Legal",
            "Simulação com Dependentes",
            "Validação de Campos com Mensagens de Erro"
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
                title="Calculadora Salário Líquido 2025: Exata (Lei 15.191)"
                description="Calcule seu Salário Líquido Dez/2025 com a Lei 15.191. Veja descontos do INSS (Teto R$ 8.157,41), IRRF e a vantagem do Desconto Simplificado."
                canonical="/calculadoras/salario-liquido"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": NET_SALARY_FAQS.map(faq => ({
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
                        { label: 'Salário Líquido', href: '/calculadoras/salario-liquido' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Wallet className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Atualizado: Lei nº 15.191 (Dez/2025)</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Salário Líquido 2025: <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Cálculo Exato e Atualizado</span>
                        </h1>
                    </div>
                </div>

                <div className="mb-12">
                    {/* Calculator */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Simular Salário Líquido
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {/* Salary Input */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1">
                                        <label htmlFor="grossSalary" className="text-sm text-gray-400">Salário Bruto</label>
                                        <Tooltip content="Valor total do seu salário sem os descontos (conforme carteira ou holerite)." />
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                        <input
                                            id="grossSalary"
                                            type="text"
                                            inputMode="decimal"
                                            value={grossSalary}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setGrossSalary)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-1">
                                            <label htmlFor="dependents" className="text-sm text-gray-400">Nº de Dependentes</label>
                                            <Tooltip content="Informe quantos dependentes você declara no Imposto de Renda (filhos, cônjuge, etc). Cada um reduz a base em R$ 189,59." />
                                        </div>
                                        <input
                                            id="dependents"
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
                                            <label htmlFor="benefits" className="text-sm text-gray-400">Benefícios (VR, VT, Plano)</label>
                                            <Tooltip content="Valor total de descontos de benefícios como vale-refeição, vale-transporte, plano de saúde, etc." />
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                            <input
                                                id="benefits"
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

                                {/* Outros Descontos */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1">
                                        <label htmlFor="otherDiscounts" className="text-sm text-gray-400">Outros Descontos</label>
                                        <Tooltip content="Descontos adicionais como empréstimo consignado, pensão alimentícia, adiantamentos, etc." />
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                        <input
                                            id="otherDiscounts"
                                            type="text"
                                            inputMode="decimal"
                                            value={otherDiscounts}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setOtherDiscounts)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                {/* Checkbox Options */}
                                <div className="space-y-3 pt-2">
                                    {/* Dependentes menores de 14 anos */}
                                    <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5 md:flex-row md:items-center md:justify-between">
                                        <div
                                            className="flex items-center gap-3 cursor-pointer"
                                            onClick={() => setHasMinorDependents(!hasMinorDependents)}
                                        >
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${hasMinorDependents ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
                                                {hasMinorDependents && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm text-gray-300">
                                                    Dependentes menores de 14 anos
                                                </span>
                                                <Tooltip content="Empregados com filhos menores de 14 anos têm direito ao salário-família (benefício pago pelo INSS)." />
                                            </div>
                                        </div>
                                        {hasMinorDependents && (
                                            <div className="flex items-center gap-2 ml-8 md:ml-0">
                                                <span className="text-xs text-gray-400">Quantidade:</span>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={minorDependentsQty}
                                                    onChange={(e) => setMinorDependentsQty(e.target.value.replace(/[^0-9]/g, ''))}
                                                    className="w-16 bg-[#0a0a0a] border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm text-center focus:outline-none focus:border-blue-500/50"
                                                    placeholder="0"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Horas Extras */}
                                    <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5 md:flex-row md:items-center md:justify-between">
                                        <div
                                            className="flex items-center gap-3 cursor-pointer"
                                            onClick={() => setHasOvertime(!hasOvertime)}
                                        >
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${hasOvertime ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
                                                {hasOvertime && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm text-gray-300">
                                                    Horas extras
                                                </span>
                                                <Tooltip content="Horas trabalhadas além da jornada normal. O adicional padrão é 50% sobre a hora normal." />
                                            </div>
                                        </div>
                                        {hasOvertime && (
                                            <div className="flex items-center gap-2 ml-8 md:ml-0">
                                                <span className="text-xs text-gray-400">Quantidade de horas:</span>
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

                                {/* Validation Error Message */}
                                {validationError && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        {validationError}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col-reverse md:flex-row gap-4 pt-4">
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
                                            Calcular Salário Líquido
                                        </button>
                                    )}
                                    {result && (
                                        <button
                                            onClick={() => { setResult(null); setTimeout(calculate, 0); }}
                                            className="md:flex-[2] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                        >
                                            <Calculator className="w-5 h-5" />
                                            Calcular Novamente
                                        </button>
                                    )}
                                </div>

                                {/* Result Block */}
                                {result && (
                                    <div className="pt-6 animate-in fade-in slide-in-from-top-4 duration-500 space-y-6 border-t border-white/10 mt-6">

                                        {/* Total Section */}
                                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-2xl relative overflow-hidden group mb-6">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700"></div>

                                            <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
                                                <div>
                                                    <span className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-1 block">Salário Líquido Estimado</span>
                                                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                                        R$ {result.netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </span>
                                                    <p className="text-blue-200/80 text-xs mt-2">
                                                        *Cálculo estimado baseado nas tabelas vigentes em Dez/2025.
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex justify-between items-center text-sm border-b border-white/20 pb-2">
                                                        <span className="text-blue-100">Salário Bruto</span>
                                                        <span className="text-white font-medium">R$ {result.grossSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-sm pt-1">
                                                        <span className="text-blue-200">Total Descontos</span>
                                                        <span className="text-white font-medium">- R$ {result.totalDiscounts.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {/* Proventos */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                                    Proventos (Entrada)
                                                </h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
                                                        <span className="text-gray-300 text-sm">Salário Base</span>
                                                        <span className="text-green-300 font-medium text-sm">+ R$ {result.baseSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                    </div>
                                                    {result.overtimeValue > 0 && (
                                                        <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
                                                            <span className="text-gray-300 text-sm">Horas Extras (50%)</span>
                                                            <span className="text-green-300 font-medium text-sm">+ R$ {result.overtimeValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                        </div>
                                                    )}
                                                    {result.benefitsValue > 0 && (
                                                        <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
                                                            <span className="text-gray-300 text-sm">Benefícios (VR, VT, etc.)</span>
                                                            <span className="text-green-300 font-medium text-sm">+ R$ {result.benefitsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Descontos */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                    Descontos
                                                </h4>
                                                <div className="space-y-2">
                                                    {result.inss > 0 && (
                                                        <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors">
                                                            <span className="text-red-200/70 text-sm">INSS</span>
                                                            <span className="text-red-300 font-medium text-sm">- R$ {result.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                        </div>
                                                    )}
                                                    {result.irrf > 0 && (
                                                        <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors">
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-red-200/70 text-sm">IRRF</span>
                                                                {result.usedSimplified && (
                                                                    <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">(Simplificado)</span>
                                                                )}
                                                            </div>
                                                            <span className="text-red-300 font-medium text-sm">- R$ {result.irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                        </div>
                                                    )}
                                                    {result.others > 0 && (
                                                        <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors">
                                                            <span className="text-red-200/70 text-sm">Outros Descontos</span>
                                                            <span className="text-red-300 font-medium text-sm">- R$ {result.others.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                        </div>
                                                    )}
                                                    {result.irrf === 0 && (
                                                        <div className="flex justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                                            <div className="flex items-center gap-1">
                                                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                                <span className="text-emerald-300 text-sm">IRRF</span>
                                                            </div>
                                                            <span className="text-emerald-400 font-medium text-sm">Isento</span>
                                                        </div>
                                                    )}
                                                    {result.totalDiscounts === 0 && (
                                                        <div className="p-4 text-center text-gray-400 text-sm italic border border-white/5 rounded-lg border-dashed">
                                                            Sem descontos aplicáveis
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Comparison Box */}
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-yellow-400" />
                                                Comparação de Métodos (IRRF)
                                            </h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className={`p-3 rounded-lg border ${!result.usedSimplified ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/5'}`}>
                                                    <span className="text-xs text-gray-400 block">Base Legal</span>
                                                    <span className={`text-sm font-bold ${!result.usedSimplified ? 'text-blue-400' : 'text-white'}`}>
                                                        R$ {Math.max(0, result.irrfBaseLegal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </span>
                                                    {!result.usedSimplified && <span className="text-[10px] text-blue-300 block mt-1">✓ Mais vantajoso</span>}
                                                </div>
                                                <div className={`p-3 rounded-lg border ${result.usedSimplified ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/5'}`}>
                                                    <span className="text-xs text-gray-400 block">Simplificado (-R$ 607,20)</span>
                                                    <span className={`text-sm font-bold ${result.usedSimplified ? 'text-emerald-400' : 'text-white'}`}>
                                                        R$ {Math.max(0, result.irrfBaseSimplified).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </span>
                                                    {result.usedSimplified && <span className="text-[10px] text-emerald-300 block mt-1">✓ Mais vantajoso</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumo e Para onde vai - lado a lado */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {/* Resumo Rápido */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-left-4 duration-700">
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <h2 className="text-xl font-bold text-white">Resumo em 30 Segundos</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-sm text-gray-400">Salário Mínimo Base</span>
                                <span className="text-sm font-bold text-white">R$ 1.518,00</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-sm text-gray-400">Teto do INSS</span>
                                <span className="text-sm font-bold text-white text-right">R$ 8.157,41 <br /><span className="text-[10px] font-normal text-gray-400">(Desconto máx. de aprox. R$ 951,63)</span></span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-sm text-gray-400">Isenção de IRRF</span>
                                <span className="text-sm font-bold text-blue-400 text-right">Até R$ 2.428,80 <br /><span className="text-[10px] font-normal text-blue-400">(considerando regras vigentes)</span></span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-sm text-gray-400">Desconto Simplificado</span>
                                <span className="text-sm font-bold text-white text-right">R$ 607,20 <br /><span className="text-[10px] font-normal text-gray-400">(dedução automática se vantajosa)</span></span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Regulação</span>
                                <span className="text-sm font-bold text-white text-right">Lei 15.191 <br /><span className="text-[10px] font-normal text-gray-400">e Portaria MPS/MF nº 6</span></span>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="text-xs text-red-300 leading-relaxed">
                                <strong>Atenção:</strong> O cálculo trabalhista mudou. A partir de maio e consolidado em Dez/2025, novas faixas (Lei nº 15.191) estão valendo.
                            </p>
                        </div>
                    </div>

                    {/* Para onde vai o dinheiro */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-700">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Coins className="w-5 h-5 text-blue-500" />
                            Para onde vai o dinheiro?
                        </h3>
                        <div className="space-y-5">
                            <div className="flex gap-4 items-start">
                                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                                <div>
                                    <strong className="text-white text-sm block">INSS (Previdência Social)</strong>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Garante sua aposentadoria, auxílio-doença, salário-maternidade e outros benefícios. O desconto é progressivo até o teto de R$ 951,63 (aprox).
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                                <div>
                                    <strong className="text-white text-sm block">Imposto de Renda (IRRF)</strong>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Incide sobre o restante após o INSS. O governo aplica alíquotas progressivas de 7,5% a 27,5% sobre a base de cálculo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Como usar esta Calculadora (Instructions) */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                            <HelpCircle className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como usar esta Calculadora de Salário Líquido
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Para obter o resultado exato na nossa <strong>calculadora de salário líquido</strong>, siga estes passos simples:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <div className="text-emerald-400 font-bold mb-2">01. Informe o Salário Bruto</div>
                            <p className="text-sm text-gray-300">Digite o valor total do seu salário antes dos descontos (conforme holerite ou carteira).</p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <div className="text-emerald-400 font-bold mb-2">02. Adicione Dependentes</div>
                            <p className="text-sm text-gray-300">Informe o número de dependentes para dedução no IRRF (R$ 189,59 por dependente).</p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <div className="text-emerald-400 font-bold mb-2">03. Clique em Calcular</div>
                            <p className="text-sm text-gray-300">O sistema processará automaticamente as regras de 2025, exibindo o valor líquido e as deduções.</p>
                        </div>
                    </div>
                </div>

                {/* Detailed Content Sections */}
                <div className="max-w-4xl mx-auto space-y-12 mb-24">

                    {/* Intro Text */}
                    <div className="space-y-6">
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Entender quanto realmente cairá na sua conta bancária exige mais do que uma conta simples. A partir de maio deste ano, e consolidado agora em dezembro de 2025, o cálculo trabalhista mudou. Com a vigência da <strong>Lei nº 15.191</strong> e o reajuste inflacionário de 4,77% (INPC), as faixas de desconto foram alteradas. Utilizar uma <strong>Calculadora de Salário Líquido</strong> precisa e atualizada é essencial para não ser pego de surpresa. Nossa ferramenta processa automaticamente a escolha entre o <strong>Desconto Simplificado</strong> e as deduções legais, garantindo que você visualize o menor imposto possível dentro da lei.
                        </p>
                    </div>

                    {/* Tables */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h2 className="text-2xl font-bold text-white mb-6">Tabelas Oficiais para Referência (2025)</h2>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-emerald-500" />
                                Tabela de Contribuição INSS (Vigência Dez/2025)
                            </h3>
                            <div className="overflow-x-auto rounded-xl border border-white/10">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-3 text-white font-medium">Faixa de Salário de Contribuição</th>
                                            <th className="p-3 text-white font-medium text-center">Alíquota Progressiva</th>
                                            <th className="p-3 text-white font-medium text-center">Parcela a Deduzir</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400 divide-y divide-white/5">
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">Até R$ 1.518,00</td>
                                            <td className="p-3 text-center">7,5%</td>
                                            <td className="p-3 text-center">-</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">De R$ 1.518,01 até R$ 2.793,88</td>
                                            <td className="p-3 text-center">9,0%</td>
                                            <td className="p-3 text-center">R$ 22,77</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">De R$ 2.793,89 até R$ 4.190,83</td>
                                            <td className="p-3 text-center">12,0%</td>
                                            <td className="p-3 text-center">R$ 106,59</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">De R$ 4.190,84 até R$ 8.157,41</td>
                                            <td className="p-3 text-center">14,0%</td>
                                            <td className="p-3 text-center">R$ 190,40</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                Fonte: <a href="https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline decoration-emerald-400/50 hover:decoration-emerald-400">Portaria Interministerial MPS/MF nº 6</a>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <TrendingDown className="w-5 h-5 text-emerald-500" />
                                Tabela Progressiva Mensal IRRF (Lei 15.191)
                            </h3>
                            <div className="overflow-x-auto rounded-xl border border-white/10">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-3 text-white font-medium">Base de Cálculo</th>
                                            <th className="p-3 text-white font-medium text-center">Alíquota (%)</th>
                                            <th className="p-3 text-white font-medium text-center">Parcela a Deduzir do IR</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400 divide-y divide-white/5">
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">Até R$ 2.428,80</td>
                                            <td className="p-3 text-center">Isento</td>
                                            <td className="p-3 text-center">-</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">De R$ 2.428,81 até R$ 2.826,65</td>
                                            <td className="p-3 text-center">7,5%</td>
                                            <td className="p-3 text-center">R$ 182,16</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">De R$ 2.826,66 até R$ 3.751,05</td>
                                            <td className="p-3 text-center">15,0%</td>
                                            <td className="p-3 text-center">R$ 394,16</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">De R$ 3.751,06 até R$ 4.664,68</td>
                                            <td className="p-3 text-center">22,5%</td>
                                            <td className="p-3 text-center">R$ 675,49</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">Acima de R$ 4.664,68</td>
                                            <td className="p-3 text-center">27,5%</td>
                                            <td className="p-3 text-center">R$ 908,73</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                * Dedução por dependente: R$ 189,59 | Fonte: <a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15191.htm" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline decoration-emerald-400/50 hover:decoration-emerald-400">Lei nº 15.191/2025</a>
                            </p>
                        </div>
                    </div>

                    {/* Erros Comuns */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-red-500/10 p-3 rounded-xl shrink-0">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Erros Comuns ao Calcular o Salário</h2>
                                <p className="text-gray-400">
                                    O erro mais frequente é a "Conta de Padaria": aplicar a alíquota cheia (ex: 14%) direto no total.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4 text-gray-400">
                            <p>
                                <strong>Exemplo do Erro:</strong> Se você ganha R$ 4.500,00, NÃO multiplique por 14% (daria R$ 630,00). O correto é progressivo, pagando 7,5% sobre a primeira faixa, 9% sobre a segunda, etc.
                            </p>
                            <p>
                                Outra falha comum é ignorar itens como vale-transporte e convênio, que reduzem o líquido mas não mudam a base do INSS.
                            </p>
                        </div>
                    </div>

                    {/* Metodologia */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                <Zap className="w-6 h-6 text-emerald-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Como Funciona o "Segredo" do Desconto Simplificado</h2>
                                <p className="text-gray-400">
                                    A Receita Federal permite duas formas de cálculo. Nossa calculadora escolhe a melhor para você.
                                </p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                            <div className="bg-white/5 p-4 rounded-xl">
                                <strong className="text-white block mb-2">1. Deduções Legais</strong>
                                <p className="text-sm text-gray-400">Subtrai-se INSS, dependentes (R$ 189,59 cada) e pensão.</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl">
                                <strong className="text-white block mb-2">2. Desconto Simplificado</strong>
                                <p className="text-sm text-gray-400">Subtrai-se fixo R$ 607,20 direto da base (<a href="http://normas.receita.fazenda.gov.br/sijut2consulta/consulta.action?termoBusca=Instru%E7%E3o+Normativa+RFB+n%BA+2.174" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline decoration-emerald-400/50 hover:decoration-emerald-400">Instrução Normativa RFB nº 2.174</a>).</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Para quem ganha até dois salários mínimos ajustados, o método simplificado geralmente garante isenção total.
                        </p>
                    </div>

                    {/* Examples Section */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                <DollarSign className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mt-1">
                                Como Calcular (Passo a Passo Prático)
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Example 1 */}
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <div className="mb-4">
                                    <h3 className="font-bold text-white mb-1">Exemplo 1: Salário R$ 5.000,00</h3>
                                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                        Simplificado Vence
                                    </span>
                                </div>
                                <div className="space-y-3 text-sm text-gray-400">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>INSS (14%)</span>
                                        <span className="text-red-400">- R$ 509,60</span>
                                    </div>
                                    <p className="text-xs text-gray-400 italic">
                                        Este é o valor descontado para a Previdência. Para conferir apenas este imposto, use nossa <Link to="/calculadoras/inss" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Calculadora de INSS</Link>.
                                    </p>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>Base Legal</span>
                                        <span>R$ 4.490,40</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>Base Simplificada (-607,20)</span>
                                        <span className="text-emerald-400 font-bold">R$ 4.392,80</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>IRRF (22,5%)</span>
                                        <span className="text-red-400">- R$ 312,89</span>
                                    </div>
                                    <div className="flex justify-between pt-1 font-bold text-white">
                                        <span>Salário Líquido</span>
                                        <span className="text-emerald-400">R$ 4.177,51</span>
                                    </div>
                                </div>
                            </div>

                            {/* Example 2 */}
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <div className="mb-4">
                                    <h3 className="font-bold text-white mb-1">Exemplo 2: Salário R$ 8.000,00</h3>
                                    <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                                        Dedução Legal Vence
                                    </span>
                                </div>
                                <div className="space-y-3 text-sm text-gray-400">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>INSS (14%)</span>
                                        <span className="text-red-400">- R$ 929,60</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>Base Simplificada</span>
                                        <span>R$ 7.392,80</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>Base Legal (-INSS)</span>
                                        <span className="text-blue-400 font-bold">R$ 7.070,40</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>IRRF (27,5%)</span>
                                        <span className="text-red-400">- R$ 1.035,63</span>
                                    </div>
                                    <div className="flex justify-between pt-1 font-bold text-white">
                                        <span>Salário Líquido</span>
                                        <span className="text-emerald-400">R$ 6.034,77</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quem deve usar */}
                    <div className="space-y-4 text-gray-400">
                        <h2 className="text-2xl font-bold text-white">Quem deve usar esta ferramenta?</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong className="text-white">Trabalhadores CLT:</strong> Para conferir se o RH realizou os descontos corretamente.</li>
                            <li><strong className="text-white">Candidatos a Vagas:</strong> Para negociar pretensão salarial sabendo o valor real.</li>
                            <li><strong className="text-white">Prestadores de Serviço:</strong> Para comparar se vale a pena CLT vs PJ, utilizando nossa ferramenta de <Link to="/calculadoras/clt-vs-pj" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">comparação CLT vs PJ</Link>.</li>
                        </ul>
                    </div>

                    {/* Special Cases & Planning Section */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                                <h3 className="text-lg font-bold text-white mb-2">13º Salário e Férias</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    O 13º possui tributação exclusiva e as Férias incluem o terço constitucional. Para simular, use a <Link to="/calculadoras/decimo-terceiro" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Calculadora de Décimo Terceiro</Link>.
                                </p>
                            </div>

                            <div className="h-px bg-white/5" />

                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Salários acima do Teto (R$ 8.157,41)</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Mesmo ganhando R$ 15.000,00, você contribuirá com o valor máximo aproximado de <strong>R$ 951,63</strong>. O restante sofre apenas a incidência agressiva do IR (27,5%).
                                </p>
                            </div>

                            <div className="h-px bg-white/5" />

                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Dependentes e Pensão</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Cada dependente reduz a base em R$ 189,59. Porém, com a regra do Desconto Simplificado (R$ 607,20), muitas vezes compensa mais usar o desconto padrão a não ser que você tenha 4 ou mais dependentes.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 text-center mb-12">
                </div>

                <FAQ
                    items={NET_SALARY_FAQS}
                    title="Perguntas Frequentes sobre Salário Líquido 2025"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div >
        </section >
    );
}
