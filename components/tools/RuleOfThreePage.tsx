import React, { useState, useEffect } from 'react';
import { Calculator, Divide, HelpCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

type ProportionType = 'direct' | 'inverse';

const RULE_OF_THREE_FAQS: FAQItem[] = [
    {
        question: "Quando usar Regra de Três Direta?",
        answer: "Use quando as grandezas são proporcionais: se uma aumenta, a outra também aumenta. Exemplo: Se compro mais pão, pago mais caro."
    },
    {
        question: "Quando usar Regra de Três Inversa?",
        answer: "Use quando as grandezas são inversamente proporcionais: se uma aumenta, a outra diminui. Exemplo: Se aumento a velocidade, o tempo de viagem diminui."
    },
    {
        question: "Serve para porcentagem?",
        answer: "Sim! Porcentagem é um caso clássico de regra de três direta. Se R$ 200 é 100%, X é 30%."
    }
];

export function RuleOfThreePage() {
    const [valueA, setValueA] = useState('');
    const [valueB, setValueB] = useState('');
    const [valueC, setValueC] = useState('');
    const [resultX, setResultX] = useState<number | null>(null);
    const [type, setType] = useState<ProportionType>('direct');

    const calculate = () => {
        const a = parseFloat(valueA.replace(',', '.'));
        const b = parseFloat(valueB.replace(',', '.'));
        const c = parseFloat(valueC.replace(',', '.'));

        if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0 || c === 0) {
            setResultX(null);
            return;
        }

        let x: number;
        if (type === 'direct') {
            // A/B = C/X => X = (B * C) / A
            x = (b * c) / a;
        } else {
            // A*B = C*X => X = (A * B) / C
            x = (a * b) / c;
        }

        setResultX(x);
    };

    // Auto-calculate when inputs change
    useEffect(() => {
        calculate();
    }, [valueA, valueB, valueC, type]);

    const handleInput = (value: string, setter: (value: string) => void) => {
        // Allow numbers and one comma/dot
        if (/^[\d.,]*$/.test(value)) {
            setter(value);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Regra de Três",
        "description": "Resolva problemas de proporção direta e inversa.",
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
                description="Matemática sem dor de cabeça. Resolva problemas de proporção, porcentagem e conversões com nossa calculadora de Regra de Três online."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

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
                            <Divide className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Matemática e Educação</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Regra de Três</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Resolva problemas de proporção, porcentagem e conversões em segundos. Simples, direta e inversa.
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
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-primary" />
                                    Calcular
                                </h2>
                                <div className="flex bg-[#0a0a0a] rounded-lg p-1 border border-white/10">
                                    <button
                                        onClick={() => setType('direct')}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${type === 'direct' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Direta
                                    </button>
                                    <button
                                        onClick={() => setType('inverse')}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${type === 'inverse' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Inversa
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                                {/* Row 1 */}
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 block text-center">Valor A</label>
                                    <input
                                        type="text"
                                        value={valueA}
                                        onChange={(e) => handleInput(e.target.value, setValueA)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white text-center focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                        placeholder="A"
                                    />
                                </div>
                                <div className="text-gray-500 font-bold">Está para</div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 block text-center">Valor B</label>
                                    <input
                                        type="text"
                                        value={valueB}
                                        onChange={(e) => handleInput(e.target.value, setValueB)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white text-center focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                        placeholder="B"
                                    />
                                </div>

                                {/* Separator */}
                                <div className="col-span-3 h-px bg-white/10 my-2 relative">
                                    <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#131313] px-2 text-gray-500 text-xs">Assim como</span>
                                </div>

                                {/* Row 2 */}
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 block text-center">Valor C</label>
                                    <input
                                        type="text"
                                        value={valueC}
                                        onChange={(e) => handleInput(e.target.value, setValueC)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white text-center focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                        placeholder="C"
                                    />
                                </div>
                                <div className="text-gray-500 font-bold">Está para</div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 block text-center">Valor X</label>
                                    <div className={`w-full h-[50px] rounded-xl flex items-center justify-center font-bold text-lg border transition-all ${resultX !== null ? 'bg-primary/20 border-primary text-primary' : 'bg-[#0a0a0a] border-white/10 text-gray-600'}`}>
                                        {resultX !== null ? resultX.toLocaleString('pt-BR', { maximumFractionDigits: 4 }) : 'X'}
                                    </div>
                                </div>
                            </div>

                            {resultX !== null && (
                                <div className="mt-6 p-4 bg-[#0a0a0a] rounded-xl border border-white/5 text-sm text-gray-400">
                                    <p className="mb-2 font-semibold text-white">Fórmula usada:</p>
                                    {type === 'direct' ? (
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span>X = (B × C) ÷ A</span>
                                            <span className="text-gray-600">→</span>
                                            <span>({valueB} × {valueC}) ÷ {valueA}</span>
                                            <span className="text-gray-600">=</span>
                                            <span className="text-primary font-bold">{resultX.toLocaleString('pt-BR', { maximumFractionDigits: 4 })}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span>X = (A × B) ÷ C</span>
                                            <span className="text-gray-600">→</span>
                                            <span>({valueA} × {valueB}) ÷ {valueC}</span>
                                            <span className="text-gray-600">=</span>
                                            <span className="text-primary font-bold">{resultX.toLocaleString('pt-BR', { maximumFractionDigits: 4 })}</span>
                                        </div>
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
                                Entenda a Lógica
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm">
                                <div>
                                    <strong className="text-white block mb-1">Proporção Direta (Mais comum)</strong>
                                    <p>Quando um lado aumenta, o outro também aumenta.</p>
                                    <p className="text-xs mt-1 text-gray-500">Ex: Se 1kg custa R$40, 2kg custam R$80.</p>
                                </div>
                                <div className="border-t border-white/5 pt-4">
                                    <strong className="text-white block mb-1">Proporção Inversa</strong>
                                    <p>Quando um lado aumenta, o outro diminui.</p>
                                    <p className="text-xs mt-1 text-gray-500">Ex: Mais velocidade = Menos tempo de viagem.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 p-6 rounded-3xl border border-blue-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                <Lightbulb className="w-5 h-5" />
                                Dica Prática
                            </h3>
                            <p className="text-sm text-gray-300">
                                Na dúvida, faça a pergunta: "Se eu aumentar o primeiro valor, o segundo deve aumentar ou diminuir?". Se aumentar, é Direta. Se diminuir, é Inversa.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Exemplos do Dia a Dia</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="font-semibold text-white mb-2">Porcentagem (Direta)</h3>
                                <p className="text-sm text-gray-400 mb-2">
                                    "Se R$ 200 é 100%, quanto é 30%?"
                                </p>
                                <div className="bg-[#0a0a0a] p-3 rounded-lg text-xs font-mono text-gray-300">
                                    200 --- 100<br />
                                    X --- 30
                                </div>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="font-semibold text-white mb-2">Velocidade (Inversa)</h3>
                                <p className="text-sm text-gray-400 mb-2">
                                    "A 100km/h levo 2h. A 50km/h levo quanto?"
                                </p>
                                <div className="bg-[#0a0a0a] p-3 rounded-lg text-xs font-mono text-gray-300">
                                    100 --- 2<br />
                                    50 --- X
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <FAQ
                    items={RULE_OF_THREE_FAQS}
                    title="Dúvidas Frequentes sobre Regra de Três"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
