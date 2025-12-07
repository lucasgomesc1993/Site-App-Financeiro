import React, { useState, useEffect } from 'react';
import { Clock, Calculator, RotateCcw, HelpCircle, AlertCircle, Info, Table, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

type Operation = 'add' | 'subtract';

const HOURS_FAQS: FAQItem[] = [
    {
        question: "Quantas horas tem um mês de trabalho?",
        answer: "Para a maioria dos trabalhadores CLT (44h semanais), o divisor padrão é 220 horas mensais. Porém, para cálculos exatos de produtividade em meses com muitos feriados, recomenda-se usar a calculadora de dias úteis para obter o número real de horas disponíveis naquele mês específico."
    },
    {
        question: "O que acontece com os minutos quebrados na folha de ponto?",
        answer: "Pela Lei (Art. 58 da CLT), variações de até 5 minutos (para mais ou para menos) no registro de ponto não são computadas como atraso ou hora extra, desde que o total diário não exceda 10 minutos. Acima disso, conta-se a totalidade do tempo."
    },
    {
        question: "Como calcular horas noturnas?",
        answer: "A hora noturna (trabalho entre 22h e 05h) é reduzida por lei. Ela dura 52 minutos e 30 segundos, mas conta como se fosse 1 hora cheia para fins de pagamento. Ou seja, 7 horas no relógio durante a noite equivalem a 8 horas na folha de pagamento."
    },
    {
        question: "Como calcular o valor da minha hora de trabalho?",
        answer: "Basta dividir seu salário base pelo divisor mensal da sua jornada (geralmente 220). Exemplo: Salário de R$ 3.000,00 ÷ 220 = R$ 13,63 por hora. Saber isso é essencial antes de calcular uma rescisão ou negociar aumentos."
    }
];

export function HoursCalculatorPage() {
    const [time1, setTime1] = useState('');
    const [time2, setTime2] = useState('');
    const [operation, setOperation] = useState<Operation>('add');
    const [result, setResult] = useState<string>('00:00');
    const [decimalResult, setDecimalResult] = useState<string>('0.00');

    const calculateTime = () => {
        if (!time1 || !time2) {
            // Se estiver vazio, talvez resetar ou manter estado anterior?
            // Vamos manter o que tem ou zerar se ambos vazios
            if (!time1 && !time2) {
                setResult('00:00');
                setDecimalResult('0.00');
            }
            return;
        }

        const parseTime = (t: string) => {
            const parts = t.split(':');
            // Handle cases like "8" -> "8:00" or "8:30"
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
        // Fix: user complained about 8h48min not being 8.8h if not calculated right. 48/60 = 0.8.
        const decimalHours = absMinutes / 60;
        setDecimalResult(`${isNegative ? '-' : ''}${decimalHours.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    };

    useEffect(() => {
        calculateTime();
    }, [time1, time2, operation]);

    const handleTimeInput = (value: string, setter: (value: string) => void) => {
        // Remove caracteres não numéricos exceto :
        const cleanVal = value.replace(/[^\d:]/g, '');

        // Auto-insert colon logic better handled
        // If typing 2 digits, add colon automatically?
        // Let's keep it simple: just limit chars and update
        // If user types '08' we can add ':' if we want, but it can be annoying on backspace.
        // Let's simulate the previous logic of auto-colon
        if (cleanVal.length === 2 && !cleanVal.includes(':') && value.length > (setter === setTime1 ? time1.length : time2.length)) {
            setter(cleanVal + ':');
        } else {
            setter(cleanVal);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Horas: Somar, Subtrair e Converter",
        "description": "Ferramenta gratuita para calcular horas trabalhadas, somar banco de horas e converter minutos para decimal. Aprenda também a fazer o cálculo no Excel.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "featureList": [
            "Soma e Subtração de Horas (Banco de Horas)",
            "Conversão Automática para Hora Decimal (Centesimal)",
            "Cálculo de Horas Negativas e Positivas",
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
                title="Calculadora de Horas: Somar, Subtrair e Converter (Online e Grátis)"
                description="Ferramenta gratuita para calcular horas trabalhadas, somar banco de horas e converter minutos para decimal. Aprenda também a fazer o cálculo no Excel."
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

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Horas: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Somar, Subtrair e Converter</span>
                        </h1>
                        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
                            Calcule seu banco de horas, some jornadas e converta minutos para horas decimais automaticamente.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Calcular Horas
                                </h2>
                                <button
                                    onClick={() => { setTime1(''); setTime2(''); setResult('00:00'); setDecimalResult('0.00'); }}
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

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                                    <p className="text-gray-400 text-sm mb-2">Formato Relógio</p>
                                    <div className="text-4xl font-bold text-white font-mono tracking-wider">
                                        {result}
                                    </div>
                                    <p className="text-xs text-blue-400/60 mt-2 font-medium">
                                        Horas : Minutos
                                    </p>
                                </div>

                                <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
                                    <p className="text-gray-400 text-sm mb-2">Formato Decimal (Centesimal)</p>
                                    <div className="text-4xl font-bold text-white font-mono tracking-wider">
                                        {decimalResult} <span className="text-lg text-gray-500 font-sans">h</span>
                                    </div>
                                    <p className="text-xs text-emerald-400/60 mt-2 font-medium">
                                        Ideal para Folha de Pagamento
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-200/80 leading-relaxed">
                                    <strong>Dica:</strong> Para calcular o <strong>valor</strong> dessas horas no seu salário, multiplique o resultado decimal ({decimalResult}h) pelo valor da sua hora de trabalho.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Table & Conversion */}
                    <div className="lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                    <Table className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h2 className="text-xl font-bold text-white leading-tight mt-1">
                                    Tabela de Conversão Rápida
                                </h2>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">
                                Minutos do relógio (Sexagesimal) vs Hora Decimal (Centesimal). Use esta tabela para conferir seu holerite.
                            </p>

                            <div className="overflow-hidden rounded-xl border border-white/10">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-3 text-white">Minutos (Relógio)</th>
                                            <th className="p-3 text-white text-right">Decimal (Folha)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-gray-400">
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">15 minutos</td>
                                            <td className="p-3 text-right font-mono text-emerald-400">0,25</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">20 minutos</td>
                                            <td className="p-3 text-right font-mono text-emerald-400">0,33</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">30 minutos</td>
                                            <td className="p-3 text-right font-mono text-emerald-400">0,50</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">45 minutos</td>
                                            <td className="p-3 text-right font-mono text-emerald-400">0,75</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-3">50 minutos</td>
                                            <td className="p-3 text-right font-mono text-emerald-400">0,83</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/5">
                                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                                    <Calculator className="w-4 h-4 text-gray-400" />
                                    Cálculo Manual
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Divida os minutos por 60.<br />
                                    <span className="italic text-gray-500">Ex: 48 min ÷ 60 = 0,8 (Logo, 8h48 = 8,8h)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 text-center mb-12">
                    <p>
                        <strong>Calcular horas exige converter o sistema sexagesimal (relógio) para centesimal (decimal) antes de realizar qualquer operação matemática.</strong> Tentar somar minutos como se fossem números inteiros é a causa número um de erros em folhas de pagamento.
                    </p>
                    <p>
                        Nossa ferramenta resolve esse problema automaticamente. Seja para conferir seu holerite ou para empreendedores que precisam calcular o tempo de produção para atingir o <Link to="/calculadoras/ponto-de-equilibrio" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30">ponto de equilíbrio</Link>, a precisão aqui é garantida.
                    </p>
                </div>

                {/* Passo a Passo */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Clock className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como calcular horas trabalhadas: Passo a Passo
                        </h2>
                    </div>
                    <div className="space-y-6 text-gray-400 leading-relaxed">
                        <p>
                            O cálculo manual consiste na subtração do horário de saída pelo de entrada, descontando o intervalo. Para realizar essa conta sem erros, siga este roteiro de 4 passos:
                        </p>

                        <div className="grid md:grid-cols-4 gap-4">
                            {[
                                { step: 1, title: "Converta tudo", text: "Trabalhar com uma única unidade (minutos) evita confusão." },
                                { step: 2, title: "Subtraia", text: "Entrada menos Saída. O resultado é o total bruto em minutos." },
                                { step: 3, title: "Desconte", text: "Subtraia o tempo de almoço para obter a jornada líquida." },
                                { step: 4, title: "Reconverta", text: "Divida o resultado final por 60 para ter as horas." }
                            ].map((item) => (
                                <div key={item.step} className="bg-white/5 p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                                    <span className="absolute -top-4 -right-4 text-6xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors">
                                        {item.step}
                                    </span>
                                    <h3 className="text-white font-bold mb-2 relative z-10">{item.title}</h3>
                                    <p className="text-xs text-gray-400 relative z-10">{item.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-blue-500/5 rounded-2xl p-6 border border-blue-500/10">
                            <h3 className="text-lg font-semibold text-white mb-4">Exemplo Prático (Jornada Diária)</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Dia comum: Entrada 08:00, Saída 17:48 com 1h de almoço.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-3 text-white">Etapa</th>
                                            <th className="p-3 text-white">Cálculo</th>
                                            <th className="p-3 text-white">Resultado Parcial</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400">
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 font-medium text-white">Manhã</td>
                                            <td className="p-3">12:00 - 08:00</td>
                                            <td className="p-3">4 horas</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 font-medium text-white">Tarde</td>
                                            <td className="p-3">17:48 - 13:00</td>
                                            <td className="p-3">4 horas e 48 minutos</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-medium text-white">Soma</td>
                                            <td className="p-3">4h + 4h + 48min</td>
                                            <td className="p-3 font-bold text-blue-400">8 horas e 48 minutos</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-4 flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-yellow-200/80 leading-relaxed">
                                <strong>Atenção:</strong> Erros no registro de ponto geram descontos indevidos que têm <Link to="/calculadoras/salario-liquido" className="text-yellow-400 hover:text-yellow-300 underline decoration-yellow-400/30">impacto no salário líquido</Link>. Monitore sempre se sua jornada cumpre as 44 horas semanais.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Excel Section */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                            <FileSpreadsheet className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como calcular horas no Excel (Dica Avançada)
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-gray-400 mb-4 leading-relaxed">
                                Se você controla seu banco de horas no Excel, já deve ter notado que a planilha "zera" a contagem quando a soma passa de 24 horas. Isso acontece porque o formato padrão entende que mudou o dia.
                            </p>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Para somar horas acumuladas corretamente no Excel, siga este ajuste técnico:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Clique com o botão direito na célula ou coluna de totais.",
                                    "Selecione 'Formatar Células'.",
                                    "Vá na aba 'Número' e escolha a categoria 'Personalizado'.",
                                    "No campo 'Tipo', digite exatamente: [h]:mm"
                                ].map((step, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-emerald-500 border border-white/10">
                                            {i + 1}
                                        </span>
                                        <span className="mt-1">{step}</span>
                                    </li>
                                ))}
                            </ul>
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
                    title="Perguntas Frequentes sobre Cálculo de Horas (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">Seu saldo de horas foi positivo?</h3>
                    <p className="text-gray-400 mb-4 max-w-2xl mx-auto">
                        Não deixe esse dinheiro na mesa. Use agora nossa Calculadora de Horas Extras para saber exatamente quanto você deve receber a mais no final do mês.
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
