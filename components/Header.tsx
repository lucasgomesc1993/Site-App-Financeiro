
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Wallet } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isMobileMenuOpen ? 'bg-transparent' : ''} 
        `}
    >
      {/* Background Layer for Mobile/Tablet Scroll - Now using Blur instead of Gradient */}
      <div className={`absolute inset-0 transition-all duration-500 pointer-events-none
          ${isScrolled && !isMobileMenuOpen ? 'opacity-100 lg:opacity-0 backdrop-blur-xl bg-[#0d0d0d]/80' : 'opacity-0'}
          border-b border-white/5`}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between relative z-10">

        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-2 z-50 relative shrink-0 group">
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
            href="https://fin-love.vercel.app/criar-conta"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-[#008c69] to-[#05a880] hover:brightness-110 hover:scale-105 transition-all duration-300 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,140,105,0.3)]"
          >
            Começar Grátis
          </a>
        </div>

        {/* Mobile/Tablet Menu Button - Visible below LG */}
        <button
          className="lg:hidden z-50 w-12 h-12 flex items-center justify-center text-white bg-white/5 rounded-full border border-white/10 backdrop-blur-md active:scale-95 transition-all hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menu de navegação"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Menu Overlay - Now using dark glass/blur effect */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 p-8 animate-in fade-in duration-300 bg-[#000000]/90 backdrop-blur-2xl">
            {/* Subtle Internal Glow Effect */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="flex flex-col items-center gap-8 relative z-10">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="text-3xl font-medium text-white uppercase tracking-wider cursor-pointer hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href="https://fin-love.vercel.app/criar-conta"
              className="px-10 py-4 rounded-full bg-primary text-black font-bold text-lg uppercase mt-8 cursor-pointer relative z-10 shadow-[0_0_30px_rgba(71,255,183,0.3)] hover:scale-105 transition-transform"
            >
              Começar Grátis
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
