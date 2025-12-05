import React, { useState, useEffect } from 'react';
import { Activity, Calculator, HelpCircle, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const IMC_FAQS: FAQItem[] = [
    {
        question: "O que é IMC?",
        answer: "IMC significa Índice de Massa Corporal. É um cálculo simples que permite avaliar se a pessoa está dentro do peso ideal em relação à altura."
    },
    {
        question: "O IMC é válido para todos?",
        answer: "O IMC é uma referência geral para adultos. Ele pode não ser preciso para atletas (devido à massa muscular), idosos e gestantes."
    },
    {
        question: "Qual o IMC ideal?",
        answer: "Para adultos, o IMC considerado normal está entre 18,5 e 24,9. Abaixo disso é magreza e acima é sobrepeso ou obesidade."
    }
];

export function IMCCalculatorPage() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const [classification, setClassification] = useState('');

    const calculate = () => {
        const w = parseFloat(weight.replace(',', '.'));
        const h = parseFloat(height.replace(',', '.'));

        if (isNaN(w) || isNaN(h) || h === 0) {
            setResult(null);
            setClassification('');
            return;
        }

        // Height usually in cm or meters. Let's assume user might type 175 (cm) or 1.75 (m)
        // If > 3, assume cm and convert to m
        const heightInMeters = h > 3 ? h / 100 : h;

        const imc = w / (heightInMeters * heightInMeters);
        setResult(imc);

        if (imc < 18.5) setClassification('Abaixo do Peso');
        else if (imc < 24.9) setClassification('Peso Normal');
        else if (imc < 29.9) setClassification('Sobrepeso');
        else if (imc < 34.9) setClassification('Obesidade Grau I');
        else if (imc < 39.9) setClassification('Obesidade Grau II');
        else setClassification('Obesidade Grau III');
    };

    useEffect(() => {
        calculate();
    }, [weight, height]);

    const handleInput = (value: string, setter: (value: string) => void) => {
        if (/^[\d.,]*$/.test(value)) {
            setter(value);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de IMC",
        "description": "Calcule seu Índice de Massa Corporal (IMC) e descubra se está no peso ideal.",
        "applicationCategory": "HealthApplication",
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
                title="Calculadora de IMC Online - Índice de Massa Corporal"
                description="Calcule seu IMC grátis e veja se está no peso ideal. Ferramenta simples e rápida para acompanhar sua saúde."
                canonical="/calculadoras/imc"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": IMC_FAQS.map(faq => ({
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
                        { label: 'IMC', href: '/calculadoras/imc' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Activity className="w-4 h-4 text-cyan-500" />
                            <span className="text-sm text-gray-300">Matemática e Saúde</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">IMC</span>
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
                                    Calcular IMC
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Peso (kg)</label>
                                        <input
                                            type="text"
                                            value={weight}
                                            onChange={(e) => handleInput(e.target.value, setWeight)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                                            placeholder="Ex: 70"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Altura (m)</label>
                                        <input
                                            type="text"
                                            value={height}
                                            onChange={(e) => handleInput(e.target.value, setHeight)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                                            placeholder="Ex: 1,75"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 text-center">
                                    <p className="text-gray-400 text-sm mb-2">Seu IMC é</p>
                                    <div className="text-5xl font-bold text-white mb-2">
                                        {result !== null ? result.toFixed(1) : '---'}
                                    </div>
                                    {result !== null && (
                                        <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${classification === 'Peso Normal' ? 'bg-green-500/20 text-green-400' :
                                            classification === 'Abaixo do Peso' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                            {classification}
                                        </div>
                                    )}
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
                                <Heart className="w-5 h-5 text-cyan-500" />
                                Tabela de Referência
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between p-2 rounded bg-white/5">
                                    <span className="text-gray-400">Menor que 18,5</span>
                                    <span className="text-yellow-400 font-medium">Abaixo do peso</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-green-500/10 border border-green-500/20">
                                    <span className="text-gray-300">18,5 a 24,9</span>
                                    <span className="text-green-400 font-bold">Peso normal</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5">
                                    <span className="text-gray-400">25 a 29,9</span>
                                    <span className="text-orange-400 font-medium">Sobrepeso</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5">
                                    <span className="text-gray-400">30 a 34,9</span>
                                    <span className="text-red-400 font-medium">Obesidade I</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5">
                                    <span className="text-gray-400">Maior que 40</span>
                                    <span className="text-red-500 font-bold">Obesidade III</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>



                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Monitore sua saúde. Calcule seu Índice de Massa Corporal em segundos.
                    </p>
                </div>

                <FAQ
                    items={IMC_FAQS}
                    title="Dúvidas sobre IMC"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section >
    );
}
