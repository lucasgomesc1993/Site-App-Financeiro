import React, { useState, useEffect } from 'react';
import { TrendingUp, Calculator, LineChart, ArrowRight, Info, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const INVESTMENT_FAQS: FAQItem[] = [
    {
        question: "Quanto rende R$ 1.000,00 investidos hoje?",
        answer: "O rendimento depende da taxa contratada. Em um cenário de Renda Fixa pagando 100% do CDI (com a Selic próxima a 10,75% ou mais), R$ 1.000,00 renderiam aproximadamente R$ 107,50 brutos em um ano. Lembre-se que há desconto de Imposto de Renda sobre o lucro, que varia de 22,5% a 15% dependendo do prazo."
    },
    {
        question: "Qual a diferença entre CDB e LCI/LCA?",
        answer: "A principal diferença é a tributação. O CDB (Certificado de Depósito Bancário) tem incidência de Imposto de Renda, enquanto as LCIs (Letras de Crédito Imobiliário) e LCAs (Letras de Crédito do Agronegócio) são isentas de IR para pessoas físicas. Por isso, uma LCI que rende 90% do CDI pode valer mais a pena que um CDB que rende 110% do CDI, dependendo do prazo."
    },
    {
        question: "Onde investir meu dinheiro com segurança em 2025?",
        answer: "Os investimentos mais seguros do Brasil são os títulos do Tesouro Direto (garantidos pelo Governo Federal) e produtos bancários como CDBs, LCIs e LCAs que contam com a proteção do FGC (Fundo Garantidor de Créditos) até o limite de R$ 250 mil por CPF e por instituição."
    },
    {
        question: "Como calcular o rendimento mensal de um investimento?",
        answer: "Para transformar uma taxa anual em mensal de forma simples (juros compostos), a conta não é apenas dividir por 12. A fórmula correta é: (1 + taxa anual)^(1/12) - 1. Porém, para estimativas rápidas em nossa calculadora, você pode focar na taxa anual, que é o padrão do mercado financeiro."
    },
    {
        question: "Vale a pena investir pouco dinheiro por mês?",
        answer: "Sim, absolutamente. O fator \"tempo\" é mais poderoso que o fator \"dinheiro\". Começar com R$ 100,00 hoje é infinitamente melhor do que esperar ter R$ 1.000,00 daqui a cinco anos. Use a calculadora para ver como pequenos aportes, somados à disciplina, criam grandes patrimônios."
    }
];

export function InvestmentPage() {
    const [initialAmount, setInitialAmount] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [years, setYears] = useState('');
    const [rate, setRate] = useState('');
    const [result, setResult] = useState<{ totalInvested: number; totalInterest: number; totalAmount: number } | null>(null);

    const calculate = () => {
        const p = parseFloat(initialAmount.replace(/\./g, '').replace(',', '.'));
        const pmt = parseFloat(monthlyContribution.replace(/\./g, '').replace(',', '.'));
        const t = parseInt(years);
        const r = parseFloat(rate.replace(',', '.'));

        if (isNaN(p) || isNaN(pmt) || isNaN(t) || isNaN(r) || t === 0) {
            setResult(null);
            return;
        }

        const months = t * 12;
        const i = r / 100 / 12; // Monthly rate

        // Future Value of Initial Amount
        const fvInitial = p * Math.pow(1 + i, months);

        // Future Value of Monthly Contributions
        const fvContributions = pmt * (Math.pow(1 + i, months) - 1) / i;

        const totalAmount = fvInitial + fvContributions;
        const totalInvested = p + (pmt * months);
        const totalInterest = totalAmount - totalInvested;

        setResult({
            totalInvested,
            totalInterest,
            totalAmount
        });
    };

    useEffect(() => {
        calculate();
    }, [initialAmount, monthlyContribution, years, rate]);

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
        "name": "Calculadora de Investimentos",
        "description": "Descubra quanto seu dinheiro pode render. Use nossa Calculadora de Investimentos gratuita para simular juros compostos, aportes mensais e planejar sua liberdade financeira.",
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
                title="Calculadora de Investimentos: Simule Rendimentos e Juros Reais"
                description="Descubra quanto seu dinheiro pode render. Use nossa Calculadora de Investimentos gratuita para simular juros compostos, aportes mensais e planejar sua liberdade financeira."
                canonical="/calculadoras/investimentos"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": INVESTMENT_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de Investimentos', href: '/calculadoras/investimentos' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">Investimentos</span>
                        </h1>
                        <div className="max-w-3xl mx-auto text-lg text-gray-400 space-y-4">
                            <p>
                                Você já parou para pensar que o dinheiro parado na conta corrente está, na verdade, encolhendo por causa da inflação? <strong className="text-gray-200">Investir não é apenas para quem tem muito dinheiro</strong>, é a única forma comprovada de proteger seu patrimônio e garantir um futuro tranquilo.
                            </p>
                            <p>
                                Nossa <strong className="text-gray-200">Calculadora de Investimentos</strong> foi projetada para eliminar o "achismo". Com ela, você visualiza exatamente o poder dos juros compostos trabalhando a seu favor ao longo do tempo. Seja para comprar um imóvel, planejar a aposentadoria ou alcançar o <Link to="/calculadoras/primeiro-milhao" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 transition-colors">primeiro milhão</Link>, a matemática financeira é sua maior aliada.
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
                                    Simular Rendimento
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Valor Inicial</label>
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

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Taxa de Juros Anual (%)</label>
                                        <input
                                            type="text"
                                            value={rate}
                                            onChange={(e) => handleNumberInput(e.target.value, setRate)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="Ex: 10,5"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Prazo (Anos)</label>
                                        <input
                                            type="text"
                                            value={years}
                                            onChange={(e) => handleNumberInput(e.target.value, setYears)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="Ex: 10"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">Valor Total Acumulado</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Total Investido</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Total em Juros</span>
                                            <span className="text-xl font-bold text-emerald-400">
                                                {result ? `+ R$ ${result.totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar Info - How to use */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                                <Info className="w-5 h-5 text-emerald-500" />
                                Como usar o simulador
                            </h2>
                            <div className="space-y-6 text-gray-400">
                                <p>Para obter um resultado preciso, você precisa preencher os campos com dados realistas. Veja o que cada um significa:</p>

                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Valor Inicial</strong>
                                            O montante que você já tem guardado hoje. Se for começar do zero, basta deixar zerado.
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Valor Mensal</strong>
                                            Quanto você consegue poupar do seu <Link to="/calculadoras/salario-liquido" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">salário líquido</Link> para investir todos os meses. A constância aqui é mais importante que a quantia.
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Taxa de Juros Anual</strong>
                                            A rentabilidade esperada. Em cenários de Selic alta, investimentos de Renda Fixa podem oferecer entre 10% a 13% ao ano. Para projeções conservadoras de longo prazo, utilize entre 6% e 8% acima da inflação.
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Período (Anos)</strong>
                                            O tempo que o dinheiro ficará rendendo.
                                        </div>
                                    </li>
                                </ul>

                                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                    <strong className="text-emerald-400 block mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        Dica de Especialista
                                    </strong>
                                    <p className="text-sm text-emerald-100/80">
                                        Se você tem dúvidas sobre quanto separar do seu orçamento, utilize a <Link to="/calculadoras/regra-50-30-20" className="text-white hover:underline">Regra 50-30-20</Link> para definir o valor ideal dos seus aportes mensais antes de simular.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Additional Content */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <LineChart className="w-6 h-6 text-emerald-500" />
                            A Mágica dos Juros Compostos
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                Albert Einstein supostamente chamou os juros compostos de "a oitava maravilha do mundo". Exageros à parte, o conceito é sólido: você ganha juros sobre o dinheiro que investiu <strong className="text-gray-200">e também sobre os juros que esse dinheiro já rendeu</strong>.
                            </p>
                            <p>
                                É o famoso "juros sobre juros". No curto prazo, a diferença parece pequena. Mas, após 10 ou 20 anos, a curva de crescimento se torna exponencial. É nesse ponto que sua renda passiva pode superar seu salário do trabalho.
                            </p>
                            <p>
                                Para entender a matemática detalhada por trás dessa multiplicação, acesse nossa explicação completa sobre <Link to="/calculadoras/juros-compostos" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">juros compostos</Link>.
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
                            Taxa Nominal vs. Taxa Real
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                Um erro comum ao usar simuladores é esquecer a inflação.
                            </p>
                            <ul className="space-y-2">
                                <li>
                                    <strong className="text-white">Taxa Nominal:</strong> É o número que você vê na corretora (ex: CDB rendendo 12% ao ano).
                                </li>
                                <li>
                                    <strong className="text-white">Taxa Real:</strong> É quanto seu dinheiro cresceu de verdade, descontando a inflação (IPCA).
                                </li>
                            </ul>
                            <p>
                                Se o seu investimento rende 12% e a inflação foi de 5%, seu ganho real é de aproximadamente 7%. Ao fazer simulações para prazos muito longos (como 20 ou 30 anos), prefira usar uma <strong className="text-gray-200">taxa de juros real</strong> (ex: 5% ou 6%) para ter uma noção mais fiel do poder de compra futuro do seu dinheiro.
                            </p>
                            <p>
                                Você pode ler mais análises profundas sobre o mercado em nosso <Link to="/blog/investimentos" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">blog sobre investimentos</Link>.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={INVESTMENT_FAQS}
                    title="Perguntas Frequentes sobre Investimentos (FAQs)"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
