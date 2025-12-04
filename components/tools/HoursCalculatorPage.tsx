import React, { useState, useEffect } from 'react';
import { Clock, ArrowLeft, HelpCircle, Plus, Trash2, RotateCcw, Calculator, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';

type Operation = 'add' | 'subtract';

interface TimeRow {
    id: string;
    operation: Operation;
    value: string;
}

export function HoursCalculatorPage() {
    const [rows, setRows] = useState<TimeRow[]>([
        { id: '1', operation: 'add', value: '' },
        { id: '2', operation: 'add', value: '' }
    ]);
    const [result, setResult] = useState<string>('00:00');
    const [isNegative, setIsNegative] = useState(false);

    const addRow = () => {
        setRows([...rows, { id: Math.random().toString(36).substr(2, 9), operation: 'add', value: '' }]);
    };

    const removeRow = (id: string) => {
        if (rows.length > 2) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const updateRow = (id: string, field: keyof TimeRow, value: string) => {
        setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    const reset = () => {
        setRows([
            { id: '1', operation: 'add', value: '' },
            { id: '2', operation: 'add', value: '' }
        ]);
    };

    const timeToMinutes = (time: string): number => {
        if (!time) return 0;
        const [hours, minutes] = time.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) return 0;
        return (hours * 60) + minutes;
    };

    const minutesToTime = (totalMinutes: number): string => {
        const absMinutes = Math.abs(totalMinutes);
        const hours = Math.floor(absMinutes / 60);
        const minutes = absMinutes % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        let totalMinutes = 0;

        rows.forEach((row, index) => {
            const minutes = timeToMinutes(row.value);

            // First row is always positive unless explicitly subtracted (though UI usually treats first row as base)
            // But for this calculator, let's follow the operation selector for all rows, 
            // except maybe the first one could be fixed to 'add' or let user choose.
            // Let's allow user to choose operation for all rows for maximum flexibility.

            if (row.operation === 'add') {
                totalMinutes += minutes;
            } else {
                totalMinutes -= minutes;
            }
        });

        setIsNegative(totalMinutes < 0);
        setResult(minutesToTime(totalMinutes));
    }, [rows]);

    const handleTimeInput = (value: string, id: string) => {
        // Allow only numbers and colon
        if (/^[\d:]*$/.test(value)) {
            // Auto-insert colon if user types 4 digits
            if (value.length === 2 && !value.includes(':')) {
                // Don't auto-insert if deleting
                // This is tricky without previous value, let's keep it simple for now
            }
            updateRow(id, 'value', value);
        }
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-primary/20 selection:text-primary">
            <SEO
                title="Calculadora de Horas Online - Soma e Subtração de Minutos"
                description="Precisa fechar a folha de ponto? Some e subtraia horas e minutos facilmente. Ferramenta gratuita para RH, funcionários e controle de banco de horas."
                canonical="/calculadoras/horas"
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
                                <Clock className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Calculadora de Horas
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Chega de errar a conta do ponto. Some ou subtraia horas sem complicação.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-8">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <div className="space-y-4">
                                        {rows.map((row, index) => (
                                            <div key={row.id} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
                                                <select
                                                    value={row.operation}
                                                    onChange={(e) => updateRow(row.id, 'operation', e.target.value as Operation)}
                                                    className={`bg-[#0a0a0a] border border-white/10 rounded-lg py-3 px-2 text-center focus:outline-none focus:border-primary/50 transition-all font-bold w-16 ${row.operation === 'add' ? 'text-green-400' : 'text-red-400'}`}
                                                >
                                                    <option value="add">+</option>
                                                    <option value="subtract">-</option>
                                                </select>

                                                <div className="relative flex-1">
                                                    <input
                                                        type="time"
                                                        value={row.value}
                                                        onChange={(e) => updateRow(row.id, 'value', e.target.value)}
                                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center font-mono text-lg"
                                                    />
                                                </div>

                                                <button
                                                    onClick={() => removeRow(row.id)}
                                                    disabled={rows.length <= 2}
                                                    className={`p-3 rounded-lg border border-white/5 transition-colors ${rows.length <= 2 ? 'text-gray-600 cursor-not-allowed opacity-50' : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20'}`}
                                                    title="Remover linha"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={addRow}
                                            className="flex-1 py-3 px-4 bg-[#0a0a0a] hover:bg-white/5 border border-white/10 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 text-gray-300 hover:text-white group"
                                        >
                                            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            Adicionar Linha
                                        </button>
                                        <button
                                            onClick={reset}
                                            className="py-3 px-4 bg-[#0a0a0a] hover:bg-white/5 border border-white/10 rounded-xl text-sm font-medium transition-all text-gray-300 hover:text-white"
                                            title="Limpar tudo"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <p className="text-center text-gray-400 mb-2">Resultado Total</p>
                                        <div className={`text-5xl font-bold text-center font-mono tracking-wider ${isNegative ? 'text-red-400' : 'text-primary'}`}>
                                            {isNegative ? '-' : ''}{result}
                                        </div>
                                        <p className="text-center text-sm text-gray-500 mt-2">
                                            {isNegative ? 'Saldo Negativo' : 'Saldo Positivo'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-primary" />
                                        Por que usar esta calculadora?
                                    </h3>
                                    <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                        <p>
                                            O sistema de tempo é <strong>sexagesimal</strong> (base 60), enquanto nossa matemática comum é decimal (base 10).
                                        </p>
                                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                            <strong className="text-red-400 block mb-1">O Erro Comum:</strong>
                                            <p>Somar 8h50 + 20min na calculadora normal dá <strong>8,70</strong> (errado!).</p>
                                        </div>
                                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                                            <strong className="text-green-400 block mb-1">O Jeito Certo:</strong>
                                            <p>Nossa ferramenta converte os minutos corretamente: 08:50 + 00:20 = <strong>09:10</strong>.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                        <Lightbulb className="w-5 h-5" />
                                        Dica de Ouro
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        O formato "8h30" é diferente de "8,5h". Se você precisa multiplicar as horas pelo valor em dinheiro (R$), use sempre o formato decimal (8,5).
                                    </p>
                                </div>

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 text-white">Exemplos de Uso</h3>
                                    <ul className="space-y-3 text-sm text-gray-400">
                                        <li className="flex gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                            <span><strong>Somar Horas:</strong> Ideal para fechar o total da semana.</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                            <span><strong>Subtrair Horas:</strong> Calcule horas trabalhadas descontando o almoço.</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                            <span><strong>Banco de Horas:</strong> Descubra seu saldo positivo ou negativo.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
