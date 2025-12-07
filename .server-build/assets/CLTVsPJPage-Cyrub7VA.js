import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Briefcase, Calculator, Scale } from "lucide-react";
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
const CLT_PJ_FAQS = [
  {
    question: "Quanto devo pedir a mais no PJ para valer a pena?",
    answer: "Para manter o mesmo poder de compra, o valor bruto da proposta PJ deve ser, no mínimo, de **40% a 50% superior** ao salário bruto CLT. Essa margem é essencial para cobrir impostos (DAS), custos contábeis, ausência de benefícios (como Vale Refeição) e permitir a criação de uma reserva financeira equivalente ao FGTS e 13º salário."
  },
  {
    question: "PJ tem direito a 13º salário e férias?",
    answer: 'Por lei, não. PJ é uma relação comercial entre empresas (B2B). No entanto, é comum negociar no contrato um recesso remunerado ou um "bônus" anual, mas isso não é obrigação legal. Vale lembrar que horas trabalhadas a mais raramente são pagas, mas você pode usar nossa calculadora de [horas extras](/calculadoras/horas-extras) para precificar serviços adicionais fora do escopo.'
  },
  {
    question: 'O que é a "Pejotização"?',
    answer: "Pejotização é a prática ilegal onde uma empresa contrata um funcionário como PJ para evitar encargos trabalhistas, mas exige cumprimento de horário, subordinação direta e exclusividade. Isso configura vínculo empregatício disfarçado, gerando alto risco jurídico para o contratante e direitos trabalhistas retroativos para o profissional em caso de ação judicial."
  },
  {
    question: "Sou obrigado a ter contador sendo PJ?",
    answer: "Sim, se você for ME (Microempresa) ou EPP, a contabilidade é obrigatória para manter a escrituração fiscal em dia e distribuir lucros com isenção de IR. Apenas o MEI dispensa contador, mas o limite de faturamento do MEI (R$ 81 mil/ano) raramente atende profissionais seniores que migram da CLT."
  },
  {
    question: "Como funciona o FGTS para PJ?",
    answer: "O profissional PJ **não tem direito ao FGTS**, pois este é um benefício exclusivo da CLT. Para não ficar desprotegido, você deve calcular o valor que seria depositado (8% do salário) e investir esse montante mensalmente em uma aplicação de renda fixa segura. Use nossa [calculadora de FGTS](/calculadoras/fgts) para projetar quanto você deve guardar por conta própria."
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
      const optimizedProLabore = Math.max(pjVal * 0.28, 1412);
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
    if (salaryVal <= 1412) inss = salaryVal * 0.075;
    else if (salaryVal <= 2666.68) inss = 1412 * 0.075 + (salaryVal - 1412) * 0.09;
    else if (salaryVal <= 4000.03) inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salaryVal - 2666.68) * 0.12;
    else if (salaryVal <= 7786.02) inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salaryVal - 4000.03) * 0.14;
    else inss = 908.85;
    const irrfBase = salaryVal - inss;
    let irrf = 0;
    if (irrfBase <= 2259.2) irrf = 0;
    else if (irrfBase <= 2826.65) irrf = irrfBase * 0.075 - 169.44;
    else if (irrfBase <= 3751.05) irrf = irrfBase * 0.15 - 381.44;
    else if (irrfBase <= 4664.68) irrf = irrfBase * 0.225 - 662.77;
    else irrf = irrfBase * 0.275 - 896;
    if (irrf < 0) irrf = 0;
    const netCltMonthly = salaryVal - inss - irrf;
    const fgts = salaryVal * 0.08;
    const thirteenth = salaryVal / 12;
    const vacation = (salaryVal + salaryVal / 3) / 12;
    const cltComparableMonthly = netCltMonthly + benefitsVal + fgts + thirteenth + vacation;
    const accountantCost = 300;
    const factorR = pjVal > 0 ? proLaboreVal / pjVal : 0;
    let pjTaxRate = 0;
    let annex = "";
    if (factorR >= 0.28) {
      pjTaxRate = 0.06;
      annex = "Anexo III (6%)";
    } else {
      pjTaxRate = 0.155;
      annex = "Anexo V (15.5%)";
    }
    const pjTaxAmount = pjVal * pjTaxRate;
    let inssProLabore = 0;
    if (proLaboreVal <= 7786.02) inssProLabore = proLaboreVal * 0.11;
    else inssProLabore = 7786.02 * 0.11;
    const irrfProLaboreBase = proLaboreVal - inssProLabore;
    let irrfProLabore = 0;
    if (irrfProLaboreBase <= 2259.2) irrfProLabore = 0;
    else if (irrfProLaboreBase <= 2826.65) irrfProLabore = irrfProLaboreBase * 0.075 - 169.44;
    else if (irrfProLaboreBase <= 3751.05) irrfProLabore = irrfProLaboreBase * 0.15 - 381.44;
    else if (irrfProLaboreBase <= 4664.68) irrfProLabore = irrfProLaboreBase * 0.225 - 662.77;
    else irrfProLabore = irrfProLaboreBase * 0.275 - 896;
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
        title: "Calculadora CLT x PJ 2025: Comparativo Salário Líquido e Impostos",
        description: "Use nossa calculadora CLT x PJ para descobrir qual vale a pena. Aprenda a fórmula de equivalência, tabelas do Simples Nacional e direitos em 2025.",
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
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Compare salários, impostos e benefícios. Descubra qual regime de trabalho é mais vantajoso para o seu momento financeiro." })
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
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-6", children: "Calculadora CLT x PJ: Comparativo Completo para 2025" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "A principal diferença entre CLT e PJ reside na tributação e nos benefícios." }),
              " Enquanto o profissional CLT tem impostos (INSS e IRRF) retidos na fonte e acesso a direitos automáticos como FGTS, férias remuneradas e 13º salário, o PJ recebe o valor bruto integral, devendo assumir a responsabilidade pelo pagamento de tributos (DAS), contador e sua própria previdência privada ou pública."
            ] }),
            /* @__PURE__ */ jsx("p", { children: "Abaixo, detalhamos a lógica financeira que você deve dominar antes de tomar a decisão de trocar a carteira assinada pelo contrato de prestação de serviços." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white", children: "Diferença de cálculo: Salário Bruto CLT vs Faturamento PJ" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Ao migrar para o modelo PJ, você deixa de ser um ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-funcionario", className: "text-blue-400 hover:text-blue-300 underline", children: "custo total do funcionário" }),
              " para a empresa e passa a ser um fornecedor."
            ] }),
            /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Na CLT, seu pacote inclui automaticamente:" }) }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2 text-gray-400", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "8% de FGTS:" }),
                " Valor depositado mensalmente em conta vinculada."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "33% de Adicional de Férias:" }),
                " O terço constitucional garantido por lei sobre o salário."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsxs("strong", { children: [
                  "8,33% de ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/decimo-terceiro", className: "text-blue-400 hover:text-blue-300 underline", children: "13º Salário" }),
                  ":"
                ] }),
                " A provisão mensal equivalente a um salário extra por ano (1/12)."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-indigo-500 shrink-0" }),
            "Como calcular a equivalência (Fórmula)"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 leading-relaxed", children: /* @__PURE__ */ jsx("p", { children: "O cálculo de equivalência consiste em somar ao salário bruto todos os benefícios da CLT (férias, 13º, FGTS) e adicionar os custos operacionais do PJ para encontrar o faturamento de empate." }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "Impostos no Simples Nacional" }),
            /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
              "A maioria dos profissionais de tecnologia, marketing e consultoria se enquadra no ",
              /* @__PURE__ */ jsx("strong", { children: "Simples Nacional" }),
              ". O imposto que você pagará depende do fator R."
            ] }),
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mt-4 mb-2", children: "O que é o Fator R?" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Para pagar menos imposto (Anexo III), seu Pró-labore deve representar, no mínimo, ",
              /* @__PURE__ */ jsx("strong", { children: "28% do seu faturamento mensal" }),
              ". Caso contrário, a tributação sobe automaticamente para 15,5% (Anexo V)."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300 uppercase", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-3 py-3 rounded-l-lg", children: "Faixa (12 meses)" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-3", children: "Anexo III" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-3 rounded-r-lg", children: "Anexo V" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-3 font-medium text-white", children: "Até R$ 180k" }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-3 text-green-400 font-bold", children: "6,00%" }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-3 text-red-400", children: "15,50%" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-3 font-medium text-white", children: "R$ 180k a 360k" }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "11,20%" }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "18,00%" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-3 font-medium text-white", children: "R$ 360k a 720k" }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "13,50%" }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "19,50%" })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "Vantagens e Riscos" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500" }),
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-blue-400", children: "CLT (Carteira Assinada)" })
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "text-sm space-y-2", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Estabilidade:" }),
                    " Protegido na demissão (multa 40% FGTS)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Liquidez:" }),
                    " Recebe líquido menor, benefícios retidos."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Férias:" }),
                    " 30 dias remunerados + 1/3 garantido."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Aposentadoria:" }),
                    " ",
                    /* @__PURE__ */ jsx(Link, { to: "/calculadoras/inss", className: "underline hover:text-white", children: "INSS descontado" }),
                    " automaticamente (teto)."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-t border-white/10 pt-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-indigo-500" }),
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-indigo-400", children: "PJ (Prestador de Serviço)" })
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "text-sm space-y-2", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Estabilidade:" }),
                    " Contrato comercial, rescisão facilitada."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Liquidez:" }),
                    " Recebe bruto maior. Sucesso depende de ",
                    /* @__PURE__ */ jsx(Link, { to: "/calculadoras/investimentos", className: "underline hover:text-white", children: "investir o excedente" }),
                    "."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Férias:" }),
                    " Dias não trabalhados não geram receita (salvo contrato)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Aposentadoria:" }),
                    " Paga INSS sobre Pró-labore (minímo ou 28%)."
                  ] })
                ] })
              ] })
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
//# sourceMappingURL=CLTVsPJPage-Cyrub7VA.js.map
