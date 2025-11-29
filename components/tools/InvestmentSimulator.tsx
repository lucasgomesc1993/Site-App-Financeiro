import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';

type InvestmentType = 'cdb' | 'lci' | 'tesouro';

export const InvestmentSimulator: React.FC = () => {
    const [initialAmount, setInitialAmount] = useState(1000);
    const [monthlyContribution, setMonthlyContribution] = useState(500);
    const [years, setYears] = useState(5);
    const [rate, setRate] = useState(10.5); // Annual rate default
    const [type, setType] = useState<InvestmentType>('cdb');

    const [result, setResult] = useState({
        totalInvested: 0,
        totalInterest: 0,
        grossTotal: 0,
        taxAmount: 0,
        netTotal: 0
    });

    useEffect(() => {
        calculateResults();
    }, [initialAmount, monthlyContribution, years, rate, type]);

    const calculateResults = () => {
        const months = years * 12;
        const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;

        let futureValueInitial = initialAmount * Math.pow(1 + monthlyRate, months);
        let futureValueMonthly = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

        // If monthly contribution is at the beginning of the period, multiply by (1+r)
        // Assuming end of period for simplicity, or standard formula

        const grossTotal = futureValueInitial + futureValueMonthly;
        const totalInvested = initialAmount + (monthlyContribution * months);
        const totalInterest = grossTotal - totalInvested;

        let taxRate = 0;
        if (type === 'cdb' || type === 'tesouro') {
            const days = years * 365;
            if (days <= 180) taxRate = 0.225;
            else if (days <= 360) taxRate = 0.20;
            else if (days <= 720) taxRate = 0.175;
            else taxRate = 0.15;
        }

        const taxAmount = totalInterest * taxRate;
        const netTotal = grossTotal - taxAmount;

        setResult({
            totalInvested,
            totalInterest,
            grossTotal,
            taxAmount,
            netTotal
        });
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
                            Parâmetros
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Tipo de Investimento</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['cdb', 'lci', 'tesouro'] as InvestmentType[]).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setType(t)}
                                            className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${type === t
                                                    ? 'bg-primary text-black shadow-[0_0_15px_rgba(71,255,183,0.3)]'
                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                                }`}
                                        >
                                            {t === 'cdb' ? 'CDB' : t === 'lci' ? 'LCI/LCA' : 'Tesouro'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Investimento Inicial</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="number"
                                        value={initialAmount}
                                        onChange={(e) => setInitialAmount(Number(e.target.value))}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Aporte Mensal</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="number"
                                        value={monthlyContribution}
                                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Prazo (Anos)</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={years}
                                            onChange={(e) => setYears(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Taxa Anual (%)</label>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={rate}
                                            onChange={(e) => setRate(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <p className="text-sm text-gray-400 mb-1">Total Investido</p>
                            <p className="text-2xl font-bold text-white">{formatCurrency(result.totalInvested)}</p>
                        </div>
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <p className="text-sm text-gray-400 mb-1">Rendimento Bruto</p>
                            <p className="text-2xl font-bold text-primary">{formatCurrency(result.totalInterest)}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-lg font-medium text-gray-300 mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Resultado Final
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-white/5">
                                    <span className="text-gray-400">Valor Bruto Total</span>
                                    <span className="text-xl font-medium text-white">{formatCurrency(result.grossTotal)}</span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-white/5">
                                    <span className="text-gray-400">
                                        Imposto de Renda
                                        {type === 'lci' ? <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Isento</span> : ''}
                                    </span>
                                    <span className="text-xl font-medium text-red-400">-{formatCurrency(result.taxAmount)}</span>
                                </div>

                                <div className="pt-4 mt-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-300 font-medium">Valor Líquido</span>
                                        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                                            {formatCurrency(result.netTotal)}
                                        </span>
                                    </div>
                                    <p className="text-right text-xs text-gray-500 mt-2">
                                        *Estimativa baseada na taxa constante. Não é garantia de rentabilidade.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
