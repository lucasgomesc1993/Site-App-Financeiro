import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, Suspense, lazy } from "react";
import { Globe, Calculator, RefreshCw, CreditCard, Info, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { S as SEO, F as FAQ } from "../entry-server.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { AppPromoBanner } from "./AppPromoBanner-BHihqQwm.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
const CURRENCY_FAQS = [
  {
    question: "Câmbio na Argentina: Real ou Peso?",
    answer: 'Para a Argentina, o câmbio oficial geralmente não compensa. O país possui cotações paralelas (como o "Dólar Blue" ou "Dólar MEP") que valorizam o Real em quase o dobro. Enviar dinheiro via remessas (Western Union) ou usar cartões de contas globais costuma ser muito mais vantajoso que levar Reais em espécie.'
  },
  {
    question: "Vale a pena comprar dólar agora ou esperar?",
    answer: 'Tentar acertar a "mínima" é arriscado. A melhor estratégia é o Preço Médio: compre pequenas quantias regularmente ao longo dos meses antes da viagem. Isso dilui o risco da volatilidade e protege seu poder de compra.'
  },
  {
    question: "Qual o limite de dinheiro em espécie para viagem internacional?",
    answer: "Pela nova Lei de Câmbio (14.286/2021), vigente em 2025, cada viajante pode portar até US$ 10.000,00 (ou equivalente em outra moeda) sem precisar declarar à Receita Federal. Acima desse valor, é obrigatório preencher a declaração eletrônica (e-DMOV)."
  },
  {
    question: "O IOF do cartão vai zerar?",
    answer: "Sim, mas gradualmente. O governo estabeleceu um cronograma de redução de 1% ao ano. Em 2025, a taxa é de 3,38%. Ela cairá para 2,38% em 2026, 1,38% em 2027 e será totalmente zerada (0%) apenas em 2028."
  }
];
const CurrencyChart = lazy(() => import("./CurrencyChart-yDOhwxlt.js"));
function CurrencyConverterPage() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const displayRates = {
    "USD": 5.88,
    "EUR": 6.2,
    "GBP": 7.45,
    "BRL": 1
  };
  const calculate = () => {
    const val = parseFloat(amount.replace(/\./g, "").replace(",", "."));
    if (isNaN(val) || val === 0) {
      setResult(null);
      return;
    }
    const fromRate = displayRates[fromCurrency];
    const toRate = displayRates[toCurrency];
    const valueInBRL = val * fromRate;
    const finalValue = valueInBRL / toRate;
    setResult(finalValue);
    setRate(fromRate / toRate);
  };
  useEffect(() => {
    calculate();
  }, [amount, fromCurrency, toCurrency]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Conversor de Moedas: Dólar, Euro e Libra Hoje (Tabela IOF 2025)",
    "url": "https://www.junny.com.br/calculadoras/conversor-moedas",
    "description": "Converta Dólar, Euro e Libra em tempo real. Veja o cronograma IOF 2025 (3,38%), entenda o Spread bancário, o VET e compare o poder de compra.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
    "featureList": [
      "Cotação em Tempo Real",
      "Cálculo de IOF 2025",
      "Comparativo Dólar Comercial vs Turismo",
      "Tabela de Poder de Compra"
    ],
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
        title: "Conversor de Moedas: Dólar, Euro e Libra Hoje (Tabela IOF 2025)",
        description: "Converta Dólar, Euro e Libra em tempo real. Veja o cronograma IOF 2025 (3,38%), entenda o Spread bancário, o VET e compare o poder de compra.",
        canonical: "/calculadoras/conversor-moedas"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CURRENCY_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Conversor de Moedas", href: "/calculadoras/conversor-moedas" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4 text-emerald-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Conversor de Moedas: ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500", children: "Dólar, Euro e Libra Hoje" }),
            " (Cotação 2025)"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto text-lg text-gray-400 space-y-4 hidden" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full min-h-[600px]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
            "Converter Agora"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor" }),
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: amount,
                  onChange: (e) => handleCurrencyInput(e.target.value, setAmount),
                  className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                  placeholder: "0,00"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_auto_1fr] gap-4 items-end", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "fromCurrency", className: "text-sm text-gray-400", children: "De" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "fromCurrency",
                    value: fromCurrency,
                    onChange: (e) => setFromCurrency(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "BRL", children: "Real (BRL)" }),
                      /* @__PURE__ */ jsx("option", { value: "USD", children: "Dólar (USD)" }),
                      /* @__PURE__ */ jsx("option", { value: "EUR", children: "Euro (EUR)" }),
                      /* @__PURE__ */ jsx("option", { value: "GBP", children: "Libra (GBP)" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: swapCurrencies,
                  "aria-label": "Inverter moedas",
                  className: "p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-[1px]",
                  children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 text-emerald-500" })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "toCurrency", className: "text-sm text-gray-400", children: "Para" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "toCurrency",
                    value: toCurrency,
                    onChange: (e) => setToCurrency(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "BRL", children: "Real (BRL)" }),
                      /* @__PURE__ */ jsx("option", { value: "USD", children: "Dólar (USD)" }),
                      /* @__PURE__ */ jsx("option", { value: "EUR", children: "Euro (EUR)" }),
                      /* @__PURE__ */ jsx("option", { value: "GBP", children: "Libra (GBP)" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Valor Convertido" }),
              /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `${toCurrency === "BRL" ? "R$" : toCurrency === "USD" ? "$" : toCurrency === "EUR" ? "€" : "£"} ${result.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
              rate && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-2", children: [
                "1 ",
                fromCurrency,
                " = ",
                rate.toFixed(4),
                " ",
                toCurrency
              ] })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-full w-full min-h-[600px] bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 flex items-center justify-center", children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-8 h-8 text-emerald-500 animate-spin" }) }), children: /* @__PURE__ */ jsx(CurrencyChart, {}) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 text-center mb-12", children: /* @__PURE__ */ jsxs("p", { children: [
        "Converta Dólar, Euro e Libra com a cotação oficial de agora (05/12/2025). Descubra exatamente quanto sua compra vai custar no final, já incluindo o IOF atualizado de 2025 e as taxas bancárias. ",
        /* @__PURE__ */ jsx("strong", { children: "Pare de adivinhar e calcule o valor real:" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6 text-emerald-500" }),
          "Cronograma de Redução do IOF (Cartão de Crédito)"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Em 2025, o IOF para compras internacionais no cartão de crédito caiu para ",
            /* @__PURE__ */ jsx("strong", { children: "3,38%" }),
            ". O governo federal zerará essa taxa gradualmente até 2028 para atender aos requisitos da OCDE. Veja o impacto real em uma fatura de R$ 1.000,00:"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Ano" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-center", children: "Taxa IOF" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-center", children: "Custo por R$ 1.000" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "2024" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "4,38%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 43,80" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Anterior" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 bg-emerald-500/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: "2025" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-emerald-400", children: "3,38%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-emerald-400", children: "R$ 33,80" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: "Vigente Agora" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "2026" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "2,38%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 23,80" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Futuro" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "2027" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "1,38%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 13,80" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Futuro" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: "2028" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-emerald-400", children: "0,00%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-emerald-400", children: "R$ 0,00" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: "Isento" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
            "Para saber o impacto real desses juros e taxas no valor final da sua compra, use a ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-efetivo-total", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de Custo Efetivo Total" }),
            "."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Globe, { className: "w-6 h-6 text-emerald-500" }),
          "Poder de Compra: Quanto vale US$ 100 e € 100 hoje?"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
          "O número na tela engana. US$ 100 parece pouco, mas nos EUA o poder de compra é superior ao do Brasil para bens de consumo. Compare o custo de vida real usando nossa ferramenta de ",
          /* @__PURE__ */ jsx(Link, { to: "/calculadoras/poder-de-compra", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Poder de Compra" }),
          " para saber se o produto vale a pena."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: "🇺🇸 Dólar (Estimativa)" }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Valor (USD)" }),
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Custo Final (+IOF)" }),
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "O que isso compra lá fora?" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "$ 5,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 29,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Um Café Expresso (Starbucks)" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "$ 15,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 87,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Combo Fast Food (Médio)" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "$ 50,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 290,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Fone Bluetooth de entrada" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "$ 80,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 465,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Jantar para dois (sem vinho)" })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: "🇪🇺 Euro (Estimativa)" }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Valor (EUR)" }),
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Custo Final (+IOF)" }),
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "O que isso compra lá fora?" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "€ 2,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 13,50" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Ticket de Metrô (Paris/Madri)" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "€ 15,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 101,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Menu do dia (Almoço executivo)" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "€ 60,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 405,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Jantar completo para casal" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "€ 100,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 675,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Peças de roupa (Fast Fashion)" })
                ] })
              ] })
            ] }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Info, { className: "w-6 h-6 text-emerald-500" }),
          "Dicionário de Taxas: VET, Spread e PTAX"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Entenda as siglas que definem quanto dinheiro sai do seu bolso:" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "O que é Spread Bancário?" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: 'É a diferença entre o câmbio oficial (interbancário) e o valor que o banco cobra de você para lucrar na transação. Enquanto o câmbio oficial pode estar em R$ 5,40, o banco pode lhe vender a R$ 5,70. Essa "gordura" é o lucro da instituição e pode variar de 1% (contas globais) a 6% (bancos tradicionais).' })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "O que é VET?" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
              "É a soma de tudo: ",
              /* @__PURE__ */ jsx("strong", { children: "Cotação + Spread + Tarifas + IOF" }),
              ". As casas de câmbio podem anunciar uma taxa baixa para atrair clientes, mas compensar nas tarifas ocultas. O VET é a única métrica real para comparar se uma oferta é vantajosa."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "O que é a Taxa PTAX?" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
              "É a média oficial do Banco Central, calculada diariamente. É a referência usada para fechar a fatura do seu cartão de crédito. Geralmente, os bancos cobram ",
              /* @__PURE__ */ jsx("strong", { children: "PTAX + Spread" }),
              ". Descubra quanto o banco está lucrando em cima de você usando a ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/porcentagem", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de Porcentagem" }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6 text-emerald-500" }),
            "Comercial vs. Turismo: Qual a diferença?"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "A escolha errada pode encarecer sua viagem em ",
              /* @__PURE__ */ jsx("strong", { children: "até 8%" }),
              ". Entenda a diferença para não ser taxado à toa:"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Tipo" }),
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Onde é usado?" }),
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Custo Estimado" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "Comercial" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Transações digitais, Contas Globais e Importação." }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-emerald-400", children: "✅ Mais Barato" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "Turismo" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Dinheiro em espécie (papel-moeda)." }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-red-400", children: "🔴 +6% a 8%" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs italic mt-2", children: [
              "*Nota para Empreendedores: Se você importa produtos pagando em Dólar Comercial para revenda no Brasil, utilize a calculadora de ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/markup", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Markup" }),
              " para precificar seus itens corretamente."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-emerald-500" }),
            "Simulação: Qual a melhor forma de levar dinheiro?"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "Comparativo de custos para uma despesa de ",
              /* @__PURE__ */ jsx("strong", { children: "US$ 1.000,00" }),
              " em Dezembro de 2025."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Modalidade" }),
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Câmbio Base" }),
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white text-center", children: "IOF (2025)" }),
                /* @__PURE__ */ jsx("th", { className: "p-2 text-white text-center", children: "Veredito" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 bg-emerald-500/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "Conta Global" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Comercial (+1% a 2%)" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 text-center", children: "1,10%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 text-center font-bold text-emerald-400", children: "✅ Melhor Opção" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Papel Moeda" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Turismo (Alto Custo)" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 text-center", children: "1,10%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 text-center text-yellow-400", children: "🟡 Emergências" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Cartão de Crédito" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "PTAX (+4% a 6%)" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 text-center", children: "3,38%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 text-center text-red-400", children: "🔴 Mais Caro" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
              "Está planejando as férias? Use nossa ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-viagem", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de Custo de Viagem" }),
              " para somar passagens, hospedagem e alimentação."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(TrendingUp, { className: "w-6 h-6 text-emerald-500" }),
          "O que faz o Dólar subir ou descer?"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
          "A cotação flutua baseada em três pilares principais. Entendê-los ajuda a melhorar seu ",
          /* @__PURE__ */ jsx(Link, { to: "/calculadoras/roi", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "ROI" }),
          " em operações internacionais e saber a hora certa de aportar em ",
          /* @__PURE__ */ jsx(Link, { to: "/calculadoras/investimentos", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Investimentos" }),
          " no exterior:"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center text-sm", children: "1" }),
              "Taxa Selic"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Juros altos no Brasil atraem investidores estrangeiros, trazendo dólares e baixando a cotação." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center text-sm", children: "2" }),
              "Risco Fiscal"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Quando o governo gasta mais do que arrecada, a confiança cai e o dólar sobe." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center text-sm", children: "3" }),
              "Juros nos EUA (Fed)"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Se os juros sobem lá, o dinheiro sai de emergentes (como o Brasil) e volta para os EUA, valorizando a moeda americana." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-yellow-200/80", children: [
            /* @__PURE__ */ jsx("strong", { children: "Dica de Ouro:" }),
            " O dólar disparou antes do fechamento da fatura? Use nossa ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/quitacao-antecipada", className: "text-yellow-400 hover:text-yellow-300 underline decoration-yellow-400/30", children: "Calculadora de Quitação Antecipada" }),
            " para ver se vale a pena adiantar o pagamento e travar o câmbio do dia."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: CURRENCY_FAQS,
          title: "Dúvidas Frequentes (FAQ)",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  CurrencyConverterPage
};
//# sourceMappingURL=CurrencyConverterPage-CKMEQmKD.js.map
