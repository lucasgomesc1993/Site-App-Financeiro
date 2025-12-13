import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronDown, ChevronRight, Briefcase, Calculator, CheckCircle, AlertCircle, FileText, Clock, Percent, DollarSign, HelpCircle, XCircle, ArrowRight } from "lucide-react";
import { format, getYear, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, getMonth, setMonth, setYear, subMonths, addMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { T as Tooltip } from "./Tooltip-D5PFHMNL.js";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "react-dom";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function DatePicker({ value, onChange, label, id, className, placeholder = "DD/MM/AAAA", error }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(/* @__PURE__ */ new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef(null);
  const [view, setView] = useState("days");
  useEffect(() => {
    if (value) {
      const date = typeof value === "string" ? /* @__PURE__ */ new Date(value + "T12:00:00") : value;
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        setCurrentDate(date);
        setInputValue(format(date, "dd/MM/yyyy"));
      }
    } else {
      setSelectedDate(null);
      setInputValue("");
    }
  }, [value]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setView("days");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleInputChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 8) raw = raw.slice(0, 8);
    let formatted = raw;
    if (raw.length > 2) formatted = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    if (raw.length > 4) formatted = `${formatted.slice(0, 5)}/${raw.slice(4)}`;
    setInputValue(formatted);
    if (raw.length === 8) {
      const day = parseInt(raw.slice(0, 2));
      const month = parseInt(raw.slice(2, 4)) - 1;
      const year = parseInt(raw.slice(4, 8));
      const date = new Date(year, month, day);
      if (date.getDate() === day && date.getMonth() === month && date.getFullYear() === year) {
        setSelectedDate(date);
        setCurrentDate(date);
        onChange(format(date, "yyyy-MM-dd"));
      }
    } else if (raw.length === 0) {
      setSelectedDate(null);
      onChange("");
    }
  };
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextYear = () => setCurrentDate(addMonths(currentDate, 12));
  const prevYear = () => setCurrentDate(subMonths(currentDate, 12));
  const onDateClick = (day) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    onChange(formattedDate);
    setIsOpen(false);
    setView("days");
  };
  const renderHeader = () => {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 px-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: view === "days" ? prevMonth : prevYear,
          className: "p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors",
          children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setView(view === "days" ? "months" : "years"),
          className: "font-semibold text-white hover:bg-white/10 px-3 py-1 rounded-lg transition-colors flex items-center gap-1",
          children: [
            view === "days" && format(currentDate, "MMMM yyyy", { locale: ptBR }),
            view === "months" && format(currentDate, "yyyy", { locale: ptBR }),
            view === "years" && `${getYear(currentDate) - 5} - ${getYear(currentDate) + 6}`,
            /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${view !== "days" ? "rotate-180" : ""}` })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: view === "days" ? nextMonth : nextYear,
          className: "p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors",
          children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
        }
      )
    ] });
  };
  const renderDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 mb-2", children: daysOfWeek.map((d, i) => /* @__PURE__ */ jsx("div", { className: "text-center text-xs font-medium text-gray-500 py-1", children: d }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1", children: (() => {
        const calendarDays = [];
        let currentDay = startDate;
        while (currentDay <= endDate) {
          calendarDays.push(currentDay);
          currentDay = addDays(currentDay, 1);
        }
        return calendarDays.map((date, idx) => {
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
          const isCurrentMonth = isSameMonth(date, monthStart);
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => onDateClick(date),
              className: cn(
                "h-8 w-8 rounded-lg text-sm flex items-center justify-center transition-all",
                !isCurrentMonth && "text-gray-600",
                isCurrentMonth && !isSelected && "text-gray-300 hover:bg-white/10 hover:text-white",
                isSelected && "bg-blue-500 text-white shadow-lg shadow-blue-500/20 font-medium"
              ),
              children: format(date, "d")
            },
            idx
          );
        });
      })() })
    ] });
  };
  const renderMonths = () => {
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez"
    ];
    return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: months.map((month, idx) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          setCurrentDate(setMonth(currentDate, idx));
          setView("days");
        },
        className: cn(
          "p-2 rounded-lg text-sm transition-colors",
          getMonth(currentDate) === idx ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-white/10"
        ),
        children: month
      },
      idx
    )) });
  };
  const renderYears = () => {
    const currentYear = getYear(currentDate);
    const startYear = currentYear - 5;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);
    return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: years.map((year) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          setCurrentDate(setYear(currentDate, year));
          setView("months");
        },
        className: cn(
          "p-2 rounded-lg text-sm transition-colors",
          year === currentYear ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-white/10"
        ),
        children: year
      },
      year
    )) });
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", className), ref: containerRef, children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: id, className: "text-sm text-gray-400", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id,
          type: "text",
          inputMode: "numeric",
          value: inputValue,
          onChange: handleInputChange,
          placeholder,
          maxLength: 10,
          className: cn(
            "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder-gray-500 transition-all focus:outline-none focus:border-blue-500/50",
            error && "border-red-500/50 focus:border-red-500/50"
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setIsOpen(!isOpen),
          className: "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors",
          tabIndex: -1,
          "aria-label": "Abrir calendário",
          children: /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" })
        }
      ),
      isOpen && /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 z-50 mt-2 w-[300px] p-4 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200", children: [
        renderHeader(),
        view === "days" && renderDays(),
        view === "months" && renderMonths(),
        view === "years" && renderYears()
      ] })
    ] }),
    error && /* @__PURE__ */ jsx("span", { className: "text-xs text-red-400", children: error })
  ] });
}
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
  const [contractEndDate, setContractEndDate] = useState("");
  const [reason, setReason] = useState("sem_justa_causa");
  const [noticeType, setNoticeType] = useState("indenizado");
  const [dependents, setDependents] = useState("");
  const [balanceFGTS, setBalanceFGTS] = useState("");
  const [hasExpiredVacation, setHasExpiredVacation] = useState(false);
  const [result, setResult] = useState(null);
  const [validationError, setValidationError] = useState(null);
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
  const calculateIRRF = (grossValue, inssValue, dependents2 = 0) => {
    const deductionPerDependent = 189.59;
    const simplifiedDiscount = 607.2;
    const legalDeduction = inssValue + dependents2 * deductionPerDependent;
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
    setValidationError(null);
    if (!startDate) {
      setValidationError("Informe a data de admissão.");
      return;
    }
    if (!endDate) {
      setValidationError("Informe a data de afastamento.");
      return;
    }
    if (!salary) {
      setValidationError("Informe o salário bruto.");
      return;
    }
    const start = /* @__PURE__ */ new Date(startDate + "T12:00:00");
    const end = /* @__PURE__ */ new Date(endDate + "T12:00:00");
    const salaryValue = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const balanceFGTSValue = parseFloat(balanceFGTS.replace(/\./g, "").replace(",", ".") || "0");
    const dependentsCount = parseInt(dependents) || 0;
    if (isNaN(salaryValue) || salaryValue <= 0) {
      setValidationError("Informe um salário válido.");
      return;
    }
    if (end < start) {
      setValidationError("A data de afastamento não pode ser anterior à data de admissão.");
      return;
    }
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const daysWorkedTotal = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    const yearsOfService = Math.floor(daysWorkedTotal / 365);
    let monthsWorked = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (end.getDate() >= 15) monthsWorked += 1;
    const calculatedDailySalary = salaryValue / 30;
    const daysInFiringMonth = end.getDate();
    const salaryBalance = salaryValue / 30 * daysInFiringMonth;
    end.getMonth();
    const startOfYear = new Date(end.getFullYear(), 0, 1);
    let months13 = 0;
    const effectiveStart = start > startOfYear ? start : startOfYear;
    let currentIter = new Date(effectiveStart.getFullYear(), effectiveStart.getMonth(), 1);
    while (currentIter <= end) {
      const monthEnd = new Date(currentIter.getFullYear(), currentIter.getMonth() + 1, 0);
      let daysInMonthWorking = 0;
      const startDay = currentIter.getMonth() === effectiveStart.getMonth() && currentIter.getFullYear() === effectiveStart.getFullYear() ? effectiveStart.getDate() : 1;
      const endDay = currentIter.getMonth() === end.getMonth() && currentIter.getFullYear() === end.getFullYear() ? end.getDate() : monthEnd.getDate();
      daysInMonthWorking = endDay - startDay + 1;
      if (daysInMonthWorking >= 15) {
        months13++;
      }
      currentIter.setMonth(currentIter.getMonth() + 1);
    }
    let thirteenthProportional = salaryValue / 12 * months13;
    const anniversary = new Date(start);
    anniversary.setFullYear(end.getFullYear());
    if (anniversary > end) anniversary.setFullYear(end.getFullYear() - 1);
    currentIter = new Date(anniversary.getFullYear(), anniversary.getMonth(), anniversary.getDate());
    let tempDate = new Date(anniversary);
    while (tempDate < end) {
      tempDate.setMonth(tempDate.getMonth() + 1);
      if (tempDate <= end || tempDate.getMonth() === end.getMonth() && (end.getDate() - tempDate.getDate() + 30) % 30 >= 14) ;
    }
    let periodStart = new Date(anniversary);
    let vacMonthsRaw = (end.getFullYear() - periodStart.getFullYear()) * 12 + (end.getMonth() - periodStart.getMonth());
    if (end.getDate() < periodStart.getDate()) vacMonthsRaw--;
    let daysRemaining = end.getDate() - periodStart.getDate();
    if (daysRemaining < 0) daysRemaining += 30;
    if (daysRemaining >= 14) vacMonthsRaw++;
    let vacationProportional = salaryValue / 12 * vacMonthsRaw;
    let vacationThird = vacationProportional / 3;
    const vacationExpired = hasExpiredVacation ? salaryValue : 0;
    const vacationExpiredThird = vacationExpired / 3;
    let totalGross = 0;
    let noticeDeduction = 0;
    let noticeIndemnified = 0;
    let noticeDays = 0;
    let fgtsFine = 0;
    let art479Indemnification = 0;
    if (yearsOfService >= 1) {
      noticeDays = 30 + Math.min(yearsOfService, 20) * 3;
    } else {
      noticeDays = 30;
    }
    switch (reason) {
      case "sem_justa_causa":
        if (noticeType === "indenizado") {
          noticeIndemnified = salaryValue / 30 * noticeDays;
        } else if (noticeType === "trabalhado") {
          const proportionalDays = Math.max(0, noticeDays - 30);
          noticeIndemnified = salaryValue / 30 * proportionalDays;
        }
        fgtsFine = balanceFGTSValue * 0.4;
        break;
      case "com_justa_causa":
        noticeIndemnified = 0;
        fgtsFine = 0;
        thirteenthProportional = 0;
        vacationProportional = 0;
        vacationThird = 0;
        break;
      case "pedido_demissao":
        fgtsFine = 0;
        if (noticeType === "nao_cumprido") {
          noticeDeduction = salaryValue;
        }
        break;
      case "acordo":
        noticeIndemnified = salaryValue / 30 * noticeDays / 2;
        fgtsFine = balanceFGTSValue * 0.2;
        break;
      case "experience_term":
        noticeIndemnified = 0;
        fgtsFine = 0;
        break;
      case "experience_early_employer":
        noticeIndemnified = 0;
        fgtsFine = balanceFGTSValue * 0.4;
        if (endDate && contractEndDate) {
          const end2 = /* @__PURE__ */ new Date(endDate + "T12:00:00");
          const contractEnd = /* @__PURE__ */ new Date(contractEndDate + "T12:00:00");
          if (contractEnd > end2) {
            const remainingTime = contractEnd.getTime() - end2.getTime();
            const remainingDays = Math.ceil(remainingTime / (1e3 * 3600 * 24));
            if (remainingDays > 0) {
              art479Indemnification = calculatedDailySalary * remainingDays / 2;
            }
          }
        }
        break;
      case "retirement":
        noticeIndemnified = 0;
        fgtsFine = 0;
        break;
      case "employer_death":
        noticeIndemnified = salaryValue / 30 * noticeDays;
        fgtsFine = balanceFGTSValue * 0.4;
        break;
    }
    totalGross = salaryBalance + thirteenthProportional + vacationProportional + vacationThird + vacationExpired + vacationExpiredThird + noticeIndemnified + art479Indemnification + fgtsFine;
    let inssSalary = calculateINSS(salaryBalance);
    let inss13 = calculateINSS(thirteenthProportional);
    let irrfBaseSalary = salaryBalance - inssSalary;
    let irrfSalary = calculateIRRF(irrfBaseSalary, inssSalary, dependentsCount);
    let irrfBase13 = thirteenthProportional - inss13;
    let irrf13 = calculateIRRF(irrfBase13, inss13, dependentsCount);
    const totalDiscounts = inssSalary + inss13 + irrfSalary + irrf13 + noticeDeduction;
    const totalNet = totalGross - totalDiscounts;
    setResult({
      totalGross,
      totalNet,
      totalDiscounts,
      breakdown: {
        salaryBalance,
        thirteenthProportional,
        vacationProportional,
        vacationThird,
        vacationExpired,
        vacationExpiredThird,
        noticeIndemnified,
        fgtsFine,
        fgtsWithdrawal: balanceFGTSValue + fgtsFine,
        // Total FGTS available for withdrawal
        inssSalary,
        inss13,
        irrfSalary,
        irrf13,
        monthsWorked,
        yearsOfService,
        art479Indemnification,
        noticeDeduction
      }
    });
  };
  const handleClear = () => {
    setSalary("");
    setStartDate("");
    setEndDate("");
    setContractEndDate("");
    setReason("sem_justa_causa");
    setNoticeType("indenizado");
    setDependents("");
    setBalanceFGTS("");
    setHasExpiredVacation(false);
    setResult(null);
    setValidationError(null);
  };
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
      "Cálculo de Rescisão CLT (Sem Justa Causa, Justa Causa, Pedido de Demissão)",
      "Rescisão por Acordo - Reforma Trabalhista (Art. 484-A)",
      "Aviso Prévio Proporcional (Lei 12.506/2011) - Trabalhado, Indenizado ou Dispensado",
      "Contrato de Experiência - Término e Rescisão Antecipada (Art. 479)",
      "Rescisão por Aposentadoria ou Falecimento do Empregador (PF)",
      "Cálculo de Multa FGTS (40% e 20%) com Total para Saque",
      "Férias Proporcionais + 1/3 e Férias Vencidas",
      "13º Salário Proporcional",
      "Desconto INSS Progressivo (Tabela 2025)",
      "Desconto IRRF com Dedução por Dependentes (Tabela 2025)",
      "Validação de Campos e Mensagens de Erro"
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
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 w-full relative z-20", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data de Admissão" }),
                  /* @__PURE__ */ jsx(Tooltip, { content: "Data que consta na sua carteira de trabalho (início do contrato)." })
                ] }),
                /* @__PURE__ */ jsx(
                  DatePicker,
                  {
                    value: startDate,
                    onChange: setStartDate
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data de Afastamento" }),
                  /* @__PURE__ */ jsx(Tooltip, { content: "Seu último dia trabalhado (ou o projetado pelo aviso prévio)." })
                ] }),
                /* @__PURE__ */ jsx(
                  DatePicker,
                  {
                    value: endDate,
                    onChange: setEndDate
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "text-sm text-gray-400", children: "Salário Bruto" }),
                  /* @__PURE__ */ jsx(Tooltip, { content: "Valor total do seu salário sem os descontos (conforme carteira ou holerite)." })
                ] }),
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
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "dependents", className: "text-sm text-gray-400", children: "Nº de Dependentes" }),
                  /* @__PURE__ */ jsx(Tooltip, { content: "Informe quantos dependentes você declara no Imposto de Renda (filhos, cônjuge, etc) para desconto no IRRF." })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "dependents",
                    type: "number",
                    value: dependents,
                    onChange: (e) => setDependents(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "0",
                    min: "0"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "reason", className: "text-sm text-gray-400", children: "Motivo" }),
                  /* @__PURE__ */ jsx(Tooltip, { content: "Selecione o motivo da rescisão para aplicar as regras corretas de cálculo." })
                ] }),
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
                        /* @__PURE__ */ jsx("option", { value: "acordo", children: "Acordo (Comum Acordo)" }),
                        /* @__PURE__ */ jsx("option", { value: "experience_term", children: "Término Contrato Experiência" }),
                        /* @__PURE__ */ jsx("option", { value: "experience_early_employer", children: "Rescisão Antecipada Empregador (Experiência)" }),
                        /* @__PURE__ */ jsx("option", { value: "retirement", children: "Aposentadoria do Empregado" }),
                        /* @__PURE__ */ jsx("option", { value: "employer_death", children: "Falecimento do Empregador (PF)" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(ChevronDown, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" })
                ] })
              ] }),
              (reason === "sem_justa_causa" || reason === "pedido_demissao") && /* @__PURE__ */ jsxs("div", { className: "space-y-2 animate-in fade-in slide-in-from-top-1 duration-300", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "noticeType", className: "text-sm text-gray-400", children: "Aviso Prévio" }),
                  /* @__PURE__ */ jsx(Tooltip, { content: "Defina se o aviso foi trabalhado, indenizado ou não cumprido." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "noticeType",
                      value: noticeType,
                      onChange: (e) => setNoticeType(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "trabalhado", children: "Trabalhado" }),
                        /* @__PURE__ */ jsx("option", { value: "indenizado", children: "Indenizado pelo empregador" }),
                        reason === "pedido_demissao" && /* @__PURE__ */ jsx("option", { value: "nao_cumprido", children: "Não cumprido pelo empregado" }),
                        /* @__PURE__ */ jsx("option", { value: "dispensado", children: "Dispensado" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(ChevronDown, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" })
                ] })
              ] })
            ] }),
            reason === "experience_early_employer" && /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in slide-in-from-top-2 duration-300 space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-blue-400 font-medium", children: "Data Prevista para Término" }),
                /* @__PURE__ */ jsx(Tooltip, { content: "Data que o contrato de experiência deveria acabar originalmente. Necessário para calcular a indenização do Art. 479." })
              ] }),
              /* @__PURE__ */ jsx(
                DatePicker,
                {
                  value: contractEndDate,
                  onChange: setContractEndDate,
                  className: "border-blue-500/30"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Necessário para calcular a indenização do Art. 479 da CLT." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors", onClick: () => setHasExpiredVacation(!hasExpiredVacation), children: [
              /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border flex items-center justify-center transition-all ${hasExpiredVacation ? "bg-blue-500 border-blue-500" : "border-gray-500"}`, children: hasExpiredVacation && /* @__PURE__ */ jsx(CheckCircle, { className: "w-3.5 h-3.5 text-white" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Possui férias vencidas (1 ano)?" }),
                /* @__PURE__ */ jsx(Tooltip, { content: "Marque se você completou mais de 1 ano sem tirar férias (férias vencidas)." })
              ] })
            ] }),
            (reason === "sem_justa_causa" || reason === "acordo" || reason === "experience_early_employer" || reason === "employer_death") && /* @__PURE__ */ jsxs("div", { className: "space-y-2 animate-in fade-in slide-in-from-top-2 duration-300", children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "balanceFGTS", className: "text-sm text-gray-400 flex items-center gap-1", children: [
                "Saldo do FGTS (para multa)",
                /* @__PURE__ */ jsx(Tooltip, { content: "Informe o saldo atual do FGTS para cálculo da multa de 40% ou 20%." })
              ] }),
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
            validationError && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 shrink-0" }),
              validationError
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse md:flex-row gap-4 pt-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleClear,
                  className: "md:flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2",
                  children: "Limpar"
                }
              ),
              !result && /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: calculate,
                  className: "md:flex-[2] bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5" }),
                    "Calcular Rescisão"
                  ]
                }
              ),
              result && /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    setResult(null);
                    setTimeout(calculate, 0);
                  },
                  className: "md:flex-[2] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5" }),
                    "Calcular Novamente"
                  ]
                }
              )
            ] }),
            result && /* @__PURE__ */ jsxs("div", { className: "pt-6 animate-in fade-in slide-in-from-top-4 duration-500 space-y-6 border-t border-white/10 mt-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-2xl relative overflow-hidden group mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700" }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10 grid md:grid-cols-2 gap-6 items-center", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-blue-100 text-sm font-medium uppercase tracking-wider mb-1 block", children: "Valor Líquido a Receber" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-4xl md:text-5xl font-bold text-white tracking-tight", children: [
                      "R$ ",
                      result.totalNet.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-blue-200/80 text-xs mt-2", children: "*O valor pode variar centavos dependendo da data exata do pagamento." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm border-b border-white/20 pb-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-blue-100", children: "Total Proventos" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                        "R$ ",
                        result.totalGross.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm pt-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-blue-200", children: "Total Descontos" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                        "- R$ ",
                        result.totalDiscounts.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxs("h4", { className: "text-sm font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-green-400" }),
                    "Proventos (Entradas)"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    result.breakdown.salaryBalance > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm", children: "Saldo de Salário" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-green-300 font-medium text-sm", children: [
                        "+ R$ ",
                        result.breakdown.salaryBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.vacationProportional > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm", children: "Férias + 1/3 (Prop.)" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-green-300 font-medium text-sm", children: [
                        "+ R$ ",
                        (result.breakdown.vacationProportional + result.breakdown.vacationThird).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.vacationExpired > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm", children: "Férias Vencidas + 1/3" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-green-300 font-medium text-sm", children: [
                        "+ R$ ",
                        (result.breakdown.vacationExpired + result.breakdown.vacationExpiredThird).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.thirteenthProportional > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm", children: "13º Salário Prop." }),
                      /* @__PURE__ */ jsxs("span", { className: "text-green-300 font-medium text-sm", children: [
                        "+ R$ ",
                        result.breakdown.thirteenthProportional.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.noticeIndemnified > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm", children: "Aviso Prévio Indenizado" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-green-300 font-medium text-sm", children: [
                        "+ R$ ",
                        result.breakdown.noticeIndemnified.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.art479Indemnification > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm", children: "Indenização Art. 479" }),
                        /* @__PURE__ */ jsx(Tooltip, { content: "Metade da remuneração calculada sobre os dias que faltavam para o término do contrato." })
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "text-green-300 font-medium text-sm", children: [
                        "+ R$ ",
                        result.breakdown.art479Indemnification.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.fgtsFine > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm", children: "Multa FGTS" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-green-300 font-medium text-sm", children: [
                        "+ R$ ",
                        result.breakdown.fgtsFine.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.fgtsWithdrawal > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-2", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-amber-200 text-sm font-medium", children: "Total FGTS para Saque" }),
                        /* @__PURE__ */ jsx(Tooltip, { content: "Valor total disponível para saque: Saldo do FGTS + Multa rescisória. Depositado na conta do FGTS." })
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "text-amber-300 font-bold text-sm", children: [
                        "R$ ",
                        result.breakdown.fgtsWithdrawal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxs("h4", { className: "text-sm font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-red-400" }),
                    "Descontos"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    result.breakdown.inssSalary > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-red-200/70 text-sm", children: "INSS (Salário)" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-red-300 font-medium text-sm", children: [
                        "- R$ ",
                        result.breakdown.inssSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.inss13 > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-red-200/70 text-sm", children: "INSS (13º)" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-red-300 font-medium text-sm", children: [
                        "- R$ ",
                        result.breakdown.inss13.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.irrfSalary > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-red-200/70 text-sm", children: "IRRF (Salário)" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-red-300 font-medium text-sm", children: [
                        "- R$ ",
                        result.breakdown.irrfSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.irrf13 > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-red-200/70 text-sm", children: "IRRF (13º)" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-red-300 font-medium text-sm", children: [
                        "- R$ ",
                        result.breakdown.irrf13.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.noticeDeduction > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-red-200/70 text-sm", children: "Desconto Aviso Prévio" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-red-300 font-medium text-sm", children: [
                        "- R$ ",
                        result.breakdown.noticeDeduction.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.totalDiscounts === 0 && /* @__PURE__ */ jsx("div", { className: "p-4 text-center text-gray-500 text-sm italic border border-white/5 rounded-lg border-dashed", children: "Sem descontos aplicáveis" })
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
      /* @__PURE__ */ jsx("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-300 leading-relaxed", children: [
        "O cálculo da rescisão trabalhista é a etapa final e mais crítica da relação de emprego. Esta ",
        /* @__PURE__ */ jsx("strong", { children: "calculadora de rescisão" }),
        " não apenas soma seus direitos, mas aplica as regras tributárias vigentes em dezembro de 2025, considerando a progressividade do INSS e as deduções atualizadas do Imposto de Renda. Se você foi demitido, pediu demissão ou fez um acordo, use a ",
        /* @__PURE__ */ jsx("strong", { children: "calculadora de rescisão" }),
        ' acima para validar se o valor oferecido pela empresa ("homologação") está correto e evitar prejuízos financeiros permanentes.'
      ] }) }) }),
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
            /* @__PURE__ */ jsx("div", { className: "text-blue-400 font-bold mb-2", children: "01. Preencha os Dados" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Informe seu último salário bruto, data de admissão e data de saída." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-400 font-bold mb-2", children: "02. Selecione o Motivo" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Escolha o tipo de desligamento (ex: sem justa causa ou pedido de demissão) e o tipo de aviso prévio." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-400 font-bold mb-2", children: "03. Visualize o Cálculo" }),
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
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8", children: [
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
            /* @__PURE__ */ jsxs("div", { className: "mt-4 text-xs text-gray-400 space-y-2", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
                " Dados baseados na ",
                /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/inss/pt-br/noticias/confira-como-ficaram-as-aliquotas-de-contribuicao-ao-inss", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 underline hover:text-blue-300", children: "Portaria Interministerial MPS/MF nº 6/2025" }),
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
            /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-gray-400 space-y-1", children: [
              /* @__PURE__ */ jsx("p", { children: "*Dedução por dependente: R$ 189,59." }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
                " Tabela vigente conforme ",
                /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 underline hover:text-blue-300", children: "Receita Federal do Brasil" }),
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
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
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
                  /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12506.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 underline hover:text-blue-300", children: "Planalto" }),
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
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5 h-full", children: [
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
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5 h-full", children: [
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
//# sourceMappingURL=TerminationPage-xzDfKsUN.js.map
