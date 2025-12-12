import React, { useState, useEffect } from 'react';
import { AlertTriangle, Calculator, Percent, Scale, PiggyBank, FileText, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const INTEREST_FAQS: FAQItem[] = [
    {
        question: "O que configura juros abusivos?",
        answer: "Juridicamente, considera-se abusiva a taxa que excede significativamente a média de mercado divulgada pelo Banco Central para a mesma modalidade de crédito na data do contrato."
    },
    {
        question: "Posso processar o banco?",
        answer: "Sim, é possível entrar com uma Ação Revisional de Juros. Se comprovado o abuso, o juiz pode determinar a redução da taxa e a devolução do valor pago a mais (indébito). Porém, é necessário laudo pericial e advogado."
    },
    {
        question: "Qual a taxa média do mercado?",
        answer: "Varia muito. Em 2024, empréstimos consignados giram em torno de 1,7% a.m., pessoais 4% a 6% a.m., e cartão de crédito rotativo pode passar de 12% a.m. Consulte o site do Banco Central."
    }
];

export function AbusiveInterestPage() {
    const [loanAmount, setLoanAmount] = useState('');
    const [installmentValue, setInstallmentValue] = useState('');
    const [months, setMonths] = useState('');
    const [marketRate, setMarketRate] = useState('3,50'); // Default estimativa

    const [result, setResult] = useState<{
        realRate: number;
        totalPaid: number;
        totalInterest: number;
        isAbusive: boolean;
        excessAmount: number;
    } | null>(null);

    // Newton-Raphson method to find IRR (Internal Rate of Return)
    const calculateIRR = (pv: number, pmt: number, n: number) => {
        let rate = 0.05; // Initial guess 5%
        for (let i = 0; i < 20; i++) {
            const numerator = pmt * (1 - Math.pow(1 + rate, -n)) - pv * rate;
            const denominator = pmt * n * Math.pow(1 + rate, -n - 1) * rate - rate * pv + pv; // Derivative approx logic simplifies to standard finance formulas
            // Simplified derivative for PV = PMT * (1 - (1+r)^-n) / r
            // Let f(r) = PMT * (1 - (1+r)^-n) / r - PV
            const fr = (pmt / rate) * (1 - Math.pow(1 + rate, -n)) - pv;
            const fprime_r = (pmt / rate) * (n * Math.pow(1 + rate, -n - 1)) - (pmt / (rate * rate)) * (1 - Math.pow(1 + rate, -n));

            const newRate = rate - fr / fprime_r;
            if (Math.abs(newRate - rate) < 0.00001) return newRate;
            rate = newRate;
        }
        return rate;
    };

    const calculate = () => {
        const pv = parseFloat(loanAmount.replace(/\./g, '').replace(',', '.') || '0');
        const pmt = parseFloat(installmentValue.replace(/\./g, '').replace(',', '.') || '0');
        const n = parseInt(months);
        const marketRateVal = parseFloat(marketRate.replace(/\./g, '').replace(',', '.') || '0');

        if (pv === 0 || pmt === 0 || isNaN(n) || n === 0) {
            setResult(null);
            return;
        }

        const calculatedRate = calculateIRR(pv, pmt, n);
        const ratePercent = calculatedRate * 100;

        const totalPaid = pmt * n;
        const totalInterest = totalPaid - pv;

        // Critério simples: 50% acima da média de mercado é forte indício de abuso
        // Ou simplesmente acima da taxa informada pelo usuário
        const isAbusive = ratePercent > (marketRateVal * 1.5);

        let excessAmount = 0;
        if (isAbusive) {
            // Calculate what fair payment would be
            const rFair = marketRateVal / 100;
            const pmtFair = (pv * rFair) / (1 - Math.pow(1 + rFair, -n));
            const totalFair = pmtFair * n;
            excessAmount = totalPaid - totalFair;
        }

        setResult({
            realRate: ratePercent,
            totalPaid,
            totalInterest,
            isAbusive,
            excessAmount
        });
    };

    useEffect(() => {
        calculate();
    }, [loanAmount, installmentValue, months, marketRate]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Juros Abusivos",
        "description": "Verifique se a taxa do seu financiamento de veículo ou empréstimo está acima da média de mercado.",
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
                title="Calculadora de Juros Abusivos - Verifique seu Contrato"
                description="Está pagando juros demais? Descubra a taxa real do seu financiamento e saiba se cabe Ação Revisional."
                canonical="/calculadoras/juros-abusivos"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": INTEREST_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Juros Abusivos', href: '/calculadoras/juros-abusivos' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <AlertTriangle className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-300">Dívidas e Financiamentos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Juros Abusivos</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Descubra a taxa real de juros escondida nas parcelas do seu financiamento e veja se você está sendo lesado.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Form */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-purple-500" />
                                    Dados do Contrato
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor Entregue em Mãos (Líquido)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={loanAmount}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setLoanAmount)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="Ex: 10.000,00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Não inclua seguros ou taxas embutidas, apenas o dinheiro que você recebeu.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Valor da Parcela</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={installmentValue}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setInstallmentValue)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Nº de Parcelas</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            value={months}
                                            onChange={(e) => setMonths(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="Ex: 48"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Taxa Média de Mercado (% a.m.)</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={marketRate}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9,.]/g, '');
                                                setMarketRate(val);
                                            }}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            placeholder="Ex: 3,50"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Use a taxa média do Bacen para comparar. Financiamentos de carro ~2%, Pessoal ~4-6%.
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-purple-500/10 p-6 rounded-2xl border border-purple-500/20 text-center">
                                        <span className="text-sm text-purple-400 block mb-2">Sua Taxa Real (CET)</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `${result.realRate.toFixed(2)}% a.m.` : '---'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results / Verdict */}
                    <div className="lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <Scale className="w-5 h-5 text-purple-500" />
                                Análise do Contrato
                            </h3>

                            {result ? (
                                <div className="space-y-6">
                                    <div className={`p-4 rounded-xl border flex items-start gap-3 ${result.isAbusive ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                                        {result.isAbusive ? <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" /> : <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />}
                                        <div>
                                            <h4 className={`text-lg font-bold ${result.isAbusive ? 'text-red-400' : 'text-green-400'}`}>
                                                {result.isAbusive ? 'Indícios de Abusividade' : 'Dentro da Média'}
                                            </h4>
                                            <p className="text-sm text-gray-400 mt-1">
                                                {result.isAbusive
                                                    ? `Sua taxa (${result.realRate.toFixed(2)}%) está muito acima da média informada. Você pode ter direito à revisão.`
                                                    : `Sua taxa (${result.realRate.toFixed(2)}%) parece condizente com o mercado atual.`}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                            <span className="text-gray-400">Valor Total Pago</span>
                                            <span className="text-white font-medium">R$ {result.totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                            <span className="text-gray-400">Total de Juros</span>
                                            <span className="text-red-400 font-medium">+ R$ {result.totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        {result.isAbusive && (
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-gray-300 font-bold">Valor Pago em Excesso (Est.)</span>
                                                <span className="text-purple-400 font-bold text-lg">R$ {result.excessAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    <p>Simule para ver se seus juros são justos.</p>
                                </div>
                            )}

                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 mt-6">
                                <h4 className="text-sm font-bold text-white mb-2">Importante</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Esta calculadora usa o método da Taxa Interna de Retorno (TIR) para descobrir o CET (Custo Efetivo Total) real. Muitas vezes o banco diz cobrar 2%, mas coloca taxas e seguros que fazem o custo real subir para 3% ou mais.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-purple-500/10 p-3 rounded-xl shrink-0">
                            <FileText className="w-6 h-6 text-purple-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            O que fazer se for abusivo?
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">1. Negociação Extrajudicial</h3>
                            <p className="text-gray-400 text-sm">
                                Procure o gerente ou a financeira com os cálculos em mãos. Peça a cópia do contrato e questione o CET. Às vezes, eles preferem dar um desconto na quitação antecipada.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">2. Ação Revisional</h3>
                            <p className="text-gray-400 text-sm">
                                Se a via amigável não funcionar, procure um advogado ou a Defensoria Pública. Juízes costumam considerar abusivo quando a taxa supera em <strong>1,5x a média do mercado</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={INTEREST_FAQS}
                    title="Perguntas Frequentes"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
