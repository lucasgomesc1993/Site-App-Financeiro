import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ShieldCheck, Calculator, AlertCircle, TrendingDown, Info, FileText, ArrowRight, DollarSign, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-2hmnhBZO.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
const INSS_FAQS = [
  {
    question: "Qual o valor do teto do INSS em 2025?",
    answer: "O teto do INSS em 2025 é de R$ 8.157,41. Isso significa que, mesmo se você ganhar R$ 15.000,00, sua contribuição será calculada apenas até esse limite, resultando em um desconto máximo de R$ 951,63."
  },
  {
    question: "Como funciona o desconto progressivo?",
    answer: 'No desconto progressivo, seu salário é "fatiado". Você paga 7,5% sobre a primeira parte (até o salário mínimo), 9% sobre a segunda parte, e assim por diante. Quem ganha mais paga uma alíquota efetiva maior, mas justa em relação às faixas anteriores.'
  },
  {
    question: "O desconto do INSS é sobre o salário bruto ou líquido?",
    answer: "O INSS é sempre calculado sobre o salário bruto (sem descontos). Ele é o primeiro desconto a ser aplicado, antes do Imposto de Renda e do Vale-Transporte."
  },
  {
    question: "Quem é autônomo paga quanto de INSS?",
    answer: "Autônomos no plano normal pagam 20% sobre a remuneração do mês (limitado ao teto). Já no plano simplificado (código 1163), pagam 11% sobre o salário mínimo, mas perdem o direito à aposentadoria por tempo de contribuição."
  },
  {
    question: "O que acontece se a empresa descontar mas não pagar o INSS?",
    answer: "Isso é considerado apropriação indébita previdenciária. O trabalhador não perde o direito à contagem de tempo para aposentadoria, mas pode ter dor de cabeça para provar o vínculo. Acompanhe sempre seu extrato CNIS no portal Meu INSS."
  },
  {
    question: "Desconto de INSS incide sobre vale-alimentação?",
    answer: "Não. O vale-alimentação e vale-refeição, quando pagos dentro das regras do PAT (Programa de Alimentação do Trabalhador), não integram o salário para fins de contribuição ao INSS."
  },
  {
    question: "Como calcular INSS de empregada doméstica?",
    answer: "O cálculo para empregados domésticos segue a mesma tabela progressiva dos trabalhadores CLT. A alíquota varia de 7,5% a 14% dependendo do salário registrado na carteira."
  }
];
function INSSPage() {
  const [salary, setSalary] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    if (isNaN(sal) || sal === 0) {
      setResult(null);
      return;
    }
    let discount = 0;
    const TETO = 8157.41;
    const FAIXA_1 = 1518;
    const FAIXA_2 = 2793.88;
    const FAIXA_3 = 4190.83;
    let range = 0;
    if (sal <= FAIXA_1) {
      discount = sal * 0.075;
      range = 1;
    } else if (sal <= FAIXA_2) {
      discount = FAIXA_1 * 0.075 + (sal - FAIXA_1) * 0.09;
      range = 2;
    } else if (sal <= FAIXA_3) {
      discount = FAIXA_1 * 0.075 + (FAIXA_2 - FAIXA_1) * 0.09 + (sal - FAIXA_2) * 0.12;
      range = 3;
    } else if (sal <= TETO) {
      discount = FAIXA_1 * 0.075 + (FAIXA_2 - FAIXA_1) * 0.09 + (FAIXA_3 - FAIXA_2) * 0.12 + (sal - FAIXA_3) * 0.14;
      range = 4;
    } else {
      discount = 951.63;
      range = 5;
    }
    setResult({
      discount,
      netSalary: sal - discount,
      effectiveRate: discount / sal * 100,
      range
    });
  };
  useEffect(() => {
    calculate();
  }, [salary]);
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
    "name": "Calculadora INSS 2025",
    "url": "https://www.junny.com.br/calculadoras/inss",
    "description": "Consulte a Tabela INSS 2025 oficial atualizada. Aprenda a calcular o desconto no seu salário, emita a guia GPS e simule autônomos e MEI.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "featureList": [
      "Tabela INSS 2025 Atualizada",
      "Cálculo Progressivo Automático",
      "Desconto de Autônomos e MEI",
      "Cálculo Reverso de Salário Líquido"
    ]
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora INSS 2025: Tabela Oficial e Cálculo Exato [Atualizado]",
        description: "Consulte a Tabela INSS 2025 oficial atualizada. Aprenda a calcular o desconto no seu salário, emita a guia GPS e simule autônomos e MEI.",
        canonical: "/calculadoras/inss"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": INSS_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "INSS 2025", href: "/calculadoras/inss" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500", children: "INSS 2025" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Entenda o desconto do INSS no seu salário com a nova tabela de 2025." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Calcular Desconto"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: salary,
                        onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor do Desconto INSS" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.discount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Alíquota Efetiva" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `${result.effectiveRate.toFixed(2)}%` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Salário Pós-INSS" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.netSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] }),
                  result && result.range === 5 && /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl flex items-start gap-2 text-left", children: [
                    /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-yellow-200/80", children: "Seu salário está acima do teto de R$ 8.157,41. O desconto é fixo no valor máximo de R$ 951,63." })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-6 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(TrendingDown, { className: "w-5 h-5 text-blue-500" }),
                "Tabela INSS 2025 (CLT)"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: `flex justify-between items-center p-3 rounded-xl border ${result && result.range === 1 ? "bg-blue-500/20 border-blue-500/50" : "bg-white/5 border-white/5"}`, children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Até R$ 1.518,00" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-white", children: "Faixa 1" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-blue-400", children: "7,5%" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: `flex justify-between items-center p-3 rounded-xl border ${result && result.range === 2 ? "bg-blue-500/20 border-blue-500/50" : "bg-white/5 border-white/5"}`, children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "R$ 1.518,01 a R$ 2.793,88" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-white", children: "Faixa 2" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-blue-400", children: "9%" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: `flex justify-between items-center p-3 rounded-xl border ${result && result.range === 3 ? "bg-blue-500/20 border-blue-500/50" : "bg-white/5 border-white/5"}`, children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "R$ 2.793,89 a R$ 4.190,83" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-white", children: "Faixa 3" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-blue-400", children: "12%" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: `flex justify-between items-center p-3 rounded-xl border ${result && result.range >= 4 ? "bg-blue-500/20 border-blue-500/50" : "bg-white/5 border-white/5"}`, children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "R$ 4.190,84 a R$ 8.157,41" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-white", children: "Faixa 4" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-blue-400", children: "14%" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-4 text-center", children: "*O cálculo é feito por fatias. Quem ganha R$ 3.000 não paga 12% sobre tudo, mas sim a soma das alíquotas de cada faixa." })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12 mb-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "Como funciona o cálculo em 2025?" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-lg leading-relaxed mb-6", children: [
            "Entender o desconto do ",
            /* @__PURE__ */ jsx("strong", { children: "INSS (Instituto Nacional do Seguro Social)" }),
            " é essencial para saber exatamente quanto do seu salário cai na conta no final do mês. Em 2025, com o novo salário mínimo de ",
            /* @__PURE__ */ jsx("strong", { children: "R$ 1.518,00" }),
            ", as faixas de contribuição e o teto da previdência sofreram reajustes importantes que impactam diretamente o seu bolso."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-6", children: "Tabela Oficial Detalhada" }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white", children: "Salário de Contribuição" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white text-center", children: "Alíquota" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white text-center", children: "Parcela a Deduzir" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "Até R$ 1.518,00" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center font-bold text-blue-400", children: "7,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "-" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "De R$ 1.518,01 a R$ 2.793,88" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center font-bold text-blue-400", children: "9%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "R$ 22,77" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "De R$ 2.793,89 a R$ 4.190,83" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center font-bold text-blue-400", children: "12%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "R$ 106,59" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: "De R$ 4.190,84 a R$ 8.157,41" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center font-bold text-blue-400", children: "14%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "R$ 190,41" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-200/80", children: [
                /* @__PURE__ */ jsx("strong", { children: "Atenção:" }),
                " Quem ganha acima do teto de R$ 8.157,41 paga um valor fixo de contribuição, que atualmente é de ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 951,63" }),
                " (o teto máximo de desconto)."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como calcular o INSS na prática?" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: 'O cálculo progressivo pode parecer complexo, mas existe um macete simples usando a "Parcela a Deduzir" da tabela acima.' }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5 mb-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2", children: "Fórmula Simples:" }),
            /* @__PURE__ */ jsx("code", { className: "block bg-black/30 p-4 rounded-lg text-blue-300 font-mono text-sm md:text-base break-words", children: "[Salário Bruto] x [Alíquota] - [Parcela a Deduzir] = Valor do INSS" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white", children: "Exemplo Prático: Salário de R$ 3.500,00" }),
            /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside space-y-2 text-gray-400 ml-4", children: [
              /* @__PURE__ */ jsx("li", { children: "Enquadra-se na 3ª faixa (12%)." }),
              /* @__PURE__ */ jsxs("li", { children: [
                "Multiplique: ",
                /* @__PURE__ */ jsx("span", { className: "text-white", children: "R$ 3.500,00 x 12% = R$ 420,00" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "Subtraia a dedução: ",
                /* @__PURE__ */ jsx("span", { className: "text-white", children: "R$ 420,00 - R$ 106,59" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Desconto Final INSS: R$ 313,41" }),
                "."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col md:flex-row gap-4", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/calculadoras/salario-liquido", className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors", children: [
              "Ver Salário Líquido Completo ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] }),
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-funcionario", className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors", children: "Calcular Custo para Empresa (Patrão)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Tabela INSS para Autônomos e Pró-Labore (2025)" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Para Contribuintes Individuais (Autônomos) e sócios que retiram Pró-Labore, a lógica é diferente. Não há progressividade, a alíquota é fixa dependendo do tipo de contribuição." }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto mb-8", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Categoria" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-center", children: "Alíquota" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Base de Cálculo" }),
              /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Valor Mensal" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: "Plano Normal (Aposenta por tempo)" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-blue-400", children: "20%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Sobre ganhos (Min. R$ 1.518 até Teto)" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "De R$ 303,60 até R$ 1.631,48" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: "Plano Simplificado (Aposenta por idade)" }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-blue-400", children: "11%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Apenas sobre Salário Mínimo" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 166,98" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: /* @__PURE__ */ jsx(Link, { to: "/calculadoras/das-mei", className: "text-blue-400 hover:underline", children: "MEI" }) }),
                /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-blue-400", children: "5%" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "Apenas sobre Salário Mínimo" }),
                /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 75,90 (+ ISS/ICMS)" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Como pagar (Códigos GPS)" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-gray-400", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-500 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Código 1007:" }),
                  " Contribuinte Individual - Plano Normal (20%)"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-500 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Código 1163:" }),
                  " Contribuinte Individual - Plano Simplificado (11%)"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-gray-500", children: [
              "Dúvida entre ser CLT ou PJ? Use nossa calculadora ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/clt-vs-pj", className: "text-blue-400 hover:underline", children: "CLT vs PJ" }),
              " para comparar."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "O impacto do INSS em outros benefícios" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/calculadoras/horas-extras", className: "group bg-white/5 p-5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors", children: "Horas Extras" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "O valor recebido por horas adicionais integra o salário de contribuição, aumentando o desconto do INSS." })
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/calculadoras/fgts", className: "group bg-white/5 p-5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors", children: "FGTS" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "O FGTS é calculado sobre o salário bruto, sem descontar o INSS. O INSS reduz a base apenas do Imposto de Renda." })
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/calculadoras/decimo-terceiro", className: "group bg-white/5 p-5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors", children: "13º Salário" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "O INSS também é descontado da primeira ou segunda parcela do seu abono natalino." })
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/calculadoras/ferias", className: "group bg-white/5 p-5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors", children: "Férias" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Quando você vende férias ou recebe o terço constitucional, o INSS também incide sobre esses valores." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: INSS_FAQS,
          title: "Dúvidas Frequentes sobre INSS",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  INSSPage
};
//# sourceMappingURL=INSSPage-Di9GW-us.js.map
