import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Calendar, Percent, User } from 'lucide-react';

export const VacationCalculator: React.FC = () => {
    const [salary, setSalary] = useState(3000);
    const [days, setDays] = useState(30);
    const [sellDays, setSellDays] = useState(false);
    const [dependents, setDependents] = useState(0);

    const [result, setResult] = useState({
        grossVacation: 0,
        oneThirdBonus: 0,
        allowance: 0,
        allowanceOneThird: 0,
        totalGross: 0,
        inss: 0,
        irrf: 0,
        totalNet: 0
    });

    useEffect(() => {
        calculateVacation();
    }, [salary, days, sellDays, dependents]);

    const calculateVacation = () => {
        // Basic Vacation Value
        const vacationValue = (salary / 30) * days;
        const oneThird = vacationValue / 3;

        // Cash Allowance (Abono Pecuniário - selling 10 days)
        // Usually you sell 10 days, so you take 20 days vacation + 10 days worked (paid as allowance)
        // If user selects "sell days", we assume selling 10 days.
        // Note: If you sell 10 days, you usually take 20 days of vacation.
        // For simplicity, if sellDays is true, we assume the 'days' input is the days TAKEN (e.g. 20) and we add 10 days allowance.

        let allowance = 0;
        let allowanceOneThird = 0;

        if (sellDays) {
            allowance = (salary / 30) * 10;
            allowanceOneThird = allowance / 3;
        }

        const totalGross = vacationValue + oneThird + allowance + allowanceOneThird;

        // INSS Calculation (Progressive Table 2024)
        // Base for INSS is Vacation + 1/3 (Allowance is not subject to INSS/IRRF usually, but depends on interpretation. Standard is no incidence on Abono)
        const baseINSS = vacationValue + oneThird;
        let inss = calculateINSS(baseINSS);

        // IRRF Calculation
        // Base = BaseINSS - INSS - (Dependents * 189.59)
        const baseIRRF = baseINSS - inss - (dependents * 189.59);
        let irrf = calculateIRRF(baseIRRF);

        const totalNet = totalGross - inss - irrf;

        setResult({
            grossVacation: vacationValue,
            oneThirdBonus: oneThird,
            allowance,
            allowanceOneThird,
            totalGross,
            inss,
            irrf,
            totalNet
        });
    };

    const calculateINSS = (base: number) => {
        let discount = 0;
        if (base <= 1412.00) {
            discount = base * 0.075;
        } else if (base <= 2666.68) {
            discount = (1412.00 * 0.075) + ((base - 1412.00) * 0.09);
        } else if (base <= 4000.03) {
            discount = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((base - 2666.68) * 0.12);
        } else if (base <= 7786.02) {
            discount = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((base - 4000.03) * 0.14);
        } else {
            discount = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((7786.02 - 4000.03) * 0.14);
        }
        return discount;
    };

    const calculateIRRF = (base: number) => {
        let discount = 0;
        if (base <= 2259.20) {
            discount = 0;
        } else if (base <= 2826.65) {
            discount = (base * 0.075) - 169.44;
        } else if (base <= 3751.05) {
            discount = (base * 0.15) - 381.44;
        } else if (base <= 4664.68) {
            discount = (base * 0.225) - 662.77;
        } else {
            discount = (base * 0.275) - 896.00;
        }
        return discount > 0 ? discount : 0;
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8">
                {/* Controls */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-primary" />
                            Dados das Férias
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Salário Bruto</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="number"
                                        value={salary}
                                        onChange={(e) => setSalary(Number(e.target.value))}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Dias de Férias</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <select
                                        value={days}
                                        onChange={(e) => setDays(Number(e.target.value))}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                                    >
                                        <option value={10}>10 dias</option>
                                        <option value={15}>15 dias</option>
                                        <option value={20}>20 dias</option>
                                        <option value={30}>30 dias</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Dependentes</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="number"
                                        value={dependents}
                                        onChange={(e) => setDependents(Number(e.target.value))}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="sellDays"
                                    checked={sellDays}
                                    onChange={(e) => setSellDays(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary bg-black/30"
                                />
                                <label htmlFor="sellDays" className="text-sm text-gray-300 select-none cursor-pointer">
                                    Vender 10 dias (Abono Pecuniário)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-lg font-medium text-gray-300 mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Detalhamento
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-gray-400">Valor Férias ({days} dias)</span>
                                    <span className="text-white">{formatCurrency(result.grossVacation)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-gray-400">1/3 Constitucional</span>
                                    <span className="text-white">{formatCurrency(result.oneThirdBonus)}</span>
                                </div>
                                {sellDays && (
                                    <>
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="text-gray-400">Abono Pecuniário (10 dias)</span>
                                            <span className="text-green-400">+ {formatCurrency(result.allowance)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="text-gray-400">1/3 Abono</span>
                                            <span className="text-green-400">+ {formatCurrency(result.allowanceOneThird)}</span>
                                        </div>
                                    </>
                                )}

                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-gray-400">INSS</span>
                                    <span className="text-red-400">- {formatCurrency(result.inss)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-gray-400">IRRF</span>
                                    <span className="text-red-400">- {formatCurrency(result.irrf)}</span>
                                </div>

                                <div className="pt-4 mt-4 border-t border-white/10">
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-300 font-medium">Valor Líquido a Receber</span>
                                        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                                            {formatCurrency(result.totalNet)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
