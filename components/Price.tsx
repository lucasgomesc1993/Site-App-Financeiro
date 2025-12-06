
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const Price: React.FC = () => {
    return (
        <section id="investimento" className="py-24 md:py-32 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="glass-card rounded-[40px] p-8 md:p-16 relative overflow-hidden border border-white/10 shadow-2xl">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row gap-12 items-start justify-between relative z-10">
                        <div className="flex-1">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase mb-6 tracking-wider">
                                Oferta de Lançamento
                            </div>
                            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight leading-tight">
                                ASSUMA O CONTROLE <br /> DA SUA VIDA FINANCEIRA
                            </h2>
                            <p className="text-lg text-muted mb-8 font-light leading-relaxed">
                                Pare de perder dinheiro sem saber onde. O preço de um café para organizar sua vida inteira.
                            </p>

                            <ul className="space-y-5 mb-10">
                                {['Lançamentos Ilimitados no WhatsApp', 'Dashboard Completo Web', 'Suporte Prioritário', 'Cancelamento a qualquer momento'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-gray-200 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(71,255,183,0.4)]">
                                            <Check size={14} className="text-black stroke-[3]" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-2 bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <span className="text-gray-500 text-lg line-through font-medium">R$ 49,90/mês</span>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-3xl font-bold text-white">R$</span>
                                <span className="text-6xl font-bold text-primary tracking-tight">29,90</span>
                                <span className="text-xl text-gray-400">/mês</span>
                            </div>
                            <span className="text-gray-400 text-sm uppercase tracking-wide font-medium">Plano Anual: 2 meses grátis</span>

                            <a
                                href="https://app.junny.com.br/criar-conta"
                                className="mt-8 w-full px-8 py-5 bg-gradient-to-r from-[#008c69] to-[#008c69] hover:brightness-110 text-white font-bold text-lg rounded-full transition-all shadow-[0_0_30px_rgba(71,255,183,0.2)] hover:shadow-[0_0_50px_rgba(71,255,183,0.4)] text-center uppercase tracking-wide transform hover:scale-[1.02]"
                            >
                                Assinar Agora
                            </a>
                            <p className="text-xs text-gray-500 mt-4 w-full text-center flex items-center justify-center gap-2">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>
                                7 dias grátis • Sem compromisso
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
