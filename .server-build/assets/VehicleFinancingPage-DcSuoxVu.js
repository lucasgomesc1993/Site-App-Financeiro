import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Car, Calculator, Key } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-C9Svc77H.js";
import { AppPromoBanner } from "./AppPromoBanner-BwQOrylZ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const VEHICLE_FAQS = [
  {
    question: "Qual a taxa média de juros para veículos?",
    answer: "As taxas variam muito conforme o banco, o score do cliente e a idade do veículo. Em média, giram em torno de 1,5% a 3% ao mês."
  },
  {
    question: "O que é TAC?",
    answer: "Taxa de Abertura de Crédito. É uma tarifa cobrada pelos bancos para iniciar o financiamento. Fique atento, pois ela encarece o custo final."
  },
  {
    question: "Carro zero tem juros menor?",
    answer: "Geralmente sim. Bancos e montadoras costumam oferecer taxas subsidiadas (às vezes até taxa zero) para veículos novos como incentivo de venda."
  }
];
function VehicleFinancingPage() {
  const [vehicleValue, setVehicleValue] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const vv = parseFloat(vehicleValue.replace(/\./g, "").replace(",", "."));
    const dp = parseFloat(downPayment.replace(/\./g, "").replace(",", "."));
    const rateMonth = parseFloat(interestRate.replace(",", "."));
    const periodMonths = parseInt(months);
    if (isNaN(vv) || isNaN(dp) || isNaN(rateMonth) || isNaN(periodMonths) || periodMonths === 0) {
      setResult(null);
      return;
    }
    const loanAmount = vv - dp;
    const i = rateMonth / 100;
    const pmt = loanAmount * (i * Math.pow(1 + i, periodMonths)) / (Math.pow(1 + i, periodMonths) - 1);
    const totalPaid = pmt * periodMonths;
    const totalInterest = totalPaid - loanAmount;
    setResult({
      monthlyPayment: pmt,
      totalInterest,
      totalPaid
    });
  };
  useEffect(() => {
    calculate();
  }, [vehicleValue, downPayment, interestRate, months]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const handleNumberInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Simulador de Financiamento de Veículos",
    "description": "Simule as parcelas do financiamento do seu carro ou moto.",
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
        title: "Simulador de Financiamento de Veículos - Carro e Moto",
        description: "Quer comprar um carro ou moto? Simule o valor das parcelas e veja quanto vai pagar de juros no financiamento.",
        canonical: "/calculadoras/financiamento-veiculos"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": VEHICLE_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Financiamento de Veículos", href: "/calculadoras/financiamento-veiculos" }
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
                /* @__PURE__ */ jsx(Car, { className: "w-4 h-4 text-purple-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empréstimos e Financiamentos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Simulador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500", children: "Financiamento de Veículos" })
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
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-purple-500" }),
                "Simular Parcelas"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor do Veículo" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: vehicleValue,
                          onChange: (e) => handleCurrencyInput(e.target.value, setVehicleValue),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor da Entrada" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: downPayment,
                          onChange: (e) => handleCurrencyInput(e.target.value, setDownPayment),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Taxa de Juros Mensal (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: interestRate,
                        onChange: (e) => handleNumberInput(e.target.value, setInterestRate),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 1,5"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Prazo (Meses)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: months,
                        onChange: (e) => handleNumberInput(e.target.value, setMonths),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 48"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-2xl border border-white/5 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 block mb-2", children: "Valor da Parcela Mensal" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.monthlyPayment.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 block mb-1", children: "Total em Juros" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalInterest.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Custo Total" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
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
                /* @__PURE__ */ jsx(Key, { className: "w-5 h-5 text-purple-500" }),
                "Dicas para Financiar"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dê a maior entrada possível" }),
                  "Quanto maior a entrada, menor o valor financiado e, consequentemente, menor o juro total pago."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Cuidado com o prazo" }),
                  "Parcelas longas (60x) parecem atraentes, mas fazem você pagar quase dois carros no final. Tente prazos menores (24x ou 36x)."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Planeje a compra do seu carro novo. Simule parcelas e juros reais." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: VEHICLE_FAQS,
          title: "Dúvidas sobre Financiamento de Veículos",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  VehicleFinancingPage
};
//# sourceMappingURL=VehicleFinancingPage-DcSuoxVu.js.map
