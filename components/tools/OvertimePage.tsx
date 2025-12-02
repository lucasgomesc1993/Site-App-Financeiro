import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Clock, Calendar, Sun, Moon } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const OVERTIME_FAQS: FAQItem[] = [
    {
        question: "Qual o valor da hora extra em 2025?",
        answer: "Pela CLT, a hora extra deve valer, no mínimo, 50% a mais que a hora normal de trabalho. Ou seja, se sua hora vale R$ 10,00, a hora extra valerá R$ 15,00. Em domingos e feriados, esse adicional costuma ser de 100% (o dobro)."
    },
    {
        question: "Como calcular o valor da minha hora de trabalho?",
        answer: "Basta dividir seu salário bruto pela sua jornada mensal. Por exemplo: Se você ganha R$ 2.200,00 e trabalha 220 horas mensais (padrão 44h semanais), o valor da sua hora é R$ 10,00."
    },
    {
        question: "O que é hora extra 50% e 100%?",
        answer: "A hora extra 50% é aplicada em dias úteis (segunda a sábado) e representa um acréscimo de metade do valor da hora normal. A hora extra 100% é aplicada geralmente em domingos e feriados, dobrando o valor da hora trabalhada."
    },
    {
        question: "Hora extra reflete no DSR (Descanso Semanal)?",
        answer: "Sim! As horas extras habituais refletem no pagamento do Descanso Semanal Remunerado (DSR). Isso significa que, além do valor das horas, você recebe um adicional pelos dias de folga proporcional às horas trabalhadas."
    },
    {
        question: "Existe limite de horas extras por dia?",
        answer: "Sim. Segundo a CLT, o limite máximo é de 2 horas extras por dia. O que passar disso pode configurar irregularidade trabalhista, exceto em casos de força maior ou serviços inadiáveis."
    }
];

export const OvertimePage: React.FC = () => {
    const [salary, setSalary] = useState<number>(0);
    const [hoursJourney, setHoursJourney] = useState<number>(220);
    const [hours50, setHours50] = useState<number>(0);
    const [hours100, setHours100] = useState<number>(0);
    const [businessDays, setBusinessDays] = useState<number>(25);
    const [sundaysHolidays, setSundaysHolidays] = useState<number>(5);
    const [result, setResult] = useState<any>(null);

    const calculateOvertime = () => {
        if (!salary || !hoursJourney) return;

        const hourlyRate = salary / hoursJourney;

        // 50% Overtime
        const rate50 = hourlyRate * 1.5;
        const total50 = rate50 * hours50;

        // 100% Overtime
        const rate100 = hourlyRate * 2;
        const total100 = rate100 * hours100;

        // Total Overtime Value
        const totalOvertime = total50 + total100;

        // DSR Reflection
        // Formula: (Total Overtime / Business Days) * Sundays/Holidays
        let dsr = 0;
        if (businessDays > 0 && sundaysHolidays > 0) {
            dsr = (totalOvertime / businessDays) * sundaysHolidays;
        }

        const totalReceivable = totalOvertime + dsr;

        setResult({
            hourlyRate,
            total50,
            total100,
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
        "name": "Calculadora de Horas Extras",
        "description": "Estendeu a jornada? Simule o valor exato que você deve receber, considerando adicionais de 50%, 100% e o reflexo no DSR.",
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
                title="Calculadora de Horas Extras - Cálculo 50%, 100% e DSR"
                description="Estendeu a jornada? Simule o valor exato que você deve receber, considerando adicionais de 50%, 100% e o reflexo no DSR."
                canonical="/calculadoras/horas-extras"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": OVERTIME_FAQS.map(faq => ({
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
                        { label: 'Horas Extras', href: '/calculadoras/horas-extras' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Direitos Trabalhistas</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Horas Extras</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Estendeu a jornada? Simule o valor exato que você deve receber, considerando adicionais de 50%, 100% e o reflexo no DSR.
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

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="hours50" className="block text-sm text-gray-400 mb-2">Horas 50% (Dias Úteis)</label>
                                        <input
                                            id="hours50"
                                            type="number"
                                            placeholder="Ex: 10"
                                            value={hours50 || ''}
                                            onChange={(e) => setHours50(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="hours100" className="block text-sm text-gray-400 mb-2">Horas 100% (Domingos)</label>
                                        <input
                                            id="hours100"
                                            type="number"
                                            placeholder="Ex: 5"
                                            value={hours100 || ''}
                                            onChange={(e) => setHours100(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
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
                                        onClick={calculateOvertime}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Calcular Horas Extras
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSalary(0);
                                            setHours50(0);
                                            setHours100(0);
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
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Valor Total a Receber</h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {formatCurrency(result.totalReceivable)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Horas Extras + Reflexo no DSR
                                            </p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Valor da sua Hora</span>
                                                    <span className="text-xs text-gray-500">Salário / Jornada</span>
                                                </div>
                                                <span className="text-white font-bold">{formatCurrency(result.hourlyRate)}</span>
                                            </div>

                                            {result.total50 > 0 && (
                                                <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                    <div>
                                                        <span className="block text-gray-300">Horas 50%</span>
                                                        <span className="text-xs text-gray-500">{hours50}h x {formatCurrency(result.hourlyRate * 1.5)}</span>
                                                    </div>
                                                    <span className="text-white font-bold">{formatCurrency(result.total50)}</span>
                                                </div>
                                            )}

                                            {result.total100 > 0 && (
                                                <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                    <div>
                                                        <span className="block text-gray-300">Horas 100%</span>
                                                        <span className="text-xs text-gray-500">{hours100}h x {formatCurrency(result.hourlyRate * 2)}</span>
                                                    </div>
                                                    <span className="text-white font-bold">{formatCurrency(result.total100)}</span>
                                                </div>
                                            )}

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
                                        <Clock className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para simular suas horas extras</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como funciona o cálculo da Hora Extra?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                A Hora Extra é um direito garantido pela Constituição para todo trabalhador que excede sua jornada contratual. O cálculo envolve descobrir quanto vale sua hora de trabalho normal e aplicar o percentual de acréscimo definido por lei ou convenção coletiva.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 my-8">
                                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white mb-3 text-primary">1. Valor da Hora</h3>
                                    <p className="text-sm">Divide-se o salário mensal pela jornada (geralmente 220h). Exemplo: R$ 2.200 ÷ 220 = <strong>R$ 10,00/hora</strong>.</p>
                                </div>
                                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white mb-3 text-primary">2. Adicional</h3>
                                    <p className="text-sm">Soma-se a porcentagem extra ao valor da hora.<br />50% (Dias Úteis): R$ 10,00 + 50% = <strong>R$ 15,00</strong>.<br />100% (Domingos): R$ 10,00 + 100% = <strong>R$ 20,00</strong>.</p>
                                </div>
                                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white mb-3 text-primary">3. Quantidade</h3>
                                    <p className="text-sm">Multiplica-se o valor da hora extra encontrada pelo número de horas a mais que você trabalhou no mês.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Tipos de Hora Extra</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">O percentual de acréscimo varia de acordo com o dia e horário em que o trabalho extra foi realizado:</p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span><strong>Hora Extra 50%:</strong> A mais comum. Aplica-se para horas excedentes trabalhadas em dias úteis (segunda a sábado). O valor da hora recebe um acréscimo de, no mínimo, 50%.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span><strong>Hora Extra 100%:</strong> Aplica-se para trabalho em domingos e feriados civis ou religiosos não compensados. O valor da hora dobra (acréscimo de 100%).</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span>
                                    <span><strong>Adicional Noturno:</strong> Se a hora extra for feita entre 22h e 5h, além do acréscimo de hora extra, deve-se somar mais 20% de adicional noturno sobre a hora.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-16">
                        <h3 className="text-xl font-bold text-white mb-2">⚠️ Não esqueça do DSR!</h3>
                        <p className="text-gray-300">
                            As horas extras habituais geram um "efeito colateral" positivo no seu salário: o reflexo no Descanso Semanal Remunerado (DSR). Como você trabalhou mais durante a semana, seu dia de folga remunerada também passa a valer proporcionalmente mais. É um dinheiro extra que muitos esquecem de cobrar!
                        </p>
                    </div>

                    <FAQ
                        items={OVERTIME_FAQS}
                        title="Perguntas Frequentes sobre Horas Extras"
                        className="py-12"
                        showSocialProof={false}
                    />
                </div>

                {/* App Promo Banner */}
                <AppPromoBanner />
            </div>
        </section>
    );
};
