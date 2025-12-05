import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { AppPromoBanner } from "./AppPromoBanner-BHihqQwm.js";
import { u as useServerData, S as SEO, F as FAQ, b as blogService } from "../entry-server.js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, BookOpen } from "lucide-react";
import "framer-motion";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "@supabase/supabase-js";
const PostContent = ({ content }) => {
  const contentRef = React.useRef(null);
  React.useEffect(() => {
    if (!contentRef.current) return;
    const links = contentRef.current.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const href = link.getAttribute("href");
      if (href && (href.startsWith("/") || href.startsWith(window.location.origin))) {
        link.removeAttribute("target");
      }
    }
  }, [content]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: contentRef,
      className: "prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white prose-code:text-primary prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-white/10",
      dangerouslySetInnerHTML: { __html: content }
    }
  );
};
const BlogPost = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const { category, slug } = useParams();
  const serverData = useServerData();
  const [post, setPost] = useState(
    serverData && serverData.slug === slug ? serverData : null
  );
  const [loading, setLoading] = useState(!post);
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug || post) return;
      const data = await blogService.getPostBySlug(slug);
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug, post]);
  if (loading) {
    return /* @__PURE__ */ jsx("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto space-y-8 animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-white/5 rounded w-3/4" }),
      /* @__PURE__ */ jsx("div", { className: "h-64 bg-white/5 rounded-2xl" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/5 rounded" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/5 rounded" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/5 rounded w-5/6" })
      ] })
    ] }) }) });
  }
  if (!post) {
    return /* @__PURE__ */ jsx("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 text-center py-20", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl text-white", children: "Post não encontrado" }) }) });
  }
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.cover_image,
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "author": {
      "@type": "Person",
      "name": ((_a = post.author) == null ? void 0 : _a.name) || "Junny Team",
      "url": (_b = post.author) == null ? void 0 : _b.linkedin_url,
      "jobTitle": (_c = post.author) == null ? void 0 : _c.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "Junny",
      "logo": {
        "@type": "ImageObject",
        "url": "https://junny.com.br/logo.png"
      }
    },
    "description": post.meta_description || post.excerpt
  };
  const faqSchema = post.faq && post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        canonical: `https://junny.com.br/blog/${((_d = post.category) == null ? void 0 : _d.slug) || "geral"}/${post.slug}`,
        image: post.cover_image
      }
    ),
    /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(blogPostingSchema) }
      }
    ),
    faqSchema && /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(faqSchema) }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("article", { className: "max-w-7xl mx-auto relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [
        { label: "Blog", href: "/blog" },
        ...post.category ? [{ label: post.category.name, href: `/blog/${post.category.slug}` }] : [],
        { label: post.title, href: `/blog/${((_e = post.category) == null ? void 0 : _e.slug) || "geral"}/${post.slug}` }
      ] }),
      /* @__PURE__ */ jsxs("header", { className: "mb-12 text-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-start justify-start gap-4 text-sm text-gray-400 mb-6", children: [
          post.category && /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20", children: post.category.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
              format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: ptBR })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4" }),
              post.reading_time || 5,
              " min de leitura"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-bold text-white mb-6 leading-tight", children: post.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-300 max-w-2xl mr-auto leading-relaxed", children: post.excerpt }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start gap-3 mt-8", children: [
          ((_f = post.author) == null ? void 0 : _f.avatar_url) && /* @__PURE__ */ jsx("img", { src: post.author.avatar_url, alt: post.author.name, className: "w-10 h-10 rounded-full border border-white/10" }),
          /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: (_g = post.author) == null ? void 0 : _g.name }),
            ((_h = post.author) == null ? void 0 : _h.role) && /* @__PURE__ */ jsx("p", { className: "text-xs text-primary mb-0.5", children: post.author.role }),
            ((_i = post.author) == null ? void 0 : _i.bio) && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: post.author.bio })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-12 rounded-2xl overflow-hidden border border-white/5 shadow-2xl", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: `${post.cover_image}?width=1200&quality=80&format=webp`,
          srcSet: `
                                ${post.cover_image}?width=600&quality=80&format=webp 600w,
                                ${post.cover_image}?width=900&quality=80&format=webp 900w,
                                ${post.cover_image}?width=1200&quality=80&format=webp 1200w
                            `,
          sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px",
          alt: post.cover_image_alt,
          className: "w-full h-auto",
          width: 1200,
          height: 630,
          loading: "eager",
          decoding: "async"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx(PostContent, { content: post.content }) })
    ] }) }),
    post.faq && post.faq.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-20 relative z-10", children: /* @__PURE__ */ jsx(FAQ, { items: post.faq, title: "Perguntas Frequentes", showSocialProof: false }) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 relative z-10 mt-16", children: /* @__PURE__ */ jsx(AppPromoBanner, {}) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
      /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
      " O conteúdo disponibilizado neste blog é apenas para fins informativos e educacionais. Embora busquemos manter as informações atualizadas, não nos responsabilizamos por eventuais divergências ou decisões tomadas com base nos artigos. Consulte sempre um profissional para orientações específicas ao seu caso."
    ] }) }) })
  ] });
};
export {
  BlogPost
};
//# sourceMappingURL=BlogPost-BGHzaazM.js.map
