import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { TrendingUp, Calculator, DollarSign } from "lucide-react";
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
const MARKUP_FAQS = [
  {
    question: "O que é Markup?",
    answer: "É um índice multiplicador aplicado sobre o custo de um produto para formar o preço de venda. Ele deve cobrir os custos fixos, variáveis e garantir a margem de lucro desejada."
  },
  {
    question: "Markup é o mesmo que Margem?",
    answer: "Não! Markup é o índice aplicado SOBRE o custo. Margem é a porcentagem de lucro DENTRO do preço de venda. Um Markup de 100% gera uma Margem de 50%."
  },
  {
    question: "Como calcular?",
    answer: "A fórmula básica é: Preço de Venda = Custo / (1 - (Despesas Variáveis + Despesas Fixas + Lucro Desejado))."
  }
];
function MarkupPage() {
  const [cost, setCost] = useState("");
  const [fixedExpenses, setFixedExpenses] = useState("");
  const [variableExpenses, setVariableExpenses] = useState("");
  const [profitMargin, setProfitMargin] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const c = parseFloat(cost.replace(/\./g, "").replace(",", ".") || "0");
    const fe = parseFloat(fixedExpenses.replace(",", ".") || "0");
    const ve = parseFloat(variableExpenses.replace(",", ".") || "0");
    const pm = parseFloat(profitMargin.replace(",", ".") || "0");
    if (c === 0) {
      setResult(null);
      return;
    }
    const totalPercentages = fe + ve + pm;
    if (totalPercentages >= 100) {
      setResult(null);
      return;
    }
    const divisor = 1 - totalPercentages / 100;
    const sellingPrice = c / divisor;
    const markup = (sellingPrice - c) / c * 100;
    setResult({
      sellingPrice,
      markup
    });
  };
  useEffect(() => {
    calculate();
  }, [cost, fixedExpenses, variableExpenses, profitMargin]);
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
    "name": "Calculadora de Markup",
    "description": "Calcule o preço de venda ideal dos seus produtos usando o método de Markup.",
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
        title: "Calculadora de Markup - Formação de Preço de Venda",
        description: "Não tenha prejuízo! Calcule o preço de venda correto dos seus produtos considerando custos, impostos e margem de lucro.",
        canonical: "/calculadoras/markup"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": MARKUP_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Markup", href: "/calculadoras/markup" }
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
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-amber-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empresariais" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500", children: "Markup" })
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
                "Calcular Preço"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Custo do Produto (Unitário)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: cost,
                        onChange: (e) => handleCurrencyInput(e.target.value, setCost),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Despesas Fixas (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: fixedExpenses,
                        onChange: (e) => setFixedExpenses(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "Ex: 15"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Despesas Var. (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: variableExpenses,
                        onChange: (e) => setVariableExpenses(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "Ex: 10"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Lucro Desejado (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: profitMargin,
                        onChange: (e) => setProfitMargin(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "Ex: 20"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-amber-400 block mb-2", children: "Preço de Venda Sugerido" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.sellingPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Markup Multiplicador" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `${result.markup.toFixed(2)}%` : "---" })
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
                /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-amber-500" }),
                "Entenda os Custos"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Despesas Fixas:" }),
                    " Aluguel, salários, internet (rateados por produto)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Despesas Variáveis:" }),
                    " Impostos sobre venda, comissões, taxas de cartão."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Lucro:" }),
                    " O que sobra limpo para a empresa reinvestir ou distribuir."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Atenção" }),
                  "Se a soma das porcentagens for próxima de 100%, o preço de venda tenderá ao infinito. Revise seus custos!"
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Precifique seus produtos com segurança. Garanta que todos os custos sejam cobertos e o lucro seja real." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: MARKUP_FAQS,
          title: "Dúvidas sobre Precificação",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  MarkupPage
};
//# sourceMappingURL=MarkupPage-CJRNymMZ.js.map
