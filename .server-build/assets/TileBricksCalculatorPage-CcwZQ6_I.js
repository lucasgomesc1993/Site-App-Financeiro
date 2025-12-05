import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Layers, Calculator, Ruler, Grid, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO, F as FAQ } from "../entry-server.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { AppPromoBanner } from "./AppPromoBanner-BHihqQwm.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
const TILE_FAQS = [
  {
    question: "Como medir a área da parede ou piso?",
    answer: "Multiplique a largura pelo comprimento (ou altura). Exemplo: Uma parede de 3 metros de largura por 2,5 metros de altura tem 7,5m² (3 x 2,5)."
  },
  {
    question: "O que é a margem de perda?",
    answer: "É uma quantidade extra de material comprada para cobrir quebras, recortes e ajustes nos cantos. Recomendamos 10% para colocação reta e 15% para diagonal."
  },
  {
    question: "Essa calculadora serve para qualquer tipo de piso?",
    answer: "Sim, serve para cerâmica, porcelanato, laminado, vinílico e até tijolos, desde que você saiba as medidas da peça."
  }
];
function TileBricksCalculatorPage() {
  const [areaWidth, setAreaWidth] = useState("");
  const [areaLength, setAreaLength] = useState("");
  const [pieceWidth, setPieceWidth] = useState("");
  const [pieceLength, setPieceLength] = useState("");
  const [margin, setMargin] = useState(10);
  const [result, setResult] = useState(null);
  const calculate = () => {
    const aw = parseFloat(areaWidth.replace(",", "."));
    const al = parseFloat(areaLength.replace(",", "."));
    const pw = parseFloat(pieceWidth.replace(",", "."));
    const pl = parseFloat(pieceLength.replace(",", "."));
    if (isNaN(aw) || isNaN(al) || isNaN(pw) || isNaN(pl) || pw === 0 || pl === 0) {
      setResult(null);
      return;
    }
    const areaM2 = aw * al;
    const pieceM2 = pw / 100 * (pl / 100);
    const rawPieces = areaM2 / pieceM2;
    const totalPieces = Math.ceil(rawPieces * (1 + margin / 100));
    setResult({
      pieces: totalPieces,
      totalArea: areaM2
    });
  };
  useEffect(() => {
    calculate();
  }, [areaWidth, areaLength, pieceWidth, pieceLength, margin]);
  const handleInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Pisos e Tijolos",
    "description": "Calcule a quantidade exata de pisos, azulejos ou tijolos para sua obra.",
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
        title: "Calculadora de Pisos e Tijolos Online - Quantidade Exata",
        description: "Vai reformar? Calcule a quantidade de pisos, porcelanato ou tijolos necessários para sua obra, já incluindo a margem de perda.",
        canonical: "/calculadoras/tijolos-pisos"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": TILE_FAQS.map((faq) => ({
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
          { label: "Pisos e Tijolos", href: "/calculadoras/tijolos-pisos" }
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
                /* @__PURE__ */ jsx(Layers, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dia a Dia e Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Pisos e Tijolos" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Evite sobras ou falta de material. Calcule a quantidade exata para sua reforma." })
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
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-rose-500" }),
                "Calcular Material"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-sm font-medium text-gray-300 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Ruler, { className: "w-4 h-4 text-rose-500" }),
                    "Dimensões da Área (Parede ou Chão)"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500", children: "Largura (metros)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: areaWidth,
                          onChange: (e) => handleInput(e.target.value, setAreaWidth),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "Ex: 3,50"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500", children: "Comprimento (metros)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: areaLength,
                          onChange: (e) => handleInput(e.target.value, setAreaLength),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "Ex: 4,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-4 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-sm font-medium text-gray-300 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Grid, { className: "w-4 h-4 text-rose-500" }),
                    "Dimensões da Peça (Piso ou Tijolo)"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500", children: "Largura (cm)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: pieceWidth,
                          onChange: (e) => handleInput(e.target.value, setPieceWidth),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "Ex: 60"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500", children: "Comprimento (cm)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: pieceLength,
                          onChange: (e) => handleInput(e.target.value, setPieceLength),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "Ex: 60"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-4 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("label", { className: "text-sm text-gray-400 flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Margem de Perda (Quebras/Recortes)" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
                      margin,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "range",
                      min: "0",
                      max: "30",
                      step: "5",
                      value: margin,
                      onChange: (e) => setMargin(parseInt(e.target.value)),
                      className: "w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-right", children: "Recomendado: 10% a 15%" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Quantidade Necessária" }),
                  /* @__PURE__ */ jsxs("div", { className: "text-5xl font-bold text-white mb-2", children: [
                    result ? result.pieces : "---",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-2xl text-gray-500 font-normal", children: "peças" })
                  ] }),
                  result && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                    "Para cobrir uma área de ",
                    result.totalArea.toLocaleString("pt-BR"),
                    "m²."
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
                /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-rose-500" }),
                "Dicas Importantes"
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Rodapé:" }),
                    " Se for usar o mesmo piso para o rodapé, considere uma margem de perda maior (15-20%)."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Lote:" }),
                    " Compre tudo de uma vez. Lotes diferentes podem ter leve variação de cor."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Reserva:" }),
                    " Guarde sempre 2 ou 3 peças extras no sótão para reparos futuros."
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
          items: TILE_FAQS,
          title: "Dúvidas sobre Cálculo de Pisos",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  TileBricksCalculatorPage
};
//# sourceMappingURL=TileBricksCalculatorPage-CcwZQ6_I.js.map
