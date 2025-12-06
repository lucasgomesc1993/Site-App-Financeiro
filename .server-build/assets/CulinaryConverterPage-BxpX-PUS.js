import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ChefHat, Scale, HelpCircle } from "lucide-react";
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
const CULINARY_FAQS = [
  {
    question: "Quanto pesa 1 xícara de farinha?",
    answer: "Aproximadamente 120g. O peso varia conforme o ingrediente (densidade). Por isso, 1 xícara de açúcar (160g) pesa mais que 1 xícara de farinha."
  },
  {
    question: "Posso usar qualquer xícara?",
    answer: "Em receitas profissionais, 'xícara' é uma medida padrão de 240ml. Xícaras de café ou chá da sua casa podem ter tamanhos diferentes."
  },
  {
    question: "Colher de sopa é medida padrão?",
    answer: "Sim, 1 colher de sopa padrão tem 15ml. Já a colher de chá tem 5ml."
  }
];
const INGREDIENTS = [
  { name: "Farinha de Trigo", density: 120 },
  // g per cup (240ml)
  { name: "Açúcar Refinado", density: 160 },
  { name: "Açúcar Mascavo", density: 150 },
  { name: "Arroz Cru", density: 185 },
  { name: "Aveia em Flocos", density: 80 },
  { name: "Cacau em Pó", density: 90 },
  { name: "Manteiga", density: 200 },
  { name: "Leite / Água", density: 240 },
  { name: "Mel", density: 340 }
];
function CulinaryConverterPage() {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("cups");
  const [ingredientIndex, setIngredientIndex] = useState(0);
  const [result, setResult] = useState("---");
  const calculate = () => {
    const val = parseFloat(amount.replace(",", "."));
    if (isNaN(val)) {
      setResult("---");
      return;
    }
    const density = INGREDIENTS[ingredientIndex].density;
    if (unit === "cups") {
      const grams = val * density;
      setResult(`${Math.round(grams)}g`);
    } else {
      const cups = val / density;
      setResult(`${cups.toFixed(2)} xícaras`);
    }
  };
  useEffect(() => {
    calculate();
  }, [amount, unit, ingredientIndex]);
  const handleInput = (value) => {
    if (/^[\d.,]*$/.test(value)) {
      setAmount(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Conversor Culinário",
    "description": "Converta medidas culinárias (xícaras para gramas) facilmente.",
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
        title: "Conversor de Medidas Culinárias - Xícaras para Gramas",
        description: "Não erre na receita. Converta xícaras para gramas (e vice-versa) para farinha, açúcar, manteiga e outros ingredientes.",
        canonical: "/calculadoras/conversor-culinario"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CULINARY_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Conversor Culinário", href: "/calculadoras/conversor-culinario" }
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
                /* @__PURE__ */ jsx(ChefHat, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dia a Dia e Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Conversor ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Culinário" })
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
                /* @__PURE__ */ jsx(Scale, { className: "w-5 h-5 text-rose-500" }),
                "Converter"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Ingrediente" }),
                  /* @__PURE__ */ jsx(
                    "select",
                    {
                      value: ingredientIndex,
                      onChange: (e) => setIngredientIndex(parseInt(e.target.value)),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all appearance-none cursor-pointer",
                      children: INGREDIENTS.map((ing, index) => /* @__PURE__ */ jsx("option", { value: index, children: ing.name }, index))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Quantidade" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: amount,
                        onChange: (e) => handleInput(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "Ex: 1"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Unidade" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex bg-[#0a0a0a] rounded-xl p-1 border border-white/10", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setUnit("cups"),
                          className: `flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === "cups" ? "bg-rose-500 text-white" : "text-gray-400 hover:text-white"}`,
                          children: "Xícaras"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setUnit("grams"),
                          className: `flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === "grams" ? "bg-rose-500 text-white" : "text-gray-400 hover:text-white"}`,
                          children: "Gramas"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Resultado" }),
                  /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white", children: result })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center", children: /* @__PURE__ */ jsx("p", { children: "Transforme xícaras em gramas e acerte o ponto da sua receita." }) }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-rose-500" }),
                "Tabela Rápida"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-2 border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { children: "1 xícara de Farinha" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "120g" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-2 border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { children: "1 xícara de Açúcar" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "160g" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-2 border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { children: "1 xícara de Chocolate em Pó" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "90g" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-2 border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { children: "1 xícara de Manteiga" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "200g" })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: CULINARY_FAQS,
          title: "Dúvidas sobre Medidas Culinárias",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  CulinaryConverterPage
};
//# sourceMappingURL=CulinaryConverterPage-BxpX-PUS.js.map
