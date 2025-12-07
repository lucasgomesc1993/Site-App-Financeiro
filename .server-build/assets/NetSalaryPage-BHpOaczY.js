import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Wallet, Calculator, Check, Building2, Coins, Briefcase, TrendingDown, Calendar, PiggyBank } from "lucide-react";
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
const NET_SALARY_FAQS = [
  {
    question: "Qual a diferença entre Salário Bruto e Líquido?",
    answer: "Salário Bruto é o valor registrado na sua Carteira de Trabalho (CLT) sem nenhum desconto. Salário Líquido é o valor que efetivamente cai na sua conta bancária após a subtração de impostos (INSS, IRRF) e benefícios (Vale Transporte, Vale Refeição, Plano de Saúde)."
  },
  {
    question: "Como calcular o salário líquido passo a passo?",
    answer: 'Primeiro, desconte o INSS do Salário Bruto usando a tabela progressiva. Com o resultado (Base de Cálculo), aplique a alíquota do Imposto de Renda correspondente e subtraia a "parcela a deduzir" da tabela do IR. Por fim, subtraia outros descontos como VR, VT e convênios.'
  },
  {
    question: "Quanto é descontado de Vale Transporte?",
    answer: "A empresa pode descontar até 6% do seu Salário Base (Bruto) referente ao Vale Transporte. Se o custo das passagens for menor que 6% do seu salário, o desconto será apenas o valor real das passagens. Se for maior, a empresa arca com a diferença."
  },
  {
    question: "O desconto simplificado do IR vale a pena?",
    answer: "Sim, para faixas salariais mais baixas (até aprox. R$ 5.000,00), o desconto simplificado de R$ 564,80 costuma ser mais vantajoso que as deduções legais, garantindo isenção para quem ganha até dois salários mínimos."
  },
  {
    question: "Por que meu salário líquido diminuiu após um aumento?",
    answer: "Isso pode acontecer se o aumento fizer seu salário mudar de faixa na tabela do INSS ou do Imposto de Renda. A mudança de alíquota (ex: de 15% para 22,5%) pode consumir uma parte maior do reajuste inicialmente."
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
    let irrfBaseA = salary - inss - deps * deductionPerDependent;
    let irrfBaseB = salary - 564.8;
    const irrfBase = Math.min(irrfBaseA, irrfBaseB);
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
        title: "Calculadora de Salário Líquido 2025: Cálculo Exato e Grátis",
        description: "Descubra o valor real do seu pagamento com a Calculadora de Salário Líquido 2025. Descontos de INSS, IRRF e benefícios atualizados. Calcule agora.",
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
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500", children: "Salário Líquido 2025" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed", children: "Você sabe exatamente quanto dinheiro cai na sua conta no final do mês? O valor contratado na carteira de trabalho (Salário Bruto) raramente é o mesmo que chega ao seu bolso." })
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
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
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
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
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
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600", children: "(Previdência)" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-red-400", children: result ? `- R$ ${result.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center transition-colors hover:bg-white/10", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400 block mb-1 flex items-center justify-center gap-1", children: [
                    "IRRF",
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600", children: "(Imposto)" })
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
              'O cálculo segue uma lógica de "funil". Começamos com o valor bruto e subtraímos as obrigações legais na ordem correta. Entender essa ordem é vital para não errar a conta, especialmente se você precisa planejar suas ',
              /* @__PURE__ */ jsx(Link, { to: "/blog/financas-pessoais", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "finanças pessoais" }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-sm font-mono text-gray-300", children: [
              "Salário Bruto ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- INSS" }),
              " ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- IRRF" }),
              " ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "- Outros" }),
              " ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "+ Adicionais" }),
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
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "1. Desconto do INSS" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
                "O primeiro desconto aplicado é sempre o INSS. Desde a Reforma da Previdência, a alíquota é ",
                /* @__PURE__ */ jsx("strong", { children: "progressiva" }),
                "."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Faixa Salarial (R$)" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Alíquota" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Até 1.412,00" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "7,5%" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 1.412,01 até 2.666,68" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "9%" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 2.666,69 até 4.000,03" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "12%" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 4.000,04 até 7.786,02" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "14%" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mt-4 italic", children: [
            "*Nota: Para salários acima de R$ 7.786,02, o desconto é fixo no teto da previdência. Simule cenários específicos na nossa calculadora de ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/inss", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "INSS" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(TrendingDown, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "2. Desconto do Imposto de Renda (IRRF)" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "O sistema sempre aplicará o que for mais vantajoso: Deduções Legais ou Desconto Simplificado. Quem ganha até 2 salários mínimos está isento." })
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
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Até 2.259,20" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Isento" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "0,00" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 2.259,21 até 2.826,65" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "7,5%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "169,44" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 2.826,66 até 3.751,05" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "15%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "381,44" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 3.751,06 até 4.664,68" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "22,5%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "662,77" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Acima de 4.664,68" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "27,5%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "896,00" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-emerald-200/80", children: [
              /* @__PURE__ */ jsx("strong", { children: "Fique atento:" }),
              " Cada dependente legal reduz a base de cálculo do imposto em ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 189,59" }),
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Calendar, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mt-1", children: "Planejamento Anual" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6 leading-relaxed", children: [
            "Saber seu salário líquido mensal é o primeiro passo. No entanto, para um planejamento completo, lembre-se de considerar o impacto do ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/decimo-terceiro", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "décimo terceiro" }),
            " e a previsão das suas ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/ferias", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "férias" }),
            ", pois a tributação sobre esses pagamentos ocorre de forma exclusiva na fonte."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-bold text-white mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(PiggyBank, { className: "w-4 h-4 text-emerald-500" }),
              "Adicionais e Descontos"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "text-sm text-gray-400 space-y-2", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Pensões e Planos de Saúde:" }),
                " Subtraídos do montante."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Adicionais:" }),
                " ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "text-emerald-400", children: "Horas extras" }),
                " e ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/adicional-noturno", className: "text-emerald-400", children: "Adicional noturno" }),
                " entram antes dos impostos."
              ] })
            ] })
          ] }) })
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
//# sourceMappingURL=NetSalaryPage-BHpOaczY.js.map
