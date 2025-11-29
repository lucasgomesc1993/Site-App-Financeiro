
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Smartphone, TrendingUp, Globe } from 'lucide-react';

export const Community: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        
        {/* Stats Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mb-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <h3 className="text-5xl md:text-7xl font-medium text-white tracking-tighter mb-2">2.5M+</h3>
                <p className="text-gray-400 uppercase tracking-widest text-sm">Transações Processadas</p>
            </motion.div>
            
            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
            >
                <h3 className="text-5xl md:text-7xl font-medium text-white tracking-tighter mb-2">R$ 12K</h3>
                <p className="text-gray-400 uppercase tracking-widest text-sm">Economia Média/Ano</p>
            </motion.div>
        </div>

        {/* Feature Card */}
        <div className="rounded-[48px] bg-[#141414] border border-white/5 p-8 md:p-16 relative overflow-hidden">
            
            {/* Video/Abstract Background */}
            <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent animate-pulse-slow"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/90"></div>

            <div className="relative z-10 flex flex-col items-center text-center gap-12">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm text-white font-medium tracking-wide uppercase">Ecossistema Completo</span>
                     </div>

                    <h2 className="text-5xl md:text-8xl font-medium text-white uppercase tracking-tighter leading-none">
                        MAIS QUE UM APP <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">SEU NOVO CFO</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
                    {[
                        { icon: ShieldCheck, title: "Segurança", desc: "Dados criptografados e proteção nível bancário." },
                        { icon: Smartphone, title: "Mobile First", desc: "Funciona nativamente onde você já está: WhatsApp." },
                        { icon: TrendingUp, title: "Investimentos", desc: "Controle sua carteira de ativos em breve." },
                        { icon: Globe, title: "Acesso Web", desc: "Visualize gráficos detalhados no computador." }
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-start gap-4 hover:bg-white/10 transition-colors backdrop-blur-sm group"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <card.icon size={24} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">{card.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed text-left">{card.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};
