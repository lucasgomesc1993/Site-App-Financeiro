import { jsxs, jsx } from "react/jsx-runtime";
import { H as Helmet } from "../entry-server.js";
function SEO({ title, description, canonical, image }) {
  const siteUrl = "https://junny.com.br";
  const fullCanonical = canonical ? canonical.startsWith("http") ? canonical : `${siteUrl}${canonical}` : void 0;
  const ogImage = image ? image.startsWith("http") ? image : `${siteUrl}${image}` : `${siteUrl}/og-image.png`;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsxs("title", { children: [
      title,
      " | Junny"
    ] }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    fullCanonical && /* @__PURE__ */ jsx("link", { rel: "canonical", href: fullCanonical }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    fullCanonical && /* @__PURE__ */ jsx("meta", { property: "og:url", content: fullCanonical }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage })
  ] });
}
export {
  SEO as S
};
//# sourceMappingURL=SEO-Cm8ngfJd.js.map
