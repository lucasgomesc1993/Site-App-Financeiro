import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, FileText, TrendingDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const INSS_FAQS: FAQItem[] = [
    {
        question: "Como é calculado o INSS?",
        answer: "O cálculo é progressivo. O salário é fatiado em faixas, e cada fatia tem uma alíquota diferente (7,5%, 9%, 12% e 14%). O valor final é a soma do imposto de cada faixa."
    },
    {
        question: "Qual o teto do INSS em 2025?",
        answer: "O teto previdenciário muda anualmente. Em 2024, era R$ 7.786,02. Para 2025, o valor será reajustado pelo governo no início do ano."
    },
    {
        question: "O INSS é descontado do salário bruto?",
        answer: "Sim, o INSS é o primeiro desconto aplicado sobre o salário bruto. O Imposto de Renda (IRRF) é calculado depois, sobre o valor já deduzido do INSS."
    }
];

export function INSSPage() {
    const [salary, setSalary] = useState('');
    const [result, setResult] = useState<{ discount: number; netSalary: number; effectiveRate: number } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));

        if (isNaN(sal)) {
            setResult(null);
            return;
        }

        // Tabela INSS 2024 (Progressiva) - Update values for 2025 when official
        let discount = 0;

        // Faixa 1: até 1.412,00 -> 7,5%
        if (sal <= 1412.00) {
            discount = sal * 0.075;
        } else {
            discount += 1412.00 * 0.075;

            // Faixa 2: de 1.412,01 até 2.666,68 -> 9%
            if (sal <= 2666.68) {
                discount += (sal - 1412.00) * 0.09;
            } else {
                discount += (2666.68 - 1412.00) * 0.09;

                // Faixa 3: de 2.666,69 até 4.000,03 -> 12%
                if (sal <= 4000.03) {
                    discount += (sal - 2666.68) * 0.12;
                } else {
                    discount += (4000.03 - 2666.68) * 0.12;

                    // Faixa 4: de 4.000,04 até 7.786,02 -> 14%
                    if (sal <= 7786.02) {
                        discount += (sal - 4000.03) * 0.14;
                    } else {
                        // Teto
                        discount += (7786.02 - 4000.03) * 0.14;
                    }
                }
            }
        }

        // Cap at ceiling
        const ceilingDiscount = 908.85; // Approx ceiling discount for 2024
        // Or calculate exactly:
        // 1412*0.075 + (2666.68-1412)*0.09 + (4000.03-2666.68)*0.12 + (7786.02-4000.03)*0.14 = 105.9 + 112.92 + 160.00 + 530.03 = 908.85

        if (sal > 7786.02) {
            // If salary is above ceiling, discount is fixed at ceiling calculation
            // Re-calculating exactly to be safe
            let maxDiscount = 1412.00 * 0.075;
            maxDiscount += (2666.68 - 1412.00) * 0.09;
            maxDiscount += (4000.03 - 2666.68) * 0.12;
            maxDiscount += (7786.02 - 4000.03) * 0.14;
            discount = maxDiscount;
        }

        setResult({
            discount,
            netSalary: sal - discount,
            effectiveRate: (discount / sal) * 100
        });
    };

    useEffect(() => {
        calculate();
    }, [salary]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de INSS 2025",
        "description": "Calcule o desconto do INSS no seu salário. Tabela atualizada e cálculo progressivo automático.",
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
                title="Calculadora de INSS 2025 - Tabela Atualizada"
                description="Quanto vai ser descontado de INSS do seu salário? Use nossa calculadora oficial com a tabela progressiva de 2025."
                canonical="/calculadoras/inss"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": INSS_FAQS.map(faq => ({
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
                        { label: 'INSS 2025', href: '/calculadoras/inss' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <FileText className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">INSS</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Descubra o valor exato do desconto previdenciário no seu contracheque.
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
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Calcular Desconto
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Salário Bruto</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={salary}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setSalary)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Valor do Desconto INSS</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Alíquota Efetiva</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `${result.effectiveRate.toFixed(2)}%` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Salário Pós-INSS</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                                <TrendingDown className="w-5 h-5 text-blue-500" />
                                Tabela Progressiva
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Até R$ 1.412,00</span>
                                    <span className="text-white font-mono">7,5%</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>De 1.412,01 a 2.666,68</span>
                                    <span className="text-white font-mono">9%</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>De 2.666,69 a 4.000,03</span>
                                    <span className="text-white font-mono">12%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>De 4.000,04 a 7.786,02</span>
                                    <span className="text-white font-mono">14%</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={INSS_FAQS}
                    title="Dúvidas sobre INSS"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
