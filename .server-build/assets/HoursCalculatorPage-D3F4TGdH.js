import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Clock, Calculator, RotateCcw, Moon, Sun, Info, FileText, CheckCircle, AlertCircle } from "lucide-react";
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
    question: "Como a Calculadora de Horas Trabalhadas converte minutos?",
    answer: "Para converter minutos do relógio para decimais na folha de pagamento, você deve dividir os minutos exatos por 60. Por exemplo, 15 minutos divididos por 60 resultam em 0,25. Isso é essencial porque 1 hora e 30 minutos equivale financeiramente a 1,5 horas (uma hora e meia), e não 1,30, garantindo o pagamento justo."
  },
  {
    question: "O que é a tolerância de 5 ou 10 minutos no ponto?",
    answer: "A regra de tolerância, baseada no Artigo 58 da CLT, estabelece que variações de registro de ponto de até 5 minutos (para mais ou menos) não são computadas. Contudo, se a soma diária dessas variações exceder 10 minutos, todo o tempo excedente será considerado integralmente como hora extra ou atraso a descontar."
  },
  {
    question: "A Calculadora de Horas Trabalhadas considera a hora noturna?",
    answer: "Sim, para fins de pagamento salarial correto. A legislação brasileira define que a hora noturna (trabalhada entre 22h e 05h) tem a duração ficta de 52 minutos e 30 segundos. Na prática, isso significa que a cada 52m 30s de relógio, o trabalhador deve receber o valor equivalente a uma hora cheia (60 minutos) com adicional."
  },
  {
    question: "Como calcular horas trabalhadas com intervalo?",
    answer: "O cálculo deve subtrair o período de descanso da jornada total para encontrar o tempo efetivo. A fórmula correta é: (Horário de Saída menos Horário de Entrada) menos o Tempo de Intervalo. Se um funcionário entra às 8h, sai às 17h e tem 1h de almoço, o cálculo é (17 - 8) - 1 = 8 horas trabalhadas."
  },
  {
    question: "Quantos dias úteis usar para cálculo de DSR em 2025?",
    answer: "Embora 2025 tenha aproximadamente 252 dias úteis nacionais (considerando a Lei 14.759), o DSR sobre horas extras deve ser calculado usando apenas os dias úteis do mês específico da competência (o mês do pagamento). Domingos e feriados desse mês específico devem ser contados separadamente para aplicar a fórmula correta do reflexo."
  },
  {
    question: "O almoço conta como hora trabalhada?",
    answer: "Não. De acordo com o Artigo 71 da CLT, o intervalo destinado a repouso e alimentação (intrajornada) não conta como tempo de serviço efetivo e não deve ser remunerado na jornada padrão. Ele deve ser deduzido do total de horas que o funcionário permaneceu nas dependências da empresa. Nossa Calculadora de Horas Trabalhadas já prevê essa dedução."
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
    "name": "Calculadora de Horas Trabalhadas: Online e Grátis 2025",
    "description": "Calculadora de Horas Trabalhadas online e grátis. Converta minutos em decimais, evite erros na folha e siga a Portaria 671. Atualizada para 2025.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "featureList": [
      "Soma e Subtração de Horas (Banco de Horas)",
      "Conversão Automática para Hora Decimal (Centesimal)",
      "Cálculo de Hora Noturna Reduzida (Fator 1.1428)",
      "Check de Tolerância (Art. 58 CLT)"
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
        title: "Calculadora de Horas Trabalhadas: Online e Grátis 2025",
        description: "Calculadora de Horas Trabalhadas online e grátis. Converta minutos em decimais, evite erros na folha e siga a Portaria 671. Atualizada para 2025.",
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
            "Calculadora de Horas Trabalhadas ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "Online [Grátis e Atualizada 2025]" })
          ] })
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
                  inputMode: "numeric",
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
                  inputMode: "numeric",
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
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-500" }),
            "Resumo Rápido (Dados Oficiais 2025)"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-400 text-sm", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Base Legal:" }),
                " Cálculos ajustados à ",
                /* @__PURE__ */ jsx("strong", { children: "Portaria 671" }),
                " e Art. 58 da CLT."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Tolerância:" }),
                " Atrasos ou extras de até ",
                /* @__PURE__ */ jsx("strong", { children: "5 minutos" }),
                " (limite de 10 min diários) não são descontados nem computados."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Hora Noturna:" }),
                " Aplicação do fator de redução onde ",
                /* @__PURE__ */ jsx("strong", { children: "52m 30s" }),
                " equivalem a 1 hora paga (fator 1,1428)."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Cenário 2025:" }),
                " O ano possui aproximadamente ",
                /* @__PURE__ */ jsx("strong", { children: "252 dias úteis" }),
                " (considerando feriados nacionais), mas o DSR deve ser calculado sobre os dias úteis ",
                /* @__PURE__ */ jsx("strong", { children: "do mês da competência" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-yellow-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Erro Crítico:" }),
                " 17h30 (relógio) não é 17,30 (decimal). A conversão correta é ",
                /* @__PURE__ */ jsx("strong", { children: "17,50" }),
                "."
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
        /* @__PURE__ */ jsxs("p", { className: "text-gray-300 leading-relaxed", children: [
          "A ",
          /* @__PURE__ */ jsx("strong", { children: "Calculadora de Horas Trabalhadas" }),
          " resolve o principal gargalo financeiro do Departamento Pessoal: a confusão entre o tempo do relógio (base 60) e o dinheiro (base 10 ou centesimal). Se você somar horas direto na calculadora comum, o resultado estará errado. Aqui, convertemos automaticamente os minutos para o sistema decimal, aplicamos as regras de tolerância da CLT e garantimos que o pagamento final seja auditável e seguro juridicamente. É ideal para profissionais de RH, gestores e colaboradores que precisam conferir o ponto de dezembro de 2025 sem margem para erros."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Tabela de Conversão Definitiva: Minutos para Hora Decimal" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: 'Use esta tabela para converter minutos do relógio em frações decimais para a folha de pagamento. Isso evita o "débito técnico de conteúdo" comum em planilhas manuais.' }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Minutos (Relógio)" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Hora Decimal" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Minutos (Relógio)" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Hora Decimal" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Minutos (Relógio)" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Hora Decimal" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [...Array(20)].map((_, i) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxs("strong", { children: [
              String(i + 1).padStart(2, "0"),
              " min"
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "p-2 text-emerald-400 font-mono", children: ((i + 1) / 60).toFixed(2).replace(".", ",") }),
            /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxs("strong", { children: [
              String(i + 21).padStart(2, "0"),
              " min"
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "p-2 text-emerald-400 font-mono", children: ((i + 21) / 60).toFixed(2).replace(".", ",") }),
            /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxs("strong", { children: [
              String(i + 41).padStart(2, "0"),
              " min"
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "p-2 text-emerald-400 font-mono", children: ((i + 41) / 60).toFixed(2).replace(".", ",") })
          ] }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 p-4 bg-white/5 rounded-xl border border-white/5", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300", children: [
          /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
          " Tabela calculada com base na lógica matemática centesimal necessária para cumprimento da ",
          /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "CLT - Consolidação das Leis do Trabalho" }),
          "."
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "A Ciência da Precisão: Erros Comuns e Metodologia" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "O Paradoxo Sexagesimal-Centesimal" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4 text-sm leading-relaxed", children: "O erro mais caro no Departamento Pessoal em 2025 ainda é a confusão de sistemas numéricos. O relógio segue o sistema sexagesimal (base 60), enquanto o dinheiro e a folha de pagamento seguem o sistema centesimal (base 10)." }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm leading-relaxed", children: [
            "Muitos gestores erram ao assumir que uma jornada encerrada às 17h30 equivale a 17,30 para fins de multiplicação pelo valor da hora. Se você fizer isso, estará roubando 20% dessa meia hora do funcionário ou pagando a menos. A ",
            /* @__PURE__ */ jsx("strong", { children: "Calculadora de Horas Trabalhadas" }),
            " ajusta essa distorção automaticamente."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Como Calcular (Passo a Passo Matemático)" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm mb-4", children: "A conversão correta exige que separemos as horas inteiras dos minutos. A fórmula que aplicamos é a seguinte:" }),
          /* @__PURE__ */ jsx("div", { className: "bg-black/30 p-3 rounded-lg border border-white/10 text-center font-mono text-emerald-400 text-sm mb-4", children: "Hora Decimal = Horas Inteiras + (Minutos ÷ 60)" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-3 bg-blue-500/10 rounded-lg border border-blue-500/20", children: [
              /* @__PURE__ */ jsx("p", { className: "text-white text-xs font-bold mb-1", children: "Exemplo 1 (Meia Hora):" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-xs", children: "17 horas e 30 minutos." }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-xs mt-1", children: "1. Mantemos o 17." }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-xs", children: "2. Dividimos 30 por 60 = 0,50." }),
              /* @__PURE__ */ jsx("p", { className: "text-emerald-400 text-xs font-bold mt-1", children: "Resultado: 17,50 horas." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-3 bg-blue-500/10 rounded-lg border border-blue-500/20", children: [
              /* @__PURE__ */ jsx("p", { className: "text-white text-xs font-bold mb-1", children: "Exemplo 2 (Teto da Hora - 58 Minutos):" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-xs", children: "Saída com 58 minutos." }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-xs mt-1", children: "Fator = 58 / 60 ≈ 0,966." }),
              /* @__PURE__ */ jsx("p", { className: "text-emerald-400 text-xs font-bold mt-1", children: "Resultado: 0,97 horas." }),
              /* @__PURE__ */ jsx("p", { className: "text-red-400 text-[10px] mt-1 italic", children: "*Se usasse 0,58, pagaria 40% a menos." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-4", children: [
            "Para entender o impacto financeiro disso no seu bolso, vale a pena utilizar nossa ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-blue-400 hover:underline", children: "calculadora de salário líquido" }),
            " para ver o desconto final após impostos."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-4", children: "Regra de Tolerância (Artigo 58)" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
          /* @__PURE__ */ jsx("strong", { children: "Nossa Calculadora de Horas Trabalhadas" }),
          " também considera a regra de ouro da pontualidade. Segundo o Artigo 58, § 1º da CLT, variações de até 5 minutos (para mais ou para menos) não devem ser computadas, desde que o total diário não exceda 10 minutos."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
          "Esse entendimento é reforçado pela ",
          /* @__PURE__ */ jsx("a", { href: "https://www3.tst.jus.br/jurisprudencia/Sumulas_com_indice/Sumula_366.html", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Súmula 366 do TST" }),
          ", que determina que, ultrapassado o limite máximo de 10 minutos diários, será considerada como extra a totalidade do tempo que exceder a jornada normal, pois configura tempo à disposição do empregador."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Entrada" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-mono text-white", children: "08:04" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-400", children: "4 min atraso (OK)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Saída" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-mono text-white", children: "17:03" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-400", children: "3 min extra (OK)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Total Desvio" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-mono text-yellow-400", children: "7 min" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400", children: "Abaixo de 10 min" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl text-center border border-emerald-500/30", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Resultado" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-emerald-400", children: "Zero" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400", children: "Sem desconto/extra" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Cenários Avançados: Hora Noturna e DSR" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed", children: [
            "Ferramentas simplistas falham aqui. Se a jornada ocorre entre 22h e 05h, a hora não tem 60 minutos, mas sim ",
            /* @__PURE__ */ jsx("strong", { children: "52 minutos e 30 segundos" }),
            ". Isso é uma ficção jurídica que obriga o pagamento de 8 horas para quem trabalha 7 horas de relógio."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 leading-relaxed", children: [
            "Para quem faz turnos complexos, recomendamos conferir nossa ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/adicional-noturno", className: "text-blue-400 hover:underline", children: "calculadora de adicional noturno" }),
            " específica para visualizar o valor financeiro deste benefício."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
              "Além disso, as horas extras habituais geram reflexos no Descanso Semanal Remunerado (DSR). O cálculo depende dos dias úteis do mês. O ano de 2025 possui aproximadamente ",
              /* @__PURE__ */ jsx("strong", { children: "252 dias úteis" }),
              " (considerando feriados nacionais, conforme a ",
              /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/L14759.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Lei 14.759" }),
              "), mas lembre-se: o DSR deve ser calculado sobre os dias úteis ",
              /* @__PURE__ */ jsx("strong", { children: "do mês da competência" }),
              " (ex: novembro/25 terá 19 ou 20 dias úteis dependendo da cidade)."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-black/30 p-4 rounded-xl text-center font-mono text-sm text-indigo-300", children: "DSR = (Total Horas Extras ÷ Dias Úteis) × Domingos e Feriados × Valor da Hora Extra" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-4 text-center", children: [
              "Para precisão máxima neste ponto, consulte a ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/dias-uteis", className: "text-blue-400 hover:underline", children: "calculadora de dias úteis" }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-4", children: "Arcabouço Jurídico 2025: Portaria 671" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4 text-sm", children: [
            "A gestão de ponto moderna é regida pela ",
            /* @__PURE__ */ jsx("a", { href: "https://www.in.gov.br/en/web/dou/-/portaria-359094137", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Portaria 671" }),
            ", que consolidou as regras antigas. Hoje, existem três tipos oficiais de registro que você deve conhecer:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-300", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-blue-500 font-bold", children: "1." }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "REP-C:" }),
                " O relógio de parede tradicional que imprime ticket."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-blue-500 font-bold", children: "2." }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "REP-A:" }),
                " Softwares alternativos que exigem Acordo Coletivo para validade jurídica."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-blue-500 font-bold", children: "3." }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "REP-P:" }),
                " A evolução para 2025. Softwares registrados no INPI que coletam e tratam o ponto simultaneamente, oferecendo maior segurança jurídica."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-4", children: "Casos Especiais" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white mb-2", children: "Intervalo de Almoço (Intrajornada)" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 leading-relaxed", children: "O período de almoço ou descanso não conta como hora trabalhada, conforme o Art. 71 da CLT. Se o funcionário bate o ponto de saída para o almoço e retorno, esse tempo deve ser deduzido do total bruto da jornada." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white mb-2", children: "Banco de Horas vs. Hora Extra" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 leading-relaxed", children: [
                'A diferença é o pagamento. Na hora extra, você recebe o valor com adicional (mínimo 50%) na folha do mês. No Banco de Horas, o tempo "sobra" para ser compensado com folgas futuras. A escolha depende do acordo da empresa, mas o cálculo das horas trabalhadas (saldo positivo) é o mesmo. Se você tem dúvidas sobre o valor acumulado, utilize a ',
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "text-blue-400 hover:underline", children: "calculadora de horas extras" }),
                "."
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
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  HoursCalculatorPage
};
//# sourceMappingURL=HoursCalculatorPage-D3F4TGdH.js.map
