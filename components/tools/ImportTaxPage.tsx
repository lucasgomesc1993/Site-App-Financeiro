import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calculator, AlertTriangle, Truck, Plane, Package, HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const IMPORT_TAX_FAQS: FAQItem[] = [
    {
        question: "Como funciona a isenção de $50?",
        answer: "Pelo programa Remessa Conforme, compras de até US$ 50 feitas por empresas certificadas pagam apenas 20% de Imposto de Importação (Federal) + 17% de ICMS (Estadual). Fora do programa ou pessoa física para jurídica sem certificação, a taxa é de 60%."
    },
    {
        question: "O frete entra no cálculo?",
        answer: "Sim! A Receita Federal calcula o imposto sobre o Valor Aduaneiro, que é a soma do produto + frete + seguro. Se o produto custa $45 e o frete $10, o total é $55 e você perde a isenção da alíquota reduzida de 20% (se não houver regra específica de desconto)."
    },
    {
        question: "O que é o ICMS de 17%?",
        answer: "É um imposto estadual unificado para compras internacionais. Ele é cobrado 'por dentro', ou seja, incide sobre o valor total da compra já somado ao Imposto de Importação, o que eleva a taxa efetiva real."
    }
];

export function ImportTaxPage() {
    const [usdPrice, setUsdPrice] = useState('');
    const [shipping, setShipping] = useState('');
    const [exchangeRate, setExchangeRate] = useState('6.00'); // Simplificado
    const [isRemessaConforme, setIsRemessaConforme] = useState(true);

    const [result, setResult] = useState<{
        totalUSD: number;
        totalBRL: number;
        importTax: number;
        icms: number;
        finalTotal: number;
        effectiveTaxRate: number;
    } | null>(null);

    const calculate = () => {
        const price = parseFloat(usdPrice.replace(/\./g, '').replace(',', '.') || '0');
        const ship = parseFloat(shipping.replace(/\./g, '').replace(',', '.') || '0');
        const rate = parseFloat(exchangeRate.replace(/\./g, '').replace(',', '.') || '0');

        if (price === 0) {
            setResult(null);
            return;
        }

        const totalUSD = price + ship;
        const totalBaseBRL = totalUSD * rate;

        let importTax = 0;

        // Regra Remessa Conforme (Simplificada Vigente)
        // Até $50: II = 20%
        // Acima $50: II = 60% (com dedução de $20 do tributo em alguns casos, mas regra geral 60% é o padrão fora da faixa)
        // Nota: Recentemente aprovada taxa de 20% para compras até $50 (a tal "taxa das blusinhas").

        if (isRemessaConforme) {
            if (totalUSD <= 50) {
                importTax = totalBaseBRL * 0.20;
            } else {
                // Regra de transição/dedução (imposto de 60% sobre o valor, menos $20 de desconto no imposto)
                // II = (Total * 60%) - ($20 * Cotação)
                const tax60 = totalBaseBRL * 0.60;
                const deduction = 20 * rate;
                importTax = tax60 - deduction;
                // Garantir que não seja negativo (caso borderline)
                if (importTax < 0) importTax = 0;

                // Se cair na regra antiga pura (sem dedução): importTax = totalBaseBRL * 0.60;
                // Vamos usar a regra com dedução que é a vigente no Remessa.
            }
        } else {
            // Regra Geral (Sem Remessa Conforme)
            // 60% direto
            importTax = totalBaseBRL * 0.60;
        }

        // ICMS (17% por dentro)
        // Base de cálculo ICMS = (Valor Produto + Frete + II) / (1 - Alíquota ICMS)
        // Valor ICMS = Base ICMS * Alíquota ICMS
        const icmsRate = 0.17;
        const baseICMS = (totalBaseBRL + importTax) / (1 - icmsRate);
        const icms = baseICMS * icmsRate;

        const finalTotal = totalBaseBRL + importTax + icms;
        const totalTax = importTax + icms;

        // Taxa efetiva sobre o produto original
        const effectiveTaxRate = (totalTax / totalBaseBRL) * 100;

        setResult({
            totalUSD,
            totalBRL: totalBaseBRL,
            importTax,
            icms,
            finalTotal,
            effectiveTaxRate
        });
    };

    useEffect(() => {
        calculate();
    }, [usdPrice, shipping, exchangeRate, isRemessaConforme]);

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
        "name": "Calculadora de Impostos de Importação (Taxa das Blusinhas)",
        "description": "Simule as taxas do Remessa Conforme, Aliexpress, Shein e Shopee. Calcule II (20% ou 60%) e ICMS de 17%.",
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
                title="Calculadora de Impostos de Importação - Remessa Conforme, Shein, Shopee"
                description="Vai ser taxado? Simule o valor final da sua compra internacional com as novas regras (20% até $50 ou 60% acima) e ICMS."
                canonical="/calculadoras/impostos-importacao"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": IMPORT_TAX_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Impostos de Importação', href: '/calculadoras/impostos-importacao' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <ShoppingBag className="w-4 h-4 text-cyan-500" />
                            <span className="text-sm text-gray-300">Câmbio e Compras</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Impostos de Importação</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Simule o valor final com as taxas do "Remessa Conforme" (Shein, AliExpress, Shopee) e evite surpresas na alfândega.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Form */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-cyan-500" />
                                    Dados da Compra
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Preço do Produto (USD)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                            <input
                                                type="text"
                                                value={usdPrice}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setUsdPrice)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Frete (USD)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                            <input
                                                type="text"
                                                value={shipping}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setShipping)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Cotação do Dólar (R$)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={exchangeRate}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setExchangeRate)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                                            placeholder="Ex: 6,00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Use a cotação do cartão ou boleto (Dólar Turismo/PTAX).
                                    </p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Package className={`w-5 h-5 ${isRemessaConforme ? 'text-green-400' : 'text-gray-400'}`} />
                                        <div>
                                            <span className="text-sm text-white font-medium block">Remessa Conforme</span>
                                            <span className="text-xs text-gray-400">Sites certificados (Shein, Shopee, etc)</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsRemessaConforme(!isRemessaConforme)}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors ${isRemessaConforme ? 'bg-green-500' : 'bg-gray-600'}`}
                                        role="switch"
                                        aria-checked={isRemessaConforme}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isRemessaConforme ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </button>
                                </div>

                                {isRemessaConforme && parseFloat(usdPrice.replace(/\./g, '').replace(',', '.')) + parseFloat(shipping.replace(/\./g, '').replace(',', '.') || '0') > 50 && (
                                    <div className="flex items-start gap-2 text-yellow-400 text-xs bg-yellow-400/10 p-3 rounded-lg border border-yellow-400/20">
                                        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <p>
                                            Sua compra ultrapassou US$ 50,00. A taxa de 20% não se aplica integralmente. Você pagará 60% com desconto de US$ 20,00 no imposto.
                                        </p>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-cyan-500/10 p-6 rounded-2xl border border-cyan-500/20 text-center">
                                        <span className="text-sm text-cyan-400 block mb-2">Custo Final Estimado (R$)</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                        {result && (
                                            <p className="text-sm font-medium text-red-300 mt-2">
                                                +{result.effectiveTaxRate.toFixed(1)}% de impostos reais
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Breakdown */}
                    <div className="lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <Plane className="w-5 h-5 text-cyan-500" />
                                Discriminativo
                            </h3>

                            {result ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                        <span className="text-gray-400">Total Produto + Frete</span>
                                        <span className="text-white font-medium">R$ {result.totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                        <span className="text-gray-400">Imposto Importação (II)</span>
                                        <span className="text-red-400 font-medium">+ R$ {result.importTax.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                        <span className="text-gray-400">ICMS (17%)</span>
                                        <span className="text-red-400 font-medium">+ R$ {result.icms.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-gray-300 font-bold">Total a Pagar</span>
                                        <span className="text-cyan-400 font-bold text-xl">R$ {result.finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    <p>Preencha os valores para ver o detalhamento das taxas.</p>
                                </div>
                            )}

                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 mt-6">
                                <h4 className="text-sm font-bold text-white mb-2">Entenda a Base de Cálculo</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    O governo cobra "imposto sobre imposto". O ICMS não incide apenas sobre o produto, mas sobre o (Produto + Frete + Imposto Federal). Por isso, 17% vira na prática quase 20,48% sobre a base original.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-red-500/10 p-3 rounded-xl shrink-0">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como não ser taxado (ou pagar menos)?
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Isenções Legais</h3>
                            <p className="text-gray-400 text-sm">
                                Livros, jornais, revistas e medicamentos (pessoa física para física) geralmente são isentos. Remédios exigem receita médica e procedimentos via Anvisa.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Dividir Pacotes</h3>
                            <p className="text-gray-400 text-sm">
                                Se sua compra exceder US$ 50, tente dividir em dois pedidos separados (em dias diferentes) para ficar abaixo do limite da taxa reduzida de 20%. Atenção aos custos de frete duplicados.
                            </p>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={IMPORT_TAX_FAQS}
                    title="Perguntas Frequentes"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
