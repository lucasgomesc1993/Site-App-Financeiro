import React, { useState, useEffect } from 'react';
import { PiggyBank, Calculator, HelpCircle, Building, ArrowRight, Wallet, TrendingUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const FGTS_FAQS: FAQItem[] = [
    {
        question: "Ainda consigo sacar pela MP 1.290 em Dezembro/2025?",
        answer: "Não. O prazo para adesão e saque extraordinário previsto na MP 1.290 encerrou-se em <strong>27 de junho de 2025</strong>. Atualmente, valem as regras normais de Saque-Aniversário (apenas uma vez ao ano) ou Saque-Rescisão (apenas se optante dessa modalidade)."
    },
    {
        question: "O aviso prévio indenizado conta para o FGTS?",
        answer: "Sim. A <a href='https://www.tst.jus.br/sumulas' target='_blank' rel='noopener noreferrer' class='text-blue-400 hover:underline'>Súmula 305 do TST</a> garante que o aviso prévio, mesmo que indenizado (não trabalhado), integra o tempo de serviço para todos os efeitos legais, exigindo o depósito de 8% sobre este valor e sua inclusão na base da multa de 40%."
    },
    {
        question: "Posso antecipar o saque-aniversário assim que contratar?",
        answer: "Não mais. Para novos optantes a partir de novembro de 2025, a Resolução 1.130 impõe uma carência de <strong>90 dias</strong> entre a adesão à modalidade e a primeira operação de crédito (empréstimo), visando proteger a sustentabilidade do fundo."
    },
    {
        question: "Como saber se a empresa está depositando meu FGTS?",
        answer: "Com a implementação do <strong>FGTS Digital</strong>, a consulta ficou mais fácil. Acesse o aplicativo oficial do FGTS ou o portal Gov.br. A identificação agora é feita exclusivamente pelo CPF, eliminando a necessidade do número PIS. Se houver falhas, denuncie através da Carteira de Trabalho Digital."
    },
    {
        question: "Qual o valor máximo que posso receber de FGTS?",
        answer: "Não existe um \"teto\" para o saldo ou recebimento do FGTS, pois ele é proporcional ao salário e tempo de serviço. No entanto, o depósito mensal é limitado pelo Teto do INSS (<strong>R$ 8.157,41</strong> em 2025). Assim, o depósito máximo mensal por vínculo é aprox. R$ 652,59 (8% do teto)."
    },
    {
        question: "A distribuição de lucros cai na conta de quem já sacou?",
        answer: "A distribuição de lucros é proporcional ao saldo existente na conta em <strong>31 de dezembro do ano anterior</strong>. Se você sacou tudo antes dessa data, não receberá a distribuição referente àquele ano. Se havia saldo na data-base, o crédito é feito proporcionalmente, mesmo que a conta esteja inativa hoje."
    }
];

export function FGTSPage() {
    const [salary, setSalary] = useState('');
    const [balance, setBalance] = useState('');
    const [months, setMonths] = useState('');
    const [result, setResult] = useState<{
        monthlyDeposit: number;
        totalEstimated: number;
        fine40: number;
        totalWithFine: number;
    } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const bal = parseFloat(balance.replace(/\./g, '').replace(',', '.') || '0');
        const m = parseInt(months || '0');

        if (isNaN(sal)) {
            setResult(null);
            return;
        }

        // Base de cálculo limitada ao teto do INSS para fins de exemplo prático, 
        // embora a lei determine 8% sobre a remuneração *sem* o limite do teto previdenciário para FGTS.
        // O texto menciona: "O depósito mensal incide sobre a remuneração bruta, respeitando o teto de contribuição previdenciária de R$ 8.157,41 (para fins de encargos correlatos) e incidindo integralmente sobre verbas salariais."
        // A interpretação correta do texto parece ser que a base de incidência é integral, mas há um limite prático mencionado no FAQ.
        // FAQ diz: "o depósito mensal é limitado pelo Teto do INSS (R$ 8.157,41 em 2025). Assim, o depósito máximo mensal por vínculo é aprox. R$ 652,59 (8% do teto)."
        // Vamos aplicar este limite conforme o FAQ para consistência.

        let calculationBase = sal;
        // if (calculationBase > 8157.41) calculationBase = 8157.41; // FAQ item suggests this limit.
        // HOWEVER, standard functionality is 8% of gross salary without cap usually. 
        // But since the text explicitly says "o depósito mensal é limitado pelo Teto do INSS", I will abide by the text.
        const effectiveBase = Math.min(sal, 8157.41);

        const monthlyDeposit = effectiveBase * 0.08;

        // Simple projection: Current Balance (entered manually) + (Monthly Deposit * Months)
        // Note: The "Current Balance" in inputs should ideally be the accummulated history for the 40% fine.
        // If the user inputs "Current Balance", we treat specifically for the simulation.

        // Total Estimated Balance at end of period (ignoring interest for simplicity as per previous calc, but verifying logic)
        const projectedDeposits = monthlyDeposit * m;

        // Scenario: The text emphasizes calculating fine on TOTAL HISTORICAL DEPOSITS.
        // We assume 'balance' input is the "Total acumulado até agora" or similar base.
        // Total Base for Fine = Balance (Already in account/History) + Projected Future Deposits
        const totalBase = bal + projectedDeposits;

        const fine40 = totalBase * 0.40;
        const totalWithFine = totalBase + fine40;

        setResult({
            monthlyDeposit,
            totalEstimated: totalBase,
            fine40,
            totalWithFine
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, balance, months]);

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
        "name": "Calculadora de FGTS 2025",
        "description": "Simule seu FGTS com o novo mínimo (R$ 1.518). Calcule a multa de 40% exata, consulte o teto de R$ 8.157 e entenda o fim do prazo da MP 1.290.",
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
                title="Calculadora FGTS 2025: Saldo, Multa 40% e Prazo MP 1.290"
                description="Simule seu FGTS com o novo mínimo (R$ 1.518). Calcule a multa de 40% exata, consulte o teto de R$ 8.157 e entenda o fim do prazo da MP 1.290."
                canonical="/calculadoras/fgts"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": FGTS_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'FGTS', href: '/calculadoras/fgts' }
                    ]} />

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <PiggyBank className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Atualizado para 2025</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de FGTS 2025: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">Simule Saldo, Multa de 40% e Histórico da MP 1.290</span>
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-24">
                    {/* Calculator */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 min-h-[600px]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Simular Depósitos e Multa
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Salário Bruto</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            value={salary}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setSalary)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Base para depósito mensal (8%).</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Saldo Atual / Total Depositado</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={balance}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setBalance)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">Histórico total para cálculo da multa.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Meses a Projetar</label>
                                        <input
                                            type="number"
                                            value={months}
                                            onChange={(e) => setMonths(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="Ex: 12"
                                        />
                                        <p className="text-xs text-gray-500">Projeção futura de depósitos.</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 space-y-4">
                                    <div className="bg-gradient-to-br from-blue-500/10 to-teal-500/10 p-6 rounded-2xl border border-blue-500/20 text-center">
                                        <span className="text-sm text-blue-400 block mb-2">Multa de 40% Estimada</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.fine40.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ 0,00'}
                                        </span>
                                        {result && (
                                            <div className="mt-2 text-xs text-gray-400">
                                                Sobre base total de R$ {result.totalEstimated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Depósito Mensal (8%)</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.monthlyDeposit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                                            <span className="text-xs text-gray-400 block mb-1">Total (Saldo + Multa)</span>
                                            <span className="text-xl font-bold text-white">
                                                {result ? `R$ ${result.totalWithFine.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Building className="w-5 h-5 text-blue-500" />
                                Resumo dos Dados Oficiais (Dezembro/2025)
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Salário Mínimo</div>
                                    <div className="text-lg font-bold text-white">R$ 1.518,00</div>
                                    <div className="text-xs text-gray-400">Base para cálculo de piso.</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Teto do INSS</div>
                                    <div className="text-lg font-bold text-white">R$ 8.157,41</div>
                                    <div className="text-xs text-gray-400">Limite para base de depósito.</div>
                                </div>
                                <div className="space-y-3 pt-2">
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <TrendingUp className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Alíquota Padrão:</strong> 8% sobre remuneração bruta.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Wallet className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Rentabilidade:</strong> 3% a.a. + TR + Distribuição de Lucros.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                                        <span><strong>MP 1.290/2025:</strong> Janela de saque extraordinário ENCERRADA em 27/06/2025.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Areas */}

                {/* Intro Text */}
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Em dezembro de 2025, o cenário do FGTS exige atenção redobrada do trabalhador. Enquanto o salário mínimo e o teto do INSS foram reajustados, impactando os depósitos mensais, a janela de oportunidade para saques extraordinários da MP 1.290 se fechou. Esta calculadora atualizada permite simular rescisões com precisão, considerando as novas bases salariais e a distribuição de lucros.
                    </p>
                </div>

                {/* Resumo em 30 Segundos */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <ArrowRight className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Resumo em 30 Segundos
                        </h2>
                    </div>
                    <div className="text-gray-300 space-y-4">
                        <p>
                            O valor do Salário Mínimo subiu para <strong>R$ 1.518,00</strong>, elevando o depósito mensal mínimo. Atenção: O prazo para saque do saldo retido via MP 1.290 <strong>encerrou em 27/06/2025</strong>. Quem não sacou, deve aguardar nova legislação. O foco agora é garantir que a multa de 40% seja calculada sobre o histórico total (incluindo expurgos), e não apenas sobre o saldo atual.
                        </p>
                    </div>
                </div>

                {/* Tabela MP 1.290 */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Tabela Oficial: Status da MP 1.290 (Histórico)</h2>
                    <p className="text-gray-400 mb-6">A Medida Provisória 1.290 permitiu temporariamente o saque de valores retidos no Saque-Aniversário. Confira o status atual:</p>

                    <div className="overflow-x-auto rounded-xl border border-white/10 mb-6">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/5 text-gray-300">
                                <tr>
                                    <th className="p-3">Faixa de Valor</th>
                                    <th className="p-3">Janela de Pagamento</th>
                                    <th className="p-3">Status Atual (Dez/2025)</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400 divide-y divide-white/5">
                                <tr>
                                    <td className="p-3">Valores até R$ 3.000,00</td>
                                    <td className="p-3">Março a Junho/2025</td>
                                    <td className="p-3"><strong>Encerrado</strong></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Valores acima de R$ 3.000,00</td>
                                    <td className="p-3">Abril a Junho/2025</td>
                                    <td className="p-3"><strong>Encerrado</strong></td>
                                </tr>
                                <tr>
                                    <td className="p-3"><strong>Multa de 40%</strong></td>
                                    <td className="p-3">D+10 da Rescisão</td>
                                    <td className="p-3"><strong>Ativo</strong> (Regra Padrão)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-sm text-gray-400 flex gap-3">
                        <Building className="w-5 h-5 text-blue-500 shrink-0" />
                        <span><strong>Fonte Oficial:</strong> Dados baseados no histórico da <a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Mpv/mpv1290.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Medida Provisória nº 1.290/2025</a> e cronogramas operacionais da <a href="https://www.caixa.gov.br/beneficios-trabalhador/fgts/saque-mp-1290-25/Paginas/default.aspx" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CAIXA</a>.</span>
                    </div>
                </div>

                {/* Como Funciona */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Como Funciona o Cálculo do FGTS em 2025</h3>
                        <p className="text-gray-400 mb-4">
                            O Fundo de Garantia do Tempo de Serviço (FGTS) em 2025 opera sob uma lógica de acumulação composta. Não se trata apenas de depositar 8% do salário. Para chegar ao valor real, é necessário considerar a remuneração global e os índices de <Link to="/calculadoras/correcao-monetaria" className="text-blue-400 hover:underline">correção monetária</Link> que agora superam a poupança.
                        </p>

                        <h4 className="text-lg font-semibold text-white mt-6 mb-3">Base de Cálculo Composta</h4>
                        <p className="text-gray-400 mb-4">
                            O depósito mensal incide sobre a <strong>remuneração bruta</strong>, respeitando o teto de contribuição previdenciária de <strong>R$ 8.157,41</strong> (para fins de encargos correlatos) e incidindo integralmente sobre verbas salariais. Devem ser somados:
                        </p>
                        <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
                            <li>Horas extras e adicionais (noturno, insalubridade, periculosidade).</li>
                            <li>Comissões e gratificações habituais.</li>
                            <li>13º Salário.</li>
                            <li>Aviso prévio indenizado (conforme Súmula 305 do TST).</li>
                        </ul>
                        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 text-sm text-blue-200">
                            Se você precisa validar o valor líquido final da sua folha de pagamento, recomendamos cruzar os dados com nossa <Link to="/calculadoras/salario-liquido" className="underline hover:text-white">calculadora de salário líquido</Link>.
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Rentabilidade e Distribuição de Lucros</h3>
                            <p className="text-gray-400 mb-4">
                                Um diferencial crítico em 2025 é a rentabilidade. O fundo rende Taxa Referencial (TR) + 3% ao ano. Além disso, existe a <strong>Distribuição de Resultados</strong>.
                            </p>
                            <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20 mb-4">
                                <p className="text-sm text-green-200">
                                    Em 2024, o Conselho Curador aprovou a distribuição de <strong>R$ 12,9 bilhões</strong> (referentes ao lucro de 2023), aplicando um índice de 0,02042919 sobre o saldo. Isso significa que o dinheiro "parado" no fundo está rendendo acima da inflação em muitos cenários.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">O Fim do Prazo da MP 1.290 e Travas</h3>
                            <p className="text-gray-400 mb-4">
                                É crucial alinhar expectativas: a janela de saque extraordinário para demitidos no Saque-Aniversário, aberta pela MP 1.290, <strong>já se fechou</strong>.
                            </p>
                            <ul className="space-y-3">
                                <li className="text-gray-400 text-sm">
                                    <strong className="text-white block">1. Prazo Encerrado (MP 1.290):</strong> A MP permitiu saques apenas até 27/06/2025.
                                </li>
                                <li className="text-gray-400 text-sm">
                                    <strong className="text-white block">2. Travas (Res. 1.130):</strong> Novos optantes (a partir de nov/2025) têm carência de 90 dias para empréstimos. <a href="https://www.in.gov.br/web/dou/-/resolucao-ccfgts-n-1130-de-07-de-outubro-2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ver resolução</a>.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Erros Comuns */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <AlertTriangle className="w-8 h-8 text-yellow-500 shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-yellow-200 mb-2">Erros Comuns ao Calcular a Multa de 40%</h3>
                            <p className="text-yellow-100/80">O erro mais frequente, responsável por prejuízos milionários, é calcular a multa sobre o <strong>Saldo Atual</strong>.</p>
                        </div>
                    </div>

                    <div className="bg-black/20 p-6 rounded-xl border border-yellow-500/10">
                        <h4 className="text-yellow-200 font-bold mb-4">A Regra Correta</h4>
                        <p className="text-yellow-100/90 mb-4">A multa de 40% incide sobre o <strong>total de depósitos realizados</strong> durante a vigência do contrato, devidamente corrigidos.</p>

                        <div className="grid md:grid-cols-2 gap-6 text-sm">
                            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                <strong className="text-red-300 block mb-2"><XCircle className="inline w-4 h-4 mr-1" /> O Jeito Errado (Cenário)</strong>
                                <p className="text-gray-300">Você tinha R$ 50.000,00. Sacou R$ 20.000,00 no aniversário. Saldo atual: R$ 30.000,00.</p>
                                <p className="text-red-300 mt-2 font-bold">40% de R$ 30.000 = R$ 12.000,00 <span className="text-xs">(PREJUÍZO)</span></p>
                            </div>
                            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                <strong className="text-green-300 block mb-2"><CheckCircle className="inline w-4 h-4 mr-1" /> O Jeito Certo</strong>
                                <p className="text-gray-300">Considera-se o histórico total depositado, ignorando saques parciais.</p>
                                <p className="text-green-300 mt-2 font-bold">40% de R$ 50.000 = R$ 20.000,00 <span className="text-xs">(CORRETO)</span></p>
                            </div>
                        </div>
                    </div>

                    <p className="text-yellow-100/70 mt-4 text-sm">
                        Se o cálculo da sua multa estiver incorreto, isso afetará diretamente o valor total da sua verba rescisória. Utilize nossa ferramenta de <Link to="/calculadoras/rescisao" className="underline hover:text-white">rescisão de contrato</Link> para uma auditoria completa.
                    </p>
                </div>

                {/* Passo a Passo */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-blue-500" />
                        Como Calcular (Passo a Passo)
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Método Rápido (Estimativa Mensal)</h3>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-6 font-mono text-sm text-blue-300">
                                Salário Bruto x 0,08 = Depósito Mensal
                            </div>

                            <h3 className="text-lg font-bold text-white mb-4">Cenário 1: Salário Médio e Tempo de Casa</h3>
                            <p className="text-sm text-gray-400 mb-3">Trab. 3 anos, média R$ 4.000,00, demissão Dez/2025.</p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>1. <strong>Total de Depósitos:</strong> R$ 320/mês.</li>
                                <li>2. <strong>Acumulado (36 meses):</strong> ~ R$ 11.520,00 nominal.</li>
                                <li>3. <strong>Correção com Juros/TR:</strong> Supondo ~ R$ 12.800,00.</li>
                                <li>4. <strong>Multa de 40%:</strong> R$ 12.800 x 0,40 = <strong>R$ 5.120,00</strong>.</li>
                                <li>5. <strong>Total (Saque-Rescisão):</strong> <strong>R$ 17.920,00</strong>.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Cenário 2: Novo Salário Mínimo 2025</h3>
                            <p className="text-sm text-gray-400 mb-3">Trab. com Piso (R$ 1.518,00) por 1 ano.</p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>1. <strong>Depósito Mensal:</strong> R$ 1.518 x 8% = <strong>R$ 121,44</strong>.</li>
                                <li>2. <strong>Acumulado (12 meses):</strong> ~ R$ 1.457,28.</li>
                                <li>3. <strong>Correção estimada:</strong> ~ R$ 1.485,00.</li>
                                <li>4. <strong>Multa de 40%:</strong> R$ 1.485 x 0,40 = <strong>R$ 594,00</strong>.</li>
                                <li>5. <strong>Total a Sacar:</strong> R$ 1.485 + R$ 594 = <strong>R$ 2.079,00</strong>.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Casos Especiais */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Casos Especiais</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2">Pedido de Demissão</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                Você <strong>não tem direito</strong> ao saque do saldo nem à multa de 40%. O valor permanece rendendo. Saques liberados apenas para aposentadoria ou casa própria. Verifique suas <Link to="/calculadoras/ferias" className="text-blue-400 hover:underline">férias proporcionais</Link>.
                            </p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2">Acordo (Culpa Recíproca)</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                Multa cai para <strong>20%</strong>. Trabalhador movimenta apenas <strong>80% do saldo</strong>.
                            </p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2">Aposentados Ativos</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                Podem sacar mensalmente se quiserem. Se demitidos sem justa causa, recebem a multa de 40% sobre os depósitos do contrato vigente normalmente.
                            </p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2">Uso para Casa Própria</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                O valor sai da conta mas <strong>continua na base de cálculo da multa de 40%</strong>. Simule antes em nossa calculadora de <Link to="/calculadoras/financiamento-imobiliario" className="text-blue-400 hover:underline">financiamento imobiliário</Link>.
                            </p>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={FGTS_FAQS}
                    title="Perguntas Frequentes sobre FGTS"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
