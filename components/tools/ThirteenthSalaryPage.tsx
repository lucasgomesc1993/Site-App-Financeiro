import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Users, Calendar, Coins, Briefcase } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const THIRTEENTH_FAQS: FAQItem[] = [
    {
        question: "Quem tem direito ao 13º salário?",
        answer: "Todo trabalhador com carteira assinada (CLT), sejam trabalhadores domésticos, rurais, urbanos ou avulsos. Aposentados e pensionistas do INSS também recebem. É necessário ter trabalhado pelo menos 15 dias no ano para ter direito a receber o benefício proporcional."
    },
    {
        question: "Quando é paga a primeira parcela do 13º?",
        answer: "A primeira parcela deve ser paga entre o dia 1º de fevereiro e o dia 30 de novembro. Ela corresponde a 50% do valor do salário bruto, sem descontos de INSS ou Imposto de Renda."
    },
    {
        question: "Quando cai a segunda parcela?",
        answer: "A segunda parcela deve ser depositada na conta do trabalhador até o dia 20 de dezembro. Diferente da primeira, nesta parcela incidem os descontos de INSS e Imposto de Renda sobre o valor total do benefício."
    },
    {
        question: "Como funciona o cálculo proporcional?",
        answer: "Se você não trabalhou os 12 meses do ano, receberá o valor proporcional. O cálculo é: (Salário ÷ 12) × Meses Trabalhados. Considera-se mês trabalhado a fração igual ou superior a 15 dias de trabalho."
    },
    {
        question: "Horas extras entram no cálculo do 13º?",
        answer: "Sim! A média das horas extras, adicionais noturnos e comissões recebidas durante o ano deve ser somada ao salário base para o cálculo do 13º salário."
    }
];

export const ThirteenthSalaryPage: React.FC = () => {
    const [salary, setSalary] = useState<number>(0);
    const [monthsWorked, setMonthsWorked] = useState<number>(12);
    const [dependents, setDependents] = useState<number>(0);
    const [averages, setAverages] = useState<number>(0);
    const [result, setResult] = useState<any>(null);

    const calculateThirteenth = () => {
        if (!salary) return;

        // Base Calculation
        const totalBase = salary + averages;
        const totalThirteenth = (totalBase / 12) * monthsWorked;

        // 1st Installment (50% of total, no discounts)
        const firstInstallment = totalThirteenth / 2;

        // INSS Calculation (on Total Thirteenth)
        // Progressive Table 2025
        let inss = 0;
        const inssTable = [
            { limit: 1412.00, rate: 0.075 },
            { limit: 2666.68, rate: 0.09 },
            { limit: 4000.03, rate: 0.12 },
            { limit: 7786.02, rate: 0.14 }
        ];

        let previousLimit = 0;
        for (const tier of inssTable) {
            if (totalThirteenth > previousLimit) {
                const taxableAmount = Math.min(totalThirteenth, tier.limit) - previousLimit;
                inss += taxableAmount * tier.rate;
                previousLimit = tier.limit;
            }
        }

        // IRRF Calculation (on Total Thirteenth - INSS - Dependents)
        const deductionPerDependent = 189.59;
        const simplifiedDiscount = 564.80; // Not usually applied to 13th exclusively in the same way, but standard practice follows the table.
        // Actually for 13th, the taxation is exclusive at source.
        // The simplified discount can be applied if beneficial.

        const baseForIrrf = totalThirteenth - inss;
        const totalLegalDeductions = inss + (dependents * deductionPerDependent);

        // Check if simplified discount is better
        const effectiveDeduction = Math.max(totalLegalDeductions, simplifiedDiscount);
        const baseIrrfFinal = totalThirteenth - effectiveDeduction;

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

        // 2nd Installment
        // Total - 1st Installment - INSS - IRRF
        const secondInstallment = totalThirteenth - firstInstallment - inss - irrf;

        setResult({
            totalThirteenth,
            firstInstallment,
            secondInstallment,
            inss,
            irrf,
            totalDiscounts: inss + irrf
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Décimo Terceiro Salário",
        "description": "Antecipe seu planejamento financeiro. Simule o valor exato da 1ª e 2ª parcela do seu 13º salário com todos os descontos legais.",
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
                title="Calculadora de Décimo Terceiro (13º Salário) - Simulação 2025"
                description="Antecipe seu planejamento financeiro. Simule o valor exato da 1ª e 2ª parcela do seu 13º salário com todos os descontos legais."
                canonical="/calculadoras/decimo-terceiro"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": THIRTEENTH_FAQS.map(faq => ({
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
                        { label: 'Décimo Terceiro', href: '/calculadoras/decimo-terceiro' }
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
                            <span className="text-sm text-gray-300">Direitos Trabalhistas</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Décimo Terceiro</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Antecipe seu planejamento financeiro. Simule o valor exato da 1ª e 2ª parcela do seu 13º salário com todos os descontos legais.
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
                                Dados para Cálculo
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
                                    <label htmlFor="months" className="block text-sm text-gray-400 mb-2">Meses Trabalhados no Ano</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <select
                                            id="months"
                                            value={monthsWorked}
                                            onChange={(e) => setMonthsWorked(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                                        >
                                            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                                <option key={m} value={m}>{m} meses</option>
                                            ))}
                                        </select>
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
                                    <label htmlFor="averages" className="block text-sm text-gray-400 mb-2">Média de Adicionais (R$)</label>
                                    <div className="relative">
                                        <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="averages"
                                            type="number"
                                            placeholder="Horas extras, comissões..."
                                            value={averages || ''}
                                            onChange={(e) => setAverages(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculateThirteenth}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Calcular 13º
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSalary(0);
                                            setMonthsWorked(12);
                                            setDependents(0);
                                            setAverages(0);
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
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Valor Total a Receber</h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {formatCurrency(result.firstInstallment + result.secondInstallment)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Soma das duas parcelas líquidas
                                            </p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-emerald-400 font-bold">1ª Parcela (Adiantamento)</span>
                                                    <span className="text-xs text-gray-400">Até 30 de Novembro</span>
                                                </div>
                                                <span className="text-white font-bold text-xl">{formatCurrency(result.firstInstallment)}</span>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">2ª Parcela (Líquida)</span>
                                                    <span className="text-xs text-gray-500">Até 20 de Dezembro</span>
                                                </div>
                                                <span className="text-white font-bold text-xl">{formatCurrency(result.secondInstallment)}</span>
                                            </div>

                                            <div className="border-t border-white/10 my-2 pt-4 space-y-2">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-400">Total Bruto (13º Integral)</span>
                                                    <span className="text-gray-300">{formatCurrency(result.totalThirteenth)}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-400">Desconto INSS</span>
                                                    <span className="text-red-400">- {formatCurrency(result.inss)}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-400">Desconto IRRF</span>
                                                    <span className="text-red-400">- {formatCurrency(result.irrf)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Coins className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para simular seu 13º salário</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg"
                >
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Entenda o Pagamento do 13º Salário</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Conhecido como Gratificação de Natal, o Décimo Terceiro Salário é um direito garantido pela CLT que injeta um salário extra na economia ao final do ano. O pagamento é feito em duas etapas, e entender a diferença entre elas é crucial para não se frustrar com o valor líquido final.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white mb-3 text-primary">1ª Parcela (Adiantamento)</h3>
                                    <p className="text-sm mb-2"><strong>Prazo:</strong> Até 30 de novembro.</p>
                                    <p className="text-sm"><strong>Valor:</strong> É a melhor parte! Corresponde a exatamente 50% do salário bruto do mês anterior, sem nenhum desconto. O dinheiro entra "cheio" na conta.</p>
                                </div>
                                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white mb-3 text-primary">2ª Parcela (Acerto)</h3>
                                    <p className="text-sm mb-2"><strong>Prazo:</strong> Até 20 de dezembro.</p>
                                    <p className="text-sm"><strong>Valor:</strong> Aqui acontece o acerto de contas. Calcula-se o 13º integral, descontam-se o INSS e o IRRF (sobre o valor total) e subtrai-se o valor já pago na 1ª parcela. Por isso, essa parcela é sempre menor que a primeira.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como o valor é calculado?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">O cálculo base considera o seu salário dividido por 12 meses. Você recebe 1/12 avos para cada mês em que trabalhou pelo menos 15 dias.</p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span><strong>Salário Integral:</strong> Se trabalhou o ano todo (janeiro a dezembro), recebe um salário extra completo.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span><strong>Salário Proporcional:</strong> Se foi contratado no meio do ano, recebe proporcionalmente aos meses trabalhados.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span>
                                    <span><strong>Médias:</strong> Se você recebe horas extras, comissões ou adicional noturno, é feita uma média desses valores que é somada ao salário fixo.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-16">
                        <h3 className="text-xl font-bold text-white mb-2">⚠️ Atenção aos Descontos!</h3>
                        <p className="text-gray-300">
                            Muitas pessoas se esquecem que o desconto do INSS e do Imposto de Renda incide sobre o valor total do 13º, mas é cobrado de uma vez só na segunda parcela. Isso faz com que o depósito de dezembro seja significativamente menor que o de novembro. Use nossa calculadora para se preparar e não contar com um dinheiro que não virá!
                        </p>
                    </div>

                    <FAQ
                        items={THIRTEENTH_FAQS}
                        title="Perguntas Frequentes sobre 13º"
                        className="py-12"
                        showSocialProof={false}
                    />
                </motion.div>

                {/* App Promo Banner */}
                <AppPromoBanner />
            </div>
        </section>
    );
};
