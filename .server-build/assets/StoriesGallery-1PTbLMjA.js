import { jsxs, jsx } from "react/jsx-runtime";
import { Zap, Play, ArrowRight } from "lucide-react";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { s as storiesData } from "./stories-BQ4sUJVe.js";
import "../entry-server.js";
import "react";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
const StoriesGallery = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Web Stories Financeiras - Dicas Rápidas | Junny",
        description: "Confira nossas Web Stories com dicas rápidas de finanças, FGTS, investimentos e economia em formato visual e direto ao ponto.",
        canonical: "/stories"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(Breadcrumb, { items: [
        { label: "Stories", href: "/stories" }
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-yellow-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Conteúdo Rápido" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6", children: [
          "Junny ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Stories" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Dicas financeiras, tutoriais e novidades em formato de tela cheia. Rápido de ler, fácil de entender." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: storiesData.map((story, index) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/stories/${story.slug}`,
          className: "group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-gray-900",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: story.posterPortrait,
                alt: story.title,
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2", children: [
                /* @__PURE__ */ jsx(Play, { className: "w-3 h-3 fill-current" }),
                "Web Story"
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors", children: story.title }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-400 text-sm font-medium group-hover:text-white transition-colors", children: [
                "Ver agora ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            ] })
          ]
        },
        story.slug
      )) })
    ] })
  ] });
};
export {
  StoriesGallery
};
//# sourceMappingURL=StoriesGallery-1PTbLMjA.js.map
