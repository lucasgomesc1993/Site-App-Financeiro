import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Gift, Calculator, Info, AlertCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-rtQ6fcXm.js";
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
const SALARIO_MINIMO_2025 = 1518;
const TETO_INSS_2025 = 8157.41;
const DEPENDENT_DEDUCTION = 189.59;
const THIRTEENTH_FAQS = [
  {
    question: "Qual a data limite para pagamento do décimo terceiro em 2025?",
    answer: "Em 2025, os prazos legais caem no fim de semana e devem ser antecipados. A **1ª parcela** deve ser paga até **28 de novembro** (sexta-feira) e a **2ª parcela** até **19 de dezembro** (sexta-feira). O pagamento em parcela única também deve respeitar a data de 28 de novembro para evitar multas."
  },
  {
    question: "Qual o valor máximo (teto) que posso receber de 13º em 2025?",
    answer: `Não existe um valor máximo para o recebimento do benefício, pois ele acompanha o seu salário. No entanto, existe um teto para o desconto do INSS. Se o seu salário for superior a **R$ ${TETO_INSS_2025.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}**, o desconto previdenciário será travado no valor fixo máximo (aprox. **R$ 951,63**), mas o Imposto de Renda continuará incidindo progressivamente (27,5%) sobre o excedente.`
  },
  {
    question: "O desconto do INSS é sobre o salário total ou só a segunda parcela?",
    answer: "O desconto do INSS incide sobre o **valor total** do décimo terceiro salário. Porém, como a primeira parcela é paga sem descontos, o valor integral do imposto é descontado de uma só vez no pagamento da segunda parcela, o que faz com que ela seja visivelmente menor que a primeira."
  },
  {
    question: "É possível receber o décimo terceiro integral em novembro?",
    answer: "A lei prevê o pagamento em duas parcelas (adiantamento e quitação). No entanto, muitas empresas optam por pagar o valor integral (parcela única) até o dia **30 de novembro** (antecipado para dia 28 em 2025). O pagamento integral em dezembro é ilegal e passível de multa administrativa."
  },
  {
    question: "Estagiário tem direito a décimo terceiro?",
    answer: "Não. Pela Lei do Estágio (Lei 11.788/2008), estagiários não têm vínculo empregatício e, portanto, não recebem 13º salário nem têm desconto de INSS. Eles têm direito apenas a recesso remunerado e bolsa-auxílio. Para comparar regimes de contratação, consulte nossa ferramenta <a href='/calculadoras/clt-vs-pj' class='text-blue-400 hover:text-blue-300 underline decoration-blue-400/30'>CLT vs PJ</a>."
  }
];
function ThirteenthSalaryPage() {
  const [salary, setSalary] = useState("");
  const [monthsWorked, setMonthsWorked] = useState("12");
  const [dependents, setDependents] = useState("0");
  const [resultFirst, setResultFirst] = useState(null);
  const [resultSecond, setResultSecond] = useState(null);
  const [resultTotal, setResultTotal] = useState(null);
  const [discounts, setDiscounts] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const months = parseInt(monthsWorked);
    const deps = parseInt(dependents);
    if (isNaN(sal) || isNaN(months) || months < 1 || months > 12) {
      setResultFirst(null);
      setResultSecond(null);
      setResultTotal(null);
      setDiscounts(null);
      return;
    }
    const fullThirteenth = sal / 12 * months;
    const first = fullThirteenth / 2;
    let inss = 0;
    if (fullThirteenth <= 1518) {
      inss = fullThirteenth * 0.075;
    } else if (fullThirteenth <= 2793.88) {
      inss = fullThirteenth * 0.09 - 22.77;
    } else if (fullThirteenth <= 4190.83) {
      inss = fullThirteenth * 0.12 - 106.59;
    } else if (fullThirteenth <= 8157.41) {
      inss = fullThirteenth * 0.14 - 190.4;
    } else {
      inss = 8157.41 * 0.14 - 190.4;
    }
    if (inss < 0) inss = 0;
    const irrfBase = fullThirteenth - inss - deps * DEPENDENT_DEDUCTION;
    let irrf = 0;
    if (irrfBase <= 2428.8) {
      irrf = 0;
    } else if (irrfBase <= 2826.65) {
      irrf = irrfBase * 0.075 - 182.16;
    } else if (irrfBase <= 3751.05) {
      irrf = irrfBase * 0.15 - 394.16;
    } else if (irrfBase <= 4664.68) {
      irrf = irrfBase * 0.225 - 675.49;
    } else {
      irrf = irrfBase * 0.275 - 908.73;
    }
    if (irrf < 0) irrf = 0;
    const totalDiscount = inss + irrf;
    const second = fullThirteenth - first - totalDiscount;
    setResultFirst(first);
    setResultSecond(second);
    setResultTotal(second + first);
    setDiscounts({ inss, irrf });
  };
  useEffect(() => {
    calculate();
  }, [salary, monthsWorked, dependents]);
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
    "name": "Calculadora de Décimo Terceiro 2025: Valor Líquido e Prazos",
    "url": "https://junny.com.br/calculadoras/decimo-terceiro",
    "description": "Calcule o 13º salário exato com as tabelas INSS e IRRF 2025. Veja exemplos reais de cálculo (R$ 3k e R$ 7,5k), descontos e o calendário antecipado.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
    "featureList": [
      "Cálculo de 1ª e 2ª parcela",
      "Desconto INSS e IRRF automático 2025",
      "Cálculo proporcional",
      "Calendário antecipado 2025"
    ],
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
        title: "Calculadora de Décimo Terceiro 2025: Valor Líquido e Prazos",
        description: "Calcule o 13º salário exato com as tabelas INSS e IRRF 2025. Veja exemplos reais de cálculo (R$ 3k e R$ 7,5k), descontos e o calendário antecipado.",
        canonical: "/calculadoras/decimo-terceiro"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": THIRTEENTH_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Décimo Terceiro", href: "/calculadoras/decimo-terceiro" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Gift, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de Décimo Terceiro ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500", children: "Salário 2025" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: [
            "Esta ferramenta calcula o valor real da sua gratificação natalina considerando o novo salário mínimo de ",
            /* @__PURE__ */ jsxs("strong", { children: [
              "R$ ",
              SALARIO_MINIMO_2025.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
            ] }),
            " e as tabelas progressivas do INSS e IRRF vigentes em dezembro de 2025."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
            "Calcular Agora"
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
                    inputMode: "decimal",
                    value: salary,
                    onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-mono",
                    placeholder: "0,00"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Meses Trabalhados" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    inputMode: "numeric",
                    value: monthsWorked,
                    onChange: (e) => setMonthsWorked(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-center",
                    placeholder: "12",
                    min: "1",
                    max: "12"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Regra: 15 dias ou mais contam como 1 mês." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Dependentes" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    inputMode: "numeric",
                    value: dependents,
                    onChange: (e) => setDependents(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-center",
                    placeholder: "0",
                    min: "0"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 text-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-1", children: "1ª Parcela (Adiantamento)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: resultFirst !== null ? `R$ ${resultFirst.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400/60 block mt-1", children: "Paga até 28/Nov" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 text-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-1", children: "2ª Parcela (Quitação)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: resultSecond !== null ? `R$ ${resultSecond.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400/60 block mt-1", children: "Paga até 19/Dez" })
                ] })
              ] }),
              discounts && /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mb-4 space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                  /* @__PURE__ */ jsx("span", { children: "(-) INSS Estimado (Teto R$ 951,63)" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
                    "R$ ",
                    discounts.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                  /* @__PURE__ */ jsx("span", { children: "(-) IRRF Estimado" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
                    "R$ ",
                    discounts.irrf.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-px bg-white/10 my-2" }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-white font-medium", children: [
                  /* @__PURE__ */ jsx("span", { children: "Líquido Total no Ano" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "R$ ",
                    resultTotal == null ? void 0 : resultTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-500" }),
              "Resumo em 30 segundos"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-blue-500/20 p-1 rounded mt-0.5 shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full" }) }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Salário Mínimo Base:" }),
                  " R$ ",
                  SALARIO_MINIMO_2025.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-blue-500/20 p-1 rounded mt-0.5 shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full" }) }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "1ª Parcela:" }),
                  " Vencimento antecipado para ",
                  /* @__PURE__ */ jsx("strong", { children: "28 de novembro de 2025" }),
                  " (sexta-feira)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-blue-500/20 p-1 rounded mt-0.5 shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full" }) }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "2ª Parcela:" }),
                  " Vencimento antecipado para ",
                  /* @__PURE__ */ jsx("strong", { children: "19 de dezembro de 2025" }),
                  " (sexta-feira)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-blue-500/20 p-1 rounded mt-0.5 shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full" }) }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Teto do INSS:" }),
                  " Base limitada a R$ ",
                  TETO_INSS_2025.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
                  "."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4 text-white", children: "Exemplos Práticos" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400 leading-relaxed", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white/5 rounded-xl", children: [
                /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Caso 1: Salário R$ 3.000,00" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-4 space-y-1 text-xs", children: [
                  /* @__PURE__ */ jsx("li", { children: "1ª Parcela: R$ 1.500,00" }),
                  /* @__PURE__ */ jsx("li", { children: "Desc. INSS: R$ 253,41" }),
                  /* @__PURE__ */ jsx("li", { children: "Desc. IRRF: R$ 23,83" }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("strong", { children: "2ª Parcela: R$ 1.222,76" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white/5 rounded-xl", children: [
                /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Caso 2: Salário R$ 7.500,00" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-4 space-y-1 text-xs", children: [
                  /* @__PURE__ */ jsx("li", { children: "1ª Parcela: R$ 3.750,00" }),
                  /* @__PURE__ */ jsx("li", { children: "Desc. INSS: R$ 859,60" }),
                  /* @__PURE__ */ jsx("li", { children: "Desc. IRRF: R$ 917,38" }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("strong", { children: "2ª Parcela: R$ 1.973,02" }) })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8 space-y-12", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-6", children: "Como Calcular o Décimo Terceiro" }),
            /* @__PURE__ */ jsxs("div", { className: "text-gray-400 space-y-4 leading-relaxed text-lg", children: [
              /* @__PURE__ */ jsx("p", { children: 'O cálculo do 13º salário não é uma simples divisão do salário atual. Ele envolve duas etapas distintas, datas de corte específicas e deduções fiscais que só ocorrem no final do ano. Para encontrar o desconto correto do INSS sem precisar calcular faixa por faixa, utiliza-se a lógica da "Parcela a Deduzir".' }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border-l-4 border-blue-500", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-white font-bold mb-2", children: "Fórmula Básica" }),
                /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-blue-300", children: "(Salário x Alíquota) - Parcela a Deduzir = Valor INSS" }),
                /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-blue-300 mt-2", children: "(Valor Total Bruto - Desconto INSS - Desconto IRRF) - Valor da 1ª Parcela = 2ª Parcela Líquida" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-6", children: "Tabelas de Referência 2025" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-4", children: "Contribuição Previdenciária (INSS) 2025" }),
                /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-white/5 border-b border-white/10", children: [
                    /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Faixa Salarial (R$)" }),
                    /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Alíquota" }),
                    /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Parcela a Deduzir" })
                  ] }) }),
                  /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 text-sm", children: [
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "Até 1.518,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "7,5%" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "-" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 1.518,01 até 2.793,88" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "9,0%" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 22,77" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 2.793,89 até 4.190,83" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "12,0%" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 106,59" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5", children: [
                      /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
                        "De 4.190,84 até ",
                        TETO_INSS_2025.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      ] }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "14,0%" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 190,40" })
                    ] })
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-4", children: "Imposto de Renda (IRRF) - Vigência Maio/2025" }),
                /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-white/5 border-b border-white/10", children: [
                    /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Base de Cálculo (R$)" }),
                    /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Alíquota" }),
                    /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Parcela a Deduzir" })
                  ] }) }),
                  /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 text-sm", children: [
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "Até 2.428,80" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "Isento" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "0,00" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 2.428,81 até 2.826,65" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "7,5%" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 182,16" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 2.826,66 até 3.751,05" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "15,0%" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 394,16" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "De 3.751,06 até 4.664,68" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "22,5%" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 675,49" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "Acima de 4.664,68" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "27,5%" }),
                      /* @__PURE__ */ jsx("td", { className: "p-4", children: "R$ 908,73" })
                    ] })
                  ] })
                ] }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-6", children: "Erros Comuns e a Regra dos 15 Dias" }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-white font-bold mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-yellow-500" }),
                  "Erro da Multiplicação"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: 'Um equívoco frequente é aplicar a porcentagem da alíquota diretamente sobre o salário total (ex: R$ 3.000 × 12% = R$ 360,00). Isso está errado! O método correto exige subtrair a "Parcela a Deduzir", reduzindo o desconto real.' })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-white font-bold mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-blue-500" }),
                  "Regra dos 15 Dias"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm", children: [
                  "Para ter direito a 1/12 do benefício, você precisa ter trabalhado ",
                  /* @__PURE__ */ jsx("strong", { children: "pelo menos 15 dias" }),
                  " naquele mês.",
                  /* @__PURE__ */ jsx("span", { className: "block mt-2 text-xs text-gray-500", children: "Ex: Admitidos dia 17 de janeiro perdem o avo de janeiro." })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-6", children: "Casos Especiais e Médias" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Médias de Horas Extras e Comissões:" }),
                " Uma atualização importante define que o reflexo das ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "text-blue-400 hover:text-blue-300 underline", children: "horas extras" }),
                " no Descanso Semanal Remunerado (DSR) também deve compor a base de cálculo."
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: 'O "Ajuste de Janeiro":' }),
                " Se você recebe comissões, é impossível calcular o valor exato em dezembro. As empresas pagam uma prévia e, em janeiro, fazem o ajuste final (pagando a diferença ou descontando)."
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Aposentados e Pensionistas:" }),
                " O INSS costuma antecipar o pagamento. Aposentados acima de 65 anos têm uma parcela extra de isenção no IRRF."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4 space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Veja Também" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs(Link, { to: "/calculadoras/salario-liquido", className: "block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-blue-400 font-medium text-sm mb-1", children: "Calculadora Salário Líquido" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Simule seu salário mensal com os descontos de 2025." })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/calculadoras/rescisao", className: "block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-blue-400 font-medium text-sm mb-1", children: "Calcular Rescisão" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Veja quanto recebe ao sair da empresa." })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/calculadoras/ferias", className: "block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-blue-400 font-medium text-sm mb-1", children: "Calculadora de Férias" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Planeje o valor das suas férias com 1/3." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-yellow-500/10 p-2 rounded-lg shrink-0", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-yellow-500" }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-white font-bold text-sm", children: "Atenção aos Prazos" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 leading-relaxed mb-4", children: [
              "O não pagamento da 1ª parcela até ",
              /* @__PURE__ */ jsx("strong", { children: "28 de Novembro" }),
              " ou da 2ª até ",
              /* @__PURE__ */ jsx("strong", { children: "19 de Dezembro" }),
              " pode gerar multas para a empresa."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: THIRTEENTH_FAQS,
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
  ThirteenthSalaryPage
};
//# sourceMappingURL=ThirteenthSalaryPage-DoybU4vX.js.map
