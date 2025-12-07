import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Play, Search } from "lucide-react";
import { P as PostCard } from "./PostCard-Cr4-3bwu.js";
import { C as CategoryList } from "./CategoryList-DJ8L_PI3.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import { b as blogService } from "./blogService-CkskM1UR.js";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { s as storiesData } from "./stories-BQ4sUJVe.js";
import "react-router-dom";
import "date-fns";
import "date-fns/locale";
import "@supabase/supabase-js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
const StoryList = ({ stories }) => {
  if (stories.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "mb-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Web Stories" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-primary", children: "Ver todos" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide", children: stories.map((story) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: `/stories/${story.slug}`,
        className: "flex-none w-[140px] md:w-[160px] aspect-[9/16] relative rounded-xl overflow-hidden group cursor-pointer snap-start border border-white/10",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: story.posterPortrait,
              alt: story.title,
              className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20", children: /* @__PURE__ */ jsx(Play, { className: "w-3 h-3 text-white fill-white" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 p-3", children: /* @__PURE__ */ jsx("p", { className: "text-white text-sm font-medium leading-tight line-clamp-3", children: story.title }) })
        ]
      },
      story.slug
    )) })
  ] });
};
const BlogIndex = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const [postsData, categoriesData] = await Promise.all([
        blogService.getPosts(),
        blogService.getAllCategories()
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
      setLoading(false);
    };
    fetchData();
  }, []);
  const filteredPosts = posts.filter(
    (post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Blog Junny - Educação Financeira Descomplicada",
        description: "Dicas práticas de economia, investimentos e planejamento financeiro para você dominar seu dinheiro.",
        canonical: "https://junny.com.br/blog"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [{ label: "Blog", href: "/blog" }] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight", children: [
          "Blog ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Junny" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10", children: "Domine suas finanças com conteúdos práticos e diretos ao ponto." }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "O que você quer aprender hoje?",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "w-full px-6 py-4 pl-14 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all backdrop-blur-sm"
            }
          ),
          /* @__PURE__ */ jsx(Search, { className: "absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(CategoryList, { categories }),
      /* @__PURE__ */ jsxs("div", { className: "mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: searchTerm ? "Resultados da busca" : "Últimos Artigos" }) }),
        loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-96 bg-white/5 rounded-2xl animate-pulse" }, i)) }) : filteredPosts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredPosts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.id)) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-20 bg-white/5 rounded-3xl border border-white/5", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg", children: "Nenhum artigo encontrado para sua busca." }) })
      ] }),
      !searchTerm && /* @__PURE__ */ jsx(StoryList, { stories: storiesData }),
      /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(AppPromoBanner, {}) }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
        /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
        " O conteúdo disponibilizado neste blog é apenas para fins informativos e educacionais. Embora busquemos manter as informações atualizadas, não nos responsabilizamos por eventuais divergências ou decisões tomadas com base nos artigos. Consulte sempre um profissional para orientações específicas ao seu caso."
      ] }) })
    ] })
  ] });
};
export {
  BlogIndex
};
//# sourceMappingURL=BlogIndex-CaKCNcQS.js.map
