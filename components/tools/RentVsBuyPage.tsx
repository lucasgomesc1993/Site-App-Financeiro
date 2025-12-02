import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, Home, Key, Building } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const RENT_VS_BUY_FAQS: FAQItem[] = [
    {
        question: "O imóvel sempre valoriza?",
        answer: "Historicamente, imóveis tendem a acompanhar a inflação (INCC) no longo prazo, mas não é garantia. Existem períodos de estagnação ou desvalorização real. Nossa calculadora permite que você simule uma taxa de valorização anual."
    },
    {
        question: "E a segurança de ter onde morar?",
        answer: "A calculadora foca no aspecto financeiro. O valor emocional de \"ter a casa própria\", poder reformar e não ter risco de despejo é subjetivo e deve pesar na sua decisão pessoal, mesmo que a matemática diga o contrário."
    },
    {
        question: "O que é Custo de Oportunidade?",
        answer: "É quanto você deixa de ganhar por ter escolhido um caminho. Ao imobilizar R$ 100 mil na entrada de um apartamento, o custo de oportunidade é o rendimento que esses R$ 100 mil teriam gerado se ficassem aplicados no Tesouro Direto ou CDB."
    },
    {
        question: "Vale a pena quitar o financiamento ou investir?",
        answer: "Geralmente, se a taxa de juros do seu financiamento for maior que o rendimento líquido dos seus investimentos, vale a pena quitar a dívida (amortizar) o quanto antes para parar de pagar juros caros ao banco."
    }
];

export const RentVsBuyPage: React.FC = () => {
    // Inputs
    const [propertyValue, setPropertyValue] = useState<number>(0);
    const [downPayment, setDownPayment] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(10); // Financing rate (yearly)
    const [years, setYears] = useState<number>(30);
    const [rentValue, setRentValue] = useState<number>(0);
    const [investmentRate, setInvestmentRate] = useState<number>(10); // Investment return (yearly)
    const [appreciationRate, setAppreciationRate] = useState<number>(4); // Property appreciation (yearly)

    const [result, setResult] = useState<any>(null);

    const calculateComparison = () => {
        if (!propertyValue || !rentValue) return;

        const months = years * 12;

        // --- SCENARIO A: BUY ---
        const loanAmount = propertyValue - downPayment;

        // Monthly Interest Rate for Loan
        const monthlyInterestRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;

        // Monthly Payment (PMT) - Price Table (Fixed Installment)
        // PMT = PV * [ i * (1+i)^n ] / [ (1+i)^n - 1 ]
        const monthlyPayment = loanAmount * (
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
            (Math.pow(1 + monthlyInterestRate, months) - 1)
        );

        // Final Property Value
        const monthlyAppreciationRate = Math.pow(1 + appreciationRate / 100, 1 / 12) - 1;
        const finalPropertyValue = propertyValue * Math.pow(1 + monthlyAppreciationRate, months);

        // Net Worth (Buy) = Final Property Value (assuming loan is paid off)
        const netWorthBuy = finalPropertyValue;

        // --- SCENARIO B: RENT & INVEST ---
        // Initial Investment = Down Payment
        const monthlyInvestmentRate = Math.pow(1 + investmentRate / 100, 1 / 12) - 1;

        // Future Value of Initial Investment
        const fvInitial = downPayment * Math.pow(1 + monthlyInvestmentRate, months);

        // Monthly Surplus Investment
        // Surplus = Cost of Buying (PMT) - Cost of Renting (Rent)
        // Note: Rent usually increases with inflation. For simplicity, we'll keep it fixed or assume the investment rate is real (above inflation) and rent increase cancels out.
        // To be more precise, we could increase rent annually, but let's stick to the prompt's logic: "Se o aluguel for mais barato que a parcela... investe a diferença".

        const monthlySurplus = monthlyPayment - rentValue;

        let fvSurplus = 0;
        if (monthlySurplus > 0) {
            fvSurplus = monthlySurplus * ((Math.pow(1 + monthlyInvestmentRate, months) - 1) / monthlyInvestmentRate);
        }

        // Net Worth (Rent) = FV Initial + FV Surplus
        const netWorthRent = fvInitial + fvSurplus;

        setResult({
            monthlyPayment,
            finalPropertyValue,
            netWorthBuy,
            netWorthRent,
            monthlySurplus,
            difference: Math.abs(netWorthBuy - netWorthRent),
            winner: netWorthBuy > netWorthRent ? 'buy' : 'rent'
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora: Alugar ou Financiar Imóvel?",
        "description": "Descubra matematicamente se vale mais a pena comprar a casa própria ou morar de aluguel e investir a diferença.",
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
                title="Alugar ou Comprar Imóvel? Simulador e Comparativo Financeiro"
                description="Pare de perder dinheiro. Compare o custo de oportunidade entre financiar um imóvel ou viver de aluguel e investir a diferença com nossa calculadora inteligente."
                canonical="/calculadoras/alugar-ou-financiar"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": RENT_VS_BUY_FAQS.map(faq => ({
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
                        { label: 'Alugar ou Financiar', href: '/calculadoras/alugar-ou-financiar' }
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
                            <span className="text-sm text-gray-300">Imóveis</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Alugar ou <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Financiar?</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            A dúvida de milhões. Descubra matematicamente se vale mais a pena comprar a casa própria ou morar de aluguel e investir a diferença.
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
                                Cenários
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor do Imóvel (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Ex: 500000"
                                            value={propertyValue || ''}
                                            onChange={(e) => setPropertyValue(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Entrada Disponível (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Ex: 100000"
                                            value={downPayment || ''}
                                            onChange={(e) => setDownPayment(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor do Aluguel (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Ex: 2500"
                                            value={rentValue || ''}
                                            onChange={(e) => setRentValue(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Juros Financ. (% a.a.)</label>
                                        <input
                                            type="number"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Rend. Invest. (% a.a.)</label>
                                        <input
                                            type="number"
                                            value={investmentRate}
                                            onChange={(e) => setInvestmentRate(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Valorização Imóvel (% a.a.)</label>
                                        <input
                                            type="number"
                                            value={appreciationRate}
                                            onChange={(e) => setAppreciationRate(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Prazo (Anos)</label>
                                        <input
                                            type="number"
                                            value={years}
                                            onChange={(e) => setYears(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculateComparison}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Comparar
                                    </button>
                                    <button
                                        onClick={() => {
                                            setPropertyValue(0);
                                            setDownPayment(0);
                                            setRentValue(0);
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
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Veredito Matemático</h2>
                                            <div className={`text-4xl md:text-5xl font-bold mb-2 ${result.winner === 'rent' ? 'text-primary' : 'text-blue-400'}`}>
                                                {result.winner === 'rent' ? 'Alugar Venceu' : 'Comprar Venceu'}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Diferença patrimonial de {formatCurrency(result.difference)} em {years} anos
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {/* Buy Scenario */}
                                            <div className={`rounded-xl p-6 border ${result.winner === 'buy' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/5'}`}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Key className={`w-5 h-5 ${result.winner === 'buy' ? 'text-blue-400' : 'text-gray-500'}`} />
                                                    <h3 className="font-bold text-white">Cenário A: Comprar</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <span className="block text-xs text-gray-500">Patrimônio Final (Imóvel)</span>
                                                        <span className="block text-xl font-bold text-white">{formatCurrency(result.netWorthBuy)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-xs text-gray-500">Parcela do Financiamento</span>
                                                        <span className="block text-sm text-gray-300">{formatCurrency(result.monthlyPayment)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Rent Scenario */}
                                            <div className={`rounded-xl p-6 border ${result.winner === 'rent' ? 'bg-primary/10 border-primary/30' : 'bg-white/5 border-white/5'}`}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Building className={`w-5 h-5 ${result.winner === 'rent' ? 'text-primary' : 'text-gray-500'}`} />
                                                    <h3 className="font-bold text-white">Cenário B: Alugar</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <span className="block text-xs text-gray-500">Patrimônio Final (Investimentos)</span>
                                                        <span className="block text-xl font-bold text-white">{formatCurrency(result.netWorthRent)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-xs text-gray-500">Aporte Mensal (Diferença)</span>
                                                        <span className="block text-sm text-gray-300">
                                                            {result.monthlySurplus > 0
                                                                ? formatCurrency(result.monthlySurplus)
                                                                : "Sem aporte (Aluguel > Parcela)"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-400">
                                            <p>
                                                <strong>Análise:</strong> Ao optar por {result.winner === 'rent' ? 'alugar e investir' : 'comprar o imóvel'}, você teria um patrimônio {formatCurrency(result.difference)} maior ao final de {years} anos, considerando as taxas informadas.
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Home className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para comparar os cenários</p>
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
                        <h2 className="text-3xl font-bold text-white mb-6">O Dilema: "Aluguel é dinheiro jogado fora?"</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Crescemos ouvindo que pagar aluguel é rasgar dinheiro e que "quem compra terra não erra". Mas, financeiramente, essa nem sempre é a verdade.
                            </p>
                            <p className="mb-4">
                                Ao financiar um imóvel, você paga juros ao banco que, muitas vezes, somam o valor de dois ou três imóveis ao final de 30 anos. Por outro lado, o dinheiro que você daria de entrada poderia estar rendendo juros compostos em uma aplicação segura.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como funciona a comparação?</h2>
                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-blue-400">Cenário A: O Comprador</h3>
                                <p className="text-sm text-gray-400">Você usa suas economias para dar a entrada, assume uma dívida de longo prazo e paga as parcelas do financiamento. No final, você tem um imóvel (que pode ter valorizado) e zero dívida.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">Cenário B: O Inquilino Investidor</h3>
                                <p className="text-sm text-gray-400">Você pega o dinheiro que daria de entrada e investe. Você paga o aluguel mensalmente. Se o aluguel for mais barato que a parcela do financiamento, você também investe essa diferença todos os meses.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Variáveis Importantes</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span><strong>Taxa de Juros do Financiamento:</strong> Quanto mais altos os juros (Selic alta), mais caro fica financiar, favorecendo o aluguel.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span><strong>Rendimento da Aplicação:</strong> Se você consegue investir bem o dinheiro da entrada (acima da inflação), o aluguel tende a valer mais a pena.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span>
                                    <span><strong>Valorização do Imóvel:</strong> Se o imóvel dobrar de preço rapidamente, a compra se torna vantajosa.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">4</span>
                                    <span><strong>Valor do Aluguel:</strong> A regra de bolso diz que se o aluguel anual custar menos de 4% a 5% do valor do imóvel, compensa alugar.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <FAQ
                        items={RENT_VS_BUY_FAQS}
                        title="Dúvidas Frequentes"
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
