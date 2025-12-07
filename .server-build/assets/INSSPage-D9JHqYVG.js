import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ShieldCheck, Calculator, Info, AlertCircle, TrendingDown, FileText, DollarSign, CheckCircle } from "lucide-react";
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
import "framer-motion";
const INSS_FAQS = [
  {
    question: "Qual o valor máximo do teto do INSS em 2025?",
    answer: "O teto previdenciário oficial para 2025 é de R$ 8.157,41. Isso significa que qualquer valor salarial que ultrapasse essa quantia não sofrerá tributação adicional para a previdência. O desconto máximo que um trabalhador no regime geral pode ter em seu contracheque é travado em R$ 951,63."
  },
  {
    question: "Como calcular o INSS de quem ganha um salário mínimo?",
    answer: "Para quem recebe o piso nacional de R$ 1.518,00, o cálculo é direto e cai na primeira faixa da tabela. Aplica-se a alíquota de 7,5% sobre o valor total, resultando em um desconto de R$ 113,85. Não há parcela a deduzir nesta faixa específica."
  },
  {
    question: "A isenção de Imposto de Renda até R$ 5.000 já vale para 2025?",
    answer: "Não, esta regra não está vigente. A Lei nº 15.270/2025 sancionou a nova tabela de isenção ampliada, porém sua eficácia jurídica começa apenas em 1º de janeiro de 2026. Para todo o ano calendário de 2025, deve-se utilizar as tabelas e regras de dedução antigas para evitar pendências com a Receita Federal."
  },
  {
    question: "O desconto do INSS é calculado sobre o salário bruto ou líquido?",
    answer: "A base de cálculo do INSS é sempre o salário bruto (também chamado de salário de contribuição), que inclui horas extras e adicionais. Ele é a primeira dedução a ocorrer na folha. O Imposto de Renda e outros descontos são calculados somente sobre o valor que resta após a subtração do INSS."
  }
];
function INSSPage() {
  const [salary, setSalary] = useState("");
  const [result, setResult] = useState(null);
  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    if (isNaN(sal) || sal === 0) {
      setResult(null);
      return;
    }
    const TETO = 8157.41;
    const TETO_DESCONTO = 951.63;
    let discount = 0;
    let rangeDescription = "";
    if (sal <= 1518) {
      discount = sal * 0.075;
      rangeDescription = "Faixa 1 (7,5%)";
    } else if (sal <= 2793.88) {
      discount = sal * 0.09 - 22.77;
      rangeDescription = "Faixa 2 (9%)";
    } else if (sal <= 4190.83) {
      discount = sal * 0.12 - 106.59;
      rangeDescription = "Faixa 3 (12%)";
    } else if (sal <= TETO) {
      discount = sal * 0.14 - 190.4;
      rangeDescription = "Faixa 4 (14%)";
    } else {
      discount = TETO_DESCONTO;
      rangeDescription = "Teto Máximo";
    }
    discount = Math.max(0, discount);
    setResult({
      discount,
      netSalary: sal - discount,
      effectiveRate: discount / sal * 100,
      rangeDescription
    });
  };
  useEffect(() => {
    calculate();
  }, [salary]);
  const handleCurrencyInput = (value, setter) => {
    const number = value.replace(/\D/g, "");
    setter((Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 }));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora INSS 2025",
    "url": "https://www.junny.com.br/calculadoras/inss",
    "description": "Calcule o desconto exato do INSS 2025 com a nova tabela progressiva. Veja alíquotas, deduções e o impacto do salário mínimo de R$ 1.518,00 no seu bolso.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "featureList": [
      "Tabela INSS 2025 Atualizada",
      "Cálculo Progressivo com Dedução",
      "Simulação para Teto de R$ 8.157,41",
      "Exemplo Prático de Cálculo"
    ]
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora INSS 2025: Desconto Oficial e Tabela Atualizada",
        description: "Calcule o desconto exato do INSS 2025 com a nova tabela progressiva. Veja alíquotas, deduções e o impacto do salário mínimo de R$ 1.518,00 no seu bolso.",
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
            "Calculadora de Desconto ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500", children: "INSS 2025" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left md:text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-3 rounded-lg border border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block", children: "Salário Mínimo (Base)" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: "R$ 1.518,00" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-3 rounded-lg border border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block", children: "Teto do INSS (Máximo)" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: "R$ 8.157,41" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-3 rounded-lg border border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block", children: "Desconto Máximo" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: "R$ 951,63" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-3 rounded-lg border border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block", children: "Legislação" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: "Portaria MPS/MF nº 6" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-400 max-w-3xl mx-auto mt-6", children: [
            "A atualização fiscal de 2025 elevou o teto de contribuição para mais de oito mil reais. O sistema permanece ",
            /* @__PURE__ */ jsx("strong", { children: "progressivo" }),
            ". Nossa calculadora aplica automaticamente a dedução correta."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
            "Calcular Desconto"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: salary,
                    onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "0,00"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor do Desconto INSS" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${formatCurrency(result.discount)}` : "---" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Alíquota Efetiva" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `${result.effectiveRate.toFixed(2)}%` : "---" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Salário Pós-INSS" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${formatCurrency(result.netSalary)}` : "---" })
                ] })
              ] }),
              result && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/5 p-3 rounded-xl flex items-center justify-between text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Faixa Aplicada:" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: result.rangeDescription })
                ] }),
                result.effectiveRate < 14 && result.effectiveRate > 0 && result.discount < 951.63 && /* @__PURE__ */ jsxs("div", { className: "bg-green-500/10 border border-green-500/20 p-3 rounded-xl flex items-start gap-2 text-left", children: [
                  /* @__PURE__ */ jsx(Info, { className: "w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-200/80", children: [
                    "Note que sua alíquota efetiva (",
                    result.effectiveRate.toFixed(2),
                    "%) é menor que a alíquota nominal da faixa, graças ao cálculo progressivo."
                  ] })
                ] }),
                result.discount >= 951.63 && /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl flex items-start gap-2 text-left", children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-yellow-200/80", children: "Seu salário está acima do teto de R$ 8.157,41. O desconto foi travado no máximo permitido de R$ 951,63." })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-6 flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(TrendingDown, { className: "w-5 h-5 text-blue-500" }),
            "Tabela INSS 2025 (Oficial)"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl border bg-white/5 border-white/5", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2 pb-2 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("span", { children: "Faixa Salarial" }),
              /* @__PURE__ */ jsx("span", { className: "text-center", children: "Alíquota" }),
              /* @__PURE__ */ jsx("span", { className: "text-right", children: "Dedução" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-300", children: "Até R$ 1.518,00" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-blue-400 text-center", children: "7,5%" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 text-right", children: "-" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-300", children: "Até R$ 2.793,88" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-blue-400 text-center", children: "9%" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 text-right", children: "R$ 22,77" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-300", children: "Até R$ 4.190,83" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-blue-400 text-center", children: "12%" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 text-right", children: "R$ 106,59" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-300", children: "Até R$ 8.157,41" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-blue-400 text-center", children: "14%" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 text-right", children: "R$ 190,40" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-200/80", children: [
              "Quem possui rendimentos acima de ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 8.157,41" }),
              " contribui com o valor fixo de R$ 951,63, independentemente do salário total."
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12 mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como o cálculo é feito na prática? (Exemplo Real)" }) })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            "A alíquota nominal (aquela que aparece na tabela, como 12% ou 14%) quase nunca é a porcentagem real que sai do seu bolso. Para facilitar a conta manual, utilizamos a ",
            /* @__PURE__ */ jsx("strong", { children: "Parcela a Deduzir" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5 mb-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Vamos a um exemplo prático de um salário de R$ 3.000,00:" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-start md:items-center p-3 rounded-lg bg-black/20", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0", children: "1" }),
                /* @__PURE__ */ jsxs("div", { className: "text-gray-300 text-sm", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Identificação da Faixa:" }),
                  " R$ 3.000,00 está na 3ª faixa (entre 2.793,89 e 4.190,83)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-start md:items-center p-3 rounded-lg bg-black/20", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0", children: "2" }),
                /* @__PURE__ */ jsxs("div", { className: "text-gray-300 text-sm", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Aplicação da Alíquota:" }),
                  " Multiplica-se o salário por 12%. ",
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-mono mt-1 block", children: "3.000,00 x 12% = 360,00" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-start md:items-center p-3 rounded-lg bg-black/20", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0", children: "3" }),
                /* @__PURE__ */ jsxs("div", { className: "text-gray-300 text-sm", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Subtração da Dedução:" }),
                  " Subtrai-se a parcela fixa da tabela (R$ 106,59). ",
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-mono mt-1 block", children: "360,00 - 106,59 = R$ 253,41" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-200", children: [
              "Neste exemplo, o desconto real foi de R$ 253,41. Se dividirmos esse valor pelo salário (253,41 ÷ 3000), descobrimos que a ",
              /* @__PURE__ */ jsx("strong", { children: "alíquota efetiva" }),
              " é de apenas ",
              /* @__PURE__ */ jsx("strong", { children: "8,45%" }),
              ", e não os 12% nominais."
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            "Para ver como isso impacta o restante das suas finanças, incluindo o Imposto de Renda, utilize nossa ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-blue-400 hover:text-blue-300 underline", children: "Calculadora de Salário Líquido" }),
            "."
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-red-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-6 h-6 text-red-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Erros comuns ao calcular o INSS" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "A complexidade das regras de 2025 gera muitas dúvidas. Evite os erros abaixo:" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "13º Salário" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "O Décimo Terceiro possui tributação exclusiva. Ele nunca deve ser somado ao salário de dezembro para enquadramento na tabela. O cálculo dele é isolado." }),
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/decimo-terceiro", className: "text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block", children: "Calcular Décimo Terceiro →" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Férias" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Se você tirou 20 dias de Férias e trabalhou o resto do mês, o INSS do saldo de salário deve considerar o que já foi descontado nas férias. Reiniciar a tabela do zero gera recolhimento incorreto." }),
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/ferias", className: "text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block", children: "Calcular Férias →" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Isenção IR (2026)" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                "A lei que amplia a isenção do Imposto de Renda de R$ 5.000 foi aprovada, mas só entra em vigor em ",
                /* @__PURE__ */ jsx("strong", { children: "2026" }),
                ". Para 2025, os descontos seguem a tabela antiga."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Pró-Labore e Autônomos" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Para empresários e prestadores de serviço, a lógica progressiva acima nem sempre se aplica." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-white font-bold", children: "Pró-Labore" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                  "Sócios de empresas no Simples Nacional (Anexos I, II, III e V) pagam geralmente ",
                  /* @__PURE__ */ jsx("strong", { children: "11%" }),
                  " fixos sobre a retirada."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-white font-bold", children: "Autônomos" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                  "A regra padrão é ",
                  /* @__PURE__ */ jsx("strong", { children: "20%" }),
                  " sobre o salário de contribuição, limitado ao teto."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
            "Se você está avaliando se vale a pena ser autônomo ou funcionário, nossa ferramenta de comparação ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/clt-vs-pj", className: "text-blue-400 hover:text-blue-300 underline", children: "CLT vs PJ" }),
            " detalha todos esses custos."
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: INSS_FAQS,
          title: "Perguntas Frequentes (FAQ)",
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
//# sourceMappingURL=INSSPage-D9JHqYVG.js.map
