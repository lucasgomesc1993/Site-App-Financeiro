import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Briefcase, Calculator, Scale, Check, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
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
const CLT_PJ_FAQS = [
  {
    question: "Qual a diferença salarial para valer a pena ser PJ?",
    answer: 'A regra de mercado, validada por nossa <strong>Calculadora CLT vs PJ</strong>, indica que o salário PJ deve ser entre <strong>1,5 e 1,6 vezes</strong> o salário bruto CLT. Além do salário bruto, considere que o CLT tem vale-refeição, plano de saúde e estabilidade. Para compensar esses "custos invisíveis" e a falta de aviso prévio, a remuneração PJ precisa ser significativamente maior para gerar a mesma segurança patrimonial.'
  },
  {
    question: "O que é o Fator R no Simples Nacional?",
    answer: "O governo criou esse mecanismo para incentivar a contratação de funcionários. É um cálculo mensal que define se você paga 6% ou 15,5% de imposto. Se a sua folha de pagamento (incluindo seu próprio Pró-Labore) for igual ou superior a <strong>28%</strong> do faturamento, você paga a alíquota reduzida do Anexo III. Caso contrário, a tributação sobe drasticamente para o Anexo V."
  },
  {
    question: "PJ tem direito a férias e 13º salário?",
    answer: 'Por lei, não. O PJ é uma empresa prestadora de serviços e recebe apenas pelo que entrega. Embora a lei não obrigue, muitos contratos de "PJ Premium" negociam cláusulas de descanso remunerado (off). Sem essa cláusula escrita no contrato de prestação de serviços, dias não trabalhados (férias ou feriados) significam faturamento zero no final do mês.'
  },
  {
    question: "Qual o teto do desconto do INSS em 2025?",
    answer: "O teto do benefício e da contribuição previdenciária em 2025 é de <strong>R$ 8.157,41</strong>. Esse valor é o limite máximo que o governo usa para calcular o desconto em folha e sua futura aposentadoria. Para empregados, o desconto máximo é de <strong>R$ 951,63</strong> mensais. Mesmo que você ganhe acima disso, o valor do INSS não ultrapassa esse limite."
  },
  {
    question: "Como calcular o salário líquido CLT em 2025?",
    answer: "O cálculo começa subtraindo a contribuição do INSS (progressiva de 7,5% a 14%, por faixas). Sobre o valor restante (base de cálculo), desconta-se um valor por dependente legal e aplica-se a alíquota do IRRF (até 27,5%). O resultado final é o dinheiro que efetivamente cai na conta. Você pode usar nossa <strong>Calculadora CLT vs PJ</strong> ou a ferramenta específica de <a href='/calculadoras/salario-liquido'>salário líquido</a> para fazer essa conta exata."
  },
  {
    question: "MEI conta como tempo de aposentadoria?",
    answer: "Sim. O MEI contribui para o INSS e conta como tempo de contribuição. No entanto, o valor do benefício de aposentadoria será <strong>limitado a 1 salário mínimo</strong>, exceto se forem feitas contribuições complementares (facultativas). Profissionais com histórico CLT de salários altos devem considerar previdência privada ou GPS adicional para evitar perda patrimonial na aposentadoria."
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
      setProLabore(optimizedProLabore.toLocaleString("pt-BR", { minimumFractionDigits: 2 }));
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
    "name": "Calculadora CLT vs PJ 2025: Comparativo Salário Líquido",
    "url": "https://www.junny.com.br/calculadoras/clt-vs-pj",
    "description": "Utilize nossa Calculadora CLT vs PJ 2025 para comparar salário líquido, impostos e benefícios. Descubra se vale a pena migrar de regime com base na equivalência financeira.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
    "featureList": [
      "Comparação CLT vs PJ 2025",
      "Cálculo de Salário Líquido",
      "Cálculo de Impostos (Simples Nacional vs IRPF)",
      "Análise de Fator R",
      "Estimativa de Benefícios"
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
        title: "Calculadora CLT vs PJ 2025: Comparativo Salário Líquido",
        description: "Use nossa Calculadora CLT vs PJ 2025 para simular seu salário líquido real. Descubra se a troca compensa a perda de FGTS e férias com o Fator R.",
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
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Carreira e Contratos" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "CLT vs PJ 2025" }),
            ": Comparativo de Salário Líquido e Impostos"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
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
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 h-full", children: /* @__PURE__ */ jsx("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-center", children: result ? /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
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
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 leading-relaxed text-gray-300", children: [
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-blue-500 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Teto do INSS:" }),
                  " A contribuição previdenciária incide até o limite de ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 8.157,41" }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-blue-500 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Regra de Ouro:" }),
                  " Para manter o mesmo poder de compra, o faturamento PJ deve ser ",
                  /* @__PURE__ */ jsx("strong", { children: "1,6x" }),
                  " o salário bruto CLT (ex: R$ 10k CLT = R$ 16k PJ)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-blue-500 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Limite MEI:" }),
                  " Permanece em ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 81.000/ano" }),
                  " até a sanção final do PLP 60/2025, que propõe novo limite de enquadramento ainda não divulgado oficialmente."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-blue-500 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Fator R:" }),
                  " Empresas do Simples Nacional pagam menos imposto (Anexo III) se a folha de pagamento for igual ou superior a ",
                  /* @__PURE__ */ jsx("strong", { children: "28%" }),
                  " do faturamento."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-blue-500 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "IRRF 2025:" }),
                  " Isenção para rendimentos até ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 2.428,80" }),
                  "."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-4 italic", children: "*Atualizado em Dezembro de 2025" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 border-t border-white/5 pt-6", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'A escolha entre o regime CLT (Consolidação das Leis do Trabalho) e a prestação de serviços como PJ (Pessoa Jurídica) deixou de ser apenas uma questão burocrática para se tornar uma estratégia de engenharia financeira. Em dezembro de 2025, com as novas tabelas progressivas do INSS e a complexidade do Fator R no Simples Nacional, comparar apenas o "valor bruto mensal" é o caminho mais rápido para perder dinheiro.' }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Esta ",
                /* @__PURE__ */ jsx("strong", { children: "Calculadora CLT vs PJ" }),
                " utiliza a metodologia de ",
                /* @__PURE__ */ jsx("strong", { children: "Equivalência Financeira Anualizada (EFA)" }),
                ". Diferente de ferramentas simplistas, nós consideramos o pacote anual completo do CLT (13º, férias remuneradas, FGTS) contra os custos operacionais e impostos reais do PJ, oferecendo um veredito preciso sobre qual modelo coloca mais dinheiro no seu bolso."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Tabelas Oficiais de Referência (Vigência 2025)" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-8", children: [
            "Para compreender os resultados gerados pela nossa ",
            /* @__PURE__ */ jsx("strong", { children: "Calculadora CLT vs PJ" }),
            " e validar sua simulação, é fundamental consultar as faixas de tributação vigentes neste mês."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-indigo-500" }),
                "Tabela Progressiva INSS 2025 (Teto: R$ 8.157,41)"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
                /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-3 rounded-l-lg", children: "Faixa de Salário de Contribuição (R$)" }),
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-3 rounded-r-lg", children: "Alíquota Aplicada" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "Até R$ 1.518,00" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "7,5%" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "De R$ 1.518,01 até R$ 2.793,88" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "9%" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "De R$ 2.793,89 até R$ 4.190,83" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "12%" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "De R$ 4.190,84 até R$ 8.157,41" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "14%" })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 text-xs text-gray-400 space-y-2", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Nota:" }),
                  " O cálculo do INSS para empregados é feito ",
                  /* @__PURE__ */ jsx("strong", { children: "por faixas cumulativas" }),
                  ", ou seja, cada parcela do salário é tributada com sua respectiva alíquota. ",
                  /* @__PURE__ */ jsx("strong", { children: 'Não há "parcelas a deduzir" no INSS' }),
                  ", ao contrário do IRRF. O valor máximo descontado em 2025 é de ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 951,63" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Entenda o Cálculo Progressivo:" }),
                  " O desconto do INSS não é aplicado sobre o total do salário com uma única alíquota. O cálculo é fatiado: você paga 7,5% sobre a primeira faixa, 9% sobre a parte que excede essa faixa, e assim por diante. Isso garante que o desconto seja realmente progressivo."
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
                  " Baseado na ",
                  /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Tabela de Contribuição Mensal - INSS" }),
                  "."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(TrendingDown, { className: "w-5 h-5 text-indigo-500" }),
                "Tabela Mensal IRRF 2025"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
                /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-3 rounded-l-lg", children: "Base de Cálculo (Salário - INSS - Dependentes)" }),
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-3", children: "Alíquota" }),
                  /* @__PURE__ */ jsx("th", { className: "px-3 py-3 rounded-r-lg", children: "Parcela a Deduzir (R$)" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "Até R$ 2.428,80" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3 text-green-400", children: "Isento" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "-" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "De R$ 2.428,81 até R$ 2.826,65" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "7,5%" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "R$ 182,16" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "De R$ 2.826,66 até R$ 3.751,05" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "15,0%" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "R$ 394,16" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "De R$ 3.751,06 até R$ 4.664,68" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "22,5%" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "R$ 675,49" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "Acima de R$ 4.664,68" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "27,5%" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: "R$ 908,73" })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 text-xs text-gray-400", children: /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
                " Dados da ",
                /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Receita Federal do Brasil - Tabelas 2025" }),
                "."
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-yellow-500" }),
              'A "Pegadinha" do Salário Bruto'
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "O erro mais frequente ao migrar de carreira é comparar o salário mensal CLT diretamente com a nota fiscal PJ. O trabalhador CLT recebe, na prática, ",
                /* @__PURE__ */ jsx("strong", { children: "13,33 remunerações por ano" }),
                " (12 meses + 13º salário + 1/3 de férias), enquanto o PJ recebe apenas pelo que produz. Uma ",
                /* @__PURE__ */ jsx("strong", { children: "Calculadora CLT vs PJ" }),
                " eficiente deve subtrair essa diferença estrutural antes de mostrar o resultado."
              ] }),
              /* @__PURE__ */ jsx("p", { children: "Além disso, o CLT possui o depósito compulsório do FGTS (8% do bruto), que funciona como um patrimônio diferido. Ao virar PJ, esse valor desaparece e deve ser embutido na sua precificação." }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "A Regra do 1.6x:" }),
                ' O mercado convencionou o "Multiplicador de Ouro" de ',
                /* @__PURE__ */ jsx("strong", { children: "1.6x" }),
                ". Para que a troca valha a pena financeiramente — cobrindo a perda de estabilidade, férias pagas, VR/VA e plano de saúde — o valor bruto PJ deve ser pelo menos 60% maior que o bruto CLT."
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs mt-2 border-t border-white/5 pt-2", children: [
                "Para visualizar o impacto real dessas verbas, você pode usar nossa calculadora de ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/rescisao", className: "text-blue-400 hover:underline", children: "rescisão de contrato" }),
                " para entender o montante acumulado em uma saída CLT."
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
                "Se você não pode ser MEI (profissionais intelectuais como desenvolvedores, engenheiros e arquitetos), sua empresa será tributada pelo Simples Nacional. Aqui reside o segredo da eficiência tributária em 2025: o ",
                /* @__PURE__ */ jsx("strong", { children: "Fator R" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                "O governo define a alíquota baseada na proporção entre sua folha de pagamento (Pró-Labore) e seu faturamento. Ao utilizar nossa ",
                /* @__PURE__ */ jsx("strong", { children: "Calculadora CLT vs PJ" }),
                ", esse cálculo é feito automaticamente."
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-3 rounded-lg text-center font-mono text-xs md:text-sm text-indigo-300 border border-indigo-500/20", children: "Fator R = Folha de Salários (12m) / Receita Bruta (12m)" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-1 mt-2 text-xs", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Cenário Vantajoso (Anexo III):" }),
                  " Se Fator R ≥ 28%, imposto inicia em 6%."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Cenário Penalizador (Anexo V):" }),
                  " Se Fator R ",
                  "<",
                  " 28%, imposto inicia em 15,5%."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs mt-2", children: [
                /* @__PURE__ */ jsx("strong", { children: "Estratégia Prática:" }),
                ' Para pagar menos imposto, o profissional PJ define um "Pró-Labore" que seja exatamente 28% do faturamento.'
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
                /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
                " Consulte no ",
                /* @__PURE__ */ jsx("a", { href: "https://www8.receita.fazenda.gov.br/SimplesNacional/", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Portal do Simples Nacional - Receita Federal" }),
                "."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Como Calcular o Salário Líquido (Passo a Passo)" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Metodologia" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mb-4", children: [
                "Para reproduzir manualmente a lógica da ",
                /* @__PURE__ */ jsx("strong", { children: "Calculadora CLT vs PJ" }),
                ", você deve seguir uma ordem rígida de deduções. Primeiro, desconta-se a previdência, e só depois calcula-se o imposto de renda sobre o que sobrou."
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-sm text-blue-300 mb-4", children: "Salário Líquido = Bruto - INSS - IRRF" }),
              /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-4 space-y-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Encontre o INSS:" }),
                  " Aplique as alíquotas progressivas por faixa sobre o Salário Bruto."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Base do IR:" }),
                  " Subtraia o INSS (e valor por dependentes, se houver) do Salário Bruto."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Encontre o IRRF:" }),
                  " Aplique a alíquota da tabela de IR sobre a base encontrada no passo anterior."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Resultado:" }),
                  " Subtraia INSS e IRRF do Bruto para chegar ao Líquido."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white border-b border-white/10 pb-2", children: "Exemplo 1: Nível Júnior" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "CLT (R$ 3.500):" }) }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5", children: [
                  /* @__PURE__ */ jsx("li", { children: "INSS: -R$ 313,41" }),
                  /* @__PURE__ */ jsx("li", { children: "IRRF: -R$ 83,83" }),
                  /* @__PURE__ */ jsx("li", { children: "Líquido: ~R$ 3.102,76" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "PJ (R$ 5.600):" }) }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5", children: [
                  /* @__PURE__ */ jsx("li", { children: "Impostos: ~R$ 508,00" }),
                  /* @__PURE__ */ jsx("li", { children: "Líquido: ~R$ 5.092,00" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Exemplo 2: Nível Sênior (Comparativo Detalhado)" }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { className: "text-blue-400", children: "CLT (R$ 12.000 Bruto)" }) }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "INSS (Teto 2025): -R$ 951,63" }),
                  /* @__PURE__ */ jsx("li", { children: "IRRF (27,5%): ~R$ 2.150,00" }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("strong", { children: "Líquido: ~R$ 8.898,37" }) }),
                  /* @__PURE__ */ jsx("li", { children: "+ FGTS, 13º, Férias" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { className: "text-indigo-400", children: "PJ (R$ 18.000 Faturamento)" }) }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "Pró-Labore (28%): R$ 5.040,00" }),
                  /* @__PURE__ */ jsx("li", { children: "Impostos Totais: ~R$ 2.123,00 (DAS + Pessoa Física)" }),
                  /* @__PURE__ */ jsx("li", { children: "Custos (Contador/Taxas): -R$ 400,00" }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("strong", { children: "Líquido Disponível: ~R$ 15.477,00" }) })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Casos Especiais e Pontos de Atenção" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: 'O Limite do MEI e o "Super MEI"' }),
              /* @__PURE__ */ jsxs("p", { className: "leading-relaxed", children: [
                "Muitos profissionais estão na expectativa do PLP 60/2025 (Super MEI). Porém, até 10 de dezembro de 2025, o projeto ainda aguarda aprovação final. O limite seguro continua sendo ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 81.000/ano" }),
                ". Ultrapassar esse valor sem a lei sancionada gera ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/das-mei", className: "text-blue-400 hover:underline", children: "desenquadramento retroativo e multas" }),
                " pesadas."
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs mt-2", children: [
                /* @__PURE__ */ jsx("strong", { children: "Fonte:" }),
                " ",
                /* @__PURE__ */ jsx("a", { href: "https://www25.senado.leg.br/web/atividade/materias/-/materia/167495", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Portal do Senado Federal (PLP 60/2025)" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Profissionais de TI e o Exterior" }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Para quem trabalha para o exterior (exportação de serviços), a alíquota de ISS é isenta em muitas cidades e não há incidência de PIS/COFINS, tornando o PJ imbatível. No mercado nacional, a contratação PJ em TI é padrão, mas exige cuidado com a subordinação." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Aposentadoria e Investimentos" }),
              /* @__PURE__ */ jsxs("p", { className: "leading-relaxed", children: [
                "O profissional CLT tem contribuição cheia para o INSS. O PJ, ao pagar INSS sobre o Pró-Labore reduzido ou salário mínimo (MEI), terá uma aposentadoria oficial baixa. É obrigatório investir a diferença salarial. Confira nosso guia sobre ",
                /* @__PURE__ */ jsx(Link, { to: "/blog/investimentos", className: "text-blue-400 hover:underline", children: "investimentos" }),
                " para montar sua carteira de longo prazo."
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
//# sourceMappingURL=CLTVsPJPage-Bf4gbSD7.js.map
