import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, Calendar, PiggyBank } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const FGTS_FAQS: FAQItem[] = [
    {
        question: "Quem tem direito ao depósito de FGTS?",
        answer: "Todo trabalhador contratado pelo regime CLT (carteira assinada), trabalhadores rurais, domésticos, temporários, avulsos, safreiros e atletas profissionais."
    },
    {
        question: "Quando posso sacar esse dinheiro?",
        answer: "O FGTS não pode ser sacado a qualquer momento. As principais situações de saque são: Demissão sem justa causa; Aposentadoria; Compra da casa própria; Doenças graves (Câncer, HIV, etc.); Saque-Aniversário (uma parcela por ano); Calamidade pública (enchentes, desastres)."
    },
    {
        question: "O rendimento do FGTS é bom?",
        answer: "Historicamente, o FGTS rendia pouco (3% + TR), perdendo para a inflação. Porém, com a Distribuição de Lucros instituída nos últimos anos, a rentabilidade tem melhorado, muitas vezes superando a Poupança e chegando perto do CDI em alguns anos."
    },
    {
        question: "O Saque-Aniversário interfere no saldo futuro?",
        answer: "Sim! Se você opta pelo Saque-Aniversário, retira uma parte do dinheiro todo ano. Isso diminui o montante que fica rendendo juros, resultando em um saldo futuro menor do que se deixasse o dinheiro quieto."
    },
    {
        question: "Como consultar meu saldo atual?",
        answer: "A calculadora faz uma projeção. Para saber o saldo real que já está lá hoje, você deve baixar o App FGTS oficial da Caixa Econômica Federal ou consultar via Internet Banking da Caixa."
    }
];

export const FGTSPage: React.FC = () => {
    const [salary, setSalary] = useState<number>(0);
    const [currentBalance, setCurrentBalance] = useState<number>(0);
    const [periodMonths, setPeriodMonths] = useState<number>(12);
    const [depositRate, setDepositRate] = useState<number>(0.08); // 8% default
    const [result, setResult] = useState<any>(null);

    const calculateFGTS = () => {
        if (!salary) return;

        // Monthly Deposit
        const monthlyDeposit = salary * depositRate;

        // Monthly Yield Rate (3% p.a. approx)
        // 3% p.a. -> (1 + 0.03)^(1/12) - 1 = 0.002466
        const monthlyYieldRate = 0.002466;

        // Future Value of Current Balance (Single Sum)
        // FV = PV * (1 + r)^n
        const fvBalance = currentBalance * Math.pow(1 + monthlyYieldRate, periodMonths);

        // Future Value of Monthly Deposits (Series)
        // FV = PMT * (((1 + r)^n - 1) / r)
        const fvDeposits = monthlyDeposit * ((Math.pow(1 + monthlyYieldRate, periodMonths) - 1) / monthlyYieldRate);

        const totalFutureBalance = fvBalance + fvDeposits;
        const totalDeposited = currentBalance + (monthlyDeposit * periodMonths);
        const totalYield = totalFutureBalance - totalDeposited;

        setResult({
            monthlyDeposit,
            totalFutureBalance,
            totalDeposited,
            totalYield,
            periodMonths
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de FGTS (Saldo Futuro)",
        "description": "Quer saber quanto dinheiro você terá no Fundo de Garantia daqui a alguns anos? Simule o rendimento do seu FGTS com depósitos mensais e juros.",
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
                title="Calculadora de FGTS - Simule seu Saldo Futuro e Rendimento"
                description="Quanto você terá de FGTS daqui a 5 anos? Use nossa calculadora de projeção de FGTS e descubra o valor acumulado com juros e depósitos mensais."
                canonical="/calculadoras/fgts"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": FGTS_FAQS.map(faq => ({
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
                        { label: 'FGTS', href: '/calculadoras/fgts' }
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
                            <span className="text-sm text-gray-300">Planejamento Financeiro</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">FGTS</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Quer saber quanto dinheiro você terá no Fundo de Garantia daqui a alguns anos? Simule o rendimento do seu FGTS com depósitos mensais e juros.
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
                                Dados da Simulação
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
                                    <label htmlFor="currentBalance" className="block text-sm text-gray-400 mb-2">Saldo Atual no FGTS (Opcional)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="currentBalance"
                                            type="number"
                                            placeholder="Ex: 5000"
                                            value={currentBalance || ''}
                                            onChange={(e) => setCurrentBalance(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="periodMonths" className="block text-sm text-gray-400 mb-2">Período de Projeção (Meses)</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="periodMonths"
                                            type="number"
                                            placeholder="Ex: 60 (5 anos)"
                                            value={periodMonths || ''}
                                            onChange={(e) => setPeriodMonths(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="depositRate" className="block text-sm text-gray-400 mb-2">Tipo de Contrato</label>
                                    <div className="relative">
                                        <select
                                            id="depositRate"
                                            value={depositRate}
                                            onChange={(e) => setDepositRate(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                                        >
                                            <option value={0.08}>Padrão CLT (8%)</option>
                                            <option value={0.02}>Jovem Aprendiz (2%)</option>
                                            <option value={0.112}>Trabalhador Doméstico (11,2%)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculateFGTS}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Projetar Saldo
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSalary(0);
                                            setCurrentBalance(0);
                                            setPeriodMonths(12);
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
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Saldo Futuro Estimado</h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {formatCurrency(result.totalFutureBalance)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Valor acumulado após {result.periodMonths} meses
                                            </p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Depósito Mensal</span>
                                                    <span className="text-xs text-gray-500">Baseado no salário atual</span>
                                                </div>
                                                <span className="text-white font-bold">{formatCurrency(result.monthlyDeposit)}</span>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Total Depositado</span>
                                                    <span className="text-xs text-gray-500">Saldo inicial + Aportes</span>
                                                </div>
                                                <span className="text-white font-bold">{formatCurrency(result.totalDeposited)}</span>
                                            </div>

                                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-emerald-400 font-bold">Rendimento (Juros)</span>
                                                    <span className="text-xs text-gray-400">Lucro do período</span>
                                                </div>
                                                <span className="text-white font-bold text-xl">+{formatCurrency(result.totalYield)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <PiggyBank className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para projetar seu FGTS</p>
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
                        <h2 className="text-3xl font-bold text-white mb-6">Como o seu FGTS cresce?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                O Fundo de Garantia do Tempo de Serviço (FGTS) funciona como uma "poupança forçada" e cumulativa. Todo mês, a empresa deposita uma porcentagem do seu salário em uma conta na Caixa Econômica Federal. Esse dinheiro não fica parado: ele rende juros mensais e recebe distribuição de lucros anual.
                            </p>
                            <p className="mb-4">
                                Nossa calculadora projeta o Saldo Futuro considerando os dois fatores principais de crescimento:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                <li><strong>Os Depósitos Mensais:</strong> O valor que a empresa coloca todo mês.</li>
                                <li><strong>A Rentabilidade:</strong> Os juros compostos que fazem o dinheiro render ao longo do tempo.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Regras de Depósito e Rendimento</h2>
                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">1. Valor do Depósito</h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><strong>Trabalhador Padrão (CLT):</strong> 8% do salário bruto.</li>
                                    <li><strong>Jovem Aprendiz:</strong> 2% do salário.</li>
                                    <li><strong>Trabalhador Doméstico:</strong> 11,2% (8% + 3,2%).</li>
                                </ul>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">2. Rendimento (Juros + TR)</h3>
                                <p className="text-sm text-gray-400 mb-2">O dinheiro na conta do FGTS rende 3% ao ano mais a TR (Taxa Referencial).</p>
                                <p className="text-sm text-gray-400">Além disso, anualmente o governo realiza a Distribuição de Lucros do FGTS.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Passo a Passo do Cálculo</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">A conta manual de juros compostos com aportes mensais é complexa, mas a lógica é esta:</p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span><strong>Aporte Mensal:</strong> Calcula-se 8% do seu Salário Bruto.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span><strong>Acúmulo:</strong> Multiplica-se esse valor pelo número de meses trabalhados.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span>
                                    <span><strong>Juros sobre Saldo:</strong> Todo dia 10, o saldo total da conta recebe a correção monetária (JAM).</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-16">
                        <h3 className="text-xl font-bold text-white mb-2">💡 Dica de Ouro</h3>
                        <p className="text-gray-300">
                            O FGTS não é descontado do seu salário! Ele é uma obrigação do empregador. Se no seu holerite aparecer desconto de FGTS, a empresa está agindo ilegalmente. O único desconto permitido é o de INSS.
                        </p>
                    </div>

                    <FAQ
                        items={FGTS_FAQS}
                        title="Dúvidas Frequentes sobre FGTS"
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
