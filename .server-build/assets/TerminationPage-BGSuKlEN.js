import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Briefcase, Calculator, Calendar, AlertCircle, CheckCircle, FileText, Clock, Percent, XCircle } from "lucide-react";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-rtQ6fcXm.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
const TERMINATION_FAQS = [
  {
    question: "Qual o prazo para a empresa pagar a rescisão em 2025?",
    answer: "A empresa tem até 10 dias corridos após o término do contrato para realizar o pagamento, independentemente se o aviso prévio foi trabalhado ou indenizado. O atraso gera multa no valor de um salário do funcionário."
  },
  {
    question: "O aviso prévio conta para férias e décimo terceiro?",
    answer: 'Sim. A Lei determina a "projeção do aviso prévio". Isso significa que o tempo do aviso (inclusive os dias extras por ano de casa) conta como tempo de serviço efetivo, gerando mais avos de férias e 13º salário na conta final.'
  },
  {
    question: "Como fica o imposto sobre o 13º na rescisão?",
    answer: "O 13º salário possui tributação exclusiva e separada. O cálculo do IRRF sobre o 13º não se mistura com o do saldo de salário ou aviso prévio, o que muitas vezes resulta em um desconto de imposto menor para o trabalhador."
  },
  {
    question: "Posso sacar todo o meu FGTS se pedir demissão?",
    answer: "Não. No pedido de demissão, o trabalhador não tem direito ao saque do FGTS nem à multa de 40%. O valor permanece retido na conta (rendendo juros) e só pode ser sacado em situações específicas, como compra da casa própria, aposentadoria ou após 3 anos sem registro em carteira."
  },
  {
    question: "Qual é o teto máximo de desconto do INSS na rescisão em 2025?",
    answer: "O teto máximo de contribuição para o INSS em 2025 é de R$ 951,63 (soma das parcelas máximas de todas as faixas) para quem recebe acima de R$ 8.157,41. Mesmo que seu salário na rescisão seja de R$ 20.000,00, o desconto não pode ultrapassar esse valor limite."
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
    "name": "Calculadora de Rescisão 2025: Cálculo Exato CLT com Novas Regras",
    "url": "https://www.junny.com.br/calculadoras/rescisao",
    "description": "Calcule sua rescisão trabalhista com as regras atualizadas de 2025. Inclui novo salário mínimo (R$ 1.518), tabelas progressivas de INSS e projeção de férias.",
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
        title: "Calculadora de Rescisão 2025: Cálculo Exato CLT com Novas Regras",
        description: "Calcule sua rescisão trabalhista com as regras atualizadas de 2025. Inclui novo salário mínimo (R$ 1.518), tabelas progressivas de INSS e projeção de férias.",
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
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mt-2 max-w-2xl mx-auto", children: [
            "Esta ferramenta simula os valores exatos que você deve receber ao sair de um emprego. Diferente de calculadoras comuns, nosso sistema considera o ",
            /* @__PURE__ */ jsx("strong", { children: "INSS progressivo de 2025" }),
            ", a média de horas extras e as novas faixas de Imposto de Renda."
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
            "Resumo Rápido (2025)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Salário Mínimo Base" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 1.518,00" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Piso nacional vigente" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Teto do INSS" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 8.157,41" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Limite máximo de desconto" })
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
                /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Aviso Prévio:" }),
                  " 30 dias + 3 dias por ano completo de empresa (Lei 12.506)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Percent, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "FGTS:" }),
                  " Multa de 40% sobre o saldo total (ou 20% em acordo mútuo)."
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Briefcase, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Tabelas Oficiais e Parâmetros (2025)" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8 max-w-3xl", children: "Para garantir que o valor final bata com o seu holerite, utilizamos as tabelas de tributação oficiais vigentes a partir de janeiro de 2025. O desconto do INSS agora é fatiado por faixas salariais." }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Tabela INSS (2025)" }),
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
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Tabela IRRF (2025)" }),
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
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "*Dedução por dependente: R$ 189,59." })
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
              /* @__PURE__ */ jsx("strong", { children: "Ignorar a Média de Variáveis:" }),
              " Horas extras, comissões e adicional noturno devem entrar na conta (média dos últimos 12 meses). Calculadoras simples usam apenas o salário base, reduzindo o valor final."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Cálculo Linear de INSS:" }),
              " Aplicar 9% direto sobre o total está errado. O cálculo correto é progressivo, fatiado entre as faixas da tabela oficial."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Esquecer a Projeção do Aviso Prévio:" }),
              " Cada ano trabalhado adiciona 3 dias ao aviso. Esses dias extras contam para gerar mais avos de férias e décimo terceiro."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como Funciona o Cálculo (Passo a Passo)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Exemplo 1: Salário R$ 3.000,00" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-4", children: "Funcionário com 2 anos de casa, demissão sem justa causa." }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Saldo de Salário:" }),
                " R$ 3.000,00"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Aviso Prévio (36 dias):" }),
                " R$ 3.600,00"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Cálculo INSS:" }),
                /* @__PURE__ */ jsxs("ul", { className: "pl-4 mt-1 text-xs text-gray-400 space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "1ª Faixa (7,5%): R$ 113,85" }),
                  /* @__PURE__ */ jsx("li", { children: "2ª Faixa (9%): R$ 114,83" }),
                  /* @__PURE__ */ jsx("li", { children: "3ª Faixa (12%): R$ 24,73 (sobre restante)" }),
                  /* @__PURE__ */ jsx("li", { className: "text-red-300 font-bold", children: "Total INSS: R$ 253,41" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Exemplo 2: Salário R$ 7.800,00" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-4", children: "Gestor com 5 anos de empresa." }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Base de Cálculo:" }),
                " R$ 7.800,00"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Cálculo INSS (4 Faixas):" }),
                /* @__PURE__ */ jsxs("ul", { className: "pl-4 mt-1 text-xs text-gray-400 space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "1ª Faixa (7,5%): R$ 113,85" }),
                  /* @__PURE__ */ jsx("li", { children: "2ª Faixa (9%): R$ 114,83" }),
                  /* @__PURE__ */ jsx("li", { children: "3ª Faixa (12%): R$ 167,63" }),
                  /* @__PURE__ */ jsx("li", { children: "4ª Faixa (14%): R$ 505,28" }),
                  /* @__PURE__ */ jsx("li", { className: "text-red-300 font-bold", children: "Total INSS: R$ 901,59" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("li", { className: "text-xs text-blue-300 mt-2", children: "*Se fosse acima de R$ 8.157,41, travaria no teto." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Casos Especiais e Situações Específicas" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "Demissão por Acordo" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "O aviso prévio indenizado é pago pela metade (50%) e a multa do FGTS cai para 20%. O trabalhador saca 80% do saldo, mas não tem direito ao seguro-desemprego." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "FGTS: Saque-Aniversário" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Se você optou pelo Saque-Aniversário, o saldo do FGTS fica bloqueado na demissão. Você recebe apenas a multa de 40%. O valor principal só pode ser sacado nas janelas anuais." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "Descontos (VT e Banco)" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "A empresa pode descontar até 6% do salário (Vale-Transporte) e saldo negativo de banco de horas (se previsto em contrato)." })
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
//# sourceMappingURL=TerminationPage-BGSuKlEN.js.map
