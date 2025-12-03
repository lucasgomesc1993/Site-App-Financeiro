import { jsxs, jsx } from "react/jsx-runtime";
import { Lock, FileText, Eye, ShieldCheck, Share2 } from "lucide-react";
import { S as SEO } from "../entry-server.js";
import "react";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "framer-motion";
import "@google/genai";
import "qrcode.react";
import "date-fns";
import "date-fns/locale";
import "@supabase/supabase-js";
const Privacy = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Política de Privacidade - FinZap",
        description: "Saiba como o FinZap coleta, usa e protege seus dados pessoais. Sua privacidade é nossa prioridade.",
        canonical: "/privacy"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Segurança" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
          "Política de ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Privacidade" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Sua privacidade é nossa prioridade. Saiba como protegemos e utilizamos seus dados." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8 pb-8 border-b border-white/5", children: [
          /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-primary" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-400", children: [
            "Última atualização: ",
            (/* @__PURE__ */ new Date()).getFullYear()
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5 text-primary" }) }),
              "Coleta de Dados"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed pl-[52px]", children: "Coletamos as informações que você nos fornece diretamente, como seu número de telefone, nome e os dados financeiros que você envia através do WhatsApp para processamento pela nossa IA. Também coletamos dados técnicos de acesso para melhoria contínua da plataforma." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5 text-primary" }) }),
              "Uso das Informações"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed pl-[52px]", children: "Usamos suas informações para:" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-2 pl-[52px] mt-3 text-gray-400", children: [
              /* @__PURE__ */ jsx("li", { children: "Fornecer, manter e melhorar nossos serviços" }),
              /* @__PURE__ */ jsx("li", { children: "Processar suas transações financeiras via IA" }),
              /* @__PURE__ */ jsx("li", { children: "Enviar relatórios e insights personalizados" }),
              /* @__PURE__ */ jsx("li", { children: "Detectar e prevenir fraudes" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsx(Lock, { className: "w-5 h-5 text-primary" }) }),
              "Segurança"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed pl-[52px]", children: "Implementamos medidas de segurança técnicas e organizacionais de nível bancário para proteger seus dados pessoais. Utilizamos criptografia de ponta a ponta (E2EE) para todas as comunicações e armazenamento seguro em nuvem com redundância." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsx(Share2, { className: "w-5 h-5 text-primary" }) }),
              "Compartilhamento"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed pl-[52px]", children: "Não vendemos nem alugamos suas informações pessoais para terceiros. Compartilhamos dados apenas quando estritamente necessário para a prestação do serviço (ex: processadores de pagamento) ou quando exigido por lei." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
export {
  Privacy
};
