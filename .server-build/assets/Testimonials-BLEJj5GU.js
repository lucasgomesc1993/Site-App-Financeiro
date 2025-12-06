import { jsxs, jsx } from "react/jsx-runtime";
import { T as TESTIMONIALS } from "../entry-server.js";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import "react";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
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
export {
  Testimonials
};
//# sourceMappingURL=Testimonials-BLEJj5GU.js.map
