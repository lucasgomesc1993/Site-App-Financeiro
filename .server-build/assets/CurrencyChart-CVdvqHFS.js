import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import * as RechartsPrimitive from "recharts";
import { AreaChart, CartesianGrid, XAxis, YAxis, Area } from "recharts";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RefreshCw } from "lucide-react";
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
const CurrencyChart = () => {
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
        const usdRes = await fetch(`/api/currency?pair=USD-BRL&days=${days}`);
        const eurRes = await fetch(`/api/currency?pair=EUR-BRL&days=${days}`);
        const gbpRes = await fetch(`/api/currency?pair=GBP-BRL&days=${days}`);
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
export {
  CurrencyChart as default
};
//# sourceMappingURL=CurrencyChart-CVdvqHFS.js.map
