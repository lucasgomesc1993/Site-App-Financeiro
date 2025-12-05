import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Home, Calculator, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO, F as FAQ } from "../entry-server.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { AppPromoBanner } from "./AppPromoBanner-BHihqQwm.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
const RENT_VS_BUY_FAQS = [
  {
    question: "Quando vale a pena alugar?",
    answer: "Financeiramente, alugar vale a pena quando o valor do aluguel é muito inferior ao rendimento que você teria se investisse o dinheiro da compra do imóvel. Também é indicado para quem precisa de mobilidade ou não tem certeza de onde vai morar a longo prazo."
  },
  {
    question: "Quando vale a pena comprar?",
    answer: "Comprar é vantajoso para quem busca estabilidade, personalização do imóvel e proteção contra aumentos de aluguel. Financeiramente, compensa se a parcela do financiamento for próxima ao valor do aluguel ou se o imóvel tiver grande potencial de valorização."
  },
  {
    question: "O que é custo de oportunidade?",
    answer: "É o quanto você deixa de ganhar ao escolher uma opção. Ao comprar um imóvel à vista, o custo de oportunidade é o rendimento que esse dinheiro teria se ficasse investido no mercado financeiro."
  }
];
function RentVsBuyPage() {
  const [propertyValue, setPropertyValue] = useState("");
  const [rentValue, setRentValue] = useState("");
  const [investmentYield, setInvestmentYield] = useState("0.85");
  const [appreciationRate, setAppreciationRate] = useState("0.5");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const propVal = parseFloat(propertyValue.replace(/\./g, "").replace(",", ".") || "0");
    const rentVal = parseFloat(rentValue.replace(/\./g, "").replace(",", ".") || "0");
    const yieldRate = parseFloat(investmentYield.replace(",", ".") || "0") / 100;
    const apprecRate = parseFloat(appreciationRate.replace(",", ".") || "0") / 100;
    const periodMonths = parseInt(years) * 12;
    if (propVal === 0 || rentVal === 0) {
      setResult(null);
      return;
    }
    let capitalRent = propVal;
    let currentRent = rentVal;
    for (let i = 0; i < periodMonths; i++) {
      capitalRent = capitalRent * (1 + yieldRate) - currentRent;
      currentRent = currentRent * (1 + apprecRate);
    }
    const rentTotalWealth = capitalRent;
    const buyTotalWealth = propVal * Math.pow(1 + apprecRate, periodMonths);
    setResult({
      rentTotalWealth,
      buyTotalWealth,
      difference: Math.abs(rentTotalWealth - buyTotalWealth),
      bestOption: rentTotalWealth > buyTotalWealth ? "rent" : "buy"
    });
  };
  useEffect(() => {
    calculate();
  }, [propertyValue, rentValue, investmentYield, appreciationRate, years]);
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
    "name": "Calculadora Alugar ou Comprar Imóvel",
    "description": "Descubra se vale mais a pena comprar ou alugar um imóvel com base em seus objetivos financeiros.",
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
        title: "Alugar ou Comprar Imóvel? Calculadora de Decisão",
        description: "Tire a dúvida cruel. Simule se financeiramente vale mais a pena pagar aluguel e investir ou comprar a casa própria.",
        canonical: "/calculadoras/alugar-ou-financiar"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": RENT_VS_BUY_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Alugar ou Comprar", href: "/calculadoras/alugar-ou-financiar" }
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
                /* @__PURE__ */ jsx(Home, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Alugar ou ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-500", children: "Comprar?" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "A matemática por trás da casa própria. Descubra qual opção constrói mais patrimônio." })
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
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-rose-500" }),
                "Simular Cenários"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor do Imóvel" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: propertyValue,
                        onChange: (e) => handleCurrencyInput(e.target.value, setPropertyValue),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor do Aluguel (Mensal)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: rentValue,
                        onChange: (e) => handleCurrencyInput(e.target.value, setRentValue),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Rendimento Invest. (% a.m.)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: investmentYield,
                        onChange: (e) => setInvestmentYield(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "0.85"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valorização Imóvel (% a.m.)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: appreciationRate,
                        onChange: (e) => setAppreciationRate(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "0.5"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Período (Anos)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: years,
                        onChange: (e) => setYears(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "10"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-rose-400 block mb-2", children: "Melhor Opção Financeira" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? result.bestOption === "rent" ? "Alugar + Investir" : "Comprar Imóvel" : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "rent" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Patrimônio Alugando" }),
                      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white", children: result ? `R$ ${result.rentTotalWealth.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "buy" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Patrimônio Comprando" }),
                      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white", children: result ? `R$ ${result.buyTotalWealth.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}` : "---" })
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
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-rose-500" }),
                "Análise"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Esta simulação compara dois cenários partindo do princípio que você tem o dinheiro à vista:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Alugar:" }),
                    " Você investe o dinheiro do imóvel e paga o aluguel com os rendimentos (ou parte deles)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Comprar:" }),
                    " Você compra o imóvel e ganha com a valorização dele ao longo do tempo."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dica" }),
                  "Se o aluguel for menor que 0,4% do valor do imóvel, geralmente compensa mais alugar e investir a diferença."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: RENT_VS_BUY_FAQS,
          title: "Dúvidas sobre Imóveis",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  RentVsBuyPage
};
//# sourceMappingURL=RentVsBuyPage-DsHt2OhM.js.map
