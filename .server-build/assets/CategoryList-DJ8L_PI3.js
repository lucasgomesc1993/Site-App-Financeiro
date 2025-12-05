import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const CategoryList = ({ categories }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-3 mb-12", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/blog",
        className: "px-4 py-2 rounded-full bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors",
        children: "Todos"
      }
    ),
    categories.map((category) => /* @__PURE__ */ jsx(
      Link,
      {
        to: `/blog/${category.slug}`,
        className: "px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-primary/30 hover:text-white transition-all text-sm",
        children: category.name
      },
      category.id
    ))
  ] });
};
export {
  CategoryList as C
};
//# sourceMappingURL=CategoryList-DJ8L_PI3.js.map
