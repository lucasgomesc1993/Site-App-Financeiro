import React, { useState, useEffect } from 'react';
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

        // INSS Calculation (Progressive Table 2025)
        // Base for INSS is Vacation + 1/3
        const baseINSS = vacationValue + oneThird;
        let inss = calculateINSS(baseINSS);

        // IRRF Calculation (2025 - Simplified Discount Logic)
        // Option A: Legal Deductions (INSS + Dependents)
        const deductionPerDependent = 189.59;
        const totalDeductionsLegal = inss + (dependents * deductionPerDependent);
        const baseIRRFLegal = baseINSS - totalDeductionsLegal;

        // Option B: Simplified Discount (R$ 607.20)
        // Note: The simplified discount replaces BOTH INSS and Dependent deductions appropriately in the comparison logic
        // As per Receita Federal: "Could deduct 20%... or Simplified Discount".
        // Actually, Simplified Discount replaces the "Deduções Legais".
        const baseIRRFSimplified = baseINSS - 607.20;

        // Use the most beneficial base (smallest positive base)
        const finalBaseIRRF = Math.min(baseIRRFLegal, baseIRRFSimplified);

        let irrf = calculateIRRF(finalBaseIRRF);

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
        // Teto 2025: R$ 8.157,41 -> Max Discount R$ 951,63
        if (base > 8157.41) {
            return 951.63;
        }

        if (base <= 1518.00) {
            discount = base * 0.075;
        } else if (base <= 2793.88) {
            discount = (base * 0.09) - 22.77;
        } else if (base <= 4190.83) {
            discount = (base * 0.12) - 106.59;
        } else {
            discount = (base * 0.14) - 190.40;
        }
        return discount;
    };

    const calculateIRRF = (base: number) => {
        let discount = 0;
        if (base <= 2428.80) {
            discount = 0;
        } else if (base <= 2826.65) {
            discount = (base * 0.075) - 182.16;
        } else if (base <= 3751.05) {
            discount = (base * 0.15) - 394.16;
        } else if (base <= 4664.68) {
            discount = (base * 0.225) - 675.49;
        } else {
            discount = (base * 0.275) - 908.73;
        }
        return discount > 0 ? discount : 0;
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    return (
        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-white mb-8">
                <Calculator className="w-5 h-5 text-blue-500" />
                Simular Férias
            </h2>

            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="salary" className="text-sm text-gray-400">Salário Bruto</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                id="salary"
                                aria-label="Salário Bruto"
                                type="number"
                                inputMode="decimal"
                                value={salary}
                                onChange={(e) => setSalary(Number(e.target.value))}
                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="dependents" className="text-sm text-gray-400">Dependentes</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                id="dependents"
                                aria-label="Dependentes"
                                type="number"
                                inputMode="numeric"
                                value={dependents}
                                onChange={(e) => setDependents(Number(e.target.value))}
                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="days" className="text-sm text-gray-400">Dias de Férias</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <select
                                id="days"
                                aria-label="Dias de Férias"
                                value={days}
                                onChange={(e) => setDays(Number(e.target.value))}
                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                            >
                                <option value={10}>10 dias</option>
                                <option value={15}>15 dias</option>
                                <option value={20}>20 dias</option>
                                <option value={30}>30 dias</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-end pb-3">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="sellDays"
                                checked={sellDays}
                                onChange={(e) => setSellDays(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-black/30 cursor-pointer"
                            />
                            <label htmlFor="sellDays" className="text-sm text-gray-300 select-none cursor-pointer">
                                Vender 10 dias (Abono)
                            </label>
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div className="pt-4 border-t border-white/5 mt-6">
                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-6">
                        <span className="text-sm text-blue-400 block mb-2">
                            Valor Líquido a Receber
                        </span>
                        <span className="text-4xl font-bold text-white">
                            {formatCurrency(result.totalNet)}
                        </span>
                        <div className="flex justify-center gap-4 mt-3 text-xs">
                            <span className="text-gray-400">Bruto: {formatCurrency(result.totalGross)}</span>
                            <span className="text-red-400">Desc: {formatCurrency(result.inss + result.irrf)}</span>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-gray-300">Valor Férias ({days} dias)</span>
                            <span className="text-white font-medium">{formatCurrency(result.grossVacation)}</span>
                        </div>
                        <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-gray-300">1/3 Constitucional</span>
                            <span className="text-white font-medium">{formatCurrency(result.oneThirdBonus)}</span>
                        </div>

                        {sellDays && (
                            <>
                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                    <span className="text-gray-300">Abono Pecuniário (10 dias)</span>
                                    <span className="text-emerald-400 font-medium">+ {formatCurrency(result.allowance)}</span>
                                </div>
                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                    <span className="text-gray-300">1/3 Abono</span>
                                    <span className="text-emerald-400 font-medium">+ {formatCurrency(result.allowanceOneThird)}</span>
                                </div>
                            </>
                        )}

                        <div className="flex justify-between p-2 pl-4 text-xs rounded-lg text-red-300/80">
                            <span>- INSS</span>
                            <span>{formatCurrency(result.inss)}</span>
                        </div>
                        <div className="flex justify-between p-2 pl-4 text-xs rounded-lg text-red-300/80">
                            <span>- IRRF</span>
                            <span>{formatCurrency(result.irrf)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
