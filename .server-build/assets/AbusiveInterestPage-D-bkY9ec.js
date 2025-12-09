import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { AlertTriangle, Calculator, Scale, XCircle, CheckCircle, FileText } from "lucide-react";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-rtQ6fcXm.js";
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
import "./author-BdzMjBtJ.js";
const INTEREST_FAQS = [
  {
    question: "O que configura juros abusivos?",
    answer: "Juridicamente, considera-se abusiva a taxa que excede significativamente a média de mercado divulgada pelo Banco Central para a mesma modalidade de crédito na data do contrato."
  },
  {
    question: "Posso processar o banco?",
    answer: "Sim, é possível entrar com uma Ação Revisional de Juros. Se comprovado o abuso, o juiz pode determinar a redução da taxa e a devolução do valor pago a mais (indébito). Porém, é necessário laudo pericial e advogado."
  },
  {
    question: "Qual a taxa média do mercado?",
    answer: "Varia muito. Em 2024, empréstimos consignados giram em torno de 1,7% a.m., pessoais 4% a 6% a.m., e cartão de crédito rotativo pode passar de 12% a.m. Consulte o site do Banco Central."
  }
];
function AbusiveInterestPage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [installmentValue, setInstallmentValue] = useState("");
  const [months, setMonths] = useState("");
  const [marketRate, setMarketRate] = useState("3,50");
  const [result, setResult] = useState(null);
  const calculateIRR = (pv, pmt, n) => {
    let rate = 0.05;
    for (let i = 0; i < 20; i++) {
      const fr = pmt / rate * (1 - Math.pow(1 + rate, -n)) - pv;
      const fprime_r = pmt / rate * (n * Math.pow(1 + rate, -n - 1)) - pmt / (rate * rate) * (1 - Math.pow(1 + rate, -n));
      const newRate = rate - fr / fprime_r;
      if (Math.abs(newRate - rate) < 1e-5) return newRate;
      rate = newRate;
    }
    return rate;
  };
  const calculate = () => {
    const pv = parseFloat(loanAmount.replace(/\./g, "").replace(",", ".") || "0");
    const pmt = parseFloat(installmentValue.replace(/\./g, "").replace(",", ".") || "0");
    const n = parseInt(months);
    const marketRateVal = parseFloat(marketRate.replace(/\./g, "").replace(",", ".") || "0");
    if (pv === 0 || pmt === 0 || isNaN(n) || n === 0) {
      setResult(null);
      return;
    }
    const calculatedRate = calculateIRR(pv, pmt, n);
    const ratePercent = calculatedRate * 100;
    const totalPaid = pmt * n;
    const totalInterest = totalPaid - pv;
    const isAbusive = ratePercent > marketRateVal * 1.5;
    let excessAmount = 0;
    if (isAbusive) {
      const rFair = marketRateVal / 100;
      const pmtFair = pv * rFair / (1 - Math.pow(1 + rFair, -n));
      const totalFair = pmtFair * n;
      excessAmount = totalPaid - totalFair;
    }
    setResult({
      realRate: ratePercent,
      totalPaid,
      totalInterest,
      isAbusive,
      excessAmount
    });
  };
  useEffect(() => {
    calculate();
  }, [loanAmount, installmentValue, months, marketRate]);
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
    "name": "Calculadora de Juros Abusivos",
    "description": "Verifique se a taxa do seu financiamento de veículo ou empréstimo está acima da média de mercado.",
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
        title: "Calculadora de Juros Abusivos - Verifique seu Contrato",
        description: "Está pagando juros demais? Descubra a taxa real do seu financiamento e saiba se cabe Ação Revisional.",
        canonical: "/calculadoras/juros-abusivos"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": INTEREST_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Juros Abusivos", href: "/calculadoras/juros-abusivos" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-purple-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dívidas e Financiamentos" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500", children: "Juros Abusivos" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Descubra a taxa real de juros escondida nas parcelas do seu financiamento e veja se você está sendo lesado." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-purple-500" }),
            "Dados do Contrato"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Entregue em Mãos (Líquido)" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: loanAmount,
                    onChange: (e) => handleCurrencyInput(e.target.value, setLoanAmount),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                    placeholder: "Ex: 10.000,00"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Não inclua seguros ou taxas embutidas, apenas o dinheiro que você recebeu." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor da Parcela" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: installmentValue,
                      onChange: (e) => handleCurrencyInput(e.target.value, setInstallmentValue),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                      placeholder: "0,00"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Nº de Parcelas" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: months,
                    onChange: (e) => setMonths(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                    placeholder: "Ex: 48"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Taxa Média de Mercado (% a.m.)" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: marketRate,
                    onChange: (e) => {
                      const val = e.target.value.replace(/[^0-9,.]/g, "");
                      setMarketRate(val);
                    },
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                    placeholder: "Ex: 3,50"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-500", children: "%" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Use a taxa média do Bacen para comparar. Financiamentos de carro ~2%, Pessoal ~4-6%." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "bg-purple-500/10 p-6 rounded-2xl border border-purple-500/20 text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-purple-400 block mb-2", children: "Sua Taxa Real (CET)" }),
              /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `${result.realRate.toFixed(2)}% a.m.` : "---" })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 space-y-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Scale, { className: "w-5 h-5 text-purple-500" }),
            "Análise do Contrato"
          ] }),
          result ? /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border flex items-start gap-3 ${result.isAbusive ? "bg-red-500/10 border-red-500/20" : "bg-green-500/10 border-green-500/20"}`, children: [
              result.isAbusive ? /* @__PURE__ */ jsx(XCircle, { className: "w-6 h-6 text-red-500 flex-shrink-0" }) : /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-green-500 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: `text-lg font-bold ${result.isAbusive ? "text-red-400" : "text-green-400"}`, children: result.isAbusive ? "Indícios de Abusividade" : "Dentro da Média" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1", children: result.isAbusive ? `Sua taxa (${result.realRate.toFixed(2)}%) está muito acima da média informada. Você pode ter direito à revisão.` : `Sua taxa (${result.realRate.toFixed(2)}%) parece condizente com o mercado atual.` })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-2 border-b border-white/5", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Valor Total Pago" }),
                /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                  "R$ ",
                  result.totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-2 border-b border-white/5", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Total de Juros" }),
                /* @__PURE__ */ jsxs("span", { className: "text-red-400 font-medium", children: [
                  "+ R$ ",
                  result.totalInterest.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                ] })
              ] }),
              result.isAbusive && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-bold", children: "Valor Pago em Excesso (Est.)" }),
                /* @__PURE__ */ jsxs("span", { className: "text-purple-400 font-bold text-lg", children: [
                  "R$ ",
                  result.excessAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                ] })
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 py-8", children: /* @__PURE__ */ jsx("p", { children: "Simule para ver se seus juros são justos." }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mt-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-white mb-2", children: "Importante" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 leading-relaxed", children: "Esta calculadora usa o método da Taxa Interna de Retorno (TIR) para descobrir o CET (Custo Efetivo Total) real. Muitas vezes o banco diz cobrar 2%, mas coloca taxas e seguros que fazem o custo real subir para 3% ou mais." })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-purple-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-purple-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "O que fazer se for abusivo?" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "1. Negociação Extrajudicial" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Procure o gerente ou a financeira com os cálculos em mãos. Peça a cópia do contrato e questione o CET. Às vezes, eles preferem dar um desconto na quitação antecipada." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "2. Ação Revisional" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm", children: [
              "Se a via amigável não funcionar, procure um advogado ou a Defensoria Pública. Juízes costumam considerar abusivo quando a taxa supera em ",
              /* @__PURE__ */ jsx("strong", { children: "1,5x a média do mercado" }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: INTEREST_FAQS,
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
  AbusiveInterestPage
};
//# sourceMappingURL=AbusiveInterestPage-D-bkY9ec.js.map
