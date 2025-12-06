import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Home, Calculator, Building } from "lucide-react";
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
const REAL_ESTATE_FAQS = [
  {
    question: "Qual a diferença entre Tabela SAC e Price?",
    answer: "Na SAC (Sistema de Amortização Constante), as parcelas começam mais altas e diminuem ao longo do tempo. Na Price, as parcelas são fixas do início ao fim, mas você paga mais juros no total."
  },
  {
    question: "O que compõe a parcela do financiamento?",
    answer: "A parcela é composta por: Amortização (valor que abate a dívida) + Juros + Seguros (MIP e DFI) + Taxas Administrativas."
  },
  {
    question: "Vale a pena antecipar parcelas?",
    answer: "Sim! Ao antecipar, você abate o saldo devedor e deixa de pagar os juros sobre esse valor, reduzindo significativamente o custo total e o tempo da dívida."
  }
];
function RealEstateFinancingPage() {
  const [propertyValue, setPropertyValue] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [tableType, setTableType] = useState("SAC");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const pv = parseFloat(propertyValue.replace(/\./g, "").replace(",", "."));
    const dp = parseFloat(downPayment.replace(/\./g, "").replace(",", "."));
    const rateYear = parseFloat(interestRate.replace(",", "."));
    const periodYears = parseInt(years);
    if (isNaN(pv) || isNaN(dp) || isNaN(rateYear) || isNaN(periodYears) || periodYears === 0) {
      setResult(null);
      return;
    }
    const loanAmount = pv - dp;
    const months = periodYears * 12;
    const rateMonth = Math.pow(1 + rateYear / 100, 1 / 12) - 1;
    let totalInterest = 0;
    let firstInstallment = 0;
    let lastInstallment = 0;
    if (tableType === "SAC") {
      const amortization = loanAmount / months;
      firstInstallment = amortization + loanAmount * rateMonth;
      lastInstallment = amortization + amortization * rateMonth;
      const firstInterest = loanAmount * rateMonth;
      const lastInterest = amortization * rateMonth;
      const totalInterestSAC = (firstInterest + lastInterest) * months / 2;
      totalInterest = totalInterestSAC;
    } else {
      const pmt = loanAmount * (rateMonth * Math.pow(1 + rateMonth, months)) / (Math.pow(1 + rateMonth, months) - 1);
      firstInstallment = pmt;
      lastInstallment = pmt;
      totalInterest = pmt * months - loanAmount;
    }
    setResult({
      firstInstallment,
      lastInstallment,
      totalInterest,
      totalPaid: loanAmount + totalInterest
    });
  };
  useEffect(() => {
    calculate();
  }, [propertyValue, downPayment, interestRate, years, tableType]);
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
    "name": "Simulador de Financiamento Imobiliário",
    "description": "Compare tabelas SAC e Price e simule as parcelas do seu financiamento imobiliário.",
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
        title: "Simulador de Financiamento Imobiliário - SAC e Price",
        description: "Vai comprar um imóvel? Simule o valor das parcelas e compare as tabelas SAC e Price. Descubra qual a melhor opção para o seu bolso.",
        canonical: "/calculadoras/financiamento-imobiliario"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": REAL_ESTATE_FAQS.map((faq) => ({
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
          { label: "Financiamento Imobiliário", href: "/calculadoras/financiamento-imobiliario" }
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
                /* @__PURE__ */ jsx(Home, { className: "w-4 h-4 text-purple-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empréstimos e Financiamentos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Simulador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500", children: "Financiamento Imobiliário" })
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
                "Simular Financiamento"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
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
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Taxa de Juros Anual (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: interestRate,
                        onChange: (e) => handleNumberInput(e.target.value, setInterestRate),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 9,5"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Prazo (Anos)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: years,
                        onChange: (e) => handleNumberInput(e.target.value, setYears),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 30"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Sistema de Amortização" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setTableType("SAC"),
                        className: `py-3 rounded-xl text-sm font-medium transition-all border ${tableType === "SAC" ? "bg-purple-500/20 border-purple-500 text-purple-400" : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30"}`,
                        children: "SAC (Parcelas Decrescentes)"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setTableType("PRICE"),
                        className: `py-3 rounded-xl text-sm font-medium transition-all border ${tableType === "PRICE" ? "bg-purple-500/20 border-purple-500 text-purple-400" : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30"}`,
                        children: "Price (Parcelas Fixas)"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Primeira Parcela" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.firstInstallment.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Última Parcela" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.lastInstallment.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 block mb-1", children: "Total Pago em Juros" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `R$ ${result.totalInterest.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
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
                /* @__PURE__ */ jsx(Building, { className: "w-5 h-5 text-purple-500" }),
                "SAC ou Price?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Tabela SAC" }),
                  "Melhor para quem quer pagar menos juros no total. A parcela começa alta e vai caindo. Ideal para financiamentos longos."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Tabela Price" }),
                  "Melhor para quem precisa de uma parcela inicial menor para caber no orçamento. O valor é fixo, mas paga-se mais juros no final."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Compare SAC vs Price e planeje a compra da sua casa própria com segurança." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: REAL_ESTATE_FAQS,
          title: "Dúvidas sobre Financiamento",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  RealEstateFinancingPage
};
//# sourceMappingURL=RealEstateFinancingPage-Cijy8h46.js.map
