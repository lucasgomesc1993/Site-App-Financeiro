import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Clock, Calculator, RotateCcw, HelpCircle, Info } from "lucide-react";
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
const HOURS_FAQS = [
  {
    question: "Como funciona a soma de horas?",
    answer: "O sistema converte tudo para minutos, realiza a soma e depois converte de volta para o formato Horas:Minutos. Exemplo: 01:30 + 00:40 = 02:10."
  },
  {
    question: "Posso usar para calcular banco de horas?",
    answer: "Sim! É ideal para somar todas as horas trabalhadas no mês e subtrair das horas devidas para saber seu saldo positivo ou negativo."
  },
  {
    question: "O cálculo considera segundos?",
    answer: "Não, esta calculadora foca apenas em Horas e Minutos, que é o padrão para folhas de ponto e banco de horas."
  }
];
function HoursCalculatorPage() {
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("00:00");
  const calculateTime = () => {
    if (!time1 || !time2) return;
    const [h1, m1] = time1.split(":").map(Number);
    const [h2, m2] = time2.split(":").map(Number);
    if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) return;
    const totalMinutes1 = h1 * 60 + m1;
    const totalMinutes2 = h2 * 60 + m2;
    let finalMinutes;
    if (operation === "add") {
      finalMinutes = totalMinutes1 + totalMinutes2;
    } else {
      finalMinutes = totalMinutes1 - totalMinutes2;
    }
    const isNegative = finalMinutes < 0;
    finalMinutes = Math.abs(finalMinutes);
    const hours = Math.floor(finalMinutes / 60);
    const minutes = finalMinutes % 60;
    const formattedResult = `${isNegative ? "-" : ""}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    setResult(formattedResult);
  };
  useEffect(() => {
    calculateTime();
  }, [time1, time2, operation]);
  const handleTimeInput = (value, setter) => {
    if (/^[\d:]*$/.test(value)) {
      if (value.length === 2 && !value.includes(":")) {
        setter(value + ":");
      } else {
        setter(value);
      }
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Horas e Minutos",
    "description": "Some ou subtraia horas e minutos facilmente. Ideal para banco de horas e folha de ponto.",
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
        title: "Calculadora de Horas e Minutos Online - Somar e Subtrair",
        description: "Precisa calcular seu banco de horas? Use nossa calculadora gratuita para somar e subtrair horas e minutos de forma simples e rápida.",
        canonical: "/calculadoras/horas"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": HOURS_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora de Horas", href: "/calculadoras/horas" }
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
                /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "Horas" })
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
                  /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                  "Calcular"
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      setTime1("");
                      setTime2("");
                      setResult("00:00");
                    },
                    className: "text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(RotateCcw, { className: "w-3 h-3" }),
                      " Limpar"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500 ml-1", children: "Horário 1" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: time1,
                      onChange: (e) => handleTimeInput(e.target.value, setTime1),
                      placeholder: "00:00",
                      maxLength: 5,
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-2xl font-mono text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 pt-6", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setOperation("add"),
                      className: `p-2 rounded-lg transition-all ${operation === "add" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-gray-500 hover:bg-white/10"}`,
                      children: "+"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setOperation("subtract"),
                      className: `p-2 rounded-lg transition-all ${operation === "subtract" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-gray-500 hover:bg-white/10"}`,
                      children: "-"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500 ml-1", children: "Horário 2" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: time2,
                      onChange: (e) => handleTimeInput(e.target.value, setTime2),
                      placeholder: "00:00",
                      maxLength: 5,
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-2xl font-mono text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 text-center relative overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Resultado Final" }),
                /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white font-mono tracking-wider", children: result }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-400 mt-2 font-medium", children: operation === "add" ? "Soma realizada" : "Subtração realizada" })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                  /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-blue-500" }),
                  "Como usar?"
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "Digite as horas no formato ",
                      /* @__PURE__ */ jsx("strong", { children: "HH:MM" }),
                      " (ex: 08:30)."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "Use o botão ",
                      /* @__PURE__ */ jsx("strong", { children: "(+)" }),
                      " para somar horas extras ou períodos trabalhados."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "Use o botão ",
                      /* @__PURE__ */ jsx("strong", { children: "(-)" }),
                      " para descontar intervalos ou atrasos."
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-3xl border border-blue-500/20", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400", children: [
                  /* @__PURE__ */ jsx(Info, { className: "w-5 h-5" }),
                  "Dica Prática"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Para calcular seu saldo do dia: Some o horário de saída com o horário de entrada. Subtraia o tempo de almoço. O resultado é seu tempo total trabalhado." })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Some ou subtraia horas e minutos facilmente. A ferramenta ideal para fechar sua folha de ponto ou banco de horas." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: HOURS_FAQS,
          title: "Dúvidas sobre Cálculo de Horas",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  HoursCalculatorPage
};
//# sourceMappingURL=HoursCalculatorPage-DRZXoaU7.js.map
