import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { Breadcrumb } from '../Breadcrumb';
import { SEO } from '../SEO';

const AppPromoBanner = lazy(() => import('../AppPromoBanner').then(module => ({ default: module.AppPromoBanner })));

export const CLTVsPJPage: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Comparador CLT vs PJ",
        "description": "Compare os ganhos entre o regime CLT e PJ e descubra qual vale mais a pena.",
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
                title="CLT vs PJ - Compare e Decida a Melhor Opção"
                description="Está na dúvida entre aceitar uma vaga CLT ou virar PJ? Use nossa calculadora para comparar os ganhos líquidos e benefícios de cada modalidade."
                canonical="/calculadoras/clt-vs-pj"
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
                        { label: 'CLT vs PJ', href: '/calculadoras/clt-vs-pj' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Carreira</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Comparador <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">CLT vs PJ</span>
                        </h1>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="min-h-[400px] flex items-center justify-center bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-center p-8">
                            <Briefcase className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Calculadora em Desenvolvimento</h3>
                            <p className="text-gray-400">Em breve você poderá comparar detalhadamente as opções CLT e PJ aqui.</p>
                        </div>
                    </div>
                </motion.div>

                <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-gray-500">Carregando oferta...</div>}>
                    <AppPromoBanner />
                </Suspense>
            </div>
        </section>
    );
};
