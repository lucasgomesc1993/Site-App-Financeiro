
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-36 pb-24 md:pt-48 md:pb-32 px-4 overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-10 text-center">

        {/* Floating Icon/Badge */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-24 h-24 md:w-28 md:h-28 mb-4 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl blur-xl"></div>
          <div className="relative w-full h-full bg-[#0d0d0d] border border-primary/30 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(71,255,183,0.15)]">
            <MessageCircle className="w-12 h-12 text-primary" strokeWidth={1.5} />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-[#0d0d0d]">
              <span className="text-[10px] font-bold text-black">AI</span>
            </div>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight text-white tracking-tight"
        >
          Controle financeiro no <br className="hidden md:block" />
          WhatsApp com <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Inteligência Artificial</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted max-w-2xl font-light"
        >
          <span className="font-normal text-white">Esqueça as planilhas chatas.</span> Basta enviar um áudio ou mensagem e nossa IA categoriza, organiza e gera relatórios em segundos.
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="https://finzap.io/criar-conta"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#008c69] to-[#008c69] hover:brightness-110 text-white font-bold text-lg rounded-full transition-all shadow-[0_0_30px_rgba(71,255,183,0.2)] hover:shadow-[0_0_50px_rgba(71,255,183,0.4)] text-center uppercase tracking-wide transform hover:scale-[1.02]"
          >
            Testar Grátis Agora
          </a>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center gap-4 mt-8"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                <img src={`https://picsum.photos/50/50?random=${i + 40}`} alt="User" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start">
            <div className="flex text-yellow-400 text-xs gap-0.5">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <span className="text-sm font-medium text-gray-300">15mil + usuários</span>
          </div>
        </motion.div>
      </div>

      {/* Dashboard Preview (Perspective Transform) */}
      <motion.div
        initial={{ opacity: 0, rotateX: 45, y: 100 }}
        animate={{ opacity: 1, rotateX: 20, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="mt-20 w-full max-w-6xl mx-auto perspective-1000 relative z-0"
        style={{ perspective: '1200px' }}
      >
        <div className="relative transform rotate-x-12 scale-90 opacity-90 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(71,255,183,0.15)] bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
          {/* Using a placeholder finance dashboard image since specific framer URL might be generic */}
          <img
            src="/hero.webp"
            alt="FinZap Dashboard"
            width={1200}
            height={563}
            decoding="async"
            className="w-full h-auto object-cover opacity-80"
          />


        </div>
      </motion.div>

    </section>
  );
};
