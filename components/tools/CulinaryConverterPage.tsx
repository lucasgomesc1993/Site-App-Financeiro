import React, { useState, useEffect } from 'react';
import { ChefHat, Calculator, HelpCircle, Scale, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const CULINARY_FAQS: FAQItem[] = [
    {
        question: "Quanto pesa 1 xícara de farinha?",
        answer: "Aproximadamente 120g. O peso varia conforme o ingrediente (densidade). Por isso, 1 xícara de açúcar (160g) pesa mais que 1 xícara de farinha."
    },
    {
        question: "Posso usar qualquer xícara?",
        answer: "Em receitas profissionais, 'xícara' é uma medida padrão de 240ml. Xícaras de café ou chá da sua casa podem ter tamanhos diferentes."
    },
    {
        question: "Colher de sopa é medida padrão?",
        answer: "Sim, 1 colher de sopa padrão tem 15ml. Já a colher de chá tem 5ml."
    }
];

const INGREDIENTS = [
    { name: 'Farinha de Trigo', density: 120 }, // g per cup (240ml)
    { name: 'Açúcar Refinado', density: 160 },
    { name: 'Açúcar Mascavo', density: 150 },
    { name: 'Arroz Cru', density: 185 },
    { name: 'Aveia em Flocos', density: 80 },
    { name: 'Cacau em Pó', density: 90 },
    { name: 'Manteiga', density: 200 },
    { name: 'Leite / Água', density: 240 },
    { name: 'Mel', density: 340 },
];

export function CulinaryConverterPage() {
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState<'cups' | 'grams'>('cups');
    const [ingredientIndex, setIngredientIndex] = useState(0);
    const [result, setResult] = useState<string>('---');

    const calculate = () => {
        const val = parseFloat(amount.replace(',', '.'));
        if (isNaN(val)) {
            setResult('---');
            return;
        }

        const density = INGREDIENTS[ingredientIndex].density; // g per 1 cup

        if (unit === 'cups') {
            // Convert cups to grams
            const grams = val * density;
            setResult(`${Math.round(grams)}g`);
        } else {
            // Convert grams to cups
            const cups = val / density;
            setResult(`${cups.toFixed(2)} xícaras`);
        }
    };

    useEffect(() => {
        calculate();
    }, [amount, unit, ingredientIndex]);

    const handleInput = (value: string) => {
        if (/^[\d.,]*$/.test(value)) {
            setAmount(value);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Conversor Culinário",
        "description": "Converta medidas culinárias (xícaras para gramas) facilmente.",
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
                title="Conversor de Medidas Culinárias - Xícaras para Gramas"
                description="Não erre na receita. Converta xícaras para gramas (e vice-versa) para farinha, açúcar, manteiga e outros ingredientes."
                canonical="/calculadoras/conversor-culinario"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CULINARY_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Conversor Culinário', href: '/calculadoras/conversor-culinario' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <ChefHat className="w-4 h-4 text-rose-500" />
                            <span className="text-sm text-gray-300">Dia a Dia e Utilidades</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Conversor <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Culinário</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Transforme xícaras em gramas e acerte o ponto da sua receita.
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
                                    <Scale className="w-5 h-5 text-rose-500" />
                                    Converter
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Ingrediente</label>
                                    <select
                                        value={ingredientIndex}
                                        onChange={(e) => setIngredientIndex(parseInt(e.target.value))}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all appearance-none cursor-pointer"
                                    >
                                        {INGREDIENTS.map((ing, index) => (
                                            <option key={index} value={index}>{ing.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Quantidade</label>
                                        <input
                                            type="text"
                                            value={amount}
                                            onChange={(e) => handleInput(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                            placeholder="Ex: 1"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Unidade</label>
                                        <div className="flex bg-[#0a0a0a] rounded-xl p-1 border border-white/10">
                                            <button
                                                onClick={() => setUnit('cups')}
                                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === 'cups' ? 'bg-rose-500 text-white' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                Xícaras
                                            </button>
                                            <button
                                                onClick={() => setUnit('grams')}
                                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === 'grams' ? 'bg-rose-500 text-white' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                Gramas
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 text-center">
                                    <p className="text-gray-400 text-sm mb-2">Resultado</p>
                                    <div className="text-5xl font-bold text-white">
                                        {result}
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
                                <HelpCircle className="w-5 h-5 text-rose-500" />
                                Tabela Rápida
                            </h3>
                            <div className="space-y-3 text-sm text-gray-400">
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span>1 xícara de Farinha</span>
                                    <span className="text-white font-bold">120g</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span>1 xícara de Açúcar</span>
                                    <span className="text-white font-bold">160g</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span>1 xícara de Chocolate em Pó</span>
                                    <span className="text-white font-bold">90g</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span>1 xícara de Manteiga</span>
                                    <span className="text-white font-bold">200g</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={CULINARY_FAQS}
                    title="Dúvidas sobre Medidas Culinárias"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
