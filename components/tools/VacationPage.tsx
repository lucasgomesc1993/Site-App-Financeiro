import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { VacationCalculator } from './VacationCalculator';
import { Breadcrumb } from '../Breadcrumb';
import { SEO } from '../SEO';

const AppPromoBanner = lazy(() => import('../AppPromoBanner').then(module => ({ default: module.AppPromoBanner })));

export const VacationPage: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Férias",
        "description": "Calcule o valor exato das suas férias com 1/3 constitucional e descontos.",
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
                title="Calculadora de Férias 2025 - Cálculo Exato e Gratuito"
                description="Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF."
                canonical="/calculadoras/ferias"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de Férias', href: '/calculadoras/ferias' }
                    ]} />


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Plane className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Férias</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <VacationCalculator />
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <h2 className="text-3xl font-bold text-white mb-6">Calculadora de Férias: Saiba quanto você vai receber</h2>
                    <p className="text-gray-400 mb-8">
                        Planejando seu descanso? Utilize a Calculadora de Férias do FinZap para saber exatamente o valor líquido que cairá na sua conta, já considerando todos os descontos legais e adicionais.
                    </p>

                    <h3 className="text-2xl font-bold text-white mb-4">O que compõe o cálculo de férias?</h3>
                    <p className="text-gray-400 mb-6">
                        O cálculo de férias envolve diversas variáveis que podem confundir o trabalhador. Nossa ferramenta simplifica tudo isso, considerando:
                    </p>

                    <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-8">
                        <li><strong className="text-white">Salário Bruto:</strong> A base de cálculo, incluindo médias de horas extras e comissões.</li>
                        <li><strong className="text-white">1/3 Constitucional:</strong> Adicional de 33,33% sobre o valor das férias garantido por lei.</li>
                        <li><strong className="text-white">Abono Pecuniário:</strong> A famosa "venda de férias". É possível vender até 10 dias.</li>
                        <li><strong className="text-white">Descontos (INSS e IRRF):</strong> Impostos que incidem sobre o valor total e reduzem o valor líquido.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-white mb-4">Como usar a calculadora?</h3>
                    <p className="text-gray-400 mb-8">
                        Basta inserir seu salário bruto, a quantidade de dias que pretende tirar de férias, se possui dependentes (para cálculo do IRRF) e se deseja vender dias (abono). O FinZap faz todo o cálculo complexo das alíquotas progressivas de INSS e Imposto de Renda automaticamente.
                    </p>

                    <h3 className="text-2xl font-bold text-white mb-4">Planeje suas finanças com o FinZap</h3>
                    <p className="text-gray-400 mb-8">
                        Saber o valor exato das suas férias ajuda a planejar melhor sua viagem ou seus gastos no período de descanso. Use nossa ferramenta gratuita quantas vezes precisar e tenha total controle sobre seu dinheiro.
                    </p>
                </div>

                <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-gray-500">Carregando oferta...</div>}>
                    <AppPromoBanner />
                </Suspense>
            </div>
        </section>
    );
};
