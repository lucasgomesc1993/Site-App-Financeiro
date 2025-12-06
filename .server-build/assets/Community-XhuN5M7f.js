import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, TrendingUp, Globe } from "lucide-react";
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
export {
  Community
};
//# sourceMappingURL=Community-XhuN5M7f.js.map
