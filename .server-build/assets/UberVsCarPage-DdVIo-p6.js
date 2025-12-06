import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Smartphone, Calculator, Car } from "lucide-react";
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
const UBER_VS_CAR_FAQS = [
  {
    question: "O que sai mais barato?",
    answer: "Depende da quilometragem mensal. Para quem roda pouco (até 300-500km/mês), aplicativos costumam ser mais baratos pois não têm custos fixos como IPVA, seguro e depreciação."
  },
  {
    question: "Quais os custos ocultos do carro?",
    answer: "Além de combustível e manutenção, o carro tem a depreciação (perda de valor anual), custo de oportunidade do dinheiro investido na compra, seguro, IPVA, licenciamento e estacionamento."
  },
  {
    question: "E o conforto?",
    answer: "O carro próprio oferece disponibilidade imediata e liberdade. O aplicativo oferece a comodidade de não precisar dirigir nem procurar estacionamento. A escolha também é sobre estilo de vida."
  }
];
function UberVsCarPage() {
  const [carValue, setCarValue] = useState("");
  const [kmPerMonth, setKmPerMonth] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [consumption, setConsumption] = useState("");
  const [insurance, setInsurance] = useState("");
  const [parking, setParking] = useState("");
  const [uberPrice, setUberPrice] = useState("");
  const [uberPricePerKm, setUberPricePerKm] = useState("2.50");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const carVal = parseFloat(carValue.replace(/\./g, "").replace(",", ".") || "0");
    const km = parseFloat(kmPerMonth.replace(/\./g, "").replace(",", ".") || "0");
    const fuel = parseFloat(fuelPrice.replace(",", ".") || "0");
    const cons = parseFloat(consumption.replace(",", ".") || "0");
    const ins = parseFloat(insurance.replace(/\./g, "").replace(",", ".") || "0");
    const park = parseFloat(parking.replace(/\./g, "").replace(",", ".") || "0");
    const uberKmPrice = parseFloat(uberPricePerKm.replace(",", ".") || "0");
    if (carVal === 0 || km === 0) {
      setResult(null);
      return;
    }
    const depreciation = carVal * 0.1 / 12;
    const opportunity = carVal * 8e-3;
    const ipva = carVal * 0.04 / 12;
    const insuranceMonthly = ins / 12;
    const fuelMonthly = km / cons * fuel;
    const maintenance = carVal * 0.03 / 12;
    const carMonthlyCost = depreciation + opportunity + ipva + insuranceMonthly + fuelMonthly + maintenance + park;
    const uberMonthlyCost = km * uberKmPrice;
    setResult({
      carMonthlyCost,
      uberMonthlyCost,
      bestOption: carMonthlyCost < uberMonthlyCost ? "car" : "uber"
    });
  };
  useEffect(() => {
    calculate();
  }, [carValue, kmPerMonth, fuelPrice, consumption, insurance, parking, uberPricePerKm]);
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
    "name": "Calculadora Uber ou Carro Próprio",
    "description": "Descubra se vale mais a pena ter carro próprio ou andar de Uber/99 com base na sua rotina.",
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
        title: "Uber ou Carro Próprio? Calculadora de Custos",
        description: "Faça as contas. Descubra se é mais barato manter um carro ou usar aplicativos de transporte como Uber e 99.",
        canonical: "/calculadoras/uber-ou-carro"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": UBER_VS_CAR_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-gray-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Uber ou Carro", href: "/calculadoras/uber-ou-carro" }
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
                /* @__PURE__ */ jsx(Smartphone, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Uber ou ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-gray-400", children: "Carro Próprio?" })
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
                "Comparar Custos"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor do Carro" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: carValue,
                          onChange: (e) => handleCurrencyInput(e.target.value, setCarValue),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Km Rodados (Mês)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: kmPerMonth,
                        onChange: (e) => setKmPerMonth(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "Ex: 500"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Preço Combustível" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: fuelPrice,
                        onChange: (e) => setFuelPrice(e.target.value.replace(",", ".")),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "5.50"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Consumo (km/L)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: consumption,
                        onChange: (e) => setConsumption(e.target.value.replace(",", ".")),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "10"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Preço Uber (por km)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: uberPricePerKm,
                        onChange: (e) => setUberPricePerKm(e.target.value.replace(",", ".")),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "2.50"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Seguro (Anual)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: insurance,
                          onChange: (e) => handleCurrencyInput(e.target.value, setInsurance),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Estacionamento (Mês)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: parking,
                          onChange: (e) => handleCurrencyInput(e.target.value, setParking),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-rose-400 block mb-2", children: "Opção Mais Econômica" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? result.bestOption === "car" ? "Carro Próprio" : "Uber / App" : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "car" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Custo Mensal Carro" }),
                      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white", children: result ? `R$ ${result.carMonthlyCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "uber" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Custo Mensal App" }),
                      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white", children: result ? `R$ ${result.uberMonthlyCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
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
                /* @__PURE__ */ jsx(Car, { className: "w-5 h-5 text-rose-500" }),
                "Custos Invisíveis"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Muitas pessoas só contam o combustível, mas o carro tem custos fixos altos:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Depreciação:" }),
                    " O carro perde cerca de 10% a 15% do valor todo ano."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Custo de Oportunidade:" }),
                    " Se você vendesse o carro e investisse o dinheiro, quanto renderia?"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Manutenção:" }),
                    " Pneus, revisões, óleo, imprevistos."
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Coloque na ponta do lápis. Compare os custos reais de manter um veículo versus usar apps." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: UBER_VS_CAR_FAQS,
          title: "Dúvidas sobre Transporte",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  UberVsCarPage
};
//# sourceMappingURL=UberVsCarPage-DdVIo-p6.js.map
