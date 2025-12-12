import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Trophy, Calculator, Target } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
const PLR_FAQS = [
  {
    question: "O que é PLR?",
    answer: "Participação nos Lucros e Resultados. É um bônus pago pela empresa aos funcionários quando metas são atingidas."
  },
  {
    question: "Tem desconto de INSS?",
    answer: "Não! A PLR é isenta de encargos trabalhistas e previdenciários (INSS e FGTS) tanto para a empresa quanto para o funcionário."
  },
  {
    question: "Tem desconto de Imposto de Renda?",
    answer: "Sim, mas possui uma tabela exclusiva e mais vantajosa que a dos salários. Valores até determinado limite são isentos."
  }
];
function PLRPage() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const val = parseFloat(amount.replace(/\./g, "").replace(",", "."));
    if (isNaN(val) || val === 0) {
      setResult(null);
      return;
    }
    let tax = 0;
    if (val <= 7640.8) {
      tax = 0;
    } else if (val <= 9922.28) {
      tax = val * 0.075 - 573.06;
    } else if (val <= 13167) {
      tax = val * 0.15 - 1317.23;
    } else if (val <= 16380.38) {
      tax = val * 0.225 - 2304.76;
    } else {
      tax = val * 0.275 - 3123.78;
    }
    setResult({
      tax,
      netAmount: val - tax,
      effectiveRate: tax / val * 100
    });
  };
  useEffect(() => {
    calculate();
  }, [amount]);
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
    "name": "Calculadora de PLR",
    "description": "Calcule o Imposto de Renda sobre sua PLR (Participação nos Lucros e Resultados).",
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
        title: "Calculadora de PLR - Imposto de Renda Exclusivo",
        description: "Vai receber PLR? Calcule o desconto do Imposto de Renda. A tabela da PLR é diferente e mais vantajosa que a do salário.",
        canonical: "/calculadoras/plr"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": PLR_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "PLR", href: "/calculadoras/plr" }
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
                /* @__PURE__ */ jsx(Trophy, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500", children: "PLR" })
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
                "Calcular Imposto"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Bruto da PLR" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: amount,
                        onChange: (e) => handleCurrencyInput(e.target.value, setAmount),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor Líquido a Receber" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.netAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Imposto Retido" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-red-400", children: result ? `- R$ ${result.tax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Alíquota Efetiva" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `${result.effectiveRate.toFixed(2)}%` : "---" })
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
                /* @__PURE__ */ jsx(Target, { className: "w-5 h-5 text-blue-500" }),
                "Benefício Fiscal"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "A PLR tem tributação exclusiva na fonte. Isso significa que ela não se soma aos seus salários no ajuste anual do Imposto de Renda, o que é ótimo para o seu bolso." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Isenção" }),
                  "Em 2024, quem recebe até R$ 7.640,80 de PLR no ano está isento de imposto de renda sobre esse valor."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Participação nos Lucros e Resultados. Veja quanto sobra líquido para você." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: PLR_FAQS,
          title: "Dúvidas sobre PLR",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  PLRPage
};
//# sourceMappingURL=PLRPage-B6_k3Isu.js.map
