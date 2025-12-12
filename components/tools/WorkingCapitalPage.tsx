import React, { useState, useEffect } from 'react';
import { Wallet, Calculator, HelpCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const WORKING_CAPITAL_FAQS: FAQItem[] = [
    {
        question: "O que é Capital de Giro?",
        answer: "É o dinheiro necessário para manter a empresa funcionando enquanto você não recebe das vendas a prazo. Ele cobre estoques, contas a pagar e custos operacionais."
    },
    {
        question: "Como calcular?",
        answer: "A fórmula básica é: Ativo Circulante (dinheiro em caixa + contas a receber + estoque) - Passivo Circulante (contas a pagar + empréstimos curto prazo)."
    },
    {
        question: "Por que ele é importante?",
        answer: "A falta de capital de giro é a principal causa de falência de pequenas empresas. É ele que garante a saúde financeira nos meses de baixa venda ou atraso de clientes."
    }
];

export function WorkingCapitalPage() {
    const [currentAssets, setCurrentAssets] = useState('');
    const [currentLiabilities, setCurrentLiabilities] = useState('');
    const [result, setResult] = useState<{ workingCapital: number; ratio: number } | null>(null);

    const calculate = () => {
        const assets = parseFloat(currentAssets.replace(/\./g, '').replace(',', '.') || '0');
        const liabilities = parseFloat(currentLiabilities.replace(/\./g, '').replace(',', '.') || '0');

        if (assets === 0 && liabilities === 0) {
            setResult(null);
            return;
        }

        const workingCapital = assets - liabilities;
        const ratio = liabilities > 0 ? assets / liabilities : 0;

        setResult({
            workingCapital,
            ratio
        });
    };

    useEffect(() => {
        calculate();
    }, [currentAssets, currentLiabilities]);

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
        "name": "Calculadora de Capital de Giro",
        "description": "Calcule a necessidade de capital de giro da sua empresa e avalie sua saúde financeira.",
        "applicationCategory": "BusinessApplication",
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
                title="Calculadora de Capital de Giro Líquido"
                description="Sua empresa tem dinheiro para rodar? Calcule o Capital de Giro Líquido e o Índice de Liquidez Corrente."
                canonical="/calculadoras/capital-de-giro"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": WORKING_CAPITAL_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Capital de Giro', href: '/calculadoras/capital-de-giro' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Wallet className="w-4 h-4 text-amber-500" />
                            <span className="text-sm text-gray-300">Empresariais</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-green-500">Capital de Giro</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto hidden">
                            {/* Description moved below calculator */}
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-24">
                    {/* Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 min-h-[600px]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-amber-500" />
                                    Calcular Liquidez
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Ativo Circulante</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={currentAssets}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setCurrentAssets)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="Caixa + Estoque + Recebíveis"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Soma de dinheiro em caixa, bancos, estoques e contas a receber no curto prazo.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Passivo Circulante</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={currentLiabilities}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setCurrentLiabilities)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="Contas a Pagar + Empréstimos"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Soma de fornecedores, impostos, salários e empréstimos a pagar no curto prazo.</p>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4">
                                        <span className="text-sm text-amber-400 block mb-2">Capital de Giro Líquido</span>
                                        <span className={`text-4xl font-bold ${result && result.workingCapital < 0 ? 'text-red-400' : 'text-white'}`}>
                                            {result ? `R$ ${result.workingCapital.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Índice de Liquidez Corrente</span>
                                        <span className={`text-xl font-bold ${result && result.ratio < 1 ? 'text-red-400' : 'text-white'}`}>
                                            {result ? result.ratio.toFixed(2) : '---'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <RefreshCw className="w-5 h-5 text-amber-500" />
                                Interpretação
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <ul className="space-y-2 list-disc pl-4">
                                    <li><strong>Positivo:</strong> Sua empresa tem recursos suficientes para pagar as dívidas de curto prazo.</li>
                                    <li><strong>Negativo:</strong> Alerta vermelho! Você deve mais do que tem disponível no curto prazo.</li>
                                    <li><strong>Liquidez {'>'} 1:</strong> Saudável. Para cada R$ 1 de dívida, você tem mais de R$ 1 de ativo.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Monitore a saúde do seu caixa. Garanta recursos para operar com tranquilidade.
                    </p>
                </div>

                <FAQ
                    items={WORKING_CAPITAL_FAQS}
                    title="Dúvidas sobre Capital de Giro"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
