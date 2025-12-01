import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plane, TrendingUp, ArrowRight, Zap, Fuel } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';
import { SEO } from './SEO';

const AppPromoBanner = lazy(() => import('./AppPromoBanner').then(module => ({ default: module.AppPromoBanner })));

export const Calculators: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadoras Financeiras FinZap",
        "description": "Ferramentas gratuitas para cálculo de férias, décimo terceiro, salário líquido e mais.",
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
                title="Calculadoras Financeiras Gratuitas"
                description="Ferramentas gratuitas para cálculo de férias, décimo terceiro, salário líquido, investimentos e mais."
                canonical="/calculadoras"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <Breadcrumb items={[{ label: 'Calculadoras', href: '/calculadoras' }]} />
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <Calculator className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-300">Calculadoras Gratuitas</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Calculadoras <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Financeiras</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Utilize nossas calculadoras gratuitas para planejar seus investimentos, calcular suas férias e organizar sua vida financeira.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/calculadoras/investimentos" className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <TrendingUp className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Simulador de Investimentos</h2>
                                <p className="text-gray-400 mb-6">
                                    Compare CDB, LCI, LCA e Tesouro Direto. Descubra quanto seu dinheiro pode render com juros compostos.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </motion.div>
                    </Link>

                    <Link to="/calculadoras/ferias" className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Plane className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de Férias</h2>
                                <p className="text-gray-400 mb-6">
                                    Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </motion.div>
                    </Link>

                    <Link to="/calculadoras/energia" className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Zap className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Consumo de Energia</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra quanto seus aparelhos consomem e economize na conta de luz.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </motion.div>
                    </Link>

                    <Link to="/calculadoras/combustivel" className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Fuel className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Álcool ou Gasolina</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra qual combustível compensa mais para abastecer seu veículo e economize no posto.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </motion.div>
                    </Link>

                    <Link to="/calculadoras/rescisao" className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Calculator className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Rescisão Trabalhista</h2>
                                <p className="text-gray-400 mb-6">
                                    Simule sua rescisão CLT. Calcule saldo de salário, férias, 13º, aviso prévio e multa do FGTS.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </motion.div>
                    </Link>

                    <Link to="/calculadoras/inss" className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Calculator className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de INSS</h2>
                                <p className="text-gray-400 mb-6">
                                    Simule o desconto do INSS 2025. Tabela progressiva atualizada para CLT, Autônomos e Pro-labore.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </motion.div>
                    </Link>
                </div>

                <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                    <AppPromoBanner />
                </Suspense>
            </div>
        </section>
    );
};
