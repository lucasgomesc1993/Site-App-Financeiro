import React, { useState } from 'react';
import { Calculator, ArrowLeft, DollarSign, TrendingUp, TrendingDown, HelpCircle, Lightbulb, BarChart3, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';

export function ROICalculatorPage() {
    const [revenue, setRevenue] = useState('');
    const [cost, setCost] = useState('');
    const [roi, setRoi] = useState<number | null>(null);

    const calculateROI = () => {
        const rev = parseFloat(revenue.replace(/\./g, '').replace(',', '.')) || 0;
        const cst = parseFloat(cost.replace(/\./g, '').replace(',', '.')) || 0;

        if (cst === 0) {
            setRoi(null);
            return;
        }

        const roiValue = ((rev - cst) / cst) * 100;
        setRoi(roiValue);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatPercentage = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value / 100);
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

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-primary/20 selection:text-primary">
            <SEO
                title="Calculadora de ROI - Retorno Sobre Investimento (Marketing e Projetos)"
                description="Sua campanha deu lucro? Calcule o ROI (Return on Investment) de forma simples. Entenda a diferença entre ROI e ROAS e descubra a eficiência real do seu dinheiro."
                canonical="/calculadoras/roi"
            />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link to="/calculadoras" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para Calculadoras
                </Link>

                <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <BarChart3 className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Calculadora de ROI
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Sua campanha deu lucro ou prejuízo? Descubra a eficiência real dos seus investimentos.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-8">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-primary" />
                                        Dados do Investimento
                                    </h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Receita Gerada
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                                <input
                                                    type="text"
                                                    value={revenue}
                                                    onChange={(e) => handleCurrencyInput(e.target.value, setRevenue)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                                    placeholder="0,00"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Total arrecadado com a campanha/projeto.</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Custo do Investimento
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                                <input
                                                    type="text"
                                                    value={cost}
                                                    onChange={(e) => handleCurrencyInput(e.target.value, setCost)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                                    placeholder="0,00"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Soma de todos os custos (mídia, ferramentas, equipe, etc).</p>
                                        </div>

                                        <button
                                            onClick={calculateROI}
                                            className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 mt-4"
                                        >
                                            Calcular ROI
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {roi !== null && (
                                    <div className={`p-6 rounded-2xl border ${roi > 0 ? 'bg-green-500/10 border-green-500/20' : roi < 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-gray-500/10 border-gray-500/20'} animate-fade-in`}>
                                        <h3 className="text-lg font-semibold text-gray-300 mb-2">Resultado do ROI</h3>
                                        <div className={`text-4xl font-bold mb-4 ${roi > 0 ? 'text-green-400' : roi < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                            {formatPercentage(roi)}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                {roi > 0 ? (
                                                    <TrendingUp className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                                                ) : roi < 0 ? (
                                                    <TrendingDown className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                                                ) : (
                                                    <Target className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                                                )}
                                                <div>
                                                    <p className="font-medium text-white mb-1">
                                                        {roi > 0 ? 'O projeto deu lucro!' : roi < 0 ? 'O projeto deu prejuízo.' : 'Ponto de equilíbrio (Zero a Zero).'}
                                                    </p>
                                                    <p className="text-sm text-gray-400">
                                                        {roi > 0
                                                            ? `Para cada R$ 1,00 investido, voltaram R$ ${(1 + (roi / 100)).toFixed(2)} (R$ 1,00 de custo + R$ ${(roi / 100).toFixed(2)} de lucro).`
                                                            : roi < 0
                                                                ? `Para cada R$ 1,00 investido, você perdeu R$ ${(Math.abs(roi) / 100).toFixed(2)}.`
                                                                : 'Você recuperou exatamente o valor investido, sem lucro nem prejuízo.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-primary" />
                                        Entenda o Cálculo
                                    </h3>
                                    <div className="space-y-4 text-gray-400 text-sm">
                                        <p>
                                            <strong className="text-white">A Fórmula:</strong><br />
                                            ROI = [(Receita - Custo) ÷ Custo] × 100
                                        </p>
                                        <p>
                                            <strong className="text-white">ROI vs ROAS:</strong><br />
                                            ROAS mede o retorno apenas sobre anúncios (mídia). ROI mede o retorno sobre TODOS os custos (mídia, equipe, ferramentas, produto). O ROI é a métrica real de lucratividade.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                        <Lightbulb className="w-5 h-5" />
                                        Dica FinZap
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        É perfeitamente possível ter um ROAS positivo (vendeu bem nos anúncios) e um ROI negativo (a operação foi cara demais e comeu o lucro). Sempre olhe para o ROI final para ter a visão realista da saúde financeira.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold mb-4 text-white">Como melhorar meu ROI?</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <TrendingUp className="w-8 h-8 text-green-400 mb-4" />
                                        <h3 className="font-semibold text-white mb-2">Aumentar a Receita</h3>
                                        <p className="text-sm text-gray-400">
                                            Melhorar a taxa de conversão, aumentar o preço (ticket médio) ou vender mais vezes para o mesmo cliente (LTV).
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <TrendingDown className="w-8 h-8 text-blue-400 mb-4" />
                                        <h3 className="font-semibold text-white mb-2">Diminuir o Custo</h3>
                                        <p className="text-sm text-gray-400">
                                            Otimizar campanhas para baixar o custo por clique (CPC) ou negociar melhor com fornecedores e ferramentas.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white/5 rounded-3xl p-8 border border-white/5">
                                <h2 className="text-2xl font-bold mb-6 text-white">Perguntas Frequentes</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">Qual é um bom ROI?</h3>
                                        <p className="text-gray-400">
                                            Depende do modelo de negócio. Em infoprodutos, 100% é considerado mínimo. No varejo físico, 20% a 30% pode ser excelente devido ao alto volume.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">O que entra no "Custo do Investimento"?</h3>
                                        <p className="text-gray-400">
                                            Tudo! Valor pago aos anúncios, custo da agência/freelancer, ferramentas de e-mail marketing, Custo da Mercadoria Vendida (CMV), impostos, etc. Se esquecer custos, seu ROI será "mentiroso".
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">ROI de 100% significa que ganhei nada?</h3>
                                        <p className="text-gray-400">
                                            Não! Um ROI de 0% significa que você empatou. Um ROI de 100% significa que você recuperou o investimento E lucrou um valor igual. Você dobrou seu capital.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
