import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Building2, Users, Briefcase, TrendingUp } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const EMPLOYEE_COST_FAQS: FAQItem[] = [
    {
        question: "Qual a porcentagem média de custo sobre o salário?",
        answer: "Para empresas do Simples Nacional, o custo costuma ser cerca de 37% a 40% acima do salário. Para empresas do Lucro Presumido/Real, esse custo pode saltar para 60% a 80% (ou até mais, dependendo dos benefícios)."
    },
    {
        question: "O Vale-Transporte entra no custo total?",
        answer: "Sim. A lei permite descontar até 6% do salário do funcionário. Se a passagem custar mais que isso, a empresa arca com a diferença, e isso entra no custo."
    },
    {
        question: "Por que provisionar Férias e 13º mensalmente?",
        answer: "Financeiramente, é um erro esperar dezembro chegar para pagar o 13º. O correto é considerar que, a cada mês trabalhado, a empresa já \"deve\" 1/12 desse valor. Nossa calculadora mostra esse custo mensalizado para você precificar corretamente seu produto/serviço."
    },
    {
        question: "Contratar PJ ou CLT?",
        answer: "Financeiramente, o PJ costuma ser mais barato por não ter encargos trabalhistas. Porém, exige cuidado jurídico: se houver subordinação e horário fixo, a justiça pode reconhecer vínculo empregatício e cobrar todos os encargos retroativos com multa."
    }
];

export const EmployeeCostPage: React.FC = () => {
    const [salary, setSalary] = useState<number>(0);
    const [transportVoucher, setTransportVoucher] = useState<number>(0);
    const [mealVoucher, setMealVoucher] = useState<number>(0);
    const [otherBenefits, setOtherBenefits] = useState<number>(0);
    const [taxRegime, setTaxRegime] = useState<'simples' | 'presumido'>('simples');
    const [result, setResult] = useState<any>(null);

    const calculateCost = () => {
        if (!salary) return;

        // 1. Benefits
        // Transport: Company pays what exceeds 6% of salary
        const transportDeduction = salary * 0.06;
        const transportCost = Math.max(0, transportVoucher - transportDeduction);

        const benefitsCost = transportCost + mealVoucher + otherBenefits;

        // 2. Taxes & Charges (Encargos)
        const fgts = salary * 0.08;
        let inssPatronal = 0;
        let systemS = 0; // RAT + Others

        if (taxRegime === 'presumido') {
            inssPatronal = salary * 0.20; // 20%
            systemS = salary * 0.058; // Average estimate ~5.8% to 8% depending on sector. Using 5.8% conservative.
            // Let's use 8% as per copy suggestion "RAT/System S (estimated ~8%)"
            systemS = salary * 0.08;
        }

        const totalTaxes = fgts + inssPatronal + systemS;

        // 3. Provisions (Monthly)
        // Vacation + 1/3: (Salary / 12) * 1.3333
        const vacationProvision = (salary / 12) * 1.3333;
        // 13th Salary: Salary / 12
        const thirteenthProvision = salary / 12;
        // FGTS Fine Provision: 4% of Salary (to cover 40% fine on total balance eventually)
        const fgtsFineProvision = salary * 0.04;

        // Taxes on Provisions (FGTS + INSS Patronal on 13th/Vacation)
        // This is a bit complex, but usually provisions include their own tax burden.
        // For simplicity and standard estimation:
        // We add FGTS (8%) and INSS Patronal (if applicable) on the provisions amount.
        const provisionsBase = vacationProvision + thirteenthProvision;
        const taxesOnProvisions = provisionsBase * (0.08 + (taxRegime === 'presumido' ? 0.28 : 0));
        // Note: 20% INSS + 8% System S = 28%

        const totalProvisions = vacationProvision + thirteenthProvision + fgtsFineProvision + taxesOnProvisions;

        const totalCost = salary + benefitsCost + totalTaxes + totalProvisions;

        setResult({
            salary,
            benefitsCost,
            totalTaxes,
            totalProvisions,
            totalCost,
            details: {
                fgts,
                inssPatronal,
                systemS,
                vacationProvision,
                thirteenthProvision,
                fgtsFineProvision,
                transportCost
            }
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Custo de Funcionário",
        "description": "Vai contratar? Descubra o custo real de um funcionário CLT para o seu bolso (além do salário).",
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
                title="Calculadora de Custo de Funcionário 2025 - Quanto Custa Contratar?"
                description="Simples Nacional ou Lucro Presumido? Descubra o custo total de um funcionário CLT para sua empresa, incluindo impostos, férias, 13º e FGTS."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Custo de Funcionário', href: '/calculadoras/custo-funcionario' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Building2 className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Para Empresas</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Custo de Funcionário</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Vai contratar? Descubra o custo real de um funcionário CLT para o seu bolso (além do salário).
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
                                Dados da Contratação
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-3">Regime Tributário</label>
                                    <div className="grid grid-cols-2 gap-2 p-1 bg-black/30 rounded-xl border border-white/10">
                                        <button
                                            onClick={() => setTaxRegime('simples')}
                                            className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${taxRegime === 'simples'
                                                ? 'bg-primary text-black shadow-lg'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            Simples Nacional
                                        </button>
                                        <button
                                            onClick={() => setTaxRegime('presumido')}
                                            className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${taxRegime === 'presumido'
                                                ? 'bg-primary text-black shadow-lg'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            Lucro Presumido/Real
                                        </button>
                                    </div>
                                </div>

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
                                    <label htmlFor="transport" className="block text-sm text-gray-400 mb-2">Vale-Transporte (Valor Mensal)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="transport"
                                            type="number"
                                            placeholder="Ex: 400"
                                            value={transportVoucher || ''}
                                            onChange={(e) => setTransportVoucher(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="meal" className="block text-sm text-gray-400 mb-2">Vale-Refeição/Alimentação</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="meal"
                                            type="number"
                                            placeholder="Ex: 600"
                                            value={mealVoucher || ''}
                                            onChange={(e) => setMealVoucher(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="other" className="block text-sm text-gray-400 mb-2">Outros Benefícios (Saúde, etc)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="other"
                                            type="number"
                                            placeholder="Ex: 300"
                                            value={otherBenefits || ''}
                                            onChange={(e) => setOtherBenefits(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculateCost}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Calcular Custo
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSalary(0);
                                            setTransportVoucher(0);
                                            setMealVoucher(0);
                                            setOtherBenefits(0);
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
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Custo Total Mensal</h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {formatCurrency(result.totalCost)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {((result.totalCost / result.salary - 1) * 100).toFixed(1)}% acima do salário bruto
                                            </p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 rounded-xl p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-gray-300 font-medium">Salário Bruto</span>
                                                    <span className="text-white font-bold">{formatCurrency(result.salary)}</span>
                                                </div>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-gray-300 font-medium">Encargos Sociais</span>
                                                    <span className="text-red-400 font-bold">{formatCurrency(result.totalTaxes)}</span>
                                                </div>
                                                <div className="text-xs text-gray-500 space-y-1 pl-2 border-l border-white/10">
                                                    <div className="flex justify-between">
                                                        <span>FGTS (8%)</span>
                                                        <span>{formatCurrency(result.details.fgts)}</span>
                                                    </div>
                                                    {result.details.inssPatronal > 0 && (
                                                        <div className="flex justify-between">
                                                            <span>INSS Patronal (20%)</span>
                                                            <span>{formatCurrency(result.details.inssPatronal)}</span>
                                                        </div>
                                                    )}
                                                    {result.details.systemS > 0 && (
                                                        <div className="flex justify-between">
                                                            <span>Sistema S / RAT</span>
                                                            <span>{formatCurrency(result.details.systemS)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-gray-300 font-medium">Provisões Mensais</span>
                                                    <span className="text-yellow-400 font-bold">{formatCurrency(result.totalProvisions)}</span>
                                                </div>
                                                <div className="text-xs text-gray-500 space-y-1 pl-2 border-l border-white/10">
                                                    <div className="flex justify-between">
                                                        <span>Férias + 1/3</span>
                                                        <span>{formatCurrency(result.details.vacationProvision)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>13º Salário</span>
                                                        <span>{formatCurrency(result.details.thirteenthProvision)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Multa FGTS (4%)</span>
                                                        <span>{formatCurrency(result.details.fgtsFineProvision)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-gray-300 font-medium">Benefícios</span>
                                                    <span className="text-blue-400 font-bold">{formatCurrency(result.benefitsCost)}</span>
                                                </div>
                                                <div className="text-xs text-gray-500 space-y-1 pl-2 border-l border-white/10">
                                                    <div className="flex justify-between">
                                                        <span>Vale-Transporte (Custo Empresa)</span>
                                                        <span>{formatCurrency(result.details.transportCost)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Vale-Refeição/Outros</span>
                                                        <span>{formatCurrency(mealVoucher + otherBenefits)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Briefcase className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para calcular o custo total</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Quanto custa um funcionário de verdade?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Muitos empreendedores cometem o erro de olhar apenas para o salário bruto na hora de contratar. A realidade é que, no Brasil, um funcionário CLT pode custar para a empresa quase o dobro do salário registrado em carteira.
                            </p>
                            <p className="mb-4">
                                Nossa calculadora revela os "custos invisíveis" da contratação, considerando impostos, benefícios obrigatórios e as provisões que você precisa guardar todo mês para não ser pego de surpresa.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Que Compõe o Custo?</h2>
                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">1. Salário e Benefícios</h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><strong>Salário Bruto:</strong> O valor contratado.</li>
                                    <li><strong>Vale-Transporte:</strong> A empresa paga o que exceder 6% do salário.</li>
                                    <li><strong>Vale-Refeição:</strong> Valor definido pela empresa.</li>
                                </ul>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">2. Encargos Sociais</h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><strong>FGTS:</strong> 8% do salário bruto.</li>
                                    <li><strong>INSS Patronal:</strong> Até 20% (Lucro Presumido/Real).</li>
                                    <li><strong>Sistema S:</strong> Taxas adicionais (exceto Simples).</li>
                                </ul>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">3. Provisões</h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><strong>Férias + 1/3:</strong> 1/12 + 1/3 por mês.</li>
                                    <li><strong>13º Salário:</strong> 1/12 do salário por mês.</li>
                                    <li><strong>Multa FGTS:</strong> Provisão de 4% mensal.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">A Diferença do Regime Tributário</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">O custo muda drasticamente dependendo do enquadramento da sua empresa:</p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span><strong>Simples Nacional:</strong> Geralmente é mais barato. A maioria das empresas do Anexo I, II e III são isentas do INSS Patronal (os 20%), pagando apenas FGTS e provisões.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span><strong>Lucro Presumido / Real:</strong> O custo é mais alto. Além do FGTS, a empresa paga 20% de INSS Patronal + Alíquotas de Terceiros (Sistema S) e Seguro de Acidente de Trabalho (RAT).</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <FAQ
                        items={EMPLOYEE_COST_FAQS}
                        title="Dúvidas Frequentes sobre Custo de Funcionário"
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
