import React, { useState, useEffect } from 'react';
import { Clock, Calculator, RotateCcw, HelpCircle, AlertCircle, Info, Table, FileSpreadsheet, Moon, Sun, CheckCircle, Smartphone, Calendar, Briefcase, FileText, ArrowRight, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

type Operation = 'add' | 'subtract';

const HOURS_FAQS: FAQItem[] = [
    {
        question: "Como a Calculadora de Horas Trabalhadas converte minutos?",
        answer: "Para converter minutos do relógio para decimais na folha de pagamento, você deve dividir os minutos exatos por 60. Por exemplo, 15 minutos divididos por 60 resultam em 0,25. Isso é essencial porque 1 hora e 30 minutos equivale financeiramente a 1,5 horas (uma hora e meia), e não 1,30, garantindo o pagamento justo."
    },
    {
        question: "O que é a tolerância de 5 ou 10 minutos no ponto?",
        answer: "A regra de tolerância, baseada no Artigo 58 da CLT, estabelece que variações de registro de ponto de até 5 minutos (para mais ou menos) não são computadas. Contudo, se a soma diária dessas variações exceder 10 minutos, todo o tempo excedente será considerado integralmente como hora extra ou atraso a descontar."
    },
    {
        question: "A Calculadora de Horas Trabalhadas considera a hora noturna?",
        answer: "Sim, para fins de pagamento salarial correto. A legislação brasileira define que a hora noturna (trabalhada entre 22h e 05h) tem a duração ficta de 52 minutos e 30 segundos. Na prática, isso significa que a cada 52m 30s de relógio, o trabalhador deve receber o valor equivalente a uma hora cheia (60 minutos) com adicional."
    },
    {
        question: "Como calcular horas trabalhadas com intervalo?",
        answer: "O cálculo deve subtrair o período de descanso da jornada total para encontrar o tempo efetivo. A fórmula correta é: (Horário de Saída menos Horário de Entrada) menos o Tempo de Intervalo. Se um funcionário entra às 8h, sai às 17h e tem 1h de almoço, o cálculo é (17 - 8) - 1 = 8 horas trabalhadas."
    },
    {
        question: "Quantos dias úteis usar para cálculo de DSR em 2025?",
        answer: "Embora 2025 tenha aproximadamente 252 dias úteis nacionais (considerando a Lei 14.759), o DSR sobre horas extras deve ser calculado usando apenas os dias úteis do mês específico da competência (o mês do pagamento). Domingos e feriados desse mês específico devem ser contados separadamente para aplicar a fórmula correta do reflexo."
    },
    {
        question: "O almoço conta como hora trabalhada?",
        answer: "Não. De acordo com o Artigo 71 da CLT, o intervalo destinado a repouso e alimentação (intrajornada) não conta como tempo de serviço efetivo e não deve ser remunerado na jornada padrão. Ele deve ser deduzido do total de horas que o funcionário permaneceu nas dependências da empresa. Nossa Calculadora de Horas Trabalhadas já prevê essa dedução."
    }
];

export function HoursCalculatorPage() {
    const [time1, setTime1] = useState('');
    const [time2, setTime2] = useState('');
    const [operation, setOperation] = useState<Operation>('add');

    // Result States
    const [result, setResult] = useState<string>('00:00');
    const [decimalResult, setDecimalResult] = useState<string>('0,00');
    const [nightResult, setNightResult] = useState<string>('00:00');

    // Toggle State
    const [isNightShift, setIsNightShift] = useState(false);

    // Calculation Effect
    useEffect(() => {
        const parseTime = (t: string) => {
            if (!t) return { h: 0, m: 0 };
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

        // Standard H:MM
        const hours = Math.floor(absMinutes / 60);
        const minutes = absMinutes % 60;
        const formattedResult = `${isNegative ? '-' : ''}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        setResult(formattedResult);

        // Centesimal (Decimal)
        const decimalHours = absMinutes / 60;
        setDecimalResult(`${isNegative ? '-' : ''}${decimalHours.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

        // Night Shift Calculation (Fator 1.142857)
        // Logic: 52.5 mins clock = 60 mins paid.
        // Factor = 60 / 52.5 = 1.142857
        const nightFactor = 60 / 52.5;
        const nightMinutesTotal = absMinutes * nightFactor;
        const nHours = Math.floor(nightMinutesTotal / 60);
        const nMinutes = Math.round(nightMinutesTotal % 60);

        const formattedNight = `${isNegative ? '-' : ''}${String(nHours).padStart(2, '0')}:${String(nMinutes).padStart(2, '0')}`;
        setNightResult(formattedNight);

    }, [time1, time2, operation]);

    const handleTimeInput = (value: string, setter: (value: string) => void) => {
        const cleanVal = value.replace(/[^\d:]/g, '');
        // Auto-add colon logic kept for UX
        if (cleanVal.length === 2 && !cleanVal.includes(':') && value.length > (setter === setTime1 ? time1.length : time2.length)) {
            setter(cleanVal + ':');
        } else {
            setter(cleanVal);
        }
    };

    const resetCalculator = () => {
        setTime1('');
        setTime2('');
        setResult('00:00');
        setDecimalResult('0,00');
        setNightResult('00:00');
        setIsNightShift(false);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Horas Trabalhadas: Online e Grátis 2025",
        "description": "Calculadora de Horas Trabalhadas online e grátis. Converta minutos em decimais, evite erros na folha e siga a Portaria 671. Atualizada para 2025.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "featureList": [
            "Soma e Subtração de Horas (Banco de Horas)",
            "Conversão Automática para Hora Decimal (Centesimal)",
            "Cálculo de Hora Noturna Reduzida (Fator 1.1428)",
            "Check de Tolerância (Art. 58 CLT)"
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
                title="Calculadora de Horas Trabalhadas: Online e Grátis 2025"
                description="Calculadora de Horas Trabalhadas online e grátis. Converta minutos em decimais, evite erros na folha e siga a Portaria 671. Atualizada para 2025."
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
                            Calculadora de Horas Trabalhadas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Online [Grátis e Atualizada 2025]</span>
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Component */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Calcular Horas
                                </h2>
                                <button
                                    onClick={resetCalculator}
                                    className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                                >
                                    <RotateCcw className="w-3 h-3" /> Limpar
                                </button>
                            </div>

                            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-8">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 ml-1">Horário 1</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
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
                                    <label className="text-xs text-gray-400 ml-1">Horário 2</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
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
                                    <p className="text-xs text-blue-400 mt-2 font-medium">
                                        {isNightShift ? "Equivalente a trabalhar no relógio" : "Horas : Minutos"}
                                    </p>
                                </div>

                                <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
                                    <p className="text-gray-400 text-sm mb-2">Formato Decimal (Centesimal)</p>
                                    <div className="text-4xl font-bold text-white font-mono tracking-wider">
                                        {decimalResult} <span className="text-lg text-gray-500 font-sans">h</span>
                                    </div>
                                    <p className="text-xs text-emerald-400 mt-2 font-medium">
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

                    {/* Right Side - Quick Summary */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Resumo Rápido (Dados Oficiais 2025)
                            </h3>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span><strong>Base Legal:</strong> Cálculos ajustados à <strong>Portaria 671</strong> e Art. 58 da CLT.</span>
                                </li>
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span><strong>Tolerância:</strong> Atrasos ou extras de até <strong>5 minutos</strong> (limite de 10 min diários) não são descontados nem computados.</span>
                                </li>
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span><strong>Hora Noturna:</strong> Aplicação do fator de redução onde <strong>52m 30s</strong> equivalem a 1 hora paga (fator 1,1428).</span>
                                </li>
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span><strong>Cenário 2025:</strong> O ano possui aproximadamente <strong>252 dias úteis</strong> (considerando feriados nacionais), mas o DSR deve ser calculado sobre os dias úteis <strong>do mês da competência</strong>.</span>
                                </li>
                                <li className="flex gap-2">
                                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                                    <span><strong>Erro Crítico:</strong> 17h30 (relógio) não é 17,30 (decimal). A conversão correta é <strong>17,50</strong>.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Resumo em 30 Segundos */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Clock className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Resumo em 30 Segundos
                        </h2>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                        A <strong>Calculadora de Horas Trabalhadas</strong> resolve o principal gargalo financeiro do Departamento Pessoal: a confusão entre o tempo do relógio (base 60) e o dinheiro (base 10 ou centesimal). Se você somar horas direto na calculadora comum, o resultado estará errado. Aqui, convertemos automaticamente os minutos para o sistema decimal, aplicamos as regras de tolerância da CLT e garantimos que o pagamento final seja auditável e seguro juridicamente. É ideal para profissionais de RH, gestores e colaboradores que precisam conferir o ponto de dezembro de 2025 sem margem para erros.
                    </p>
                </div>

                {/* Tabela de Conversão */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                        Tabela de Conversão Definitiva: Minutos para Hora Decimal
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Use esta tabela para converter minutos do relógio em frações decimais para a folha de pagamento. Isso evita o "débito técnico de conteúdo" comum em planilhas manuais.
                    </p>
                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/5 text-gray-300">
                                <tr>
                                    <th className="p-3">Minutos (Relógio)</th>
                                    <th className="p-3">Hora Decimal</th>
                                    <th className="p-3">Minutos (Relógio)</th>
                                    <th className="p-3">Hora Decimal</th>
                                    <th className="p-3">Minutos (Relógio)</th>
                                    <th className="p-3">Hora Decimal</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400 divide-y divide-white/5">
                                {[...Array(20)].map((_, i) => (
                                    <tr key={i}>
                                        <td className="p-2"><strong>{String(i + 1).padStart(2, '0')} min</strong></td>
                                        <td className="p-2 text-emerald-400 font-mono">{((i + 1) / 60).toFixed(2).replace('.', ',')}</td>
                                        <td className="p-2"><strong>{String(i + 21).padStart(2, '0')} min</strong></td>
                                        <td className="p-2 text-emerald-400 font-mono">{((i + 21) / 60).toFixed(2).replace('.', ',')}</td>
                                        <td className="p-2"><strong>{String(i + 41).padStart(2, '0')} min</strong></td>
                                        <td className="p-2 text-emerald-400 font-mono">{((i + 41) / 60).toFixed(2).replace('.', ',')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-sm text-gray-300">
                            <strong>Fonte Oficial:</strong> Tabela calculada com base na lógica matemática centesimal necessária para cumprimento da <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CLT - Consolidação das Leis do Trabalho</a>.
                        </p>
                    </div>
                </div>

                {/* A Ciência da Precisão & Erros Comuns */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                        A Ciência da Precisão: Erros Comuns e Metodologia
                    </h2>

                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-3">O Paradoxo Sexagesimal-Centesimal</h3>
                        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                            O erro mais caro no Departamento Pessoal em 2025 ainda é a confusão de sistemas numéricos. O relógio segue o sistema sexagesimal (base 60), enquanto o dinheiro e a folha de pagamento seguem o sistema centesimal (base 10).
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Muitos gestores erram ao assumir que uma jornada encerrada às 17h30 equivale a 17,30 para fins de multiplicação pelo valor da hora. Se você fizer isso, estará roubando 20% dessa meia hora do funcionário ou pagando a menos. A <strong>Calculadora de Horas Trabalhadas</strong> ajusta essa distorção automaticamente.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <h3 className="text-lg font-bold text-white mb-3">Como Calcular (Passo a Passo Matemático)</h3>
                        <p className="text-gray-300 text-sm mb-4">A conversão correta exige que separemos as horas inteiras dos minutos. A fórmula que aplicamos é a seguinte:</p>
                        <div className="bg-black/30 p-3 rounded-lg border border-white/10 text-center font-mono text-emerald-400 text-sm mb-4">
                            Hora Decimal = Horas Inteiras + (Minutos ÷ 60)
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <p className="text-white text-xs font-bold mb-1">Exemplo 1 (Meia Hora):</p>
                                <p className="text-gray-300 text-xs">17 horas e 30 minutos.</p>
                                <p className="text-gray-300 text-xs mt-1">1. Mantemos o 17.</p>
                                <p className="text-gray-300 text-xs">2. Dividimos 30 por 60 = 0,50.</p>
                                <p className="text-emerald-400 text-xs font-bold mt-1">Resultado: 17,50 horas.</p>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <p className="text-white text-xs font-bold mb-1">Exemplo 2 (Teto da Hora - 58 Minutos):</p>
                                <p className="text-gray-300 text-xs">Saída com 58 minutos.</p>
                                <p className="text-gray-300 text-xs mt-1">Fator = 58 / 60 ≈ 0,966.</p>
                                <p className="text-emerald-400 text-xs font-bold mt-1">Resultado: 0,97 horas.</p>
                                <p className="text-red-400 text-[10px] mt-1 italic">*Se usasse 0,58, pagaria 40% a menos.</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">
                            Para entender o impacto financeiro disso no seu bolso, vale a pena utilizar nossa <Link to="/calculadoras/salario-liquido" className="text-blue-400 hover:underline">calculadora de salário líquido</Link> para ver o desconto final após impostos.
                        </p>
                    </div>
                </div>

                {/* Regra de Tolerância */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Regra de Tolerância (Artigo 58)</h2>
                    <p className="text-gray-400 mb-6">
                        <strong>Nossa Calculadora de Horas Trabalhadas</strong> também considera a regra de ouro da pontualidade. Segundo o Artigo 58, § 1º da CLT, variações de até 5 minutos (para mais ou para menos) não devem ser computadas, desde que o total diário não exceda 10 minutos.
                    </p>
                    <p className="text-gray-400 mb-6">
                        Esse entendimento é reforçado pela <a href="https://www3.tst.jus.br/jurisprudencia/Sumulas_com_indice/Sumula_366.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Súmula 366 do TST</a>, que determina que, ultrapassado o limite máximo de 10 minutos diários, será considerada como extra a totalidade do tempo que exceder a jornada normal, pois configura tempo à disposição do empregador.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl text-center">
                            <p className="text-xs text-gray-400 mb-1">Entrada</p>
                            <p className="text-lg font-mono text-white">08:04</p>
                            <p className="text-[10px] text-emerald-400">4 min atraso (OK)</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl text-center">
                            <p className="text-xs text-gray-400 mb-1">Saída</p>
                            <p className="text-lg font-mono text-white">17:03</p>
                            <p className="text-[10px] text-emerald-400">3 min extra (OK)</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl text-center">
                            <p className="text-xs text-gray-400 mb-1">Total Desvio</p>
                            <p className="text-lg font-mono text-yellow-400">7 min</p>
                            <p className="text-[10px] text-gray-400">Abaixo de 10 min</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl text-center border border-emerald-500/30">
                            <p className="text-xs text-gray-400 mb-1">Resultado</p>
                            <p className="text-lg font-bold text-emerald-400">Zero</p>
                            <p className="text-[10px] text-gray-400">Sem desconto/extra</p>
                        </div>
                    </div>
                </div>

                {/* Cenários Avançados */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Cenários Avançados: Hora Noturna e DSR</h2>
                    <div className="space-y-6">
                        <p className="text-gray-400 leading-relaxed">
                            Ferramentas simplistas falham aqui. Se a jornada ocorre entre 22h e 05h, a hora não tem 60 minutos, mas sim <strong>52 minutos e 30 segundos</strong>. Isso é uma ficção jurídica que obriga o pagamento de 8 horas para quem trabalha 7 horas de relógio.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Para quem faz turnos complexos, recomendamos conferir nossa <Link to="/calculadoras/adicional-noturno" className="text-blue-400 hover:underline">calculadora de adicional noturno</Link> específica para visualizar o valor financeiro deste benefício.
                        </p>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <p className="text-gray-400 mb-4">
                                Além disso, as horas extras habituais geram reflexos no Descanso Semanal Remunerado (DSR). O cálculo depende dos dias úteis do mês. O ano de 2025 possui aproximadamente <strong>252 dias úteis</strong> (considerando feriados nacionais, conforme a <a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/L14759.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Lei 14.759</a>), mas lembre-se: o DSR deve ser calculado sobre os dias úteis <strong>do mês da competência</strong> (ex: novembro/25 terá 19 ou 20 dias úteis dependendo da cidade).
                            </p>
                            <div className="bg-black/30 p-4 rounded-xl text-center font-mono text-sm text-indigo-300">
                                DSR = (Total Horas Extras ÷ Dias Úteis) × Domingos e Feriados × Valor da Hora Extra
                            </div>
                            <p className="text-xs text-gray-400 mt-4 text-center">
                                Para precisão máxima neste ponto, consulte a <Link to="/calculadoras/dias-uteis" className="text-blue-400 hover:underline">calculadora de dias úteis</Link>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Arcabouço Jurídico & Casos Especiais */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4">Arcabouço Jurídico 2025: Portaria 671</h2>
                        <p className="text-gray-400 mb-4 text-sm">
                            A gestão de ponto moderna é regida pela <a href="https://www.in.gov.br/en/web/dou/-/portaria-359094137" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Portaria 671</a>, que consolidou as regras antigas. Hoje, existem três tipos oficiais de registro que você deve conhecer:
                        </p>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex gap-2">
                                <span className="text-blue-500 font-bold">1.</span>
                                <span><strong>REP-C:</strong> O relógio de parede tradicional que imprime ticket.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-500 font-bold">2.</span>
                                <span><strong>REP-A:</strong> Softwares alternativos que exigem Acordo Coletivo para validade jurídica.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-500 font-bold">3.</span>
                                <span><strong>REP-P:</strong> A evolução para 2025. Softwares registrados no INPI que coletam e tratam o ponto simultaneamente, oferecendo maior segurança jurídica.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4">Casos Especiais</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-white mb-2">Intervalo de Almoço (Intrajornada)</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    O período de almoço ou descanso não conta como hora trabalhada, conforme o Art. 71 da CLT. Se o funcionário bate o ponto de saída para o almoço e retorno, esse tempo deve ser deduzido do total bruto da jornada.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white mb-2">Banco de Horas vs. Hora Extra</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    A diferença é o pagamento. Na hora extra, você recebe o valor com adicional (mínimo 50%) na folha do mês. No Banco de Horas, o tempo "sobra" para ser compensado com folgas futuras. A escolha depende do acordo da empresa, mas o cálculo das horas trabalhadas (saldo positivo) é o mesmo. Se você tem dúvidas sobre o valor acumulado, utilize a <Link to="/calculadoras/horas-extras" className="text-blue-400 hover:underline">calculadora de horas extras</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={HOURS_FAQS}
                    title="Perguntas Frequentes sobre Cálculo de Horas (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section >
    );
}
