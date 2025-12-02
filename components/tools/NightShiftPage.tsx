import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Clock, Moon, Sun } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const NIGHT_SHIFT_FAQS: FAQItem[] = [
    {
        question: "Quem tem direito ao Adicional Noturno?",
        answer: "Todos os trabalhadores urbanos contratados via CLT que exerçam atividades entre 22h e 5h. Trabalhadores rurais também têm direito, mas com horários e percentuais diferentes (25% de acréscimo)."
    },
    {
        question: "O Adicional Noturno reflete no DSR?",
        answer: "Sim! Se o trabalho noturno for habitual, o valor do adicional deve refletir no pagamento do Descanso Semanal Remunerado (DSR) e feriados."
    },
    {
        question: "Como funciona para escala 12x36?",
        answer: "Mesmo na jornada 12x36, se o trabalho ocorrer no período noturno (22h às 5h), o adicional é devido. A hora reduzida também se aplica, resultando em pagamento de horas extras ou adicional sobre o tempo excedente fictício."
    },
    {
        question: "O adicional noturno entra no cálculo de férias e 13º?",
        answer: "Sim. A média do adicional noturno recebido ao longo do ano integra a base de cálculo para férias, 13º salário e aviso prévio indenizado."
    },
    {
        question: "Qual a diferença para o trabalhador rural?",
        answer: "Para a lavoura, o horário noturno é das 21h às 5h. Para a pecuária, é das 20h às 4h. Em ambos os casos rurais, o adicional é de 25% (maior que o urbano), mas não existe a regra da hora reduzida (a hora tem 60 minutos)."
    }
];

export const NightShiftPage: React.FC = () => {
    const [salary, setSalary] = useState<number>(0);
    const [hoursJourney, setHoursJourney] = useState<number>(220);
    const [nightHours, setNightHours] = useState<number>(0);
    const [businessDays, setBusinessDays] = useState<number>(25);
    const [sundaysHolidays, setSundaysHolidays] = useState<number>(5);
    const [result, setResult] = useState<any>(null);

    const calculateNightShift = () => {
        if (!salary || !hoursJourney) return;

        const hourlyRate = salary / hoursJourney;

        // Night Shift Premium (20%)
        const premiumRate = hourlyRate * 0.20;

        // Reduced Hour Factor (52m 30s = 52.5m)
        // 60 / 52.5 = 1.142857
        const reducedHourFactor = 60 / 52.5;

        // Total Paid Night Hours (Clock Hours * Factor)
        const totalPaidNightHours = nightHours * reducedHourFactor;

        // Total Additional Value
        // We pay the premium on the TOTAL paid night hours
        const totalAdditional = totalPaidNightHours * premiumRate;

        // DSR Reflection
        // Formula: (Total Additional / Business Days) * Sundays/Holidays
        let dsr = 0;
        if (businessDays > 0 && sundaysHolidays > 0) {
            dsr = (totalAdditional / businessDays) * sundaysHolidays;
        }

        const totalReceivable = totalAdditional + dsr;

        setResult({
            hourlyRate,
            premiumRate,
            reducedHourFactor,
            totalPaidNightHours,
            totalAdditional,
            dsr,
            totalReceivable
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Adicional Noturno 2025",
        "description": "Trabalha a noite? Calcule o valor do seu Adicional Noturno considerando os 20% de acréscimo e a regra da Hora Reduzida (52min30s).",
        "applicationCategory": "FinanceApplication",
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
                title="Calculadora de Adicional Noturno 2025 - Hora Reduzida e 20%"
                description="Trabalha a noite? Calcule o valor do seu Adicional Noturno considerando os 20% de acréscimo e a regra da Hora Reduzida (52min30s). Simulação gratuita."
                canonical="/calculadoras/adicional-noturno"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": NIGHT_SHIFT_FAQS.map(faq => ({
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
                        { label: 'Adicional Noturno', href: '/calculadoras/adicional-noturno' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Moon className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Direitos Trabalhistas</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Adicional Noturno</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Trabalha entre 22h e 5h? Descubra o valor real do seu salário com o acréscimo de 20% e a regra da hora reduzida.
                        </p>
                    </motion.div>
                </div>

                {/* Calculator Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid lg:grid-cols-12 gap-8 mb-24"
                >
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-primary" />
                                Dados da Jornada
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="salary" className="block text-sm text-gray-400 mb-2">Salário Bruto (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="salary"
                                            type="number"
                                            placeholder="Ex: 2200"
                                            value={salary || ''}
                                            onChange={(e) => setSalary(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="hoursJourney" className="block text-sm text-gray-400 mb-2">Jornada Mensal (Horas)</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="hoursJourney"
                                            type="number"
                                            placeholder="Ex: 220"
                                            value={hoursJourney || ''}
                                            onChange={(e) => setHoursJourney(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="nightHours" className="block text-sm text-gray-400 mb-2">Horas Noturnas Trabalhadas (Relógio)</label>
                                    <div className="relative">
                                        <Moon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="nightHours"
                                            type="number"
                                            placeholder="Ex: 100"
                                            value={nightHours || ''}
                                            onChange={(e) => setNightHours(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Horas trabalhadas entre 22h e 5h</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="businessDays" className="block text-sm text-gray-400 mb-2">Dias Úteis no Mês</label>
                                        <input
                                            id="businessDays"
                                            type="number"
                                            value={businessDays}
                                            onChange={(e) => setBusinessDays(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="sundaysHolidays" className="block text-sm text-gray-400 mb-2">Domingos/Feriados</label>
                                        <input
                                            id="sundaysHolidays"
                                            type="number"
                                            value={sundaysHolidays}
                                            onChange={(e) => setSundaysHolidays(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculateNightShift}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Calcular Adicional
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSalary(0);
                                            setNightHours(0);
                                            setResult(null);
                                        }}
                                        className="px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all"
                                    >
                                        Limpar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {result ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Valor Total do Adicional</h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {formatCurrency(result.totalReceivable)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Adicional Noturno + Reflexo no DSR
                                            </p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Hora Normal</span>
                                                    <span className="text-xs text-gray-500">Salário / Jornada</span>
                                                </div>
                                                <span className="text-white font-bold">{formatCurrency(result.hourlyRate)}</span>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Hora Noturna (20%)</span>
                                                    <span className="text-xs text-gray-500">Valor do acréscimo por hora</span>
                                                </div>
                                                <span className="text-white font-bold">{formatCurrency(result.premiumRate)}</span>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Horas Pagas (Fictas)</span>
                                                    <span className="text-xs text-gray-500">{nightHours}h relógio x 1.1428</span>
                                                </div>
                                                <span className="text-white font-bold">{result.totalPaidNightHours.toFixed(2)}h</span>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Total Adicional</span>
                                                    <span className="text-xs text-gray-500">Sem DSR</span>
                                                </div>
                                                <span className="text-white font-bold">{formatCurrency(result.totalAdditional)}</span>
                                            </div>

                                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-emerald-400 font-bold">Reflexo no DSR</span>
                                                    <span className="text-xs text-gray-400">Descanso Semanal Remunerado</span>
                                                </div>
                                                <span className="text-white font-bold">{formatCurrency(result.dsr)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Moon className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para simular seu Adicional Noturno</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg"
                >
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O que é o Adicional Noturno?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                O trabalho noturno exige mais do corpo e da saúde do trabalhador do que o diurno. Por isso, a CLT (Consolidação das Leis do Trabalho) obriga as empresas a pagarem um "bônus" compensatório: o Adicional Noturno.
                            </p>
                            <p className="mb-4">
                                Para trabalhadores urbanos, esse direito é garantido para qualquer atividade realizada entre 22h de um dia e 5h da manhã do dia seguinte. Além de receber um valor maior por hora, a contagem do tempo também é diferente (a hora passa "mais rápido" para fins de pagamento).
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como funciona o Cálculo? (Regras de 2025)</h2>
                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">1. O Acréscimo de 20%</h3>
                                <p className="text-sm mb-2">A hora noturna deve ser paga com um acréscimo de, no mínimo, 20% sobre o valor da hora diurna.</p>
                                <p className="text-sm text-gray-400"><strong>Exemplo:</strong> Se sua hora normal vale R$ 10,00, a hora noturna vale R$ 12,00.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">2. A Hora Reduzida (Hora Ficta)</h3>
                                <p className="text-sm mb-2">Aqui está o "pulo do gato" que muita gente esquece. Entre 22h e 5h, a hora de trabalho não tem 60 minutos, mas sim 52 minutos e 30 segundos.</p>
                                <p className="text-sm text-gray-400">Na prática, cada hora de relógio trabalhada à noite equivale a <strong>1,1428 horas</strong> para fins de pagamento.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Passo a Passo para Calcular</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">Nossa calculadora faz a conversão automática, mas a lógica manual é a seguinte:</p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span><strong>Descubra o valor da hora normal:</strong> Divida o salário mensal pela jornada (ex: R$ 2.200 ÷ 220 = R$ 10,00).</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span><strong>Aplique os 20%:</strong> Multiplique o valor da hora por 0,20 para achar o valor do adicional (R$ 10,00 × 0,20 = R$ 2,00 de adicional).</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span>
                                    <span><strong>Considere a Hora Reduzida:</strong> Se você trabalhou a noite toda (22h às 5h), multiplique o número de horas pelo fator de redução ou considere 8 horas pagas para cada 7 trabalhadas.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-xl mb-16">
                        <h3 className="text-xl font-bold text-white mb-2">💡 E se o turno passar das 5h da manhã?</h3>
                        <p className="text-gray-300">
                            Se você cumpriu jornada noturna integral e continuou trabalhando após as 5h (hora extra ou continuação de turno), a lei entende que o cansaço continua. Por isso, o adicional noturno também deve ser pago sobre as horas trabalhadas após as 5h da manhã (Súmula 60 do TST).
                        </p>
                    </div>

                    <FAQ
                        items={NIGHT_SHIFT_FAQS}
                        title="Dúvidas Frequentes sobre Adicional Noturno"
                        className="py-12"
                        showSocialProof={false}
                    />
                </motion.div>

                {/* App Promo Banner */}
                <AppPromoBanner />
            </div>
        </section>
    );
};
