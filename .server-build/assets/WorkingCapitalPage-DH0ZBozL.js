import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Wallet, Calculator, RefreshCw } from "lucide-react";
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
const WORKING_CAPITAL_FAQS = [
  {
    question: "O que é Capital de Giro?",
    answer: "É o dinheiro necessário para manter a empresa funcionando enquanto você não recebe das vendas a prazo. Ele cobre estoques, contas a pagar e custos operacionais."
  },
  {
    question: "Como calcular?",
    answer: "A fórmula básica é: Ativo Circulante (dinheiro em caixa + contas a receber + estoque) - Passivo Circulante (contas a pagar + empréstimos curto prazo)."
  },
  {
    question: "Por que ele é importante?",
    answer: "A falta de capital de giro é a principal causa de falência de pequenas empresas. É ele que garante a saúde financeira nos meses de baixa venda ou atraso de clientes."
  }
];
function WorkingCapitalPage() {
  const [currentAssets, setCurrentAssets] = useState("");
  const [currentLiabilities, setCurrentLiabilities] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const assets = parseFloat(currentAssets.replace(/\./g, "").replace(",", ".") || "0");
    const liabilities = parseFloat(currentLiabilities.replace(/\./g, "").replace(",", ".") || "0");
    if (assets === 0 && liabilities === 0) {
      setResult(null);
      return;
    }
    const workingCapital = assets - liabilities;
    const ratio = liabilities > 0 ? assets / liabilities : 0;
    setResult({
      workingCapital,
      ratio
    });
  };
  useEffect(() => {
    calculate();
  }, [currentAssets, currentLiabilities]);
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
    "name": "Calculadora de Capital de Giro",
    "description": "Calcule a necessidade de capital de giro da sua empresa e avalie sua saúde financeira.",
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
        title: "Calculadora de Capital de Giro Líquido",
        description: "Sua empresa tem dinheiro para rodar? Calcule o Capital de Giro Líquido e o Índice de Liquidez Corrente.",
        canonical: "/calculadoras/capital-de-giro"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": WORKING_CAPITAL_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Capital de Giro", href: "/calculadoras/capital-de-giro" }
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
                /* @__PURE__ */ jsx(Wallet, { className: "w-4 h-4 text-amber-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empresariais" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-green-500", children: "Capital de Giro" })
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
                "Calcular Liquidez"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Ativo Circulante" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: currentAssets,
                        onChange: (e) => handleCurrencyInput(e.target.value, setCurrentAssets),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "Caixa + Estoque + Recebíveis"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Soma de dinheiro em caixa, bancos, estoques e contas a receber no curto prazo." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Passivo Circulante" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: currentLiabilities,
                        onChange: (e) => handleCurrencyInput(e.target.value, setCurrentLiabilities),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "Contas a Pagar + Empréstimos"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Soma de fornecedores, impostos, salários e empréstimos a pagar no curto prazo." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-amber-400 block mb-2", children: "Capital de Giro Líquido" }),
                    /* @__PURE__ */ jsx("span", { className: `text-4xl font-bold ${result && result.workingCapital < 0 ? "text-red-400" : "text-white"}`, children: result ? `R$ ${result.workingCapital.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Índice de Liquidez Corrente" }),
                    /* @__PURE__ */ jsx("span", { className: `text-xl font-bold ${result && result.ratio < 1 ? "text-red-400" : "text-white"}`, children: result ? result.ratio.toFixed(2) : "---" })
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
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 text-amber-500" }),
                "Interpretação"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4 text-sm text-gray-400", children: /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Positivo:" }),
                  " Sua empresa tem recursos suficientes para pagar as dívidas de curto prazo."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Negativo:" }),
                  " Alerta vermelho! Você deve mais do que tem disponível no curto prazo."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsxs("strong", { children: [
                    "Liquidez ",
                    ">",
                    " 1:"
                  ] }),
                  " Saudável. Para cada R$ 1 de dívida, você tem mais de R$ 1 de ativo."
                ] })
              ] }) })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Monitore a saúde do seu caixa. Garanta recursos para operar com tranquilidade." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: WORKING_CAPITAL_FAQS,
          title: "Dúvidas sobre Capital de Giro",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  WorkingCapitalPage
};
//# sourceMappingURL=WorkingCapitalPage-DH0ZBozL.js.map
