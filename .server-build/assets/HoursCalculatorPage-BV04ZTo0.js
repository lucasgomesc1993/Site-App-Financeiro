import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Clock, Calculator, RotateCcw, Moon, Sun, Info, Table, FileSpreadsheet, AlertCircle, HelpCircle } from "lucide-react";
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
const HOURS_FAQS = [
  {
    question: "Como transformar minutos em hora decimal na calculadora?",
    answer: "Para transformar minutos em hora decimal (centesimal), divida os minutos por 60. Exemplo: 30 minutos divididos por 60 é igual a 0,50. Se tiver 1h30min, o valor decimal é 1,5. Nunca use a vírgula apenas para separar os minutos (1,30 está incorreto)."
  },
  {
    question: "Qual a tolerância de atraso permitida pela CLT em 2025?",
    answer: "A tolerância é de 5 minutos na entrada e 5 minutos na saída, respeitando o limite máximo de 10 minutos diários (Art. 58, § 1º da CLT). Se passar desse limite (ex: 11 minutos), todo o tempo deve ser computado como atraso ou hora extra, e não apenas o excedente."
  },
  {
    question: "Qual o limite máximo de horas extras por dia?",
    answer: "Pela regra geral do Artigo 59 da CLT, o limite é de 2 horas suplementares por dia. A jornada total (normal + extra) não deve ultrapassar 10 horas diárias. Exceções a esse limite só são permitidas em casos de necessidade imperiosa ou força maior (serviços inadiáveis), devidamente justificados, podendo chegar a 12 horas totais em situações críticas."
  },
  {
    question: "Como funciona o cálculo da hora noturna reduzida?",
    answer: "A hora noturna (22h às 05h) tem apenas 52 minutos e 30 segundos. Na prática, para cada 52,5 minutos trabalhados no relógio, a empresa paga o equivalente a 60 minutos. Multiplique as horas relógio por 1,1428 para encontrar a quantidade de horas a pagar."
  },
  {
    question: "O almoço conta como hora trabalhada?",
    answer: "Não. O intervalo intrajornada (almoço) não é computado na duração do trabalho, conforme Art. 71 da CLT. Se você trabalha das 08h às 17h com 1h de almoço, sua jornada computada é de 8 horas, não 9. Utilize nossa ferramenta de dias úteis para planejar escalas mensais corretamente."
  }
];
function HoursCalculatorPage() {
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("00:00");
  const [decimalResult, setDecimalResult] = useState("0,00");
  const [nightResult, setNightResult] = useState("00:00");
  const [isNightShift, setIsNightShift] = useState(false);
  useEffect(() => {
    const parseTime = (t) => {
      if (!t) return { h: 0, m: 0 };
      const parts = t.split(":");
      let h = 0, m = 0;
      if (parts.length === 1) {
        h = parseInt(parts[0]) || 0;
      } else {
        h = parseInt(parts[0]) || 0;
        m = parseInt(parts[1]) || 0;
      }
      return { h, m };
    };
    const t1 = parseTime(time1);
    const t2 = parseTime(time2);
    const totalMinutes1 = t1.h * 60 + t1.m;
    const totalMinutes2 = t2.h * 60 + t2.m;
    let finalMinutes;
    if (operation === "add") {
      finalMinutes = totalMinutes1 + totalMinutes2;
    } else {
      finalMinutes = totalMinutes1 - totalMinutes2;
    }
    const isNegative = finalMinutes < 0;
    const absMinutes = Math.abs(finalMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;
    const formattedResult = `${isNegative ? "-" : ""}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    setResult(formattedResult);
    const decimalHours = absMinutes / 60;
    setDecimalResult(`${isNegative ? "-" : ""}${decimalHours.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    const nightFactor = 60 / 52.5;
    const nightMinutesTotal = absMinutes * nightFactor;
    const nHours = Math.floor(nightMinutesTotal / 60);
    const nMinutes = Math.round(nightMinutesTotal % 60);
    const formattedNight = `${isNegative ? "-" : ""}${String(nHours).padStart(2, "0")}:${String(nMinutes).padStart(2, "0")}`;
    setNightResult(formattedNight);
  }, [time1, time2, operation]);
  const handleTimeInput = (value, setter) => {
    const cleanVal = value.replace(/[^\d:]/g, "");
    if (cleanVal.length === 2 && !cleanVal.includes(":") && value.length > (setter === setTime1 ? time1.length : time2.length)) {
      setter(cleanVal + ":");
    } else {
      setter(cleanVal);
    }
  };
  const resetCalculator = () => {
    setTime1("");
    setTime2("");
    setResult("00:00");
    setDecimalResult("0,00");
    setNightResult("00:00");
    setIsNightShift(false);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Horas Trabalhadas e Horas Centesimais (2025)",
    "description": "Converta horas em centesimais para folha 2025. Calcule extras e noturna (52min30s) com precisão. Regras CLT, tolerância de 5min e tabela oficial.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "featureList": [
      "Soma e Subtração de Horas (Banco de Horas)",
      "Conversão Automática para Hora Decimal (Centesimal)",
      "Cálculo de Hora Noturna Reduzida (Fator 1.1428)",
      "Tabela de Equivalência Minutos vs Decimal"
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
        title: "Calculadora de Horas Trabalhadas e Centesimais (Online 2025)",
        description: "Converta horas em centesimais para folha 2025. Calcule extras e noturna (52min30s) com precisão. Regras CLT, tolerância de 5min e tabela oficial.",
        canonical: "/calculadoras/horas"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": HOURS_FAQS.map((faq) => ({
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
          { label: "Calculadora de Horas", href: "/calculadoras/horas" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Departamento Pessoal 2025" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de Horas Trabalhadas e ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "Horas Centesimais (2025)" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mt-2 max-w-2xl mx-auto", children: "Converta horas em decimais, calcule banco de horas e aplique a redução de hora noturna (52m30s) automaticamente. Tudo atualizado para 2025." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
              "Calcular Horas"
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: resetCalculator,
                className: "text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors",
                children: [
                  /* @__PURE__ */ jsx(RotateCcw, { className: "w-3 h-3" }),
                  " Limpar"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-400 ml-1", children: "Horário 1" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: time1,
                  onChange: (e) => handleTimeInput(e.target.value, setTime1),
                  placeholder: "08:00",
                  maxLength: 5,
                  className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-2xl font-mono text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 pt-6", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setOperation("add"),
                  className: `p-2 rounded-lg transition-all ${operation === "add" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-gray-500 hover:bg-white/10"}`,
                  "aria-label": "Somar",
                  children: "+"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setOperation("subtract"),
                  className: `p-2 rounded-lg transition-all ${operation === "subtract" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-gray-500 hover:bg-white/10"}`,
                  "aria-label": "Subtrair",
                  children: "-"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-400 ml-1", children: "Horário 2" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: time2,
                  onChange: (e) => handleTimeInput(e.target.value, setTime2),
                  placeholder: "01:00",
                  maxLength: 5,
                  className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-2xl font-mono text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-6 flex items-center justify-center", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsNightShift(!isNightShift),
              className: `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isNightShift ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"}`,
              children: [
                isNightShift ? /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4" }),
                "Ver Hora Noturna (Reduzida)"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 text-center relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: isNightShift ? "Hora Noturna (Ficta)" : "Formato Relógio" }),
              /* @__PURE__ */ jsx("div", { className: `text-4xl font-bold text-white font-mono tracking-wider ${isNightShift ? "text-indigo-400" : ""}`, children: isNightShift ? nightResult : result }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-400 mt-2 font-medium", children: isNightShift ? "Equivalente a trabalhar no relógio" : "Horas : Minutos" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 text-center relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Formato Decimal (Centesimal)" }),
              /* @__PURE__ */ jsxs("div", { className: "text-4xl font-bold text-white font-mono tracking-wider", children: [
                decimalResult,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-lg text-gray-500 font-sans", children: "h" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-emerald-400 mt-2 font-medium", children: "Multiplique este valor pelo salário-hora" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl", children: [
            /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-200/80 leading-relaxed", children: [
              /* @__PURE__ */ jsx("strong", { children: "Dica:" }),
              " Para calcular o ",
              /* @__PURE__ */ jsx("strong", { children: "valor" }),
              " em dinheiro, sempre use o resultado decimal (",
              decimalResult,
              "h). Multiplicar minutos (ex: 0,30) pelo salário gera prejuízo."
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 h-full", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Table, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white leading-tight mt-1", children: "Tabela de Conversão: Minutos para Hora Centesimal (Folha)" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-6", children: "Minutos do relógio (Sexagesimal) vs Hora Decimal (Centesimal)." }),
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-white/5", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Minutos" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-right", children: "Decimal" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-right sm:table-cell hidden", children: "Lógica" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-white/5 text-gray-400", children: [
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "00:06" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-emerald-400", children: "0,10" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right text-xs sm:table-cell hidden", children: "6 dividido por 60" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "00:12" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-emerald-400", children: "0,20" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right text-xs sm:table-cell hidden", children: "12 dividido por 60" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "00:15" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-emerald-400", children: "0,25" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right text-xs sm:table-cell hidden", children: "Um quarto de hora" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "00:30" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-emerald-400", children: "0,50" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right text-xs sm:table-cell hidden", children: "Meia hora exata" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "00:45" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-emerald-400", children: "0,75" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right text-xs sm:table-cell hidden", children: "Três quartos de hora" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "00:52:30" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-indigo-400", children: "0,875" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right text-xs sm:table-cell hidden", children: "1 hora noturna ficta" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "01:00" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-emerald-400", children: "1,00" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right text-xs sm:table-cell hidden", children: "Hora cheia" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t border-white/5 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl", children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs mb-1", children: "Fonte Oficial:" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300 leading-relaxed", children: [
                "Base legal para jornada de trabalho e computação de horas conforme ",
                /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:text-blue-300 underline", children: "Consolidação das Leis do Trabalho - CLT (Decreto-Lei nº 5.452/1943)" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-white font-medium mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-4 h-4 text-gray-400" }),
                "Fórmula de Conversão"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 font-mono bg-black/30 p-2 rounded-lg border border-white/5 text-center", children: "Hora Centesimal = Horas Inteiras + (Minutos ÷ 60)" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-6", children: "Resumo Rápido (Dados Oficiais 2025)" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-gray-400", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Jornada Padrão:" }),
              " Limite de 8 horas diárias e 44 semanais (Art. 58 CLT)."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Tolerância de Ponto:" }),
              " Variações de até 5 minutos (máximo 10 min diários) não são computadas."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Hora Noturna:" }),
              " Das 22h às 05h, a hora equivale a ",
              /* @__PURE__ */ jsx("strong", { children: "52 minutos e 30 segundos" }),
              " (Fator 1,1428)."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Conversão Centesimal:" }),
              " Essencial para multiplicar o tempo pelo valor do salário (ex: 30 minutos = 0,50 hora)."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Atualização:" }),
              " Regras vigentes para fechamento de folha em ",
              /* @__PURE__ */ jsx("strong", { children: "Dezembro de 2025" }),
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-blue-200 font-semibold mb-2", children: "O que você precisa saber em 30 segundos" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-100/80 leading-relaxed mb-4", children: [
            'Esta ferramenta resolve o problema mais comum no Departamento Pessoal e na vida do trabalhador: a incompatibilidade entre o relógio (base 60) e a calculadora financeira (base 100). Se você multiplicar "1 hora e 30 minutos" por R$ 50,00 usando "1,30", perderá dinheiro. O correto é ',
            /* @__PURE__ */ jsx("strong", { children: "1,50" }),
            "."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-100/80 leading-relaxed", children: "Nossa calculadora converte automaticamente o formato de hora relógio (HH:MM) para hora centesimal, aplica as reduções de hora noturna exigidas por lei e considera as tolerâncias de ponto da CLT. Ideal para conferir o holerite, calcular banco de horas ou preparar a folha de pagamento com segurança jurídica." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-4", children: "O Erro Invisível: Sexagesimal vs. Centesimal" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4 text-sm leading-relaxed", children: [
            "A maioria dos erros em pagamentos e ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-funcionario", className: "text-blue-400 hover:text-blue-300 underline", children: "custo de funcionário" }),
            " nasce de uma falha matemática simples. O tempo é medido em ",
            /* @__PURE__ */ jsx("strong", { children: "base sexagesimal" }),
            " (1 hora = 60 minutos), enquanto o dinheiro opera em ",
            /* @__PURE__ */ jsx("strong", { children: "base centesimal" }),
            " (1 Real = 100 centavos)."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-red-500/10 border border-red-500/20 p-4 rounded-xl", children: [
            /* @__PURE__ */ jsx("strong", { className: "text-red-300 block mb-2", children: "O Exemplo do Prejuízo:" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 mb-2", children: "Funcionário ganha R$ 100/h e faz 1h30min extra." }),
            /* @__PURE__ */ jsxs("ul", { className: "text-sm space-y-1", children: [
              /* @__PURE__ */ jsx("li", { className: "text-red-400", children: "❌ Cálculo Errado (Intuitivo): 1,30 x 100 = R$ 130,00" }),
              /* @__PURE__ */ jsx("li", { className: "text-emerald-400", children: "✅ Cálculo Correto (Centesimal): 1,50 x 100 = R$ 150,00" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-2", children: "Diferença de R$ 20,00 (mais de 13% do valor devido) perdida." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mt-4 text-sm leading-relaxed", children: [
            "Ao calcular ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "text-blue-400 hover:text-blue-300 underline", children: "horas extras" }),
            ", sempre converta os minutos para decimais antes de multiplicar pelo valor monetário."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-4", children: 'A "Mágica" da Hora Noturna (Fator 1.1428)' }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4 text-sm leading-relaxed", children: [
            "Se o trabalho ocorre entre 22h e 05h (trabalhador urbano), a hora não tem 60 minutos, mas sim ",
            /* @__PURE__ */ jsx("strong", { children: "52 minutos e 30 segundos" }),
            " (Art. 73 da CLT)."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4 text-sm leading-relaxed", children: "Para calcular isso sem dor de cabeça, aplicamos um fator de redução. Você não precisa somar minuto a minuto, basta multiplicar o tempo de relógio por 1,142857." }),
          /* @__PURE__ */ jsxs("div", { className: "bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl", children: [
            /* @__PURE__ */ jsx("strong", { className: "text-indigo-300 block mb-2", children: "Cenário:" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 mb-2", children: "Trabalho das 22:00 às 05:00 (7 horas no relógio)." }),
            /* @__PURE__ */ jsx("ul", { className: "text-sm space-y-1", children: /* @__PURE__ */ jsx("li", { className: "text-indigo-300", children: "Cálculo: 7 x 1,142857 = 8 horas pagas" }) }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-2", children: [
              "O trabalhador recebe por 8 horas, além do percentual mínimo de 20% do ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/adicional-noturno", className: "text-indigo-400 hover:text-indigo-300 underline", children: "adicional noturno" }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-6", children: "Como Calcular (Metodologia e Exemplos Práticos)" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "1. Fórmula de Conversão Manual" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Se você precisa fazer a conta na mão ou auditar um sistema, use a seguinte lógica para transformar minutos em horas decimais:" }),
          /* @__PURE__ */ jsx("div", { className: "bg-black/30 p-4 rounded-xl border border-white/10 text-center font-mono text-emerald-400", children: "Hora Centesimal = Horas Inteiras + (Minutos ÷ 60)" })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "2. Exemplos Práticos de Cálculo" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-white font-semibold mb-2", children: "Exemplo A: Salário Alto (R$ 8.000,00)" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-2", children: "Gerente (R$ 36,36/h) trabalhou 8 horas e 48 minutos." }),
            /* @__PURE__ */ jsxs("ul", { className: "text-sm space-y-1 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "1. Conversão:" }),
                " 48 min ÷ 60 = 0,8. Tempo: 8,8h."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "2. Valor Hora (100%):" }),
                " R$ 36,36 x 2 = R$ 72,72."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "3. Cálculo:" }),
                " 8,8 x 72,72 = ",
                /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-bold", children: "R$ 639,93" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-red-400 mt-2", children: "Prejuízo se errar (usar 8,48): R$ 23,27 a menos." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-white font-semibold mb-2", children: "Exemplo B: Salário Mínimo 2025 (R$ 1.518,00)" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-2", children: "Funcionário (R$ 6,90/h) fez 45 minutos extras." }),
            /* @__PURE__ */ jsxs("ul", { className: "text-sm space-y-1 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "1. Conversão:" }),
                " 45 min ÷ 60 = 0,75h."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "2. Valor Hora (50%):" }),
                " R$ 6,90 + 50% = R$ 10,35."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "3. Cálculo:" }),
                " 0,75 x 10,35 = ",
                /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-bold", children: "R$ 7,76" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-red-400 mt-2", children: "Prejuízo se errar (usar 0,45): R$ 3,11 a menos." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-6 h-6 text-emerald-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Solução Técnica: Excel e o Sistema de Datas 1904" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4 text-sm", children: [
              "Muitos profissionais de RH tentam criar suas próprias planilhas e esbarram em um erro clássico: o Excel mostra ",
              /* @__PURE__ */ jsx("code", { className: "text-red-400", children: "################" }),
              " quando o saldo de horas é negativo."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4 text-sm", children: "Isso acontece porque o Excel padrão usa o sistema de datas de 1900, que não reconhece tempo negativo." }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-white font-medium text-sm", children: "Como resolver (Hack para Usuários Avançados):" }),
              /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "Vá em ",
                  /* @__PURE__ */ jsxs("strong", { children: [
                    "Arquivo `",
                    ">",
                    "` Opções `",
                    ">",
                    "` Avançado"
                  ] }),
                  "."
                ] }),
                /* @__PURE__ */ jsx("li", { children: 'Role até a seção "Ao calcular esta pasta de trabalho".' }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "Marque a caixa ",
                  /* @__PURE__ */ jsx("strong", { children: '"Usar sistema de data 1904"' }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mt-4", children: [
                "Isso permite que você calcule débitos de ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas", className: "text-emerald-400 hover:text-emerald-300 underline", children: "banco de horas" }),
                " sem que a planilha quebre."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-black/40 p-6 rounded-2xl border border-white/10", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4 text-emerald-400 text-sm font-medium", children: [
              /* @__PURE__ */ jsx(Info, { className: "w-4 h-4" }),
              "O Segredo dos Colchetes"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-3 bg-red-500/10 border border-red-500/20 rounded-lg", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-red-300 mb-1", children: "Sem formatação (h:mm)" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl font-mono text-red-400", children: "02:00" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "(O Excel zerou 26 horas)" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-emerald-300 mb-1", children: "Com formatação ([h]:mm)" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl font-mono text-emerald-400", children: "26:00" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "(Contagem correta de horas acumuladas)" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 mb-24", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-6", children: "Casos Especiais e Regras de Escala" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-white mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-blue-500" }),
              "Escala 12x36 e Feriados"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm leading-relaxed", children: [
              "Na escala 12x36, generalizada pela Reforma Trabalhista, o pagamento mensal pactuado já engloba o descanso semanal remunerado (DSR) e os feriados trabalhados. Por isso, ao trabalhar em um feriado, você não recebe automaticamente em dobro, pois a lei considera que as 36 horas de folga seguintes já compensam esse dia. A única exceção ocorre se houver uma Convenção Coletiva da categoria estipulando explicitamente o pagamento adicional. Consulte sempre a ",
              /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13467.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:text-blue-300 underline", children: "Lei nº 13.467/2017" }),
              " e o acordo do seu sindicato."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-white mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-indigo-500" }),
              "Reflexos na Rescisão"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm leading-relaxed", children: [
              "No momento da ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/rescisao", className: "text-blue-400 hover:text-blue-300 underline", children: "rescisão" }),
              ", o cálculo das médias de horas extras deve seguir a ",
              /* @__PURE__ */ jsx("a", { href: "https://www.tst.jus.br/sumulas", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:text-blue-300 underline", children: "Súmula 347 do TST" }),
              ". Isso significa que não se deve fazer a média dos valores em reais pagos nos meses anteriores, mas sim a média da ",
              /* @__PURE__ */ jsx("strong", { children: "quantidade física de horas" }),
              " efetivamente prestadas. Essa média é então multiplicada pelo valor do salário ",
              /* @__PURE__ */ jsx("strong", { children: "atual" }),
              " na data da saída. Isso garante que o trabalhador não perca poder de compra e receba os reflexos corretos sobre Aviso Prévio, 13º Salário, Férias e FGTS."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-white mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-emerald-500" }),
              "Intervalo Intrajornada (Almoço)"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: "Se o empregador não concede a 1 hora completa de almoço (para jornadas acima de 6h), ele deve pagar o tempo suprimido como hora extra (com adicional de 50%), e não apenas como hora normal. Nossa calculadora considera apenas o tempo de trabalho efetivo, então subtraia o intervalo real antes de inserir os dados se o sistema de ponto não for automatizado." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: HOURS_FAQS,
          title: "Perguntas Frequentes (FAQ)",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Seu saldo de horas foi positivo?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4 max-w-2xl mx-auto", children: "Não deixe esse dinheiro na mesa. Use agora nossa Calculadora de Horas Extras para saber exatamente quanto você deve receber a mais." }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/calculadoras/horas-extras",
            className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all shadow-lg shadow-blue-500/20 transform hover:-translate-y-1",
            children: "Calcular Horas Extras"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  HoursCalculatorPage
};
//# sourceMappingURL=HoursCalculatorPage-BV04ZTo0.js.map
