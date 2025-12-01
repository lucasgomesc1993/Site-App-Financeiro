import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Calendar, Percent, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { AppPromoBanner } from "./AppPromoBanner-CdIlkx8T.js";
import { S as SEO, F as FAQ } from "../entry-server.js";
import { B as Breadcrumb } from "./Breadcrumb-DwwVT1FI.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "@google/genai";
const InvestmentSimulator = () => {
  const [initialAmount, setInitialAmount] = useState(1e3);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(10.5);
  const [type, setType] = useState("cdb");
  const [result, setResult] = useState({
    totalInvested: 0,
    totalInterest: 0,
    grossTotal: 0,
    taxAmount: 0,
    netTotal: 0
  });
  useEffect(() => {
    calculateResults();
  }, [initialAmount, monthlyContribution, years, rate, type]);
  const calculateResults = () => {
    const months = years * 12;
    const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;
    let futureValueInitial = initialAmount * Math.pow(1 + monthlyRate, months);
    let futureValueMonthly = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const grossTotal = futureValueInitial + futureValueMonthly;
    const totalInvested = initialAmount + monthlyContribution * months;
    const totalInterest = grossTotal - totalInvested;
    let taxRate = 0;
    if (type === "cdb" || type === "tesouro" || type === "debentures") {
      const days = years * 365;
      if (days <= 180) taxRate = 0.225;
      else if (days <= 360) taxRate = 0.2;
      else if (days <= 720) taxRate = 0.175;
      else taxRate = 0.15;
    }
    const taxAmount = totalInterest * taxRate;
    const netTotal = grossTotal - taxAmount;
    setResult({
      totalInvested,
      totalInterest,
      grossTotal,
      taxAmount,
      netTotal
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
        "Parâmetros"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "investment-type", className: "block text-sm text-gray-400 mb-2", children: "Tipo de Investimento" }),
          /* @__PURE__ */ jsx("div", { id: "investment-type", className: "grid grid-cols-2 gap-2", children: ["cdb", "lci", "tesouro", "debentures"].map((t) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setType(t),
              className: `py-2 px-3 rounded-xl text-sm font-medium transition-all ${type === t ? "bg-primary text-black shadow-[0_0_15px_rgba(71,255,183,0.3)]" : "bg-white/5 text-gray-400 hover:bg-white/10"}`,
              children: t === "cdb" ? "CDB" : t === "lci" ? "LCI/LCA" : t === "tesouro" ? "Tesouro" : "Debêntures"
            },
            t
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "initial-amount", className: "block text-sm text-gray-400 mb-2", children: "Investimento Inicial" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "initial-amount",
                "aria-label": "Investimento Inicial",
                type: "number",
                value: initialAmount,
                onChange: (e) => setInitialAmount(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "monthly-contribution", className: "block text-sm text-gray-400 mb-2", children: "Aporte Mensal" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "monthly-contribution",
                "aria-label": "Aporte Mensal",
                type: "number",
                value: monthlyContribution,
                onChange: (e) => setMonthlyContribution(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "years", className: "block text-sm text-gray-400 mb-2", children: "Prazo (Anos)" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "years",
                  "aria-label": "Prazo (Anos)",
                  type: "number",
                  value: years,
                  onChange: (e) => setYears(Number(e.target.value)),
                  className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "rate", className: "block text-sm text-gray-400 mb-2", children: "Taxa Anual (%)" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Percent, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "rate",
                  "aria-label": "Taxa Anual (%)",
                  type: "number",
                  value: rate,
                  onChange: (e) => setRate(Number(e.target.value)),
                  className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-1", children: "Total Investido" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white", children: formatCurrency(result.totalInvested) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-1", children: "Rendimento Bruto" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-primary", children: formatCurrency(result.totalInterest) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-medium text-gray-300 mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-primary" }),
            "Resultado Final"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Valor Bruto Total" }),
              /* @__PURE__ */ jsx("span", { className: "text-xl font-medium text-white", children: formatCurrency(result.grossTotal) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
                "Imposto de Renda",
                type === "lci" ? /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full", children: "Isento" }) : ""
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-xl font-medium text-red-400", children: [
                "-",
                formatCurrency(result.taxAmount)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 mt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-medium", children: "Valor Líquido" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: formatCurrency(result.netTotal) })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-right text-xs text-gray-500 mt-2", children: "*Estimativa baseada na taxa constante. Não é garantia de rentabilidade." })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
};
const INVESTMENT_FAQS = [
  {
    question: "Qual é o melhor simulador de investimentos?",
    answer: "O melhor simulador de investimentos é o do FinZap, pois ele fornece as principais informações sobre sua aplicação, como: Resultado bruto e líquido, Valor pago em imposto, Valor do rendimento recebido e muito mais! Além disso, é possível fazer várias simulações de forma 100% gratuita."
  },
  {
    question: "O que é um Certificado de Depósito Bancário (CDB)?",
    answer: "CDB (Certificado de Depósito Bancário) é quando você 'empresta' dinheiro para o banco e ele te devolve com juros. É um dos investimentos mais populares do Brasil, rendendo mais que a poupança e com a mesma segurança (garantido pelo FGC)."
  },
  {
    question: "O que é uma Letra de Crédito Imobiliário (LCI)?",
    answer: "LCI (Letra de Crédito Imobiliário) é um investimento onde seu dinheiro financia o setor imobiliário. A grande vantagem? É 100% isento de Imposto de Renda para pessoa física e também tem a proteção do FGC."
  },
  {
    question: "O que é uma Letra de Crédito do Agronegócio (LCA)?",
    answer: "LCA (Letra de Crédito do Agronegócio) funciona igual à LCI, mas o dinheiro vai para o setor agropecuário. Também é isenta de Imposto de Renda e garantida pelo FGC. É uma ótima opção para diversificar sua carteira."
  },
  {
    question: "Qual a diferença entre LCI e LCA?",
    answer: "A principal diferença está no destino dos recursos. Na LCI, o dinheiro é usado para financiamentos imobiliários, enquanto na LCA, é destinado ao agronegócio. Ambas possuem isenção de IR e garantia do FGC."
  },
  {
    question: "Para que serve um simulador de investimentos online?",
    answer: "Para te dar clareza. Com ele, você projeta exatamente quanto seu dinheiro vai render, compara diferentes opções (como CDB vs LCI) e entende o impacto dos impostos e do tempo nos seus ganhos. É a ferramenta essencial para planejar suas metas."
  }
];
const InvestmentPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Simulador de Investimentos FinZap",
    "description": "Compare CDB, LCI, LCA e Tesouro Direto. Calcule o rendimento dos seus investimentos.",
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
        title: "Simulador de Investimentos - Renda Fixa",
        description: "Compare CDB, LCI, LCA e Tesouro Direto. Calcule o rendimento dos seus investimentos com nosso simulador gratuito.",
        canonical: "/calculadoras/investimentos"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": INVESTMENT_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Simulador de Investimentos", href: "/calculadoras/investimentos" }
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
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Renda Fixa" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Simulador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Investimentos" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Calcule o retorno de suas aplicações em Renda Fixa (CDB, LCI, LCA e Tesouro Direto) e descubra o poder dos juros compostos." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          children: /* @__PURE__ */ jsx(InvestmentSimulator, {})
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.8, delay: 0.4 },
          className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg",
          children: [
            /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Simulador de Investimentos: Calcule seus rendimentos" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Quer saber quanto seu dinheiro vai render? Utilize o Simulador de Investimentos do FinZap para projetar seus ganhos em aplicações de Renda Fixa como CDB, LCI, LCA e Tesouro Direto." }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Como funciona o simulador de investimentos gratuito?" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Esta calculadora de investimentos foi desenvolvida para comparação de diferentes tipos de títulos de renda fixa. O simulador de investimento calcula de forma simples e descomplicada qual será o retorno do seu dinheiro após uma aplicação a uma determinada taxa e período." }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Ademais, o cálculo leva em conta possíveis aportes durante o tempo (investimento mensal), além do valor inicialmente aplicado. Com este simulador, será possível saber quanto conseguirá acumular no final de uma determinada quantidade de meses investindo seu dinheiro na aplicação de sua escolha." }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Contudo, é importante lembrar que o tipo de investimento escolhido é importante, porque existem títulos com tributação diferente. Dessa forma, o Simulador de Investimentos vai poder entregar o retorno líquido (já descontado o imposto) mais exato." }),
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-3", children: "Tipos de Rentabilidade" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-gray-400 mb-8", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Prefixada:" }),
                  " o rendimento já é conhecido na data da aplicação e não varia no decorrer do tempo;"
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Pós-fixada:" }),
                  " o retorno varia de acordo com um índice de referência, como o CDI; e"
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white", children: "IPCA (híbrida):" }),
                  " o rendimento é a variação da inflação mais uma taxa prefixada."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "O que é o rendimento real nos investimentos?" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "O rendimento real nos investimentos é a taxa de retorno obtida após a dedução da inflação. É um indicador importante porque leva em consideração o impacto da inflação no poder de compra do investidor." }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 mb-8", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-4", children: "Por que considerar o rendimento real?" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0", children: "1" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Preservação do poder de compra:" }),
                      " reflete o quanto seu dinheiro realmente cresce após descontar a inflação."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0", children: "2" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Comparação precisa:" }),
                      " permite comparar diferentes opções levando em conta o efeito da inflação."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0", children: "3" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Metas financeiras:" }),
                      " ajuda a estabelecer metas realistas para o futuro."
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-6", children: "Entenda os tipos de investimento" }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2 text-primary", children: "Tesouro Direto" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Programa do Tesouro Nacional para venda de títulos públicos. Considerado o investimento mais seguro do país." }),
                  /* @__PURE__ */ jsxs("ul", { className: "text-xs text-gray-300 space-y-1", children: [
                    /* @__PURE__ */ jsx("li", { children: "• Tesouro Selic (Liquidez diária)" }),
                    /* @__PURE__ */ jsx("li", { children: "• Tesouro IPCA+ (Proteção contra inflação)" }),
                    /* @__PURE__ */ jsx("li", { children: "• Tesouro Prefixado (Rentabilidade fixa)" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2 text-primary", children: "CDB" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Certificado de Depósito Bancário. Você empresta dinheiro para o banco em troca de juros." }),
                  /* @__PURE__ */ jsxs("ul", { className: "text-xs text-gray-300 space-y-1", children: [
                    /* @__PURE__ */ jsx("li", { children: "• Garantia do FGC" }),
                    /* @__PURE__ */ jsx("li", { children: "• Rentabilidade geralmente atrelada ao CDI" }),
                    /* @__PURE__ */ jsx("li", { children: "• Opções com liquidez diária" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2 text-emerald-400", children: "LCI e LCA" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Letras de Crédito Imobiliário e do Agronegócio. Isentas de Imposto de Renda para pessoa física." }),
                  /* @__PURE__ */ jsxs("ul", { className: "text-xs text-gray-300 space-y-1", children: [
                    /* @__PURE__ */ jsx("li", { children: "• Isenção de IR" }),
                    /* @__PURE__ */ jsx("li", { children: "• Garantia do FGC" }),
                    /* @__PURE__ */ jsx("li", { children: "• Foco em setores específicos (Imóveis/Agro)" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2 text-primary", children: "Debêntures" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Títulos de dívida emitidos por empresas. Geralmente oferecem retornos maiores que títulos bancários." }),
                  /* @__PURE__ */ jsxs("ul", { className: "text-xs text-gray-300 space-y-1", children: [
                    /* @__PURE__ */ jsx("li", { children: "• Risco de crédito da empresa" }),
                    /* @__PURE__ */ jsx("li", { children: "• Prazos geralmente mais longos" }),
                    /* @__PURE__ */ jsx("li", { children: "• Algumas são isentas de IR (Incentivadas)" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              FAQ,
              {
                items: INVESTMENT_FAQS,
                title: "Dúvidas Frequentes sobre Investimentos",
                className: "py-12",
                showSocialProof: false
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
};
export {
  InvestmentPage
};
