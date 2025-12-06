import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { b as blogService } from "./blogService-CkskM1UR.js";
import { P as PostCard } from "./PostCard-Cr4-3bwu.js";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
const LatestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await blogService.getPosts();
        setPosts(allPosts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  if (!loading && posts.length === 0) return null;
  return /* @__PURE__ */ jsxs("section", { className: "py-24 bg-[#0d0d0d] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-end justify-between mb-12 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: [
            "Últimas do ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Blog" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-xl", children: "Fique por dentro das novidades, dicas de economia e estratégias para dominar suas finanças." })
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/blog",
            className: "group flex items-center gap-2 text-primary font-medium hover:text-emerald-400 transition-colors",
            children: [
              "Ver todos os artigos",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
            ]
          }
        )
      ] }),
      loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-[400px] bg-white/5 rounded-2xl animate-pulse border border-white/5" }, i)) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.id)) })
    ] })
  ] });
};
export {
  LatestPosts
};
//# sourceMappingURL=LatestPosts-BjHD6QCo.js.map
