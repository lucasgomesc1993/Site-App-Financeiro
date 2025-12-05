import React, { useState, useEffect } from 'react';
import { Layers, Calculator, HelpCircle, Ruler, Grid, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const TILE_FAQS: FAQItem[] = [
    {
        question: "Como medir a área da parede ou piso?",
        answer: "Multiplique a largura pelo comprimento (ou altura). Exemplo: Uma parede de 3 metros de largura por 2,5 metros de altura tem 7,5m² (3 x 2,5)."
    },
    {
        question: "O que é a margem de perda?",
        answer: "É uma quantidade extra de material comprada para cobrir quebras, recortes e ajustes nos cantos. Recomendamos 10% para colocação reta e 15% para diagonal."
    },
    {
        question: "Essa calculadora serve para qualquer tipo de piso?",
        answer: "Sim, serve para cerâmica, porcelanato, laminado, vinílico e até tijolos, desde que você saiba as medidas da peça."
    }
];

export function TileBricksCalculatorPage() {
    const [areaWidth, setAreaWidth] = useState('');
    const [areaLength, setAreaLength] = useState('');
    const [pieceWidth, setPieceWidth] = useState(''); // in cm
    const [pieceLength, setPieceLength] = useState(''); // in cm
    const [margin, setMargin] = useState(10); // percentage

    const [result, setResult] = useState<{ pieces: number; totalArea: number } | null>(null);

    const calculate = () => {
        const aw = parseFloat(areaWidth.replace(',', '.'));
        const al = parseFloat(areaLength.replace(',', '.'));
        const pw = parseFloat(pieceWidth.replace(',', '.'));
        const pl = parseFloat(pieceLength.replace(',', '.'));

        if (isNaN(aw) || isNaN(al) || isNaN(pw) || isNaN(pl) || pw === 0 || pl === 0) {
            setResult(null);
            return;
        }

        const areaM2 = aw * al;
        const pieceM2 = (pw / 100) * (pl / 100); // convert cm to m

        const rawPieces = areaM2 / pieceM2;
        const totalPieces = Math.ceil(rawPieces * (1 + margin / 100));

        setResult({
            pieces: totalPieces,
            totalArea: areaM2
        });
    };

    useEffect(() => {
        calculate();
    }, [areaWidth, areaLength, pieceWidth, pieceLength, margin]);

    const handleInput = (value: string, setter: (value: string) => void) => {
        if (/^[\d.,]*$/.test(value)) {
            setter(value);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Pisos e Tijolos",
        "description": "Calcule a quantidade exata de pisos, azulejos ou tijolos para sua obra.",
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
                title="Calculadora de Pisos e Tijolos Online - Quantidade Exata"
                description="Vai reformar? Calcule a quantidade de pisos, porcelanato ou tijolos necessários para sua obra, já incluindo a margem de perda."
                canonical="/calculadoras/tijolos-pisos"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": TILE_FAQS.map(faq => ({
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
                        { label: 'Pisos e Tijolos', href: '/calculadoras/tijolos-pisos' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Layers className="w-4 h-4 text-rose-500" />
                            <span className="text-sm text-gray-300">Dia a Dia e Utilidades</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Pisos e Tijolos</span>
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
                                    <Calculator className="w-5 h-5 text-rose-500" />
                                    Calcular Material
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <Ruler className="w-4 h-4 text-rose-500" />
                                        Dimensões da Área (Parede ou Chão)
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500">Largura (metros)</label>
                                            <input
                                                type="text"
                                                value={areaWidth}
                                                onChange={(e) => handleInput(e.target.value, setAreaWidth)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                                placeholder="Ex: 3,50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500">Comprimento (metros)</label>
                                            <input
                                                type="text"
                                                value={areaLength}
                                                onChange={(e) => handleInput(e.target.value, setAreaLength)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                                placeholder="Ex: 4,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <Grid className="w-4 h-4 text-rose-500" />
                                        Dimensões da Peça (Piso ou Tijolo)
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500">Largura (cm)</label>
                                            <input
                                                type="text"
                                                value={pieceWidth}
                                                onChange={(e) => handleInput(e.target.value, setPieceWidth)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                                placeholder="Ex: 60"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500">Comprimento (cm)</label>
                                            <input
                                                type="text"
                                                value={pieceLength}
                                                onChange={(e) => handleInput(e.target.value, setPieceLength)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                                placeholder="Ex: 60"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-4 border-t border-white/5">
                                    <label className="text-sm text-gray-400 flex justify-between">
                                        <span>Margem de Perda (Quebras/Recortes)</span>
                                        <span className="text-white font-bold">{margin}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="30"
                                        step="5"
                                        value={margin}
                                        onChange={(e) => setMargin(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                    />
                                    <p className="text-xs text-gray-500 text-right">Recomendado: 10% a 15%</p>
                                </div>

                                <div className="pt-6 border-t border-white/5 text-center">
                                    <p className="text-gray-400 text-sm mb-2">Quantidade Necessária</p>
                                    <div className="text-5xl font-bold text-white mb-2">
                                        {result ? result.pieces : '---'} <span className="text-2xl text-gray-500 font-normal">peças</span>
                                    </div>
                                    {result && (
                                        <p className="text-sm text-gray-500">
                                            Para cobrir uma área de {result.totalArea.toLocaleString('pt-BR')}m².
                                        </p>
                                    )}
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
                                Dicas Importantes
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Rodapé:</strong> Se for usar o mesmo piso para o rodapé, considere uma margem de perda maior (15-20%).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Lote:</strong> Compre tudo de uma vez. Lotes diferentes podem ter leve variação de cor.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                    <span><strong>Reserva:</strong> Guarde sempre 2 ou 3 peças extras no sótão para reparos futuros.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Evite sobras ou falta de material. Calcule a quantidade exata para sua reforma.
                    </p>
                </div>

                <FAQ
                    items={TILE_FAQS}
                    title="Dúvidas sobre Cálculo de Pisos"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
