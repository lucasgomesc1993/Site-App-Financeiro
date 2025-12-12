import React, { useState, useEffect } from 'react';
import { Flame, Calculator, TrendingUp, ArrowRight, Info, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const FIRE_FAQS: FAQItem[] = [
    {
        question: "Quanto dinheiro preciso para viver de renda no Brasil?",
        answer: "Você precisa de aproximadamente 300 vezes o seu custo mensal. Se você gasta R$ 4.000 mensais, precisará de R$ 1.200.000 investidos. Esse cálculo considera uma retirada segura de 4% ao ano. Se seus investimentos renderem mais que a inflação de forma consistente, esse valor pode ser menor."
    },
    {
        question: "A regra dos 4% funciona no Brasil?",
        answer: "Sim, e pode ser até mais eficiente. Nos EUA, a regra depende muito do mercado de ações. No Brasil, devido às altas taxas de juros na Renda Fixa (como o Tesouro IPCA+), é possível construir carteiras mais seguras com rentabilidade real acima de 5%, o que favorece o aposentado brasileiro."
    },
    {
        question: "Onde devo investir para atingir o FIRE?",
        answer: "A diversificação é chave. Uma carteira FIRE típica no Brasil combina Renda Fixa atrelada à inflação (para garantir poder de compra e segurança) e Renda Variável (Ações e Fundos Imobiliários) para crescimento patrimonial. Evite a poupança, pois ela perde para a inflação."
    },
    {
        question: "Preciso ter um salário alto para ser FIRE?",
        answer: "Não. O fator mais importante é a taxa de poupança, não o valor absoluto do salário. Alguém que ganha R$ 5.000 e poupa 50% (vivendo com R$ 2.500) atingirá a independência financeira mais rápido do que alguém que ganha R$ 20.000 mas gasta tudo o que recebe."
    },
    {
        question: "O que é Taxa de Retirada Segura (SWR)?",
        answer: "É a porcentagem do seu patrimônio que você pode sacar anualmente para pagar suas contas sem esgotar seu dinheiro antes de morrer. A taxa padrão é 4%, mas deve ser ajustada conforme a realidade econômica e sua expectativa de vida."
    },
    {
        question: "Devo considerar a inflação no cálculo?",
        answer: "Sim. A nossa calculadora considera a taxa de juros real (rentabilidade menos inflação). Se você projetar ganhos nominais sem descontar a inflação, terá uma falsa sensação de riqueza, mas seu dinheiro comprará menos no futuro."
    }
];

export function FIREPage() {
    const [monthlyExpense, setMonthlyExpense] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [annualReturn, setAnnualReturn] = useState('5'); // Default 5% real return for Brazil context
    const [result, setResult] = useState<{ fireNumber: number; yearsToFire: number } | null>(null);

    const calculate = () => {
        const expense = parseFloat(monthlyExpense.replace(/\./g, '').replace(',', '.'));
        const savings = parseFloat(currentSavings.replace(/\./g, '').replace(',', '.'));
        const contribution = parseFloat(monthlyContribution.replace(/\./g, '').replace(',', '.'));
        const rate = parseFloat(annualReturn.replace(',', '.'));

        if (isNaN(expense) || isNaN(savings) || isNaN(contribution) || isNaN(rate) || expense === 0) {
            setResult(null);
            return;
        }

        // FIRE Number = Annual Expense / Safe Withdrawal Rate (4% or 0.04)
        // Which is equivalent to Monthly Expense * 300 (25 years * 12 months)
        const fireNumber = expense * 300;

        // Calculate time to reach FIRE Number
        // FV = PV * (1+r)^t + PMT * ((1+r)^t - 1) / r
        // We need to solve for t. This requires a logarithm.
        // Let r be monthly rate
        const r = Math.pow(1 + rate / 100, 1 / 12) - 1;

        // Formula for n (months):
        // n = ln((FV * r + PMT) / (PV * r + PMT)) / ln(1 + r)

        const numerator = fireNumber * r + contribution;
        const denominator = savings * r + contribution;

        let months = 0;
        if (denominator > 0) {
            months = Math.log(numerator / denominator) / Math.log(1 + r);
        }

        setResult({
            fireNumber,
            yearsToFire: Math.max(0, months / 12)
        });
    };

    useEffect(() => {
        calculate();
    }, [monthlyExpense, currentSavings, monthlyContribution, annualReturn]);

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
        "name": "Calculadora FIRE: Quando Você Vai Atingir a Independência Financeira?",
        "description": "Descubra o valor exato para parar de trabalhar. Use nossa Calculadora FIRE gratuita, entenda a Regra dos 4% e planeje sua aposentadoria antecipada.",
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
                title="Calculadora FIRE: Quando Você Vai Atingir a Independência Financeira?"
                description="Descubra o valor exato para parar de trabalhar. Use nossa Calculadora FIRE gratuita, entenda a Regra dos 4% e planeje sua aposentadoria antecipada."
                canonical="/calculadoras/fire"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": FIRE_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora FIRE', href: '/calculadoras/fire' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Flame className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-orange-500">FIRE</span>: Planeje sua Independência Financeira
                        </h1>
                        <div className="max-w-3xl mx-auto text-lg text-gray-400 space-y-4 hidden">
                            {/* Description moved below calculator */}
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
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full min-h-[600px]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-emerald-500" />
                                    Calcular Liberdade
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Despesas Mensais (Gasto Desejado)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={monthlyExpense}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setMonthlyExpense)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Quanto você gasta para viver? (Seja realista, inclua lazer e saúde).</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Patrimônio Atual</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={currentSavings}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setCurrentSavings)}
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
                                                inputMode="decimal"
                                                value={monthlyContribution}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setMonthlyContribution)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Taxa de Juros Anual (Real) %</label>
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={annualReturn}
                                        onChange={(e) => handleNumberInput(e.target.value, setAnnualReturn)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        placeholder="Ex: 5"
                                    />
                                    <p className="text-xs text-gray-500">Quanto seus investimentos rendem <strong>acima da inflação</strong>. No Brasil, 4% a 6% é conservador.</p>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4">
                                        <span className="text-sm text-emerald-400 block mb-2">Seu Número FIRE (Patrimônio Necessário)</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.fireNumber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                        <span className="text-xs text-gray-400 block mb-1">Tempo Estimado para Liberdade</span>
                                        <span className="text-2xl font-bold text-white">
                                            {result ? `${result.yearsToFire.toFixed(1)} anos` : '---'}
                                        </span>
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
                                Como Usar a Calculadora
                            </h2>
                            <div className="space-y-6 text-gray-400">
                                <p>Preencha os campos abaixo com dados reais da sua vida financeira:</p>

                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Despesas Mensais</strong>
                                            Quanto você gasta para viver? (Seja realista, inclua lazer e saúde).
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Patrimônio Atual</strong>
                                            Quanto você já tem investido hoje.
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Aporte Mensal</strong>
                                            Quanto você consegue guardar e investir todo mês. Se você usa a <Link to="/calculadoras/regra-50-30-20" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">regra 50-30-20</Link>, este valor deve ser, no mínimo, 20% da sua renda.
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block">Taxa de Juros Anual (Real)</strong>
                                            Quanto seus investimentos rendem <strong>acima da inflação</strong>. No Brasil, uma estimativa conservadora para o longo prazo gira em torno de 4% a 6% ao ano.
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-3xl mx-auto text-lg text-gray-400 space-y-4 mb-16">
                    <p>
                        Você já imaginou não depender mais do seu salário para pagar as contas? Isso não é apenas um sonho, é uma estratégia matemática chamada <strong className="text-gray-200">FIRE (Financial Independence, Retire Early)</strong>.
                    </p>
                    <p>
                        Ao contrário da aposentadoria tradicional, onde você espera até os 65 anos, o movimento FIRE foca na acumulação agressiva de patrimônio para que você possa viver de renda muito antes disso — seja aos 40, 50 ou até 30 anos.
                    </p>
                    <p>
                        Esta calculadora faz as contas complexas para você. Descubra exatamente quanto dinheiro você precisa acumular (seu "Número Mágico") e em quanto tempo alcançará sua liberdade.
                    </p>
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
                            <Flame className="w-6 h-6 text-orange-500" />
                            O Que é o Movimento FIRE?
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                FIRE é a sigla em inglês para <em>Independência Financeira, Aposentadoria Antecipada</em>. A premissa é simples: gastar muito menos do que ganha e investir a diferença com sabedoria até que os rendimentos dos seus investimentos cubram 100% das suas despesas anuais.
                            </p>
                            <p>
                                Existem variações do movimento, dependendo do seu estilo de vida:
                            </p>
                            <ul className="space-y-2 list-disc pl-5">
                                <li><strong className="text-white">Lean FIRE:</strong> Ideal para quem busca uma vida frugal e custos baixos. O foco aqui é o minimalismo extremo para atingir a liberdade o mais rápido possível com um patrimônio menor.</li>
                                <li><strong className="text-white">Fat FIRE:</strong> Para quem deseja manter um alto padrão de vida na aposentadoria. Exige um patrimônio acumulado significativamente maior para cobrir luxos e viagens frequentes.</li>
                                <li><strong className="text-white">Barista FIRE:</strong> Para quem atinge a independência parcial. Você já tem patrimônio suficiente para cobrir o básico, mas continua trabalhando meio período (como barista, por exemplo) apenas para cobrir custos extras, benefícios de saúde ou simplesmente por prazer social.</li>
                            </ul>
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
                            <TrendingUp className="w-6 h-6 text-emerald-500" />
                            A Regra dos 4%
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                A <strong>Regra dos 4%</strong> é uma estratégia de retirada segura que estipula que você pode sacar 4% do seu patrimônio investido anualmente sem que o dinheiro acabe em 30 anos. Originada do Estudo da Universidade Trinity, a lógica define que você precisa acumular <strong>25 vezes o seu custo anual</strong>.
                            </p>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <strong className="text-white block mb-2">Exemplo Prático:</strong>
                                <p className="text-sm">
                                    Se você gasta <strong>R$ 5.000,00 por mês</strong>, seu custo anual é de R$ 60.000,00.
                                    <br />
                                    Cálculo: R$ 60.000 x 25 = R$ 1.500.000.
                                    <br />
                                    Seu objetivo de patrimônio é <strong>1,5 milhão de reais</strong>.
                                </p>
                            </div>
                            <div className="flex gap-2 items-start text-sm text-emerald-400/80">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <p>
                                    <strong>Nota para o Brasil:</strong> No cenário brasileiro, temos uma vantagem histórica de juros reais altos. Estudos locais sugerem que, com uma carteira focada em <Link to="/blog/investimentos" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Renda Fixa</Link>, a taxa de retirada segura pode chegar a <strong>5%</strong>, acelerando sua jornada.
                                </p>
                            </div>
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
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Acelerando Sua Jornada</h2>
                    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
                        O segredo para atingir o FIRE não é apenas ganhar mais, mas sim aumentar sua <strong className="text-gray-200">taxa de poupança</strong>.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="p-4 text-white font-semibold">Taxa de Poupança</th>
                                    <th className="p-4 text-white font-semibold">Anos para se Aposentar (aprox.)</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400">
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">10%</td>
                                    <td className="p-4">51 anos</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">20%</td>
                                    <td className="p-4">37 anos</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">50%</td>
                                    <td className="p-4">17 anos</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">70%</td>
                                    <td className="p-4">8,5 anos</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-gray-500 mt-4 text-center">Considerando retorno real de 5% a.a. partindo do zero.</p>

                    <div className="mt-8 text-center text-gray-400">
                        <p>
                            Se você está começando agora, utilize nossa ferramenta do <Link to="/calculadoras/primeiro-milhao" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">primeiro milhão</Link> para traçar metas intermediárias. Lembre-se também de proteger seu patrimônio da inflação para manter seu <Link to="/calculadoras/poder-de-compra" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">poder de compra</Link> ao longo das décadas.
                        </p>
                        <p className="mt-4">
                            O efeito dos <Link to="/calculadoras/juros-compostos" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">juros compostos</Link> é o motor do FIRE. Quanto mais cedo você começar, menos esforço terá que fazer.
                        </p>
                    </div>
                </motion.div>

                <FAQ
                    items={FIRE_FAQS}
                    title="Perguntas Frequentes (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
