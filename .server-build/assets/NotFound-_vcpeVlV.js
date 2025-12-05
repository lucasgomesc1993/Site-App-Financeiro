import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { S as SEO } from "../entry-server.js";
import "react";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
const NotFound = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden px-4", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Página não encontrada - Junny",
        description: "A página que você está procurando não existe ou foi movida.",
        canonical: "https://junny.com.br/404"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 relative inline-block", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent opacity-20 select-none", children: "404" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-4xl md:text-5xl font-bold text-white", children: "Ops!" }) })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-4", children: "Página não encontrada" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg mb-10 max-w-md mx-auto", children: "Parece que você se perdeu no mundo das finanças. A página que você procura não existe ou foi movida." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-background font-bold hover:bg-primary/90 transition-all hover:scale-105",
            children: [
              /* @__PURE__ */ jsx(Home, { className: "w-5 h-5" }),
              "Voltar para o Início"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => window.history.back(),
            className: "flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }),
              "Voltar página anterior"
            ]
          }
        )
      ] })
    ] })
  ] });
};
export {
  NotFound
};
//# sourceMappingURL=NotFound-_vcpeVlV.js.map
