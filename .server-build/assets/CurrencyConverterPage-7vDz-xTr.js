import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Globe, Calculator, RefreshCw, Info, DollarSign, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { S as SEO, F as FAQ } from "../entry-server.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { AppPromoBanner } from "./AppPromoBanner-BHihqQwm.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
const CURRENCY_FAQS = [
  {
    question: "Qual o melhor horário para comprar dólar?",
    answer: 'O mercado de câmbio (Forex) funciona 24 horas, mas a liquidez principal ocorre durante o horário comercial (9h às 17h de Brasília). Comprar durante o horário de abertura dos bancos garante que você pegue a cotação momentânea com menor "spread". Para estratégias de longo prazo, confira nossas estratégias de investimentos.'
  },
  {
    question: "O que é Spread Bancário na conversão?",
    answer: "O Spread é a diferença entre o que o banco paga pela moeda e por quanto ele vende para você. É o lucro da instituição. Bancos digitais e contas globais costumam ter spreads menores (1% a 2%) que os grandes bancos tradicionais (4% a 6%)."
  },
  {
    question: "Como fugir do IOF alto em viagens?",
    answer: "Embora a alíquota para cartões seja de cerca de 3,5% em 2025, o uso de contas internacionais em Dólar (que permitem comprar a moeda comercialmente e manter saldo) ainda costuma ser mais vantajoso que usar o cartão de crédito brasileiro tradicional. Outra opção é a compra de papel moeda, que possui alíquota reduzida de 1,1%."
  },
  {
    question: "Quanto vale 1 Real em Dólar hoje?",
    answer: "O valor flutua a cada segundo. Atualmente, 1 Real vale aproximadamente entre $0,15 e $0,20 centavos de Dólar, dependendo da oscilação diária do mercado. Historicamente, o Real vale menos que o Dólar, exigindo cerca de 5 a 6 unidades de real para comprar 1 unidade de dólar em cenários recentes."
  }
];
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
    "name": "Conversor de Moedas Online: Dólar, Euro e Câmbio Hoje (2025)",
    "description": "Converta valores em tempo real com nosso Conversor de Moedas. Veja a cotação do Dólar Comercial e Turismo, Euro e IOF atualizado de 2025. Calcule agora.",
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
        title: "Conversor de Moedas Online: Dólar, Euro e Câmbio Hoje (2025)",
        description: "Converta valores em tempo real com nosso Conversor de Moedas. Veja a cotação do Dólar Comercial e Turismo, Euro e IOF atualizado de 2025. Calcule agora.",
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
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Conversor de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500", children: "Moedas" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-lg text-gray-400 space-y-4", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Precisa saber exatamente quanto vale o seu dinheiro antes de viajar ou fazer uma compra internacional? Você está no lugar certo. Nosso ",
                  /* @__PURE__ */ jsx("strong", { children: "Conversor de Moedas" }),
                  " utiliza dados atualizados em tempo real para entregar a cotação precisa do Dólar, Euro, Libra e outras divisas globais."
                ] }),
                /* @__PURE__ */ jsx("p", { children: "Mais do que apenas números, aqui você entende o custo real da operação, incluindo o impacto do IOF de 2025 e a diferença brutal entre a cotação comercial e a turismo." })
              ] })
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
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
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
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "De" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
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
                      className: "p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-[1px]",
                      children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 text-emerald-500" })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Para" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
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
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold mb-6 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-emerald-500" }),
                "Como usar este Conversor"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Siga o passo a passo para simular:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Valor" }),
                      "Digite a quantia que deseja converter (ex: R$ 1.000,00)."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Moeda de Origem" }),
                      "Selecione a moeda que você tem em mãos (geralmente Real Brasileiro - BRL)."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Moeda de Destino" }),
                      "Escolha a moeda que deseja comprar (Dólar Americano - USD, Euro - EUR, etc.)."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: "O resultado mostrará o valor de mercado. Porém, para o seu bolso, é fundamental entender as taxas extras explicadas abaixo." })
              ] })
            ] })
          }
        )
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
                /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6 text-emerald-500" }),
                "Dólar Comercial vs. Turismo"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Ao ver a cotação no jornal nacional, você vê o ",
                  /* @__PURE__ */ jsx("strong", { children: "Dólar Comercial" }),
                  ". Mas ao tentar comprar papel moeda na casa de câmbio, o valor é mais alto. Por que isso acontece?"
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-5", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Dólar Comercial:" }),
                    " É a taxa usada por grandes empresas e bancos para importação e exportação. O volume de dinheiro é gigantesco, por isso a taxa é menor."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Dólar Turismo:" }),
                    " É o valor que nós pagamos. Ele inclui custos operacionais (transporte de notas físicas, segurança) e a margem de lucro das instituições."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Se você está planejando suas férias, use nossa ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-viagem", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "calculadora de custo de viagem" }),
                  " considerando sempre a cotação Turismo."
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
                /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6 text-emerald-500" }),
                "O Custo Oculto: IOF em 2025"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Converter moedas não é apenas trocar uma nota pela outra. Existem taxas como o ",
                  /* @__PURE__ */ jsx("strong", { children: "IOF" }),
                  " (Imposto sobre Operações Financeiras)."
                ] }),
                /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Tipo de Operação" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Alíquota Aprox." })
                  ] }) }),
                  /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Cartão de Crédito Internacional" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-red-400", children: "3,5%" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Cartão de Débito / Pré-pago" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-red-400", children: "3,5%" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Compra de Moeda em Espécie" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-emerald-400", children: "1,1%" })
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  "Para entender quanto esses percentuais representam, use nossa ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/porcentagem", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "ferramenta de cálculo de porcentagem" }),
                  "."
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
              /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-emerald-500" }),
              "Como calcular conversão de moeda manualmente?"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "De Real para Moeda Estrangeira (Divisão)" }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
                  "Se você tem Reais e quer saber quantos Dólares vai conseguir comprar, você ",
                  /* @__PURE__ */ jsx("strong", { children: "divide" }),
                  " pelo valor da cotação."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-black/20 p-4 rounded-lg font-mono text-sm text-emerald-400", children: [
                  /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Fórmula: Reais ÷ Cotação" }),
                  /* @__PURE__ */ jsx("p", { children: "Ex: R$ 500 ÷ 5,50 = $ 90,90" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "De Moeda Estrangeira para Real (Multiplicação)" }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
                  "Se você viu um produto de 100 dólares e quer saber quanto custa em reais, você ",
                  /* @__PURE__ */ jsx("strong", { children: "multiplica" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-black/20 p-4 rounded-lg font-mono text-sm text-emerald-400", children: [
                  /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Fórmula: Dólar x Cotação" }),
                  /* @__PURE__ */ jsx("p", { children: "Ex: $ 100 x 5,50 = R$ 550,00" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mt-6 text-center", children: [
              "Lembre-se: em transações internacionais, o impacto na inflação local pode alterar seu ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/poder-de-compra", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "poder de compra" }),
              ", então considere sempre uma margem de segurança."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: CURRENCY_FAQS,
          title: "Perguntas Frequentes sobre Câmbio (FAQ)",
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
//# sourceMappingURL=CurrencyConverterPage-7vDz-xTr.js.map
