import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, Suspense, lazy } from "react";
import { Calculator, DollarSign, User, Calendar, Plane } from "lucide-react";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
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
      discount = base * 0.09 - 22.77;
    } else if (base <= 4190.83) {
      discount = base * 0.12 - 106.59;
    } else {
      discount = base * 0.14 - 190.4;
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
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white mb-8", children: [
      /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
      "Simular Férias"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "text-sm text-gray-400", children: "Salário Bruto" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "salary",
                "aria-label": "Salário Bruto",
                type: "number",
                inputMode: "decimal",
                value: salary,
                onChange: (e) => setSalary(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "dependents", className: "text-sm text-gray-400", children: "Dependentes" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "dependents",
                "aria-label": "Dependentes",
                type: "number",
                inputMode: "numeric",
                value: dependents,
                onChange: (e) => setDependents(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "days", className: "text-sm text-gray-400", children: "Dias de Férias" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "days",
                "aria-label": "Dias de Férias",
                value: days,
                onChange: (e) => setDays(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none",
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
        /* @__PURE__ */ jsx("div", { className: "flex items-end pb-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "sellDays",
              checked: sellDays,
              onChange: (e) => setSellDays(e.target.checked),
              className: "w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-black/30 cursor-pointer"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "sellDays", className: "text-sm text-gray-300 select-none cursor-pointer", children: "Vender 10 dias (Abono)" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-white/5 mt-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor Líquido a Receber" }),
          /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: formatCurrency(result.totalNet) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4 mt-3 text-xs", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
              "Bruto: ",
              formatCurrency(result.totalGross)
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
              "Desc: ",
              formatCurrency(result.inss + result.irrf)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-gray-300", children: [
              "Valor Férias (",
              days,
              " dias)"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: formatCurrency(result.grossVacation) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "1/3 Constitucional" }),
            /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: formatCurrency(result.oneThirdBonus) })
          ] }),
          sellDays && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Abono Pecuniário (10 dias)" }),
              /* @__PURE__ */ jsxs("span", { className: "text-emerald-400 font-medium", children: [
                "+ ",
                formatCurrency(result.allowance)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "1/3 Abono" }),
              /* @__PURE__ */ jsxs("span", { className: "text-emerald-400 font-medium", children: [
                "+ ",
                formatCurrency(result.allowanceOneThird)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 pl-4 text-xs rounded-lg text-red-300/80", children: [
            /* @__PURE__ */ jsx("span", { children: "- INSS" }),
            /* @__PURE__ */ jsx("span", { children: formatCurrency(result.inss) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 pl-4 text-xs rounded-lg text-red-300/80", children: [
            /* @__PURE__ */ jsx("span", { children: "- IRRF" }),
            /* @__PURE__ */ jsx("span", { children: formatCurrency(result.irrf) })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const AppPromoBanner = lazy(() => import("./AppPromoBanner-DsGa7GAJ.js").then((module) => ({ default: module.AppPromoBanner })));
const VACATION_FAQS = [
  {
    question: "Qual o desconto máximo de INSS nas férias em 2025?",
    answer: 'O desconto máximo de contribuição previdenciária nas férias é de <strong>R$ 951,63</strong> em dezembro de 2025. Isso ocorre porque, mesmo que a remuneração de férias (salário + 1/3) ultrapasse o teto do INSS de R$ 8.157,41, a alíquota progressiva para de incidir sobre o valor excedente, travando o desconto da <a href="https://junny.com.br/calculadoras/inss" className="text-blue-400 hover:underline">contribuição ao INSS</a> neste limite específico.'
  },
  {
    question: "Qual o prazo legal para o pagamento das férias em 2025?",
    answer: "O empregador é obrigado a efetuar o pagamento das férias até <strong>2 dias antes</strong> do início do período de gozo. Se houver atraso no pagamento, a empresa fica sujeita à multa administrativa. Em relação à dobra das férias (pagamento em dobro), o STF decidiu recentemente que ela se aplica principalmente à falta de concessão do descanso no prazo, e não automaticamente pelo simples atraso financeiro."
  },
  {
    question: "Posso vender 10 dias de férias? Vale a pena?",
    answer: "Sim, converter 1/3 das férias em dinheiro (abono pecuniário) é um direito do trabalhador e costuma valer a pena financeiramente. Ao simular na <strong>Calculadora de Férias 2025</strong>, você nota que sobre o valor desses 10 dias vendidos e seu respectivo terço constitucional <strong>não incidem descontos de INSS e Imposto de Renda</strong>, garantindo um valor líquido superior."
  },
  {
    question: "Como calcular férias proporcionais?",
    answer: 'O direito a férias proporcionais é calculado na base de 1/12 avos da remuneração para cada mês trabalhado. Pela regra, considera-se como "mês trabalhado" qualquer período igual ou superior a 15 dias de serviço dentro do mês civil. Esse cálculo é comum em contratos com menos de um ano ou em rescisões contratuais.'
  },
  {
    question: "O INSS incide sobre o 1/3 de férias?",
    answer: "Sim, o terço constitucional sofre tributação normal, mas com uma distinção importante. O terço referente aos dias de descanso (gozo de férias) tem incidência de INSS e IRRF. Já o terço correspondente aos dias convertidos em abono pecuniário (venda de férias) é considerado verba indenizatória, portanto, é isento de descontos."
  },
  {
    question: "Estagiário tem direito a férias?",
    answer: 'O estagiário tem direito ao chamado "Recesso Remunerado", que consiste em 30 dias de descanso após um ano de contrato, ou proporcional ao tempo estagiado. A principal diferença é que o estagiário recebe o valor da bolsa-auxílio normal durante o recesso, mas <strong>não tem direito ao adicional de 1/3 constitucional</strong> e não sofre descontos previdenciários sobre esse valor.'
  },
  {
    question: "Quem define a data das minhas férias?",
    answer: "Segundo a legislação trabalhista (CLT), a palavra final sobre o agendamento das férias cabe ao empregador, visando atender às necessidades da empresa. Contudo, a prática recomendada é o acordo mútuo. Além disso, é proibido por lei iniciar as férias no período de dois dias que antecede feriado ou o descanso semanal remunerado (DSR)."
  }
];
const VacationPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Férias 2025: Simulação Completa (Líquido e Venda)",
    "url": "https://www.junny.com.br/calculadoras/ferias",
    "description": "Acesse a Calculadora de Férias 2025 e simule o valor líquido exato. Inclui nova tabela INSS progressiva, IRRF e cálculo de venda (abono) sem impostos.",
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
        title: "Calculadora de Férias 2025: Líquido e Venda (Simulação)",
        description: "Acesse a Calculadora de Férias 2025 e simule o valor líquido exato. Inclui nova tabela INSS progressiva, IRRF e cálculo de venda (abono) sem impostos.",
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
            "Calculadora de Férias ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500", children: "2025: Simulação Completa (Líquido e Venda)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsx(VacationCalculator, {}) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-400" }),
            "Resumo Rápido (Dados Oficiais Dezembro/2025)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Salário Mínimo Base" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 1.518,00" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Teto do INSS" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 8.157,41" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Desconto máximo de R$ 951,63" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "text-blue-500 font-bold", children: "•" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Isenção de IRRF:" }),
                  " Até R$ 2.428,80."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "text-blue-500 font-bold", children: "•" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Venda de Férias:" }),
                  " 100% Isento de Impostos."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "text-blue-500 font-bold", children: "•" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Prazo Pagamento:" }),
                  " Até 2 dias antes do gozo."
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500", children: /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-300 leading-relaxed", children: [
        "O planejamento de férias em 2025 exige atenção redobrada às novas faixas de contribuição e regras tributárias. Esta ",
        /* @__PURE__ */ jsx("strong", { children: "Calculadora de Férias 2025" }),
        " oferece a metodologia exata para simular seus recebimentos, garantindo que nenhum centavo seja deixado para trás no momento do seu descanso."
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-16 max-w-4xl mx-auto pb-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Resposta Rápida: Como Calcular Férias" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed", children: "Para calcular o valor das férias, soma-se o salário bruto às médias de adicionais (como horas extras e comissões dos últimos 12 meses) e acrescenta-se o terço constitucional (divisão do total por 3). Sobre esse montante bruto, aplica-se primeiro o desconto do INSS (tabela progressiva 2025) e, sobre o saldo restante, desconta-se o Imposto de Renda. Caso haja venda de dias (abono pecuniário), este valor é somado ao final, pois é totalmente isento de impostos." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Plane, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Resumo em 30 Segundos" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed mb-4", children: [
            "Esta ferramenta aplica rigorosamente a legislação trabalhista vigente em ",
            /* @__PURE__ */ jsx("strong", { children: "dezembro de 2025" }),
            ". Diferente de simuladores genéricos, nosso algoritmo considera a tributação progressiva do INSS (cobrada faixa a faixa), a nova tabela de IRRF e as regras de isenção para quem vende dias."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("strong", { children: "Como usar a calculadora:" }),
            " Insira seu salário bruto atual, informe o número de dependentes (para dedução do IR) e selecione quantos dias de férias pretende gozar (ex: 20 ou 30 dias). A ",
            /* @__PURE__ */ jsx("strong", { children: "Calculadora de Férias 2025" }),
            " fará o cruzamento imediato com as tabelas oficiais para exibir seu valor líquido."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Tabelas Oficiais para o Cálculo (2025)" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
              "Para garantir a precisão da ",
              /* @__PURE__ */ jsx("strong", { children: "Calculadora de Férias 2025" }),
              ", o cálculo segue rigorosamente a ",
              /* @__PURE__ */ jsx("strong", { children: "Tabela Progressiva do INSS" }),
              " (atualizada pelo INPC de 2024) e a ",
              /* @__PURE__ */ jsx("strong", { children: "Tabela de Imposto de Renda" }),
              " (Lei nº 15.191)."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 border border-white/5 rounded-2xl overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white/5 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white", children: "Tabela de INSS 2025 (Progressiva)" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "A alíquota não é aplicada diretamente sobre o total. Ela é fatiada por faixas salariais." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 text-gray-400", children: [
                /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Faixa de Salário de Contribuição (R$)" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-center", children: "Alíquota Nominal" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-center", children: "Parcela a Deduzir (R$)" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-300", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "Até 1.518,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-emerald-400", children: "7,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "-" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 1.518,01 até 2.793,88" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-emerald-400", children: "9,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "22,77" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 2.793,89 até 4.190,83" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-emerald-400", children: "12,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "106,59" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 4.190,84 até 8.157,41" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-emerald-400", children: "14,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "190,40" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-white/5 border-t border-white/5 text-xs text-gray-500", children: /* @__PURE__ */ jsxs("div", { className: "p-2 border-l-2 border-emerald-500 bg-emerald-500/5 text-gray-400", children: [
              /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
              " Dados consolidados das ",
              /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/inss/pt-br/noticias/confira-como-ficaram-as-aliquotas-de-contribuicao-ao-inss", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Portarias Interministeriais da Previdência Social de 2025" }),
              "."
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 border border-white/5 rounded-2xl overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white/5 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white", children: "Tabela de IRRF (Tabela Vigente (Dez/2025))" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-1", children: [
                "O sistema verifica automaticamente se o ",
                /* @__PURE__ */ jsx("strong", { children: "Desconto Simplificado (R$ 607,20)" }),
                " é mais vantajoso que as deduções legais."
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 text-gray-400", children: [
                /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Base de Cálculo (R$)" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-center", children: "Alíquota (%)" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-center", children: "Parcela a Deduzir do IR (R$)" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-300", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "Até 2.428,80" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-emerald-400", children: "Isento" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "0,00" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 2.428,81 até 2.826,65" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-emerald-400", children: "7,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "182,16" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 2.826,66 até 3.751,05" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-emerald-400", children: "15,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "394,16" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 3.751,06 até 4.664,68" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-emerald-400", children: "22,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "675,49" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "Acima de 4.664,68" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-emerald-400", children: "27,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "908,73" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-white/5 border-t border-white/5 text-xs text-gray-500", children: /* @__PURE__ */ jsxs("div", { className: "p-2 border-l-2 border-emerald-500 bg-emerald-500/5 text-gray-400", children: [
              /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
              " Tabela progressiva mensal atualizada pela ",
              /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Receita Federal do Brasil" }),
              "."
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Erros Comuns ao Calcular Férias em 2025" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
            'Muitos trabalhadores perdem dinheiro ou se confundem ao tentar fazer a conta "na ponta do lápis" sem considerar as nuances da legislação atual. Ao utilizar uma ',
            /* @__PURE__ */ jsx("strong", { children: "Calculadora de Férias 2025" }),
            " atualizada, você evita os seguintes equívocos:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-gray-400 list-disc pl-5", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Aplicar porcentagem direta do INSS:" }),
              " Não se multiplica o valor total das férias por 14%. O cálculo deve ser feito faixa a faixa (progressivo). Uma conta direta resulta em um desconto maior do que o devido."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Tributar a venda de férias (Abono):" }),
              " Se você optar por converter 1/3 das férias em dinheiro, ",
              /* @__PURE__ */ jsx("strong", { children: "não incide INSS nem IRRF" }),
              " sobre esse valor específico. Calculadoras desatualizadas aplicam impostos aqui, subestimando o valor que você tem a receber."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Média Financeira x Média Física:" }),
              " Para horas extras, não se faz a média dos valores recebidos. Faz-se a média da ",
              /* @__PURE__ */ jsx("strong", { children: "quantidade de horas" }),
              " nos últimos 12 meses e multiplica-se pelo valor da hora atual. Isso protege seu poder de compra contra a inflação. Você pode verificar suas médias usando nossa ",
              /* @__PURE__ */ jsx("a", { href: "https://junny.com.br/calculadoras/horas-extras", className: "text-blue-400 hover:underline", children: "calculadora de horas extras" }),
              " antes de somar ao salário base."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Como Funciona o Cálculo (Passo a Passo)" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "A base legal do cálculo de férias envolve o salário atual, médias variáveis (Art. 142 da CLT) e o adicional de 1/3 (Constituição Federal)." }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white", children: "A Fórmula Geral" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "A estrutura matemática básica é:" }),
          /* @__PURE__ */ jsx("div", { className: "bg-[#1a1a1a]/50 p-4 rounded-xl border border-white/5 text-center font-mono text-emerald-400", children: "Base Férias = (Salário + Médias) + ((Salário + Médias) / 3)" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Dessa base bruta, subtraem-se o INSS e, em seguida, o Imposto de Renda." }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 border border-white/5 rounded-2xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Exemplo 1: Salário de R$ 3.000,00 (Faixa Intermediária)" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
              "Vamos supor que um trabalhador ganhe R$ 3.000,00, sem dependentes, e vai tirar 30 dias de férias em dezembro de 2025. Se você fizer essa simulação na ",
              /* @__PURE__ */ jsx("strong", { children: "Calculadora de Férias 2025" }),
              ", verá o seguinte detalhamento:"
            ] }),
            /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-3 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Cálculo do Bruto:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mt-1 text-gray-400", children: [
                  /* @__PURE__ */ jsx("li", { children: "Salário: R$ 3.000,00" }),
                  /* @__PURE__ */ jsx("li", { children: "1/3 Constitucional: R$ 1.000,00" }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Total Bruto:" }),
                    " R$ 4.000,00"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Desconto do INSS (Progressivo):" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mt-1 text-gray-400", children: [
                  /* @__PURE__ */ jsx("li", { children: "O valor cai na 3ª faixa (12%)." }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    "Cálculo: (4.000,00 × 12%) - 106,59 (parcela a deduzir) = ",
                    /* @__PURE__ */ jsx("strong", { children: "R$ 373,41" }),
                    "."
                  ] }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("em", { children: "Nota: Se fosse aplicado 12% direto sem dedução, o desconto seria R$ 480,00 (erro comum)." }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Desconto do IRRF:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mt-1 text-gray-400", children: [
                  /* @__PURE__ */ jsx("li", { children: "Base para IR: 4.000,00 - 373,41 (INSS) = R$ 3.626,59." }),
                  /* @__PURE__ */ jsx("li", { children: "O valor cai na faixa de 15%." }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    "Cálculo: (3.626,59 × 15%) - 394,16 (parcela a deduzir) = ",
                    /* @__PURE__ */ jsx("strong", { children: "R$ 149,83" }),
                    "."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Valor Líquido a Receber:" }),
                /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 mt-1 text-gray-400", children: /* @__PURE__ */ jsxs("li", { children: [
                  "4.000,00 - 373,41 - 149,83 = ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 3.476,76" }),
                  "."
                ] }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 border border-white/5 rounded-2xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Exemplo 2: Salário de R$ 8.000,00 (Próximo ao Teto)" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
              "Ao simular um alto rendimento na ",
              /* @__PURE__ */ jsx("strong", { children: "Calculadora de Férias 2025" }),
              ", vemos o efeito do Teto do INSS e a alíquota máxima do Imposto de Renda."
            ] }),
            /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-3 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Cálculo do Bruto:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mt-1 text-gray-400", children: [
                  /* @__PURE__ */ jsx("li", { children: "Salário: R$ 8.000,00" }),
                  /* @__PURE__ */ jsx("li", { children: "1/3 Constitucional: R$ 2.666,67" }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Total Bruto:" }),
                    " R$ 10.666,67"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Desconto do INSS (Limitado ao Teto):" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mt-1 text-gray-400", children: [
                  /* @__PURE__ */ jsx("li", { children: "Embora o bruto seja R$ 10.666,67, o INSS incide apenas até o teto de R$ 8.157,41." }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    "Cálculo Máximo: (8.157,41 × 14%) - 190,40 (parcela a deduzir) = ",
                    /* @__PURE__ */ jsx("strong", { children: "R$ 951,63" }),
                    "."
                  ] }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("em", { children: "Nota: Este é o desconto máximo possível em 2025." }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Desconto do IRRF:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mt-1 text-gray-400", children: [
                  /* @__PURE__ */ jsx("li", { children: "Base para IR: 10.666,67 (Bruto) - 951,63 (INSS) = R$ 9.715,04." }),
                  /* @__PURE__ */ jsx("li", { children: "O valor cai na última faixa (27,5%)." }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    "Cálculo: (9.715,04 × 27,5%) - 908,73 (parcela a deduzir) = ",
                    /* @__PURE__ */ jsx("strong", { children: "R$ 1.762,90" }),
                    "."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Valor Líquido a Receber:" }),
                /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 mt-1 text-gray-400", children: /* @__PURE__ */ jsxs("li", { children: [
                  "10.666,67 - 951,63 - 1.762,90 = ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 7.952,14" }),
                  "."
                ] }) })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Impacto das Faltas Injustificadas" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
            "O cálculo final na ",
            /* @__PURE__ */ jsx("strong", { children: "Calculadora de Férias 2025" }),
            " depende diretamente do seu histórico de presença, pois o Artigo 130 da CLT estabelece um sistema de proporcionalidade. Faltas sem justificativa legal (atestado, casamento, luto) durante o período aquisitivo reduzem os dias de descanso a que você tem direito."
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-gray-400 list-disc pl-5", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Até 5 faltas:" }),
              " 30 dias de férias."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "6 a 14 faltas:" }),
              " 24 dias de férias."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "15 a 23 faltas:" }),
              " 18 dias de férias."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "24 a 32 faltas:" }),
              " 12 dias de férias."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Mais de 32 faltas:" }),
              " Perde o direito às férias."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Casos Especiais e Regras de 2025" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
            "Além do cálculo padrão, a ",
            /* @__PURE__ */ jsx("strong", { children: "Calculadora de Férias 2025" }),
            " contempla situações específicas que exigem atenção extra:"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: 'Abono Pecuniário ("Venda de Férias")' }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
                "O trabalhador pode converter 1/3 do período de férias (geralmente 10 dias) em dinheiro. O prazo para solicitar isso é até 15 dias antes do término do período aquisitivo. A grande vantagem financeira é que, conforme legislação tributária, ",
                /* @__PURE__ */ jsx("strong", { children: "não há desconto de impostos" }),
                " sobre o valor da venda e o terço constitucional correspondente a ela."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: "Férias Fracionadas" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Desde a Reforma Trabalhista, e mantido em 2025, as férias podem ser divididas em até três períodos. Um deles não pode ser inferior a 14 dias corridos e os demais não podem ser inferiores a 5 dias corridos." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: "Terceirizados na Administração Pública" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
                "Uma atualização importante trazida pela ",
                /* @__PURE__ */ jsx("strong", { children: "Instrução Normativa nº 213/2025" }),
                " exige que terceirizados com dedicação exclusiva na Administração Pública Federal planejem suas férias com 60 dias de antecedência. Consulte a norma completa no ",
                /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/compras/pt-br/acesso-a-informacao/noticias/governo-federal-publica-norma-para-assegurar-planejamento-antecipado-das-ferias-de-colaboradores-terceirizados", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Portal Gov.br" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: "Rescisão de Contrato" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
                'Se você foi demitido ou pediu demissão, o cálculo muda para "férias proporcionais" (pagas em avos) ou "férias vencidas" (se houver). Se o período concessivo já venceu, o pagamento deve ser em dobro. Para simulações de saída da empresa, recomenda-se usar especificamente a ',
                /* @__PURE__ */ jsx("a", { href: "https://junny.com.br/calculadoras/rescisao", className: "text-blue-400 hover:underline", children: "calculadora de rescisão" }),
                "."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: VACATION_FAQS,
          title: "Perguntas Frequentes sobre Férias (FAQ)",
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
//# sourceMappingURL=VacationPage-3cH75HzT.js.map
