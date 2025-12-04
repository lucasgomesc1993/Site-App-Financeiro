import React, { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, RotateCcw, Lightbulb, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

type Operation = 'add' | 'subtract';

interface TimeRow {
    id: string;
    operation: Operation;
    value: string;
}

const HOURS_FAQS: FAQItem[] = [
    {
        question: "Como somar horas e minutos corretamente?",
        answer: "Para somar horas, você deve converter tudo para minutos, realizar a soma e depois converter de volta para o formato de horas. Nossa calculadora faz isso automaticamente: 08:50 + 00:20 = 09:10 (e não 08:70)."
    },
    {
        question: "Como calcular horas trabalhadas?",
        answer: "Insira o horário de saída e subtraia o horário de entrada. Lembre-se de descontar o intervalo de almoço. Exemplo: (18:00 - 09:00) - 01:00 = 08:00 horas trabalhadas."
    },
    {
        question: "O que é o sistema sexagesimal?",
        answer: "É o sistema de numeração de base 60 usado para medir o tempo. Diferente do sistema decimal (base 10), onde 100 centavos formam 1 real, no tempo são necessários 60 minutos para formar 1 hora."
    },
    {
        question: "Como converter minutos em horas?",
        answer: "Divida o total de minutos por 60. A parte inteira será as horas e o resto será os minutos. Exemplo: 90 minutos ÷ 60 = 1 hora e sobram 30 minutos (01:30)."
    }
];

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
            if (row.operation === 'add') {
                totalMinutes += minutes;
            } else {
                totalMinutes -= minutes;
            }
        });

        setIsNegative(totalMinutes < 0);
        setResult(minutesToTime(totalMinutes));
    }, [rows]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Horas Online",
        "description": "Some e subtraia horas e minutos facilmente. Ferramenta gratuita para RH e controle de ponto.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        }
    };

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Calculadora de Horas Online - Soma e Subtração de Minutos"
                description="Precisa fechar a folha de ponto? Some e subtraia horas e minutos facilmente. Ferramenta gratuita para RH, funcionários e controle de banco de horas."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de Horas', href: '/calculadoras/horas' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Gestão de Tempo</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Horas</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Chega de errar a conta do ponto. Some ou subtraia horas e minutos sem complicação para fechar sua folha ou banco de horas.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-24">
                    {/* Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <div className="space-y-4">
                                {rows.map((row, index) => (
                                    <div key={row.id} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
                                        <select
                                            value={row.operation}
                                            onChange={(e) => updateRow(row.id, 'operation', e.target.value as Operation)}
                                            className={`bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-2 text-center focus:outline-none focus:border-primary/50 transition-all font-bold w-20 ${row.operation === 'add' ? 'text-emerald-400' : 'text-red-400'}`}
                                        >
                                            <option value="add">+</option>
                                            <option value="subtract">-</option>
                                        </select>

                                        <div className="relative flex-1">
                                            <input
                                                type="time"
                                                value={row.value}
                                                onChange={(e) => updateRow(row.id, 'value', e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center font-mono text-xl"
                                            />
                                        </div>

                                        <button
                                            onClick={() => removeRow(row.id)}
                                            disabled={rows.length <= 2}
                                            className={`p-4 rounded-xl border border-white/5 transition-colors ${rows.length <= 2 ? 'text-gray-600 cursor-not-allowed opacity-50' : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20'}`}
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
                                    className="flex-1 py-4 px-4 bg-[#0a0a0a] hover:bg-white/5 border border-white/10 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 text-gray-300 hover:text-white group"
                                >
                                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Adicionar Linha
                                </button>
                                <button
                                    onClick={reset}
                                    className="py-4 px-6 bg-[#0a0a0a] hover:bg-white/5 border border-white/10 rounded-xl text-sm font-medium transition-all text-gray-300 hover:text-white"
                                    title="Limpar tudo"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5">
                                <p className="text-center text-gray-400 mb-2 uppercase tracking-wider text-xs font-bold">Resultado Total</p>
                                <div className={`text-6xl font-bold text-center font-mono tracking-wider ${isNegative ? 'text-red-400' : 'text-primary'}`}>
                                    {isNegative ? '-' : ''}{result}
                                </div>
                                <p className="text-center text-sm text-gray-500 mt-3">
                                    {isNegative ? 'Saldo Negativo' : 'Saldo Positivo'}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
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
                                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                                    <strong className="text-emerald-400 block mb-1">O Jeito Certo:</strong>
                                    <p>Nossa ferramenta converte os minutos corretamente: 08:50 + 00:20 = <strong>09:10</strong>.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 p-6 rounded-3xl border border-blue-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                <Lightbulb className="w-5 h-5" />
                                Dica de Ouro
                            </h3>
                            <p className="text-sm text-gray-300">
                                O formato "8h30" é diferente de "8,5h". Se você precisa multiplicar as horas pelo valor em dinheiro (R$), use sempre o formato decimal (8,5).
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como funciona a Calculadora de Horas?</h2>
                        <p className="text-gray-400 mb-6">
                            A calculadora de horas da Junny foi desenvolvida para simplificar a vida de profissionais de RH, gestores e colaboradores que precisam controlar o banco de horas ou conferir a folha de ponto.
                        </p>
                        <p className="text-gray-400 mb-6">
                            Diferente de uma calculadora comum, ela entende que <strong>1 hora tem 60 minutos</strong>. Isso evita erros clássicos de cálculo manual, garantindo que você saiba exatamente quanto tempo trabalhou ou quanto deve ser descontado.
                        </p>
                    </section>

                    <section className="mb-16">
                        <h3 className="text-2xl font-bold text-white mb-6">Exemplos Práticos de Uso</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h4 className="text-lg font-bold text-white mb-2 text-primary">Somar Horas</h4>
                                <p className="text-gray-400 text-sm">
                                    Ideal para somar todas as horas trabalhadas na semana e verificar se fechou as 44h semanais.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h4 className="text-lg font-bold text-white mb-2 text-primary">Subtrair Horas</h4>
                                <p className="text-gray-400 text-sm">
                                    Use para descontar atrasos ou saídas antecipadas do total de horas do dia.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h4 className="text-lg font-bold text-white mb-2 text-primary">Banco de Horas</h4>
                                <p className="text-gray-400 text-sm">
                                    Calcule o saldo acumulado (positivo ou negativo) para compensação futura.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <FAQ
                    items={HOURS_FAQS}
                    title="Dúvidas Frequentes sobre Cálculo de Horas"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
