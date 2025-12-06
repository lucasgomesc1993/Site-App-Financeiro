import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { TrendingUp, Calculator, Info, AlertCircle, LineChart, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { F as FAQ } from "./FAQ-BvIu8Jqf.js";
import { AppPromoBanner } from "./AppPromoBanner-BwQOrylZ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const INVESTMENT_FAQS = [
  {
    question: "Quanto rendem R$ 1.000,00 por mês hoje?",
    answer: "O rendimento mensal depende da taxa Selic vigente. Se considerarmos uma taxa básica de juros próxima a 10,75% ao ano, um investimento que pague 100% do CDI renderia cerca de 0,85% ao mês bruto. Isso significa que R$ 1.000,00 gerariam aproximadamente R$ 8,50 no primeiro mês, antes do Imposto de Renda."
  },
  {
    question: "Qual a diferença entre LCI e CDB?",
    answer: "A diferença crucial é o Imposto de Renda. O CDB (Certificado de Depósito Bancário) sofre tributação regressiva de 22,5% a 15% sobre o lucro. Já as LCIs (Letras de Crédito Imobiliário) são isentas de IR para pessoas físicas. Por isso, uma LCI que rende 90% do CDI muitas vezes coloca mais dinheiro no seu bolso do que um CDB de 110% do CDI."
  },
  {
    question: "É seguro investir em bancos menores?",
    answer: "Sim, desde que o investimento seja coberto pelo FGC (Fundo Garantidor de Créditos). O FGC garante até R$ 250.000,00 por CPF e por instituição financeira em casos de falência do banco. Isso vale para CDBs, LCIs, LCAs e Poupança, tornando o risco muito baixo para quem respeita esse limite."
  },
  {
    question: "Vale a pena investir com pouco dinheiro?",
    answer: 'Com certeza. O fator "tempo" é mais importante que o valor do aporte inicial. Começar hoje com R$ 100,00 permite que os juros compostos atuem por mais tempo do que começar daqui a 5 anos com R$ 1.000,00. O hábito de investir cria disciplina financeira.'
  },
  {
    question: "Como calcular a rentabilidade real de um investimento?",
    answer: "A conta aproximada é: Rentabilidade Nominal - Inflação. Para a conta exata, usa-se a fórmula de Fisher: (1 + Taxa Nominal) / (1 + Inflação) - 1. Nossa calculadora foca no resultado final acumulado, mas você deve sempre ter em mente que o dinheiro do futuro valerá menos que o de hoje."
  }
];
function InvestmentPage() {
  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const p = parseFloat(initialAmount.replace(/\./g, "").replace(",", "."));
    const pmt = parseFloat(monthlyContribution.replace(/\./g, "").replace(",", "."));
    const t = parseInt(years);
    const r = parseFloat(rate.replace(",", "."));
    if (isNaN(p) || isNaN(pmt) || isNaN(t) || isNaN(r) || t === 0) {
      setResult(null);
      return;
    }
    const months = t * 12;
    const i = r / 100 / 12;
    const fvInitial = p * Math.pow(1 + i, months);
    const fvContributions = pmt * (Math.pow(1 + i, months) - 1) / i;
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
  }, [initialAmount, monthlyContribution, years, rate]);
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
    "name": "Calculadora de Investimentos: Simule Juros Compostos e Rendimentos",
    "description": "Descubra quanto seu dinheiro vai render. Use nossa Calculadora de Investimentos para simular juros compostos, aportes mensais e planejar sua liberdade financeira.",
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
        title: "Calculadora de Investimentos: Simule Juros Compostos e Rendimentos",
        description: "Descubra quanto seu dinheiro vai render. Use nossa Calculadora de Investimentos para simular juros compostos, aportes mensais e planejar sua liberdade financeira.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora de Investimentos", href: "/calculadoras/investimentos" }
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
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500", children: "Investimentos" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto text-lg text-gray-400 space-y-4 hidden" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full min-h-[600px]", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                  /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
                  "Simular Rendimento"
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
                      /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Mensal" }),
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
                      /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Taxa de Juros Anual (%)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: rate,
                          onChange: (e) => handleNumberInput(e.target.value, setRate),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "Ex: 10,5"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Período (Anos)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: years,
                          onChange: (e) => handleNumberInput(e.target.value, setYears),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "Ex: 10"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Valor Total Acumulado" }),
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
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Deixar dinheiro parado na conta corrente é o jeito mais rápido de perder poder de compra para a inflação. ",
                  /* @__PURE__ */ jsx("strong", { children: "Investir é a única estratégia comprovada" }),
                  " para proteger seu patrimônio e garantir um futuro tranquilo, independentemente de quanto você ganha hoje."
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Nossa ",
                  /* @__PURE__ */ jsx("strong", { children: "Calculadora de Investimentos" }),
                  " elimina as suposições. Com ela, você projeta o crescimento do seu capital e vê a matemática financeira acelerando seus resultados ao longo do tempo. Seja para comprar uma casa, planejar a aposentadoria ou atingir o ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/primeiro-milhao", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "primeiro milhão" }),
                  ", os números jogam no seu time."
                ] })
              ] })
            ]
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
                "Como preencher o simulador corretamente"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Para ter um resultado fiel à realidade, entenda o que cada campo pede:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Valor Inicial" }),
                      "Quanto você tem disponível hoje para começar. Se for zero, tudo bem."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Valor Mensal" }),
                      "A quantia do seu ",
                      /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-white hover:underline", children: "salário líquido" }),
                      " que você vai separar religiosamente para investir. A constância vence a intensidade."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Taxa de Juros Anual" }),
                      "A rentabilidade esperada.",
                      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-4 mt-1 text-sm text-gray-500", children: [
                        /* @__PURE__ */ jsxs("li", { children: [
                          /* @__PURE__ */ jsx("em", { children: "Conservador:" }),
                          " 8% a 10% (Renda Fixa segura)."
                        ] }),
                        /* @__PURE__ */ jsxs("li", { children: [
                          /* @__PURE__ */ jsx("em", { children: "Arrojado:" }),
                          " 11% a 13% (Renda Variável)."
                        ] })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Período (Anos)" }),
                      "O tempo que o dinheiro ficará trabalhando para você."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20", children: [
                  /* @__PURE__ */ jsxs("strong", { className: "text-emerald-400 block mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4" }),
                    "Dica Estratégica"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-emerald-100/80", children: [
                    "Está difícil definir o valor mensal? Utilize a ",
                    /* @__PURE__ */ jsx(Link, { to: "/calculadoras/regra-50-30-20", className: "text-white hover:underline", children: "Regra 50-30-20" }),
                    " para organizar seu orçamento e descobrir sua capacidade real de poupança antes de simular."
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-24", children: [
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
                /* @__PURE__ */ jsx(LineChart, { className: "w-6 h-6 text-emerald-500" }),
                "O Poder dos Juros Compostos"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { children: 'Juros compostos são a aplicação de juros sobre o capital inicial acrescido dos juros acumulados em períodos anteriores, gerando crescimento exponencial. Diferente dos juros simples, aqui a base de cálculo aumenta a cada mês, criando o efeito "bola de neve".' }),
                /* @__PURE__ */ jsx("p", { children: "No gráfico de longo prazo, isso gera uma aceleração robusta. Nos primeiros anos, o crescimento parece linear, mas após uma década, os rendimentos mensais podem começar a superar o valor dos seus aportes." }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Para entender a fórmula exata por trás desse crescimento, veja nossa página detalhada sobre ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/juros-compostos", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "juros compostos" }),
                  "."
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
                /* @__PURE__ */ jsx(Coins, { className: "w-6 h-6 text-emerald-500" }),
                "Ganho Real vs. Ganho Nominal"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { children: "A diferença entre ganho real e nominal é a inflação. Enquanto o ganho nominal é a rentabilidade bruta informada pela instituição financeira, o ganho real representa o aumento efetivo do poder de compra após descontar o IPCA (Índice Nacional de Preços ao Consumidor Amplo)." }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-5", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Taxa Nominal:" }),
                    " É o número que aparece na tela da corretora (ex: 12% ao ano)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Taxa Real:" }),
                    " É o quanto sua riqueza cresceu de verdade."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Se seu investimento rende 12% e a inflação é 5%, seu ganho real é de aproximadamente 7%. Para metas de longuíssimo prazo, como a independência financeira ou o movimento ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/fire", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "FIRE" }),
                  ", prefira simular com taxas reais mais baixas para não superestimar seu patrimônio futuro."
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Aprofunde-se em estratégias de alocação de ativos em nosso ",
                  /* @__PURE__ */ jsx(Link, { to: "/blog/investimentos", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "blog sobre investimentos" }),
                  "."
                ] })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: INVESTMENT_FAQS,
          title: "Perguntas Frequentes (FAQs)",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  InvestmentPage
};
//# sourceMappingURL=InvestmentPage-nLp19M5t.js.map
