import { jsx, jsxs } from "react/jsx-runtime";
import { Zap, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { s as storiesData } from "./stories-BQ4sUJVe.js";
const RecentStories = () => {
  const recentStories = storiesData.slice(0, 4);
  if (recentStories.length === 0) return null;
  return /* @__PURE__ */ jsx("section", { className: "py-24 px-4 bg-surface/30 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-12 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-yellow-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dicas Rápidas" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: [
          "Web Stories ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Junny" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-xl", children: "Conteúdo visual e direto ao ponto para você aprender sobre finanças em poucos segundos." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/stories",
          className: "flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors group",
          children: [
            "Ver todas as stories",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: recentStories.map((story, index) => /* @__PURE__ */ jsxs(
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
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-wider mb-2", children: [
              /* @__PURE__ */ jsx(Play, { className: "w-3 h-3 fill-current" }),
              "Web Story"
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-sm leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2", children: story.title })
          ] })
        ]
      },
      story.slug
    )) })
  ] }) });
};
export {
  RecentStories
};
//# sourceMappingURL=RecentStories-Dx0J6lQ2.js.map
