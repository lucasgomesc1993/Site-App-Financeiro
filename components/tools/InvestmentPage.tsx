import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InvestmentSimulator } from './InvestmentSimulator';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { FAQItem } from '../../types';

const INVESTMENT_FAQS: FAQItem[] = [
    {
        question: "Qual é o melhor simulador de investimentos?",
        answer: "O melhor simulador de investimentos é o do FinZap, pois ele fornece as principais informações sobre sua aplicação, como: Resultado bruto e líquido, Valor pago em imposto, Valor do rendimento recebido e muito mais! Além disso, é possível fazer várias simulações de forma 100% gratuita."
    },
    {
        question: "O que é um Certificado de Depósito Bancário (CDB)?",
        answer: "CDB é a sigla para Certificado de Depósito Bancário. Na prática, é uma aplicação onde se empresta dinheiro para um banco em troca de um rendimento pré-acordado (maior do que a poupança). É um investimento protegido pelo FGC."
    },
    {
        question: "O que é uma Letra de Crédito Imobiliário (LCI)?",
        answer: "LCI é a sigla para Letra de Crédito Imobiliário. É um investimento de renda fixa lastreado em crédito imobiliário. É isento de imposto de renda para pessoas físicas e conta com a proteção do FGC."
    },
    {
        question: "O que é uma Letra de Crédito do Agronegócio (LCA)?",
        answer: "LCA é a sigla para Letra de Crédito do Agronegócio. É um título de renda fixa vinculado ao setor agrícola. Assim como a LCI, é isenta de imposto de renda e tem a cobertura do Fundo Garantidor de Crédito."
    },
    {
        question: "Qual a diferença entre LCI e LCA?",
        answer: "A principal diferença está no destino dos recursos. Na LCI, o dinheiro é usado para financiamentos imobiliários, enquanto na LCA, é destinado ao agronegócio. Ambas possuem isenção de IR e garantia do FGC."
    },
    {
        question: "Para que serve um simulador de investimentos online?",
        answer: "Serve para projetar a rentabilidade de diferentes aplicações financeiras, permitindo comparar opções, entender o impacto dos juros compostos e do imposto de renda, e planejar metas financeiras com mais clareza."
    }
];

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
                {/* SEO Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg"
                >
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Simulador de Investimentos: Calcule seus rendimentos</h2>
                        <p className="text-gray-400 mb-8">
                            Quer saber quanto seu dinheiro vai render? Utilize o Simulador de Investimentos do FinZap para projetar seus ganhos em aplicações de Renda Fixa como CDB, LCI, LCA e Tesouro Direto.
                        </p>

                        <h3 className="text-2xl font-bold text-white mb-4">Como funciona o simulador de investimentos gratuito?</h3>
                        <p className="text-gray-400 mb-6">
                            Esta calculadora de investimentos foi desenvolvida para comparação de diferentes tipos de títulos de renda fixa.
                            O simulador de investimento calcula de forma simples e descomplicada qual será o retorno do seu dinheiro após uma aplicação a uma determinada taxa e período.
                        </p>
                        <p className="text-gray-400 mb-6">
                            Ademais, o cálculo leva em conta possíveis aportes durante o tempo (investimento mensal), além do valor inicialmente aplicado.
                            Com este simulador, será possível saber quanto conseguirá acumular no final de uma determinada quantidade de meses investindo seu dinheiro na aplicação de sua escolha.
                        </p>
                        <p className="text-gray-400 mb-6">
                            Contudo, é importante lembrar que o tipo de investimento escolhido é importante, porque existem títulos com tributação diferente.
                            Dessa forma, o Simulador de Investimentos vai poder entregar o retorno líquido (já descontado o imposto) mais exato.
                        </p>

                        <h4 className="text-xl font-bold text-white mb-3">Tipos de Rentabilidade</h4>
                        <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-8">
                            <li><strong className="text-white">Prefixada:</strong> o rendimento já é conhecido na data da aplicação e não varia no decorrer do tempo;</li>
                            <li><strong className="text-white">Pós-fixada:</strong> o retorno varia de acordo com um índice de referência, como o CDI; e</li>
                            <li><strong className="text-white">IPCA (híbrida):</strong> o rendimento é a variação da inflação mais uma taxa prefixada.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h3 className="text-2xl font-bold text-white mb-4">O que é o rendimento real nos investimentos?</h3>
                        <p className="text-gray-400 mb-6">
                            O rendimento real nos investimentos é a taxa de retorno obtida após a dedução da inflação. É um indicador importante porque leva em consideração o impacto da inflação no poder de compra do investidor.
                        </p>
                        <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 mb-8">
                            <h4 className="text-lg font-bold text-white mb-4">Por que considerar o rendimento real?</h4>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">1</div>
                                    <p className="text-gray-400"><strong className="text-white">Preservação do poder de compra:</strong> reflete o quanto seu dinheiro realmente cresce após descontar a inflação.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">2</div>
                                    <p className="text-gray-400"><strong className="text-white">Comparação precisa:</strong> permite comparar diferentes opções levando em conta o efeito da inflação.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">3</div>
                                    <p className="text-gray-400"><strong className="text-white">Metas financeiras:</strong> ajuda a estabelecer metas realistas para o futuro.</p>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h3 className="text-2xl font-bold text-white mb-6">Entenda os tipos de investimento</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h4 className="text-lg font-bold text-white mb-2 text-primary">Tesouro Direto</h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    Programa do Tesouro Nacional para venda de títulos públicos. Considerado o investimento mais seguro do país.
                                </p>
                                <ul className="text-xs text-gray-300 space-y-1">
                                    <li>• Tesouro Selic (Liquidez diária)</li>
                                    <li>• Tesouro IPCA+ (Proteção contra inflação)</li>
                                    <li>• Tesouro Prefixado (Rentabilidade fixa)</li>
                                </ul>
                            </div>

                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h4 className="text-lg font-bold text-white mb-2 text-primary">CDB</h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    Certificado de Depósito Bancário. Você empresta dinheiro para o banco em troca de juros.
                                </p>
                                <ul className="text-xs text-gray-300 space-y-1">
                                    <li>• Garantia do FGC</li>
                                    <li>• Rentabilidade geralmente atrelada ao CDI</li>
                                    <li>• Opções com liquidez diária</li>
                                </ul>
                            </div>

                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h4 className="text-lg font-bold text-white mb-2 text-emerald-400">LCI e LCA</h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    Letras de Crédito Imobiliário e do Agronegócio. Isentas de Imposto de Renda para pessoa física.
                                </p>
                                <ul className="text-xs text-gray-300 space-y-1">
                                    <li>• Isenção de IR</li>
                                    <li>• Garantia do FGC</li>
                                    <li>• Foco em setores específicos (Imóveis/Agro)</li>
                                </ul>
                            </div>

                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h4 className="text-lg font-bold text-white mb-2 text-primary">Debêntures</h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    Títulos de dívida emitidos por empresas. Geralmente oferecem retornos maiores que títulos bancários.
                                </p>
                                <ul className="text-xs text-gray-300 space-y-1">
                                    <li>• Risco de crédito da empresa</li>
                                    <li>• Prazos geralmente mais longos</li>
                                    <li>• Algumas são isentas de IR (Incentivadas)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <FAQ
                        items={INVESTMENT_FAQS}
                        title="Dúvidas Frequentes sobre Investimentos"
                        className="py-12"
                        showSocialProof={false}
                    />
                </motion.div>

                <AppPromoBanner />
            </div>
        </section>
    );
};
