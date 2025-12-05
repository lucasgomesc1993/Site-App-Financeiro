import { jsxs, jsx } from "react/jsx-runtime";
import { Calculator, Plane, DollarSign, Calendar, Clock, Briefcase, Moon, PiggyBank, Building2, Award, TrendingUp, Flame, BarChart3, Gem, PieChart, History, Globe, Home, Car, FileText, CreditCard, Tag, Scale, QrCode, Gift, Zap, Fuel, Layers, ChefHat, Divide, Percent, Activity, Droplets, Baby, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { S as SEO, F as FAQ } from "../entry-server.js";
import { AppPromoBanner } from "./AppPromoBanner-BHihqQwm.js";
import "react";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "framer-motion";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
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
  const categories = [
    {
      title: "Trabalhistas e Previdenciárias",
      color: "blue",
      items: [
        { title: "Férias", description: "Calcule o valor exato das suas férias.", icon: Plane, href: "/calculadoras/ferias" },
        { title: "Rescisão", description: "Simule sua rescisão CLT completa.", icon: Calculator, href: "/calculadoras/rescisao" },
        { title: "INSS", description: "Simule o desconto do INSS 2025.", icon: Calculator, href: "/calculadoras/inss" },
        { title: "Salário Líquido", description: "Descubra quanto vai cair na conta.", icon: DollarSign, href: "/calculadoras/salario-liquido" },
        { title: "Décimo Terceiro", description: "Simule o valor do seu 13º salário.", icon: Calendar, href: "/calculadoras/decimo-terceiro" },
        { title: "Horas Extras", description: "Simule o valor com adicionais.", icon: Clock, href: "/calculadoras/horas-extras" },
        { title: "Seguro-Desemprego", description: "Simule valor e parcelas.", icon: Briefcase, href: "/calculadoras/seguro-desemprego" },
        { title: "Adicional Noturno", description: "Descubra o valor com acréscimo.", icon: Moon, href: "/calculadoras/adicional-noturno" },
        { title: "FGTS", description: "Simule o rendimento do seu FGTS.", icon: PiggyBank, href: "/calculadoras/fgts" },
        { title: "Custo Funcionário", description: "Descubra o custo real para a empresa.", icon: Building2, href: "/calculadoras/custo-funcionario" },
        { title: "PLR e IRRF", description: "Simule o desconto do IR sobre PLR.", icon: Award, href: "/calculadoras/plr" },
        { title: "Calculadora de Horas", description: "Some e subtraia horas e minutos.", icon: Clock, href: "/calculadoras/horas" },
        { title: "Dias Úteis", description: "Conte prazos excluindo feriados.", icon: Calendar, href: "/calculadoras/dias-uteis" }
      ]
    },
    {
      title: "Investimentos e Planejamento",
      color: "emerald",
      items: [
        { title: "Simulador Investimentos", description: "Compare CDB, LCI, LCA e Tesouro.", icon: TrendingUp, href: "/calculadoras/investimentos" },
        { title: "FIRE", description: "Quanto juntar para parar de trabalhar?", icon: Flame, href: "/calculadoras/fire" },
        { title: "Juros Compostos", description: "Simule o crescimento do patrimônio.", icon: BarChart3, href: "/calculadoras/juros-compostos" },
        { title: "Primeiro Milhão", description: "Simule quanto investir por mês.", icon: Gem, href: "/calculadoras/primeiro-milhao" },
        { title: "Regra 50-30-20", description: "Organize suas finanças pessoais.", icon: PieChart, href: "/calculadoras/regra-50-30-20" },
        { title: "Poder de Compra", description: "Corrija valores pela inflação.", icon: History, href: "/calculadoras/poder-de-compra" },
        { title: "Conversor Moedas", description: "Converta Real, Dólar e Euro.", icon: Globe, href: "/calculadoras/conversor-moedas" }
      ]
    },
    {
      title: "Empréstimos e Financiamentos",
      color: "purple",
      items: [
        { title: "Financiamento Imóvel", description: "SAC ou Price? Compare tabelas.", icon: Home, href: "/calculadoras/financiamento-imobiliario" },
        { title: "Financiamento Veículo", description: "Simule parcelas de carro ou moto.", icon: Car, href: "/calculadoras/financiamento-veiculos" },
        { title: "Quitação Antecipada", description: "Descubra o desconto ao antecipar.", icon: PiggyBank, href: "/calculadoras/quitacao-antecipada" },
        { title: "Custo Efetivo (CET)", description: "Descubra os juros reais.", icon: FileText, href: "/calculadoras/custo-efetivo-total" },
        { title: "Dívida Cartão", description: "Simule o efeito bola de neve.", icon: CreditCard, href: "/calculadoras/divida-cartao-credito" }
      ]
    },
    {
      title: "Empresariais e Empreendedorismo",
      color: "amber",
      items: [
        { title: "DAS MEI", description: "Calcule o valor da sua guia.", icon: Building2, href: "/calculadoras/das-mei" },
        { title: "Markup", description: "Defina o preço de venda ideal.", icon: Tag, href: "/calculadoras/markup" },
        { title: "Ponto de Equilíbrio", description: "Quanto vender para não ter prejuízo.", icon: Scale, href: "/calculadoras/ponto-de-equilibrio" },
        { title: "Simples vs Presumido", description: "Compare regimes tributários.", icon: FileText, href: "/calculadoras/simples-vs-presumido" },
        { title: "Capital de Giro", description: "Quanto ter em caixa.", icon: DollarSign, href: "/calculadoras/capital-de-giro" },
        { title: "ROI", description: "Eficiência dos investimentos.", icon: BarChart3, href: "/calculadoras/roi" }
      ]
    },
    {
      title: "Dia a Dia e Utilidades",
      color: "rose",
      items: [
        { title: "Gerador de Pix", description: "Crie QR Codes Pix personalizados.", icon: QrCode, href: "/calculadoras/gerador-pix" },
        { title: "Amigo Secreto", description: "Sorteio rápido e imparcial.", icon: Gift, href: "/calculadoras/amigo-secreto" },
        { title: "Energia", description: "Calcule o consumo de aparelhos.", icon: Zap, href: "/calculadoras/energia" },
        { title: "Combustível", description: "Álcool ou Gasolina?", icon: Fuel, href: "/calculadoras/combustivel" },
        { title: "Alugar ou Financiar", description: "Vale a pena comprar ou alugar?", icon: Home, href: "/calculadoras/alugar-ou-financiar" },
        { title: "Uber ou Carro", description: "Qual compensa mais?", icon: Car, href: "/calculadoras/uber-ou-carro" },
        { title: "Custo de Viagem", description: "Combustível e pedágios.", icon: Car, href: "/calculadoras/custo-viagem" },
        { title: "Churrasco", description: "Quantidade de carne e bebida.", icon: Flame, href: "/calculadoras/churrasco" },
        { title: "Tijolos e Pisos", description: "Quantidade de material.", icon: Layers, href: "/calculadoras/tijolos-pisos" },
        { title: "Conversor Culinário", description: "Xícaras para gramas.", icon: ChefHat, href: "/calculadoras/conversor-culinario" }
      ]
    },
    {
      title: "Matemática e Saúde",
      color: "cyan",
      items: [
        { title: "Regra de Três", description: "Resolva problemas de proporção.", icon: Divide, href: "/calculadoras/regra-de-tres" },
        { title: "Porcentagem", description: "Calcule descontos e aumentos.", icon: Percent, href: "/calculadoras/porcentagem" },
        { title: "IMC", description: "Descubra se seu peso está ideal.", icon: Activity, href: "/calculadoras/imc" },
        { title: "Água", description: "Meta diária de hidratação.", icon: Droplets, href: "/calculadoras/agua" },
        { title: "Idade Gestacional", description: "Data provável do parto.", icon: Baby, href: "/calculadoras/idade-gestacional" }
      ]
    }
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadoras Financeiras Junny",
    "description": "Ferramentas gratuitas para cálculo de férias, décimo terceiro, salário líquido e mais.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        border: "border-blue-500",
        text: "text-blue-500",
        bg: "bg-blue-500/10",
        hoverBorder: "hover:border-blue-500/30",
        gradient: "from-blue-500/5"
      },
      emerald: {
        border: "border-emerald-500",
        text: "text-emerald-500",
        bg: "bg-emerald-500/10",
        hoverBorder: "hover:border-emerald-500/30",
        gradient: "from-emerald-500/5"
      },
      purple: {
        border: "border-purple-500",
        text: "text-purple-500",
        bg: "bg-purple-500/10",
        hoverBorder: "hover:border-purple-500/30",
        gradient: "from-purple-500/5"
      },
      amber: {
        border: "border-amber-500",
        text: "text-amber-500",
        bg: "bg-amber-500/10",
        hoverBorder: "hover:border-amber-500/30",
        gradient: "from-amber-500/5"
      },
      rose: {
        border: "border-rose-500",
        text: "text-rose-500",
        bg: "bg-rose-500/10",
        hoverBorder: "hover:border-rose-500/30",
        gradient: "from-rose-500/5"
      },
      cyan: {
        border: "border-cyan-500",
        text: "text-cyan-500",
        bg: "bg-cyan-500/10",
        hoverBorder: "hover:border-cyan-500/30",
        gradient: "from-cyan-500/5"
      }
    };
    return colors[color] || colors.blue;
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
      /* @__PURE__ */ jsx("div", { className: "space-y-16", children: categories.map((category, index) => {
        const colors = getColorClasses(category.color);
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h2", { className: `text-2xl font-bold text-white pl-2 border-l-4 ${colors.border}`, children: category.title }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4", children: category.items.map((item, itemIndex) => /* @__PURE__ */ jsx(Link, { to: item.href, className: "group", children: /* @__PURE__ */ jsxs("div", { className: `bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-3 md:p-5 hover:bg-[#1a1a1a]/80 transition-all duration-300 ${colors.hoverBorder} h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] flex flex-col`, children: [
            /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity` }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [
              /* @__PURE__ */ jsx("div", { className: `w-8 h-8 md:w-10 md:h-10 ${colors.bg} rounded-lg flex items-center justify-center mb-3 border border-white/5 group-hover:scale-110 transition-transform`, children: /* @__PURE__ */ jsx(item.icon, { className: `${colors.text} w-4 h-4 md:w-5 md:h-5` }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm md:text-base font-bold text-white mb-1 md:mb-2 leading-tight line-clamp-2", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 line-clamp-2 md:line-clamp-3 mb-2 md:mb-4 flex-grow hidden md:block", children: item.description }),
              /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 ${colors.text} text-xs font-bold group-hover:gap-2 transition-all mt-auto`, children: [
                "Acessar ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] }) }, itemIndex)) })
        ] }, index);
      }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(
        FAQ,
        {
          title: "Dúvidas Frequentes sobre Calculadoras",
          items: CALCULATOR_FAQS,
          showSocialProof: false
        }
      ) }),
      /* @__PURE__ */ jsx(AppPromoBanner, {}),
      /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
        /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
        " As ferramentas disponibilizadas neste site são apenas para fins informativos e educacionais. Embora busquemos manter os cálculos e fórmulas atualizados, não nos responsabilizamos por eventuais divergências, perdas ou decisões tomadas com base nos resultados obtidos. Consulte sempre um profissional para orientações específicas ao seu caso."
      ] }) })
    ] })
  ] });
};
export {
  Calculators
};
//# sourceMappingURL=Calculators-BxPIhWJr.js.map
