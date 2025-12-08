import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, Wallet, DollarSign, ArrowRight, Building2, TrendingDown, Check, Coins, Calendar, PiggyBank, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const NET_SALARY_FAQS: FAQItem[] = [
    {
        question: "Qual o valor máximo (Teto) que pode ser descontado de INSS em 2025?",
        answer: "O teto previdenciário para 2025 é R$ 8.157,41. Mesmo que seu salário seja superior a isso, o desconto máximo de INSS no contracheque será de R$ 951,63 (valor aproximado dependendo da progressão exata)."
    },
    {
        question: "O que é o Desconto Simplificado Mensal?",
        answer: "É um mecanismo que permite abater R$ 607,20 da base de cálculo do IRRF, substituindo as deduções legais (INSS, dependentes) caso seja mais vantajoso. Ele garante a isenção para quem ganha até dois salários mínimos."
    },
    {
        question: "Qual o salário líquido de quem ganha o mínimo (R$ 1.518,00)?",
        answer: "Para quem recebe o piso nacional em 2025, o único desconto é o INSS de 7,5% (R$ 113,85). O valor líquido final é R$ 1.404,15."
    },
    {
        question: "Dependentes influenciam no cálculo?",
        answer: "Sim. Cada dependente legal reduz a base de cálculo do Imposto de Renda em R$ 189,59. No entanto, se você tiver poucos dependentes e ganhar pouco acima da isenção, o sistema pode ignorar essa dedução e usar o Desconto Simplificado (R$ 607,20) se este for maior."
    }
];

export function NetSalaryPage() {
    const [grossSalary, setGrossSalary] = useState('');
    const [dependents, setDependents] = useState('0');
    const [otherDiscounts, setOtherDiscounts] = useState('');
    const [result, setResult] = useState<{ inss: number; irrf: number; netSalary: number; totalDiscounts: number } | null>(null);

    const calculate = () => {
        const salary = parseFloat(grossSalary.replace(/\./g, '').replace(',', '.'));
        const deps = parseInt(dependents);
        const others = parseFloat(otherDiscounts.replace(/\./g, '').replace(',', '.') || '0');

        if (isNaN(salary) || salary === 0) {
            setResult(null);
            return;
        }

        // 1. Calculate INSS (2025 Table Logic)
        // Ranges: 1518.00 | 2793.88 | 4190.83 | 8157.41
        let inss = 0;
        if (salary <= 1518.00) {
            inss = salary * 0.075;
        } else if (salary <= 2793.88) {
            inss = 1518.00 * 0.075 + (salary - 1518.00) * 0.09;
        } else if (salary <= 4190.83) {
            inss = 1518.00 * 0.075 + (2793.88 - 1518.00) * 0.09 + (salary - 2793.88) * 0.12;
        } else if (salary <= 8157.41) {
            inss = 1518.00 * 0.075 + (2793.88 - 1518.00) * 0.09 + (4190.83 - 2793.88) * 0.12 + (salary - 4190.83) * 0.14;
        } else {
            // Ceiling calculation
            inss = 1518.00 * 0.075 +
                (2793.88 - 1518.00) * 0.09 +
                (4190.83 - 2793.88) * 0.12 +
                (8157.41 - 4190.83) * 0.14;
        }

        // 2. Calculate IRRF Base
        // Legal Deductions
        const deductionPerDependent = 189.59;

        // Simplified Discount (Standard R$ 607.20 replacing legal deductions if better)
        let irrfBaseA = salary - inss - (deps * deductionPerDependent);
        let irrfBaseB = salary - 607.20;

        // Use the smaller base (which leads to less tax), but base cannot be negative
        let irrfBase = Math.max(0, Math.min(irrfBaseA, irrfBaseB));

        // 3. Calculate IRRF (2025 Table)
        // Exempt up to 2428.80
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

        const totalDiscounts = inss + irrf + others;
        const netSalary = salary - totalDiscounts;

        setResult({
            inss,
            irrf,
            netSalary,
            totalDiscounts
        });
    };

    useEffect(() => {
        calculate();
    }, [grossSalary, dependents, otherDiscounts]);

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
        "name": "Calculadora de Salário Líquido 2025: Cálculo Exato e Grátis",
        "url": "https://www.junny.com.br/calculadoras/salario-liquido",
        "description": "Descubra o valor real do seu pagamento com a Calculadora de Salário Líquido 2025. Descontos de INSS, IRRF e benefícios atualizados.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "featureList": [
            "Cálculo exato CLT 2025",
            "Tabela INSS Progressiva",
            "Cálculo IRRF Automático",
            "Simulação com Dependentes"
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
                title="Calculadora Salário Líquido 2025: Oficial e Atualizada (CLT)"
                description="Simule seu salário líquido com as tabelas oficiais de Dezembro/2025. Veja o cálculo exato do INSS e a escolha automática entre Dedução Legal ou Simplificada."
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Salário Líquido', href: '/calculadoras/salario-liquido' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Wallet className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Oficial (Dezembro/2025)</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Salário Líquido 2025</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Esta ferramenta calcula quanto dinheiro cai na sua conta com precisão auditada. Nosso algoritmo compara automaticamente se é melhor para o seu bolso descontar o INSS ou usar o Desconto Simplificado (R$ 607,20).
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-emerald-500" />
                                    Calcular Agora
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Salário Bruto</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={grossSalary}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setGrossSalary)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Número de Dependentes</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            value={dependents}
                                            onChange={(e) => setDependents(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Outros Descontos</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={otherDiscounts}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setOtherDiscounts)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-6 relative overflow-hidden">
                                        <div className="relative z-10">
                                            <span className="text-sm text-emerald-400 block mb-2 font-medium">Salário Líquido Real</span>
                                            <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                                {result ? `R$ ${result.netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                            {result && result.netSalary > 0 && (
                                                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/20 text-xs text-emerald-300">
                                                    <Check className="w-3 h-3" />
                                                    Disponível para gastar
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center transition-colors hover:bg-white/10">
                                            <span className="text-xs text-gray-400 block mb-1 flex items-center justify-center gap-1">
                                                INSS
                                                <span className="text-xs text-gray-400">(Previdência)</span>
                                            </span>
                                            <span className="text-lg font-bold text-red-400">
                                                {result ? `- R$ ${result.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center transition-colors hover:bg-white/10">
                                            <span className="text-xs text-gray-400 block mb-1 flex items-center justify-center gap-1">
                                                IRRF
                                                <span className="text-xs text-gray-400">(Imposto)</span>
                                            </span>
                                            <span className="text-lg font-bold text-red-400">
                                                {result ? `- R$ ${result.irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Funnel Explanation & Context */}
                    <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        {/* Intro Box */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                    <Building2 className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h2 className="text-xl font-bold text-white leading-tight mt-1">
                                    Como é feito o cálculo?
                                </h2>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                A fórmula correta compara duas opções: <code>Salário Bruto - MÁXIMO(INSS, 607,20)</code>. Nós aplicamos o que for melhor para você.
                            </p>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-sm font-mono text-gray-300">
                                Salário Bruto <br />
                                <span className="text-red-400">- INSS (ou Simplificado)</span> <br />
                                <span className="text-red-400">- IRRF</span> <br />
                                <span className="text-red-400">- Outros</span> <br />
                                <span className="text-white font-bold">= Salário Líquido</span>
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Coins className="w-5 h-5 text-emerald-500" />
                                Para onde vai o dinheiro?
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                    <div>
                                        <strong className="text-white text-sm block">INSS (Previdência Social)</strong>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Incide sobre o total e serve para aposentadoria. Alíquotas de 7,5% a 14%.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                    <div>
                                        <strong className="text-white text-sm block">Imposto de Renda (IRRF)</strong>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Calculado sobre o que sobra do INSS. Quem ganha até R$ 2.824,00 (2 salários) está isento.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Content Sections */}
                <div className="max-w-4xl mx-auto space-y-12 mb-24">

                    {/* INSS Table */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                <Briefcase className="w-6 h-6 text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">1. Tabela INSS 2025 (Progressiva)</h3>
                                <p className="text-gray-400">
                                    A contribuição previdenciária é "fatiada". Você paga alíquotas diferentes para cada faixa do seu salário.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="p-3 text-white">Faixa Salarial (R$)</th>
                                        <th className="p-3 text-white">Alíquota</th>
                                        <th className="p-3 text-white">Parcela a Deduzir</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-400">
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">Até 1.518,00</td>
                                        <td className="p-3">7,5%</td>
                                        <td className="p-3">-</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">De 1.518,01 até 2.793,88</td>
                                        <td className="p-3">9%</td>
                                        <td className="p-3">R$ 22,77</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">De 2.793,89 até 4.190,83</td>
                                        <td className="p-3">12%</td>
                                        <td className="p-3">R$ 106,59</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">De 4.190,84 até 8.157,41</td>
                                        <td className="p-3">14%</td>
                                        <td className="p-3">R$ 190,40</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm text-gray-500 mt-4 italic">
                            *Nota: Teto do INSS em R$ 8.157,41 (Desconto máx. ~R$ 951,63).
                        </p>
                    </div>

                    {/* IRRF Table */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                <TrendingDown className="w-6 h-6 text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">2. Tabela Imposto de Renda (Vigência Maio/2025)</h3>
                                <p className="text-gray-400">
                                    Dedução Simplificada: R$ 607,20 (Substitui o INSS no cálculo se for mais vantajoso).
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="p-3 text-white">Base de Cálculo (R$)</th>
                                        <th className="p-3 text-white">Alíquota</th>
                                        <th className="p-3 text-white">Dedução (R$)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-400">
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">Até 2.428,80</td>
                                        <td className="p-3">Isento</td>
                                        <td className="p-3">-</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">De 2.428,81 até 2.826,65</td>
                                        <td className="p-3">7,5%</td>
                                        <td className="p-3">182,16</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">De 2.826,66 até 3.751,05</td>
                                        <td className="p-3">15%</td>
                                        <td className="p-3">394,16</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">De 3.751,06 até 4.664,68</td>
                                        <td className="p-3">22,5%</td>
                                        <td className="p-3">675,49</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">Acima de 4.664,68</td>
                                        <td className="p-3">27,5%</td>
                                        <td className="p-3">908,73</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-emerald-200/80">
                                <strong>Regra:</strong> O sistema escolhe automaticamente entre deduzir o INSS real ou o desconto simplificado de R$ 607,20.
                            </p>
                        </div>
                    </div>

                    {/* Examples Section */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                <DollarSign className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mt-1">
                                Exemplos Reais de Cálculo (Dezembro 2025)
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Example 1 */}
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <div className="mb-4">
                                    <h3 className="font-bold text-white mb-1">Exemplo 1: Salário R$ 3.500,00</h3>
                                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                        Simplificado Vence
                                    </span>
                                </div>
                                <div className="space-y-3 text-sm text-gray-400">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>INSS (12%)</span>
                                        <span className="text-red-400">- R$ 313,41</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>Base IR (Simplificado)</span>
                                        <span>R$ 2.892,80</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>IRRF (15%)</span>
                                        <span className="text-red-400">- R$ 39,76</span>
                                    </div>
                                    <div className="flex justify-between pt-1 font-bold text-white">
                                        <span>Salário Líquido</span>
                                        <span className="text-emerald-400">R$ 3.146,83</span>
                                    </div>
                                </div>
                            </div>

                            {/* Example 2 */}
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <div className="mb-4">
                                    <h3 className="font-bold text-white mb-1">Exemplo 2: Salário R$ 7.500,00</h3>
                                    <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                                        Dedução Legal Vence
                                    </span>
                                </div>
                                <div className="space-y-3 text-sm text-gray-400">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>INSS (14%)</span>
                                        <span className="text-red-400">- R$ 859,60</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>Base IR (Legal)</span>
                                        <span>R$ 6.640,40</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>IRRF (27,5%)</span>
                                        <span className="text-red-400">- R$ 917,38</span>
                                    </div>
                                    <div className="flex justify-between pt-1 font-bold text-white">
                                        <span>Salário Líquido</span>
                                        <span className="text-emerald-400">R$ 5.723,02</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Special Cases & Planning Section */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                <HelpCircle className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mt-1">
                                Casos Especiais e Dúvidas Técnicas
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Salários acima do Teto do INSS</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Quem ganha acima de <strong>R$ 8.157,41</strong> (Teto de 2025) tem o desconto do INSS travado. A contribuição para de crescer, fixando-se em aproximadamente <strong>R$ 951,63</strong>. Qualquer valor que você receba acima disso (bônus, horas extras) sofrerá incidência apenas do Imposto de Renda.
                                </p>
                            </div>

                            <div className="h-px bg-white/5" />

                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Férias e 13º Salário</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Nas férias, você recebe o salário antecipado + 1/3 constitucional. Esse "1/3 extra" aumenta sua renda no mês, o que pode fazer você pular de faixa no IRRF e pagar uma alíquota maior temporariamente. Para simulações exatas, use a <Link to="/calculadoras/ferias" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Calculadora de Férias</Link>. Já para a gratificação natalina, acesse a <Link to="/calculadoras/decimo-terceiro" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Calculadora de Décimo Terceiro</Link>.
                                </p>
                            </div>

                            <div className="h-px bg-white/5" />

                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Autônomos (PJ) e MEI</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    A lógica acima é exclusiva para CLT. Se você é PJ, não há desconto em folha; você paga o DAS ou guias próprias. Para comparar o que sobra no bolso em cada regime, utilize nosso comparador <Link to="/calculadoras/clt-vs-pj" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">CLT vs PJ</Link>.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 text-center mb-12">
                    <p>
                        Para acabar com essa dúvida, nossa ferramenta considera todos os descontos obrigatórios atualizados para mostrar seu <strong>Salário Líquido</strong> real. Basta preencher os dados acima para obter o resultado imediato.
                    </p>
                </div>

                <FAQ
                    items={NET_SALARY_FAQS}
                    title="Perguntas Frequentes sobre Salário Líquido"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
