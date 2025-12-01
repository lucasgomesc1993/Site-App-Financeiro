import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calculator, DollarSign, User, AlertCircle } from "lucide-react";
import { AppPromoBanner } from "./AppPromoBanner-CdIlkx8T.js";
import { S as SEO, F as FAQ } from "../entry-server.js";
import { B as Breadcrumb } from "./Breadcrumb-DwwVT1FI.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "@google/genai";
const INSS_FAQS = [
  {
    question: "Como funciona o desconto de INSS em 2025?",
    answer: "O cálculo do INSS em 2025 segue uma tabela progressiva. Isso significa que a alíquota (7,5%, 9%, 12% ou 14%) incide apenas sobre a parcela do salário que se enquadra em cada faixa, e não sobre o valor total. O resultado final é a soma dos descontos de cada faixa."
  },
  {
    question: "Como saber se o desconto do meu holerite está correto?",
    answer: "Verifique o salário bruto no seu holerite e insira o valor na nossa calculadora. O resultado deve ser muito próximo ao descontado. Pequenas diferenças podem ocorrer devido a arredondamentos ou outras verbas salariais."
  },
  {
    question: "A calculadora também mostra o desconto de IRRF?",
    answer: "Esta calculadora foca no INSS. Para o cálculo completo incluindo Imposto de Renda, recomendamos utilizar nossa calculadora de Salário Líquido (em breve), que considera ambos os descontos."
  },
  {
    question: "Contribuinte individual pode usar a calculadora?",
    answer: "Sim! Basta selecionar a opção 'Autônomo / Individual' ou 'Pro-labore'. Para autônomos, a alíquota padrão é de 20% sobre o salário de contribuição (limitado ao teto), e para Pro-labore (plano simplificado) é de 11%."
  },
  {
    question: "A ferramenta calcula contribuição de pro labore?",
    answer: "Sim, selecione a opção 'Pro-labore / Simplificado'. A alíquota aplicada será de 11% sobre o valor informado, respeitando o teto do INSS."
  },
  {
    question: "Tem como calcular o INSS do 13º salário?",
    answer: "Sim, o cálculo para o 13º salário segue a mesma tabela progressiva do salário mensal. Basta inserir o valor bruto do seu 13º para saber o desconto."
  },
  {
    question: "A calculadora serve para MEI?",
    answer: "O MEI paga o INSS através da guia DAS, que tem um valor fixo (5% do salário mínimo). Esta calculadora é voltada para quem contribui com base no salário real ou teto, como CLT e Autônomos."
  },
  {
    question: "O valor do INSS muda se tenho dois empregos?",
    answer: "Sim. As remunerações devem ser somadas para o cálculo do teto. Se a soma ultrapassar o teto do INSS (R$ 7.786,02 em 2025), você só contribui até esse limite. É importante comunicar as empresas para evitar desconto indevido."
  }
];
const INSSPage = () => {
  const [salary, setSalary] = useState(0);
  const [contributorType, setContributorType] = useState("clt");
  const [result, setResult] = useState(null);
  const calculateINSS = () => {
    if (!salary) return;
    let discount = 0;
    let effectiveRate = 0;
    const ceiling = 7786.02;
    const salaryBase = Math.min(salary, ceiling);
    if (contributorType === "clt") {
      if (salaryBase <= 1412) {
        discount = salaryBase * 0.075;
      } else if (salaryBase <= 2666.68) {
        discount = 1412 * 0.075 + (salaryBase - 1412) * 0.09;
      } else if (salaryBase <= 4000.03) {
        discount = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salaryBase - 2666.68) * 0.12;
      } else {
        discount = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salaryBase - 4000.03) * 0.14;
      }
    } else if (contributorType === "autonomo") {
      discount = salaryBase * 0.2;
    } else if (contributorType === "prolabore") {
      discount = salaryBase * 0.11;
    } else if (contributorType === "facultativo-baixa") {
      discount = salaryBase * 0.05;
    }
    effectiveRate = discount / salary * 100;
    setResult({
      discount,
      effectiveRate,
      salaryBase
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const formatPercent = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 2 }).format(val / 100);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de INSS 2025 FinZap",
    "description": "Simule o desconto do INSS com base no salário e tipo de contribuinte. Resultado rápido e atualizado com as faixas de contribuição de 2025.",
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
        title: "Calculadora de INSS 2025 - Tabela Atualizada",
        description: "Simule o desconto do INSS com base no salário e tipo de contribuinte. Resultado rápido e atualizado com as faixas de contribuição de 2025.",
        canonical: "/calculadoras/inss"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": INSS_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora de INSS", href: "/calculadoras/inss" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Previdência Social" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "INSS 2025" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Informe seu salário bruto e tipo de contribuição para calcular o valor descontado para o INSS, com base nas regras atualizadas de 2025." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Dados da Contribuição"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "salary",
                        type: "number",
                        placeholder: "Ex: 3000",
                        value: salary || "",
                        onChange: (e) => setSalary(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "contributorType", className: "block text-sm text-gray-400 mb-2", children: "Tipo de Contribuinte" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "contributorType",
                        value: contributorType,
                        onChange: (e) => setContributorType(e.target.value),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "clt", children: "Trabalhador CLT (Tabela Progressiva)" }),
                          /* @__PURE__ */ jsx("option", { value: "autonomo", children: "Autônomo / Individual (20%)" }),
                          /* @__PURE__ */ jsx("option", { value: "prolabore", children: "Pro-labore / Simplificado (11%)" }),
                          /* @__PURE__ */ jsx("option", { value: "facultativo-baixa", children: "Facultativo Baixa Renda (5%)" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateINSS,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular INSS"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSalary(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Valor do Desconto INSS" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.discount) }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                        "Alíquota Efetiva: ",
                        /* @__PURE__ */ jsx("span", { className: "text-primary font-bold", children: formatPercent(result.effectiveRate) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Salário Base de Cálculo" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.salaryBase) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Salário Líquido (Estimado)" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(salary - result.discount) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "bg-yellow-500/10 border-l-4 border-yellow-500 p-4 mt-4", children: /* @__PURE__ */ jsxs("p", { className: "text-yellow-200 text-sm m-0", children: [
                      /* @__PURE__ */ jsx("strong", { children: "Nota:" }),
                      " O salário líquido estimado considera apenas o desconto do INSS. Outros descontos como IRRF, vale-transporte e benefícios não foram deduzidos."
                    ] }) })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha o salário e tipo de contribuinte para ver o resultado" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.8, delay: 0.4 },
          className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg",
          children: [
            /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Calculadora de INSS 2025: Simule seu Desconto" }),
              /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Se você quer saber quanto será descontado do seu salário para o INSS em 2025, ou precisa simular a contribuição mensal como CLT, autônomo ou contribuinte individual, esta página foi feita para você." }),
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Com a nossa calculadora de INSS gratuita e online, você descobre em segundos o valor exato da contribuição, com base no salário bruto e no tipo de contribuinte escolhido. Os cálculos seguem rigorosamente as novas faixas e alíquotas da Previdência Social em 2025, garantindo resultados confiáveis." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como Funciona o Cálculo do INSS em 2025" }),
              /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "O cálculo do INSS em 2025 segue a lógica da tabela progressiva por faixas salariais. Ou seja, o desconto não é uma porcentagem única sobre todo o salário, mas sim uma aplicação de alíquotas diferentes para cada faixa de valor — semelhante ao Imposto de Renda." }),
                /* @__PURE__ */ jsx("p", { className: "mb-6", children: "A tabela é atualizada todos os anos pelo Governo Federal com base no salário mínimo e na inflação, e está vigente desde janeiro de 2025." }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 mb-8", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-primary" }),
                    "Tabela de Alíquotas do INSS 2025"
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm text-gray-300", children: [
                    /* @__PURE__ */ jsx("thead", { className: "text-xs text-gray-200 uppercase bg-white/5", children: /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("th", { className: "px-4 py-3 rounded-l-lg", children: "Faixa Salarial (R$)" }),
                      /* @__PURE__ */ jsx("th", { className: "px-4 py-3 rounded-r-lg", children: "Alíquota Aplicada" })
                    ] }) }),
                    /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-white/5", children: [
                      /* @__PURE__ */ jsxs("tr", { children: [
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: "Até R$ 1.412,00" }),
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-primary font-bold", children: "7,5%" })
                      ] }),
                      /* @__PURE__ */ jsxs("tr", { children: [
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: "De R$ 1.412,01 até R$ 2.666,68" }),
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-primary font-bold", children: "9%" })
                      ] }),
                      /* @__PURE__ */ jsxs("tr", { children: [
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: "De R$ 2.666,69 até R$ 4.000,03" }),
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-primary font-bold", children: "12%" })
                      ] }),
                      /* @__PURE__ */ jsxs("tr", { children: [
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: "De R$ 4.000,04 até R$ 7.786,02" }),
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-primary font-bold", children: "14%" })
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-4", children: "*O valor máximo de contribuição (teto) é limitado ao salário de contribuição de R$ 7.786,02." })
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Exemplo Prático de Cálculo" }),
                /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
                  "Para um salário bruto de ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 4.500,00" }),
                  ", o cálculo é fatiado:"
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-2 mb-6 text-gray-400", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "1ª Faixa:" }),
                    " 7,5% sobre R$ 1.412,00"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "2ª Faixa:" }),
                    " 9% sobre a diferença entre R$ 2.666,68 e R$ 1.412,00"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "3ª Faixa:" }),
                    " 12% sobre a diferença entre R$ 4.000,03 e R$ 2.666,68"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "4ª Faixa:" }),
                    " 14% sobre o restante (R$ 4.500,00 - R$ 4.000,03)"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { children: "A soma dessas parcelas resulta no desconto final. Esse método garante que quem ganha menos pague proporcionalmente menos." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Quem Precisa Contribuir?" }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "Trabalhadores CLT" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "A contribuição é automática, descontada diretamente da folha de pagamento. A empresa recolhe e repassa ao INSS. Nossa calculadora ajuda a conferir se o valor no holerite está correto." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-blue-400", children: "Autônomos e Individuais" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Se você trabalha por conta própria, precisa gerar e pagar a guia GPS (ou DAS para MEI). A calculadora para autônomo aplica a alíquota de 20% (plano normal) ou 11% (plano simplificado)." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-purple-400", children: "Pro-labore" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Sócios de empresas que recebem pro-labore contribuem obrigatoriamente com 11% sobre o valor declarado, respeitando o teto da previdência." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-emerald-400", children: "Facultativo" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Estudantes, donas de casa e desempregados podem contribuir para manter a qualidade de segurado, escolhendo entre 5%, 11% ou 20%." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              FAQ,
              {
                items: INSS_FAQS,
                title: "Dúvidas Frequentes sobre INSS",
                className: "py-12",
                showSocialProof: false
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
};
export {
  INSSPage
};
