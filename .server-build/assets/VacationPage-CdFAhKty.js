import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Calendar, User, TrendingUp, Plane } from "lucide-react";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { FAQ } from "./FAQ-CDVQG5oV.js";
import "react-router-dom";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "./CalculatorContext-CjI84puU.js";
import "./author-DhnQlz7G.js";
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
    const baseIRRF = baseINSS - inss - dependents * 189.59;
    let irrf = calculateIRRF(baseIRRF);
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
    if (base <= 1412) {
      discount = base * 0.075;
    } else if (base <= 2666.68) {
      discount = 1412 * 0.075 + (base - 1412) * 0.09;
    } else if (base <= 4000.03) {
      discount = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (base - 2666.68) * 0.12;
    } else if (base <= 7786.02) {
      discount = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (base - 4000.03) * 0.14;
    } else {
      discount = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14;
    }
    return discount;
  };
  const calculateIRRF = (base) => {
    let discount = 0;
    if (base <= 2259.2) {
      discount = 0;
    } else if (base <= 2826.65) {
      discount = base * 0.075 - 169.44;
    } else if (base <= 3751.05) {
      discount = base * 0.15 - 381.44;
    } else if (base <= 4664.68) {
      discount = base * 0.225 - 662.77;
    } else {
      discount = base * 0.275 - 896;
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
    question: "O que compõe o cálculo de férias?",
    answer: "O cálculo envolve: Salário Bruto (incluindo médias de horas extras e comissões), o acréscimo de 1/3 Constitucional (33,33% sobre o valor), a opção de Abono Pecuniário (venda de 10 dias) e os descontos de INSS e IRRF."
  },
  {
    question: "É vantajoso vender 10 dias de férias (Abono)?",
    answer: "Financeiramente sim, pois você recebe pelos dias trabalhados + o valor da venda dos dias de férias (com 1/3). É uma renda extra significativa, mas deve-se pesar a necessidade de descanso."
  },
  {
    question: "Quando o pagamento deve ser feito?",
    answer: "A empresa deve pagar as férias até 2 dias úteis antes do início do descanso. Se houver atraso, a lei determina o pagamento em dobro."
  },
  {
    question: "Como funcionam os descontos de INSS e IRRF nas férias?",
    answer: "As férias são tributadas separadamente do salário do mês. O INSS segue a tabela progressiva e o Imposto de Renda é retido na fonte se o valor ultrapassar o limite de isenção."
  }
];
const VacationPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Férias",
    "description": "Calcule o valor exato das suas férias com 1/3 constitucional e descontos.",
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
        title: "Calculadora de Férias 2025 - Cálculo Exato e Gratuito",
        description: "Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF.",
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
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500", children: "Férias" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto hidden" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          children: [
            /* @__PURE__ */ jsx("div", { className: "min-h-[600px]", children: /* @__PURE__ */ jsx(VacationCalculator, {}) }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto text-center mt-8 mb-12", children: "Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF." })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: VACATION_FAQS,
          title: "Perguntas Frequentes sobre Férias",
          className: "py-12",
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
//# sourceMappingURL=VacationPage-CdFAhKty.js.map
