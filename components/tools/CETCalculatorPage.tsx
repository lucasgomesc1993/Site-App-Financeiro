import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Percent, Calendar, AlertTriangle, CheckCircle2, Info, FileText } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const CET_FAQS: FAQItem[] = [
    {
        question: "O que é CET (Custo Efetivo Total)?",
        answer: "É a soma de TODOS os custos envolvidos em um empréstimo ou financiamento. Ele inclui não apenas os juros, mas também taxas administrativas, seguros, impostos (IOF) e tarifas de cadastro. É o valor real que você paga."
    },
    {
        question: "Por que a taxa de juros é diferente do CET?",
        answer: "O banco anuncia a taxa de juros nominal para atrair clientes com um número baixo. Porém, ao somar as taxas extras obrigatórias, o custo real sobe. O CET é a verdade nua e crua sobre o quanto o dinheiro custa para você."
    },
    {
        question: "Onde encontro o CET no meu contrato?",
        answer: "Por lei, o CET deve estar destacado na primeira página do contrato de qualquer operação de crédito, expresso em forma de taxa percentual anual e mensal. Se o banco esconder essa informação, denuncie ao Procon ou Banco Central."
    },
    {
        question: "Qual a diferença entre CET Mensal e Anual?",
        answer: "O CET Mensal é o custo aplicado a cada prestação. O CET Anual é a projeção desse custo por 12 meses. Para comparar empréstimos de prazos diferentes, sempre olhe para o CET Anual."
    }
];

export const CETCalculatorPage: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState<number>(10000);
    const [nominalRate, setNominalRate] = useState<number>(1.5); // Monthly
    const [term, setTerm] = useState<number>(12);
    const [extraCosts, setExtraCosts] = useState<number>(500);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        calculateCET();
    }, [loanAmount, nominalRate, term, extraCosts]);

    const calculateCET = () => {
        if (loanAmount <= 0 || term <= 0) {
            setResult(null);
            return;
        }

        const monthlyRate = nominalRate / 100;
        const totalFinanced = loanAmount + extraCosts;

        // Calculate PMT based on Total Financed (Gross)
        const pmt = totalFinanced * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);

        // Calculate CET (IRR)
        // We need to find 'r' such that: LoanAmount (Net) = PMT * (1 - (1+r)^-term) / r
        // Using Newton-Raphson
        let r = monthlyRate; // Initial guess
        for (let i = 0; i < 20; i++) {
            const f = (pmt * (1 - Math.pow(1 + r, -term)) / r) - loanAmount;
            const df = (pmt * (Math.pow(1 + r, -term - 1) * term * r - (1 - Math.pow(1 + r, -term))) / (r * r));

            const newR = r - f / df;
            if (Math.abs(newR - r) < 0.000001) {
                r = newR;
                break;
            }
            r = newR;
        }

        const monthlyCET = r * 100;
        const annualCET = (Math.pow(1 + r, 12) - 1) * 100;

        setResult({
            pmt,
            monthlyCET,
            annualCET,
            totalFinanced
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const formatPercent = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val / 100);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de CET (Custo Efetivo Total)",
        "description": "Descubra o custo real do seu empréstimo somando taxas, seguros e impostos ocultos.",
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
                title="Calculadora de CET (Custo Efetivo Total) - Descubra os Juros Reais"
                description="Não seja enganado pela taxa de juros. Calcule o Custo Efetivo Total (CET) do seu empréstimo e descubra as taxas, seguros e impostos escondidos pelo banco."
                canonical="/calculadoras/custo-efetivo-total"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CET_FAQS.map(faq => ({
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
                        { label: 'Custo Efetivo Total (CET)', href: '/calculadoras/custo-efetivo-total' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <FileText className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Transparência Financeira</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Custo Efetivo Total (CET)</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            A taxa de juros é apenas a ponta do iceberg. Descubra o custo real do seu empréstimo somando taxas, seguros e impostos ocultos.
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
                                Dados do Empréstimo
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor Líquido (O que você recebe)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Custos Extras (Taxas, IOF, Seguros)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={extraCosts}
                                            onChange={(e) => setExtraCosts(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Some todas as tarifas que o banco incluiu no financiamento.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Juros Nominais (% a.m.)</label>
                                        <div className="relative">
                                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={nominalRate}
                                                onChange={(e) => setNominalRate(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Prazo (Meses)</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                value={term}
                                                onChange={(e) => setTerm(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6">
                            <div className="flex gap-3">
                                <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Alerta de Venda Casada</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        Se o CET ficou muito alto, verifique se o banco incluiu seguros ou títulos de capitalização não obrigatórios. Você pode exigir a retirada.
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
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <p className="text-sm text-gray-400 mb-1">Taxa Nominal (Banco)</p>
                                                <div className="text-2xl font-bold text-gray-300">{formatPercent(nominalRate)} a.m.</div>
                                            </div>
                                            <div className="bg-primary/20 rounded-2xl p-6 border border-primary/50">
                                                <p className="text-sm text-primary mb-1 font-bold">CET Final (Real)</p>
                                                <div className="text-3xl font-bold text-white">{formatPercent(result.monthlyCET)} a.m.</div>
                                                <p className="text-xs text-green-300 mt-1">{formatPercent(result.annualCET)} ao ano</p>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400">Valor da Parcela</span>
                                                <span className="text-2xl font-bold text-white">{formatCurrency(result.pmt)}</span>
                                            </div>
                                            <div className="w-full bg-white/5 h-px"></div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">Valor Financiado (Bruto)</span>
                                                <span className="text-white">{formatCurrency(result.totalFinanced)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">Total Pago no Final</span>
                                                <span className="text-white">{formatCurrency(result.pmt * term)}</span>
                                            </div>
                                        </div>

                                        <div className="bg-black/30 rounded-xl p-4 text-center">
                                            <p className="text-gray-400 text-sm">
                                                Você está pagando <strong className="text-red-400">{formatPercent(result.monthlyCET - nominalRate)}</strong> a mais de taxas todo mês além dos juros.
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <FileText className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para revelar o CET</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O que os bancos não te contam sobre os juros</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Você vê um anúncio de empréstimo ou financiamento de carro com taxa de "0,99% ao mês" e acha barato. Mas quando assina o contrato, a parcela fica pesada e o valor final dispara.
                            </p>
                            <p className="mb-4">
                                O culpado tem nome: <strong>Custo Efetivo Total (CET)</strong>.
                            </p>
                            <p>
                                O CET é a única métrica que realmente importa para saber se um empréstimo é barato ou caro. Ele soma os juros do banco com todas as "letras miúdas" do contrato que encarecem a dívida.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">A Composição do CET</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Percent className="w-5 h-5 text-primary" />
                                    Juros Nominais
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    O lucro do banco (a taxa anunciada na propaganda).
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-400" />
                                    Tarifas
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Taxa de Abertura de Crédito (TAC), Taxas Administrativas, Avaliação do Bem e Registro.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-green-400" />
                                    Impostos
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    O IOF (Imposto sobre Operações Financeiras) é cobrado pelo governo em toda operação de crédito.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                                    Seguros
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Seguro Prestamista (cobre a dívida em caso de morte/desemprego) e outros seguros embutidos.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como comparar propostas?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">
                                Nunca compare empréstimos pela taxa de juros nominal ou apenas pelo valor da parcela. Compare sempre pelo <strong>CET Anual</strong>.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20">
                                    <h4 className="font-bold text-red-400 mb-2">Banco A</h4>
                                    <p className="text-sm text-gray-300">Anuncia Juros de 1,5% a.m., mas tem muitas taxas.</p>
                                    <p className="text-lg font-bold text-white mt-2">CET Final: 2,8% a.m.</p>
                                </div>
                                <div className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20">
                                    <h4 className="font-bold text-green-400 mb-2">Banco B</h4>
                                    <p className="text-sm text-gray-300">Anuncia Juros de 1,9% a.m., mas tem poucas taxas.</p>
                                    <p className="text-lg font-bold text-white mt-2">CET Final: 2,1% a.m.</p>
                                </div>
                            </div>
                            <p className="text-gray-400 mt-6 text-sm text-center">
                                Mesmo com a taxa de juros nominal maior, o Banco B é a opção mais barata.
                            </p>
                        </div>
                    </section>

                    <FAQ
                        items={CET_FAQS}
                        title="Perguntas Frequentes sobre CET"
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
