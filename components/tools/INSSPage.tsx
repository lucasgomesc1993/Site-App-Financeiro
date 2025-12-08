import React, { useState, useEffect } from 'react';
import { Calculator, FileText, TrendingDown, ArrowRight, ShieldCheck, DollarSign, AlertCircle, CheckCircle, Info, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const INSS_FAQS: FAQItem[] = [
    {
        question: "Qual o valor máximo de desconto do INSS em 2025?",
        answer: "O teto do desconto para trabalhadores CLT é de aproximadamente R$ 951,63. Esse valor se aplica a qualquer remuneração que ultrapasse R$ 8.157,41. Acima disso, a contribuição trava e não há cobrança extra."
    },
    {
        question: "Quem ganha um salário mínimo paga quanto?",
        answer: "Para o piso de R$ 1.518,00, a alíquota é de 7,5% sobre o total. O desconto é de R$ 113,85, resultando em um salário líquido de R$ 1.404,15 (sem contar outros benefícios ou descontos)."
    },
    {
        question: "Como conferir se a empresa está pagando meu INSS?",
        answer: "Não confie apenas no holerite. É vital acessar o Meu INSS (site ou app) e puxar o Extrato CNIS. Lá constam todos os recolhimentos reais feitos pelo empregador."
    },
    {
        question: "Autônomo pode pagar menos que 20%?",
        answer: "Sim, através do Plano Simplificado. O autônomo pode pagar 11% sobre o salário mínimo (R$ 166,98). Porém, essa modalidade dá direito apenas à aposentadoria por idade, excluindo a aposentadoria por tempo de contribuição."
    },
    {
        question: "O desconto do INSS vem antes do Imposto de Renda?",
        answer: "Sim. A ordem de cálculo é: primeiro desconta-se o INSS do salário bruto. O resultado dessa conta é a base para calcular o Imposto de Renda (IRRF). Portanto, quanto maior o INSS pago, menor a base do Imposto de Renda."
    }
];

export function INSSPage() {
    const [salary, setSalary] = useState('');
    const [result, setResult] = useState<{ discount: number; netSalary: number; effectiveRate: number; rangeDescription: string } | null>(null);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));

        if (isNaN(sal) || sal === 0) {
            setResult(null);
            return;
        }

        // Tabela INSS 2025 (Dedução legal)
        const TETO = 8157.41;
        const TETO_DESCONTO = 951.63; // Max discount allowed

        let discount = 0;
        let rangeDescription = "";

        if (sal <= 1518.00) {
            discount = sal * 0.075;
            rangeDescription = "Faixa 1 (7,5%)";
        } else if (sal <= 2793.88) {
            discount = (sal * 0.09) - 22.77;
            rangeDescription = "Faixa 2 (9%)";
        } else if (sal <= 4190.83) {
            discount = (sal * 0.12) - 106.59;
            rangeDescription = "Faixa 3 (12%)";
        } else if (sal <= TETO) {
            discount = (sal * 0.14) - 190.40;
            rangeDescription = "Faixa 4 (14%)";
        } else {
            discount = TETO_DESCONTO;
            rangeDescription = "Teto Máximo";
        }

        // Ensure we don't return negative discount if something is weird (though math holds up)
        discount = Math.max(0, discount);

        setResult({
            discount,
            netSalary: sal - discount,
            effectiveRate: (discount / sal) * 100,
            rangeDescription
        });
    };

    useEffect(() => {
        calculate();
    }, [salary]);

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        const number = value.replace(/\D/g, '');
        setter((Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora INSS 2025",
        "url": "https://www.junny.com.br/calculadoras/inss",
        "description": "Calcule o INSS 2025 com o salário mínimo de R$ 1.518. Confira a Tabela Oficial (Portaria nº 6), novas faixas de desconto e teto de R$ 951,63.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        },
        "featureList": [
            "Tabela INSS 2025 Atualizada",
            "Cálculo Progressivo com Dedução",
            "Simulação para Teto de R$ 8.157,41",
            "Comparativo CLT vs Autônomo"
        ]
    };

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Calculadora INSS 2025: Tabela Oficial e Desconto (Dezembro)"
                description="Calcule o INSS 2025 com o salário mínimo de R$ 1.518. Confira a Tabela Oficial (Portaria nº 6), novas faixas de desconto e teto de R$ 951,63."
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
                            Calculadora de INSS 2025: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Tabela e Desconto Oficial</span>
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left md:text-center">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-xs text-gray-400 block">Salário Mínimo (Base)</span>
                                <span className="text-sm font-bold text-white">R$ 1.518,00</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-xs text-gray-400 block">Teto do Benefício</span>
                                <span className="text-sm font-bold text-white">R$ 8.157,41</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-xs text-gray-400 block">Desconto Máximo (CLT)</span>
                                <span className="text-sm font-bold text-white">R$ 951,63</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-xs text-gray-400 block">Regulamentação</span>
                                <span className="text-sm font-bold text-white">Portaria MPS/MF nº 6</span>
                            </div>
                        </div>

                        <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-6">
                            O cálculo do INSS (Instituto Nacional do Seguro Social) sofreu atualizações importantes para o fechamento de 2025. Com a fixação do salário mínimo em <strong>R$ 1.518,00</strong> e a publicação da nova norma reguladora, tanto as faixas salariais quanto as parcelas de dedução foram reajustadas.
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
                                            {result ? `R$ ${formatCurrency(result.discount)}` : '---'}
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
                                                {result ? `R$ ${formatCurrency(result.netSalary)}` : '---'}
                                            </span>
                                        </div>
                                    </div>

                                    {result && (
                                        <div className="mt-4 flex flex-col gap-2">
                                            <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center justify-between text-sm">
                                                <span className="text-gray-400">Faixa Aplicada:</span>
                                                <span className="text-white font-medium">{result.rangeDescription}</span>
                                            </div>

                                            {result.effectiveRate < 14 && result.effectiveRate > 0 && result.discount < 951.63 && (
                                                <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-xl flex items-start gap-2 text-left">
                                                    <Info className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs text-green-200/80">
                                                        Note que sua alíquota efetiva ({result.effectiveRate.toFixed(2)}%) é menor que a alíquota nominal da faixa, graças ao cálculo progressivo.
                                                    </p>
                                                </div>
                                            )}

                                            {result.discount >= 951.63 && (
                                                <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl flex items-start gap-2 text-left">
                                                    <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs text-yellow-200/80">
                                                        Seu salário está acima do teto de R$ 8.157,41. O desconto foi travado no máximo permitido de R$ 951,63.
                                                    </p>
                                                </div>
                                            )}
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
                                Tabela INSS 2025 (Oficial)
                            </h3>
                            <div className="space-y-4">
                                <div className="p-3 rounded-xl border bg-white/5 border-white/5">
                                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2 pb-2 border-b border-white/5">
                                        <span>Faixa Salarial</span>
                                        <span className="text-center">Alíquota</span>
                                        <span className="text-right">Dedução</span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-2 items-center">
                                            <span className="text-xs text-gray-300">Até R$ 1.518,00</span>
                                            <span className="text-sm font-bold text-blue-400 text-center">7,5%</span>
                                            <span className="text-xs text-gray-400 text-right">-</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 items-center">
                                            <span className="text-xs text-gray-300">Até R$ 2.793,88</span>
                                            <span className="text-sm font-bold text-blue-400 text-center">9%</span>
                                            <span className="text-xs text-gray-400 text-right">R$ 22,77</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 items-center">
                                            <span className="text-xs text-gray-300">Até R$ 4.190,83</span>
                                            <span className="text-sm font-bold text-blue-400 text-center">12%</span>
                                            <span className="text-xs text-gray-400 text-right">R$ 106,59</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 items-center">
                                            <span className="text-xs text-gray-300">Até R$ 8.157,41</span>
                                            <span className="text-sm font-bold text-blue-400 text-center">14%</span>
                                            <span className="text-xs text-gray-400 text-right">R$ 190,40</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-200/80">
                                    Quem possui rendimentos acima de <strong>R$ 8.157,41</strong> contribui com o valor fixo de R$ 951,63, independentemente do salário total.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-12 mb-24">
                    {/* Erros Comuns */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-red-500/10 p-3 rounded-xl shrink-0">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Erros Comuns ao Calcular</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            O erro mais grave é aplicar a porcentagem cheia sobre o salário total. Se você ganha <strong>R$ 4.000,00</strong>, a conta <strong>não é</strong> 4.000 × 12%.
                        </p>
                        <p className="text-gray-400 mb-6">
                            O sistema brasileiro é progressivo. Você paga 7,5% sobre a fatia do salário mínimo, 9% sobre a segunda fatia e 12% apenas sobre o restante. Fazer a multiplicação direta infla o valor do imposto indevidamente.
                        </p>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <p className="text-sm text-gray-400">
                                Para ter uma visão completa do seu dinheiro, incluindo descontos de IRRF, utilize nossa <Link to="/calculadoras/salario-liquido" className="text-blue-400 hover:text-blue-300 underline">Calculadora de Salário Líquido</Link>.
                            </p>
                        </div>
                    </div>

                    {/* Como Calcular */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <FileText className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Como Calcular (Passo a Passo com Exemplos)</h2>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6">
                            A maneira mais segura de fazer a conta manual é utilizando a <strong>Parcela a Deduzir</strong>. Ela corrige a distorção da multiplicação direta.
                        </p>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/5 mb-8">
                            <div className="font-mono text-blue-400 bg-black/30 p-4 rounded-lg text-center mb-8 border border-white/10">
                                Desconto = (Salário × Alíquota) - Parcela a Deduzir
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white">Exemplo 1: Salário Médio (R$ 3.500,00)</h3>
                                    <p className="text-sm text-gray-400">Este salário está na <strong>3ª Faixa</strong> (de R$ 2.793,89 até R$ 4.190,83).</p>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                                        <li><strong>Alíquota:</strong> 12%</li>
                                        <li><strong>Cálculo:</strong> (3.500 × 0,12) - 106,59</li>
                                        <li><strong>Matemática:</strong> 420,00 - 106,59</li>
                                        <li><strong>Resultado Final:</strong> <span className="text-white font-bold">R$ 313,41</span></li>
                                    </ul>
                                </div>

                                <div className="space-y-4 pt-8 border-t border-white/10">
                                    <h3 className="text-lg font-bold text-white">Exemplo 2: Salário Alto (R$ 7.500,00)</h3>
                                    <p className="text-sm text-gray-400">Este salário está na <strong>4ª Faixa</strong> (de R$ 4.190,84 até R$ 8.157,41).</p>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                                        <li><strong>Alíquota:</strong> 14%</li>
                                        <li><strong>Cálculo:</strong> (7.500 × 0,14) - 190,40</li>
                                        <li><strong>Matemática:</strong> 1.050,00 - 190,40</li>
                                        <li><strong>Resultado Final:</strong> <span className="text-white font-bold">R$ 859,60</span></li>
                                    </ul>
                                    <p className="text-xs text-gray-500 italic mt-2">* Nota: A alíquota efetiva (real) neste caso é de 11,46%, bem abaixo dos 14% nominais.</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-400">
                            Dica: O desconto do INSS reduz a base de cálculo para o Imposto de Renda. Se você tem dúvidas sobre quanto seu dinheiro rende no longo prazo, simule também na <Link to="/calculadoras/fgts" className="text-blue-400 hover:text-blue-300 underline">Calculadora de FGTS</Link>.
                        </p>
                    </div>

                    {/* Comparativo CLT vs Autônomo */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <DollarSign className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Comparativo: CLT vs Autônomo</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Para quem está decidindo entre aceitar uma vaga CLT ou trabalhar como PJ, a diferença na contribuição pesa no bolso.
                        </p>

                        <div className="overflow-x-auto mb-6 rounded-xl border border-white/10">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-white/5 text-gray-300 uppercase">
                                    <tr>
                                        <th className="px-6 py-3">Detalhe</th>
                                        <th className="px-6 py-3">CLT (Carteira Assinada)</th>
                                        <th className="px-6 py-3">Autônomo (Individual)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 bg-white/5">
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-white">Custo</td>
                                        <td className="px-6 py-4 text-gray-300">Descontado do salário (Progressivo)</td>
                                        <td className="px-6 py-4 text-gray-300">Paga via guia GPS (Fixo)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-white">Alíquota</td>
                                        <td className="px-6 py-4 text-gray-300">7,5% a 14% (Efetiva é menor)</td>
                                        <td className="px-6 py-4 text-gray-300">Geralmente 11% ou 20%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-white">Obrigatoriedade</td>
                                        <td className="px-6 py-4 text-gray-300">Automática pela empresa</td>
                                        <td className="px-6 py-4 text-gray-300">Responsabilidade do profissional</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-white">Base Legal</td>
                                        <td className="px-6 py-4 text-gray-300">CLT e Portarias anuais</td>
                                        <td className="px-6 py-4 text-gray-300">Lei 8.212/91</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-gray-400">
                            Para um comparativo financeiro completo, acesse a ferramenta <Link to="/calculadoras/clt-vs-pj" className="text-blue-400 hover:text-blue-300 underline">CLT vs PJ</Link>.
                        </p>
                    </div>

                    {/* Casos Especiais */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-purple-500/10 p-3 rounded-xl shrink-0">
                                <Award className="w-6 h-6 text-purple-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Casos Especiais</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-3">Teto do Desconto</h3>
                                <p className="text-sm text-gray-400">
                                    Para quem ganha R$ 10.000,00 ou mais, o INSS trava no teto de R$ 8.157,41. O desconto máximo é <strong>R$ 951,63</strong>.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-3">Aposentado que Trabalha</h3>
                                <p className="text-sm text-gray-400">
                                    Quem já é aposentado mas continua com carteira assinada <strong>é obrigado a contribuir</strong>. O valor não aumenta a aposentadoria existente.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-3">13º Salário e Férias</h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    A tributação do abono natalino é exclusiva na fonte. Você deve calcular o INSS do 13º isoladamente.
                                </p>
                                <Link to="/calculadoras/decimo-terceiro" className="text-xs text-blue-400 hover:text-blue-300 inline-block">Calcular Décimo Terceiro &rarr;</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={INSS_FAQS}
                    title="Perguntas Frequentes (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section >
    );
}
