import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Percent, HelpCircle, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-C9Svc77H.js";
import { AppPromoBanner } from "./AppPromoBanner--0MyDSNn.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const PERCENTAGE_FAQS = [
  {
    question: "Como calcular porcentagem de um valor?",
    answer: "Multiplique o valor pela porcentagem e divida por 100. Exemplo: 30% de 200 = (200 * 30) / 100 = 60."
  },
  {
    question: "Como calcular desconto?",
    answer: "Subtraia a porcentagem do valor original. Exemplo: Produto de R$100 com 20% de desconto = R$100 - R$20 = R$80."
  },
  {
    question: "Como calcular aumento?",
    answer: "Some a porcentagem ao valor original. Exemplo: Salário de R$1000 com 10% de aumento = R$1000 + R$100 = R$1100."
  }
];
function PercentageCalculatorPage() {
  const [val1_X, setVal1_X] = useState("");
  const [val1_Y, setVal1_Y] = useState("");
  const [res1, setRes1] = useState("---");
  const [val2_X, setVal2_X] = useState("");
  const [val2_Y, setVal2_Y] = useState("");
  const [res2, setRes2] = useState("---");
  const [val3_X, setVal3_X] = useState("");
  const [val3_Y, setVal3_Y] = useState("");
  const [res3, setRes3] = useState("---");
  useEffect(() => {
    const x1 = parseFloat(val1_X.replace(",", "."));
    const y1 = parseFloat(val1_Y.replace(",", "."));
    if (!isNaN(x1) && !isNaN(y1)) {
      setRes1((x1 / 100 * y1).toLocaleString("pt-BR", { maximumFractionDigits: 2 }));
    } else {
      setRes1("---");
    }
    const x2 = parseFloat(val2_X.replace(",", "."));
    const y2 = parseFloat(val2_Y.replace(",", "."));
    if (!isNaN(x2) && !isNaN(y2) && y2 !== 0) {
      setRes2((x2 / y2 * 100).toLocaleString("pt-BR", { maximumFractionDigits: 2 }) + "%");
    } else {
      setRes2("---");
    }
    const x3 = parseFloat(val3_X.replace(",", "."));
    const y3 = parseFloat(val3_Y.replace(",", "."));
    if (!isNaN(x3) && !isNaN(y3) && x3 !== 0) {
      const diff = (y3 - x3) / x3 * 100;
      const sign = diff > 0 ? "+" : "";
      setRes3(`${sign}${diff.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`);
    } else {
      setRes3("---");
    }
  }, [val1_X, val1_Y, val2_X, val2_Y, val3_X, val3_Y]);
  const handleInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Porcentagem",
    "description": "Calcule porcentagens, descontos e aumentos de forma simples e rápida.",
    "applicationCategory": "UtilityApplication",
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
        title: "Calculadora de Porcentagem Online - Descontos e Aumentos",
        description: "Precisa calcular 10%, 20% ou 50% de um valor? Use nossa calculadora de porcentagem gratuita para descontos, aumentos e variações.",
        canonical: "/calculadoras/porcentagem"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": PERCENTAGE_FAQS.map((faq) => ({
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
          { label: "Porcentagem", href: "/calculadoras/porcentagem" }
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
                /* @__PURE__ */ jsx(Percent, { className: "w-4 h-4 text-cyan-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Matemática e Saúde" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500", children: "Porcentagem" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto hidden" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7 space-y-6 min-h-[600px]",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Quanto é..." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative flex-1 w-full", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: val1_X,
                        onChange: (e) => handleInput(e.target.value, setVal1_X),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                        placeholder: "0"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-500", children: "%" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "de" }),
                  /* @__PURE__ */ jsx("div", { className: "relative flex-1 w-full", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: val1_Y,
                      onChange: (e) => handleInput(e.target.value, setVal1_Y),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                      placeholder: "0"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "=" }),
                  /* @__PURE__ */ jsx("div", { className: "bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-3 px-6 text-cyan-400 font-bold min-w-[100px] text-center", children: res1 })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "O valor..." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "relative flex-1 w-full", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: val2_X,
                      onChange: (e) => handleInput(e.target.value, setVal2_X),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                      placeholder: "0"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm text-center", children: "é qual % de" }),
                  /* @__PURE__ */ jsx("div", { className: "relative flex-1 w-full", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: val2_Y,
                      onChange: (e) => handleInput(e.target.value, setVal2_Y),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                      placeholder: "0"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "=" }),
                  /* @__PURE__ */ jsx("div", { className: "bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-3 px-6 text-cyan-400 font-bold min-w-[100px] text-center", children: res2 })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Variação de..." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "relative flex-1 w-full", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: val3_X,
                      onChange: (e) => handleInput(e.target.value, setVal3_X),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                      placeholder: "Valor Inicial"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm", children: "para" }),
                  /* @__PURE__ */ jsx("div", { className: "relative flex-1 w-full", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: val3_Y,
                      onChange: (e) => handleInput(e.target.value, setVal3_Y),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                      placeholder: "Valor Final"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "=" }),
                  /* @__PURE__ */ jsx("div", { className: "bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-3 px-6 text-cyan-400 font-bold min-w-[100px] text-center", children: res3 })
                ] })
              ] })
            ]
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
                "Exemplos do Dia a Dia"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsxs("strong", { className: "text-white block mb-1 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(TrendingDown, { className: "w-4 h-4 text-green-400" }),
                    " Desconto"
                  ] }),
                  "Uma calça custa R$120 e tem 20% de desconto.",
                  /* @__PURE__ */ jsx("br", {}),
                  "Cálculo: 120 x 0,20 = R$24 de desconto.",
                  /* @__PURE__ */ jsx("br", {}),
                  "Preço final: R$96."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsxs("strong", { className: "text-white block mb-1 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-red-400" }),
                    " Aumento"
                  ] }),
                  "Conta de luz de R$150 aumentou 10%.",
                  /* @__PURE__ */ jsx("br", {}),
                  "Cálculo: 150 x 0,10 = R$15 de aumento.",
                  /* @__PURE__ */ jsx("br", {}),
                  "Valor final: R$165."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Calcule descontos, aumentos e variações percentuais em segundos." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: PERCENTAGE_FAQS,
          title: "Dúvidas sobre Porcentagem",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  PercentageCalculatorPage
};
//# sourceMappingURL=PercentageCalculatorPage-BWjAPt00.js.map
