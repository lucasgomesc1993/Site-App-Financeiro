import React, { useState, useEffect } from 'react';
import { Droplets, ArrowLeft, HelpCircle, Calculator, Scale, Timer, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';

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

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-primary/20 selection:text-primary">
            <SEO
                title="Calculadora de Água Diária - Quantos litros devo beber?"
                description="Hidratação na medida certa. Calcule a quantidade ideal de água para o seu corpo com base no seu peso (Regra dos 35ml) e rotina de exercícios."
                canonical="/calculadoras/agua"
            />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link to="/calculadoras" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para Calculadoras
                </Link>

                <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <Droplets className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Calculadora de Água
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Descubra a meta diária exata para o seu corpo.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-8">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">

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
                                            <div className="mt-6 space-y-2 text-sm">
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

                                <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                        <Info className="w-5 h-5" />
                                        Benefícios Imediatos
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li>• <strong>Desinchaço:</strong> O corpo para de reter líquido.</li>
                                        <li>• <strong>Foco:</strong> Melhora a concentração e energia.</li>
                                        <li>• <strong>Pele:</strong> Mais hidratação e viço.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
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

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 text-white">Dúvidas Frequentes</h3>
                                    <div className="space-y-3 text-sm text-gray-400">
                                        <div>
                                            <strong className="text-white block">A regra de 2 litros vale para todos?</strong>
                                            <p>Não! É uma média imprecisa. Uma pessoa de 50kg precisa de muito menos que uma de 100kg.</p>
                                        </div>
                                        <div className="border-t border-white/5 pt-3">
                                            <strong className="text-white block">Quem treina precisa beber mais?</strong>
                                            <p>Sim. Adicionamos cerca de 500ml a 1 litro extra para cada hora de atividade intensa.</p>
                                        </div>
                                        <div className="border-t border-white/5 pt-3">
                                            <strong className="text-white block">Suco substitui água?</strong>
                                            <p>Não. Sucos têm calorias e açúcar. Água pura deve ser a base da hidratação.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
