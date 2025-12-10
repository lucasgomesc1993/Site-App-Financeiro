import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ShieldCheck, Calculator, DollarSign, Calendar, Briefcase, Info, HelpCircle } from "lucide-react";
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
const MIN_WAGE_2025 = 1518;
const RANGE_1_LIMIT = 2138.76;
const RANGE_2_LIMIT = 3564.96;
const FIXED_AMOUNT_RANGE_2 = 1711.01;
const MAX_BENEFIT_2025 = 2424.11;
const UNEMPLOYMENT_FAQS = [
  {
    question: "Qual o valor máximo do Seguro-Desemprego em 2025?",
    answer: "O valor máximo (teto) pago a qualquer trabalhador em 2025 é de R$ 2.424,11. Mesmo que seu salário anterior fosse superior a R$ 10.000,00, este é o limite fixado pelo governo."
  },
  {
    question: "Quanto tempo demora para cair a primeira parcela?",
    answer: "A primeira parcela é liberada 30 dias após a data em que você dá entrada no requerimento. As demais parcelas são pagas mensalmente, a cada 30 dias. Você pode acompanhar o calendário pelo aplicativo Carteira de Trabalho Digital."
  },
  {
    question: "Quem pede demissão tem direito ao seguro?",
    answer: "Não. O benefício é exclusivo para demissões sem justa causa (involuntárias) ou rescisão indireta. Quem pede demissão perde o direito ao seguro, mas mantém o direito ao saldo de salário e férias, que podem ser simulados na nossa calculadora de rescisão."
  },
  {
    question: "MEI tem direito a receber Seguro-Desemprego?",
    answer: "Sim, mas apenas se comprovar que a atividade como MEI não gera renda suficiente para o sustento. Frequentemente o benefício é negado inicialmente, exigindo que o trabalhador apresente recurso administrativo comprovando a inatividade ou baixo faturamento do CNPJ."
  },
  {
    question: "Como dar entrada no Seguro-Desemprego online?",
    answer: "Você pode solicitar o benefício totalmente online através do aplicativo Carteira de Trabalho Digital ou pelo portal Gov.br. Basta acessar a aba 'Benefícios', selecionar 'Seguro-Desemprego' e clicar em 'Solicitar', utilizando o número do requerimento fornecido pelo empregador na demissão."
  },
  {
    question: "O que acontece se eu arrumar um emprego enquanto recebo?",
    answer: "O benefício é suspenso imediatamente. Se você for contratado (CLT) antes de receber todas as parcelas, o pagamento das restantes é cancelado. Receber seguro-desemprego trabalhando registrado é fraude e pode exigir devolução dos valores."
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
    const sum = salaries.reduce((a, b) => a + b, 0);
    const averageSalary = sum / salaries.length;
    const months = parseInt(monthsWorked) || 0;
    const request = parseInt(requestCount);
    if (months === 0) {
      setResult(null);
      return;
    }
    let installmentValue = 0;
    if (averageSalary <= RANGE_1_LIMIT) {
      installmentValue = averageSalary * 0.8;
    } else if (averageSalary <= RANGE_2_LIMIT) {
      installmentValue = FIXED_AMOUNT_RANGE_2 + (averageSalary - RANGE_1_LIMIT) * 0.5;
    } else {
      installmentValue = MAX_BENEFIT_2025;
    }
    if (installmentValue < MIN_WAGE_2025) {
      installmentValue = MIN_WAGE_2025;
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
    "name": "Calculadora Seguro-Desemprego 2025: Valor e Parcelas",
    "url": "https://junny.com.br/calculadoras/seguro-desemprego",
    "description": "Calcule agora o valor e a quantidade de parcelas do seu Seguro-Desemprego 2025. Tabela CODEFAT atualizada, teto de R$ 2.424,11 e regras para domésticos.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "featureList": [
      "Cálculo Tabela CODEFAT 2025",
      "Simulação de Parcelas",
      "Teto R$ 2.424,11",
      "Regras Atualizadas"
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
        title: "Calculadora Seguro-Desemprego 2025: Valor e Parcelas (Atualizada)",
        description: "Calcule agora o valor e a quantidade de parcelas do seu Seguro-Desemprego 2025. Tabela CODEFAT atualizada, teto de R$ 2.424,11 e regras para domésticos.",
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
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Atualizado CODEFAT 2025" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de Seguro-Desemprego 2025 ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500", children: "(Atualizada)" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: [
            "O Seguro-Desemprego é um auxílio financeiro temporário garantido ao trabalhador demitido sem justa causa. Diferente do ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-blue-400 hover:text-blue-300 underline", children: "salário líquido" }),
            " habitual, o valor do benefício segue uma tabela progressiva definida pelo CODEFAT, que limita o pagamento máximo a ",
            /* @__PURE__ */ jsx("strong", { children: "R$ 2.424,11" }),
            " em 2025."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
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
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Se houver menos de 3 salários, preencha apenas os correspondentes." })
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
                result && result.averageSalary > 0 && /* @__PURE__ */ jsxs("span", { className: "text-xs text-blue-400 mt-2 block", children: [
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
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(Briefcase, { className: "w-5 h-5 text-emerald-500" }),
              "Resumo em 30 segundos"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Teto Máximo da Parcela:" }),
                  " R$ 2.424,11 (para médias acima de R$ 3.564,96)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Valor Mínimo (Piso):" }),
                  " R$ 1.518,00 (",
                  /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/noticias/2025/04/presidente-sanciona-orcamento-de-2025-com-aumento-do-salario-minimo-para-r-1.518", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:text-blue-300 hover:underline", children: "Lei Orçamentária 2025" }),
                  ")."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Quantidade de Parcelas:" }),
                  " De 3 a 5 pagamentos, dependendo do tempo de trabalho."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Prazo para Solicitar:" }),
                  " 7 a 120 dias (trabalhadores formais) ou 7 a 90 dias (domésticos)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Base de Cálculo:" }),
                  " Média dos últimos 3 salários anteriores à demissão."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-500" }),
              "Tabela Oficial CODEFAT 2025"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mb-1", children: "Até R$ 2.138,76" }),
                /* @__PURE__ */ jsx("div", { className: "text-white font-medium", children: "Multiplica-se o salário médio por 0,80 (80%)" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mb-1", children: "De R$ 2.138,77 até R$ 3.564,96" }),
                /* @__PURE__ */ jsx("div", { className: "text-white font-medium", children: "Excedente x 50% + R$ 1.711,01" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mb-1", children: "Acima de R$ 3.564,96" }),
                /* @__PURE__ */ jsx("div", { className: "text-white font-medium", children: "Valor Fixo: R$ 2.424,11 (Teto)" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-gray-500", children: /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/trabalho-e-emprego/pt-br/servicos/trabalhador/seguro-desemprego/seguro-desemprego-formal", target: "_blank", rel: "noopener noreferrer", className: "hover:text-blue-400 hover:underline", children: "Fonte Oficial: Tabela Seguro-Desemprego 2025 - Portal MTE" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12 max-w-4xl mx-auto mb-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Como Calcular o Seguro-Desemprego (Passo a Passo)" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Entender a lógica por trás dos números ajuda a evitar surpresas no planejamento financeiro enquanto você busca recolocação. O sistema não utiliza apenas o seu último contracheque, mas sim uma média." }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4 mt-8", children: "1. Encontre a Média Salarial" }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Some os seus últimos 3 salários anteriores à demissão e divida por 3." }),
            /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside space-y-2 mb-6 text-gray-400", children: /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Atenção:" }),
              " Considere o salário bruto (sem descontos de ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/inss", className: "text-blue-400 hover:text-blue-300 underline", children: "INSS" }),
              " ou IR). Horas extras e comissões entram na conta. Benefícios como Vale-Alimentação ou Vale-Transporte ",
              /* @__PURE__ */ jsx("strong", { children: "não" }),
              " entram."
            ] }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4 mt-8", children: "2. Aplique a Regra da Faixa (Exemplos Práticos)" }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-gray-500", children: "Para ilustrar, vamos simular três situações reais de trabalhadores demitidos em 2025:" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-2", children: "Exemplo A: Salário Médio de R$ 2.000,00" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  "Como o valor está na ",
                  /* @__PURE__ */ jsx("strong", { children: "primeira faixa" }),
                  " (até R$ 2.138,76):"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "font-mono text-emerald-400 mt-2", children: "2.000,00 x 0,80 = R$ 1.600,00" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-2", children: "Exemplo B: Salário Médio de R$ 3.000,00" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  "O valor está na ",
                  /* @__PURE__ */ jsx("strong", { children: "segunda faixa" }),
                  ". O cálculo é feito em duas etapas:"
                ] }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside space-y-1 mt-2 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsx("li", { children: "Calcula-se o excesso: 3.000,00 - 2.138,76 = 861,24" }),
                  /* @__PURE__ */ jsx("li", { children: "Aplica-se 50% sobre o excesso e soma o fixo: (861,24 x 0,50) + 1.711,01" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "font-mono text-emerald-400 mt-2", children: "430,62 + 1.711,01 = R$ 2.141,63" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-400 mt-2", children: "Dica Ninja: Use a fórmula direta: (Salário x 0,50) + 641,63 = Parcela" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-2", children: "Exemplo C: Salário Médio de R$ 5.000,00" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: "O valor está acima de R$ 3.564,96." }),
                /* @__PURE__ */ jsx("div", { className: "font-mono text-emerald-400 mt-2", children: "Resultado: Teto fixo de R$ 2.424,11" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Quantas parcelas vou receber?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "A quantidade de parcelas não é aleatória. Ela depende de quantas vezes você já solicitou o benefício e quantos meses comprovados você trabalhou nos últimos 36 meses." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl border border-white/5 overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 px-6 py-3 border-b border-white/5 font-semibold text-white", children: "Primeira Solicitação" }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 grid grid-cols-2 gap-4 text-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "text-gray-400", children: "De 12 a 23 meses trabalhados" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-right font-medium", children: "4 parcelas" }),
                /* @__PURE__ */ jsx("div", { className: "col-span-2 h-px bg-white/5" }),
                /* @__PURE__ */ jsx("div", { className: "text-gray-400", children: "24 meses ou mais" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-right font-medium", children: "5 parcelas" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "px-6 pb-4 text-xs text-gray-500", children: "Para a primeira solicitação, é obrigatório ter recebido salário por pelo menos 12 meses nos últimos 18 meses." })
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
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Casos Especiais e Regras Específicas" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-white mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-indigo-500" }),
              "Microempreendedor Individual (MEI)"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: 'Ter um CNPJ MEI ativo pode bloquear automaticamente o seu seguro, pois o sistema entende que você possui "renda própria". No entanto, se o MEI estiver inativo ou não gerar faturamento suficiente, é possível entrar com recurso administrativo para liberar o benefício.' })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-white font-semibold mb-2", children: "Diferença: Seguro vs FGTS e Rescisão" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300 mb-4", children: [
              "É fundamental não confundir este cálculo com o do ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/fgts", className: "text-blue-400 hover:text-blue-300 underline", children: "FGTS" }),
              ". São benefícios distintos. Além disso, optar pelo Saque-Aniversário do FGTS ",
              /* @__PURE__ */ jsx("strong", { children: "não" }),
              " retira o seu direito ao Seguro-Desemprego, apenas impede o saque do saldo da conta (Saque-Rescisão)."
            ] })
          ] })
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
//# sourceMappingURL=UnemploymentInsurancePage-BxBwgZJi.js.map
