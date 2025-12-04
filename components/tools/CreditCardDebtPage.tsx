import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Percent, Calendar, AlertTriangle, TrendingUp, CreditCard, XCircle } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const CREDIT_CARD_FAQS: FAQItem[] = [
    {
        question: "O que acontece se eu não pagar nada da fatura?",
        answer: "Seu cartão é bloqueado, seu nome pode ser incluído nos órgãos de proteção ao crédito (Serasa/SPC) após alguns dias e os juros continuam correndo, acrescidos de multa de 2% e juros de mora de 1% ao mês."
    },
    {
        question: "Posso negociar a dívida do cartão?",
        answer: "Sim, e deve! Muitas vezes, os bancos oferecem descontos de até 90% para quitar dívidas antigas (que já viraram prejuízo para o banco). Porém, para dívidas recentes, a negociação é mais dura. A melhor saída é trocar a dívida cara do cartão por uma dívida barata (empréstimo consignado ou pessoal)."
    },
    {
        question: "O banco pode parcelar minha fatura sem eu pedir?",
        answer: "Sim. Se você pagar o mínimo (ou um valor parcial) por dois meses seguidos, o banco deve, por lei, parcelar o saldo restante em uma linha de crédito com juros \"menores\" que o rotativo (mas ainda altos)."
    },
    {
        question: "Como sair dessa situação?",
        answer: "Pare de usar o cartão imediatamente. Use nossa calculadora para ver o tamanho do buraco. Liste bens que pode vender ou busque renda extra. Tente um empréstimo com juros menores para quitar a fatura total à vista."
    }
];

export const CreditCardDebtPage: React.FC = () => {
    const [invoiceAmount, setInvoiceAmount] = useState<number>(1000);
    const [amountPaid, setAmountPaid] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(15); // Monthly
    const [months, setMonths] = useState<number>(12);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        calculateDebt();
    }, [invoiceAmount, amountPaid, interestRate, months]);

    const calculateDebt = () => {
        const initialDebt = invoiceAmount - amountPaid;

        if (initialDebt <= 0) {
            setResult(null);
            return;
        }

        const monthlyRate = interestRate / 100;

        // Compound Interest Formula: FV = PV * (1 + r)^t
        const finalDebt = initialDebt * Math.pow(1 + monthlyRate, months);
        const totalInterest = finalDebt - initialDebt;

        setResult({
            initialDebt,
            finalDebt,
            totalInterest,
            growthMultiplier: finalDebt / initialDebt
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Dívida de Cartão de Crédito",
        "description": "Simule o crescimento da sua dívida com os juros rotativos do cartão de crédito.",
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
                title="Calculadora de Dívida de Cartão de Crédito - Juros Rotativos"
                description="Pagou o mínimo da fatura? Veja o tamanho do prejuízo. Simule o crescimento da sua dívida com os juros rotativos do cartão de crédito (Efeito Bola de Neve)."
                canonical="/calculadoras/divida-cartao-credito"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CREDIT_CARD_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Dívida de Cartão', href: '/calculadoras/divida-cartao-credito' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <CreditCard className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-gray-300">Alerta de Juros Altos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Dívida de Cartão</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Entrou no rotativo? Simule o "Efeito Bola de Neve" e descubra quanto sua dívida vai crescer se você não quitar o valor total da fatura.
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
                                Simular Dívida
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor Total da Fatura (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={invoiceAmount}
                                            onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-500/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor que você vai pagar (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={amountPaid}
                                            onChange={(e) => setAmountPaid(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-500/50 transition-colors"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Se pagar 0, a dívida será total. Se pagar o mínimo, a dívida será o restante.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Juros Rotativo (% a.m.)</label>
                                        <div className="relative">
                                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={interestRate}
                                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-500/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Projeção (Meses)</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                value={months}
                                                onChange={(e) => setMonths(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-500/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6">
                            <div className="flex gap-3">
                                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Perigo!</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        O cartão de crédito tem os juros mais altos do mercado. Pagar o mínimo é a forma mais rápida de se endividar.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {result ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center">
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Sua Dívida em {months} Meses</h2>
                                            <div className="text-5xl md:text-6xl font-bold text-red-500 mb-4">
                                                {formatCurrency(result.finalDebt)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                A dívida cresceu <strong className="text-white">{result.growthMultiplier.toFixed(1)}x</strong> o valor original.
                                            </p>
                                        </div>

                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <TrendingUp className="w-6 h-6 text-red-400" />
                                                    <h3 className="text-xl font-bold text-white">Juros Acumulados</h3>
                                                </div>
                                            </div>
                                            <div className="text-3xl font-bold text-white mb-2">{formatCurrency(result.totalInterest)}</div>
                                            <p className="text-sm text-gray-400">
                                                Isso é apenas dinheiro jogado fora em juros.
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Dívida Inicial (Hoje)</span>
                                                <span className="text-white font-bold">{formatCurrency(result.initialDebt)}</span>
                                            </div>
                                            <div className="w-full bg-white/5 rounded-full h-1"></div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Dívida Final (Projeção)</span>
                                                <span className="text-red-400 font-bold">{formatCurrency(result.finalDebt)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <CreditCard className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para ver o estrago</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Perigo dos Juros Rotativos</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                O cartão de crédito é o maior vilão do endividamento no Brasil. Isso acontece por causa dos <strong>Juros do Rotativo</strong>, a linha de crédito mais cara do mercado, que é acionada automaticamente quando você paga qualquer valor entre o "Mínimo" e o "Total" da fatura.
                            </p>
                            <p className="mb-4">
                                Com taxas que frequentemente ultrapassam 400% ao ano, uma dívida pequena pode duplicar ou triplicar em questão de meses. Nossa calculadora projeta esse crescimento assustador para te ajudar a tomar a decisão certa: cortar gastos e quitar tudo o quanto antes.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Que é o "Efeito Bola de Neve"?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">
                                É o poder dos juros compostos trabalhando contra você.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white">1</div>
                                    <div>
                                        <h4 className="font-bold text-white">Mês 1</h4>
                                        <p className="text-sm text-gray-400">Você deixa de pagar R$ 1.000.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white">2</div>
                                    <div>
                                        <h4 className="font-bold text-white">Mês 2</h4>
                                        <p className="text-sm text-gray-400">Com juros de 15% a.m., a dívida vira R$ 1.150.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white">3</div>
                                    <div>
                                        <h4 className="font-bold text-white">Mês 3</h4>
                                        <p className="text-sm text-gray-400">Os juros incidem sobre os R$ 1.150. A dívida pula para R$ 1.322.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center font-bold text-red-500">12</div>
                                    <div>
                                        <h4 className="font-bold text-red-400">Mês 12</h4>
                                        <p className="text-sm text-gray-300">Aqueles R$ 1.000 iniciais se transformaram em <strong>R$ 5.350</strong>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">A Armadilha do Pagamento Mínimo</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2">Empréstimo Pessoal</h3>
                                <p className="text-sm text-gray-400">
                                    Juros médios de <strong>2% a 5%</strong> ao mês.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2">Cheque Especial</h3>
                                <p className="text-sm text-gray-400">
                                    Juros médios de <strong>8% a 12%</strong> ao mês.
                                </p>
                            </div>
                            <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20">
                                <h3 className="text-lg font-bold text-red-400 mb-2">Cartão (Rotativo)</h3>
                                <p className="text-sm text-gray-300">
                                    Juros médios de <strong>12% a 18%</strong> ao mês.
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-400 mt-6 text-center">
                            <strong>Conclusão:</strong> Vale mais a pena pegar um empréstimo pessoal (mais barato) para quitar o cartão à vista do que entrar no rotativo.
                        </p>
                    </section>

                    <FAQ
                        items={CREDIT_CARD_FAQS}
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
