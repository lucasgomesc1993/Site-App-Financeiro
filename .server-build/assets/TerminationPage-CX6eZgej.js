import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Briefcase, Calculator, Calendar, AlertCircle, CheckCircle, FileText, DollarSign, XCircle, Clock } from "lucide-react";
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
import "framer-motion";
const TERMINATION_FAQS = [
  {
    question: "Quanto tempo a empresa tem para pagar a rescisão?",
    answer: "A empresa tem 10 dias corridos contados a partir do último dia de contrato para pagar as verbas e liberar as guias. Se o 10º dia cair em fim de semana ou feriado, o ideal é antecipar para o dia útil anterior."
  },
  {
    question: "Quem pede demissão tem direito ao FGTS?",
    answer: "Não. Ao pedir demissão, o saldo do Fundo de Garantia fica retido (inativo) e não há pagamento da multa de 40%. O saque só será permitido após 3 anos sem registro em carteira ou para compra da casa própria/aposentadoria."
  },
  {
    question: "O aviso prévio conta como tempo de serviço?",
    answer: "Sim. O período do aviso, mesmo indenizado, projeta o contrato para o futuro. Isso garante mais dias de férias proporcionais e mais avos de 13º salário na conta final."
  },
  {
    question: "Como é calculado o desconto do INSS na rescisão?",
    answer: "O desconto segue a tabela progressiva do INSS vigente em 2025 (alíquotas de 7,5% a 14%). O imposto é calculado separadamente sobre o saldo de salário e sobre o 13º salário. Verbas de natureza indenizatória, como férias indenizadas e aviso prévio indenizado, são isentas dessa contribuição."
  },
  {
    question: "O que fazer se o valor da rescisão estiver errado?",
    answer: "Não assine o termo de quitação plena. Se for obrigado a assinar para receber, faça uma ressalva por escrito no próprio documento indicando os valores discordantes. Procure o sindicato ou o Ministério do Trabalho para exigir as diferenças."
  }
];
function TerminationPage() {
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("sem_justa_causa");
  const [balanceFGTS, setBalanceFGTS] = useState("");
  const [hasExpiredVacation, setHasExpiredVacation] = useState(false);
  const [result, setResult] = useState(null);
  const INSS_TABLE = [
    { max: 1412, rate: 0.075, deduction: 0 },
    { max: 2666.68, rate: 0.09, deduction: 21.18 },
    { max: 4000.03, rate: 0.12, deduction: 101.18 },
    { max: 7786.02, rate: 0.14, deduction: 181.18 }
  ];
  const IRRF_TABLE = [
    { max: 2259.2, rate: 0, deduction: 0 },
    { max: 2826.65, rate: 0.075, deduction: 169.44 },
    { max: 3751.05, rate: 0.15, deduction: 381.44 },
    { max: 4664.68, rate: 0.225, deduction: 662.77 },
    { max: Infinity, rate: 0.275, deduction: 896 }
  ];
  const calculateINSS = (value) => {
    let discount = 0;
    let taxableValue = value;
    if (taxableValue > 7786.02) taxableValue = 7786.02;
    for (let i = 0; i < INSS_TABLE.length; i++) {
      const range = INSS_TABLE[i];
      const prevMax = i === 0 ? 0 : INSS_TABLE[i - 1].max;
      if (taxableValue > prevMax) {
        const base = Math.min(taxableValue, range.max) - prevMax;
        discount += base * range.rate;
      }
    }
    return discount;
  };
  const calculateIRRF = (value, dependents = 0) => {
    const deductionPerDependent = 189.59;
    const taxableBase = value - dependents * deductionPerDependent;
    for (const range of IRRF_TABLE) {
      if (taxableBase <= range.max) {
        return taxableBase * range.rate - range.deduction;
      }
    }
    return 0;
  };
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const fgts = parseFloat(balanceFGTS.replace(/\./g, "").replace(",", ".") || "0");
    if (isNaN(sal) || !startDate || !endDate) {
      setResult(null);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      setResult(null);
      return;
    }
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    const yearsWorked = Math.floor(diffDays / 365);
    const monthsWorkedTotal = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    let totalGross = 0;
    let totalDiscounts = 0;
    const breakdown = {};
    new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
    const lastDay = end.getDate();
    if (lastDay === 31 || end.getMonth() === 1 && lastDay >= 28) breakdown.salaryBalance = sal;
    else breakdown.salaryBalance = sal / 30 * lastDay;
    totalGross += breakdown.salaryBalance;
    const inssSalary = calculateINSS(breakdown.salaryBalance);
    breakdown.inssSalary = inssSalary;
    totalDiscounts += inssSalary;
    const irrfSalaryBase = breakdown.salaryBalance - inssSalary;
    const irrfSalary = Math.max(0, calculateIRRF(irrfSalaryBase));
    breakdown.irrfSalary = irrfSalary;
    totalDiscounts += irrfSalary;
    let noticeDays = 30;
    if (yearsWorked >= 1) noticeDays += yearsWorked * 3;
    if (noticeDays > 90) noticeDays = 90;
    if (reason === "sem_justa_causa") {
      breakdown.noticeIndemnified = sal / 30 * noticeDays;
      totalGross += breakdown.noticeIndemnified;
    } else if (reason === "acordo") {
      breakdown.noticeIndemnified = sal / 30 * noticeDays / 2;
      totalGross += breakdown.noticeIndemnified;
    }
    const currentPeriodMonths = monthsWorkedTotal % 12;
    const accruedVacation = sal / 12 * currentPeriodMonths;
    const vacationThird = accruedVacation / 3;
    breakdown.vacationProportional = accruedVacation;
    breakdown.vacationThird = vacationThird;
    if (hasExpiredVacation) {
      breakdown.vacationExpired = sal;
      breakdown.vacationExpiredThird = sal / 3;
    } else {
      breakdown.vacationExpired = 0;
      breakdown.vacationExpiredThird = 0;
    }
    if (reason !== "justa_causa") {
      totalGross += breakdown.vacationProportional + breakdown.vacationThird + breakdown.vacationExpired + breakdown.vacationExpiredThird;
    }
    let monthsInYear = end.getMonth() + 1;
    if (end.getDate() < 15) monthsInYear -= 1;
    const thirteenth = sal / 12 * monthsInYear;
    breakdown.thirteenthProportional = thirteenth;
    if (reason !== "justa_causa") {
      totalGross += breakdown.thirteenthProportional;
      const inss13 = calculateINSS(thirteenth);
      breakdown.inss13 = inss13;
      totalDiscounts += inss13;
      const irrf13Base = thirteenth - inss13;
      const irrf13 = Math.max(0, calculateIRRF(irrf13Base));
      breakdown.irrf13 = irrf13;
      totalDiscounts += irrf13;
    }
    if (reason === "sem_justa_causa") {
      breakdown.fgtsFine = fgts * 0.4;
      totalGross += breakdown.fgtsFine;
    } else if (reason === "acordo") {
      breakdown.fgtsFine = fgts * 0.2;
      totalGross += breakdown.fgtsFine;
    }
    const totalNet = totalGross - totalDiscounts;
    setResult({ totalGross, totalNet, totalDiscounts, breakdown });
  };
  useEffect(() => {
    calculate();
  }, [salary, startDate, endDate, reason, balanceFGTS, hasExpiredVacation]);
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
    "name": "Calculadora de Rescisão de Contrato CLT 2025: Cálculo Exato e Direitos",
    "url": "https://www.junny.com.br/calculadoras/rescisao",
    "description": "Calcule sua rescisão trabalhista em segundos. Descubra o valor exato de saldo de salário, férias, 13º, multa do FGTS e descontos oficiais de 2025.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
    "featureList": [
      "Cálculo de Rescisão CLT 2025",
      "Simulação de Multa do FGTS (40%)",
      "Cálculo de Férias e 13º Proporcionais",
      "Aviso Prévio Indenizado",
      "Cálculo de Descontos INSS e IRRF"
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
        title: "Calculadora de Rescisão de Contrato CLT 2025: Cálculo Exato e Direitos",
        description: "Calcule sua rescisão trabalhista em segundos. Descubra o valor exato de saldo de salário, férias, 13º, multa do FGTS e descontos oficiais de 2025.",
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
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Atualizado para 2025" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de Rescisão ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "Contrato CLT (2025)" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mt-2 max-w-2xl mx-auto", children: "Descubra o valor exato de saldo de salário, férias, 13º e multa do FGTS. Ferramenta ajustada com as novas regras trabalhistas." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
            "Simular Rescisão"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 w-full", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "startDate", className: "text-sm text-gray-400", children: "Data de Admissão" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "startDate",
                      type: "date",
                      value: startDate,
                      onChange: (e) => setStartDate(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                    }
                  ),
                  /* @__PURE__ */ jsx(Calendar, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "endDate", className: "text-sm text-gray-400", children: "Data de Afastamento" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "endDate",
                      type: "date",
                      value: endDate,
                      onChange: (e) => setEndDate(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                    }
                  ),
                  /* @__PURE__ */ jsx(Calendar, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "text-sm text-gray-400", children: "Salário Bruto" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "salary",
                      type: "text",
                      inputMode: "decimal",
                      value: salary,
                      onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                      placeholder: "0,00"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "reason", className: "text-sm text-gray-400", children: "Motivo" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "reason",
                      value: reason,
                      onChange: (e) => setReason(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "sem_justa_causa", children: "Sem Justa Causa" }),
                        /* @__PURE__ */ jsx("option", { value: "pedido_demissao", children: "Pedido de Demissão" }),
                        /* @__PURE__ */ jsx("option", { value: "com_justa_causa", children: "Justa Causa" }),
                        /* @__PURE__ */ jsx("option", { value: "acordo", children: "Acordo (Comum Acordo)" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(AlertCircle, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors", onClick: () => setHasExpiredVacation(!hasExpiredVacation), children: [
              /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border flex items-center justify-center transition-all ${hasExpiredVacation ? "bg-blue-500 border-blue-500" : "border-gray-500"}`, children: hasExpiredVacation && /* @__PURE__ */ jsx(CheckCircle, { className: "w-3.5 h-3.5 text-white" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Possui férias vencidas (1 ano)?" })
            ] }),
            (reason === "sem_justa_causa" || reason === "acordo") && /* @__PURE__ */ jsxs("div", { className: "space-y-2 animate-in fade-in slide-in-from-top-2 duration-300", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "balanceFGTS", className: "text-sm text-gray-400", children: "Saldo do FGTS (para multa)" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "balanceFGTS",
                    type: "text",
                    inputMode: "decimal",
                    value: balanceFGTS,
                    onChange: (e) => handleCurrencyInput(e.target.value, setBalanceFGTS),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "0,00"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Informe o saldo total acumulado para cálculo correto da multa." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor Líquido Estimado" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.totalNet.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "R$ 0,00" }),
                result && /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4 mt-3 text-xs", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
                    "Bruto: R$ ",
                    result.totalGross.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
                    "Descontos: R$ ",
                    result.totalDiscounts.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] })
              ] }),
              result && result.breakdown && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 text-sm", children: [
                result.breakdown.salaryBalance > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Saldo de Salário" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                    "R$ ",
                    result.breakdown.salaryBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.breakdown.inssSalary > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 pl-6 text-xs rounded-lg text-red-400", children: [
                  /* @__PURE__ */ jsx("span", { children: "- INSS (Sobre Salário)" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "R$ ",
                    result.breakdown.inssSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.breakdown.irrfSalary > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 pl-6 text-xs rounded-lg text-red-400", children: [
                  /* @__PURE__ */ jsx("span", { children: "- IRRF (Sobre Salário)" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "R$ ",
                    result.breakdown.irrfSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.breakdown.vacationProportional > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Férias + 1/3 (Prop)" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                    "R$ ",
                    (result.breakdown.vacationProportional + result.breakdown.vacationThird).toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.breakdown.vacationExpired > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Férias Vencidas + 1/3" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                    "R$ ",
                    (result.breakdown.vacationExpired + result.breakdown.vacationExpiredThird).toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.breakdown.thirteenthProportional > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "13º Salário Prop." }),
                  /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                    "R$ ",
                    result.breakdown.thirteenthProportional.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.breakdown.inss13 > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 pl-6 text-xs rounded-lg text-red-400", children: [
                  /* @__PURE__ */ jsx("span", { children: "- INSS (Sobre 13º)" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "R$ ",
                    result.breakdown.inss13.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.breakdown.irrf13 > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 pl-6 text-xs rounded-lg text-red-400", children: [
                  /* @__PURE__ */ jsx("span", { children: "- IRRF (Sobre 13º)" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "R$ ",
                    result.breakdown.irrf13.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.breakdown.noticeIndemnified > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Aviso Prévio Indenizado" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                    "R$ ",
                    result.breakdown.noticeIndemnified.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.breakdown.fgtsFine > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Multa FGTS" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                    "R$ ",
                    result.breakdown.fgtsFine.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-500" }),
              "O que é TRCT?"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 leading-relaxed mb-4", children: [
              "O ",
              /* @__PURE__ */ jsx("strong", { children: "TRCT (Termo de Rescisão do Contrato de Trabalho)" }),
              " é o documento oficial obrigatório que formaliza o fim do contrato. Nele, a empresa deve discriminar cada centavo pago e cada desconto realizado, servindo como comprovante legal para o saque do FGTS e solicitação do Seguro-Desemprego."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Como usar a Calculadora" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold", children: "1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Informe o período:" }),
                  " Preencha a data de admissão e o último dia trabalhado."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold", children: "2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Insira o Salário:" }),
                  " Use o valor bruto registrado em carteira."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold", children: "3" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Escolha o Motivo:" }),
                  " O tipo de demissão muda totalmente seus direitos."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-2 rounded-lg shrink-0", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-blue-500" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white leading-tight mt-1", children: "Exemplo Prático" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsx("p", { children: "Trabalhador com R$ 2.000,00, demitido após 1 ano e 6 meses:" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-4 space-y-1 marker:text-blue-500", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Aviso Prévio (33 dias):" }),
                  " R$ 2.200,00"
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "13º Prop. (6/12):" }),
                  " R$ 1.000,00"
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Férias Prop. + 1/3:" }),
                  " R$ 1.333,33"
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Multa FGTS:" }),
                  " R$ 1.152,00"
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "pt-2 text-white font-bold", children: "Total Bruto: R$ 6.351,99" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "O que entra no cálculo da rescisão?" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-8 max-w-3xl", children: [
          "O valor final não se baseia apenas no seu salário nominal. Para chegar ao montante correto, é necessário calcular a média de variáveis recebidas nos últimos 12 meses, como ",
          /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "text-blue-400 hover:text-blue-300 hover:underline", children: "horas extras" }),
          " habituais e comissões."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Saldo de Salário" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
              "Pagamento proporcional aos dias trabalhados no mês da saída. Confira nossa calculadora de ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-blue-400 hover:underline", children: "salário líquido" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Aviso Prévio" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Indenizado ou trabalhado. A cada ano de serviço completo, somam-se 3 dias ao aviso (Lei 12.506/11)." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "13º Proporcional" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
              "1/12 da remuneração para cada mês trabalhado (fração igual ou superior a 15 dias). Simule no ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/decimo-terceiro", className: "text-blue-400 hover:underline", children: "décimo terceiro" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Férias + 1/3" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Valor integral das férias vencidas (se houver) + proporcional do ano corrente, ambos com terço constitucional." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Multa do FGTS" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
              "40% sobre o saldo total depositado para demissões sem justa causa. Veja ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/fgts", className: "text-blue-400 hover:underline", children: "calculadora FGTS" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Médias Salariais" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
              "Valores referentes a ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/adicional-noturno", className: "text-blue-400 hover:underline", children: "adicional noturno" }),
              ", periculosidade ou insalubridade integram a base."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-6 items-start", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-yellow-500 shrink-0" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-yellow-200 mb-3", children: "Atenção aos Descontos Oficiais" }),
          /* @__PURE__ */ jsxs("p", { className: "text-yellow-100/80 mb-4 leading-relaxed", children: [
            "Não conte com o valor bruto! A empresa é obrigada a deduzir ",
            /* @__PURE__ */ jsx("strong", { children: "INSS e IRRF" }),
            " conforme tabelas progressivas de 2025. Além disso, serão descontados adiantamentos, vale-transporte não utilizado e, se houver, saldo de empréstimo consignado (até o limite legal de 30-35%)."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Tipos de Demissão e Seus Direitos" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
            /* @__PURE__ */ jsx("th", { className: "p-3 text-white min-w-[150px]", children: "Direito" }),
            /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-center min-w-[120px]", children: "Sem Justa Causa" }),
            /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-center min-w-[120px]", children: "Pedido de Demissão" }),
            /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-center min-w-[120px]", children: "Justa Causa" }),
            /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-center min-w-[120px]", children: "Comum Acordo" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
            /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 bg-blue-500/5", children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Saldo de Salário" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) })
            ] }),
            /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Férias Vencidas + 1/3" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) })
            ] }),
            /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Férias Proporc. + 1/3" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) })
            ] }),
            /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "13º Proporcional" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) })
            ] }),
            /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Aviso Prévio" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center text-xs", children: "Indenizado/Trab." }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center text-xs", children: "50% (se indenizado)" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Multa FGTS" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-blue-400", children: "40%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-blue-400", children: "20%" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Saque FGTS" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-500 mx-auto" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-blue-400", children: "80%" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Prazo de Pagamento da Rescisão em 2025" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
          "Conforme o artigo 477 da CLT, a empresa tem até ",
          /* @__PURE__ */ jsx("strong", { children: "10 dias corridos" }),
          " após o término do contrato para realizar o pagamento. Esse prazo é único para qualquer tipo de aviso prévio. Além do depósito, a empresa deve realizar a ",
          /* @__PURE__ */ jsx("strong", { children: "Baixa na CTPS Digital" }),
          " e liberar as guias."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-4 items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "⚠️" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-red-200", children: [
            /* @__PURE__ */ jsx("strong", { children: "Atrasou?" }),
            " O não pagamento no prazo gera multa a favor do funcionário no valor de um salário nominal completo."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: TERMINATION_FAQS,
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
  TerminationPage
};
//# sourceMappingURL=TerminationPage-CX6eZgej.js.map
