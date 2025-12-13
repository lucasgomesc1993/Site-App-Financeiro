import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Calendar, Calculator, CheckCircle, MapPin, FileText, Info, XCircle, AlertCircle, Clock, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
const BUSINESS_DAYS_FAQS = [
  {
    question: "O sábado é considerado dia útil para pagamento de salário?",
    answer: "Sim. Segundo o <a href='https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm' target='_blank' rel='noopener noreferrer' class='text-blue-400 hover:underline'>Artigo 459 da CLT</a> e jurisprudência consolidada, o sábado é dia útil para contagem do prazo de pagamento salarial, exceto se coincidir com um feriado. Porém, se o 5º dia cair no sábado, empresas que pagam via TED/DOC devem antecipar para sexta-feira, pois bancos não processam essas transferências no fim de semana."
  },
  {
    question: "Quantos dias úteis terá o ano de 2025?",
    answer: "O ano de 2025 terá aproximadamente <strong>252 dias úteis</strong> bancários (segunda a sexta), já descontando o novo feriado nacional de 20 de novembro. Para o comércio que funciona aos sábados, esse número é maior. Lembre-se que feriados estaduais (como 9 de Julho em SP) ou municipais reduzem ainda mais essa contagem em cada localidade."
  },
  {
    question: "O dia 20 de novembro é feriado nacional em 2025?",
    answer: "Sim. A Lei 14.759/2023 tornou o Dia Nacional de Zumbi e da Consciência Negra feriado em todo o território nacional, eliminando a antiga dependência de leis municipais. Portanto, em 2025, o dia 20 de novembro (quinta-feira) é um dia não útil obrigatório para fins bancários, prazos processuais e rotinas trabalhistas em todo o Brasil."
  },
  {
    question: "Como calcular dias úteis no Excel considerando o sábado?",
    answer: 'Use a função avançada <code>=DIATRABALHOTOTAL.INTL(início; fim; 11; feriados)</code>. O parâmetro "11" é crucial pois configura apenas o domingo como fim de semana, ideal para o varejo e escalas 6x1. Se você usar a fórmula comum (sem o INTL), o Excel excluirá o sábado automaticamente, gerando erros no cálculo de prazos trabalhistas CLT.'
  },
  {
    question: 'Teremos muitos "feriadões" em 2025?',
    answer: 'Sim, será um ano de muitas "pontes". Embora três feriados caiam no domingo, datas críticas como Dia do Trabalho (01/05), Corpus Christi (19/06) e Consciência Negra (20/11) caem em quintas-feiras. Isso favorece emendas prolongadas na sexta-feira, o que beneficia o turismo, mas exige planejamento antecipado da indústria para evitar paradas custosas na produção.'
  },
  {
    question: "Carnaval é feriado ou dia útil?",
    answer: "Para a iniciativa privada, o Carnaval (segunda e terça) é tecnicamente dia útil, a menos que exista lei estadual (como no RJ) ou municipal declarando feriado. No âmbito federal, é apenas ponto facultativo. Se não houver lei local ou convenção coletiva, a empresa pode exigir trabalho normal ou negociar compensação."
  }
];
const NATIONAL_HOLIDAYS_2025 = [
  { date: "2025-01-01", name: "Confraternização Universal", type: "Feriado Nacional" },
  { date: "2025-03-03", name: "Carnaval (Ponto Facultativo)", type: "Ponto Facultativo" },
  { date: "2025-03-04", name: "Carnaval (Ponto Facultativo)", type: "Ponto Facultativo" },
  { date: "2025-04-18", name: "Paixão de Cristo", type: "Feriado Nacional" },
  { date: "2025-04-21", name: "Tiradentes", type: "Feriado Nacional" },
  { date: "2025-05-01", name: "Dia do Trabalho", type: "Feriado Nacional" },
  { date: "2025-06-19", name: "Corpus Christi", type: "Ponto Facultativo" },
  { date: "2025-09-07", name: "Independência do Brasil", type: "Feriado Nacional" },
  { date: "2025-10-12", name: "N. Sra. Aparecida", type: "Feriado Nacional" },
  { date: "2025-11-02", name: "Finados", type: "Feriado Nacional" },
  { date: "2025-11-15", name: "Proclamação da República", type: "Feriado Nacional" },
  { date: "2025-11-20", name: "Dia da Consciência Negra", type: "Feriado Nacional" },
  { date: "2025-12-25", name: "Natal", type: "Feriado Nacional" }
];
function BusinessDaysPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includeSaturdays, setIncludeSaturdays] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    if (!startDate || !endDate) {
      setResult(null);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    if (end < start) {
      setResult(null);
      return;
    }
    let current = new Date(start);
    let businessDays = 0;
    let weekends = 0;
    let holidayCount = 0;
    const foundHolidays = [];
    const totalTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(totalTime / (1e3 * 60 * 60 * 24)) + 1;
    while (current <= end) {
      const dayOfWeek = current.getDay();
      const dateString = current.toISOString().split("T")[0];
      let holiday = NATIONAL_HOLIDAYS_2025.find((h) => h.date === dateString);
      if (!holiday && state === "SP") {
        if (current.getMonth() === 6 && current.getDate() === 9) {
          holiday = { date: dateString, name: "Revolução Constitucionalista (SP)", type: "Feriado Estadual" };
        }
        if (city === "Capital" && current.getMonth() === 0 && current.getDate() === 25) {
          holiday = { date: dateString, name: "Aniversário de São Paulo", type: "Feriado Municipal" };
        }
        if (city === "Capital" && current.getMonth() === 10 && current.getDate() === 20) ;
      }
      if (!holiday && state === "RJ") {
        if (current.getMonth() === 3 && current.getDate() === 23) {
          holiday = { date: dateString, name: "Dia de São Jorge (RJ)", type: "Feriado Estadual" };
        }
        if (current.getMonth() === 10 && current.getDate() === 20) ;
        if (city === "Capital" && current.getMonth() === 0 && current.getDate() === 20) {
          holiday = { date: dateString, name: "Dia de São Sebastião", type: "Feriado Municipal" };
        }
      }
      if (holiday) {
        const isWeekend = dayOfWeek === 0 || !includeSaturdays && dayOfWeek === 6;
        if (!isWeekend) {
          holidayCount++;
          foundHolidays.push(holiday);
        }
        if (isWeekend) {
          weekends++;
        }
      } else {
        const isWeekend = dayOfWeek === 0 || !includeSaturdays && dayOfWeek === 6;
        if (isWeekend) {
          weekends++;
        } else {
          businessDays++;
        }
      }
      current.setDate(current.getDate() + 1);
    }
    setResult({
      businessDays,
      totalDays,
      weekends,
      holidays: holidayCount,
      holidayList: foundHolidays
    });
  };
  useEffect(() => {
    calculate();
  }, [startDate, endDate, includeSaturdays, state, city]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Dias Úteis 2025 (Online e Gratuita)",
    "url": "https://www.junny.com.br/calculadoras/dias-uteis",
    "description": "Calculadora Dias Úteis 2025: conte prazos com o novo feriado da Consciência Negra. Inclui tabela oficial, 252 dias bancários e regras CLT.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
    "featureList": [
      "Contagem de Dias Úteis 2025",
      "Calendário Bancário vs Comercial",
      "Feriados Nacionais 2025",
      "Novo Feriado Consciência Negra"
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
        title: "Calculadora Dias Úteis 2025: Feriados, Sábados e Excel",
        description: "Calculadora Dias Úteis 2025: conte prazos com o novo feriado da Consciência Negra. Inclui tabela oficial, 252 dias bancários e regras CLT.",
        canonical: "/calculadoras/dias-uteis"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": BUSINESS_DAYS_FAQS.map((faq) => ({
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
          { label: "Dias Úteis", href: "/calculadoras/dias-uteis" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Ano de Referência: 2025" })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: "Calculadora de Dias Úteis 2025 (Online e Gratuita)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
            "Calcular Dias Úteis"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 w-full", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "startDate", className: "text-sm text-gray-400", children: "Data Inicial" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "startDate",
                      type: "date",
                      value: startDate,
                      onChange: (e) => setStartDate(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                    }
                  ),
                  /* @__PURE__ */ jsx(Calendar, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "endDate", className: "text-sm text-gray-400", children: "Data Final" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "endDate",
                      type: "date",
                      value: endDate,
                      onChange: (e) => setEndDate(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                    }
                  ),
                  /* @__PURE__ */ jsx(Calendar, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors", onClick: () => setIncludeSaturdays(!includeSaturdays), children: [
              /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border flex items-center justify-center transition-all ${includeSaturdays ? "bg-blue-500 border-blue-500" : "border-gray-500"}`, children: includeSaturdays && /* @__PURE__ */ jsx(CheckCircle, { className: "w-3.5 h-3.5 text-white" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Considerar sábado como dia útil? (Padrão CLT/Comércio)" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Estado" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer",
                      value: state,
                      onChange: (e) => setState(e.target.value),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", className: "bg-[#1a1a1a]", children: "Selecione o Estado" }),
                        /* @__PURE__ */ jsx("option", { value: "SP", className: "bg-[#1a1a1a]", children: "São Paulo" }),
                        /* @__PURE__ */ jsx("option", { value: "RJ", className: "bg-[#1a1a1a]", children: "Rio de Janeiro" }),
                        /* @__PURE__ */ jsx("option", { value: "MG", className: "bg-[#1a1a1a]", children: "Minas Gerais" }),
                        /* @__PURE__ */ jsx("option", { value: "RS", className: "bg-[#1a1a1a]", children: "Rio Grande do Sul" }),
                        /* @__PURE__ */ jsx("option", { value: "BA", className: "bg-[#1a1a1a]", children: "Bahia" }),
                        /* @__PURE__ */ jsx("option", { value: "PR", className: "bg-[#1a1a1a]", children: "Paraná" }),
                        /* @__PURE__ */ jsx("option", { value: "DF", className: "bg-[#1a1a1a]", children: "Distrito Federal" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(MapPin, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Cidade" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                      value: city,
                      onChange: (e) => setCity(e.target.value),
                      disabled: !state,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", className: "bg-[#1a1a1a]", children: state ? "Selecione a Cidade (Opcional)" : "Selecione o Estado Primeiro" }),
                        /* @__PURE__ */ jsx("option", { value: "Capital", className: "bg-[#1a1a1a]", children: "Capital" }),
                        /* @__PURE__ */ jsx("option", { value: "Interior", className: "bg-[#1a1a1a]", children: "Interior" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(MapPin, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Resultado da Contagem" }),
                /* @__PURE__ */ jsx("span", { className: "text-5xl font-bold text-white block mb-2", children: result ? result.businessDays : 0 }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "Dias Úteis" })
              ] }),
              result && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Dias Totais" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: result.totalDays })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Fins de Semana" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: result.weekends })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 col-span-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Feriados em dias úteis" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: result.holidays })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-500" }),
            "Resumo de Regras 2025"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-500 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Ano de Referência:" }),
                " 2025 (Atualizado em Dezembro)."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-blue-500 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Novo Feriado Nacional:" }),
                " Dia 20 de Novembro (Consciência Negra) agora é feriado em todo o país (Lei 14.759)."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-blue-500 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Pagamento de Salário:" }),
                " Para a CLT, o sábado ",
                /* @__PURE__ */ jsx("strong", { children: "é considerado dia útil" }),
                ". O pagamento deve ocorrer até o 5º dia útil."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-red-500 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Sistema Bancário:" }),
                " Sábados ",
                /* @__PURE__ */ jsx("strong", { children: "não" }),
                " são dias úteis para vencimento de boletos ou transferências (TED/DOC)."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-yellow-500 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Carnaval 2025:" }),
                " Dias 03 e 04 de março são pontos facultativos federais, não feriados nacionais (salvo lei local)."
              ] })
            ] })
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Resumo em 30 Segundos" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-300 leading-relaxed mb-4", children: [
          "A ",
          /* @__PURE__ */ jsx("strong", { children: "Calculadora Dias Úteis 2025" }),
          " é essencial para gestores de RH, advogados e profissionais financeiros que precisam de precisão temporal. Diferente de calendários comuns, nossa ferramenta distingue ",
          /* @__PURE__ */ jsx("strong", { children: "dias úteis bancários" }),
          " (segunda a sexta) de ",
          /* @__PURE__ */ jsx("strong", { children: "dias úteis comerciais" }),
          ' (que podem incluir sábado). Com a nacionalização do feriado da Consciência Negra e a configuração de "pontes" nas quintas-feiras em 2025, calcular prazos manualmente gera riscos altos de multas trabalhistas ou perda de prazos processuais.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como funciona a Calculadora Dias Úteis" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
          "Para garantir precisão máxima, insira as datas de início e fim e selecione se deseja ",
          /* @__PURE__ */ jsx("strong", { children: "considerar sábados como dias úteis" }),
          " (ideal para cálculos trabalhistas). Informe também seu ",
          /* @__PURE__ */ jsx("strong", { children: "Estado e Cidade" }),
          ", pois a ferramenta desconta automaticamente os feriados locais e regionais específicos que impactam sua contagem."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Calendar, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Calendário Oficial de Feriados Nacionais 2025" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8 max-w-3xl", children: "Abaixo, listamos as datas que impactam diretamente a contagem de dias úteis em 2025. O calendário considera as portarias do Ministério da Gestão e Inovação e a legislação federal vigente." }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Data" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Dia da Semana" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Celebração" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Tipo Legal" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Impacto" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "01/01" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Quarta-feira" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Confraternização Universal" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriado Nacional" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Parada Total" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "03/03" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Segunda-feira" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Carnaval" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Ponto Facultativo" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Folga comum" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "04/03" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Terça-feira" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Carnaval" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Ponto Facultativo" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Folga comum" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "18/04" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Sexta-feira" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Paixão de Cristo" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriado Nacional" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriadão" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "21/04" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Segunda-feira" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Tiradentes" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriado Nacional" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriadão" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "01/05" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Quinta-feira" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Dia do Trabalho" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriado Nacional" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Possível ponte" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "19/06" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Quinta-feira" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Corpus Christi" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Ponto Facultativo" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Possível ponte" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "07/09" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Domingo" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Independência do Brasil" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriado Nacional" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Nulo" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "12/10" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Domingo" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "N. Sra. Aparecida" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriado Nacional" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Nulo" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "02/11" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Domingo" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Finados" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriado Nacional" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Nulo" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "15/11" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Sábado" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Proclamação da República" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriado Nacional" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Impacto Varejo" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "20/11" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Quinta-feira" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Dia da Consciência Negra" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriado Nacional" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "Novo (Lei 14.759)" }) })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "25/12" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Quinta-feira" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Natal" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Feriado Nacional" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Parada Total" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 p-4 rounded-xl bg-white/5 border border-white/5 border-l-4 border-l-blue-500", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300", children: [
          /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
          " Calendário baseado na ",
          /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/gestao/pt-br/assuntos/noticias/2024/dezembro/gestao-divulga-calendario-de-feriados-e-pontos-facultativos-em-2025", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Portaria do Ministério da Gestão e da Inovação em Serviços Públicos" }),
          " e na ",
          /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/L14759.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Lei nº 14.759/2023" }),
          "."
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-yellow-500 shrink-0" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-yellow-200 mb-2", children: "Erros Comuns ao Calcular Dias Úteis" }),
            /* @__PURE__ */ jsx("p", { className: "text-yellow-100/80", children: 'O erro mais frequente não é matemático, mas jurídico. A confusão entre "Dia Útil Bancário" e "Dia Útil Trabalhista" gera passivos enormes.' })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-yellow-100/70", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Ignorar o Sábado no Pagamento de Salário:" }),
              " Muitos RHs usam o calendário bancário (seg-sex) para calcular o 5º dia útil. Isso está incorreto. Para a CLT, o sábado conta. Se o mês começa numa sexta-feira, o 5º dia útil é a quarta-feira seguinte, não a sexta."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Confundir Ponto Facultativo com Feriado:" }),
              " Carnaval e Corpus Christi **não são feriados nacionais**. Empresas privadas só são obrigadas a dar folga se houver lei municipal/estadual ou Convenção Coletiva."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Esquecer o Feriado de 20 de Novembro:" }),
              " Softwares desatualizados ainda consideram esta data como dia útil em muitos estados. Desde o final de 2023, a data é feriado nacional, travando prazos e pagamentos."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como Calcular (Passo a Passo e Fórmulas)" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
          "Para quem precisa fazer projeções manuais ou auditar sistemas sem depender apenas da ",
          /* @__PURE__ */ jsx("strong", { children: "Calculadora Dias Úteis 2025" }),
          " automática, a lógica de cálculo segue critérios de exclusão rigorosos."
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "A Fórmula Lógica" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-4", children: "A contagem de dias úteis é uma subtração dos dias não laborais do período total." }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mb-6 text-center font-mono text-xl text-blue-300", children: "DU = DT - (FDS + F + PF)" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5", children: /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-300", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "DU:" }),
              " Dias Úteis"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "DT:" }),
              " Dias Totais (Corridos)"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5", children: /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-300", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "FDS:" }),
              " Fins de Semana (Sáb/Dom ou apenas Dom)"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "F:" }),
              " Feriados Nacionais e Locais"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "PF:" }),
              " Pontos Facultativos (se aderido)"
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Exemplos Práticos de Contagem" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-2", children: "Cenário A: Agosto de 2025 (Mês Comum)" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-1 text-sm text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Dias Totais:" }),
                " 31"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Fins de Semana:" }),
                " 10 dias"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Feriados:" }),
                " 0"
              ] }),
              /* @__PURE__ */ jsx("li", { className: "pt-2 font-mono text-blue-300", children: "31 - 10 - 0 = 21 Dias Úteis" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-2", children: "Cenário B: Novembro de 2025 (Mês Atípico)" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-2", children: "Novembro possui 3 feriados (dias 02, 15 e 20)." }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-1 text-sm text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Dias Totais:" }),
                " 30"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Fins de Semana:" }),
                " 10 dias (inclui 02 e 15)"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Feriados em semana:" }),
                " 1 dia (20/11)"
              ] }),
              /* @__PURE__ */ jsx("li", { className: "pt-2 font-mono text-blue-300", children: "30 - 10 - 1 = 19 Dias Úteis" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Método Excel (Avançado)" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-300 mb-4", children: [
          "A função simples ",
          /* @__PURE__ */ jsx("code", { children: "=DIATRABALHOTOTAL" }),
          " do Excel é falha para o varejo, pois exclui automaticamente o sábado. Para precisão profissional, utilize a função ",
          /* @__PURE__ */ jsx("strong", { children: "INTL" }),
          ":"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mb-6 font-mono text-sm text-blue-300 overflow-x-auto", children: "=DIATRABALHOTOTAL.INTL(data_inicial; data_final; [código_fds]; [feriados])" }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-sm text-gray-300 space-y-2 mb-6", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Código 1:" }),
            " Exclui Sábado e Domingo (Padrão Escritórios/Bancos)."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Código 11:" }),
            " Exclui apenas Domingo (Padrão Comércio/CLT)."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
          "Ao planejar o orçamento anual da empresa, cruze esses dados com a nossa ",
          /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-funcionario", className: "text-blue-400 hover:underline", children: "calculadora de custo de funcionário" }),
          " para entender o impacto das horas não trabalhadas."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Casos Especiais e Aplicações Práticas" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Pagamento de Salário (CLT)" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Para determinar a data limite de pagamento, você deve contar o sábado como dia útil (exceto se for feriado). No entanto, se o 5º dia útil cair num sábado, a empresa muitas vezes antecipa o pagamento (via TED/DOC) para sexta-feira ou usa o PIX." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Trabalho em Feriados e Hora Extra" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-3", children: "Se a escala de trabalho cair em um feriado nacional (como o novo feriado de 20 de novembro), o colaborador tem direito a receber o dia em dobro (100%) ou uma folga compensatória." }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-blue-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Calcule na ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "underline hover:text-blue-300", children: "Calculadora de Horas Extras" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Planejamento de Férias" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-3", children: "Ao programar o descanso, é crucial verificar se o início das férias não coincide com dias proibidos pela Reforma Trabalhista (dois dias que antecedem feriado ou DSR)." }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-blue-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Simule na ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/ferias", className: "underline hover:text-blue-300", children: "Calculadora de Férias" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Prazos Processuais e Mercado" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Jurídico:" }),
              " Conte apenas dias úteis, descontando Recesso Forense e feriados locais.",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("strong", { children: "Financeiro:" }),
              " Sábados, domingos e feriados nacionais não contam para vencimentos."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-blue-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Veja ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/juros-compostos", className: "underline hover:text-blue-300", children: "Calculadora de Juros Compostos" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(FAQ, { items: BUSINESS_DAYS_FAQS })
    ] })
  ] });
}
export {
  BusinessDaysPage
};
//# sourceMappingURL=BusinessDaysPage-CQO-xqAf.js.map
