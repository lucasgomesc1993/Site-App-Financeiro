import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Car, Calculator, MapPin, Fuel, HelpCircle } from "lucide-react";
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
const TRAVEL_FAQS = [
  {
    question: "Como calcular o consumo médio do meu carro?",
    answer: "Encha o tanque e zere o hodômetro. Rode até precisar abastecer novamente. Divida a quilometragem rodada pela quantidade de litros que coube no tanque."
  },
  {
    question: "O cálculo inclui desgaste do veículo?",
    answer: "Não, esta calculadora foca nos custos diretos da viagem: combustível e pedágios. Custos de manutenção e depreciação variam muito."
  },
  {
    question: "Como estimar o custo de pedágio?",
    answer: "Recomendamos usar aplicativos de navegação como Waze ou Google Maps, que informam o valor total dos pedágios na rota traçada."
  }
];
function TravelCostCalculatorPage() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [tolls, setTolls] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const dist = parseFloat(distance.replace(",", "."));
    const cons = parseFloat(consumption.replace(",", "."));
    const price = parseFloat(fuelPrice.replace(",", "."));
    const toll = parseFloat(tolls.replace(",", ".") || "0");
    if (isNaN(dist) || isNaN(cons) || isNaN(price) || cons === 0) {
      setResult(null);
      return;
    }
    const fuelCost = dist / cons * price;
    setResult(fuelCost + toll);
  };
  useEffect(() => {
    calculate();
  }, [distance, consumption, fuelPrice, tolls]);
  const handleInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Custo de Viagem",
    "description": "Calcule quanto vai gastar de combustível e pedágio na sua viagem.",
    "applicationCategory": "TravelApplication",
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
        title: "Calculadora de Custo de Viagem - Combustível e Pedágios",
        description: "Planeje sua viagem de carro. Calcule o gasto total com combustível e pedágios de forma simples e rápida.",
        canonical: "/calculadoras/custo-viagem"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": TRAVEL_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Custo de Viagem", href: "/calculadoras/custo-viagem" }
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
                /* @__PURE__ */ jsx(Car, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dia a Dia e Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Custo de Viagem" })
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
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-rose-500" }),
                "Calcular Custo"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400 flex items-center gap-2", children: "Distância Total (km)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(MapPin, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          inputMode: "decimal",
                          value: distance,
                          onChange: (e) => handleInput(e.target.value, setDistance),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all",
                          placeholder: "0"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400 flex items-center gap-2", children: "Consumo (km/l)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(Fuel, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          inputMode: "decimal",
                          value: consumption,
                          onChange: (e) => handleInput(e.target.value, setConsumption),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all",
                          placeholder: "0"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400 flex items-center gap-2", children: "Preço Combustível" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          inputMode: "decimal",
                          value: fuelPrice,
                          onChange: (e) => handleInput(e.target.value, setFuelPrice),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400 flex items-center gap-2", children: "Pedágios (Total)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          inputMode: "decimal",
                          value: tolls,
                          onChange: (e) => handleInput(e.target.value, setTolls),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2 text-center", children: "Custo Total Estimado" }),
                  /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-center mb-2 text-white", children: result !== null ? `R$ ${result.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                  result !== null && /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-gray-500", children: [
                    "Apenas ida. Para ida e volta, o valor seria R$ ",
                    (result * 2).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
                    "."
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
                /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-rose-500" }),
                "Dicas para Economizar"
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Calibragem:" }),
                    " Pneus calibrados economizam até 3% de combustível."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Velocidade:" }),
                    " Manter velocidade constante na estrada reduz o consumo."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Ar Condicionado:" }),
                    " Em altas velocidades, janelas abertas gastam mais que o ar condicionado (devido à aerodinâmica)."
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Saiba exatamente quanto vai gastar na estrada. Planeje seu orçamento de viagem com precisão." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: TRAVEL_FAQS,
          title: "Dúvidas sobre Custo de Viagem",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  TravelCostCalculatorPage
};
//# sourceMappingURL=TravelCostCalculatorPage-b7XSRnYs.js.map
