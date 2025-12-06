import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Flame, Users, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { F as FAQ } from "./FAQ-BvIu8Jqf.js";
import { AppPromoBanner } from "./AppPromoBanner-BwQOrylZ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const BBQ_FAQS = [
  {
    question: "Qual a quantidade de carne por pessoa?",
    answer: "Recomendamos 400g de carne por adulto (se houver acompanhamentos) ou 500g se for apenas carne. Para crianças, considere metade dessa quantidade."
  },
  {
    question: "Como calcular a bebida?",
    answer: "Cerveja: 4 a 6 latas por pessoa que bebe. Refrigerante/Água: 600ml por pessoa."
  },
  {
    question: "O que não pode faltar?",
    answer: "Além das carnes, não esqueça: carvão (1 saco de 5kg para cada 6kg de carne), sal grosso, pão de alho e vinagrete."
  }
];
function BarbecueCalculatorPage() {
  const [men, setMen] = useState(0);
  const [women, setWomen] = useState(0);
  const [kids, setKids] = useState(0);
  const [duration, setDuration] = useState(4);
  const [result, setResult] = useState(null);
  const calculate = () => {
    const durationFactor = 1 + Math.max(0, duration - 4) * 0.1;
    const meat = (men * 0.5 + women * 0.35 + kids * 0.2) * durationFactor;
    const beer = (men * 1.5 + women * 1) * durationFactor;
    const soda = (men * 0.5 + women * 0.6 + kids * 0.8) * durationFactor;
    const coal = meat * 0.8;
    setResult({
      meat: Math.ceil(meat * 10) / 10,
      beer: Math.ceil(beer),
      soda: Math.ceil(soda),
      coal: Math.ceil(coal)
    });
  };
  useEffect(() => {
    calculate();
  }, [men, women, kids, duration]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Churrasco",
    "description": "Calcule a quantidade ideal de carne, bebida e carvão para o seu churrasco.",
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
        title: "Calculadora de Churrasco Online - Carne e Bebida",
        description: "Vai fazer um churrasco? Calcule a quantidade exata de carne, cerveja e refrigerante por pessoa e evite desperdícios.",
        canonical: "/calculadoras/churrasco"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": BBQ_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Churrasco", href: "/calculadoras/churrasco" }
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
                /* @__PURE__ */ jsx(Flame, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dia a Dia e Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500", children: "Churrasco" })
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
                /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 text-rose-500" }),
                "Convidados"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-center", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Homens" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-xl p-3", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => setMen(Math.max(0, men - 1)), className: "text-gray-400 hover:text-white text-xl font-bold w-8", children: "-" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white w-8", children: men }),
                      /* @__PURE__ */ jsx("button", { onClick: () => setMen(men + 1), className: "text-rose-500 hover:text-rose-400 text-xl font-bold w-8", children: "+" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-center", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Mulheres" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-xl p-3", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => setWomen(Math.max(0, women - 1)), className: "text-gray-400 hover:text-white text-xl font-bold w-8", children: "-" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white w-8", children: women }),
                      /* @__PURE__ */ jsx("button", { onClick: () => setWomen(women + 1), className: "text-rose-500 hover:text-rose-400 text-xl font-bold w-8", children: "+" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-center", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Crianças" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-xl p-3", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => setKids(Math.max(0, kids - 1)), className: "text-gray-400 hover:text-white text-xl font-bold w-8", children: "-" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white w-8", children: kids }),
                      /* @__PURE__ */ jsx("button", { onClick: () => setKids(kids + 1), className: "text-rose-500 hover:text-rose-400 text-xl font-bold w-8", children: "+" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("label", { className: "text-sm text-gray-400 flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Duração do Churrasco" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
                      duration,
                      " horas"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "range",
                      min: "2",
                      max: "12",
                      value: duration,
                      onChange: (e) => setDuration(parseInt(e.target.value)),
                      className: "w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4 text-center", children: "Lista de Compras Estimada" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsxs("span", { className: "block text-2xl font-bold text-white", children: [
                        result == null ? void 0 : result.meat,
                        " kg"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Carne" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsxs("span", { className: "block text-2xl font-bold text-white", children: [
                        result == null ? void 0 : result.beer,
                        " L"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Cerveja" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsxs("span", { className: "block text-2xl font-bold text-white", children: [
                        result == null ? void 0 : result.soda,
                        " L"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Refri/Água" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsxs("span", { className: "block text-2xl font-bold text-white", children: [
                        result == null ? void 0 : result.coal,
                        " kg"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Carvão" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center", children: /* @__PURE__ */ jsx("p", { children: "Garanta que não falte nada (e nem sobre muito). Calcule a quantidade ideal de comida e bebida para seus convidados." }) }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(ShoppingCart, { className: "w-5 h-5 text-rose-500" }),
                "Sugestão de Carnes"
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Picanha:" }),
                    " A rainha do churrasco. Calcule 1 peça para cada 5-6 pessoas."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Linguiça:" }),
                    " Ótima para entrada. É barata e todo mundo gosta."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Frango:" }),
                    " Coxinha da asa ou coração. Tempere com antecedência."
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: BBQ_FAQS,
          title: "Dúvidas sobre Churrasco",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  BarbecueCalculatorPage
};
//# sourceMappingURL=BarbecueCalculatorPage-C4IiYeoA.js.map
