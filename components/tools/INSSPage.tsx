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
        question: "Qual o valor máximo do teto do INSS em 2025?",
        answer: "O teto previdenciário oficial para 2025 é de R$ 8.157,41. Isso significa que qualquer valor salarial que ultrapasse essa quantia não sofrerá tributação adicional para a previdência. O desconto máximo que um trabalhador no regime geral pode ter em seu contracheque é travado em R$ 951,63."
    },
    {
        question: "Como calcular o INSS de quem ganha um salário mínimo?",
        answer: "Para quem recebe o piso nacional de R$ 1.518,00, o cálculo é direto e cai na primeira faixa da tabela. Aplica-se a alíquota de 7,5% sobre o valor total, resultando em um desconto de R$ 113,85. Não há parcela a deduzir nesta faixa específica."
    },
    {
        question: "A isenção de Imposto de Renda até R$ 5.000 já vale para 2025?",
        answer: "Não, esta regra não está vigente. A Lei nº 15.270/2025 sancionou a nova tabela de isenção ampliada, porém sua eficácia jurídica começa apenas em 1º de janeiro de 2026. Para todo o ano calendário de 2025, deve-se utilizar as tabelas e regras de dedução antigas para evitar pendências com a Receita Federal."
    },
    {
        question: "O desconto do INSS é calculado sobre o salário bruto ou líquido?",
        answer: "A base de cálculo do INSS é sempre o salário bruto (também chamado de salário de contribuição), que inclui horas extras e adicionais. Ele é a primeira dedução a ocorrer na folha. O Imposto de Renda e outros descontos são calculados somente sobre o valor que resta após a subtração do INSS."
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
        "description": "Calcule o desconto exato do INSS 2025 com a nova tabela progressiva. Veja alíquotas, deduções e o impacto do salário mínimo de R$ 1.518,00 no seu bolso.",
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
            "Exemplo Prático de Cálculo"
        ]
    };

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Calculadora INSS 2025: Desconto Oficial e Tabela Atualizada"
                description="Calcule o desconto exato do INSS 2025 com a nova tabela progressiva. Veja alíquotas, deduções e o impacto do salário mínimo de R$ 1.518,00 no seu bolso."
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
                            Calculadora de Desconto <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">INSS 2025</span>
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left md:text-center">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-xs text-gray-400 block">Salário Mínimo (Base)</span>
                                <span className="text-sm font-bold text-white">R$ 1.518,00</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-xs text-gray-400 block">Teto do INSS (Máximo)</span>
                                <span className="text-sm font-bold text-white">R$ 8.157,41</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-xs text-gray-400 block">Desconto Máximo</span>
                                <span className="text-sm font-bold text-white">R$ 951,63</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-xs text-gray-400 block">Legislação</span>
                                <span className="text-sm font-bold text-white">Portaria MPS/MF nº 6</span>
                            </div>
                        </div>

                        <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-6">
                            A atualização fiscal de 2025 elevou o teto de contribuição para mais de oito mil reais. O sistema permanece <strong>progressivo</strong>. Nossa calculadora aplica automaticamente a dedução correta.
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
                    {/* Exemplo Prático */}
                    <div className="grid md:grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                    <FileText className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Como o cálculo é feito na prática? (Exemplo Real)</h2>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-6">
                                A alíquota nominal (aquela que aparece na tabela, como 12% ou 14%) quase nunca é a porcentagem real que sai do seu bolso. Para facilitar a conta manual, utilizamos a <strong>Parcela a Deduzir</strong>.
                            </p>

                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 mb-8">
                                <h3 className="text-lg font-bold text-white mb-4">Vamos a um exemplo prático de um salário de R$ 3.000,00:</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-3 rounded-lg bg-black/20">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0">1</div>
                                        <div className="text-gray-300 text-sm">
                                            <strong>Identificação da Faixa:</strong> R$ 3.000,00 está na 3ª faixa (entre 2.793,89 e 4.190,83).
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-3 rounded-lg bg-black/20">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0">2</div>
                                        <div className="text-gray-300 text-sm">
                                            <strong>Aplicação da Alíquota:</strong> Multiplica-se o salário por 12%. <br />
                                            <span className="text-blue-400 font-mono mt-1 block">3.000,00 x 12% = 360,00</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-3 rounded-lg bg-black/20">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0">3</div>
                                        <div className="text-gray-300 text-sm">
                                            <strong>Subtração da Dedução:</strong> Subtrai-se a parcela fixa da tabela (R$ 106,59). <br />
                                            <span className="text-blue-400 font-mono mt-1 block">360,00 - 106,59 = R$ 253,41</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                    <p className="text-sm text-blue-200">
                                        Neste exemplo, o desconto real foi de R$ 253,41. Se dividirmos esse valor pelo salário (253,41 ÷ 3000), descobrimos que a <strong>alíquota efetiva</strong> é de apenas <strong>8,45%</strong>, e não os 12% nominais.
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-400 mb-6">
                                Para ver como isso impacta o restante das suas finanças, incluindo o Imposto de Renda, utilize nossa <Link to="/calculadoras/salario-liquido" className="text-blue-400 hover:text-blue-300 underline">Calculadora de Salário Líquido</Link>.
                            </p>
                        </div>
                    </div>

                    {/* Erros Comuns */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-red-500/10 p-3 rounded-xl shrink-0">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Erros comuns ao calcular o INSS</h2>
                        </div>
                        <p className="text-gray-400 mb-6">A complexidade das regras de 2025 gera muitas dúvidas. Evite os erros abaixo:</p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-3">13º Salário</h3>
                                <p className="text-sm text-gray-400">
                                    O Décimo Terceiro possui tributação exclusiva. Ele nunca deve ser somado ao salário de dezembro para enquadramento na tabela. O cálculo dele é isolado.
                                </p>
                                <Link to="/calculadoras/decimo-terceiro" className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block">Calcular Décimo Terceiro &rarr;</Link>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-3">Férias</h3>
                                <p className="text-sm text-gray-400">
                                    Se você tirou 20 dias de Férias e trabalhou o resto do mês, o INSS do saldo de salário deve considerar o que já foi descontado nas férias. Reiniciar a tabela do zero gera recolhimento incorreto.
                                </p>
                                <Link to="/calculadoras/ferias" className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block">Calcular Férias &rarr;</Link>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-3">Isenção IR (2026)</h3>
                                <p className="text-sm text-gray-400">
                                    A lei que amplia a isenção do Imposto de Renda de R$ 5.000 foi aprovada, mas só entra em vigor em <strong>2026</strong>. Para 2025, os descontos seguem a tabela antiga.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pró-Labore */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <DollarSign className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Pró-Labore e Autônomos</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Para empresários e prestadores de serviço, a lógica progressiva acima nem sempre se aplica.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                <div>
                                    <h3 className="text-white font-bold">Pró-Labore</h3>
                                    <p className="text-sm text-gray-400">Sócios de empresas no Simples Nacional (Anexos I, II, III e V) pagam geralmente <strong>11%</strong> fixos sobre a retirada.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                <div>
                                    <h3 className="text-white font-bold">Autônomos</h3>
                                    <p className="text-sm text-gray-400">A regra padrão é <strong>20%</strong> sobre o salário de contribuição, limitado ao teto.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm text-gray-400">
                                Se você está avaliando se vale a pena ser autônomo ou funcionário, nossa ferramenta de comparação <Link to="/calculadoras/clt-vs-pj" className="text-blue-400 hover:text-blue-300 underline">CLT vs PJ</Link> detalha todos esses custos.
                            </p>
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
