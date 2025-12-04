import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, PieChart, ShoppingCart, Coffee, PiggyBank, AlertCircle } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const BUDGET_50_30_20_FAQS: FAQItem[] = [
    {
        question: "A regra se aplica ao salário Bruto ou Líquido?",
        answer: "Sempre sobre o Salário Líquido (o que cai na conta). Você só pode dividir o dinheiro que efetivamente tem disponível para gastar. Impostos e descontos na folha não entram nessa conta."
    },
    {
        question: "E se minhas necessidades passarem de 50%?",
        answer: "Isso é muito comum, especialmente com aluguéis caros. Se suas despesas fixas estão em 60% ou 70%, você precisará \"roubar\" temporariamente da categoria de Desejos (30%) para fechar a conta, ou buscar aumentar sua renda."
    },
    {
        question: "Onde entra o pagamento de dívidas?",
        answer: "Dívidas devem ser prioridade. Elas entram na fatia de 20% (Objetivos Financeiros). Se a dívida for muito alta e os juros abusivos, você pode suspender temporariamente os investimentos e usar todo o pote de 20% para quitar o que deve."
    },
    {
        question: "Posso mudar as porcentagens?",
        answer: "Claro! A regra 50-30-20 é um ponto de partida ideal, mas você pode adaptar para 60-20-20 (mais conservador) ou 50-20-30 (mais focado em investir), dependendo da sua realidade e fase de vida."
    }
];

export const Budget503020Page: React.FC = () => {
    const [income, setIncome] = useState<number>(4000);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        calculateBudget();
    }, [income]);

    const calculateBudget = () => {
        const needs = income * 0.5;
        const wants = income * 0.3;
        const savings = income * 0.2;

        setResult({
            needs,
            wants,
            savings
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora da Regra 50-30-20",
        "description": "O método mais simples do mundo para organizar suas finanças. Descubra exatamente quanto gastar com contas, lazer e investimentos.",
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
                title="Calculadora Regra 50-30-20 - Organize seu Orçamento"
                description="Aprenda a dividir seu salário do jeito certo. Calcule quanto gastar com necessidades, desejos e investimentos usando o método 50-30-20."
                canonical="/calculadoras/regra-50-30-20"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": BUDGET_50_30_20_FAQS.map(faq => ({
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
                        { label: 'Regra 50-30-20', href: '/calculadoras/regra-50-30-20' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <PieChart className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Orçamento Pessoal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora da <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Regra 50-30-20</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            O método mais simples do mundo para organizar suas finanças. Descubra exatamente quanto gastar com contas, lazer e investimentos.
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
                                Sua Renda
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Salário Líquido Mensal (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Ex: 4000"
                                            value={income || ''}
                                            onChange={(e) => setIncome(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors text-lg font-bold"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Insira o valor que realmente cai na sua conta (após descontos).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6">
                            <div className="flex gap-3">
                                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Dica de Ouro</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        Se seus gastos fixos (Necessidades) ultrapassarem 50%, o alerta vermelho acende: você precisa reduzir o padrão de vida ou aumentar a renda.
                                    </p>
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
                                        <div className="grid gap-4">
                                            {/* Needs - 50% */}
                                            <div className="bg-white/5 rounded-2xl p-6 border-l-4 border-blue-500">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                                            <ShoppingCart className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-white text-lg">Necessidades (50%)</h3>
                                                            <p className="text-xs text-gray-400">Gastos essenciais para sobrevivência</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-2xl font-bold text-white">{formatCurrency(result.needs)}</span>
                                                </div>
                                                <div className="w-full bg-black/50 rounded-full h-2 mb-2">
                                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                                                </div>
                                                <p className="text-sm text-gray-400">
                                                    Aluguel, condomínio, contas de luz/água, supermercado básico, farmácia e transporte.
                                                </p>
                                            </div>

                                            {/* Wants - 30% */}
                                            <div className="bg-white/5 rounded-2xl p-6 border-l-4 border-purple-500">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                                            <Coffee className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-white text-lg">Desejos (30%)</h3>
                                                            <p className="text-xs text-gray-400">Estilo de vida e diversão</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-2xl font-bold text-white">{formatCurrency(result.wants)}</span>
                                                </div>
                                                <div className="w-full bg-black/50 rounded-full h-2 mb-2">
                                                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                                                </div>
                                                <p className="text-sm text-gray-400">
                                                    Jantar fora, iFood, Netflix, academia, viagens, roupas novas e hobbies.
                                                </p>
                                            </div>

                                            {/* Savings - 20% */}
                                            <div className="bg-white/5 rounded-2xl p-6 border-l-4 border-primary">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                                            <PiggyBank className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-white text-lg">Objetivos (20%)</h3>
                                                            <p className="text-xs text-gray-400">Seu "eu do futuro"</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-2xl font-bold text-white">{formatCurrency(result.savings)}</span>
                                                </div>
                                                <div className="w-full bg-black/50 rounded-full h-2 mb-2">
                                                    <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
                                                </div>
                                                <p className="text-sm text-gray-400">
                                                    Reserva de emergência, investimentos, aposentadoria ou quitação de dívidas.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <PieChart className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Informe sua renda para ver a divisão</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como funciona a Regra 50-30-20?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Criada pela senadora norte-americana e especialista em falências Elizabeth Warren, a regra 50-30-20 é a estratégia de orçamento ideal para quem não gosta de planilhas complexas. A ideia é dividir sua Renda Líquida Mensal em apenas três grandes potes:
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-blue-400">1. Necessidades (50%)</h3>
                                <p className="text-sm text-gray-400">
                                    São os gastos essenciais para sua sobrevivência básica e manutenção do trabalho. Se você perdesse o emprego hoje, essas contas continuariam chegando.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-purple-400">2. Desejos (30%)</h3>
                                <p className="text-sm text-gray-400">
                                    É a categoria do "Estilo de Vida". Tudo aquilo que você quer, mas não necessariamente precisa para sobreviver. É aqui que você aproveita a vida hoje.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">3. Objetivos (20%)</h3>
                                <p className="text-sm text-gray-400">
                                    É o pagamento do seu "eu do futuro". Esse dinheiro deve sumir da sua conta assim que o salário cai.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Exemplo Prático</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">
                                Imagine que você receba um salário líquido de R$ 4.000,00. Veja como ficaria sua divisão ideal:
                            </p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3 items-center">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                                    <span><strong>R$ 2.000 (50%)</strong> vai para pagar as contas fixas da casa e mercado.</span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                                    <span><strong>R$ 1.200 (30%)</strong> é o seu limite para gastar com diversão e estilo de vida no mês.</span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                    <span><strong>R$ 800 (20%)</strong> vai direto para a corretora de investimentos ou poupança.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <FAQ
                        items={BUDGET_50_30_20_FAQS}
                        title="Dúvidas Frequentes"
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
