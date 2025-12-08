import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Clock, Calculator, RotateCcw, Info, Table, AlertCircle, FileSpreadsheet } from "lucide-react";
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
const HOURS_FAQS = [
  {
    question: "Quantas horas tem um mês de trabalho?",
    answer: "Para a maioria dos trabalhadores CLT (44h semanais), o divisor padrão é 220 horas mensais. Porém, para cálculos exatos de produtividade em meses com muitos feriados, recomenda-se usar a calculadora de dias úteis para obter o número real de horas disponíveis naquele mês específico."
  },
  {
    question: "O que acontece com os minutos quebrados na folha de ponto?",
    answer: "Pela Lei (Art. 58 da CLT), variações de até 5 minutos (para mais ou para menos) no registro de ponto não são computadas como atraso ou hora extra, desde que o total diário não exceda 10 minutos. Acima disso, conta-se a totalidade do tempo."
  },
  {
    question: "Como calcular horas noturnas?",
    answer: "A hora noturna (trabalho entre 22h e 05h) é reduzida por lei. Ela dura 52 minutos e 30 segundos, mas conta como se fosse 1 hora cheia para fins de pagamento. Ou seja, 7 horas no relógio durante a noite equivalem a 8 horas na folha de pagamento."
  },
  {
    question: "Como calcular o valor da minha hora de trabalho?",
    answer: "Basta dividir seu salário base pelo divisor mensal da sua jornada (geralmente 220). Exemplo: Salário de R$ 3.000,00 ÷ 220 = R$ 13,63 por hora. Saber isso é essencial antes de calcular uma rescisão ou negociar aumentos."
  }
];
function HoursCalculatorPage() {
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("00:00");
  const [decimalResult, setDecimalResult] = useState("0.00");
  const calculateTime = () => {
    if (!time1 || !time2) {
      if (!time1 && !time2) {
        setResult("00:00");
        setDecimalResult("0.00");
      }
      return;
    }
    const parseTime = (t) => {
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
  };
  useEffect(() => {
    calculateTime();
  }, [time1, time2, operation]);
  const handleTimeInput = (value, setter) => {
    const cleanVal = value.replace(/[^\d:]/g, "");
    if (cleanVal.length === 2 && !cleanVal.includes(":") && value.length > (setter === setTime1 ? time1.length : time2.length)) {
      setter(cleanVal + ":");
    } else {
      setter(cleanVal);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Horas: Somar, Subtrair e Converter",
    "description": "Ferramenta gratuita para calcular horas trabalhadas, somar banco de horas e converter minutos para decimal. Aprenda também a fazer o cálculo no Excel.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "featureList": [
      "Soma e Subtração de Horas (Banco de Horas)",
      "Conversão Automática para Hora Decimal (Centesimal)",
      "Cálculo de Horas Negativas e Positivas",
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
        title: "Calculadora de Horas: Somar, Subtrair e Converter (Online e Grátis)",
        description: "Ferramenta gratuita para calcular horas trabalhadas, somar banco de horas e converter minutos para decimal. Aprenda também a fazer o cálculo no Excel.",
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
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de Horas: ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "Somar, Subtrair e Converter" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mt-2 max-w-2xl mx-auto", children: "Calcule seu banco de horas, some jornadas e converta minutos para horas decimais automaticamente." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
              "Calcular Horas"
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  setTime1("");
                  setTime2("");
                  setResult("00:00");
                  setDecimalResult("0.00");
                },
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
              /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500 ml-1", children: "Horário 1" }),
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
              /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500 ml-1", children: "Horário 2" }),
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
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 text-center relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Formato Relógio" }),
              /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-white font-mono tracking-wider", children: result }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-400/60 mt-2 font-medium", children: "Horas : Minutos" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 text-center relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Formato Decimal (Centesimal)" }),
              /* @__PURE__ */ jsxs("div", { className: "text-4xl font-bold text-white font-mono tracking-wider", children: [
                decimalResult,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-lg text-gray-500 font-sans", children: "h" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-emerald-400/60 mt-2 font-medium", children: "Ideal para Folha de Pagamento" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl", children: [
            /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-200/80 leading-relaxed", children: [
              /* @__PURE__ */ jsx("strong", { children: "Dica:" }),
              " Para calcular o ",
              /* @__PURE__ */ jsx("strong", { children: "valor" }),
              " dessas horas no seu salário, multiplique o resultado decimal (",
              decimalResult,
              "h) pelo valor da sua hora de trabalho."
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Table, { className: "w-6 h-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white leading-tight mt-1", children: "Tabela de Conversão Rápida" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-6", children: "Minutos do relógio (Sexagesimal) vs Hora Decimal (Centesimal). Use esta tabela para conferir seu holerite." }),
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-white/5", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Minutos (Relógio)" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-right", children: "Decimal (Folha)" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-white/5 text-gray-400", children: [
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "15 minutos" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-emerald-400", children: "0,25" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "20 minutos" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-emerald-400", children: "0,33" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "30 minutos" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-emerald-400", children: "0,50" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "45 minutos" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-emerald-400", children: "0,75" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "50 minutos" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-right font-mono text-emerald-400", children: "0,83" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t border-white/5", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-white font-medium mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Calculator, { className: "w-4 h-4 text-gray-400" }),
              "Cálculo Manual"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
              "Divida os minutos por 60.",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "italic text-gray-500", children: "Ex: 48 min ÷ 60 = 0,8 (Logo, 8h48 = 8,8h)" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 text-center mb-12", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Calcular horas exige converter o sistema sexagesimal (relógio) para centesimal (decimal) antes de realizar qualquer operação matemática." }),
          " Tentar somar minutos como se fossem números inteiros é a causa número um de erros em folhas de pagamento."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Nossa ferramenta resolve esse problema automaticamente. Seja para conferir seu holerite ou para empreendedores que precisam calcular o tempo de produção para atingir o ",
          /* @__PURE__ */ jsx(Link, { to: "/calculadoras/ponto-de-equilibrio", className: "text-blue-400 hover:text-blue-300 underline decoration-blue-400/30", children: "ponto de equilíbrio" }),
          ", a precisão aqui é garantida."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como calcular horas trabalhadas: Passo a Passo" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400 leading-relaxed", children: [
          /* @__PURE__ */ jsx("p", { children: "O cálculo manual consiste na subtração do horário de saída pelo de entrada, descontando o intervalo. Para realizar essa conta sem erros, siga este roteiro de 4 passos:" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-4 gap-4", children: [
            { step: 1, title: "Converta tudo", text: "Trabalhar com uma única unidade (minutos) evita confusão." },
            { step: 2, title: "Subtraia", text: "Entrada menos Saída. O resultado é o total bruto em minutos." },
            { step: 3, title: "Desconte", text: "Subtraia o tempo de almoço para obter a jornada líquida." },
            { step: 4, title: "Reconverta", text: "Divida o resultado final por 60 para ter as horas." }
          ].map((item) => /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute -top-4 -right-4 text-6xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors", children: item.step }),
            /* @__PURE__ */ jsx("h3", { className: "text-white font-bold mb-2 relative z-10", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 relative z-10", children: item.text })
          ] }, item.step)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-blue-500/5 rounded-2xl p-6 border border-blue-500/10", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Exemplo Prático (Jornada Diária)" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-4", children: "Dia comum: Entrada 08:00, Saída 17:48 com 1h de almoço." }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Etapa" }),
                /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Cálculo" }),
                /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Resultado Parcial" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Manhã" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "12:00 - 08:00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "4 horas" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Tarde" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "17:48 - 13:00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "4 horas e 48 minutos" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3 font-medium text-white", children: "Soma" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "4h + 4h + 48min" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-blue-400", children: "8 horas e 48 minutos" })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-yellow-200/80 leading-relaxed", children: [
              /* @__PURE__ */ jsx("strong", { children: "Atenção:" }),
              " Erros no registro de ponto geram descontos indevidos que têm ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-yellow-400 hover:text-yellow-300 underline decoration-yellow-400/30", children: "impacto no salário líquido" }),
              ". Monitore sempre se sua jornada cumpre as 44 horas semanais."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-emerald-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-6 h-6 text-emerald-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como calcular horas no Excel (Dica Avançada)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4 leading-relaxed", children: 'Se você controla seu banco de horas no Excel, já deve ter notado que a planilha "zera" a contagem quando a soma passa de 24 horas. Isso acontece porque o formato padrão entende que mudou o dia.' }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6 leading-relaxed", children: "Para somar horas acumuladas corretamente no Excel, siga este ajuste técnico:" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
              "Clique com o botão direito na célula ou coluna de totais.",
              "Selecione 'Formatar Células'.",
              "Vá na aba 'Número' e escolha a categoria 'Personalizado'.",
              "No campo 'Tipo', digite exatamente: [h]:mm"
            ].map((step, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-gray-300", children: [
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-emerald-500 border border-white/10", children: i + 1 }),
              /* @__PURE__ */ jsx("span", { className: "mt-1", children: step })
            ] }, i)) })
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
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500", children: "(O Excel zerou 26 horas)" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-emerald-300 mb-1", children: "Com formatação ([h]:mm)" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl font-mono text-emerald-400", children: "26:00" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500", children: "(Contagem correta de horas acumuladas)" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: HOURS_FAQS,
          title: "Perguntas Frequentes sobre Cálculo de Horas (FAQ)",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Seu saldo de horas foi positivo?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4 max-w-2xl mx-auto", children: "Não deixe esse dinheiro na mesa. Use agora nossa Calculadora de Horas Extras para saber exatamente quanto você deve receber a mais no final do mês." }),
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
//# sourceMappingURL=HoursCalculatorPage-Cjwpjk51.js.map
