import React, { useState, useEffect } from 'react';
import { Divide, Calculator, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const RULE_OF_THREE_FAQS: FAQItem[] = [
    {
        question: "Quando usar a Regra de Três Simples?",
        answer: "Use quando você tem três números e quer descobrir o quarto. Exemplo: Se 2kg custam R$10, quanto custam 5kg?"
    },
    {
        question: "O que é grandeza diretamente proporcional?",
        answer: "Quando uma aumenta, a outra também aumenta. Exemplo: Quanto mais gasolina, mais longe o carro vai."
    },
    {
        question: "O que é grandeza inversamente proporcional?",
        answer: "Quando uma aumenta, a outra diminui. Exemplo: Quanto mais velocidade, menos tempo leva a viagem."
    }
];

export function RuleOfThreePage() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const [inverse, setInverse] = useState(false);

    const calculate = () => {
        const valA = parseFloat(a.replace(',', '.'));
        const valB = parseFloat(b.replace(',', '.'));
        const valC = parseFloat(c.replace(',', '.'));

        if (isNaN(valA) || isNaN(valB) || isNaN(valC) || valA === 0) {
            setResult(null);
            return;
        }

        if (inverse) {
            // Inverse: A * B = C * X  => X = (A * B) / C
            // Actually usually presented as: A -> B, C -> X.
            // Inverse: A * B = C * X? No.
            // Inverse: A is to B as C is to X (inverse).
            // If A takes B time, C takes X time. More workers (A->C), less time (B->X).
            // A * B = C * X => X = (A * B) / C.
            // Wait, standard rule of three layout:
            // A --- B
            // C --- X
            // Direct: A/C = B/X => X = (B*C)/A
            // Inverse: A*B = C*X => X = (A*B)/C
            setResult((valA * valB) / valC);
        } else {
            // Direct: (B * C) / A
            setResult((valB * valC) / valA);
        }
    };

    useEffect(() => {
        calculate();
    }, [a, b, c, inverse]);

    const handleInput = (value: string, setter: (value: string) => void) => {
        if (/^[\d.,]*$/.test(value)) {
            setter(value);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Regra de Três",
        "description": "Resolva problemas de proporção direta e inversa com nossa calculadora de Regra de Três.",
        "applicationCategory": "EducationalApplication",
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
                title="Calculadora de Regra de Três Simples - Direta e Inversa"
                description="Resolva problemas de matemática e proporção em segundos. Calcule regra de três simples, direta ou inversamente proporcional."
                canonical="/calculadoras/regra-de-tres"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": RULE_OF_THREE_FAQS.map(faq => ({
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
                        { label: 'Regra de Três', href: '/calculadoras/regra-de-tres' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Divide className="w-4 h-4 text-cyan-500" />
                            <span className="text-sm text-gray-300">Matemática e Saúde</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Regra de Três</span>
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
                                    <Calculator className="w-5 h-5 text-cyan-500" />
                                    Calcular
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm ${!inverse ? 'text-cyan-400 font-bold' : 'text-gray-500'}`}>Direta</span>
                                    <button
                                        onClick={() => setInverse(!inverse)}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors ${inverse ? 'bg-cyan-500' : 'bg-white/10'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${inverse ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </button>
                                    <span className={`text-sm ${inverse ? 'text-cyan-400 font-bold' : 'text-gray-500'}`}>Inversa</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-8">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold">A</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={a}
                                            onChange={(e) => handleInput(e.target.value, setA)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-xl font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="text-center text-gray-500 text-sm">está para</div>
                                    <div className="relative">
                                        <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold">C</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={c}
                                            onChange={(e) => handleInput(e.target.value, setC)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-xl font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="h-full w-px bg-white/10 mx-auto" />

                                <div className="space-y-4">
                                    <div className="relative">
                                        <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold">B</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={b}
                                            onChange={(e) => handleInput(e.target.value, setB)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-xl font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="text-center text-gray-500 text-sm">assim como</div>
                                    <div className="relative">
                                        <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold">X</span>
                                        <div className="w-full bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-4 px-4 text-center text-xl font-bold text-cyan-400">
                                            {result !== null ? result.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) : '?'}
                                        </div>
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
                                <HelpCircle className="w-5 h-5 text-cyan-500" />
                                Exemplos Práticos
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Proporção Direta</strong>
                                    Se 10 litros de gasolina custam R$50 (A e B), quanto custam 25 litros (C)? O resultado é X.
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Proporção Inversa</strong>
                                    Se 2 pedreiros (A) levam 10 dias (B) para fazer um muro, quanto tempo levariam 5 pedreiros (C)? O resultado é X (menos tempo).
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        A ferramenta matemática mais útil do dia a dia. Resolva proporções diretas e inversas instantaneamente.
                    </p>
                </div>

                <FAQ
                    items={RULE_OF_THREE_FAQS}
                    title="Dúvidas sobre Regra de Três"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
