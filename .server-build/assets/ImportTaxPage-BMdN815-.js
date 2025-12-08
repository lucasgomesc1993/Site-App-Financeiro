import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ShoppingBag, Calculator, Package, AlertTriangle, Plane } from "lucide-react";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-CDVQG5oV.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-DhnQlz7G.js";
const IMPORT_TAX_FAQS = [
  {
    question: "Como funciona a isenção de $50?",
    answer: "Pelo programa Remessa Conforme, compras de até US$ 50 feitas por empresas certificadas pagam apenas 20% de Imposto de Importação (Federal) + 17% de ICMS (Estadual). Fora do programa ou pessoa física para jurídica sem certificação, a taxa é de 60%."
  },
  {
    question: "O frete entra no cálculo?",
    answer: "Sim! A Receita Federal calcula o imposto sobre o Valor Aduaneiro, que é a soma do produto + frete + seguro. Se o produto custa $45 e o frete $10, o total é $55 e você perde a isenção da alíquota reduzida de 20% (se não houver regra específica de desconto)."
  },
  {
    question: "O que é o ICMS de 17%?",
    answer: "É um imposto estadual unificado para compras internacionais. Ele é cobrado 'por dentro', ou seja, incide sobre o valor total da compra já somado ao Imposto de Importação, o que eleva a taxa efetiva real."
  }
];
function ImportTaxPage() {
  const [usdPrice, setUsdPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [exchangeRate, setExchangeRate] = useState("6.00");
  const [isRemessaConforme, setIsRemessaConforme] = useState(true);
  const [result, setResult] = useState(null);
  const calculate = () => {
    const price = parseFloat(usdPrice.replace(/\./g, "").replace(",", ".") || "0");
    const ship = parseFloat(shipping.replace(/\./g, "").replace(",", ".") || "0");
    const rate = parseFloat(exchangeRate.replace(/\./g, "").replace(",", ".") || "0");
    if (price === 0) {
      setResult(null);
      return;
    }
    const totalUSD = price + ship;
    const totalBaseBRL = totalUSD * rate;
    let importTax = 0;
    if (isRemessaConforme) {
      if (totalUSD <= 50) {
        importTax = totalBaseBRL * 0.2;
      } else {
        const tax60 = totalBaseBRL * 0.6;
        const deduction = 20 * rate;
        importTax = tax60 - deduction;
        if (importTax < 0) importTax = 0;
      }
    } else {
      importTax = totalBaseBRL * 0.6;
    }
    const icmsRate = 0.17;
    const baseICMS = (totalBaseBRL + importTax) / (1 - icmsRate);
    const icms = baseICMS * icmsRate;
    const finalTotal = totalBaseBRL + importTax + icms;
    const totalTax = importTax + icms;
    const effectiveTaxRate = totalTax / totalBaseBRL * 100;
    setResult({
      totalUSD,
      totalBRL: totalBaseBRL,
      importTax,
      icms,
      finalTotal,
      effectiveTaxRate
    });
  };
  useEffect(() => {
    calculate();
  }, [usdPrice, shipping, exchangeRate, isRemessaConforme]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Impostos de Importação (Taxa das Blusinhas)",
    "description": "Simule as taxas do Remessa Conforme, Aliexpress, Shein e Shopee. Calcule II (20% ou 60%) e ICMS de 17%.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Impostos de Importação - Remessa Conforme, Shein, Shopee",
        description: "Vai ser taxado? Simule o valor final da sua compra internacional com as novas regras (20% até $50 ou 60% acima) e ICMS.",
        canonical: "/calculadoras/impostos-importacao"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": IMPORT_TAX_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Impostos de Importação", href: "/calculadoras/impostos-importacao" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "w-4 h-4 text-cyan-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Câmbio e Compras" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500", children: "Impostos de Importação" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: 'Simule o valor final com as taxas do "Remessa Conforme" (Shein, AliExpress, Shopee) e evite surpresas na alfândega.' })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-cyan-500" }),
            "Dados da Compra"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Preço do Produto (USD)" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "$" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: usdPrice,
                      onChange: (e) => handleCurrencyInput(e.target.value, setUsdPrice),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                      placeholder: "0.00"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Frete (USD)" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "$" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: shipping,
                      onChange: (e) => handleCurrencyInput(e.target.value, setShipping),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                      placeholder: "0.00"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Cotação do Dólar (R$)" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: exchangeRate,
                    onChange: (e) => handleCurrencyInput(e.target.value, setExchangeRate),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                    placeholder: "Ex: 6,00"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Use a cotação do cartão ou boleto (Dólar Turismo/PTAX)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(Package, { className: `w-5 h-5 ${isRemessaConforme ? "text-green-400" : "text-gray-400"}` }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-white font-medium block", children: "Remessa Conforme" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Sites certificados (Shein, Shopee, etc)" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsRemessaConforme(!isRemessaConforme),
                  className: `w-12 h-6 rounded-full p-1 transition-colors ${isRemessaConforme ? "bg-green-500" : "bg-gray-600"}`,
                  role: "switch",
                  "aria-checked": isRemessaConforme,
                  children: /* @__PURE__ */ jsx("div", { className: `w-4 h-4 bg-white rounded-full transition-transform ${isRemessaConforme ? "translate-x-6" : "translate-x-0"}` })
                }
              )
            ] }),
            isRemessaConforme && parseFloat(usdPrice.replace(/\./g, "").replace(",", ".")) + parseFloat(shipping.replace(/\./g, "").replace(",", ".") || "0") > 50 && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 text-yellow-400 text-xs bg-yellow-400/10 p-3 rounded-lg border border-yellow-400/20", children: [
              /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsx("p", { children: "Sua compra ultrapassou US$ 50,00. A taxa de 20% não se aplica integralmente. Você pagará 60% com desconto de US$ 20,00 no imposto." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "bg-cyan-500/10 p-6 rounded-2xl border border-cyan-500/20 text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-cyan-400 block mb-2", children: "Custo Final Estimado (R$)" }),
              /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.finalTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
              result && /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-red-300 mt-2", children: [
                "+",
                result.effectiveTaxRate.toFixed(1),
                "% de impostos reais"
              ] })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 space-y-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-cyan-500" }),
            "Discriminativo"
          ] }),
          result ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-2 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Total Produto + Frete" }),
              /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                "R$ ",
                result.totalBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-2 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Imposto Importação (II)" }),
              /* @__PURE__ */ jsxs("span", { className: "text-red-400 font-medium", children: [
                "+ R$ ",
                result.importTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-2 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "ICMS (17%)" }),
              /* @__PURE__ */ jsxs("span", { className: "text-red-400 font-medium", children: [
                "+ R$ ",
                result.icms.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-bold", children: "Total a Pagar" }),
              /* @__PURE__ */ jsxs("span", { className: "text-cyan-400 font-bold text-xl", children: [
                "R$ ",
                result.finalTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 py-8", children: /* @__PURE__ */ jsx("p", { children: "Preencha os valores para ver o detalhamento das taxas." }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mt-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-white mb-2", children: "Entenda a Base de Cálculo" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 leading-relaxed", children: 'O governo cobra "imposto sobre imposto". O ICMS não incide apenas sobre o produto, mas sobre o (Produto + Frete + Imposto Federal). Por isso, 17% vira na prática quase 20,48% sobre a base original.' })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-red-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-6 h-6 text-red-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como não ser taxado (ou pagar menos)?" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Isenções Legais" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Livros, jornais, revistas e medicamentos (pessoa física para física) geralmente são isentos. Remédios exigem receita médica e procedimentos via Anvisa." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Dividir Pacotes" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Se sua compra exceder US$ 50, tente dividir em dois pedidos separados (em dias diferentes) para ficar abaixo do limite da taxa reduzida de 20%. Atenção aos custos de frete duplicados." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: IMPORT_TAX_FAQS,
          title: "Perguntas Frequentes",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  ImportTaxPage
};
//# sourceMappingURL=ImportTaxPage-BMdN815-.js.map
