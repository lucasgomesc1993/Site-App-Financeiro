import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Clock, Calculator, Timer } from "lucide-react";
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
const OVERTIME_FAQS = [
  {
    question: "Quanto vale a hora extra?",
    answer: "No mínimo 50% a mais que a hora normal (dias úteis). Aos domingos e feriados, o adicional costuma ser de 100%."
  },
  {
    question: "Como calcular o valor da hora?",
    answer: "Divida seu salário mensal pela jornada mensal (geralmente 220 horas). O resultado é o valor da sua hora normal."
  },
  {
    question: "Incide INSS e FGTS?",
    answer: "Sim. As horas extras integram o salário para todos os fins, incidindo INSS, FGTS, Férias e 13º salário (reflexos)."
  }
];
function OvertimePage() {
  const [salary, setSalary] = useState("");
  const [hoursWorked, setHoursWorked] = useState("220");
  const [overtime50, setOvertime50] = useState("");
  const [overtime100, setOvertime100] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const hours = parseFloat(hoursWorked);
    const ot50 = parseFloat(overtime50.replace(",", ".") || "0");
    const ot100 = parseFloat(overtime100.replace(",", ".") || "0");
    if (isNaN(sal) || isNaN(hours) || hours === 0) {
      setResult(null);
      return;
    }
    const hourlyRate = sal / hours;
    const value50 = hourlyRate * 1.5 * ot50;
    const value100 = hourlyRate * 2 * ot100;
    const totalOvertime = value50 + value100;
    setResult({
      hourlyRate,
      totalOvertime,
      totalSalary: sal + totalOvertime
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, hoursWorked, overtime50, overtime100]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Horas Extras",
    "description": "Calcule o valor das suas horas extras (50% e 100%) e veja o impacto no seu salário final.",
    "applicationCategory": "FinanceApplication",
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
        title: "Calculadora de Horas Extras - 50% e 100%",
        description: "Trabalhou a mais? Calcule quanto você vai receber de horas extras. Suporte para adicionais de 50% e 100%.",
        canonical: "/calculadoras/horas-extras"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": OVERTIME_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Horas Extras", href: "/calculadoras/horas-extras" }
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
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500", children: "Horas Extras" })
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
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Calcular Adicional"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: salary,
                          onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Jornada Mensal (Horas)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: hoursWorked,
                        onChange: (e) => setHoursWorked(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "220"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Horas Extras 50%" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: overtime50,
                        onChange: (e) => setOvertime50(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "Qtd horas"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Horas Extras 100%" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: overtime100,
                        onChange: (e) => setOvertime100(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "Qtd horas"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor Total das Horas Extras" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.totalOvertime.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Valor da sua Hora" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.hourlyRate.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Salário + Extras" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
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
                /* @__PURE__ */ jsx(Timer, { className: "w-5 h-5 text-blue-500" }),
                "Regras Básicas"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Hora Normal" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Valor Base" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Hora Extra 50%" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Valor Base x 1,5" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { children: "Hora Extra 100%" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Valor Base x 2,0" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Reflexos" }),
                  "Lembre-se que as horas extras habituais aumentam o valor das suas férias, 13º salário e FGTS."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Valorize seu tempo. Calcule exatamente quanto você tem a receber pelo trabalho extra." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: OVERTIME_FAQS,
          title: "Dúvidas sobre Horas Extras",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  OvertimePage
};
//# sourceMappingURL=OvertimePage-u52pL_f3.js.map
