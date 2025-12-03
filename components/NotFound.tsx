import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { SEO } from './SEO';

export const NotFound: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
            <SEO
                title="Página não encontrada - Junny"
                description="A página que você está procurando não existe ou foi movida."
                canonical="https://junny.com.br/404"
            />

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                <div className="mb-8 relative inline-block">
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent opacity-20 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl md:text-5xl font-bold text-white">Ops!</span>
                    </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Página não encontrada
                </h2>

                <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
                    Parece que você se perdeu no mundo das finanças. A página que você procura não existe ou foi movida.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-background font-bold hover:bg-primary/90 transition-all hover:scale-105"
                    >
                        <Home className="w-5 h-5" />
                        Voltar para o Início
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar página anterior
                    </button>
                </div>
            </div>
        </section>
    );
};
