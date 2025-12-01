import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calculator, DollarSign } from "lucide-react";
import { AppPromoBanner } from "./AppPromoBanner-CdIlkx8T.js";
import { S as SEO, F as FAQ } from "../entry-server.js";
import { B as Breadcrumb } from "./Breadcrumb-DwwVT1FI.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "@google/genai";
const TERMINATION_FAQS = [
  {
    question: "A calculadora é válida para qualquer tipo de demissão?",
    answer: "Sim, nossa calculadora cobre os principais tipos de rescisão: demissão sem justa causa, pedido de demissão, demissão por justa causa e acordo entre as partes. Basta selecionar o motivo correto para ver os direitos aplicáveis."
  },
  {
    question: "A simulação considera férias vencidas e proporcionais?",
    answer: "Sim. O cálculo leva em conta tanto as férias vencidas (se houver) quanto as férias proporcionais aos meses trabalhados no ano corrente, incluindo o terço constitucional."
  },
  {
    question: "É necessário informar o saldo de FGTS?",
    answer: "Para um cálculo preciso da multa de 40% (ou 20% em caso de acordo), é importante informar o saldo atual do FGTS. Se você não souber o valor exato, pode fazer uma estimativa ou consultar o extrato no aplicativo do FGTS."
  },
  {
    question: "A calculadora funciona para contratos de experiência?",
    answer: "Esta calculadora é otimizada para contratos por tempo indeterminado. Para contratos de experiência ou temporários, as regras podem variar ligeiramente, especialmente em relação à multa por quebra de contrato."
  },
  {
    question: "Posso simular rescisão com aviso prévio trabalhado ou indenizado?",
    answer: "Sim, você pode selecionar se o aviso prévio será trabalhado, indenizado ou não cumprido. O valor será somado ou descontado do total conforme a regra da CLT para o tipo de demissão escolhido."
  }
];
const TerminationPage = () => {
  const [salary, setSalary] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("sem-justa-causa");
  const [notice, setNotice] = useState("trabalhado");
  const [hasVacationDue, setHasVacationDue] = useState(false);
  const [fgtsBalance, setFgtsBalance] = useState(0);
  const [result, setResult] = useState(null);
  const calculateTermination = () => {
    if (!salary || !startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    const monthsWorked = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const daysInMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
    const daysWorkedInMonth = end.getDate();
    const salaryBalance = salary / daysInMonth * daysWorkedInMonth;
    let noticeValue = 0;
    let noticeDays = 30;
    if (reason === "sem-justa-causa") {
      const yearsWorked = Math.floor(diffDays / 365);
      noticeDays += Math.min(yearsWorked * 3, 60);
      if (notice === "indenizado") {
        noticeValue = salary / 30 * noticeDays;
      }
    } else if (reason === "pedido-demissao") {
      if (notice === "nao-cumprido") {
        noticeValue = -salary;
      }
    } else if (reason === "acordo") {
      if (notice === "indenizado") {
        noticeValue = salary / 30 * noticeDays / 2;
      }
    }
    let months13th = end.getMonth() + (end.getDate() >= 15 ? 1 : 0);
    if (notice === "indenizado" && reason === "sem-justa-causa") {
      const projectedEnd = new Date(end);
      projectedEnd.setDate(end.getDate() + noticeDays);
      months13th = projectedEnd.getMonth() + (projectedEnd.getDate() >= 15 ? 1 : 0);
      const startYear = start.getFullYear();
      const endYear = end.getFullYear();
      if (startYear === endYear) {
        months13th = months13th - start.getMonth();
      }
    }
    months13th = Math.min(months13th, 12);
    let thirteenth = 0;
    if (reason !== "justa-causa") {
      thirteenth = salary / 12 * months13th;
    }
    let vacationProportional = 0;
    let vacationDue = 0;
    let vacationThird = 0;
    if (reason !== "justa-causa") {
      let vacationMonths = monthsWorked % 12;
      if (notice === "indenizado" && reason === "sem-justa-causa") {
        vacationMonths += 1;
      }
      vacationProportional = salary / 12 * vacationMonths;
      if (hasVacationDue) {
        vacationDue = salary;
      }
      vacationThird = (vacationProportional + vacationDue) / 3;
    } else {
      if (hasVacationDue) {
        vacationDue = salary;
        vacationThird = vacationDue / 3;
      }
    }
    let fgtsFine = 0;
    if (reason === "sem-justa-causa") {
      fgtsFine = fgtsBalance * 0.4;
    } else if (reason === "acordo") {
      fgtsFine = fgtsBalance * 0.2;
    }
    const total = salaryBalance + noticeValue + thirteenth + vacationProportional + vacationDue + vacationThird + fgtsFine;
    setResult({
      salaryBalance,
      noticeValue,
      thirteenth,
      vacationProportional,
      vacationDue,
      vacationThird,
      fgtsFine,
      total
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Rescisão Trabalhista FinZap",
    "description": "Simule o valor da sua rescisão trabalhista CLT. Calcule saldo de salário, férias, 13º, aviso prévio e multa do FGTS.",
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
        title: "Calculadora de Rescisão Trabalhista CLT - Simulação Completa",
        description: "Simule o valor da sua rescisão trabalhista CLT. Calcule saldo de salário, férias, 13º, aviso prévio e multa do FGTS.",
        canonical: "/calculadoras/rescisao"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": TERMINATION_FAQS.map((faq) => ({
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
          { label: "Rescisão Trabalhista", href: "/calculadoras/rescisao" }
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
                /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Direitos Trabalhistas" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Rescisão CLT" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Simule sua rescisão trabalhista e entenda todos os seus direitos com orientações detalhadas." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Dados do Contrato"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "salary",
                        type: "number",
                        placeholder: "Ex: 3000",
                        value: salary || "",
                        onChange: (e) => setSalary(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "startDate", className: "block text-sm text-gray-400 mb-2", children: "Data de Admissão" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "startDate",
                        type: "date",
                        value: startDate,
                        onChange: (e) => setStartDate(e.target.value),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "endDate", className: "block text-sm text-gray-400 mb-2", children: "Data de Demissão" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "endDate",
                        type: "date",
                        value: endDate,
                        onChange: (e) => setEndDate(e.target.value),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "reason", className: "block text-sm text-gray-400 mb-2", children: "Motivo da Saída" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "reason",
                      value: reason,
                      onChange: (e) => setReason(e.target.value),
                      className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "sem-justa-causa", children: "Demissão sem Justa Causa" }),
                        /* @__PURE__ */ jsx("option", { value: "pedido-demissao", children: "Pedido de Demissão" }),
                        /* @__PURE__ */ jsx("option", { value: "justa-causa", children: "Demissão por Justa Causa" }),
                        /* @__PURE__ */ jsx("option", { value: "acordo", children: "Acordo entre as Partes" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "notice", className: "block text-sm text-gray-400 mb-2", children: "Aviso Prévio" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "notice",
                      value: notice,
                      onChange: (e) => setNotice(e.target.value),
                      className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "trabalhado", children: "Trabalhado" }),
                        /* @__PURE__ */ jsx("option", { value: "indenizado", children: "Indenizado" }),
                        /* @__PURE__ */ jsx("option", { value: "nao-cumprido", children: "Não Cumprido (Desconto)" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Tem Férias Vencidas?" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setHasVacationDue(!hasVacationDue),
                      "aria-label": "Alternar férias vencidas",
                      className: `w-12 h-6 rounded-full transition-colors relative ${hasVacationDue ? "bg-primary" : "bg-white/10"}`,
                      children: /* @__PURE__ */ jsx("div", { className: `absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${hasVacationDue ? "left-7" : "left-1"}` })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "fgtsBalance", className: "block text-sm text-gray-400 mb-2", children: "Saldo FGTS (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "fgtsBalance",
                        type: "number",
                        placeholder: "Ex: 5000",
                        value: fgtsBalance || "",
                        onChange: (e) => setFgtsBalance(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateTermination,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSalary(0);
                        setStartDate("");
                        setEndDate("");
                        setFgtsBalance(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Estimativa de Rescisão" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.total) }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "*Valores estimados, sujeitos a descontos de INSS e IRRF." })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Saldo de Salário" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.salaryBalance) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Aviso Prévio" }),
                        /* @__PURE__ */ jsx("span", { className: result.noticeValue < 0 ? "text-red-400 font-bold" : "text-white font-bold", children: formatCurrency(result.noticeValue) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "13º Salário Proporcional" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.thirteenth) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Férias (Vencidas + Prop. + 1/3)" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.vacationProportional + result.vacationDue + result.vacationThird) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Multa FGTS" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.fgtsFine) })
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados do contrato para simular a rescisão" })
              ] }) })
            ] }) })
          ]
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
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "O Que é a Rescisão Trabalhista?" }),
              /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "A rescisão trabalhista ocorre quando há o encerramento do vínculo empregatício entre o empregado e o empregador. Esse processo pode acontecer por diferentes motivos, como demissão sem justa causa, pedido de demissão, acordo entre as partes ou término de contrato." }),
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Durante a rescisão, é necessário calcular corretamente os valores devidos ao trabalhador, que incluem direitos como saldo de salário, férias proporcionais, 13º salário proporcional, entre outros benefícios garantidos pela CLT." }),
                /* @__PURE__ */ jsx("div", { className: "bg-yellow-500/10 border-l-4 border-yellow-500 p-4 my-6", children: /* @__PURE__ */ jsxs("p", { className: "text-yellow-200 text-sm m-0", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Nota legal:" }),
                  " A calculadora de rescisão disponibilizada nesta página tem fins meramente informativos e não substitui o cálculo oficial ou suporte jurídico. Sempre consulte um especialista para confirmar os valores em situações específicas."
                ] }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Tipos de Rescisão e Como Afetam o Cálculo" }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "Demissão sem Justa Causa" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "O tipo mais vantajoso para o trabalhador." }),
                  /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-400 text-sm space-y-2", children: [
                    /* @__PURE__ */ jsx("li", { children: "Saldo de salário" }),
                    /* @__PURE__ */ jsx("li", { children: "Férias vencidas e proporcionais + 1/3" }),
                    /* @__PURE__ */ jsx("li", { children: "13º salário proporcional" }),
                    /* @__PURE__ */ jsx("li", { children: "Multa de 40% do FGTS" }),
                    /* @__PURE__ */ jsx("li", { children: "Saque do FGTS e Seguro-Desemprego" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-blue-400", children: "Pedido de Demissão" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Iniciativa do trabalhador." }),
                  /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-400 text-sm space-y-2", children: [
                    /* @__PURE__ */ jsx("li", { children: "Saldo de salário" }),
                    /* @__PURE__ */ jsx("li", { children: "Férias vencidas e proporcionais + 1/3" }),
                    /* @__PURE__ */ jsx("li", { children: "13º salário proporcional" }),
                    /* @__PURE__ */ jsx("li", { children: "Sem multa do FGTS e sem saque" }),
                    /* @__PURE__ */ jsx("li", { children: "Sem Seguro-Desemprego" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-red-400", children: "Demissão por Justa Causa" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Falta grave cometida pelo empregado." }),
                  /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-400 text-sm space-y-2", children: [
                    /* @__PURE__ */ jsx("li", { children: "Saldo de salário" }),
                    /* @__PURE__ */ jsx("li", { children: "Férias vencidas + 1/3 (apenas)" }),
                    /* @__PURE__ */ jsx("li", { children: "Sem 13º e sem férias proporcionais" }),
                    /* @__PURE__ */ jsx("li", { children: "Sem FGTS e sem Seguro" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-purple-400", children: "Acordo (Reforma Trabalhista)" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Consensual entre as partes." }),
                  /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-400 text-sm space-y-2", children: [
                    /* @__PURE__ */ jsx("li", { children: "Verbas trabalhistas integrais" }),
                    /* @__PURE__ */ jsx("li", { children: "Metade do aviso prévio (se indenizado)" }),
                    /* @__PURE__ */ jsx("li", { children: "Multa de 20% do FGTS" }),
                    /* @__PURE__ */ jsx("li", { children: "Saque de 80% do FGTS" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Itens do Cálculo" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Aviso Prévio" }),
                  /* @__PURE__ */ jsx("p", { children: "Pode ser trabalhado (recebe salário normal) ou indenizado (recebe sem trabalhar). O período varia de 30 a 90 dias, dependendo do tempo de casa (3 dias a mais por ano)." })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Férias e 1/3" }),
                  /* @__PURE__ */ jsx("p", { children: "Inclui férias vencidas (não tiradas) e proporcionais (meses trabalhados no ano atual), sempre com o acréscimo de 1/3 constitucional." })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "13º Salário Proporcional" }),
                  /* @__PURE__ */ jsx("p", { children: "Calculado com base nos meses trabalhados no ano (fração de 1/12 por mês com mais de 14 dias trabalhados)." })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Multa do FGTS" }),
                  /* @__PURE__ */ jsx("p", { children: "40% sobre o saldo total depositado pela empresa durante o contrato (em demissão sem justa causa)." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              FAQ,
              {
                items: TERMINATION_FAQS,
                title: "Dúvidas Frequentes sobre Rescisão",
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
  TerminationPage
};
