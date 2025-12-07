import React, { useState, useEffect } from 'react';
import { Calculator, FileText, TrendingDown, ArrowRight, ShieldCheck, DollarSign, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const INSS_FAQS: FAQItem[] = [
    {
        question: "Qual o valor do teto do INSS em 2025?",
        answer: "O teto do INSS em 2025 é de R$ 8.157,41. Isso significa que, mesmo se você ganhar R$ 15.000,00, sua contribuição será calculada apenas até esse limite, resultando em um desconto máximo de R$ 951,63."
    },
    {
        question: "Como funciona o desconto progressivo?",
        answer: "No desconto progressivo, seu salário é \"fatiado\". Você paga 7,5% sobre a primeira parte (até o salário mínimo), 9% sobre a segunda parte, e assim por diante. Quem ganha mais paga uma alíquota efetiva maior, mas justa em relação às faixas anteriores."
    },
    {
        question: "O desconto do INSS é sobre o salário bruto ou líquido?",
        answer: "O INSS é sempre calculado sobre o salário bruto (sem descontos). Ele é o primeiro desconto a ser aplicado, antes do Imposto de Renda e do Vale-Transporte."
    },
    {
        question: "Quem é autônomo paga quanto de INSS?",
        answer: "Autônomos no plano normal pagam 20% sobre a remuneração do mês (limitado ao teto). Já no plano simplificado (código 1163), pagam 11% sobre o salário mínimo, mas perdem o direito à aposentadoria por tempo de contribuição."
    },
    {
        question: "O que acontece se a empresa descontar mas não pagar o INSS?",
        answer: "Isso é considerado apropriação indébita previdenciária. O trabalhador não perde o direito à contagem de tempo para aposentadoria, mas pode ter dor de cabeça para provar o vínculo. Acompanhe sempre seu extrato CNIS no portal Meu INSS."
    },
    {
        question: "Desconto de INSS incide sobre vale-alimentação?",
        answer: "Não. O vale-alimentação e vale-refeição, quando pagos dentro das regras do PAT (Programa de Alimentação do Trabalhador), não integram o salário para fins de contribuição ao INSS."
    },
    {
        question: "Como calcular INSS de empregada doméstica?",
        answer: "O cálculo para empregados domésticos segue a mesma tabela progressiva dos trabalhadores CLT. A alíquota varia de 7,5% a 14% dependendo do salário registrado na carteira."
    }
];

export function INSSPage() {
    const [salary, setSalary] = useState('');
    const [result, setResult] = useState<{ discount: number; netSalary: number; effectiveRate: number; range: number } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));

        if (isNaN(sal) || sal === 0) {
            setResult(null);
            return;
        }

        // Tabela INSS 2025 Oficial
        // Faixa 1: até 1.518,00 -> 7,5%
        // Faixa 2: de 1.518,01 a 2.793,88 -> 9%
        // Faixa 3: de 2.793,89 a 4.190,83 -> 12%
        // Faixa 4: de 4.190,84 a 8.157,41 -> 14%

        let discount = 0;
        const TETO = 8157.41;
        const FAIXA_1 = 1518.00;
        const FAIXA_2 = 2793.88;
        const FAIXA_3 = 4190.83;

        let range = 0;

        if (sal <= FAIXA_1) {
            discount = sal * 0.075;
            range = 1;
        } else if (sal <= FAIXA_2) {
            discount = (FAIXA_1 * 0.075) + ((sal - FAIXA_1) * 0.09);
            range = 2;
        } else if (sal <= FAIXA_3) {
            discount = (FAIXA_1 * 0.075) + ((FAIXA_2 - FAIXA_1) * 0.09) + ((sal - FAIXA_2) * 0.12);
            range = 3;
        } else if (sal <= TETO) {
            discount = (FAIXA_1 * 0.075) + ((FAIXA_2 - FAIXA_1) * 0.09) + ((FAIXA_3 - FAIXA_2) * 0.12) + ((sal - FAIXA_3) * 0.14);
            range = 4;
        } else {
            // Acima do Teto
            discount = 951.63; // Valor fixo calculado do teto
            range = 5; // Teto
        }

        setResult({
            discount,
            netSalary: sal - discount,
            effectiveRate: (discount / sal) * 100,
            range
        });
    };

    useEffect(() => {
        calculate();
    }, [salary]);

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
        "name": "Calculadora INSS 2025",
        "url": "https://www.junny.com.br/calculadoras/inss",
        "description": "Consulte a Tabela INSS 2025 oficial atualizada. Aprenda a calcular o desconto no seu salário, emita a guia GPS e simule autônomos e MEI.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        },
        "featureList": [
            "Tabela INSS 2025 Atualizada",
            "Cálculo Progressivo Automático",
            "Desconto de Autônomos e MEI",
            "Cálculo Reverso de Salário Líquido"
        ]
    };

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Calculadora INSS 2025: Tabela Oficial e Cálculo Exato [Atualizado]"
                description="Consulte a Tabela INSS 2025 oficial atualizada. Aprenda a calcular o desconto no seu salário, emita a guia GPS e simule autônomos e MEI."
                canonical="/calculadoras/inss"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": INSS_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'INSS 2025', href: '/calculadoras/inss' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <ShieldCheck className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">INSS 2025</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Entenda o desconto do INSS no seu salário com a nova tabela de 2025.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Calcular Desconto
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Salário Bruto</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                        <input
                                            type="text"
                                            value={salary}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setSalary)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Valor do Desconto INSS</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Alíquota Efetiva</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `${result.effectiveRate.toFixed(2)}%` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Salário Pós-INSS</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                    </div>
                                    {result && result.range === 5 && (
                                        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl flex items-start gap-2 text-left">
                                            <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                                            <p className="text-xs text-yellow-200/80">
                                                Seu salário está acima do teto de R$ 8.157,41. O desconto é fixo no valor máximo de R$ 951,63.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info - Tabela Progressiva */}
                    <div className="lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full">
                            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
                                <TrendingDown className="w-5 h-5 text-blue-500" />
                                Tabela INSS 2025 (CLT)
                            </h3>
                            <div className="space-y-4">
                                <div className={`flex justify-between items-center p-3 rounded-xl border ${result && result.range === 1 ? 'bg-blue-500/20 border-blue-500/50' : 'bg-white/5 border-white/5'}`}>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">Até R$ 1.518,00</span>
                                        <span className="text-sm font-medium text-white">Faixa 1</span>
                                    </div>
                                    <span className="text-lg font-bold text-blue-400">7,5%</span>
                                </div>

                                <div className={`flex justify-between items-center p-3 rounded-xl border ${result && result.range === 2 ? 'bg-blue-500/20 border-blue-500/50' : 'bg-white/5 border-white/5'}`}>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">R$ 1.518,01 a R$ 2.793,88</span>
                                        <span className="text-sm font-medium text-white">Faixa 2</span>
                                    </div>
                                    <span className="text-lg font-bold text-blue-400">9%</span>
                                </div>

                                <div className={`flex justify-between items-center p-3 rounded-xl border ${result && result.range === 3 ? 'bg-blue-500/20 border-blue-500/50' : 'bg-white/5 border-white/5'}`}>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">R$ 2.793,89 a R$ 4.190,83</span>
                                        <span className="text-sm font-medium text-white">Faixa 3</span>
                                    </div>
                                    <span className="text-lg font-bold text-blue-400">12%</span>
                                </div>

                                <div className={`flex justify-between items-center p-3 rounded-xl border ${result && result.range >= 4 ? 'bg-blue-500/20 border-blue-500/50' : 'bg-white/5 border-white/5'}`}>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">R$ 4.190,84 a R$ 8.157,41</span>
                                        <span className="text-sm font-medium text-white">Faixa 4</span>
                                    </div>
                                    <span className="text-lg font-bold text-blue-400">14%</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-4 text-center">
                                *O cálculo é feito por fatias. Quem ganha R$ 3.000 não paga 12% sobre tudo, mas sim a soma das alíquotas de cada faixa.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-12 mb-24">
                    {/* Intro & Tabela */}
                    <div className="grid md:grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h2 className="text-3xl font-bold text-white mb-4">Como funciona o cálculo em 2025?</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Entender o desconto do <strong>INSS (Instituto Nacional do Seguro Social)</strong> é essencial para saber exatamente quanto do seu salário cai na conta no final do mês. Em 2025, com o novo salário mínimo de <strong>R$ 1.518,00</strong>, as faixas de contribuição e o teto da previdência sofreram reajustes importantes que impactam diretamente o seu bolso.
                        </p>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden">
                            <h3 className="text-xl font-bold text-white mb-6">Tabela Oficial Detalhada</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-4 text-white">Salário de Contribuição</th>
                                            <th className="p-4 text-white text-center">Alíquota</th>
                                            <th className="p-4 text-white text-center">Parcela a Deduzir</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400">
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4">Até R$ 1.518,00</td>
                                            <td className="p-4 text-center font-bold text-blue-400">7,5%</td>
                                            <td className="p-4 text-center">-</td>
                                        </tr>
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4">De R$ 1.518,01 a R$ 2.793,88</td>
                                            <td className="p-4 text-center font-bold text-blue-400">9%</td>
                                            <td className="p-4 text-center">R$ 22,77</td>
                                        </tr>
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4">De R$ 2.793,89 a R$ 4.190,83</td>
                                            <td className="p-4 text-center font-bold text-blue-400">12%</td>
                                            <td className="p-4 text-center">R$ 106,59</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-4">De R$ 4.190,84 a R$ 8.157,41</td>
                                            <td className="p-4 text-center font-bold text-blue-400">14%</td>
                                            <td className="p-4 text-center">R$ 190,41</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-200/80">
                                    <strong>Atenção:</strong> Quem ganha acima do teto de R$ 8.157,41 paga um valor fixo de contribuição, que atualmente é de <strong>R$ 951,63</strong> (o teto máximo de desconto).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Exemplo Prático */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <FileText className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Como calcular o INSS na prática?</h2>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6">
                            O cálculo progressivo pode parecer complexo, mas existe um macete simples usando a "Parcela a Deduzir" da tabela acima.
                        </p>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/5 mb-6">
                            <h3 className="text-lg font-bold text-white mb-2">Fórmula Simples:</h3>
                            <code className="block bg-black/30 p-4 rounded-lg text-blue-300 font-mono text-sm md:text-base break-words">
                                [Salário Bruto] x [Alíquota] - [Parcela a Deduzir] = Valor do INSS
                            </code>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white">Exemplo Prático: Salário de R$ 3.500,00</h3>
                            <ol className="list-decimal list-inside space-y-2 text-gray-400 ml-4">
                                <li>Enquadra-se na 3ª faixa (12%).</li>
                                <li>Multiplique: <span className="text-white">R$ 3.500,00 x 12% = R$ 420,00</span>.</li>
                                <li>Subtraia a dedução: <span className="text-white">R$ 420,00 - R$ 106,59</span>.</li>
                                <li><strong>Desconto Final INSS: R$ 313,41</strong>.</li>
                            </ol>
                        </div>

                        <div className="mt-8 flex flex-col md:flex-row gap-4">
                            <Link to="/calculadoras/salario-liquido" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                                Ver Salário Líquido Completo <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link to="/calculadoras/custo-funcionario" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors">
                                Calcular Custo para Empresa (Patrão)
                            </Link>
                        </div>
                    </div>

                    {/* Autônomos e Pró-Labore */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <DollarSign className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Tabela INSS para Autônomos e Pró-Labore (2025)
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Para Contribuintes Individuais (Autônomos) e sócios que retiram Pró-Labore, a lógica é diferente. Não há progressividade, a alíquota é fixa dependendo do tipo de contribuição.
                        </p>

                        <div className="overflow-x-auto mb-8">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="p-3 text-white">Categoria</th>
                                        <th className="p-3 text-white text-center">Alíquota</th>
                                        <th className="p-3 text-white">Base de Cálculo</th>
                                        <th className="p-3 text-white">Valor Mensal</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-400">
                                    <tr className="border-b border-white/5">
                                        <td className="p-3 font-bold text-white">Plano Normal (Aposenta por tempo)</td>
                                        <td className="p-3 text-center font-bold text-blue-400">20%</td>
                                        <td className="p-3">Sobre ganhos (Min. R$ 1.518 até Teto)</td>
                                        <td className="p-3">De R$ 303,60 até R$ 1.631,48</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="p-3 font-bold text-white">Plano Simplificado (Aposenta por idade)</td>
                                        <td className="p-3 text-center font-bold text-blue-400">11%</td>
                                        <td className="p-3">Apenas sobre Salário Mínimo</td>
                                        <td className="p-3">R$ 166,98</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-bold text-white"><Link to="/calculadoras/das-mei" className="text-blue-300 hover:text-blue-200 underline">MEI</Link></td>
                                        <td className="p-3 text-center font-bold text-blue-400">5%</td>
                                        <td className="p-3">Apenas sobre Salário Mínimo</td>
                                        <td className="p-3">R$ 75,90 (+ ISS/ICMS)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-4">Como pagar (Códigos GPS)</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span><strong>Código 1007:</strong> Contribuinte Individual - Plano Normal (20%)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span><strong>Código 1163:</strong> Contribuinte Individual - Plano Simplificado (11%)</span>
                                </li>
                            </ul>
                            <p className="mt-4 text-sm text-gray-400">
                                Dúvida entre ser CLT ou PJ? Use nossa calculadora <Link to="/calculadoras/clt-vs-pj" className="text-blue-300 hover:text-blue-200 underline">CLT vs PJ</Link> para comparar.
                            </p>
                        </div>
                    </div>

                    {/* Impacto em outros benefícios */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">O impacto do INSS em outros benefícios</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Link to="/calculadoras/horas-extras" className="group bg-white/5 p-5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Horas Extras</h3>
                                <p className="text-sm text-gray-400">
                                    O valor recebido por horas adicionais integra o salário de contribuição, aumentando o desconto do INSS.
                                </p>
                            </Link>
                            <Link to="/calculadoras/fgts" className="group bg-white/5 p-5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">FGTS</h3>
                                <p className="text-sm text-gray-400">
                                    O FGTS é calculado sobre o salário bruto, sem descontar o INSS. O INSS reduz a base apenas do Imposto de Renda.
                                </p>
                            </Link>
                            <Link to="/calculadoras/decimo-terceiro" className="group bg-white/5 p-5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">13º Salário</h3>
                                <p className="text-sm text-gray-400">
                                    O INSS também é descontado da primeira ou segunda parcela do seu abono natalino.
                                </p>
                            </Link>
                            <Link to="/calculadoras/ferias" className="group bg-white/5 p-5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Férias</h3>
                                <p className="text-sm text-gray-400">
                                    Quando você vende férias ou recebe o terço constitucional, o INSS também incide sobre esses valores.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={INSS_FAQS}
                    title="Dúvidas Frequentes sobre INSS"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section >
    );
}
