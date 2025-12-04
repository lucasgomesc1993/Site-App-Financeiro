import React, { useState, useEffect } from 'react';
import { Droplets, HelpCircle, Scale, Timer, Info, GlassWater } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const WATER_FAQS: FAQItem[] = [
    {
        question: "A regra de 2 litros vale para todos?",
        answer: "Não! É uma média imprecisa. Uma pessoa de 50kg precisa de muito menos que uma de 100kg. O ideal é calcular pelo peso."
    },
    {
        question: "Quem treina precisa beber mais?",
        answer: "Sim. Adicionamos cerca de 500ml a 1 litro extra para cada hora de atividade intensa para repor o suor."
    },
    {
        question: "Suco substitui água?",
        answer: "Não. Sucos têm calorias e açúcar. Água pura deve ser a base da hidratação. Chás sem açúcar são uma boa alternativa."
    }
];

export function WaterIntakeCalculatorPage() {
    // Inputs
    const [weight, setWeight] = useState('');
    const [exerciseHours, setExerciseHours] = useState('');

    // Results
    const [waterGoal, setWaterGoal] = useState<number | null>(null);
    const [baseIntake, setBaseIntake] = useState<number | null>(null);
    const [exerciseExtra, setExerciseExtra] = useState<number | null>(null);

    const calculate = () => {
        const w = parseFloat(weight.replace(',', '.'));
        const hours = parseFloat(exerciseHours.replace(',', '.')) || 0;

        if (isNaN(w) || w === 0) {
            setWaterGoal(null);
            setBaseIntake(null);
            setExerciseExtra(null);
            return;
        }

        const base = w * 35; // 35ml per kg
        const extra = hours * 500; // 500ml per hour of exercise
        const total = base + extra;

        setBaseIntake(base);
        setExerciseExtra(extra);
        setWaterGoal(total);
    };

    useEffect(() => {
        calculate();
    }, [weight, exerciseHours]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Água Diária",
        "description": "Calcule a quantidade ideal de água para beber por dia.",
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
                title="Calculadora de Água Diária - Quantos litros devo beber?"
                description="Hidratação na medida certa. Calcule a quantidade ideal de água para o seu corpo com base no seu peso (Regra dos 35ml) e rotina de exercícios."
                canonical="/calculadoras/agua"
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de Água', href: '/calculadoras/agua' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Droplets className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Saúde e Bem-estar</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Água</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Descubra a meta diária exata para o seu corpo e mantenha-se hidratado com saúde.
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
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                        <Scale className="w-3 h-3" /> Peso (kg)
                                    </label>
                                    <input
                                        type="text"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center text-lg"
                                        placeholder="Ex: 70"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                        <Timer className="w-3 h-3" /> Exercício Diário (horas)
                                    </label>
                                    <input
                                        type="text"
                                        value={exerciseHours}
                                        onChange={(e) => setExerciseHours(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center text-lg"
                                        placeholder="Ex: 1 (para 1 hora)"
                                    />
                                    <p className="text-xs text-gray-500 mt-1 text-center">Deixe em branco se não treinar.</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <p className="text-center text-gray-400 mb-2">Sua Meta Diária</p>
                                <div className="text-5xl font-bold text-center text-blue-400 mb-2">
                                    {waterGoal !== null ? `${(waterGoal / 1000).toFixed(2)} Litros` : '---'}
                                </div>
                                <p className="text-center text-sm text-gray-500">
                                    ou {waterGoal !== null ? Math.ceil(waterGoal) : '---'} ml
                                </p>

                                {waterGoal !== null && (
                                    <div className="mt-6 space-y-2 text-sm bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                                        <div className="flex justify-between text-gray-400">
                                            <span>Base (Peso x 35ml):</span>
                                            <span className="text-white">{baseIntake} ml</span>
                                        </div>
                                        {exerciseExtra && exerciseExtra > 0 ? (
                                            <div className="flex justify-between text-gray-400">
                                                <span>Extra (Exercício):</span>
                                                <span className="text-white">+{exerciseExtra} ml</span>
                                            </div>
                                        ) : null}
                                    </div>
                                )}
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
                                <HelpCircle className="w-5 h-5 text-primary" />
                                A Fórmula dos 35ml
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    A recomendação mais aceita para adultos saudáveis é simples:
                                </p>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center">
                                    <strong className="block text-white mb-1 text-lg">Peso (kg) × 35ml</strong>
                                    <span className="text-primary">= Meta Diária</span>
                                </div>
                                <p>
                                    Exemplo: Uma pessoa de 70kg deve beber 2.450ml (2,45 Litros) por dia.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                <Info className="w-5 h-5" />
                                Benefícios Imediatos
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-center gap-2"><GlassWater className="w-4 h-4 text-blue-400" /> <strong>Desinchaço:</strong> O corpo para de reter líquido.</li>
                                <li className="flex items-center gap-2"><GlassWater className="w-4 h-4 text-blue-400" /> <strong>Foco:</strong> Melhora a concentração e energia.</li>
                                <li className="flex items-center gap-2"><GlassWater className="w-4 h-4 text-blue-400" /> <strong>Pele:</strong> Mais hidratação e viço.</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={WATER_FAQS}
                    title="Dúvidas Frequentes sobre Hidratação"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
