import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Zap, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';
import { SEO } from './SEO';
import { FAQ } from './FAQ';

const AppPromoBanner = lazy(() => import('./AppPromoBanner').then(module => ({ default: module.AppPromoBanner })));

export const Tools: React.FC = () => {
    const TOOLS_FAQS = [
        {
            question: "As ferramentas são gratuitas?",
            answer: "Sim, todas as ferramentas disponibilizadas nesta página são 100% gratuitas e não exigem cadastro para uso básico."
        },
        {
            question: "O Gerador de Pix é seguro?",
            answer: "Sim, o gerador de Pix roda inteiramente no seu navegador. Nenhum dado bancário é enviado para nossos servidores. O código é gerado localmente."
        },
        {
            question: "Posso usar no celular?",
            answer: "Com certeza! Todas as ferramentas são responsivas e funcionam perfeitamente em smartphones e tablets."
        }
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Ferramentas FinZap",
        "description": "Ferramentas úteis para o seu dia a dia financeiro, como Gerador de Pix e mais.",
        "applicationCategory": "UtilitiesApplication",
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
                title="Ferramentas Financeiras Gratuitas"
                description="Acesse ferramentas úteis como Gerador de Pix e outras utilidades para facilitar sua vida financeira."
                canonical="/ferramentas"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": TOOLS_FAQS.map(faq => ({
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
                <Breadcrumb items={[{ label: 'Ferramentas', href: '/ferramentas' }]} />
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-300">Utilitários Gratuitos</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Ferramentas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Úteis</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Facilite sua rotina com nossas ferramentas práticas e gratuitas.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/ferramentas/gerador-pix" className="group">
                        <motion.div
                            initial={{ y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <QrCode className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Gerador de Pix</h2>
                                <p className="text-gray-400 mb-6">
                                    Crie QR Codes Pix personalizados gratuitamente. Gere códigos Copia e Cola instantâneos.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </motion.div>
                    </Link>
                </div>

                <div className="mt-24">
                    <FAQ
                        title="Dúvidas Frequentes"
                        items={TOOLS_FAQS}
                        showSocialProof={false}
                    />
                </div>

                <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                    <AppPromoBanner />
                </Suspense>

                {/* Disclaimer */}
                <div className="mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12">
                    <p className="text-sm text-gray-500">
                        <strong>Aviso legal:</strong> As ferramentas disponibilizadas neste site são apenas para fins informativos e de utilidade.
                        Não nos responsabilizamos pelo uso indevido das mesmas.
                    </p>
                </div>
            </div>
        </section>
    );
};
