import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Briefcase, Calculator, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-C9Svc77H.js";
import { AppPromoBanner } from "./AppPromoBanner-BwQOrylZ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const TERMINATION_FAQS = [
  {
    question: "O que é aviso prévio indenizado?",
    answer: "É quando a empresa decide desligar o funcionário imediatamente, sem que ele precise trabalhar os 30 dias do aviso. Nesse caso, a empresa paga o salário correspondente a esse mês."
  },
  {
    question: "Tenho direito a multa de 40% do FGTS?",
    answer: "Sim, se a demissão for sem justa causa. A empresa deve pagar uma multa de 40% sobre todo o valor depositado no seu FGTS durante o contrato."
  },
  {
    question: "Como funciona o 13º proporcional?",
    answer: "Você recebe 1/12 do seu salário para cada mês trabalhado no ano (considerando fração igual ou superior a 15 dias)."
  }
];
function TerminationPage() {
  var _a, _b, _c, _d, _e;
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("sem_justa_causa");
  const [notice, setNotice] = useState("trabalhado");
  const [balanceFGTS, setBalanceFGTS] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const fgts = parseFloat(balanceFGTS.replace(/\./g, "").replace(",", ".") || "0");
    if (isNaN(sal) || !startDate || !endDate) {
      setResult(null);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthsWorked = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    let total = 0;
    const breakdown = {};
    const daysInMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
    const daysWorkedInLastMonth = end.getDate();
    breakdown.salaryBalance = sal / daysInMonth * daysWorkedInLastMonth;
    total += breakdown.salaryBalance;
    const vacationMonths = monthsWorked % 12;
    breakdown.vacationProportional = sal / 12 * vacationMonths;
    breakdown.vacationThird = breakdown.vacationProportional / 3;
    total += breakdown.vacationProportional + breakdown.vacationThird;
    const monthsInCurrentYear = end.getMonth() + 1;
    breakdown.thirteenthProportional = sal / 12 * monthsInCurrentYear;
    total += breakdown.thirteenthProportional;
    if (reason === "sem_justa_causa" && notice === "indenizado") {
      const years = Math.floor(monthsWorked / 12);
      const noticeDays = 30 + years * 3;
      breakdown.noticeIndemnified = sal / 30 * noticeDays;
      total += breakdown.noticeIndemnified;
    }
    if (reason === "sem_justa_causa") {
      breakdown.fgtsFine = fgts * 0.4;
      total += breakdown.fgtsFine;
    }
    setResult({ total, breakdown });
  };
  useEffect(() => {
    calculate();
  }, [salary, startDate, endDate, reason, notice, balanceFGTS]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Rescisão CLT",
    "description": "Simule o valor da sua rescisão de contrato de trabalho CLT. Cálculo completo com férias, 13º, aviso prévio e multa do FGTS.",
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
        title: "Calculadora de Rescisão CLT - Simule seu Acerto",
        description: "Foi demitido ou pediu demissão? Calcule o valor exato da sua rescisão, incluindo férias, 13º salário, aviso prévio e multa de 40% do FGTS.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Rescisão CLT", href: "/calculadoras/rescisao" }
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
                /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "Rescisão" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto hidden" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 min-h-[600px]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Calcular Acerto"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Último Salário Bruto" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: salary,
                        onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data de Admissão" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        value: startDate,
                        onChange: (e) => setStartDate(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data de Afastamento" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        value: endDate,
                        onChange: (e) => setEndDate(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Motivo da Rescisão" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: reason,
                        onChange: (e) => setReason(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "sem_justa_causa", children: "Demissão sem Justa Causa" }),
                          /* @__PURE__ */ jsx("option", { value: "pedido_demissao", children: "Pedido de Demissão" }),
                          /* @__PURE__ */ jsx("option", { value: "com_justa_causa", children: "Demissão por Justa Causa" }),
                          /* @__PURE__ */ jsx("option", { value: "acordo", children: "Acordo (Comum Acordo)" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Aviso Prévio" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: notice,
                        onChange: (e) => setNotice(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "trabalhado", children: "Trabalhado" }),
                          /* @__PURE__ */ jsx("option", { value: "indenizado", children: "Indenizado" }),
                          /* @__PURE__ */ jsx("option", { value: "nao_cumprido", children: "Não Cumprido (Descontado)" })
                        ]
                      }
                    )
                  ] })
                ] }),
                reason === "sem_justa_causa" && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Saldo do FGTS (para multa)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: balanceFGTS,
                        onChange: (e) => handleCurrencyInput(e.target.value, setBalanceFGTS),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Total Estimado a Receber" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  result && result.breakdown && /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                      /* @__PURE__ */ jsx("span", { children: "Saldo de Salário" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "R$ ",
                        (_a = result.breakdown.salaryBalance) == null ? void 0 : _a.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                      /* @__PURE__ */ jsx("span", { children: "Férias Proporcionais + 1/3" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "R$ ",
                        (_b = result.breakdown.vacationProportional + result.breakdown.vacationThird) == null ? void 0 : _b.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                      /* @__PURE__ */ jsx("span", { children: "13º Proporcional" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "R$ ",
                        (_c = result.breakdown.thirteenthProportional) == null ? void 0 : _c.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.noticeIndemnified > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                      /* @__PURE__ */ jsx("span", { children: "Aviso Prévio Indenizado" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "R$ ",
                        (_d = result.breakdown.noticeIndemnified) == null ? void 0 : _d.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.fgtsFine > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                      /* @__PURE__ */ jsx("span", { children: "Multa 40% FGTS" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "R$ ",
                        (_e = result.breakdown.fgtsFine) == null ? void 0 : _e.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      ] })
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
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-blue-500" }),
                "Importante"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "O cálculo de rescisão é complexo e pode variar dependendo da convenção coletiva da sua categoria." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Homologação" }),
                  "Sempre confira os valores no momento da homologação. Se tiver dúvidas, consulte o sindicato da sua categoria ou um advogado trabalhista."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Simule seus direitos trabalhistas. Saiba quanto receber ao sair da empresa." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: TERMINATION_FAQS,
          title: "Dúvidas sobre Rescisão",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  TerminationPage
};
//# sourceMappingURL=TerminationPage-BTdCXnqO.js.map
