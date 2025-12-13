import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ShieldCheck, Calculator, Info, AlertCircle, FileText, TrendingDown, HelpCircle, Award, DollarSign } from "lucide-react";
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
    question: "Qual o valor do desconto do INSS para quem ganha um salário mínimo em 2025?",
    answer: "Quem recebe o piso nacional de <strong>R$ 1.518,00</strong> terá um desconto exato de <strong>7,5%</strong>, resultando em uma contribuição de <strong>R$ 113,85</strong>. Neste cenário, não há aplicação de outras faixas progressivas. O salário líquido restante, antes de outros descontos como vale-transporte, será de <strong>R$ 1.404,15</strong>. Você pode simular outros valores na <strong>Calculadora INSS 2025</strong> acima."
  },
  {
    question: "O que acontece se eu ganhar mais que o teto de R$ 8.157,41?",
    answer: "O desconto do INSS estaciona no limite estabelecido pela previdência. O valor descontado será fixo em <strong>R$ 951,63</strong>, independentemente de o salário ser R$ 10.000,00 ou R$ 50.000,00. Este teto é o limite máximo calculado pela <strong>Calculadora INSS 2025</strong>; todo o valor que ultrapassar R$ 8.157,41 fica isento de contribuição previdenciária."
  },
  {
    question: "Como calcular INSS sobre férias em 2025?",
    answer: "O cálculo nas férias incide sobre a remuneração das férias acrescida do <strong>terço constitucional</strong>. Deve-se somar o salário base + 1/3, verificar em qual faixa da tabela de 2025 esse total se encaixa e aplicar a alíquota progressiva. Frequentemente, o trabalhador muda de faixa no mês das férias."
  },
  {
    question: "A tabela do INSS 2025 já está oficializada?",
    answer: "Sim. A tabela com o salário mínimo de <strong>R$ 1.518,00</strong> e o reajuste de 4,77% para as demais faixas foi totalmente oficializada. Os dados constam na <a href='https://www.gov.br/previdencia/pt-br/assuntos/rpps/destaques/portaria-interministerial-mps-mf-no-6-de-10-01-2025' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>Portaria Interministerial MPS/MF nº 6</a>, publicada em janeiro de 2025, garantindo a validade jurídica para todos os cálculos de folha de pagamento deste ano."
  },
  {
    question: "Autônomo pode pagar INSS retroativo?",
    answer: "Sim, mas com ressalvas. Se for a primeira contribuição, só é possível pagar em dia. Para períodos passados, é necessário comprovar a atividade profissional e calcular juros e multa. É recomendável consultar a <a href='https://www.gov.br/previdencia/pt-br/assuntos/rpps/destaques/portaria-interministerial-mps-mf-no-6-de-10-01-2025' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>Portaria Interministerial MPS/MF nº 6</a> para verificar as regras de atualização monetária vigentes."
  },
  {
    question: "O desconto do INSS muda o valor do vale-transporte?",
    answer: "Não diretamente. O INSS é descontado do salário bruto. O vale-transporte (até 6%) também é calculado sobre o salário base, não sobre o líquido após INSS. No entanto, o INSS reduz a base de cálculo para o Imposto de Renda (IRRF)."
  },
  {
    question: "Aposentado que continua trabalhando paga INSS 2025?",
    answer: "Sim. O aposentado que retorna ao mercado de trabalho com carteira assinada (CLT) é obrigado a contribuir normalmente para a Previdência Social, conforme a tabela do <strong>INSS 2025</strong>. O desconto segue as mesmas alíquotas progressivas, mas infelizmente essa contribuição não gera direito a um novo benefício ou revisão da aposentadoria atual."
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
    "description": "Use nossa Calculadora INSS 2025 oficial. Tabela progressiva, teto de R$ 8.157,41 e desconto máximo de R$ 951,63. Veja o passo a passo atualizado.",
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
        title: "Calculadora INSS 2025: Tabela Oficial e Desconto",
        description: "Use nossa Calculadora INSS 2025 oficial. Tabela progressiva, teto de R$ 8.157,41 e desconto máximo de R$ 951,63. Veja o passo a passo atualizado.",
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
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Portaria MPS/MF nº 6 de 2025" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de INSS 2025: ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500", children: "Tabela Oficial e Desconto Atualizado (Com Dedução)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
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
                    inputMode: "decimal",
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
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-6 flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-500" }),
            "Resumo Rápido: Dados Oficiais 2025"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6 text-sm", children: [
            "A tabela do ",
            /* @__PURE__ */ jsx("strong", { children: "INSS 2025" }),
            " foi atualizada com o novo salário mínimo de R$ 1.518,00 e reajuste de 4,77% no teto previdenciário. Confira abaixo os valores exatos para o cálculo da sua folha de pagamento em dezembro de 2025:"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 p-3 rounded-xl border bg-white/5 border-white/5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-blue-500 mt-0.5", children: "•" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium block", children: "Salário Mínimo" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "R$ 1.518,00 (Base da 1ª faixa)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 p-3 rounded-xl border bg-white/5 border-white/5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-blue-500 mt-0.5", children: "•" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium block", children: "Teto do INSS" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "R$ 8.157,41 (Limite máximo)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 p-3 rounded-xl border bg-white/5 border-white/5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-blue-500 mt-0.5", children: "•" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium block", children: "Desconto Máximo" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "R$ 951,63 (Acima do teto)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 p-3 rounded-xl border bg-white/5 border-white/5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-blue-500 mt-0.5", children: "•" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium block", children: "Alíquotas" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "Progressivas: 7,5%, 9%, 12% e 14%" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-200/80", children: [
                /* @__PURE__ */ jsx("strong", { children: "Resumo em 30 segundos:" }),
                " Em 2025, o teto é R$ 8.157,41 e o desconto segue tabela progressiva. Use a ",
                /* @__PURE__ */ jsx("strong", { children: "Calculadora INSS 2025" }),
                " para obter o valor líquido exato com a dedução legal."
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto mb-16 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-300 leading-relaxed", children: [
        "O cálculo do INSS mudou com o novo salário mínimo de ",
        /* @__PURE__ */ jsx("strong", { children: "R$ 1.518,00" }),
        " vigente em 2025. Para trabalhadores CLT, o desconto não é mais uma porcentagem simples sobre o total, mas sim um cálculo progressivo dividido em faixas salariais. Quem recebe acima de ",
        /* @__PURE__ */ jsx("strong", { children: "R$ 8.157,41" }),
        " pagará o valor fixo de teto, estabelecido em ",
        /* @__PURE__ */ jsx("strong", { children: "R$ 951,63" }),
        ". Esta ",
        /* @__PURE__ */ jsx("strong", { children: "Calculadora INSS 2025" }),
        " aplica a ",
        /* @__PURE__ */ jsx("strong", { children: "Portaria Interministerial MPS/MF nº 6" }),
        " para entregar o valor exato a ser descontado do seu holerite ou pró-labore."
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12 mb-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(TrendingDown, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Tabela INSS 2025 Oficial (Com Parcela a Deduzir)" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            'A tabela abaixo é a referência absoluta para o cálculo de contribuição previdenciária de trabalhadores empregados, domésticos e avulsos em 2025. A coluna "Parcela a Deduzir" é essencial para realizar o cálculo manual de forma simplificada, validando o resultado apresentado pela ',
            /* @__PURE__ */ jsx("strong", { children: "Calculadora INSS 2025" }),
            " sem precisar somar faixa por faixa."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10 mb-6", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "p-4 font-semibold text-white", children: "Faixa de Salário de Contribuição (R$)" }),
              /* @__PURE__ */ jsx("th", { className: "p-4 font-semibold text-white text-center", children: "Alíquota Progressiva" }),
              /* @__PURE__ */ jsx("th", { className: "p-4 font-semibold text-white text-center", children: "Parcela a Deduzir (R$)" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-white/5 text-gray-400", children: [
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
                  "Até ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 1.518,00" })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "7,5%" }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "-" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "De R$ 1.518,01 até R$ 2.793,88" }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "9%" }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "R$ 22,77" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "De R$ 2.793,89 até R$ 4.190,83" }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "12%" }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "R$ 106,59" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
                  "De R$ 4.190,84 até ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 8.157,41" })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "14%" }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: "R$ 190,40" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
            /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
            " Dados baseados na ",
            /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/previdencia/pt-br/assuntos/rpps/destaques/portaria-interministerial-mps-mf-no-6-de-10-01-2025", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:text-blue-300 underline", children: "Portaria Interministerial MPS/MF nº 6" }),
            ", que oficializou o reajuste de 4,77% para 2025."
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como funciona a Progressividade do INSS" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            "Desde a Reforma da Previdência (",
            /* @__PURE__ */ jsx("a", { href: "http://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc103.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:text-blue-300 underline", children: "Emenda Constitucional nº 103" }),
            '), o cálculo do INSS deixou de ser uma alíquota única aplicada sobre todo o salário. Hoje, ele funciona como um sistema de "degraus" e nossa ',
            /* @__PURE__ */ jsx("strong", { children: "Calculadora INSS 2025" }),
            " considera isso automaticamente."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Se você ganha R$ 3.000,00, você não paga 12% sobre tudo. Você paga:" }),
          /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2 text-gray-300 mb-6", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "7,5%" }),
              " sobre a parcela que vai até R$ 1.518,00;"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "9%" }),
              " sobre a parcela entre R$ 1.518,01 e R$ 2.793,88;"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "12%" }),
              " apenas sobre o restante que ultrapassa R$ 2.793,88."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
            "Isso torna a ",
            /* @__PURE__ */ jsx("strong", { children: "alíquota efetiva" }),
            " (o que você realmente paga) menor do que a alíquota nominal da tabela."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como Calcular o Desconto (Passo a Passo)" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            'Para facilitar a vida de profissionais de RH e trabalhadores, utilizamos a fórmula da "Parcela a Deduzir". Com ela, você ajusta a progressividade em uma única conta matemática, garantindo o mesmo resultado da ',
            /* @__PURE__ */ jsx("strong", { children: "Calculadora INSS 2025" }),
            " online."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5 mb-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "A Fórmula Mágica" }),
            /* @__PURE__ */ jsx("div", { className: "font-mono text-blue-400 bg-black/30 p-4 rounded-lg text-center mb-6 border border-white/10", children: "(Salário Bruto × Alíquota da Faixa) - Parcela a Deduzir = Valor do INSS" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white", children: "Exemplo Prático: Salário de R$ 3.000,00" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Um trabalhador com salário de R$ 3.000,00 se enquadra na 3ª faixa (alíquota de 12%)." }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2 text-gray-300 text-sm", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "1. Identifique a alíquota:" }),
                    " 12% (pois R$ 3.000 está entre R$ 2.793,89 e R$ 4.190,83)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "2. Identifique a dedução:" }),
                    " R$ 106,59."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "3. Aplique a fórmula:" }),
                    " (3.000,00 × 0,12) - 106,59"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Resultado:" }),
                    " 360,00 - 106,59 = ",
                    /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "R$ 253,41" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 italic mt-2", children: [
                  "O desconto será de ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 253,41" }),
                  ". Se você aplicasse 12% direto, o valor seria R$ 360,00, o que estaria errado."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-8 border-t border-white/10", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white", children: "Exemplo Prático: Salário acima do Teto (ex: R$ 10.000,00)" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                  "Para quem ganha R$ 10.000,00 (ou qualquer valor acima de R$ 8.157,41), a ",
                  /* @__PURE__ */ jsx("strong", { children: "Calculadora INSS 2025" }),
                  " utiliza a base travada no teto."
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2 text-gray-300 text-sm", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "1. Identifique a faixa:" }),
                    " Teto máximo (base de cálculo limitada a R$ 8.157,41)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "2. Aplique a fórmula no Teto:" }),
                    " (8.157,41 × 0,14) - 190,40"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Resultado:" }),
                    " 1.142,03 - 190,40 = ",
                    /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "R$ 951,63" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 italic mt-2", children: [
                  "O desconto será de ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 951,63" }),
                  ". Qualquer valor de salário que exceda o teto é isento de contribuição para o INSS."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
            "Após descobrir o desconto do INSS, o próximo passo para saber quanto dinheiro cairá na sua conta é calcular o Imposto de Renda. Você pode fazer isso utilizando nossa ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-blue-400 hover:text-blue-300 underline", children: "calculadora de salário líquido 2025" }),
            ", que já considera o INSS deduzido na base de cálculo do IRRF."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-red-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-6 h-6 text-red-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Erros Comuns ao Calcular o INSS" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            "A complexidade da tabela progressiva gera falhas frequentes nas folhas de pagamento manuais, tornando indispensável o uso da ",
            /* @__PURE__ */ jsx("strong", { children: "Calculadora INSS 2025" }),
            " para conferência e prevenção de equívocos."
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-gray-300", children: [
              /* @__PURE__ */ jsx("span", { className: "text-red-500 font-bold", children: "•" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Ignorar a Dedução:" }),
                " O erro mais grave é multiplicar o salário direto pela alíquota (ex: R$ 5.000 x 14% = R$ 700,00). O valor correto, usando a dedução de R$ 190,40, seria R$ 509,60."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-gray-300", children: [
              /* @__PURE__ */ jsx("span", { className: "text-red-500 font-bold", children: "•" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Confusão com o FGTS:" }),
                " O desconto do INSS reduz o salário líquido, mas ",
                /* @__PURE__ */ jsx("strong", { children: "não" }),
                " reduz a base de cálculo do Fundo de Garantia. O depósito de 8% do empregador é feito sobre o salário bruto e não sofre impacto da tabela previdenciária."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-gray-300", children: [
              /* @__PURE__ */ jsx("span", { className: "text-red-500 font-bold", children: "•" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Férias e Adicionais:" }),
                " Quando você recebe o terço constitucional de férias ou ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "text-blue-400 hover:text-blue-300 underline", children: "horas extras" }),
                ', sua remuneração no mês aumenta. Isso pode fazer você "saltar" para uma faixa de alíquota superior temporariamente, aumentando o desconto. Entenda melhor o impacto financeiro no seu descanso em nossa página sobre ',
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/ferias", className: "text-blue-400 hover:text-blue-300 underline", children: "cálculo de férias" }),
                "."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-purple-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Award, { className: "w-6 h-6 text-purple-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Guia Avançado: Autônomos, Pró-Labore e Estagiários" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            "A tabela progressiva acima é exclusiva para quem tem carteira assinada (CLT), sendo o foco principal da ",
            /* @__PURE__ */ jsx("strong", { children: "Calculadora INSS 2025" }),
            ". Outras modalidades de trabalho seguem regras próprias neste ano."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Diferença: CLT vs. Autônomo" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mb-4", children: [
                "A principal diferença no cálculo é que, enquanto o trabalhador CLT paga conforme a tabela progressiva, o autônomo paga uma ",
                /* @__PURE__ */ jsx("strong", { children: "alíquota fixa" }),
                " aplicada diretamente sobre o salário de contribuição, sem parcelas a deduzir. Para quem recolhe via GPS (Guia da Previdência Social), existem dois planos principais, conforme orientações da ",
                /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/tributos/contribuicoes-previdenciarias", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:text-blue-300 underline", children: "Receita Federal do Brasil" }),
                ":"
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-300", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "1. Plano Normal (20%):" }),
                  " Dá direito à aposentadoria por tempo de contribuição. O valor é 20% sobre o salário de contribuição (limitado ao teto de R$ 8.157,41)."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "2. Plano Simplificado (11%):" }),
                  " Apenas para aposentadoria por idade (pelo salário mínimo). A alíquota é 11% sobre o salário mínimo (R$ 1.518,00)."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Pró-Labore (Sócios)" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mb-4", children: [
                  "Sócios pagam ",
                  /* @__PURE__ */ jsx("strong", { children: "11% fixos" }),
                  " sobre o valor bruto, até o teto. Sem progressividade de 7,5% ou 9%. A empresa paga mais 20% de Patronal, salvo se for do Simples Nacional em anexo desonerado. Duvidas? Use a calculadora ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/clt-vs-pj", className: "text-blue-400 hover:text-blue-300 underline", children: "CLT vs PJ" }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Estagiários" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                  "Pela Lei do Estágio, a bolsa-auxílio ",
                  /* @__PURE__ */ jsx("strong", { children: "não sofre desconto de INSS" }),
                  ". O estagiário é isento, a menos que decida contribuir como segurado facultativo."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-green-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6 text-green-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Qual o Teto do INSS em 2025?" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            "O limite máximo de salário de contribuição em 2025 é ",
            /* @__PURE__ */ jsx("strong", { children: "R$ 8.157,41" }),
            ". Isso significa que, mesmo que um diretor de empresa ganhe R$ 30.000,00 mensais, ele só contribuirá para a previdência sobre os R$ 8.157,41."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            "Consequentemente, existe um ",
            /* @__PURE__ */ jsx("strong", { children: "Desconto Máximo" }),
            " travado. Ninguém que segue a tabela progressiva CLT pagará mais do que ",
            /* @__PURE__ */ jsx("strong", { children: "R$ 951,63" }),
            " de INSS neste ano. Esse valor é a soma de todas as faixas máximas acumuladas."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
            "Ao receber o ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/decimo-terceiro", className: "text-blue-400 hover:text-blue-300 underline", children: "13º salário" }),
            ", o teto é calculado separadamente. Ou seja, você pode atingir o teto no salário mensal e também no pagamento natalino, contribuindo duplamente no ano, mas sobre competências diferentes."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: INSS_FAQS,
          title: "Perguntas Frequentes sobre INSS 2025",
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
//# sourceMappingURL=INSSPage-Dewbhene.js.map
