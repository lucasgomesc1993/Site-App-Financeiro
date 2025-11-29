import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AppPromoBanner: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full mt-24 mb-12"
        >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-xl p-8 md:p-12 group shadow-[0_0_50px_rgba(0,0,0,0.5)]">

                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent opacity-50 pointer-events-none" />
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(71,255,183,0.03)_0%,transparent_50%)] animate-[spin_10s_linear_infinite] pointer-events-none" />

                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
                            <MessageCircle className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-primary">Controle Financeiro via WhatsApp</span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                            Organize suas finanças <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">sem sair do chat</span>
                        </h3>

                        <p className="text-gray-400 text-lg">
                            Chega de planilhas complicadas. Com o FinZap, você controla seus gastos enviando áudios ou mensagens de texto no WhatsApp. Simples, rápido e com Inteligência Artificial.
                        </p>

                        <ul className="space-y-3">
                            {['Registro automático de gastos', 'Relatórios mensais inteligentes', 'Dicas de economia personalizadas'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <a
                                href="https://fin-love.vercel.app/criar-conta"
                                className="relative inline-flex overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent shadow-[0_0_20px_rgba(16,163,127,0.4)] group/btn hover:scale-105 transition-transform duration-300"
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ffffff_50%,transparent_100%)]" />

                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-accent px-8 py-4 text-lg font-bold text-white backdrop-blur-3xl transition-all group-hover/btn:bg-accent/90 relative z-10 gap-2">
                                    Testar Grátis Agora <ArrowRight className="w-5 h-5" />
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="relative block">
                        <div className="relative transform hover:scale-105 transition-transform duration-500 w-full max-w-sm md:max-w-xl mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent z-20 rounded-2xl" />
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl blur opacity-30" />
                            <img
                                src="/hero.jpg"
                                alt="FinZap App Interface"
                                className="relative rounded-2xl border border-white/10 shadow-2xl w-full"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};
