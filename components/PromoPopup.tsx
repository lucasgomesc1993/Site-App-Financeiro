import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X, Zap, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const PromoPopup: React.FC = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const buttonControls = useAnimation();

    useEffect(() => {
        // Show popup only on calculator pages and if not dismissed
        if (location.pathname.startsWith('/calculadoras') && !isDismissed) {
            const timer = setTimeout(() => setIsVisible(true), 2000); // Delay for better UX
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [location, isDismissed]);

    useEffect(() => {
        if (isVisible) {
            const sequence = async () => {
                while (true) {
                    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s
                    await buttonControls.start({
                        y: [0, -6, 0],
                        transition: { duration: 0.5, ease: "easeInOut" }
                    });
                }
            };
            sequence();
        }
    }, [isVisible, buttonControls]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="fixed z-50 
                        bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 
                        md:w-[380px] w-auto"
                >
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]/90 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] p-5">
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

                            <motion.a
                                href="https://finzap.io/criar-conta"
                                target="_blank"
                                rel="noopener noreferrer"
                                animate={buttonControls}
                                className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary hover:bg-primary/90 text-[#0d0d0d] font-bold text-xs uppercase tracking-wide rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                            >
                                Testar Grátis Agora
                                <ArrowRight className="w-3.5 h-3.5" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
