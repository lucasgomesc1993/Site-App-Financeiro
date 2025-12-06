import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Wallet, Calculator, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-C9Svc77H.js";
import { AppPromoBanner } from "./AppPromoBanner--0MyDSNn.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const NET_SALARY_FAQS = [
  {
    question: "O que é descontado do salário?",
    answer: "Os principais descontos obrigatórios são INSS (previdência) e IRRF (imposto de renda). Outros descontos comuns são vale-transporte (até 6%), plano de saúde e vale-refeição."
  },
  {
    question: "Como calcular o IRRF?",
    answer: "O IRRF é calculado sobre o salário base após descontar o INSS e o valor por dependente (R$ 189,59 em 2024). Aplica-se a alíquota da tabela progressiva e subtrai-se a parcela a deduzir."
  },
  {
    question: "O que é salário líquido?",
    answer: "É o valor que efetivamente cai na sua conta bancária, após todas as deduções legais e benefícios."
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
    if (isNaN(salary)) {
      setResult(null);
      return;
    }
    let inss = 0;
    if (salary <= 1412) {
      inss = salary * 0.075;
    } else if (salary <= 2666.68) {
      inss = 1412 * 0.075 + (salary - 1412) * 0.09;
    } else if (salary <= 4000.03) {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salary - 2666.68) * 0.12;
    } else if (salary <= 7786.02) {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salary - 4000.03) * 0.14;
    } else {
      inss = 908.85;
    }
    const deductionPerDependent = 189.59;
    const irrfBase = salary - inss - deps * deductionPerDependent;
    let irrf = 0;
    if (irrfBase <= 2259.2) {
      irrf = 0;
    } else if (irrfBase <= 2826.65) {
      irrf = irrfBase * 0.075 - 169.44;
    } else if (irrfBase <= 3751.05) {
      irrf = irrfBase * 0.15 - 381.44;
    } else if (irrfBase <= 4664.68) {
      irrf = irrfBase * 0.225 - 662.77;
    } else {
      irrf = irrfBase * 0.275 - 896;
    }
    if (irrf < 0) irrf = 0;
    const netSalary = salary - inss - irrf - others;
    setResult({
      inss,
      irrf,
      netSalary
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
    "name": "Calculadora de Salário Líquido 2025",
    "description": "Descubra quanto vai cair na sua conta. Cálculo exato de salário líquido com descontos de INSS e Imposto de Renda.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
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
        title: "Calculadora de Salário Líquido 2025 - Cálculo Exato",
        description: "Salário Bruto x Líquido: saiba a diferença. Calcule seus descontos de INSS e IRRF e descubra seu salário real.",
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
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Wallet, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500", children: "Salário Líquido" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto hidden" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 min-h-[600px]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Calcular Líquido"
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
                        value: grossSalary,
                        onChange: (e) => handleCurrencyInput(e.target.value, setGrossSalary),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
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
                        value: dependents,
                        onChange: (e) => setDependents(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0",
                        min: "0"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Outros Descontos" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: otherDiscounts,
                          onChange: (e) => handleCurrencyInput(e.target.value, setOtherDiscounts),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Salário Líquido Estimado" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.netSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Desconto INSS" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-red-400", children: result ? `- R$ ${result.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Desconto IRRF" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-red-400", children: result ? `- R$ ${result.irrf.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-blue-500" }),
                "Para onde vai o dinheiro?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: 'O "Leão" e a Previdência levam uma fatia considerável.' }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "INSS:" }),
                    " Garante sua aposentadoria e auxílios."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "IRRF:" }),
                    " Imposto sobre a renda, retido na fonte."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dica" }),
                  "Dependentes reduzem o Imposto de Renda. Certifique-se de informar todos ao RH da sua empresa."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Entenda seu holerite. Veja para onde vai seu dinheiro e quanto sobra no final." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: NET_SALARY_FAQS,
          title: "Dúvidas sobre Salário Líquido",
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
//# sourceMappingURL=NetSalaryPage-DJ6ykYHn.js.map
