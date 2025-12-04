import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, Wallet, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const NET_SALARY_FAQS: FAQItem[] = [
    {
        question: "O que é descontado do salário?",
        answer: "Os principais descontos obrigatórios são INSS (previdência) e IRRF (imposto de renda). Outros descontos comuns são vale-transporte (até 6%), plano de saúde e vale-refeição."
    },
    {
        question: "Como calcular o IRRF?",
        answer: "O IRRF é calculado sobre o salário base após descontar o INSS e o valor por dependente (R$ 189,59 em 2024). Aplica-se a alíquota da tabela progressiva e subtrai-se a parcela a deduzir."
    },
    {
        question: "O que é salário líquido?",
        answer: "É o valor que efetivamente cai na sua conta bancária, após todas as deduções legais e benefícios."
    }
];

export function NetSalaryPage() {
    const [grossSalary, setGrossSalary] = useState('');
    const [dependents, setDependents] = useState('0');
    const [otherDiscounts, setOtherDiscounts] = useState('');
    const [result, setResult] = useState<{ inss: number; irrf: number; netSalary: number } | null>(null);

    const calculate = () => {
        const salary = parseFloat(grossSalary.replace(/\./g, '').replace(',', '.'));
        const deps = parseInt(dependents);
        const others = parseFloat(otherDiscounts.replace(/\./g, '').replace(',', '.') || '0');

        if (isNaN(salary)) {
            setResult(null);
            return;
        }

        // 1. Calculate INSS (2024 Table)
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
            inss = 908.85; // Ceiling
        }

        // 2. Calculate IRRF Base
        const deductionPerDependent = 189.59;
        const irrfBase = salary - inss - (deps * deductionPerDependent);

        // 3. Calculate IRRF (2024 Table - Simplified)
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

        // Simplified discount option (new rule) check omitted for brevity, using standard calculation
        if (irrf < 0) irrf = 0;

        const netSalary = salary - inss - irrf - others;

        setResult({
            inss,
            irrf,
            netSalary
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
        "name": "Calculadora de Salário Líquido 2025",
        "description": "Descubra quanto vai cair na sua conta. Cálculo exato de salário líquido com descontos de INSS e Imposto de Renda.",
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
                title="Calculadora de Salário Líquido 2025 - Cálculo Exato"
                description="Salário Bruto x Líquido: saiba a diferença. Calcule seus descontos de INSS e IRRF e descubra seu salário real."
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

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Wallet className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">Salário Líquido</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Entenda seu holerite. Veja para onde vai seu dinheiro e quanto sobra no final.
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
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Calcular Líquido
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Salário Bruto</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={grossSalary}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setGrossSalary)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Número de Dependentes</label>
                                        <input
                                            type="number"
                                            value={dependents}
                                            onChange={(e) => setDependents(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Outros Descontos</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={otherDiscounts}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setOtherDiscounts)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Salário Líquido Estimado</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Desconto INSS</span>
                                            <span className="text-xl font-bold text-red-400">
                                                {result ? `- R$ ${result.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Desconto IRRF</span>
                                            <span className="text-xl font-bold text-red-400">
                                                {result ? `- R$ ${result.irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                    </div>
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
                                <DollarSign className="w-5 h-5 text-blue-500" />
                                Para onde vai o dinheiro?
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    O "Leão" e a Previdência levam uma fatia considerável.
                                </p>
                                <ul className="space-y-2 list-disc pl-4">
                                    <li><strong>INSS:</strong> Garante sua aposentadoria e auxílios.</li>
                                    <li><strong>IRRF:</strong> Imposto sobre a renda, retido na fonte.</li>
                                </ul>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mt-2">
                                    <strong className="text-white block mb-1">Dica</strong>
                                    Dependentes reduzem o Imposto de Renda. Certifique-se de informar todos ao RH da sua empresa.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={NET_SALARY_FAQS}
                    title="Dúvidas sobre Salário Líquido"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
