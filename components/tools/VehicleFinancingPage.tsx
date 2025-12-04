import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Car, Calendar, Percent, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const VEHICLE_FINANCING_FAQS: FAQItem[] = [
    {
        question: "Qual a diferença entre CDC e Leasing?",
        answer: "O CDC (Crédito Direto ao Consumidor) é o mais comum: o carro fica no seu nome, mas alienado ao banco até a quitação. No Leasing (arrendamento), o carro fica no nome do banco e você paga um \"aluguel\" com opção de compra no final. Hoje, o CDC é mais vantajoso para pessoa física."
    },
    {
        question: "Posso antecipar parcelas para ter desconto?",
        answer: "Sim! Por lei, ao antecipar parcelas (de trás para frente), o banco é obrigado a descontar os juros proporcionais. É uma excelente estratégia para pagar menos por um carro financiado."
    },
    {
        question: "Até quantos anos posso financiar?",
        answer: "Geralmente, carros novos podem ser financiados em até 60 meses (5 anos). Carros usados costumam ter prazos menores (36 ou 48 meses), dependendo do ano de fabricação."
    },
    {
        question: "Compromete quanto da minha renda?",
        answer: "A regra do Banco Central sugere que a parcela não ultrapasse 30% da sua renda mensal bruta. Se passar disso, o financiamento provavelmente será reprovado."
    }
];

export const VehicleFinancingPage: React.FC = () => {
    const [vehicleValue, setVehicleValue] = useState<number>(50000);
    const [downPayment, setDownPayment] = useState<number>(10000);
    const [interestRate, setInterestRate] = useState<number>(1.5);
    const [term, setTerm] = useState<number>(48);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        calculateFinancing();
    }, [vehicleValue, downPayment, interestRate, term]);

    const calculateFinancing = () => {
        const loanAmount = vehicleValue - downPayment;

        if (loanAmount <= 0) {
            setResult(null);
            return;
        }

        const monthlyRate = interestRate / 100;

        // Price Table Formula: PMT = PV * (i * (1 + i)^n) / ((1 + i)^n - 1)
        const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);

        const totalPaid = monthlyPayment * term + downPayment;
        const totalInterest = (monthlyPayment * term) - loanAmount;

        setResult({
            monthlyPayment,
            totalPaid,
            totalInterest,
            loanAmount
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Financiamento de Veículos",
        "description": "Simule o valor das parcelas e descubra os juros reais antes de assinar o contrato.",
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
                title="Calculadora de Financiamento de Veículos - Simule Parcelas de Carro e Moto"
                description="Vai financiar? Simule o valor da parcela do seu carro ou moto nova. Entenda o Custo Efetivo Total (CET) e descubra como pagar menos juros."
                canonical="/calculadoras/financiamento-veiculos"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": VEHICLE_FINANCING_FAQS.map(faq => ({
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
                        { label: 'Financiamento de Veículos', href: '/calculadoras/financiamento-veiculos' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Car className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Simulador de Crédito</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Financiamento de Veículos</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Sonhando com o carro ou moto nova? Simule o valor das parcelas e descubra os juros reais antes de assinar o contrato.
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
                                Dados do Financiamento
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor do Veículo (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={vehicleValue}
                                            onChange={(e) => setVehicleValue(Number(e.target.value))}
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
                                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Dica FinZap</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        Sempre pergunte pelo <strong>CET anual</strong>. É ele que revela o verdadeiro "peso" do financiamento, incluindo taxas e seguros.
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
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Valor da Parcela Mensal</h2>
                                            <div className="text-5xl md:text-6xl font-bold text-primary mb-4">
                                                {formatCurrency(result.monthlyPayment)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Em {term}x de {formatCurrency(result.monthlyPayment)}
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <DollarSign className="w-5 h-5 text-green-400" />
                                                    <h3 className="font-bold text-white">Total a Pagar</h3>
                                                </div>
                                                <span className="text-2xl font-bold text-white">{formatCurrency(result.totalPaid)}</span>
                                                <p className="text-xs text-gray-500 mt-1">Soma de todas as parcelas + entrada</p>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Percent className="w-5 h-5 text-red-400" />
                                                    <h3 className="font-bold text-white">Total de Juros</h3>
                                                </div>
                                                <span className="text-2xl font-bold text-white">{formatCurrency(result.totalInterest)}</span>
                                                <p className="text-xs text-gray-500 mt-1">Custo do dinheiro emprestado</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Valor Financiado</span>
                                                <span className="text-white font-bold">{formatCurrency(result.loanAmount)}</span>
                                            </div>
                                            <div className="w-full bg-white/5 rounded-full h-1"></div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Valor Final do Veículo</span>
                                                <span className="text-white font-bold">{formatCurrency(result.totalPaid)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Car className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para simular</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Peso dos Juros no Sonho do Carro Próprio</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Comprar um veículo à vista é para poucos. A grande maioria dos brasileiros recorre ao financiamento (CDC) para realizar esse sonho. O problema é que, na empolgação, muitos olham apenas se "a parcela cabe no bolso" e esquecem de calcular o valor final pago.
                            </p>
                            <p className="mb-4">
                                Nossa calculadora simula o cenário real do financiamento, mostrando quanto você pagará de juros ao longo dos anos. Muitas vezes, ao financiar um carro em 60 meses sem entrada, você acaba pagando o preço de dois veículos.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Inimigo Invisível: O que é CET?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">
                                Ao ver um anúncio de taxa de "0,99% ao mês", não se iluda. Esse não é o custo real. O que você paga de verdade se chama CET (Custo Efetivo Total). Ele é a soma de:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex gap-2 items-start">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span><strong>Juros Nominais:</strong> A taxa anunciada pelo banco.</span>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span><strong>IOF:</strong> Imposto sobre Operações Financeiras (cobrado na hora).</span>
                                    </li>
                                </ul>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex gap-2 items-start">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span><strong>Taxas de Cadastro:</strong> Tarifas administrativas de abertura de crédito.</span>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span><strong>Gravame:</strong> Taxa de registro do contrato no Detran.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como aumentar suas chances de aprovação?</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <DollarSign className="w-5 h-5 text-blue-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Valor da Entrada</h3>
                                <p className="text-sm text-gray-400">
                                    Financiar 100% do veículo é muito arriscado para o banco. Tente dar pelo menos 20% a 30% de entrada para derrubar a taxa de juros.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Score de Crédito</h3>
                                <p className="text-sm text-gray-400">
                                    Sua pontuação no Serasa/SPC define sua taxa. Um score acima de 700 garante condições muito melhores do que um score de 400.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                                    <Car className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Idade do Veículo</h3>
                                <p className="text-sm text-gray-400">
                                    Bancos preferem financiar carros mais novos (até 5 ou 10 anos). Carros muito antigos têm juros maiores ou nem são aprovados.
                                </p>
                            </div>
                        </div>
                    </section>

                    <FAQ
                        items={VEHICLE_FINANCING_FAQS}
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
