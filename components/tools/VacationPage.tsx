import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { VacationCalculator } from './VacationCalculator';
import { Breadcrumb } from '../Breadcrumb';
import { SEO } from '../SEO';
import { FAQ } from '../FAQ';
import { FAQItem } from '../../types';

const AppPromoBanner = lazy(() => import('../AppPromoBanner').then(module => ({ default: module.AppPromoBanner })));

const VACATION_FAQS: FAQItem[] = [
    {
        question: "O que compõe o cálculo de férias?",
        answer: "O cálculo envolve: Salário Bruto (incluindo médias de horas extras e comissões), o acréscimo de 1/3 Constitucional (33,33% sobre o valor), a opção de Abono Pecuniário (venda de 10 dias) e os descontos de INSS e IRRF."
    },
    {
        question: "É vantajoso vender 10 dias de férias (Abono)?",
        answer: "Financeiramente sim, pois você recebe pelos dias trabalhados + o valor da venda dos dias de férias (com 1/3). É uma renda extra significativa, mas deve-se pesar a necessidade de descanso."
    },
    {
        question: "Quando o pagamento deve ser feito?",
        answer: "A empresa deve pagar as férias até 2 dias úteis antes do início do descanso. Se houver atraso, a lei determina o pagamento em dobro."
    },
    {
        question: "Como funcionam os descontos de INSS e IRRF nas férias?",
        answer: "As férias são tributadas separadamente do salário do mês. O INSS segue a tabela progressiva e o Imposto de Renda é retido na fonte se o valor ultrapassar o limite de isenção."
    }
];

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
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": VACATION_FAQS.map(faq => ({
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
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto hidden">
                            {/* Description moved below calculator */}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="min-h-[600px]">
                        <VacationCalculator />
                    </div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto text-center mt-8 mb-12">
                        Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF.
                    </p>
                </motion.div>

                <FAQ
                    items={VACATION_FAQS}
                    title="Perguntas Frequentes sobre Férias"
                    className="py-12"
                    showSocialProof={false}
                />

                <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-gray-500">Carregando oferta...</div>}>
                    <AppPromoBanner />
                </Suspense>
            </div>
        </section>
    );
};
