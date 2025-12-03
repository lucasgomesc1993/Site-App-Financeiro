import React from 'react';

import { Mail, MessageCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { FAQ } from './FAQ';
import { SEO } from './SEO';

export const Support: React.FC = () => {
    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Central de Ajuda - Suporte Junny"
                description="Precisa de ajuda? Entre em contato com o suporte da Junny via WhatsApp ou E-mail, ou consulte nossas perguntas frequentes."
                canonical="/support"
            />
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <HelpCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-300">Central de Ajuda</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Como podemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">ajudar você?</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Escolha um dos canais abaixo para falar com nossa equipe ou tire suas dúvidas na nossa seção de perguntas frequentes.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-20">
                    <div className="group relative bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                                <MessageCircle className="text-primary w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                            <p className="text-gray-400 mb-6">
                                Fale diretamente com nosso suporte técnico pelo WhatsApp. Ideal para dúvidas rápidas e suporte em tempo real.
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                                Iniciar conversa <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div className="group relative bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                                <Mail className="text-primary w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">E-mail</h3>
                            <p className="text-gray-400 mb-6">
                                Para assuntos mais complexos, parcerias ou feedback detalhado. Respondemos em até 24 horas úteis.
                            </p>
                            <a href="mailto:suporte@junny.com.br" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                                Enviar e-mail <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <FAQ items={[
                        {
                            question: "Como entro em contato com o suporte técnico?",
                            answer: "Você pode nos contatar via WhatsApp para respostas rápidas ou por e-mail para questões mais complexas. Nossos canais estão listados acima."
                        },
                        {
                            question: "Esqueci minha senha, como recupero?",
                            answer: "Na tela de login, clique em 'Esqueci minha senha'. Enviaremos um link de redefinição para o seu e-mail cadastrado."
                        },
                        {
                            question: "Como funciona o reembolso?",
                            answer: "Se você não estiver satisfeito nos primeiros 7 dias, devolvemos 100% do seu dinheiro. Basta solicitar pelo suporte."
                        },
                        {
                            question: "Posso alterar meu plano a qualquer momento?",
                            answer: "Sim, você pode fazer upgrade ou downgrade do seu plano diretamente nas configurações da sua conta."
                        },
                        {
                            question: "Onde encontro minhas notas fiscais?",
                            answer: "Todas as notas fiscais de pagamento da assinatura são enviadas para seu e-mail e também ficam disponíveis no painel do usuário."
                        }
                    ]} />
                </div>
            </div>
        </section>
    );
};
