import React, { useState, useEffect } from 'react';
import { Droplets, Calculator, HelpCircle, GlassWater, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const WATER_FAQS: FAQItem[] = [
    {
        question: "Por que beber água é importante?",
        answer: "A água regula a temperatura corporal, transporta nutrientes, lubrifica articulações e melhora o funcionamento dos rins e intestino."
    },
    {
        question: "Bebidas como suco e chá contam?",
        answer: "Sim, mas a água pura é a melhor opção. Sucos podem ter muito açúcar e chás/café podem ser diuréticos."
    },
    {
        question: "Beber água demais faz mal?",
        answer: "Sim, o excesso pode causar hiponatremia (baixa concentração de sódio no sangue), mas é raro em pessoas saudáveis."
    }
];

export function WaterIntakeCalculatorPage() {
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState<'low' | 'moderate' | 'high'>('moderate');
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const w = parseFloat(weight.replace(',', '.'));

        if (isNaN(w) || w === 0) {
            setResult(null);
            return;
        }

        // Base: 35ml per kg
        let mlPerKg = 35;

        if (activityLevel === 'low') mlPerKg = 30;
        if (activityLevel === 'high') mlPerKg = 45;

        setResult(w * mlPerKg);
    };

    useEffect(() => {
        calculate();
    }, [weight, activityLevel]);

    const handleInput = (value: string, setter: (value: string) => void) => {
        if (/^[\d.,]*$/.test(value)) {
            setter(value);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Ingestão de Água",
        "description": "Descubra quanta água você deve beber por dia com base no seu peso e nível de atividade.",
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
                title="Calculadora de Água Diária - Hidratação Ideal"
                description="Quantos litros de água devo beber por dia? Calcule a meta ideal de hidratação para seu corpo e estilo de vida."
                canonical="/calculadoras/agua-diaria"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": WATER_FAQS.map(faq => ({
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
                        { label: 'Ingestão de Água', href: '/calculadoras/agua-diaria' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Droplets className="w-4 h-4 text-cyan-500" />
                            <span className="text-sm text-gray-300">Matemática e Saúde</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Ingestão de Água</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Mantenha-se hidratado. Descubra a quantidade ideal de água para o seu corpo.
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
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-cyan-500" />
                                    Calcular Meta Diária
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Seu Peso (kg)</label>
                                    <input
                                        type="text"
                                        value={weight}
                                        onChange={(e) => handleInput(e.target.value, setWeight)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                                        placeholder="Ex: 70"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Nível de Atividade Física</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            onClick={() => setActivityLevel('low')}
                                            className={`py-3 rounded-xl text-sm font-medium transition-all border ${activityLevel === 'low' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30'}`}
                                        >
                                            Sedentário
                                        </button>
                                        <button
                                            onClick={() => setActivityLevel('moderate')}
                                            className={`py-3 rounded-xl text-sm font-medium transition-all border ${activityLevel === 'moderate' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30'}`}
                                        >
                                            Moderado
                                        </button>
                                        <button
                                            onClick={() => setActivityLevel('high')}
                                            className={`py-3 rounded-xl text-sm font-medium transition-all border ${activityLevel === 'high' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30'}`}
                                        >
                                            Intenso
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 text-center">
                                    <p className="text-gray-400 text-sm mb-2">Sua meta diária é</p>
                                    <div className="text-5xl font-bold text-white mb-2">
                                        {result !== null ? (result / 1000).toFixed(2) : '---'} <span className="text-2xl text-gray-500 font-normal">litros</span>
                                    </div>
                                    {result !== null && (
                                        <p className="text-sm text-gray-500">
                                            Isso equivale a aproximadamente {Math.ceil(result / 250)} copos de 250ml.
                                        </p>
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
                                <GlassWater className="w-5 h-5 text-cyan-500" />
                                Dicas de Hidratação
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Ao acordar:</strong> Beba um copo d'água para ativar o metabolismo.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Antes das refeições:</strong> Ajuda na digestão e controle do apetite.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Saborize:</strong> Se não gosta de água pura, adicione rodelas de limão ou hortelã.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={WATER_FAQS}
                    title="Dúvidas sobre Hidratação"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
