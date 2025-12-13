import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Briefcase, Calculator, FileText, Percent, DollarSign, Clock, HelpCircle, AlertCircle, XCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
const PLR_FAQS = [
  {
    question: "Qual o valor máximo da isenção da PLR em 2025?",
    answer: "O teto de isenção total na tabela de 2025 é de **R$ 8.214,40**. Isso significa que, se a soma de todas as parcelas recebidas no ano ficar abaixo desse limite, você não paga nada de Imposto de Renda. Ao usar a **Calculadora de PLR**, essa isenção é aplicada automaticamente, enquanto valores superiores são tributados progressivamente apenas sobre o excedente."
  },
  {
    question: "A PLR desconta INSS e FGTS?",
    answer: "Não. A Participação nos Lucros é totalmente isenta de encargos trabalhistas e previdenciários (INSS e FGTS) tanto para a empresa quanto para o empregado. Isso ocorre porque a Constituição Federal desvinculou a PLR da remuneração salarial. Confira o impacto financeiro disso comparando com o nosso <a href='/calculadoras/inss'>cálculo do INSS</a> sobre salários normais."
  },
  {
    question: "O banco pode descontar dívida da PLR?",
    answer: 'A PLR tem caráter alimentar e não pode sofrer descontos automáticos de dívidas (como cheque especial ou empréstimos) sem autorização expressa do funcionário. No entanto, verifique se o seu contrato de abertura de conta possui cláusulas que permitem o débito em "quaisquer créditos", o que exigiria uma contestação formal junto ao banco.'
  },
  {
    question: "Quem recebe PLR tem direito ao 13º salário sobre ela?",
    answer: "Não. A PLR não integra a remuneração para fins de reflexos em outras verbas trabalhistas. Ou seja, ela não aumenta a base de cálculo do seu <a href='/calculadoras/decimo-terceiro'>décimo terceiro</a>, férias ou aviso prévio. Trata-se de um pagamento eventual e apartado do salário contratual mensal."
  },
  {
    question: "Pensionistas pagam pensão sobre a PLR?",
    answer: 'A regra geral consolidada pelo STJ (2024/2025) é que a PLR **não entra** na base de cálculo da pensão alimentícia automaticamente. Por ser uma verba indenizatória e eventual, ela só deve ser incluída se o acordo de alimentos ou a sentença judicial disser explicitamente que a pensão incide sobre "participação nos lucros".'
  },
  {
    question: "Quando a PLR deve ser paga?",
    answer: "A legislação exige que o pagamento ocorra em, no máximo, duas vezes ao ano, com intervalo mínimo de um trimestre civil entre as parcelas. As datas exatas (geralmente uma antecipação no meio do ano e um fechamento no ano seguinte) são definidas obrigatoriamente na Convenção Coletiva de Trabalho da sua categoria."
  },
  {
    question: "Autônomos e PJ têm direito a PLR?",
    answer: "Não. A PLR é um direito exclusivo de trabalhadores com vínculo empregatício (CLT), regidos pela <a href='http://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm'>Consolidação das Leis do Trabalho</a>. Profissionais autônomos ou contratados como PJ recebem conforme seu contrato civil de prestação de serviços, não estando sujeitos às regras de isenção fiscal da Lei 10.101/2000."
  }
];
function PLRPage() {
  const [plrValue, setPlrValue] = useState("");
  const [result, setResult] = useState(null);
  const calculatePLR = () => {
    const gross = parseFloat(plrValue.replace(/\./g, "").replace(",", "."));
    if (isNaN(gross)) {
      setResult(null);
      return;
    }
    let irTax = 0;
    let deduction = 0;
    let tierRate = 0;
    if (gross <= 8214.4) {
      tierRate = 0;
      deduction = 0;
    } else if (gross <= 9922.28) {
      tierRate = 0.075;
      deduction = 616.08;
    } else if (gross <= 13167) {
      tierRate = 0.15;
      deduction = 1360.25;
    } else if (gross <= 16380.38) {
      tierRate = 0.225;
      deduction = 2347.78;
    } else {
      tierRate = 0.275;
      deduction = 3166.8;
    }
    irTax = gross * tierRate - deduction;
    if (irTax < 0) irTax = 0;
    const netValue = gross - irTax;
    const effectiveRate = gross > 0 ? irTax / gross * 100 : 0;
    setResult({
      grossValue: gross,
      irTax,
      netValue,
      effectiveRate,
      deduction,
      rate: tierRate,
      tierRate: tierRate * 100
    });
  };
  useEffect(() => {
    calculatePLR();
  }, [plrValue]);
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
    "name": "Calculadora de PLR 2025: Simule o Valor Líquido e Imposto",
    "url": "https://www.junny.com.br/calculadoras/plr",
    "description": "Use a Calculadora de PLR 2025 para simular o valor líquido. Veja tabela de IR oficial, regras bancários e nova isenção de R$ 8.214,40.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
    "featureList": [
      "Cálculo de PLR Líquida 2025",
      "Tabela de IR Exclusiva para PLR",
      "Isenção de R$ 8.214,40",
      "Simulação de Imposto de Renda"
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
        title: "Calculadora PLR 2025: Valor Líquido e Tabela IR Oficial",
        description: "Use a Calculadora de PLR 2025 para simular o valor líquido. Veja tabela de IR oficial, regras bancários e nova isenção de R$ 8.214,40.",
        canonical: "/calculadoras/plr"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": PLR_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora PLR", href: "/calculadoras/plr" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Atualizado para 2025" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de PLR ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "2025: Simule o Valor Líquido e Imposto" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
            "Simular PLR Líquida"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "plrValue", className: "text-sm text-gray-400", children: "Valor Total da PLR (Bruto)" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "plrValue",
                    type: "text",
                    inputMode: "decimal",
                    value: plrValue,
                    onChange: (e) => handleCurrencyInput(e.target.value, setPlrValue),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-lg",
                    placeholder: "0,00"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor Líquido Estimado" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.netValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "R$ 0,00" }),
                result && /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4 mt-3 text-xs", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
                    "Bruto: R$ ",
                    result.grossValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
                    "Imposto: R$ ",
                    result.irTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] })
              ] }),
              result && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Valor Bruto" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                    "R$ ",
                    result.grossValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.irTax > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Alíquota Aplicada" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                      result.tierRate.toFixed(1).replace(".", ","),
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Dedução da Tabela" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-white font-medium text-green-400", children: [
                      "- R$ ",
                      result.deduction.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-200", children: "Imposto Devido (IRRF)" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-red-200 font-bold", children: [
                      "- R$ ",
                      result.irTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                    ] })
                  ] })
                ] }) : /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-green-200", children: "Status" }),
                  /* @__PURE__ */ jsx("span", { className: "text-green-200 font-bold", children: "ISENTO DE IR" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-gray-500 text-center", children: [
                  "Alíquota Efetiva: ",
                  result.effectiveRate.toFixed(2).replace(".", ","),
                  "%"
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-500" }),
            "Resumo Rápido (Dados Oficiais Dezembro/2025)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Nova Isenção de IR" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 8.214,40" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Quem recebe até esse valor está 100% isento" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Percent, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Alíquota Máxima:" }),
                  " A tributação para valores acima de R$ 16.380,38 é de 27,5%, mas com dedução significativa de R$ 3.166,80."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Encargos Trabalhistas:" }),
                  " A PLR é isenta de INSS e FGTS para o empregado, incidindo apenas o Imposto de Renda na Fonte (tributação exclusiva)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Prazo de Pagamento:" }),
                  " Deve ocorrer em, no máximo, duas parcelas por ano, com intervalo trimestral ou semestral, conforme acordo coletivo."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Bancários:" }),
                  " Segue regra específica da CCT 2024/2025 (90% do salário + fixo + parcela adicional)."
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Resumo em 30 Segundos" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-300 leading-relaxed", children: "A **Participação nos Lucros e Resultados (PLR)** é um bônus pago pela empresa quando metas corporativas e individuais são atingidas. Diferente do salário mensal, a PLR possui **tributação exclusiva**, o que significa que ela não se soma aos seus rendimentos anuais para elevar a alíquota do seu Imposto de Renda tradicional. Em 2025, a tabela foi atualizada garantindo que mais dinheiro fique no bolso do trabalhador. Nossa **Calculadora de PLR** abaixo simplifica essa conta para você." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como funciona a PLR" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-300", children: [
          /* @__PURE__ */ jsx("p", { children: "Antes de utilizar a **Calculadora de PLR** para descobrir os valores líquidos, é fundamental entender a mecânica do benefício. A PLR é regulamentada pela Lei 10.101/2000 e funciona como um contrato de desempenho entre patrão e empregado. Ela não é um benefício automático; precisa ser negociada previamente por meio de comissão paritária ou convenção coletiva com o sindicato." }),
          /* @__PURE__ */ jsx("p", { children: "O objetivo é alinhar os interesses: a empresa busca lucro ou produtividade, e o trabalhador recebe uma fatia desse sucesso. Por ser desvinculada da remuneração salarial, a PLR não gera encargos trabalhistas tradicionais, sendo tributada exclusivamente na fonte." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Briefcase, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Tabela de IR sobre PLR (Vigência 2025)" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8 max-w-3xl", children: 'A tributação da PLR é feita "na fonte" e separada dos demais rendimentos. Abaixo, a tabela progressiva válida a partir de maio de 2025:' }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Faixa de PLR Anual (R$)" }),
            /* @__PURE__ */ jsx("th", { className: "p-3 text-center", children: "Alíquota (%)" }),
            /* @__PURE__ */ jsx("th", { className: "p-3 text-center", children: "Parcela a Deduzir do IR (R$)" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "De R$ 0,00 a R$ 8.214,40" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-green-400", children: "Isento" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 0,00" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "De R$ 8.214,41 a R$ 9.922,28" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "7,5%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 616,08" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "De R$ 9.922,29 a R$ 13.167,00" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "15,0%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 1.360,25" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "De R$ 13.167,01 a R$ 16.380,38" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "22,5%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 2.347,78" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Acima de R$ 16.380,38" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "27,5%" }),
              /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 3.166,80" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 text-xs text-gray-500", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
          " Dados baseados na ",
          /* @__PURE__ */ jsx("a", { href: "http://www.planalto.gov.br/ccivil_03/leis/l10101.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Lei nº 10.101/2000" }),
          " e atualizações da ",
          /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Receita Federal do Brasil" }),
          "."
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-yellow-500 shrink-0" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-yellow-200 mb-2", children: "Erros Comuns ao Calcular a PLR" }),
            /* @__PURE__ */ jsx("p", { className: "text-yellow-100/80", children: "Ao tentar prever o valor a receber na **Calculadora de PLR**, muitos trabalhadores cometem equívocos que geram frustração no dia do pagamento." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-yellow-100/70", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "1. Ignorar a Soma Anual:" }),
              " O Imposto de Renda é calculado sobre o total recebido no ano-calendário. Se você recebeu R$ 7.000 em fevereiro (isento) e recebe mais R$ 7.000 em dezembro, a base de cálculo será R$ 14.000. O imposto incidirá sobre o total, descontando o que já foi pago (se houver)."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2. Confundir PLR com Bônus/Prêmio:" }),
              " Bônus discricionários (sem regras prévias em acordo coletivo) têm natureza salarial e sofrem incidência de INSS e FGTS. A PLR legítima é isenta destes encargos. Você pode conferir a diferença no valor líquido usando nossa ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "underline hover:text-yellow-200", children: "calculadora de salário líquido" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "3. Achar que incide Pensão Alimentícia automaticamente:" }),
              " O STJ pacificou que a PLR **não entra** na base de cálculo da pensão alimentícia, salvo se houver cláusula expressa no acordo de divórcio ou sentença judicial determinando o contrário."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como Calcular a PLR (Passo a Passo)" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "O cálculo do valor bruto depende do modelo da empresa (Metas Corporativas ou Convenção Coletiva), mas a nossa **Calculadora PLR** utiliza a lógica universal do Imposto de Renda 2025 descrita abaixo para definir o valor líquido." }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Fórmula do Imposto Devido" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 mb-3", children: "Para encontrar o valor real que cairá na conta, utilize a fórmula:" }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mb-6 font-mono text-sm text-blue-300 overflow-x-auto", children: "$$(Valor~Total~PLR \\times Alíquota) - Parcela~a~Deduzir = IR~a~Pagar$$" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Exemplo Prático 1: Analista de Marketing (Setor de Serviços)" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-xs text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "PLR Bruta:" }),
                " R$ 12.000,00"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Faixa na Tabela:" }),
                " De R$ 9.922,29 a R$ 13.167,00 (Alíquota de 15%)"
              ] }),
              /* @__PURE__ */ jsx("li", { className: "font-bold mt-2 text-white", children: "Cálculo:" }),
              /* @__PURE__ */ jsx("li", { children: "1. Multiplicação: R$ 12.000 × 15% = R$ 1.800,00" }),
              /* @__PURE__ */ jsx("li", { children: "2. Dedução: R$ 1.800,00 - R$ 1.360,25 (da tabela)" }),
              /* @__PURE__ */ jsxs("li", { children: [
                "3. ",
                /* @__PURE__ */ jsx("strong", { children: "Imposto Devido:" }),
                " R$ 439,75"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "4. ",
                /* @__PURE__ */ jsx("strong", { children: "Valor Líquido:" }),
                " R$ 11.560,25"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white", children: "Exemplo Prático 2: Executivo (Teto da Tabela)" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-xs text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "PLR Bruta:" }),
                " R$ 50.000,00"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Faixa na Tabela:" }),
                " Acima de R$ 16.380,38 (Alíquota de 27,5%)"
              ] }),
              /* @__PURE__ */ jsx("li", { className: "font-bold mt-2 text-white", children: "Cálculo:" }),
              /* @__PURE__ */ jsx("li", { children: "1. Multiplicação: R$ 50.000 × 27,5% = R$ 13.750,00" }),
              /* @__PURE__ */ jsx("li", { children: "2. Dedução: R$ 13.750,00 - R$ 3.166,80" }),
              /* @__PURE__ */ jsxs("li", { children: [
                "3. ",
                /* @__PURE__ */ jsx("strong", { children: "Imposto Devido:" }),
                " R$ 10.583,20"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "4. ",
                /* @__PURE__ */ jsx("strong", { children: "Alíquota Efetiva:" }),
                " Apenas 21,1% (bem abaixo dos 27,5% nominais)."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300 mt-4", children: [
              "É esse cálculo detalhado e progressivo que a **Calculadora de PLR** executa em segundos, permitindo que você planeje seus investimentos com o valor exato. Se você deseja aplicar essa quantia, confira nosso guia sobre ",
              /* @__PURE__ */ jsx(Link, { to: "/blog/investimentos", className: "text-blue-400 hover:underline", children: "investimentos para iniciantes" }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Regras Específicas: Calculadora PLR Bancários 2025" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: 'O setor bancário possui a convenção mais complexa do país. O cálculo é dividido em duas partes e possui "aceleradores" baseados no lucro do banco.' }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-gray-300", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-blue-500 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "1. Regra Básica:" }),
              " 90% do Salário + Valor Fixo (ajustado pelo INPC). Se o total distribuído pelo banco for menor que 5% do lucro líquido, esse valor pode ser aumentado até chegar a 2,2 salários."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-blue-500 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2. Parcela Adicional:" }),
              " Distribuição linear de 2,2% do Lucro Líquido do banco dividido pelo número de funcionários, com um teto específico definido na CCT."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-blue-500 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "3. Antecipação:" }),
              " Paga geralmente até setembro, correspondente a cerca de 60% (percentual definido na CCT) da regra básica, descontando-se do valor final em março."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Casos Especiais e Elegibilidade" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Fui demitido, recebo PLR?" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mb-3", children: [
              "Sim. A ",
              /* @__PURE__ */ jsx("a", { href: "https://www.tst.jus.br/sumulas", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Súmula 451 do TST" }),
              " garante o pagamento proporcional aos meses trabalhados para empregados demitidos sem justa causa. O cálculo é de 1/12 avos por mês trabalhado (ou fração superior a 14 dias). Para calcular exatamente suas verbas rescisórias, utilize nossa ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/rescisao", className: "text-blue-400 hover:underline", children: "calculadora de rescisão" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Pedi demissão, tenho direito?" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-3", children: "Historicamente não, mas a jurisprudência mudou em 2025. Decisões recentes (como o caso Jeitto/TST) indicam que o pedido de demissão não retira o direito à PLR proporcional, pois o funcionário contribuiu para o resultado. Consulte o acordo coletivo da sua categoria." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Estagiários e Aprendizes recebem?" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-3", children: "Legalmente, não. A Lei 10.101/2000 não abrange estagiários. Se a empresa pagar PLR a estagiários nos mesmos moldes dos funcionários, corre o risco de criar vínculo empregatício. O correto para estagiários são prêmios por desempenho tributados normalmente." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2 text-lg", children: "Licença Maternidade e Afastamentos" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-3", children: "Para a PLR, a licença-maternidade é considerada tempo de serviço efetivo na maioria das convenções (como a dos bancários), não havendo desconto na proporcionalidade. Importante: O STF definiu que a licença começa a contar apenas após a alta hospitalar da mãe ou do bebê (ADI 6327), o que estende o período de estabilidade e recebimento." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: PLR_FAQS,
          title: "Perguntas Frequentes sobre Calculadora de PLR",
          className: "py-12",
          showSocialProof: false
        }
      )
    ] })
  ] });
}
export {
  PLRPage
};
//# sourceMappingURL=PLRPage-PApka-IF.js.map
