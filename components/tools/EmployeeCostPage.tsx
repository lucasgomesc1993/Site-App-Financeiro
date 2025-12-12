import React, { useState, useEffect } from 'react';
import { Users, Calculator, HelpCircle, Briefcase, ArrowRight, DollarSign, PieChart, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const EMPLOYEE_COST_FAQS: FAQItem[] = [
    {
        question: "Qual o custo de um funcionário no teto do INSS em 2025?",
        answer: "Se o salário for igual ao teto (aprox. **R$ 8.157,41**), uma empresa no Lucro Presumido pagará cerca de **R$ 13.800,00** mensais (custo total). Isso ocorre porque, embora o desconto do funcionário trave no teto, a empresa continua pagando 20% de INSS patronal sobre o valor total do salário, sem limite."
    },
    {
        question: "Quanto custa um funcionário de um salário mínimo em 2025?",
        answer: "Para uma empresa no Simples Nacional (Anexo III), um funcionário ganhando **R$ 1.518,00** custa aproximadamente **R$ 2.400,00 a R$ 2.500,00** por mês, considerando provisões de férias, 13º, FGTS e um pacote básico de benefícios (VT e VR). O peso dos benefícios fixos eleva o multiplicador para cerca de 1,65x."
    },
    {
        question: "Como calcular o custo de um funcionário PJ?",
        answer: "O custo PJ é mais simples: soma-se o valor da Nota Fiscal, impostos assumidos pela empresa (se houver) e custos de compliance. No entanto, para valer a pena para o *profissional*, a regra de mercado sugere que a Nota Fiscal seja **1,4 a 1,6 vezes** o salário CLT equivalente. Compare os cenários na nossa <a href='/calculadoras/clt-vs-pj'>Calculadora CLT x PJ</a>."
    },
    {
        question: "O que é o RAT e FAP no cálculo da folha?",
        answer: "O RAT (Risco Ambiental do Trabalho) é uma taxa de 1%, 2% ou 3% sobre a folha para cobrir custos de acidentes. O FAP (Fator Acidentário) é um multiplicador (0,5 a 2,0) que reduz ou dobra essa taxa. Empresas com muitos acidentes pagam o dobro. Investir em segurança reduz diretamente esse custo."
    },
    {
        question: "A empresa paga INSS sobre o Vale-Transporte?",
        answer: "Não. O Vale-Transporte, quando descontado corretamente (até 6% do salário), e o Vale-Alimentação (quando a empresa adere ao PAT), têm natureza indenizatória. Ou seja, não incide INSS nem FGTS sobre eles, o que ajuda a reduzir o custo total."
    },
    {
        question: "Como funciona a provisão de férias e 13º?",
        answer: "Mensalmente, você deve guardar **1/12 (8,33%)** do salário para o 13º e **1/12 (8,33%)** + 1/3 constitucional para as férias. Somados, representam **19,44%** do salário. Se você não reservar esse dinheiro todo mês, terá problemas de caixa em novembro, dezembro e nas épocas de férias."
    }
];

export function EmployeeCostPage() {
    const [salary, setSalary] = useState('');
    const [regime, setRegime] = useState('simples_anexo_iii');
    const [transport, setTransport] = useState('');
    const [food, setFood] = useState('');
    const [otherBenefits, setOtherBenefits] = useState('');

    const [result, setResult] = useState<{
        totalCost: number;
        multiplier: number;
        breakdown: any;
    } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const vt = parseFloat(transport.replace(/\./g, '').replace(',', '.') || '0');
        const vr = parseFloat(food.replace(/\./g, '').replace(',', '.') || '0');
        const other = parseFloat(otherBenefits.replace(/\./g, '').replace(',', '.') || '0');

        if (isNaN(sal) || sal === 0) {
            setResult(null);
            return;
        }

        // 1. Encargos Sociais (Diretos)
        let fgtsRate = 0.08;
        let inssPatronalRate = 0;
        let ratRate = 0; // Simplified average
        let sistemaSRate = 0;

        if (regime === 'simples_anexo_iii') {
            // Anexos I, II, III, V: Isento de Patronal, RAT e Sistema S (Incluso no DAS)
            inssPatronalRate = 0;
            ratRate = 0;
            sistemaSRate = 0;
        } else if (regime === 'simples_anexo_iv') {
            // Anexo IV: Paga 20% Patronal + RAT. Isento Sistema S.
            inssPatronalRate = 0.20;
            ratRate = 0.02; // Average estimation 1-3%
            sistemaSRate = 0;
        } else {
            // Lucro Presumido / Real
            inssPatronalRate = 0.20;
            ratRate = 0.02; // Avg
            sistemaSRate = 0.058; // Avg 5.8%
        }

        const totalTaxRate = fgtsRate + inssPatronalRate + ratRate + sistemaSRate;

        const directTaxes = sal * totalTaxRate;

        // 2. Provisões (Férias + 1/3 + 13º)
        // Férias (8.33%) + 1/3 (2.78%) + 13º (8.33%) = ~19.44%
        const vacationProvision = sal / 12; // 8.33%
        const vacationThirdProvision = vacationProvision / 3; // 2.77%
        const thirteenthProvision = sal / 12; // 8.33%

        const totalProvisionsBase = vacationProvision + vacationThirdProvision + thirteenthProvision;

        // Encargos sobre Provisões (Incide FGTS e INSS/RAT/SistS sobre as provisões também)
        const taxesOnProvisions = totalProvisionsBase * totalTaxRate;

        const totalProvisions = totalProvisionsBase + taxesOnProvisions;

        // 3. Benefícios
        // VT: Empresa paga o que excede 6% do salário (na prática, custo é o valor do benefício - 6% do salário, se o funcionário usa tudo. Mas aqui simplificamos como custo direto informado ou inputado)
        // Vamos considerar o input 'transport' como o CUSTO para a empresa e não o valor total do benefício, para simplificar a UX,
        // MAS como o texto diz "A empresa paga o que exceder 6% do salário", o input mais comum em calculadoras assim é o valor do benefício e a ferramenta desconta.
        // O código anterior fazia o desconto (Math.max(0, vt - maxVtDeduction)). Vou MANTER essa lógica pois é mais precisa.
        const maxVtDeduction = sal * 0.06;
        const vtCost = Math.max(0, vt - maxVtDeduction);

        const benefitsTotal = vtCost + vr + other;

        const totalMonthlyCost = sal + directTaxes + totalProvisions + benefitsTotal;

        setResult({
            totalCost: totalMonthlyCost,
            multiplier: totalMonthlyCost / sal,
            breakdown: {
                salary: sal,
                taxes: directTaxes,
                provisions: totalProvisions,
                benefits: benefitsTotal,
                details: {
                    inssPatronal: sal * inssPatronalRate,
                    fgts: sal * fgtsRate,
                    rat: sal * ratRate,
                    sistemaS: sal * sistemaSRate,
                    provisionsBase: totalProvisionsBase,
                    taxesOnProvisions: taxesOnProvisions
                }
            }
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, regime, transport, food, otherBenefits]);

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
        "name": "Calculadora de Custo de Funcionário 2025: Cálculo Real (CLT)",
        "url": "https://www.junny.com.br/calculadoras/custo-funcionario",
        "description": "Use nossa Calculadora de Custo de Funcionário 2025 para simular CLT vs PJ. Descubra encargos, reoneração da folha e provisões com dados oficiais.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Cálculo de Custo Total CLT",
            "Simulação Simples Nacional vs Lucro Presumido",
            "Provisão de Férias e 13º Salário",
            "Cálculo de Encargos Sociais (INSS, FGTS)",
            "Comparativo de Multiplicador Salarial"
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
                title="Calculadora de Custo de Funcionário 2025: Cálculo Real (CLT)"
                description="Use nossa Calculadora de Custo de Funcionário 2025 para simular CLT vs PJ. Descubra encargos, reoneração da folha e provisões com dados oficiais."
                canonical="/calculadoras/custo-funcionario"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": EMPLOYEE_COST_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Custo de Funcionário', href: '/calculadoras/custo-funcionario' }
                    ]} />

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Atualizado para 2025</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Custo de Funcionário <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500">2025</span>
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Section */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Simular Custo Mensal
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Salário Bruto</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
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
                                    <label className="text-sm text-gray-400">Regime Tributário</label>
                                    <div className="relative">
                                        <select
                                            value={regime}
                                            onChange={(e) => setRegime(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="simples_anexo_iii">Simples Nacional (Anexos I, II, III, V)</option>
                                            <option value="simples_anexo_iv">Simples Nacional (Anexo IV - Limpeza/Obras)</option>
                                            <option value="presumido_real">Lucro Presumido / Lucro Real</option>
                                        </select>
                                        <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
                                    </div>
                                    <p className="text-xs text-gray-500">Anexo IV paga INSS Patronal (20%). Anexo III é isento.</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Vale Transporte</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">R$</span>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={transport}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setTransport)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Vale Refeição</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">R$</span>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={food}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setFood)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Outros Benefícios</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">R$</span>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={otherBenefits}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setOtherBenefits)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Result Block */}
                                <div className="pt-2">
                                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">
                                            Custo Total Mensal Estimado
                                        </span>
                                        <span className="text-4xl font-bold text-white block">
                                            {result ? `R$ ${result.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'R$ 0,00'}
                                        </span>
                                        {result && (
                                            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30">
                                                <span>Multiplicador Real: <strong>{result.multiplier.toFixed(2)}x</strong> o salário</span>
                                            </div>
                                        )}
                                    </div>

                                    {result && result.breakdown && (
                                        <div className="space-y-3">
                                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-gray-300 text-sm">Salário Base</span>
                                                    <span className="text-white font-medium">R$ {result.breakdown.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                                <div className="h-px bg-white/5 my-2" />
                                                <div className="flex justify-between items-center mb-1 text-xs text-red-400">
                                                    <span>+ Encargos Diretos (INSS/FGTS)</span>
                                                    <span>R$ {result.breakdown.taxes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                                <div className="flex justify-between items-center mb-1 text-xs text-yellow-500">
                                                    <span>+ Provisões (Férias/13º)</span>
                                                    <span>R$ {result.breakdown.provisions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs text-green-400">
                                                    <span>+ Benefícios e Variáveis</span>
                                                    <span>R$ {result.breakdown.benefits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            </div>

                                            {regime === 'presumido_real' && (
                                                <div className="flex items-start gap-2 text-xs text-gray-500 px-2">
                                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                                    <p>O Lucro Presumido paga 20% de INSS Patronal + Alíquotas de Terceiros, tornando a contratação CLT significativamente mais cara.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Content (Quick Summary) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-blue-500" />
                                Resumo Rápido (Dados Oficiais Dezembro/2025)
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Salário Mínimo Nacional</div>
                                    <div className="text-lg font-bold text-white">R$ 1.518,00</div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <DollarSign className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Reoneração da Folha:</strong> Setores desonerados pagam <strong>5% de INSS</strong> sobre a folha em 2025.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <PieChart className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Provisões Obrigatórias:</strong> Reserve <strong>19,44%</strong> do salário mensalmente para cobrir Férias e 13º.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Simples Nacional:</strong> Isento de INSS Patronal nos Anexos I, II, III e V; paga 20% no Anexo IV.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6">
                            <h3 className="text-md font-bold text-yellow-200 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                Resumo em 30 Segundos
                            </h3>
                            <p className="text-sm text-yellow-100/80 mb-3">
                                Saber <strong>quanto custa um funcionário</strong> vai muito além do salário impresso na carteira. Em 2025, com o novo salário mínimo de R$ 1.518,00 e o início da reoneração gradual da folha para 17 setores, a matemática mudou. O custo final de um colaborador CLT varia drasticamente conforme o regime tributário da sua empresa (Simples Nacional, Lucro Presumido ou Real), podendo representar de **1,6 a 2,8 vezes** o valor do salário bruto. Esta **Calculadora de Custo de Funcionário** detalha encargos sociais, provisões de férias e 13º, além de custos invisíveis, para que você proteja sua margem de lucro.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body Content from Text */}

                {/* Tabela Oficial */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Briefcase className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Tabela Oficial: Comparativo de Cargas Tributárias (2025)
                        </h2>
                    </div>

                    <p className="text-gray-300 mb-6">A tabela abaixo demonstra como o regime tributário define o peso dos encargos sobre a folha de pagamento.</p>

                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/5 text-gray-300">
                                <tr>
                                    <th className="p-3">Componente do Encargo</th>
                                    <th className="p-3">Simples Nacional (Anexos I, II, III, V)</th>
                                    <th className="p-3">Simples Nacional (Anexo IV)</th>
                                    <th className="p-3">Lucro Presumido / Real</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400 divide-y divide-white/5">
                                <tr>
                                    <td className="p-3 font-medium text-white">INSS Patronal</td>
                                    <td className="p-3">0% (Incluso no DAS)</td>
                                    <td className="p-3 text-red-400">20%</td>
                                    <td className="p-3 text-red-400">20%</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-medium text-white">RAT (Risco Acidente)</td>
                                    <td className="p-3">0% (Incluso no DAS)</td>
                                    <td className="p-3">1% a 3%</td>
                                    <td className="p-3">1% a 3%</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-medium text-white">Terceiros (Sistema S)</td>
                                    <td className="p-3">0% (Incluso no DAS)</td>
                                    <td className="p-3">0%</td>
                                    <td className="p-3">~ 5,8%</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-medium text-white">FGTS</td>
                                    <td className="p-3">8%</td>
                                    <td className="p-3">8%</td>
                                    <td className="p-3">8%</td>
                                </tr>
                                <tr className="bg-white/5">
                                    <td className="p-3 font-bold text-white">Total Estimado</td>
                                    <td className="p-3 font-bold text-green-400">~ 8%</td>
                                    <td className="p-3 font-bold text-yellow-400">~ 29% a 33%</td>
                                    <td className="p-3 font-bold text-red-400">~ 34,8% a 42%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                        <strong>Fonte Oficial:</strong> Baseado nas alíquotas da Receita Federal e Tabela RAT/FAP. Consulte as regras detalhadas no <a href="https://www.gov.br/inss/pt-br/noticias/confira-como-ficaram-as-aliquotas-de-contribuicao-ao-inss" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Portal Gov.br sobre alíquotas INSS 2025</a>.
                    </p>
                </div>

                {/* A Realidade do Custo */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-4">A Realidade do Custo: O Mito do "Salário x 2"</h2>
                    <p className="text-gray-300 mb-6">
                        Historicamente, muitos gestores usam a conta de padaria de que um funcionário custa o dobro do salário ("2x"). Embora estudos da FGV/CNI indiquem que o custo pode chegar a **2,83 vezes** o salário em cenários de alta rotatividade e ineficiência, essa generalização é perigosa para 2025.
                    </p>
                    <p className="text-gray-300 mb-6">
                        Para empresas no **Simples Nacional (Anexo III)**, por exemplo, o multiplicador real costuma ficar próximo de **1,6x**. Já no **Lucro Presumido**, gira em torno de **1,93x** para salários médios. Aplicar um multiplicador genérico pode fazer você perder competitividade ou precificar seu serviço errado.
                    </p>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-4">Erros Comuns ao Calcular o Custo</h3>
                        <ol className="space-y-3 text-sm text-gray-300 list-decimal pl-4">
                            <li>
                                <strong>Esquecer o Anexo IV do Simples:</strong> Empresas de limpeza, vigilância e construção civil (Anexo IV) pagam 20% de INSS Patronal, diferentemente do restante do Simples. Ignorar isso gera um rombo de 23% a 25% no orçamento.
                            </li>
                            <li>
                                <strong>Ignorar a Reoneração (Lei 14.973/2024):</strong> Se sua empresa é de TI, Transportes ou Comunicação, a "desoneração total" acabou. Em 2025, você paga **5% de INSS sobre a folha** além da taxa sobre a receita. Veja os detalhes na <a href="http://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14973.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Lei nº 14.973/2024 no Planalto</a>.
                            </li>
                            <li>
                                <strong>Não provisionar encargos sobre férias:</strong> Não basta guardar o valor das férias; você precisa guardar o dinheiro para pagar o FGTS e INSS que incidirão sobre essas férias lá na frente.
                            </li>
                        </ol>
                    </div>
                </div>

                {/* Como funciona */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Como funciona a Calculadora de Custo de Funcionário</h2>
                    <p className="text-gray-300 mb-6">
                        Nossa **Calculadora de Custo de Funcionário** utiliza o método de custeio por absorção direta e provisões. Diferente de contas simples que somam apenas o que sai do caixa no dia 05 (salário + guia de imposto), o cálculo correto deve considerar a competência.
                    </p>
                    <p className="text-gray-300 mb-6">
                        O sistema considera três pilares para entregar o resultado:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400 list-disc pl-5">
                        <li><strong>Regime Tributário:</strong> Define se a empresa paga ou não os 20% de cota patronal e terceiros.</li>
                        <li><strong>Verbas Remuneratórias:</strong> Soma salário base, periculosidade ou adicionais (use nossa <Link to="/calculadoras/adicional-noturno" className="text-blue-400 hover:underline">ferramenta de adicional noturno</Link> para estimar).</li>
                        <li><strong>Provisões Futuras:</strong> Calcula o passivo trabalhista que se acumula mensalmente (férias e 13º proporcionais) e os impostos que incidirão sobre eles.</li>
                    </ul>
                </div>

                {/* Como Calcular (Passo a Passo) & Formulas */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Como Calcular o Custo (Passo a Passo)</h2>
                    <p className="text-gray-300 mb-6">Para chegar ao valor exato ("na vírgula"), utilizamos a metodologia de custo modular. Vamos dividir o custo em três grandes grupos: Encargos Diretos, Provisões e Benefícios.</p>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-8 text-center font-mono text-blue-300 text-sm md:text-base">
                        Custo Total = Salário + Encargos Diretos + Provisões (+Reflexos) + Benefícios
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="font-bold text-white mb-3 text-lg">1. Encargos Sociais</h3>
                            <p className="text-xs text-gray-500 mb-2">Incidem diretamente sobre o salário bruto.</p>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>• <strong>FGTS:</strong> 8% (para todos).</li>
                                <li>• <strong>INSS Patronal:</strong> 20% (Lucro Real/Presumido e Simples Anexo IV).</li>
                                <li>• <strong>RAT x FAP:</strong> 1% a 3% (Risco) x (0,5 a 2,0).</li>
                                <li>• <strong>Sistema S:</strong> Média de 5,8% (Lucro Real/Presumido).</li>
                            </ul>
                            <a href="https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/tributos/contribuicoes-previdenciarias" target="_blank" rel="noopener noreferrer" className="block mt-4 text-xs text-blue-400 hover:underline">Tabela de Incidência da Receita Federal</a>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-3 text-lg">2. Provisões</h3>
                            <p className="text-xs text-gray-500 mb-2">Direitos que o funcionário adquire mensalmente.</p>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>• <strong>Férias + 1/3:</strong> 11,11% do salário.</li>
                                <li>• <strong>13º Salário:</strong> 8,33% do salário.</li>
                                <li>• <strong>Total de Provisão:</strong> <strong>19,44%</strong>.</li>
                            </ul>
                            <p className="text-xs text-yellow-500 mt-2">Atenção: Sobre esses 19,44% também incidem FGTS e INSS.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-3 text-lg">3. Benefícios</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>• <strong>Vale-Transporte:</strong> A empresa paga o que exceder 6% do salário. Use nossa <Link to="/calculadoras/custo-viagem" className="text-blue-400 hover:underline">Calculadora de Custo de Viagem</Link>.</li>
                                <li>• <strong>Vale-Alimentação:</strong> Custo integral.</li>
                                <li>• <strong>Plano de Saúde:</strong> Custo fixo por vida.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Simulações Práticas */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Simulações Práticas: Do Básico ao Executivo</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Cenário 1: Analista Pleno (R$ 4.000,00)</h3>
                            <p className="text-xs text-gray-400 mb-4">Salário médio com benefícios padrão (VR R$ 660,00 + Saúde R$ 300,00).</p>
                            <div className="overflow-x-auto rounded-xl border border-white/10">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-white/5 text-gray-300">
                                        <tr>
                                            <th className="p-2">Custo</th>
                                            <th className="p-2">Simples (Anexo III)</th>
                                            <th className="p-2">Lucro Presumido</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400 divide-y divide-white/5">
                                        <tr><td className="p-2">Salário</td><td className="p-2">R$ 4.000,00</td><td className="p-2">R$ 4.000,00</td></tr>
                                        <tr><td className="p-2">Encargos</td><td className="p-2">R$ 320,00</td><td className="p-2">R$ 1.432,00</td></tr>
                                        <tr><td className="p-2">Provisões</td><td className="p-2">R$ 999,81</td><td className="p-2">R$ 1.215,98</td></tr>
                                        <tr><td className="p-2">Benefícios</td><td className="p-2">R$ 1.072,00</td><td className="p-2">R$ 1.072,00</td></tr>
                                        <tr className="bg-white/5 font-bold text-white">
                                            <td className="p-2">Total</td>
                                            <td className="p-2">R$ 6.391,81</td>
                                            <td className="p-2">R$ 7.719,98</td>
                                        </tr>
                                        <tr><td className="p-2 font-bold text-blue-400">Multiplicador</td><td className="p-2 font-bold text-blue-400">1,60x</td><td className="p-2 font-bold text-blue-400">1,93x</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Cenário 2: Executivo (R$ 15.000,00)</h3>
                            <p className="text-xs text-gray-400 mb-4">INSS Patronal (20%) não tem teto para a empresa no Lucro Real/Presumido.</p>
                            <div className="overflow-x-auto rounded-xl border border-white/10">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-white/5 text-gray-300">
                                        <tr>
                                            <th className="p-2">Custo</th>
                                            <th className="p-2">Simples (Anexo III)</th>
                                            <th className="p-2">L. Presumido (Serv)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400 divide-y divide-white/5">
                                        <tr><td className="p-2">Salário</td><td className="p-2">R$ 15.000,00</td><td className="p-2">R$ 15.000,00</td></tr>
                                        <tr><td className="p-2">Encargos</td><td className="p-2">Isento</td><td className="p-2">R$ 4.170,00</td></tr>
                                        <tr><td className="p-2">FGTS</td><td className="p-2">R$ 1.200,00</td><td className="p-2">R$ 1.200,00</td></tr>
                                        <tr><td className="p-2">Encargos s/ Prov</td><td className="p-2">R$ 233,28</td><td className="p-2">R$ 1.043,92</td></tr>
                                        <tr className="bg-white/5 font-bold text-white">
                                            <td className="p-2">Total</td>
                                            <td className="p-2">R$ 20.349,28</td>
                                            <td className="p-2">R$ 25.329,92</td>
                                        </tr>
                                        <tr><td className="p-2 font-bold text-blue-400">Multiplicador</td><td className="p-2 font-bold text-blue-400">1,35x</td><td className="p-2 font-bold text-blue-400">1,68x</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Nota: No Lucro Presumido, a empresa paga R$ 3.000,00 apenas de INSS Patronal, pois não há teto para o empregador.</p>
                        </div>
                    </div>
                </div>

                {/* Casos Especiais */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Casos Especiais e Mudanças para 2025</h2>

                    <div className="space-y-6">
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2">O Impacto da Reoneração Gradual</h3>
                            <p className="text-sm text-gray-300">
                                Para os 17 setores que utilizavam a desoneração da folha (CPRB), 2025 é um ano híbrido. A empresa pagará o imposto sobre a receita bruta (com alíquota reduzida) **MAIS 5% de INSS** sobre a folha de pagamento. Esse percentual subirá para 10% em 2026 e 15% em 2027. Isso exige revisão imediata de contratos de longo prazo.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                <h3 className="font-bold text-white mb-2">Fator R no Simples Nacional</h3>
                                <p className="text-sm text-gray-300 mb-2">
                                    Empresas do Anexo V podem migrar para o Anexo III (mais barato) se a folha de pagamento for igual ou superior a 28% do faturamento. Entenda melhor usando nossa ferramenta de <Link to="/calculadoras/simples-vs-presumido" className="text-blue-400 hover:underline">Simples Nacional vs Lucro Presumido</Link>.
                                </p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                <h3 className="font-bold text-white mb-2">Salário Mínimo e Teto do INSS 2025</h3>
                                <p className="text-sm text-gray-300 mb-2">
                                    Com o mínimo a **R$ 1.518,00**, todos os benefícios atrelados sobem. O desconto de INSS do funcionário tem teto de aprox. R$ 951,63. Para saber o líquido exato, acesse a <Link to="/calculadoras/salario-liquido" className="text-blue-400 hover:underline">Calculadora de Salário Líquido</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <FAQ
                    items={EMPLOYEE_COST_FAQS}
                    title="Dúvidas sobre Calculadora de Custo de Funcionário"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
