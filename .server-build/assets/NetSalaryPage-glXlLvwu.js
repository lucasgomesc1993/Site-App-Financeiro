import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Wallet, Calculator, Check, Building2, Coins, Briefcase, TrendingDown, DollarSign, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-CDVQG5oV.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-DhnQlz7G.js";
const NET_SALARY_FAQS = [
  {
    question: "Qual o valor máximo (Teto) que pode ser descontado de INSS em 2025?",
    answer: "O teto previdenciário para 2025 é R$ 8.157,41. Mesmo que seu salário seja superior a isso, o desconto máximo de INSS no contracheque será de R$ 951,63 (valor aproximado dependendo da progressão exata)."
  },
  {
    question: "O que é o Desconto Simplificado Mensal?",
    answer: "É um mecanismo que permite abater R$ 607,20 da base de cálculo do IRRF, substituindo as deduções legais (INSS, dependentes) caso seja mais vantajoso. Ele garante a isenção para quem ganha até dois salários mínimos."
  },
  {
    question: "Qual o salário líquido de quem ganha o mínimo (R$ 1.518,00)?",
    answer: "Para quem recebe o piso nacional em 2025, o único desconto é o INSS de 7,5% (R$ 113,85). O valor líquido final é R$ 1.404,15."
  },
  {
    question: "Dependentes influenciam no cálculo?",
    answer: "Sim. Cada dependente legal reduz a base de cálculo do Imposto de Renda em R$ 189,59. No entanto, se você tiver poucos dependentes e ganhar pouco acima da isenção, o sistema pode ignorar essa dedução e usar o Desconto Simplificado (R$ 607,20) se este for maior."
  }
];
function NetSalaryPage() {
  const [grossSalary, setGrossSalary] = useState("");
  const [dependents, setDependents] = useState("0");
  const [otherDiscounts, setOtherDiscounts] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const salary = parseFloat(grossSalary.replace(/\./g, "").replace(",", "."));
    const deps = parseInt(dependents);
    const others = parseFloat(otherDiscounts.replace(/\./g, "").replace(",", ".") || "0");
    if (isNaN(salary) || salary === 0) {
      setResult(null);
      return;
    }
    let inss = 0;
    if (salary <= 1518) {
      inss = salary * 0.075;
    } else if (salary <= 2793.88) {
      inss = 1518 * 0.075 + (salary - 1518) * 0.09;
    } else if (salary <= 4190.83) {
      inss = 1518 * 0.075 + (2793.88 - 1518) * 0.09 + (salary - 2793.88) * 0.12;
    } else if (salary <= 8157.41) {
      inss = 1518 * 0.075 + (2793.88 - 1518) * 0.09 + (4190.83 - 2793.88) * 0.12 + (salary - 4190.83) * 0.14;
    } else {
      inss = 1518 * 0.075 + (2793.88 - 1518) * 0.09 + (4190.83 - 2793.88) * 0.12 + (8157.41 - 4190.83) * 0.14;
    }
    const deductionPerDependent = 189.59;
    let irrfBaseA = salary - inss - deps * deductionPerDependent;
    let irrfBaseB = salary - 607.2;
    let irrfBase = Math.max(0, Math.min(irrfBaseA, irrfBaseB));
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
    const netSalary = salary - totalDiscounts;
    setResult({
      inss,
      irrf,
      netSalary,
      totalDiscounts
    });
  };
  useEffect(() => {
    calculate();
  }, [grossSalary, dependents, otherDiscounts]);
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
    "name": "Calculadora de Salário Líquido 2025: Cálculo Exato e Grátis",
    "url": "https://www.junny.com.br/calculadoras/salario-liquido",
    "description": "Descubra o valor real do seu pagamento com a Calculadora de Salário Líquido 2025. Descontos de INSS, IRRF e benefícios atualizados.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "featureList": [
      "Cálculo exato CLT 2025",
      "Tabela INSS Progressiva",
      "Cálculo IRRF Automático",
      "Simulação com Dependentes"
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
        title: "Calculadora Salário Líquido 2025: Oficial e Atualizada (CLT)",
        description: "Simule seu salário líquido com as tabelas oficiais de Dezembro/2025. Veja o cálculo exato do INSS e a escolha automática entre Dedução Legal ou Simplificada.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Salário Líquido", href: "/calculadoras/salario-liquido" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Wallet, { className: "w-4 h-4 text-emerald-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Oficial (Dezembro/2025)" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500", children: "Salário Líquido 2025" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed", children: "Esta ferramenta calcula quanto dinheiro cai na sua conta com precisão auditada. Nosso algoritmo compara automaticamente se é melhor para o seu bolso descontar o INSS ou usar o Desconto Simplificado (R$ 607,20)." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
            "Calcular Agora"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    inputMode: "decimal",
                    value: grossSalary,
                    onChange: (e) => handleCurrencyInput(e.target.value, setGrossSalary),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-medium",
                    placeholder: "0,00"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Número de Dependentes" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    inputMode: "numeric",
                    value: dependents,
                    onChange: (e) => setDependents(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                    placeholder: "0",
                    min: "0"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Outros Descontos" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      inputMode: "decimal",
                      value: otherDiscounts,
                      onChange: (e) => handleCurrencyInput(e.target.value, setOtherDiscounts),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                      placeholder: "0,00"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-6 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2 font-medium", children: "Salário Líquido Real" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl md:text-5xl font-bold text-white tracking-tight", children: result ? `R$ ${result.netSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                result && result.netSalary > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/20 text-xs text-emerald-300", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-3 h-3" }),
                  "Disponível para gastar"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center transition-colors hover:bg-white/10", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400 block mb-1 flex items-center justify-center gap-1", children: [
                    "INSS",
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "(Previdência)" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-red-400", children: result ? `- R$ ${result.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center transition-colors hover:bg-white/10", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400 block mb-1 flex items-center justify-center gap-1", children: [
                    "IRRF",
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "(Imposto)" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-red-400", children: result ? `- R$ ${result.irrf.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Building2, { className: "w-6 h-6 text-emerald-500" }) }),
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white leading-tight mt-1", children: "Como é feito o cálculo?" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm leading-relaxed mb-4", children: [
              "A fórmula correta compara duas opções: ",
              /* @__PURE__ */ jsx("code", { children: "Salário Bruto - MÁXIMO(INSS, 607,20)" }),
              ". Nós aplicamos o que for melhor para você."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-sm font-mono text-gray-300", children: [
              "Salário Bruto ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- INSS (ou Simplificado)" }),
              " ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- IRRF" }),
              " ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- Outros" }),
              " ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "= Salário Líquido" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Coins, { className: "w-5 h-5 text-emerald-500" }),
              "Para onde vai o dinheiro?"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white text-sm block", children: "INSS (Previdência Social)" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Incide sobre o total e serve para aposentadoria. Alíquotas de 7,5% a 14%." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white text-sm block", children: "Imposto de Renda (IRRF)" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Calculado sobre o que sobra do INSS. Quem ganha até R$ 2.824,00 (2 salários) está isento." })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-12 mb-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Briefcase, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "1. Tabela INSS 2025 (Progressiva)" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: 'A contribuição previdenciária é "fatiada". Você paga alíquotas diferentes para cada faixa do seu salário.' })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Faixa Salarial (R$)" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Alíquota" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Parcela a Deduzir" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Até 1.518,00" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "7,5%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "-" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 1.518,01 até 2.793,88" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "9%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 22,77" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 2.793,89 até 4.190,83" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "12%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 106,59" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 4.190,84 até 8.157,41" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "14%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 190,40" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-4 italic", children: "*Nota: Teto do INSS em R$ 8.157,41 (Desconto máx. ~R$ 951,63)." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(TrendingDown, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "2. Tabela Imposto de Renda (Vigência Maio/2025)" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Dedução Simplificada: R$ 607,20 (Substitui o INSS no cálculo se for mais vantajoso)." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Base de Cálculo (R$)" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Alíquota" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Dedução (R$)" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Até 2.428,80" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Isento" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "-" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 2.428,81 até 2.826,65" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "7,5%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "182,16" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 2.826,66 até 3.751,05" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "15%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "394,16" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 3.751,06 até 4.664,68" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "22,5%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "675,49" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Acima de 4.664,68" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "27,5%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "908,73" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-emerald-200/80", children: [
              /* @__PURE__ */ jsx("strong", { children: "Regra:" }),
              " O sistema escolhe automaticamente entre deduzir o INSS real ou o desconto simplificado de R$ 607,20."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mt-1", children: "Exemplos Reais de Cálculo (Dezembro 2025)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-1", children: "Exemplo 1: Salário R$ 3.500,00" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20", children: "Simplificado Vence" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "INSS (12%)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- R$ 313,41" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Base IR (Simplificado)" }),
                  /* @__PURE__ */ jsx("span", { children: "R$ 2.892,80" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "IRRF (15%)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- R$ 39,76" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-1 font-bold text-white", children: [
                  /* @__PURE__ */ jsx("span", { children: "Salário Líquido" }),
                  /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "R$ 3.146,83" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-1", children: "Exemplo 2: Salário R$ 7.500,00" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20", children: "Dedução Legal Vence" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "INSS (14%)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- R$ 859,60" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Base IR (Legal)" }),
                  /* @__PURE__ */ jsx("span", { children: "R$ 6.640,40" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "IRRF (27,5%)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- R$ 917,38" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-1 font-bold text-white", children: [
                  /* @__PURE__ */ jsx("span", { children: "Salário Líquido" }),
                  /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "R$ 5.723,02" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mt-1", children: "Casos Especiais e Dúvidas Técnicas" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Salários acima do Teto do INSS" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed", children: [
                "Quem ganha acima de ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 8.157,41" }),
                " (Teto de 2025) tem o desconto do INSS travado. A contribuição para de crescer, fixando-se em aproximadamente ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 951,63" }),
                ". Qualquer valor que você receba acima disso (bônus, horas extras) sofrerá incidência apenas do Imposto de Renda."
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Férias e 13º Salário" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed", children: [
                'Nas férias, você recebe o salário antecipado + 1/3 constitucional. Esse "1/3 extra" aumenta sua renda no mês, o que pode fazer você pular de faixa no IRRF e pagar uma alíquota maior temporariamente. Para simulações exatas, use a ',
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/ferias", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de Férias" }),
                ". Já para a gratificação natalina, acesse a ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/decimo-terceiro", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de Décimo Terceiro" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Autônomos (PJ) e MEI" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed", children: [
                "A lógica acima é exclusiva para CLT. Se você é PJ, não há desconto em folha; você paga o DAS ou guias próprias. Para comparar o que sobra no bolso em cada regime, utilize nosso comparador ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/clt-vs-pj", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "CLT vs PJ" }),
                "."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 text-center mb-12", children: /* @__PURE__ */ jsxs("p", { children: [
        "Para acabar com essa dúvida, nossa ferramenta considera todos os descontos obrigatórios atualizados para mostrar seu ",
        /* @__PURE__ */ jsx("strong", { children: "Salário Líquido" }),
        " real. Basta preencher os dados acima para obter o resultado imediato."
      ] }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: NET_SALARY_FAQS,
          title: "Perguntas Frequentes sobre Salário Líquido",
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
//# sourceMappingURL=NetSalaryPage-glXlLvwu.js.map
