import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Breadcrumb } from '../Breadcrumb';
import { SEO } from '../SEO';

const AppPromoBanner = lazy(() => import('../AppPromoBanner').then(module => ({ default: module.AppPromoBanner })));

export const ImportTaxPage: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Impostos de Importação",
        "description": "Simule os impostos de importação (Remessa Conforme, Shein, AliExpress) e saiba o custo final.",
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
                title="Impostos de Importação (Shein, AliExpress) - Calcule Agora"
                description="Vai comprar na China? Calcule os impostos de importação (60% + ICMS) e veja o valor final da sua compra internacional."
                canonical="/calculadoras/impostos-importacao"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Impostos de Importação', href: '/calculadoras/impostos-importacao' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <ShoppingBag className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-300">Câmbio e Economia Global</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Impostos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">Importação</span>
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
                            <ShoppingBag className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Calculadora em Desenvolvimento</h3>
                            <p className="text-gray-400">Em breve você poderá simular os impostos de suas compras internacionais aqui.</p>
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
