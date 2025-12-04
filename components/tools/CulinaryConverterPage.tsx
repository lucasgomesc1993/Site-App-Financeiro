import React, { useState, useEffect } from 'react';
import { ChefHat, ArrowRightLeft, HelpCircle, Scale, Beaker, Info, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

type Ingredient = {
    id: string;
    name: string;
    density: number; // grams per ml
};

type Unit = {
    id: string;
    name: string;
    ml: number;
    type: 'volume' | 'weight';
};

const INGREDIENTS: Ingredient[] = [
    { id: 'water', name: 'Água / Leite / Líquidos', density: 1 },
    { id: 'flour', name: 'Farinha de Trigo', density: 120 / 240 }, // 120g per 240ml cup
    { id: 'sugar_refined', name: 'Açúcar Refinado', density: 180 / 240 },
    { id: 'sugar_brown', name: 'Açúcar Mascavo', density: 150 / 240 },
    { id: 'cocoa', name: 'Chocolate em Pó', density: 90 / 240 },
    { id: 'cornstarch', name: 'Amido de Milho (Maizena)', density: 150 / 240 },
    { id: 'oats', name: 'Aveia em Flocos', density: 80 / 240 },
    { id: 'butter', name: 'Manteiga', density: 200 / 240 },
    { id: 'rice', name: 'Arroz Cru', density: 185 / 240 },
];

const UNITS: Unit[] = [
    { id: 'cup', name: 'Xícara (240ml)', ml: 240, type: 'volume' },
    { id: 'tbsp', name: 'Colher de Sopa (15ml)', ml: 15, type: 'volume' },
    { id: 'dsp', name: 'Colher de Sobremesa (10ml)', ml: 10, type: 'volume' },
    { id: 'tsp', name: 'Colher de Chá (5ml)', ml: 5, type: 'volume' },
    { id: 'ml', name: 'Mililitros (ml)', ml: 1, type: 'volume' },
    { id: 'g', name: 'Gramas (g)', ml: 0, type: 'weight' }, // Special handling
];

const CULINARY_FAQS: FAQItem[] = [
    {
        question: "Quanto pesa 1 xícara de farinha?",
        answer: "No padrão brasileiro (xícara de 240ml), a farinha de trigo pesa cerca de 120g. Se você compactar a farinha, pode chegar a 150g, o que estraga a receita."
    },
    {
        question: "Posso usar qualquer xícara?",
        answer: "Não! Xícaras de chá variam de 180ml a 300ml. Para confeitaria, use sempre medidores padronizados de 240ml."
    },
    {
        question: "Colher de sopa é a de comer?",
        answer: "Nem sempre. Os faqueiros modernos têm colheres de tamanhos variados. A medida padrão de colher de sopa é 15ml."
    },
    {
        question: "ml e gramas são a mesma coisa?",
        answer: "Apenas para água! 1ml de água pesa 1g. Para outros ingredientes, a densidade muda (ex: 1ml de óleo pesa menos que 1g, 1ml de mel pesa mais)."
    }
];

export function CulinaryConverterPage() {
    const [ingredientId, setIngredientId] = useState('flour');
    const [amount, setAmount] = useState('1');
    const [fromUnitId, setFromUnitId] = useState('cup');
    const [toUnitId, setToUnitId] = useState('g');
    const [result, setResult] = useState<string>('---');

    const calculate = () => {
        const val = parseFloat(amount.replace(',', '.'));
        if (isNaN(val)) {
            setResult('---');
            return;
        }

        const ingredient = INGREDIENTS.find(i => i.id === ingredientId);
        const fromUnit = UNITS.find(u => u.id === fromUnitId);
        const toUnit = UNITS.find(u => u.id === toUnitId);

        if (!ingredient || !fromUnit || !toUnit) return;

        let grams = 0;

        // Convert FROM unit to Grams
        if (fromUnit.type === 'weight') {
            grams = val;
        } else {
            // Volume to Weight: ml * density
            grams = val * fromUnit.ml * ingredient.density;
        }

        // Convert Grams to TO unit
        let finalValue = 0;
        if (toUnit.type === 'weight') {
            finalValue = grams;
        } else {
            // Weight to Volume: grams / density / unit_ml
            finalValue = grams / ingredient.density / toUnit.ml;
        }

        // Formatting
        if (toUnit.id === 'g' || toUnit.id === 'ml') {
            setResult(Math.round(finalValue).toString());
        } else {
            setResult(finalValue.toFixed(2).replace('.00', ''));
        }
    };

    useEffect(() => {
        calculate();
    }, [ingredientId, amount, fromUnitId, toUnitId]);

    const handleSwap = () => {
        setFromUnitId(toUnitId);
        setToUnitId(fromUnitId);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Conversor Culinário",
        "description": "Converta medidas culinárias (xícaras, colheres, gramas e ml).",
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
                title="Conversor de Medidas Culinárias - Xícaras para Gramas e ML"
                description="Não erre a receita! Converta xícaras, colheres de sopa e chá para gramas ou mililitros. Tabelas precisas para farinha, açúcar, manteiga e líquidos."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

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
                            <ChefHat className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Culinária e Receitas</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Conversor <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Culinário</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Xícaras para gramas, colheres para ml. Acerte o ponto da receita com precisão de chef.
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
                                    <label className="block text-xs text-gray-500 mb-1">Ingrediente</label>
                                    <select
                                        value={ingredientId}
                                        onChange={(e) => setIngredientId(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                    >
                                        {INGREDIENTS.map(i => (
                                            <option key={i.id} value={i.id}>{i.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">De</label>
                                        <select
                                            value={fromUnitId}
                                            onChange={(e) => setFromUnitId(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
                                        >
                                            {UNITS.map(u => (
                                                <option key={u.id} value={u.id}>{u.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        onClick={handleSwap}
                                        className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors mb-[1px]"
                                        title="Inverter unidades"
                                    >
                                        <ArrowRightLeft className="w-4 h-4 text-primary" />
                                    </button>

                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Para</label>
                                        <select
                                            value={toUnitId}
                                            onChange={(e) => setToUnitId(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
                                        >
                                            {UNITS.map(u => (
                                                <option key={u.id} value={u.id}>{u.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Quantidade</label>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center text-lg"
                                        placeholder="Ex: 1"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <p className="text-center text-gray-400 mb-2">Resultado</p>
                                <div className="text-5xl font-bold text-center text-primary mb-2">
                                    {result} <span className="text-2xl text-gray-500">{UNITS.find(u => u.id === toUnitId)?.name.split('(')[0].trim()}</span>
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
                                <HelpCircle className="w-5 h-5 text-primary" />
                                Peso vs. Volume
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    Na cozinha, precisão é tudo. O maior erro é achar que "1 xícara" é sempre a mesma coisa.
                                </p>
                                <p>
                                    Para sólidos, a densidade muda tudo: 1 xícara de farinha pesa muito menos que 1 xícara de açúcar. Se trocar sem converter, o bolo sola ou fica doce demais.
                                </p>
                            </div>
                        </div>

                        <div className="bg-yellow-500/10 p-6 rounded-3xl border border-yellow-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400">
                                <Info className="w-5 h-5" />
                                Dica de Ouro
                            </h3>
                            <p className="text-sm text-gray-300">
                                Ao medir farinha em xícaras, <strong>nunca compacte o pó</strong> batendo a xícara na mesa! Isso faz caber mais farinha do que a receita pede, deixando a massa pesada. O correto é encher soltinho e nivelar com uma faca.
                            </p>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <Beaker className="w-5 h-5 text-primary" />
                                Tabela Rápida (1 Xícara)
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between p-2 rounded bg-white/5 border border-white/5">
                                    <span>Farinha de Trigo</span>
                                    <span className="text-white font-bold">120g</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5 border border-white/5">
                                    <span>Açúcar Refinado</span>
                                    <span className="text-white font-bold">180g</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5 border border-white/5">
                                    <span>Chocolate em Pó</span>
                                    <span className="text-white font-bold">90g</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5 border border-white/5">
                                    <span>Manteiga</span>
                                    <span className="text-white font-bold">200g</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={CULINARY_FAQS}
                    title="Dúvidas Frequentes sobre Medidas"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
