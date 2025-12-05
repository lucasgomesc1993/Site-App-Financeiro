import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { S as SEO, P as PostCard, b as blogService } from "../entry-server.js";
import { C as CategoryList } from "./CategoryList-DJ8L_PI3.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { AppPromoBanner } from "./AppPromoBanner-BHihqQwm.js";
import { BookOpen } from "lucide-react";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (!categorySlug) return;
      setLoading(true);
      const postsData = await blogService.getPostsByCategory(categorySlug);
      setPosts(postsData);
      const categoriesData = await blogService.getAllCategories();
      setCategories(categoriesData);
      const currentCategory = categoriesData.find((c) => c.slug === categorySlug);
      setCategory(currentCategory || null);
      setLoading(false);
    };
    fetchData();
  }, [categorySlug]);
  if (!category && !loading) {
    return /* @__PURE__ */ jsx("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 text-center py-20", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl text-white", children: "Categoria não encontrada" }) }) });
  }
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: `${(category == null ? void 0 : category.name) || "Categoria"} - Blog Junny`,
        description: `Artigos sobre ${(category == null ? void 0 : category.name) || "finanças"} no blog Junny.`,
        canonical: `https://junny.com.br/blog/${categorySlug}`
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [
        { label: "Blog", href: "/blog" },
        { label: (category == null ? void 0 : category.name) || "Categoria", href: `/blog/${categorySlug}` }
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Categoria" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-4", children: category == null ? void 0 : category.name }),
        (category == null ? void 0 : category.description) && /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 max-w-2xl mx-auto", children: category.description })
      ] }),
      /* @__PURE__ */ jsx(CategoryList, { categories }),
      loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-96 bg-white/5 rounded-2xl animate-pulse" }, i)) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-24", children: [
        /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(AppPromoBanner, {}) }),
        /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
          /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
          " O conteúdo disponibilizado neste blog é apenas para fins informativos e educacionais. Embora busquemos manter as informações atualizadas, não nos responsabilizamos por eventuais divergências ou decisões tomadas com base nos artigos. Consulte sempre um profissional para orientações específicas ao seu caso."
        ] }) })
      ] })
    ] })
  ] });
};
export {
  CategoryPage
};
//# sourceMappingURL=CategoryPage-9uOpxHwe.js.map
