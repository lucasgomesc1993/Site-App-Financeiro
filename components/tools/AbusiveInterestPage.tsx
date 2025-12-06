import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Breadcrumb } from '../Breadcrumb';
import { SEO } from '../SEO';

const AppPromoBanner = lazy(() => import('../AppPromoBanner').then(module => ({ default: module.AppPromoBanner })));

export const AbusiveInterestPage: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Juros Abusivos",
        "description": "Verifique se você está pagando juros abusivos em seus contratos de empréstimo ou financiamento.",
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
                title="Juros Abusivos - Verifique seu Contrato"
                description=" suspeita que está pagando juros abusivos? Use nossa calculadora para verificar as taxas do seu empréstimo ou financiamento e proteja seu bolso."
                canonical="/calculadoras/juros-abusivos"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Juros Abusivos', href: '/calculadoras/juros-abusivos' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-gray-300">Empréstimos e Dívidas</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Juros Abusivos</span>
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
                            <AlertTriangle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Calculadora em Desenvolvimento</h3>
                            <p className="text-gray-400">Em breve você poderá analisar juros abusivos em seus contratos aqui.</p>
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
