import React, { useState, useEffect } from 'react';
import { Percent, Calculator, HelpCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const PERCENTAGE_FAQS: FAQItem[] = [
    {
        question: "Como calcular porcentagem de um valor?",
        answer: "Multiplique o valor pela porcentagem e divida por 100. Exemplo: 30% de 200 = (200 * 30) / 100 = 60."
    },
    {
        question: "Como calcular desconto?",
        answer: "Subtraia a porcentagem do valor original. Exemplo: Produto de R$100 com 20% de desconto = R$100 - R$20 = R$80."
    },
    {
        question: "Como calcular aumento?",
        answer: "Some a porcentagem ao valor original. Exemplo: Salário de R$1000 com 10% de aumento = R$1000 + R$100 = R$1100."
    }
];

export function PercentageCalculatorPage() {
    // Mode 1: X% of Y
    const [val1_X, setVal1_X] = useState('');
    const [val1_Y, setVal1_Y] = useState('');
    const [res1, setRes1] = useState<string>('---');

    // Mode 2: X is what % of Y
    const [val2_X, setVal2_X] = useState('');
    const [val2_Y, setVal2_Y] = useState('');
    const [res2, setRes2] = useState<string>('---');

    // Mode 3: Increase/Decrease from X to Y
    const [val3_X, setVal3_X] = useState('');
    const [val3_Y, setVal3_Y] = useState('');
    const [res3, setRes3] = useState<string>('---');

    useEffect(() => {
        // Calc 1
        const x1 = parseFloat(val1_X.replace(',', '.'));
        const y1 = parseFloat(val1_Y.replace(',', '.'));
        if (!isNaN(x1) && !isNaN(y1)) {
            setRes1(((x1 / 100) * y1).toLocaleString('pt-BR', { maximumFractionDigits: 2 }));
        } else {
            setRes1('---');
        }

        // Calc 2
        const x2 = parseFloat(val2_X.replace(',', '.'));
        const y2 = parseFloat(val2_Y.replace(',', '.'));
        if (!isNaN(x2) && !isNaN(y2) && y2 !== 0) {
            setRes2(((x2 / y2) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + '%');
        } else {
            setRes2('---');
        }

        // Calc 3
        const x3 = parseFloat(val3_X.replace(',', '.'));
        const y3 = parseFloat(val3_Y.replace(',', '.'));
        if (!isNaN(x3) && !isNaN(y3) && x3 !== 0) {
            const diff = ((y3 - x3) / x3) * 100;
            const sign = diff > 0 ? '+' : '';
            setRes3(`${sign}${diff.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`);
        } else {
            setRes3('---');
        }

    }, [val1_X, val1_Y, val2_X, val2_Y, val3_X, val3_Y]);

    const handleInput = (value: string, setter: (value: string) => void) => {
        if (/^[\d.,]*$/.test(value)) {
            setter(value);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Porcentagem",
        "description": "Calcule porcentagens, descontos e aumentos de forma simples e rápida.",
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
                title="Calculadora de Porcentagem Online - Descontos e Aumentos"
                description="Precisa calcular 10%, 20% ou 50% de um valor? Use nossa calculadora de porcentagem gratuita para descontos, aumentos e variações."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Porcentagem', href: '/calculadoras/porcentagem' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Percent className="w-4 h-4 text-cyan-500" />
                            <span className="text-sm text-gray-300">Matemática e Saúde</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Porcentagem</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Calcule descontos, aumentos e variações percentuais em segundos.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-24">
                    {/* Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7 space-y-6"
                    >
                        {/* Calc 1 */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h3 className="text-lg font-semibold text-white mb-4">Quanto é...</h3>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="relative flex-1 w-full">
                                    <input
                                        type="text"
                                        value={val1_X}
                                        onChange={(e) => handleInput(e.target.value, setVal1_X)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center"
                                        placeholder="0"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                </div>
                                <span className="text-gray-400">de</span>
                                <div className="relative flex-1 w-full">
                                    <input
                                        type="text"
                                        value={val1_Y}
                                        onChange={(e) => handleInput(e.target.value, setVal1_Y)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center"
                                        placeholder="0"
                                    />
                                </div>
                                <span className="text-gray-400">=</span>
                                <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-3 px-6 text-cyan-400 font-bold min-w-[100px] text-center">
                                    {res1}
                                </div>
                            </div>
                        </div>

                        {/* Calc 2 */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h3 className="text-lg font-semibold text-white mb-4">O valor...</h3>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="relative flex-1 w-full">
                                    <input
                                        type="text"
                                        value={val2_X}
                                        onChange={(e) => handleInput(e.target.value, setVal2_X)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center"
                                        placeholder="0"
                                    />
                                </div>
                                <span className="text-gray-400 text-sm text-center">é qual % de</span>
                                <div className="relative flex-1 w-full">
                                    <input
                                        type="text"
                                        value={val2_Y}
                                        onChange={(e) => handleInput(e.target.value, setVal2_Y)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center"
                                        placeholder="0"
                                    />
                                </div>
                                <span className="text-gray-400">=</span>
                                <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-3 px-6 text-cyan-400 font-bold min-w-[100px] text-center">
                                    {res2}
                                </div>
                            </div>
                        </div>

                        {/* Calc 3 */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h3 className="text-lg font-semibold text-white mb-4">Variação de...</h3>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="relative flex-1 w-full">
                                    <input
                                        type="text"
                                        value={val3_X}
                                        onChange={(e) => handleInput(e.target.value, setVal3_X)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center"
                                        placeholder="Valor Inicial"
                                    />
                                </div>
                                <span className="text-gray-400 text-sm">para</span>
                                <div className="relative flex-1 w-full">
                                    <input
                                        type="text"
                                        value={val3_Y}
                                        onChange={(e) => handleInput(e.target.value, setVal3_Y)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center"
                                        placeholder="Valor Final"
                                    />
                                </div>
                                <span className="text-gray-400">=</span>
                                <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-3 px-6 text-cyan-400 font-bold min-w-[100px] text-center">
                                    {res3}
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
                                <HelpCircle className="w-5 h-5 text-cyan-500" />
                                Exemplos do Dia a Dia
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1 flex items-center gap-2">
                                        <TrendingDown className="w-4 h-4 text-green-400" /> Desconto
                                    </strong>
                                    Uma calça custa R$120 e tem 20% de desconto.
                                    <br />
                                    Cálculo: 120 x 0,20 = R$24 de desconto.
                                    <br />
                                    Preço final: R$96.
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-red-400" /> Aumento
                                    </strong>
                                    Conta de luz de R$150 aumentou 10%.
                                    <br />
                                    Cálculo: 150 x 0,10 = R$15 de aumento.
                                    <br />
                                    Valor final: R$165.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={PERCENTAGE_FAQS}
                    title="Dúvidas sobre Porcentagem"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
