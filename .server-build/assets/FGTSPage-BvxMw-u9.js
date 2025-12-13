import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { PiggyBank, Calculator, Building, TrendingUp, Wallet, AlertTriangle, ArrowRight, XCircle, CheckCircle } from "lucide-react";
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
const FGTS_FAQS = [
  {
    question: "Ainda consigo sacar pela MP 1.290 em Dezembro/2025?",
    answer: "Não. O prazo para adesão e saque extraordinário previsto na MP 1.290 encerrou-se em <strong>27 de junho de 2025</strong>. Atualmente, valem as regras normais de Saque-Aniversário (apenas uma vez ao ano) ou Saque-Rescisão (apenas se optante dessa modalidade)."
  },
  {
    question: "O aviso prévio indenizado conta para o FGTS?",
    answer: "Sim. A <a href='https://www.tst.jus.br/sumulas' target='_blank' rel='noopener noreferrer' class='text-blue-400 hover:underline'>Súmula 305 do TST</a> garante que o aviso prévio, mesmo que indenizado (não trabalhado), integra o tempo de serviço para todos os efeitos legais, exigindo o depósito de 8% sobre este valor e sua inclusão na base da multa de 40%."
  },
  {
    question: "Posso antecipar o saque-aniversário assim que contratar?",
    answer: "Não mais. Para novos optantes a partir de novembro de 2025, a Resolução 1.130 impõe uma carência de <strong>90 dias</strong> entre a adesão à modalidade e a primeira operação de crédito (empréstimo), visando proteger a sustentabilidade do fundo."
  },
  {
    question: "Como saber se a empresa está depositando meu FGTS?",
    answer: "Com a implementação do <strong>FGTS Digital</strong>, a consulta ficou mais fácil. Acesse o aplicativo oficial do FGTS ou o portal Gov.br. A identificação agora é feita exclusivamente pelo CPF, eliminando a necessidade do número PIS. Se houver falhas, denuncie através da Carteira de Trabalho Digital."
  },
  {
    question: "Qual o valor máximo que posso receber de FGTS?",
    answer: 'Não existe um "teto" para o saldo ou recebimento do FGTS, pois ele é proporcional ao salário e tempo de serviço. No entanto, o depósito mensal é limitado pelo Teto do INSS (<strong>R$ 8.157,41</strong> em 2025). Assim, o depósito máximo mensal por vínculo é aprox. R$ 652,59 (8% do teto).'
  },
  {
    question: "A distribuição de lucros cai na conta de quem já sacou?",
    answer: "A distribuição de lucros é proporcional ao saldo existente na conta em <strong>31 de dezembro do ano anterior</strong>. Se você sacou tudo antes dessa data, não receberá a distribuição referente àquele ano. Se havia saldo na data-base, o crédito é feito proporcionalmente, mesmo que a conta esteja inativa hoje."
  }
];
function FGTSPage() {
  const [salary, setSalary] = useState("");
  const [balance, setBalance] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const bal = parseFloat(balance.replace(/\./g, "").replace(",", ".") || "0");
    const m = parseInt(months || "0");
    if (isNaN(sal)) {
      setResult(null);
      return;
    }
    const effectiveBase = Math.min(sal, 8157.41);
    const monthlyDeposit = effectiveBase * 0.08;
    const projectedDeposits = monthlyDeposit * m;
    const totalBase = bal + projectedDeposits;
    const fine40 = totalBase * 0.4;
    const totalWithFine = totalBase + fine40;
    setResult({
      monthlyDeposit,
      totalEstimated: totalBase,
      fine40,
      totalWithFine
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, balance, months]);
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
    "name": "Calculadora de FGTS 2025",
    "description": "Simule seu FGTS com o novo mínimo (R$ 1.518). Calcule a multa de 40% exata, consulte o teto de R$ 8.157 e entenda o fim do prazo da MP 1.290.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
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
        title: "Calculadora FGTS 2025: Saldo, Multa 40% e Prazo MP 1.290",
        description: "Simule seu FGTS com o novo mínimo (R$ 1.518). Calcule a multa de 40% exata, consulte o teto de R$ 8.157 e entenda o fim do prazo da MP 1.290.",
        canonical: "/calculadoras/fgts"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FGTS_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "FGTS", href: "/calculadoras/fgts" }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(PiggyBank, { className: "w-4 h-4 text-blue-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Atualizado para 2025" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
            "Calculadora de FGTS 2025: ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500", children: "Simule Saldo, Multa de 40% e Histórico da MP 1.290" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 min-h-[600px]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
            "Simular Depósitos e Multa"
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
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Base para depósito mensal (8%)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Saldo Atual / Total Depositado" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      inputMode: "decimal",
                      value: balance,
                      onChange: (e) => handleCurrencyInput(e.target.value, setBalance),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                      placeholder: "0,00"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Histórico total para cálculo da multa." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Meses a Projetar" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    inputMode: "numeric",
                    value: months,
                    onChange: (e) => setMonths(e.target.value),
                    className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                    placeholder: "Ex: 12"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Projeção futura de depósitos." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5 space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500/10 to-teal-500/10 p-6 rounded-2xl border border-blue-500/20 text-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Multa de 40% Estimada" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.fine40.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "R$ 0,00" }),
                result && /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-gray-400", children: [
                  "Sobre base total de R$ ",
                  result.totalEstimated.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Depósito Mensal (8%)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.monthlyDeposit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total (Saldo + Multa)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalWithFine.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Building, { className: "w-5 h-5 text-blue-500" }),
            "Resumo dos Dados Oficiais (Dezembro/2025)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Salário Mínimo" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 1.518,00" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Base para cálculo de piso." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Teto do INSS" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-white", children: "R$ 8.157,41" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Limite para base de depósito." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Alíquota Padrão:" }),
                  " 8% sobre remuneração bruta."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(Wallet, { className: "w-5 h-5 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Rentabilidade:" }),
                  " 3% a.a. + TR + Distribuição de Lucros."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-yellow-500 shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "MP 1.290/2025:" }),
                  " Janela de saque extraordinário ENCERRADA em 27/06/2025."
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto mb-16 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-300 leading-relaxed", children: "Em dezembro de 2025, o cenário do FGTS exige atenção redobrada do trabalhador. Enquanto o salário mínimo e o teto do INSS foram reajustados, impactando os depósitos mensais, a janela de oportunidade para saques extraordinários da MP 1.290 se fechou. Esta calculadora atualizada permite simular rescisões com precisão, considerando as novas bases salariais e a distribuição de lucros." }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 p-3 rounded-xl shrink-0", children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white leading-tight mt-1", children: "Resumo em 30 Segundos" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-300 space-y-4", children: /* @__PURE__ */ jsxs("p", { children: [
          "O valor do Salário Mínimo subiu para ",
          /* @__PURE__ */ jsx("strong", { children: "R$ 1.518,00" }),
          ", elevando o depósito mensal mínimo. Atenção: O prazo para saque do saldo retido via MP 1.290 ",
          /* @__PURE__ */ jsx("strong", { children: "encerrou em 27/06/2025" }),
          ". Quem não sacou, deve aguardar nova legislação. O foco agora é garantir que a multa de 40% seja calculada sobre o histórico total (incluindo expurgos), e não apenas sobre o saldo atual."
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Tabela Oficial: Status da MP 1.290 (Histórico)" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "A Medida Provisória 1.290 permitiu temporariamente o saque de valores retidos no Saque-Aniversário. Confira o status atual:" }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-white/10 mb-6", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Faixa de Valor" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Janela de Pagamento" }),
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Status Atual (Dez/2025)" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400 divide-y divide-white/5", children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Valores até R$ 3.000,00" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Março a Junho/2025" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "Encerrado" }) })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Valores acima de R$ 3.000,00" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "Abril a Junho/2025" }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "Encerrado" }) })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("strong", { children: "Multa de 40%" }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: "D+10 da Rescisão" }),
              /* @__PURE__ */ jsxs("td", { className: "p-3", children: [
                /* @__PURE__ */ jsx("strong", { children: "Ativo" }),
                " (Regra Padrão)"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-sm text-gray-400 flex gap-3", children: [
          /* @__PURE__ */ jsx(Building, { className: "w-5 h-5 text-blue-500 shrink-0" }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Fonte Oficial:" }),
            " Dados baseados no histórico da ",
            /* @__PURE__ */ jsx("a", { href: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Mpv/mpv1290.htm", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Medida Provisória nº 1.290/2025" }),
            " e cronogramas operacionais da ",
            /* @__PURE__ */ jsx("a", { href: "https://www.caixa.gov.br/beneficios-trabalhador/fgts/saque-mp-1290-25/Paginas/default.aspx", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "CAIXA" }),
            "."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "Como Funciona o Cálculo do FGTS em 2025" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
            "O Fundo de Garantia do Tempo de Serviço (FGTS) em 2025 opera sob uma lógica de acumulação composta. Não se trata apenas de depositar 8% do salário. Para chegar ao valor real, é necessário considerar a remuneração global e os índices de ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/correcao-monetaria", className: "text-blue-400 hover:underline", children: "correção monetária" }),
            " que agora superam a poupança."
          ] }),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-white mt-6 mb-3", children: "Base de Cálculo Composta" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
            "O depósito mensal incide sobre a ",
            /* @__PURE__ */ jsx("strong", { children: "remuneração bruta" }),
            ", respeitando o teto de contribuição previdenciária de ",
            /* @__PURE__ */ jsx("strong", { children: "R$ 8.157,41" }),
            " (para fins de encargos correlatos) e incidindo integralmente sobre verbas salariais. Devem ser somados:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-400 space-y-1 mb-4", children: [
            /* @__PURE__ */ jsx("li", { children: "Horas extras e adicionais (noturno, insalubridade, periculosidade)." }),
            /* @__PURE__ */ jsx("li", { children: "Comissões e gratificações habituais." }),
            /* @__PURE__ */ jsx("li", { children: "13º Salário." }),
            /* @__PURE__ */ jsx("li", { children: "Aviso prévio indenizado (conforme Súmula 305 do TST)." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 text-sm text-blue-200", children: [
            "Se você precisa validar o valor líquido final da sua folha de pagamento, recomendamos cruzar os dados com nossa ",
            /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "underline hover:text-white", children: "calculadora de salário líquido" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "Rentabilidade e Distribuição de Lucros" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
              "Um diferencial crítico em 2025 é a rentabilidade. O fundo rende Taxa Referencial (TR) + 3% ao ano. Além disso, existe a ",
              /* @__PURE__ */ jsx("strong", { children: "Distribuição de Resultados" }),
              "."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-green-500/10 p-4 rounded-xl border border-green-500/20 mb-4", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-green-200", children: [
              "Em 2024, o Conselho Curador aprovou a distribuição de ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 12,9 bilhões" }),
              ' (referentes ao lucro de 2023), aplicando um índice de 0,02042919 sobre o saldo. Isso significa que o dinheiro "parado" no fundo está rendendo acima da inflação em muitos cenários.'
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "O Fim do Prazo da MP 1.290 e Travas" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
              "É crucial alinhar expectativas: a janela de saque extraordinário para demitidos no Saque-Aniversário, aberta pela MP 1.290, ",
              /* @__PURE__ */ jsx("strong", { children: "já se fechou" }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("li", { className: "text-gray-400 text-sm", children: [
                /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "1. Prazo Encerrado (MP 1.290):" }),
                " A MP permitiu saques apenas até 27/06/2025."
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "text-gray-400 text-sm", children: [
                /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "2. Travas (Res. 1.130):" }),
                " Novos optantes (a partir de nov/2025) têm carência de 90 dias para empréstimos. ",
                /* @__PURE__ */ jsx("a", { href: "https://www.in.gov.br/web/dou/-/resolucao-ccfgts-n-1130-de-07-de-outubro-2025", target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline", children: "Ver resolução" }),
                "."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-8 h-8 text-yellow-500 shrink-0" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-yellow-200 mb-2", children: "Erros Comuns ao Calcular a Multa de 40%" }),
            /* @__PURE__ */ jsxs("p", { className: "text-yellow-100/80", children: [
              "O erro mais frequente, responsável por prejuízos milionários, é calcular a multa sobre o ",
              /* @__PURE__ */ jsx("strong", { children: "Saldo Atual" }),
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-black/20 p-6 rounded-xl border border-yellow-500/10", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-yellow-200 font-bold mb-4", children: "A Regra Correta" }),
          /* @__PURE__ */ jsxs("p", { className: "text-yellow-100/90 mb-4", children: [
            "A multa de 40% incide sobre o ",
            /* @__PURE__ */ jsx("strong", { children: "total de depósitos realizados" }),
            " durante a vigência do contrato, devidamente corrigidos."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-500/10 rounded-lg border border-red-500/20", children: [
              /* @__PURE__ */ jsxs("strong", { className: "text-red-300 block mb-2", children: [
                /* @__PURE__ */ jsx(XCircle, { className: "inline w-4 h-4 mr-1" }),
                " O Jeito Errado (Cenário)"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Você tinha R$ 50.000,00. Sacou R$ 20.000,00 no aniversário. Saldo atual: R$ 30.000,00." }),
              /* @__PURE__ */ jsxs("p", { className: "text-red-300 mt-2 font-bold", children: [
                "40% de R$ 30.000 = R$ 12.000,00 ",
                /* @__PURE__ */ jsx("span", { className: "text-xs", children: "(PREJUÍZO)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-green-500/10 rounded-lg border border-green-500/20", children: [
              /* @__PURE__ */ jsxs("strong", { className: "text-green-300 block mb-2", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "inline w-4 h-4 mr-1" }),
                " O Jeito Certo"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Considera-se o histórico total depositado, ignorando saques parciais." }),
              /* @__PURE__ */ jsxs("p", { className: "text-green-300 mt-2 font-bold", children: [
                "40% de R$ 50.000 = R$ 20.000,00 ",
                /* @__PURE__ */ jsx("span", { className: "text-xs", children: "(CORRETO)" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-yellow-100/70 mt-4 text-sm", children: [
          "Se o cálculo da sua multa estiver incorreto, isso afetará diretamente o valor total da sua verba rescisória. Utilize nossa ferramenta de ",
          /* @__PURE__ */ jsx(Link, { to: "/calculadoras/rescisao", className: "underline hover:text-white", children: "rescisão de contrato" }),
          " para uma auditoria completa."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-blue-500" }),
          "Como Calcular (Passo a Passo)"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Método Rápido (Estimativa Mensal)" }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 mb-6 font-mono text-sm text-blue-300", children: "Salário Bruto x 0,08 = Depósito Mensal" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Cenário 1: Salário Médio e Tempo de Casa" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-3", children: "Trab. 3 anos, média R$ 4.000,00, demissão Dez/2025." }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "1. ",
                /* @__PURE__ */ jsx("strong", { children: "Total de Depósitos:" }),
                " R$ 320/mês."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "2. ",
                /* @__PURE__ */ jsx("strong", { children: "Acumulado (36 meses):" }),
                " ~ R$ 11.520,00 nominal."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "3. ",
                /* @__PURE__ */ jsx("strong", { children: "Correção com Juros/TR:" }),
                " Supondo ~ R$ 12.800,00."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "4. ",
                /* @__PURE__ */ jsx("strong", { children: "Multa de 40%:" }),
                " R$ 12.800 x 0,40 = ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 5.120,00" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "5. ",
                /* @__PURE__ */ jsx("strong", { children: "Total (Saque-Rescisão):" }),
                " ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 17.920,00" }),
                "."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Cenário 2: Novo Salário Mínimo 2025" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-3", children: "Trab. com Piso (R$ 1.518,00) por 1 ano." }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "1. ",
                /* @__PURE__ */ jsx("strong", { children: "Depósito Mensal:" }),
                " R$ 1.518 x 8% = ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 121,44" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "2. ",
                /* @__PURE__ */ jsx("strong", { children: "Acumulado (12 meses):" }),
                " ~ R$ 1.457,28."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "3. ",
                /* @__PURE__ */ jsx("strong", { children: "Correção estimada:" }),
                " ~ R$ 1.485,00."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "4. ",
                /* @__PURE__ */ jsx("strong", { children: "Multa de 40%:" }),
                " R$ 1.485 x 0,40 = ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 594,00" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "5. ",
                /* @__PURE__ */ jsx("strong", { children: "Total a Sacar:" }),
                " R$ 1.485 + R$ 594 = ",
                /* @__PURE__ */ jsx("strong", { children: "R$ 2.079,00" }),
                "."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Casos Especiais" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "Pedido de Demissão" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mb-3", children: [
              "Você ",
              /* @__PURE__ */ jsx("strong", { children: "não tem direito" }),
              " ao saque do saldo nem à multa de 40%. O valor permanece rendendo. Saques liberados apenas para aposentadoria ou casa própria. Verifique suas ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/ferias", className: "text-blue-400 hover:underline", children: "férias proporcionais" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "Acordo (Culpa Recíproca)" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mb-3", children: [
              "Multa cai para ",
              /* @__PURE__ */ jsx("strong", { children: "20%" }),
              ". Trabalhador movimenta apenas ",
              /* @__PURE__ */ jsx("strong", { children: "80% do saldo" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "Aposentados Ativos" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-3", children: "Podem sacar mensalmente se quiserem. Se demitidos sem justa causa, recebem a multa de 40% sobre os depósitos do contrato vigente normalmente." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-5 rounded-xl border border-white/5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: "Uso para Casa Própria" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mb-3", children: [
              "O valor sai da conta mas ",
              /* @__PURE__ */ jsx("strong", { children: "continua na base de cálculo da multa de 40%" }),
              ". Simule antes em nossa calculadora de ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/financiamento-imobiliario", className: "text-blue-400 hover:underline", children: "financiamento imobiliário" }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: FGTS_FAQS,
          title: "Perguntas Frequentes sobre FGTS",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  FGTSPage
};
//# sourceMappingURL=FGTSPage-BvxMw-u9.js.map
