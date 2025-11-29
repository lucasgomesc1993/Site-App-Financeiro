import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, Wallet } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="py-12 md:py-24 px-4 border-t border-white/5 bg-surface/30">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">

                <div className="flex flex-col items-center md:items-start gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                            <Wallet className="text-primary w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">FinZap.ai</span>
                    </div>
                    <p className="text-sm text-gray-500 max-w-xs text-center md:text-left">
                        Inteligência artificial aplicada à liberdade financeira. Simples, seguro e direto no seu WhatsApp.
                    </p>
                    <span className="text-xs text-gray-600">© 2025 FinZap AI. Todos os direitos reservados.</span>
                </div>

                <div className="flex flex-col items-center md:items-end gap-6">
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin /></a>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link to="/terms" className="hover:text-gray-300">Termos de Uso</Link>
                        <Link to="/privacy" className="hover:text-gray-300">Privacidade</Link>
                        <Link to="/calculadoras" className="hover:text-gray-300">Calculadoras</Link>
                        <Link to="/support" className="hover:text-gray-300">Suporte</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};
