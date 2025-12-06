import React, { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip } from "../ui/chart";
import { RefreshCw, TrendingUp } from 'lucide-react';

const chartConfig = {
    usd: {
        label: "Dólar (USD)",
        color: "#10b981", // Emerald
    },
    eur: {
        label: "Euro (EUR)",
        color: "#3b82f6", // Blue
    },
    gbp: {
        label: "Libra (GBP)",
        color: "#8b5cf6", // Purple
    },
} satisfies ChartConfig;

// Types for API response
interface AwesomeAPIResponse {
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
}

const CurrencyChart = () => {
    const [timeRange, setTimeRange] = useState<'7D' | '30D' | '1Y'>('30D');
    const [data, setData] = useState<{ day: string; usd: number; eur: number; gbp: number; originalDate: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let days = 30;
                if (timeRange === '7D') days = 7;
                if (timeRange === '30D') days = 30;
                if (timeRange === '1Y') days = 360;

                // Sequential fetches to avoid hitting potential rate limits on backend/upstream
                const usdRes = await fetch(`/api/currency?pair=USD-BRL&days=${days}`);
                const eurRes = await fetch(`/api/currency?pair=EUR-BRL&days=${days}`);
                const gbpRes = await fetch(`/api/currency?pair=GBP-BRL&days=${days}`);

                const [usdData, eurData, gbpData]: [AwesomeAPIResponse[], AwesomeAPIResponse[], AwesomeAPIResponse[]] = await Promise.all([
                    usdRes.json(),
                    eurRes.json(),
                    gbpRes.json()
                ]);

                if (!Array.isArray(usdData) || !Array.isArray(eurData) || !Array.isArray(gbpData)) {
                    throw new Error("Invalid API response");
                }

                // Process and merge data
                const reversedUsd = usdData.reverse();
                const reversedEur = eurData.reverse();
                const reversedGbp = gbpData.reverse();

                const processedData = reversedUsd.map((item, index) => {
                    const date = new Date(Number(item.timestamp) * 1000);
                    const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

                    // Simple index matching for now as they are daily endpoints requested at same time
                    const eurItem = reversedEur[index] || reversedEur[reversedEur.length - 1];
                    const gbpItem = reversedGbp[index] || reversedGbp[reversedGbp.length - 1];

                    return {
                        day: dateStr,
                        originalDate: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
                        usd: parseFloat(item.bid),
                        eur: parseFloat(eurItem?.bid || '0'),
                        gbp: parseFloat(gbpItem?.bid || '0')
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

    // Calculate global min/max for Y-axis scaling
    const allValues = data.flatMap(d => [d.usd, d.eur, d.gbp]);
    const min = allValues.length > 0 ? Math.min(...allValues) : 0;
    const max = allValues.length > 0 ? Math.max(...allValues) : 0;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl min-w-[200px]">
                    <p className="text-gray-400 text-xs mb-3 border-b border-white/10 pb-2">
                        {payload[0].payload.originalDate}
                    </p>
                    <div className="space-y-2">
                        {payload.map((entry: any) => (
                            <div key={entry.name} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: entry.color }}
                                    />
                                    <span className="text-sm text-gray-300">
                                        {entry.name === 'usd' ? 'Dólar' : entry.name === 'eur' ? 'Euro' : 'Libra'}
                                    </span>
                                </div>
                                <span className="font-mono font-medium text-white">
                                    R$ {entry.value.toFixed(4)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full flex flex-col min-h-[600px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    Evolução das Moedas
                </h3>
            </div>

            <div className="w-full h-[400px] min-w-0 relative [&_.recharts-wrapper]:outline-none [&_.recharts-wrapper_*]:outline-none [&_*:focus]:outline-none [&_*:focus-visible]:outline-none">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]/50 z-10 backdrop-blur-sm rounded-xl">
                        <RefreshCw className="w-6 h-6 text-emerald-500 animate-spin" />
                    </div>
                )}

                <ChartContainer config={chartConfig} className="h-full w-full aspect-auto min-w-0 outline-none">
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: -20,
                            right: 12,
                            top: 12,
                            bottom: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            interval={timeRange === '7D' ? 0 : timeRange === '30D' ? 4 : 60}
                        />
                        <YAxis
                            domain={[min - (max - min) * 0.1, max + (max - min) * 0.1]}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
                            width={60}
                        />
                        <ChartTooltip
                            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                            content={<CustomTooltip />}
                        />
                        <defs>
                            <linearGradient id="fillUsd" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-usd)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--color-usd)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="fillEur" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-eur)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--color-eur)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="fillGbp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-gbp)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--color-gbp)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="gbp"
                            type="monotone"
                            fill="url(#fillGbp)"
                            fillOpacity={1}
                            stroke="var(--color-gbp)"
                            strokeWidth={2}
                            animationDuration={1000}
                        />
                        <Area
                            dataKey="eur"
                            type="monotone"
                            fill="url(#fillEur)"
                            fillOpacity={1}
                            stroke="var(--color-eur)"
                            strokeWidth={2}
                            animationDuration={1000}
                        />
                        <Area
                            dataKey="usd"
                            type="monotone"
                            fill="url(#fillUsd)"
                            fillOpacity={1}
                            stroke="var(--color-usd)"
                            strokeWidth={2}
                            animationDuration={1000}
                        />
                    </AreaChart>
                </ChartContainer>
            </div>
        </div>
    );
};

// Missing imports that are used in the component?
// TrendingUp is used. I imported it in the write_to_file tool but I should check if it's imported in the code content.
// Yes, I see `import { RefreshCw } from 'lucide-react';` in my code content above, but I missed `TrendingUp`.
// I will rewrite this file in the next step to fix the missing import if I can't edit it.
// Wait, I can just include it in the `import` statement in `CodeContent`.

export default CurrencyChart;
