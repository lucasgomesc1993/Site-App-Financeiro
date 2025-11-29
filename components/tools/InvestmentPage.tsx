import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InvestmentSimulator } from './InvestmentSimulator';
import { AppPromoBanner } from '../AppPromoBanner';

export const InvestmentPage: React.FC = () => {
    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Link to="/calculadoras" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4" /> Voltar para Calculadoras
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Renda Fixa</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Simulador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Investimentos</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Calcule o retorno de suas aplicações em Renda Fixa (CDB, LCI, LCA e Tesouro Direto) e descubra o poder dos juros compostos.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <InvestmentSimulator />
                </motion.div>

                {/* SEO Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg"
                >
                    <h2 className="text-3xl font-bold text-white mb-6">Simulador de Investimentos: Calcule seus rendimentos</h2>
                    <p className="text-gray-400 mb-8">
                        Quer saber quanto seu dinheiro vai render? Utilize o Simulador de Investimentos do FinZap para projetar seus ganhos em aplicações de Renda Fixa como CDB, LCI, LCA e Tesouro Direto.
                    </p>

                    <h3 className="text-2xl font-bold text-white mb-4">Como funciona o simulador?</h3>
                    <p className="text-gray-400 mb-6">
                        Nossa calculadora utiliza a fórmula de juros compostos para projetar o crescimento do seu patrimônio ao longo do tempo. Além disso, ela já considera as alíquotas de Imposto de Renda (IR) para investimentos tributáveis (como CDB e Tesouro Direto) e a isenção para LCI/LCA.
                    </p>

                    <h3 className="text-2xl font-bold text-white mb-4">Entenda os tipos de investimento</h3>

                    <div className="space-y-6 mb-12">
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">CDB (Certificado de Depósito Bancário)</h4>
                            <p className="text-gray-400">
                                Título emitido por bancos para captar recursos. É um dos investimentos mais populares da Renda Fixa. Sofre incidência de Imposto de Renda regressivo (de 22,5% a 15% sobre o lucro).
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">LCI e LCA</h4>
                            <p className="text-gray-400">
                                Letras de Crédito Imobiliário (LCI) e do Agronegócio (LCA). São isentas de Imposto de Renda para pessoas físicas, o que pode torná-las muito atrativas dependendo da taxa oferecida.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">Tesouro Direto</h4>
                            <p className="text-gray-400">
                                Programa do Tesouro Nacional que permite a compra de títulos públicos federais. É considerado o investimento mais seguro do país. Também segue a tabela regressiva do IR.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">Por que simular antes de investir?</h3>
                    <p className="text-gray-400 mb-8">
                        Simular seus investimentos permite que você tenha uma visão clara do potencial de retorno e compare diferentes opções. Com o FinZap, você toma decisões financeiras mais inteligentes e alinhadas com seus objetivos de curto, médio e longo prazo.
                    </p>
                </motion.div>

                <AppPromoBanner />
            </div>
        </section>
    );
};
