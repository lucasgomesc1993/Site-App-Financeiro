import React, { useState, useEffect } from 'react';
import { Car, Calculator, HelpCircle, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const UBER_VS_CAR_FAQS: FAQItem[] = [
    {
        question: "O que sai mais barato?",
        answer: "Depende da quilometragem mensal. Para quem roda pouco (até 300-500km/mês), aplicativos costumam ser mais baratos pois não têm custos fixos como IPVA, seguro e depreciação."
    },
    {
        question: "Quais os custos ocultos do carro?",
        answer: "Além de combustível e manutenção, o carro tem a depreciação (perda de valor anual), custo de oportunidade do dinheiro investido na compra, seguro, IPVA, licenciamento e estacionamento."
    },
    {
        question: "E o conforto?",
        answer: "O carro próprio oferece disponibilidade imediata e liberdade. O aplicativo oferece a comodidade de não precisar dirigir nem procurar estacionamento. A escolha também é sobre estilo de vida."
    }
];

export function UberVsCarPage() {
    const [carValue, setCarValue] = useState('');
    const [kmPerMonth, setKmPerMonth] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');
    const [consumption, setConsumption] = useState('');
    const [insurance, setInsurance] = useState('');
    const [parking, setParking] = useState('');
    const [uberPrice, setUberPrice] = useState(''); // Average price per km or total monthly estimate? Let's use avg per km or monthly spend. Let's ask for avg trip price and distance? Or just avg monthly spend.
    // Let's make it simpler: Avg price per km in Uber.
    const [uberPricePerKm, setUberPricePerKm] = useState('2.50');

    const [result, setResult] = useState<{
        carMonthlyCost: number;
        uberMonthlyCost: number;
        bestOption: 'car' | 'uber'
    } | null>(null);

    const calculate = () => {
        const carVal = parseFloat(carValue.replace(/\./g, '').replace(',', '.') || '0');
        const km = parseFloat(kmPerMonth.replace(/\./g, '').replace(',', '.') || '0');
        const fuel = parseFloat(fuelPrice.replace(',', '.') || '0');
        const cons = parseFloat(consumption.replace(',', '.') || '0');
        const ins = parseFloat(insurance.replace(/\./g, '').replace(',', '.') || '0'); // Annual
        const park = parseFloat(parking.replace(/\./g, '').replace(',', '.') || '0'); // Monthly
        const uberKmPrice = parseFloat(uberPricePerKm.replace(',', '.') || '0');

        if (carVal === 0 || km === 0) {
            setResult(null);
            return;
        }

        // Car Costs (Monthly)
        // 1. Depreciation (approx 10% per year / 12)
        const depreciation = (carVal * 0.10) / 12;
        // 2. Opportunity Cost (approx 0.8% per month on car value)
        const opportunity = carVal * 0.008;
        // 3. IPVA (approx 4% per year / 12)
        const ipva = (carVal * 0.04) / 12;
        // 4. Insurance (Annual / 12)
        const insuranceMonthly = ins / 12;
        // 5. Fuel
        const fuelMonthly = (km / cons) * fuel;
        // 6. Maintenance (approx R$ 0.50 per km? Or fixed annual? Let's assume 3% of car value per year)
        const maintenance = (carVal * 0.03) / 12;

        const carMonthlyCost = depreciation + opportunity + ipva + insuranceMonthly + fuelMonthly + maintenance + park;

        // Uber Costs (Monthly)
        const uberMonthlyCost = km * uberKmPrice;

        setResult({
            carMonthlyCost,
            uberMonthlyCost,
            bestOption: carMonthlyCost < uberMonthlyCost ? 'car' : 'uber'
        });
    };

    useEffect(() => {
        calculate();
    }, [carValue, kmPerMonth, fuelPrice, consumption, insurance, parking, uberPricePerKm]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora Uber ou Carro Próprio",
        "description": "Descubra se vale mais a pena ter carro próprio ou andar de Uber/99 com base na sua rotina.",
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
                title="Uber ou Carro Próprio? Calculadora de Custos"
                description="Faça as contas. Descubra se é mais barato manter um carro ou usar aplicativos de transporte como Uber e 99."
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-gray-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Uber ou Carro', href: '/calculadoras/uber-ou-carro' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Smartphone className="w-4 h-4 text-rose-500" />
                            <span className="text-sm text-gray-300">Utilidades</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Uber ou <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-gray-400">Carro Próprio?</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Coloque na ponta do lápis. Compare os custos reais de manter um veículo versus usar apps.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-24">
                    {/* Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-rose-500" />
                                    Comparar Custos
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Valor do Carro</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={carValue}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setCarValue)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Km Rodados (Mês)</label>
                                        <input
                                            type="text"
                                            value={kmPerMonth}
                                            onChange={(e) => setKmPerMonth(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                            placeholder="Ex: 500"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Preço Combustível</label>
                                        <input
                                            type="text"
                                            value={fuelPrice}
                                            onChange={(e) => setFuelPrice(e.target.value.replace(',', '.'))}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                            placeholder="5.50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Consumo (km/L)</label>
                                        <input
                                            type="text"
                                            value={consumption}
                                            onChange={(e) => setConsumption(e.target.value.replace(',', '.'))}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                            placeholder="10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Preço Uber (por km)</label>
                                        <input
                                            type="text"
                                            value={uberPricePerKm}
                                            onChange={(e) => setUberPricePerKm(e.target.value.replace(',', '.'))}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                            placeholder="2.50"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Seguro (Anual)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={insurance}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setInsurance)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Estacionamento (Mês)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={parking}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setParking)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 text-center mb-4">
                                        <span className="text-sm text-rose-400 block mb-2">Opção Mais Econômica</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? (result.bestOption === 'car' ? 'Carro Próprio' : 'Uber / App') : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className={`p-4 rounded-xl border text-center ${result && result.bestOption === 'car' ? 'bg-green-500/10 border-green-500/20' : 'bg-white/5 border-white/5'}`}>
                                            <span className="text-xs text-gray-400 block mb-1">Custo Mensal Carro</span>
                                            <span className="text-lg font-bold text-white">
                                                {result ? `R$ ${result.carMonthlyCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className={`p-4 rounded-xl border text-center ${result && result.bestOption === 'uber' ? 'bg-green-500/10 border-green-500/20' : 'bg-white/5 border-white/5'}`}>
                                            <span className="text-xs text-gray-400 block mb-1">Custo Mensal App</span>
                                            <span className="text-lg font-bold text-white">
                                                {result ? `R$ ${result.uberMonthlyCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <Car className="w-5 h-5 text-rose-500" />
                                Custos Invisíveis
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p>
                                    Muitas pessoas só contam o combustível, mas o carro tem custos fixos altos:
                                </p>
                                <ul className="space-y-2 list-disc pl-4">
                                    <li><strong>Depreciação:</strong> O carro perde cerca de 10% a 15% do valor todo ano.</li>
                                    <li><strong>Custo de Oportunidade:</strong> Se você vendesse o carro e investisse o dinheiro, quanto renderia?</li>
                                    <li><strong>Manutenção:</strong> Pneus, revisões, óleo, imprevistos.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={UBER_VS_CAR_FAQS}
                    title="Dúvidas sobre Transporte"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
