import React, { useState, useEffect } from 'react';
import { Baby, Calendar, HelpCircle, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const GESTATIONAL_FAQS: FAQItem[] = [
    {
        question: "Como é calculada a idade gestacional?",
        answer: "A contagem começa a partir do primeiro dia da última menstruação (DUM), e não do dia da concepção, pois é a data mais precisa que a mulher costuma ter."
    },
    {
        question: "O cálculo é 100% preciso?",
        answer: "É uma estimativa muito próxima. A confirmação exata da idade gestacional e da data provável do parto deve ser feita através do ultrassom no primeiro trimestre."
    },
    {
        question: "Quantas semanas dura uma gravidez?",
        answer: "Uma gravidez completa dura em média 40 semanas (280 dias), podendo variar entre 37 e 42 semanas."
    }
];

export function GestationalAgeCalculatorPage() {
    const [dum, setDum] = useState('');
    const [result, setResult] = useState<{ weeks: number; days: number; dueDate: string } | null>(null);

    const calculate = () => {
        if (!dum) return;

        const dumDate = new Date(dum);
        const today = new Date();

        if (isNaN(dumDate.getTime())) return;

        // Calculate difference in time
        const diffTime = Math.abs(today.getTime() - dumDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;

        // Due date: DUM + 280 days (40 weeks)
        const dueDate = new Date(dumDate);
        dueDate.setDate(dumDate.getDate() + 280);

        setResult({
            weeks,
            days,
            dueDate: dueDate.toLocaleDateString('pt-BR')
        });
    };

    useEffect(() => {
        calculate();
    }, [dum]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora Gestacional",
        "description": "Calcule a idade gestacional e a data provável do parto (DPP) a partir da DUM.",
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
                title="Calculadora Gestacional - Semanas de Gravidez e DPP"
                description="Descubra de quantas semanas você está e qual a data provável do parto. Acompanhe sua gravidez com nossa calculadora gestacional."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

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
                            <Baby className="w-4 h-4 text-cyan-500" />
                            <span className="text-sm text-gray-300">Matemática e Saúde</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Gestacional</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Acompanhe o desenvolvimento do seu bebê. Saiba a data provável do nascimento.
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
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calendar className="w-5 h-5 text-cyan-500" />
                                    Calcular Data
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Data da Última Menstruação (DUM)</label>
                                    <input
                                        type="date"
                                        value={dum}
                                        onChange={(e) => setDum(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all [color-scheme:dark]"
                                    />
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Idade Gestacional</span>
                                            <span className="text-2xl font-bold text-white">
                                                {result ? `${result.weeks} Semanas` : '---'}
                                            </span>
                                            {result && result.days > 0 && (
                                                <span className="text-sm text-gray-500 block">+ {result.days} dias</span>
                                            )}
                                        </div>
                                        <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 text-center">
                                            <span className="text-xs text-cyan-400 block mb-1">Data Provável do Parto</span>
                                            <span className="text-2xl font-bold text-white">
                                                {result ? result.dueDate : '---'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
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
                                <Clock className="w-5 h-5 text-cyan-500" />
                                Trimestres da Gravidez
                            </h3>
                            <div className="space-y-4 relative pl-4 border-l border-white/10">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-cyan-500" />
                                    <strong className="text-white block text-sm">1º Trimestre</strong>
                                    <span className="text-xs text-gray-400">Semana 1 a 13</span>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500" />
                                    <strong className="text-white block text-sm">2º Trimestre</strong>
                                    <span className="text-xs text-gray-400">Semana 14 a 26</span>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-purple-500" />
                                    <strong className="text-white block text-sm">3º Trimestre</strong>
                                    <span className="text-xs text-gray-400">Semana 27 a 40+</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={GESTATIONAL_FAQS}
                    title="Dúvidas sobre Gravidez"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
