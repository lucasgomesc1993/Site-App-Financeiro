import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Users, MinusCircle, Briefcase } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const NET_SALARY_FAQS: FAQItem[] = [
    {
        question: "Qual a diferença entre salário bruto e líquido?",
        answer: "O salário bruto é o valor total registrado na sua carteira de trabalho, sem nenhum desconto. Já o salário líquido é o valor que efetivamente cai na sua conta bancária, após a dedução de impostos obrigatórios (INSS e IRRF) e benefícios eventuais."
    },
    {
        question: "O que é descontado do salário em 2025?",
        answer: "Os descontos obrigatórios principais são o INSS (Previdência Social), que varia de 7,5% a 14%, e o IRRF (Imposto de Renda), que pode chegar a 27,5% dependendo da faixa salarial. Outros descontos comuns incluem vale-transporte (até 6%), vale-alimentação e planos de saúde."
    },
    {
        question: "Quanto desconta por dependente no Imposto de Renda?",
        answer: "Para o cálculo do IRRF em 2025, cada dependente garante uma dedução de R$ 189,59 na base de cálculo do imposto. Isso ajuda a reduzir o valor final a ser pago ao leão."
    },
    {
        question: "Como calcular o desconto do INSS?",
        answer: "O INSS em 2025 usa uma tabela progressiva. O salário é fatiado em faixas, e cada fatia tem uma alíquota diferente (7,5%, 9%, 12% e 14%). O valor final é a soma do imposto de cada fatia, limitado ao teto da previdência."
    },
    {
        question: "O vale-transporte é descontado do salário líquido?",
        answer: "Sim. A empresa pode descontar até 6% do seu salário base para custear o vale-transporte. Se o custo da passagem for menor que 6% do salário, desconta-se apenas o valor real da passagem."
    }
];

export const NetSalaryPage: React.FC = () => {
    const [salary, setSalary] = useState<number>(0);
    const [dependents, setDependents] = useState<number>(0);
    const [otherDiscounts, setOtherDiscounts] = useState<number>(0);
    const [result, setResult] = useState<any>(null);

    const calculateNetSalary = () => {
        if (!salary) return;

        // 1. Calculate INSS (Progressive Table 2024/2025 base)
        let inss = 0;
        const inssTable = [
            { limit: 1412.00, rate: 0.075 },
            { limit: 2666.68, rate: 0.09 },
            { limit: 4000.03, rate: 0.12 },
            { limit: 7786.02, rate: 0.14 }
        ];

        let remainingSalary = salary;
        let previousLimit = 0;

        for (const tier of inssTable) {
            if (salary > previousLimit) {
                const taxableAmount = Math.min(salary, tier.limit) - previousLimit;
                inss += taxableAmount * tier.rate;
                previousLimit = tier.limit;
            }
        }

        // Cap INSS at the ceiling
        if (salary > 7786.02) {
            // Recalculate exact ceiling if needed, but the loop handles it if we cap the salary input to the loop? 
            // Actually the loop works correctly for amounts above the last limit because the last limit is the max taxable base.
            // Wait, my loop logic continues? No, the last tier limit is 7786.02.
            // If salary is 10000, the last iteration:
            // taxableAmount = 7786.02 - 4000.03 = 3785.99 * 0.14.
            // Correct. The loop stops adding after the last tier limit is reached?
            // Ah, my loop condition `if (salary > previousLimit)` is true, but `Math.min(salary, tier.limit)` caps it at the tier limit.
            // So for salary > 7786.02, it calculates up to 7786.02. Correct.
        }

        // 2. Calculate IRRF
        const deductionPerDependent = 189.59;
        const simplifiedDiscount = 564.80;

        const baseForIrrf = salary - inss;

        // Option A: Legal Deductions
        const baseLegal = baseForIrrf - (dependents * deductionPerDependent);

        // Option B: Simplified Discount
        // The simplified discount replaces the legal deductions (INSS + Dependents + others) IF it's more beneficial?
        // No, the simplified discount replaces the *deductions* from the base.
        // Actually, the rule is: You can deduct 20% of taxable income (limited to 16k/year in annual declaration) OR use standard deductions.
        // BUT for the *monthly* withholding (font), the rule is:
        // You can deduct the simplified amount (R$ 564,80) INSTEAD of the (INSS + Dependents + Alimony).
        // The system applies whichever is more beneficial to the taxpayer (yields a lower base).

        const totalLegalDeductions = inss + (dependents * deductionPerDependent);
        const effectiveDeduction = Math.max(totalLegalDeductions, simplifiedDiscount);

        const baseIrrfFinal = salary - effectiveDeduction;

        let irrf = 0;
        if (baseIrrfFinal <= 2259.20) {
            irrf = 0;
        } else if (baseIrrfFinal <= 2826.65) {
            irrf = (baseIrrfFinal * 0.075) - 169.44;
        } else if (baseIrrfFinal <= 3751.05) {
            irrf = (baseIrrfFinal * 0.15) - 381.44;
        } else if (baseIrrfFinal <= 4664.68) {
            irrf = (baseIrrfFinal * 0.225) - 662.77;
        } else {
            irrf = (baseIrrfFinal * 0.275) - 896.00;
        }

        if (irrf < 0) irrf = 0;

        // 3. Final Net Salary
        const netSalary = salary - inss - irrf - otherDiscounts;

        setResult({
            grossSalary: salary,
            inss,
            irrf,
            otherDiscounts,
            netSalary,
            effectiveDeductionType: effectiveDeduction === simplifiedDiscount ? 'Simplificado' : 'Deduções Legais'
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Salário Líquido 2025",
        "description": "Descubra exatamente quanto vai cair na sua conta após todos os descontos obrigatórios (INSS e IRRF) vigentes em 2025.",
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
                title="Calculadora de Salário Líquido 2025 - Cálculo Exato e Gratuito"
                description="Descubra quanto vai cair na sua conta. Calcule seu Salário Líquido 2025 com descontos de INSS, IRRF e dependentes de forma automática e gratuita."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Salário Líquido', href: '/calculadoras/salario-liquido' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Finanças Pessoais</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Salário Líquido 2025</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Descubra exatamente quanto vai cair na sua conta após todos os descontos obrigatórios (INSS e IRRF) vigentes em 2025.
                        </p>
                    </motion.div>
                </div>

                {/* Calculator Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid lg:grid-cols-12 gap-8 mb-24"
                >
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-primary" />
                                Seus Dados
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="salary" className="block text-sm text-gray-400 mb-2">Salário Bruto (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="salary"
                                            type="number"
                                            placeholder="Ex: 3000"
                                            value={salary || ''}
                                            onChange={(e) => setSalary(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="dependents" className="block text-sm text-gray-400 mb-2">Número de Dependentes</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="dependents"
                                            type="number"
                                            placeholder="Ex: 0"
                                            value={dependents || ''}
                                            onChange={(e) => setDependents(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="otherDiscounts" className="block text-sm text-gray-400 mb-2">Outros Descontos (R$)</label>
                                    <div className="relative">
                                        <MinusCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="otherDiscounts"
                                            type="number"
                                            placeholder="Ex: Vale transporte, plano de saúde..."
                                            value={otherDiscounts || ''}
                                            onChange={(e) => setOtherDiscounts(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculateNetSalary}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Calcular Salário Líquido
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSalary(0);
                                            setDependents(0);
                                            setOtherDiscounts(0);
                                            setResult(null);
                                        }}
                                        className="px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all"
                                    >
                                        Limpar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {result ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Salário Líquido Estimado</h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {formatCurrency(result.netSalary)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                *Cálculo baseado na tabela de {result.effectiveDeductionType === 'Simplificado' ? 'Desconto Simplificado' : 'Deduções Legais'}.
                                            </p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <span className="text-gray-300">Salário Bruto</span>
                                                <span className="text-white font-bold">{formatCurrency(result.grossSalary)}</span>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <span className="text-gray-300">Desconto INSS</span>
                                                <span className="text-red-400 font-bold">- {formatCurrency(result.inss)}</span>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <span className="text-gray-300">Desconto IRRF</span>
                                                <span className="text-red-400 font-bold">- {formatCurrency(result.irrf)}</span>
                                            </div>
                                            {result.otherDiscounts > 0 && (
                                                <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                    <span className="text-gray-300">Outros Descontos</span>
                                                    <span className="text-red-400 font-bold">- {formatCurrency(result.otherDiscounts)}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-4">
                                            <p className="text-sm text-gray-300 text-center">
                                                💡 <strong>Você sabia?</strong> Nossa calculadora verificou automaticamente que a opção de
                                                <span className="text-primary font-bold"> {result.effectiveDeductionType} </span>
                                                é a mais vantajosa para você, garantindo o menor imposto possível.
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <DollarSign className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para calcular seu salário líquido</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como calcular o Salário Líquido em 2025?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Muitos trabalhadores se surpreendem quando o valor depositado na conta é menor que o contratado na carteira. Isso acontece porque o Salário Líquido é o resultado do Salário Bruto menos os descontos obrigatórios por lei.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 my-8">
                                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white mb-3 text-primary">1. INSS</h3>
                                    <p className="text-sm">Primeiro desconto aplicado. Varia de 7,5% a 14% de acordo com a tabela progressiva. Financia sua aposentadoria e benefícios.</p>
                                </div>
                                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white mb-3 text-primary">2. IRRF</h3>
                                    <p className="text-sm">Calculado sobre o valor que sobrou após o INSS. Possui isenção para faixas menores e deduções por dependentes.</p>
                                </div>
                                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white mb-3 text-primary">3. Outros</h3>
                                    <p className="text-sm">Podem incluir vale-transporte (até 6%), coparticipação em plano de saúde, pensão alimentícia e empréstimos consignados.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Passo a Passo do Cálculo</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">Para chegar ao valor exato, a nossa calculadora segue a ordem oficial da Receita Federal:</p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span><strong>Cálculo do INSS:</strong> Aplica-se a tabela progressiva de 2025 sobre o salário bruto.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span><strong>Base do IRRF:</strong> Do salário bruto, subtrai-se o valor do INSS calculado e R$ 189,59 por cada dependente.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span>
                                    <span><strong>Cálculo do IRRF:</strong> Sobre essa nova base, aplica-se a alíquota do Imposto de Renda correspondente (7,5% a 27,5%) e subtrai-se a parcela dedutível.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">4</span>
                                    <span><strong>Resultado Final:</strong> Salário Bruto - INSS - IRRF = Salário Líquido.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary p-6 rounded-r-xl mb-16">
                        <h3 className="text-xl font-bold text-white mb-2">💡 Você sabia?</h3>
                        <p className="text-gray-300">
                            Em 2025, quem ganha até 2 salários mínimos pode ter isenção ou desconto simplificado no Imposto de Renda. Nossa calculadora verifica automaticamente qual opção é mais vantajosa para você (Dedução Legal ou Desconto Simplificado), garantindo o menor imposto possível.
                        </p>
                    </div>

                    <FAQ
                        items={NET_SALARY_FAQS}
                        title="Dúvidas Frequentes sobre Salário Líquido"
                        className="py-12"
                        showSocialProof={false}
                    />
                </div>

                {/* App Promo Banner */}
                <AppPromoBanner />
            </div>
        </section>
    );
};
