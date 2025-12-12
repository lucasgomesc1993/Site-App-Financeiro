import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { TrendingUp, Calculator, History, AlertCircle, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
const CORRECTION_FAQS = [
  {
    question: "Qual índice devo usar?",
    answer: "O IPCA é o índice oficial da inflação no Brasil, usado para corrigir salários e contratos de aluguel residenciais recentes. O IGP-M é comum em contratos de aluguel antigos e reajustes de tarifas públicas. A Poupança (TR) é usada para correção de depósitos judiciais e financiamentos imobiliários antigos."
  },
  {
    question: "Como funciona a correção monetária?",
    answer: "A correção monetária não é um ganho real, mas sim uma atualização do valor do dinheiro no tempo para que ele não perca poder de compra devido à inflação. R$ 100 hoje compram menos que R$ 100 há um ano."
  },
  {
    question: "O que é correção pro-rata die?",
    answer: "É a correção proporcional aos dias. Se um índice mensal é 1%, mas você quer corrigir apenas por 15 dias, aplica-se a taxa proporcional àquele período, não o mês cheio."
  }
];
function MonetaryCorrectionPage() {
  const [initialValue, setInitialValue] = useState("");
  const [indexRate, setIndexRate] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const principal = parseFloat(initialValue.replace(/\./g, "").replace(",", ".") || "0");
    const rate = parseFloat(indexRate.replace(/\./g, "").replace(",", ".") || "0");
    if (principal === 0) {
      setResult(null);
      return;
    }
    const correctionFactor = 1 + rate / 100;
    const finalValue = principal * correctionFactor;
    setResult({
      finalValue,
      difference: finalValue - principal
    });
  };
  useEffect(() => {
    calculate();
  }, [initialValue, indexRate]);
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
    "name": "Calculadora de Correção Monetária",
    "description": "Atualize valores pela inflação (IPCA, IGP-M). Calcule quanto seu dinheiro deveria valer hoje.",
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
        title: "Calculadora de Correção Monetária (IPCA, IGP-M)",
        description: "Atualize dívidas, aluguéis ou contratos. Simule a correção de valores por índices de inflação de forma simples.",
        canonical: "/calculadoras/correcao-monetaria"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CORRECTION_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Correção Monetária", href: "/calculadoras/correcao-monetaria" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-emerald-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500", children: "Correção Monetária" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Descubra o valor atualizado de uma quantia antiga. Proteja seu patrimônio da erosão da inflação." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
            "Calcular Correção"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Original" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: initialValue,
                    onChange: (e) => handleCurrencyInput(e.target.value, setInitialValue),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                    placeholder: "0,00"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Índice Acumulado no Período (%)" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: indexRate,
                    onChange: (e) => {
                      const val = e.target.value.replace(/[^0-9,.]/g, "");
                      setIndexRate(val);
                    },
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                    placeholder: "Ex: 5,45"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-500", children: "%" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Consulte o acumulado do IPCA ou IGP-M para o período desejado (ex: últimos 12 meses)." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Valor Atualizado" }),
              /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.finalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
              result && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mt-2", children: [
                "Correção: + R$ ",
                result.difference.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
              ] })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(History, { className: "w-5 h-5 text-emerald-500" }),
              "Principais Índices"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white/5 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white", children: "IPCA" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded", children: "Oficial" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Índice de Preços ao Consumidor Amplo. Mede a inflação oficial do país." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white/5 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white", children: "IGP-M" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded", children: "Aluguéis" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Índice Geral de Preços do Mercado. Muito influenciado pelo dólar." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white/5 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white", children: "INPC" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded", children: "Salários" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Índice Nacional de Preços ao Consumidor. Foca em famílias de menor renda." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-emerald-200", children: "Não perdeu, mas não ganhou" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-emerald-200/70", children: [
                "Corrigir um valor pela inflação apenas mantém seu poder de compra. Para ganhar dinheiro, você precisa de um investimento que pague ",
                /* @__PURE__ */ jsx("strong", { children: "Acima da Inflação" }),
                " (Juro Real)."
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-teal-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Coins, { className: "w-6 h-6 text-teal-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como calcular juros reais?" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Se seu investimento rendeu 10% e a inflação foi 5%, você não ganhou 5%. O cálculo correto é:" }),
        /* @__PURE__ */ jsx("div", { className: "bg-black/40 p-4 rounded-xl font-mono text-emerald-400 text-sm md:text-base border border-white/10 text-center", children: "(1 + Rendimento) ÷ (1 + Inflação) - 1" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mt-6", children: [
          "Para simulações de rentabilidade real e crescimento de patrimônio, utilize nossa ",
          /* @__PURE__ */ jsx(Link, { to: "/calculadoras/juros-compostos", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de Juros Compostos" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: CORRECTION_FAQS,
          title: "Perguntas Frequentes",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  MonetaryCorrectionPage
};
//# sourceMappingURL=MonetaryCorrectionPage-C8_rMXS7.js.map
