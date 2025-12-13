import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Moon, Calculator, FileText, DollarSign, Percent, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
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
const NIGHT_SHIFT_FAQS = [
  {
    question: "Qual o valor da hora noturna em 2025?",
    answer: "O valor mínimo da hora noturna em 2025, baseada no salário mínimo de R$ 1.518,00, é de <strong>R$ 8,28</strong> (R$ 6,90 + 20%). Porém, se houver adicionais de periculosidade ou insalubridade, este valor base aumenta antes de aplicar os 20%."
  },
  {
    question: "Quem trabalha 12x36 recebe adicional noturno?",
    answer: "Sim. Quem trabalha na escala 12x36 tem direito ao adicional noturno sobre as horas trabalhadas entre 22h e 05h. A discussão jurídica atual (2025) reside apenas sobre a prorrogação após as 05h da manhã, que depende da convenção coletiva da categoria."
  },
  {
    question: "O intervalo de janta conta como adicional noturno?",
    answer: "Não. O intervalo intrajornada (hora de janta/descanso) não é remunerado e, portanto, não incide adicional noturno, salvo se o trabalhador for impedido de gozar o intervalo integralmente."
  },
  {
    question: "Existe um valor máximo (teto) para o Adicional Noturno?",
    answer: "Não. A legislação trabalhista (CLT) não estabelece um teto ou limite financeiro para o pagamento do adicional noturno. O valor será sempre proporcional ao salário do trabalhador: quanto maior a remuneração base e os adicionais (periculosidade/insalubridade), maior será o valor recebido pelas horas noturnas."
  },
  {
    question: "Como calcular adicional noturno sobre periculosidade?",
    answer: "A conta é feita em cascata. Primeiro, soma-se 30% de periculosidade ao salário base. O resultado dessa soma é dividido pelas horas mensais (ex: 220) para achar o valor da hora. Só então aplica-se os 20% do noturno sobre esse valor majorado (OJ 259 TST)."
  },
  {
    question: "O adicional noturno entra no cálculo da rescisão?",
    answer: "Sim. Se o adicional noturno foi pago com habitualidade, ele integra a base de cálculo para Aviso Prévio, Férias Vencidas/Proporcionais e 13º Salário na rescisão. Calcule seus direitos exatos na <a href='/calculadoras/rescisao'>Calculadora de Rescisão</a>."
  },
  {
    question: "Trabalhador rural tem hora reduzida?",
    answer: "Não. A hora noturna do trabalhador rural (lavoura ou pecuária) tem 60 minutos completos. Em compensação, a alíquota do adicional é maior: 25% sobre a hora normal, em vez dos 20% urbanos."
  }
];
function NightShiftPage() {
  const [salary, setSalary] = useState("");
  const [hoursWorked, setHoursWorked] = useState("220");
  const [nightHours, setNightHours] = useState("");
  const [shiftType, setShiftType] = useState("urbano");
  const [dangerPay, setDangerPay] = useState(false);
  const [unhealthyPay, setUnhealthyPay] = useState(false);
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const monthlyHours = parseFloat(hoursWorked);
    const clockNightHours = parseFloat(nightHours.replace(",", ".") || "0");
    if (isNaN(sal) || isNaN(monthlyHours) || monthlyHours === 0) {
      setResult(null);
      return;
    }
    const hourlyRate = sal / monthlyHours;
    let bonusRate = 0.2;
    let reductionFactor = 1;
    if (shiftType === "urbano") {
      bonusRate = 0.2;
      reductionFactor = 1.142857;
    } else {
      bonusRate = 0.25;
      reductionFactor = 1;
    }
    const computedNightHours = clockNightHours * reductionFactor;
    const nightBonusTotal = computedNightHours * hourlyRate * bonusRate;
    setResult({
      hourlyRate,
      nightBonusRate: bonusRate,
      computedNightHours,
      nightBonusTotal,
      total: sal + nightBonusTotal
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, hoursWorked, nightHours, shiftType]);
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
    "name": "Calculadora de Adicional Noturno 2025: Guia Oficial (CLT)",
    "description": "Calcule o Adicional Noturno 2025 com salário de R$ 1.518. Guia CLT sobre hora reduzida (52m30s), DSR e integração com periculosidade.",
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
        title: "Calculadora Adicional Noturno 2025: Guia Oficial (CLT)",
        description: "Calcule o Adicional Noturno 2025 com salário de R$ 1.518. Guia CLT sobre hora reduzida (52m30s), DSR e integração com periculosidade.",
        canonical: "/calculadoras/adicional-noturno"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": NIGHT_SHIFT_FAQS.map((faq) => ({
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
          { label: "Adicional Noturno", href: "/calculadoras/adicional-noturno" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de Adicional Noturno ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "2025 (Guia Oficial)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
            "Calcular Adicional"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Base" }),
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
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Jornada Mensal (Horas)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    inputMode: "numeric",
                    value: hoursWorked,
                    onChange: (e) => setHoursWorked(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "220"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Horas Noturnas (Relógio)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    inputMode: "decimal",
                    value: nightHours,
                    onChange: (e) => setNightHours(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "Qtd horas"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Horas trabalhadas no relógio." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Categoria" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: shiftType,
                    onChange: (e) => setShiftType(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "urbano", children: "Urbano (20% + Redução)" }),
                      /* @__PURE__ */ jsx("option", { value: "rural_lavoura", children: "Rural - Lavoura (25%)" }),
                      /* @__PURE__ */ jsx("option", { value: "rural_pecuaria", children: "Rural - Pecuária (25%)" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor do Adicional Noturno" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.nightBonusTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                result && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-400 mt-2", children: [
                  "Horas Computadas: ",
                  result.computedNightHours.toLocaleString("pt-BR", { maximumFractionDigits: 2 }),
                  " hrs"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Valor Hora Normal" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.hourlyRate.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Salário + Adicional" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-500" }),
            "Resumo Rápido: Dados Oficiais Adicional Noturno (Dezembro 2025)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Salário Mínimo Base" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 1.518,00" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Vigência Jan/2025" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Valor da Hora Mínima:" }),
                  " R$ 6,90 (Divisor 220)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Percent, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Adicional Urbano:" }),
                  " Mínimo de 20% sobre a hora diurna."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Hora Noturna Reduzida:" }),
                  " 52 minutos e 30 segundos (Fator de conversão 1,1428)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Base de Cálculo:" }),
                  " Inclui Adicional de Periculosidade e Insalubridade se houver (Súmula 60 e OJ 259 TST)."
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Resumo em 30 Segundos" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-300 leading-relaxed mb-6", children: [
          "O ",
          /* @__PURE__ */ jsx("strong", { children: "Adicional Noturno" }),
          " não é um prêmio, mas uma reparação biológica obrigatória para quem trabalha entre 22h e 05h (trabalhadores urbanos). Em 2025, o cálculo exige atenção redobrada: além do acréscimo de 20% no valor da hora, a legislação determina que a hora noturna dura apenas 52 minutos e 30 segundos. Na prática, isso significa que trabalhar 7 horas no relógio equivale a receber por 8 horas trabalhadas, gerando um ganho financeiro real superior à porcentagem nominal."
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Tabela Oficial de Alíquotas e Horários (CLT)" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "A tabela abaixo reflete as regras vigentes do Artigo 73 da CLT e jurisprudência do TST atualizadas para o cenário econômico de 2025." }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10 mb-6", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Categoria" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Horário Noturno" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Alíquota Mínima" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Hora Reduzida?" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Fator Multiplicador Real" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Urbano" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "22:00 às 05:00" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 font-bold", children: "20%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Sim (52m30s)" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "1,3714 (1,20 × 1,1428)" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Rural (Lavoura)" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "21:00 às 05:00" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 font-bold", children: "25%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Não (60m)" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "1,25" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Rural (Pecuária)" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "20:00 às 04:00" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 font-bold", children: "25%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Não (60m)" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "1,25" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Portuário" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "19:00 às 07:00" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 font-bold", children: "Variável" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Não" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Consultar OGMO" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-sm", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
          " Baseado no Art. 73 da CLT (Urbano) e Lei nº 5.889/73 (Rural). Consulte o texto integral no ",
          /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Planalto Gov.br" }),
          ". Tabela de Fatores baseada em cálculos matemáticos legais."
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Diferença: Adicional Urbano vs Rural" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
            "Enquanto o trabalhador urbano tem a vantagem da ",
            /* @__PURE__ */ jsx("strong", { children: "hora ficta reduzida" }),
            " (trabalha 52m30s mas recebe por 60m) somada à alíquota de 20% prevista na CLT, o trabalhador rural cumpre a hora cheia de 60 minutos. Para compensar a falta de redução no tempo, a ",
            /* @__PURE__ */ jsx("strong", { children: "Lei nº 5.889/73" }),
            " concede ao rural uma alíquota maior, de ",
            /* @__PURE__ */ jsx("strong", { children: "25%" }),
            " sobre a hora normal."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-yellow-500 shrink-0" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-yellow-200 mb-2", children: "Erros Comuns ao Calcular o Adicional Noturno" }),
            /* @__PURE__ */ jsx("p", { className: "text-yellow-100/80", children: "A maioria dos erros de folha de pagamento ocorre por simplificações indevidas. O cálculo não é apenas aplicar 20% sobre o salário base." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-yellow-100/70", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Ignorar a Hora Ficta (Reduzida):" }),
              " O erro número um é calcular a hora noturna como se tivesse 60 minutos. A lei define que ela tem 52 minutos e 30 segundos. Isso obriga o uso de um fator de conversão de ",
              /* @__PURE__ */ jsx("strong", { children: "1,142857" }),
              ". Se você ignora isso, está pagando a menos."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Esquecer a Integração de Adicionais:" }),
              " Segundo a ",
              /* @__PURE__ */ jsx("a", { href: "https://www.tst.jus.br/oj-sdi-1", target: "_blank", rel: "noopener noreferrer", className: "underline hover:text-yellow-200", children: "Orientação Jurisprudencial nº 259 da SDI-1 do TST" }),
              ", o adicional de periculosidade integra a base de cálculo do adicional noturno. O cálculo deve ser em cascata: primeiro soma-se a periculosidade ao salário, depois aplica-se o noturno."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Desconsiderar a Prorrogação:" }),
              " Se o funcionário cumpre a jornada noturna integral e continua trabalhando após as 05:00, as horas da manhã também devem receber o adicional noturno, conforme a ",
              /* @__PURE__ */ jsx("a", { href: "https://www.tst.jus.br/sumulas", target: "_blank", rel: "noopener noreferrer", className: "underline hover:text-yellow-200", children: "Súmula nº 60 do TST" }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como Calcular o Adicional Noturno (Passo a Passo)" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: 'Para garantir precisão centesimal, utilizamos a metodologia de "Engenharia da Hora Ficta".' }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "1. Defina o Valor da Hora Normal Integrada" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 mb-2", children: "Antes de aplicar os 20%, você precisa saber quanto vale a hora de trabalho considerando outros adicionais fixos." }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mb-6 font-mono text-sm text-blue-300 break-all", children: "Base = Salário + (Base × %Peric.) + (Mínimo × %Insalub.)" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-6", children: "Nota: O salário mínimo em 2025 é de R$ 1.518,00." }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "2. Aplique o Fator de Redução" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 mb-2", children: "Cada hora de relógio trabalhada à noite deve ser multiplicada pelo fator da hora reduzida." }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mb-6 font-mono text-sm text-blue-300", children: "Horas Pagáveis = Horas Relógio × 1,142857" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "3. Fórmula Final" }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mb-2 font-mono text-sm text-blue-300", children: "Valor Adicional = (Horas Pagáveis × Valor Hora) × 0,20" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5 h-full", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-white mb-2", children: "Exemplo 1: Vigilante com Periculosidade" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-3", children: "Salário R$ 2.148,22 + 30% Periculosidade. 22h às 05h (7h)." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-xs text-gray-300", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Base de Cálculo:" }),
                  " R$ 2.148,22 + 30% = R$ 2.792,68."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Valor da Hora (Div 220):" }),
                  " R$ 2.792,68 ÷ 220 = ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 12,69" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Conversão:" }),
                  " 7h relógio × 1,142857 = ",
                  /* @__PURE__ */ jsx("strong", { children: "8 horas" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Cálculo:" }),
                  " (8h × R$ 12,69) × 20% = ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 20,30 por noite" }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 text-xs text-blue-400", children: [
                "Total mensal (12x36 - 15 dias): aprox. ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 304,50" }),
                ". Para ver o líquido, use a ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "underline hover:text-blue-300", children: "Calculadora de Salário Líquido" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5 h-full", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-white mb-2", children: "Exemplo 2: Recepcionista (Salário Mínimo)" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-3", children: "Piso R$ 1.518,00. Trabalha 4h noturnas." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-xs text-gray-300", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Valor da Hora:" }),
                  " R$ 1.518 ÷ 220 = R$ 6,90."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Horas Computadas:" }),
                  " 4h × 1,142857 = ",
                  /* @__PURE__ */ jsx("strong", { children: "4,57 horas" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsx("strong", { children: "Adicional:" }),
                  " (4,57h × R$ 6,90) × 20% = ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 6,31 por noite" }),
                  "."
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-4", children: "Reflexos e DSR: O Custo Oculto" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "O Adicional Noturno tem natureza salarial e gera reflexos. Ele deve ser integrado ao cálculo de:" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-300", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "DSR:" }),
                " Calculado separadamente sobre horas noturnas."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Férias e 13º:" }),
                " Pela média física das horas."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "FGTS e INSS:" }),
                " Incide sobre o valor bruto."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 text-sm text-blue-400", children: [
            "Consulte a ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-funcionario", className: "underline hover:text-blue-300", children: "Calculadora de Custo de Funcionário" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-4", children: "INSS 2025 (Progressiva)" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4 text-sm", children: "O adicional aumenta o salário bruto, podendo mudar a faixa de INSS:" }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-xs text-left", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "p-2", children: "Faixa (R$)" }),
              /* @__PURE__ */ jsx("th", { className: "p-2", children: "Alíquota" }),
              /* @__PURE__ */ jsx("th", { className: "p-2", children: "Dedução" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "Até 1.518,00" }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "7,5%" }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "-" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "1.518,01 - 2.793,88" }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "9%" }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "22,77" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "2.793,89 - 4.190,83" }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "12%" }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "106,59" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "4.190,84 - 8.157,41" }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "14%" }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: "190,40" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-gray-500", children: [
            "Fonte: ",
            /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal", target: "_blank", rel: "noopener noreferrer", className: "underline hover:text-blue-400", children: "Gov.br" }),
            ". Use a ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/inss", className: "underline hover:text-blue-400", children: "Calculadora de INSS Oficial" }),
            "."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Casos Especiais e Legislação 2025" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-md", children: 'Escala 12x36 e a "Prorrogação"' }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "A Reforma Trabalhista (Art. 59-A CLT) trouxe controvérsias. Em 2025, a regra segura depende da Convenção Coletiva. Para Vigilantes de SP, por exemplo, a CCT 2025 define que o adicional incide apenas das 22h às 05h, sem prorrogação automática." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-md", children: "Domésticas e Cuidadores" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
              'A LC 150/2015 garante a hora reduzida de 52m30s. Se o cuidador dorme no emprego mas não permanece em "estado de alerta", o adicional ',
              /* @__PURE__ */ jsx("strong", { children: "não" }),
              " é devido. É necessário comprovar o trabalho efetivo."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-md", children: "Hora Extra Noturna" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Cálculo cumulativo: aplica-se o adicional de hora extra (mínimo 50%) sobre o valor da hora já acrescida de 20%." }),
            /* @__PURE__ */ jsx("div", { className: "text-xs bg-black/20 p-2 rounded text-blue-300 font-mono", children: "HEN = (Hora × 1,20) × 1,50" }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs", children: /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "text-blue-400 hover:underline", children: "Simular na Calculadora de Horas Extras" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: NIGHT_SHIFT_FAQS,
          title: "Perguntas Frequentes sobre Adicional Noturno",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  NightShiftPage
};
//# sourceMappingURL=NightShiftPage-Co2COCnz.js.map
