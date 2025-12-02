import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, Car, Smartphone, AlertCircle } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const UBER_VS_CAR_FAQS: FAQItem[] = [
    {
        question: "O conforto não tem preço?",
        answer: "Tem, e ele deve entrar na sua decisão. Financeiramente o App pode ser melhor, mas ter o carro próprio oferece disponibilidade imediata, cadeirinha para crianças e porta-malas livre. A calculadora foca no dinheiro, mas a decisão final é sua."
    },
    {
        question: "E a tarifa dinâmica?",
        answer: "Nossa calculadora permite que você estime um preço médio por km no aplicativo. Se você usa o app em horários de pico com frequência, o custo mensal pode subir drasticamente, favorecendo o carro próprio."
    },
    {
        question: "Devo vender meu carro e investir o dinheiro?",
        answer: "Essa é a estratégia do \"Custo de Oportunidade\". Muitas vezes, o rendimento mensal do valor do carro aplicado (ex: R$ 50.000 rendendo 0,8% ao mês = R$ 400) já paga boa parte das suas corridas de Uber."
    },
    {
        question: "Carro por assinatura entra na conta?",
        answer: "O carro por assinatura elimina a depreciação, IPVA e seguro (já inclusos), mas tem uma mensalidade alta. Você pode usar nossa calculadora inserindo o valor da assinatura como custo fixo mensal para comparar com o App."
    }
];

export const UberVsCarPage: React.FC = () => {
    // Car Inputs
    const [carValue, setCarValue] = useState<number>(0);
    const [monthlyKm, setMonthlyKm] = useState<number>(0);
    const [consumption, setConsumption] = useState<number>(10); // km/l
    const [fuelPrice, setFuelPrice] = useState<number>(5.50); // R$/l
    const [insurance, setInsurance] = useState<number>(0); // Annual
    const [ipva, setIpva] = useState<number>(4); // %
    const [maintenance, setMaintenance] = useState<number>(0); // Monthly
    const [parking, setParking] = useState<number>(0); // Monthly

    // App Inputs
    const [appPricePerKm, setAppPricePerKm] = useState<number>(2.50); // R$/km

    // Parameters
    const [depreciation, setDepreciation] = useState<number>(15); // % Annual
    const [opportunityRate, setOpportunityRate] = useState<number>(0.8); // % Monthly

    const [result, setResult] = useState<any>(null);

    const calculateComparison = () => {
        if (!carValue || !monthlyKm) return;

        // --- CAR COSTS (MONTHLY) ---

        // 1. Fixed Costs (Custo de Ter)
        const monthlyDepreciation = (carValue * (depreciation / 100)) / 12;
        const monthlyOpportunity = carValue * (opportunityRate / 100);
        const monthlyIpva = (carValue * (ipva / 100)) / 12;
        const monthlyInsurance = insurance / 12;

        const totalFixed = monthlyDepreciation + monthlyOpportunity + monthlyIpva + monthlyInsurance;

        // 2. Variable Costs (Custo de Rodar)
        const monthlyFuel = (monthlyKm / consumption) * fuelPrice;
        const totalVariable = monthlyFuel + maintenance + parking;

        const totalCarMonthly = totalFixed + totalVariable;
        const carCostPerKm = totalCarMonthly / monthlyKm;

        // --- APP COSTS (MONTHLY) ---
        const totalAppMonthly = monthlyKm * appPricePerKm;

        setResult({
            totalCarMonthly,
            totalAppMonthly,
            carCostPerKm,
            difference: Math.abs(totalCarMonthly - totalAppMonthly),
            winner: totalAppMonthly < totalCarMonthly ? 'app' : 'car',
            details: {
                depreciation: monthlyDepreciation,
                opportunity: monthlyOpportunity,
                ipva: monthlyIpva,
                insurance: monthlyInsurance,
                fuel: monthlyFuel,
                maintenance,
                parking
            }
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora: Uber ou Carro Próprio?",
        "description": "Descubra se é mais barato dirigir seu próprio veículo ou usar aplicativos de transporte.",
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
                title="Uber ou Carro Próprio? Calculadora de Custos Reais 2025"
                description="Vender o carro ou continuar dirigindo? Compare custos de gasolina, IPVA, seguro e depreciação versus gastos com Uber e 99. Faça a conta exata."
                canonical="/calculadoras/uber-ou-carro"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": UBER_VS_CAR_FAQS.map(faq => ({
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
                        { label: 'Uber ou Carro Próprio', href: '/calculadoras/uber-ou-carro' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Car className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Transporte</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Uber ou <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Carro Próprio?</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Será que vale a pena manter um carro na garagem? Descubra se é mais barato dirigir seu próprio veículo ou usar aplicativos de transporte.
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
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-primary" />
                                Dados do Veículo
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor do Carro (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Ex: 60000"
                                            value={carValue || ''}
                                            onChange={(e) => setCarValue(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Km Rodados por Mês</label>
                                    <div className="relative">
                                        <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Ex: 1000"
                                            value={monthlyKm || ''}
                                            onChange={(e) => setMonthlyKm(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Consumo (km/l)</label>
                                        <input
                                            type="number"
                                            value={consumption}
                                            onChange={(e) => setConsumption(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Preço Combustível</label>
                                        <input
                                            type="number"
                                            value={fuelPrice}
                                            onChange={(e) => setFuelPrice(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Seguro Anual (R$)</label>
                                        <input
                                            type="number"
                                            value={insurance || ''}
                                            onChange={(e) => setInsurance(Number(e.target.value))}
                                            placeholder="Ex: 2500"
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">IPVA (%)</label>
                                        <input
                                            type="number"
                                            value={ipva}
                                            onChange={(e) => setIpva(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Manutenção/Mês</label>
                                        <input
                                            type="number"
                                            value={maintenance || ''}
                                            onChange={(e) => setMaintenance(Number(e.target.value))}
                                            placeholder="Ex: 200"
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Estac./Limpeza</label>
                                        <input
                                            type="number"
                                            value={parking || ''}
                                            onChange={(e) => setParking(Number(e.target.value))}
                                            placeholder="Ex: 150"
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <Smartphone className="w-4 h-4 text-primary" />
                                        Comparativo App
                                    </h3>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Preço Médio por Km (App)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                value={appPricePerKm}
                                                onChange={(e) => setAppPricePerKm(Number(e.target.value))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculateComparison}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Comparar Custos
                                    </button>
                                    <button
                                        onClick={() => {
                                            setCarValue(0);
                                            setMonthlyKm(0);
                                            setResult(null);
                                        }}
                                        className="px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all"
                                    >
                                        Limpar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {result ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Opção Mais Econômica</h2>
                                            <div className={`text-4xl md:text-5xl font-bold mb-2 ${result.winner === 'app' ? 'text-primary' : 'text-blue-400'}`}>
                                                {result.winner === 'app' ? 'Vá de App (Uber/99)' : 'Fique com o Carro'}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Economia mensal de {formatCurrency(result.difference)}
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {/* Car Scenario */}
                                            <div className={`rounded-xl p-6 border ${result.winner === 'car' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/5'}`}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Car className={`w-5 h-5 ${result.winner === 'car' ? 'text-blue-400' : 'text-gray-500'}`} />
                                                    <h3 className="font-bold text-white">Carro Próprio</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <span className="block text-xs text-gray-500">Custo Mensal Total</span>
                                                        <span className="block text-xl font-bold text-white">{formatCurrency(result.totalCarMonthly)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-xs text-gray-500">Custo por Km</span>
                                                        <span className="block text-sm text-gray-300">{formatCurrency(result.carCostPerKm)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* App Scenario */}
                                            <div className={`rounded-xl p-6 border ${result.winner === 'app' ? 'bg-primary/10 border-primary/30' : 'bg-white/5 border-white/5'}`}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Smartphone className={`w-5 h-5 ${result.winner === 'app' ? 'text-primary' : 'text-gray-500'}`} />
                                                    <h3 className="font-bold text-white">Aplicativo</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <span className="block text-xs text-gray-500">Custo Mensal Total</span>
                                                        <span className="block text-xl font-bold text-white">{formatCurrency(result.totalAppMonthly)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-xs text-gray-500">Preço por Km</span>
                                                        <span className="block text-sm text-gray-300">{formatCurrency(appPricePerKm)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-xl p-6">
                                            <h3 className="text-sm font-bold text-white mb-4">Detalhamento dos Custos do Carro (Mensal)</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Combustível</span>
                                                    <span className="text-white">{formatCurrency(result.details.fuel)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Depreciação (Perda de Valor)</span>
                                                    <span className="text-white">{formatCurrency(result.details.depreciation)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Custo de Oportunidade (Rendimento Perdido)</span>
                                                    <span className="text-white">{formatCurrency(result.details.opportunity)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">IPVA + Seguro</span>
                                                    <span className="text-white">{formatCurrency(result.details.ipva + result.details.insurance)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Manutenção + Estac.</span>
                                                    <span className="text-white">{formatCurrency(result.details.maintenance + result.details.parking)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Car className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para comparar</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Dilema: Conforto vs. Custo</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Ter um carro próprio já foi sinônimo de status e liberdade. Hoje, com a alta dos combustíveis e a facilidade dos aplicativos (Uber, 99), muitos motoristas estão fazendo a conta: será que o carro não virou um passivo que drena seu dinheiro?
                            </p>
                            <p className="mb-4">
                                Muitas pessoas cometem o erro de comparar apenas o gasto com gasolina versus o preço da corrida. Mas a conta real é muito mais profunda. Um carro parado na garagem gera custos fixos (IPVA, Seguro, Depreciação) que você paga mesmo sem rodar um quilômetro sequer.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Que Você Paga (e nem percebe)</h2>
                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">1. Custos Fixos (O "Custo de Ter")</h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><strong>Depreciação:</strong> Seu carro perde cerca de 10% a 15% do valor todo ano.</li>
                                    <li><strong>Custo de Oportunidade:</strong> O rendimento que você perde ao não investir o dinheiro do carro.</li>
                                    <li><strong>IPVA e Licenciamento:</strong> Impostos anuais obrigatórios.</li>
                                    <li><strong>Seguro:</strong> Proteção essencial que pesa no bolso.</li>
                                </ul>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">2. Custos Variáveis (O "Custo de Rodar")</h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><strong>Combustível:</strong> Gasolina, Etanol ou GNV.</li>
                                    <li><strong>Manutenção:</strong> Revisões, pneus, óleo e desgastes naturais.</li>
                                    <li><strong>Estacionamento/Limpeza:</strong> Mensalidades, Zona Azul e lavagens.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Quando o App vale a pena?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2">Pouco Uso (Até 15km/dia)</h4>
                                    <p className="text-gray-400">Geralmente o Uber/App vence. Os custos fixos do carro (seguro, IPVA) diluídos em poucos quilômetros tornam o "custo por km" do carro próprio altíssimo.</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2">Uso Intenso (Mais de 40km/dia)</h4>
                                    <p className="text-gray-400">O Carro Próprio tende a vencer. Para quem roda muito, o custo variável do app (tarifa dinâmica + taxa da plataforma) acaba superando os custos de manutenção do veículo particular.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <FAQ
                        items={UBER_VS_CAR_FAQS}
                        title="Dúvidas Frequentes"
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
