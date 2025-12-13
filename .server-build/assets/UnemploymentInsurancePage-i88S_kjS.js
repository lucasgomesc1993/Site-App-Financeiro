import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Briefcase, Calculator, DollarSign, Calendar, FileText, Clock, AlertCircle, XCircle, CheckCircle, ChevronRight, HelpCircle } from "lucide-react";
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
const MIN_WAGE_2025 = 1518;
const RANGE_1_LIMIT = 2138.76;
const RANGE_2_LIMIT = 3564.96;
const FIXED_AMOUNT_RANGE_2 = 1711.01;
const MAX_BENEFIT_2025 = 2424.11;
const UNEMPLOYMENT_FAQS = [
  {
    question: "Qual o valor máximo do Seguro-Desemprego em 2025?",
    answer: "O teto máximo da parcela em 2025 foi fixado em <strong>R$ 2.424,11</strong> para quem possui média salarial superior a R$ 3.564,96. Esse valor foi reajustado com base no INPC de 2024. Vale lembrar que ninguém recebe menos que o salário mínimo vigente de <strong>R$ 1.518,00</strong>, garantindo o piso nacional para todos os beneficiários."
  },
  {
    question: "Quem ganha R$ 2.000 recebe quanto de seguro?",
    answer: "Como a média de R$ 2.000,00 se enquadra na primeira faixa da tabela (até R$ 2.138,76), aplica-se a alíquota fixa de 80%. Portanto, o valor exato da parcela será de <strong>R$ 1.600,00</strong> (2.000 x 0,80). Este montante é isento de descontos como INSS e Imposto de Renda, sendo depositado integralmente na conta do trabalhador."
  },
  {
    question: "Qual o prazo para dar entrada no benefício?",
    answer: "O trabalhador formal deve solicitar o benefício obrigatoriamente entre o <strong>7º e o 120º dia</strong> corrido após a data da demissão. Já para empregados domésticos, o prazo máximo é de 90 dias. É crucial respeitar essa janela, pois o sistema bloqueia pedidos fora do prazo, resultando na perda irreversível do direito para aquela demissão específica."
  },
  {
    question: "Como funciona o pagamento se eu arrumar outro emprego?",
    answer: "O benefício é exclusivo para quem não possui renda. Se você for contratado com registro em carteira (CLT) durante o recebimento, o pagamento das parcelas futuras é <strong>suspenso imediatamente</strong>. O governo cruza os dados da admissão no eSocial automaticamente, não sendo necessário devolver as parcelas já recebidas antes da nova contratação, apenas cessam-se as futuras."
  },
  {
    question: "Onde posso solicitar o Seguro-Desemprego online?",
    answer: 'A solicitação é realizada totalmente online pelo aplicativo <strong>Carteira de Trabalho Digital</strong> ou através da <a href="https://www.gov.br/pt-br/servicos/solicitar-o-seguro-desemprego" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">página oficial de serviços do Gov.br</a>. Para concluir o pedido, você precisará de uma conta Gov.br (nível Prata ou Ouro) e do número do Requerimento de Seguro-Desemprego, um documento de 10 dígitos entregue pelo empregador na rescisão.'
  },
  {
    question: "O valor do seguro desconta INSS ou Imposto de Renda?",
    answer: 'Não, o valor da parcela é totalmente isento de Imposto de Renda e não sofre desconto compulsório de INSS. O trabalhador recebe o montante líquido integral calculado. No entanto, o tempo recebendo o seguro não conta para aposentadoria, a menos que você pague o INSS voluntariamente como "Segurado Facultativo" nesse período.'
  },
  {
    question: "Quem tem MEI aberto perde o direito ao seguro?",
    answer: "Sim, o sistema bloqueia o benefício automaticamente ao detectar um CNPJ ativo vinculado ao seu CPF, presumindo existência de renda própria. Se o seu MEI estiver inativo ou não gerar faturamento suficiente para subsistência, é possível reverter o bloqueio apresentando um recurso administrativo com a Declaração Anual (DASN-SIMEI) zerada ou comprovantes de ausência de renda."
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
    if (salaries.length === 0 && !result) {
      return;
    } else if (salaries.length === 0) {
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
    "name": "Calculadora Seguro-Desemprego 2025: Valor e Tabela",
    "url": "https://junny.com.br/calculadoras/seguro-desemprego",
    "description": "Calcule agora o valor do seu Seguro-Desemprego 2025. Teto atualizado de R$ 2.424,11, piso de R$ 1.518,00 e novas regras da tabela oficial.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
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
        title: "Calculadora Seguro-Desemprego 2025: Valor e Tabela",
        description: "Calcule agora o valor do seu Seguro-Desemprego 2025. Teto atualizado de R$ 2.424,11, piso de R$ 1.518,00 e novas regras da tabela oficial.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Seguro Desemprego", href: "/calculadoras/seguro-desemprego" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Atualizado CODEFAT 2025" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de Seguro-Desemprego ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "2025: Simule Valor e Parcelas" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
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
                      inputMode: "decimal",
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
                      inputMode: "decimal",
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
                      inputMode: "decimal",
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
                    inputMode: "numeric",
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
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center relative overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-2 opacity-10", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-12 h-12 text-blue-500" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2 font-medium", children: "Valor da Parcela" }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl md:text-4xl font-bold text-white block", children: result && result.installmentCount > 0 ? `R$ ${result.installmentValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                result && result.averageSalary > 0 && /* @__PURE__ */ jsxs("span", { className: "text-xs text-blue-400/80 mt-2 block", children: [
                  "Média Salarial: R$ ",
                  result.averageSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center relative overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-2 opacity-5", children: /* @__PURE__ */ jsx(Calendar, { className: "w-12 h-12 text-white" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 block mb-2 font-medium", children: "Quantidade de Parcelas" }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl md:text-4xl font-bold text-white block", children: result ? result.installmentCount > 0 ? `${result.installmentCount}x` : "Sem direito" : "---" }),
                (result == null ? void 0 : result.installmentCount) === 0 && /* @__PURE__ */ jsx("span", { className: "text-xs text-red-400 mt-2 block", children: "Carência não atingida" })
              ] })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-500" }),
            "Resumo Rápido (Dados Oficiais Dezembro/2025)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Teto Máximo da Parcela" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 2.424,11" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Para médias salariais acima de R$ 3.564,96" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Piso Mínimo" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 1.518,00" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Valor do Salário Mínimo vigente" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Prazo para Solicitar:" }),
                  " Entre ",
                  /* @__PURE__ */ jsx("strong", { children: "7 e 120 dias" }),
                  " após a data da demissão."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Base de Cálculo:" }),
                  " Média dos últimos ",
                  /* @__PURE__ */ jsx("strong", { children: "3 salários brutos" }),
                  " anteriores à dispensa."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Quantidade de Parcelas:" }),
                  " De 3 a 5, dependendo do tempo de vínculo e recorrência."
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Resumo em 30 Segundos" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-300 leading-relaxed", children: [
            "O ",
            /* @__PURE__ */ jsx("strong", { children: "Seguro-Desemprego" }),
            " é um benefício temporário garantido ao trabalhador demitido sem justa causa. Em 2025, o valor que você recebe não é necessariamente igual ao seu último salário, mas sim calculado sobre a ",
            /* @__PURE__ */ jsx("strong", { children: "média dos últimos três meses" }),
            " de trabalho. O sistema utiliza uma tabela progressiva com três faixas: quem ganha menos recebe proporcionalmente mais (até 80% da média), enquanto salários mais altos sofrem um redutor maior, limitados ao teto de ",
            /* @__PURE__ */ jsx("strong", { children: "R$ 2.424,11" }),
            ". É impossível receber menos que um salário mínimo (",
            /* @__PURE__ */ jsx("strong", { children: "R$ 1.518,00" }),
            "), mesmo que o cálculo matemático resulte em valor inferior."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Briefcase, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como funciona o Seguro-Desemprego" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed mb-6", children: "O ciclo do benefício começa obrigatoriamente pela solicitação digital, que deve ser feita pelo trabalhador entre o 7º e o 120º dia corrido após a data da demissão. Todo o procedimento é realizado via aplicativo Carteira de Trabalho Digital ou portal Gov.br, onde o sistema puxa automaticamente os dados informados pelo empregador no eSocial. Isso elimina a necessidade de filas e papelada na maioria dos casos, tornando o acesso ao direito muito mais ágil." }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed", children: "Após o envio, o requerimento entra em fase de análise processada pelos sistemas da Dataprev. Nessa etapa, um cruzamento de dados massivo verifica se você cumpre os requisitos legais (como tempo de carência e ausência de outra renda). Sendo aprovado, o sistema já define a quantidade de parcelas e as datas de pagamento, que serão creditadas mensalmente na conta bancária informada ou na Poupança Social Digital (Caixa Tem)." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Tabela Oficial do Seguro-Desemprego 2025" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "A tabela abaixo está vigente desde 11 de janeiro de 2025 e aplica a correção de 4,77% (INPC) sobre as faixas do ano anterior." }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10 mb-6", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "p-4", children: "Faixa de Salário Médio (Últimos 3 Meses)" }),
              /* @__PURE__ */ jsx("th", { className: "p-4", children: "Cálculo da Parcela" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-4 font-medium text-white", children: "Até R$ 2.138,76" }),
                /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
                  "Multiplica-se o salário médio por ",
                  /* @__PURE__ */ jsx("strong", { children: "0,8" }),
                  " (80%)"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-4 font-medium text-white", children: "De R$ 2.138,77 até R$ 3.564,96" }),
                /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
                  "O que exceder R$ 2.138,76 multiplica-se por ",
                  /* @__PURE__ */ jsx("strong", { children: "0,5" }),
                  " e soma-se a ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 1.711,01" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-4 font-medium text-white", children: "Acima de R$ 3.564,96" }),
                /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
                  "Valor fixo e invariável de ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 2.424,11" })
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-white/5 border-l-4 border-blue-500", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300", children: [
            /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
            " Dados baseados na ",
            /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/trabalho-e-emprego/pt-br/pdfs/sei_4274391_anexo.pdf", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Tabela Oficial do Ministério do Trabalho e Emprego" }),
            " e resoluções do CODEFAT."
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-yellow-500 shrink-0" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-yellow-200 mb-2", children: "Erros Comuns ao Calcular o Benefício" }),
              /* @__PURE__ */ jsxs("p", { className: "text-yellow-100/80", children: [
                "Muitos trabalhadores se surpreendem com o valor depositado por cometerem erros básicos na simulação. O principal equívoco é achar que o benefício será igual ao ",
                /* @__PURE__ */ jsx("strong", { children: "salário líquido" }),
                " que caía na conta."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-yellow-100/70", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Confusão Bruto x Líquido:" }),
                " O cálculo considera o ",
                /* @__PURE__ */ jsx("strong", { children: "salário bruto" }),
                " (antes dos descontos de INSS e IR), incluindo horas extras, adicional noturno e comissões. Verbas indenizatórias (como PLR) geralmente não entram na conta."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Ignorar a Média:" }),
                " Se você teve um aumento no último mês, ele não define o benefício sozinho. A regra exige a média aritmética dos últimos 3 contracheques anteriores à dispensa."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Achar que é 80% de tudo:" }),
                " A alíquota de 80% só se aplica para a primeira faixa salarial (até R$ 2.138,76). Para valores superiores, o cálculo muda drasticamente para evitar rombos no FAT (Fundo de Amparo ao Trabalhador)."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-6 text-sm text-yellow-200/60", children: [
            "Para entender o impacto real no seu bolso após a demissão, recomendamos também simular sua ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/rescisao", className: "underline hover:text-yellow-200", children: "Rescisão de Contrato de Trabalho" }),
            " completa, que inclui saldo de salário e multas."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Como Calcular (Passo a Passo e Exemplos Reais)" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "O cálculo manual exige atenção às três faixas de renda. Veja como fazer:" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "1. Calcule sua Média Salarial" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Some os 3 últimos salários brutos anteriores à demissão e divida por 3." }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 text-sm text-gray-500 bg-white/5 p-3 rounded-lg border border-white/5 inline-block", children: [
                /* @__PURE__ */ jsx("em", { children: "Exemplo:" }),
                " R$ 3.000 + R$ 3.000 + R$ 3.000 = R$ 9.000 ÷ 3 = ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 3.000,00" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "2. Identifique a Faixa e Aplique a Fórmula" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "Com a média em mãos, verifique em qual linha da tabela oficial ela se encaixa." }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-2 text-sm border-b border-white/10 pb-2", children: "Cenário A: Salário Inicial" }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-xs text-gray-300", children: [
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Trabalhador:" }),
                      " João, Auxiliar"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Média:" }),
                      " R$ 1.850,00"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Cálculo:" }),
                      " 1.850 x 0,80 = 1.480,00"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "text-blue-300 pt-2 border-t border-white/5", children: [
                      /* @__PURE__ */ jsx("strong", { children: "Resultado:" }),
                      " R$ 1.518,00 (Piso Mínimo)"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-2 text-sm border-b border-white/10 pb-2", children: "Cenário B: Salário Médio" }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-xs text-gray-300", children: [
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Trabalhadora:" }),
                      " Mariana, Analista"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Média:" }),
                      " R$ 3.000,00"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Exc:" }),
                      " 3.000 - 2.138,76 = 861,24"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Red:" }),
                      " 861,24 x 0,5 = 430,62"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "text-blue-300 pt-2 border-t border-white/5", children: [
                      /* @__PURE__ */ jsx("strong", { children: "Soma:" }),
                      " 430,62 + 1.711,01 = ",
                      /* @__PURE__ */ jsx("strong", { children: "R$ 2.141,63" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-2 text-sm border-b border-white/10 pb-2", children: "Cenário C: Salário Alto" }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-xs text-gray-300", children: [
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Trabalhador:" }),
                      " Carlos, Eng."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Média:" }),
                      " R$ 8.500,00"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "text-blue-300 pt-2 border-t border-white/5", children: [
                      /* @__PURE__ */ jsx("strong", { children: "Resultado:" }),
                      " R$ 2.424,11 (Teto Fixo)"
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
              "Se você possui valores pendentes de ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/fgts", className: "text-blue-400 hover:underline", children: "FGTS" }),
              ", é importante verificar se os depósitos foram feitos corretamente, pois isso impacta a comprovação do vínculo."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Quem tem direito e Quantidade de Parcelas" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
            "Para ter acesso ao benefício em 2025, não basta ser demitido. É necessário cumprir o período de ",
            /* @__PURE__ */ jsx("strong", { children: "carência" }),
            " (meses trabalhados), ",
            /* @__PURE__ */ jsx("a", { href: "http://www.planalto.gov.br/ccivil_03/leis/l7998.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "conforme a Lei nº 7.998/90" }),
            ", que varia de acordo com o número de vezes que você já pediu o seguro."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Regra de Carência" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-300", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "1ª Solicitação:" }),
                    " Pelo menos ",
                    /* @__PURE__ */ jsx("strong", { children: "12 meses" }),
                    " trabalhados nos últimos 18 meses."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "2ª Solicitação:" }),
                    " Pelo menos ",
                    /* @__PURE__ */ jsx("strong", { children: "9 meses" }),
                    " trabalhados nos últimos 12 meses."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "3ª+ Solicitação:" }),
                    " Pelo menos ",
                    /* @__PURE__ */ jsx("strong", { children: "6 meses" }),
                    " trabalhados anteriores à dispensa."
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "Quantas parcelas?" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-2", children: "A quantidade (3, 4 ou 5) depende do histórico do vínculo." }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-300", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-2 bg-white/5 rounded border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-blue-400", children: "1ª Vez:" }),
                  " 12-23 meses = 4 parc | 24+ meses = 5 parc."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-2 bg-white/5 rounded border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-blue-400", children: "2ª Vez:" }),
                  " 9-11 meses = 3 parc | 12-23 = 4 parc | 24+ = 5."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-2 bg-white/5 rounded border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-blue-400", children: "3ª+ Vez:" }),
                  " 6-11 meses = 3 parc | 12-23 = 4 parc | 24+ = 5."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Casos Especiais e Situações Específicas" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "Empregado Doméstico" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300", children: [
                "O cálculo é diferente. O valor é fixo em ",
                /* @__PURE__ */ jsx("strong", { children: "1 Salário Mínimo (R$ 1.518,00)" }),
                ", independentemente da remuneração anterior. O limite máximo é de 3 parcelas e exige carência de 15 meses trabalhados nos últimos 24 meses."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "MEI e Renda Extra" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Se você possui um CNPJ ativo (MEI), o sistema da Dataprev pode bloquear o benefício. Para reverter, é necessário comprovar que a empresa está inativa ou sem faturamento através de recurso administrativo." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "Aposentados" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300", children: [
                "Trabalhadores aposentados que continuam trabalhando ",
                /* @__PURE__ */ jsx("strong", { children: "não têm direito" }),
                " ao Seguro-Desemprego, pois a lei veta o acúmulo. O foco deve ser o planejamento com o ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-blue-400 hover:underline", children: "Salário Líquido" }),
                " da aposentadoria e a multa de 40%."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "Acordo de Demissão" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300", children: [
                "Na demissão consensual (acordo), onde o trabalhador saca 80% do FGTS, ",
                /* @__PURE__ */ jsx("strong", { children: "não há direito ao Seguro-Desemprego" }),
                ". Esse modelo de desligamento exclui o benefício por lei."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: UNEMPLOYMENT_FAQS,
          title: "Perguntas Frequentes sobre Seguro-Desemprego 2025",
          className: "py-12 mt-16",
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
//# sourceMappingURL=UnemploymentInsurancePage-i88S_kjS.js.map
