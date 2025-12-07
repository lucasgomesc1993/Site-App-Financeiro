import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { History, Calculator, Info, TrendingDown, AlertCircle, Shield, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-2hmnhBZO.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const INFLATION_DATA = [
  { year: 1994, ipca: 47.43, igpm: 27.24 },
  // July-Dec (Plano Real start approx) - simplified for annual context or partial
  { year: 1995, ipca: 22.41, igpm: 15.25 },
  { year: 1996, ipca: 9.56, igpm: 9.2 },
  { year: 1997, ipca: 5.22, igpm: 7.48 },
  { year: 1998, ipca: 1.65, igpm: 1.78 },
  { year: 1999, ipca: 8.94, igpm: 20.1 },
  { year: 2e3, ipca: 5.97, igpm: 9.95 },
  { year: 2001, ipca: 7.67, igpm: 10.37 },
  { year: 2002, ipca: 12.53, igpm: 25.31 },
  { year: 2003, ipca: 9.3, igpm: 8.71 },
  { year: 2004, ipca: 7.6, igpm: 12.41 },
  { year: 2005, ipca: 5.69, igpm: 1.2 },
  { year: 2006, ipca: 3.14, igpm: 3.83 },
  { year: 2007, ipca: 4.46, igpm: 7.75 },
  { year: 2008, ipca: 5.9, igpm: 9.81 },
  { year: 2009, ipca: 4.31, igpm: -1.72 },
  { year: 2010, ipca: 5.91, igpm: 11.32 },
  { year: 2011, ipca: 6.5, igpm: 5.1 },
  { year: 2012, ipca: 5.84, igpm: 7.82 },
  { year: 2013, ipca: 5.91, igpm: 5.51 },
  { year: 2014, ipca: 6.41, igpm: 3.69 },
  { year: 2015, ipca: 10.67, igpm: 10.54 },
  { year: 2016, ipca: 6.29, igpm: 7.17 },
  { year: 2017, ipca: 2.95, igpm: -0.52 },
  { year: 2018, ipca: 3.75, igpm: 7.54 },
  { year: 2019, ipca: 4.31, igpm: 7.3 },
  { year: 2020, ipca: 4.52, igpm: 23.14 },
  { year: 2021, ipca: 10.06, igpm: 17.78 },
  { year: 2022, ipca: 5.79, igpm: 5.45 },
  { year: 2023, ipca: 4.62, igpm: -3.18 },
  { year: 2024, ipca: 4.62, igpm: 6.54 },
  // Estimated/Partial
  { year: 2025, ipca: 4.68, igpm: -1.03 }
  // Estimated/Partial
];
const INFLATION_FAQS = [
  {
    question: "Qual é a diferença entre ganho nominal e ganho real?",
    answer: "O ganho nominal é o valor bruto que você recebe a mais. Por exemplo, se seu salário subiu de R$ 2.000 para R$ 2.200, seu ganho nominal foi de 10%. O ganho real é esse aumento descontada a inflação. Se a inflação no período foi de 9%, seu ganho real (aumento de poder de compra) foi de apenas aprox. 1%."
  },
  {
    question: "Qual índice devo usar: IPCA ou IGP-M?",
    answer: "Depende do objetivo. O IPCA é o índice oficial de inflação do consumidor (ideal para salários e compras do dia a dia). O IGP-M é mais usado para reajustes de aluguéis e tarifas públicas, sendo historicamente mais volátil."
  },
  {
    question: "Como calcular a inflação acumulada manualmente?",
    answer: "Não basta somar as porcentagens mensais. O cálculo é feito por juros compostos: multiplicam-se os fatores de cada mês. Exemplo: Para dois meses de 1% (fator 1,01), a conta é 1,01 x 1,01 = 1,0201, ou seja, 2,01% acumulado, e não 2,00%."
  },
  {
    question: "A poupança protege meu poder de compra?",
    answer: "Historicamente, muitas vezes não. Em diversos anos, o rendimento da poupança ficou abaixo da inflação (IPCA), o que significa que o dinheiro aplicado perdeu valor real de compra, mesmo que o saldo numérico tenha aumentado."
  },
  {
    question: "O dólar afeta meu poder de compra no Brasil?",
    answer: "Sim. Muitos produtos consumidos no Brasil (trigo, eletrônicos, combustíveis) têm preços atrelados ao dólar. Quando o real se desvaloriza frente ao dólar, a inflação interna tende a subir, reduzindo seu poder de compra. Você pode verificar essa relação em nossa ferramenta de conversor de moedas."
  }
];
function PurchasingPowerPage() {
  const [amount, setAmount] = useState("");
  const [startYear, setStartYear] = useState("2000");
  const [endYear, setEndYear] = useState((/* @__PURE__ */ new Date()).getFullYear().toString());
  const [result, setResult] = useState(null);
  const calculate = () => {
    const val = parseFloat(amount.replace(/\./g, "").replace(",", "."));
    const start = parseInt(startYear);
    const end = parseInt(endYear);
    if (isNaN(val) || isNaN(start) || isNaN(end) || start >= end) {
      setResult(null);
      return;
    }
    let accumulatedInflation = 1;
    const relevantData = INFLATION_DATA.filter((d) => d.year >= start && d.year < end);
    relevantData.forEach((d) => {
      accumulatedInflation *= 1 + d.ipca / 100;
    });
    const adjustedAmount = val * accumulatedInflation;
    setResult({
      adjustedAmount,
      inflation: (accumulatedInflation - 1) * 100
    });
  };
  useEffect(() => {
    calculate();
  }, [amount, startYear, endYear]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const years = Array.from({ length: (/* @__PURE__ */ new Date()).getFullYear() - 1994 }, (_, i) => 1995 + i);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Poder de Compra: Correção pela Inflação (IPCA)",
    "description": "Descubra quanto seu dinheiro valia no passado e veja a perda do poder de compra pela inflação. Calcule a correção monetária exata agora.",
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
        title: "Calculadora de Poder de Compra: Correção pela Inflação (IPCA)",
        description: "Descubra quanto seu dinheiro valia no passado e veja a perda do poder de compra pela inflação. Calcule a correção monetária exata agora.",
        canonical: "/calculadoras/poder-de-compra"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": INFLATION_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Poder de Compra", href: "/calculadoras/poder-de-compra" }
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
                /* @__PURE__ */ jsx(History, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-red-500", children: "Poder de Compra" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto text-lg text-gray-400 space-y-4 hidden" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full min-h-[600px]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
                "Corrigir Valor"
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
                        value: amount,
                        onChange: (e) => handleCurrencyInput(e.target.value, setAmount),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Ano Inicial" }),
                    /* @__PURE__ */ jsx(
                      "select",
                      {
                        value: startYear,
                        onChange: (e) => setStartYear(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        children: years.map((year) => /* @__PURE__ */ jsx("option", { value: year, children: year }, year))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Ano Final" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: endYear,
                        onChange: (e) => setEndYear(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        children: [
                          years.filter((y) => y > parseInt(startYear)).map((year) => /* @__PURE__ */ jsx("option", { value: year, children: year }, year)),
                          /* @__PURE__ */ jsx("option", { value: (/* @__PURE__ */ new Date()).getFullYear(), children: (/* @__PURE__ */ new Date()).getFullYear() })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Valor Corrigido (Hoje)" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.adjustedAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Inflação Acumulada (IPCA)" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-red-400", children: result ? `${result.inflation.toFixed(2)}%` : "---" })
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
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold mb-6 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-emerald-500" }),
                "Como usar a Calculadora"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Nossa ferramenta simplifica a matemática financeira complexa. Para descobrir o valor real do dinheiro no tempo, você precisará apenas de três dados:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Valor Inicial" }),
                      "A quantia que você quer corrigir (ex: o preço de um imóvel em 2015 ou seu primeiro salário)."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Ano Inicial" }),
                      "O ano de referência daquele valor."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Ano Final" }),
                      "Para quando você quer trazer esse valor (geralmente, o ano atual)."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  "O sistema aplica a correção monetária acumulada ano a ano. Isso é essencial para saber se uma proposta de emprego atual realmente paga mais que seu emprego anterior ou para calcular o ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "salário líquido" }),
                  " real descontando a inflação."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 text-center mb-12", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Você já percebeu que ",
          /* @__PURE__ */ jsx("strong", { children: "R$ 100,00" }),
          " hoje não enchem o carrinho de compras como faziam há 10 anos? Isso não é apenas uma impressão; é a corrosão do seu dinheiro causada pela inflação."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Nossa ",
          /* @__PURE__ */ jsx("strong", { children: "Calculadora de Poder de Compra" }),
          " revela a verdade financeira: ela atualiza valores do passado para o presente usando índices oficiais (como o IPCA), mostrando exatamente quanto você precisaria ganhar hoje para manter o mesmo padrão de vida de anos atrás."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-16", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8",
            children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(TrendingDown, { className: "w-6 h-6 text-red-500" }),
                "O que é Poder de Compra?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "O ",
                  /* @__PURE__ */ jsx("strong", { children: "poder de compra" }),
                  ' (ou poder aquisitivo) é a capacidade de adquirir bens e serviços com uma determinada quantia de dinheiro. Em termos simples: é o que o seu dinheiro consegue "pagar" no supermercado, no posto de gasolina ou no aluguel.'
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Quando os preços sobem de forma generalizada — fenômeno conhecido como ",
                  /* @__PURE__ */ jsx("strong", { children: "inflação" }),
                  ' — a sua moeda perde valor. Se o seu salário não cresce na mesma velocidade que a inflação, você fica "mais pobre", mesmo recebendo o mesmo valor nominal.'
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.2 },
            className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8",
            children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-6 h-6 text-emerald-500" }),
                'Como a Inflação "Come" seu Salário'
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "O principal vilão do seu bolso no Brasil é o ",
                  /* @__PURE__ */ jsx("strong", { children: "IPCA" }),
                  " (Índice Nacional de Preços ao Consumidor Amplo), medido pelo IBGE. Ele rastreia o aumento de preços de uma cesta de produtos e serviços."
                ] }),
                /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Ano" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Valor Nominal" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Equivalente Hoje" })
                  ] }) }),
                  /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "1994" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 100,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-red-400", children: "R$ 820,00+" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "2010" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 100,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-red-400", children: "R$ 250,00+" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "2024" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 100,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-emerald-400", children: "R$ 100,00" })
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  "Para não perder dinheiro, é vital que seus rendimentos sejam corrigidos acima desses índices. Entender isso é o primeiro passo antes de planejar seus ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/investimentos", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "investimentos" }),
                  " de longo prazo."
                ] })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-24",
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Shield, { className: "w-6 h-6 text-emerald-500" }),
              "3 Formas de Proteger seu Poder de Compra"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-8 h-8 text-emerald-500 mb-4" }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Invista em Ativos Reais" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                  "Deixar dinheiro parado na conta corrente é prejuízo certo. Busque investimentos atrelados à inflação (Tesouro IPCA+, Fundos Imobiliários ou Ações). Use nossa calculadora de ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/juros-compostos", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "juros compostos" }),
                  " para simular o crescimento real."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-8 h-8 text-emerald-500 mb-4" }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Negocie seu Salário" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Use os dados desta calculadora na sua avaliação de desempenho. Mostre ao seu chefe que um reajuste abaixo da inflação é, na prática, uma redução salarial." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-emerald-500 mb-4" }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Monitore seus Gastos" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: 'Às vezes a "inflação pessoal" é maior que a oficial. Se você gasta muito com educação ou saúde, setores que costumam subir acima da média, seu poder de compra cai mais rápido.' })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: INFLATION_FAQS,
          title: "Perguntas Frequentes sobre Inflação (FAQ)",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  PurchasingPowerPage
};
//# sourceMappingURL=PurchasingPowerPage-eBS2cBT-.js.map
