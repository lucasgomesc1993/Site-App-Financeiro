import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Droplets, Calculator, GlassWater } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO, F as FAQ } from "../entry-server.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { AppPromoBanner } from "./AppPromoBanner-BwQOrylZ.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
const WATER_FAQS = [
  {
    question: "Por que beber água é importante?",
    answer: "A água regula a temperatura corporal, transporta nutrientes, lubrifica articulações e melhora o funcionamento dos rins e intestino."
  },
  {
    question: "Bebidas como suco e chá contam?",
    answer: "Sim, mas a água pura é a melhor opção. Sucos podem ter muito açúcar e chás/café podem ser diuréticos."
  },
  {
    question: "Beber água demais faz mal?",
    answer: "Sim, o excesso pode causar hiponatremia (baixa concentração de sódio no sangue), mas é raro em pessoas saudáveis."
  }
];
function WaterIntakeCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const w = parseFloat(weight.replace(",", "."));
    if (isNaN(w) || w === 0) {
      setResult(null);
      return;
    }
    let mlPerKg = 35;
    if (activityLevel === "low") mlPerKg = 30;
    if (activityLevel === "high") mlPerKg = 45;
    setResult(w * mlPerKg);
  };
  useEffect(() => {
    calculate();
  }, [weight, activityLevel]);
  const handleInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Ingestão de Água",
    "description": "Descubra quanta água você deve beber por dia com base no seu peso e nível de atividade.",
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
        title: "Calculadora de Água Diária - Hidratação Ideal",
        description: "Quantos litros de água devo beber por dia? Calcule a meta ideal de hidratação para seu corpo e estilo de vida.",
        canonical: "/calculadoras/agua-diaria"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": WATER_FAQS.map((faq) => ({
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
          { label: "Ingestão de Água", href: "/calculadoras/agua-diaria" }
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
                /* @__PURE__ */ jsx(Droplets, { className: "w-4 h-4 text-cyan-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Matemática e Saúde" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500", children: "Ingestão de Água" })
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
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-cyan-500" }),
                "Calcular Meta Diária"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Seu Peso (kg)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: weight,
                      onChange: (e) => handleInput(e.target.value, setWeight),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                      placeholder: "Ex: 70"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Nível de Atividade Física" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setActivityLevel("low"),
                        className: `py-3 rounded-xl text-sm font-medium transition-all border ${activityLevel === "low" ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30"}`,
                        children: "Sedentário"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setActivityLevel("moderate"),
                        className: `py-3 rounded-xl text-sm font-medium transition-all border ${activityLevel === "moderate" ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30"}`,
                        children: "Moderado"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setActivityLevel("high"),
                        className: `py-3 rounded-xl text-sm font-medium transition-all border ${activityLevel === "high" ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30"}`,
                        children: "Intenso"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Sua meta diária é" }),
                  /* @__PURE__ */ jsxs("div", { className: "text-5xl font-bold text-white mb-2", children: [
                    result !== null ? (result / 1e3).toFixed(2) : "---",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-2xl text-gray-500 font-normal", children: "litros" })
                  ] }),
                  result !== null && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                    "Isso equivale a aproximadamente ",
                    Math.ceil(result / 250),
                    " copos de 250ml."
                  ] })
                ] })
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
                /* @__PURE__ */ jsx(GlassWater, { className: "w-5 h-5 text-cyan-500" }),
                "Dicas de Hidratação"
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Ao acordar:" }),
                    " Beba um copo d'água para ativar o metabolismo."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Antes das refeições:" }),
                    " Ajuda na digestão e controle do apetite."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Saborize:" }),
                    " Se não gosta de água pura, adicione rodelas de limão ou hortelã."
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Mantenha-se hidratado. Descubra a quantidade ideal de água para o seu corpo." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: WATER_FAQS,
          title: "Dúvidas sobre Hidratação",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  WaterIntakeCalculatorPage
};
//# sourceMappingURL=WaterIntakeCalculatorPage-BOTYGxbl.js.map
