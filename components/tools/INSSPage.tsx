import React, { useState, useEffect } from 'react';
import { Calculator, FileText, TrendingDown, ArrowRight, ShieldCheck, DollarSign, AlertCircle, CheckCircle, Info, Award, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const INSS_FAQS: FAQItem[] = [
    {
        question: "Qual o valor do desconto do INSS para quem ganha um salário mínimo em 2025?",
        answer: "Quem recebe o piso nacional de <strong>R$ 1.518,00</strong> terá um desconto exato de <strong>7,5%</strong>, resultando em uma contribuição de <strong>R$ 113,85</strong>. Neste cenário, não há aplicação de outras faixas progressivas. O salário líquido restante, antes de outros descontos como vale-transporte, será de <strong>R$ 1.404,15</strong>. Você pode simular outros valores na <strong>Calculadora INSS 2025</strong> acima."
    },
    {
        question: "O que acontece se eu ganhar mais que o teto de R$ 8.157,41?",
        answer: "O desconto do INSS estaciona no limite estabelecido pela previdência. O valor descontado será fixo em <strong>R$ 951,63</strong>, independentemente de o salário ser R$ 10.000,00 ou R$ 50.000,00. Este teto é o limite máximo calculado pela <strong>Calculadora INSS 2025</strong>; todo o valor que ultrapassar R$ 8.157,41 fica isento de contribuição previdenciária."
    },
    {
        question: "Como calcular INSS sobre férias em 2025?",
        answer: "O cálculo nas férias incide sobre a remuneração das férias acrescida do <strong>terço constitucional</strong>. Deve-se somar o salário base + 1/3, verificar em qual faixa da tabela de 2025 esse total se encaixa e aplicar a alíquota progressiva. Frequentemente, o trabalhador muda de faixa no mês das férias."
    },
    {
        question: "A tabela do INSS 2025 já está oficializada?",
        answer: "Sim. A tabela com o salário mínimo de <strong>R$ 1.518,00</strong> e o reajuste de 4,77% para as demais faixas foi totalmente oficializada. Os dados constam na <a href='https://www.gov.br/previdencia/pt-br/assuntos/rpps/destaques/portaria-interministerial-mps-mf-no-6-de-10-01-2025' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>Portaria Interministerial MPS/MF nº 6</a>, publicada em janeiro de 2025, garantindo a validade jurídica para todos os cálculos de folha de pagamento deste ano."
    },
    {
        question: "Autônomo pode pagar INSS retroativo?",
        answer: "Sim, mas com ressalvas. Se for a primeira contribuição, só é possível pagar em dia. Para períodos passados, é necessário comprovar a atividade profissional e calcular juros e multa. É recomendável consultar a <a href='https://www.gov.br/previdencia/pt-br/assuntos/rpps/destaques/portaria-interministerial-mps-mf-no-6-de-10-01-2025' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>Portaria Interministerial MPS/MF nº 6</a> para verificar as regras de atualização monetária vigentes."
    },
    {
        question: "O desconto do INSS muda o valor do vale-transporte?",
        answer: "Não diretamente. O INSS é descontado do salário bruto. O vale-transporte (até 6%) também é calculado sobre o salário base, não sobre o líquido após INSS. No entanto, o INSS reduz a base de cálculo para o Imposto de Renda (IRRF)."
    },
    {
        question: "Aposentado que continua trabalhando paga INSS 2025?",
        answer: "Sim. O aposentado que retorna ao mercado de trabalho com carteira assinada (CLT) é obrigado a contribuir normalmente para a Previdência Social, conforme a tabela do <strong>INSS 2025</strong>. O desconto segue as mesmas alíquotas progressivas, mas infelizmente essa contribuição não gera direito a um novo benefício ou revisão da aposentadoria atual."
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

        // Ensure we don't return negative discount
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
        "description": "Use nossa Calculadora INSS 2025 oficial. Tabela progressiva, teto de R$ 8.157,41 e desconto máximo de R$ 951,63. Veja o passo a passo atualizado.",
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
                title="Calculadora INSS 2025: Tabela Oficial e Desconto"
                description="Use nossa Calculadora INSS 2025 oficial. Tabela progressiva, teto de R$ 8.157,41 e desconto máximo de R$ 951,63. Veja o passo a passo atualizado."
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

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <ShieldCheck className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Portaria MPS/MF nº 6 de 2025</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de INSS 2025: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Tabela Oficial e Desconto Atualizado (Com Dedução)</span>
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator */}
                    <div className="lg:col-span-7">
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
                                            inputMode="decimal"
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

                    {/* Sidebar Info - Resumo Rápido */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full">
                            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Resumo Rápido: Dados Oficiais 2025
                            </h3>
                            <p className="text-gray-400 mb-6 text-sm">
                                A tabela do <strong>INSS 2025</strong> foi atualizada com o novo salário mínimo de R$ 1.518,00 e reajuste de 4,77% no teto previdenciário. Confira abaixo os valores exatos para o cálculo da sua folha de pagamento em dezembro de 2025:
                            </p>
                            <div className="space-y-4">
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 p-3 rounded-xl border bg-white/5 border-white/5">
                                        <div className="text-blue-500 mt-0.5">•</div>
                                        <div>
                                            <span className="text-white font-medium block">Salário Mínimo</span>
                                            <span className="text-sm text-gray-400">R$ 1.518,00 (Base da 1ª faixa)</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 p-3 rounded-xl border bg-white/5 border-white/5">
                                        <div className="text-blue-500 mt-0.5">•</div>
                                        <div>
                                            <span className="text-white font-medium block">Teto do INSS</span>
                                            <span className="text-sm text-gray-400">R$ 8.157,41 (Limite máximo)</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 p-3 rounded-xl border bg-white/5 border-white/5">
                                        <div className="text-blue-500 mt-0.5">•</div>
                                        <div>
                                            <span className="text-white font-medium block">Desconto Máximo</span>
                                            <span className="text-sm text-gray-400">R$ 951,63 (Acima do teto)</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 p-3 rounded-xl border bg-white/5 border-white/5">
                                        <div className="text-blue-500 mt-0.5">•</div>
                                        <div>
                                            <span className="text-white font-medium block">Alíquotas</span>
                                            <span className="text-sm text-gray-400">Progressivas: 7,5%, 9%, 12% e 14%</span>
                                        </div>
                                    </li>
                                </ul>

                                <div className="mt-6 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                                    <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-blue-200/80">
                                        <strong>Resumo em 30 segundos:</strong> Em 2025, o teto é R$ 8.157,41 e o desconto segue tabela progressiva. Use a <strong>Calculadora INSS 2025</strong> para obter o valor líquido exato com a dedução legal.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Intro Text */}
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        O cálculo do INSS mudou com o novo salário mínimo de <strong>R$ 1.518,00</strong> vigente em 2025. Para trabalhadores CLT, o desconto não é mais uma porcentagem simples sobre o total, mas sim um cálculo progressivo dividido em faixas salariais. Quem recebe acima de <strong>R$ 8.157,41</strong> pagará o valor fixo de teto, estabelecido em <strong>R$ 951,63</strong>. Esta <strong>Calculadora INSS 2025</strong> aplica a <strong>Portaria Interministerial MPS/MF nº 6</strong> para entregar o valor exato a ser descontado do seu holerite ou pró-labore.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-12 mb-24">
                    {/* Tabela INSS 2025 Oficial */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <TrendingDown className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Tabela INSS 2025 Oficial (Com Parcela a Deduzir)
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            A tabela abaixo é a referência absoluta para o cálculo de contribuição previdenciária de trabalhadores empregados, domésticos e avulsos em 2025. A coluna "Parcela a Deduzir" é essencial para realizar o cálculo manual de forma simplificada, validando o resultado apresentado pela <strong>Calculadora INSS 2025</strong> sem precisar somar faixa por faixa.
                        </p>

                        <div className="overflow-x-auto rounded-xl border border-white/10 mb-6">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-white/5 text-gray-300">
                                    <tr>
                                        <th className="p-4 font-semibold text-white">Faixa de Salário de Contribuição (R$)</th>
                                        <th className="p-4 font-semibold text-white text-center">Alíquota Progressiva</th>
                                        <th className="p-4 font-semibold text-white text-center">Parcela a Deduzir (R$)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-400">
                                    <tr>
                                        <td className="p-4">Até <strong>R$ 1.518,00</strong></td>
                                        <td className="p-4 text-center">7,5%</td>
                                        <td className="p-4 text-center">-</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">De R$ 1.518,01 até R$ 2.793,88</td>
                                        <td className="p-4 text-center">9%</td>
                                        <td className="p-4 text-center">R$ 22,77</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">De R$ 2.793,89 até R$ 4.190,83</td>
                                        <td className="p-4 text-center">12%</td>
                                        <td className="p-4 text-center">R$ 106,59</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">De R$ 4.190,84 até <strong>R$ 8.157,41</strong></td>
                                        <td className="p-4 text-center">14%</td>
                                        <td className="p-4 text-center">R$ 190,40</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-sm text-gray-400">
                                <strong>Fonte Oficial:</strong> Dados baseados na <a href="https://www.gov.br/previdencia/pt-br/assuntos/rpps/destaques/portaria-interministerial-mps-mf-no-6-de-10-01-2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Portaria Interministerial MPS/MF nº 6</a>, que oficializou o reajuste de 4,77% para 2025.
                            </p>
                        </div>
                    </div>

                    {/* Como funciona a Progressividade */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <HelpCircle className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Como funciona a Progressividade do INSS</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Desde a Reforma da Previdência (<a href="http://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc103.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Emenda Constitucional nº 103</a>), o cálculo do INSS deixou de ser uma alíquota única aplicada sobre todo o salário. Hoje, ele funciona como um sistema de "degraus" e nossa <strong>Calculadora INSS 2025</strong> considera isso automaticamente.
                        </p>
                        <p className="text-gray-400 mb-6">
                            Se você ganha R$ 3.000,00, você não paga 12% sobre tudo. Você paga:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-300 mb-6">
                            <li><strong>7,5%</strong> sobre a parcela que vai até R$ 1.518,00;</li>
                            <li><strong>9%</strong> sobre a parcela entre R$ 1.518,01 e R$ 2.793,88;</li>
                            <li><strong>12%</strong> apenas sobre o restante que ultrapassa R$ 2.793,88.</li>
                        </ol>
                        <p className="text-gray-400">
                            Isso torna a <strong>alíquota efetiva</strong> (o que você realmente paga) menor do que a alíquota nominal da tabela.
                        </p>
                    </div>

                    {/* Como Calcular (Passo a Passo) */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <FileText className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Como Calcular o Desconto (Passo a Passo)</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Para facilitar a vida de profissionais de RH e trabalhadores, utilizamos a fórmula da "Parcela a Deduzir". Com ela, você ajusta a progressividade em uma única conta matemática, garantindo o mesmo resultado da <strong>Calculadora INSS 2025</strong> online.
                        </p>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/5 mb-8">
                            <h3 className="text-lg font-bold text-white mb-4">A Fórmula Mágica</h3>
                            <div className="font-mono text-blue-400 bg-black/30 p-4 rounded-lg text-center mb-6 border border-white/10">
                                (Salário Bruto × Alíquota da Faixa) - Parcela a Deduzir = Valor do INSS
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white">Exemplo Prático: Salário de R$ 3.000,00</h3>
                                    <p className="text-sm text-gray-400">Um trabalhador com salário de R$ 3.000,00 se enquadra na 3ª faixa (alíquota de 12%).</p>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                                        <li><strong>1. Identifique a alíquota:</strong> 12% (pois R$ 3.000 está entre R$ 2.793,89 e R$ 4.190,83).</li>
                                        <li><strong>2. Identifique a dedução:</strong> R$ 106,59.</li>
                                        <li><strong>3. Aplique a fórmula:</strong> (3.000,00 × 0,12) - 106,59</li>
                                        <li><strong>Resultado:</strong> 360,00 - 106,59 = <span className="text-white font-bold">R$ 253,41</span></li>
                                    </ul>
                                    <p className="text-xs text-gray-500 italic mt-2">O desconto será de <strong>R$ 253,41</strong>. Se você aplicasse 12% direto, o valor seria R$ 360,00, o que estaria errado.</p>
                                </div>

                                <div className="space-y-4 pt-8 border-t border-white/10">
                                    <h3 className="text-lg font-bold text-white">Exemplo Prático: Salário acima do Teto (ex: R$ 10.000,00)</h3>
                                    <p className="text-sm text-gray-400">Para quem ganha R$ 10.000,00 (ou qualquer valor acima de R$ 8.157,41), a <strong>Calculadora INSS 2025</strong> utiliza a base travada no teto.</p>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                                        <li><strong>1. Identifique a faixa:</strong> Teto máximo (base de cálculo limitada a R$ 8.157,41).</li>
                                        <li><strong>2. Aplique a fórmula no Teto:</strong> (8.157,41 × 0,14) - 190,40</li>
                                        <li><strong>Resultado:</strong> 1.142,03 - 190,40 = <span className="text-white font-bold">R$ 951,63</span></li>
                                    </ul>
                                    <p className="text-xs text-gray-500 italic mt-2">O desconto será de <strong>R$ 951,63</strong>. Qualquer valor de salário que exceda o teto é isento de contribuição para o INSS.</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400">
                            Após descobrir o desconto do INSS, o próximo passo para saber quanto dinheiro cairá na sua conta é calcular o Imposto de Renda. Você pode fazer isso utilizando nossa <Link to="/calculadoras/salario-liquido" className="text-blue-400 hover:text-blue-300 underline">calculadora de salário líquido 2025</Link>, que já considera o INSS deduzido na base de cálculo do IRRF.
                        </p>
                    </div>

                    {/* Erros Comuns */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-red-500/10 p-3 rounded-xl shrink-0">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Erros Comuns ao Calcular o INSS</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            A complexidade da tabela progressiva gera falhas frequentes nas folhas de pagamento manuais, tornando indispensável o uso da <strong>Calculadora INSS 2025</strong> para conferência e prevenção de equívocos.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-gray-300">
                                <span className="text-red-500 font-bold">•</span>
                                <span><strong>Ignorar a Dedução:</strong> O erro mais grave é multiplicar o salário direto pela alíquota (ex: R$ 5.000 x 14% = R$ 700,00). O valor correto, usando a dedução de R$ 190,40, seria R$ 509,60.</span>
                            </li>
                            <li className="flex gap-3 text-gray-300">
                                <span className="text-red-500 font-bold">•</span>
                                <span><strong>Confusão com o FGTS:</strong> O desconto do INSS reduz o salário líquido, mas <strong>não</strong> reduz a base de cálculo do Fundo de Garantia. O depósito de 8% do empregador é feito sobre o salário bruto e não sofre impacto da tabela previdenciária.</span>
                            </li>
                            <li className="flex gap-3 text-gray-300">
                                <span className="text-red-500 font-bold">•</span>
                                <span><strong>Férias e Adicionais:</strong> Quando você recebe o terço constitucional de férias ou <Link to="/calculadoras/horas-extras" className="text-blue-400 hover:text-blue-300 underline">horas extras</Link>, sua remuneração no mês aumenta. Isso pode fazer você "saltar" para uma faixa de alíquota superior temporariamente, aumentando o desconto. Entenda melhor o impacto financeiro no seu descanso em nossa página sobre <Link to="/calculadoras/ferias" className="text-blue-400 hover:text-blue-300 underline">cálculo de férias</Link>.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Guia Avançado: Autônomos */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-purple-500/10 p-3 rounded-xl shrink-0">
                                <Award className="w-6 h-6 text-purple-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Guia Avançado: Autônomos, Pró-Labore e Estagiários</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            A tabela progressiva acima é exclusiva para quem tem carteira assinada (CLT), sendo o foco principal da <strong>Calculadora INSS 2025</strong>. Outras modalidades de trabalho seguem regras próprias neste ano.
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-3">Diferença: CLT vs. Autônomo</h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    A principal diferença no cálculo é que, enquanto o trabalhador CLT paga conforme a tabela progressiva, o autônomo paga uma <strong>alíquota fixa</strong> aplicada diretamente sobre o salário de contribuição, sem parcelas a deduzir. Para quem recolhe via GPS (Guia da Previdência Social), existem dois planos principais, conforme orientações da <a href="https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/tributos/contribuicoes-previdenciarias" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Receita Federal do Brasil</a>:
                                </p>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li><strong>1. Plano Normal (20%):</strong> Dá direito à aposentadoria por tempo de contribuição. O valor é 20% sobre o salário de contribuição (limitado ao teto de R$ 8.157,41).</li>
                                    <li><strong>2. Plano Simplificado (11%):</strong> Apenas para aposentadoria por idade (pelo salário mínimo). A alíquota é 11% sobre o salário mínimo (R$ 1.518,00).</li>
                                </ul>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                    <h3 className="text-lg font-bold text-white mb-3">Pró-Labore (Sócios)</h3>
                                    <p className="text-sm text-gray-400 mb-4">
                                        Sócios pagam <strong>11% fixos</strong> sobre o valor bruto, até o teto. Sem progressividade de 7,5% ou 9%. A empresa paga mais 20% de Patronal, salvo se for do Simples Nacional em anexo desonerado. Duvidas? Use a calculadora <Link to="/calculadoras/clt-vs-pj" className="text-blue-400 hover:text-blue-300 underline">CLT vs PJ</Link>.
                                    </p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                    <h3 className="text-lg font-bold text-white mb-3">Estagiários</h3>
                                    <p className="text-sm text-gray-400">
                                        Pela Lei do Estágio, a bolsa-auxílio <strong>não sofre desconto de INSS</strong>. O estagiário é isento, a menos que decida contribuir como segurado facultativo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Teto e 13o */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-green-500/10 p-3 rounded-xl shrink-0">
                                <DollarSign className="w-6 h-6 text-green-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">Qual o Teto do INSS em 2025?</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            O limite máximo de salário de contribuição em 2025 é <strong>R$ 8.157,41</strong>. Isso significa que, mesmo que um diretor de empresa ganhe R$ 30.000,00 mensais, ele só contribuirá para a previdência sobre os R$ 8.157,41.
                        </p>
                        <p className="text-gray-400 mb-6">
                            Consequentemente, existe um <strong>Desconto Máximo</strong> travado. Ninguém que segue a tabela progressiva CLT pagará mais do que <strong>R$ 951,63</strong> de INSS neste ano. Esse valor é a soma de todas as faixas máximas acumuladas.
                        </p>
                        <p className="text-gray-400">
                            Ao receber o <Link to="/calculadoras/decimo-terceiro" className="text-blue-400 hover:text-blue-300 underline">13º salário</Link>, o teto é calculado separadamente. Ou seja, você pode atingir o teto no salário mensal e também no pagamento natalino, contribuindo duplamente no ano, mas sobre competências diferentes.
                        </p>
                    </div>
                </div>

                <FAQ
                    items={INSS_FAQS}
                    title="Perguntas Frequentes sobre INSS 2025"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section >
    );
}
