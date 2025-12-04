import React, { useState, useEffect } from 'react';
import { History, Calculator, TrendingDown, ArrowRight, Info, AlertCircle, Shield, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';
import { INFLATION_DATA } from './inflationData';

const INFLATION_FAQS: FAQItem[] = [
    {
        question: "Qual é a diferença entre ganho nominal e ganho real?",
        answer: "O ganho nominal é o valor bruto que você recebe a mais. Por exemplo, se seu salário subiu de R$ 2.000 para R$ 2.200, seu ganho nominal foi de 10%. O ganho real é esse aumento descontada a inflação. Se a inflação no período foi de 9%, seu ganho real (aumento de poder de compra) foi de apenas aprox. 1%."
    },
    {
        question: "Qual índice devo usar: IPCA ou IGP-M?",
        answer: "Depende do objetivo. O IPCA é o índice oficial de inflação do consumidor (ideal para salários e compras do dia a dia). O IGP-M é mais usado para reajustes de aluguéis e tarifas públicas, sendo historicamente mais volátil."
    },
    {
        question: "Como calcular a inflação acumulada manualmente?",
        answer: "Não basta somar as porcentagens mensais. O cálculo é feito por juros compostos: multiplicam-se os fatores de cada mês. Exemplo: Para dois meses de 1% (fator 1,01), a conta é 1,01 x 1,01 = 1,0201, ou seja, 2,01% acumulado, e não 2,00%."
    },
    {
        question: "A poupança protege meu poder de compra?",
        answer: "Historicamente, muitas vezes não. Em diversos anos, o rendimento da poupança ficou abaixo da inflação (IPCA), o que significa que o dinheiro aplicado perdeu valor real de compra, mesmo que o saldo numérico tenha aumentado."
    },
    {
        question: "O dólar afeta meu poder de compra no Brasil?",
        answer: "Sim. Muitos produtos consumidos no Brasil (trigo, eletrônicos, combustíveis) têm preços atrelados ao dólar. Quando o real se desvaloriza frente ao dólar, a inflação interna tende a subir, reduzindo seu poder de compra. Você pode verificar essa relação em nossa ferramenta de conversor de moedas."
    }
];

export function PurchasingPowerPage() {
    const [amount, setAmount] = useState('');
    const [startYear, setStartYear] = useState('2000');
    const [endYear, setEndYear] = useState(new Date().getFullYear().toString());
    const [result, setResult] = useState<{ adjustedAmount: number; inflation: number } | null>(null);

    const calculate = () => {
        const val = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
        const start = parseInt(startYear);
        const end = parseInt(endYear);

        if (isNaN(val) || isNaN(start) || isNaN(end) || start >= end) {
            setResult(null);
            return;
        }

        let accumulatedInflation = 1;

        const relevantData = INFLATION_DATA.filter(d => d.year >= start && d.year < end);

        relevantData.forEach(d => {
            accumulatedInflation *= (1 + d.ipca / 100);
        });

        const adjustedAmount = val * accumulatedInflation;

        setResult({
            adjustedAmount,
            inflation: (accumulatedInflation - 1) * 100
        });
    };

    useEffect(() => {
        calculate();
    }, [amount, startYear, endYear]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const years = Array.from({ length: new Date().getFullYear() - 1994 }, (_, i) => 1995 + i);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Poder de Compra: Correção pela Inflação (IPCA)",
        "description": "Descubra quanto seu dinheiro valia no passado e veja a perda do poder de compra pela inflação. Calcule a correção monetária exata agora.",
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
                title="Calculadora de Poder de Compra: Correção pela Inflação (IPCA)"
                description="Descubra quanto seu dinheiro valia no passado e veja a perda do poder de compra pela inflação. Calcule a correção monetária exata agora."
                canonical="/calculadoras/poder-de-compra"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": INFLATION_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Poder de Compra', href: '/calculadoras/poder-de-compra' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <History className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-red-500">Poder de Compra</span>
                        </h1>
                        <div className="max-w-3xl mx-auto text-lg text-gray-400 space-y-4">
                            <p>
                                Você já percebeu que <strong>R$ 100,00</strong> hoje não enchem o carrinho de compras como faziam há 10 anos? Isso não é apenas uma impressão; é a corrosão do seu dinheiro causada pela inflação.
                            </p>
                            <p>
                                Nossa <strong>Calculadora de Poder de Compra</strong> revela a verdade financeira: ela atualiza valores do passado para o presente usando índices oficiais (como o IPCA), mostrando exatamente quanto você precisaria ganhar hoje para manter o mesmo padrão de vida de anos atrás.
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
                                    Corrigir Valor
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Valor Original</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={amount}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setAmount)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Ano Inicial</label>
                                        <select
                                            value={startYear}
                                            onChange={(e) => setStartYear(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        >
                                            {years.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Ano Final</label>
                                        <select
                                            value={endYear}
                                            onChange={(e) => setEndYear(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        >
                                            {years.filter(y => y > parseInt(startYear)).map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                            <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">Valor Corrigido (Hoje)</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.adjustedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Inflação Acumulada (IPCA)</span>
                                        <span className="text-xl font-bold text-red-400">
                                            {result ? `${result.inflation.toFixed(2)}%` : '---'}
                                        </span>
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
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                                <Info className="w-5 h-5 text-emerald-500" />
                                Como usar a Calculadora
                            </h2>
                            <div className="space-y-6 text-gray-400">
                                <p>
                                    Nossa ferramenta simplifica a matemática financeira complexa. Para descobrir o valor real do dinheiro no tempo, você precisará apenas de três dados:
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Valor Inicial</strong>
                                            A quantia que você quer corrigir (ex: o preço de um imóvel em 2015 ou seu primeiro salário).
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Ano Inicial</strong>
                                            O ano de referência daquele valor.
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Ano Final</strong>
                                            Para quando você quer trazer esse valor (geralmente, o ano atual).
                                        </div>
                                    </li>
                                </ul>
                                <p className="text-sm">
                                    O sistema aplica a correção monetária acumulada ano a ano. Isso é essencial para saber se uma proposta de emprego atual realmente paga mais que seu emprego anterior ou para calcular o <Link to="/calculadoras/salario-liquido" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">salário líquido</Link> real descontando a inflação.
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
                            <TrendingDown className="w-6 h-6 text-red-500" />
                            O que é Poder de Compra?
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                O <strong>poder de compra</strong> (ou poder aquisitivo) é a capacidade de adquirir bens e serviços com uma determinada quantia de dinheiro. Em termos simples: é o que o seu dinheiro consegue "pagar" no supermercado, no posto de gasolina ou no aluguel.
                            </p>
                            <p>
                                Quando os preços sobem de forma generalizada — fenômeno conhecido como <strong>inflação</strong> — a sua moeda perde valor. Se o seu salário não cresce na mesma velocidade que a inflação, você fica "mais pobre", mesmo recebendo o mesmo valor nominal.
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
                            <AlertCircle className="w-6 h-6 text-emerald-500" />
                            Como a Inflação "Come" seu Salário
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                O principal vilão do seu bolso no Brasil é o <strong>IPCA</strong> (Índice Nacional de Preços ao Consumidor Amplo), medido pelo IBGE. Ele rastreia o aumento de preços de uma cesta de produtos e serviços.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-2 text-white">Ano</th>
                                            <th className="p-2 text-white">Valor Nominal</th>
                                            <th className="p-2 text-white">Equivalente Hoje</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400">
                                        <tr className="border-b border-white/5">
                                            <td className="p-2">1994</td>
                                            <td className="p-2">R$ 100,00</td>
                                            <td className="p-2 font-bold text-red-400">R$ 820,00+</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-2">2010</td>
                                            <td className="p-2">R$ 100,00</td>
                                            <td className="p-2 font-bold text-red-400">R$ 250,00+</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2">2024</td>
                                            <td className="p-2">R$ 100,00</td>
                                            <td className="p-2 font-bold text-emerald-400">R$ 100,00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm">
                                Para não perder dinheiro, é vital que seus rendimentos sejam corrigidos acima desses índices. Entender isso é o primeiro passo antes de planejar seus <Link to="/calculadoras/investimentos" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">investimentos</Link> de longo prazo.
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
                        <Shield className="w-6 h-6 text-emerald-500" />
                        3 Formas de Proteger seu Poder de Compra
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <TrendingUp className="w-8 h-8 text-emerald-500 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Invista em Ativos Reais</h3>
                            <p className="text-sm text-gray-400">
                                Deixar dinheiro parado na conta corrente é prejuízo certo. Busque investimentos atrelados à inflação (Tesouro IPCA+, Fundos Imobiliários ou Ações). Use nossa calculadora de <Link to="/calculadoras/juros-compostos" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">juros compostos</Link> para simular o crescimento real.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <DollarSign className="w-8 h-8 text-emerald-500 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Negocie seu Salário</h3>
                            <p className="text-sm text-gray-400">
                                Use os dados desta calculadora na sua avaliação de desempenho. Mostre ao seu chefe que um reajuste abaixo da inflação é, na prática, uma redução salarial.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <AlertCircle className="w-8 h-8 text-emerald-500 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Monitore seus Gastos</h3>
                            <p className="text-sm text-gray-400">
                                Às vezes a "inflação pessoal" é maior que a oficial. Se você gasta muito com educação ou saúde, setores que costumam subir acima da média, seu poder de compra cai mais rápido.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <FAQ
                    items={INFLATION_FAQS}
                    title="Perguntas Frequentes sobre Inflação (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
