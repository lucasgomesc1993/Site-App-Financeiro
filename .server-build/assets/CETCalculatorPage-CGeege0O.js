import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FileText, Calculator, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-rtQ6fcXm.js";
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
const CET_FAQS = [
  {
    question: "O que é CET?",
    answer: "CET significa Custo Efetivo Total. É a taxa real que você paga em um empréstimo, somando os juros, tarifas, seguros e impostos (IOF)."
  },
  {
    question: "Por que o CET é maior que a taxa de juros?",
    answer: "Porque a taxa de juros é apenas uma parte do custo. O banco também cobra taxas administrativas e seguros que encarecem a parcela final."
  },
  {
    question: "Como usar o CET para comparar empréstimos?",
    answer: "Sempre compare o CET anual, e não a taxa de juros. A opção com menor CET é a mais barata, mesmo que a taxa de juros pareça maior."
  }
];
function CETCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const pv = parseFloat(loanAmount.replace(/\./g, "").replace(",", "."));
    const pmt = parseFloat(monthlyPayment.replace(/\./g, "").replace(",", "."));
    const n = parseInt(months);
    if (isNaN(pv) || isNaN(pmt) || isNaN(n) || n === 0 || pv === 0) {
      setResult(null);
      return;
    }
    let r = 0.01;
    for (let i = 0; i < 20; i++) {
      const f = pmt / r * (1 - Math.pow(1 + r, -n)) - pv;
      const df = pmt / r * (n * Math.pow(1 + r, -n - 1)) - pmt / (r * r) * (1 - Math.pow(1 + r, -n));
      const newR = r - f / df;
      if (Math.abs(newR - r) < 1e-6) {
        r = newR;
        break;
      }
      r = newR;
    }
    const monthlyRate = r * 100;
    const annualRate = (Math.pow(1 + r, 12) - 1) * 100;
    const totalPaid = pmt * n;
    setResult({
      monthlyRate,
      annualRate,
      totalPaid
    });
  };
  useEffect(() => {
    calculate();
  }, [loanAmount, monthlyPayment, months]);
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
    "name": "Calculadora de CET (Custo Efetivo Total)",
    "description": "Descubra a taxa real de juros do seu empréstimo ou financiamento calculando o CET.",
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
        title: "Calculadora de CET - Custo Efetivo Total Online",
        description: "Não seja enganado pelos juros. Calcule o Custo Efetivo Total (CET) do seu empréstimo e descubra quanto você realmente vai pagar.",
        canonical: "/calculadoras/custo-efetivo-total"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CET_FAQS.map((faq) => ({
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
          { label: "Custo Efetivo Total (CET)", href: "/calculadoras/custo-efetivo-total" }
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
                /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-purple-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empréstimos e Financiamentos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500", children: "CET" })
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
                "Calcular Custo Real"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Recebido (Líquido)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: loanAmount,
                        onChange: (e) => handleCurrencyInput(e.target.value, setLoanAmount),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Valor que realmente caiu na sua conta." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor da Parcela" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: monthlyPayment,
                          onChange: (e) => handleCurrencyInput(e.target.value, setMonthlyPayment),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
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
                        placeholder: "Ex: 24"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 block mb-1", children: "CET Mensal" }),
                      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `${result.monthlyRate.toFixed(2)}%` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 block mb-1", children: "CET Anual" }),
                      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `${result.annualRate.toFixed(2)}%` : "---" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total a Pagar" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center", children: /* @__PURE__ */ jsx("p", { children: "Descubra a taxa real do seu empréstimo. O CET revela o custo oculto além dos juros." }) }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-purple-500" }),
                "Atenção às Taxas"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Muitas vezes o banco anuncia uma taxa de juros de 1,99% a.m., mas quando você calcula o CET, ele salta para 2,50% ou mais." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "O que encarece?" }),
                  "Seguro Prestamista, Tarifa de Cadastro (TAC), IOF e Taxas de Avaliação. Tudo isso entra no cálculo do CET."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: CET_FAQS,
          title: "Dúvidas sobre CET",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  CETCalculatorPage
};
//# sourceMappingURL=CETCalculatorPage-CGeege0O.js.map
