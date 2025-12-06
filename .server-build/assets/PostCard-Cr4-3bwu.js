import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, ArrowRight } from "lucide-react";
const CategoryBadge = ({ category, className = "" }) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: `/blog/${category.slug}`,
      className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20 whitespace-nowrap ${className}`,
      children: category.name
    }
  );
};
const PostCard = ({ post }) => {
  var _a, _b, _c, _d, _e;
  return /* @__PURE__ */ jsxs("article", { className: "group relative flex flex-col h-full bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(71,255,183,0.1)]", children: [
    /* @__PURE__ */ jsx(Link, { to: `/blog/${((_a = post.category) == null ? void 0 : _a.slug) || "geral"}/${post.slug}`, className: "block overflow-hidden aspect-video", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: post.cover_image,
        alt: post.cover_image_alt,
        className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-3 mb-4", children: [
        post.category && /* @__PURE__ */ jsx(CategoryBadge, { category: post.category }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-gray-400 gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsx("time", { dateTime: post.published_at, children: format(new Date(post.published_at), "d 'de' MMM, yyyy", { locale: ptBR }) })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-gray-600" }),
          /* @__PURE__ */ jsxs("span", { children: [
            post.reading_time || 5,
            " min de leitura"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2", children: /* @__PURE__ */ jsx(Link, { to: `/blog/${((_b = post.category) == null ? void 0 : _b.slug) || "geral"}/${post.slug}`, children: post.title }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-6 line-clamp-3 flex-1", children: post.excerpt }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-auto pt-4 border-t border-white/5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          ((_c = post.author) == null ? void 0 : _c.avatar_url) && /* @__PURE__ */ jsx("img", { src: post.author.avatar_url, alt: post.author.name, className: "w-6 h-6 rounded-full" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: (_d = post.author) == null ? void 0 : _d.name })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: `/blog/${((_e = post.category) == null ? void 0 : _e.slug) || "geral"}/${post.slug}`, className: "text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all", children: [
          "Ler artigo ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] })
    ] })
  ] });
};
export {
  PostCard as P
};
//# sourceMappingURL=PostCard-Cr4-3bwu.js.map
