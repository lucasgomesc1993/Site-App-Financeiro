
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Wallet, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.getElementById(href.replace('#', ''));
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }, 100);
        return;
      }

      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);

      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  };

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isMobileMenuOpen ? 'bg-transparent' : ''} 
        `}
    >
      {/* Background Layer for Mobile/Tablet Scroll */}
      <div className={`absolute inset-0 transition-all duration-500 pointer-events-none
          ${isScrolled && !isMobileMenuOpen ? 'opacity-100 lg:opacity-0 backdrop-blur-xl bg-[#0d0d0d]/80' : 'opacity-0'}
          border-b border-white/5`}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between relative z-50">

        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-2 relative shrink-0 group z-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
            <Wallet className="text-primary w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">FinZap<span className="text-primary">.ai</span></span>
        </Link>

        {/* Desktop Nav - Centered Pill - Visible on LG+ */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <nav className={`
                flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500
                ${isScrolled
              ? 'bg-[#0d0d0d]/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50'
              : 'bg-white/5 backdrop-blur-sm border-white/5'
            }
            `}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`
                    px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300
                    text-gray-300 hover:text-white hover:bg-white/10
                    uppercase tracking-widest
                  `}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Desktop CTA - Visible on LG+ */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href="https://finzap.io/criar-conta"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-[#008c69] to-[#05a880] hover:brightness-110 hover:scale-105 transition-all duration-300 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,140,105,0.3)]"
          >
            Começar Grátis
          </a>
        </div>

        {/* Mobile/Tablet Menu Button - Visible below LG */}
        <button
          className="lg:hidden z-50 w-12 h-12 flex items-center justify-center text-white bg-white/5 rounded-full border border-white/10 backdrop-blur-md active:scale-95 transition-all hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-[#000000] flex flex-col pt-32 px-6 pb-10 overflow-y-auto min-h-screen"
          >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col gap-2 relative z-10 max-w-lg mx-auto w-full">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  variants={itemVariants}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                >
                  <span className="text-2xl font-medium text-gray-300 group-hover:text-white tracking-tight">
                    {item.label}
                  </span>
                  <ChevronRight className="text-gray-600 group-hover:text-primary transition-colors" size={20} />
                </motion.a>
              ))}

              <motion.div variants={itemVariants} className="mt-8">
                <a
                  href="https://finzap.io/criar-conta"
                  className="flex items-center justify-center w-full py-4 rounded-full bg-gradient-to-r from-[#008c69] to-[#05a880] hover:brightness-110 transition-all duration-300 text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,140,105,0.3)] active:scale-[0.98]"
                >
                  Começar Grátis
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-auto pt-10 text-center">
                <p className="text-gray-500 text-sm">
                  © 2025 FinZap AI. <br /> Todos os direitos reservados.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
