import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Briefcase, Calculator, Scale, TrendingDown, Building2, AlertCircle, HelpCircle } from "lucide-react";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-CDVQG5oV.js";
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
import "./author-DhnQlz7G.js";
const CLT_PJ_FAQS = [
  {
    question: "Qual o valor máximo (teto) de desconto do INSS em 2025?",
    answer: "O teto previdenciário para 2025 é de R$ 8.157,41. Quem ganha salários CLT acima desse valor terá o desconto travado em aproximadamente R$ 951,63 mensais, não incidindo contribuição sobre o excedente."
  },
  {
    question: "Qual o multiplicador ideal para sair de CLT para PJ em 2025?",
    answer: "O multiplicador seguro é de 1.5x (50% de aumento sobre o bruto). Para salários baixos (até R$ 4k), 1.3x pode empatar. Para salários altos (acima de R$ 15k), 1.6x gera grande vantagem patrimonial devido à economia tributária."
  },
  {
    question: "PJ tem direito a Seguro-Desemprego?",
    answer: "Não. O seguro-desemprego é exclusivo para trabalhadores CLT demitidos sem justa causa. O PJ deve construir sua própria reserva de emergência (recomendado 6 a 12 meses de custo de vida) para cobrir o risco de encerramento de contrato."
  },
  {
    question: "Quanto custa manter uma empresa PJ (CNPJ)?",
    answer: "Além dos impostos sobre a nota (DAS), considere custos fixos de contabilidade (R$ 150 a R$ 600/mês), Certificado Digital anual (R$ 200) e taxas de alvará/TFE municipal. Esses custos devem ser deduzidos do valor da proposta antes de calcular seu lucro pessoal."
  }
];
function CLTVsPJPage() {
  const [salary, setSalary] = useState("");
  const [benefits, setBenefits] = useState("");
  const [pjSalary, setPjSalary] = useState("");
  const [proLabore, setProLabore] = useState("");
  const [useRFactorOptimization, setUseRFactorOptimization] = useState(true);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (useRFactorOptimization && pjSalary) {
      const pjVal = parseFloat(pjSalary.replace(/\./g, "").replace(",", ".") || "0");
      const optimizedProLabore = Math.max(pjVal * 0.28, 1518);
      setProLabore((optimizedProLabore * 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 }).replace(".", ","));
    }
  }, [pjSalary, useRFactorOptimization]);
  const calculate = () => {
    const salaryVal = parseFloat(salary.replace(/\./g, "").replace(",", ".") || "0");
    const benefitsVal = parseFloat(benefits.replace(/\./g, "").replace(",", ".") || "0");
    const pjVal = parseFloat(pjSalary.replace(/\./g, "").replace(",", ".") || "0");
    const proLaboreVal = parseFloat(proLabore.replace(/\./g, "").replace(",", ".") || "0");
    if (salaryVal === 0 && pjVal === 0) {
      setResult(null);
      return;
    }
    let inss = 0;
    if (salaryVal <= 1518) {
      inss = salaryVal * 0.075;
    } else if (salaryVal <= 2793.88) {
      inss = 1518 * 0.075 + (salaryVal - 1518) * 0.09;
    } else if (salaryVal <= 4190.83) {
      inss = 1518 * 0.075 + (2793.88 - 1518) * 0.09 + (salaryVal - 2793.88) * 0.12;
    } else if (salaryVal <= 8157.41) {
      inss = 1518 * 0.075 + (2793.88 - 1518) * 0.09 + (4190.83 - 2793.88) * 0.12 + (salaryVal - 4190.83) * 0.14;
    } else {
      inss = 1518 * 0.075 + (2793.88 - 1518) * 0.09 + (4190.83 - 2793.88) * 0.12 + (8157.41 - 4190.83) * 0.14;
    }
    const irrfBaseLegal = salaryVal - inss;
    const irrfBaseSimplified = salaryVal - 607.2;
    const irrfBase = Math.max(0, Math.min(irrfBaseLegal, irrfBaseSimplified));
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
    const netCltMonthly = salaryVal - inss - irrf;
    const fgts = salaryVal * 0.08;
    const thirteenth = salaryVal / 12;
    const vacation = (salaryVal + salaryVal / 3) / 12;
    const cltComparableMonthly = netCltMonthly + benefitsVal + fgts + thirteenth + vacation;
    const accountantCost = 300;
    const factorR = pjVal > 0 ? proLaboreVal / pjVal : 0;
    const annualRevenue = pjVal * 12;
    let pjTaxRate = 0;
    let pjTaxAmount = 0;
    let annex = "";
    if (factorR >= 0.28) {
      annex = "Anexo III (Fator R OK)";
      let nominalRate = 0;
      let deduction = 0;
      if (annualRevenue <= 18e4) {
        nominalRate = 0.06;
        deduction = 0;
      } else if (annualRevenue <= 36e4) {
        nominalRate = 0.112;
        deduction = 9360;
      } else if (annualRevenue <= 72e4) {
        nominalRate = 0.135;
        deduction = 17640;
      } else if (annualRevenue <= 18e5) {
        nominalRate = 0.16;
        deduction = 35640;
      } else {
        nominalRate = 0.21;
        deduction = 125640;
      }
      const calculatedTax = annualRevenue * nominalRate - deduction;
      pjTaxAmount = calculatedTax / 12;
      pjTaxRate = pjTaxAmount / pjVal;
    } else {
      annex = "Anexo V (Fator R < 28%)";
      let nominalRate = 0;
      let deduction = 0;
      if (annualRevenue <= 18e4) {
        nominalRate = 0.155;
        deduction = 0;
      } else if (annualRevenue <= 36e4) {
        nominalRate = 0.18;
        deduction = 4500;
      } else if (annualRevenue <= 72e4) {
        nominalRate = 0.195;
        deduction = 9900;
      } else {
        nominalRate = 0.205;
        deduction = 17100;
      }
      const calculatedTax = annualRevenue * nominalRate - deduction;
      pjTaxAmount = calculatedTax / 12;
      pjTaxRate = pjTaxAmount / pjVal;
    }
    let inssProLabore = 0;
    if (proLaboreVal <= 8157.41) {
      inssProLabore = proLaboreVal * 0.11;
    } else {
      inssProLabore = 8157.41 * 0.11;
    }
    const irrfPLBaseLegal = proLaboreVal - inssProLabore;
    const irrfPLBaseSimplified = proLaboreVal - 607.2;
    const irrfProLaboreBase = Math.max(0, Math.min(irrfPLBaseLegal, irrfPLBaseSimplified));
    let irrfProLabore = 0;
    if (irrfProLaboreBase <= 2428.8) {
      irrfProLabore = 0;
    } else if (irrfProLaboreBase <= 2826.65) {
      irrfProLabore = irrfProLaboreBase * 0.075 - 182.16;
    } else if (irrfProLaboreBase <= 3751.05) {
      irrfProLabore = irrfProLaboreBase * 0.15 - 394.16;
    } else if (irrfProLaboreBase <= 4664.68) {
      irrfProLabore = irrfProLaboreBase * 0.225 - 675.49;
    } else {
      irrfProLabore = irrfProLaboreBase * 0.275 - 908.73;
    }
    if (irrfProLabore < 0) irrfProLabore = 0;
    const netProLabore = proLaboreVal - inssProLabore - irrfProLabore;
    const companyCost = pjVal - pjTaxAmount - proLaboreVal - accountantCost;
    const exemptProfit = companyCost;
    const finalPjPocket = netProLabore + exemptProfit;
    setResult({
      cltTotal: cltComparableMonthly,
      netClt: netCltMonthly,
      pjDetails: {
        revenue: pjVal,
        taxRate: pjTaxRate,
        taxAmount: pjTaxAmount,
        proLabore: proLaboreVal,
        inssProLabore,
        irrfProLabore,
        netProLabore,
        exemptProfit,
        finalPjPocket,
        annex,
        factorR
      },
      difference: finalPjPocket - cltComparableMonthly
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, benefits, pjSalary, proLabore]);
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
    "name": "Calculadora CLT vs PJ: Comparativo Completo 2025",
    "url": "https://www.junny.com.br/calculadoras/clt-vs-pj",
    "description": "Descubra o que vale mais a pena: ser funcionário CLT ou abrir empresa PJ. Compare salários, impostos, benefícios e veja o lucro real.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
    "featureList": [
      "Comparativo Líquido CLT x PJ",
      "Cálculo de Impostos (Simples Nacional vs IRRF)",
      "Estimativa de Benefícios (Férias, 13º, FGTS)",
      "Análise de Fator R"
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
        title: "Calculadora CLT vs PJ 2025: Comparativo Real e Salário Líquido",
        description: "Descubra se vale a pena ser PJ ou CLT em 2025. Compare salário líquido, impostos (INSS/IRPF), Fator R e benefícios. Veja cálculo corrigido com o novo teto.",
        canonical: "/calculadoras/clt-vs-pj"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CLT_PJ_FAQS.map((faq) => ({
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
          { label: "CLT vs PJ", href: "/calculadoras/clt-vs-pj" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Carreira e Contratos" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "CLT vs PJ 2025" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Compare salários, impostos e benefícios. Entenda por que ganhar R$ 10k como PJ não é igual a R$ 10k CLT e evite armadilhas na migração." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
            "Simule a Comparação"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider", children: "Opção CLT" }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto Mensal" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
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
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Benefícios (VR, VA, Plano)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
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
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-white/5 pt-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-indigo-400 mb-4 uppercase tracking-wider", children: "Opção PJ" }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Faturamento Mensal" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        inputMode: "decimal",
                        value: pjSalary,
                        onChange: (e) => handleCurrencyInput(e.target.value, setPjSalary),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Pró-labore Definido" }),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs("label", { className: "text-xs text-indigo-400 cursor-pointer flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: useRFactorOptimization,
                          onChange: (e) => setUseRFactorOptimization(e.target.checked),
                          className: "rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500"
                        }
                      ),
                      "Otimizar Fator R (28%)"
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        inputMode: "decimal",
                        value: proLabore,
                        onChange: (e) => {
                          setUseRFactorOptimization(false);
                          handleCurrencyInput(e.target.value, setProLabore);
                        },
                        className: `w-full bg-[#0a0a0a] border rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none transition-all ${useRFactorOptimization ? "border-indigo-500/30 text-indigo-300" : "border-white/10 focus:border-indigo-500/50"}`,
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] })
              ] }),
              result && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-3 rounded-lg bg-white/5 text-xs text-gray-400 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Fator R Calculado: ",
                  /* @__PURE__ */ jsxs("strong", { children: [
                    (result.pjDetails.factorR * 100).toFixed(1),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded ${result.pjDetails.factorR >= 0.28 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`, children: result.pjDetails.annex })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: /* @__PURE__ */ jsx("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-center", children: result ? /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border ${result.difference > 0 ? "bg-indigo-500/10 border-indigo-500/20" : "bg-blue-500/10 border-blue-500/20"}`, children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Scale, { className: "w-5 h-5" }),
              "Veredito:"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: result.difference > 0 ? /* @__PURE__ */ jsx("span", { className: "text-indigo-400", children: "PJ compensa mais" }) : /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "CLT compensa mais" }) }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mt-2", children: [
              "Diferença aproximada: ",
              /* @__PURE__ */ jsxs("strong", { children: [
                "R$ ",
                Math.abs(result.difference).toLocaleString("pt-BR", { minimumFractionDigits: 2 })
              ] }),
              " por mês no bolso."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 rounded-lg bg-white/5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 block", children: "CLT (Pacote Mensal)" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Líquido + Benefícios + Provisões" })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-white", children: [
                "R$ ",
                result.cltTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 rounded-lg bg-white/5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 block", children: "PJ (Disponível Líquido)" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Pró-labore Líq. + Lucro Isento" })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-white", children: [
                "R$ ",
                result.pjDetails.finalPjPocket.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-gray-500 space-y-1 border-t border-white/5 pt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "(-) Imposto PJ (",
                result.pjDetails.taxRate * 100,
                "%)"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
                "R$ ",
                result.pjDetails.taxAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "(-) Contador" }),
              /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "R$ 300,00" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "(-) INSS/IRRF (Pessoa Física)" }),
              /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
                "R$ ",
                (result.pjDetails.inssProLabore + result.pjDetails.irrfProLabore).toLocaleString("pt-BR", { minimumFractionDigits: 2 })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-white/5", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-300 mb-3", children: "Na prática (Dinheiro na Mão):" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 block", children: "Salário Líquido CLT" }),
                /* @__PURE__ */ jsxs("span", { className: "text-base font-bold text-blue-300", children: [
                  "R$ ",
                  result.netClt.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 block", children: "Entrada Líquida PJ" }),
                /* @__PURE__ */ jsxs("span", { className: "text-base font-bold text-indigo-300", children: [
                  "R$ ",
                  result.pjDetails.finalPjPocket.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                ] })
              ] })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center text-gray-400 py-12", children: [
          /* @__PURE__ */ jsx(Scale, { className: "w-16 h-16 mx-auto mb-4 text-gray-600" }),
          /* @__PURE__ */ jsx("p", { children: "Preencha os dois lados para ver o comparativo detalhado com Fator R." })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-12 mb-24 text-gray-300", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-6", children: "Resumo em 30 Segundos" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "A escolha entre o regime celetista e a prestação de serviços como Pessoa Jurídica não é apenas sobre quem paga menos imposto, mas sobre ",
              /* @__PURE__ */ jsx("strong", { children: "Disponibilidade Líquida Anual" }),
              ". Enquanto a CLT oferece um pacote de proteção (FGTS, Férias + 1/3, 13º Salário e Multa Rescisória), o modelo PJ exige que você precifique esses benefícios na sua nota fiscal."
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Em 2025, a regra de ouro para não perder patrimônio é buscar propostas PJ que sejam, no mínimo, ",
              /* @__PURE__ */ jsx("strong", { children: "40% a 50% superiores" }),
              " ao salário bruto CLT equivalente, cobrindo custos de contador, impostos e, principalmente, planos de saúde individuais."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-emerald-400 mb-2", children: "Dados Oficiais 2025:" }),
                /* @__PURE__ */ jsxs("ul", { className: "text-sm space-y-2 text-emerald-100/80", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    "• ",
                    /* @__PURE__ */ jsx("strong", { children: "Teto do INSS:" }),
                    " R$ 8.157,41"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    "• ",
                    /* @__PURE__ */ jsx("strong", { children: "Isenção IRPF:" }),
                    " Até R$ 2.428,80"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    "• ",
                    /* @__PURE__ */ jsx("strong", { children: "Fator R:" }),
                    " Reduz imposto PJ para 6%"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-blue-400 mb-2", children: "Vantagem PJ (Simples Nacional):" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-100/80", children: "O PJ no Anexo III paga significativamente menos imposto em faixas de renda alta comparado à alíquota de 27,5% do IRPF na CLT." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Tabelas Oficiais de Referência (2025)" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(TrendingDown, { className: "w-5 h-5 text-indigo-500" }),
                "Tabela Progressiva Mensal IRPF (Vigência Maio 2025)"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
                /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-3 rounded-l-lg", children: "Base de Cálculo (R$)" }),
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-3", children: "Alíquota" }),
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-3 rounded-r-lg", children: "Parcela a Deduzir (R$)" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "Até 2.428,80" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3 text-green-400", children: "Isento" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "0,00" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "2.428,81 a 2.826,65" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "7,5%" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "182,16" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "2.826,66 a 3.751,05" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "15,0%" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "394,16" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "3.751,06 a 4.664,68" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "22,5%" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "675,49" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "Acima de 4.664,68" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "27,5%" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "869,36" })
                  ] })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Building2, { className: "w-5 h-5 text-indigo-500" }),
                "Simples Nacional 2025 - Anexo III (Serviços com Fator R)"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-3", children: "*Aplicável se folha de pagamento for ≥ 28% do faturamento." }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
                /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-3 rounded-l-lg", children: "Receita Bruta 12 Meses (R$)" }),
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-3", children: "Alíquota Nominal" }),
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-3 rounded-r-lg", children: "Valor a Deduzir (R$)" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "Até 180.000,00" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3 text-green-400 font-bold", children: "6,00%" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "-" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "180.000,01 a 360.000,00" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "11,20%" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "9.360,00" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "360.000,01 a 720.000,00" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "13,50%" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "17.640,00" })
                  ] })
                ] })
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-orange-500" }),
              "Erros Comuns"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "O erro mais frequente é a comparação direta entre ",
                /* @__PURE__ */ jsx("strong", { children: "Salário Líquido Mensal CLT" }),
                " e ",
                /* @__PURE__ */ jsx("strong", { children: "Valor da Nota Fiscal PJ" }),
                ". Essa conta ignora que o trabalhador CLT recebe 13,33 salários por ano (13º + 1/3 férias) e FGTS."
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Outro ponto crítico é o ",
                /* @__PURE__ */ jsx("strong", { children: "Plano de Saúde" }),
                '. Planos empresariais (CLT) custam até 300% menos que planos individuais por adesão (PJ). Se não calcular isso, seu "lucro" vira prejuízo.'
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-indigo-500" }),
              "Como Funciona o Fator R"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "Em 2025, profissionais liberais e de tecnologia dependem do ",
                /* @__PURE__ */ jsx("strong", { children: "Fator R" }),
                '. Se a sua empresa PJ não tiver funcionários, sua "folha" será o seu próprio ',
                /* @__PURE__ */ jsx("strong", { children: "Pró-labore" }),
                "."
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-3 rounded-lg text-center font-mono text-xs md:text-sm text-indigo-300 border border-indigo-500/20", children: "Fator R = Massa Salarial (12m) / Receita (12m) ≥ 0,28" }),
              /* @__PURE__ */ jsx("p", { children: "Se atingir 28%, paga Anexo III (inicia em 6%). Se for menor, cai no Anexo V (inicia em 15,5%)." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Como Calcular (Exemplos Reais)" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white border-b border-white/10 pb-2", children: "Exemplo 1: Profissional Júnior" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-blue-400", children: "Cenário CLT:" }),
                  " Salário R$ 5.000"
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "Líquido Mensal: R$ 4.177,52" }),
                  /* @__PURE__ */ jsx("li", { children: "Pacote Anual: ~R$ 60.100 (com benefícios)" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-indigo-400", children: "Cenário PJ:" }),
                  " Faturamento R$ 7.500 (1.5x)"
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "Custo: Contador + Saúde (~R$ 600)" }),
                  /* @__PURE__ */ jsx("li", { children: "Líquido Mensal: ~R$ 6.219" }),
                  /* @__PURE__ */ jsx("li", { children: "Pacote Anual: ~R$ 74.628" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-emerald-400 text-xs mt-2 bg-emerald-500/10 p-2 rounded border border-emerald-500/20", children: "Veredito: Ganho de 20%. Vantajoso, mas exige disciplina." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white border-b border-white/10 pb-2", children: "Exemplo 2: Profissional Sênior" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-blue-400", children: "Cenário CLT:" }),
                  " Salário R$ 15.000"
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "Descontos: Teto INSS + IR alto" }),
                  /* @__PURE__ */ jsx("li", { children: "Pacote Anual: ~R$ 175.000" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-indigo-400", children: "Cenário PJ:" }),
                  " Faturamento R$ 22.500 (1.5x)"
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "Impostos: Simples Efetivo (~8%)" }),
                  /* @__PURE__ */ jsx("li", { children: "Líquido Mensal: R$ 19.133,81" }),
                  /* @__PURE__ */ jsx("li", { children: "Pacote Anual: ~R$ 217.284" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-emerald-400 text-xs mt-2 bg-emerald-500/10 p-2 rounded border border-emerald-500/20", children: "Veredito: R$ 42.000 a mais por ano." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mt-1", children: "Casos Especiais" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Férias e 13º no PJ" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed", children: 'Legalmente, PJ não tem direito a esses benefícios. "Dias não trabalhados são dias não faturados". Você deve calcular 1/12 da sua receita mensal e guardar em uma aplicação financeira para criar sua própria reserva de férias.' })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Profissionais Autônomos vs MEI" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed", children: [
                "Cuidado: Profissões intelectuais regulamentadas (Programadores, Engenheiros, Médicos) ",
                /* @__PURE__ */ jsx("strong", { children: "não podem ser MEI" }),
                ". Se abrir indevidamente, corre risco de fiscalização. O caminho correto é abrir uma ME (Microempresa)."
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Aposentadoria e INSS" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed", children: "No CLT, você contribui sobre o teto. No PJ, geralmente sobre o salário mínimo ou 28%. Isso reduzirá sua aposentadoria oficial. A diferença economizada deve ser investida obrigatoriamente." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: CLT_PJ_FAQS,
          title: "Perguntas Frequentes sobre CLT e PJ",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  CLTVsPJPage
};
//# sourceMappingURL=CLTVsPJPage-DL-Ub81c.js.map
