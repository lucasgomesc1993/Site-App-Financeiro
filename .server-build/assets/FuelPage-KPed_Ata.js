import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Fuel, Calculator, DollarSign, TrendingUp } from "lucide-react";
import { AppPromoBanner } from "./AppPromoBanner-BwQOrylZ.js";
import { F as FAQ } from "./FAQ-BvIu8Jqf.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const FUEL_FAQS = [
  {
    question: "Como saber qual o melhor entre álcool e gasolina?",
    answer: "A regra geral é dividir o preço do litro do álcool pelo da gasolina. Se o resultado for menor ou igual a 0,7 (70%), o álcool compensa mais. Se for maior que 0,7, a gasolina é a melhor opção para o seu bolso e rendimento do veículo."
  },
  {
    question: "Quando vale mais a pena abastecer com álcool?",
    answer: "Vale a pena abastecer com álcool (etanol) quando o seu preço for até 70% do valor da gasolina. Além da economia financeira, o etanol costuma dar mais potência ao motor, embora seja consumido mais rapidamente."
  },
  {
    question: "Quando vale mais a pena abastecer com gasolina?",
    answer: "A gasolina compensa quando o preço do etanol ultrapassa 70% do valor da gasolina. A gasolina oferece maior autonomia, permitindo rodar mais quilômetros com um tanque cheio, o que é ideal para viagens longas."
  },
  {
    question: "Qual combustível vale mais a pena na hora de abastecer?",
    answer: "Depende da relação de preços no momento. Utilize nossa calculadora gratuita sempre que for ao posto: basta inserir os valores atuais da bomba para ter a resposta exata de qual combustível trará mais economia para você."
  }
];
const FuelPage = () => {
  const [alcoholPrice, setAlcoholPrice] = useState(0);
  const [gasolinePrice, setGasolinePrice] = useState(0);
  const [result, setResult] = useState({ ratio: 0, bestOption: null });
  useEffect(() => {
    if (alcoholPrice > 0 && gasolinePrice > 0) {
      const ratio = alcoholPrice / gasolinePrice;
      setResult({
        ratio,
        bestOption: ratio <= 0.7 ? "alcohol" : "gasoline"
      });
    } else {
      setResult({ ratio: 0, bestOption: null });
    }
  }, [alcoholPrice, gasolinePrice]);
  const formatPercent = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora Álcool ou Gasolina Junny",
    "description": "Descubra qual combustível vale mais a pena para o seu carro.",
    "applicationCategory": "FinanceApplication",
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
        title: "Calculadora Álcool ou Gasolina - Qual Vale a Pena?",
        description: "Descubra qual combustível compensa mais para o seu bolso agora mesmo. Simples, rápido e direto.",
        canonical: "/calculadoras/combustivel"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FUEL_FAQS.map((faq) => ({
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
          { label: "Calculadora de Combustível", href: "/calculadoras/combustivel" }
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
                /* @__PURE__ */ jsx(Fuel, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Economia no Tanque" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Álcool ou Gasolina" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto hidden" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24 min-h-[600px]",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-rose-500" }),
                "Preços na Bomba"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "alcoholPrice", className: "block text-sm text-gray-400 mb-2", children: "Preço do Álcool (Etanol)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "alcoholPrice",
                        type: "number",
                        step: "0.01",
                        placeholder: "0,00",
                        value: alcoholPrice || "",
                        onChange: (e) => setAlcoholPrice(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "gasolinePrice", className: "block text-sm text-gray-400 mb-2", children: "Preço da Gasolina" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "gasolinePrice",
                        type: "number",
                        step: "0.01",
                        placeholder: "0,00",
                        value: gasolinePrice || "",
                        onChange: (e) => setGasolinePrice(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-colors"
                      }
                    )
                  ] })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10 text-center", children: result.bestOption ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  children: [
                    /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Melhor Opção" }),
                    /* @__PURE__ */ jsx("div", { className: "text-5xl md:text-7xl font-bold text-white mb-4", children: result.bestOption === "alcohol" ? /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "Álcool" }) : /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "Gasolina" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8", children: [
                      /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-rose-500" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-300", children: [
                        "O álcool custa ",
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatPercent(result.ratio) }),
                        " do valor da gasolina"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-md mx-auto leading-relaxed", children: result.bestOption === "alcohol" ? "O preço do etanol está abaixo de 70% do valor da gasolina. Vale a pena abastecer com álcool para economizar!" : "O preço do etanol está acima de 70% do valor da gasolina. A gasolina renderá mais e é a escolha mais econômica." })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Fuel, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg", children: "Preencha os valores para calcular" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Descubra qual combustível compensa mais para o seu bolso agora mesmo. Simples, rápido e direto." }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Álcool ou gasolina: quando um compensa mais que o outro?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
              "Para entender quando um tipo de combustível compensa mais financeiramente do que o outro, basta checar a proporção entre o preço de cada um. A regra de ouro é a ",
              /* @__PURE__ */ jsx("strong", { children: "proporção de 70%" }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
              "Abastecer com ",
              /* @__PURE__ */ jsx("strong", { children: "álcool (etanol)" }),
              " é recomendado quando o preço for até 70% do valor da gasolina. Caso ultrapasse os 70%, compensa mais abastecer com ",
              /* @__PURE__ */ jsx("strong", { children: "gasolina" }),
              "."
            ] }),
            /* @__PURE__ */ jsx("p", { children: "Isso acontece porque o etanol tem um poder calorífico menor, ou seja, rende cerca de 30% a menos que a gasolina. Portanto, para que seja vantajoso financeiramente, ele precisa custar no máximo 70% do preço da gasolina." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "grid md:grid-cols-2 gap-8 mb-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-2xl border border-white/5", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-500 font-bold", children: "1" }),
              "Exemplo: Álcool Vantajoso"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
              "Posto com Álcool a ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 4,00" }),
              " e Gasolina a ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 6,00" }),
              "."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-black/30 p-4 rounded-xl font-mono text-sm text-gray-300", children: "4,00 ÷ 6,00 = 0,66 (66%)" }),
            /* @__PURE__ */ jsx("p", { className: "text-green-400 mt-4 text-sm font-medium", children: "Resultado menor que 0,7. Compensa abastecer com Álcool." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-2xl border border-white/5", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold", children: "2" }),
              "Exemplo: Gasolina Vantajosa"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
              "Posto com Álcool a ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 4,29" }),
              " e Gasolina a ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 5,50" }),
              "."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-black/30 p-4 rounded-xl font-mono text-sm text-gray-300", children: "4,29 ÷ 5,50 = 0,78 (78%)" }),
            /* @__PURE__ */ jsx("p", { className: "text-emerald-400 mt-4 text-sm font-medium", children: "Resultado maior que 0,7. Compensa abastecer com Gasolina." })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: FUEL_FAQS,
            title: "Dúvidas Frequentes sobre Combustível",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
};
export {
  FuelPage
};
//# sourceMappingURL=FuelPage-KPed_Ata.js.map
