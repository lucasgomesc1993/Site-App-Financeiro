import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Clock, Calculator, HelpCircle, AlertCircle, FileText, XCircle, CheckCircle, Percent, BookOpen, ArrowRight } from "lucide-react";
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
const OVERTIME_FAQS = [
  {
    question: "Qual o valor da hora extra com o salário mínimo de 2025?",
    answer: "Considerando o mínimo vigente de **R$ 1.518,00** e um divisor padrão de 220 horas mensais, sua hora normal de trabalho vale **R$ 6,90**. Ao aplicar o adicional padrão de 50% para dias úteis, a hora extra sobe para **R$ 10,35**. Já o trabalho em domingos ou feriados (100%) é remunerado em **R$ 13,80**, sendo o dobro da hora normal."
  },
  {
    question: "Como calcular hora extra no sábado?",
    answer: "Se o trabalho no sábado exceder a jornada semanal de 44 horas, ele é considerado hora extra. O adicional padrão aplicável é de **50%**. Contudo, se sua Convenção Coletiva classificar o sábado como dia de descanso remunerado ou feriado da categoria, o pagamento devido deve ser de 100% sobre o valor da hora normal. Consulte a Súmula 113 do TST."
  },
  {
    question: "Quem trabalha 40 horas usa qual divisor na calculadora?",
    answer: "Quem possui contrato de 40 horas semanais deve configurar a **Calculadora de Horas Extras** com o divisor **200**. O uso do divisor 220, destinado à jornada de 44 horas, resulta em pagamento a menor, pois reduz artificialmente o valor da hora. O cálculo correto sempre divide o salário por 200, valorizando a hora proporcionalmente."
  },
  {
    question: "O tempo de deslocamento conta como hora extra?",
    answer: "Não, de acordo com as regras pós-Reforma Trabalhista de 2017. O período gasto no trajeto entre a residência e o local de trabalho não é mais computado na jornada efetiva. Isso se aplica mesmo que a empresa forneça o transporte, exceto se houver acordo coletivo específico estipulando o contrário."
  },
  {
    question: "Posso receber horas extras fixas todo mês?",
    answer: "Não é uma prática legalmente segura, pois a pré-contratação de horas extras fixas é considerada nula pelo TST (Súmula 199). Se pagas com habitualidade, elas incorporam o salário para todos os fins. Contudo, isso não isenta a empresa de pagar as horas extras reais que excedam o limite contratual fixo."
  },
  {
    question: "Quantas horas extras posso fazer por dia (Limite Legal)?",
    answer: "Pela legislação vigente, o limite máximo permitido é de <a href='https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm#art59' target='_blank' rel='noopener noreferrer'>2 horas extras diárias</a> (Art. 59 da CLT). Exceder esse teto só é aceito em casos excepcionais de força maior ou para serviços inadiáveis que possam gerar prejuízo, devendo ser devidamente justificado. Ultrapassar o limite habitual pode gerar multas administrativas para a empresa."
  }
];
function OvertimePage() {
  const [salary, setSalary] = useState("");
  const [hoursWorked, setHoursWorked] = useState("220");
  const [overtime50, setOvertime50] = useState("");
  const [overtime100, setOvertime100] = useState("");
  const [overtimeNight, setOvertimeNight] = useState("");
  const [businessDays, setBusinessDays] = useState("25");
  const [restDays, setRestDays] = useState("5");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const divisor = parseFloat(hoursWorked);
    const ot50 = parseFloat(overtime50.replace(",", ".") || "0");
    const ot100 = parseFloat(overtime100.replace(",", ".") || "0");
    const otNight = parseFloat(overtimeNight.replace(",", ".") || "0");
    const bDays = parseFloat(businessDays) || 25;
    const rDays = parseFloat(restDays) || 5;
    if (isNaN(sal) || isNaN(divisor) || divisor === 0 || bDays === 0) {
      setResult(null);
      return;
    }
    const hourlyRate = sal / divisor;
    const val50 = hourlyRate * 1.5 * ot50;
    const val100 = hourlyRate * 2 * ot100;
    const nightRateFactor = 1.2 * 1.5;
    const fictitiousTimeFactor = 60 / 52.5;
    const valNight = hourlyRate * nightRateFactor * (otNight * fictitiousTimeFactor);
    const totalOvertime = val50 + val100 + valNight;
    const dsrValue = totalOvertime / bDays * rDays;
    const grossTotal = sal + totalOvertime + dsrValue;
    setResult({
      hourlyRate,
      val50,
      val100,
      valNight,
      totalOvertime,
      dsrValue,
      grossTotal
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, hoursWorked, overtime50, overtime100, overtimeNight, businessDays, restDays]);
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
    "name": "Calculadora de Horas Extras 2025: Cálculo Exato e DSR",
    "description": "Calculadora de Horas Extras 2025: Valor exato com salário de R$ 1.518, DSR e tabela oficial. Calcule adicional noturno e reflexos agora.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "featureList": [
      "Cálculo de Hora Extra 50% e 100%",
      "Reflexo no Descanso Semanal Remunerado (DSR)",
      "Configuração de Jornada Mensal (220h, 200h, 180h)",
      "Cálculo de Hora Extra Noturna com Hora Ficta e Adicional",
      "Simulação de Salário Bruto com Adicionais"
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
        title: "Calculadora de Horas Extras 2025: Cálculo Exato e DSR",
        description: "Calculadora de Horas Extras 2025: Valor exato com salário de R$ 1.518, DSR e tabela oficial. Calcule adicional noturno e reflexos agora.",
        canonical: "/calculadoras/horas-extras"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": OVERTIME_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Horas Extras", href: "/calculadoras/horas-extras" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500", children: "Horas Extras 2025" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
            "Simular Hora Extra"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "salary-input", className: "text-sm text-gray-400", children: "Salário Bruto" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "R$" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "salary-input",
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
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "hours-select", className: "text-sm text-gray-400", children: "Divisor Mensal" }),
                /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "hours-select",
                    value: hoursWorked,
                    onChange: (e) => setHoursWorked(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "220", children: "220 (44h Semanais)" }),
                      /* @__PURE__ */ jsx("option", { value: "200", children: "200 (40h Semanais)" }),
                      /* @__PURE__ */ jsx("option", { value: "180", children: "180 (36h Semanais)" }),
                      /* @__PURE__ */ jsx("option", { value: "150", children: "150 (30h Semanais)" })
                    ]
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "ot50-input", className: "text-sm text-gray-400", children: "Horas Extras 50%" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "ot50-input",
                    type: "text",
                    inputMode: "decimal",
                    value: overtime50,
                    onChange: (e) => setOvertime50(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "Ex: 10"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "ot100-input", className: "text-sm text-gray-400", children: "Horas Extras 100%" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "ot100-input",
                    type: "text",
                    inputMode: "decimal",
                    value: overtime100,
                    onChange: (e) => setOvertime100(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "Domingos/Feriados"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-1 gap-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: "otnight-input", className: "text-sm text-gray-400 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { children: "Horas Extras Noturnas" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full", children: "50% + 20% Cumulativo" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "otnight-input",
                  type: "text",
                  inputMode: "decimal",
                  value: overtimeNight,
                  onChange: (e) => setOvertimeNight(e.target.value),
                  className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                  placeholder: "Qtd. Horas no Relógio (Calculamos a ficta)"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Insira as horas do relógio trabalhadas entre 22h e 5h. O sistema aplica a hora ficta e os adicionais cumlativos." })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("label", { htmlFor: "business-days-input", className: "text-sm text-gray-400 flex items-center gap-1", children: [
                  "Dias Úteis",
                  /* @__PURE__ */ jsx(HelpCircle, { className: "w-3 h-3 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "business-days-input",
                    type: "number",
                    inputMode: "numeric",
                    value: businessDays,
                    onChange: (e) => setBusinessDays(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "25"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("label", { htmlFor: "rest-days-input", className: "text-sm text-gray-400 flex items-center gap-1", children: [
                  "Domingos e Feriados",
                  /* @__PURE__ */ jsx(HelpCircle, { className: "w-3 h-3 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "rest-days-input",
                    type: "number",
                    inputMode: "numeric",
                    value: restDays,
                    onChange: (e) => setRestDays(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "5"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Total a Receber (Bruto Estimado)" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.grossTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-gray-400", children: "Inclui reflexo no DSR" })
              ] }),
              result && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Valor Hora Normal" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                    "R$ ",
                    result.hourlyRate.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.val50 > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Total Extras 50%" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-green-400 font-medium", children: [
                    "+ R$ ",
                    result.val50.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.val100 > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Total Extras 100%" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-green-400 font-medium", children: [
                    "+ R$ ",
                    result.val100.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                result.valNight > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Extra Noturna (c/ Ficta)" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-green-400 font-medium", children: [
                    "+ R$ ",
                    result.valNight.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Reflexo DSR" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-blue-400 font-medium", children: [
                    "+ R$ ",
                    result.dsrValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-yellow-200/80 leading-relaxed", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Nota:" }),
                  " Esse valor entra bruto na folha e sofre descontos de ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/inss", className: "underline hover:text-yellow-100", children: "INSS" }),
                  " e Imposto de Renda."
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-500" }),
            "Resumo Rápido (Dados Oficiais 2025):"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm text-gray-400", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Salário Mínimo Base:" }),
                " R$ 1.518,00 (Salário Mínimo Vigente - LOA 2025)."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Adicionais Padrão:" }),
                " 50% (dias úteis) e 100% (domingos/feriados)."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Adicional Noturno:" }),
                " 20% (Regra Geral CLT) ou 50% (se previsto em Convenção Coletiva)."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Divisores:" }),
                " 220 (para 44h semanais) ou 200 (para 40h semanais)."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Reflexos:" }),
                " Obrigatório integrar DSR, Férias e 13º Salário."
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-12 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Resumo em 30 Segundos" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-300 leading-relaxed", children: [
            "A **Calculadora de Horas Extras** da Junny é a ferramenta definitiva para trabalhadores CLT e departamentos pessoais ajustarem a remuneração suplementar conforme a legislação vigente em dezembro de 2025. Com a atualização do salário mínimo para R$ 1.518,00 (consulte a ",
            /* @__PURE__ */ jsx("a", { href: "https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/noticias/2024/08/orcamento-de-2025-garante-equilibrio-fiscal-e-aumento-real-do-salario-minimo", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Lei Orçamentária Anual - LOA 2025" }),
            ") e as regras consolidadas do TST, o cálculo manual exige atenção redobrada. Esta ferramenta aplica automaticamente o divisor correto (220, 200 ou 180), considera a hora ficta noturna e projeta os reflexos no Descanso Semanal Remunerado (DSR), garantindo que você receba ou pague exatamente o que a lei determina."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Tabela Oficial de Adicionais e Divisores (2025)" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Para garantir a precisão da sua **Calculadora de Horas Extras**, utilize os parâmetros abaixo, atualizados conforme as práticas de mercado e legislação." }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-white", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "p-4", children: "Tipo de Hora" }),
              /* @__PURE__ */ jsx("th", { className: "p-4", children: "Adicional Mínimo (CLT)" }),
              /* @__PURE__ */ jsx("th", { className: "p-4", children: "Divisor Típico" }),
              /* @__PURE__ */ jsx("th", { className: "p-4", children: "Observação Crítica 2025" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-white/5 text-gray-400", children: [
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-4 font-semibold text-white", children: "Extra Diurna" }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-blue-400 font-bold", children: "50%" }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "220 / 200" }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "Base salarial mínima de R$ 1.518,00." })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-4 font-semibold text-white", children: "Extra Domingo/Feriado" }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-green-400 font-bold", children: "100%" }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "220 / 200" }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "Pagamento em dobro obrigatório sem folga compensatória." })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-4 font-semibold text-white", children: "Adicional Noturno" }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-yellow-400 font-bold", children: "20% (Urbano)" }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "-" }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "Algumas Convenções Coletivas estipulam 50% (verificar sindicato)." })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-4 font-semibold text-white", children: "Extra Noturna" }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-purple-400 font-bold", children: "50% + 20%" }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "-" }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "Incide sobre a hora noturna (Súmula 60 TST)." })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "p-4 font-semibold text-white", children: "Intrajornada (Almoço)" }),
                /* @__PURE__ */ jsx("td", { className: "p-4 text-blue-400 font-bold", children: "50%" }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "-" }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: "Natureza indenizatória (apenas tempo suprimido)." })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 p-4 bg-white/5 rounded-xl border border-white/5", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
            /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
            " Parâmetros baseados no ",
            /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Decreto-Lei nº 5.452 (Consolidação das Leis do Trabalho) - Planalto" }),
            "."
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Como funciona a Calculadora de Horas Extras" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "A **Calculadora de Horas Extras** opera processando três variáveis essenciais para entregar o resultado líquido da sua jornada suplementar. Diferente de uma conta simples de multiplicação, a ferramenta considera:" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-gray-300", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "1. A Base de Cálculo:" }),
                " Soma o salário base a outros adicionais fixos (periculosidade, insalubridade ou tempo de serviço) para encontrar o valor real da hora."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "2. O Fator Multiplicador:" }),
                " Aplica o percentual correto (50%, 100% ou específico de CCT) sobre a hora normal."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "3. A Integração de Reflexos:" }),
                " Calcula automaticamente o impacto dessas horas no seu descanso semanal (DSR), evitando prejuízos financeiros comuns em cálculos manuais."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-yellow-500 shrink-0" }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-yellow-200 mb-2", children: "Erros Comuns ao Calcular Horas Extras" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-yellow-100/80 mb-4", children: "O erro número um em 2025 não é matemático, mas conceitual: a **conversão de minutos**. O relógio segue a base 60 (sexagesimal), enquanto a folha de pagamento opera na base 100 (centesimal)." }),
          /* @__PURE__ */ jsx("p", { className: "text-yellow-100/80 mb-4", children: "Muitos gestores ou trabalhadores que dispensam o uso de uma **Calculadora de Horas Extras** adequada multiplicam erroneamente os minutos do relógio pelo valor da hora." }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-yellow-100/70", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-yellow-500 mt-1 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "O Erro:" }),
                " Achar que 1 hora e 30 minutos é igual a 1,3."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-500 mt-1 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "A Realidade:" }),
                " 30 minutos representam 50% de uma hora. Logo, deve-se usar ",
                /* @__PURE__ */ jsx("strong", { children: "1,5" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Percent, { className: "w-4 h-4 text-yellow-500 mt-1 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Impacto:" }),
                " Ao digitar 1,3 em vez de 1,5, o trabalhador perde 12 minutos de pagamento a cada ocorrência."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(BookOpen, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white leading-tight mt-1", children: "Como Calcular (Passo a Passo e Fórmulas)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Fórmula Geral (Método Rápido)" }),
              /* @__PURE__ */ jsx("div", { className: "font-mono text-sm text-blue-300 mb-4", children: "Valor Total = (Salário Base / Divisor) x Fator (1,5 ou 2,0) x Qtd. Horas" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Método Detalhado (Passo a Passo)" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "O cálculo correto exige três etapas: encontrar o valor da hora normal, aplicar o adicional e multiplicar pela quantidade de horas (em decimal)." }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "pl-4 border-l-2 border-blue-500", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-2", children: "1. Encontrar o Valor da Hora Normal (VHN)" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Divida a remuneração total (Salário + Adicionais Fixos) pelo divisor mensal." }),
                  /* @__PURE__ */ jsxs("ul", { className: "text-xs text-gray-500 space-y-1", children: [
                    /* @__PURE__ */ jsx("li", { children: "• Jornada 44h semanais = Divisor 220." }),
                    /* @__PURE__ */ jsx("li", { children: "• Jornada 40h semanais = Divisor 200." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pl-4 border-l-2 border-blue-500", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-2", children: "2. Aplicar o Percentual da Hora Extra" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Multiplique o VHN pelo fator de acréscimo." }),
                  /* @__PURE__ */ jsxs("ul", { className: "text-xs text-gray-500 space-y-1", children: [
                    /* @__PURE__ */ jsx("li", { children: "• Para 50%: Multiplicar por 1,5." }),
                    /* @__PURE__ */ jsx("li", { children: "• Para 100%: Multiplicar por 2,0." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5 mt-4", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-md font-bold text-white mb-2", children: "Exemplo Real 1 (Salário Mínimo Vigente)" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mb-3", children: [
                    "Funcionário com salário de ",
                    /* @__PURE__ */ jsx("strong", { children: "R$ 1.518,00" }),
                    " (jornada 44h) que fez ",
                    /* @__PURE__ */ jsx("strong", { children: "10h30min" }),
                    " de extras (50%) no mês."
                  ] }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-xs text-gray-300", children: [
                    /* @__PURE__ */ jsxs("li", { children: [
                      "1. ",
                      /* @__PURE__ */ jsx("strong", { children: "Conversão do tempo:" }),
                      " 10h30min = 10,5 horas."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "2. ",
                      /* @__PURE__ */ jsx("strong", { children: "Valor Hora Normal:" }),
                      " R$ 1.518 / 220 = R$ 6,90."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "3. ",
                      /* @__PURE__ */ jsx("strong", { children: "Valor com Adicional (50%):" }),
                      " R$ 6,90 x 1,5 = R$ 10,35."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "4. ",
                      /* @__PURE__ */ jsx("strong", { children: "Total a Receber:" }),
                      " R$ 10,35 x 10,5 = ",
                      /* @__PURE__ */ jsx("strong", { children: "R$ 108,67" }),
                      "."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-md font-bold text-white mb-2", children: "Exemplo 2 (Alto Salário / Teto)" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mb-3", children: [
                    "Gerente ou especialista com salário de ",
                    /* @__PURE__ */ jsx("strong", { children: "R$ 8.000,00" }),
                    " (jornada padrão 220h) que realizou ",
                    /* @__PURE__ */ jsx("strong", { children: "10 horas extras" }),
                    "."
                  ] }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-xs text-gray-300", children: [
                    /* @__PURE__ */ jsxs("li", { children: [
                      "1. ",
                      /* @__PURE__ */ jsx("strong", { children: "Valor Hora Normal:" }),
                      " R$ 8.000 / 220 = R$ 36,36."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "2. ",
                      /* @__PURE__ */ jsx("strong", { children: "Valor com Adicional (50%):" }),
                      " R$ 36,36 x 1,5 = R$ 54,55 (Valor da hora extra)."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "3. ",
                      /* @__PURE__ */ jsx("strong", { children: "Total a Receber:" }),
                      " R$ 54,55 x 10 = ",
                      /* @__PURE__ */ jsx("strong", { children: "R$ 545,50" }),
                      "."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mt-4", children: [
                  "Para um planejamento financeiro completo, insira esses valores na nossa ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "text-blue-400 hover:underline", children: "calculadora de salário líquido" }),
                  " e veja os descontos de IRRF."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "O Reflexo no DSR (Descanso Semanal Remunerado)" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
            "Utilizar uma **Calculadora de Horas Extras** confiável é vital para computar o DSR. As horas extras habituais geram um valor adicional a ser pago no seu dia de descanso. Em 2025, o cálculo segue rigorosamente a ",
            /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/leis/l0605.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Lei 605/49" }),
            " e a Súmula 172 do TST."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 font-mono text-sm text-blue-300 mb-4", children: "DSR = (Total Horas Extras / Dias Úteis no Mês) x Domingos e Feriados" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
            /* @__PURE__ */ jsx("strong", { children: "Atenção:" }),
            " Para este cálculo, o sábado é considerado dia útil. Se você fez R$ 1.000,00 de extras em um mês com 25 dias úteis e 5 domingos/feriados, receberá mais ",
            /* @__PURE__ */ jsx("strong", { children: "R$ 200,00" }),
            " de DSR. Esse valor também impacta o cálculo na hora de ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/ferias", className: "text-blue-400 hover:underline", children: "calcular férias" }),
            " e o ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/decimo-terceiro", className: "text-blue-400 hover:underline", children: "décimo terceiro" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Adicional Noturno: Regra Geral (20%) e Exceções" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "É fundamental consultar a Convenção Coletiva de Trabalho (CCT) da sua categoria em 2025. Embora a **CLT (Art. 73)** determine que o adicional noturno urbano seja de **20%** sobre a hora diurna, diversas categorias podem ter negociado percentuais maiores, chegando a **50%**." }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Hora Extra Noturna (Cumulatividade)" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "Se a hora extra for realizada entre 22h e 05h, o custo é cumulativo:" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-gray-300 mb-6", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 mt-1 text-blue-500" }),
              " 1. Calcula-se a hora noturna (VHN + 20% ou % da CCT)."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 mt-1 text-blue-500" }),
              " 2. Sobre esse valor majorado, aplica-se o adicional de Hora Extra (Súmula 60 do TST)."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-white font-bold mb-2", children: "Exemplo de Impacto Financeiro:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-1 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Regra CLT (20%):" }),
                " Hora Noturna vale 1,2x a hora normal."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                /* @__PURE__ */ jsx("strong", { children: "Exceção CCT (50%):" }),
                " Hora Noturna vale 1,5x a hora normal."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mt-4", children: [
            "Além do valor, lembre-se da ",
            /* @__PURE__ */ jsx("strong", { children: "hora ficta" }),
            ": cada 52 minutos e 30 segundos trabalhados à noite equivalem a 1 hora remunerada."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Casos Especiais" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Para cobrir todas as nuances da legislação, nossa **Calculadora de Horas Extras** contempla também as situações específicas detalhadas abaixo:" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Escala 12x36 e Feriados" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Na escala 12x36, a remuneração mensal abrange o descanso. Porém, a Súmula 444 do TST e entendimentos recentes reforçam que o trabalho em **feriados** nesta escala, se não compensado, deve ser pago em dobro (adicional de 100%). O dia normal de trabalho, contudo, não gera hora extra além da 8ª hora." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Comissionistas" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Para quem recebe comissão, o cálculo é diferente (Súmula 340 do TST). Como a comissão já remunera o tempo trabalhado (através das vendas), a empresa deve pagar apenas o **adicional** de hora extra sobre a parte variável, e não a hora cheia." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Intervalo Intrajornada (Almoço)" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Se a empresa não concede a 1 hora completa de almoço, ela deve pagar o tempo suprimido como hora extra. Esse pagamento tem natureza indenizatória (não incide INSS/FGTS) e considera apenas os minutos não gozados, conforme alterações da Reforma Trabalhista." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: OVERTIME_FAQS,
          title: "Perguntas Frequentes sobre Calculadora de Horas Extras",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  OvertimePage
};
//# sourceMappingURL=OvertimePage-BRfetYRQ.js.map
