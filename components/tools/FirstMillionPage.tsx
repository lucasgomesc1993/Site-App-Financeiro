import React, { useState, useEffect } from 'react';
import { Gem, Calculator, HelpCircle, TrendingUp, ArrowRight, Info, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const MILLION_FAQS: FAQItem[] = [
    {
        question: "Quanto preciso investir para ter 1 milhão em 5 anos?",
        answer: "Para atingir R$ 1.000.000,00 em apenas 60 meses (5 anos), partindo do zero, você precisaria de uma disciplina de aporte agressiva. Considerando uma rentabilidade líquida otimista de 1% ao mês, o aporte necessário seria de aproximadamente R$ 12.250,00 mensais. Se você já tiver um capital inicial de R$ 100.000,00, esse valor cai para cerca de R$ 9.800,00 por mês."
    },
    {
        question: "Quanto rende 1 milhão de reais hoje?",
        answer: "Com a Selic acima de dois dígitos, investimentos seguros atrelados ao CDI rendem entre R$ 10.500,00 e R$ 11.000,00 líquidos por mês. Já a poupança, que rende apenas 0,5% + TR, entregaria cerca de R$ 6.000,00, perdendo para a inflação e corroendo seu Poder de Compra ao longo do tempo."
    },
    {
        question: "Juntar 1 milhão garante a aposentadoria?",
        answer: "Não necessariamente. Devido à inflação, 1 milhão hoje compra menos do que há 10 anos. O segredo é focar na renda passiva que esse montante gera. Se seus gastos mensais são de R$ 8.000,00, um milhão bem investido cobre suas despesas. Porém, é crucial continuar reinvestindo parte dos lucros para proteger o principal contra a desvalorização da moeda."
    },
    {
        question: "Posso usar o FGTS para acelerar o processo?",
        answer: "Você não pode investir o FGTS diretamente em ações ou Tesouro Direto, mas pode usá-lo estrategicamente. A melhor tática é utilizar o saldo para amortizar financiamentos imobiliários ou dar entrada em imóveis. Isso elimina dívidas de longo prazo e libera o fluxo de caixa do seu salário (que antes pagava a parcela) para ser direcionado a investimentos de alta rentabilidade."
    },
    {
        question: "Qual o melhor investimento para quem está começando?",
        answer: "Para quem busca o primeiro milhão, a consistência vence a complexidade. Comece pelo básico que funciona: Tesouro IPCA+ (para garantir juros reais acima da inflação) e ETFs de índices amplos. Evite arriscar tudo em ativos voláteis no início; a preservação do capital é vital para que os juros compostos façam seu trabalho nas primeiras fases da acumulação."
    }
];

export function FirstMillionPage() {
    const [initialAmount, setInitialAmount] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [result, setResult] = useState<{ months: number; years: number } | null>(null);

    const calculate = () => {
        const p = parseFloat(initialAmount.replace(/\./g, '').replace(',', '.'));
        const pmt = parseFloat(monthlyContribution.replace(/\./g, '').replace(',', '.'));
        const r = parseFloat(interestRate.replace(',', '.'));

        if (isNaN(p) || isNaN(pmt) || isNaN(r) || r === 0) {
            setResult(null);
            return;
        }

        const target = 1000000;
        const i = r / 100 / 12; // Monthly rate

        // Formula for n (months) to reach Future Value (FV):
        // FV = PV * (1+i)^n + PMT * ((1+i)^n - 1) / i
        // Solving for n:
        // n = ln((FV * i + PMT) / (PV * i + PMT)) / ln(1 + i)

        const numerator = target * i + pmt;
        const denominator = p * i + pmt;

        if (denominator <= 0) {
            setResult(null); // Impossible if denominator is 0 or negative (though unlikely with positive inputs)
            return;
        }

        const months = Math.log(numerator / denominator) / Math.log(1 + i);

        setResult({
            months: Math.ceil(months),
            years: months / 12
        });
    };

    useEffect(() => {
        calculate();
    }, [initialAmount, monthlyContribution, interestRate]);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

    const handleNumberInput = (value: string, setter: (value: string) => void) => {
        if (/^[\d.,]*$/.test(value)) {
            setter(value);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora do Primeiro Milhão: Simule o Tempo Exato para Enriquecer",
        "description": "Quanto tempo falta para o seu primeiro milhão? Simule agora com base em seus aportes mensais e juros compostos. Descubra a matemática da riqueza.",
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
                title="Calculadora do Primeiro Milhão: Simule o Tempo Exato para Enriquecer"
                description="Quanto tempo falta para o seu primeiro milhão? Simule agora com base em seus aportes mensais e juros compostos. Descubra a matemática da riqueza."
                canonical="/calculadoras/primeiro-milhao"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": MILLION_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Primeiro Milhão', href: '/calculadoras/primeiro-milhao' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Gem className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora do <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-yellow-500">Primeiro Milhão</span>
                        </h1>
                        <div className="max-w-3xl mx-auto text-lg text-gray-400 space-y-4">
                            <p>
                                A <strong>Calculadora do Primeiro Milhão</strong> é uma ferramenta que projeta o tempo exato para atingir R$ 1 milhão com base em juros compostos e aportes mensais. Esta simulação utiliza a fórmula de valor futuro (FV) para calcular o crescimento exponencial do patrimônio, mostrando o impacto real do tempo sobre o dinheiro investido.
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
                                    Simular Tempo
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Quanto você já tem?</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={initialAmount}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setInitialAmount)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Aporte Mensal</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={monthlyContribution}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setMonthlyContribution)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Rentabilidade Anual Esperada (%)</label>
                                    <input
                                        type="text"
                                        value={interestRate}
                                        onChange={(e) => handleNumberInput(e.target.value, setInterestRate)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        placeholder="Ex: 10"
                                    />
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">Tempo até o Milhão</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `${result.years.toFixed(1)} anos` : '---'}
                                        </span>
                                        {result && (
                                            <p className="text-xs text-gray-400 mt-2">
                                                ou {result.months} meses de disciplina.
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
                                A Matemática por trás do Milhão
                            </h3>
                            <div className="space-y-6 text-gray-400">
                                <p>
                                    Os <Link to="/calculadoras/juros-compostos" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Juros Compostos</Link> são o motor dessa aceleração. Tecnicamente, a fórmula exponencial atua sobre o tempo e os aportes de forma que, após o "Ponto de Virada" (<em>Tipping Point</em>), os rendimentos dos seus ativos superam o valor do seu próprio trabalho mensal.
                                </p>
                                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                    <strong className="text-emerald-400 block mb-2 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" />
                                        Os 3 Pilares da Aceleração
                                    </strong>
                                    <ul className="space-y-2 text-sm text-emerald-100/80">
                                        <li>• <strong>Aporte Mensal:</strong> O valor "novo" que você injeta na carteira todo mês.</li>
                                        <li>• <strong>Tempo:</strong> O período de maturação. Começar 5 anos antes pode reduzir seu esforço pela metade.</li>
                                        <li>• <strong>Rentabilidade:</strong> A taxa de retorno dos seus <Link to="/calculadoras/investimentos" className="text-white hover:underline">melhores investimentos atuais</Link>.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Additional Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-24"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Simulação: Quanto tempo demora para juntar 1 milhão?</h2>
                    <p className="text-gray-400 text-center max-w-3xl mx-auto mb-8">
                        A tabela abaixo simula cenários reais considerando uma rentabilidade média realista de <strong>10% ao ano</strong> (já descontando a inflação média do IPCA).
                    </p>
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            Nota Técnica: Os valores apresentados são estimados considerando a incidência de imposto de renda regressivo no resgate final.
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="p-4 text-white font-semibold">Aporte Mensal</th>
                                    <th className="p-4 text-white font-semibold">Tempo Estimado (Anos)</th>
                                    <th className="p-4 text-white font-semibold">Juros Acumulados (Aprox.)</th>
                                    <th className="p-4 text-white font-semibold">Impacto dos Juros</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400">
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">R$ 500,00</td>
                                    <td className="p-4">32 anos</td>
                                    <td className="p-4 text-emerald-400">R$ 808.000</td>
                                    <td className="p-4">80% do total</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">R$ 1.000,00</td>
                                    <td className="p-4">25 anos</td>
                                    <td className="p-4 text-emerald-400">R$ 700.000</td>
                                    <td className="p-4">70% do total</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">R$ 2.000,00</td>
                                    <td className="p-4">19 anos</td>
                                    <td className="p-4 text-emerald-400">R$ 544.000</td>
                                    <td className="p-4">54% do total</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">R$ 5.000,00</td>
                                    <td className="p-4">11 anos</td>
                                    <td className="p-4 text-emerald-400">R$ 340.000</td>
                                    <td className="p-4">34% do total</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">R$ 10.000,00</td>
                                    <td className="p-4">7 anos</td>
                                    <td className="p-4 text-emerald-400">R$ 160.000</td>
                                    <td className="p-4">16% do total</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 text-center text-gray-400 space-y-4">
                        <p>
                            Para viabilizar esses aportes sem comprometer seu custo de vida atual, utilize a <Link to="/calculadoras/regra-50-30-20" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Regra 50-30-20</Link> para organizar seu orçamento doméstico antes de começar a investir.
                        </p>
                        <div className="pt-8 border-t border-white/5">
                            <p className="text-lg font-semibold text-white mb-2">Quer saber quando você poderá parar de trabalhar definitivamente?</p>
                            <p>
                                Calcule agora sua "aposentadoria antecipada" com nossa <Link to="/calculadoras/fire" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Calculadora FIRE (Financial Independence, Retire Early)</Link> e descubra seu número mágico.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <FAQ
                    items={MILLION_FAQS}
                    title="Perguntas Frequentes sobre o Primeiro Milhão"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
