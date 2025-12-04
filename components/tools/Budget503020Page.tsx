import React, { useState, useEffect } from 'react';
import { PieChart, Calculator, HelpCircle, Wallet, ArrowRight, Info, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const BUDGET_FAQS: FAQItem[] = [
    {
        question: "A regra se aplica ao salário bruto ou líquido?",
        answer: "A regra deve ser aplicada exclusivamente sobre o salário líquido. Isso ocorre porque o salário bruto inclui descontos obrigatórios como INSS e Imposto de Renda, que não são recursos disponíveis para você gastar. Se você calcular sobre o bruto, seu orçamento ficará irreal e você gastará dinheiro que, na prática, já foi retido pelo governo antes mesmo de cair na conta."
    },
    {
        question: "Onde entram os serviços de streaming (Netflix/Spotify)?",
        answer: "Serviços como Netflix e Spotify devem ser categorizados nos 30% de Desejos. Embora sejam importantes para o lazer, eles não são essenciais para a sobrevivência física ou manutenção do trabalho, diferentemente de contas de luz ou transporte. Em momentos de aperto financeiro, eles são os primeiros itens que podem ser cancelados ou substituídos por opções gratuitas sem afetar sua segurança básica."
    },
    {
        question: "Meus gastos essenciais passam de 50%. O que fazer?",
        answer: "Ultrapassar os 50% é um cenário comum, mas exige ação imediata. Se seus gastos fixos consomem 60% ou 70% da renda, você precisará compensar reduzindo drasticamente a categoria de Desejos (30%) temporariamente. O foco deve ser eliminar gastos supérfluos enquanto busca formas de aumentar sua renda principal ou reduzir custos fixos, como mudar para um aluguel mais barato."
    },
    {
        question: "Posso mudar as porcentagens?",
        answer: "Sim, a flexibilidade é permitida e até recomendada em certos casos. O modelo 50-30-20 serve como um norte, mas se você possui dívidas com juros altos, pode adotar temporariamente um formato 50-10-40 (apenas 10% para lazer e 40% para quitação). O mais importante é manter a intencionalidade do gasto e retornar às porcentagens originais assim que a situação financeira se estabilizar."
    },
    {
        question: "Aposentadoria entra nos 20%?",
        answer: "Com certeza. A aposentadoria é o principal pilar dos 20% para Objetivos Financeiros. Esta categoria não serve apenas para emergências de curto prazo, mas para garantir sua liberdade no futuro. Ao destinar parte dessa fatia para investimentos de longo prazo, você aproveita os juros compostos para acelerar a construção de patrimônio e atingir metas como o seu Primeiro Milhão mais rapidamente."
    }
];

export function Budget503020Page() {
    const [income, setIncome] = useState('');
    const [result, setResult] = useState<{ needs: number; wants: number; savings: number } | null>(null);

    const calculate = () => {
        const val = parseFloat(income.replace(/\./g, '').replace(',', '.'));

        if (isNaN(val) || val === 0) {
            setResult(null);
            return;
        }

        setResult({
            needs: val * 0.50,
            wants: val * 0.30,
            savings: val * 0.20
        });
    };

    useEffect(() => {
        calculate();
    }, [income]);

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
        "name": "Calculadora Regra 50-30-20: Organize Seu Orçamento Agora",
        "description": "Descubra como aplicar a regra 50-30-20 no seu salário líquido. Aprenda a dividir gastos entre necessidades, desejos e investimentos de forma simples.",
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
                title="Calculadora Regra 50-30-20: Organize Seu Orçamento Agora"
                description="Descubra como aplicar a regra 50-30-20 no seu salário líquido. Aprenda a dividir gastos entre necessidades, desejos e investimentos de forma simples."
                canonical="/calculadoras/regra-50-30-20"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": BUDGET_FAQS.map(faq => ({
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
                        { label: 'Regra 50-30-20', href: '/calculadoras/regra-50-30-20' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <PieChart className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-300">Investimentos e Planejamento</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Regra 50-30-20</span>
                        </h1>
                        <div className="max-w-3xl mx-auto text-lg text-gray-400 space-y-4">
                            <p>
                                Você chega ao fim do mês e se pergunta para onde foi o seu dinheiro? A sensação de trabalhar muito e não ver a cor da grana é mais comum do que parece. A <strong>Regra 50-30-20</strong> não é mágica, é matemática simples aplicada à vida real para acabar com esse ciclo de "pagar boletos e ficar zerado".
                            </p>
                            <p>
                                Criado pela senadora norte-americana e especialista em falências Elizabeth Warren, no livro <em>All Your Worth</em>, este método divide sua renda em três caixas lógicas. O objetivo é tirar o peso da decisão de cada pequena compra e automatizar seu sucesso financeiro.
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
                                    Dividir Orçamento
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Sua Renda Mensal Líquida</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={income}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setIncome)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Use nossa <Link to="/calculadoras/salario-liquido" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Calculadora de Salário Líquido</Link> para saber o valor exato.
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/5 space-y-4">
                                    {/* 50% Needs */}
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-blue-400 font-bold block mb-1">50% - Necessidades (Obrigatório)</span>
                                            <span className="text-xs text-gray-500">Aluguel, contas, mercado, transporte</span>
                                        </div>
                                        <span className="text-xl font-bold text-white">
                                            {result ? `R$ ${result.needs.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>

                                    {/* 30% Wants */}
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-purple-400 font-bold block mb-1">30% - Desejos (Estilo de Vida)</span>
                                            <span className="text-xs text-gray-500">Lazer, streaming, jantar fora</span>
                                        </div>
                                        <span className="text-xl font-bold text-white">
                                            {result ? `R$ ${result.wants.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>

                                    {/* 20% Savings */}
                                    <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-emerald-400 font-bold block mb-1">20% - Objetivos (O Futuro)</span>
                                            <span className="text-xs text-gray-500">Investimentos, reserva, dívidas</span>
                                        </div>
                                        <span className="text-xl font-bold text-white">
                                            {result ? `R$ ${result.savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
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
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                                <Info className="w-5 h-5 text-emerald-500" />
                                Como Funciona a Divisão
                            </h3>
                            <div className="space-y-6 text-gray-400">
                                <p>
                                    A divisão 50-30-20 é um método de orçamento que fragmenta a renda líquida em três categorias percentuais fixas. Veja onde cada centavo deve ir:
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-blue-400 block">50% para Necessidades</strong>
                                            Metade da sua renda líquida deve cobrir tudo aquilo que é essencial para você viver e trabalhar.
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-purple-400 block">30% para Desejos</strong>
                                            Esta categoria destina-se a gastos não essenciais ligados ao estilo de vida e lazer.
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <div>
                                            <strong className="text-emerald-400 block">20% para Objetivos</strong>
                                            Esta parcela deve ser alocada exclusivamente para a construção de patrimônio, quitação de dívidas e reservas futuras.
                                        </div>
                                    </li>
                                </ul>
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
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Exemplo Prático: Salário de R$ 3.000,00</h2>
                    <p className="text-gray-400 text-center max-w-3xl mx-auto mb-8">
                        Veja como ficaria a distribuição exata na tabela abaixo para um salário líquido de R$ 3.000,00:
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="p-4 text-white font-semibold">Categoria</th>
                                    <th className="p-4 text-white font-semibold">Porcentagem</th>
                                    <th className="p-4 text-white font-semibold">Valor (R$)</th>
                                    <th className="p-4 text-white font-semibold">Onde gastar?</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400">
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-blue-400">Necessidades</td>
                                    <td className="p-4">50%</td>
                                    <td className="p-4">R$ 1.500,00</td>
                                    <td className="p-4">Aluguel, Luz, Feira, Ônibus.</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-purple-400">Desejos</td>
                                    <td className="p-4">30%</td>
                                    <td className="p-4">R$ 900,00</td>
                                    <td className="p-4">Cinema, Ifood, Roupas, Lazer.</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-emerald-400">Objetivos</td>
                                    <td className="p-4">20%</td>
                                    <td className="p-4">R$ 600,00</td>
                                    <td className="p-4">Tesouro Direto, CDBs, Reserva.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 text-center text-gray-400">
                        <p>
                            Se as suas contas básicas ultrapassam 50%, você está em uma zona de risco. Talvez seja necessário rever parcelamentos ou quitar aquela <Link to="/calculadoras/divida-cartao-credito" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Dívida de Cartão de Crédito</Link> que está comendo seu orçamento.
                        </p>
                        <p className="mt-4">
                            Para a parcela de 20%, use nosso <Link to="/calculadoras/investimentos" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">Simulador de Investimentos</Link> para ver seu dinheiro crescer.
                        </p>
                    </div>
                </motion.div>

                <FAQ
                    items={BUDGET_FAQS}
                    title="Perguntas Frequentes sobre a Regra 50-30-20"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
