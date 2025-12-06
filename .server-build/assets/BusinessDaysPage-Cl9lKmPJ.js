import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { CalendarDays, Calculator, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-2hmnhBZO.js";
import { AppPromoBanner } from "./AppPromoBanner--0MyDSNn.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const BUSINESS_DAYS_FAQS = [
  {
    question: "O que são dias úteis?",
    answer: "São os dias da semana de segunda a sexta-feira, excluindo os feriados nacionais. Sábados e domingos são considerados dias não úteis para fins bancários e de prazos legais."
  },
  {
    question: "Considera feriados estaduais?",
    answer: "Esta calculadora considera apenas os feriados nacionais fixos e móveis do Brasil. Feriados estaduais e municipais não são contabilizados automaticamente."
  },
  {
    question: "Sábado conta como dia útil?",
    answer: "Para fins bancários (pagamento de boletos), não. Para fins trabalhistas (jornada de trabalho), o sábado é considerado dia útil não trabalhado (ou trabalhado meio período), dependendo da empresa."
  }
];
function BusinessDaysPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState(null);
  const isHoliday = (date) => {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const dateString = `${d}/${m}`;
    const fixedHolidays = [
      "1/1",
      // Confraternização Universal
      "21/4",
      // Tiradentes
      "1/5",
      // Dia do Trabalho
      "7/9",
      // Independência
      "12/10",
      // Nossa Senhora Aparecida
      "2/11",
      // Finados
      "15/11",
      // Proclamação da República
      "25/12"
      // Natal
    ];
    return fixedHolidays.includes(dateString);
  };
  const calculate = () => {
    if (!startDate || !endDate) {
      setResult(null);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      setResult(null);
      return;
    }
    let businessDays = 0;
    let weekends = 0;
    let holidays = 0;
    let totalDays = 0;
    const current = new Date(start);
    while (current <= end) {
      totalDays++;
      const dayOfWeek = current.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else if (isHoliday(current)) {
        holidays++;
      } else {
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }
    setResult({
      businessDays,
      totalDays,
      weekends,
      holidays
    });
  };
  useEffect(() => {
    calculate();
  }, [startDate, endDate]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Dias Úteis",
    "description": "Conte quantos dias úteis existem entre duas datas, descontando fins de semana e feriados nacionais.",
    "applicationCategory": "UtilityApplication",
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
        title: "Calculadora de Dias Úteis - Contagem de Prazos",
        description: "Precisa contar prazos? Calcule a quantidade exata de dias úteis entre duas datas, excluindo sábados, domingos e feriados.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Dias Úteis", href: "/calculadoras/dias-uteis" }
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
                /* @__PURE__ */ jsx(CalendarDays, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500", children: "Dias Úteis" })
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
                "Contar Dias"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data Inicial" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        value: startDate,
                        onChange: (e) => setStartDate(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data Final" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        value: endDate,
                        onChange: (e) => setEndDate(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Dias Úteis" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? result.businessDays : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total Dias" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? result.totalDays : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Fins de Semana" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? result.weekends : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Feriados" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? result.holidays : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center", children: /* @__PURE__ */ jsx("p", { children: "Planeje seus prazos. Conte os dias de trabalho efetivo entre duas datas." }) }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-blue-500" }),
                "Calendário"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Esta ferramenta é essencial para calcular prazos de entrega, vencimento de boletos e contagem de dias de férias." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Feriados Nacionais" }),
                  "Consideramos os feriados fixos (Natal, Tiradentes, etc). Feriados móveis (Carnaval, Páscoa, Corpus Christi) e locais podem variar."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: BUSINESS_DAYS_FAQS,
          title: "Dúvidas sobre Dias Úteis",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  BusinessDaysPage
};
//# sourceMappingURL=BusinessDaysPage-Cl9lKmPJ.js.map
