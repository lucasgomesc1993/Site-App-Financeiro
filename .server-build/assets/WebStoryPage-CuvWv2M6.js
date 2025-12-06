import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Wallet, VolumeX, Volume2, X, ChevronRight } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { H as Helmet } from "../entry-server.js";
import { s as storiesData } from "./stories-BQ4sUJVe.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const WebStoryPage = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const story = storiesData.find((s) => s.slug === storyId) || null;
  const currentSlide = story == null ? void 0 : story.slides[currentSlideIndex];
  useEffect(() => {
    if (!story) return;
  }, [story]);
  const goNext = () => {
    if (story && currentSlideIndex < story.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  };
  const goPrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };
  if (!story) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black flex items-center justify-center text-white", children: [
      /* @__PURE__ */ jsx("p", { children: "História não encontrada." }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "ml-4 text-primary underline", children: "Voltar" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 bg-black z-50 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        story.title,
        " | Web Stories"
      ] }),
      /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#000000" }),
      /* @__PURE__ */ jsx("link", { rel: "amphtml", href: `https://junny.com.br/amp-stories/${story.slug}.html` }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "headline": story.title,
        "image": [story.posterPortrait],
        "datePublished": (/* @__PURE__ */ new Date()).toISOString(),
        "author": {
          "@type": "Organization",
          "name": story.publisher,
          "logo": {
            "@type": "ImageObject",
            "url": story.publisherLogo
          }
        },
        "publisher": {
          "@type": "Organization",
          "name": "Junny",
          "logo": {
            "@type": "ImageObject",
            "url": "https://junny.com.br/favicon.ico"
          }
        }
      }) })
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "relative w-full h-full md:w-[400px] md:h-[90vh] md:rounded-2xl overflow-hidden bg-gray-900 shadow-2xl",
        drag: "y",
        dragConstraints: { top: 0, bottom: 0 },
        dragElastic: { top: 0, bottom: 0.6 },
        onDragEnd: (_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 200) {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-0 w-full px-2 flex gap-1 z-30", children: story.slides.map((slide, index) => /* @__PURE__ */ jsx("div", { className: "h-1 flex-1 bg-white/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full bg-white",
              style: {
                width: index < currentSlideIndex ? "100%" : index > currentSlideIndex ? "0%" : "auto",
                animation: index === currentSlideIndex ? `story-progress ${(currentSlide == null ? void 0 : currentSlide.duration) || 5}s linear forwards` : "none",
                animationPlayState: isPaused ? "paused" : "running"
              },
              onAnimationEnd: () => {
                if (index === currentSlideIndex) {
                  goNext();
                }
              }
            }
          ) }, slide.id)) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-8 left-4 flex items-center gap-2 z-30", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  if (window.history.length > 1) {
                    navigate(-1);
                  } else {
                    navigate("/");
                  }
                },
                className: "text-white",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-8 h-8 drop-shadow-md" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsx(Wallet, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-medium drop-shadow-md", children: story.publisher })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-8 right-4 flex gap-4 z-30 text-white", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setIsMuted(!isMuted), children: isMuted ? /* @__PURE__ */ jsx(VolumeX, { className: "w-6 h-6 drop-shadow-md" }) : /* @__PURE__ */ jsx(Volume2, { className: "w-6 h-6 drop-shadow-md" }) }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/");
              }
            }, children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6 drop-shadow-md" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-1/3 h-full",
                onClick: goPrev,
                onTouchStart: () => setIsPaused(true),
                onTouchEnd: () => setIsPaused(false),
                onMouseDown: () => setIsPaused(true),
                onMouseUp: () => setIsPaused(false)
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-2/3 h-full",
                onClick: goNext,
                onTouchStart: () => setIsPaused(true),
                onTouchEnd: () => setIsPaused(false),
                onMouseDown: () => setIsPaused(true),
                onMouseUp: () => setIsPaused(false)
              }
            )
          ] }),
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 1.05 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.4 },
              className: "absolute inset-0 w-full h-full z-20 pointer-events-none",
              children: [
                (currentSlide == null ? void 0 : currentSlide.media.type) === "video" ? /* @__PURE__ */ jsx(
                  "video",
                  {
                    src: currentSlide.media.url,
                    poster: currentSlide.media.poster,
                    className: "w-full h-full object-cover",
                    autoPlay: true,
                    loop: true,
                    muted: isMuted,
                    playsInline: true
                  }
                ) : /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: currentSlide == null ? void 0 : currentSlide.media.url,
                    alt: (currentSlide == null ? void 0 : currentSlide.text) || story.title,
                    className: "w-full h-full object-cover"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" }),
                /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 w-full p-6 pb-12 z-10 flex flex-col items-center text-center", children: [
                  (currentSlide == null ? void 0 : currentSlide.text) && /* @__PURE__ */ jsx("p", { className: "text-white text-xl font-bold mb-6 drop-shadow-lg leading-relaxed", children: currentSlide.text }),
                  (currentSlide == null ? void 0 : currentSlide.cta) && /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: { y: 20, opacity: 0 },
                      animate: { y: 0, opacity: 1 },
                      transition: { delay: 0.5 },
                      children: /* @__PURE__ */ jsxs(
                        Link,
                        {
                          to: currentSlide.cta.url.startsWith("https://junny.com.br") ? currentSlide.cta.url.replace("https://junny.com.br", "") : currentSlide.cta.url,
                          className: "bg-primary text-black font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 pointer-events-auto",
                          children: [
                            currentSlide.cta.label,
                            /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
                          ]
                        }
                      )
                    }
                  )
                ] })
              ]
            },
            currentSlide == null ? void 0 : currentSlide.id
          ) })
        ]
      }
    )
  ] });
};
export {
  WebStoryPage
};
//# sourceMappingURL=WebStoryPage-CuvWv2M6.js.map
