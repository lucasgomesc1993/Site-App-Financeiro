import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, RefreshCw, Globe, ArrowRightLeft, TrendingUp, AlertTriangle, Plane } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const CURRENCY_FAQS: FAQItem[] = [
    {
        question: "Qual o melhor momento para comprar dólar?",
        answer: "Tentar acertar o \"fundo\" (o menor preço) é quase impossível, até para especialistas. A melhor estratégia é comprar aos poucos (preço médio). Se você vai viajar daqui a 6 meses, compre um pouco todo mês. Assim você se protege das altas repentinas."
    },
    {
        question: "Como converter Euro para Dólar?",
        answer: "A lógica é a mesma. O par \"Euro/Dólar\" (EUR/USD) é o mais negociado do mundo. Geralmente, o Euro vale mais que o Dólar, mas a paridade pode mudar dependendo da economia europeia."
    },
    {
        question: "Vale a pena usar cartão de crédito no exterior?",
        answer: "Pela praticidade e segurança, sim. Financeiramente, você paga um IOF maior e fica sujeito à variação cambial até o fechamento da fatura (embora muitos bancos já travem o dólar no dia da compra). Para economizar, prefira contas globais em dólar."
    },
    {
        question: "O que é o Spread bancário?",
        answer: "É a diferença entre o que o banco paga pela moeda e por quanto ele te vende. Bancos tradicionais costumam cobrar spreads altos (4% a 6%). Bancos digitais e fintechs de câmbio costumam ter taxas menores (1% a 2%)."
    }
];

type Currency = 'BRL' | 'USD' | 'EUR';

interface ExchangeRates {
    USD: { bid: string; ask: string; varBid: string; pctChange: string; };
    EUR: { bid: string; ask: string; varBid: string; pctChange: string; };
}

export const CurrencyConverterPage: React.FC = () => {
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
    const [toCurrency, setToCurrency] = useState<Currency>('BRL');
    const [rates, setRates] = useState<ExchangeRates | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [lastUpdate, setLastUpdate] = useState<string>('');
    const [iofType, setIofType] = useState<'none' | 'cash' | 'card'>('none');

    useEffect(() => {
        fetchRates();
        // Refresh every 30 seconds
        const interval = setInterval(fetchRates, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchRates = async () => {
        try {
            const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');
            const data = await response.json();
            setRates({
                USD: data.USDBRL,
                EUR: data.EURBRL
            });
            setLastUpdate(new Date().toLocaleTimeString());
            setLoading(false);
        } catch (error) {
            console.error("Error fetching rates", error);
            setLoading(false);
        }
    };

    const getRate = (from: Currency, to: Currency): number => {
        if (!rates) return 1;
        if (from === to) return 1;

        // Base is BRL in the API logic used here for simplicity (converting everything to BRL then to target)
        // API gives USD->BRL and EUR->BRL directly.

        let rateToBrl = 1;
        if (from === 'USD') rateToBrl = parseFloat(rates.USD.bid);
        if (from === 'EUR') rateToBrl = parseFloat(rates.EUR.bid);

        let rateFromBrl = 1;
        if (to === 'USD') rateFromBrl = 1 / parseFloat(rates.USD.bid);
        if (to === 'EUR') rateFromBrl = 1 / parseFloat(rates.EUR.bid);

        return rateToBrl * rateFromBrl;
    };

    const calculateTotal = () => {
        const rawRate = getRate(fromCurrency, toCurrency);
        let finalAmount = amount * rawRate;

        // Apply IOF if converting FROM BRL TO Foreign Currency
        if (fromCurrency === 'BRL' && toCurrency !== 'BRL') {
            if (iofType === 'cash') {
                finalAmount = finalAmount * (1 - 0.011); // 1.1% IOF
            } else if (iofType === 'card') {
                finalAmount = finalAmount * (1 - 0.0438); // 4.38% IOF
            }
        }

        // Apply IOF if converting FROM Foreign Currency TO BRL (usually 0.38% or similar depending on nature, but let's simplify to standard IOF logic for travel buying)
        // For simplicity in this calculator, we'll focus on the "Buying Foreign Currency" scenario for IOF application as per the text.

        return finalAmount;
    };

    const formatCurrency = (val: number, currency: Currency) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency }).format(val);
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Conversor de Moedas FinZap",
        "description": "Converta valores entre Real, Dólar e Euro com a cotação atualizada em tempo real.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        }
    };

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Conversor de Moedas Hoje - Dólar, Euro e Real (Cotação Atualizada)"
                description="Quanto está o dólar hoje? Use nosso conversor de moedas gratuito para simular valores entre Real, Dólar e Euro. Entenda a diferença entre câmbio comercial e turismo."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Conversor de Moedas', href: '/calculadoras/conversor-moedas' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Globe className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Câmbio Global</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Conversor de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Moedas</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Vai viajar ou fazer compras internacionais? Converta valores entre Real, Dólar e Euro com a cotação atualizada em tempo real.
                        </p>
                    </motion.div>
                </div>

                {/* Calculator Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid lg:grid-cols-12 gap-8 mb-24"
                >
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <RefreshCw className={`w-5 h-5 text-primary ${loading ? 'animate-spin' : ''}`} />
                                    Conversor
                                </h2>
                                <span className="text-xs text-gray-500">
                                    Atualizado: {lastUpdate || '...'}
                                </span>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors text-lg font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">De</label>
                                        <select
                                            value={fromCurrency}
                                            onChange={(e) => setFromCurrency(e.target.value as Currency)}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="BRL">🇧🇷 BRL</option>
                                            <option value="USD">🇺🇸 USD</option>
                                            <option value="EUR">🇪🇺 EUR</option>
                                        </select>
                                    </div>

                                    <button
                                        onClick={swapCurrencies}
                                        className="p-3 mb-[2px] rounded-xl bg-white/5 hover:bg-white/10 text-primary transition-colors"
                                    >
                                        <ArrowRightLeft className="w-5 h-5" />
                                    </button>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Para</label>
                                        <select
                                            value={toCurrency}
                                            onChange={(e) => setToCurrency(e.target.value as Currency)}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="BRL">🇧🇷 BRL</option>
                                            <option value="USD">🇺🇸 USD</option>
                                            <option value="EUR">🇪🇺 EUR</option>
                                        </select>
                                    </div>
                                </div>

                                {fromCurrency === 'BRL' && toCurrency !== 'BRL' && (
                                    <div className="pt-4 border-t border-white/10">
                                        <label className="block text-sm text-gray-400 mb-3">Incluir IOF (Imposto)?</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <button
                                                onClick={() => setIofType('none')}
                                                className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${iofType === 'none' ? 'bg-white/20 text-white' : 'bg-black/20 text-gray-500 hover:bg-white/5'}`}
                                            >
                                                Sem IOF
                                            </button>
                                            <button
                                                onClick={() => setIofType('cash')}
                                                className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${iofType === 'cash' ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-black/20 text-gray-500 hover:bg-white/5'}`}
                                            >
                                                Dinheiro (1.1%)
                                            </button>
                                            <button
                                                onClick={() => setIofType('card')}
                                                className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${iofType === 'card' ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-black/20 text-gray-500 hover:bg-white/5'}`}
                                            >
                                                Cartão (4.38%)
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10 text-center">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
                                        <p className="text-gray-400">Buscando cotações...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-2 text-gray-400 text-lg">
                                            {formatCurrency(amount, fromCurrency)} =
                                        </div>
                                        <div className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                            {formatCurrency(calculateTotal(), toCurrency)}
                                        </div>

                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm text-gray-400 mb-8">
                                            <TrendingUp className="w-4 h-4 text-primary" />
                                            <span>Cotação Comercial: 1 {fromCurrency} = {getRate(fromCurrency, toCurrency).toFixed(4)} {toCurrency}</span>
                                        </div>

                                        {iofType !== 'none' && fromCurrency === 'BRL' && (
                                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 max-w-md mx-auto text-left flex gap-3">
                                                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                                <div>
                                                    <p className="text-yellow-200 font-bold text-sm mb-1">Atenção ao IOF</p>
                                                    <p className="text-xs text-yellow-500/80">
                                                        O valor exibido já desconta o imposto de {iofType === 'cash' ? '1.1%' : '4.38%'}.
                                                        Sem imposto, você receberia {formatCurrency(amount * getRate(fromCurrency, toCurrency), toCurrency)}.
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg mx-auto">
                                            <div className="bg-white/5 rounded-xl p-4 text-left">
                                                <span className="block text-xs text-gray-500 mb-1">Dólar Comercial (Venda)</span>
                                                <span className="block text-lg font-bold text-white">R$ {parseFloat(rates?.USD.bid || '0').toFixed(3)}</span>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4 text-left">
                                                <span className="block text-xs text-gray-500 mb-1">Euro Comercial (Venda)</span>
                                                <span className="block text-lg font-bold text-white">R$ {parseFloat(rates?.EUR.bid || '0').toFixed(3)}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Entendendo o Câmbio: Por que o valor muda tanto?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                A taxa de câmbio é o preço de uma moeda estrangeira medido em reais. Esse valor oscila a cada segundo durante o horário comercial, influenciado por fatores como Economia Global, Cenário Interno e a Lei da Oferta e Procura.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Dólar Comercial x Dólar Turismo: Qual a diferença?</h2>
                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">1. Dólar Comercial</h3>
                                <p className="text-sm text-gray-400">É a cotação utilizada por grandes empresas e bancos para transações de importação, exportação e transferências financeiras. É o valor que você vê nos jornais e notícias.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">2. Dólar Turismo</h3>
                                <p className="text-sm text-gray-400">É a cotação para pessoas físicas que vão viajar. Ele é mais caro (em média 3% a 5% acima do comercial) porque inclui custos de logística, segurança e impostos.</p>
                            </div>
                        </div>
                        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl">
                            <h3 className="text-lg font-bold text-white mb-2">💡 Dica FinZap</h3>
                            <p className="text-gray-300 text-sm">
                                Ao usar nosso conversor, lembre-se que ele mostra a taxa de mercado (comercial). Para saber quanto você vai pagar na casa de câmbio, adicione mentalmente cerca de 4% a 6% sobre o valor convertido.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Fantasma do IOF</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">Não basta converter a moeda; você precisa considerar o imposto do governo brasileiro sobre operações de câmbio:</p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <Plane className="flex-shrink-0 w-5 h-5 text-primary" />
                                    <span><strong>Dinheiro em Espécie (Papel):</strong> IOF de 1,1%. É a opção mais barata em termos de imposto, mas menos segura.</span>
                                </li>
                                <li className="flex gap-3">
                                    <Plane className="flex-shrink-0 w-5 h-5 text-primary" />
                                    <span><strong>Cartão de Crédito/Débito Internacional:</strong> IOF de 4,38% (em 2024/2025).</span>
                                </li>
                                <li className="flex gap-3">
                                    <Plane className="flex-shrink-0 w-5 h-5 text-primary" />
                                    <span><strong>Conta Internacional (Nomad, Wise):</strong> IOF de 1,1% (mesma alíquota do papel moeda). Essa tem sido a opção favorita dos viajantes.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <FAQ
                        items={CURRENCY_FAQS}
                        title="Dúvidas Frequentes sobre Câmbio"
                        className="py-12"
                        showSocialProof={false}
                    />
                </div>

                {/* App Promo Banner */}
                <AppPromoBanner />
            </div>
        </section>
    );
};
