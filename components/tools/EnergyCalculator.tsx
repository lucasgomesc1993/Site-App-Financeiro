import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, DollarSign, Clock, Calendar } from 'lucide-react';

export const EnergyCalculator: React.FC = () => {
    const [power, setPower] = useState<number>(0);
    const [hoursPerDay, setHoursPerDay] = useState<number>(0);
    const [daysPerMonth, setDaysPerMonth] = useState<number>(0);
    const [kwhPrice, setKwhPrice] = useState<number>(0);
    const [result, setResult] = useState<number | null>(null);

    useEffect(() => {
        if (power > 0 && hoursPerDay > 0 && daysPerMonth > 0 && kwhPrice > 0) {
            // Formula: (Power (W) * Hours * Days) / 1000 = kWh consumed
            // Cost = kWh consumed * Price per kWh
            const consumptionKwh = (power * hoursPerDay * daysPerMonth) / 1000;
            const totalCost = consumptionKwh * kwhPrice;
            setResult(totalCost);
        } else {
            setResult(null);
        }
    }, [power, hoursPerDay, daysPerMonth, kwhPrice]);

    return (
        <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary" />
                    Dados do Aparelho
                </h3>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Potência do Aparelho (Watts)</label>
                        <div className="relative">
                            <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="number"
                                value={power || ''}
                                onChange={(e) => setPower(Number(e.target.value))}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                placeholder="Ex: 1100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Tempo de uso diário (Horas)</label>
                        <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="number"
                                value={hoursPerDay || ''}
                                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                placeholder="Ex: 1"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Dias de uso por mês</label>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="number"
                                value={daysPerMonth || ''}
                                onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                placeholder="Ex: 30"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Preço do kWh (R$)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="number"
                                step="0.01"
                                value={kwhPrice || ''}
                                onChange={(e) => setKwhPrice(Number(e.target.value))}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                placeholder="Ex: 0.85"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10 text-center">
                    <h3 className="text-xl text-gray-400 mb-2">Custo Mensal Estimado</h3>

                    {result !== null ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key={result}
                        >
                            <div className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result)}
                            </div>
                            <p className="text-emerald-400 font-medium">
                                Consumo: {((power * hoursPerDay * daysPerMonth) / 1000).toFixed(2)} kWh/mês
                            </p>
                        </motion.div>
                    ) : (
                        <div className="py-12">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                <Zap className="w-10 h-10 text-gray-600" />
                            </div>
                            <p className="text-gray-500">Preencha os dados para calcular o consumo</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
