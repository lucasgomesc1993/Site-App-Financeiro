import React, { useState, useEffect } from 'react';
import { Briefcase, Calculator, DollarSign, Scale, ArrowRight, Wallet, TrendingUp, AlertCircle, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const CLT_PJ_FAQS: FAQItem[] = [
    {
        question: "Qual a diferença principal entre CLT e PJ?",
        answer: "A CLT (Consolidação das Leis do Trabalho) garante direitos como férias, 13º, FGTS e seguro-desemprego, mas tem maiores descontos. O PJ (Pessoa Jurídica) recebe o valor integral da nota fiscal, paga menos impostos, mas não tem os benefícios trabalhistas garantidos por lei, dependendo de negociação."
    },
    {
        question: "Quantos % a mais o PJ deve ganhar para compensar?",
        answer: "Geralmente, recomenda-se que o salário PJ seja de 30% a 50% maior que o salário CLT para cobrir a ausência de benefícios (férias, 13º, FGTS) e os custos de abertura e manutenção da empresa (contador, impostos)."
    },
    {
        question: "PJ tem direito a férias e 13º?",
        answer: "Por lei, não. Como PJ é uma relação entre empresas, não existem verbas trabalhistas. Porém, muitos contratos PJ incluem 'recesso remunerado' ou bonificações equivalentes, mas isso deve estar explícito no contrato de prestação de serviços."
    },
    {
        question: "Quais impostos o PJ paga?",
        answer: "Depende do regime tributário. No Simples Nacional, a alíquota inicial para serviços (Anexo III) é geralmente de 6% sobre o faturamento, desde que o 'Fator R' (folha de pagamento) seja superior a 28%. Caso contrário, pode subir para 15,5% (Anexo V)."
    }
];

export function CLTVsPJPage() {
    const [salary, setSalary] = useState('');
    const [benefits, setBenefits] = useState('');
    const [pjSalary, setPjSalary] = useState('');
    const [result, setResult] = useState<{ cltTotal: number; netClt: number; netPj: number; difference: number } | null>(null);

    const calculate = () => {
        const salaryVal = parseFloat(salary.replace(/\./g, '').replace(',', '.') || '0');
        const benefitsVal = parseFloat(benefits.replace(/\./g, '').replace(',', '.') || '0');
        const pjVal = parseFloat(pjSalary.replace(/\./g, '').replace(',', '.') || '0');

        if (salaryVal === 0 && pjVal === 0) {
            setResult(null);
            return;
        }

        // CLT Calculations (Simplified 2024/2025 estimates)
        // INSS
        let inss = 0;
        if (salaryVal <= 1412.00) inss = salaryVal * 0.075;
        else if (salaryVal <= 2666.68) inss = 1412.00 * 0.075 + (salaryVal - 1412.00) * 0.09;
        else if (salaryVal <= 4000.03) inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (salaryVal - 2666.68) * 0.12;
        else if (salaryVal <= 7786.02) inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salaryVal - 4000.03) * 0.14;
        else inss = 908.85;

        // IRRF (Simplified Base)
        const irrfBase = salaryVal - inss;
        let irrf = 0;
        if (irrfBase <= 2259.20) irrf = 0;
        else if (irrfBase <= 2826.65) irrf = (irrfBase * 0.075) - 169.44;
        else if (irrfBase <= 3751.05) irrf = (irrfBase * 0.15) - 381.44;
        else if (irrfBase <= 4664.68) irrf = (irrfBase * 0.225) - 662.77;
        else irrf = (irrfBase * 0.275) - 896.00;
        if (irrf < 0) irrf = 0;

        const fgts = salaryVal * 0.08;
        const thirteenth = salaryVal / 12; // Monthly provision
        const vacation = (salaryVal + salaryVal / 3) / 12; // Monthly provision

        const netCltMonthly = salaryVal - inss - irrf;
        // Total CLT Value "Package" per month (Net + Benefits + Provisions for 13th/Vacation/FGTS)
        // Note: This is an estimation of "Total Annual Gains / 12" to compare with monthly PJ
        const cltTotalAnnual = (netCltMonthly * 12) + (salaryVal) + (salaryVal / 3) + (fgts * 12) + (benefitsVal * 12);
        // Logic: 12 net salaries + 13th (gross approx) + vacation (gross approx) + FGTS. 
        // More precise: Net annual = (Net * 13) + (Vacation Net) + FGTS + Benefits. 
        // Let's stick to a monthly comparable:
        const cltComparableMonthly = netCltMonthly + benefitsVal + fgts + thirteenth + vacation;

        // PJ Calculations (Simples Nacional Annex III approx 6% + Accountant cost)
        const pjTaxRate = 0.06; // Optimistic scenario
        const accountantCost = 300; // Est monthly
        const pjTax = pjVal * pjTaxRate;
        const netPj = pjVal - pjTax - accountantCost;

        setResult({
            cltTotal: cltComparableMonthly,
            netClt: netCltMonthly, // Just the cash in hand
            netPj: netPj,
            difference: netPj - cltComparableMonthly
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, benefits, pjSalary]);

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
        "description": "Descubra o que vale mais a pena: ser funcionário CLT ou abrir empresa PJ. Compare salários, impostos, benefícios e veja o lucro real.",
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
                title="Calculadora CLT vs PJ - Qual vale mais a pena em 2025?"
                description="Comparativo exato: CLT com benefícios vs PJ com impostos. Descubra qual regime de trabalho coloca mais dinheiro no seu bolso."
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
                            Comparativo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">CLT vs PJ</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Colocamos na balança: salário, impostos, férias, 13º e benefícios. Descubra a verdade sobre qual contrato paga mais.
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
                                    Preencha os Dados
                                </h2>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">Opção CLT</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Salário Bruto Mensal</label>
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
                                            <label className="text-sm text-gray-400">Benefícios (VR, VA, Plano)</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                                <input
                                                    type="text"
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
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Proposta de Valor Mensal</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={pjSalary}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setPjSalary)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Considerando Simples Nacional (Anexo III) ~6%.
                                        </p>
                                    </div>
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
                                            Diferença aproximada: <strong>R$ {Math.abs(result.difference).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> por mês.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                            <div>
                                                <span className="text-sm text-gray-400 block">CLT (Total Mensal*)</span>
                                                <span className="text-xs text-gray-500">Inclui férias, 13º, FGTS diluídos</span>
                                            </div>
                                            <span className="text-lg font-bold text-white">
                                                R$ {result.cltTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                            <div>
                                                <span className="text-sm text-gray-400 block">PJ (Líquido)</span>
                                                <span className="text-xs text-gray-500">Descontando impostos e contador</span>
                                            </div>
                                            <span className="text-lg font-bold text-white">
                                                R$ {result.netPj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
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
                                                <span className="text-xs text-gray-500 block">Entrada PJ</span>
                                                <span className="text-base font-bold text-indigo-300">R$ {result.netPj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-400 py-12">
                                    <Scale className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                                    <p>Preencha os dois lados para ver o comparativo detalhado.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Sections */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <Building2 className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Vantagens CLT
                            </h2>
                        </div>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                <span><strong>Estabilidade:</strong> Seguro-desemprego em caso de demissão sem justa causa.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                <span><strong>Benefícios Legais:</strong> Férias remuneradas (+1/3), 13º salário, depósito de FGTS (8%).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                <span><strong>Facilidade:</strong> Impostos retidos na fonte, sem burocracia de contabilidade.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-indigo-500/10 p-3 rounded-xl shrink-0">
                                <Wallet className="w-6 h-6 text-indigo-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Vantagens PJ
                            </h2>
                        </div>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                                <span><strong>Maior Líquido:</strong> Menos impostos descontados direto do valor bruto.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                                <span><strong>Flexibilidade:</strong> Possibilidade de atender múltiplos clientes e maior autonomia.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                                <span><strong>Tributação Reduzida:</strong> No Simples Nacional, alíquotas começam em 6% (vs até 27,5% IRPF).</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-yellow-500/10 p-3 rounded-xl shrink-0">
                            <AlertCircle className="w-6 h-6 text-yellow-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Atenção: Peiotização Ilegal
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-4">
                        Ser contratado como PJ mas ter obrigações de CLT (horário fixo, subordinação direta e pessoalidade) configura fraude trabalhista. Se você tem todos os deveres de um empregado mas nenhum direito, está em situação vulnerável.
                    </p>
                    <p className="text-gray-400">
                        O cálculo acima considera <strong>valores financeiros</strong>. A segurança jurídica e a estabilidade também devem entrar na sua equação pessoal.
                    </p>
                </div>

                <FAQ
                    items={CLT_PJ_FAQS}
                    title="Dúvidas Frequentes"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
