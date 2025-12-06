import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Baby, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-C9Svc77H.js";
import { AppPromoBanner } from "./AppPromoBanner-BwQOrylZ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const GESTATIONAL_FAQS = [
  {
    question: "Como é calculada a idade gestacional?",
    answer: "A contagem começa a partir do primeiro dia da última menstruação (DUM), e não do dia da concepção, pois é a data mais precisa que a mulher costuma ter."
  },
  {
    question: "O cálculo é 100% preciso?",
    answer: "É uma estimativa muito próxima. A confirmação exata da idade gestacional e da data provável do parto deve ser feita através do ultrassom no primeiro trimestre."
  },
  {
    question: "Quantas semanas dura uma gravidez?",
    answer: "Uma gravidez completa dura em média 40 semanas (280 dias), podendo variar entre 37 e 42 semanas."
  }
];
function GestationalAgeCalculatorPage() {
  const [dum, setDum] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    if (!dum) return;
    const dumDate = new Date(dum);
    const today = /* @__PURE__ */ new Date();
    if (isNaN(dumDate.getTime())) return;
    const diffTime = Math.abs(today.getTime() - dumDate.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    const dueDate = new Date(dumDate);
    dueDate.setDate(dumDate.getDate() + 280);
    setResult({
      weeks,
      days,
      dueDate: dueDate.toLocaleDateString("pt-BR")
    });
  };
  useEffect(() => {
    calculate();
  }, [dum]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora Gestacional",
    "description": "Calcule a idade gestacional e a data provável do parto (DPP) a partir da DUM.",
    "applicationCategory": "HealthApplication",
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
        title: "Calculadora Gestacional - Semanas de Gravidez e DPP",
        description: "Descubra de quantas semanas você está e qual a data provável do parto. Acompanhe sua gravidez com nossa calculadora gestacional.",
        canonical: "/calculadoras/idade-gestacional"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": GESTATIONAL_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Idade Gestacional", href: "/calculadoras/idade-gestacional" }
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
                /* @__PURE__ */ jsx(Baby, { className: "w-4 h-4 text-cyan-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Matemática e Saúde" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500", children: "Gestacional" })
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
                /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-cyan-500" }),
                "Calcular Data"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data da Última Menstruação (DUM)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "date",
                      value: dum,
                      onChange: (e) => setDum(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all [color-scheme:dark]"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Idade Gestacional" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `${result.weeks} Semanas` : "---" }),
                    result && result.days > 0 && /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500 block", children: [
                      "+ ",
                      result.days,
                      " dias"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-cyan-400 block mb-1", children: "Data Provável do Parto" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? result.dueDate : "---" })
                  ] })
                ] }) })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-cyan-500" }),
                "Trimestres da Gravidez"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 relative pl-4 border-l border-white/10", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-cyan-500" }),
                  /* @__PURE__ */ jsx("strong", { className: "text-white block text-sm", children: "1º Trimestre" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Semana 1 a 13" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500" }),
                  /* @__PURE__ */ jsx("strong", { className: "text-white block text-sm", children: "2º Trimestre" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Semana 14 a 26" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-purple-500" }),
                  /* @__PURE__ */ jsx("strong", { className: "text-white block text-sm", children: "3º Trimestre" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Semana 27 a 40+" })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Acompanhe o desenvolvimento do seu bebê. Saiba a data provável do nascimento." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: GESTATIONAL_FAQS,
          title: "Dúvidas sobre Gravidez",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  GestationalAgeCalculatorPage
};
//# sourceMappingURL=GestationalAgeCalculatorPage-TxJCm532.js.map
