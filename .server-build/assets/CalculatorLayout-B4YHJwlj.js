import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Suspense } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import { Calculator, ArrowRight } from "lucide-react";
import { C as CALCULATOR_CATEGORIES, g as getColorClasses } from "./calculators-DhEdlcMQ.js";
import { C as CalculatorContext } from "./CalculatorContext-CjI84puU.js";
const RelatedCalculators = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentCategory = CALCULATOR_CATEGORIES.find(
    (cat) => cat.items.some((item) => item.href === currentPath)
  );
  let relatedItems = [];
  if (currentCategory) {
    relatedItems = currentCategory.items.filter((item) => item.href !== currentPath).map((item) => ({ ...item, color: currentCategory.color }));
  }
  if (relatedItems.length < 4) {
    const otherCategories = CALCULATOR_CATEGORIES.filter((cat) => cat !== currentCategory);
    const allOtherItems = otherCategories.flatMap(
      (cat) => cat.items.map((item) => ({ ...item, color: cat.color }))
    );
    const shuffled = allOtherItems.sort(() => 0.5 - Math.random());
    const needed = 4 - relatedItems.length;
    relatedItems = [...relatedItems, ...shuffled.slice(0, needed + 2)];
  }
  const displayItems = relatedItems.slice(0, 4);
  return /* @__PURE__ */ jsx("section", { className: "py-12 border-t border-white/5 mt-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-2 rounded-lg", children: /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Calculadoras Relacionadas" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: displayItems.map((item, index) => {
      const colors = getColorClasses(item.color);
      return /* @__PURE__ */ jsx(Link, { to: item.href, className: "group", children: /* @__PURE__ */ jsxs("div", { className: `bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:bg-[#1a1a1a]/80 transition-all duration-300 ${colors.hoverBorder} h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] flex flex-col`, children: [
        /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity` }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [
          /* @__PURE__ */ jsx("div", { className: `w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center mb-3 border border-white/5 group-hover:scale-110 transition-transform`, children: /* @__PURE__ */ jsx(item.icon, { className: `${colors.text} w-5 h-5` }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-white mb-2 leading-tight", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 line-clamp-2 mb-4 flex-grow", children: item.description }),
          /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 ${colors.text} text-xs font-bold group-hover:gap-2 transition-all mt-auto`, children: [
            "Acessar ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
          ] })
        ] })
      ] }) }, index);
    }) })
  ] }) });
};
const CalculatorLayout = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }) }), children: /* @__PURE__ */ jsxs(CalculatorContext.Provider, { value: true, children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(RelatedCalculators, {})
  ] }) }) });
};
export {
  CalculatorLayout
};
//# sourceMappingURL=CalculatorLayout-B4YHJwlj.js.map
