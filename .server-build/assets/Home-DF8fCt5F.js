import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const Hero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex flex-col items-center justify-center pt-36 pb-24 md:pt-48 md:pb-32 px-4 overflow-hidden max-w-[100vw]", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-10 text-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "w-24 h-24 md:w-28 md:h-28 mb-4 relative flex items-center justify-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl blur-xl" }),
            /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full bg-[#0d0d0d] border border-primary/30 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(71,255,183,0.15)]", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "w-12 h-12 text-primary", strokeWidth: 1.5 }),
              /* @__PURE__ */ jsx("div", { className: "absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-[#0d0d0d]", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-black", children: "AI" }) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "h1",
        {
          className: "text-4xl md:text-6xl lg:text-7xl font-medium leading-tight text-white tracking-tight",
          children: [
            "Controle financeiro no ",
            /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
            "WhatsApp com ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500", children: "Inteligência Artificial" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.4 },
          className: "text-lg md:text-xl text-muted max-w-2xl font-light",
          children: [
            /* @__PURE__ */ jsx("span", { className: "font-normal text-white", children: "Esqueça as planilhas chatas." }),
            " Basta enviar um áudio ou mensagem e nossa IA categoriza, organiza e gera relatórios em segundos."
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.6 },
          children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://app.junny.com.br/criar-conta",
              className: "inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#008c69] to-[#008c69] hover:brightness-110 text-white font-bold text-lg rounded-full transition-all shadow-[0_0_30px_rgba(71,255,183,0.2)] hover:shadow-[0_0_50px_rgba(71,255,183,0.4)] text-center uppercase tracking-wide transform hover:scale-[1.02]",
              children: "Testar Grátis Agora"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1, delay: 1 },
          className: "flex items-center gap-4 mt-8",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex -space-x-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full border-2 border-background overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: `https://picsum.photos/50/50?random=${i + 40}`, alt: "Foto de perfil de cliente satisfeito da Junny", width: 40, height: 40, className: "w-full h-full object-cover" }) }, i)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex text-yellow-400 text-xs gap-0.5", children: "★★★★★".split("").map((star, i) => /* @__PURE__ */ jsx("span", { children: star }, i)) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-300", children: "15mil + usuários" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "mt-20 w-full max-w-6xl mx-auto perspective-1000 relative z-0",
        style: { perspective: "1200px" },
        children: /* @__PURE__ */ jsxs("div", { className: "relative transform rotate-x-12 scale-90 opacity-90 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(71,255,183,0.15)] bg-[#0a0a0a]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/hero.webp",
              srcSet: "/hero-mobile.webp 600w, /hero-medium.webp 900w, /hero.webp 1200w",
              sizes: "(max-width: 768px) 100vw, 1200px",
              alt: "Junny Dashboard",
              width: 1200,
              height: 563,
              decoding: "async",
              fetchPriority: "high",
              className: "w-full h-auto object-cover opacity-80"
            }
          )
        ] })
      }
    )
  ] });
};
const Hook = lazy(() => import("./Hook-BhQfSaQt.js").then((module) => ({ default: module.Hook })));
const Modules = lazy(() => import("./Modules-Dob8W85r.js").then((module) => ({ default: module.Modules })));
const Certificate = lazy(() => import("./Certificate-C4wvuvm5.js").then((module) => ({ default: module.Certificate })));
const Community = lazy(() => import("./Community-XhuN5M7f.js").then((module) => ({ default: module.Community })));
const Testimonials = lazy(() => import("./Testimonials-BLEJj5GU.js").then((module) => ({ default: module.Testimonials })));
const Price = lazy(() => import("./Price-Baj1aTBz.js").then((module) => ({ default: module.Price })));
const RecentStories = lazy(() => import("./RecentStories-Dx0J6lQ2.js").then((module) => ({ default: module.RecentStories })));
const LatestPosts = lazy(() => import("./LatestPosts-BjHD6QCo.js").then((module) => ({ default: module.LatestPosts })));
const FAQ = lazy(() => import("./FAQ-rtQ6fcXm.js").then((module) => ({ default: module.FAQ })));
const SectionLoader = () => /* @__PURE__ */ jsx("div", { className: "py-24 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) });
const Home = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Junny - Controle Financeiro Inteligente",
        description: "Gerencie suas finanças, calcule férias, rescisão e investimentos com as ferramentas gratuitas da Junny.",
        canonical: "/"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Junny",
      "url": "https://junny.com.br",
      "logo": "https://junny.com.br/favicon.ico",
      "description": "Organize suas finanças sem sair do chat. A Junny é a maneira mais simples e rápida de controlar seus gastos usando Inteligência Artificial no WhatsApp.",
      "sameAs": []
    }) }),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(SectionLoader, {}), children: /* @__PURE__ */ jsx(Hook, {}) }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(SectionLoader, {}), children: /* @__PURE__ */ jsx(Modules, {}) }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(SectionLoader, {}), children: /* @__PURE__ */ jsx(Certificate, {}) }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(SectionLoader, {}), children: /* @__PURE__ */ jsx(Community, {}) }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(SectionLoader, {}), children: /* @__PURE__ */ jsx(Testimonials, {}) }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(SectionLoader, {}), children: /* @__PURE__ */ jsx(Price, {}) }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(SectionLoader, {}), children: /* @__PURE__ */ jsx(LatestPosts, {}) }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(SectionLoader, {}), children: /* @__PURE__ */ jsx(RecentStories, {}) }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(SectionLoader, {}), children: /* @__PURE__ */ jsx(FAQ, {}) })
  ] });
};
export {
  Home
};
//# sourceMappingURL=Home-DF8fCt5F.js.map
