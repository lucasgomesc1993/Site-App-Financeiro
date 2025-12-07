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
        question: "Qual a diferença entre Salário Bruto e Líquido?",
        answer: "Salário Bruto é o valor registrado na sua Carteira de Trabalho (CLT) sem nenhum desconto. Salário Líquido é o valor que efetivamente cai na sua conta bancária após a subtração de impostos (INSS, IRRF) e benefícios (Vale Transporte, Vale Refeição, Plano de Saúde)."
    },
    {
        question: "Como calcular o salário líquido passo a passo?",
        answer: "Primeiro, desconte o INSS do Salário Bruto usando a tabela progressiva. Com o resultado (Base de Cálculo), aplique a alíquota do Imposto de Renda correspondente e subtraia a \"parcela a deduzir\" da tabela do IR. Por fim, subtraia outros descontos como VR, VT e convênios."
    },
    {
        question: "Quanto é descontado de Vale Transporte?",
        answer: "A empresa pode descontar até 6% do seu Salário Base (Bruto) referente ao Vale Transporte. Se o custo das passagens for menor que 6% do seu salário, o desconto será apenas o valor real das passagens. Se for maior, a empresa arca com a diferença."
    },
    {
        question: "O desconto simplificado do IR vale a pena?",
        answer: "Sim, para faixas salariais mais baixas (até aprox. R$ 5.000,00), o desconto simplificado de R$ 564,80 costuma ser mais vantajoso que as deduções legais, garantindo isenção para quem ganha até dois salários mínimos."
    },
    {
        question: "Por que meu salário líquido diminuiu após um aumento?",
        answer: "Isso pode acontecer se o aumento fizer seu salário mudar de faixa na tabela do INSS ou do Imposto de Renda. A mudança de alíquota (ex: de 15% para 22,5%) pode consumir uma parte maior do reajuste inicialmente."
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

        // 1. Calculate INSS (2024/2025 Table Logic)
        let inss = 0;
        if (salary <= 1412.00) {
            inss = salary * 0.075;
        } else if (salary <= 2666.68) {
            inss = 1412.00 * 0.075 + (salary - 1412.00) * 0.09;
        } else if (salary <= 4000.03) {
            inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (salary - 2666.68) * 0.12;
        } else if (salary <= 7786.02) {
            inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salary - 4000.03) * 0.14;
        } else {
            inss = 908.85; // Ceiling for 2024
        }

        // 2. Calculate IRRF Base
        // Legal Deductions
        const deductionPerDependent = 189.59;
        const irrfBaseLegal = salary - inss - (deps * deductionPerDependent);

        // Simplified Discount (Standard R$ 564.80 replacing legal deductions if better)
        let irrfBaseA = salary - inss - (deps * deductionPerDependent);
        let irrfBaseB = salary - 564.80;

        // Use the smaller base (which leads to less tax)
        const irrfBase = Math.min(irrfBaseA, irrfBaseB);

        // 3. Calculate IRRF (2024 Table)
        let irrf = 0;
        if (irrfBase <= 2259.20) {
            irrf = 0;
        } else if (irrfBase <= 2826.65) {
            irrf = (irrfBase * 0.075) - 169.44;
        } else if (irrfBase <= 3751.05) {
            irrf = (irrfBase * 0.15) - 381.44;
        } else if (irrfBase <= 4664.68) {
            irrf = (irrfBase * 0.225) - 662.77;
        } else {
            irrf = (irrfBase * 0.275) - 896.00;
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
                title="Calculadora de Salário Líquido 2025: Cálculo Exato e Grátis"
                description="Descubra o valor real do seu pagamento com a Calculadora de Salário Líquido 2025. Descontos de INSS, IRRF e benefícios atualizados. Calcule agora."
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
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Salário Líquido 2025</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Você sabe exatamente quanto dinheiro cai na sua conta no final do mês? O valor contratado na carteira de trabalho (Salário Bruto) raramente é o mesmo que chega ao seu bolso.
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
                                O cálculo segue uma lógica de "funil". Começamos com o valor bruto e subtraímos as obrigações legais na ordem correta. Entender essa ordem é vital para não errar a conta, especialmente se você precisa planejar suas <Link to="/blog/financas-pessoais" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">finanças pessoais</Link>.
                            </p>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-sm font-mono text-gray-300">
                                Salário Bruto <br />
                                <span className="text-red-400">- INSS</span> <br />
                                <span className="text-red-400">- IRRF</span> <br />
                                <span className="text-red-400">- Outros</span> <br />
                                <span className="text-emerald-400">+ Adicionais</span> <br />
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
                                <h3 className="text-2xl font-bold text-white mb-2">1. Desconto do INSS</h3>
                                <p className="text-gray-400">
                                    O primeiro desconto aplicado é sempre o INSS. Desde a Reforma da Previdência, a alíquota é <strong>progressiva</strong>.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="p-3 text-white">Faixa Salarial (R$)</th>
                                        <th className="p-3 text-white">Alíquota</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-400">
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">Até 1.412,00</td>
                                        <td className="p-3">7,5%</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">De 1.412,01 até 2.666,68</td>
                                        <td className="p-3">9%</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">De 2.666,69 até 4.000,03</td>
                                        <td className="p-3">12%</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">De 4.000,04 até 7.786,02</td>
                                        <td className="p-3">14%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm text-gray-500 mt-4 italic">
                            *Nota: Para salários acima de R$ 7.786,02, o desconto é fixo no teto da previdência. Simule cenários específicos na nossa calculadora de <Link to="/calculadoras/inss" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">INSS</Link>.
                        </p>
                    </div>

                    {/* IRRF Table */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                <TrendingDown className="w-6 h-6 text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">2. Desconto do Imposto de Renda (IRRF)</h3>
                                <p className="text-gray-400">
                                    O sistema sempre aplicará o que for mais vantajoso: Deduções Legais ou Desconto Simplificado. Quem ganha até 2 salários mínimos está isento.
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
                                        <td className="p-3">Até 2.259,20</td>
                                        <td className="p-3">Isento</td>
                                        <td className="p-3">0,00</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">De 2.259,21 até 2.826,65</td>
                                        <td className="p-3">7,5%</td>
                                        <td className="p-3">169,44</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">De 2.826,66 até 3.751,05</td>
                                        <td className="p-3">15%</td>
                                        <td className="p-3">381,44</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">De 3.751,06 até 4.664,68</td>
                                        <td className="p-3">22,5%</td>
                                        <td className="p-3">662,77</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Acima de 4.664,68</td>
                                        <td className="p-3">27,5%</td>
                                        <td className="p-3">896,00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-emerald-200/80">
                                <strong>Fique atento:</strong> Cada dependente legal reduz a base de cálculo do imposto em <strong>R$ 189,59</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Planning Section */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                <Calendar className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mt-1">
                                Planejamento Anual
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Saber seu salário líquido mensal é o primeiro passo. No entanto, para um planejamento completo, lembre-se de considerar o impacto do <Link to="/calculadoras/decimo-terceiro" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">décimo terceiro</Link> e a previsão das suas <Link to="/calculadoras/ferias" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">férias</Link>, pois a tributação sobre esses pagamentos ocorre de forma exclusiva na fonte.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <PiggyBank className="w-4 h-4 text-emerald-500" />
                                    Adicionais e Descontos
                                </h3>
                                <ul className="text-sm text-gray-400 space-y-2">
                                    <li>• <strong>Pensões e Planos de Saúde:</strong> Subtraídos do montante.</li>
                                    <li>• <strong>Adicionais:</strong> <Link to="/calculadoras/horas-extras" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Horas extras</Link> e <Link to="/calculadoras/adicional-noturno" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Adicional noturno</Link> entram antes dos impostos.</li>
                                </ul>
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
