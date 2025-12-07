import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Clock, Calculator, HelpCircle, AlertCircle, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-2hmnhBZO.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "framer-motion";
const OVERTIME_FAQS = [
  {
    question: "Qual o limite de horas extras por dia?",
    answer: 'Pela CLT, o limite legal é de 2 horas extras diárias. A jornada total (normal + extra) não deve ultrapassar 10 horas. No entanto, em casos de "força maior" ou serviços inadiáveis que possam causar prejuízo à empresa, a lei permite estender até 4 horas extras (totalizando 12h), desde que devidamente justificado.'
  },
  {
    question: "Como calcular hora extra 100%?",
    answer: "A hora extra 100% ocorre em domingos e feriados não compensados. O cálculo é o dobro da hora normal: divida seu salário pelo divisor mensal para encontrar o valor da hora base e multiplique por 2. Algumas convenções coletivas (CCT) podem estipular 100% também para sábados ou horas que excedam certo limite diário."
  },
  {
    question: "Hora extra entra no banco de horas?",
    answer: "Depende do contrato. Se a empresa adota o Banco de Horas, o tempo excedente vira saldo para folgas futuras (compensação 1:1) e não é pago em dinheiro no mês. O banco de horas deve ser compensado em até 6 meses (acordo individual) ou 1 ano (acordo coletivo/sindicato). Se não compensado no prazo, a empresa deve pagar as horas com adicional."
  },
  {
    question: "O DSR é calculado sobre a hora extra?",
    answer: 'Sim, o reflexo no DSR é obrigatório para horas extras habituais. O cálculo soma o valor total das horas extras do mês, divide pelo número de dias úteis (incluindo sábados trabalhados) e multiplica pelo número de domingos e feriados. Isso garante que o descanso também seja remunerado com base na "sobrejornada".'
  },
  {
    question: "Quem trabalha em Home Office recebe hora extra?",
    answer: "Desde a reforma e alterações recentes na lei (Lei 14.442), trabalhadores em regime de teletrabalho (Home Office) que possuem controle de jornada (ponto digital, login/logout) têm direito a horas extras normalmente. Apenas quem trabalha por produção ou tarefa, sem controle de horário fixo estipulado em contrato, fica isento do recebimento de horas adicionais."
  }
];
function OvertimePage() {
  const [salary, setSalary] = useState("");
  const [hoursWorked, setHoursWorked] = useState("220");
  const [overtime50, setOvertime50] = useState("");
  const [overtime100, setOvertime100] = useState("");
  const [businessDays, setBusinessDays] = useState("25");
  const [restDays, setRestDays] = useState("5");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const hours = parseFloat(hoursWorked);
    const ot50 = parseFloat(overtime50.replace(",", ".") || "0");
    const ot100 = parseFloat(overtime100.replace(",", ".") || "0");
    const bDays = parseFloat(businessDays) || 25;
    const rDays = parseFloat(restDays) || 5;
    if (isNaN(sal) || isNaN(hours) || hours === 0 || bDays === 0) {
      setResult(null);
      return;
    }
    const hourlyRate = sal / hours;
    const val50 = hourlyRate * 1.5 * ot50;
    const val100 = hourlyRate * 2 * ot100;
    const totalOvertime = val50 + val100;
    const dsrValue = totalOvertime / bDays * rDays;
    const grossTotal = sal + totalOvertime + dsrValue;
    setResult({
      hourlyRate,
      val50,
      val100,
      totalOvertime,
      dsrValue,
      grossTotal
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, hoursWorked, overtime50, overtime100, businessDays, restDays]);
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
    "name": "Calculadora de Horas Extras 2025: Simulação e Cálculo Exato",
    "description": "Faça o cálculo de hora extra 50% e 100% com reflexo no DSR. Simule agora o valor real a receber na folha de pagamento com as regras da CLT.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "featureList": [
      "Cálculo de Hora Extra 50% e 100%",
      "Reflexo no Descanso Semanal Remunerado (DSR)",
      "Configuração de Jornada Mensal (220h, 200h, 180h)",
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
        title: "Calculadora de Horas Extras 2025: Simulação e Cálculo Exato",
        description: "Faça o cálculo de hora extra 50% e 100% com reflexo no DSR. Simule agora o valor real a receber na folha de pagamento com as regras da CLT.",
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
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed", children: [
            "A Hora Extra é todo período trabalhado além da jornada estipulada em contrato, conforme definido pelo ",
            /* @__PURE__ */ jsx("strong", { children: "Art. 59 da CLT" }),
            ". De acordo com a legislação vigente em 2025, esse tempo excedente garante ao trabalhador um pagamento adicional de, no mínimo, ",
            /* @__PURE__ */ jsx("strong", { children: "50% sobre o valor da hora normal" }),
            "."
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
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Jornada Mensal" }),
                /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: hoursWorked,
                    onChange: (e) => setHoursWorked(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "220", children: "220 horas (Padrão)" }),
                      /* @__PURE__ */ jsx("option", { value: "200", children: "200 horas" }),
                      /* @__PURE__ */ jsx("option", { value: "180", children: "180 horas (6h/dia)" }),
                      /* @__PURE__ */ jsx("option", { value: "150", children: "150 horas" })
                    ]
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Horas Extras 50%" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      inputMode: "decimal",
                      value: overtime50,
                      onChange: (e) => setOvertime50(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                      placeholder: "Qtd horas (ex: 10)"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500", children: "Dias Úteis" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Horas Extras 100%" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      inputMode: "decimal",
                      value: overtime100,
                      onChange: (e) => setOvertime100(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                      placeholder: "Qtd horas"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500", children: "Domingos/Feriados" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("label", { className: "text-sm text-gray-400 flex items-center gap-1", children: [
                  "Dias Úteis",
                  /* @__PURE__ */ jsx(HelpCircle, { className: "w-3 h-3 text-gray-500" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: businessDays,
                    onChange: (e) => setBusinessDays(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "25"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("label", { className: "text-sm text-gray-400 flex items-center gap-1", children: [
                  "Domingos e Feriados",
                  /* @__PURE__ */ jsx(HelpCircle, { className: "w-3 h-3 text-gray-500" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: restDays,
                    onChange: (e) => setRestDays(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "5"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Total a Receber (Bruto)" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.grossTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-gray-400", children: "Salário + Horas Extras + DSR" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Hora Normal" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-white", children: result ? `R$ ${result.hourlyRate.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "--" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Total Extras (50%)" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-white", children: result ? `R$ ${result.val50.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "--" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Total Extras (100%)" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-white", children: result ? `R$ ${result.val100.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "--" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-center", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Reflexo DSR" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-blue-400", children: [
                      "+ ",
                      result ? `R$ ${result.dsrValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "--"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pt-2 border-t border-white/5", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Total Só de Extras" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-green-400", children: result ? `R$ ${(result.totalOvertime + result.dsrValue).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "--" })
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
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 delay-400", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-blue-500" }),
              "Como usar a calculadora"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Salário Bruto:" }),
                  " Seu salário base registrado na carteira, sem descontos."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Jornada Mensal:" }),
                  " Geralmente 220h (padrão) ou 200h."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Horas Extras 50%:" }),
                  " Quantidade de horas feitas em dias úteis ou sábados."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Horas Extras 100%:" }),
                  " Quantidade de horas feitas em domingos ou feriados."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-green-500" }),
              "Reflexos: O aumento nos seus benefícios"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-4", children: "As horas extras habituais possuem natureza salarial e aumentam outros direitos:" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                /* @__PURE__ */ jsx("strong", { className: "text-white block text-sm mb-1", children: "DSR" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Descanso Semanal Remunerado sobre os dias de folga." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                /* @__PURE__ */ jsx("strong", { className: "text-white block text-sm mb-1", children: "FGTS + 13º + Férias" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "A média das horas entra no cálculo desses benefícios." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-4 italic", children: [
              "* Se você faz muitas horas extras, compare se ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/clt-vs-pj", className: "text-blue-400 hover:underline", children: "vale a pena virar PJ" }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-12 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-blue-500" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white leading-tight mt-1", children: "Como funciona o cálculo (Passo a Passo com DSR)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "O cálculo da hora extra é composto pelo valor da hora normal acrescido do adicional (50% ou 100%) e do reflexo no DSR. Veja o exemplo para um salário de ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 2.640,00" }),
              " (Jornada 220h):"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4 mt-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl space-y-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 uppercase tracking-wider font-semibold", children: "Passo 1: Hora Normal" }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsx("span", { children: "R$ 2.640 ÷ 220" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "R$ 12,00" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl space-y-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 uppercase tracking-wider font-semibold", children: "Passo 2: Hora Extra (50%)" }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsx("span", { children: "R$ 12,00 + 50%" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "R$ 18,00" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl space-y-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 uppercase tracking-wider font-semibold", children: "Passo 3: Total (10h)" }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsx("span", { children: "10 x R$ 18,00" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "R$ 180,00" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl space-y-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 uppercase tracking-wider font-semibold", children: "Passo 4: DSR (25 úteis / 5 dom)" }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsx("span", { children: "(180 ÷ 25) x 5" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "R$ 36,00" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-green-400 uppercase tracking-wider font-semibold", children: "Total Extra a Receber" }),
              /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-white mt-1", children: [
                "R$ 216,00 ",
                /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-gray-400", children: "(R$ 180 + R$ 36)" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-6", children: "Qual Divisor devo usar?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-6", children: "O divisor define o valor da sua hora base. Utilizar o número errado pode causar prejuízos:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-white/5 px-2 py-1 rounded text-white font-bold text-sm", children: "220" }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "44 horas semanais" }),
                  "Segunda a Sexta (8h) + Sábado (4h)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-white/5 px-2 py-1 rounded text-white font-bold text-sm", children: "200" }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "40 horas semanais" }),
                  "Segunda a Sexta (8h), sem sábado."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-white/5 px-2 py-1 rounded text-white font-bold text-sm", children: "180" }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "36 horas semanais" }),
                  "Turnos de 6 horas diárias."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-6", children: "Tabela: Percentuais CLT" }),
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-white", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Tipo de Dia" }),
                /* @__PURE__ */ jsx("th", { className: "p-3", children: "Adicional" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-white/5 text-gray-400", children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Dias Úteis / Sábados" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-blue-400 font-bold", children: "50%" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Domingos / Feriados" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-purple-400 font-bold", children: "100%" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "bg-white/5", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Hora Noturna (22h-5h)" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3 text-yellow-400 font-bold", children: "50% + 20%" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-4 leading-relaxed", children: "* Convenções Coletivas podem estipular porcentagens maiores (ex: 60%, 70% ou 100% aos sábados)." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: OVERTIME_FAQS,
          title: "Dúvidas Frequentes",
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
//# sourceMappingURL=OvertimePage-37mfGuno.js.map
