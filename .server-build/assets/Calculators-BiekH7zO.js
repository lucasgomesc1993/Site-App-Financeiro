import { jsxs, jsx } from "react/jsx-runtime";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, ArrowRight, Plane, Zap, Fuel } from "lucide-react";
import { Link } from "react-router-dom";
import { B as Breadcrumb } from "./Breadcrumb-DwwVT1FI.js";
import { S as SEO, F as FAQ } from "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "@google/genai";
const AppPromoBanner = lazy(() => import("./AppPromoBanner-CdIlkx8T.js").then((module) => ({ default: module.AppPromoBanner })));
const Calculators = () => {
  const CALCULATOR_FAQS = [
    {
      question: "Qual a diferença entre simulador e calculadora?",
      answer: "Calculadoras normalmente retornam resultados diretos e exatos com base em dados objetivos e fórmulas fixas (como impostos). Simuladores projetam cenários futuros considerando variáveis dinâmicas e estimativas (como rentabilidade de investimentos)."
    },
    {
      question: "As calculadoras online são confiáveis?",
      answer: "Sim, nossas calculadoras são desenvolvidas com base nas regras, alíquotas e índices oficiais vigentes. No entanto, elas servem como ferramentas de estimativa e orientação."
    },
    {
      question: "Posso confiar nos resultados para tomar decisões financeiras?",
      answer: "Elas são ótimas para orientação inicial e planejamento, mas não substituem a análise de um profissional especializado. Sempre consulte um contador ou consultor financeiro para decisões críticas."
    },
    {
      question: "Posso usar as calculadoras pelo celular?",
      answer: "Sim! Nossa plataforma é totalmente responsiva e todas as ferramentas funcionam perfeitamente em qualquer dispositivo com acesso à internet, seja celular, tablet ou computador."
    },
    {
      question: "Como usar uma calculadora financeira corretamente?",
      answer: "O segredo é a precisão dos dados de entrada. Preencha campos como valor inicial, taxas e prazos com atenção. O resultado será calculado automaticamente com base nas fórmulas financeiras padrão do mercado."
    }
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadoras Financeiras FinZap",
    "description": "Ferramentas gratuitas para cálculo de férias, décimo terceiro, salário líquido e mais.",
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
        title: "Calculadoras Financeiras Gratuitas",
        description: "Ferramentas gratuitas para cálculo de férias, décimo terceiro, salário líquido, investimentos e mais.",
        canonical: "/calculadoras"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CALCULATOR_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [{ label: "Calculadoras", href: "/calculadoras" }] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Calculator, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Calculadoras Gratuitas" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
          "Calculadoras ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Financeiras" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Utilize nossas calculadoras gratuitas para planejar seus investimentos, calcular suas férias e organizar sua vida financeira." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/investimentos", className: "group", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(TrendingUp, { className: "text-primary w-6 h-6" }) }),
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Simulador de Investimentos" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Compare CDB, LCI, LCA e Tesouro Direto. Descubra quanto seu dinheiro pode render com juros compostos." }),
                /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
                  "Acessar ferramenta ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/ferias", className: "group", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.3 },
            className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Plane, { className: "text-primary w-6 h-6" }) }),
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Calculadora de Férias" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF." }),
                /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
                  "Acessar ferramenta ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/energia", className: "group", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Zap, { className: "text-primary w-6 h-6" }) }),
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Consumo de Energia" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Descubra quanto seus aparelhos consomem e economize na conta de luz." }),
                /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
                  "Acessar ferramenta ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/combustivel", className: "group", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.5 },
            className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Fuel, { className: "text-primary w-6 h-6" }) }),
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Álcool ou Gasolina" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Descubra qual combustível compensa mais para abastecer seu veículo e economize no posto." }),
                /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
                  "Acessar ferramenta ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/rescisao", className: "group", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.6 },
            className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Calculator, { className: "text-primary w-6 h-6" }) }),
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Rescisão Trabalhista" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Simule sua rescisão CLT. Calcule saldo de salário, férias, 13º, aviso prévio e multa do FGTS." }),
                /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
                  "Acessar ferramenta ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/inss", className: "group", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.7 },
            className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Calculator, { className: "text-primary w-6 h-6" }) }),
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Calculadora de INSS" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Simule o desconto do INSS 2025. Tabela progressiva atualizada para CLT, Autônomos e Pro-labore." }),
                /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
                  "Acessar ferramenta ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              ] })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto space-y-16", children: [
        /* @__PURE__ */ jsxs("section", { className: "text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Calculadoras Online: Ferramentas para Decisões Financeiras" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg leading-relaxed", children: "As calculadoras online do FinZap são ferramentas digitais desenvolvidas para facilitar o cálculo de diferentes tipos de informações de forma automatizada. Elas funcionam diretamente no navegador, sem necessidade de instalação, e oferecem resultados imediatos com base nos dados fornecidos. Seja para resolver questões financeiras, trabalhistas ou de planejamento, nossas ferramentas ajudam você a economizar tempo, evitar erros manuais e tomar decisões mais conscientes." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [
          /* @__PURE__ */ jsxs("section", { className: "bg-white/5 rounded-3xl p-8 border border-white/10", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-white mb-6 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Zap, { className: "text-primary w-6 h-6" }),
              "Por que usar nossas calculadoras?"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Precisão nos cálculos:" }),
                  " Reduz erros comuns em contas complexas e segue as regras vigentes."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Rapidez e praticidade:" }),
                  " Resultados instantâneos com poucos cliques."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Gratuidade:" }),
                  " Ferramentas 100% gratuitas e sem necessidade de cadastro."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Acessível em qualquer lugar:" }),
                  " Funciona no celular, tablet ou computador."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "bg-white/5 rounded-3xl p-8 border border-white/10", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-white mb-6 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Calculator, { className: "text-primary w-6 h-6" }),
              "Como usar corretamente"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsx("span", { children: "Escolha a calculadora adequada para sua necessidade específica." })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsx("span", { children: "Informe os dados corretamente nos campos indicados (atenção aos valores brutos)." })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "3" }),
                /* @__PURE__ */ jsx("span", { children: "Revise os valores inseridos antes de clicar em calcular." })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "4" }),
                /* @__PURE__ */ jsx("span", { children: "Analise o resultado e, se necessário, faça novas simulações com cenários diferentes." })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(
        FAQ,
        {
          title: "Dúvidas Frequentes sobre Calculadoras",
          items: CALCULATOR_FAQS,
          showSocialProof: false
        }
      ) }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) }), children: /* @__PURE__ */ jsx(AppPromoBanner, {}) }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
        /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
        " As ferramentas disponibilizadas neste site são apenas para fins informativos e educacionais. Embora busquemos manter os cálculos e fórmulas atualizados, não nos responsabilizamos por eventuais divergências, perdas ou decisões tomadas com base nos resultados obtidos. Consulte sempre um profissional para orientações específicas ao seu caso."
      ] }) })
    ] })
  ] });
};
export {
  Calculators
};
