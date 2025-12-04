import React, { useState } from 'react';
import { Calendar, ArrowLeft, CheckCircle, XCircle, HelpCircle, Lightbulb, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';

export function BusinessDaysPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [includeStart, setIncludeStart] = useState(false);
    const [result, setResult] = useState<{ businessDays: number; totalDays: number; holidays: string[] } | null>(null);

    // Helper to format date as YYYY-MM-DD for input
    const formatDateForInput = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    // Helper to calculate Easter Sunday for a given year
    const getEasterSunday = (year: number) => {
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(year, month - 1, day);
    };

    // Helper to add days to a date
    const addDays = (date: Date, days: number) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    // Helper to check if a date is a holiday
    const getHolidayName = (date: Date): string | null => {
        const day = date.getDate();
        const month = date.getMonth(); // 0-indexed
        const year = date.getFullYear();

        // Fixed Holidays
        if (day === 1 && month === 0) return 'Confraternização Universal';
        if (day === 21 && month === 3) return 'Tiradentes';
        if (day === 1 && month === 4) return 'Dia do Trabalho';
        if (day === 7 && month === 8) return 'Independência do Brasil';
        if (day === 12 && month === 9) return 'Nossa Senhora Aparecida';
        if (day === 2 && month === 10) return 'Finados';
        if (day === 15 && month === 10) return 'Proclamação da República';
        if (day === 25 && month === 11) return 'Natal';

        // Movable Holidays
        const easter = getEasterSunday(year);
        const carnival = addDays(easter, -47);
        const goodFriday = addDays(easter, -2);
        const corpusChristi = addDays(easter, 60);

        const checkMovable = (target: Date, name: string) => {
            return target.getDate() === day && target.getMonth() === month ? name : null;
        };

        if (checkMovable(carnival, 'Carnaval')) return 'Carnaval';
        if (checkMovable(goodFriday, 'Sexta-feira Santa')) return 'Sexta-feira Santa';
        if (checkMovable(corpusChristi, 'Corpus Christi')) return 'Corpus Christi';

        return null;
    };

    const calculateDays = () => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate + 'T00:00:00'); // Force local time
        const end = new Date(endDate + 'T00:00:00');

        if (start > end) {
            alert('A data inicial deve ser anterior à data final.');
            return;
        }

        let current = new Date(start);
        // If not including start date, start counting from the next day
        if (!includeStart) {
            current.setDate(current.getDate() + 1);
        }

        let businessDaysCount = 0;
        let totalDaysCount = 0;
        const holidaysFound: string[] = [];

        // Calculate total calendar days first (inclusive of end date)
        const diffTime = Math.abs(end.getTime() - start.getTime());
        totalDaysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // Logic check: if start=end, diff is 0. If includeStart, total should be 1.
        if (includeStart && start.getTime() === end.getTime()) totalDaysCount = 1;
        else if (!includeStart && start.getTime() === end.getTime()) totalDaysCount = 0;
        // The prompt implies a range calculation. Let's stick to the iteration for accuracy.

        // Reset for iteration
        current = new Date(start);
        if (!includeStart) {
            current.setDate(current.getDate() + 1);
        }

        // Iterate until end date (inclusive)
        while (current <= end) {
            const dayOfWeek = current.getDay(); // 0 = Sunday, 6 = Saturday
            const holiday = getHolidayName(current);

            if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holiday) {
                businessDaysCount++;
            }

            if (holiday) {
                const formattedDate = current.toLocaleDateString('pt-BR');
                if (!holidaysFound.includes(`${formattedDate} - ${holiday}`)) {
                    holidaysFound.push(`${formattedDate} - ${holiday}`);
                }
            }

            current.setDate(current.getDate() + 1);
        }

        // Recalculate total days simply as difference in days
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));

        setResult({
            businessDays: businessDaysCount,
            totalDays: diffDays,
            holidays: holidaysFound
        });
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-primary/20 selection:text-primary">
            <SEO
                title="Calculadora de Dias Úteis Online - Contagem com Feriados"
                description="Precisa calcular um prazo? Conte os dias úteis entre duas datas, excluindo automaticamente fins de semana e feriados nacionais. Ideal para prazos bancários e judiciais."
                canonical="/calculadoras/dias-uteis"
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
                                <Calendar className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Calculadora de Dias Úteis
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Conte prazos excluindo fins de semana e feriados nacionais.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-8">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-primary" />
                                        Período
                                    </h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Data Inicial
                                            </label>
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Data Final
                                            </label>
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 py-2">
                                            <button
                                                onClick={() => setIncludeStart(!includeStart)}
                                                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${includeStart ? 'bg-primary border-primary' : 'bg-[#0a0a0a] border-white/20'}`}
                                            >
                                                {includeStart && <CheckCircle className="w-4 h-4 text-black" />}
                                            </button>
                                            <span className="text-sm text-gray-400 cursor-pointer" onClick={() => setIncludeStart(!includeStart)}>
                                                Incluir data inicial na contagem?
                                            </span>
                                        </div>

                                        <button
                                            onClick={calculateDays}
                                            className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 mt-4"
                                        >
                                            Calcular Dias Úteis
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {result && (
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 animate-fade-in">
                                        <h3 className="text-lg font-semibold text-white mb-6">Resultado</h3>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5 text-center">
                                                <p className="text-sm text-gray-400 mb-1">Dias Úteis</p>
                                                <p className="text-3xl font-bold text-primary">{result.businessDays}</p>
                                            </div>
                                            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5 text-center">
                                                <p className="text-sm text-gray-400 mb-1">Dias Corridos</p>
                                                <p className="text-3xl font-bold text-white">{result.totalDays}</p>
                                            </div>
                                        </div>

                                        {result.holidays.length > 0 ? (
                                            <div>
                                                <p className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                                                    <XCircle className="w-4 h-4 text-red-400" />
                                                    Feriados no período:
                                                </p>
                                                <ul className="space-y-2">
                                                    {result.holidays.map((holiday, index) => (
                                                        <li key={index} className="text-sm text-gray-400 bg-[#0a0a0a] px-3 py-2 rounded-lg border border-white/5">
                                                            {holiday}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">Nenhum feriado nacional neste período.</p>
                                        )}
                                    </div>
                                )}

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-primary" />
                                        Como funciona?
                                    </h3>
                                    <div className="space-y-4 text-gray-400 text-sm">
                                        <p>
                                            <strong>Intervalo:</strong> Calculamos a diferença entre as datas.
                                        </p>
                                        <p>
                                            <strong>Fins de Semana:</strong> Excluímos sábados e domingos.
                                        </p>
                                        <p>
                                            <strong>Feriados:</strong> Descontamos feriados nacionais fixos e móveis (Carnaval, Páscoa, Corpus Christi).
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                        <Lightbulb className="w-5 h-5" />
                                        Dica Importante
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        Esta calculadora considera apenas feriados nacionais. Feriados estaduais ou municipais não são descontados automaticamente. Para contagens locais específicas, subtraia esses dias manualmente.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold mb-4 text-white">Dúvidas Frequentes</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <h3 className="font-semibold text-white mb-2">O sábado conta como dia útil?</h3>
                                        <p className="text-sm text-gray-400">
                                            Depende. Para pagamentos bancários, não. Para prazos trabalhistas (CLT), sim. Nossa calculadora segue a regra bancária (exclui sábado).
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <h3 className="font-semibold text-white mb-2">A calculadora inclui o dia do início?</h3>
                                        <p className="text-sm text-gray-400">
                                            Por padrão, não (regra de prazos). Mas você pode marcar a opção "Incluir data inicial" se desejar contar o primeiro dia.
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
