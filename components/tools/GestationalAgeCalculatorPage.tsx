import React, { useState, useEffect } from 'react';
import { Baby, Calendar, Clock, Info, Heart, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const GESTATIONAL_FAQS: FAQItem[] = [
    {
        question: "E se eu não lembrar a data da última menstruação?",
        answer: "O cálculo mais confiável será feito pela primeira ultrassonografia (entre 6 e 12 semanas), que mede o tamanho do embrião."
    },
    {
        question: "São 9 meses ou 40 semanas?",
        answer: "O padrão médico é 40 semanas. Isso equivale a 10 meses lunares (de 28 dias) ou aproximadamente 9 meses e meio do calendário solar."
    },
    {
        question: "O bebê nasce exatamente na DPP?",
        answer: "Raramente. Apenas 5% dos bebês nascem na data exata. O parto é considerado normal e a termo entre 37 e 42 semanas."
    }
];

export function GestationalAgeCalculatorPage() {
    const [dum, setDum] = useState('');
    const [result, setResult] = useState<{
        dpp: string;
        weeks: number;
        days: number;
        months: number;
        trimester: number;
    } | null>(null);

    const calculate = () => {
        if (!dum) {
            setResult(null);
            return;
        }

        const dumDate = new Date(dum);
        if (isNaN(dumDate.getTime())) return;

        // DPP: DUM + 280 days (40 weeks)
        const dppDate = new Date(dumDate);
        dppDate.setDate(dumDate.getDate() + 280);

        // Gestational Age: Current Date - DUM
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - dumDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;

        // Months approximation
        let months = 0;
        if (weeks <= 4) months = 1;
        else if (weeks <= 8) months = 2;
        else if (weeks <= 13) months = 3;
        else if (weeks <= 17) months = 4;
        else if (weeks <= 21) months = 5;
        else if (weeks <= 26) months = 6;
        else if (weeks <= 30) months = 7;
        else if (weeks <= 35) months = 8;
        else months = 9;

        let trimester = 1;
        if (weeks >= 14 && weeks <= 26) trimester = 2;
        if (weeks >= 27) trimester = 3;

        setResult({
            dpp: dppDate.toLocaleDateString('pt-BR'),
            weeks,
            days,
            months,
            trimester
        });
    };

    useEffect(() => {
        calculate();
    }, [dum]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Idade Gestacional",
        "description": "Calcule a Data Provável do Parto (DPP) e idade gestacional.",
        "applicationCategory": "HealthApplication",
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
                title="Calculadora de Idade Gestacional - Data Provável do Parto (DPP)"
                description="Estou grávida de quanto tempo? Calcule sua Idade Gestacional pela DUM, descubra a Data Provável do Parto e acompanhe as semanas e meses da gravidez."
                canonical="/calculadoras/idade-gestacional"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": GESTATIONAL_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Idade Gestacional', href: '/calculadoras/idade-gestacional' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Baby className="w-4 h-4 text-pink-400" />
                            <span className="text-sm text-gray-300">Maternidade</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Idade <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Gestacional</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Descubra de quantas semanas você está e qual a data provável do nascimento do seu bebê.
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
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> Data da Última Menstruação (DUM)
                                    </label>
                                    <input
                                        type="date"
                                        value={dum}
                                        onChange={(e) => setDum(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-500/50 transition-all text-center text-lg [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <p className="text-center text-gray-400 mb-2">Data Provável do Parto</p>
                                <div className="text-4xl font-bold text-center text-pink-400 mb-4">
                                    {result ? result.dpp : '--/--/----'}
                                </div>

                                {result && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-[#0a0a0a] p-4 rounded-xl text-center border border-white/5">
                                            <span className="block text-xs text-gray-500 mb-1">Tempo de Gestação</span>
                                            <span className="text-xl font-bold text-white">
                                                {result.weeks} sem e {result.days} dias
                                            </span>
                                        </div>
                                        <div className="bg-[#0a0a0a] p-4 rounded-xl text-center border border-white/5">
                                            <span className="block text-xs text-gray-500 mb-1">Mês Aproximado</span>
                                            <span className="text-xl font-bold text-white">
                                                {result.months}º Mês
                                            </span>
                                        </div>
                                        <div className="col-span-2 bg-pink-500/10 p-4 rounded-xl text-center border border-pink-500/20">
                                            <span className="block text-xs text-pink-300 mb-1 uppercase tracking-wider font-bold">Trimestre Atual</span>
                                            <span className="text-2xl font-bold text-pink-400">
                                                {result.trimester}º Trimestre
                                            </span>
                                        </div>
                                    </div>
                                )}
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
                                <Heart className="w-5 h-5 text-pink-400" />
                                Como funciona o cálculo?
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    A medicina utiliza a <strong>Regra de Naegele</strong>, baseada no ciclo de 28 dias.
                                </p>
                                <p>
                                    A gestação dura oficialmente 280 dias (40 semanas) a partir do primeiro dia da sua última menstruação (DUM).
                                </p>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <strong className="block text-white mb-2">A Regra:</strong>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Pegue a data da DUM</li>
                                        <li>Adicione 7 dias</li>
                                        <li>Subtraia 3 meses</li>
                                        <li>Adicione 1 ano</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20">
                            <h3 className="text-lg font-semibold mb-4 text-yellow-400 flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Nota Médica
                            </h3>
                            <p className="text-sm text-gray-300">
                                A DPP é uma estimativa estatística. Apenas 5% dos bebês nascem na data exata. O parto é considerado normal entre <strong>37 e 42 semanas</strong>.
                            </p>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                                <Info className="w-5 h-5 text-primary" />
                                Semanas x Meses
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between p-2 rounded bg-white/5 border border-white/5">
                                    <span>1º Trimestre</span>
                                    <span className="text-gray-400">1 a 13 semanas</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5 border border-white/5">
                                    <span>2º Trimestre</span>
                                    <span className="text-gray-400">14 a 26 semanas</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5 border border-white/5">
                                    <span>3º Trimestre</span>
                                    <span className="text-gray-400">27 a 40+ semanas</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={GESTATIONAL_FAQS}
                    title="Dúvidas Frequentes sobre Gestação"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
