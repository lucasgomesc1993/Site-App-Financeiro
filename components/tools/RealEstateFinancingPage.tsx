import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Home, Calendar, Percent, AlertCircle, CheckCircle2, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const REAL_ESTATE_FAQS: FAQItem[] = [
    {
        question: "Posso mudar de tabela depois?",
        answer: "É possível fazer a portabilidade de crédito para outro banco e mudar o sistema de amortização, mas o banco original raramente aceita essa troca no mesmo contrato."
    },
    {
        question: "A Tabela Price é realmente fixa?",
        answer: "Cuidado! A parcela da Price é fixa matematicamente, mas no Brasil os contratos têm correção monetária (geralmente pela TR - Taxa Referencial). Se a TR subir, sua parcela \"fixa\" também vai subir um pouco todo mês."
    },
    {
        question: "O que é amortização extraordinária?",
        answer: "É quando você usa um dinheiro extra (FGTS ou 13º) para adiantar pagamentos. Na tabela SAC, esse adiantamento é super poderoso: ele abate direto do saldo devedor e \"mata\" muitos juros futuros."
    },
    {
        question: "Qual banco oferece a melhor taxa?",
        answer: "Isso varia dia a dia. A Caixa Econômica costuma ter as menores taxas, mas bancos privados (Itaú, Bradesco, Santander) podem cobrir a oferta dependendo do seu relacionamento e pontuação de crédito (Score)."
    }
];

export const RealEstateFinancingPage: React.FC = () => {
    const [propertyValue, setPropertyValue] = useState<number>(300000);
    const [downPayment, setDownPayment] = useState<number>(60000);
    const [interestRate, setInterestRate] = useState<number>(9.5); // Annual rate
    const [termYears, setTermYears] = useState<number>(30);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        calculateFinancing();
    }, [propertyValue, downPayment, interestRate, termYears]);

    const calculateFinancing = () => {
        const loanAmount = propertyValue - downPayment;

        if (loanAmount <= 0) {
            setResult(null);
            return;
        }

        const months = termYears * 12;
        const monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;

        // SAC Calculation
        const amortization = loanAmount / months;
        const firstInstallmentSAC = amortization + (loanAmount * monthlyRate);
        const lastInstallmentSAC = amortization + (amortization * monthlyRate); // Approximation for last month

        // Total Interest SAC (Arithmetic Progression Sum)
        // Interest_n = Balance_n * rate
        // Total Interest = Sum of (Balance_i * rate)
        // Balance decreases by amortization each month.
        // Total Interest = (LoanAmount * rate * (months + 1)) / 2
        // Wait, standard formula: Total Interest = Total Payments - Loan Amount
        // Total Payments SAC = Amortization * months + Interest Sum
        // Interest Sum = (First Interest + Last Interest) * months / 2
        // First Interest = LoanAmount * rate
        // Last Interest = Amortization * rate
        const totalInterestSAC = ((loanAmount * monthlyRate) + (amortization * monthlyRate)) * months / 2;
        const totalPaidSAC = loanAmount + totalInterestSAC;


        // Price Calculation
        const installmentPrice = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalPaidPrice = installmentPrice * months;
        const totalInterestPrice = totalPaidPrice - loanAmount;

        setResult({
            sac: {
                firstInstallment: firstInstallmentSAC,
                lastInstallment: lastInstallmentSAC,
                totalPaid: totalPaidSAC,
                totalInterest: totalInterestSAC
            },
            price: {
                installment: installmentPrice,
                totalPaid: totalPaidPrice,
                totalInterest: totalInterestPrice
            },
            loanAmount,
            months
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Financiamento Imobiliário (SAC vs Price)",
        "description": "Compare as tabelas SAC e Price e descubra qual delas faz você pagar menos juros no final.",
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
                title="SAC ou Price? Calculadora de Financiamento Imobiliário e Juros"
                description="Vai comprar imóvel? Simule as parcelas nas tabelas SAC (decrescente) e Price (fixa). Descubra em qual opção você paga menos juros no total."
                canonical="/calculadoras/financiamento-imobiliario"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": REAL_ESTATE_FAQS.map(faq => ({
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
                        { label: 'Financiamento Imobiliário', href: '/calculadoras/financiamento-imobiliario' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Home className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">SAC vs Price</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Financiamento Imobiliário</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Vai financiar a casa própria? Compare as tabelas SAC e Price e descubra qual delas faz você pagar menos juros no final.
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
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-primary" />
                                Dados do Imóvel
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor do Imóvel (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={propertyValue}
                                            onChange={(e) => setPropertyValue(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor da Entrada (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={downPayment}
                                            onChange={(e) => setDownPayment(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Juros (% a.a.)</label>
                                        <div className="relative">
                                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={interestRate}
                                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Prazo (Anos)</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                value={termYears}
                                                onChange={(e) => setTermYears(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6">
                            <div className="flex gap-3">
                                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Dica de Ouro</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        Se a sua renda não aprova o imóvel na SAC (parcela inicial alta), a Tabela Price pode ser a única saída para conseguir a aprovação.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Comparison */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {result ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-8"
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* SAC Card */}
                                            <div className="bg-white/5 rounded-2xl p-6 border-2 border-primary/50 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                                                    RECOMENDADO
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                    <TrendingDown className="w-5 h-5 text-primary" />
                                                    Tabela SAC
                                                </h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-xs text-gray-400 mb-1">Primeira Parcela</p>
                                                        <p className="text-2xl font-bold text-white">{formatCurrency(result.sac.firstInstallment)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400 mb-1">Última Parcela</p>
                                                        <p className="text-xl font-bold text-green-400">{formatCurrency(result.sac.lastInstallment)}</p>
                                                    </div>
                                                    <div className="pt-4 border-t border-white/10">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm text-gray-400">Total Pago</span>
                                                            <span className="text-sm font-bold text-white">{formatCurrency(result.sac.totalPaid)}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-sm text-gray-400">Total Juros</span>
                                                            <span className="text-sm font-bold text-green-400">{formatCurrency(result.sac.totalInterest)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price Card */}
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                    <ArrowRightLeft className="w-5 h-5 text-purple-400" />
                                                    Tabela Price
                                                </h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-xs text-gray-400 mb-1">Parcela (Fixa*)</p>
                                                        <p className="text-2xl font-bold text-white">{formatCurrency(result.price.installment)}</p>
                                                    </div>
                                                    <div className="opacity-0">
                                                        <p className="text-xs text-gray-400 mb-1">Placeholder</p>
                                                        <p className="text-xl font-bold text-transparent">Placeholder</p>
                                                    </div>
                                                    <div className="pt-4 border-t border-white/10">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm text-gray-400">Total Pago</span>
                                                            <span className="text-sm font-bold text-white">{formatCurrency(result.price.totalPaid)}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-sm text-gray-400">Total Juros</span>
                                                            <span className="text-sm font-bold text-red-400">{formatCurrency(result.price.totalInterest)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-black/30 rounded-xl p-6 text-center">
                                            <p className="text-gray-300">
                                                Economia total escolhendo a SAC: <strong className="text-green-400">{formatCurrency(result.price.totalInterest - result.sac.totalInterest)}</strong>
                                            </p>
                                        </div>

                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Home className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para comparar</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Dilema da Casa Própria: SAC ou Price?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Quando você aprova um financiamento habitacional, o gerente do banco faz a famosa pergunta: "Você prefere Tabela SAC ou Tabela Price?".
                            </p>
                            <p className="mb-4">
                                Essa escolha pode representar uma diferença de <strong>dezenas de milhares de reais</strong> no valor total pago pelo seu imóvel. Infelizmente, a maioria das pessoas escolhe olhando apenas para a primeira parcela, sem entender o impacto de longo prazo.
                            </p>
                            <p>
                                Nossa calculadora coloca as duas opções lado a lado para você ver a evolução das parcelas e o saldo devedor ao longo dos anos.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Entenda as Diferenças</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                                <h3 className="text-xl font-bold text-primary mb-4">1. Tabela SAC</h3>
                                <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider">Sistema de Amortização Constante</p>
                                <p className="text-gray-400 mb-4">
                                    É a queridinha dos brasileiros e a mais recomendada para financiamentos longos.
                                </p>
                                <ul className="space-y-3 text-gray-300 text-sm">
                                    <li className="flex gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span><strong>A Parcela:</strong> Começa mais alta e vai diminuindo todo mês.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span><strong>A Lógica:</strong> Você abate o mesmo valor da dívida todo mês.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span><strong>Resultado:</strong> No final, você paga menos juros no total.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                                <h3 className="text-xl font-bold text-purple-400 mb-4">2. Tabela Price</h3>
                                <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider">Sistema Francês de Amortização</p>
                                <p className="text-gray-400 mb-4">
                                    Muito comum em financiamentos de veículos e empréstimos pessoais.
                                </p>
                                <ul className="space-y-3 text-gray-300 text-sm">
                                    <li className="flex gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                        <span><strong>A Parcela:</strong> É fixa (ou quase fixa). Começa menor que na SAC.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                        <span><strong>A Lógica:</strong> No início, você paga muitos juros e amortiza pouco.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                        <span><strong>Resultado:</strong> O saldo devedor cai lentamente. Total pago é maior.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Qual vale mais a pena?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">
                                A resposta matemática é quase sempre a <strong>SAC</strong>, pois o custo total é menor. Porém, a Price tem uma vantagem estratégica:
                            </p>
                            <div className="bg-black/20 p-6 rounded-2xl border-l-4 border-purple-400">
                                <h4 className="font-bold text-white mb-2">O Pulo do Gato</h4>
                                <p className="text-gray-400 text-sm">
                                    Como a parcela inicial da Price é menor (cerca de 20% a 30% mais barata que a primeira da SAC), ela permite que você financie um valor maior com a mesma renda mensal. Se sua renda não aprova o imóvel que você quer na SAC, a Price pode ser a solução.
                                </p>
                            </div>
                        </div>
                    </section>

                    <FAQ
                        items={REAL_ESTATE_FAQS}
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
