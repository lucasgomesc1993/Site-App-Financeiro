import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Flame, Calculator, Info, TrendingUp, AlertCircle } from "lucide-react";
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
const FIRE_FAQS = [
  {
    question: "Quanto dinheiro preciso para viver de renda no Brasil?",
    answer: "Você precisa de aproximadamente 300 vezes o seu custo mensal. Se você gasta R$ 4.000 mensais, precisará de R$ 1.200.000 investidos. Esse cálculo considera uma retirada segura de 4% ao ano. Se seus investimentos renderem mais que a inflação de forma consistente, esse valor pode ser menor."
  },
  {
    question: "A regra dos 4% funciona no Brasil?",
    answer: "Sim, e pode ser até mais eficiente. Nos EUA, a regra depende muito do mercado de ações. No Brasil, devido às altas taxas de juros na Renda Fixa (como o Tesouro IPCA+), é possível construir carteiras mais seguras com rentabilidade real acima de 5%, o que favorece o aposentado brasileiro."
  },
  {
    question: "Onde devo investir para atingir o FIRE?",
    answer: "A diversificação é chave. Uma carteira FIRE típica no Brasil combina Renda Fixa atrelada à inflação (para garantir poder de compra e segurança) e Renda Variável (Ações e Fundos Imobiliários) para crescimento patrimonial. Evite a poupança, pois ela perde para a inflação."
  },
  {
    question: "Preciso ter um salário alto para ser FIRE?",
    answer: "Não. O fator mais importante é a taxa de poupança, não o valor absoluto do salário. Alguém que ganha R$ 5.000 e poupa 50% (vivendo com R$ 2.500) atingirá a independência financeira mais rápido do que alguém que ganha R$ 20.000 mas gasta tudo o que recebe."
  },
  {
    question: "O que é Taxa de Retirada Segura (SWR)?",
    answer: "É a porcentagem do seu patrimônio que você pode sacar anualmente para pagar suas contas sem esgotar seu dinheiro antes de morrer. A taxa padrão é 4%, mas deve ser ajustada conforme a realidade econômica e sua expectativa de vida."
  },
  {
    question: "Devo considerar a inflação no cálculo?",
    answer: "Sim. A nossa calculadora considera a taxa de juros real (rentabilidade menos inflação). Se você projetar ganhos nominais sem descontar a inflação, terá uma falsa sensação de riqueza, mas seu dinheiro comprará menos no futuro."
  }
];
function FIREPage() {
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualReturn, setAnnualReturn] = useState("5");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const expense = parseFloat(monthlyExpense.replace(/\./g, "").replace(",", "."));
    const savings = parseFloat(currentSavings.replace(/\./g, "").replace(",", "."));
    const contribution = parseFloat(monthlyContribution.replace(/\./g, "").replace(",", "."));
    const rate = parseFloat(annualReturn.replace(",", "."));
    if (isNaN(expense) || isNaN(savings) || isNaN(contribution) || isNaN(rate) || expense === 0) {
      setResult(null);
      return;
    }
    const fireNumber = expense * 300;
    const r = Math.pow(1 + rate / 100, 1 / 12) - 1;
    const numerator = fireNumber * r + contribution;
    const denominator = savings * r + contribution;
    let months = 0;
    if (denominator > 0) {
      months = Math.log(numerator / denominator) / Math.log(1 + r);
    }
    setResult({
      fireNumber,
      yearsToFire: Math.max(0, months / 12)
    });
  };
  useEffect(() => {
    calculate();
  }, [monthlyExpense, currentSavings, monthlyContribution, annualReturn]);
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
    "name": "Calculadora FIRE: Quando Você Vai Atingir a Independência Financeira?",
    "description": "Descubra o valor exato para parar de trabalhar. Use nossa Calculadora FIRE gratuita, entenda a Regra dos 4% e planeje sua aposentadoria antecipada.",
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
        title: "Calculadora FIRE: Quando Você Vai Atingir a Independência Financeira?",
        description: "Descubra o valor exato para parar de trabalhar. Use nossa Calculadora FIRE gratuita, entenda a Regra dos 4% e planeje sua aposentadoria antecipada.",
        canonical: "/calculadoras/fire"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FIRE_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora FIRE", href: "/calculadoras/fire" }
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
                /* @__PURE__ */ jsx(Flame, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-orange-500", children: "FIRE" }),
                ": Planeje sua Independência Financeira"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-lg text-gray-400 space-y-4", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Você já imaginou não depender mais do seu salário para pagar as contas? Isso não é apenas um sonho, é uma estratégia matemática chamada ",
                  /* @__PURE__ */ jsx("strong", { className: "text-gray-200", children: "FIRE (Financial Independence, Retire Early)" }),
                  "."
                ] }),
                /* @__PURE__ */ jsx("p", { children: "Ao contrário da aposentadoria tradicional, onde você espera até os 65 anos, o movimento FIRE foca na acumulação agressiva de patrimônio para que você possa viver de renda muito antes disso — seja aos 40, 50 ou até 30 anos." }),
                /* @__PURE__ */ jsx("p", { children: 'Esta calculadora faz as contas complexas para você. Descubra exatamente quanto dinheiro você precisa acumular (seu "Número Mágico") e em quanto tempo alcançará sua liberdade.' })
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
                "Calcular Liberdade"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Despesas Mensais (Gasto Desejado)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: monthlyExpense,
                        onChange: (e) => handleCurrencyInput(e.target.value, setMonthlyExpense),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Quanto você gasta para viver? (Seja realista, inclua lazer e saúde)." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Patrimônio Atual" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: currentSavings,
                          onChange: (e) => handleCurrencyInput(e.target.value, setCurrentSavings),
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
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Taxa de Juros Anual (Real) %" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: annualReturn,
                      onChange: (e) => handleNumberInput(e.target.value, setAnnualReturn),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                      placeholder: "Ex: 5"
                    }
                  ),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                    "Quanto seus investimentos rendem ",
                    /* @__PURE__ */ jsx("strong", { children: "acima da inflação" }),
                    ". No Brasil, 4% a 6% é conservador."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Seu Número FIRE (Patrimônio Necessário)" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.fireNumber.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Tempo Estimado para Liberdade" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `${result.yearsToFire.toFixed(1)} anos` : "---" })
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
                "Como Usar a Calculadora"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Preencha os campos abaixo com dados reais da sua vida financeira:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Despesas Mensais" }),
                      "Quanto você gasta para viver? (Seja realista, inclua lazer e saúde)."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Patrimônio Atual" }),
                      "Quanto você já tem investido hoje."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Aporte Mensal" }),
                      "Quanto você consegue guardar e investir todo mês. Se você usa a ",
                      /* @__PURE__ */ jsx(Link, { to: "/calculadoras/regra-50-30-20", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "regra 50-30-20" }),
                      ", este valor deve ser, no mínimo, 20% da sua renda."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Taxa de Juros Anual (Real)" }),
                      "Quanto seus investimentos rendem ",
                      /* @__PURE__ */ jsx("strong", { children: "acima da inflação" }),
                      ". No Brasil, uma estimativa conservadora para o longo prazo gira em torno de 4% a 6% ao ano."
                    ] })
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
                /* @__PURE__ */ jsx(Flame, { className: "w-6 h-6 text-orange-500" }),
                "O Que é o Movimento FIRE?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "FIRE é a sigla em inglês para ",
                  /* @__PURE__ */ jsx("em", { children: "Independência Financeira, Aposentadoria Antecipada" }),
                  ". A premissa é simples: gastar muito menos do que ganha e investir a diferença com sabedoria até que os rendimentos dos seus investimentos cubram 100% das suas despesas anuais."
                ] }),
                /* @__PURE__ */ jsx("p", { children: "Existem variações do movimento, dependendo do seu estilo de vida:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-5", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Lean FIRE:" }),
                    " Ideal para quem busca uma vida frugal e custos baixos. O foco aqui é o minimalismo extremo para atingir a liberdade o mais rápido possível com um patrimônio menor."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Fat FIRE:" }),
                    " Para quem deseja manter um alto padrão de vida na aposentadoria. Exige um patrimônio acumulado significativamente maior para cobrir luxos e viagens frequentes."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Barista FIRE:" }),
                    " Para quem atinge a independência parcial. Você já tem patrimônio suficiente para cobrir o básico, mas continua trabalhando meio período (como barista, por exemplo) apenas para cobrir custos extras, benefícios de saúde ou simplesmente por prazer social."
                  ] })
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
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-6 h-6 text-emerald-500" }),
                "A Regra dos 4%"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "A ",
                  /* @__PURE__ */ jsx("strong", { children: "Regra dos 4%" }),
                  " é uma estratégia de retirada segura que estipula que você pode sacar 4% do seu patrimônio investido anualmente sem que o dinheiro acabe em 30 anos. Originada do Estudo da Universidade Trinity, a lógica define que você precisa acumular ",
                  /* @__PURE__ */ jsx("strong", { children: "25 vezes o seu custo anual" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-2", children: "Exemplo Prático:" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                    "Se você gasta ",
                    /* @__PURE__ */ jsx("strong", { children: "R$ 5.000,00 por mês" }),
                    ", seu custo anual é de R$ 60.000,00.",
                    /* @__PURE__ */ jsx("br", {}),
                    "Cálculo: R$ 60.000 x 25 = R$ 1.500.000.",
                    /* @__PURE__ */ jsx("br", {}),
                    "Seu objetivo de patrimônio é ",
                    /* @__PURE__ */ jsx("strong", { children: "1,5 milhão de reais" }),
                    "."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-start text-sm text-emerald-400/80", children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Nota para o Brasil:" }),
                    " No cenário brasileiro, temos uma vantagem histórica de juros reais altos. Estudos locais sugerem que, com uma carteira focada em ",
                    /* @__PURE__ */ jsx(Link, { to: "/blog/investimentos", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Renda Fixa" }),
                    ", a taxa de retirada segura pode chegar a ",
                    /* @__PURE__ */ jsx("strong", { children: "5%" }),
                    ", acelerando sua jornada."
                  ] })
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
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6 text-center", children: "Acelerando Sua Jornada" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-center max-w-2xl mx-auto mb-8", children: [
              "O segredo para atingir o FIRE não é apenas ganhar mais, mas sim aumentar sua ",
              /* @__PURE__ */ jsx("strong", { className: "text-gray-200", children: "taxa de poupança" }),
              "."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Taxa de Poupança" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Anos para se Aposentar (aprox.)" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "10%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "51 anos" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "20%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "37 anos" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "50%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "17 anos" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "70%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "8,5 anos" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-4 text-center", children: "Considerando retorno real de 5% a.a. partindo do zero." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 text-center text-gray-400", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "Se você está começando agora, utilize nossa ferramenta do ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/primeiro-milhao", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "primeiro milhão" }),
                " para traçar metas intermediárias. Lembre-se também de proteger seu patrimônio da inflação para manter seu ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/poder-de-compra", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "poder de compra" }),
                " ao longo das décadas."
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
                "O efeito dos ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/juros-compostos", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "juros compostos" }),
                " é o motor do FIRE. Quanto mais cedo você começar, menos esforço terá que fazer."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: FIRE_FAQS,
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
  FIREPage
};
//# sourceMappingURL=FIREPage-BNb0sGdX.js.map
