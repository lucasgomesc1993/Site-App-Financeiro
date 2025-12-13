import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Users, Calculator, ArrowRight, AlertCircle, Briefcase, DollarSign, PieChart } from "lucide-react";
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
const EMPLOYEE_COST_FAQS = [
  {
    question: "Qual o custo de um funcionário no teto do INSS em 2025?",
    answer: "Se o salário for igual ao teto (aprox. **R$ 8.157,41**), uma empresa no Lucro Presumido pagará cerca de **R$ 13.800,00** mensais (custo total). Isso ocorre porque, embora o desconto do funcionário trave no teto, a empresa continua pagando 20% de INSS patronal sobre o valor total do salário, sem limite."
  },
  {
    question: "Quanto custa um funcionário de um salário mínimo em 2025?",
    answer: "Para uma empresa no Simples Nacional (Anexo III), um funcionário ganhando **R$ 1.518,00** custa aproximadamente **R$ 2.400,00 a R$ 2.500,00** por mês, considerando provisões de férias, 13º, FGTS e um pacote básico de benefícios (VT e VR). O peso dos benefícios fixos eleva o multiplicador para cerca de 1,65x."
  },
  {
    question: "Como calcular o custo de um funcionário PJ?",
    answer: "O custo PJ é mais simples: soma-se o valor da Nota Fiscal, impostos assumidos pela empresa (se houver) e custos de compliance. No entanto, para valer a pena para o *profissional*, a regra de mercado sugere que a Nota Fiscal seja **1,4 a 1,6 vezes** o salário CLT equivalente. Compare os cenários na nossa <a href='/calculadoras/clt-vs-pj'>Calculadora CLT x PJ</a>."
  },
  {
    question: "O que é o RAT e FAP no cálculo da folha?",
    answer: "O RAT (Risco Ambiental do Trabalho) é uma taxa de 1%, 2% ou 3% sobre a folha para cobrir custos de acidentes. O FAP (Fator Acidentário) é um multiplicador (0,5 a 2,0) que reduz ou dobra essa taxa. Empresas com muitos acidentes pagam o dobro. Investir em segurança reduz diretamente esse custo."
  },
  {
    question: "A empresa paga INSS sobre o Vale-Transporte?",
    answer: "Não. O Vale-Transporte, quando descontado corretamente (até 6% do salário), e o Vale-Alimentação (quando a empresa adere ao PAT), têm natureza indenizatória. Ou seja, não incide INSS nem FGTS sobre eles, o que ajuda a reduzir o custo total."
  },
  {
    question: "Como funciona a provisão de férias e 13º?",
    answer: "Mensalmente, você deve guardar **1/12 (8,33%)** do salário para o 13º e **1/12 (8,33%)** + 1/3 constitucional para as férias. Somados, representam **19,44%** do salário. Se você não reservar esse dinheiro todo mês, terá problemas de caixa em novembro, dezembro e nas épocas de férias."
  }
];
function EmployeeCostPage() {
  const [salary, setSalary] = useState("");
  const [regime, setRegime] = useState("simples_anexo_iii");
  const [transport, setTransport] = useState("");
  const [food, setFood] = useState("");
  const [otherBenefits, setOtherBenefits] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const vt = parseFloat(transport.replace(/\./g, "").replace(",", ".") || "0");
    const vr = parseFloat(food.replace(/\./g, "").replace(",", ".") || "0");
    const other = parseFloat(otherBenefits.replace(/\./g, "").replace(",", ".") || "0");
    if (isNaN(sal) || sal === 0) {
      setResult(null);
      return;
    }
    let fgtsRate = 0.08;
    let inssPatronalRate = 0;
    let ratRate = 0;
    let sistemaSRate = 0;
    if (regime === "simples_anexo_iii") {
      inssPatronalRate = 0;
      ratRate = 0;
      sistemaSRate = 0;
    } else if (regime === "simples_anexo_iv") {
      inssPatronalRate = 0.2;
      ratRate = 0.02;
      sistemaSRate = 0;
    } else {
      inssPatronalRate = 0.2;
      ratRate = 0.02;
      sistemaSRate = 0.058;
    }
    const totalTaxRate = fgtsRate + inssPatronalRate + ratRate + sistemaSRate;
    const directTaxes = sal * totalTaxRate;
    const vacationProvision = sal / 12;
    const vacationThirdProvision = vacationProvision / 3;
    const thirteenthProvision = sal / 12;
    const totalProvisionsBase = vacationProvision + vacationThirdProvision + thirteenthProvision;
    const taxesOnProvisions = totalProvisionsBase * totalTaxRate;
    const totalProvisions = totalProvisionsBase + taxesOnProvisions;
    const maxVtDeduction = sal * 0.06;
    const vtCost = Math.max(0, vt - maxVtDeduction);
    const benefitsTotal = vtCost + vr + other;
    const totalMonthlyCost = sal + directTaxes + totalProvisions + benefitsTotal;
    setResult({
      totalCost: totalMonthlyCost,
      multiplier: totalMonthlyCost / sal,
      breakdown: {
        salary: sal,
        taxes: directTaxes,
        provisions: totalProvisions,
        benefits: benefitsTotal,
        details: {
          inssPatronal: sal * inssPatronalRate,
          fgts: sal * fgtsRate,
          rat: sal * ratRate,
          sistemaS: sal * sistemaSRate,
          provisionsBase: totalProvisionsBase,
          taxesOnProvisions
        }
      }
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, regime, transport, food, otherBenefits]);
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
    "name": "Calculadora de Custo de Funcionário 2025: Cálculo Real (CLT)",
    "url": "https://www.junny.com.br/calculadoras/custo-funcionario",
    "description": "Use nossa Calculadora de Custo de Funcionário 2025 para simular CLT vs PJ. Descubra encargos, reoneração da folha e provisões com dados oficiais.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
    "featureList": [
      "Cálculo de Custo Total CLT",
      "Simulação Simples Nacional vs Lucro Presumido",
      "Provisão de Férias e 13º Salário",
      "Cálculo de Encargos Sociais (INSS, FGTS)",
      "Comparativo de Multiplicador Salarial"
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
        title: "Calculadora de Custo de Funcionário 2025: Cálculo Real (CLT)",
        description: "Use nossa Calculadora de Custo de Funcionário 2025 para simular CLT vs PJ. Descubra encargos, reoneração da folha e provisões com dados oficiais.",
        canonical: "/calculadoras/custo-funcionario"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": EMPLOYEE_COST_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Custo de Funcionário", href: "/calculadoras/custo-funcionario" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Users, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Atualizado para 2025" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de Custo de Funcionário ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500", children: "2025" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
            "Simular Custo Mensal"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
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
              /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Regime Tributário" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: regime,
                    onChange: (e) => setRegime(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "simples_anexo_iii", children: "Simples Nacional (Anexos I, II, III, V)" }),
                      /* @__PURE__ */ jsx("option", { value: "simples_anexo_iv", children: "Simples Nacional (Anexo IV - Limpeza/Obras)" }),
                      /* @__PURE__ */ jsx("option", { value: "presumido_real", children: "Lucro Presumido / Lucro Real" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(ArrowRight, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Anexo IV paga INSS Patronal (20%). Anexo III é isento." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Vale Transporte" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs", children: "R$" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      inputMode: "decimal",
                      value: transport,
                      onChange: (e) => handleCurrencyInput(e.target.value, setTransport),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all",
                      placeholder: "0,00"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Vale Refeição" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs", children: "R$" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      inputMode: "decimal",
                      value: food,
                      onChange: (e) => handleCurrencyInput(e.target.value, setFood),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all",
                      placeholder: "0,00"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Outros Benefícios" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs", children: "R$" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      inputMode: "decimal",
                      value: otherBenefits,
                      onChange: (e) => handleCurrencyInput(e.target.value, setOtherBenefits),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all",
                      placeholder: "0,00"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Custo Total Mensal Estimado" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white block", children: result ? `R$ ${result.totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "R$ 0,00" }),
                result && /* @__PURE__ */ jsx("div", { className: "mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30", children: /* @__PURE__ */ jsxs("span", { children: [
                  "Multiplicador Real: ",
                  /* @__PURE__ */ jsxs("strong", { children: [
                    result.multiplier.toFixed(2),
                    "x"
                  ] }),
                  " o salário"
                ] }) })
              ] }),
              result && result.breakdown && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm", children: "Salário Base" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                      "R$ ",
                      result.breakdown.salary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5 my-2" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1 text-xs text-red-400", children: [
                    /* @__PURE__ */ jsx("span", { children: "+ Encargos Diretos (INSS/FGTS)" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "R$ ",
                      result.breakdown.taxes.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1 text-xs text-yellow-500", children: [
                    /* @__PURE__ */ jsx("span", { children: "+ Provisões (Férias/13º)" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "R$ ",
                      result.breakdown.provisions.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-xs text-green-400", children: [
                    /* @__PURE__ */ jsx("span", { children: "+ Benefícios e Variáveis" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "R$ ",
                      result.breakdown.benefits.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                    ] })
                  ] })
                ] }),
                regime === "presumido_real" && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 text-xs text-gray-500 px-2", children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsx("p", { children: "O Lucro Presumido paga 20% de INSS Patronal + Alíquotas de Terceiros, tornando a contratação CLT significativamente mais cara." })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Briefcase, { className: "w-5 h-5 text-blue-500" }),
              "Resumo Rápido (Dados Oficiais Dezembro/2025)"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Salário Mínimo Nacional" }),
                /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 1.518,00" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Reoneração da Folha:" }),
                    " Setores desonerados pagam ",
                    /* @__PURE__ */ jsx("strong", { children: "5% de INSS" }),
                    " sobre a folha em 2025."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsx(PieChart, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Provisões Obrigatórias:" }),
                    " Reserve ",
                    /* @__PURE__ */ jsx("strong", { children: "19,44%" }),
                    " do salário mensalmente para cobrir Férias e 13º."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Simples Nacional:" }),
                    " Isento de INSS Patronal nos Anexos I, II, III e V; paga 20% no Anexo IV."
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-md font-bold text-yellow-200 mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5" }),
              "Resumo em 30 Segundos"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-yellow-100/80 mb-3", children: [
              "Saber ",
              /* @__PURE__ */ jsx("strong", { children: "quanto custa um funcionário" }),
              " vai muito além do salário impresso na carteira. Em 2025, com o novo salário mínimo de R$ 1.518,00 e o início da reoneração gradual da folha para 17 setores, a matemática mudou. O custo final de um colaborador CLT varia drasticamente conforme o regime tributário da sua empresa (Simples Nacional, Lucro Presumido ou Real), podendo representar de **1,6 a 2,8 vezes** o valor do salário bruto. Esta **Calculadora de Custo de Funcionário** detalha encargos sociais, provisões de férias e 13º, além de custos invisíveis, para que você proteja sua margem de lucro."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Briefcase, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Tabela Oficial: Comparativo de Cargas Tributárias (2025)" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-6", children: "A tabela abaixo demonstra como o regime tributário define o peso dos encargos sobre a folha de pagamento." }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Componente do Encargo" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Simples Nacional (Anexos I, II, III, V)" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Simples Nacional (Anexo IV)" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Lucro Presumido / Real" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "INSS Patronal" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "0% (Incluso no DAS)" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-red-400", children: "20%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-red-400", children: "20%" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "RAT (Risco Acidente)" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "0% (Incluso no DAS)" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "1% a 3%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "1% a 3%" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Terceiros (Sistema S)" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "0% (Incluso no DAS)" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "0%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "~ 5,8%" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "FGTS" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "8%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "8%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "8%" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { className: "bg-white/5", children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: "Total Estimado" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-green-400", children: "~ 8%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-yellow-400", children: "~ 29% a 33%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-red-400", children: "~ 34,8% a 42%" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-xs text-gray-500", children: [
          /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
          " Baseado nas alíquotas da Receita Federal e Tabela RAT/FAP. Consulte as regras detalhadas no ",
          /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/inss/pt-br/noticias/confira-como-ficaram-as-aliquotas-de-contribuicao-ao-inss", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Portal Gov.br sobre alíquotas INSS 2025" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-4", children: 'A Realidade do Custo: O Mito do "Salário x 2"' }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-6", children: 'Historicamente, muitos gestores usam a conta de padaria de que um funcionário custa o dobro do salário ("2x"). Embora estudos da FGV/CNI indiquem que o custo pode chegar a **2,83 vezes** o salário em cenários de alta rotatividade e ineficiência, essa generalização é perigosa para 2025.' }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-6", children: "Para empresas no **Simples Nacional (Anexo III)**, por exemplo, o multiplicador real costuma ficar próximo de **1,6x**. Já no **Lucro Presumido**, gira em torno de **1,93x** para salários médios. Aplicar um multiplicador genérico pode fazer você perder competitividade ou precificar seu serviço errado." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-4", children: "Erros Comuns ao Calcular o Custo" }),
          /* @__PURE__ */ jsxs("ol", { className: "space-y-3 text-sm text-gray-300 list-decimal pl-4", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Esquecer o Anexo IV do Simples:" }),
              " Empresas de limpeza, vigilância e construção civil (Anexo IV) pagam 20% de INSS Patronal, diferentemente do restante do Simples. Ignorar isso gera um rombo de 23% a 25% no orçamento."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Ignorar a Reoneração (Lei 14.973/2024):" }),
              ' Se sua empresa é de TI, Transportes ou Comunicação, a "desoneração total" acabou. Em 2025, você paga **5% de INSS sobre a folha** além da taxa sobre a receita. Veja os detalhes na ',
              /* @__PURE__ */ jsx("a", { href: "http://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14973.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Lei nº 14.973/2024 no Planalto" }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Não provisionar encargos sobre férias:" }),
              " Não basta guardar o valor das férias; você precisa guardar o dinheiro para pagar o FGTS e INSS que incidirão sobre essas férias lá na frente."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-4", children: "Como funciona a Calculadora de Custo de Funcionário" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-6", children: "Nossa **Calculadora de Custo de Funcionário** utiliza o método de custeio por absorção direta e provisões. Diferente de contas simples que somam apenas o que sai do caixa no dia 05 (salário + guia de imposto), o cálculo correto deve considerar a competência." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-6", children: "O sistema considera três pilares para entregar o resultado:" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400 list-disc pl-5", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Regime Tributário:" }),
            " Define se a empresa paga ou não os 20% de cota patronal e terceiros."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Verbas Remuneratórias:" }),
            " Soma salário base, periculosidade ou adicionais (use nossa ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/adicional-noturno", className: "text-blue-400 hover:underline", children: "ferramenta de adicional noturno" }),
            " para estimar)."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Provisões Futuras:" }),
            " Calcula o passivo trabalhista que se acumula mensalmente (férias e 13º proporcionais) e os impostos que incidirão sobre eles."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Como Calcular o Custo (Passo a Passo)" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-6", children: 'Para chegar ao valor exato ("na vírgula"), utilizamos a metodologia de custo modular. Vamos dividir o custo em três grandes grupos: Encargos Diretos, Provisões e Benefícios.' }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mb-8 text-center font-mono text-blue-300 text-sm md:text-base", children: "Custo Total = Salário + Encargos Diretos + Provisões (+Reflexos) + Benefícios" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-3 text-lg", children: "1. Encargos Sociais" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-2", children: "Incidem diretamente sobre o salário bruto." }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "FGTS:" }),
                " 8% (para todos)."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "INSS Patronal:" }),
                " 20% (Lucro Real/Presumido e Simples Anexo IV)."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "RAT x FAP:" }),
                " 1% a 3% (Risco) x (0,5 a 2,0)."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Sistema S:" }),
                " Média de 5,8% (Lucro Real/Presumido)."
              ] })
            ] }),
            /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/tributos/contribuicoes-previdenciarias", target: "_blank", rel: "noopener noreferrer", className: "block mt-4 text-xs text-blue-400 hover:underline", children: "Tabela de Incidência da Receita Federal" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-3 text-lg", children: "2. Provisões" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-2", children: "Direitos que o funcionário adquire mensalmente." }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Férias + 1/3:" }),
                " 11,11% do salário."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "13º Salário:" }),
                " 8,33% do salário."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Total de Provisão:" }),
                " ",
                /* @__PURE__ */ jsx("strong", { children: "19,44%" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-yellow-500 mt-2", children: "Atenção: Sobre esses 19,44% também incidem FGTS e INSS." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-3 text-lg", children: "3. Benefícios" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Vale-Transporte:" }),
                " A empresa paga o que exceder 6% do salário. Use nossa ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-viagem", className: "text-blue-400 hover:underline", children: "Calculadora de Custo de Viagem" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Vale-Alimentação:" }),
                " Custo integral."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Plano de Saúde:" }),
                " Custo fixo por vida."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Simulações Práticas: Do Básico ao Executivo" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Cenário 1: Analista Pleno (R$ 4.000,00)" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-4", children: "Salário médio com benefícios padrão (VR R$ 660,00 + Saúde R$ 300,00)." }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-xs text-left", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "p-2", children: "Custo" }),
                /* @__PURE__ */ jsx("th", { className: "p-2", children: "Simples (Anexo III)" }),
                /* @__PURE__ */ jsx("th", { className: "p-2", children: "Lucro Presumido" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Salário" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 4.000,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 4.000,00" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Encargos" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 320,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 1.432,00" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Provisões" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 999,81" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 1.215,98" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Benefícios" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 1.072,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 1.072,00" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "bg-white/5 font-bold text-white", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Total" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 6.391,81" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 7.719,98" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-blue-400", children: "Multiplicador" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-blue-400", children: "1,60x" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-blue-400", children: "1,93x" })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Cenário 2: Executivo (R$ 15.000,00)" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-4", children: "INSS Patronal (20%) não tem teto para a empresa no Lucro Real/Presumido." }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-xs text-left", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "p-2", children: "Custo" }),
                /* @__PURE__ */ jsx("th", { className: "p-2", children: "Simples (Anexo III)" }),
                /* @__PURE__ */ jsx("th", { className: "p-2", children: "L. Presumido (Serv)" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Salário" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 15.000,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 15.000,00" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Encargos" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Isento" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 4.170,00" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "FGTS" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 1.200,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 1.200,00" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Encargos s/ Prov" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 233,28" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 1.043,92" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "bg-white/5 font-bold text-white", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "Total" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 20.349,28" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 25.329,92" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-blue-400", children: "Multiplicador" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-blue-400", children: "1,35x" }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-blue-400", children: "1,68x" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Nota: No Lucro Presumido, a empresa paga R$ 3.000,00 apenas de INSS Patronal, pois não há teto para o empregador." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Casos Especiais e Mudanças para 2025" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "O Impacto da Reoneração Gradual" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Para os 17 setores que utilizavam a desoneração da folha (CPRB), 2025 é um ano híbrido. A empresa pagará o imposto sobre a receita bruta (com alíquota reduzida) **MAIS 5% de INSS** sobre a folha de pagamento. Esse percentual subirá para 10% em 2026 e 15% em 2027. Isso exige revisão imediata de contratos de longo prazo." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "Fator R no Simples Nacional" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300 mb-2", children: [
                "Empresas do Anexo V podem migrar para o Anexo III (mais barato) se a folha de pagamento for igual ou superior a 28% do faturamento. Entenda melhor usando nossa ferramenta de ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/simples-vs-presumido", className: "text-blue-400 hover:underline", children: "Simples Nacional vs Lucro Presumido" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "Salário Mínimo e Teto do INSS 2025" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300 mb-2", children: [
                "Com o mínimo a **R$ 1.518,00**, todos os benefícios atrelados sobem. O desconto de INSS do funcionário tem teto de aprox. R$ 951,63. Para saber o líquido exato, acesse a ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-blue-400 hover:underline", children: "Calculadora de Salário Líquido" }),
                "."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: EMPLOYEE_COST_FAQS,
          title: "Dúvidas sobre Calculadora de Custo de Funcionário",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  EmployeeCostPage
};
//# sourceMappingURL=EmployeeCostPage-CiojRNUf.js.map
