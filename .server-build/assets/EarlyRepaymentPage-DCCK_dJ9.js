import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { PiggyBank, Calculator, TrendingDown } from "lucide-react";
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
const REPAYMENT_FAQS = [
  {
    question: "O banco é obrigado a dar desconto?",
    answer: "Sim! Pelo Código de Defesa do Consumidor, ao antecipar parcelas, você tem direito ao abatimento proporcional dos juros."
  },
  {
    question: "Como funciona a antecipação?",
    answer: "Você paga o valor presente da dívida. Ou seja, trazemos o valor da parcela futura para o dia de hoje, descontando a taxa de juros do período."
  },
  {
    question: "É melhor antecipar as primeiras ou as últimas?",
    answer: "Financeiramente, antecipar as últimas é mais vantajoso, pois elas têm mais juros embutidos devido ao tempo maior até o vencimento."
  }
];
function EarlyRepaymentPage() {
  const [installmentValue, setInstallmentValue] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthsAnticipated, setMonthsAnticipated] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const val = parseFloat(installmentValue.replace(/\./g, "").replace(",", "."));
    const rate = parseFloat(interestRate.replace(",", "."));
    const months = parseInt(monthsAnticipated);
    if (isNaN(val) || isNaN(rate) || isNaN(months) || months === 0) {
      setResult(null);
      return;
    }
    const i = rate / 100;
    const presentValue = val / Math.pow(1 + i, months);
    setResult({
      discount: val - presentValue,
      finalValue: presentValue
    });
  };
  useEffect(() => {
    calculate();
  }, [installmentValue, interestRate, monthsAnticipated]);
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
    "name": "Calculadora de Quitação Antecipada",
    "description": "Calcule o desconto ao antecipar parcelas de empréstimos ou financiamentos.",
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
        title: "Calculadora de Desconto por Antecipação - Quitação de Dívida",
        description: "Vai adiantar parcelas do financiamento? Calcule o desconto exato que você deve receber ao quitar sua dívida antecipadamente.",
        canonical: "/calculadoras/quitacao-antecipada"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": REPAYMENT_FAQS.map((faq) => ({
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
          { label: "Quitação Antecipada", href: "/calculadoras/quitacao-antecipada" }
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
                /* @__PURE__ */ jsx(PiggyBank, { className: "w-4 h-4 text-purple-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empréstimos e Financiamentos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500", children: "Quitação Antecipada" })
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
                "Calcular Desconto"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor da Parcela" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: installmentValue,
                        onChange: (e) => handleCurrencyInput(e.target.value, setInstallmentValue),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
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
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Meses a Antecipar" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: monthsAnticipated,
                        onChange: (e) => handleNumberInput(e.target.value, setMonthsAnticipated),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 12"
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Quantos meses faltam para o vencimento desta parcela?" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 block mb-1", children: "Desconto Obtido" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `R$ ${result.discount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Valor a Pagar" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `R$ ${result.finalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] })
                ] }) })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center", children: /* @__PURE__ */ jsx("p", { children: "Descubra quanto você economiza ao adiantar o pagamento de parcelas do seu financiamento." }) }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(TrendingDown, { className: "w-5 h-5 text-purple-500" }),
                "Por que antecipar?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Quando você antecipa uma parcela, você está pagando ela hoje, e não no futuro. Por isso, o banco deve remover os juros que seriam cobrados durante esse tempo." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Exemplo Prático" }),
                  "Se você tem uma parcela de R$1.000 para daqui a 1 ano e a taxa é 1% ao mês, ao pagar hoje você pagaria cerca de R$887. Uma economia de R$113!"
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: REPAYMENT_FAQS,
          title: "Dúvidas sobre Antecipação",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  EarlyRepaymentPage
};
//# sourceMappingURL=EarlyRepaymentPage-DCCK_dJ9.js.map
