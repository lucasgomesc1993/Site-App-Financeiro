
import React from 'react';
import { MODULES } from '../constants';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap } from 'lucide-react';

export const Modules: React.FC = () => {
    return (
        <section id="modulos" className="py-24 md:py-32 px-4 relative bg-surface/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h3
                        initial={{ y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-medium text-white mb-6"
                    >
                        Tudo o que você precisa para <br /> <span className="text-primary">dominar seu dinheiro</span>
                    </motion.h3>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Uma plataforma completa disfarçada de contato no seu WhatsApp. Simples, poderoso e automático.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MODULES.map((module, idx) => (
                        <motion.div
                            key={module.id}
                            initial={{ y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="glass-card rounded-3xl p-1 overflow-hidden group"
                        >
                            <div className="bg-[#111] rounded-[20px] h-full flex flex-col overflow-hidden relative">
                                {/* Feature Image */}
                                <div className="h-48 w-full overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent z-10 opacity-80"></div>
                                    <img
                                        src={module.image}
                                        alt={module.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                                    />
                                    <div className="absolute bottom-4 left-6 z-20">
                                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                                            <Zap size={12} />
                                            <span>Recurso {module.id}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Feature Content */}
                                <div className="p-8 flex-1 flex flex-col gap-4">
                                    <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{module.title}</h4>
                                    <p className="text-gray-400 leading-relaxed text-sm">{module.description}</p>

                                    <div className="mt-auto pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-primary/50" />
                                            <span>Disponível no plano Pro</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
