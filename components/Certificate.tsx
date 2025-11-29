
import React from 'react';
import { motion } from 'framer-motion';

export const Certificate: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="z-10"
        >
            <h3 className="text-4xl md:text-6xl font-medium text-white mb-4">
                Relatórios de <span className="text-primary">Inteligência</span> Financeira
            </h3>
            <p className="text-lg text-muted max-w-3xl mx-auto">
                Não apenas dados, mas insights. Receba mensalmente uma análise completa do seu comportamento financeiro, sugestões de economia e previsões para o próximo mês.
            </p>
        </motion.div>

        {/* Report Image */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-4xl perspective-1000"
        >
            <div className="absolute -inset-4 bg-primary/20 rounded-[40px] blur-3xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a1a1a]">
                {/* Mockup of a report instead of certificate */}
                <div className="w-full aspect-[16/9] flex flex-col">
                     {/* Fake Browser Header */}
                     <div className="h-12 bg-[#252525] flex items-center px-4 gap-2 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        <div className="ml-4 bg-[#111] px-4 py-1 rounded text-xs text-gray-500 font-mono w-64">finzap.ai/reports/january</div>
                     </div>
                     {/* Report Content Body */}
                     <div className="flex-1 bg-[#111] p-8 flex gap-8">
                        <div className="w-1/3 bg-white/5 rounded-xl p-6 flex flex-col gap-4">
                            <div className="h-32 w-32 rounded-full border-4 border-primary/30 mx-auto flex items-center justify-center relative">
                                <span className="text-2xl font-bold text-white">72%</span>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-sm">Meta de Economia</p>
                                <p className="text-white font-bold">R$ 1.200 / R$ 1.500</p>
                            </div>
                        </div>
                        <div className="w-2/3 flex flex-col gap-4">
                             <div className="h-8 w-1/2 bg-white/10 rounded animate-pulse"></div>
                             <div className="h-4 w-3/4 bg-white/5 rounded"></div>
                             <div className="h-4 w-2/3 bg-white/5 rounded"></div>
                             
                             <div className="mt-8 grid grid-cols-3 gap-4">
                                <div className="h-24 bg-emerald-500/10 rounded-lg border border-emerald-500/20 p-4">
                                    <p className="text-emerald-400 text-xs mb-2">Entradas</p>
                                    <p className="text-white text-lg font-bold">R$ 5.450</p>
                                </div>
                                <div className="h-24 bg-red-500/10 rounded-lg border border-red-500/20 p-4">
                                    <p className="text-red-400 text-xs mb-2">Saídas</p>
                                    <p className="text-white text-lg font-bold">R$ 3.210</p>
                                </div>
                                <div className="h-24 bg-blue-500/10 rounded-lg border border-blue-500/20 p-4">
                                    <p className="text-blue-400 text-xs mb-2">Investido</p>
                                    <p className="text-white text-lg font-bold">R$ 1.000</p>
                                </div>
                             </div>
                        </div>
                     </div>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};
