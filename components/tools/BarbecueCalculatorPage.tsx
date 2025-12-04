import React, { useState } from 'react';
import { Calculator, ArrowLeft, Flame, Users, Clock, ShoppingCart, HelpCircle, Lightbulb, Beer, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';

export function BarbecueCalculatorPage() {
    const [men, setMen] = useState('');
    const [women, setWomen] = useState('');
    const [children, setChildren] = useState('');
    const [duration, setDuration] = useState<'standard' | 'long'>('standard');
    const [result, setResult] = useState<{ meat: number; beer: number; soda: number; charcoal: number } | null>(null);

    const calculateBarbecue = () => {
        const numMen = parseInt(men) || 0;
        const numWomen = parseInt(women) || 0;
        const numChildren = parseInt(children) || 0;

        if (numMen === 0 && numWomen === 0 && numChildren === 0) {
            setResult(null);
            return;
        }

        // Base consumption (Standard duration <= 4h)
        let meatMen = 0.4; // kg
        let meatWomen = 0.3; // kg
        let meatChildren = 0.15; // kg
        let beerAdults = 1.75; // Liters (approx 5 cans)
        let sodaPerson = 0.5; // Liters

        // Long duration adjustment (> 5h)
        if (duration === 'long') {
            const increase = 1.25; // +25%
            meatMen *= increase;
            meatWomen *= increase;
            meatChildren *= increase;
            beerAdults *= increase;
            sodaPerson *= increase;
        }

        const totalMeat = (numMen * meatMen) + (numWomen * meatWomen) + (numChildren * meatChildren);
        const totalBeer = (numMen + numWomen) * beerAdults;
        const totalSoda = (numMen + numWomen + numChildren) * sodaPerson;
        const totalCharcoal = totalMeat / 6; // 1kg charcoal for 6kg meat (approx, safe margin)

        setResult({
            meat: totalMeat,
            beer: totalBeer,
            soda: totalSoda,
            charcoal: Math.ceil(totalCharcoal) // Round up for bags
        });
    };

    const handleNumberInput = (value: string, setter: (value: string) => void) => {
        const numericValue = value.replace(/\D/g, '');
        setter(numericValue);
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-primary/20 selection:text-primary">
            <SEO
                title="Calculadora de Churrasco - Quantidade de Carne e Bebida"
                description="Vai fazer churrasco? Calcule a quantidade certa de carne (picanha, linguiça), cerveja, refrigerante e carvão por pessoa. Evite desperdício e economize."
                canonical="/calculadoras/churrasco"
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
                                <Flame className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Calculadora de Churrasco
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Nunca mais deixe faltar carne. Calcule a quantidade ideal para sua festa.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-8">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-primary" />
                                        Convidados e Duração
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Homens
                                                </label>
                                                <input
                                                    type="text"
                                                    value={men}
                                                    onChange={(e) => handleNumberInput(e.target.value, setMen)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Mulheres
                                                </label>
                                                <input
                                                    type="text"
                                                    value={women}
                                                    onChange={(e) => handleNumberInput(e.target.value, setWomen)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Crianças
                                            </label>
                                            <input
                                                type="text"
                                                value={children}
                                                onChange={(e) => handleNumberInput(e.target.value, setChildren)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center"
                                                placeholder="0"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Duração da Festa
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    onClick={() => setDuration('standard')}
                                                    className={`py-3 px-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${duration === 'standard' ? 'bg-primary/20 border-primary text-white' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:bg-white/5'}`}
                                                >
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Até 4 horas</span>
                                                </button>
                                                <button
                                                    onClick={() => setDuration('long')}
                                                    className={`py-3 px-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${duration === 'long' ? 'bg-primary/20 border-primary text-white' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:bg-white/5'}`}
                                                >
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Mais de 5h</span>
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={calculateBarbecue}
                                            className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 mt-4"
                                        >
                                            Calcular Churrasco
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {result && (
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 animate-fade-in">
                                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                            <ShoppingCart className="w-5 h-5 text-primary" />
                                            Lista de Compras Sugerida
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <Utensils className="w-5 h-5 text-red-400" />
                                                    <div>
                                                        <p className="font-medium text-white">Carne Total</p>
                                                        <p className="text-xs text-gray-400">Picanha, Linguiça, Frango</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-white">{result.meat.toFixed(1).replace('.', ',')} kg</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <Beer className="w-5 h-5 text-yellow-400" />
                                                    <div>
                                                        <p className="font-medium text-white">Cerveja</p>
                                                        <p className="text-xs text-gray-400">Latas de 350ml: ~{Math.ceil((result.beer * 1000) / 350)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-white">{result.beer.toFixed(1).replace('.', ',')} L</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center text-[10px] font-bold text-blue-400">H2O</div>
                                                    <div>
                                                        <p className="font-medium text-white">Refri / Água</p>
                                                        <p className="text-xs text-gray-400">Garrafas de 2L: ~{Math.ceil(result.soda / 2)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-white">{result.soda.toFixed(1).replace('.', ',')} L</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <Flame className="w-5 h-5 text-orange-400" />
                                                    <div>
                                                        <p className="font-medium text-white">Carvão</p>
                                                        <p className="text-xs text-gray-400">Sacos de 5kg (aprox)</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-white">{result.charcoal} kg</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-primary" />
                                        A Regra dos 400g
                                    </h3>
                                    <div className="space-y-4 text-gray-400 text-sm">
                                        <p>
                                            Para um churrasco padrão de até 4 horas, a conta segura é:
                                        </p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li><strong>Homens:</strong> 400g a 500g de carne.</li>
                                            <li><strong>Mulheres:</strong> 300g a 400g de carne.</li>
                                            <li><strong>Crianças:</strong> 150g a 200g de carne.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                        <Lightbulb className="w-5 h-5" />
                                        Dica de Mestre
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        Se o churrasco for durar o dia todo (mais de 5 horas), aumente a quantidade em 20% a 30%. As pessoas tendem a "beliscar" continuamente. Não esqueça dos acompanhamentos (pão de alho, farofa) para saciar a fome!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold mb-4 text-white">Lista de Compras Inteligente</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <Utensils className="w-8 h-8 text-primary mb-4" />
                                        <h3 className="font-semibold text-white mb-2">1. Entradas (Acalmam a fome)</h3>
                                        <p className="text-sm text-gray-400 mb-2">
                                            Servem para petiscar enquanto a carne principal assa.
                                        </p>
                                        <ul className="list-disc pl-4 text-sm text-gray-400">
                                            <li>Linguiça Toscana</li>
                                            <li>Asinha de Frango (Tulipa)</li>
                                            <li>Coraçãozinho</li>
                                            <li>Pão de Alho e Queijo Coalho</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <Flame className="w-8 h-8 text-orange-400 mb-4" />
                                        <h3 className="font-semibold text-white mb-2">2. Prato Principal (As estrelas)</h3>
                                        <p className="text-sm text-gray-400 mb-2">
                                            As carnes nobres que todos esperam.
                                        </p>
                                        <ul className="list-disc pl-4 text-sm text-gray-400">
                                            <li><strong>Grelha (Rápido):</strong> Picanha, Maminha, Contra-filé, Alcatra.</li>
                                            <li><strong>Assados (Lentos):</strong> Costela Gaúcha, Cupim, Costelinha BBQ.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white/5 rounded-3xl p-8 border border-white/5">
                                <h2 className="text-2xl font-bold mb-6 text-white">Perguntas Frequentes</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">Quanto carvão eu preciso?</h3>
                                        <p className="text-gray-400">
                                            Em média, 1 saco de 5kg de carvão é suficiente para assar 6kg de carne. Tenha sempre um saco extra de reserva, pois o vento influencia o consumo.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">Como calcular a cerveja?</h3>
                                        <p className="text-gray-400">
                                            Considere que cada adulto bebe, em média, 1,5 a 2 litros de cerveja (4 a 6 latas) em um churrasco de 4 horas. Se estiver muito calor, aumente essa margem.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">O que servir de acompanhamento?</h3>
                                        <p className="text-gray-400">
                                            Para economizar na carne sem deixar ninguém com fome, invista nos acompanhamentos: pão de alho, farofa, vinagrete, salada de maionese e arroz são essenciais.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
