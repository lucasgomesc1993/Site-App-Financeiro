import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Calendar, Percent, AlertCircle, CheckCircle2, PiggyBank, ArrowDownCircle } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const EARLY_REPAYMENT_FAQS: FAQItem[] = [
    {
        question: "O banco é obrigado a dar o desconto?",
        answer: "Sim! O Artigo 52 do Código de Defesa do Consumidor (CDC) garante a redução proporcional dos juros e demais acréscimos na liquidação antecipada do débito, total ou parcialmente. Se o banco recusar, denuncie ao Procon ou Banco Central."
    },
    {
        question: "Serve para qualquer tipo de dívida?",
        answer: "Funciona para todas as dívidas com juros pré-fixados (onde você sabe a taxa exata no contrato), como Financiamento de Veículos (CDC), Empréstimo Pessoal, Consignado e Crediário de loja."
    },
    {
        question: "Como faço para pagar?",
        answer: "Entre em contato com o banco ou financeira e peça um boleto para \"Amortização de Saldo Devedor\" ou antecipação de parcelas. Muitos apps de banco já permitem gerar esse boleto automaticamente escolhendo as últimas parcelas."
    },
    {
        question: "O que é Amortização?",
        answer: "Amortizar significa \"matar a dívida\". Quando você paga a parcela mensal normal, você paga muitos juros e amortiza pouco. Quando você antecipa, você foca na amortização, reduzindo o principal da dívida muito mais rápido."
    }
];

export const EarlyRepaymentPage: React.FC = () => {
    const [installmentValue, setInstallmentValue] = useState<number>(1000);
    const [interestRate, setInterestRate] = useState<number>(1.5); // Monthly rate
    const [installmentsToAnticipate, setInstallmentsToAnticipate] = useState<number>(1);
    const [monthsUntilLast, setMonthsUntilLast] = useState<number>(48);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        calculateDiscount();
    }, [installmentValue, interestRate, installmentsToAnticipate, monthsUntilLast]);

    const calculateDiscount = () => {
        if (installmentValue <= 0 || installmentsToAnticipate <= 0 || monthsUntilLast <= 0) {
            setResult(null);
            return;
        }

        const monthlyRate = interestRate / 100;
        let totalPresentValue = 0;
        let totalOriginalValue = installmentValue * installmentsToAnticipate;

        // Calculate PV for each installment being anticipated
        // We assume we are anticipating the LAST 'n' installments.
        // The last one is at 'monthsUntilLast'.
        // The one before that is at 'monthsUntilLast - 1', etc.

        for (let i = 0; i < installmentsToAnticipate; i++) {
            const time = monthsUntilLast - i;
            if (time <= 0) continue; // Should not happen if inputs are valid logic

            // PV = FV / (1 + i)^t
            const presentValue = installmentValue / Math.pow(1 + monthlyRate, time);
            totalPresentValue += presentValue;
        }

        const totalDiscount = totalOriginalValue - totalPresentValue;
        const discountPercentage = (totalDiscount / totalOriginalValue) * 100;

        setResult({
            totalPresentValue,
            totalOriginalValue,
            totalDiscount,
            discountPercentage
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Quitação Antecipada",
        "description": "Descubra quanto você economiza de juros ao antecipar as últimas parcelas do seu financiamento ou empréstimo.",
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
                title="Calculadora de Quitação Antecipada - Desconto de Juros"
                description="Quanto economizo se adiantar as parcelas? Simule o desconto de juros ao pagar seu financiamento ou empréstimo de trás para frente."
                canonical="/calculadoras/quitacao-antecipada"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": EARLY_REPAYMENT_FAQS.map(faq => ({
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
                        { label: 'Quitação Antecipada', href: '/calculadoras/quitacao-antecipada' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <PiggyBank className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Economia de Juros</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Quitação Antecipada</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Tem um dinheiro extra? Descubra quanto você economiza de juros ao antecipar as últimas parcelas do seu financiamento ou empréstimo.
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
                                Dados da Parcela
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor da Parcela (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={installmentValue}
                                            onChange={(e) => setInstallmentValue(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Taxa de Juros (% a.m.)</label>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Verifique a taxa no seu contrato (CET mensal).</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Qtd. a Antecipar</label>
                                        <div className="relative">
                                            <ArrowDownCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                value={installmentsToAnticipate}
                                                onChange={(e) => setInstallmentsToAnticipate(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Meses p/ Vencer</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                value={monthsUntilLast}
                                                onChange={(e) => setMonthsUntilLast(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                placeholder="Ex: 48"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">
                                    * "Meses p/ Vencer" refere-se à última parcela que você quer antecipar. Ex: se faltam 48 meses para acabar, coloque 48.
                                </p>
                            </div>
                        </div>

                        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6">
                            <div className="flex gap-3">
                                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Dica FinZap</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        Quanto mais longe estiver o vencimento da parcela (as últimas do carnê), maior será o desconto ao antecipá-la.
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
                                        className="space-y-8"
                                    >
                                        <div className="text-center">
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Valor para Quitar Hoje</h2>
                                            <div className="text-5xl md:text-6xl font-bold text-primary mb-4">
                                                {formatCurrency(result.totalPresentValue)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Ao invés de pagar {formatCurrency(result.totalOriginalValue)}
                                            </p>
                                        </div>

                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <PiggyBank className="w-6 h-6 text-green-400" />
                                                    <h3 className="text-xl font-bold text-white">Sua Economia</h3>
                                                </div>
                                                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                                                    -{result.discountPercentage.toFixed(1)}% OFF
                                                </span>
                                            </div>
                                            <div className="text-3xl font-bold text-white mb-2">{formatCurrency(result.totalDiscount)}</div>
                                            <p className="text-sm text-gray-400">
                                                Esse é o valor de juros que você deixa de pagar ao banco.
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Valor Original (Sem desconto)</span>
                                                <span className="text-white font-bold">{formatCurrency(result.totalOriginalValue)}</span>
                                            </div>
                                            <div className="w-full bg-white/5 rounded-full h-1"></div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Valor com Desconto</span>
                                                <span className="text-white font-bold">{formatCurrency(result.totalPresentValue)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <PiggyBank className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para ver o desconto</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Segredo de "Pagar de Trás para Frente"</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Você já ouviu falar que pagar as últimas parcelas do financiamento sai muito mais barato? Isso é verdade e é um direito seu garantido por lei.
                            </p>
                            <p className="mb-4">
                                Quando você financia um carro, imóvel ou faz um empréstimo, os juros são calculados com base no tempo. Se você devolve o dinheiro ao banco antes do prazo combinado, o banco não pode cobrar os juros referentes a esse período futuro.
                            </p>
                            <p>
                                Nossa calculadora simula esse desconto obrigatório e mostra o "valor presente" daquela parcela que venceria daqui a 5 anos. O resultado costuma chocar: em muitos casos, uma parcela de R$ 1.000,00 pode cair para menos de R$ 400,00 se paga hoje.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como funciona o Desconto Proporcional?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">
                                O cálculo segue a regra do Valor Presente com juros compostos. Basicamente, "trazemos a valor presente" o montante futuro, descontando a taxa de juros do contrato.
                            </p>
                            <h3 className="text-xl font-bold text-white mb-4">Por que o desconto é tão grande?</h3>
                            <p className="text-gray-400 mb-4">
                                Imagine que você tem uma parcela de R$ 500 para pagar daqui a 48 meses (4 anos). Dentro desses R$ 500, uma parte é o valor que você pegou emprestado (amortização) e a outra parte são juros acumulados por 4 anos de espera.
                            </p>
                            <p className="text-gray-400">
                                Ao pagar hoje, você elimina esses 4 anos de espera. Os juros somem, e você paga apenas o "valor puro" da dívida.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Quando vale a pena antecipar?</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <Percent className="w-5 h-5 text-red-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Cenário A</h3>
                                <p className="text-sm text-gray-400">
                                    Seu financiamento de carro cobra <strong>2,5% ao mês</strong> de juros.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <TrendingDown className="w-5 h-5 text-green-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Cenário B</h3>
                                <p className="text-sm text-gray-400">
                                    Seu dinheiro no banco rende <strong>0,8% ao mês</strong>.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Veredito</h3>
                                <p className="text-sm text-gray-400">
                                    Tire o dinheiro do banco e quite a dívida! Você deixa de ganhar 0,8% para economizar 2,5%. É um "lucro" imediato de 1,7% ao mês.
                                </p>
                            </div>
                        </div>
                    </section>

                    <FAQ
                        items={EARLY_REPAYMENT_FAQS}
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

// Missing import fix
import { TrendingDown } from 'lucide-react';
