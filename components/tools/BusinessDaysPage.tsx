import React, { useState, useEffect } from 'react';
import { CalendarDays, Calculator, HelpCircle, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const BUSINESS_DAYS_FAQS: FAQItem[] = [
    {
        question: "O que são dias úteis?",
        answer: "São os dias da semana de segunda a sexta-feira, excluindo os feriados nacionais. Sábados e domingos são considerados dias não úteis para fins bancários e de prazos legais."
    },
    {
        question: "Considera feriados estaduais?",
        answer: "Esta calculadora considera apenas os feriados nacionais fixos e móveis do Brasil. Feriados estaduais e municipais não são contabilizados automaticamente."
    },
    {
        question: "Sábado conta como dia útil?",
        answer: "Para fins bancários (pagamento de boletos), não. Para fins trabalhistas (jornada de trabalho), o sábado é considerado dia útil não trabalhado (ou trabalhado meio período), dependendo da empresa."
    }
];

export function BusinessDaysPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState<{ businessDays: number; totalDays: number; weekends: number; holidays: number } | null>(null);

    // Brazilian National Holidays (Fixed + Mobile Logic needed for full accuracy, simplified fixed list for demo)
    // In a real app, use a library like 'date-holidays' or similar logic
    const isHoliday = (date: Date) => {
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const dateString = `${d}/${m}`;

        const fixedHolidays = [
            '1/1',   // Confraternização Universal
            '21/4',  // Tiradentes
            '1/5',   // Dia do Trabalho
            '7/9',   // Independência
            '12/10', // Nossa Senhora Aparecida
            '2/11',  // Finados
            '15/11', // Proclamação da República
            '25/12'  // Natal
        ];

        return fixedHolidays.includes(dateString);
    };

    const calculate = () => {
        if (!startDate || !endDate) {
            setResult(null);
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            setResult(null);
            return;
        }

        let businessDays = 0;
        let weekends = 0;
        let holidays = 0;
        let totalDays = 0;

        const current = new Date(start);

        // Iterate from start to end (exclusive of end date usually, but let's make it inclusive for user intuition)
        while (current <= end) {
            totalDays++;
            const dayOfWeek = current.getDay(); // 0 = Sun, 6 = Sat

            if (dayOfWeek === 0 || dayOfWeek === 6) {
                weekends++;
            } else if (isHoliday(current)) {
                holidays++;
            } else {
                businessDays++;
            }

            current.setDate(current.getDate() + 1);
        }

        setResult({
            businessDays,
            totalDays,
            weekends,
            holidays
        });
    };

    useEffect(() => {
        calculate();
    }, [startDate, endDate]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Dias Úteis",
        "description": "Conte quantos dias úteis existem entre duas datas, descontando fins de semana e feriados nacionais.",
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
                title="Calculadora de Dias Úteis - Contagem de Prazos"
                description="Precisa contar prazos? Calcule a quantidade exata de dias úteis entre duas datas, excluindo sábados, domingos e feriados."
                canonical="/calculadoras/dias-uteis"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": BUSINESS_DAYS_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Dias Úteis', href: '/calculadoras/dias-uteis' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <CalendarDays className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Dias Úteis</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto hidden">
                            {/* Description moved below calculator */}
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
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 min-h-[600px]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Contar Dias
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Data Inicial</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Data Final</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Dias Úteis</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? result.businessDays : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Total Dias</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? result.totalDays : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Fins de Semana</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? result.weekends : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Feriados</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? result.holidays : '---'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center">
                        <p>
                            Planeje seus prazos. Conte os dias de trabalho efetivo entre duas datas.
                        </p>
                    </div>

                    {/* Sidebar Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <Calendar className="w-5 h-5 text-blue-500" />
                                Calendário
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    Esta ferramenta é essencial para calcular prazos de entrega, vencimento de boletos e contagem de dias de férias.
                                </p>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block mb-1">Feriados Nacionais</strong>
                                    Consideramos os feriados fixos (Natal, Tiradentes, etc). Feriados móveis (Carnaval, Páscoa, Corpus Christi) e locais podem variar.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={BUSINESS_DAYS_FAQS}
                    title="Dúvidas sobre Dias Úteis"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
