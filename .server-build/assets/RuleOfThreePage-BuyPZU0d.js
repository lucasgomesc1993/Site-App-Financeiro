import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Divide, Calculator, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO, F as FAQ } from "../entry-server.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { AppPromoBanner } from "./AppPromoBanner-BwQOrylZ.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
const RULE_OF_THREE_FAQS = [
  {
    question: "Quando usar a Regra de Três Simples?",
    answer: "Use quando você tem três números e quer descobrir o quarto. Exemplo: Se 2kg custam R$10, quanto custam 5kg?"
  },
  {
    question: "O que é grandeza diretamente proporcional?",
    answer: "Quando uma aumenta, a outra também aumenta. Exemplo: Quanto mais gasolina, mais longe o carro vai."
  },
  {
    question: "O que é grandeza inversamente proporcional?",
    answer: "Quando uma aumenta, a outra diminui. Exemplo: Quanto mais velocidade, menos tempo leva a viagem."
  }
];
function RuleOfThreePage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState(null);
  const [inverse, setInverse] = useState(false);
  const calculate = () => {
    const valA = parseFloat(a.replace(",", "."));
    const valB = parseFloat(b.replace(",", "."));
    const valC = parseFloat(c.replace(",", "."));
    if (isNaN(valA) || isNaN(valB) || isNaN(valC) || valA === 0) {
      setResult(null);
      return;
    }
    if (inverse) {
      setResult(valA * valB / valC);
    } else {
      setResult(valB * valC / valA);
    }
  };
  useEffect(() => {
    calculate();
  }, [a, b, c, inverse]);
  const handleInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Regra de Três",
    "description": "Resolva problemas de proporção direta e inversa com nossa calculadora de Regra de Três.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Regra de Três Simples - Direta e Inversa",
        description: "Resolva problemas de matemática e proporção em segundos. Calcule regra de três simples, direta ou inversamente proporcional.",
        canonical: "/calculadoras/regra-de-tres"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": RULE_OF_THREE_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Regra de Três", href: "/calculadoras/regra-de-tres" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Divide, { className: "w-4 h-4 text-cyan-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Matemática e Saúde" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500", children: "Regra de Três" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto hidden" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 min-h-[600px]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
                /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                  /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-cyan-500" }),
                  "Calcular"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: `text-sm ${!inverse ? "text-cyan-400 font-bold" : "text-gray-500"}`, children: "Direta" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setInverse(!inverse),
                      className: `w-12 h-6 rounded-full p-1 transition-colors ${inverse ? "bg-cyan-500" : "bg-white/10"}`,
                      children: /* @__PURE__ */ jsx("div", { className: `w-4 h-4 bg-white rounded-full transition-transform ${inverse ? "translate-x-6" : "translate-x-0"}` })
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: `text-sm ${inverse ? "text-cyan-400 font-bold" : "text-gray-500"}`, children: "Inversa" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute -left-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold", children: "A" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: a,
                        onChange: (e) => handleInput(e.target.value, setA),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-xl font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                        placeholder: "0"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 text-sm", children: "está para" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute -left-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold", children: "C" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: c,
                        onChange: (e) => handleInput(e.target.value, setC),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-xl font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                        placeholder: "0"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-full w-px bg-white/10 mx-auto" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute -right-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold", children: "B" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: b,
                        onChange: (e) => handleInput(e.target.value, setB),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-xl font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                        placeholder: "0"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 text-sm", children: "assim como" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute -right-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold", children: "X" }),
                    /* @__PURE__ */ jsx("div", { className: "w-full bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-4 px-4 text-center text-xl font-bold text-cyan-400", children: result !== null ? result.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) : "?" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-cyan-500" }),
                "Exemplos Práticos"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Proporção Direta" }),
                  "Se 10 litros de gasolina custam R$50 (A e B), quanto custam 25 litros (C)? O resultado é X."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Proporção Inversa" }),
                  "Se 2 pedreiros (A) levam 10 dias (B) para fazer um muro, quanto tempo levariam 5 pedreiros (C)? O resultado é X (menos tempo)."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "A ferramenta matemática mais útil do dia a dia. Resolva proporções diretas e inversas instantaneamente." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: RULE_OF_THREE_FAQS,
          title: "Dúvidas sobre Regra de Três",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  RuleOfThreePage
};
//# sourceMappingURL=RuleOfThreePage-BuyPZU0d.js.map
