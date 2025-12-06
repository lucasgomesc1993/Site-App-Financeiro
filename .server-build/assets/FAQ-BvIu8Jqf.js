import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { F as FAQS } from "../entry-server.js";
import { ChevronUp, ChevronDown } from "lucide-react";
const FAQ = ({ items, title = "Dúvidas frequentes", className = "py-24 md:py-32", showSocialProof = true }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const data = items || FAQS;
  return /* @__PURE__ */ jsx("section", { id: "faq", className: `px-4 bg-background ${className}`, children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-[#0d0d0d] rounded-[40px] p-8 md:p-12 overflow-hidden border border-white/5 shadow-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#47ffb7] to-transparent shadow-[0_0_25px_rgba(71,255,183,1)] z-20" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-[#47ffb7]/5 blur-[80px] pointer-events-none z-0" }),
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 relative z-10", children: [
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
          className: "w-full py-6 md:py-8 flex items-start justify-between text-left focus:outline-none group gap-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 flex-1 pt-1", children: [
              /* @__PURE__ */ jsx("span", { className: `text-lg md:text-xl font-medium transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-300 group-hover:text-white"}`, children: faq.question }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`,
                  children: /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-base leading-relaxed pr-4 md:pr-12 font-light", children: faq.answer })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 mt-1
                                    ${isOpen ? "bg-[#47ffb7]/5 border-[#47ffb7] shadow-[0_0_20px_rgba(71,255,183,0.2)]" : "bg-[#1a1a1a] border-white/10 group-hover:border-[#47ffb7]/50"}`,
                children: isOpen ? /* @__PURE__ */ jsx(ChevronUp, { size: 20, className: "text-[#47ffb7]", strokeWidth: 2 }) : /* @__PURE__ */ jsx(ChevronDown, { size: 20, className: "text-[#47ffb7]", strokeWidth: 2 })
              }
            )
          ]
        }
      ) }, idx);
    }) })
  ] }) }) });
};
export {
  FAQ as F
};
//# sourceMappingURL=FAQ-BvIu8Jqf.js.map
