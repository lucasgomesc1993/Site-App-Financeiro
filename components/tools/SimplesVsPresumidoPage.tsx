import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Building2, Users, TrendingDown, AlertTriangle, CheckCircle2, Scale, ArrowRight } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const TAX_FAQS: FAQItem[] = [
    {
        question: "O Simples Nacional é sempre mais barato?",
        answer: "Não! Esse é um mito. Para empresas com faturamento médio (acima de R$ 20k/mês) e poucos funcionários, o Lucro Presumido costuma vencer."
    },
    {
        question: "Quando devo mudar de regime?",
        answer: "A troca de regime tributário só pode ser feita uma vez por ano, sempre em janeiro. Por isso, é fundamental fazer essa simulação no final do ano para começar o exercício seguinte no modelo mais econômico."
    },
    {
        question: "O que é o Fator R?",
        answer: "É uma regra do Simples Nacional para empresas de serviços intelectuais. Se a sua folha de pagamento (salários + pró-labore) for igual ou superior a 28% do faturamento, você sai do Anexo V (caro) e vai para o Anexo III (barato). Nossa calculadora faz essa verificação automática."
    },
    {
        question: "Empresas com muitos funcionários pagam menos no Simples?",
        answer: "Geralmente sim. No Simples Nacional, a empresa não paga os 20% de INSS Patronal sobre a folha de salários, o que gera uma economia gigante para quem tem equipe grande."
    }
];

type ActivityType = 'comercio' | 'servicos' | 'industria';

export const SimplesVsPresumidoPage: React.FC = () => {
    const [monthlyBilling, setMonthlyBilling] = useState<number>(0);
    const [monthlyPayroll, setMonthlyPayroll] = useState<number>(0);
    const [activity, setActivity] = useState<ActivityType>('servicos');
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        calculateTaxComparison();
    }, [monthlyBilling, monthlyPayroll, activity]);

    const calculateTaxComparison = () => {
        if (monthlyBilling <= 0) {
            setResult(null);
            return;
        }

        const annualBilling = monthlyBilling * 12;

        // --- Simples Nacional Calculation ---
        let anexo = '';
        let aliquotaNominal = 0;
        let deducao = 0;

        // Simplified Tables (2024/2025 estimates)
        // Anexo I - Comércio
        // Anexo II - Indústria
        // Anexo III - Serviços (Installation, Repairs, Accounting, etc.)
        // Anexo V - Serviços (Intellectual, Tech, etc.) - Subject to Fator R

        let effectiveAnexo = '';

        if (activity === 'comercio') {
            effectiveAnexo = 'Anexo I';
            if (annualBilling <= 180000) { aliquotaNominal = 0.04; deducao = 0; }
            else if (annualBilling <= 360000) { aliquotaNominal = 0.073; deducao = 5940; }
            else if (annualBilling <= 720000) { aliquotaNominal = 0.095; deducao = 13860; }
            else if (annualBilling <= 1800000) { aliquotaNominal = 0.107; deducao = 22500; }
            else if (annualBilling <= 3600000) { aliquotaNominal = 0.143; deducao = 87300; }
            else { aliquotaNominal = 0.19; deducao = 378000; } // Limit for simplicity
        } else if (activity === 'industria') {
            effectiveAnexo = 'Anexo II';
            if (annualBilling <= 180000) { aliquotaNominal = 0.045; deducao = 0; }
            else if (annualBilling <= 360000) { aliquotaNominal = 0.078; deducao = 5940; }
            else if (annualBilling <= 720000) { aliquotaNominal = 0.10; deducao = 13860; }
            else if (annualBilling <= 1800000) { aliquotaNominal = 0.112; deducao = 22500; }
            else if (annualBilling <= 3600000) { aliquotaNominal = 0.147; deducao = 85500; }
            else { aliquotaNominal = 0.30; deducao = 720000; } // Simplified upper
        } else { // Serviços
            // Check Fator R
            const fatorR = monthlyPayroll / monthlyBilling;

            // Assuming generic service that falls into Anexo V but can go to III with Fator R
            // Or Anexo III directly. For simplicity, we'll assume "Intellectual Services" logic which is common.

            if (fatorR >= 0.28) {
                effectiveAnexo = 'Anexo III (Fator R)';
                if (annualBilling <= 180000) { aliquotaNominal = 0.06; deducao = 0; }
                else if (annualBilling <= 360000) { aliquotaNominal = 0.112; deducao = 9360; }
                else if (annualBilling <= 720000) { aliquotaNominal = 0.135; deducao = 17640; }
                else if (annualBilling <= 1800000) { aliquotaNominal = 0.16; deducao = 35640; }
                else if (annualBilling <= 3600000) { aliquotaNominal = 0.21; deducao = 125640; }
                else { aliquotaNominal = 0.33; deducao = 648000; }
            } else {
                effectiveAnexo = 'Anexo V';
                if (annualBilling <= 180000) { aliquotaNominal = 0.155; deducao = 0; }
                else if (annualBilling <= 360000) { aliquotaNominal = 0.18; deducao = 4500; }
                else if (annualBilling <= 720000) { aliquotaNominal = 0.195; deducao = 9900; }
                else if (annualBilling <= 1800000) { aliquotaNominal = 0.205; deducao = 17100; }
                else if (annualBilling <= 3600000) { aliquotaNominal = 0.23; deducao = 62100; }
                else { aliquotaNominal = 0.305; deducao = 540000; }
            }
        }

        const effectiveRateSimples = ((annualBilling * aliquotaNominal) - deducao) / annualBilling;
        const simplesTax = monthlyBilling * effectiveRateSimples;

        // --- Lucro Presumido Calculation ---
        const pis = monthlyBilling * 0.0065;
        const cofins = monthlyBilling * 0.03;

        let presumedProfitRate = activity === 'servicos' ? 0.32 : 0.08; // 32% services, 8% commerce/industry
        const presumedProfit = monthlyBilling * presumedProfitRate;

        const irpj = presumedProfit * 0.15;
        // Surcharge 10% if profit > 20k/month
        const irpjSurcharge = presumedProfit > 20000 ? (presumedProfit - 20000) * 0.10 : 0;

        const csllRate = activity === 'comercio' || activity === 'industria' ? 0.09 : 0.09; // Actually 12% base for commerce but 9% rate. Simplified: 9% on presumed profit.
        // CSLL base is 12% for commerce/industry, 32% for services.
        const csllBaseRate = activity === 'servicos' ? 0.32 : 0.12;
        const csll = (monthlyBilling * csllBaseRate) * 0.09;

        // ISS or ICMS
        let localTax = 0;
        if (activity === 'servicos') {
            localTax = monthlyBilling * 0.05; // ISS 5% max estimate
        } else {
            localTax = monthlyBilling * 0.18; // ICMS 18% estimate (varies wildly)
        }

        const inssPatronal = monthlyPayroll * 0.20; // 20% CPP

        const presumidoTax = pis + cofins + irpj + irpjSurcharge + csll + localTax + inssPatronal;

        // --- Comparison ---
        const difference = Math.abs(simplesTax - presumidoTax);
        const recommendation = simplesTax < presumidoTax ? 'simples' : 'presumido';

        setResult({
            simplesTax,
            effectiveRateSimples,
            effectiveAnexo,
            presumidoTax,
            presumidoBreakdown: {
                federal: pis + cofins + irpj + irpjSurcharge + csll,
                local: localTax,
                inss: inssPatronal
            },
            difference,
            recommendation
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora Simples Nacional vs Lucro Presumido",
        "description": "Compare os custos do Simples Nacional vs. Lucro Presumido e descubra o melhor regime para sua empresa.",
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
                title="Simples Nacional ou Lucro Presumido? Comparador Tributário 2025"
                description="Pare de pagar impostos a mais. Compare os custos do Simples Nacional vs. Lucro Presumido e descubra o melhor regime para sua empresa economizar."
                canonical="/calculadoras/simples-vs-presumido"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": TAX_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Simples vs Presumido', href: '/calculadoras/simples-vs-presumido' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Building2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm text-gray-300">Planejamento Tributário</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Simples Nacional ou <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Lucro Presumido?</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Não jogue dinheiro fora pagando impostos errados. Simule qual regime tributário é mais barato para a sua empresa em 2025.
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
                                Dados da Empresa
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Atividade Principal</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            onClick={() => setActivity('servicos')}
                                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${activity === 'servicos' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            Serviços
                                        </button>
                                        <button
                                            onClick={() => setActivity('comercio')}
                                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${activity === 'comercio' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            Comércio
                                        </button>
                                        <button
                                            onClick={() => setActivity('industria')}
                                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${activity === 'industria' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            Indústria
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Faturamento Mensal Médio (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={monthlyBilling}
                                            onChange={(e) => setMonthlyBilling(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="Ex: 30000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Folha de Pagamento Mensal (R$)</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={monthlyPayroll}
                                            onChange={(e) => setMonthlyPayroll(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="Salários + Pró-labore"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Importante para cálculo do Fator R e INSS Patronal.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6">
                            <div className="flex gap-3">
                                <AlertTriangle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Atenção ao Fator R</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        Empresas de serviço podem pagar menos no Simples se a folha de pagamento for maior que 28% do faturamento. A calculadora verifica isso automaticamente.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {result ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-8"
                                    >
                                        <div className={`rounded-2xl p-8 border ${result.recommendation === 'simples' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-teal-500/10 border-teal-500/20'} text-center`}>
                                            <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Melhor Opção para Você</h3>
                                            <div className="text-4xl font-bold text-white mb-2">
                                                {result.recommendation === 'simples' ? 'Simples Nacional' : 'Lucro Presumido'}
                                            </div>
                                            <p className="text-lg text-gray-300">
                                                Economia estimada de <span className="font-bold text-white">{formatCurrency(result.difference)}/mês</span>
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className={`rounded-2xl p-6 border transition-all ${result.recommendation === 'simples' ? 'bg-white/10 border-emerald-500/50 scale-[1.02]' : 'bg-white/5 border-white/5 opacity-70'}`}>
                                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                                    Simples Nacional
                                                    {result.recommendation === 'simples' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                                                </h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400">Imposto Mensal:</span>
                                                        <span className="text-white font-bold">{formatCurrency(result.simplesTax)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400">Alíquota Efetiva:</span>
                                                        <span className="text-emerald-400 font-bold">{(result.effectiveRateSimples * 100).toFixed(2)}%</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-white/5">
                                                        Enquadramento: {result.effectiveAnexo}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`rounded-2xl p-6 border transition-all ${result.recommendation === 'presumido' ? 'bg-white/10 border-teal-500/50 scale-[1.02]' : 'bg-white/5 border-white/5 opacity-70'}`}>
                                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                                    Lucro Presumido
                                                    {result.recommendation === 'presumido' && <CheckCircle2 className="w-5 h-5 text-teal-400" />}
                                                </h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400">Imposto Mensal:</span>
                                                        <span className="text-white font-bold">{formatCurrency(result.presumidoTax)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400">Alíquota Efetiva:</span>
                                                        <span className="text-teal-400 font-bold">{((result.presumidoTax / monthlyBilling) * 100).toFixed(2)}%</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-white/5">
                                                        Inclui Federais + {activity === 'servicos' ? 'ISS' : 'ICMS'} + INSS Patronal
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                                                <TrendingDown className="w-4 h-4 text-gray-400" />
                                                Detalhamento Lucro Presumido
                                            </h3>
                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="block text-gray-500 mb-1">Impostos Federais</span>
                                                    <span className="text-white font-bold">{formatCurrency(result.presumidoBreakdown.federal)}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-gray-500 mb-1">{activity === 'servicos' ? 'ISS (Municipal)' : 'ICMS (Estadual)'}</span>
                                                    <span className="text-white font-bold">{formatCurrency(result.presumidoBreakdown.local)}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-gray-500 mb-1">INSS Patronal</span>
                                                    <span className="text-red-400 font-bold">{formatCurrency(result.presumidoBreakdown.inss)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Scale className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para comparar os regimes</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Simples Nacional nem sempre é "Simples"</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Escolher o regime tributário errado pode custar milhares de reais por ano ao seu negócio. Muitos empresários entram no Simples Nacional por padrão, sem saber que, dependendo do faturamento e da atividade, o Lucro Presumido pode ser muito mais vantajoso.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">As Diferenças Básicas</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                                <h3 className="text-xl font-bold text-emerald-400 mb-4">1. Simples Nacional</h3>
                                <p className="text-gray-400 mb-4">Unifica 8 impostos em uma única guia (DAS). As alíquotas são progressivas.</p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2 text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Isenção de INSS Patronal</li>
                                    <li className="flex items-center gap-2 text-gray-300"><AlertTriangle className="w-4 h-4 text-yellow-500" /> Alíquota sobe com faturamento</li>
                                </ul>
                            </div>
                            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                                <h3 className="text-xl font-bold text-teal-400 mb-4">2. Lucro Presumido</h3>
                                <p className="text-gray-400 mb-4">Impostos calculados separadamente. O governo "presume" seu lucro.</p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2 text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Alíquotas federais fixas</li>
                                    <li className="flex items-center gap-2 text-gray-300"><AlertTriangle className="w-4 h-4 text-red-500" /> Paga 20% de INSS Patronal</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como a calculadora decide?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">
                                Nossa ferramenta cruza três dados vitais do seu negócio:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0" />
                                    <span><strong>Faturamento Mensal:</strong> Define em qual faixa do Simples você se encaixa.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0" />
                                    <span><strong>Folha de Pagamento:</strong> Calcula o peso do INSS Patronal e verifica o Fator R.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0" />
                                    <span><strong>Atividade (CNAE):</strong> Define as regras específicas de cada setor.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <FAQ
                        items={TAX_FAQS}
                        title="Perguntas Frequentes"
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
