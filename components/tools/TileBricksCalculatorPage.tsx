import React, { useState, useEffect } from 'react';
import { Ruler, Layers, Grid, HelpCircle, Info, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

type Mode = 'bricks' | 'tiles';
type BrickType = 'baiano' | 'macico' | 'custom';
type Orientation = 'standing' | 'lying';

const TILE_BRICKS_FAQS: FAQItem[] = [
    {
        question: "Qual a margem de quebra ideal?",
        answer: "Para pisos retos, 10% é suficiente. Para pisos na diagonal, use 15% a 20%. Para tijolos, 10% costuma cobrir as quebras de transporte e manuseio."
    },
    {
        question: "Quantos tijolos baianos por metro quadrado?",
        answer: "Em média: 25 a 28 peças/m² (em pé/parede de 15cm) ou 38 a 42 peças/m² (deitado/parede de 25cm)."
    },
    {
        question: "Como calcular rodapé?",
        answer: "Se for usar o próprio piso, meça o perímetro do ambiente (soma das paredes) e divida pelo comprimento da peça. Adicione 15% de margem para os recortes."
    },
    {
        question: "Qual a diferença entre tijolo baiano e maciço?",
        answer: "O baiano (furado) é mais leve e rende mais, ideal para vedação. O maciço é mais pesado, estético e térmico, usado em churrasqueiras e paredes aparentes."
    }
];

export function TileBricksCalculatorPage() {
    const [mode, setMode] = useState<Mode>('bricks');

    // Common State
    const [wallWidth, setWallWidth] = useState('');
    const [wallHeight, setWallHeight] = useState('');
    const [totalArea, setTotalArea] = useState<number | null>(null);
    const [margin, setMargin] = useState('10');

    // Brick State
    const [brickType, setBrickType] = useState<BrickType>('baiano');
    const [orientation, setOrientation] = useState<Orientation>('standing');
    const [brickWidth, setBrickWidth] = useState('');
    const [brickHeight, setBrickHeight] = useState('');

    // Tile State
    const [tileWidth, setTileWidth] = useState('');
    const [tileLength, setTileLength] = useState('');
    const [includeSkirting, setIncludeSkirting] = useState(false);

    const [result, setResult] = useState<number | null>(null);

    // Presets
    useEffect(() => {
        if (mode === 'bricks') {
            if (brickType === 'baiano') {
                if (orientation === 'standing') {
                    setBrickWidth('19');
                    setBrickHeight('29');
                } else {
                    setBrickWidth('14');
                    setBrickHeight('24');
                }
            } else if (brickType === 'macico') {
                if (orientation === 'standing') {
                    setBrickWidth('5');
                    setBrickHeight('20');
                } else {
                    setBrickWidth('10');
                    setBrickHeight('20');
                }
            }
        }
    }, [brickType, orientation, mode]);

    useEffect(() => {
        if (includeSkirting) {
            setMargin('15');
        } else {
            setMargin('10');
        }
    }, [includeSkirting]);

    const calculate = () => {
        const w = parseFloat(wallWidth.replace(',', '.'));
        const h = parseFloat(wallHeight.replace(',', '.'));

        if (isNaN(w) || isNaN(h)) {
            setTotalArea(null);
            setResult(null);
            return;
        }

        const area = w * h;
        setTotalArea(area);

        let unitArea = 0;

        if (mode === 'bricks') {
            const bw = parseFloat(brickWidth.replace(',', '.'));
            const bh = parseFloat(brickHeight.replace(',', '.'));
            if (isNaN(bw) || isNaN(bh) || bw === 0 || bh === 0) return;
            // Convert cm to m
            unitArea = (bw / 100) * (bh / 100);
        } else {
            const tw = parseFloat(tileWidth.replace(',', '.'));
            const tl = parseFloat(tileLength.replace(',', '.'));
            if (isNaN(tw) || isNaN(tl) || tw === 0 || tl === 0) return;
            // Convert cm to m
            unitArea = (tw / 100) * (tl / 100);
        }

        if (unitArea > 0) {
            const baseQty = area / unitArea;
            const marginVal = parseFloat(margin) || 0;
            const finalQty = baseQty * (1 + marginVal / 100);
            setResult(Math.ceil(finalQty));
        }
    };

    useEffect(() => {
        calculate();
    }, [wallWidth, wallHeight, brickWidth, brickHeight, tileWidth, tileLength, margin, mode]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Tijolos e Pisos",
        "description": "Calcule a quantidade de tijolos ou pisos por metro quadrado.",
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
                title="Calculadora de Tijolos e Pisos - Quantidade por M²"
                description="Evite desperdício na obra. Calcule quantos tijolos ou caixas de piso comprar, considerando a área total e a margem de quebra de 10%."
                canonical="/calculadoras/tijolos-pisos"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": TILE_BRICKS_FAQS.map(faq => ({
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
                        { label: 'Calculadora de Materiais', href: '/calculadoras/tijolos-pisos' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Layers className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Construção e Reforma</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Materiais</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Tijolos e Pisos: descubra a quantidade exata e evite sobras ou faltas no meio da obra.
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
                            {/* Tabs */}
                            <div className="flex p-1 bg-[#0a0a0a] rounded-xl mb-6 border border-white/10">
                                <button
                                    onClick={() => setMode('bricks')}
                                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${mode === 'bricks' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <Grid className="w-4 h-4" />
                                    Tijolos
                                </button>
                                <button
                                    onClick={() => setMode('tiles')}
                                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${mode === 'tiles' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <Layers className="w-4 h-4" />
                                    Pisos
                                </button>
                            </div>

                            {/* Area Inputs */}
                            <div className="space-y-4 mb-6">
                                <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-primary" />
                                    Dimensões da Área (Parede ou Chão)
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Largura (m)</label>
                                        <input
                                            type="text"
                                            value={wallWidth}
                                            onChange={(e) => setWallWidth(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center"
                                            placeholder="3.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Altura/Comp. (m)</label>
                                        <input
                                            type="text"
                                            value={wallHeight}
                                            onChange={(e) => setWallHeight(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center"
                                            placeholder="2.80"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Specific Inputs */}
                            {mode === 'bricks' && (
                                <div className="space-y-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Tipo de Tijolo</label>
                                            <select
                                                value={brickType}
                                                onChange={(e) => setBrickType(e.target.value as BrickType)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
                                            >
                                                <option value="baiano">Baiano (6 furos)</option>
                                                <option value="macico">Maciço (Barro)</option>
                                                <option value="custom">Outro</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Assentamento</label>
                                            <select
                                                value={orientation}
                                                onChange={(e) => setOrientation(e.target.value as Orientation)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
                                            >
                                                <option value="standing">Em pé (fina)</option>
                                                <option value="lying">Deitado (grossa)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Largura Peça (cm)</label>
                                            <input
                                                type="text"
                                                value={brickWidth}
                                                onChange={(e) => { setBrickWidth(e.target.value); setBrickType('custom'); }}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Altura Peça (cm)</label>
                                            <input
                                                type="text"
                                                value={brickHeight}
                                                onChange={(e) => { setBrickHeight(e.target.value); setBrickType('custom'); }}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {mode === 'tiles' && (
                                <div className="space-y-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Largura Peça (cm)</label>
                                            <input
                                                type="text"
                                                value={tileWidth}
                                                onChange={(e) => setTileWidth(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center"
                                                placeholder="60"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Comp. Peça (cm)</label>
                                            <input
                                                type="text"
                                                value={tileLength}
                                                onChange={(e) => setTileLength(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center"
                                                placeholder="60"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-[#0a0a0a] p-3 rounded-xl border border-white/10">
                                        <input
                                            type="checkbox"
                                            id="skirting"
                                            checked={includeSkirting}
                                            onChange={(e) => setIncludeSkirting(e.target.checked)}
                                            className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary bg-gray-800"
                                        />
                                        <label htmlFor="skirting" className="text-sm text-gray-300 cursor-pointer select-none">
                                            Incluir Rodapé (+5% margem)
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div className="mb-6">
                                <label className="block text-xs text-gray-500 mb-1">Margem de Segurança (%)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={margin}
                                        onChange={(e) => setMargin(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <p className="text-center text-gray-400 mb-2">Quantidade Estimada</p>
                                <div className="text-5xl font-bold text-center text-primary">
                                    {result !== null ? result : '---'}
                                </div>
                                <p className="text-center text-sm text-gray-500 mt-2">
                                    unidades {totalArea ? `(para ${totalArea.toLocaleString('pt-BR')} m²)` : ''}
                                </p>
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
                                Como calcular sem erro?
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    O segredo é entender a relação entre a <strong>Área Total</strong> e a <strong>Área da Peça</strong>, nunca esquecendo da margem de quebra.
                                </p>
                                <ul className="space-y-2 list-disc pl-4">
                                    <li><strong>Área Total:</strong> Largura x Altura da parede (ou chão).</li>
                                    <li><strong>Área da Peça:</strong> Largura x Altura do tijolo/piso (em metros).</li>
                                    <li><strong>Divisão:</strong> Área Total ÷ Área da Peça.</li>
                                    <li><strong>Margem:</strong> Adicione 10% (ou mais para recortes).</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-yellow-500/10 p-6 rounded-3xl border border-yellow-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400">
                                <Info className="w-5 h-5" />
                                Dica de Rodapé
                            </h3>
                            <p className="text-sm text-gray-300">
                                Se você vai usar o próprio piso para fazer o rodapé, aumente a margem de segurança para <strong>15% a 20%</strong> para cobrir os recortes lineares.
                            </p>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white">Rendimento Médio</h3>
                            <div className="space-y-3 text-sm text-gray-400">
                                <div>
                                    <strong className="text-white block">Tijolo Baiano (6 furos)</strong>
                                    <p>Em pé (parede 15cm): 25 a 28 peças/m²</p>
                                    <p>Deitado (parede 25cm): 38 a 42 peças/m²</p>
                                </div>
                                <div className="border-t border-white/5 pt-3">
                                    <strong className="text-white block">Tijolo Maciço</strong>
                                    <p>Espelho (em pé): 40 a 45 peças/m²</p>
                                    <p>Deitado (parede grossa): 80 a 90 peças/m²</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={TILE_BRICKS_FAQS}
                    title="Dúvidas Frequentes sobre Materiais"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
