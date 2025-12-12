import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Scale, Calculator, Building2 } from "lucide-react";
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
const SIMPLES_VS_PRESUMIDO_FAQS = [
  {
    question: "Qual a diferença básica?",
    answer: "No Simples Nacional, você paga uma guia única (DAS) com alíquota progressiva sobre o faturamento. No Lucro Presumido, os impostos são pagos separadamente (PIS, COFINS, IRPJ, CSLL, ISS/ICMS) e as alíquotas variam conforme a atividade."
  },
  {
    question: "Quando o Simples vale a pena?",
    answer: "Geralmente para empresas com faturamento menor e folha de pagamento alta (Anexo III ou V com Fator R), pois o Simples isenta a cota patronal do INSS (20%)."
  },
  {
    question: "Quando o Presumido vale a pena?",
    answer: "Para empresas com margem de lucro alta, faturamento elevado (próximo ao teto do Simples) ou atividades com alíquotas muito altas no Simples (Anexo V sem Fator R)."
  }
];
function SimplesVsPresumidoPage() {
  const [revenue, setRevenue] = useState("");
  const [payroll, setPayroll] = useState("");
  const [activity, setActivity] = useState("servicos");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const rev = parseFloat(revenue.replace(/\./g, "").replace(",", ".") || "0");
    const pay = parseFloat(payroll.replace(/\./g, "").replace(",", ".") || "0");
    if (rev === 0) {
      setResult(null);
      return;
    }
    let simplesTax = 0;
    if (activity === "comercio") {
      if (rev <= 18e4 / 12) simplesTax = rev * 0.04;
      else if (rev <= 36e4 / 12) simplesTax = rev * 0.073;
      else simplesTax = rev * 0.095;
    } else {
      const factorR = pay / rev;
      if (factorR >= 0.28) {
        if (rev <= 18e4 / 12) simplesTax = rev * 0.06;
        else if (rev <= 36e4 / 12) simplesTax = rev * 0.112;
        else simplesTax = rev * 0.135;
      } else {
        if (rev <= 18e4 / 12) simplesTax = rev * 0.155;
        else simplesTax = rev * 0.18;
      }
    }
    let presumidoTax = 0;
    presumidoTax += rev * 0.0365;
    if (activity === "servicos") {
      presumidoTax += rev * 0.1133;
      presumidoTax += rev * 0.05;
    } else {
      presumidoTax += rev * 0.0593;
      presumidoTax += rev * 0.04;
    }
    presumidoTax += pay * 0.2;
    setResult({
      simples: simplesTax,
      presumido: presumidoTax,
      bestOption: simplesTax < presumidoTax ? "Simples Nacional" : "Lucro Presumido"
    });
  };
  useEffect(() => {
    calculate();
  }, [revenue, payroll, activity]);
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
    "name": "Calculadora Simples Nacional vs Lucro Presumido",
    "description": "Qual o melhor regime tributário para sua empresa? Compare os impostos e economize dinheiro.",
    "applicationCategory": "BusinessApplication",
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
        title: "Simples Nacional ou Lucro Presumido? Comparador 2025",
        description: "Faça a escolha certa. Compare os impostos do Simples Nacional e Lucro Presumido e descubra qual regime tributário é mais barato para sua empresa.",
        canonical: "/calculadoras/simples-vs-presumido"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": SIMPLES_VS_PRESUMIDO_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Simples vs Presumido", href: "/calculadoras/simples-vs-presumido" }
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
                /* @__PURE__ */ jsx(Scale, { className: "w-4 h-4 text-amber-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empresariais" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Simples Nacional ou ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-blue-500", children: "Lucro Presumido?" })
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
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-amber-500" }),
                "Comparar Regimes"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Faturamento Mensal" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: revenue,
                        onChange: (e) => handleCurrencyInput(e.target.value, setRevenue),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Folha de Pagamento (Mensal)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: payroll,
                          onChange: (e) => handleCurrencyInput(e.target.value, setPayroll),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Atividade Principal" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: activity,
                        onChange: (e) => setActivity(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "servicos", children: "Prestação de Serviços" }),
                          /* @__PURE__ */ jsx("option", { value: "comercio", children: "Comércio" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-amber-400 block mb-2", children: "Melhor Opção Estimada" }),
                    /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-white", children: result ? result.bestOption : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "Simples Nacional" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Simples Nacional" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.simples.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "Lucro Presumido" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Lucro Presumido" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.presumido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
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
                /* @__PURE__ */ jsx(Building2, { className: "w-5 h-5 text-amber-500" }),
                "Fator R"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Para empresas de serviços no Simples Nacional, a relação entre folha de pagamento e faturamento (Fator R) define o anexo." }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsxs("strong", { children: [
                      "Fator R ",
                      ">",
                      "= 28%:"
                    ] }),
                    " Anexo III (Alíquotas menores, a partir de 6%)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsxs("strong", { children: [
                      "Fator R ",
                      "<",
                      " 28%:"
                    ] }),
                    " Anexo V (Alíquotas maiores, a partir de 15,5%)."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dica" }),
                  "Às vezes, aumentar o Pró-Labore para atingir o Fator R de 28% gera uma economia tributária enorme no Simples."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Compare os regimes tributários e descubra onde sua empresa paga menos impostos." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: SIMPLES_VS_PRESUMIDO_FAQS,
          title: "Dúvidas sobre Regimes Tributários",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  SimplesVsPresumidoPage
};
//# sourceMappingURL=SimplesVsPresumidoPage-CvpEd06-.js.map
