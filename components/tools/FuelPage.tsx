import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Fuel, TrendingUp, DollarSign, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const FUEL_FAQS: FAQItem[] = [
    {
        question: "Como saber qual o melhor entre álcool e gasolina?",
        answer: "A regra geral é dividir o preço do litro do álcool pelo da gasolina. Se o resultado for menor ou igual a 0,7 (70%), o álcool compensa mais. Se for maior que 0,7, a gasolina é a melhor opção para o seu bolso e rendimento do veículo."
    },
    {
        question: "Quando vale mais a pena abastecer com álcool?",
        answer: "Vale a pena abastecer com álcool (etanol) quando o seu preço for até 70% do valor da gasolina. Além da economia financeira, o etanol costuma dar mais potência ao motor, embora seja consumido mais rapidamente."
    },
    {
        question: "Quando vale mais a pena abastecer com gasolina?",
        answer: "A gasolina compensa quando o preço do etanol ultrapassa 70% do valor da gasolina. A gasolina oferece maior autonomia, permitindo rodar mais quilômetros com um tanque cheio, o que é ideal para viagens longas."
    },
    {
        question: "Qual combustível vale mais a pena na hora de abastecer?",
        answer: "Depende da relação de preços no momento. Utilize nossa calculadora gratuita sempre que for ao posto: basta inserir os valores atuais da bomba para ter a resposta exata de qual combustível trará mais economia para você."
    }
];

export const FuelPage: React.FC = () => {
    const [alcoholPrice, setAlcoholPrice] = useState<number>(0);
    const [gasolinePrice, setGasolinePrice] = useState<number>(0);
    const [result, setResult] = useState<{ ratio: number; bestOption: 'alcohol' | 'gasoline' | null }>({ ratio: 0, bestOption: null });

    useEffect(() => {
        if (alcoholPrice > 0 && gasolinePrice > 0) {
            const ratio = alcoholPrice / gasolinePrice;
            setResult({
                ratio,
                bestOption: ratio <= 0.7 ? 'alcohol' : 'gasoline'
            });
        } else {
            setResult({ ratio: 0, bestOption: null });
        }
    }, [alcoholPrice, gasolinePrice]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const formatPercent = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 1 }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora Álcool ou Gasolina FinZap",
        "description": "Descubra qual combustível vale mais a pena para o seu carro.",
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
                title="Calculadora Álcool ou Gasolina - Qual Vale a Pena?"
                description="Descubra qual combustível compensa mais para o seu bolso agora mesmo. Simples, rápido e direto."
                canonical="/calculadoras/combustivel"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": FUEL_FAQS.map(faq => ({
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
                        { label: 'Calculadora de Combustível', href: '/calculadoras/combustivel' }
                    ]} />


                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Fuel className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Economia no Tanque</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Álcool ou Gasolina</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Descubra qual combustível compensa mais para o seu bolso agora mesmo. Simples, rápido e direto.
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
                                Preços na Bomba
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="alcoholPrice" className="block text-sm text-gray-400 mb-2">Preço do Álcool (Etanol)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="alcoholPrice"
                                            type="number"
                                            step="0.01"
                                            placeholder="0,00"
                                            value={alcoholPrice || ''}
                                            onChange={(e) => setAlcoholPrice(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="gasolinePrice" className="block text-sm text-gray-400 mb-2">Preço da Gasolina</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="gasolinePrice"
                                            type="number"
                                            step="0.01"
                                            placeholder="0,00"
                                            value={gasolinePrice || ''}
                                            onChange={(e) => setGasolinePrice(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10 text-center">
                                {result.bestOption ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    >
                                        <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Melhor Opção</h2>
                                        <div className="text-5xl md:text-7xl font-bold text-white mb-4">
                                            {result.bestOption === 'alcohol' ? (
                                                <span className="text-primary">Álcool</span>
                                            ) : (
                                                <span className="text-emerald-400">Gasolina</span>
                                            )}
                                        </div>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                                            <TrendingUp className="w-4 h-4 text-primary" />
                                            <span className="text-sm text-gray-300">
                                                O álcool custa <span className="text-white font-bold">{formatPercent(result.ratio)}</span> do valor da gasolina
                                            </span>
                                        </div>

                                        <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                                            {result.bestOption === 'alcohol'
                                                ? "O preço do etanol está abaixo de 70% do valor da gasolina. Vale a pena abastecer com álcool para economizar!"
                                                : "O preço do etanol está acima de 70% do valor da gasolina. A gasolina renderá mais e é a escolha mais econômica."}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 opacity-50">
                                        <Fuel className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg">Preencha os valores para calcular</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg"
                >
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Álcool ou gasolina: quando um compensa mais que o outro?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Para entender quando um tipo de combustível compensa mais financeiramente do que o outro, basta checar a proporção entre o preço de cada um.
                                A regra de ouro é a <strong>proporção de 70%</strong>.
                            </p>
                            <p className="mb-4">
                                Abastecer com <strong>álcool (etanol)</strong> é recomendado quando o preço for até 70% do valor da gasolina. Caso ultrapasse os 70%, compensa mais abastecer com <strong>gasolina</strong>.
                            </p>
                            <p>
                                Isso acontece porque o etanol tem um poder calorífico menor, ou seja, rende cerca de 30% a menos que a gasolina. Portanto, para que seja vantajoso financeiramente, ele precisa custar no máximo 70% do preço da gasolina.
                            </p>
                        </div>
                    </section>

                    <section className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
                                Exemplo: Álcool Vantajoso
                            </h3>
                            <p className="text-gray-400 mb-4">
                                Posto com Álcool a <strong>R$ 4,00</strong> e Gasolina a <strong>R$ 6,00</strong>.
                            </p>
                            <div className="bg-black/30 p-4 rounded-xl font-mono text-sm text-gray-300">
                                4,00 ÷ 6,00 = 0,66 (66%)
                            </div>
                            <p className="text-green-400 mt-4 text-sm font-medium">
                                Resultado menor que 0,7. Compensa abastecer com Álcool.
                            </p>
                        </div>

                        <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">2</div>
                                Exemplo: Gasolina Vantajosa
                            </h3>
                            <p className="text-gray-400 mb-4">
                                Posto com Álcool a <strong>R$ 4,29</strong> e Gasolina a <strong>R$ 5,50</strong>.
                            </p>
                            <div className="bg-black/30 p-4 rounded-xl font-mono text-sm text-gray-300">
                                4,29 ÷ 5,50 = 0,78 (78%)
                            </div>
                            <p className="text-emerald-400 mt-4 text-sm font-medium">
                                Resultado maior que 0,7. Compensa abastecer com Gasolina.
                            </p>
                        </div>
                    </section>

                    <FAQ
                        items={FUEL_FAQS}
                        title="Dúvidas Frequentes sobre Combustível"
                        className="py-12"
                        showSocialProof={false}
                    />
                </motion.div>

                {/* App Promo Banner */}
                <AppPromoBanner />
            </div>
        </section>
    );
};
