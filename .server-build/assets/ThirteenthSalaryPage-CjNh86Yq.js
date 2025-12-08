import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Gift, Calculator, Info, AlertCircle, Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-CDVQG5oV.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-DhnQlz7G.js";
const THIRTEENTH_FAQS = [
  {
    question: "Como calcular o décimo terceiro proporcional?",
    answer: "Para chegar ao valor exato, divida seu salário bruto atual por 12. Em seguida, multiplique o resultado pela quantidade de meses do ano em que você trabalhou 15 dias ou mais. Importante: médias de horas extras, comissões e <a href='https://janus.junny.com.br/calculadoras/adicional-noturno' class='text-blue-400 hover:text-blue-300 underline decoration-blue-400/30'>adicional noturno</a> variáveis também somam na base de cálculo, aumentando o valor final."
  },
  {
    question: "O INSS é descontado na primeira parcela?",
    answer: "Não. A legislação (Lei 4.749/65) define que a primeira parcela é apenas um adiantamento de 50% do salário, livre de descontos. A mordida do Leão é acumulada: o INSS e o IRRF são calculados sobre o valor total e descontados de uma só vez na segunda parcela."
  },
  {
    question: "O que acontece se a empresa atrasar o pagamento?",
    answer: "O atraso gera multa administrativa por empregado prejudicado, fiscalizada pelo Ministério do Trabalho. O funcionário deve receber o valor com correção monetária. Para empresas, evitar esse passivo é crucial, pois impacta diretamente no planejamento do <a href='https://janus.junny.com.br/calculadoras/custo-funcionario' class='text-blue-400 hover:text-blue-300 underline decoration-blue-400/30'>custo do funcionário</a> e pode gerar processos trabalhistas."
  },
  {
    question: "Quem está de licença-maternidade ou afastado pelo INSS recebe?",
    answer: `Sim. Na licença-maternidade, a empresa paga integralmente e abate na guia do INSS. No auxílio-doença (afastamento por saúde), a empresa paga proporcional aos meses trabalhados (similar a um <a href='https://janus.junny.com.br/calculadoras/rescisao' class='text-blue-400 hover:text-blue-300 underline decoration-blue-400/30'>cálculo de rescisão</a> parcial) e o INSS paga o restante como "Abono Anual", direto ao beneficiário.`
  },
  {
    question: "Estagiário tem direito a décimo terceiro?",
    answer: "Não. A Lei do Estágio (11.788/08) define a remuneração como bolsa-auxílio, isentando o empregador de verbas trabalhistas como FGTS e 13º salário. O pagamento é facultativo e depende da política de benefícios da empresa ou do contrato de estágio assinado."
  },
  {
    question: "Posso pedir adiantamento do 13º nas férias?",
    answer: "Sim, é um direito garantido. O trabalhador pode receber a primeira parcela junto com as <a href='https://janus.junny.com.br/calculadoras/ferias' class='text-blue-400 hover:text-blue-300 underline decoration-blue-400/30'>férias</a>, mas há um prazo rígido: o pedido deve ser feito por escrito à empresa entre **1º e 31 de janeiro**. Após essa data, a concessão torna-se opcional para o empregador."
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
    if (fullThirteenth <= 1412) {
      inss = fullThirteenth * 0.075;
    } else if (fullThirteenth <= 2666.68) {
      inss = 1412 * 0.075 + (fullThirteenth - 1412) * 0.09;
    } else if (fullThirteenth <= 4000.03) {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (fullThirteenth - 2666.68) * 0.12;
    } else if (fullThirteenth <= 7786.02) {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (fullThirteenth - 4000.03) * 0.14;
    } else {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14;
    }
    const deductionPerDependent = 189.59;
    const irrfBase = fullThirteenth - inss - deps * deductionPerDependent;
    let irrf = 0;
    if (irrfBase <= 2259.2) {
      irrf = 0;
    } else if (irrfBase <= 2826.65) {
      irrf = irrfBase * 0.075 - 169.44;
    } else if (irrfBase <= 3751.05) {
      irrf = irrfBase * 0.15 - 381.44;
    } else if (irrfBase <= 4664.68) {
      irrf = irrfBase * 0.225 - 662.77;
    } else {
      irrf = irrfBase * 0.275 - 896;
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
    "description": "Calcule seu Décimo Terceiro Salário 2025. Veja o valor líquido, descontos de INSS/IRRF, exemplo prático e o calendário oficial de pagamentos.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
    "featureList": [
      "Cálculo de 1ª e 2ª parcela",
      "Desconto INSS e IRRF automático",
      "Cálculo proporcional",
      "Calendário 2025"
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
        description: "Calcule seu Décimo Terceiro Salário 2025. Veja o valor líquido, descontos de INSS/IRRF, exemplo prático e o calendário oficial de pagamentos.",
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
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Gift, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de Décimo Terceiro ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500", children: "Salário 2025" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: [
            "Receber o abono de fim de ano é essencial para o orçamento familiar, mas o cálculo do valor real envolve descontos que reduzem drasticamente a segunda parcela. Entenda a matemática por trás da ",
            /* @__PURE__ */ jsx("strong", { children: "Gratificação Natalina" }),
            "."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
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
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
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
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
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
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
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
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-1", children: "2ª Parcela (Saldo)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: resultSecond !== null ? `R$ ${resultSecond.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400/60 block mt-1", children: "Paga até 19/Dez" })
                ] })
              ] }),
              discounts && /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mb-4 space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                  /* @__PURE__ */ jsx("span", { children: "(-) INSS Estimado" }),
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
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-500" }),
              "Como calcular: Exemplo Prático"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400 leading-relaxed", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "Imagine um profissional que recebe ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 3.000,00" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex gap-2 items-start", children: [
                  /* @__PURE__ */ jsx("div", { className: "bg-blue-500/20 p-1 rounded mt-0.5 shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white", children: "1ª Parcela:" }),
                    " R$ 1.500,00 (50% do bruto, sem descontos)."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex gap-2 items-start", children: [
                  /* @__PURE__ */ jsx("div", { className: "bg-blue-500/20 p-1 rounded mt-0.5 shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white", children: "2ª Parcela:" }),
                    /* @__PURE__ */ jsxs("div", { className: "mt-1 pl-2 border-l-2 border-white/10 space-y-1 text-xs", children: [
                      /* @__PURE__ */ jsx("p", { children: "INSS e IRRF calculados sobre o total (R$ 3.000)." }),
                      /* @__PURE__ */ jsx("p", { children: "Subtrai-se o adiantamento (R$ 1.500)." }),
                      /* @__PURE__ */ jsx("p", { className: "text-white italic", children: "Resultado: R$ 3.000 - R$ 1.500 - Impostos = R$ 1.192,00 (aprox)." })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-yellow-500/10 p-2 rounded-lg shrink-0", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-yellow-500" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-white font-bold text-sm", children: "Regra de Ouro" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-1 leading-relaxed", children: [
                  "Para a lei trabalhista, ter trabalhado ",
                  /* @__PURE__ */ jsx("strong", { children: "15 dias ou mais" }),
                  " dentro do mesmo mês garante o direito de contá-lo como um ",
                  /* @__PURE__ */ jsx("strong", { children: "mês integral" }),
                  " para o cálculo do benefício."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-3 rounded-xl text-center border border-white/10", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 block mb-1", children: "Fórmula Básica" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-blue-400", children: "(Salário Bruto ÷ 12) x Meses Trabalhados" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8 space-y-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-6", children: "O que é o Décimo Terceiro Salário?" }),
            /* @__PURE__ */ jsxs("div", { className: "text-gray-400 space-y-4 leading-relaxed text-lg", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "O Décimo Terceiro Salário, tecnicamente chamado de ",
                /* @__PURE__ */ jsx("strong", { children: "Gratificação Natalina" }),
                ", é um benefício trabalhista obrigatório pago a trabalhadores com carteira assinada (CLT), aposentados e pensionistas."
              ] }),
              /* @__PURE__ */ jsx("p", { children: "Ele corresponde a 1/12 da remuneração devida em dezembro, por mês de serviço, do ano correspondente. Na prática, funciona como um salário extra para auxiliar nas despesas típicas do período festivo." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-8 h-8 text-blue-500" }),
              "Calendário de Pagamento 2025"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Em 2025, as datas limites legais caem em finais de semana, obrigando as empresas a anteciparem os pagamentos." }),
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-white/5 border-b border-white/10", children: [
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Parcela" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold hidden md:table-cell", children: "Data Limite Legal" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold", children: "Data de Pagamento (2025)" }),
                /* @__PURE__ */ jsx("th", { className: "p-4 text-white font-semibold hidden md:table-cell", children: "O que você recebe" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 text-sm md:text-base", children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4 font-medium text-white", children: "1ª Parcela" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 hidden md:table-cell", children: "30 de Novembro" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-blue-400 font-bold", children: "28 de Novembro (Sexta)" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 hidden md:table-cell", children: "Metade do salário sem descontos." })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4 font-medium text-white", children: "2ª Parcela" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 hidden md:table-cell", children: "20 de Dezembro" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 text-blue-400 font-bold", children: "19 de Dezembro (Sexta)" }),
                  /* @__PURE__ */ jsx("td", { className: "p-4 hidden md:table-cell", children: "Saldo restante com impostos." })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-6", children: "Tabela de Descontos e Alíquotas" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
              "A redução no valor da segunda parcela ocorre devido à incidência da ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/inss", className: "text-blue-400 hover:text-blue-300 underline decoration-blue-400/30", children: "tabela do INSS" }),
              " e do Imposto de Renda Retido na Fonte (IRRF). A tributação segue a tabela progressiva oficial:"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-2xl p-6 border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "INSS (Progressivo)" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                    /* @__PURE__ */ jsx("span", { children: "Até um salário mínimo" }),
                    /* @__PURE__ */ jsx("span", { className: "text-white font-mono", children: "7,5%" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                    /* @__PURE__ */ jsx("span", { children: "Faixa acima do mínimo" }),
                    /* @__PURE__ */ jsx("span", { className: "text-white font-mono", children: "9%" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                    /* @__PURE__ */ jsx("span", { children: "Salários intermediários" }),
                    /* @__PURE__ */ jsx("span", { className: "text-white font-mono", children: "12%" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Até o teto" }),
                    /* @__PURE__ */ jsx("span", { className: "text-white font-mono", children: "14%" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20 flex flex-col justify-center items-center text-center", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-8 h-8 text-blue-500 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 mb-4", children: "Para obter o valor exato que sobrará no seu bolso, recomendamos usar nossa calculadora de salário líquido, pois ela aplica automaticamente essas faixas." }),
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors", children: "Ir para Calculadora Líquida" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-4 space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Variáveis que alteram o valor final" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-blue-400 font-medium text-sm mb-1", children: "Médias Salariais" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
                "Se você realiza ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "text-blue-300 underline", children: "horas extras" }),
                " ou recebe comissões, a média integra a base de cálculo."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-blue-400 font-medium text-sm mb-1", children: "Adicionais" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Insalubridade ou Periculosidade também compõem a base." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-red-400 font-medium text-sm mb-1", children: "Faltas Injustificadas" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Mais de 15 faltas sem justificativa no mês zeram o direito à fração de 1/12 daquele mês." })
            ] })
          ] })
        ] }) })
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
//# sourceMappingURL=ThirteenthSalaryPage-CjNh86Yq.js.map
