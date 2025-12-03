import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, ShieldCheck, Share2, FileText } from 'lucide-react';
import { SEO } from './SEO';

export const Privacy: React.FC = () => {
    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Política de Privacidade - Junny"
                description="Saiba como a Junny coleta, usa e protege seus dados pessoais. Sua privacidade é nossa prioridade."
                canonical="/privacy"
            />
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <Lock className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-300">Segurança</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Privacidade</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Sua privacidade é nossa prioridade. Saiba como protegemos e utilizamos seus dados.
                    </p>
                </div>

                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/5">
                        <FileText className="w-6 h-6 text-primary" />
                        <span className="text-sm text-gray-400">Última atualização: {new Date().getFullYear()}</span>
                    </div>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Eye className="w-5 h-5 text-primary" />
                                </div>
                                Coleta de Dados
                            </h2>
                            <p className="text-gray-400 leading-relaxed pl-[52px]">
                                Coletamos as informações que você nos fornece diretamente, como seu número de telefone, nome e os dados financeiros
                                que você envia através do WhatsApp para processamento pela nossa IA. Também coletamos dados técnicos de acesso
                                para melhoria contínua da plataforma.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                </div>
                                Uso das Informações
                            </h2>
                            <p className="text-gray-400 leading-relaxed pl-[52px]">
                                Usamos suas informações para:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-[52px] mt-3 text-gray-400">
                                <li>Fornecer, manter e melhorar nossos serviços</li>
                                <li>Processar suas transações financeiras via IA</li>
                                <li>Enviar relatórios e insights personalizados</li>
                                <li>Detectar e prevenir fraudes</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Lock className="w-5 h-5 text-primary" />
                                </div>
                                Segurança
                            </h2>
                            <p className="text-gray-400 leading-relaxed pl-[52px]">
                                Implementamos medidas de segurança técnicas e organizacionais de nível bancário para proteger seus dados pessoais.
                                Utilizamos criptografia de ponta a ponta (E2EE) para todas as comunicações e armazenamento seguro em nuvem com redundância.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Share2 className="w-5 h-5 text-primary" />
                                </div>
                                Compartilhamento
                            </h2>
                            <p className="text-gray-400 leading-relaxed pl-[52px]">
                                Não vendemos nem alugamos suas informações pessoais para terceiros. Compartilhamos dados apenas quando estritamente necessário
                                para a prestação do serviço (ex: processadores de pagamento) ou quando exigido por lei.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};
