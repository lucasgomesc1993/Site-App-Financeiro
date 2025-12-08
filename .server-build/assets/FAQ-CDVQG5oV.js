import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { F as FAQS } from "../entry-server.js";
import { ShieldCheck, ChevronUp, ChevronDown } from "lucide-react";
import { u as useCalculatorContext } from "./CalculatorContext-CjI84puU.js";
import { Link } from "react-router-dom";
import { A as AUTHOR } from "./author-DhnQlz7G.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
const AuthorBadge = ({ className = "" }) => {
  return /* @__PURE__ */ jsx("div", { className: `max-w-7xl mx-auto px-4 md:px-8 flex justify-center ${className}`, children: /* @__PURE__ */ jsxs(
    Link,
    {
      to: "/autor",
      className: "inline-flex items-center gap-4 bg-[#0d0d0d] border border-white/5 rounded-2xl p-4 pr-6 hover:bg-white/5 hover:border-primary/20 transition-all duration-300 group",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: AUTHOR.avatar_url,
              alt: AUTHOR.name,
              className: "w-12 h-12 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 bg-background rounded-full p-0.5", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5 text-primary fill-primary/10" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 font-medium tracking-wide uppercase", children: "Conteúdo revisado por" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-white group-hover:text-primary transition-colors", children: AUTHOR.name }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 line-clamp-1 max-w-[200px] md:max-w-none", children: AUTHOR.role })
        ] })
      ]
    }
  ) });
};
const FAQ = ({ items, title = "Dúvidas frequentes", className = "py-24 md:py-32", showSocialProof = true }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const data = items || FAQS;
  const isCalculator = useCalculatorContext();
  return /* @__PURE__ */ jsx("section", { id: "faq", className: `px-4 ${className} ${isCalculator ? "-mt-6 !pt-0 bg-transparent" : "bg-background"}`, children: /* @__PURE__ */ jsxs("div", { className: `${isCalculator ? "max-w-7xl" : "max-w-3xl"} mx-auto`, children: [
    isCalculator ? (
      // Calculator Layout: Grid of open cards
      /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "text-center mb-8 md:mb-12 relative z-10", children: /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight", children: title }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10", children: data.map((faq, idx) => /* @__PURE__ */ jsx("div", { className: "group h-full bg-[#0d0d0d] rounded-3xl p-6 md:p-8 border border-white/5 hover:border-primary/20 transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors duration-300", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-lg", children: "?" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors pr-2", children: faq.question }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "text-gray-400 leading-relaxed text-sm break-words [&>a]:text-blue-400 [&>a]:underline [&>a]:decoration-blue-400/30 hover:[&>a]:text-blue-300",
                dangerouslySetInnerHTML: { __html: faq.answer }
              }
            )
          ] })
        ] }) }, idx)) })
      ] })
    ) : (
      // Default Layout: Accordion inside a single card
      /* @__PURE__ */ jsxs("div", { className: "relative bg-[#0d0d0d] rounded-[40px] p-6 md:p-12 overflow-hidden border border-white/5 shadow-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#47ffb7] to-transparent shadow-[0_0_25px_rgba(71,255,183,1)] z-20" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-[#47ffb7]/5 blur-[80px] pointer-events-none z-0" }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 md:mb-16 relative z-10", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight", children: title }),
          showSocialProof && /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center gap-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white/5 pr-6 pl-2 py-2 rounded-full border border-white/5 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "flex -space-x-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full border-2 border-[#0d0d0d] overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `https://picsum.photos/100/100?random=${i + 30}`,
                alt: "Student",
                className: "w-full h-full object-cover"
              }
            ) }, i)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex text-[#f5c518] text-[10px] gap-0.5 mb-0.5", children: "★★★★★".split("").map((star, i) => /* @__PURE__ */ jsx("span", { children: star }, i)) }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-gray-300", children: "6mil + alunos" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col relative z-10", children: data.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return /* @__PURE__ */ jsx("div", { className: "border-b border-white/5 last:border-none", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpenIndex(isOpen ? null : idx),
              className: "w-full py-5 md:py-8 flex items-start justify-between text-left focus:outline-none group gap-6",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 md:gap-3 flex-1 pt-1", children: [
                  /* @__PURE__ */ jsx("span", { className: `text-base md:text-xl font-medium transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-300 group-hover:text-white"}`, children: faq.question }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`,
                      children: /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "text-gray-400 text-sm md:text-base leading-relaxed pr-2 md:pr-12 font-light break-words [&>a]:text-blue-400 [&>a]:underline [&>a]:decoration-blue-400/30 hover:[&>a]:text-blue-300",
                          dangerouslySetInnerHTML: { __html: faq.answer }
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 mt-1
                                        ${isOpen ? "bg-[#47ffb7]/5 border-[#47ffb7] shadow-[0_0_20px_rgba(71,255,183,0.2)]" : "bg-[#1a1a1a] border-white/10 group-hover:border-[#47ffb7]/50"}`,
                    children: isOpen ? /* @__PURE__ */ jsx(ChevronUp, { size: 16, className: "text-[#47ffb7] md:w-5 md:h-5", strokeWidth: 2 }) : /* @__PURE__ */ jsx(ChevronDown, { size: 16, className: "text-[#47ffb7] md:w-5 md:h-5", strokeWidth: 2 })
                  }
                )
              ]
            }
          ) }, idx);
        }) })
      ] })
    ),
    isCalculator && /* @__PURE__ */ jsx(AuthorBadge, { className: "mt-8 md:mt-12" })
  ] }) });
};
export {
  FAQ
};
//# sourceMappingURL=FAQ-CDVQG5oV.js.map
