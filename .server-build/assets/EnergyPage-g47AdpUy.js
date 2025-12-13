import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Zap, Clock, Calendar, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import "react-router-dom";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
const EnergyCalculator = () => {
  const [power, setPower] = useState(0);
  const [hoursPerDay, setHoursPerDay] = useState(0);
  const [daysPerMonth, setDaysPerMonth] = useState(0);
  const [kwhPrice, setKwhPrice] = useState(0);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (power > 0 && hoursPerDay > 0 && daysPerMonth > 0 && kwhPrice > 0) {
      const consumptionKwh = power * hoursPerDay * daysPerMonth / 1e3;
      const totalCost = consumptionKwh * kwhPrice;
      setResult(totalCost);
    } else {
      setResult(null);
    }
  }, [power, hoursPerDay, daysPerMonth, kwhPrice]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Zap, { className: "w-6 h-6 text-primary" }),
        "Dados do Aparelho"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Potência do Aparelho (Watts)" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Zap, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                inputMode: "decimal",
                value: power || "",
                onChange: (e) => setPower(Number(e.target.value)),
                className: "w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all",
                placeholder: "Ex: 1100"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Tempo de uso diário (Horas)" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Clock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                inputMode: "decimal",
                value: hoursPerDay || "",
                onChange: (e) => setHoursPerDay(Number(e.target.value)),
                className: "w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all",
                placeholder: "Ex: 1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Dias de uso por mês" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                inputMode: "numeric",
                value: daysPerMonth || "",
                onChange: (e) => setDaysPerMonth(Number(e.target.value)),
                className: "w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all",
                placeholder: "Ex: 30"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Preço do kWh (R$)" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                inputMode: "decimal",
                step: "0.01",
                value: kwhPrice || "",
                onChange: (e) => setKwhPrice(Number(e.target.value)),
                className: "w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all",
                placeholder: "Ex: 0.85"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl text-gray-400 mb-2", children: "Custo Mensal Estimado" }),
        result !== null ? /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight", children: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(result) }),
              /* @__PURE__ */ jsxs("p", { className: "text-emerald-400 font-medium", children: [
                "Consumo: ",
                (power * hoursPerDay * daysPerMonth / 1e3).toFixed(2),
                " kWh/mês"
              ] })
            ]
          },
          result
        ) : /* @__PURE__ */ jsxs("div", { className: "py-12", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10", children: /* @__PURE__ */ jsx(Zap, { className: "w-10 h-10 text-gray-600" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Preencha os dados para calcular o consumo" })
        ] })
      ] })
    ] })
  ] });
};
const ENERGY_FAQS = [
  {
    question: "Quanto vale 1 kWh em reais?",
    answer: "O preço do kWh pode variar por diversos fatores, tais como: prestadora de energia, região do país atendida, bandeira de consumo (verde, amarela ou vermelha), tipo de estabelecimento (residencial, industrial etc.) e horário do consumo. Porém, atualmente, o preço médio do kWh no Brasil em geral fica entre R$ 0,60 a R$ 1,00."
  },
  {
    question: "O que são bandeiras tarifárias de energia?",
    answer: "As bandeiras tarifárias são faixas de preços que indicam o valor do custo de produção da energia elétrica pelo consumidor. Criadas em 2015 pela Aneel, elas permitem que o consumidor saiba com antecedência qual será o preço cobrado em sua conta e ajuste o seu consumo para diminuir o valor da conta de luz. Atualmente, há bandeiras nas cores verde, amarela ou vermelha (nos patamares 1 e 2), que classificam as tarifas das mais baratas (verde) às mais caras (vermelhas)."
  },
  {
    question: "O que é bandeira vermelha?",
    answer: "Bandeira vermelha é o tipo de faixa tarifária aplicada pelas companhias de distribuição de energia elétrica em períodos em que os custos de produção ficam mais caros. Ela acontece quando a produção de energia se torna mais cara, especialmente por fatores climáticos, como secas e diminuição no volume de água das usinas hidrelétricas, e o valor precisa ser repassado para o consumidor."
  },
  {
    question: "Como se calcula o valor da energia elétrica?",
    answer: "Para calcular o valor de energia elétrica de forma prática e precisa, basta utilizar a Calculadora de Consumo de Energia Junny."
  }
];
const EnergyPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Consumo de Energia Junny",
    "description": "Simule o consumo de energia dos seus eletrodomésticos e economize na conta de luz.",
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
        title: "Calculadora de Consumo de Energia - Economize Luz",
        description: "Descubra quanto seus aparelhos domésticos consomem e economize na conta de luz com a calculadora da Junny.",
        canonical: "/calculadoras/energia"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ENERGY_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora de Energia", href: "/calculadoras/energia" }
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
                /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Consumo de Energia" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto hidden" })
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
          className: "min-h-[600px]",
          children: /* @__PURE__ */ jsx(EnergyCalculator, {})
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center", children: /* @__PURE__ */ jsx("p", { children: "Descubra quanto seus aparelhos domésticos consomem e economize na conta de luz com a calculadora da Junny." }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Calculadora de Consumo de Energia: economize na conta de luz" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Quanto de energia seus aparelhos domésticos consomem? Descubra com a prática e fácil Calculadora de Consumo de Energia Junny." }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Campos da Calculadora" }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-gray-400 mb-8", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Potência do Aparelho:" }),
            " Potência do Aparelho em Watts (W)."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Tempo de uso diário (H):" }),
            " Tempo de uso por dia em horas."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Dias de uso:" }),
            " Número de dias de uso que deseja calcular."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Preço KWH:" }),
            " Preço do consumo Quilowatt-hora (R$)."
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Como utilizar a Calculadora de Consumo de Energia Junny" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "Para utilizar a Calculadora de Consumo de Energia Junny, siga os passos abaixo:" }),
        /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-6 space-y-2 text-gray-400 mb-8", children: [
          /* @__PURE__ */ jsx("li", { children: "Informe a potência do seu aparelho;" }),
          /* @__PURE__ */ jsx("li", { children: "Preencha com o tempo de uso diário em horas;" }),
          /* @__PURE__ */ jsx("li", { children: "Complemente com a quantidade de dias de uso;" }),
          /* @__PURE__ */ jsx("li", { children: "Informe o valor do quilowatt-hora (KWH) em sua região;" }),
          /* @__PURE__ */ jsx("li", { children: "Por fim, o cálculo é feito automaticamente." })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Como calcular seu consumo de energia" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Veja como utilizar a calculadora de energia Junny para descobrir o consumo dos seus aparelhos nos tópicos abaixo." }),
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-3", children: "Descubra qual é a potência do seu aparelho" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: 'Essa informação geralmente pode ser encontrada na caixa ou na etiqueta de consumo afixada no próprio produto. Caso não encontre a caixa ou a etiqueta, também é possível encontrar a potência do seu aparelho em uma rápida pesquisa em sites buscadores como o Google. Para isso, basta informar o modelo do aparelho com a palavra "potência" na barra de busca.' }),
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-3", children: "Preencha o valor do kWh em sua região" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Em seguida, pesquise em sua conta de energia ou no site da sua operadora o valor do quilowatt-hora (KWH) em sua região. Quilowatt-hora é uma unidade de faturamento comum utilizada pelas concessionárias de energia elétrica para cobrar pelo fornecimento da energia." }),
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-3", children: "Informe os seus dados de consumo de energia do aparelho" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Agora, basta preencher a Calculadora de Energia Junny com os dados que você obteve e o seu tempo de consumo. O resultado aparecerá instantaneamente para você saber exatamente quanto vai gastar em um mês." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-8 mb-12", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-4", children: "Veja o exemplo:" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "Digamos que você esteja pensando em comprar um aspirador de pó vertical, mas antes deseja saber o quanto o aparelho vai gastar por mês." }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "Sabendo que a potência do aparelho é de 1100W e que o preço do kWh, conforme informações da prestadora local, é de R$ 1,80, é hora de preencher os dados na calculadora. Nesse exemplo, consideramos que o tempo de uso do aparelho seria de uma hora por dia e uma vez por semana, ou seja, quatro dias de uso por mês." }),
          /* @__PURE__ */ jsx("p", { className: "text-rose-400 font-bold", children: "Resultado: Nesse caso, o custo mensal de energia para utilizar o aparelho será de R$ 7,92." })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Qual é a importância de saber calcular o consumo de energia dos eletrodomésticos?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Saber quanto um aparelho gasta de energia todo mês pode ser a chave para fazer melhores escolhas e desenvolver bons hábitos. Pode ser a sua geladeira, computador de trabalho ou mesmo o seu aspirador de pó. Cada aparelho é responsável por uma parcela específica do seu cálculo de consumo de energia." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Pensando nisso, a Junny desenvolveu uma Calculadora de Consumo de Energia para você descobrir de forma automática o quanto aquele seu eletrodoméstico vai gastar, além do preço médio que irá pagar por mês." }),
        /* @__PURE__ */ jsx(FAQ, { items: ENERGY_FAQS, title: "Perguntas frequentes sobre consumo de energia", className: "py-12", showSocialProof: false })
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
};
export {
  EnergyPage
};
//# sourceMappingURL=EnergyPage-g47AdpUy.js.map
