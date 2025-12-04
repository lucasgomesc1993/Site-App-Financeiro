import React, { useState } from 'react';
import { Calculator, DollarSign, AlertCircle, TrendingUp, TrendingDown, HelpCircle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const WORKING_CAPITAL_FAQS: FAQItem[] = [
    {
        question: "O que é Capital de Giro Líquido?",
        answer: "É a diferença entre o Ativo Circulante (dinheiro em caixa + o que vai receber logo) e o Passivo Circulante (contas que vencem logo). Se o resultado for positivo, a empresa tem folga financeira."
    },
    {
        question: "Capital de Giro é a mesma coisa que Lucro?",
        answer: "Não! Lucro é o que sobra depois de pagar tudo. Capital de Giro é o dinheiro necessário para movimentar o negócio. Você pode ter lucro contábil (vendeu bem), mas estar sem capital de giro (o dinheiro só vai entrar mês que vem)."
    },
    {
        question: "Estoque alto é bom ou ruim?",
        answer: "Para o capital de giro, estoque alto é ruim. Estoque é 'dinheiro parado' que não paga conta. O ideal é ter o giro de estoque mais rápido possível: o produto chega e já é vendido."
    },
    {
        question: "Como aumentar o Capital de Giro?",
        answer: "Negocie prazos maiores com fornecedores, reduza prazos de recebimento de clientes, evite estoques parados e corte desperdícios. Empréstimos devem ser a última opção."
    }
];

export function WorkingCapitalPage() {
    const [receivables, setReceivables] = useState('');
    const [inventory, setInventory] = useState('');
    const [payables, setPayables] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const calculateWorkingCapital = () => {
        const rec = parseFloat(receivables.replace(/\./g, '').replace(',', '.')) || 0;
        const inv = parseFloat(inventory.replace(/\./g, '').replace(',', '.')) || 0;
        const pay = parseFloat(payables.replace(/\./g, '').replace(',', '.')) || 0;

        const workingCapital = (rec + inv) - pay;
        setResult(workingCapital);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        const numericValue = value.replace(/\D/g, '');
        const floatValue = parseFloat(numericValue) / 100;
        if (isNaN(floatValue)) {
            setter('');
            return;
        }
        setter(floatValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Capital de Giro",
        "description": "Calcule a Necessidade de Capital de Giro (NCG) da sua empresa.",
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
                title="Calculadora de Capital de Giro - Quanto sua empresa precisa?"
                description="Sua empresa tem dinheiro para rodar? Calcule a Necessidade de Capital de Giro (NCG) e aprenda a gerenciar o fluxo de caixa para não quebrar."
                canonical="/calculadoras/capital-de-giro"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": WORKING_CAPITAL_FAQS.map(faq => ({
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
                        { label: 'Capital de Giro', href: '/calculadoras/capital-de-giro' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Calculator className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Gestão Financeira</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Capital de Giro</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Lucro não é caixa. Descubra exatamente quanto dinheiro sua empresa precisa ter guardado para manter a operação rodando sem sufoco.
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
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                                <DollarSign className="w-5 h-5 text-primary" />
                                Dados Financeiros
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Contas a Receber (+)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={receivables}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setReceivables)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Dinheiro na mão dos clientes (cartão, boletos).</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Valor em Estoque (+)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={inventory}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setInventory)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Dinheiro parado em mercadoria.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Contas a Pagar (-)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={payables}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setPayables)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">O que você deve aos fornecedores.</p>
                                </div>

                                <button
                                    onClick={calculateWorkingCapital}
                                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 mt-4"
                                >
                                    Calcular Capital de Giro
                                </button>
                            </div>

                            {result !== null && (
                                <div className={`mt-8 p-6 rounded-2xl border ${result > 0 ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-green-500/10 border-green-500/20'} animate-in fade-in slide-in-from-top-4`}>
                                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Necessidade de Capital de Giro</h3>
                                    <div className={`text-4xl font-bold mb-4 ${result > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                                        {formatCurrency(result)}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            {result > 0 ? (
                                                <TrendingDown className="w-5 h-5 text-yellow-400 mt-1 shrink-0" />
                                            ) : (
                                                <TrendingUp className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                                            )}
                                            <div>
                                                <p className="font-medium text-white mb-1">
                                                    {result > 0 ? 'Sua empresa precisa de caixa.' : 'Seus fornecedores financiam sua operação.'}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    {result > 0
                                                        ? 'O resultado positivo indica que você paga seus fornecedores antes de receber dos clientes. Você precisa ter esse valor em caixa para manter a operação rodando.'
                                                        : 'O resultado negativo (ou zero) indica que você recebe dos clientes antes de pagar os fornecedores. É o melhor cenário para o fluxo de caixa!'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                <HelpCircle className="w-5 h-5 text-primary" />
                                Entenda o Cálculo
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    <strong className="text-white">A Fórmula:</strong><br />
                                    Capital de Giro = (Contas a Receber + Estoque) - Contas a Pagar
                                </p>
                                <p>
                                    <strong className="text-white">O "Oxigênio" da Empresa:</strong><br />
                                    Capital de Giro é a reserva que garante que sua empresa continue respirando entre o momento em que o dinheiro sai (pagar fornecedor) e o momento em que ele volta (receber do cliente).
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 p-6 rounded-3xl border border-blue-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                <Lightbulb className="w-5 h-5" />
                                Dica FinZap
                            </h3>
                            <p className="text-sm text-gray-300">
                                A forma mais barata de aumentar seu capital de giro não é pegando empréstimo no banco, mas <strong>negociando prazos</strong>. Tente aumentar o prazo de pagamento com fornecedores e reduzir o prazo de recebimento dos clientes.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Sinais de Alerta no Fluxo de Caixa</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <AlertCircle className="w-8 h-8 text-red-400 mb-4" />
                                <h3 className="font-semibold text-white mb-2">Antecipação Constante</h3>
                                <p className="text-sm text-gray-400">
                                    Você precisa antecipar recebíveis (desconto de duplicatas) todo mês para pagar a folha.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <AlertCircle className="w-8 h-8 text-red-400 mb-4" />
                                <h3 className="font-semibold text-white mb-2">Descassamento de Prazos</h3>
                                <p className="text-sm text-gray-400">
                                    Você paga os fornecedores à vista, mas vende para o cliente em 10x sem juros.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <AlertCircle className="w-8 h-8 text-red-400 mb-4" />
                                <h3 className="font-semibold text-white mb-2">Estoque Parado</h3>
                                <p className="text-sm text-gray-400">
                                    Seu estoque está cheio de produtos encalhados há meses ("dinheiro na prateleira").
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <FAQ
                    items={WORKING_CAPITAL_FAQS}
                    title="Dúvidas Frequentes sobre Capital de Giro"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
