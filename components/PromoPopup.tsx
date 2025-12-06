import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const PromoPopup: React.FC = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        // Only run logic on target pages and if not dismissed
        if (!((location.pathname.startsWith('/calculadoras') || location.pathname.startsWith('/blog')) && !isDismissed)) {
            setIsVisible(false);
            return;
        }

        const handleInteraction = () => {
            setHasInteracted(true);
        };

        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 30) {
                setHasScrolled(true);
            }
            // Scrolling also counts as interaction
            setHasInteracted(true);
        };

        // Add listeners for interaction
        window.addEventListener('mousemove', handleInteraction, { once: true });
        window.addEventListener('mousedown', handleInteraction, { once: true });
        window.addEventListener('keydown', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleInteraction);
            window.removeEventListener('mousedown', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location, isDismissed]);

    useEffect(() => {
        if (hasInteracted && hasScrolled && !isDismissed && (location.pathname.startsWith('/calculadoras') || location.pathname.startsWith('/blog'))) {
            setIsVisible(true);
        }
    }, [hasInteracted, hasScrolled, isDismissed, location]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
    };

    return (
        <>
            {isVisible && (
                <div
                    className="fixed z-50 
                        bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 
                        md:w-[380px] w-auto animate-in fade-in slide-in-from-bottom-8 duration-700"
                >
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] md:bg-[#0d0d0d]/90 md:backdrop-blur-xl shadow-xl md:shadow-[0_0_40px_rgba(0,0,0,0.5)] p-5">
                        {/* Background Effects - Subtle */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                        <button
                            onClick={handleDismiss}
                            aria-label="Fechar popup"
                            className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                                    <Zap className="w-5 h-5 text-primary" />
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-white leading-tight mb-1">
                                        Controle Financeiro Inteligente
                                    </h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Organize suas finanças automaticamente pelo WhatsApp com nossa IA.
                                    </p>
                                </div>
                            </div>

                            <a
                                href="https://junny.com.br/criar-conta"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary hover:bg-primary/90 text-[#0d0d0d] font-bold text-xs uppercase tracking-wide rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                            >
                                Testar Grátis Agora
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
