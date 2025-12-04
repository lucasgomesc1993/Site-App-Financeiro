import React, { useState, useEffect } from 'react';
import { Percent, HelpCircle, Lightbulb, TrendingUp, PieChart, Calculator, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

type CalculationMode = 'percentageOf' | 'percentageChange' | 'percentageRepresentation';

const PERCENTAGE_FAQS: FAQItem[] = [
    {
        question: "Como calcular 30% de um valor?",
        answer: "Multiplique o valor por 0,30. Exemplo: 30% de 100 = 100 x 0,30 = 30."
    },
    {
        question: "Como calcular um aumento de 10%?",
        answer: "Multiplique o valor original por 1,10. Exemplo: 100 + 10% = 100 x 1,10 = 110."
    },
    {
        question: "Como calcular um desconto de 20%?",
        answer: "Multiplique o valor original por 0,80 (que é 100% - 20%). Exemplo: 100 - 20% = 100 x 0,80 = 80."
    }
];

export function PercentageCalculatorPage() {
    const [mode, setMode] = useState<CalculationMode>('percentageOf');

    // State for inputs
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const v1 = parseFloat(val1.replace(',', '.'));
        const v2 = parseFloat(val2.replace(',', '.'));

        if (isNaN(v1) || isNaN(v2)) {
            setResult(null);
            return;
        }

        let res: number;

        switch (mode) {
            case 'percentageOf':
                // X% of Y => (X / 100) * Y
                res = (v1 / 100) * v2;
                break;
            case 'percentageChange':
                // Change from A to B => ((B - A) / A) * 100
                if (v1 === 0) {
                    setResult(null);
                    return;
                }
                res = ((v2 - v1) / v1) * 100;
                break;
            case 'percentageRepresentation':
                // X is what % of Y => (X / Y) * 100
                if (v2 === 0) {
                    setResult(null);
                    return;
                }
                res = (v1 / v2) * 100;
                break;
        }

        setResult(res);
    };

    useEffect(() => {
        calculate();
    }, [val1, val2, mode]);

    const handleInput = (value: string, setter: (value: string) => void) => {
        if (/^[\d.,-]*$/.test(value)) {
            setter(value);
        }
    };

    const getModeTitle = () => {
        switch (mode) {
            case 'percentageOf': return 'Quanto é X% de Y?';
            case 'percentageChange': return 'Qual foi o aumento percentual?';
            case 'percentageRepresentation': return 'X representa quantos % de Y?';
        }
    };

    const getModeDescription = () => {
        switch (mode) {
            case 'percentageOf': return 'Descubra o valor correspondente a uma porcentagem.';
            case 'percentageChange': return 'Calcule a variação (aumento ou queda) entre dois valores.';
            case 'percentageRepresentation': return 'Descubra qual a proporção de um valor em relação ao total.';
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Porcentagem",
        "description": "Calcule porcentagens, descontos e aumentos.",
        "applicationCategory": "UtilityApplication",
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
                title="Calculadora de Porcentagem - Descontos e Aumentos Online"
                description="Quanto é X% de Y? Qual foi o aumento percentual? Calcule descontos, lucros e variações com nossa calculadora de porcentagem gratuita."
                canonical="/calculadoras/porcentagem"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": PERCENTAGE_FAQS.map(faq => ({
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
                        { label: 'Calculadora de Porcentagem', href: '/calculadoras/porcentagem' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Percent className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Matemática Financeira</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Porcentagem</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Chega de dúvidas na hora da conta. Calcule descontos, aumentos e proporções de forma simples e rápida.
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
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <div className="flex flex-wrap gap-2 mb-6">
                                <button
                                    onClick={() => { setMode('percentageOf'); setVal1(''); setVal2(''); setResult(null); }}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${mode === 'percentageOf' ? 'bg-primary text-black shadow-lg' : 'bg-[#0a0a0a] text-gray-400 hover:text-white border border-white/10'}`}
                                >
                                    <Calculator className="w-4 h-4" />
                                    % de Valor
                                </button>
                                <button
                                    onClick={() => { setMode('percentageChange'); setVal1(''); setVal2(''); setResult(null); }}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${mode === 'percentageChange' ? 'bg-primary text-black shadow-lg' : 'bg-[#0a0a0a] text-gray-400 hover:text-white border border-white/10'}`}
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    Variação
                                </button>
                                <button
                                    onClick={() => { setMode('percentageRepresentation'); setVal1(''); setVal2(''); setResult(null); }}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${mode === 'percentageRepresentation' ? 'bg-primary text-black shadow-lg' : 'bg-[#0a0a0a] text-gray-400 hover:text-white border border-white/10'}`}
                                >
                                    <PieChart className="w-4 h-4" />
                                    Representação
                                </button>
                            </div>

                            <h2 className="text-xl font-semibold mb-2 text-white">{getModeTitle()}</h2>
                            <p className="text-sm text-gray-400 mb-6">{getModeDescription()}</p>

                            <div className="space-y-4">
                                {mode === 'percentageOf' && (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400 font-medium">Quanto é</span>
                                            <div className="relative flex-1">
                                                <input
                                                    type="text"
                                                    value={val1}
                                                    onChange={(e) => handleInput(e.target.value, setVal1)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                                    placeholder="20"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400 font-medium">de</span>
                                            <div className="relative flex-1">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                                <input
                                                    type="text"
                                                    value={val2}
                                                    onChange={(e) => handleInput(e.target.value, setVal2)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 pl-10 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                                    placeholder="500,00"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {mode === 'percentageChange' && (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400 font-medium w-24">Valor Inicial</span>
                                            <div className="relative flex-1">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                                <input
                                                    type="text"
                                                    value={val1}
                                                    onChange={(e) => handleInput(e.target.value, setVal1)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 pl-10 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                                    placeholder="2000,00"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400 font-medium w-24">Valor Final</span>
                                            <div className="relative flex-1">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                                <input
                                                    type="text"
                                                    value={val2}
                                                    onChange={(e) => handleInput(e.target.value, setVal2)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 pl-10 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                                    placeholder="2500,00"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {mode === 'percentageRepresentation' && (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400 font-medium">O valor</span>
                                            <div className="relative flex-1">
                                                <input
                                                    type="text"
                                                    value={val1}
                                                    onChange={(e) => handleInput(e.target.value, setVal1)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                                    placeholder="600"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400 font-medium">representa quantos % de</span>
                                            <div className="relative flex-1">
                                                <input
                                                    type="text"
                                                    value={val2}
                                                    onChange={(e) => handleInput(e.target.value, setVal2)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                                    placeholder="3000"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="mt-8 pt-6 border-t border-white/5">
                                    <p className="text-center text-gray-400 mb-2">Resultado</p>
                                    <div className="text-4xl font-bold text-center text-primary">
                                        {result !== null ? (
                                            mode === 'percentageOf'
                                                ? result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                                : `${result > 0 && mode === 'percentageChange' ? '+' : ''}${result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
                                        ) : '---'}
                                    </div>
                                    {result !== null && mode === 'percentageChange' && (
                                        <p className={`text-center text-sm mt-2 font-medium ${result > 0 ? 'text-green-400' : result < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                            {result > 0 ? 'Aumento' : result < 0 ? 'Queda' : 'Sem variação'}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {result !== null && (
                                <div className="mt-6 p-4 bg-[#0a0a0a] rounded-xl border border-white/5 text-sm text-gray-400">
                                    <p className="mb-2 font-semibold text-white">Cálculo realizado:</p>
                                    {mode === 'percentageOf' && (
                                        <p>({val1} ÷ 100) × {val2} = <span className="text-primary font-bold">{result.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</span></p>
                                    )}
                                    {mode === 'percentageChange' && (
                                        <p>(({val2} - {val1}) ÷ {val1}) × 100 = <span className="text-primary font-bold">{result.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%</span></p>
                                    )}
                                    {mode === 'percentageRepresentation' && (
                                        <p>({val1} ÷ {val2}) × 100 = <span className="text-primary font-bold">{result.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%</span></p>
                                    )}
                                </div>
                            )}
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
                                <HelpCircle className="w-5 h-5 text-primary" />
                                Entenda as Fórmulas
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm">
                                <div>
                                    <strong className="text-white block mb-1">1. Quanto é X% de Y?</strong>
                                    <p>Clássico cálculo de "parte de um todo". Multiplique a porcentagem pelo valor e divida por 100.</p>
                                </div>
                                <div className="border-t border-white/5 pt-4">
                                    <strong className="text-white block mb-1">2. Aumento/Queda Percentual</strong>
                                    <p>Descobre a variação entre dois valores. Subtraia o final pelo inicial, divida pelo inicial e multiplique por 100.</p>
                                </div>
                                <div className="border-t border-white/5 pt-4">
                                    <strong className="text-white block mb-1">3. Representação Percentual</strong>
                                    <p>Quanto um valor representa do total. Divida a parte pelo todo e multiplique por 100.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 p-6 rounded-3xl border border-blue-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                <Lightbulb className="w-5 h-5" />
                                Dica de Compras
                            </h3>
                            <p className="text-sm text-gray-300">
                                Vai comprar com desconto à vista? Use o "Fator de Multiplicação". Se o desconto é 15%, você paga 85%. Multiplique o preço por 0,85 para saber o valor final na hora.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Exemplos Práticos</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="font-semibold text-white mb-2">Desconto</h3>
                                <p className="text-sm text-gray-400">
                                    20% de R$ 500,00<br />
                                    (20 ÷ 100) × 500 = <strong className="text-primary">R$ 100,00</strong>
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="font-semibold text-white mb-2">Aumento Salarial</h3>
                                <p className="text-sm text-gray-400">
                                    De R$ 2.000 para R$ 2.500<br />
                                    (500 ÷ 2.000) × 100 = <strong className="text-primary">25%</strong>
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="font-semibold text-white mb-2">Orçamento</h3>
                                <p className="text-sm text-gray-400">
                                    Gasto de 600 em ganho de 3.000<br />
                                    (600 ÷ 3.000) × 100 = <strong className="text-primary">20%</strong>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <FAQ
                    items={PERCENTAGE_FAQS}
                    title="Dúvidas Frequentes sobre Porcentagem"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
