import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Briefcase, Calculator, Calendar, AlertCircle, CheckCircle, FileText, Clock, Percent, DollarSign, HelpCircle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
const TERMINATION_FAQS = [
  {
    question: "Qual o prazo para pagamento da rescisão em 2025?",
    answer: "O prazo é unificado para todos os tipos de aviso: a empresa deve pagar as verbas em até 10 dias corridos após o término do contrato. Se o pagamento atrasar, o empregador deve pagar uma multa equivalente a um salário nominal do trabalhador (Art. 477 da CLT)."
  },
  {
    question: "A multa de 40% do FGTS é sobre o saldo atual ou total?",
    answer: "A multa de 40% é calculada sobre o saldo total histórico de depósitos feitos durante todo o contrato, corrigidos monetariamente. Mesmo que você tenha zerado a conta com o Saque-Aniversário, o cálculo considera o histórico global."
  },
  {
    question: "Qual o desconto máximo de INSS na rescisão?",
    answer: "Sim, existe um limite. Para quem ganha acima de R$ 8.157,41, o desconto do INSS trava no teto fixo (R$ 951,63 em 2025). Independentemente se o salário for maior, a contribuição não ultrapassará esse valor."
  },
  {
    question: "Como funciona o desconto do Imposto de Renda na rescisão?",
    answer: "O IRRF incide apenas sobre verbas de natureza salarial (saldo de salário, 13º). Verbas indenizatórias — como aviso prévio indenizado, férias indenizadas e multa do FGTS — são <strong>totalmente isentas</strong> de IRRF. É fundamental verificar a base de cálculo para não pagar imposto indevido. Verifique o impacto com a <a href='/calculadoras/salario-liquido'>calculadora de salário líquido</a>."
  },
  {
    question: "O novo salário mínimo de R$ 1.518 afeta minha rescisão?",
    answer: "Sim. Se sua remuneração base segue o piso nacional, o cálculo deve considerar o novo salário mínimo de R$ 1.518,00 vigente em dezembro de 2025. Isso impacta saldo de salário e aviso prévio."
  },
  {
    question: "Tenho direito a férias proporcionais se tiver faltas?",
    answer: "As faltas injustificadas impactam o período aquisitivo. Até 5 faltas, o direito se mantém integral (30 dias). Entre 6 e 14 faltas, cai para 24 dias. Mais de 32 faltas injustificadas retiram o direito às férias. Consulte a <a href='/calculadoras/ferias'>calculadora de férias</a>."
  },
  {
    question: "Como calcular a rescisão por falecimento?",
    answer: "O cálculo assemelha-se ao pedido de demissão, mas sem aviso prévio. Os herdeiros recebem saldo de salário, 13º e férias. O saque do FGTS é imediato para dependentes e não há multa de 40%."
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
    { max: 1518, rate: 0.075, deduction: 0 },
    { max: 2793.88, rate: 0.09, deduction: 22.77 },
    { max: 4190.83, rate: 0.12, deduction: 106.59 },
    { max: 8157.41, rate: 0.14, deduction: 190.4 }
  ];
  const IRRF_TABLE = [
    { max: 2428.8, rate: 0, deduction: 0 },
    { max: 2826.65, rate: 0.075, deduction: 182.16 },
    { max: 3751.05, rate: 0.15, deduction: 394.16 },
    { max: 4664.68, rate: 0.225, deduction: 675.49 },
    { max: Infinity, rate: 0.275, deduction: 908.73 }
  ];
  const calculateINSS = (value) => {
    let discount = 0;
    let taxableValue = value;
    if (taxableValue > 8157.41) taxableValue = 8157.41;
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
  const calculateIRRF = (grossValue, inssValue, dependents = 0) => {
    const deductionPerDependent = 189.59;
    const simplifiedDiscount = 607.2;
    const legalDeduction = inssValue + dependents * deductionPerDependent;
    const effectiveDeduction = Math.max(legalDeduction, simplifiedDiscount);
    const taxableBase = grossValue - effectiveDeduction;
    if (taxableBase <= 0) return 0;
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
    const irrfSalary = Math.max(0, calculateIRRF(breakdown.salaryBalance, inssSalary));
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
      const irrf13 = Math.max(0, calculateIRRF(thirteenth, inss13));
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
    "name": "Calculadora de Rescisão 2025: Cálculo Exato CLT com Novas Regras",
    "url": "https://www.junny.com.br/calculadoras/rescisao",
    "description": "Use nossa Calculadora de Rescisão para simular regras de Dez/2025. Inclui aviso prévio, multa 40% FGTS e descontos INSS/IRRF. Resultado imediato.",
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
        title: "Calculadora de Rescisão 2025: Cálculo Exato CLT",
        description: "Use nossa Calculadora de Rescisão para simular regras de Dez/2025. Inclui aviso prévio, multa 40% FGTS e descontos INSS/IRRF. Resultado imediato.",
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
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "2025: Guia Completo e Atualizado (CLT)" })
          ] })
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
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:bg-transparent"
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
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:bg-transparent"
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
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-500" }),
            "Resumo Rápido (Dados Oficiais Dezembro/2025)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Salário Mínimo Base" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 1.518,00" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Referência para pisos e seguro-desemprego" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Teto do INSS" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 8.157,41" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Limite máximo de desconto" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Prazo de Pagamento:" }),
                  " Até 10 dias corridos após o término do contrato."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Percent, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Multa do FGTS:" }),
                  " 40% sobre o saldo total histórico (não apenas o saldo atual)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Isenção de IRRF:" }),
                  " Rendimentos até R$ 2.428,80 estão isentos."
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500", children: /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-300 leading-relaxed", children: [
        "O cálculo da rescisão trabalhista é a etapa final e mais crítica da relação de emprego. Esta ",
        /* @__PURE__ */ jsx("strong", { children: "calculadora de rescisão" }),
        " não apenas soma seus direitos, mas aplica as regras tributárias vigentes em dezembro de 2025, considerando a progressividade do INSS e as deduções atualizadas do Imposto de Renda. Se você foi demitido, pediu demissão ou fez um acordo, use a ",
        /* @__PURE__ */ jsx("strong", { children: "calculadora de rescisão" }),
        ' acima para validar se o valor oferecido pela empresa ("homologação") está correto e evitar prejuízos financeiros permanentes.'
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsxs("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: [
            "Resumo em 30 Segundos: O Que a ",
            /* @__PURE__ */ jsx("strong", { children: "Calculadora de Rescisão" }),
            " Considera"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "grid md:grid-cols-2 gap-4 text-gray-300", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-center bg-white/5 p-3 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-blue-500" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Base:" }),
              " Salário + Médias de horas extras."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-center bg-white/5 p-3 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-red-400" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Descontos:" }),
              " INSS (Teto R$ 8.157,41) e IRRF."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-center bg-white/5 p-3 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-400" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Isentos:" }),
              " Aviso Prévio, Férias Indenizadas e Multa 40%."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-center bg-white/5 p-3 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-yellow-400" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Prazo:" }),
              " Pagamento em até 10 dias corridos."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como funciona a Calculadora de Rescisão" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
          "Para obter o resultado exato na nossa ",
          /* @__PURE__ */ jsx("strong", { children: "calculadora de rescisão" }),
          ", siga estes passos simples:"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-500 font-bold mb-2", children: "01. Preencha os Dados" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Informe seu último salário bruto, data de admissão e data de saída." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-500 font-bold mb-2", children: "02. Selecione o Motivo" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Escolha o tipo de desligamento (ex: sem justa causa ou pedido de demissão) e o tipo de aviso prévio." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-500 font-bold mb-2", children: "03. Visualize o Cálculo" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "O sistema processará automaticamente as regras de 2025, exibindo o valor líquido e as deduções legais." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Briefcase, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Tabelas Oficiais para o Cálculo (Vigência 2025)" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-8 max-w-3xl", children: [
          "Para chegar ao valor líquido apresentado pela ",
          /* @__PURE__ */ jsx("strong", { children: "calculadora de rescisão" }),
          ", é necessário deduzir o INSS e o Imposto de Renda (IRRF) incidentes sobre o saldo de salário, 13º proporcional e horas extras. Verbas indenizatórias (como férias indenizadas e multa do FGTS) são isentas destes descontos."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Tabela Progressiva do INSS (Dezembro 2025)" }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Faixa Salarial (R$)" }),
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Alíquota" }),
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Dedução" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Até 1.518,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "7,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "-" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "1.518,01 a 2.793,88" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "9%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "22,77" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "2.793,89 a 4.190,83" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "12%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "106,59" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "4.190,84 a 8.157,41" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "14%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "190,40" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 text-xs text-gray-500 space-y-2", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
                " Dados baseados na ",
                /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/inss/pt-br/noticias/confira-como-ficaram-as-aliquotas-de-contribuicao-ao-inss", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Portaria Interministerial MPS/MF nº 6/2025" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Entenda a Progressividade:" }),
                " Desde a reforma da previdência, o cálculo do INSS é ",
                /* @__PURE__ */ jsx("strong", { children: "progressivo por faixas" }),
                ". Isso significa que a alíquota não incide cheia sobre o total. Quem ganha R$ 4.000,00, por exemplo, não paga 14% sobre tudo, mas sim taxas fatiadas sobre cada pedaço do salário que se encaixa nas faixas acima, resultando em um desconto menor do que no modelo antigo."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Tabela do Imposto de Renda (IRRF)" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mb-4", children: [
              "A partir de maio de 2025, aplica-se o desconto simplificado de ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 607,20" }),
              " caso seja mais vantajoso que as deduções legais."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Base de Cálculo (R$)" }),
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Alíquota" }),
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Dedução" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Até 2.428,80" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Isento" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "-" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "2.428,81 a 2.826,65" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "7,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "182,16" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "2.826,66 a 3.751,05" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "15,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "394,16" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "3.751,06 a 4.664,68" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "22,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "675,49" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Acima de 4.664,68" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "27,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "908,73" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-gray-500 space-y-1", children: [
              /* @__PURE__ */ jsx("p", { children: "*Dedução por dependente: R$ 189,59." }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
                " Tabela vigente conforme ",
                /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Receita Federal do Brasil" }),
                "."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-yellow-500 shrink-0" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-yellow-200 mb-2", children: "Erros Comuns ao Calcular a Rescisão" }),
            /* @__PURE__ */ jsx("p", { className: "text-yellow-100/80", children: "Evite perder dinheiro ignorando estes detalhes:" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-yellow-100/70", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Muitos trabalhadores perdem dinheiro ao aceitar cálculos simplificados que ignoram as médias variáveis. Se você recebia ",
              /* @__PURE__ */ jsx("strong", { children: "comissões, horas extras ou adicional noturno" }),
              " habitualmente, esses valores devem integrar a base de cálculo para pagamento de férias e 13º salário. Por isso, nossa ",
              /* @__PURE__ */ jsx("strong", { children: "calculadora de rescisão" }),
              " considera esses inputs essenciais para evitar distorções no valor final."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Se você fez muitas horas extras nos últimos meses, utilize nossa ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "underline hover:text-yellow-200", children: "calculadora de horas extras" }),
              " para verificar a média correta antes de assinar a rescisão."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como Calcular a Rescisão (Passo a Passo)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "1. Fórmula Rápida (Conceitual)" }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mb-6 font-mono text-sm text-blue-300", children: "Rescisão Líquida = (Verbas Salariais + Verbas Indenizatórias) - (INSS + IRRF + Adiantamentos)" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "2. Detalhamento dos Proventos" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Saldo de Salário:" }),
                  " Divida seu salário por 30 e multiplique pelos dias trabalhados no mês."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Aviso Prévio (Lei 12.506/11):" }),
                  " Se indenizado, 30 dias + 3 dias por ano (limite 90 dias). Consulte a lei na íntegra no ",
                  /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12506.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Planalto" }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "13º Salário Proporcional:" }),
                  " 1/12 por mês trabalhado (mês = fração ",
                  ">",
                  "= 15 dias)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Férias:" }),
                  " Vencidas (se houver) + Proporcionais + 1/3 Constitucional."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-white mb-2", children: "Exemplo 1: Salário R$ 3.000,00" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-3", children: "Sem justa causa, 2 anos de casa, saída 10/12/2025." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-xs text-gray-300", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Saldo de Salário (10 dias):" }),
                  " R$ 1.000,00"
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Aviso Prévio (36 dias):" }),
                  " R$ 3.600,00"
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "13º Salário (11/12):" }),
                  " R$ 2.750,00"
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Férias Vencidas + 1/3:" }),
                  " R$ 4.000,00"
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Férias Prop. (11/12) + 1/3:" }),
                  " R$ 3.666,66"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "text-red-300", children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Desconto INSS (Saldo):" }),
                  " R$ 75,00 (Aprox)"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "text-red-300", children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Desconto INSS (13º):" }),
                  " R$ 224,73"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-white mb-2", children: "Exemplo 2: Salário R$ 8.500,00 (Acima do Teto)" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-3", children: "Executivo, sem justa causa." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-xs text-gray-300", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Saldo de Salário:" }),
                  " R$ 8.500,00"
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Desconto INSS:" }),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-300", children: "R$ 951,63 (Travado no Teto)" })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Base de Cálculo IRRF:" }),
                  " R$ 7.548,37"
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Desconto IRRF:" }),
                  " 27,5% sobre a base - dedução."
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "text-blue-300 italic flex items-start gap-1 mt-1", children: [
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 mt-0.5" }),
                  /* @__PURE__ */ jsx("span", { children: "INSS não incide sobre o que excede R$ 8.157,41." })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Tipos de Demissão e Direitos Específicos" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Demissão Sem Justa Causa" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-3", children: "O cenário mais comum. Você recebe todas as verbas (aviso prévio, férias, 13º), saca o FGTS e tem direito à multa de 40%." }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-blue-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Direito ao ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/seguro-desemprego", className: "underline hover:text-blue-300", children: "Seguro-Desemprego" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Pedido de Demissão" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mb-3", children: [
              "A iniciativa é sua. Você ",
              /* @__PURE__ */ jsx("strong", { children: "perde" }),
              " o direito ao Aviso Prévio (se não cumprir, a empresa desconta), não saca o FGTS nem a multa de 40%."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-red-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(XCircle, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsx("span", { children: "Sem Seguro-Desemprego" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Acordo Comum (Reforma)" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Empresa e empregado decidem pelo fim do contrato." }),
            /* @__PURE__ */ jsxs("ul", { className: "text-xs text-gray-400 space-y-1 ml-1", children: [
              /* @__PURE__ */ jsx("li", { children: "• Aviso Prévio Indenizado: 50%" }),
              /* @__PURE__ */ jsx("li", { children: "• Multa FGTS: 20%" }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• Saque FGTS: Até 80% do saldo (",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/fgts", className: "text-blue-400 hover:underline", children: "calculadora de FGTS" }),
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Rescisão Indireta" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-3", children: '"Justa causa do patrão" (ex: falta de pagamento). Se reconhecida na justiça, garante todos os direitos da demissão sem justa causa.' }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-blue-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsx("span", { children: "Verbas Integrais" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 p-6 rounded-xl bg-blue-500/5 border border-blue-500/10", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-white mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "w-5 h-5 text-blue-500" }),
            "Aviso Trabalhado vs. Indenizado"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
            "No ",
            /* @__PURE__ */ jsx("strong", { children: "Aviso Trabalhado" }),
            ", você continua na empresa por 30 dias (com redução de jornada) e o valor sofre descontos de INSS/IRRF. No ",
            /* @__PURE__ */ jsx("strong", { children: "Aviso Indenizado" }),
            ", a empresa paga sem você trabalhar; o valor é indenizatório e ",
            /* @__PURE__ */ jsx("strong", { children: "isento de descontos" }),
            "."
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
//# sourceMappingURL=TerminationPage-1csDkxlK.js.map
