import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { PieChart, Calculator, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { F as FAQ } from "./FAQ-BvIu8Jqf.js";
import { AppPromoBanner } from "./AppPromoBanner-BwQOrylZ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const BUDGET_FAQS = [
  {
    question: "A regra se aplica ao salário bruto ou líquido?",
    answer: "A regra deve ser aplicada exclusivamente sobre o salário líquido. Isso ocorre porque o salário bruto inclui descontos obrigatórios como INSS e Imposto de Renda, que não são recursos disponíveis para você gastar. Se você calcular sobre o bruto, seu orçamento ficará irreal e você gastará dinheiro que, na prática, já foi retido pelo governo antes mesmo de cair na conta."
  },
  {
    question: "Onde entram os serviços de streaming (Netflix/Spotify)?",
    answer: "Serviços como Netflix e Spotify devem ser categorizados nos 30% de Desejos. Embora sejam importantes para o lazer, eles não são essenciais para a sobrevivência física ou manutenção do trabalho, diferentemente de contas de luz ou transporte. Em momentos de aperto financeiro, eles são os primeiros itens que podem ser cancelados ou substituídos por opções gratuitas sem afetar sua segurança básica."
  },
  {
    question: "Meus gastos essenciais passam de 50%. O que fazer?",
    answer: "Ultrapassar os 50% é um cenário comum, mas exige ação imediata. Se seus gastos fixos consomem 60% ou 70% da renda, você precisará compensar reduzindo drasticamente a categoria de Desejos (30%) temporariamente. O foco deve ser eliminar gastos supérfluos enquanto busca formas de aumentar sua renda principal ou reduzir custos fixos, como mudar para um aluguel mais barato."
  },
  {
    question: "Posso mudar as porcentagens?",
    answer: "Sim, a flexibilidade é permitida e até recomendada em certos casos. O modelo 50-30-20 serve como um norte, mas se você possui dívidas com juros altos, pode adotar temporariamente um formato 50-10-40 (apenas 10% para lazer e 40% para quitação). O mais importante é manter a intencionalidade do gasto e retornar às porcentagens originais assim que a situação financeira se estabilizar."
  },
  {
    question: "Aposentadoria entra nos 20%?",
    answer: "Com certeza. A aposentadoria é o principal pilar dos 20% para Objetivos Financeiros. Esta categoria não serve apenas para emergências de curto prazo, mas para garantir sua liberdade no futuro. Ao destinar parte dessa fatia para investimentos de longo prazo, você aproveita os juros compostos para acelerar a construção de patrimônio e atingir metas como o seu Primeiro Milhão mais rapidamente."
  }
];
function Budget503020Page() {
  const [income, setIncome] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const val = parseFloat(income.replace(/\./g, "").replace(",", "."));
    if (isNaN(val) || val === 0) {
      setResult(null);
      return;
    }
    setResult({
      needs: val * 0.5,
      wants: val * 0.3,
      savings: val * 0.2
    });
  };
  useEffect(() => {
    calculate();
  }, [income]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora Regra 50-30-20: Organize Seu Orçamento Agora",
    "description": "Descubra como aplicar a regra 50-30-20 no seu salário líquido. Aprenda a dividir gastos entre necessidades, desejos e investimentos de forma simples.",
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
        title: "Calculadora Regra 50-30-20: Organize Seu Orçamento Agora",
        description: "Descubra como aplicar a regra 50-30-20 no seu salário líquido. Aprenda a dividir gastos entre necessidades, desejos e investimentos de forma simples.",
        canonical: "/calculadoras/regra-50-30-20"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": BUDGET_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Regra 50-30-20", href: "/calculadoras/regra-50-30-20" }
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
                /* @__PURE__ */ jsx(PieChart, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500", children: "Regra 50-30-20" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto text-lg text-gray-400 space-y-4 hidden" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full min-h-[600px]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
                "Dividir Orçamento"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Sua Renda Mensal Líquida" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: income,
                        onChange: (e) => handleCurrencyInput(e.target.value, setIncome),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                    "Use nossa ",
                    /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de Salário Líquido" }),
                    " para saber o valor exato."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5 space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400 font-bold block mb-1", children: "50% - Necessidades (Obrigatório)" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Aluguel, contas, mercado, transporte" })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.needs.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 font-bold block mb-1", children: "30% - Desejos (Estilo de Vida)" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Lazer, streaming, jantar fora" })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.wants.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-emerald-400 font-bold block mb-1", children: "20% - Objetivos (O Futuro)" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Investimentos, reserva, dívidas" })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.savings.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Você chega ao fim do mês e se pergunta para onde foi o seu dinheiro? A sensação de trabalhar muito e não ver a cor da grana é mais comum do que parece. A ",
            /* @__PURE__ */ jsx("strong", { children: "Regra 50-30-20" }),
            ' não é mágica, é matemática simples aplicada à vida real para acabar com esse ciclo de "pagar boletos e ficar zerado".'
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Criado pela senadora norte-americana e especialista em falências Elizabeth Warren, no livro ",
            /* @__PURE__ */ jsx("em", { children: "All Your Worth" }),
            ", este método divide sua renda em três caixas lógicas. O objetivo é tirar o peso da decisão de cada pequena compra e automatizar seu sucesso financeiro."
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold mb-6 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-emerald-500" }),
                "Como Funciona a Divisão"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "A divisão 50-30-20 é um método de orçamento que fragmenta a renda líquida em três categorias percentuais fixas. Veja onde cada centavo deve ir:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-blue-400 block", children: "50% para Necessidades" }),
                      "Metade da sua renda líquida deve cobrir tudo aquilo que é essencial para você viver e trabalhar."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-purple-400 block", children: "30% para Desejos" }),
                      "Esta categoria destina-se a gastos não essenciais ligados ao estilo de vida e lazer."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-emerald-400 block", children: "20% para Objetivos" }),
                      "Esta parcela deve ser alocada exclusivamente para a construção de patrimônio, quitação de dívidas e reservas futuras."
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6 text-center", children: "Exemplo Prático: Salário de R$ 3.000,00" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-center max-w-3xl mx-auto mb-8", children: "Veja como ficaria a distribuição exata na tabela abaixo para um salário líquido de R$ 3.000,00:" }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Categoria" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Porcentagem" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Valor (R$)" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Onde gastar?" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4 font-bold text-blue-400", children: "Necessidades" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "50%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 1.500,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "Aluguel, Luz, Feira, Ônibus." })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4 font-bold text-purple-400", children: "Desejos" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "30%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 900,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "Cinema, Ifood, Roupas, Lazer." })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4 font-bold text-emerald-400", children: "Objetivos" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "20%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 600,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "Tesouro Direto, CDBs, Reserva." })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 text-center text-gray-400", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "Se as suas contas básicas ultrapassam 50%, você está em uma zona de risco. Talvez seja necessário rever parcelamentos ou quitar aquela ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/divida-cartao-credito", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Dívida de Cartão de Crédito" }),
                " que está comendo seu orçamento."
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
                "Para a parcela de 20%, use nosso ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/investimentos", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Simulador de Investimentos" }),
                " para ver seu dinheiro crescer."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: BUDGET_FAQS,
          title: "Perguntas Frequentes sobre a Regra 50-30-20",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  Budget503020Page
};
//# sourceMappingURL=Budget503020Page-C9NUl37F.js.map
