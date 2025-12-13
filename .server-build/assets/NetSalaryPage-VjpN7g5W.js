import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Wallet, Calculator, CheckCircle, AlertCircle, Zap, Coins, HelpCircle, Briefcase, TrendingDown, AlertTriangle, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import { T as Tooltip } from "./Tooltip-D5PFHMNL.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
import "react-dom";
import "clsx";
import "tailwind-merge";
const NET_SALARY_FAQS = [
  {
    question: "O adiantamento salarial (vale) altera o imposto?",
    answer: "Não. O adiantamento é apenas uma antecipação do dinheiro que você já receberia. Os impostos (INSS e IRRF) são calculados sobre o total bruto no final do mês."
  },
  {
    question: "Quanto é descontado de quem ganha 1 salário mínimo (R$ 1.518,00)?",
    answer: "Para quem recebe o piso nacional de R$ 1.518,00, a incidência é mínima. O único desconto aplicado é o INSS de 7,5% (R$ 113,85). Está isento de IRRF."
  },
  {
    question: "O desconto simplificado de R$ 607,20 é opcional?",
    answer: "Sim, é opcional, mas a legislação obriga a fonte pagadora a utilizar o método mais favorável ao contribuinte. O sistema compara automaticamente."
  },
  {
    question: "Como calcular horas extras no salário líquido?",
    answer: "As horas extras entram como remuneração. Você deve somar o valor das extras ao salário bruto <em>antes</em> de aplicar os descontos. Isso costuma aumentar a base de cálculo e a alíquota de imposto de renda. Para evitar erros no holerite, use nossa <a href='/calculadoras/horas-extras'>Calculadora de Horas Extras</a> para encontrar o valor exato a somar."
  },
  {
    question: "Estagiário tem desconto de INSS?",
    answer: "Não. Estagiários regidos pela Lei do Estágio não sofrem desconto de INSS nem de FGTS."
  },
  {
    question: "Qual o valor máximo que posso pagar de INSS em 2025?",
    answer: "Devido ao teto previdenciário de R$ 8.157,41, o desconto máximo é aproximado de R$ 951,63."
  }
];
function NetSalaryPage() {
  const [grossSalary, setGrossSalary] = useState("");
  const [dependents, setDependents] = useState("0");
  const [otherDiscounts, setOtherDiscounts] = useState("");
  const [benefits, setBenefits] = useState("");
  const [hasMinorDependents, setHasMinorDependents] = useState(false);
  const [minorDependentsQty, setMinorDependentsQty] = useState("1");
  const [hasOvertime, setHasOvertime] = useState(false);
  const [overtimeHours, setOvertimeHours] = useState("");
  const [validationError, setValidationError] = useState(null);
  const [result, setResult] = useState(null);
  const calculate = () => {
    setValidationError(null);
    if (!grossSalary) {
      setValidationError("Informe o salário bruto.");
      return;
    }
    const baseSalary = parseFloat(grossSalary.replace(/\./g, "").replace(",", "."));
    const deps = parseInt(dependents) || 0;
    const others = parseFloat(otherDiscounts.replace(/\./g, "").replace(",", ".") || "0");
    const benefitsValue = parseFloat(benefits.replace(/\./g, "").replace(",", ".") || "0");
    const overtimeHrs = hasOvertime ? parseFloat(overtimeHours.replace(/\./g, "").replace(",", ".")) || 0 : 0;
    if (isNaN(baseSalary) || baseSalary <= 0) {
      setValidationError("Informe um salário válido maior que zero.");
      return;
    }
    const hourlyRate = baseSalary / 220;
    const overtimeValue = overtimeHrs * hourlyRate * 1.5;
    const salary = baseSalary + overtimeValue;
    let inss = 0;
    if (salary <= 1518) {
      inss = salary * 0.075;
    } else if (salary <= 2793.88) {
      inss = salary * 0.09 - 22.77;
    } else if (salary <= 4190.83) {
      inss = salary * 0.12 - 106.59;
    } else if (salary <= 8157.41) {
      inss = salary * 0.14 - 190.4;
    } else {
      inss = 8157.41 * 0.14 - 190.4;
    }
    const deductionPerDependent = 189.59;
    const baseAfterINSS = salary - inss;
    const legalDeduction = deps * deductionPerDependent;
    let irrfBaseA = baseAfterINSS - legalDeduction;
    let irrfBaseB = baseAfterINSS - 607.2;
    let irrfBase = 0;
    let usedSimplified = false;
    if (irrfBaseB < irrfBaseA) {
      irrfBase = irrfBaseB;
      usedSimplified = true;
    } else {
      irrfBase = irrfBaseA;
      usedSimplified = false;
    }
    if (irrfBase < 0) irrfBase = 0;
    let irrf = 0;
    if (irrfBase <= 2428.8) {
      irrf = 0;
    } else if (irrfBase <= 2826.65) {
      irrf = irrfBase * 0.075 - 182.16;
    } else if (irrfBase <= 3751.05) {
      irrf = irrfBase * 0.15 - 394.16;
    } else if (irrfBase <= 4664.68) {
      irrf = irrfBase * 0.225 - 675.49;
    } else {
      irrf = irrfBase * 0.275 - 908.73;
    }
    if (irrf < 0) irrf = 0;
    const totalDiscounts = inss + irrf + others;
    const netSalary = salary - totalDiscounts + benefitsValue;
    setResult({
      grossSalary: salary,
      baseSalary,
      overtimeValue,
      inss,
      irrf,
      netSalary,
      totalDiscounts,
      usedSimplified,
      irrfBaseLegal: irrfBaseA,
      irrfBaseSimplified: irrfBaseB,
      others,
      benefitsValue
    });
  };
  const handleClear = () => {
    setGrossSalary("");
    setDependents("0");
    setOtherDiscounts("");
    setBenefits("");
    setHasMinorDependents(false);
    setMinorDependentsQty("1");
    setHasOvertime(false);
    setOvertimeHours("");
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
    "name": "Calculadora Salário Líquido 2025: Exata (Lei 15.191)",
    "url": "https://www.junny.com.br/calculadoras/salario-liquido",
    "description": "Calcule seu Salário Líquido Dez/2025 com a Lei 15.191. Veja descontos do INSS (Teto R$ 8.157,41), IRRF e a vantagem do Desconto Simplificado.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "featureList": [
      "Cálculo exato Lei 15.191",
      "Tabela INSS Progressiva 2025",
      "Comparação Desconto Simplificado x Legal",
      "Simulação com Dependentes",
      "Validação de Campos com Mensagens de Erro"
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
        title: "Calculadora Salário Líquido 2025: Exata (Lei 15.191)",
        description: "Calcule seu Salário Líquido Dez/2025 com a Lei 15.191. Veja descontos do INSS (Teto R$ 8.157,41), IRRF e a vantagem do Desconto Simplificado.",
        canonical: "/calculadoras/salario-liquido"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": NET_SALARY_FAQS.map((faq) => ({
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
          { label: "Salário Líquido", href: "/calculadoras/salario-liquido" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Wallet, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Atualizado: Lei nº 15.191 (Dez/2025)" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de Salário Líquido 2025: ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "Cálculo Exato e Atualizado" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsx("div", { className: "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
          /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
          "Simular Salário Líquido"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "grossSalary", className: "text-sm text-gray-400", children: "Salário Bruto" }),
              /* @__PURE__ */ jsx(Tooltip, { content: "Valor total do seu salário sem os descontos (conforme carteira ou holerite)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "grossSalary",
                  type: "text",
                  inputMode: "decimal",
                  value: grossSalary,
                  onChange: (e) => handleCurrencyInput(e.target.value, setGrossSalary),
                  className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium",
                  placeholder: "0,00"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "dependents", className: "text-sm text-gray-400", children: "Nº de Dependentes (IRRF)" }),
                /* @__PURE__ */ jsx(Tooltip, { content: "Informe todos os dependentes do IR: cônjuge, filhos (de qualquer idade), pais idosos, etc. Cada um reduz R$ 189,59 do imposto." })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "dependents",
                  type: "number",
                  inputMode: "numeric",
                  value: dependents,
                  onChange: (e) => setDependents(e.target.value),
                  className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                  placeholder: "0",
                  min: "0"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 p-3 rounded-xl bg-white/5 border border-white/5 md:flex-row md:items-center md:justify-between", children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 cursor-pointer",
                    onClick: () => setHasMinorDependents(!hasMinorDependents),
                    children: [
                      /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${hasMinorDependents ? "bg-blue-500 border-blue-500" : "border-gray-500"}`, children: hasMinorDependents && /* @__PURE__ */ jsx(CheckCircle, { className: "w-3.5 h-3.5 text-white" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-300", children: "Filhos menores de 14 anos" }),
                        /* @__PURE__ */ jsx(Tooltip, { content: "Gera direito ao Salário-Família (até R$ 62,04/filho para salários até R$ 1.819,26). O valor é SOMADO ao seu salário líquido." })
                      ] })
                    ]
                  }
                ),
                hasMinorDependents && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 ml-8 md:ml-0", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Qtd:" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      inputMode: "numeric",
                      value: minorDependentsQty,
                      onChange: (e) => setMinorDependentsQty(e.target.value.replace(/[^0-9]/g, "")),
                      className: "w-14 bg-[#0a0a0a] border border-white/20 rounded-lg px-2 py-1 text-white text-sm text-center focus:outline-none focus:border-blue-500/50",
                      placeholder: "0"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "benefits", className: "text-sm text-gray-400", children: "Benefícios Recebidos" }),
                /* @__PURE__ */ jsx(Tooltip, { content: "Valor de benefícios que você RECEBE da empresa (VR, VA, auxílios). É SOMADO ao salário líquido final." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "benefits",
                    type: "text",
                    inputMode: "decimal",
                    value: benefits,
                    onChange: (e) => handleCurrencyInput(e.target.value, setBenefits),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "0,00"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "otherDiscounts", className: "text-sm text-gray-400", children: "Outros Descontos" }),
              /* @__PURE__ */ jsx(Tooltip, { content: "Descontos fixos em folha (consignado, pensão, VT, plano de saúde). É SUBTRAÍDO do salário líquido." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "otherDiscounts",
                  type: "text",
                  inputMode: "decimal",
                  value: otherDiscounts,
                  onChange: (e) => handleCurrencyInput(e.target.value, setOtherDiscounts),
                  className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                  placeholder: "0,00"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5 md:flex-row md:items-center md:justify-between", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center gap-3 cursor-pointer",
                onClick: () => setHasOvertime(!hasOvertime),
                children: [
                  /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${hasOvertime ? "bg-blue-500 border-blue-500" : "border-gray-500"}`, children: hasOvertime && /* @__PURE__ */ jsx(CheckCircle, { className: "w-3.5 h-3.5 text-white" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Horas extras (50%)" }),
                    /* @__PURE__ */ jsx(Tooltip, { content: "Horas além da jornada normal. Calcula: (salário ÷ 220) × 1,5 × horas. O valor é SOMADO ao salário bruto antes dos descontos." })
                  ] })
                ]
              }
            ),
            hasOvertime && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 ml-8 md:ml-0", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Horas:" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  inputMode: "decimal",
                  value: overtimeHours,
                  onChange: (e) => setOvertimeHours(e.target.value.replace(/[^0-9,]/g, "")),
                  className: "w-20 bg-[#0a0a0a] border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm text-center focus:outline-none focus:border-blue-500/50",
                  placeholder: "0"
                }
              )
            ] })
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
                  "Calcular Salário Líquido"
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
                  /* @__PURE__ */ jsx("span", { className: "text-blue-100 text-sm font-medium uppercase tracking-wider mb-1 block", children: "Salário Líquido Estimado" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-4xl md:text-5xl font-bold text-white tracking-tight", children: [
                    "R$ ",
                    result.netSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-blue-200/80 text-xs mt-2", children: "*Cálculo estimado baseado nas tabelas vigentes em Dez/2025." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm border-b border-white/20 pb-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-blue-100", children: "Salário Bruto" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                      "R$ ",
                      result.grossSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
                  "Proventos (Entrada)"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm", children: "Salário Base" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-green-300 font-medium text-sm", children: [
                      "+ R$ ",
                      result.baseSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    ] })
                  ] }),
                  result.overtimeValue > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm", children: "Horas Extras (50%)" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-green-300 font-medium text-sm", children: [
                      "+ R$ ",
                      result.overtimeValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    ] })
                  ] }),
                  result.benefitsValue > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm", children: "Benefícios (VR, VT, etc.)" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-green-300 font-medium text-sm", children: [
                      "+ R$ ",
                      result.benefitsValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
                  result.inss > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-200/70 text-sm", children: "INSS" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-red-300 font-medium text-sm", children: [
                      "- R$ ",
                      result.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    ] })
                  ] }),
                  result.irrf > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-red-200/70 text-sm", children: "IRRF" }),
                      result.usedSimplified && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded", children: "(Simplificado)" })
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "text-red-300 font-medium text-sm", children: [
                      "- R$ ",
                      result.irrf.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    ] })
                  ] }),
                  result.others > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-200/70 text-sm", children: "Outros Descontos" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-red-300 font-medium text-sm", children: [
                      "- R$ ",
                      result.others.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    ] })
                  ] }),
                  result.irrf === 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-400" }),
                      /* @__PURE__ */ jsx("span", { className: "text-emerald-300 text-sm", children: "IRRF" })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-medium text-sm", children: "Isento" })
                  ] }),
                  result.totalDiscounts === 0 && /* @__PURE__ */ jsx("div", { className: "p-4 text-center text-gray-400 text-sm italic border border-white/5 rounded-lg border-dashed", children: "Sem descontos aplicáveis" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/10", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-sm font-medium text-white mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-yellow-400" }),
                "Comparação de Métodos (IRRF)"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: `p-3 rounded-lg border ${!result.usedSimplified ? "bg-blue-500/10 border-blue-500/30" : "bg-white/5 border-white/5"}`, children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block", children: "Base Legal" }),
                  /* @__PURE__ */ jsxs("span", { className: `text-sm font-bold ${!result.usedSimplified ? "text-blue-400" : "text-white"}`, children: [
                    "R$ ",
                    Math.max(0, result.irrfBaseLegal).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  ] }),
                  !result.usedSimplified && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-blue-300 block mt-1", children: "✓ Mais vantajoso" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: `p-3 rounded-lg border ${result.usedSimplified ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/5 border-white/5"}`, children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block", children: "Simplificado (-R$ 607,20)" }),
                  /* @__PURE__ */ jsxs("span", { className: `text-sm font-bold ${result.usedSimplified ? "text-emerald-400" : "text-white"}`, children: [
                    "R$ ",
                    Math.max(0, result.irrfBaseSimplified).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  ] }),
                  result.usedSimplified && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-emerald-300 block mt-1", children: "✓ Mais vantajoso" })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-left-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5 text-yellow-400" }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white", children: "Resumo em 30 Segundos" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-white/5 pb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "Salário Mínimo Base" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: "R$ 1.518,00" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-white/5 pb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "Teto do INSS" }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-white text-right", children: [
                "R$ 8.157,41 ",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-normal text-gray-400", children: "(Desconto máx. de aprox. R$ 951,63)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-white/5 pb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "Isenção de IRRF" }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-blue-400 text-right", children: [
                "Até R$ 2.428,80 ",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-normal text-blue-400", children: "(considerando regras vigentes)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-white/5 pb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "Desconto Simplificado" }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-white text-right", children: [
                "R$ 607,20 ",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-normal text-gray-400", children: "(dedução automática se vantajosa)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "Regulação" }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-white text-right", children: [
                "Lei 15.191 ",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-normal text-gray-400", children: "e Portaria MPS/MF nº 6" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-red-300 leading-relaxed", children: [
            /* @__PURE__ */ jsx("strong", { children: "Atenção:" }),
            " O cálculo trabalhista mudou. A partir de maio e consolidado em Dez/2025, novas faixas (Lei nº 15.191) estão valendo."
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-700", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Coins, { className: "w-5 h-5 text-blue-500" }),
            "Para onde vai o dinheiro?"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-white text-sm block", children: "INSS (Previdência Social)" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Garante sua aposentadoria, auxílio-doença, salário-maternidade e outros benefícios. O desconto é progressivo até o teto de R$ 951,63 (aprox)." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-white text-sm block", children: "Imposto de Renda (IRRF)" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Incide sobre o restante após o INSS. O governo aplica alíquotas progressivas de 7,5% a 27,5% sobre a base de cálculo." })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-6 h-6 text-emerald-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como usar esta Calculadora de Salário Líquido" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
          "Para obter o resultado exato na nossa ",
          /* @__PURE__ */ jsx("strong", { children: "calculadora de salário líquido" }),
          ", siga estes passos simples:"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-emerald-400 font-bold mb-2", children: "01. Informe o Salário Bruto" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Digite o valor total do seu salário antes dos descontos (conforme holerite ou carteira)." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-emerald-400 font-bold mb-2", children: "02. Adicione Dependentes" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Informe o número de dependentes para dedução no IRRF (R$ 189,59 por dependente)." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-emerald-400 font-bold mb-2", children: "03. Clique em Calcular" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "O sistema processará automaticamente as regras de 2025, exibindo o valor líquido e as deduções." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-12 mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed text-lg", children: [
          "Entender quanto realmente cairá na sua conta bancária exige mais do que uma conta simples. A partir de maio deste ano, e consolidado agora em dezembro de 2025, o cálculo trabalhista mudou. Com a vigência da ",
          /* @__PURE__ */ jsx("strong", { children: "Lei nº 15.191" }),
          " e o reajuste inflacionário de 4,77% (INPC), as faixas de desconto foram alteradas. Utilizar uma ",
          /* @__PURE__ */ jsx("strong", { children: "Calculadora de Salário Líquido" }),
          " precisa e atualizada é essencial para não ser pego de surpresa. Nossa ferramenta processa automaticamente a escolha entre o ",
          /* @__PURE__ */ jsx("strong", { children: "Desconto Simplificado" }),
          " e as deduções legais, garantindo que você visualize o menor imposto possível dentro da lei."
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Tabelas Oficiais para Referência (2025)" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Briefcase, { className: "w-5 h-5 text-emerald-500" }),
              "Tabela de Contribuição INSS (Vigência Dez/2025)"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-white/5", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "p-3 text-white font-medium", children: "Faixa de Salário de Contribuição" }),
                /* @__PURE__ */ jsx("th", { className: "p-3 text-white font-medium text-center", children: "Alíquota Progressiva" }),
                /* @__PURE__ */ jsx("th", { className: "p-3 text-white font-medium text-center", children: "Parcela a Deduzir" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Até R$ 1.518,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "7,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "-" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "De R$ 1.518,01 até R$ 2.793,88" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "9,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 22,77" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "De R$ 2.793,89 até R$ 4.190,83" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "12,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 106,59" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "De R$ 4.190,84 até R$ 8.157,41" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "14,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 190,40" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mt-2", children: [
              "Fonte: ",
              /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal", target: "_blank", rel: "noopener noreferrer", className: "text-emerald-400 underline decoration-emerald-400/50 hover:decoration-emerald-400", children: "Portaria Interministerial MPS/MF nº 6" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(TrendingDown, { className: "w-5 h-5 text-emerald-500" }),
              "Tabela Progressiva Mensal IRRF (Lei 15.191)"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-white/5", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "p-3 text-white font-medium", children: "Base de Cálculo" }),
                /* @__PURE__ */ jsx("th", { className: "p-3 text-white font-medium text-center", children: "Alíquota (%)" }),
                /* @__PURE__ */ jsx("th", { className: "p-3 text-white font-medium text-center", children: "Parcela a Deduzir do IR" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Até R$ 2.428,80" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "Isento" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "-" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "De R$ 2.428,81 até R$ 2.826,65" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "7,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 182,16" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "De R$ 2.826,66 até R$ 3.751,05" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "15,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 394,16" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "De R$ 3.751,06 até R$ 4.664,68" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "22,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 675,49" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Acima de R$ 4.664,68" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "27,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 908,73" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mt-2", children: [
              "* Dedução por dependente: R$ 189,59 | Fonte: ",
              /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15191.htm", target: "_blank", rel: "noopener noreferrer", className: "text-emerald-400 underline decoration-emerald-400/50 hover:decoration-emerald-400", children: "Lei nº 15.191/2025" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-red-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-6 h-6 text-red-500" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Erros Comuns ao Calcular o Salário" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: 'O erro mais frequente é a "Conta de Padaria": aplicar a alíquota cheia (ex: 14%) direto no total.' })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Exemplo do Erro:" }),
              " Se você ganha R$ 4.500,00, NÃO multiplique por 14% (daria R$ 630,00). O correto é progressivo, pagando 7,5% sobre a primeira faixa, 9% sobre a segunda, etc."
            ] }),
            /* @__PURE__ */ jsx("p", { children: "Outra falha comum é ignorar itens como vale-transporte e convênio, que reduzem o líquido mas não mudam a base do INSS." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Zap, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: 'Como Funciona o "Segredo" do Desconto Simplificado' }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "A Receita Federal permite duas formas de cálculo. Nossa calculadora escolhe a melhor para você." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white block mb-2", children: "1. Deduções Legais" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Subtrai-se INSS, dependentes (R$ 189,59 cada) e pensão." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white block mb-2", children: "2. Desconto Simplificado" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                "Subtrai-se fixo R$ 607,20 direto da base (",
                /* @__PURE__ */ jsx("a", { href: "http://normas.receita.fazenda.gov.br/sijut2consulta/consulta.action?termoBusca=Instru%E7%E3o+Normativa+RFB+n%BA+2.174", target: "_blank", rel: "noopener noreferrer", className: "text-emerald-400 underline decoration-emerald-400/50 hover:decoration-emerald-400", children: "Instrução Normativa RFB nº 2.174" }),
                ")."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Para quem ganha até dois salários mínimos ajustados, o método simplificado geralmente garante isenção total." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mt-1", children: "Como Calcular (Passo a Passo Prático)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-1", children: "Exemplo 1: Salário R$ 5.000,00" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20", children: "Simplificado Vence" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "INSS (14%)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- R$ 509,60" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 italic", children: [
                  "Este é o valor descontado para a Previdência. Para conferir apenas este imposto, use nossa ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/inss", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de INSS" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Base Legal" }),
                  /* @__PURE__ */ jsx("span", { children: "R$ 4.490,40" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Base Simplificada (-607,20)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-bold", children: "R$ 4.392,80" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "IRRF (22,5%)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- R$ 312,89" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-1 font-bold text-white", children: [
                  /* @__PURE__ */ jsx("span", { children: "Salário Líquido" }),
                  /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "R$ 4.177,51" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-1", children: "Exemplo 2: Salário R$ 8.000,00" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20", children: "Dedução Legal Vence" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "INSS (14%)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- R$ 929,60" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Base Simplificada" }),
                  /* @__PURE__ */ jsx("span", { children: "R$ 7.392,80" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Base Legal (-INSS)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-bold", children: "R$ 7.070,40" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "IRRF (27,5%)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- R$ 1.035,63" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-1 font-bold text-white", children: [
                  /* @__PURE__ */ jsx("span", { children: "Salário Líquido" }),
                  /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "R$ 6.034,77" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Quem deve usar esta ferramenta?" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Trabalhadores CLT:" }),
              " Para conferir se o RH realizou os descontos corretamente."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Candidatos a Vagas:" }),
              " Para negociar pretensão salarial sabendo o valor real."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Prestadores de Serviço:" }),
              " Para comparar se vale a pena CLT vs PJ, utilizando nossa ferramenta de ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/clt-vs-pj", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "comparação CLT vs PJ" }),
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mt-1", children: "Casos Especiais" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "13º Salário e Férias" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed", children: [
                "O 13º possui tributação exclusiva e as Férias incluem o terço constitucional. Para simular, use a ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/decimo-terceiro", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de Décimo Terceiro" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Salários acima do Teto (R$ 8.157,41)" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed", children: [
                "Mesmo ganhando R$ 15.000,00, você contribuirá com o valor máximo aproximado de ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 951,63" }),
                ". O restante sofre apenas a incidência agressiva do IR (27,5%)."
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Dependentes e Pensão" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed", children: "Cada dependente reduz a base em R$ 189,59. Porém, com a regra do Desconto Simplificado (R$ 607,20), muitas vezes compensa mais usar o desconto padrão a não ser que você tenha 4 ou mais dependentes." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 text-center mb-12" }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: NET_SALARY_FAQS,
          title: "Perguntas Frequentes sobre Salário Líquido 2025",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  NetSalaryPage
};
//# sourceMappingURL=NetSalaryPage-VjpN7g5W.js.map
