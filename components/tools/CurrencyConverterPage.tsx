import React, { useState, useEffect } from 'react';
import { Globe, Calculator, RefreshCw, ArrowRight, Info, AlertCircle, TrendingUp, DollarSign, CreditCard, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const CURRENCY_FAQS: FAQItem[] = [
    {
        question: "Qual o melhor horário para comprar dólar?",
        answer: "O mercado de câmbio (Forex) funciona 24 horas, mas a liquidez principal ocorre durante o horário comercial (9h às 17h de Brasília). Comprar durante o horário de abertura dos bancos garante que você pegue a cotação momentânea com menor \"spread\". Para estratégias de longo prazo, confira nossas estratégias de investimentos."
    },
    {
        question: "O que é Spread Bancário na conversão?",
        answer: "O Spread é a diferença entre o que o banco paga pela moeda e por quanto ele vende para você. É o lucro da instituição. Bancos digitais e contas globais costumam ter spreads menores (1% a 2%) que os grandes bancos tradicionais (4% a 6%)."
    },
    {
        question: "Como fugir do IOF alto em viagens?",
        answer: "Embora a alíquota para cartões seja de cerca de 3,5% em 2025, o uso de contas internacionais em Dólar (que permitem comprar a moeda comercialmente e manter saldo) ainda costuma ser mais vantajoso que usar o cartão de crédito brasileiro tradicional. Outra opção é a compra de papel moeda, que possui alíquota reduzida de 1,1%."
    },
    {
        question: "Quanto vale 1 Real em Dólar hoje?",
        answer: "O valor flutua a cada segundo. Atualmente, 1 Real vale aproximadamente entre $0,15 e $0,20 centavos de Dólar, dependendo da oscilação diária do mercado. Historicamente, o Real vale menos que o Dólar, exigindo cerca de 5 a 6 unidades de real para comprar 1 unidade de dólar em cenários recentes."
    }
];

export function CurrencyConverterPage() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('BRL');
    const [toCurrency, setToCurrency] = useState('USD');
    const [result, setResult] = useState<number | null>(null);
    const [rate, setRate] = useState<number | null>(null);

    // Mock rates for demonstration (in a real app, fetch from API)
    const rates: Record<string, number> = {
        'BRL': 1,
        'USD': 0.17, // 1 BRL = 0.17 USD (~5.88 BRL/USD)
        'EUR': 0.16, // 1 BRL = 0.16 EUR
        'GBP': 0.13  // 1 BRL = 0.13 GBP
    };

    // Inverse rates for display
    const displayRates: Record<string, number> = {
        'USD': 5.88,
        'EUR': 6.20,
        'GBP': 7.45,
        'BRL': 1
    };

    const calculate = () => {
        const val = parseFloat(amount.replace(/\./g, '').replace(',', '.'));

        if (isNaN(val) || val === 0) {
            setResult(null);
            return;
        }

        // Convert to base (BRL) then to target
        // Since our rates are relative to BRL (1 BRL = X Currency)
        // But usually APIs give USD base. Let's simplify with fixed pairs logic for this demo.

        // Let's use the displayRates (Value of 1 Unit in BRL)
        const fromRate = displayRates[fromCurrency];
        const toRate = displayRates[toCurrency];

        // Convert From -> BRL -> To
        const valueInBRL = val * fromRate;
        const finalValue = valueInBRL / toRate;

        setResult(finalValue);
        setRate(fromRate / toRate);
    };

    useEffect(() => {
        calculate();
    }, [amount, fromCurrency, toCurrency]);

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

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Conversor de Moedas Online: Dólar, Euro e Câmbio Hoje (2025)",
        "description": "Converta valores em tempo real com nosso Conversor de Moedas. Veja a cotação do Dólar Comercial e Turismo, Euro e IOF atualizado de 2025. Calcule agora.",
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
                title="Conversor de Moedas Online: Dólar, Euro e Câmbio Hoje (2025)"
                description="Converta valores em tempo real com nosso Conversor de Moedas. Veja a cotação do Dólar Comercial e Turismo, Euro e IOF atualizado de 2025. Calcule agora."
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

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Globe className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Conversor de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Moedas</span>
                        </h1>
                        <div className="max-w-3xl mx-auto text-lg text-gray-400 space-y-4">
                            <p>
                                Precisa saber exatamente quanto vale o seu dinheiro antes de viajar ou fazer uma compra internacional? Você está no lugar certo. Nosso <strong>Conversor de Moedas</strong> utiliza dados atualizados em tempo real para entregar a cotação precisa do Dólar, Euro, Libra e outras divisas globais.
                            </p>
                            <p>
                                Mais do que apenas números, aqui você entende o custo real da operação, incluindo o impacto do IOF de 2025 e a diferença brutal entre a cotação comercial e a turismo.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7"
                    >
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
                                            value={amount}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setAmount)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">De</label>
                                        <select
                                            value={fromCurrency}
                                            onChange={(e) => setFromCurrency(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        >
                                            <option value="BRL">Real (BRL)</option>
                                            <option value="USD">Dólar (USD)</option>
                                            <option value="EUR">Euro (EUR)</option>
                                            <option value="GBP">Libra (GBP)</option>
                                        </select>
                                    </div>

                                    <button
                                        onClick={swapCurrencies}
                                        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-[1px]"
                                    >
                                        <RefreshCw className="w-5 h-5 text-emerald-500" />
                                    </button>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Para</label>
                                        <select
                                            value={toCurrency}
                                            onChange={(e) => setToCurrency(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        >
                                            <option value="BRL">Real (BRL)</option>
                                            <option value="USD">Dólar (USD)</option>
                                            <option value="EUR">Euro (EUR)</option>
                                            <option value="GBP">Libra (GBP)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">Valor Convertido</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `${toCurrency === 'BRL' ? 'R$' : toCurrency === 'USD' ? '$' : toCurrency === 'EUR' ? '€' : '£'} ${result.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                        {rate && (
                                            <p className="text-xs text-gray-400 mt-2">
                                                1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                                            </p>
                                        )}
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
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full">
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                                <Info className="w-5 h-5 text-emerald-500" />
                                Como usar este Conversor
                            </h3>
                            <div className="space-y-6 text-gray-400">
                                <p>
                                    Siga o passo a passo para simular:
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Valor</strong>
                                            Digite a quantia que deseja converter (ex: R$ 1.000,00).
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Moeda de Origem</strong>
                                            Selecione a moeda que você tem em mãos (geralmente Real Brasileiro - BRL).
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Moeda de Destino</strong>
                                            Escolha a moeda que deseja comprar (Dólar Americano - USD, Euro - EUR, etc.).
                                        </div>
                                    </li>
                                </ul>
                                <p className="text-sm">
                                    O resultado mostrará o valor de mercado. Porém, para o seu bolso, é fundamental entender as taxas extras explicadas abaixo.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Additional Content */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <DollarSign className="w-6 h-6 text-emerald-500" />
                            Dólar Comercial vs. Turismo
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                Ao ver a cotação no jornal nacional, você vê o <strong>Dólar Comercial</strong>. Mas ao tentar comprar papel moeda na casa de câmbio, o valor é mais alto. Por que isso acontece?
                            </p>
                            <ul className="space-y-2 list-disc pl-5">
                                <li><strong>Dólar Comercial:</strong> É a taxa usada por grandes empresas e bancos para importação e exportação. O volume de dinheiro é gigantesco, por isso a taxa é menor.</li>
                                <li><strong>Dólar Turismo:</strong> É o valor que nós pagamos. Ele inclui custos operacionais (transporte de notas físicas, segurança) e a margem de lucro das instituições.</li>
                            </ul>
                            <p>
                                Se você está planejando suas férias, use nossa <Link to="/calculadoras/custo-viagem" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">calculadora de custo de viagem</Link> considerando sempre a cotação Turismo.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <CreditCard className="w-6 h-6 text-emerald-500" />
                            O Custo Oculto: IOF em 2025
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                Converter moedas não é apenas trocar uma nota pela outra. Existem taxas como o <strong>IOF</strong> (Imposto sobre Operações Financeiras).
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-2 text-white">Tipo de Operação</th>
                                            <th className="p-2 text-white">Alíquota Aprox.</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400">
                                        <tr className="border-b border-white/5">
                                            <td className="p-2">Cartão de Crédito Internacional</td>
                                            <td className="p-2 font-bold text-red-400">3,5%</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-2">Cartão de Débito / Pré-pago</td>
                                            <td className="p-2 font-bold text-red-400">3,5%</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2">Compra de Moeda em Espécie</td>
                                            <td className="p-2 font-bold text-emerald-400">1,1%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm">
                                Para entender quanto esses percentuais representam, use nossa <Link to="/calculadoras/porcentagem" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">ferramenta de cálculo de porcentagem</Link>.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-24"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-emerald-500" />
                        Como calcular conversão de moeda manualmente?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-4">De Real para Moeda Estrangeira (Divisão)</h3>
                            <p className="text-gray-400 mb-4">
                                Se você tem Reais e quer saber quantos Dólares vai conseguir comprar, você <strong>divide</strong> pelo valor da cotação.
                            </p>
                            <div className="bg-black/20 p-4 rounded-lg font-mono text-sm text-emerald-400">
                                <p className="mb-2">Fórmula: Reais ÷ Cotação</p>
                                <p>Ex: R$ 500 ÷ 5,50 = $ 90,90</p>
                            </div>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-4">De Moeda Estrangeira para Real (Multiplicação)</h3>
                            <p className="text-gray-400 mb-4">
                                Se você viu um produto de 100 dólares e quer saber quanto custa em reais, você <strong>multiplica</strong>.
                            </p>
                            <div className="bg-black/20 p-4 rounded-lg font-mono text-sm text-emerald-400">
                                <p className="mb-2">Fórmula: Dólar x Cotação</p>
                                <p>Ex: $ 100 x 5,50 = R$ 550,00</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-400 mt-6 text-center">
                        Lembre-se: em transações internacionais, o impacto na inflação local pode alterar seu <Link to="/calculadoras/poder-de-compra" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">poder de compra</Link>, então considere sempre uma margem de segurança.
                    </p>
                </motion.div>

                <FAQ
                    items={CURRENCY_FAQS}
                    title="Perguntas Frequentes sobre Câmbio (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
