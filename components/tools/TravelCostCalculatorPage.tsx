import React, { useState, useEffect } from 'react';
import { Car, ArrowLeft, HelpCircle, Calculator, Fuel, MapPin, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';

export function TravelCostCalculatorPage() {
    // Inputs
    const [distance, setDistance] = useState('');
    const [consumption, setConsumption] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');
    const [tolls, setTolls] = useState('');
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [passengers, setPassengers] = useState('1');

    // Results
    const [totalCost, setTotalCost] = useState<number | null>(null);
    const [fuelCost, setFuelCost] = useState<number | null>(null);
    const [costPerPerson, setCostPerPerson] = useState<number | null>(null);
    const [litersNeeded, setLitersNeeded] = useState<number | null>(null);

    const calculate = () => {
        const dist = parseFloat(distance.replace(',', '.'));
        const cons = parseFloat(consumption.replace(',', '.'));
        const price = parseFloat(fuelPrice.replace(',', '.'));
        const tollCost = parseFloat(tolls.replace(',', '.')) || 0;
        const pass = parseInt(passengers) || 1;

        if (isNaN(dist) || isNaN(cons) || isNaN(price) || dist === 0 || cons === 0) {
            setTotalCost(null);
            return;
        }

        const effectiveDistance = isRoundTrip ? dist * 2 : dist;
        const effectiveTolls = isRoundTrip ? tollCost * 2 : tollCost;

        const liters = effectiveDistance / cons;
        const costFuel = liters * price;
        const total = costFuel + effectiveTolls;
        const perPerson = total / pass;

        setLitersNeeded(liters);
        setFuelCost(costFuel);
        setTotalCost(total);
        setCostPerPerson(perPerson);
    };

    useEffect(() => {
        calculate();
    }, [distance, consumption, fuelPrice, tolls, isRoundTrip, passengers]);

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-primary/20 selection:text-primary">
            <SEO
                title="Calculadora de Viagem - Custo de Combustível e Pedágio"
                description="Vai viajar de carro? Simule o custo total da viagem. Calcule o gasto com gasolina, etanol e pedágios para planejar suas férias sem sustos."
                canonical="/calculadoras/custo-viagem"
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
                                <Car className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Calculadora de Viagem
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Planeje seu orçamento: combustível, pedágios e divisão de custos.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-8">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">

                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> Distância (km)
                                            </label>
                                            <input
                                                type="text"
                                                value={distance}
                                                onChange={(e) => setDistance(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                                placeholder="Ex: 400"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                    <Fuel className="w-3 h-3" /> Consumo (km/l)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={consumption}
                                                    onChange={(e) => setConsumption(e.target.value)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                                    placeholder="Ex: 10"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                    <DollarSign className="w-3 h-3" /> Preço (R$/l)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={fuelPrice}
                                                    onChange={(e) => setFuelPrice(e.target.value)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                                    placeholder="Ex: 5.50"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                <DollarSign className="w-3 h-3" /> Total Pedágios (R$)
                                            </label>
                                            <input
                                                type="text"
                                                value={tolls}
                                                onChange={(e) => setTolls(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                                placeholder="Ex: 50.00"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between bg-[#0a0a0a] p-3 rounded-xl border border-white/10">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="roundTrip"
                                                    checked={isRoundTrip}
                                                    onChange={(e) => setIsRoundTrip(e.target.checked)}
                                                    className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary bg-gray-800"
                                                />
                                                <label htmlFor="roundTrip" className="text-sm text-gray-300 cursor-pointer select-none">
                                                    Ida e Volta
                                                </label>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-gray-500" />
                                                <select
                                                    value={passengers}
                                                    onChange={(e) => setPassengers(e.target.value)}
                                                    className="bg-transparent text-sm text-gray-300 focus:outline-none text-right"
                                                >
                                                    {[1, 2, 3, 4, 5].map(n => (
                                                        <option key={n} value={n}>{n} passageiro{n > 1 ? 's' : ''}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <p className="text-center text-gray-400 mb-2">Custo Total da Viagem</p>
                                        <div className="text-5xl font-bold text-center text-primary mb-2">
                                            {totalCost !== null ? `R$ ${totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '---'}
                                        </div>

                                        {totalCost !== null && (
                                            <div className="space-y-2 mt-6 text-sm">
                                                <div className="flex justify-between text-gray-400">
                                                    <span>Combustível ({litersNeeded?.toFixed(1)}L):</span>
                                                    <span className="text-white">R$ {fuelCost?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-400">
                                                    <span>Pedágios:</span>
                                                    <span className="text-white">R$ {(isRoundTrip ? (parseFloat(tolls.replace(',', '.')) || 0) * 2 : (parseFloat(tolls.replace(',', '.')) || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                                {parseInt(passengers) > 1 && (
                                                    <div className="flex justify-between text-primary font-medium pt-2 border-t border-white/5">
                                                        <span>Por pessoa:</span>
                                                        <span>R$ {costPerPerson?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-primary" />
                                        Como funciona o cálculo?
                                    </h3>
                                    <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                        <p>
                                            Para chegar ao valor final, cruzamos três informações essenciais:
                                        </p>
                                        <ul className="space-y-2 list-disc pl-4">
                                            <li><strong>Consumo:</strong> Distância ÷ Autonomia (km/l) = Litros Necessários.</li>
                                            <li><strong>Combustível:</strong> Litros × Preço Médio.</li>
                                            <li><strong>Pedágios:</strong> Soma de todas as tarifas do trajeto.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-400">
                                        <DollarSign className="w-5 h-5" />
                                        Dicas de Economia
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li>• <strong>Calibre os Pneus:</strong> Pneus murchos aumentam o consumo em até 3%.</li>
                                        <li>• <strong>Ar vs. Janelas:</strong> Na estrada, prefira o ar condicionado para evitar resistência aerodinâmica.</li>
                                        <li>• <strong>Tags de Pedágio:</strong> Muitas oferecem 5% de desconto na tarifa.</li>
                                    </ul>
                                </div>

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 text-white">Dúvidas Frequentes</h3>
                                    <div className="space-y-3 text-sm text-gray-400">
                                        <div>
                                            <strong className="text-white block">Etanol ou Gasolina?</strong>
                                            <p>Na estrada, gasolina costuma ser melhor pela autonomia (rende ~30% mais), evitando paradas.</p>
                                        </div>
                                        <div className="border-t border-white/5 pt-3">
                                            <strong className="text-white block">Divisão de Custos</strong>
                                            <p>A etiqueta da "carona amiga" sugere dividir apenas os custos variáveis (Combustível + Pedágio).</p>
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
