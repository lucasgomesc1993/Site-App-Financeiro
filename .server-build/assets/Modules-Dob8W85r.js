import { jsx, jsxs } from "react/jsx-runtime";
import { M as MODULES } from "../entry-server.js";
import { motion } from "framer-motion";
import { Zap, CheckCircle2 } from "lucide-react";
import "react";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
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
export {
  Modules
};
//# sourceMappingURL=Modules-Dob8W85r.js.map
