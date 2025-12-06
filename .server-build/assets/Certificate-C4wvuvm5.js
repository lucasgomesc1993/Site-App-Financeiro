import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
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
export {
  Certificate
};
//# sourceMappingURL=Certificate-C4wvuvm5.js.map
