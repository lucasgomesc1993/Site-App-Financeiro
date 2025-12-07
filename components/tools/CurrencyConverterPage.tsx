import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { Globe, Calculator, RefreshCw, Info, TrendingUp, DollarSign, CreditCard, AlertCircle, ChevronDown, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';

import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const CURRENCY_FAQS: FAQItem[] = [
    {
        question: "Câmbio na Argentina: Real ou Peso?",
        answer: "Para a Argentina, o câmbio oficial geralmente não compensa. O país possui cotações paralelas (como o \"Dólar Blue\" ou \"Dólar MEP\") que valorizam o Real em quase o dobro. Enviar dinheiro via remessas (Western Union) ou usar cartões de contas globais costuma ser muito mais vantajoso que levar Reais em espécie."
    },
    {
        question: "Vale a pena comprar dólar agora ou esperar?",
        answer: "Tentar acertar a \"mínima\" é arriscado. A melhor estratégia é o Preço Médio: compre pequenas quantias regularmente ao longo dos meses antes da viagem. Isso dilui o risco da volatilidade e protege seu poder de compra."
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

// Hook simples para detectar visibilidade sem instalar novas libs
function useOnScreen(ref: React.RefObject<HTMLElement>) {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // Se aparecer na tela, marca como visível e desconecta o observador
            if (entry.isIntersecting) {
                setIntersecting(true);
                observer.disconnect();
            }
        }, { rootMargin: "200px" }); // Carrega 200px antes de chegar no elemento

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return isIntersecting;
}

const CurrencyChart = lazy(() => import('./CurrencyChart'));

type IOFType = 'money' | 'card';

export function CurrencyConverterPage() {
    const [amount, setAmount] = useState('1,00');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('BRL');
    const [iofType, setIofType] = useState<IOFType>('money'); // money = 1.1%, card = 4.38% (2024) or 3.38% (2025)

    // API Rates State
    const [rates, setRates] = useState<Record<string, number>>({
        'BRL': 1,
        'USD': 5.88, // Fallback
        'EUR': 6.20, // Fallback
        'GBP': 7.45  // Fallback
    });
    const [loadingRates, setLoadingRates] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<string>('');

    const [result, setResult] = useState<number | null>(null);
    const [effectiveRate, setEffectiveRate] = useState<number | null>(null);

    // Fetch Rates
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL');
                const data = await response.json();

                // Parse API (Format: USDBRL: { bid, ask... })
                // We use 'ask' (Venda) usually for cost estimation, or 'bid' depends on context. For "Buying currency", ask is safer.
                const newRates = {
                    'BRL': 1,
                    'USD': parseFloat(data.USDBRL.ask),
                    'EUR': parseFloat(data.EURBRL.ask),
                    'GBP': parseFloat(data.GBPBRL.ask)
                };

                setRates(newRates);
                setLastUpdate(new Date().toLocaleTimeString());
                setLoadingRates(false);
            } catch (error) {
                console.error("Failed to fetch rates", error);
                setLoadingRates(false); // Keep fallbacks
            }
        };

        fetchRates();
    }, []);


    const calculate = () => {
        const val = parseFloat(amount.replace(/\./g, '').replace(',', '.'));

        if (isNaN(val) || val === 0) {
            setResult(null);
            return;
        }

        // Logic: Convert FROM -> Base(BRL) -> TO
        // But since we only have X->BRL rates, we assume conversion typically involves BRL.
        // If From != BRL and To != BRL, it's Cross rate.

        // Let's standardize to BRL value first.
        let valInBRL = 0;

        if (fromCurrency === 'BRL') {
            valInBRL = val;
        } else {
            valInBRL = val * rates[fromCurrency];
        }

        // Apply IOF only if converting BRL -> Foreign Currency (Buying)
        // Or Foreign -> BRL? Usually calculators show "Cost to buy".
        // Let's assume user wants to know "How much BRL does it cost to buy X USD" if From=USD To=BRL (inverse logic typical of users)
        // OR "I have 100 USD, how much is it in BRL".

        // STANDARD CONVERTER LOGIC:
        // FROM * RATE = TO.
        // IOF is a TAX added on top of the cost.

        // Scenario 1: User puts "1 USD" to "BRL". Result: 5.88.
        // IF IOF is applied, it means "To buy 1 USD you pay 5.88 + Tax".
        // This visualizer is "Converter". 
        // Let's keep strict conversion `Val * Rate` but show "Effective Cost (VET)" separately or include it if requested.

        // Better UX: "You are converting..."

        const rateFrom = rates[fromCurrency];
        const rateTo = rates[toCurrency];

        // Pure conversion without IOF
        const conversionRate = (fromCurrency === 'BRL' ? 1 : rateFrom) / (toCurrency === 'BRL' ? 1 : rateTo);
        const rawResult = val * conversionRate;

        // Apply IOF Logic for VET display
        // IOF applies when BRL leaves to Foreign. 
        // 1.1% for cash/account, 3.38% (2025) for card.
        const iofRate = iofType === 'card' ? 0.0338 : 0.011;

        // If To is Foreign and From is BRL: Cost increases.
        // If From is Foreign and To is BRL: Usually no IOF deduction displayed on general converters, but technically receipt is less.

        // Let's simplfy: Display Pure Conversion as the main big number.
        // Display "Custo Efetivo (VET)" if BRL is involved.

        setResult(rawResult);
        setEffectiveRate(conversionRate);
    };

    useEffect(() => {
        calculate();
    }, [amount, fromCurrency, toCurrency, rates, iofType]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    // Calculate VET for display
    const getVetTotal = () => {
        // Assuming we are buying the target currency with BRL
        if (fromCurrency !== 'BRL' && toCurrency === 'BRL') {
            // Selling Foreign for BRL.
            const val = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
            return val * rates[fromCurrency];
        }

        // Buying Foreign (USD) with BRL
        // Or Converting BRL to USD.

        // If From=BRL, Amount=1000. To=USD.
        // Net USD = 1000 / Rate.
        // BUT user usually wants: "How much BRL to get 1000 USD".

        // Let's show the breakdown for the CURRENT result transaction.
        // If result is in BRL (meaning we sold USD), show BRL.
        // If result is in USD (meaning we sold BRL), show Cost.

        return 0;
    };

    // Helper to estimate tax impact on result
    const getTaxImpact = () => {
        if (!result) return 0;
        const iof = iofType === 'card' ? 0.0338 : 0.011;
        // If converting TO a foreign currency, add IOF.
        if (toCurrency !== 'BRL') {
            return result * iof; // Tax in Foreign Currency? No, tax is in BRL.
        }
        return 0;
    };

    // Total cost in BRL to get the Target Amount (Reverse Calculation for UX)
    // Common use case: "I want to buy 1000 USD". Input 1000 USD -> BRL.
    const isBuyingForeign = fromCurrency !== 'BRL' && toCurrency === 'BRL'; // e.g. 1 USD = X BRL

    const iofPercentage = iofType === 'card' ? 3.38 : 1.1;
    const iofMultiplier = 1 + (iofPercentage / 100);

    const finalVetValue = isBuyingForeign && result
        ? result * iofMultiplier
        : result;


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

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Conversor de Moedas: Dólar, Euro e Libra Hoje (Tabela IOF 2025)"
                description="Converta Dólar, Euro e Libra em tempo real. Veja o cronograma IOF 2025 (3,38%), entenda o Spread bancário, o VET e compare o poder de compra."
                canonical="/calculadoras/conversor-moedas"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CURRENCY_FAQS.map(faq => ({
                        "@type": "Question",
                        "name": faq.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer
                        }
                    }))
                })}
            </script>

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Conversor de Moedas', href: '/calculadoras/conversor-moedas' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Globe className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Conversor de Moedas: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Dólar, Euro e Libra Hoje</span>
                        </h1>
                        <p className="text-gray-400 mt-2 flex items-center justify-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${loadingRates ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
                            {loadingRates ? 'Atualizando cotações...' : `Cotações atualizadas em tempo real (${lastUpdate})`}
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-emerald-500" />
                                    Converter Agora
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={amount}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setAmount)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">
                                    <div className="space-y-2">
                                        <label htmlFor="fromCurrency" className="text-sm text-gray-400">De</label>
                                        <div className="relative">
                                            <select
                                                id="fromCurrency"
                                                value={fromCurrency}
                                                onChange={(e) => setFromCurrency(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="BRL">Real (BRL)</option>
                                                <option value="USD">Dólar (USD)</option>
                                                <option value="EUR">Euro (EUR)</option>
                                                <option value="GBP">Libra (GBP)</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <button
                                        onClick={swapCurrencies}
                                        aria-label="Inverter moedas"
                                        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-[1px]"
                                    >
                                        <RefreshCw className="w-5 h-5 text-emerald-500" />
                                    </button>

                                    <div className="space-y-2">
                                        <label htmlFor="toCurrency" className="text-sm text-gray-400">Para</label>
                                        <div className="relative">
                                            <select
                                                id="toCurrency"
                                                value={toCurrency}
                                                onChange={(e) => setToCurrency(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="BRL">Real (BRL)</option>
                                                <option value="USD">Dólar (USD)</option>
                                                <option value="EUR">Euro (EUR)</option>
                                                <option value="GBP">Libra (GBP)</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* IOF Selector - Compact */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                                    <span className="text-xs text-gray-500 font-medium hidden sm:block">IOF (Imposto):</span>
                                    <div className="flex w-full sm:w-auto bg-white/5 p-1 rounded-lg">
                                        <button
                                            onClick={() => setIofType('money')}
                                            className={`flex-1 sm:flex-none justify-center px-4 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${iofType === 'money'
                                                ? 'bg-emerald-500/20 text-emerald-400 shadow-sm'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <Wallet className="w-3 h-3" />
                                            Dinheiro (1,1%)
                                        </button>
                                        <button
                                            onClick={() => setIofType('card')}
                                            className={`flex-1 sm:flex-none justify-center px-4 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${iofType === 'card'
                                                ? 'bg-emerald-500/20 text-emerald-400 shadow-sm'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <CreditCard className="w-3 h-3" />
                                            Cartão (3,38%)
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">
                                            Valor com IOF Estimado
                                        </span>
                                        <span className="text-4xl font-bold text-white">
                                            {finalVetValue
                                                ? `${toCurrency === 'BRL' ? 'R$' : ''} ${finalVetValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                                                : (result ? `${toCurrency === 'BRL' ? 'R$' : toCurrency === 'USD' ? '$' : toCurrency === 'EUR' ? '€' : '£'} ${result.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---')
                                            }
                                            {toCurrency !== 'BRL' && result ? <span className="text-lg ml-2 align-top text-gray-400">{toCurrency}</span> : null}
                                        </span>
                                        <div className="mt-3 text-xs text-gray-400 space-y-1">
                                            {isBuyingForeign && (
                                                <>
                                                    <p>Cotação Comercial: R$ {rates[fromCurrency].toLocaleString('pt-BR', { minimumFractionDigits: 4 })}</p>
                                                    <p>+ IOF ({iofType === 'card' ? '3,38%' : '1,10%'}): R$ {((finalVetValue || 0) - (result || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                                </>
                                            )}
                                            {!isBuyingForeign && rates[fromCurrency] > 1 && (
                                                <p>1 {fromCurrency} = {rates[fromCurrency].toLocaleString('pt-BR', { minimumFractionDigits: 2 })} BRL</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart - OTIMIZADO PARA MOBILE */}
                    <div className="lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <ChartLazyWrapper />
                    </div>
                </div>

                <div className="mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 text-center mb-12">
                    <p>
                        Converta Dólar, Euro e Libra com a cotação oficial de agora. Descubra exatamente quanto sua compra vai custar no final, já incluindo o IOF atualizado de 2025 e as taxas bancárias. <strong>Pare de adivinhar e calcule o valor real:</strong>
                    </p>
                </div>

                {/* Cronograma IOF */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                            <CreditCard className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Cronograma de Redução do IOF (Cartão de Crédito)
                        </h2>
                    </div>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            Em 2025, o IOF para compras internacionais no cartão de crédito caiu para <strong>3,38%</strong>. O governo federal zerará essa taxa gradualmente até 2028 para atender aos requisitos da OCDE. Veja o impacto real em uma fatura de R$ 1.000,00:
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="p-3 text-white">Ano</th>
                                        <th className="p-3 text-white text-center">Taxa IOF</th>
                                        <th className="p-3 text-white text-center">Custo por R$ 1.000</th>
                                        <th className="p-3 text-white">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-400">
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">2024</td>
                                        <td className="p-3 text-center">4,38%</td>
                                        <td className="p-3 text-center">R$ 43,80</td>
                                        <td className="p-3">Anterior</td>
                                    </tr>
                                    <tr className="border-b border-white/5 bg-emerald-500/5">
                                        <td className="p-3 font-bold text-white">2025</td>
                                        <td className="p-3 text-center font-bold text-emerald-400">3,38%</td>
                                        <td className="p-3 text-center font-bold text-emerald-400">R$ 33,80</td>
                                        <td className="p-3 font-bold text-white">Vigente Agora</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">2026</td>
                                        <td className="p-3 text-center">2,38%</td>
                                        <td className="p-3 text-center">R$ 23,80</td>
                                        <td className="p-3">Futuro</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3">2027</td>
                                        <td className="p-3 text-center">1,38%</td>
                                        <td className="p-3 text-center">R$ 13,80</td>
                                        <td className="p-3">Futuro</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-bold text-white">2028</td>
                                        <td className="p-3 text-center font-bold text-emerald-400">0,00%</td>
                                        <td className="p-3 text-center font-bold text-emerald-400">R$ 0,00</td>
                                        <td className="p-3 font-bold text-white">Isento</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm">
                            Para saber o impacto real desses juros e taxas no valor final da sua compra, use a <Link to="/calculadoras/custo-efetivo-total" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Calculadora de Custo Efetivo Total</Link>.
                        </p>
                    </div>
                </div>

                {/* Poder de Compra */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                            <Globe className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Poder de Compra: Quanto vale US$ 100 e € 100 hoje?
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        O número na tela engana. US$ 100 parece pouco, mas nos EUA o poder de compra é superior ao do Brasil para bens de consumo. Compare o custo de vida real usando nossa ferramenta de <Link to="/calculadoras/poder-de-compra" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Poder de Compra</Link> para saber se o produto vale a pena.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                🇺🇸 Dólar (Estimativa)
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-2 text-white">Valor (USD)</th>
                                            <th className="p-2 text-white">Custo Final (+IOF)</th>
                                            <th className="p-2 text-white">O que isso compra lá fora?</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400">
                                        <tr className="border-b border-white/5">
                                            <td className="p-2 font-bold text-white">$ 5,00</td>
                                            <td className="p-2">R$ 29,00</td>
                                            <td className="p-2">Um Café Expresso (Starbucks)</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-2 font-bold text-white">$ 15,00</td>
                                            <td className="p-2">R$ 87,00</td>
                                            <td className="p-2">Combo Fast Food (Médio)</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-2 font-bold text-white">$ 50,00</td>
                                            <td className="p-2">R$ 290,00</td>
                                            <td className="p-2">Fone Bluetooth de entrada</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 font-bold text-white">$ 80,00</td>
                                            <td className="p-2">R$ 465,00</td>
                                            <td className="p-2">Jantar para dois (sem vinho)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                🇪🇺 Euro (Estimativa)
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-2 text-white">Valor (EUR)</th>
                                            <th className="p-2 text-white">Custo Final (+IOF)</th>
                                            <th className="p-2 text-white">O que isso compra lá fora?</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400">
                                        <tr className="border-b border-white/5">
                                            <td className="p-2 font-bold text-white">€ 2,00</td>
                                            <td className="p-2">R$ 13,50</td>
                                            <td className="p-2">Ticket de Metrô (Paris/Madri)</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-2 font-bold text-white">€ 15,00</td>
                                            <td className="p-2">R$ 101,00</td>
                                            <td className="p-2">Menu do dia (Almoço executivo)</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-2 font-bold text-white">€ 60,00</td>
                                            <td className="p-2">R$ 405,00</td>
                                            <td className="p-2">Jantar completo para casal</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 font-bold text-white">€ 100,00</td>
                                            <td className="p-2">R$ 675,00</td>
                                            <td className="p-2">Peças de roupa (Fast Fashion)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dicionário de Taxas */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                            <Info className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Dicionário de Taxas: VET, Spread e PTAX
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Entenda as siglas que definem quanto dinheiro sai do seu bolso:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3">O que é Spread Bancário?</h3>
                            <p className="text-sm text-gray-400">
                                É a diferença entre o câmbio oficial (interbancário) e o valor que o banco cobra de você para lucrar na transação. Enquanto o câmbio oficial pode estar em R$ 5,40, o banco pode lhe vender a R$ 5,70. Essa "gordura" é o lucro da instituição e pode variar de 1% (contas globais) a 6% (bancos tradicionais).
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3">O que é VET?</h3>
                            <p className="text-sm text-gray-400">
                                É a soma de tudo: <strong>Cotação + Spread + Tarifas + IOF</strong>. As casas de câmbio podem anunciar uma taxa baixa para atrair clientes, mas compensar nas tarifas ocultas. O VET é a única métrica real para comparar se uma oferta é vantajosa.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3">O que é a Taxa PTAX?</h3>
                            <p className="text-sm text-gray-400">
                                É a média oficial do Banco Central, calculada diariamente. É a referência usada para fechar a fatura do seu cartão de crédito. Geralmente, os bancos cobram <strong>PTAX + Spread</strong>. Descubra quanto o banco está lucrando em cima de você usando a <Link to="/calculadoras/porcentagem" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Calculadora de Porcentagem</Link>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Comercial vs Turismo & Simulação */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 min-w-0">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                <DollarSign className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Comercial vs. Turismo: Qual a diferença?
                            </h2>
                        </div>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p className="text-sm md:text-base">
                                A escolha errada pode encarecer sua viagem em <strong>até 8%</strong>. Entenda a diferença para não ser taxado à toa:
                            </p>
                            <div className="overflow-x-auto w-full max-w-full pb-2">
                                <table className="w-full text-left border-collapse text-sm min-w-[320px]">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-3 text-white whitespace-nowrap">Tipo</th>
                                            <th className="p-3 text-white">Onde é usado?</th>
                                            <th className="p-3 text-white whitespace-nowrap">Custo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400">
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 font-bold text-white">Comercial</td>
                                            <td className="p-3 text-xs md:text-sm">Transações digitais e Global Accounts.</td>
                                            <td className="p-3 font-bold text-emerald-400 text-xs md:text-sm whitespace-nowrap">✅ Mais Barato</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold text-white">Turismo</td>
                                            <td className="p-3 text-xs md:text-sm">Dinheiro em espécie (papel).</td>
                                            <td className="p-3 font-bold text-red-400 text-xs md:text-sm whitespace-nowrap">🔴 +6% a 8%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs italic mt-2 text-gray-400">
                                *Nota: Se importa produtos, use a calculadora de <Link to="/calculadoras/markup" className="text-emerald-500 hover:text-emerald-300 underline decoration-emerald-400/30">Markup</Link>.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 min-w-0">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                                <Calculator className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Simulação: Qual a melhor forma?
                            </h2>
                        </div>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p className="text-sm md:text-base">
                                Comparativo para <strong>US$ 1.000,00</strong> em Dezembro de 2025.
                            </p>
                            <div className="overflow-x-auto w-full max-w-full pb-2">
                                <table className="w-full text-left border-collapse text-sm min-w-[340px]">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-2 text-white whitespace-nowrap">Modalidade</th>
                                            <th className="p-2 text-white text-center whitespace-nowrap">IOF</th>
                                            <th className="p-2 text-white text-center whitespace-nowrap">Veredito</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400">
                                        <tr className="border-b border-white/5 bg-emerald-500/5">
                                            <td className="p-2 font-bold text-white text-xs md:text-sm">Conta Global</td>
                                            <td className="p-2 text-center text-xs md:text-sm">1,10%</td>
                                            <td className="p-2 text-center font-bold text-emerald-400 text-xs md:text-sm whitespace-nowrap">✅ Melhor</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-2 text-xs md:text-sm">Papel Moeda</td>
                                            <td className="p-2 text-center text-xs md:text-sm">1,10%</td>
                                            <td className="p-2 text-center text-yellow-400 text-xs md:text-sm whitespace-nowrap">🟡 Emergência</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 text-xs md:text-sm">Cartão de Crédito</td>
                                            <td className="p-2 text-center text-xs md:text-sm">3,38%</td>
                                            <td className="p-2 text-center text-red-400 text-xs md:text-sm whitespace-nowrap">🔴 Caro</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm">
                                Planejando férias? Use a <Link to="/calculadoras/custo-viagem" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Calculadora de Viagem</Link>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* O que faz o Dólar subir */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0">
                            <TrendingUp className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            O que faz o Dólar subir ou descer?
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        A cotação flutua baseada em três pilares principais. Entendê-los ajuda a melhorar seu <Link to="/calculadoras/roi" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">ROI</Link> em operações internacionais e saber a hora certa de aportar em <Link to="/calculadoras/investimentos" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Investimentos</Link> no exterior:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <span className="bg-emerald-500/20 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                                Taxa Selic
                            </h3>
                            <p className="text-sm text-gray-400">
                                Juros altos no Brasil atraem investidores estrangeiros, trazendo dólares e baixando a cotação.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <span className="bg-emerald-500/20 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                                Risco Fiscal
                            </h3>
                            <p className="text-sm text-gray-400">
                                Quando o governo gasta mais do que arrecada, a confiança cai e o dólar sobe.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <span className="bg-emerald-500/20 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                                Juros nos EUA (Fed)
                            </h3>
                            <p className="text-sm text-gray-400">
                                Se os juros sobem lá, o dinheiro sai de emergentes (como o Brasil) e volta para os EUA, valorizando a moeda americana.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-200/80">
                            <strong>Dica de Ouro:</strong> O dólar disparou antes do fechamento da fatura? Use nossa <Link to="/calculadoras/quitacao-antecipada" className="text-yellow-400 hover:text-yellow-300 underline decoration-yellow-400/30">Calculadora de Quitação Antecipada</Link> para ver se vale a pena adiantar o pagamento e travar o câmbio do dia.
                        </p>
                    </div>
                </div>

                <FAQ
                    items={CURRENCY_FAQS}
                    title="Dúvidas Frequentes (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}


function ChartLazyWrapper() {
    const [shouldLoad, setShouldLoad] = useState(false);

    // Fallback: se o usuário tiver WiFi rápido, a gente pode tentar carregar no scroll
    // mas o clique é garantia de performance inicial
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div ref={ref} className="h-full w-full flex flex-col relative min-h-[450px]">
            {!shouldLoad ? (
                <div className="w-full h-full bg-[#1a1a1a]/50 backdrop-blur-xl rounded-3xl border border-white/5 flex flex-col items-center justify-center p-6 text-center z-10 transition-all">
                    <TrendingUp className="w-12 h-12 text-emerald-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Gráfico de Cotação</h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs font-medium leading-relaxed">
                        Visualize o histórico do Dólar, Euro e Libra nos últimos 30 dias.
                    </p>
                    <button
                        onClick={() => setShouldLoad(true)}
                        className="group flex items-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold rounded-xl transition-all transform hover:scale-105 ring-2 ring-emerald-500/20 focus:outline-none focus:ring-emerald-500 shadow-lg"
                        aria-label="Carregar histórico do gráfico de cotação"
                    >
                        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        Carregar Gráfico
                    </button>

                </div>
            ) : (
                <Suspense fallback={
                    <div className="h-full w-full min-h-[600px] bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 flex items-center justify-center">
                        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
                        <span className="ml-3 text-gray-400 text-sm">Carregando dados...</span>
                    </div>
                }>
                    <CurrencyChart />
                </Suspense>
            )}
        </div>
    );
}
