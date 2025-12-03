import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AppPromoBanner: React.FC = () => {
    return (
        <motion.div
            initial={{ y: 20 }}
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
                            Chega de planilhas complicadas. Com a Junny, você controla seus gastos enviando áudios ou mensagens de texto no WhatsApp. Simples, rápido e com Inteligência Artificial.
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
                                href="https://junny.com.br/criar-conta"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#008c69] to-[#008c69] hover:brightness-110 text-white font-bold text-base md:text-lg rounded-full transition-all shadow-[0_0_30px_rgba(71,255,183,0.2)] hover:shadow-[0_0_50px_rgba(71,255,183,0.4)] text-center uppercase tracking-wide transform hover:scale-[1.02] whitespace-nowrap"
                            >
                                Testar Grátis Agora <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="relative block">
                        <div className="relative transform hover:scale-105 transition-transform duration-500 w-full max-w-sm md:max-w-xl mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent z-20 rounded-2xl" />
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl blur opacity-30" />
                            <img
                                src="/hero.webp"
                                srcSet="/hero-mobile.webp 600w, /hero-medium.webp 900w, /hero.webp 1200w"
                                alt="Junny App Dashboard"
                                width={1200}
                                height={563}
                                loading="lazy"
                                decoding="async"
                                sizes="(max-width: 768px) 384px, 576px"
                                className="relative rounded-2xl border border-white/10 shadow-2xl w-full"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};
