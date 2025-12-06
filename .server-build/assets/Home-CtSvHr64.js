import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Zap, CheckCircle2, ShieldCheck, Smartphone, TrendingUp, Globe, Quote, Check, ArrowRight, Play } from "lucide-react";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { M as MODULES, T as TESTIMONIALS } from "../entry-server.js";
import { Link } from "react-router-dom";
import { s as storiesData } from "./stories-BQ4sUJVe.js";
import { b as blogService } from "./blogService-CkskM1UR.js";
import { P as PostCard } from "./PostCard-Cr4-3bwu.js";
import { F as FAQ } from "./FAQ-BvIu8Jqf.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
const Hero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex flex-col items-center justify-center pt-36 pb-24 md:pt-48 md:pb-32 px-4 overflow-hidden max-w-[100vw]", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-10 text-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "w-24 h-24 md:w-28 md:h-28 mb-4 relative flex items-center justify-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl blur-xl" }),
            /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full bg-[#0d0d0d] border border-primary/30 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(71,255,183,0.15)]", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "w-12 h-12 text-primary", strokeWidth: 1.5 }),
              /* @__PURE__ */ jsx("div", { className: "absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-[#0d0d0d]", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-black", children: "AI" }) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "h1",
        {
          className: "text-4xl md:text-6xl lg:text-7xl font-medium leading-tight text-white tracking-tight",
          children: [
            "Controle financeiro no ",
            /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
            "WhatsApp com ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500", children: "Inteligência Artificial" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.4 },
          className: "text-lg md:text-xl text-muted max-w-2xl font-light",
          children: [
            /* @__PURE__ */ jsx("span", { className: "font-normal text-white", children: "Esqueça as planilhas chatas." }),
            " Basta enviar um áudio ou mensagem e nossa IA categoriza, organiza e gera relatórios em segundos."
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.6 },
          children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://junny.com.br/criar-conta",
              className: "inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#008c69] to-[#008c69] hover:brightness-110 text-white font-bold text-lg rounded-full transition-all shadow-[0_0_30px_rgba(71,255,183,0.2)] hover:shadow-[0_0_50px_rgba(71,255,183,0.4)] text-center uppercase tracking-wide transform hover:scale-[1.02]",
              children: "Testar Grátis Agora"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1, delay: 1 },
          className: "flex items-center gap-4 mt-8",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex -space-x-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full border-2 border-background overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: `https://picsum.photos/50/50?random=${i + 40}`, alt: "Foto de perfil de cliente satisfeito da Junny", width: 40, height: 40, className: "w-full h-full object-cover" }) }, i)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex text-yellow-400 text-xs gap-0.5", children: "★★★★★".split("").map((star, i) => /* @__PURE__ */ jsx("span", { children: star }, i)) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-300", children: "15mil + usuários" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "mt-20 w-full max-w-6xl mx-auto perspective-1000 relative z-0",
        style: { perspective: "1200px" },
        children: /* @__PURE__ */ jsxs("div", { className: "relative transform rotate-x-12 scale-90 opacity-90 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(71,255,183,0.15)] bg-[#0a0a0a]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/hero.webp",
              srcSet: "/hero-mobile.webp 600w, /hero-medium.webp 900w, /hero.webp 1200w",
              sizes: "(max-width: 768px) 100vw, 1200px",
              alt: "Junny Dashboard",
              width: 1200,
              height: 563,
              decoding: "async",
              fetchPriority: "high",
              className: "w-full h-auto object-cover opacity-80"
            }
          )
        ] })
      }
    )
  ] });
};
const Modules = () => {
  return /* @__PURE__ */ jsx("section", { id: "modulos", className: "py-24 md:py-32 px-4 relative bg-surface/30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-20", children: [
      /* @__PURE__ */ jsxs(
        motion.h3,
        {
          initial: { y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-4xl md:text-6xl font-medium text-white mb-6",
          children: [
            "Tudo o que você precisa para ",
            /* @__PURE__ */ jsx("br", {}),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "dominar seu dinheiro" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted max-w-2xl mx-auto", children: "Uma plataforma completa disfarçada de contato no seu WhatsApp. Simples, poderoso e automático." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: MODULES.map((module, idx) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: idx * 0.1, duration: 0.6 },
        className: "glass-card rounded-3xl p-1 overflow-hidden group",
        children: /* @__PURE__ */ jsxs("div", { className: "bg-[#111] rounded-[20px] h-full flex flex-col overflow-hidden relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "h-48 w-full overflow-hidden relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#111] to-transparent z-10 opacity-80" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: module.image,
                alt: module.title,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-6 z-20", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20", children: [
              /* @__PURE__ */ jsx(Zap, { size: 12 }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Recurso ",
                module.id
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 flex-1 flex flex-col gap-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white group-hover:text-primary transition-colors", children: module.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed text-sm", children: module.description }),
            /* @__PURE__ */ jsx("div", { className: "mt-auto pt-4 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-primary/50" }),
              /* @__PURE__ */ jsx("span", { children: "Disponível no plano Pro" })
            ] }) })
          ] })
        ] })
      },
      module.id
    )) })
  ] }) });
};
const Certificate = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32 px-4 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col items-center text-center gap-12", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "z-10",
        children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-4xl md:text-6xl font-medium text-white mb-4", children: [
            "Relatórios de ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Inteligência" }),
            " Financeira"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted max-w-3xl mx-auto", children: "Não apenas dados, mas insights. Receba mensalmente uma análise completa do seu comportamento financeiro, sugestões de economia e previsões para o próximo mês." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9, rotateX: 20 },
        whileInView: { opacity: 1, scale: 1, rotateX: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        className: "relative w-full max-w-4xl perspective-1000",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-primary/20 rounded-[40px] blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a1a1a]", children: /* @__PURE__ */ jsxs("div", { className: "w-full aspect-[16/9] flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "h-12 bg-[#252525] flex items-center px-4 gap-2 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-red-500/50" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-500/50" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-green-500/50" }),
              /* @__PURE__ */ jsx("div", { className: "ml-4 bg-[#111] px-4 py-1 rounded text-xs text-gray-500 font-mono w-64", children: "junny.com.br/reports/january" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-[#111] p-8 flex gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "w-1/3 bg-white/5 rounded-xl p-6 flex flex-col gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "h-32 w-32 rounded-full border-4 border-primary/30 mx-auto flex items-center justify-center relative", children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: "72%" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Meta de Economia" }),
                  /* @__PURE__ */ jsx("p", { className: "text-white font-bold", children: "R$ 1.200 / R$ 1.500" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "w-2/3 flex flex-col gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "h-8 w-1/2 bg-white/10 rounded animate-pulse" }),
                /* @__PURE__ */ jsx("div", { className: "h-4 w-3/4 bg-white/5 rounded" }),
                /* @__PURE__ */ jsx("div", { className: "h-4 w-2/3 bg-white/5 rounded" }),
                /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "h-24 bg-emerald-500/10 rounded-lg border border-emerald-500/20 p-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-emerald-400 text-xs mb-2", children: "Entradas" }),
                    /* @__PURE__ */ jsx("p", { className: "text-white text-lg font-bold", children: "R$ 5.450" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "h-24 bg-red-500/10 rounded-lg border border-red-500/20 p-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-red-400 text-xs mb-2", children: "Saídas" }),
                    /* @__PURE__ */ jsx("p", { className: "text-white text-lg font-bold", children: "R$ 3.210" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "h-24 bg-blue-500/10 rounded-lg border border-blue-500/20 p-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-blue-400 text-xs mb-2", children: "Investido" }),
                    /* @__PURE__ */ jsx("p", { className: "text-white text-lg font-bold", children: "R$ 1.000" })
                  ] })
                ] })
              ] })
            ] })
          ] }) })
        ]
      }
    )
  ] }) });
};
const Community = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32 px-4 relative overflow-hidden bg-[#0d0d0d]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mb-20", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center",
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-5xl md:text-7xl font-medium text-white tracking-tighter mb-2", children: "2.5M+" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 uppercase tracking-widest text-sm", children: "Transações Processadas" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.1 },
          className: "text-center",
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-5xl md:text-7xl font-medium text-white tracking-tighter mb-2", children: "R$ 12K" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 uppercase tracking-widest text-sm", children: "Economia Média/Ano" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-[48px] bg-[#141414] border border-white/5 p-8 md:p-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent animate-pulse-slow" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/90" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center text-center gap-12", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-white font-medium tracking-wide uppercase", children: "Ecossistema Completo" })
              ] }),
              /* @__PURE__ */ jsxs("h2", { className: "text-5xl md:text-8xl font-medium text-white uppercase tracking-tighter leading-none", children: [
                "MAIS QUE UM APP ",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500", children: "SEU NOVO CFO" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8", children: [
          { icon: ShieldCheck, title: "Segurança", desc: "Dados criptografados e proteção nível bancário." },
          { icon: Smartphone, title: "Mobile First", desc: "Funciona nativamente onde você já está: WhatsApp." },
          { icon: TrendingUp, title: "Investimentos", desc: "Controle sua carteira de ativos em breve." },
          { icon: Globe, title: "Acesso Web", desc: "Visualize gráficos detalhados no computador." }
        ].map((card, idx) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: idx * 0.1 },
            className: "bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-start gap-4 hover:bg-white/10 transition-colors backdrop-blur-sm group",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(card.icon, { size: 24 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: card.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 leading-relaxed text-left", children: card.desc })
              ] })
            ]
          },
          idx
        )) })
      ] })
    ] })
  ] }) });
};
const TestimonialCard = ({ t }) => /* @__PURE__ */ jsxs("div", { className: "relative w-[350px] md:w-[400px] bg-[#141414]/80 border border-white/5 p-6 rounded-2xl flex-shrink-0 hover:bg-[#1a1a1a] transition-colors duration-300 group backdrop-blur-md", children: [
  /* @__PURE__ */ jsx("div", { className: "absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-primary/20 rounded-full blur-2xl" }) }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4 relative z-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("img", { src: t.image, alt: t.name, className: "w-10 h-10 rounded-full object-cover border border-white/10" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold text-sm", children: t.name }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: t.handle })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Quote, { className: "w-5 h-5 text-primary/30" })
  ] }),
  /* @__PURE__ */ jsxs("p", { className: "text-gray-300 text-sm leading-relaxed mb-4 font-light relative z-10", children: [
    '"',
    t.text,
    '"'
  ] }),
  /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: "★★★★★".split("").map((star, i) => /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#f5c518]", children: star }, i)) })
] });
const Testimonials = () => {
  const firstRow = TESTIMONIALS.slice(0, 5);
  const secondRow = TESTIMONIALS.slice(5, 10);
  return /* @__PURE__ */ jsxs("section", { id: "depoimentos", className: "py-24 md:py-32 relative bg-[#0d0d0d] overflow-hidden max-w-[100vw]", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 mb-20 text-center relative z-10", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight", children: [
            "O fim da ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500", children: "ansiedade financeira" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted max-w-2xl mx-auto font-light", children: "Junte-se a milhares de pessoas que transformaram sua relação com o dinheiro usando apenas o WhatsApp e a nossa IA." })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 h-full w-24 md:w-48 bg-gradient-to-r from-[#0d0d0d] to-transparent z-20 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 h-full w-24 md:w-48 bg-gradient-to-l from-[#0d0d0d] to-transparent z-20 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "flex overflow-hidden select-none", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "flex gap-6 pr-6",
          animate: { x: ["0%", "-50%"] },
          transition: {
            repeat: Infinity,
            ease: "linear",
            duration: 40
          },
          children: [...firstRow, ...firstRow, ...firstRow].map((t, idx) => /* @__PURE__ */ jsx(TestimonialCard, { t }, `row1-${idx}`))
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex overflow-hidden select-none", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "flex gap-6 pr-6",
          animate: { x: ["-50%", "0%"] },
          transition: {
            repeat: Infinity,
            ease: "linear",
            duration: 45
          },
          children: [...secondRow, ...secondRow, ...secondRow].map((t, idx) => /* @__PURE__ */ jsx(TestimonialCard, { t }, `row2-${idx}`))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent z-20 pointer-events-none" })
  ] });
};
const Price = () => {
  return /* @__PURE__ */ jsx("section", { id: "investimento", className: "py-24 md:py-32 px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-[40px] p-8 md:p-16 relative overflow-hidden border border-white/10 shadow-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-12 items-start justify-between relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase mb-6 tracking-wider", children: "Oferta de Lançamento" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight leading-tight", children: [
          "ASSUMA O CONTROLE ",
          /* @__PURE__ */ jsx("br", {}),
          " DA SUA VIDA FINANCEIRA"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted mb-8 font-light leading-relaxed", children: "Pare de perder dinheiro sem saber onde. O preço de um café para organizar sua vida inteira." }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-5 mb-10", children: ["Lançamentos Ilimitados no WhatsApp", "Dashboard Completo Web", "Suporte Prioritário", "Cancelamento a qualquer momento"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-4 text-gray-200 font-medium", children: [
          /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(71,255,183,0.4)]", children: /* @__PURE__ */ jsx(Check, { size: 14, className: "text-black stroke-[3]" }) }),
          item
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-auto flex flex-col items-start md:items-end gap-2 bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-lg line-through font-medium", children: "R$ 49,90/mês" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-white", children: "R$" }),
          /* @__PURE__ */ jsx("span", { className: "text-6xl font-bold text-primary tracking-tight", children: "29,90" }),
          /* @__PURE__ */ jsx("span", { className: "text-xl text-gray-400", children: "/mês" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm uppercase tracking-wide font-medium", children: "Plano Anual: 2 meses grátis" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://junny.com.br/criar-conta",
            className: "mt-8 w-full px-8 py-5 bg-gradient-to-r from-[#008c69] to-[#008c69] hover:brightness-110 text-white font-bold text-lg rounded-full transition-all shadow-[0_0_30px_rgba(71,255,183,0.2)] hover:shadow-[0_0_50px_rgba(71,255,183,0.4)] text-center uppercase tracking-wide transform hover:scale-[1.02]",
            children: "Assinar Agora"
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-4 w-full text-center flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" }) }),
          "7 dias grátis • Sem compromisso"
        ] })
      ] })
    ] })
  ] }) }) });
};
const RecentStories = () => {
  const recentStories = storiesData.slice(0, 4);
  if (recentStories.length === 0) return null;
  return /* @__PURE__ */ jsx("section", { className: "py-24 px-4 bg-surface/30 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-12 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-yellow-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dicas Rápidas" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: [
          "Web Stories ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Junny" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-xl", children: "Conteúdo visual e direto ao ponto para você aprender sobre finanças em poucos segundos." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/stories",
          className: "flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors group",
          children: [
            "Ver todas as stories",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: recentStories.map((story, index) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: `/stories/${story.slug}`,
        className: "group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-gray-900",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: story.posterPortrait,
              alt: story.title,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-wider mb-2", children: [
              /* @__PURE__ */ jsx(Play, { className: "w-3 h-3 fill-current" }),
              "Web Story"
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-sm leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2", children: story.title })
          ] })
        ]
      },
      story.slug
    )) })
  ] }) });
};
const LatestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await blogService.getPosts();
        setPosts(allPosts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  if (!loading && posts.length === 0) return null;
  return /* @__PURE__ */ jsxs("section", { className: "py-24 bg-[#0d0d0d] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-end justify-between mb-12 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: [
            "Últimas do ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Blog" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-xl", children: "Fique por dentro das novidades, dicas de economia e estratégias para dominar suas finanças." })
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/blog",
            className: "group flex items-center gap-2 text-primary font-medium hover:text-emerald-400 transition-colors",
            children: [
              "Ver todos os artigos",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
            ]
          }
        )
      ] }),
      loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-[400px] bg-white/5 rounded-2xl animate-pulse border border-white/5" }, i)) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.id)) })
    ] })
  ] });
};
const Hook = lazy(() => import("./Hook-BhQfSaQt.js").then((module) => ({ default: module.Hook })));
const Home = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Junny - Controle Financeiro Inteligente",
        description: "Gerencie suas finanças, calcule férias, rescisão e investimentos com as ferramentas gratuitas da Junny.",
        canonical: "/"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Junny",
      "url": "https://junny.com.br",
      "logo": "https://junny.com.br/favicon.ico",
      "description": "Organize suas finanças sem sair do chat. A Junny é a maneira mais simples e rápida de controlar seus gastos usando Inteligência Artificial no WhatsApp.",
      "sameAs": []
    }) }),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) }), children: /* @__PURE__ */ jsx(Hook, {}) }),
    /* @__PURE__ */ jsx(Modules, {}),
    /* @__PURE__ */ jsx(Certificate, {}),
    /* @__PURE__ */ jsx(Community, {}),
    /* @__PURE__ */ jsx(Testimonials, {}),
    /* @__PURE__ */ jsx(Price, {}),
    /* @__PURE__ */ jsx(LatestPosts, {}),
    /* @__PURE__ */ jsx(RecentStories, {}),
    /* @__PURE__ */ jsx(FAQ, {})
  ] });
};
export {
  Home
};
//# sourceMappingURL=Home-CtSvHr64.js.map
