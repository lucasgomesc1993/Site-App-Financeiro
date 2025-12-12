import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ShieldCheck, Calculator, Info, AlertCircle, TrendingDown, FileText, DollarSign, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
const INSS_FAQS = [
  {
    question: "Qual o valor máximo de desconto do INSS em 2025?",
    answer: "O teto do desconto para trabalhadores CLT é de aproximadamente R$ 951,63. Esse valor se aplica a qualquer remuneração que ultrapasse R$ 8.157,41. Acima disso, a contribuição trava e não há cobrança extra."
  },
  {
    question: "Quem ganha um salário mínimo paga quanto?",
    answer: "Para o piso de R$ 1.518,00, a alíquota é de 7,5% sobre o total. O desconto é de R$ 113,85, resultando em um salário líquido de R$ 1.404,15 (sem contar outros benefícios ou descontos)."
  },
  {
    question: "Como conferir se a empresa está pagando meu INSS?",
    answer: "Não confie apenas no holerite. É vital acessar o Meu INSS (site ou app) e puxar o Extrato CNIS. Lá constam todos os recolhimentos reais feitos pelo empregador."
  },
  {
    question: "Autônomo pode pagar menos que 20%?",
    answer: "Sim, através do Plano Simplificado. O autônomo pode pagar 11% sobre o salário mínimo (R$ 166,98). Porém, essa modalidade dá direito apenas à aposentadoria por idade, excluindo a aposentadoria por tempo de contribuição."
  },
  {
    question: "O desconto do INSS vem antes do Imposto de Renda?",
    answer: "Sim. A ordem de cálculo é: primeiro desconta-se o INSS do salário bruto. O resultado dessa conta é a base para calcular o Imposto de Renda (IRRF). Portanto, quanto maior o INSS pago, menor a base do Imposto de Renda."
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
    "description": "Calcule o INSS 2025 com o salário mínimo de R$ 1.518. Confira a Tabela Oficial (Portaria nº 6), novas faixas de desconto e teto de R$ 951,63.",
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
      "Comparativo CLT vs Autônomo"
    ]
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora INSS 2025: Tabela Oficial e Desconto (Dezembro)",
        description: "Calcule o INSS 2025 com o salário mínimo de R$ 1.518. Confira a Tabela Oficial (Portaria nº 6), novas faixas de desconto e teto de R$ 951,63.",
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
            "Calculadora de INSS 2025: ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500", children: "Tabela e Desconto Oficial" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left md:text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-3 rounded-lg border border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block", children: "Salário Mínimo (Base)" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: "R$ 1.518,00" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-3 rounded-lg border border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block", children: "Teto do Benefício" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: "R$ 8.157,41" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-3 rounded-lg border border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block", children: "Desconto Máximo (CLT)" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: "R$ 951,63" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-3 rounded-lg border border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block", children: "Regulamentação" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: "Portaria MPS/MF nº 6" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-400 max-w-3xl mx-auto mt-6", children: [
            "O cálculo do INSS (Instituto Nacional do Seguro Social) sofreu atualizações importantes para o fechamento de 2025. Com a fixação do salário mínimo em ",
            /* @__PURE__ */ jsx("strong", { children: "R$ 1.518,00" }),
            " e a publicação da nova norma reguladora, tanto as faixas salariais quanto as parcelas de dedução foram reajustadas."
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
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-red-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-6 h-6 text-red-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Erros Comuns ao Calcular" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            "O erro mais grave é aplicar a porcentagem cheia sobre o salário total. Se você ganha ",
            /* @__PURE__ */ jsx("strong", { children: "R$ 4.000,00" }),
            ", a conta ",
            /* @__PURE__ */ jsx("strong", { children: "não é" }),
            " 4.000 × 12%."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "O sistema brasileiro é progressivo. Você paga 7,5% sobre a fatia do salário mínimo, 9% sobre a segunda fatia e 12% apenas sobre o restante. Fazer a multiplicação direta infla o valor do imposto indevidamente." }),
          /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
            "Para ter uma visão completa do seu dinheiro, incluindo descontos de IRRF, utilize nossa ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-blue-400 hover:text-blue-300 underline", children: "Calculadora de Salário Líquido" }),
            "."
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como Calcular (Passo a Passo com Exemplos)" }) })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            "A maneira mais segura de fazer a conta manual é utilizando a ",
            /* @__PURE__ */ jsx("strong", { children: "Parcela a Deduzir" }),
            ". Ela corrige a distorção da multiplicação direta."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5 mb-8", children: [
            /* @__PURE__ */ jsx("div", { className: "font-mono text-blue-400 bg-black/30 p-4 rounded-lg text-center mb-8 border border-white/10", children: "Desconto = (Salário × Alíquota) - Parcela a Deduzir" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white", children: "Exemplo 1: Salário Médio (R$ 3.500,00)" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                  "Este salário está na ",
                  /* @__PURE__ */ jsx("strong", { children: "3ª Faixa" }),
                  " (de R$ 2.793,89 até R$ 4.190,83)."
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2 text-gray-300 text-sm", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Alíquota:" }),
                    " 12%"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Cálculo:" }),
                    " (3.500 × 0,12) - 106,59"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Matemática:" }),
                    " 420,00 - 106,59"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Resultado Final:" }),
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "R$ 313,41" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-8 border-t border-white/10", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white", children: "Exemplo 2: Salário Alto (R$ 7.500,00)" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                  "Este salário está na ",
                  /* @__PURE__ */ jsx("strong", { children: "4ª Faixa" }),
                  " (de R$ 4.190,84 até R$ 8.157,41)."
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2 text-gray-300 text-sm", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Alíquota:" }),
                    " 14%"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Cálculo:" }),
                    " (7.500 × 0,14) - 190,40"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Matemática:" }),
                    " 1.050,00 - 190,40"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Resultado Final:" }),
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "R$ 859,60" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 italic mt-2", children: "* Nota: A alíquota efetiva (real) neste caso é de 11,46%, bem abaixo dos 14% nominais." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
            "Dica: O desconto do INSS reduz a base de cálculo para o Imposto de Renda. Se você tem dúvidas sobre quanto seu dinheiro rende no longo prazo, simule também na ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/fgts", className: "text-blue-400 hover:text-blue-300 underline", children: "Calculadora de FGTS" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Comparativo: CLT vs Autônomo" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Para quem está decidindo entre aceitar uma vaga CLT ou trabalhar como PJ, a diferença na contribuição pesa no bolso." }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto mb-6 rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300 uppercase", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3", children: "Detalhe" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3", children: "CLT (Carteira Assinada)" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3", children: "Autônomo (Individual)" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-white/10 bg-white/5", children: [
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-white", children: "Custo" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-300", children: "Descontado do salário (Progressivo)" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-300", children: "Paga via guia GPS (Fixo)" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-white", children: "Alíquota" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-300", children: "7,5% a 14% (Efetiva é menor)" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-300", children: "Geralmente 11% ou 20%" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-white", children: "Obrigatoriedade" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-300", children: "Automática pela empresa" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-300", children: "Responsabilidade do profissional" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-white", children: "Base Legal" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-300", children: "CLT e Portarias anuais" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-300", children: "Lei 8.212/91" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
            "Para um comparativo financeiro completo, acesse a ferramenta ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/clt-vs-pj", className: "text-blue-400 hover:text-blue-300 underline", children: "CLT vs PJ" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-purple-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Award, { className: "w-6 h-6 text-purple-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Casos Especiais" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Teto do Desconto" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                "Para quem ganha R$ 10.000,00 ou mais, o INSS trava no teto de R$ 8.157,41. O desconto máximo é ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 951,63" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Aposentado que Trabalha" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                "Quem já é aposentado mas continua com carteira assinada ",
                /* @__PURE__ */ jsx("strong", { children: "é obrigado a contribuir" }),
                ". O valor não aumenta a aposentadoria existente."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "13º Salário e Férias" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-4", children: "A tributação do abono natalino é exclusiva na fonte. Você deve calcular o INSS do 13º isoladamente." }),
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/decimo-terceiro", className: "text-xs text-blue-400 hover:text-blue-300 inline-block", children: "Calcular Décimo Terceiro →" })
            ] })
          ] })
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
//# sourceMappingURL=INSSPage-mbk91pwZ.js.map
