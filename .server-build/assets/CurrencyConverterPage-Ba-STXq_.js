import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { Globe, Calculator, RefreshCw, CreditCard, Info, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as RechartsPrimitive from "recharts";
import { AreaChart, CartesianGrid, XAxis, YAxis, Area } from "recharts";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { S as SEO, F as FAQ } from "../entry-server.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { AppPromoBanner } from "./AppPromoBanner-BHihqQwm.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "@supabase/supabase-js";
import "date-fns";
import "date-fns/locale";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-chart": chartId,
      ref,
      className: cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
});
ChartContainer.displayName = "ChartContainer";
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config2]) => config2.theme || config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            var _a;
            const color = ((_a = itemConfig.theme) == null ? void 0 : _a[theme]) || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltip = RechartsPrimitive.Tooltip;
const ChartTooltipContent = React.forwardRef(
  ({
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey
  }, ref) => {
    const { config } = useChart();
    const tooltipLabel = React.useMemo(() => {
      var _a;
      if (hideLabel || !(payload == null ? void 0 : payload.length)) {
        return null;
      }
      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value = !labelKey && typeof label === "string" ? ((_a = config[label]) == null ? void 0 : _a.label) || label : itemConfig == null ? void 0 : itemConfig.label;
      if (labelFormatter) {
        return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
      }
      return value ? /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value }) : null;
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey
    ]);
    if (!active || !(payload == null ? void 0 : payload.length)) {
      return null;
    }
    const nestLabel = payload.length === 1 && indicator !== "dot";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        ),
        children: [
          !nestLabel ? tooltipLabel : null,
          /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;
            return /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                ),
                children: formatter && (item == null ? void 0 : item.value) !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  (itemConfig == null ? void 0 : itemConfig.icon) ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                        {
                          "h-2.5 w-2.5": indicator === "dot",
                          "w-1": indicator === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                          "my-0.5": nestLabel && indicator === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": indicatorColor,
                        "--color-border": indicatorColor
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      ),
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                          nestLabel ? tooltipLabel : null,
                          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: (itemConfig == null ? void 0 : itemConfig.label) || item.name })
                        ] }),
                        item.value && /* @__PURE__ */ jsx("span", { className: "font-mono font-medium tabular-nums text-foreground", children: item.value.toLocaleString() })
                      ]
                    }
                  )
                ] })
              },
              item.dataKey
            );
          }) })
        ]
      }
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";
const ChartLegendContent = React.forwardRef(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart();
    if (!(payload == null ? void 0 : payload.length)) {
      return null;
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        ),
        children: payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              ),
              children: [
                (itemConfig == null ? void 0 : itemConfig.icon) && !hideIcon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "h-2 w-2 shrink-0 rounded-[2px]",
                    style: {
                      backgroundColor: item.color
                    }
                  }
                ),
                itemConfig == null ? void 0 : itemConfig.label
              ]
            },
            item.value
          );
        })
      }
    );
  }
);
ChartLegendContent.displayName = "ChartLegendContent";
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
const CURRENCY_FAQS = [
  {
    question: "Câmbio na Argentina: Real ou Peso?",
    answer: 'Para a Argentina, o câmbio oficial geralmente não compensa. O país possui cotações paralelas (como o "Dólar Blue" ou "Dólar MEP") que valorizam o Real em quase o dobro. Enviar dinheiro via remessas (Western Union) ou usar cartões de contas globais costuma ser muito mais vantajoso que levar Reais em espécie.'
  },
  {
    question: "Vale a pena comprar dólar agora ou esperar?",
    answer: 'Tentar acertar a "mínima" é arriscado. A melhor estratégia é o Preço Médio: compre pequenas quantias regularmente ao longo dos meses antes da viagem. Isso dilui o risco da volatilidade e protege seu poder de compra.'
  },
  {
    question: "Qual o limite de dinheiro em espécie para viagem internacional?",
    answer: "Pela nova Lei de Câmbio (14.286/2021), vigente em 2025, cada viajante pode portar até US$ 10.000,00 (ou equivalente em outra moeda) sem precisar declarar à Receita Federal. Acima desse valor, é obrigatório preencher a declaração eletrônica (e-DMOV)."
  },
  {
    question: "O IOF do cartão vai zerar?",
    answer: "Sim, mas gradualmente. O governo estabeleceu um cronograma de redução de 1% ao ano. Em 2025, a taxa é de 3,38%. Ela cairá para 2,38% em 2026, 1,38% em 2027 e será totalmente zerada (0%) apenas em 2028."
  }
];
const chartConfig = {
  usd: {
    label: "Dólar (USD)",
    color: "#10b981"
    // Emerald
  },
  eur: {
    label: "Euro (EUR)",
    color: "#3b82f6"
    // Blue
  },
  gbp: {
    label: "Libra (GBP)",
    color: "#8b5cf6"
    // Purple
  }
};
const EvolutionChart = () => {
  const [timeRange, setTimeRange] = useState("30D");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let days = 30;
        if (timeRange === "7D") days = 7;
        if (timeRange === "30D") days = 30;
        if (timeRange === "1Y") days = 360;
        const [usdRes, eurRes, gbpRes] = await Promise.all([
          fetch(`/api/currency?pair=USD-BRL&days=${days}`),
          fetch(`/api/currency?pair=EUR-BRL&days=${days}`),
          fetch(`/api/currency?pair=GBP-BRL&days=${days}`)
        ]);
        const [usdData, eurData, gbpData] = await Promise.all([
          usdRes.json(),
          eurRes.json(),
          gbpRes.json()
        ]);
        if (!Array.isArray(usdData) || !Array.isArray(eurData) || !Array.isArray(gbpData)) {
          throw new Error("Invalid API response");
        }
        const reversedUsd = usdData.reverse();
        const reversedEur = eurData.reverse();
        const reversedGbp = gbpData.reverse();
        const processedData = reversedUsd.map((item, index) => {
          const date = new Date(Number(item.timestamp) * 1e3);
          const dateStr = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
          const eurItem = reversedEur[index] || reversedEur[reversedEur.length - 1];
          const gbpItem = reversedGbp[index] || reversedGbp[reversedGbp.length - 1];
          return {
            day: dateStr,
            originalDate: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
            usd: parseFloat(item.bid),
            eur: parseFloat((eurItem == null ? void 0 : eurItem.bid) || "0"),
            gbp: parseFloat((gbpItem == null ? void 0 : gbpItem.bid) || "0")
          };
        });
        setData(processedData);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);
  const allValues = data.flatMap((d) => [d.usd, d.eur, d.gbp]);
  const min = allValues.length > 0 ? Math.min(...allValues) : 0;
  const max = allValues.length > 0 ? Math.max(...allValues) : 0;
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl min-w-[200px]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs mb-3 border-b border-white/10 pb-2", children: payload[0].payload.originalDate }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: payload.map((entry) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-2 h-2 rounded-full",
                style: { backgroundColor: entry.color }
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: entry.name === "usd" ? "Dólar" : entry.name === "eur" ? "Euro" : "Libra" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "font-mono font-medium text-white", children: [
            "R$ ",
            entry.value.toFixed(4)
          ] })
        ] }, entry.name)) })
      ] });
    }
    return null;
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full flex flex-col min-h-[600px]", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-white flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-emerald-500" }),
      "Evolução das Moedas"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full min-h-[200px] min-w-0 relative", children: [
      isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[#1a1a1a]/50 z-10 backdrop-blur-sm rounded-xl", children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-6 h-6 text-emerald-500 animate-spin" }) }),
      /* @__PURE__ */ jsx(ChartContainer, { config: chartConfig, className: "h-full w-full aspect-auto min-w-0", children: /* @__PURE__ */ jsxs(
        AreaChart,
        {
          accessibilityLayer: true,
          data,
          margin: {
            left: -20,
            right: 12,
            top: 12,
            bottom: 12
          },
          children: [
            /* @__PURE__ */ jsx(CartesianGrid, { vertical: false, stroke: "rgba(255,255,255,0.1)", strokeDasharray: "4 4" }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "day",
                tickLine: false,
                axisLine: false,
                tickMargin: 8,
                interval: timeRange === "7D" ? 0 : timeRange === "30D" ? 4 : 60
              }
            ),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                domain: [min - (max - min) * 0.1, max + (max - min) * 0.1],
                tickLine: false,
                axisLine: false,
                tickMargin: 8,
                tickFormatter: (value) => `R$ ${value.toFixed(2)}`,
                width: 60
              }
            ),
            /* @__PURE__ */ jsx(
              ChartTooltip,
              {
                cursor: { stroke: "rgba(255,255,255,0.1)", strokeWidth: 1, strokeDasharray: "4 4" },
                content: /* @__PURE__ */ jsx(CustomTooltip, {})
              }
            ),
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsxs("linearGradient", { id: "fillUsd", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "var(--color-usd)", stopOpacity: 0.3 }),
                /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "var(--color-usd)", stopOpacity: 0 })
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "fillEur", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "var(--color-eur)", stopOpacity: 0.3 }),
                /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "var(--color-eur)", stopOpacity: 0 })
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "fillGbp", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "var(--color-gbp)", stopOpacity: 0.3 }),
                /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "var(--color-gbp)", stopOpacity: 0 })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              Area,
              {
                dataKey: "gbp",
                type: "monotone",
                fill: "url(#fillGbp)",
                fillOpacity: 1,
                stroke: "var(--color-gbp)",
                strokeWidth: 2,
                animationDuration: 1e3
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                dataKey: "eur",
                type: "monotone",
                fill: "url(#fillEur)",
                fillOpacity: 1,
                stroke: "var(--color-eur)",
                strokeWidth: 2,
                animationDuration: 1e3
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                dataKey: "usd",
                type: "monotone",
                fill: "url(#fillUsd)",
                fillOpacity: 1,
                stroke: "var(--color-usd)",
                strokeWidth: 2,
                animationDuration: 1e3
              }
            )
          ]
        }
      ) })
    ] })
  ] });
};
function CurrencyConverterPage() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const displayRates = {
    "USD": 5.88,
    "EUR": 6.2,
    "GBP": 7.45,
    "BRL": 1
  };
  const calculate = () => {
    const val = parseFloat(amount.replace(/\./g, "").replace(",", "."));
    if (isNaN(val) || val === 0) {
      setResult(null);
      return;
    }
    const fromRate = displayRates[fromCurrency];
    const toRate = displayRates[toCurrency];
    const valueInBRL = val * fromRate;
    const finalValue = valueInBRL / toRate;
    setResult(finalValue);
    setRate(fromRate / toRate);
  };
  useEffect(() => {
    calculate();
  }, [amount, fromCurrency, toCurrency]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Conversor de Moedas: Dólar, Euro e Libra Hoje (Tabela IOF 2025)",
    "url": "https://www.junny.com.br/calculadoras/conversor-moedas",
    "description": "Converta Dólar, Euro e Libra em tempo real. Veja o cronograma IOF 2025 (3,38%), entenda o Spread bancário, o VET e compare o poder de compra.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
    "featureList": [
      "Cotação em Tempo Real",
      "Cálculo de IOF 2025",
      "Comparativo Dólar Comercial vs Turismo",
      "Tabela de Poder de Compra"
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
        title: "Conversor de Moedas: Dólar, Euro e Libra Hoje (Tabela IOF 2025)",
        description: "Converta Dólar, Euro e Libra em tempo real. Veja o cronograma IOF 2025 (3,38%), entenda o Spread bancário, o VET e compare o poder de compra.",
        canonical: "/calculadoras/conversor-moedas"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CURRENCY_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Conversor de Moedas", href: "/calculadoras/conversor-moedas" }
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
                /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Conversor de Moedas: ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500", children: "Dólar, Euro e Libra Hoje" }),
                " (Cotação 2025)"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto text-lg text-gray-400 space-y-4 hidden" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full min-h-[600px]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
                "Converter Agora"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor" }),
                  /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: amount,
                      onChange: (e) => handleCurrencyInput(e.target.value, setAmount),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                      placeholder: "0,00"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_auto_1fr] gap-4 items-end", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "fromCurrency", className: "text-sm text-gray-400", children: "De" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "fromCurrency",
                        value: fromCurrency,
                        onChange: (e) => setFromCurrency(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "BRL", children: "Real (BRL)" }),
                          /* @__PURE__ */ jsx("option", { value: "USD", children: "Dólar (USD)" }),
                          /* @__PURE__ */ jsx("option", { value: "EUR", children: "Euro (EUR)" }),
                          /* @__PURE__ */ jsx("option", { value: "GBP", children: "Libra (GBP)" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: swapCurrencies,
                      "aria-label": "Inverter moedas",
                      className: "p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-[1px]",
                      children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 text-emerald-500" })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "toCurrency", className: "text-sm text-gray-400", children: "Para" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "toCurrency",
                        value: toCurrency,
                        onChange: (e) => setToCurrency(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "BRL", children: "Real (BRL)" }),
                          /* @__PURE__ */ jsx("option", { value: "USD", children: "Dólar (USD)" }),
                          /* @__PURE__ */ jsx("option", { value: "EUR", children: "Euro (EUR)" }),
                          /* @__PURE__ */ jsx("option", { value: "GBP", children: "Libra (GBP)" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Valor Convertido" }),
                  /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `${toCurrency === "BRL" ? "R$" : toCurrency === "USD" ? "$" : toCurrency === "EUR" ? "€" : "£"} ${result.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                  rate && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-2", children: [
                    "1 ",
                    fromCurrency,
                    " = ",
                    rate.toFixed(4),
                    " ",
                    toCurrency
                  ] })
                ] }) })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 h-full",
            children: /* @__PURE__ */ jsx(EvolutionChart, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 text-center mb-12", children: /* @__PURE__ */ jsxs("p", { children: [
        "Converta Dólar, Euro e Libra com a cotação oficial de agora (05/12/2025). Descubra exatamente quanto sua compra vai custar no final, já incluindo o IOF atualizado de 2025 e as taxas bancárias. ",
        /* @__PURE__ */ jsx("strong", { children: "Pare de adivinhar e calcule o valor real:" })
      ] }) }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-12",
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6 text-emerald-500" }),
              "Cronograma de Redução do IOF (Cartão de Crédito)"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "Em 2025, o IOF para compras internacionais no cartão de crédito caiu para ",
                /* @__PURE__ */ jsx("strong", { children: "3,38%" }),
                ". O governo federal zerará essa taxa gradualmente até 2028 para atender aos requisitos da OCDE. Veja o impacto real em uma fatura de R$ 1.000,00:"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                  /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Ano" }),
                  /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-center", children: "Taxa IOF" }),
                  /* @__PURE__ */ jsx("th", { className: "p-3 text-white text-center", children: "Custo por R$ 1.000" }),
                  /* @__PURE__ */ jsx("th", { className: "p-3 text-white", children: "Status" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                  /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-3", children: "2024" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "4,38%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 43,80" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3", children: "Anterior" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 bg-emerald-500/5", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: "2025" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-emerald-400", children: "3,38%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-emerald-400", children: "R$ 33,80" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: "Vigente Agora" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-3", children: "2026" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "2,38%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 23,80" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3", children: "Futuro" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-3", children: "2027" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "1,38%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 text-center", children: "R$ 13,80" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3", children: "Futuro" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: "2028" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-emerald-400", children: "0,00%" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 text-center font-bold text-emerald-400", children: "R$ 0,00" }),
                    /* @__PURE__ */ jsx("td", { className: "p-3 font-bold text-white", children: "Isento" })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                "Para saber o impacto real desses juros e taxas no valor final da sua compra, use a ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-efetivo-total", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de Custo Efetivo Total" }),
                "."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-12",
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Globe, { className: "w-6 h-6 text-emerald-500" }),
              "Poder de Compra: Quanto vale US$ 100 e € 100 hoje?"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
              "O número na tela engana. US$ 100 parece pouco, mas nos EUA o poder de compra é superior ao do Brasil para bens de consumo. Compare o custo de vida real usando nossa ferramenta de ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/poder-de-compra", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Poder de Compra" }),
              " para saber se o produto vale a pena."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: "🇺🇸 Dólar (Estimativa)" }),
                /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Valor (USD)" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Custo Final (+IOF)" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "O que isso compra lá fora?" })
                  ] }) }),
                  /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "$ 5,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 29,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Um Café Expresso (Starbucks)" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "$ 15,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 87,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Combo Fast Food (Médio)" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "$ 50,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 290,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Fone Bluetooth de entrada" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "$ 80,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 465,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Jantar para dois (sem vinho)" })
                    ] })
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: "🇪🇺 Euro (Estimativa)" }),
                /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Valor (EUR)" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Custo Final (+IOF)" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "O que isso compra lá fora?" })
                  ] }) }),
                  /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "€ 2,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 13,50" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Ticket de Metrô (Paris/Madri)" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "€ 15,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 101,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Menu do dia (Almoço executivo)" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "€ 60,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 405,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Jantar completo para casal" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "€ 100,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "R$ 675,00" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Peças de roupa (Fast Fashion)" })
                    ] })
                  ] })
                ] }) })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-12",
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Info, { className: "w-6 h-6 text-emerald-500" }),
              "Dicionário de Taxas: VET, Spread e PTAX"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Entenda as siglas que definem quanto dinheiro sai do seu bolso:" }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "O que é Spread Bancário?" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: 'É a diferença entre o câmbio oficial (interbancário) e o valor que o banco cobra de você para lucrar na transação. Enquanto o câmbio oficial pode estar em R$ 5,40, o banco pode lhe vender a R$ 5,70. Essa "gordura" é o lucro da instituição e pode variar de 1% (contas globais) a 6% (bancos tradicionais).' })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "O que é VET?" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                  "É a soma de tudo: ",
                  /* @__PURE__ */ jsx("strong", { children: "Cotação + Spread + Tarifas + IOF" }),
                  ". As casas de câmbio podem anunciar uma taxa baixa para atrair clientes, mas compensar nas tarifas ocultas. O VET é a única métrica real para comparar se uma oferta é vantajosa."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "O que é a Taxa PTAX?" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                  "É a média oficial do Banco Central, calculada diariamente. É a referência usada para fechar a fatura do seu cartão de crédito. Geralmente, os bancos cobram ",
                  /* @__PURE__ */ jsx("strong", { children: "PTAX + Spread" }),
                  ". Descubra quanto o banco está lucrando em cima de você usando a ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/porcentagem", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de Porcentagem" }),
                  "."
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8",
            children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6 text-emerald-500" }),
                "Comercial vs. Turismo: Qual a diferença?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "A escolha errada pode encarecer sua viagem em ",
                  /* @__PURE__ */ jsx("strong", { children: "até 8%" }),
                  ". Entenda a diferença para não ser taxado à toa:"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Tipo" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Onde é usado?" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Custo Estimado" })
                  ] }) }),
                  /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "Comercial" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Transações digitais, Contas Globais e Importação." }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-emerald-400", children: "✅ Mais Barato" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "Turismo" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Dinheiro em espécie (papel-moeda)." }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-red-400", children: "🔴 +6% a 8%" })
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs italic mt-2", children: [
                  "*Nota para Empreendedores: Se você importa produtos pagando em Dólar Comercial para revenda no Brasil, utilize a calculadora de ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/markup", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Markup" }),
                  " para precificar seus itens corretamente."
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.2 },
            className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8",
            children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-emerald-500" }),
                "Simulação: Qual a melhor forma de levar dinheiro?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Comparativo de custos para uma despesa de ",
                  /* @__PURE__ */ jsx("strong", { children: "US$ 1.000,00" }),
                  " em Dezembro de 2025."
                ] }),
                /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Modalidade" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white", children: "Câmbio Base" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white text-center", children: "IOF (2025)" }),
                    /* @__PURE__ */ jsx("th", { className: "p-2 text-white text-center", children: "Veredito" })
                  ] }) }),
                  /* @__PURE__ */ jsxs("tbody", { className: "text-gray-400", children: [
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 bg-emerald-500/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2 font-bold text-white", children: "Conta Global" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Comercial (+1% a 2%)" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 text-center", children: "1,10%" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 text-center font-bold text-emerald-400", children: "✅ Melhor Opção" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5", children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Papel Moeda" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Turismo (Alto Custo)" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 text-center", children: "1,10%" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 text-center text-yellow-400", children: "🟡 Emergências" })
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "Cartão de Crédito" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2", children: "PTAX (+4% a 6%)" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 text-center", children: "3,38%" }),
                      /* @__PURE__ */ jsx("td", { className: "p-2 text-center text-red-400", children: "🔴 Mais Caro" })
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  "Está planejando as férias? Use nossa ",
                  /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-viagem", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Calculadora de Custo de Viagem" }),
                  " para somar passagens, hospedagem e alimentação."
                ] })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-24",
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(TrendingUp, { className: "w-6 h-6 text-emerald-500" }),
              "O que faz o Dólar subir ou descer?"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-6", children: [
              "A cotação flutua baseada em três pilares principais. Entendê-los ajuda a melhorar seu ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/roi", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "ROI" }),
              " em operações internacionais e saber a hora certa de aportar em ",
              /* @__PURE__ */ jsx(Link, { to: "/calculadoras/investimentos", className: "text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30", children: "Investimentos" }),
              " no exterior:"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center text-sm", children: "1" }),
                  "Taxa Selic"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Juros altos no Brasil atraem investidores estrangeiros, trazendo dólares e baixando a cotação." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center text-sm", children: "2" }),
                  "Risco Fiscal"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Quando o governo gasta mais do que arrecada, a confiança cai e o dólar sobe." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center text-sm", children: "3" }),
                  "Juros nos EUA (Fed)"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Se os juros sobem lá, o dinheiro sai de emergentes (como o Brasil) e volta para os EUA, valorizando a moeda americana." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-yellow-200/80", children: [
                /* @__PURE__ */ jsx("strong", { children: "Dica de Ouro:" }),
                " O dólar disparou antes do fechamento da fatura? Use nossa ",
                /* @__PURE__ */ jsx(Link, { to: "/calculadoras/quitacao-antecipada", className: "text-yellow-400 hover:text-yellow-300 underline decoration-yellow-400/30", children: "Calculadora de Quitação Antecipada" }),
                " para ver se vale a pena adiantar o pagamento e travar o câmbio do dia."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: CURRENCY_FAQS,
          title: "Dúvidas Frequentes (FAQ)",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  CurrencyConverterPage
};
//# sourceMappingURL=CurrencyConverterPage-Ba-STXq_.js.map
