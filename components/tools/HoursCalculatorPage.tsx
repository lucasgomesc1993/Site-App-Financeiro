import React, { useState, useEffect } from 'react';
import { Clock, Calculator, RotateCcw, HelpCircle, AlertCircle, Info, Table, FileSpreadsheet, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

type Operation = 'add' | 'subtract';

const HOURS_FAQS: FAQItem[] = [
    {
        question: "Como transformar minutos em hora decimal na calculadora?",
        answer: "Para transformar minutos em hora decimal (centesimal), divida os minutos por 60. Exemplo: 30 minutos divididos por 60 é igual a 0,50. Se tiver 1h30min, o valor decimal é 1,5. Nunca use a vírgula apenas para separar os minutos (1,30 está incorreto)."
    },
    {
        question: "Qual a tolerância de atraso permitida pela CLT em 2025?",
        answer: "A tolerância é de 5 minutos na entrada e 5 minutos na saída, respeitando o limite máximo de 10 minutos diários (Art. 58, § 1º da CLT). Se passar desse limite (ex: 11 minutos), todo o tempo deve ser computado como atraso ou hora extra, e não apenas o excedente."
    },
    {
        question: "Qual o limite máximo de horas extras por dia?",
        answer: "Pela regra geral do Artigo 59 da CLT, o limite é de 2 horas suplementares por dia. A jornada total (normal + extra) não deve ultrapassar 10 horas diárias. Exceções a esse limite só são permitidas em casos de necessidade imperiosa ou força maior (serviços inadiáveis), devidamente justificados, podendo chegar a 12 horas totais em situações críticas."
    },
    {
        question: "Como funciona o cálculo da hora noturna reduzida?",
        answer: "A hora noturna (22h às 05h) tem apenas 52 minutos e 30 segundos. Na prática, para cada 52,5 minutos trabalhados no relógio, a empresa paga o equivalente a 60 minutos. Multiplique as horas relógio por 1,1428 para encontrar a quantidade de horas a pagar."
    },
    {
        question: "O almoço conta como hora trabalhada?",
        answer: "Não. O intervalo intrajornada (almoço) não é computado na duração do trabalho, conforme Art. 71 da CLT. Se você trabalha das 08h às 17h com 1h de almoço, sua jornada computada é de 8 horas, não 9. Utilize nossa ferramenta de dias úteis para planejar escalas mensais corretamente."
    }
];

export function HoursCalculatorPage() {
    const [time1, setTime1] = useState('');
    const [time2, setTime2] = useState('');
    const [operation, setOperation] = useState<Operation>('add');
    const [result, setResult] = useState<string>('00:00');
    const [decimalResult, setDecimalResult] = useState<string>('0.00');
    const [nightResult, setNightResult] = useState<string>('00:00');
    const [isNightShift, setIsNightShift] = useState(false);

    const calculateTime = () => {
        if (!time1 && !time2) {
            setResult('00:00');
            setDecimalResult('0.00');
            setNightResult('00:00');
            return;
        }

        const parseTime = (t: string) => {
            const parts = t.split(':');
            let h = 0, m = 0;
            if (parts.length === 1) {
                h = parseInt(parts[0]) || 0;
            } else {
                h = parseInt(parts[0]) || 0;
                m = parseInt(parts[1]) || 0;
            }
            return { h, m };
        };

        const t1 = parseTime(time1);
        const t2 = parseTime(time2);

        const totalMinutes1 = t1.h * 60 + t1.m;
        const totalMinutes2 = t2.h * 60 + t2.m;

        let finalMinutes;
        if (operation === 'add') {
            finalMinutes = totalMinutes1 + totalMinutes2;
        } else {
            finalMinutes = totalMinutes1 - totalMinutes2;
        }

        const isNegative = finalMinutes < 0;
        const absMinutes = Math.abs(finalMinutes);

        const hours = Math.floor(absMinutes / 60);
        const minutes = absMinutes % 60;

        const formattedResult = `${isNegative ? '-' : ''}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        setResult(formattedResult);

        // Centesimal (Decimal) calculation
        const decimalHours = absMinutes / 60;
        setDecimalResult(`${isNegative ? '-' : ''}${decimalHours.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

        // Night Shift Calculation (Fator 1.142857)
        // 52.5 minutes = 1 night hour.
        // Ratio = 60 / 52.5 = 1.142857
        const nightFactor = 60 / 52.5;
        const nightMinutesTotal = absMinutes * nightFactor;
        const nHours = Math.floor(nightMinutesTotal / 60);
        const nMinutes = Math.round(nightMinutesTotal % 60);

        const formattedNight = `${isNegative ? '-' : ''}${String(nHours).padStart(2, '0')}:${String(nMinutes).padStart(2, '0')}`;
        setNightResult(formattedNight);
    };

    useEffect(() => {
        calculateTime();
    }, [time1, time2, operation]);

    const handleTimeInput = (value: string, setter: (value: string) => void) => {
        const cleanVal = value.replace(/[^\d:]/g, '');
        if (cleanVal.length === 2 && !cleanVal.includes(':') && value.length > (setter === setTime1 ? time1.length : time2.length)) {
            setter(cleanVal + ':');
        } else {
            setter(cleanVal);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Horas Trabalhadas e Centesimais (Online 2025)",
        "description": "Converta horas em centesimais para folha 2025. Calcule extras e noturna (52min30s) com precisão. Regras CLT, tolerância de 5min e tabela oficial.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "featureList": [
            "Soma e Subtração de Horas (Banco de Horas)",
            "Conversão Automática para Hora Decimal (Centesimal)",
            "Cálculo de Hora Noturna Reduzida (Fator 1.1428)",
            "Tabela de Equivalência Minutos vs Decimal"
        ],
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        }
    };

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Calculadora de Horas Trabalhadas e Centesimais (Online 2025)"
                description="Converta horas em centesimais para folha 2025. Calcule extras e noturna (52min30s) com precisão. Regras CLT, tolerância de 5min e tabela oficial."
                canonical="/calculadoras/horas"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": HOURS_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de Horas', href: '/calculadoras/horas' }
                    ]} />

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Departamento Pessoal 2025</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Horas Trabalhadas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">e Horas Centesimais (2025)</span>
                        </h1>
                        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
                            Converta horas em decimais, calcule banco de horas e aplique a redução de hora noturna (52m30s) automaticamente. Tudo atualizado para 2025.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Calcular Horas
                                </h2>
                                <button
                                    onClick={() => { setTime1(''); setTime2(''); setResult('00:00'); setDecimalResult('0.00'); setNightResult('00:00'); setIsNightShift(false); }}
                                    className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                                >
                                    <RotateCcw className="w-3 h-3" /> Limpar
                                </button>
                            </div>

                            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-8">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 ml-1">Horário 1</label>
                                    <input
                                        type="text"
                                        value={time1}
                                        onChange={(e) => handleTimeInput(e.target.value, setTime1)}
                                        placeholder="08:00"
                                        maxLength={5}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-2xl font-mono text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 pt-6">
                                    <button
                                        onClick={() => setOperation('add')}
                                        className={`p-2 rounded-lg transition-all ${operation === 'add' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
                                        aria-label="Somar"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => setOperation('subtract')}
                                        className={`p-2 rounded-lg transition-all ${operation === 'subtract' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
                                        aria-label="Subtrair"
                                    >
                                        -
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 ml-1">Horário 2</label>
                                    <input
                                        type="text"
                                        value={time2}
                                        onChange={(e) => handleTimeInput(e.target.value, setTime2)}
                                        placeholder="01:00"
                                        maxLength={5}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-2xl font-mono text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                                    />
                                </div>
                            </div>

                            <div className="mb-6 flex items-center justify-center">
                                <button
                                    onClick={() => setIsNightShift(!isNightShift)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isNightShift ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10'}`}
                                >
                                    {isNightShift ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                    Ver Hora Noturna (Reduzida)
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                                    <p className="text-gray-400 text-sm mb-2">
                                        {isNightShift ? "Hora Noturna (Ficta)" : "Formato Relógio"}
                                    </p>
                                    <div className={`text-4xl font-bold text-white font-mono tracking-wider ${isNightShift ? 'text-indigo-400' : ''}`}>
                                        {isNightShift ? nightResult : result}
                                    </div>
                                    <p className="text-xs text-blue-400/60 mt-2 font-medium">
                                        {isNightShift ? "Equivalente a trabalhar no relógio" : "Horas : Minutos"}
                                    </p>
                                </div>

                                <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
                                    <p className="text-gray-400 text-sm mb-2">Formato Decimal (Centesimal)</p>
                                    <div className="text-4xl font-bold text-white font-mono tracking-wider">
                                        {decimalResult} <span className="text-lg text-gray-500 font-sans">h</span>
                                    </div>
                                    <p className="text-xs text-emerald-400/60 mt-2 font-medium">
                                        Multiplique este valor pelo salário-hora
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-200/80 leading-relaxed">
                                    <strong>Dica:</strong> Para calcular o <strong>valor</strong> em dinheiro, sempre use o resultado decimal ({decimalResult}h). Multiplicar minutos (ex: 0,30) pelo salário gera prejuízo.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Table & Conversion */}
                    <div className="lg:col-span-5 h-full">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                    <Table className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h2 className="text-xl font-bold text-white leading-tight mt-1">
                                    Tabela de Conversão: Minutos para Hora Centesimal (Folha)
                                </h2>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">
                                Minutos do relógio (Sexagesimal) vs Hora Decimal (Centesimal).
                            </p>

                            <div className="overflow-hidden rounded-xl border border-white/10">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-3 text-white">Minutos</th>
                                            <th className="p-3 text-white text-right">Decimal</th>
                                            <th className="p-3 text-white text-right sm:table-cell hidden">Lógica</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-gray-400">
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">00:06</td>
                                            <td className="p-3 text-right font-mono text-emerald-400">0,10</td>
                                            <td className="p-3 text-right text-xs sm:table-cell hidden">6 ÷ 60</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">00:12</td>
                                            <td className="p-3 text-right font-mono text-emerald-400">0,20</td>
                                            <td className="p-3 text-right text-xs sm:table-cell hidden">12 ÷ 60</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">00:15</td>
                                            <td className="p-3 text-right font-mono text-emerald-400">0,25</td>
                                            <td className="p-3 text-right text-xs sm:table-cell hidden">1/4 hora</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">00:30</td>
                                            <td className="p-3 text-right font-mono text-emerald-400">0,50</td>
                                            <td className="p-3 text-right text-xs sm:table-cell hidden">1/2 hora</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">00:45</td>
                                            <td className="p-3 text-right font-mono text-emerald-400">0,75</td>
                                            <td className="p-3 text-right text-xs sm:table-cell hidden">3/4 hora</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">00:52:30</td>
                                            <td className="p-3 text-right font-mono text-indigo-400">0,875</td>
                                            <td className="p-3 text-right text-xs sm:table-cell hidden">1h Noturna</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">01:00</td>
                                            <td className="p-3 text-right font-mono text-emerald-400">1,00</td>
                                            <td className="p-3 text-right text-xs sm:table-cell hidden">Hora cheia</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/5">
                                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                                    <Calculator className="w-4 h-4 text-gray-400" />
                                    Fórmula de Conversão
                                </h3>
                                <p className="text-sm text-gray-400 font-mono bg-black/30 p-2 rounded-lg border border-white/5 text-center">
                                    Hora Decimal = Horas + (Minutos ÷ 60)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumo Rápido */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 mb-12">
                    <h2 className="text-xl font-bold text-white mb-6">Resumo Rápido (Dados Oficiais 2025)</h2>
                    <ul className="space-y-3 text-gray-400">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                            <span><strong>Jornada Padrão:</strong> Limite de 8 horas diárias e 44 semanais (Art. 58 CLT).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                            <span><strong>Tolerância de Ponto:</strong> Variações de até 5 minutos (máximo 10 min diários) não são computadas.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                            <span><strong>Hora Noturna:</strong> Das 22h às 05h, a hora equivale a <strong>52 minutos e 30 segundos</strong> (Fator 1,1428).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                            <span><strong>Conversão Centesimal:</strong> Essencial para multiplicar o tempo pelo valor do salário (ex: 30 minutos = 0,50 hora).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 shrink-0"></span>
                            <span><strong>Atualização:</strong> Regras vigentes para fechamento de folha em <strong>Dezembro de 2025</strong>.</span>
                        </li>
                    </ul>
                </div>

                {/* O Erro Invisível */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4">O Erro Invisível: Sexagesimal vs. Centesimal</h2>
                        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                            A maioria dos erros em pagamentos e <Link to="/calculadoras/custo-funcionario" className="text-blue-400 hover:text-blue-300 underline">custo de funcionário</Link> nasce de uma falha matemática simples. O tempo é medido em <strong>base sexagesimal</strong> (1h = 60min), enquanto o dinheiro opera em <strong>base centesimal</strong> (1 Real = 100 centavos).
                        </p>
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                            <strong className="text-red-300 block mb-2">O Prejuízo do Erro (Exemplo):</strong>
                            <p className="text-sm text-gray-300 mb-2">Funcionário ganha R$ 100/h e faz 1h30min extra.</p>
                            <ul className="text-sm space-y-1">
                                <li className="text-red-400">❌ Errado: 1,30 x 100 = R$ 130,00</li>
                                <li className="text-emerald-400">✅ Correto: 1,50 x 100 = R$ 150,00</li>
                            </ul>
                            <p className="text-xs text-gray-500 mt-2">Diferença de R$ 20,00 (13%) perdida.</p>
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4">A "Mágica" da Hora Noturna</h2>
                        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                            Se o trabalho ocorre entre 22h e 05h (trabalhador urbano), a hora não tem 60 minutos, mas sim <strong>52 minutos e 30 segundos</strong> (Art. 73 da CLT).
                        </p>
                        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                            Não precisa somar minuto a minuto. Basta multiplicar o tempo de relógio por <strong>1,142857</strong>.
                        </p>
                        <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
                            <strong className="text-indigo-300 block mb-2">Exemplo Real:</strong>
                            <p className="text-sm text-gray-300 mb-2">Trabalho das 22:00 às 05:00 (7 horas no relógio).</p>
                            <ul className="text-sm space-y-1">
                                <li className="text-indigo-300">Cálculo: 7 x 1,142857 = 8 horas pagas</li>
                            </ul>
                            <p className="text-xs text-gray-500 mt-2">O trabalhador recebe por 8 horas + 20% de <Link to="/calculadoras/adicional-noturno" className="text-indigo-400 hover:text-indigo-300 underline">adicional noturno</Link>.</p>
                        </div>
                    </div>
                </div>

                {/* Exemplos Práticos */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 mb-12">
                    <h2 className="text-xl font-bold text-white mb-6">Exemplos Práticos de Cálculo (2025)</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <h3 className="text-white font-semibold mb-2">Exemplo A: Salário Alto (R$ 8.000,00)</h3>
                            <p className="text-xs text-gray-400 mb-2">Gerente trabalhou 8 horas e 48 minutos no feriado.</p>
                            <ul className="text-sm space-y-1 text-gray-300">
                                <li><strong>1. Conversão:</strong> 48 min ÷ 60 = 0,8. Tempo: 8,8h.</li>
                                <li><strong>2. Valor Hora (100%):</strong> R$ 36,36 x 2 = R$ 72,72.</li>
                                <li><strong>3. Cálculo:</strong> 8,8 x 72,72 = <span className="text-emerald-400 font-bold">R$ 639,93</span>.</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <h3 className="text-white font-semibold mb-2">Exemplo B: Salário Mínimo 2025 (R$ 1.518,00)</h3>
                            <p className="text-xs text-gray-400 mb-2">Funcionário (R$ 6,90/h) fez 45 minutos extras.</p>
                            <ul className="text-sm space-y-1 text-gray-300">
                                <li><strong>1. Conversão:</strong> 45 min ÷ 60 = 0,75h.</li>
                                <li><strong>2. Valor Hora (50%):</strong> R$ 6,90 + 50% = R$ 10,35.</li>
                                <li><strong>3. Cálculo:</strong> 0,75 x 10,35 = <span className="text-emerald-400 font-bold">R$ 7,76</span>.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Excel Section */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-24">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                            <FileSpreadsheet className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como calcular horas no Excel (Solução Técnica)
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-gray-400 mb-4 text-sm">
                                O Excel padrão usa o sistema de datas de 1900, que não reconhece tempo negativo (ex: saldo devedor de banco de horas).
                            </p>
                            <div className="space-y-4">
                                <p className="text-white font-medium text-sm">Como resolver (Hack para Usuários Avançados):</p>
                                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-400">
                                    <li>Vá em <strong>Arquivo `{'>'}` Opções `{'>'}` Avançado</strong>.</li>
                                    <li>Role até a seção "Ao calcular esta pasta de trabalho".</li>
                                    <li>Marque a caixa <strong>"Usar sistema de data 1904"</strong>.</li>
                                </ol>
                                <p className="text-white font-medium text-sm mt-4">Para somar acima de 24h:</p>
                                <p className="text-sm text-gray-400">Use a formatação personalizada: <code className="bg-white/10 px-1 rounded text-emerald-400">[h]:mm</code></p>
                            </div>
                        </div>
                        <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-2 mb-4 text-emerald-400 text-sm font-medium">
                                <Info className="w-4 h-4" />
                                O Segredo dos Colchetes
                            </div>
                            <div className="space-y-4">
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                    <p className="text-xs text-red-300 mb-1">Sem formatação (h:mm)</p>
                                    <p className="text-xl font-mono text-red-400">02:00</p>
                                    <p className="text-[10px] text-gray-500">(O Excel zerou 26 horas)</p>
                                </div>
                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                    <p className="text-xs text-emerald-300 mb-1">Com formatação ([h]:mm)</p>
                                    <p className="text-xl font-mono text-emerald-400">26:00</p>
                                    <p className="text-[10px] text-gray-500">(Contagem correta de horas acumuladas)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={HOURS_FAQS}
                    title="Perguntas Frequentes (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">Seu saldo de horas foi positivo?</h3>
                    <p className="text-gray-400 mb-4 max-w-2xl mx-auto">
                        Não deixe esse dinheiro na mesa. Use agora nossa Calculadora de Horas Extras para saber exatamente quanto você deve receber a mais.
                    </p>
                    <Link
                        to="/calculadoras/horas-extras"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all shadow-lg shadow-blue-500/20 transform hover:-translate-y-1"
                    >
                        Calcular Horas Extras
                    </Link>
                </div>

                <AppPromoBanner />
            </div>
        </section >
    );
}
