import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
const Breadcrumb = ({ items }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://finzap.io/"
        // Replace with actual domain if known, or use relative
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://finzap.io${item.href}`
      }))
    ]
  };
  return /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "mb-6", children: [
    /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
      }
    ),
    /* @__PURE__ */ jsxs("ol", { className: "flex items-center flex-wrap gap-2 text-sm text-gray-400", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center hover:text-white transition-colors", children: [
        /* @__PURE__ */ jsx(Home, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Home" })
      ] }) }),
      items.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-gray-600" }),
        index === items.length - 1 ? /* @__PURE__ */ jsx("span", { className: "text-primary font-medium", "aria-current": "page", children: item.label }) : /* @__PURE__ */ jsx(Link, { to: item.href, className: "hover:text-white transition-colors", children: item.label })
      ] }, item.href))
    ] })
  ] });
};
export {
  Breadcrumb as B
};
