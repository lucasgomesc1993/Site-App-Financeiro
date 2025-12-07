import React, { Suspense, lazy } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';
import { SEO } from './SEO';
import { FAQ } from './FAQ';
import { AppPromoBanner } from './AppPromoBanner';
import { CALCULATOR_CATEGORIES, getColorClasses } from '../constants/calculators';

export const Calculators: React.FC = () => {
    const CALCULATOR_FAQS = [
        {
            question: "Qual a diferença entre simulador e calculadora?",
            answer: "Calculadoras normalmente retornam resultados diretos e exatos com base em dados objetivos e fórmulas fixas (como impostos). Simuladores projetam cenários futuros considerando variáveis dinâmicas e estimativas (como rentabilidade de investimentos)."
        },
        {
            question: "As calculadoras online são confiáveis?",
            answer: "Sim, nossas calculadoras são desenvolvidas com base nas regras, alíquotas e índices oficiais vigentes. No entanto, elas servem como ferramentas de estimativa e orientação."
        },
        {
            question: "Posso confiar nos resultados para tomar decisões financeiras?",
            answer: "Elas são ótimas para orientação inicial e planejamento, mas não substituem a análise de um profissional especializado. Sempre consulte um contador ou consultor financeiro para decisões críticas."
        },
        {
            question: "Posso usar as calculadoras pelo celular?",
            answer: "Sim! Nossa plataforma é totalmente responsiva e todas as ferramentas funcionam perfeitamente em qualquer dispositivo com acesso à internet, seja celular, tablet ou computador."
        },
        {
            question: "Como usar uma calculadora financeira corretamente?",
            answer: "O segredo é a precisão dos dados de entrada. Preencha campos como valor inicial, taxas e prazos com atenção. O resultado será calculado automaticamente com base nas fórmulas financeiras padrão do mercado."
        }
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadoras Financeiras Junny",
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
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CALCULATOR_FAQS.map(faq => ({
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

                <div className="space-y-16">
                    {CALCULATOR_CATEGORIES.map((category, index) => {
                        const colors = getColorClasses(category.color);
                        return (
                            <div key={index} className="space-y-6">
                                <h2 className={`text-2xl font-bold text-white pl-2 border-l-4 ${colors.border}`}>
                                    {category.title}
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                                    {category.items.map((item, itemIndex) => (
                                        <Link key={itemIndex} to={item.href} className="group">
                                            <div className={`bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-3 md:p-5 hover:bg-[#1a1a1a]/80 transition-all duration-300 ${colors.hoverBorder} h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] flex flex-col`}>
                                                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                                                <div className="relative z-10 flex flex-col h-full">
                                                    <div className={`w-8 h-8 md:w-10 md:h-10 ${colors.bg} rounded-lg flex items-center justify-center mb-3 border border-white/5 group-hover:scale-110 transition-transform`}>
                                                        <item.icon className={`${colors.text} w-4 h-4 md:w-5 md:h-5`} />
                                                    </div>
                                                    <h3 className="text-sm md:text-base font-bold text-white mb-1 md:mb-2 leading-tight line-clamp-2">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-xs text-gray-400 line-clamp-2 md:line-clamp-3 mb-2 md:mb-4 flex-grow hidden md:block">
                                                        {item.description}
                                                    </p>
                                                    <span className={`inline-flex items-center gap-1 ${colors.text} text-xs font-bold group-hover:gap-2 transition-all mt-auto`}>
                                                        Acessar <ArrowRight className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-24">
                    <FAQ
                        title="Dúvidas Frequentes sobre Calculadoras"
                        items={CALCULATOR_FAQS}
                        showSocialProof={false}
                    />
                </div>

                <AppPromoBanner />

                {/* Disclaimer */}
                <div className="mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12">
                    <p className="text-sm text-gray-400">
                        <strong>Aviso legal:</strong> As ferramentas disponibilizadas neste site são apenas para fins informativos e educacionais.
                        Embora busquemos manter os cálculos e fórmulas atualizados, não nos responsabilizamos por eventuais divergências, perdas ou decisões tomadas com base nos resultados obtidos.
                        Consulte sempre um profissional para orientações específicas ao seu caso.
                    </p>
                </div>
            </div>
        </section>
    );
};
