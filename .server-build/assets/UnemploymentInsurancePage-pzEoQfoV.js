import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ShieldCheck, Calculator, DollarSign, Calendar, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
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
const UNEMPLOYMENT_FAQS = [
  {
    question: "Qual o prazo para dar entrada no Seguro-Desemprego?",
    answer: "Para o trabalhador formal, o prazo é do 7º ao 120º dia (corridos) após a data da demissão. Para empregados domésticos, o prazo é do 7º ao 90º dia. Perder esse prazo resulta na perda do direito ao benefício."
  },
  {
    question: "Quem pede demissão tem direito ao Seguro-Desemprego?",
    answer: "Não. O benefício é exclusivo para demissões involuntárias (sem justa causa). Quem pede demissão perde o direito ao seguro, mas mantém outros direitos que podem ser calculados na nossa ferramenta de cálculo de férias."
  },
  {
    question: "O Seguro-Desemprego conta para aposentadoria?",
    answer: "Sim, mas não automaticamente. O período em que você recebe o seguro pode contar como tempo de contribuição, desde que você pague a contribuição previdenciária (confira as alíquotas na nossa calculadora de INSS) como segurado facultativo ou se houver compensação automática."
  },
  {
    question: "Recebo a primeira parcela quando?",
    answer: "A liberação da primeira parcela ocorre 30 dias após a data do requerimento (protocolo do pedido), seguindo o calendário de pagamentos da CAIXA."
  },
  {
    question: "MEI tem direito ao Seguro-Desemprego?",
    answer: "Em regra, não, pois o sistema entende que o MEI possui fonte de renda. Contudo, se você comprovar que o MEI está inativo (sem faturamento) e que sua renda vinha exclusivamente do emprego CLT, é possível conseguir o benefício mediante recurso administrativo."
  },
  {
    question: "Qual o valor máximo (teto) do Seguro-Desemprego em 2025?",
    answer: "O valor máximo que um trabalhador pode receber por parcela em 2025 é R$ 2.424,11, independentemente de quão alto era o seu salário anterior."
  }
];
function UnemploymentInsurancePage() {
  const [salary1, setSalary1] = useState("");
  const [salary2, setSalary2] = useState("");
  const [salary3, setSalary3] = useState("");
  const [monthsWorked, setMonthsWorked] = useState("12");
  const [requestCount, setRequestCount] = useState("1");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const s1 = parseFloat(salary1.replace(/\./g, "").replace(",", ".") || "0");
    const s2 = parseFloat(salary2.replace(/\./g, "").replace(",", ".") || "0");
    const s3 = parseFloat(salary3.replace(/\./g, "").replace(",", ".") || "0");
    const salaries = [s1, s2, s3].filter((s) => s > 0);
    if (salaries.length === 0) {
      setResult(null);
      return;
    }
    let averageSalary = salaries.reduce((a, b) => a + b, 0) / salaries.length;
    if (s1 && s2 && s3) averageSalary = (s1 + s2 + s3) / 3;
    else if (salaries.length > 0) averageSalary = salaries.reduce((a, b) => a + b, 0) / salaries.length;
    else averageSalary = 0;
    const months = parseInt(monthsWorked);
    const request = parseInt(requestCount);
    if (months === 0) {
      setResult(null);
      return;
    }
    let installmentValue = 0;
    if (averageSalary <= 2138.76) {
      installmentValue = averageSalary * 0.8;
    } else if (averageSalary <= 3564.96) {
      installmentValue = 1711.01 + (averageSalary - 2138.76) * 0.5;
    } else {
      installmentValue = 2424.11;
    }
    if (installmentValue < 1518) {
      installmentValue = 1518;
    }
    let installmentCount = 0;
    if (request === 1) {
      if (months >= 12 && months <= 23) installmentCount = 4;
      else if (months >= 24) installmentCount = 5;
      else installmentCount = 0;
    } else if (request === 2) {
      if (months >= 9 && months <= 11) installmentCount = 3;
      else if (months >= 12 && months <= 23) installmentCount = 4;
      else if (months >= 24) installmentCount = 5;
      else installmentCount = 0;
    } else {
      if (months >= 6 && months <= 11) installmentCount = 3;
      else if (months >= 12 && months <= 23) installmentCount = 4;
      else if (months >= 24) installmentCount = 5;
      else installmentCount = 0;
    }
    setResult({
      installmentValue,
      installmentCount,
      averageSalary
    });
  };
  useEffect(() => {
    calculate();
  }, [salary1, salary2, salary3, monthsWorked, requestCount]);
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
    "name": "Calculadora Seguro-Desemprego 2025",
    "url": "https://junny.com.br/calculadoras/seguro-desemprego",
    "description": "Calcule agora o valor exato e a quantidade de parcelas do seu Seguro-Desemprego em 2025. Regras atualizadas, tabela oficial e prazos de pagamento.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "featureList": [
      "Cálculo Tabela 2025",
      "Simulação de Parcelas",
      "Regras Atualizadas",
      "Teto do Benefício"
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
        title: "Calculadora Seguro-Desemprego 2025: Valor, Parcelas e Tabela Oficial",
        description: "Calcule agora o valor exato e a quantidade de parcelas do seu Seguro-Desemprego em 2025. Regras atualizadas, tabela oficial e prazos de pagamento.",
        canonical: "/calculadoras/seguro-desemprego"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": UNEMPLOYMENT_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Seguro Desemprego", href: "/calculadoras/seguro-desemprego" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de Seguro-Desemprego 2025: ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500", children: "Simule Valor e Parcelas" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Perder o emprego gera incerteza financeira imediata. O Seguro-Desemprego é um direito fundamental do trabalhador CLT demitido sem justa causa. Nossa ferramenta utiliza as regras oficiais vigentes para 2025 para mostrar exatamente quanto você receberá." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
            "Simular Benefício"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Últimos 3 Salários (Bruto)" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm", children: "Mês 1" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: salary1,
                      onChange: (e) => handleCurrencyInput(e.target.value, setSalary1),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-14 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-right",
                      placeholder: "0,00"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm", children: "Mês 2" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: salary2,
                      onChange: (e) => handleCurrencyInput(e.target.value, setSalary2),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-14 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-right",
                      placeholder: "0,00"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm", children: "Mês 3" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: salary3,
                      onChange: (e) => handleCurrencyInput(e.target.value, setSalary3),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-14 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-right",
                      placeholder: "0,00"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Se houver menos de 3 salários, preencha apenas os correspondentes." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Meses Trabalhados (nos últimos 36)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: monthsWorked,
                    onChange: (e) => setMonthsWorked(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "12"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Já solicitou antes?" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: requestCount,
                    onChange: (e) => setRequestCount(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "1", children: "1ª Solicitação" }),
                      /* @__PURE__ */ jsx("option", { value: "2", children: "2ª Solicitação" }),
                      /* @__PURE__ */ jsx("option", { value: "3", children: "3ª Solicitação ou mais" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center relative overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-2 opacity-10", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-12 h-12 text-blue-500" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor da Parcela" }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl md:text-4xl font-bold text-white block", children: result && result.installmentCount > 0 ? `R$ ${result.installmentValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                result && result.averageSalary > 0 && /* @__PURE__ */ jsxs("span", { className: "text-xs text-blue-400/60 mt-2 block", children: [
                  "Média Salarial: R$ ",
                  result.averageSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center relative overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-2 opacity-5", children: /* @__PURE__ */ jsx(Calendar, { className: "w-12 h-12 text-white" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 block mb-2", children: "Quantidade de Parcelas" }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl md:text-4xl font-bold text-white block", children: result ? result.installmentCount > 0 ? `${result.installmentCount}x` : "Sem direito" : "---" }),
                (result == null ? void 0 : result.installmentCount) === 0 && /* @__PURE__ */ jsx("span", { className: "text-xs text-red-400 mt-2 block", children: "Carência não atingida" })
              ] })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-500" }),
              "Tabela Oficial 2025"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mb-1", children: "Menor que R$ 2.138,76" }),
                /* @__PURE__ */ jsx("div", { className: "text-white font-medium", children: "Multiplica-se por 80%" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mb-1", children: "De R$ 2.138,77 até R$ 3.564,96" }),
                /* @__PURE__ */ jsx("div", { className: "text-white font-medium", children: "Excedente x 50% + R$ 1.711,01" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mb-1", children: "Acima de R$ 3.564,96" }),
                /* @__PURE__ */ jsx("div", { className: "text-white font-medium", children: "Valor Fixo: R$ 2.424,11 (Teto)" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-gray-500", children: "* O benefício nunca será menor que R$ 1.518,00 (Salário Mínimo)." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-orange-500" }),
              "Requisitos Básicos"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-green-500 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "Demissão sem justa causa" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-green-500 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "Estar desempregado na solicitação" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-green-500 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "Não possuir renda própria" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12 max-w-4xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Como é calculado o Seguro-Desemprego em 2025?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400", children: [
            /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
              "O cálculo baseia-se na média dos seus ",
              /* @__PURE__ */ jsx("strong", { children: "três últimos salários" }),
              ' anteriores à demissão. O resultado final depende de qual "faixa" salarial essa média se encaixa, seguindo a tabela reajustada pelo Ministério do Trabalho e Emprego.'
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mb-6", children: [
              "Para trabalhadores que recebem salário variável ou comissões, o cálculo da média é essencial para garantir o valor correto. Se você já tem o valor da sua rescisão em mente, vale a pena conferir nossa calculadora de ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/rescisao", className: "text-blue-400 hover:text-blue-300 underline", children: "rescisão de contrato" }),
              " para ter o panorama financeiro completo."
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4 mt-8", children: "Exemplo de Cálculo Real" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
                "Imagine que a média dos seus últimos 3 salários foi de ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 2.500,00" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside space-y-2 text-gray-400", children: [
                /* @__PURE__ */ jsx("li", { children: "Este valor está na segunda faixa da tabela." }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "O que excede R$ 2.138,76 é ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 361,24" }),
                  " (2.500 - 2.138,76)."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "Multiplicamos o excedente por 50% = ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 180,62" }),
                  "."
                ] }),
                /* @__PURE__ */ jsx("li", { children: "Somamos a parcela fixa de R$ 1.711,01." }),
                /* @__PURE__ */ jsx("li", { className: "text-white font-medium", children: "Valor Final da Parcela: R$ 1.891,63." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Como solicitar o Seguro-Desemprego (Passo a Passo)" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm flex-shrink-0", children: "1" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-1", children: "Acesse o Canal Digital" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Entre no portal Gov.br ou baixe o aplicativo Carteira de Trabalho Digital." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm flex-shrink-0", children: "2" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-1", children: "Navegue pelo Menu" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: 'Vá na aba "Benefícios" e selecione a opção "Seguro-Desemprego".' })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm flex-shrink-0", children: "3" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-1", children: "Inicie o Pedido" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: 'Clique em "Solicitar" e insira o número do Requerimento (10 dígitos).' })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm flex-shrink-0", children: "4" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-1", children: "Confirme" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Siga as instruções, confira seus dados bancários e finalize." })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Quantas parcelas vou receber?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "A quantidade de parcelas (3, 4 ou 5) depende de quanto tempo você trabalhou com carteira assinada nos últimos 36 meses e quantas vezes já solicitou o benefício anteriormente." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl border border-white/5 overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 px-6 py-3 border-b border-white/5 font-semibold text-white", children: "Primeira Solicitação" }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 grid grid-cols-2 gap-4 text-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "text-gray-400", children: "De 12 a 23 meses trabalhados" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-right font-medium", children: "4 parcelas" }),
                /* @__PURE__ */ jsx("div", { className: "col-span-2 h-px bg-white/5" }),
                /* @__PURE__ */ jsx("div", { className: "text-gray-400", children: "24 meses ou mais" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-right font-medium", children: "5 parcelas" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl border border-white/5 overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 px-6 py-3 border-b border-white/5 font-semibold text-white", children: "Segunda Solicitação" }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 grid grid-cols-2 gap-4 text-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "text-gray-400", children: "De 9 a 11 meses trabalhados" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-right font-medium", children: "3 parcelas" }),
                /* @__PURE__ */ jsx("div", { className: "col-span-2 h-px bg-white/5" }),
                /* @__PURE__ */ jsx("div", { className: "text-gray-400", children: "De 12 a 23 meses" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-right font-medium", children: "4 parcelas" }),
                /* @__PURE__ */ jsx("div", { className: "col-span-2 h-px bg-white/5" }),
                /* @__PURE__ */ jsx("div", { className: "text-gray-400", children: "24 meses ou mais" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-right font-medium", children: "5 parcelas" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl border border-white/5 overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 px-6 py-3 border-b border-white/5 font-semibold text-white", children: "Terceira Solicitação (ou mais)" }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 grid grid-cols-2 gap-4 text-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "text-gray-400", children: "De 6 a 11 meses trabalhados" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-right font-medium", children: "3 parcelas" }),
                /* @__PURE__ */ jsx("div", { className: "col-span-2 h-px bg-white/5" }),
                /* @__PURE__ */ jsx("div", { className: "text-gray-400", children: "De 12 a 23 meses" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-right font-medium", children: "4 parcelas" }),
                /* @__PURE__ */ jsx("div", { className: "col-span-2 h-px bg-white/5" }),
                /* @__PURE__ */ jsx("div", { className: "text-gray-400", children: "24 meses ou mais" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-right font-medium", children: "5 parcelas" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-200", children: [
            "Ao organizar suas finanças, recomendamos planejar seu orçamento comparando com seu ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-white underline", children: "salário líquido" }),
            " habitual e verificando seu saldo do ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/fgts", className: "text-white underline", children: "FGTS" }),
            ", pois o saque-rescisão pode ser decisivo neste período."
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: UNEMPLOYMENT_FAQS,
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
  UnemploymentInsurancePage
};
//# sourceMappingURL=UnemploymentInsurancePage-pzEoQfoV.js.map
