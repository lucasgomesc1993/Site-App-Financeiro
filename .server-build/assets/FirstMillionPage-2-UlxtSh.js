import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Gem, Calculator, Info, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-2hmnhBZO.js";
import { AppPromoBanner } from "./AppPromoBanner--0MyDSNn.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const MILLION_FAQS = [
  {
    question: "Quanto preciso investir para ter 1 milhão em 5 anos?",
    answer: "Para atingir R$ 1.000.000,00 em apenas 60 meses (5 anos), partindo do zero, você precisaria de uma disciplina de aporte agressiva. Considerando uma rentabilidade líquida otimista de 1% ao mês, o aporte necessário seria de aproximadamente R$ 12.250,00 mensais. Se você já tiver um capital inicial de R$ 100.000,00, esse valor cai para cerca de R$ 9.800,00 por mês."
  },
  {
    question: "Quanto rende 1 milhão de reais hoje?",
    answer: "Com a Selic acima de dois dígitos, investimentos seguros atrelados ao CDI rendem entre R$ 10.500,00 e R$ 11.000,00 líquidos por mês. Já a poupança, que rende apenas 0,5% + TR, entregaria cerca de R$ 6.000,00, perdendo para a inflação e corroendo seu Poder de Compra ao longo do tempo."
  },
  {
    question: "Juntar 1 milhão garante a aposentadoria?",
    answer: "Não necessariamente. Devido à inflação, 1 milhão hoje compra menos do que há 10 anos. O segredo é focar na renda passiva que esse montante gera. Se seus gastos mensais são de R$ 8.000,00, um milhão bem investido cobre suas despesas. Porém, é crucial continuar reinvestindo parte dos lucros para proteger o principal contra a desvalorização da moeda."
  },
  {
    question: "Posso usar o FGTS para acelerar o processo?",
    answer: "Você não pode investir o FGTS diretamente em ações ou Tesouro Direto, mas pode usá-lo estrategicamente. A melhor tática é utilizar o saldo para amortizar financiamentos imobiliários ou dar entrada em imóveis. Isso elimina dívidas de longo prazo e libera o fluxo de caixa do seu salário (que antes pagava a parcela) para ser direcionado a investimentos de alta rentabilidade."
  },
  {
    question: "Qual o melhor investimento para quem está começando?",
    answer: "Para quem busca o primeiro milhão, a consistência vence a complexidade. Comece pelo básico que funciona: Tesouro IPCA+ (para garantir juros reais acima da inflação) e ETFs de índices amplos. Evite arriscar tudo em ativos voláteis no início; a preservação do capital é vital para que os juros compostos façam seu trabalho nas primeiras fases da acumulação."
  }
];
function FirstMillionPage() {
  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const p = parseFloat(initialAmount.replace(/\./g, "").replace(",", "."));
    const pmt = parseFloat(monthlyContribution.replace(/\./g, "").replace(",", "."));
    const r = parseFloat(interestRate.replace(",", "."));
    if (isNaN(p) || isNaN(pmt) || isNaN(r) || r === 0) {
      setResult(null);
      return;
    }
    const target = 1e6;
    const i = r / 100 / 12;
    const numerator = target * i + pmt;
    const denominator = p * i + pmt;
    if (denominator <= 0) {
      setResult(null);
      return;
    }
    const months = Math.log(numerator / denominator) / Math.log(1 + i);
    setResult({
      months: Math.ceil(months),
      years: months / 12
    });
  };
  useEffect(() => {
    calculate();
  }, [initialAmount, monthlyContribution, interestRate]);
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
    "name": "Calculadora do Primeiro Milhão: Simule o Tempo Exato para Enriquecer",
    "description": "Quanto tempo falta para o seu primeiro milhão? Simule agora com base em seus aportes mensais e juros compostos. Descubra a matemática da riqueza.",
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
        title: "Calculadora do Primeiro Milhão: Simule o Tempo Exato para Enriquecer",
        description: "Quanto tempo falta para o seu primeiro milhão? Simule agora com base em seus aportes mensais e juros compostos. Descubra a matemática da riqueza.",
        canonical: "/calculadoras/primeiro-milhao"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": MILLION_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Primeiro Milhão", href: "/calculadoras/primeiro-milhao" }
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
                /* @__PURE__ */ jsx(Gem, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora do ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-yellow-500", children: "Primeiro Milhão" })
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
                "Simular Tempo"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Quanto você já tem?" }),
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
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Rentabilidade Anual Esperada (%)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: interestRate,
                      onChange: (e) => handleNumberInput(e.target.value, setInterestRate),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                      placeholder: "Ex: 10"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Tempo até o Milhão" }),
                  /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `${result.years.toFixed(1)} anos` : "---" }),
                  result && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-2", children: [
                    "ou ",
                    result.months,
                    " meses de disciplina."
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
                "A Matemática por trás do Milhão"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Os ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/juros-compostos", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Juros Compostos" }),
                  ' são o motor dessa aceleração. Tecnicamente, a fórmula exponencial atua sobre o tempo e os aportes de forma que, após o "Ponto de Virada" (',
                  /* @__PURE__ */ jsx("em", { children: "Tipping Point" }),
                  "), os rendimentos dos seus ativos superam o valor do seu próprio trabalho mensal."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20", children: [
                  /* @__PURE__ */ jsxs("strong", { className: "text-emerald-400 block mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4" }),
                    "Os 3 Pilares da Aceleração"
                  ] }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-emerald-100/80", children: [
                    /* @__PURE__ */ jsxs("li", { children: [
                      "• ",
                      /* @__PURE__ */ jsx("strong", { children: "Aporte Mensal:" }),
                      ' O valor "novo" que você injeta na carteira todo mês.'
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "• ",
                      /* @__PURE__ */ jsx("strong", { children: "Tempo:" }),
                      " O período de maturação. Começar 5 anos antes pode reduzir seu esforço pela metade."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "• ",
                      /* @__PURE__ */ jsx("strong", { children: "Rentabilidade:" }),
                      " A taxa de retorno dos seus ",
                      /* @__PURE__ */ jsx(Link, { to: "/calculadoras/investimentos", className: "text-white hover:underline", children: "melhores investimentos atuais" }),
                      "."
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 mb-16", children: /* @__PURE__ */ jsxs("p", { children: [
        "A ",
        /* @__PURE__ */ jsx("strong", { children: "Calculadora do Primeiro Milhão" }),
        " é uma ferramenta que projeta o tempo exato para atingir R$ 1 milhão com base em juros compostos e aportes mensais. Esta simulação utiliza a fórmula de valor futuro (FV) para calcular o crescimento exponencial do patrimônio, mostrando o impacto real do tempo sobre o dinheiro investido."
      ] }) }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6 text-center", children: "Simulação: Quanto tempo demora para juntar 1 milhão?" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-center max-w-3xl mx-auto mb-8", children: [
              "A tabela abaixo simula cenários reais considerando uma rentabilidade média realista de ",
              /* @__PURE__ */ jsx("strong", { children: "10% ao ano" }),
              " (já descontando a inflação média do IPCA)."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4" }),
              "Nota Técnica: Os valores apresentados são estimados considerando a incidência de imposto de renda regressivo no resgate final."
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Aporte Mensal" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Tempo Estimado (Anos)" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Juros Acumulados (Aprox.)" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Impacto dos Juros" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 500,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "32 anos" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "R$ 808.000" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "80% do total" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 1.000,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "25 anos" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "R$ 700.000" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "70% do total" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 2.000,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "19 anos" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "R$ 544.000" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "54% do total" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 5.000,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "11 anos" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "R$ 340.000" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "34% do total" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 10.000,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "7 anos" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "R$ 160.000" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "16% do total" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 text-center text-gray-400 space-y-4", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "Para viabilizar esses aportes sem comprometer seu custo de vida atual, utilize a ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/regra-50-30-20", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Regra 50-30-20" }),
                " para organizar seu orçamento doméstico antes de começar a investir."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t border-white/5", children: [
                /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-white mb-2", children: "Quer saber quando você poderá parar de trabalhar definitivamente?" }),
                /* @__PURE__ */ jsxs("p", { children: [
                  'Calcule agora sua "aposentadoria antecipada" com nossa ',
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/fire", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora FIRE (Financial Independence, Retire Early)" }),
                  " e descubra seu número mágico."
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: MILLION_FAQS,
          title: "Perguntas Frequentes sobre o Primeiro Milhão",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  FirstMillionPage
};
//# sourceMappingURL=FirstMillionPage-2-UlxtSh.js.map
