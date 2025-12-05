import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { BarChart3, Calculator, Info, Coins, TrendingUp, AlertCircle, Target } from "lucide-react";
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
const INTEREST_FAQS = [
  {
    question: "Qual a diferença entre juros simples e compostos?",
    answer: "A diferença reside na base de cálculo. Nos juros simples, a taxa incide apenas sobre o valor principal inicial. Nos juros compostos, a taxa incide sobre o principal somado aos juros acumulados nos períodos anteriores, resultando em um crescimento exponencial do patrimônio."
  },
  {
    question: "Como calcular juros compostos mensalmente?",
    answer: "A fórmula utilizada é M = C(1+i)^t. Para cálculos mensais, é crucial converter a taxa anual para mensal antes de aplicar a fórmula. Ferramentas online, como esta calculadora, fazem essa conversão automaticamente para garantir precisão."
  },
  {
    question: "Qual o melhor investimento para juros compostos?",
    answer: "Os títulos de Renda Fixa pós-fixados (como Tesouro Selic e CDBs) garantem o efeito composto por contrato. Em Renda Variável (Ações e FIIs), o efeito composto é obtido manualmente através do reinvestimento sistemático dos dividendos recebidos."
  },
  {
    question: "Quanto rendem R$ 1.000 a juros compostos?",
    answer: "O rendimento depende da taxa e do prazo. Por exemplo, R$ 1.000 a 1% ao mês por 12 meses resultaria em R$ 1.126,82. Nos juros simples, o valor seria R$ 1.120,00. A discrepância aumenta drasticamente conforme o prazo se estende."
  },
  {
    question: "A poupança usa juros compostos?",
    answer: "Sim, a poupança utiliza o regime de juros compostos, com crédito mensal na data de aniversário. Contudo, devido à rentabilidade historicamente baixa, o efeito de acumulação é muito inferior quando comparado a outros tipos de investimentos de renda fixa."
  }
];
function CompoundInterestPage() {
  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [period, setPeriod] = useState("");
  const [periodType, setPeriodType] = useState("years");
  const [rateType, setRateType] = useState("yearly");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const p = parseFloat(initialAmount.replace(/\./g, "").replace(",", "."));
    const pmt = parseFloat(monthlyContribution.replace(/\./g, "").replace(",", "."));
    const r = parseFloat(interestRate.replace(",", "."));
    const t = parseInt(period);
    if (isNaN(p) || isNaN(pmt) || isNaN(r) || isNaN(t) || t === 0) {
      setResult(null);
      return;
    }
    let months = t;
    if (periodType === "years") {
      months = t * 12;
    }
    let monthlyRate = r / 100;
    if (rateType === "yearly") {
      monthlyRate = Math.pow(1 + r / 100, 1 / 12) - 1;
    }
    const fvInitial = p * Math.pow(1 + monthlyRate, months);
    const fvContributions = pmt * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    const totalAmount = fvInitial + fvContributions;
    const totalInvested = p + pmt * months;
    const totalInterest = totalAmount - totalInvested;
    setResult({
      totalInvested,
      totalInterest,
      totalAmount
    });
  };
  useEffect(() => {
    calculate();
  }, [initialAmount, monthlyContribution, interestRate, period, periodType, rateType]);
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
    "name": "Calculadora de Juros Compostos Online: Simule Rendimentos Reais",
    "description": "Projete o crescimento do seu patrimônio. Use nossa calculadora de juros compostos para simular aportes mensais, taxas de juros e o efeito do tempo nos seus investimentos.",
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
        title: "Calculadora de Juros Compostos Online: Simule Rendimentos Reais",
        description: "Projete o crescimento do seu patrimônio. Use nossa calculadora de juros compostos para simular aportes mensais, taxas de juros e o efeito do tempo nos seus investimentos.",
        canonical: "/calculadoras/juros-compostos"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": INTEREST_FAQS.map((faq) => ({
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
          { label: "Juros Compostos", href: "/calculadoras/juros-compostos" }
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
                /* @__PURE__ */ jsx(BarChart3, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500", children: "Juros Compostos" }),
                " Online"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-lg text-gray-400 space-y-4", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Esta ferramenta é essencial para ",
                  /* @__PURE__ */ jsx("strong", { children: "planejar sua liberdade financeira" }),
                  ". Ao contrário dos juros simples, onde o dinheiro cresce de forma linear, aqui o seu rendimento gera novos rendimentos, criando um efeito de acúmulo acelerado a seu favor."
                ] }),
                /* @__PURE__ */ jsx("p", { children: "Use a calculadora abaixo para projetar seus ganhos reais com CDBs, Tesouro Direto ou qualquer aplicação de renda fixa e variável, ajustando o tempo e os depósitos mensais." })
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
                "Simular Crescimento"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Inicial" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: initialAmount,
                          onChange: (e) => handleCurrencyInput(e.target.value, setInitialAmount),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Aporte Mensal" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: monthlyContribution,
                          onChange: (e) => handleCurrencyInput(e.target.value, setMonthlyContribution),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Taxa de Juros (%)" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: interestRate,
                          onChange: (e) => handleNumberInput(e.target.value, setInterestRate),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "Ex: 10"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: rateType,
                          onChange: (e) => setRateType(e.target.value),
                          className: "bg-[#0a0a0a] border border-white/10 rounded-xl px-2 text-white text-sm focus:outline-none focus:border-emerald-500/50",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "yearly", children: "Anual" }),
                            /* @__PURE__ */ jsx("option", { value: "monthly", children: "Mensal" })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Período" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: period,
                          onChange: (e) => handleNumberInput(e.target.value, setPeriod),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "Ex: 5"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: periodType,
                          onChange: (e) => setPeriodType(e.target.value),
                          className: "bg-[#0a0a0a] border border-white/10 rounded-xl px-2 text-white text-sm focus:outline-none focus:border-emerald-500/50",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "years", children: "Anos" }),
                            /* @__PURE__ */ jsx("option", { value: "months", children: "Meses" })
                          ]
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Valor Final Total" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.totalAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total Investido" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalInvested.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total em Juros" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-emerald-400", children: result ? `+ R$ ${result.totalInterest.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
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
                "O Que São Juros Compostos?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Juros compostos representam o regime de capitalização onde os juros de cada período incidem sobre o montante acumulado (capital inicial + rendimentos passados), gerando crescimento exponencial." }) }),
                /* @__PURE__ */ jsx("p", { children: "Diferente do crescimento linear, essa modalidade faz com que a base de cálculo aumente mês a mês." }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    "• ",
                    /* @__PURE__ */ jsx("strong", { children: "Mês 1:" }),
                    " Você investe R$ 1.000 a 10%. Ganha R$ 100. Saldo: R$ 1.100."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    "• ",
                    /* @__PURE__ */ jsx("strong", { children: "Mês 2:" }),
                    " O juro de 10% incide sobre R$ 1.100. Você ganha R$ 110. Saldo: R$ 1.210."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20", children: [
                  /* @__PURE__ */ jsxs("strong", { className: "text-emerald-400 block mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Coins, { className: "w-4 h-4" }),
                    "A Importância dos Aportes Mensais"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-emerald-100/80 mb-2", children: [
                    'Muitos investidores focam apenas no capital inicial, mas o "combustível" da equação está na recorrência. ',
                    /* @__PURE__ */ jsx("strong", { children: "Realizar aportes mensais constantes potencializa o efeito dos juros compostos" }),
                    " de maneira drástica."
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-emerald-100/80", children: [
                    "Para organizar seu orçamento e garantir que sobre dinheiro para investir, recomendamos aplicar a ",
                    /* @__PURE__ */ jsx(Link, { to: "/calculadoras/regra-50-30-20", className: "text-white hover:underline", children: "Regra 50-30-20" }),
                    "."
                  ] })
                ] })
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
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-6 h-6 text-emerald-500" }),
                "Juros Simples vs. Juros Compostos: O Duelo"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Veja a diferença prática de investir ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 10.000" }),
                  " a uma taxa de ",
                  /* @__PURE__ */ jsx("strong", { children: "10% ao ano" }),
                  " por 20 anos:"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Tipo" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Fórmula" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-emerald-400", children: "Saldo Final (Aprox.)" })
                  ] }) }),
                  /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "Juros Simples" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Linear (apenas sobre o principal)" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 text-emerald-100", children: "R$ 30.000" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-emerald-400", children: "Juros Compostos" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Exponencial (Juros sobre juros)" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-emerald-400", children: "R$ 67.275" })
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: "No longo prazo, essa diferença matemática é o que separa pequenos poupadores de grandes investidores." })
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
                /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-emerald-500" }),
                "A Fórmula Matemática"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { children: "A base matemática utilizada no cálculo é:" }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl text-center my-4 font-mono text-xl text-emerald-400", children: [
                  "M = C (1 + i)",
                  /* @__PURE__ */ jsx("sup", { children: "t" })
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white", children: "M:" }),
                    " Montante final (o que você recebe)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white", children: "C:" }),
                    " Capital inicial (o que você investiu)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white", children: "i:" }),
                    " Taxa de juros (na forma decimal, ex: 10% = 0,10)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white", children: "t:" }),
                    " Tempo de aplicação."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-start text-sm text-yellow-500/80 bg-yellow-500/10 p-3 rounded-lg", children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Nota técnica:" }),
                    " A taxa (",
                    /* @__PURE__ */ jsx("em", { children: "i" }),
                    ") e o tempo (",
                    /* @__PURE__ */ jsx("em", { children: "t" }),
                    ") devem estar sempre na mesma unidade (ambos em meses ou ambos em anos)."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm mt-4", children: [
                  "Se seu objetivo é atingir um valor específico, como sete dígitos na conta, nossa calculadora do ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/primeiro-milhao", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Primeiro Milhão" }),
                  " faz o caminho inverso e diz exatamente quanto você precisa poupar por mês."
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
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Target, { className: "w-6 h-6 text-emerald-500" }),
              "Onde investir com Juros Compostos no Brasil?"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-gray-400 leading-relaxed space-y-4", children: [
              /* @__PURE__ */ jsx("p", { children: "No Brasil, a maioria dos investimentos de Renda Fixa e a lógica de reinvestimento na Renda Variável utilizam este regime. As melhores opções incluem:" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-5", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Tesouro Direto (Selic e IPCA+):" }),
                  " A segurança do governo com a potência da capitalização composta."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "CDBs (Certificados de Depósito Bancário):" }),
                  " Títulos privados que frequentemente rendem acima de 100% do CDI."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Fundos Imobiliários e Ações:" }),
                  " Embora a cota varie, ao reinvestir os dividendos na compra de novas cotas, você cria o efeito composto na quantidade de ativos que possui."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Antes de escolher, é vital comparar a rentabilidade real. Use nossa ferramenta de ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/roi", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "ROI (Retorno sobre Investimento)" }),
                " para validar se o ativo supera a inflação e os custos."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: INTEREST_FAQS,
          title: "Perguntas Frequentes (FAQ)",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  CompoundInterestPage
};
//# sourceMappingURL=CompoundInterestPage-COIgh9Z0.js.map
