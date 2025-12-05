import { jsxs, jsx } from "react/jsx-runtime";
import { HelpCircle, MessageCircle, ArrowRight, Mail } from "lucide-react";
import { S as SEO, F as FAQ } from "../entry-server.js";
import "react";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "framer-motion";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
const Support = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Central de Ajuda - Suporte Junny",
        description: "Precisa de ajuda? Entre em contato com o suporte da Junny via WhatsApp ou E-mail, ou consulte nossas perguntas frequentes.",
        canonical: "/support"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(HelpCircle, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Central de Ajuda" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
          "Como podemos ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "ajudar você?" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Escolha um dos canais abaixo para falar com nossa equipe ou tire suas dúvidas na nossa seção de perguntas frequentes." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "group relative bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/20", children: /* @__PURE__ */ jsx(MessageCircle, { className: "text-primary w-7 h-7" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "WhatsApp" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Fale diretamente com nosso suporte técnico pelo WhatsApp. Ideal para dúvidas rápidas e suporte em tempo real." }),
            /* @__PURE__ */ jsxs("a", { href: "#", className: "inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all", children: [
              "Iniciar conversa ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "group relative bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/20", children: /* @__PURE__ */ jsx(Mail, { className: "text-primary w-7 h-7" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "E-mail" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Para assuntos mais complexos, parcerias ou feedback detalhado. Respondemos em até 24 horas úteis." }),
            /* @__PURE__ */ jsxs("a", { href: "mailto:suporte@junny.com.br", className: "inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all", children: [
              "Enviar e-mail ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(FAQ, { items: [
        {
          question: "Como entro em contato com o suporte técnico?",
          answer: "Você pode nos contatar via WhatsApp para respostas rápidas ou por e-mail para questões mais complexas. Nossos canais estão listados acima."
        },
        {
          question: "Esqueci minha senha, como recupero?",
          answer: "Na tela de login, clique em 'Esqueci minha senha'. Enviaremos um link de redefinição para o seu e-mail cadastrado."
        },
        {
          question: "Como funciona o reembolso?",
          answer: "Se você não estiver satisfeito nos primeiros 7 dias, devolvemos 100% do seu dinheiro. Basta solicitar pelo suporte."
        },
        {
          question: "Posso alterar meu plano a qualquer momento?",
          answer: "Sim, você pode fazer upgrade ou downgrade do seu plano diretamente nas configurações da sua conta."
        },
        {
          question: "Onde encontro minhas notas fiscais?",
          answer: "Todas as notas fiscais de pagamento da assinatura são enviadas para seu e-mail e também ficam disponíveis no painel do usuário."
        }
      ] }) })
    ] })
  ] });
};
export {
  Support
};
//# sourceMappingURL=Support-CYA3E9eE.js.map
