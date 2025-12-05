import React, { useState, useEffect } from 'react';
import { Building2, Calculator, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const MEI_FAQS: FAQItem[] = [
    {
        question: "O que é o DAS MEI?",
        answer: "É o Documento de Arrecadação do Simples Nacional. É a guia mensal que o MEI deve pagar para manter sua empresa regular e ter direito aos benefícios previdenciários."
    },
    {
        question: "Qual o valor do DAS em 2025?",
        answer: "O valor é calculado com base no salário mínimo vigente (5% para INSS) + ICMS (R$ 1,00) e/ou ISS (R$ 5,00), dependendo da atividade."
    },
    {
        question: "O que acontece se eu atrasar?",
        answer: "Você paga multa e juros sobre o valor devido. Além disso, o tempo de atraso não conta para a carência da aposentadoria e outros benefícios."
    }
];

export function MEIDasPage() {
    const [activity, setActivity] = useState('comercio');
    const [result, setResult] = useState<{ inss: number; icms: number; iss: number; total: number } | null>(null);

    const calculate = () => {
        // Base calculation on 2024 Minimum Wage (R$ 1.412,00) - Update for 2025 when official
        const minimumWage = 1412.00;
        const inss = minimumWage * 0.05; // 5% INSS

        let icms = 0;
        let iss = 0;

        switch (activity) {
            case 'comercio': // Comércio e Indústria
                icms = 1.00;
                break;
            case 'servicos': // Serviços
                iss = 5.00;
                break;
            case 'comercio_servicos': // Comércio e Serviços
                icms = 1.00;
                iss = 5.00;
                break;
        }

        // MEI Caminhoneiro has different rules (12% INSS), simplified here for standard MEI

        setResult({
            inss,
            icms,
            iss,
            total: inss + icms + iss
        });
    };

    useEffect(() => {
        calculate();
    }, [activity]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora DAS MEI",
        "description": "Calcule o valor da guia mensal do MEI (DAS) atualizado para 2025.",
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
                title="Calculadora DAS MEI 2025 - Valor da Guia Mensal"
                description="Quanto vou pagar de MEI? Calcule o valor exato do DAS (Documento de Arrecadação) para Comércio, Indústria ou Serviços."
                canonical="/calculadoras/mei-das"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": MEI_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'DAS MEI', href: '/calculadoras/mei-das' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Building2 className="w-4 h-4 text-amber-500" />
                            <span className="text-sm text-gray-300">Empresariais</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">DAS MEI</span>
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
                                    <Calculator className="w-5 h-5 text-amber-500" />
                                    Calcular Guia
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Atividade da Empresa</label>
                                    <select
                                        value={activity}
                                        onChange={(e) => setActivity(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                    >
                                        <option value="comercio">Comércio ou Indústria</option>
                                        <option value="servicos">Prestação de Serviços</option>
                                        <option value="comercio_servicos">Comércio e Serviços (Misto)</option>
                                    </select>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4">
                                        <span className="text-sm text-amber-400 block mb-2">Valor Total do DAS</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">INSS (5%)</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">ICMS</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.icms.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">ISS</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.iss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                                <FileText className="w-5 h-5 text-amber-500" />
                                Composição do Valor
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    O valor do DAS é fixo e mensal, independente se você faturou ou não naquele mês.
                                </p>
                                <ul className="space-y-2 list-disc pl-4">
                                    <li><strong>INSS:</strong> 5% do Salário Mínimo (garante aposentadoria, auxílio-doença, etc).</li>
                                    <li><strong>ICMS:</strong> R$ 1,00 (para comércio/indústria).</li>
                                    <li><strong>ISS:</strong> R$ 5,00 (para serviços).</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>



                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Mantenha sua empresa em dia. Saiba o valor da contribuição mensal do Microempreendedor Individual.
                    </p>
                </div>

                <FAQ
                    items={MEI_FAQS}
                    title="Dúvidas sobre MEI"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section >
    );
}
