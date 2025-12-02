import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, Award, Coins } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const PLR_FAQS: FAQItem[] = [
    {
        question: "PLR sofre desconto de INSS?",
        answer: "Não! Essa é a grande vantagem. Sobre a Participação nos Lucros não incide INSS e nem FGTS. O único desconto possível é o Imposto de Renda (se o valor ultrapassar a faixa de isenção) e a pensão alimentícia (se houver determinação judicial)."
    },
    {
        question: "Quem tem direito a receber PLR?",
        answer: "A PLR não é um direito obrigatório para todas as empresas. Ela depende de negociação coletiva entre a empresa, uma comissão de empregados e o sindicato da categoria. Se estiver prevista em acordo, o pagamento é obrigatório mediante o cumprimento das metas."
    },
    {
        question: "Como funciona a PLR na Rescisão?",
        answer: "Se você sair da empresa antes do pagamento da PLR, tem direito a receber o valor proporcional aos meses trabalhados no ano, desde que as metas da empresa tenham sido atingidas."
    },
    {
        question: "Posso restituir esse imposto na Declaração Anual?",
        answer: "Como a tributação é \"exclusiva na fonte\" e definitiva, o valor pago de imposto sobre a PLR geralmente não pode ser restituído na Declaração de Ajuste Anual, nem usado para abater outros impostos. Ele é declarado em uma ficha separada."
    }
];

export const PLRPage: React.FC = () => {
    const [plrValue, setPlrValue] = useState<number>(0);
    const [alimony, setAlimony] = useState<number>(0);
    const [previousPlr, setPreviousPlr] = useState<number>(0);
    const [previousTaxPaid, setPreviousTaxPaid] = useState<number>(0);
    const [result, setResult] = useState<any>(null);

    const calculatePLR = () => {
        if (!plrValue) return;

        // 1. Calculate Base for Tax
        // PLR taxation is cumulative within the tax year.
        const totalPlrReceived = plrValue + previousPlr;
        const taxBase = totalPlrReceived - alimony;

        // 2. Apply Exclusive PLR Table (2024/2025 values)
        let totalTax = 0;

        if (taxBase <= 7640.80) {
            totalTax = 0;
        } else if (taxBase <= 9922.28) {
            totalTax = (taxBase * 0.075) - 573.06;
        } else if (taxBase <= 13196.31) {
            totalTax = (taxBase * 0.15) - 1317.23;
        } else if (taxBase <= 16380.38) {
            totalTax = (taxBase * 0.225) - 2306.95;
        } else {
            totalTax = (taxBase * 0.275) - 3125.97;
        }

        // Ensure tax is not negative
        totalTax = Math.max(0, totalTax);

        // 3. Subtract Tax Already Paid
        const taxDueNow = Math.max(0, totalTax - previousTaxPaid);

        // 4. Net Value
        const netValue = plrValue - taxDueNow;

        // Determine effective rate
        const effectiveRate = (taxDueNow / plrValue) * 100;

        setResult({
            grossPlr: plrValue,
            taxBase,
            totalTax,
            taxDueNow,
            netValue,
            effectiveRate,
            previousPlr,
            previousTaxPaid
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de PLR e IRRF 2025",
        "description": "Vai receber a bolada? Simule o desconto do Imposto de Renda sobre a sua PLR e descubra o valor líquido que cairá na conta.",
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
                title="Calculadora de PLR e IRRF 2025 - Simule seu Valor Líquido"
                description="Vai receber PLR? Calcule o desconto do Imposto de Renda com a tabela exclusiva de 2025. Saiba quanto sobra líquido na sua conta."
                canonical="/calculadoras/plr"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": PLR_FAQS.map(faq => ({
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
                        { label: 'PLR', href: '/calculadoras/plr' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Award className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Benefícios Corporativos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">PLR e IRRF</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Vai receber a bolada? Simule o desconto do Imposto de Renda sobre a sua PLR e descubra o valor líquido que cairá na conta.
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
                                Dados do Recebimento
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="plrValue" className="block text-sm text-gray-400 mb-2">Valor da PLR a Receber (Bruto)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="plrValue"
                                            type="number"
                                            placeholder="Ex: 15000"
                                            value={plrValue || ''}
                                            onChange={(e) => setPlrValue(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="alimony" className="block text-sm text-gray-400 mb-2">Pensão Alimentícia (Se houver)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="alimony"
                                            type="number"
                                            placeholder="Ex: 0"
                                            value={alimony || ''}
                                            onChange={(e) => setAlimony(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-sm text-gray-400 mb-4 font-medium">Pagamentos Anteriores (Mesmo Ano)</p>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label htmlFor="previousPlr" className="block text-xs text-gray-500 mb-2">Valor Já Recebido (1ª Parcela)</label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                                                <input
                                                    id="previousPlr"
                                                    type="number"
                                                    placeholder="Ex: 0"
                                                    value={previousPlr || ''}
                                                    onChange={(e) => setPreviousPlr(Number(e.target.value))}
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-2 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="previousTax" className="block text-xs text-gray-500 mb-2">IRRF Já Descontado</label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                                                <input
                                                    id="previousTax"
                                                    type="number"
                                                    placeholder="Ex: 0"
                                                    value={previousTaxPaid || ''}
                                                    onChange={(e) => setPreviousTaxPaid(Number(e.target.value))}
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-2 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculatePLR}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Calcular Líquido
                                    </button>
                                    <button
                                        onClick={() => {
                                            setPlrValue(0);
                                            setAlimony(0);
                                            setPreviousPlr(0);
                                            setPreviousTaxPaid(0);
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
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Valor Líquido a Receber</h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {formatCurrency(result.netValue)}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Após desconto do IRRF
                                            </p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Valor Bruto (Atual)</span>
                                                    <span className="text-xs text-gray-500">Valor a ser pago agora</span>
                                                </div>
                                                <span className="text-white font-bold">{formatCurrency(result.grossPlr)}</span>
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-gray-300">Base de Cálculo Total</span>
                                                    <span className="text-xs text-gray-500">Soma PLR Anual - Pensão</span>
                                                </div>
                                                <span className="text-white font-bold">{formatCurrency(result.taxBase)}</span>
                                            </div>

                                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-red-400 font-bold">IRRF Retido</span>
                                                    <span className="text-xs text-gray-400">Imposto a pagar nesta parcela</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-white font-bold text-xl">-{formatCurrency(result.taxDueNow)}</span>
                                                    <span className="text-xs text-gray-500">Alíquota Efetiva: {result.effectiveRate.toFixed(2)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Award className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para simular o desconto da PLR</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg"
                >
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O que é a PLR e como ela é tributada?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                A Participação nos Lucros e Resultados (PLR) é um dos benefícios mais aguardados pelos trabalhadores CLT. Diferente do salário mensal, a PLR possui uma tributação exclusiva. Isso significa que ela não se soma aos seus outros rendimentos para o cálculo do Imposto de Renda anual, o que geralmente resulta em um desconto menor.
                            </p>
                            <p className="mb-4">
                                O "Leão" morde uma parte, mas a tabela usada é específica e mais vantajosa, com faixas de isenção mais altas do que as aplicadas aos salários normais.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Tabela de IR sobre PLR (Regras 2025)</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">As faixas de valores são reajustadas anualmente pelo governo. Confira a lógica:</p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span><strong>Faixa 1 (Isenção):</strong> Valores de PLR até R$ 7.640,80 estão totalmente isentos de imposto. O valor entra "limpo" na sua conta.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span><strong>Faixas seguintes:</strong> Acima da isenção, aplicam-se alíquotas de 7,5%, 15%, 22,5% e 27,5%, sempre com uma "parcela a deduzir" para suavizar o imposto.</span>
                                </li>
                            </ul>
                            <p className="text-xs text-gray-500 mt-4">*Nota: Os valores das faixas podem sofrer reajustes. Nossa calculadora utiliza sempre a tabela oficial vigente.</p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Passo a Passo do Cálculo</h2>
                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">Como calcular?</h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><strong>1. Identifique a Faixa:</strong> Veja em qual linha da tabela o valor total da sua PLR se encaixa.</li>
                                    <li><strong>2. Aplique a Alíquota:</strong> Multiplique o valor total da PLR pela porcentagem correspondente.</li>
                                    <li><strong>3. Subtraia a Dedução:</strong> Do resultado anterior, subtraia o valor da "Parcela a Deduzir".</li>
                                </ul>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-yellow-500">⚠️ Atenção a Parcelas!</h3>
                                <p className="text-sm text-gray-400">
                                    Se a sua empresa paga a PLR em duas parcelas no mesmo ano, o imposto é recalculado no segundo pagamento considerando a soma total recebida. Isso pode fazer com que o desconto na segunda parcela pareça muito maior.
                                </p>
                            </div>
                        </div>
                    </section>

                    <FAQ
                        items={PLR_FAQS}
                        title="Dúvidas Frequentes sobre PLR"
                        className="py-12"
                        showSocialProof={false}
                    />
                </motion.div>

                {/* App Promo Banner */}
                <AppPromoBanner />
            </div>
        </section>
    );
};
