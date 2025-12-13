import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Gift, Calculator, FileText, DollarSign, Clock, Percent, Info, AlertCircle } from "lucide-react";
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
const DEPENDENT_DEDUCTION = 189.59;
const INSS_CEILING_DISCOUNT = 951.63;
const THIRTEENTH_FAQS = [
  {
    question: "Qual o prazo máximo para o pagamento da segunda parcela em 2025?",
    answer: "O prazo legal é dia 20 de dezembro. Porém, em 2025, o dia 20 cai em um sábado. Portanto, o pagamento deve ser antecipado obrigatoriamente para o dia **19 de dezembro de 2025** (sexta-feira)."
  },
  {
    question: "Qual o valor máximo do desconto de INSS no 13º em 2025?",
    answer: "Para quem recebe acima do teto previdenciário (R$ 8.157,41), o desconto máximo de INSS será de aproximadamente **R$ 951,63**. Esse valor é a soma das contribuições máximas de cada faixa progressiva e serve de dedução para a base do Imposto de Renda."
  },
  {
    question: "O INSS e o Imposto de Renda são descontados na primeira parcela?",
    answer: "Não. A primeira parcela (paga até 30/11) corresponde a 50% do salário bruto, sem descontos. Todos os encargos (INSS e IRRF) são descontados integralmente na segunda parcela, sobre o valor total do benefício."
  },
  {
    question: "Quem recebe auxílio-doença tem direito ao décimo terceiro?",
    answer: 'A empresa paga apenas os avos proporcionais aos meses trabalhados (incluindo os primeiros 15 dias de afastamento). O restante do período é pago pelo INSS sob a forma de "Abono Anual".'
  },
  {
    question: "Como funciona o 13º salário para quem ganha comissão?",
    answer: "Calcula-se a média das comissões recebidas de janeiro a novembro para o pagamento em dezembro. Em janeiro do ano seguinte (até dia 10), a empresa deve recalcular incluindo as comissões de dezembro e pagar a diferença (ajuste)."
  },
  {
    question: "É possível receber a primeira parcela nas férias?",
    answer: "Sim, desde que o trabalhador tenha solicitado isso formalmente à empresa durante o mês de janeiro do ano corrente. Caso contrário, fica a critério do empregador antecipar ou pagar no prazo legal de novembro."
  },
  {
    question: "O desconto do INSS sobre o 13º é o mesmo do salário mensal?",
    answer: "A tabela de alíquotas é a mesma, mas o cálculo é feito em separado. O valor do 13º não se soma ao salário de dezembro para apuração do imposto; ele possui tributação exclusiva e definitiva."
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
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
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
      inss = INSS_CEILING_DISCOUNT;
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Décimo Terceiro 2025: Valor Líquido e Prazos",
    "url": "https://junny.com.br/calculadoras/decimo-terceiro",
    "description": "Calcule seu 13º Salário 2025 exato. Confira descontos de INSS/IRRF (teto R$ 8.157,41), prazos oficiais e regra de médias para pagamento líquido.",
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
        description: "Calcule seu 13º Salário 2025 exato. Confira descontos de INSS/IRRF (teto R$ 8.157,41), prazos oficiais e regra de médias para pagamento líquido.",
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
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-500" }),
            "Resumo Rápido (Dados Oficiais Dezembro/2025)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Salário Mínimo Base" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 1.518,00" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Teto do INSS" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 8.157,41" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Desconto Máximo INSS:" }),
                  " R$ 951,63."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Prazo da 2ª Parcela:" }),
                  " Até 19 de dezembro de 2025 (Antecipado)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Percent, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Modelo de Tributação:" }),
                  " Progressiva (descontos incidem sobre o valor total na 2ª parcela)."
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Resumo em 30 Segundos" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-300 leading-relaxed", children: 'O **Décimo Terceiro Salário** é um direito fundamental que funciona como uma gratificação natalina proporcional aos meses trabalhados. Em 2025, o cálculo final exige atenção redobrada devido às novas faixas de tributação progressiva: o valor que cai na conta em dezembro (2ª parcela) sofre todos os descontos acumulados de INSS e Imposto de Renda. Use esta ferramenta para prever quanto sobrará no seu bolso após o "leão" e garantir o pagamento de dívidas ou as compras de fim de ano com segurança.' })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Info, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Tabela Oficial de Descontos 2025" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Para chegar ao valor líquido final, o cálculo utiliza a Tabela Progressiva do INSS (atualizada para o teto de R$ 8.157,41) e a Tabela do Imposto de Renda vigente desde maio de 2025." }),
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Como funciona a Progressividade" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: 'Diferente do modelo antigo, a alíquota não incide sobre o salário total de uma só vez. O cálculo é feito por "fatias": você paga 7,5% sobre a primeira parte do salário (até o mínimo), 9% sobre a segunda parte, e assim por diante. O valor final é a soma dessas fatias, o que torna o imposto mais justo do que a aplicação direta da alíquota maior sobre todo o montante.' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "1. Tabela de Contribuição Previdenciária (INSS)" }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Faixa de Salário de Contribuição (R$)" }),
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Alíquota Progressiva" }),
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Parcela a Deduzir (R$)" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsxs("td", { className: "p-3", children: [
                    "Até ",
                    /* @__PURE__ */ jsx("strong", { children: "1.518,00" })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "7,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "-" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 1.518,01 até 2.793,88" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "9,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 22,77" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 2.793,89 até 4.190,83" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "12,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 106,59" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsxs("td", { className: "p-3", children: [
                    "De 4.190,84 até ",
                    /* @__PURE__ */ jsx("strong", { children: "8.157,41" })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "14,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 190,40" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 text-xs text-gray-500", children: [
              /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
              " Dados baseados na ",
              /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/inss/pt-br/noticias/confira-como-ficaram-as-aliquotas-de-contribuicao-ao-inss", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Portaria Interministerial referente aos benefícios de 2025" }),
              " e projeções econômicas."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "2. Tabela de Imposto de Renda (IRRF)" }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Base de Cálculo (R$)" }),
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Alíquota (%)" }),
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Parcela a Deduzir (R$)" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsxs("td", { className: "p-3", children: [
                    "Até ",
                    /* @__PURE__ */ jsx("strong", { children: "2.428,80" })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Isento" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "-" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 2.428,81 até 2.826,65" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "7,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 182,16" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 2.826,66 até 3.751,05" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "15,0%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 394,16" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "De 3.751,06 até 4.664,68" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "22,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 675,49" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Acima de 4.664,68" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "27,5%" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "R$ 908,73" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 text-xs text-gray-500", children: [
              /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
              " Consulte a tabela progressiva mensal vigente diretamente no site da ",
              /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Receita Federal" }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como Calcular o Décimo Terceiro (Passo a Passo)" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: 'O cálculo exato exige atenção porque a tributação ocorre quase inteiramente na segunda parcela. A primeira parcela (adiantamento), paga até novembro, corresponde a 50% do bruto sem descontos. O "acerto de contas" acontece agora em dezembro.' }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Diferença: 1ª Parcela vs 2ª Parcela" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "1ª Parcela (Adiantamento):" }),
                  " Paga entre fevereiro e novembro. Corresponde a ",
                  /* @__PURE__ */ jsx("strong", { children: "50% do salário bruto" }),
                  " do mês anterior, sem nenhum desconto de impostos (INSS ou IRRF)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "2ª Parcela (Quitação):" }),
                  " Paga até 20 de dezembro (antecipado para dia 19 em 2025). É feito o cálculo do 13º integral, subtraem-se o ",
                  /* @__PURE__ */ jsx("strong", { children: "INSS total" }),
                  ", o ",
                  /* @__PURE__ */ jsx("strong", { children: "IRRF total" }),
                  " e o valor já adiantado na 1ª parcela. O saldo restante é o valor líquido."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border-l-4 border-blue-500 mt-6", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-white font-bold mb-2", children: "A Fórmula Matemática" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300 mb-2", children: [
                "Para encontrar o valor da ",
                /* @__PURE__ */ jsx("strong", { children: "2ª Parcela" }),
                ", utilizamos a seguinte lógica:"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-blue-300 bg-black/20 p-2 rounded", children: "V_2parc = (V_BrutoTotal - INSS_total - IRRF_total) - V_1parc" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-white mb-2", children: "Exemplo 1: Salário Intermediário (R$ 5.000,00)" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-3", children: "Trabalhador que ganha R$ 5.000,00 e trabalhou os 12 meses." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-xs text-gray-300", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "1. ",
                  /* @__PURE__ */ jsx("strong", { children: "1ª Parcela (Adiantamento):" }),
                  " R$ 2.500,00."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "2. ",
                  /* @__PURE__ */ jsx("strong", { children: "Cálculo do INSS Total:" }),
                  " O desconto total é de ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 509,59" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "3. ",
                  /* @__PURE__ */ jsx("strong", { children: "Cálculo do IRRF:" }),
                  /* @__PURE__ */ jsxs("ul", { className: "pl-4 mt-1 border-l border-white/10", children: [
                    /* @__PURE__ */ jsx("li", { children: "Base: R$ 4.490,41." }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "Imposto: (4.490,41 × 22,5%) - 675,49 = ",
                      /* @__PURE__ */ jsx("strong", { children: "R$ 334,85" }),
                      "."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "4. ",
                  /* @__PURE__ */ jsx("strong", { children: "Valor Líquido da 2ª Parcela:" })
                ] }),
                /* @__PURE__ */ jsx("li", { children: "R$ 5.000,00 - R$ 509,59 - R$ 334,85 - R$ 2.500,00." }),
                /* @__PURE__ */ jsx("li", { className: "text-green-400 font-bold mt-1", children: "A receber em Dezembro: R$ 1.655,56." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-white mb-2", children: "Exemplo 2: Salário no Teto do INSS (R$ 8.157,41)" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-xs text-gray-300", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "1. ",
                  /* @__PURE__ */ jsx("strong", { children: "1ª Parcela (Adiantamento):" }),
                  " R$ 4.078,70."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "2. ",
                  /* @__PURE__ */ jsx("strong", { children: "Cálculo do INSS Total:" }),
                  " ",
                  /* @__PURE__ */ jsx("strong", { children: "Desconto Máximo: R$ 951,63" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "3. ",
                  /* @__PURE__ */ jsx("strong", { children: "Cálculo do IRRF:" }),
                  /* @__PURE__ */ jsxs("ul", { className: "pl-4 mt-1 border-l border-white/10", children: [
                    /* @__PURE__ */ jsx("li", { children: "Base: R$ 7.205,78." }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "Imposto: (7.205,78 × 27,5%) - 908,73 = ",
                      /* @__PURE__ */ jsx("strong", { children: "R$ 1.072,86" }),
                      "."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "4. ",
                  /* @__PURE__ */ jsx("strong", { children: "Valor Líquido da 2ª Parcela:" })
                ] }),
                /* @__PURE__ */ jsx("li", { children: "R$ 8.157,41 - 951,63 - 1.072,86 - 4.078,70." }),
                /* @__PURE__ */ jsx("li", { className: "text-green-400 font-bold mt-1", children: "A receber em Dezembro: R$ 2.054,22." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-6 text-sm text-gray-400", children: [
          "Se houver dúvidas sobre os descontos mensais regulares, compare com nossa calculadora de ",
          /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-blue-400 hover:underline", children: "salário líquido" }),
          " para entender a diferença na tributação."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-yellow-500 shrink-0" }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-yellow-200 mb-2", children: "Erros Comuns e a Regra dos 15 Dias" }) })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-yellow-100/70", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "shrink-0", children: "•" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Um erro frequente é achar que basta dividir o salário por 12. É obrigatório aplicar a ",
              /* @__PURE__ */ jsx("strong", { children: "Regra do Dia 15" }),
              ": para ter direito a 1/12 (um avo) do benefício, você precisa ter trabalhado pelo menos 15 dias naquele mês."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "shrink-0", children: "•" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "O Erro da Multiplicação Simples:" }),
              ' Um equívoco clássico é pegar o salário total (ex: R$ 5.000) e multiplicar direto pela alíquota da faixa final (14%). Isso gera um valor de desconto muito maior do que o real. O correto é sempre aplicar a tabela progressiva faixa a faixa ou usar a "Parcela a Deduzir" para corrigir o cálculo.'
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "shrink-0", children: "•" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Faltas Injustificadas:" }),
              " Se você teve muitas faltas em um mês específico e trabalhou menos de 15 dias, aquele mês não conta para o cálculo."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "shrink-0", children: "•" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Admissão Recente:" }),
              " Se foi contratado após o dia 17 do mês (em meses de 31 dias), aquele primeiro mês não entra na conta."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-yellow-100/70", children: [
          "Se você está saindo da empresa agora, o cálculo muda e entra como verba de ",
          /* @__PURE__ */ jsx(Link, { to: "/calculadoras/rescisao", className: "text-yellow-200 hover:underline underline", children: "rescisão" }),
          ", onde o pagamento é proporcional."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "Médias de Horas Extras e Comissões" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm mb-4", children: [
            "O 13º Salário deve refletir a sua remuneração real, não apenas o salário base. Se você fez ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "text-blue-400 hover:underline", children: "horas extras" }),
            " ou recebeu comissões durante o ano, deve-se calcular a média:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-300", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Horas Extras:" }),
              " Soma-se a ",
              /* @__PURE__ */ jsx("strong", { children: "quantidade" }),
              " de horas feitas, divide-se pelos meses trabalhados e multiplica-se pelo valor da hora em dezembro. É obrigatório incluir o reflexo do DSR (Descanso Semanal Remunerado)."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Comissões:" }),
              " Faz-se a média aritmética dos valores recebidos (geralmente corrigidos) de janeiro a novembro. O ajuste referente às vendas de dezembro é pago até 10 de janeiro do ano seguinte."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "Situações Especiais" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-300", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-blue-400 font-bold mb-1", children: "Licença-Maternidade" }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Durante a licença, o contrato não é suspenso. A empresa paga o valor integral do 13º salário (incluindo médias de variáveis dos últimos 6 meses) e depois compensa esse valor na guia de recolhimento do INSS via eSocial. Consulte as regras detalhadas de benefícios no site do ",
                /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/inss/pt-br/direitos-e-deveres/salario-maternidade/valor-do-salario-maternidade", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "INSS - Salário Maternidade" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-blue-400 font-bold mb-1", children: "Trabalhador Intermitente" }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Nesta modalidade, não existe o pagamento acumulado em dezembro. O trabalhador recebe a proporção do 13º salário e das ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/ferias", className: "text-blue-400 hover:underline", children: "férias" }),
                " ao final de cada convocação de serviço, diluído ao longo do ano."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-blue-400 font-bold mb-1", children: "Aposentados e Pensionistas" }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Aposentados a partir de 65 anos possuem uma ",
                /* @__PURE__ */ jsx("strong", { children: "dupla isenção" }),
                " de Imposto de Renda. Além da faixa de isenção normal, eles têm direito a deduzir mais R$ 1.903,98 da base de cálculo, o que reduz drasticamente o imposto a pagar sobre o benefício."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: THIRTEENTH_FAQS,
          title: "Perguntas Frequentes sobre 13º Salário",
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
//# sourceMappingURL=ThirteenthSalaryPage-BTm5KCoA.js.map
