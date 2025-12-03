import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, CheckCircle } from 'lucide-react';
import { SEO } from './SEO';

export const Terms: React.FC = () => {
    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Termos de Uso - Junny"
                description="Leia os Termos de Uso da Junny e entenda as regras e diretrizes que regem o uso da nossa plataforma."
                canonical="/terms"
            />
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-300">Jurídico</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Termos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Uso</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Entenda as regras e diretrizes que regem o uso da nossa plataforma de inteligência financeira.
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
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
                                Aceitação dos Termos
                            </h2>
                            <p className="text-gray-400 leading-relaxed pl-11">
                                Ao acessar e usar a Junny, você concorda em cumprir e ficar vinculado a estes Termos de Uso.
                                Se você não concordar com qualquer parte destes termos, você não deve usar nosso serviço.
                                O uso continuado da plataforma constitui aceitação de quaisquer alterações feitas nestes termos.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
                                Descrição do Serviço
                            </h2>
                            <p className="text-gray-400 leading-relaxed pl-11 mb-4">
                                A Junny é uma ferramenta de gestão financeira baseada em inteligência artificial que opera através do WhatsApp.
                                O serviço permite que os usuários:
                            </p>
                            <ul className="space-y-3 pl-11">
                                {[
                                    'Registrem despesas e receitas via texto ou áudio',
                                    'Recebam relatórios automáticos de gastos',
                                    'Categorizem transações automaticamente via IA',
                                    'Consultem saldos e extratos em tempo real'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-400">
                                        <CheckCircle className="w-5 h-5 text-primary/50 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
                                Uso do Serviço
                            </h2>
                            <p className="text-gray-400 leading-relaxed pl-11">
                                Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos.
                                Você é responsável por manter a confidencialidade de sua conta e por todas as atividades que ocorrem sob ela.
                                É proibido usar o serviço para qualquer atividade fraudulenta ou ilegal.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">4</span>
                                Planos e Pagamentos
                            </h2>
                            <p className="text-gray-400 leading-relaxed pl-11">
                                A Junny oferece planos gratuitos e pagos. Os detalhes dos preços e recursos estão disponíveis em nossa página principal.
                                Reservamo-nos o direito de alterar os preços a qualquer momento, com aviso prévio aos usuários ativos.
                                O cancelamento pode ser feito a qualquer momento sem multa.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};
