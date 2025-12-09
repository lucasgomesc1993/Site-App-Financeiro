import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, Suspense, lazy } from "react";
import { Calculator, DollarSign, Calendar, User, TrendingUp, Plane } from "lucide-react";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { FAQ } from "./FAQ-rtQ6fcXm.js";
import "react-router-dom";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
const VacationCalculator = () => {
  const [salary, setSalary] = useState(3e3);
  const [days, setDays] = useState(30);
  const [sellDays, setSellDays] = useState(false);
  const [dependents, setDependents] = useState(0);
  const [result, setResult] = useState({
    grossVacation: 0,
    oneThirdBonus: 0,
    allowance: 0,
    allowanceOneThird: 0,
    totalGross: 0,
    inss: 0,
    irrf: 0,
    totalNet: 0
  });
  useEffect(() => {
    calculateVacation();
  }, [salary, days, sellDays, dependents]);
  const calculateVacation = () => {
    const vacationValue = salary / 30 * days;
    const oneThird = vacationValue / 3;
    let allowance = 0;
    let allowanceOneThird = 0;
    if (sellDays) {
      allowance = salary / 30 * 10;
      allowanceOneThird = allowance / 3;
    }
    const totalGross = vacationValue + oneThird + allowance + allowanceOneThird;
    const baseINSS = vacationValue + oneThird;
    let inss = calculateINSS(baseINSS);
    const deductionPerDependent = 189.59;
    const totalDeductionsLegal = inss + dependents * deductionPerDependent;
    const baseIRRFLegal = baseINSS - totalDeductionsLegal;
    const baseIRRFSimplified = baseINSS - 607.2;
    const finalBaseIRRF = Math.min(baseIRRFLegal, baseIRRFSimplified);
    let irrf = calculateIRRF(finalBaseIRRF);
    const totalNet = totalGross - inss - irrf;
    setResult({
      grossVacation: vacationValue,
      oneThirdBonus: oneThird,
      allowance,
      allowanceOneThird,
      totalGross,
      inss,
      irrf,
      totalNet
    });
  };
  const calculateINSS = (base) => {
    let discount = 0;
    if (base > 8157.41) {
      return 951.63;
    }
    if (base <= 1518) {
      discount = base * 0.075;
    } else if (base <= 2793.88) {
      discount = 1518 * 0.075 + (base - 1518) * 0.09;
    } else if (base <= 4190.83) {
      discount = 1518 * 0.075 + (2793.88 - 1518) * 0.09 + (base - 2793.88) * 0.12;
    } else {
      discount = 1518 * 0.075 + (2793.88 - 1518) * 0.09 + (4190.83 - 2793.88) * 0.12 + (base - 4190.83) * 0.14;
    }
    return discount;
  };
  const calculateIRRF = (base) => {
    let discount = 0;
    if (base <= 2428.8) {
      discount = 0;
    } else if (base <= 2826.65) {
      discount = base * 0.075 - 182.16;
    } else if (base <= 3751.05) {
      discount = base * 0.15 - 394.16;
    } else if (base <= 4664.68) {
      discount = base * 0.225 - 675.49;
    } else {
      discount = base * 0.275 - 908.73;
    }
    return discount > 0 ? discount : 0;
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
        "Dados das Férias"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "salary",
                "aria-label": "Salário Bruto",
                type: "number",
                value: salary,
                onChange: (e) => setSalary(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "days", className: "block text-sm text-gray-400 mb-2", children: "Dias de Férias" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "days",
                "aria-label": "Dias de Férias",
                value: days,
                onChange: (e) => setDays(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none",
                children: [
                  /* @__PURE__ */ jsx("option", { value: 10, children: "10 dias" }),
                  /* @__PURE__ */ jsx("option", { value: 15, children: "15 dias" }),
                  /* @__PURE__ */ jsx("option", { value: 20, children: "20 dias" }),
                  /* @__PURE__ */ jsx("option", { value: 30, children: "30 dias" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "dependents", className: "block text-sm text-gray-400 mb-2", children: "Dependentes" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "dependents",
                "aria-label": "Dependentes",
                type: "number",
                value: dependents,
                onChange: (e) => setDependents(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "sellDays",
              checked: sellDays,
              onChange: (e) => setSellDays(e.target.checked),
              className: "w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary bg-black/30"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "sellDays", className: "text-sm text-gray-300 select-none cursor-pointer", children: "Vender 10 dias (Abono Pecuniário)" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-medium text-gray-300 mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-primary" }),
          "Detalhamento"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
              "Valor Férias (",
              days,
              " dias)"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-white", children: formatCurrency(result.grossVacation) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "1/3 Constitucional" }),
            /* @__PURE__ */ jsx("span", { className: "text-white", children: formatCurrency(result.oneThirdBonus) })
          ] }),
          sellDays && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Abono Pecuniário (10 dias)" }),
              /* @__PURE__ */ jsxs("span", { className: "text-green-400", children: [
                "+ ",
                formatCurrency(result.allowance)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "1/3 Abono" }),
              /* @__PURE__ */ jsxs("span", { className: "text-green-400", children: [
                "+ ",
                formatCurrency(result.allowanceOneThird)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "INSS" }),
            /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
              "- ",
              formatCurrency(result.inss)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "IRRF" }),
            /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
              "- ",
              formatCurrency(result.irrf)
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-4 mt-4 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-medium", children: "Valor Líquido a Receber" }),
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: formatCurrency(result.totalNet) })
          ] }) })
        ] })
      ] })
    ] }) })
  ] }) });
};
const AppPromoBanner = lazy(() => import("./AppPromoBanner-DsGa7GAJ.js").then((module) => ({ default: module.AppPromoBanner })));
const VACATION_FAQS = [
  {
    question: "Qual o prazo legal para o pagamento das férias em 2025?",
    answer: "A empresa deve pagar as férias até 2 dias úteis antes do início do período de descanso. Se o pagamento atrasar, a empresa é obrigada a pagar o valor em dobro, conforme determina o Artigo 137 da CLT."
  },
  {
    question: "Qual o valor máximo de desconto do INSS nas férias?",
    answer: "Existe um teto. Em 2025, o desconto máximo de INSS é de R$ 951,63 (correspondente ao teto previdenciário de R$ 8.157,41). Mesmo que o valor das suas férias (salário + 1/3) ultrapasse R$ 20.000,00, o desconto do INSS não passará deste limite."
  },
  {
    question: "O novo salário mínimo de R$ 1.518,00 afeta minhas férias?",
    answer: "Sim. Se você ganha salário mínimo, suas férias não podem ser calculadas com base no valor antigo. O aumento sancionado impacta diretamente o piso das férias, que deve respeitar o valor vigente no mês do gozo."
  },
  {
    question: "Posso vender 15 ou 20 dias de férias?",
    answer: "Não. O Artigo 143 da CLT permite converter em dinheiro apenas 1/3 do período a que o empregado tiver direito. Para quem tem direito a 30 dias, o máximo permitido para venda são 10 dias."
  },
  {
    question: "Como funciona o desconto de IRRF nas férias em 2025?",
    answer: "O imposto é retido na fonte no momento do pagamento (Regime de Caixa). Em 2025, aplica-se o Desconto Simplificado de R$ 607,20 se ele for mais vantajoso que as deduções legais, reduzindo a base de cálculo para a maioria dos trabalhadores."
  }
];
const VacationPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Férias 2025: Líquido e Venda (CLT)",
    "url": "https://www.junny.com.br/calculadoras/ferias",
    "description": "Calcule Férias 2025 com novas tabelas INSS e IRRF. Veja valor líquido, venda de 10 dias e desconto máximo de R$ 951,63 no teto.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
    "featureList": [
      "Cálculo de Férias + 1/3",
      "Simulação de Abono Pecuniário (Venda de 10 dias)",
      "Tabela INSS 2025 Progressiva",
      "Cálculo IRRF com Desconto Simplificado"
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
        title: "Calculadora de Férias 2025: Líquido e Venda (CLT)",
        description: "Calcule Férias 2025 com novas tabelas INSS e IRRF. Veja valor líquido, venda de 10 dias e desconto máximo de R$ 951,63 no teto.",
        canonical: "/calculadoras/ferias"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": VACATION_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora de Férias", href: "/calculadoras/ferias" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Atualizado 2025 • Oficial CLT" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500", children: "Férias 2025" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 text-left", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-blue-400 font-semibold mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-400" }),
              "Resumo Rápido (Dados Oficiais Dezembro/2025)"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "grid sm:grid-cols-2 gap-3 text-sm text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-blue-500/50", children: "•" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Salário Mínimo Base: ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 1.518,00" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-blue-500/50", children: "•" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Teto do INSS: ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 8.157,41" }),
                  " (Max R$ 951,63)"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-blue-500/50", children: "•" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Isenção IRRF: Até ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 2.428,80" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-blue-500/50", children: "•" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Desconto Simplificado: ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 607,20" })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(VacationCalculator, {}) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-16 max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Resumo em 30 Segundos" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed", children: [
              "Esta ferramenta é essencial para o trabalhador CLT que busca previsibilidade financeira ao planejar o descanso. Aqui você entende o impacto prático do novo salário mínimo (",
              /* @__PURE__ */ jsx("strong", { className: "text-gray-200", children: "R$ 1.518,00" }),
              ") e como o teto do INSS (",
              /* @__PURE__ */ jsx("strong", { className: "text-gray-200", children: "R$ 8.157,41" }),
              ") protege seu salário bruto, limitando o desconto a ",
              /* @__PURE__ */ jsx("strong", { className: "text-gray-200", children: "R$ 951,63" }),
              '. Descubra se vale a pena "vender" 10 dias de férias e como a faixa de isenção de IRRF (até ',
              /* @__PURE__ */ jsx("strong", { className: "text-gray-200", children: "R$ 2.428,80" }),
              ") pode aumentar o dinheiro no seu bolso."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Tabelas Oficiais Utilizadas (Vigência 2025)" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 border border-white/5 rounded-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 bg-white/5 border-b border-white/5", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white", children: "Tabela Progressiva INSS 2025" }) }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 text-gray-400", children: [
                  /* @__PURE__ */ jsx("th", { className: "p-4", children: "Faixa Salarial (R$)" }),
                  /* @__PURE__ */ jsx("th", { className: "p-4", children: "Alíquota" }),
                  /* @__PURE__ */ jsx("th", { className: "p-4", children: "Parcela a Deduzir" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { className: "text-gray-300", children: [
                  /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "Até 1.518,00" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "7,5%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "-" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 1.518,01 até 2.793,88" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "9,0%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 22,77" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 2.793,89 até 4.190,83" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "12,0%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 106,59" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 4.190,84 até 8.157,41" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "14,0%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 190,40" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("tfoot", { className: "bg-white/5 text-xs text-gray-500", children: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 3, className: "p-3", children: "Fonte: Portaria Interministerial MPS/MF nº 6/2025 (Reajuste pelo INPC)" }) }) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 border border-white/5 rounded-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 bg-white/5 border-b border-white/5", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white", children: "Tabela IRRF 2025 (Vigente desde Maio)" }) }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 text-gray-400", children: [
                  /* @__PURE__ */ jsx("th", { className: "p-4", children: "Base de Cálculo (R$)" }),
                  /* @__PURE__ */ jsx("th", { className: "p-4", children: "Alíquota" }),
                  /* @__PURE__ */ jsx("th", { className: "p-4", children: "Dedução (R$)" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { className: "text-gray-300", children: [
                  /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "Até 2.428,80" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400 font-medium", children: "Isento" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "0,00" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 2.428,81 até 2.826,65" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "7,5%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "182,16" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 2.826,66 até 3.751,05" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "15,0%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "394,16" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 3.751,06 até 4.664,68" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "22,5%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "675,49" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "Acima de 4.664,68" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-emerald-400", children: "27,5%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: "908,73" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("tfoot", { className: "bg-white/5 text-xs text-gray-500", children: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 3, className: "p-3", children: "*Desconto Simplificado automático de R$ 607,20 se for mais vantajoso." }) }) })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-red-500/5 border border-red-500/20 rounded-2xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-red-400 mb-4", children: "Erros Comuns: Por que a conta manual não bate?" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-300 mb-4", children: [
              "A maioria faz a conta simples: ",
              /* @__PURE__ */ jsx("code", { children: "Salário x 1,33" }),
              ". Isso está ",
              /* @__PURE__ */ jsx("strong", { className: "text-red-400", children: "errado" }),
              "."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: 'O cálculo real tributa o total acumulado. Ao somar o 1/3, você frequentemente "salta" de faixa no INSS e IRRF, aumentando o desconto. Além disso, faltas injustificadas no período aquisitivo podem reduzir drasticamente seus dias de direito (Art. 130 CLT).' })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Como Calcular Férias: Passo a Passo" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: 'Confira a metodologia "em cascata" com dois exemplos práticos:' }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 border border-white/5 rounded-2xl p-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4 pb-2 border-b border-white/10", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold", children: "1" }),
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white", children: "Salário Médio (R$ 3.000)" })
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Base Bruta:" }),
                    " R$ 4.000,00 (Sal + 1/3)"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "INSS (12%):" }),
                    " - R$ 373,41"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "IRRF (15%):" }),
                    " - R$ 114,76",
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1", children: "Base Reduzida: R$ 3.392,80 (Simplificado)" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "pt-2 border-t border-white/5 flex justify-between text-white font-medium", children: [
                    /* @__PURE__ */ jsx("span", { children: "Líquido:" }),
                    /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "R$ 3.511,83" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 border border-white/5 rounded-2xl p-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4 pb-2 border-b border-white/10", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold", children: "2" }),
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white", children: "Salário Alto (R$ 7.500)" })
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Base Bruta:" }),
                    " R$ 10.000,00 (Sal + 1/3)"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "INSS (Teto):" }),
                    " - R$ 951,63",
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1", children: "Travado no teto de R$ 8.157,41" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "IRRF (27.5%):" }),
                    " - R$ 1.579,57"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "pt-2 border-t border-white/5 flex justify-between text-white font-medium", children: [
                    /* @__PURE__ */ jsx("span", { children: "Líquido:" }),
                    /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "R$ 7.468,80" })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-2xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-emerald-400 mb-4", children: 'Venda de Férias (Abono Pecuniário): O "Pulo do Gato"' }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-300 mb-4", children: [
              'A conversão de 1/3 das férias em dinheiro ("venda") tem ',
              /* @__PURE__ */ jsx("strong", { children: "isenção total de impostos" }),
              ". Sobre os 10 dias vendidos e seu terço não incidem INSS nem IRRF."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: 'Ao optar pelo abono em nossa calculadora, você verá que o valor líquido sobe desproporcionalmente, pois é uma verba "limpa".' })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/30 p-4 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-medium text-white mb-2", children: "Rescisão" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
                "Se pediu demissão, o cálculo muda (proporcional 1/12). Use a ",
                /* @__PURE__ */ jsx("a", { href: "/calculadoras/rescisao", className: "text-blue-400 hover:underline", children: "calculadora de rescisão" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/30 p-4 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-medium text-white mb-2", children: "13º Salário" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Você pode pedir a 1ª parcela junto com as férias (metade do nominal, sem descontos)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/30 p-4 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-medium text-white mb-2", children: "Médias Variáveis" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Horas extras e comissões integram a base de cálculo (Súmula 347 TST)." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: VACATION_FAQS,
          title: "Perguntas Frequentes (2025)",
          className: "py-12 max-w-4xl mx-auto",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96 w-full flex items-center justify-center text-gray-500", children: "Carregando oferta..." }), children: /* @__PURE__ */ jsx(AppPromoBanner, {}) })
    ] })
  ] });
};
export {
  VacationPage
};
//# sourceMappingURL=VacationPage-DQu_P5Td.js.map
