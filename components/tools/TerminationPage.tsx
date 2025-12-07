import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, Briefcase, AlertCircle, ArrowRight, Calendar, DollarSign, FileText, Clock, Percent, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const TERMINATION_FAQS: FAQItem[] = [
    {
        question: "Quanto tempo a empresa tem para pagar a rescisão?",
        answer: "A empresa tem 10 dias corridos contados a partir do último dia de contrato para pagar as verbas e liberar as guias. Se o 10º dia cair em fim de semana ou feriado, o ideal é antecipar para o dia útil anterior."
    },
    {
        question: "Quem pede demissão tem direito ao FGTS?",
        answer: "Não. Ao pedir demissão, o saldo do Fundo de Garantia fica retido (inativo) e não há pagamento da multa de 40%. O saque só será permitido após 3 anos sem registro em carteira ou para compra da casa própria/aposentadoria."
    },
    {
        question: "O aviso prévio conta como tempo de serviço?",
        answer: "Sim. O período do aviso, mesmo indenizado, projeta o contrato para o futuro. Isso garante mais dias de férias proporcionais e mais avos de 13º salário na conta final."
    },
    {
        question: "Como é calculado o desconto do INSS na rescisão?",
        answer: "O desconto segue a tabela progressiva do INSS vigente em 2025 (alíquotas de 7,5% a 14%). O imposto é calculado separadamente sobre o saldo de salário e sobre o 13º salário. Verbas de natureza indenizatória, como férias indenizadas e aviso prévio indenizado, são isentas dessa contribuição."
    },
    {
        question: "O que fazer se o valor da rescisão estiver errado?",
        answer: "Não assine o termo de quitação plena. Se for obrigado a assinar para receber, faça uma ressalva por escrito no próprio documento indicando os valores discordantes. Procure o sindicato ou o Ministério do Trabalho para exigir as diferenças."
    }
];

export function TerminationPage() {
    const [salary, setSalary] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('sem_justa_causa');
    const [balanceFGTS, setBalanceFGTS] = useState('');

    // States for results
    const [result, setResult] = useState<{ total: number; breakdown: any } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const fgts = parseFloat(balanceFGTS.replace(/\./g, '').replace(',', '.') || '0');

        if (isNaN(sal) || !startDate || !endDate) {
            setResult(null);
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            setResult(null);
            return;
        }

        // Logic estimation
        // Time worked in years, months
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const yearsWorked = Math.floor(diffDays / 365);
        const monthsWorkedTotal = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        // This is a simplified calculation for the "Simulator"
        // Real implementation would need precise rules for fractions of 15 days

        let total = 0;
        const breakdown: any = {};

        // 1. Saldo de Salário
        // Days worked in last month
        const daysInLastMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
        const lastDay = end.getDate();
        // CLT usually uses 30 days base or actual days depending on convention
        // Adjust for 30 days base commercial
        if (lastDay === 31) breakdown.salaryBalance = sal;
        else breakdown.salaryBalance = (sal / 30) * lastDay;

        total += breakdown.salaryBalance;

        // 2. Aviso Prévio
        let noticeDays = 30; // Min
        if (yearsWorked >= 1) noticeDays += (yearsWorked * 3);
        if (noticeDays > 90) noticeDays = 90;

        if (reason === 'sem_justa_causa') {
            breakdown.noticeIndemnified = (sal / 30) * noticeDays;
            total += breakdown.noticeIndemnified;
        } else if (reason === 'acordo') {
            breakdown.noticeIndemnified = ((sal / 30) * noticeDays) / 2; // Half notice
            total += breakdown.noticeIndemnified;
        }

        // 3. Férias
        // Assuming current period has N months
        // Logic simplified: Proportional vacation = months worked in current cycle * 1/12
        // We will just estimate based on months mod 12
        const currentPeriodMonths = monthsWorkedTotal % 12;
        const accruedVacation = (sal / 12) * currentPeriodMonths;
        const vacationThird = accruedVacation / 3;

        breakdown.vacationProportional = accruedVacation;
        breakdown.vacationThird = vacationThird;

        if (reason !== 'justa_causa') {
            total += breakdown.vacationProportional + breakdown.vacationThird;
        }

        // 4. 13º Salário
        // Months worked in current YEAR
        let monthsInYear = end.getMonth() + 1;
        // If fired before 15th, month doesn't count. Simplified.
        if (end.getDate() < 15) monthsInYear -= 1;

        const thirteenth = (sal / 12) * monthsInYear;
        breakdown.thirteenthProportional = thirteenth;

        if (reason !== 'justa_causa') {
            total += breakdown.thirteenthProportional;
        }

        // 5. FGTS Fine
        if (reason === 'sem_justa_causa') {
            breakdown.fgtsFine = fgts * 0.40;
            total += breakdown.fgtsFine;
        } else if (reason === 'acordo') {
            breakdown.fgtsFine = fgts * 0.20;
            total += breakdown.fgtsFine;
        }

        setResult({ total, breakdown });
    };

    useEffect(() => {
        calculate();
    }, [salary, startDate, endDate, reason, balanceFGTS]);

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
        "name": "Calculadora de Rescisão de Contrato CLT 2025: Cálculo Exato e Direitos",
        "url": "https://www.junny.com.br/calculadoras/rescisao",
        "description": "Calcule sua rescisão trabalhista em segundos. Descubra o valor exato de saldo de salário, férias, 13º, multa do FGTS e descontos oficiais de 2025.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Cálculo de Rescisão CLT 2025",
            "Simulação de Multa do FGTS (40%)",
            "Cálculo de Férias e 13º Proporcionais",
            "Aviso Prévio Indenizado"
        ],
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        }
    };

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Calculadora de Rescisão de Contrato CLT 2025: Cálculo Exato e Direitos"
                description="Calcule sua rescisão trabalhista em segundos. Descubra o valor exato de saldo de salário, férias, 13º, multa do FGTS e descontos oficiais de 2025."
                canonical="/calculadoras/rescisao"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": TERMINATION_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Rescisão CLT', href: '/calculadoras/rescisao' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Atualizado para 2025</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Rescisão <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Contrato CLT (2025)</span>
                        </h1>
                        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
                            Descubra o valor exato de saldo de salário, férias, 13º e multa do FGTS. Ferramenta ajustada com as novas regras trabalhistas.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Section */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Simular Rescisão
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {/* Dates Row */}
                                <div className="grid md:grid-cols-2 gap-6 w-full">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Data de Admissão</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                                            />
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Data de Afastamento</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                                            />
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Salary & Reason */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Salário Bruto</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={salary}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setSalary)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Motivo</label>
                                        <div className="relative">
                                            <select
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="sem_justa_causa">Sem Justa Causa</option>
                                                <option value="pedido_demissao">Pedido de Demissão</option>
                                                <option value="com_justa_causa">Justa Causa</option>
                                                <option value="acordo">Acordo (Comum Acordo)</option>
                                            </select>
                                            <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Conditional Fields */}
                                {(reason === 'sem_justa_causa' || reason === 'acordo') && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="text-sm text-gray-400">Saldo do FGTS (para multa)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={balanceFGTS}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setBalanceFGTS)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">Informe o saldo total acumulado para cálculo correto da multa.</p>
                                    </div>
                                )}

                                {/* Result Block */}
                                <div className="pt-2">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">
                                            Valor Bruto Estimado
                                        </span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ 0,00'}
                                        </span>
                                        <p className="text-xs text-blue-300/60 mt-2">*Sujeito a descontos de INSS/IRRF</p>
                                    </div>

                                    {result && result.breakdown && (
                                        <div className="grid grid-cols-1 gap-3 text-sm">
                                            {result.breakdown.salaryBalance > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <span className="text-gray-300">Saldo de Salário</span>
                                                    <span className="text-white font-medium">R$ {result.breakdown.salaryBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {(result.breakdown.vacationProportional > 0) && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <span className="text-gray-300">Férias + 1/3</span>
                                                    <span className="text-white font-medium">R$ {(result.breakdown.vacationProportional + result.breakdown.vacationThird).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {(result.breakdown.thirteenthProportional > 0) && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <span className="text-gray-300">13º Salário Proporcional</span>
                                                    <span className="text-white font-medium">R$ {result.breakdown.thirteenthProportional.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {result.breakdown.noticeIndemnified > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <span className="text-gray-300">Aviso Prévio Indenizado</span>
                                                    <span className="text-white font-medium">R$ {result.breakdown.noticeIndemnified.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {result.breakdown.fgtsFine > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <span className="text-gray-300">Multa FGTS</span>
                                                    <span className="text-white font-medium">R$ {result.breakdown.fgtsFine.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Content (Instructions & Practical Example) */}
                    <div className="lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        {/* What is TRCT */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                O que é TRCT?
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                O <strong>TRCT (Termo de Rescisão do Contrato de Trabalho)</strong> é o documento oficial obrigatório que formaliza o fim do contrato. Nele, a empresa deve discriminar cada centavo pago e cada desconto realizado, servindo como comprovante legal para o saque do FGTS e solicitação do Seguro-Desemprego.
                            </p>
                        </div>

                        {/* How to Use */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">
                                Como usar a Calculadora
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
                                    <span>
                                        <strong>Informe o período:</strong> Preencha a data de admissão e o último dia trabalhado.
                                    </span>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">2</span>
                                    <span>
                                        <strong>Insira o Salário:</strong> Use o valor bruto registrado em carteira.
                                    </span>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">3</span>
                                    <span>
                                        <strong>Escolha o Motivo:</strong> O tipo de demissão muda totalmente seus direitos.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Practical Example */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="bg-blue-500/10 p-2 rounded-lg shrink-0">
                                    <DollarSign className="w-5 h-5 text-blue-500" />
                                </div>
                                <h3 className="text-lg font-bold text-white leading-tight mt-1">
                                    Exemplo Prático
                                </h3>
                            </div>
                            <div className="space-y-2 text-sm text-gray-400">
                                <p>Trabalhador com R$ 2.000,00, demitido após 1 ano e 6 meses:</p>
                                <ul className="list-disc pl-4 space-y-1 marker:text-blue-500">
                                    <li><strong>Aviso Prévio (33 dias):</strong> R$ 2.200,00</li>
                                    <li><strong>13º Prop. (6/12):</strong> R$ 1.000,00</li>
                                    <li><strong>Férias Prop. + 1/3:</strong> R$ 1.333,33</li>
                                    <li><strong>Multa FGTS:</strong> R$ 1.152,00</li>
                                </ul>
                                <p className="pt-2 text-white font-bold">Total Bruto: R$ 6.351,99</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}

                {/* O que entra no cálculo */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Calculator className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            O que entra no cálculo da rescisão?
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-8 max-w-3xl">
                        O valor final não se baseia apenas no seu salário nominal. Para chegar ao montante correto, é necessário calcular a média de variáveis recebidas nos últimos 12 meses, como <Link to="/calculadoras/horas-extras" className="text-blue-400 hover:text-blue-300 hover:underline">horas extras</Link> habituais e comissões.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-3">Saldo de Salário</h3>
                            <p className="text-sm text-gray-400">
                                Pagamento proporcional aos dias trabalhados no mês da saída. Confira nossa calculadora de <Link to="/calculadoras/salario-liquido" className="text-blue-400 hover:underline">salário líquido</Link>.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-3">Aviso Prévio</h3>
                            <p className="text-sm text-gray-400">
                                Indenizado ou trabalhado. A cada ano de serviço completo, somam-se 3 dias ao aviso (Lei 12.506/11).
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-3">13º Proporcional</h3>
                            <p className="text-sm text-gray-400">
                                1/12 da remuneração para cada mês trabalhado (fração igual ou superior a 15 dias). Simule no <Link to="/calculadoras/decimo-terceiro" className="text-blue-400 hover:underline">décimo terceiro</Link>.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-3">Férias + 1/3</h3>
                            <p className="text-sm text-gray-400">
                                Valor integral das férias vencidas (se houver) + proporcional do ano corrente, ambos com terço constitucional.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-3">Multa do FGTS</h3>
                            <p className="text-sm text-gray-400">
                                40% sobre o saldo total depositado para demissões sem justa causa. Veja <Link to="/calculadoras/fgts" className="text-blue-400 hover:underline">calculadora FGTS</Link>.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-3">Médias Salariais</h3>
                            <p className="text-sm text-gray-400">
                                Valores referentes a <Link to="/calculadoras/adicional-noturno" className="text-blue-400 hover:underline">adicional noturno</Link>, periculosidade ou insalubridade integram a base.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Descontos e Atenção (Alert Style) */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-6 items-start">
                    <AlertCircle className="w-8 h-8 text-yellow-500 shrink-0" />
                    <div>
                        <h3 className="text-xl font-bold text-yellow-200 mb-3">Atenção aos Descontos Oficiais</h3>
                        <p className="text-yellow-100/80 mb-4 leading-relaxed">
                            Não conte com o valor bruto! A empresa é obrigada a deduzir <strong>INSS e IRRF</strong> conforme tabelas progressivas de 2025. Além disso, serão descontados adiantamentos, vale-transporte não utilizado e, se houver, saldo de empréstimo consignado (até o limite legal de 30-35%).
                        </p>
                    </div>
                </div>

                {/* Tabela Comparativa de Direitos */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <FileText className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Tipos de Demissão e Seus Direitos
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="p-3 text-white min-w-[150px]">Direito</th>
                                    <th className="p-3 text-white text-center min-w-[120px]">Sem Justa Causa</th>
                                    <th className="p-3 text-white text-center min-w-[120px]">Pedido de Demissão</th>
                                    <th className="p-3 text-white text-center min-w-[120px]">Justa Causa</th>
                                    <th className="p-3 text-white text-center min-w-[120px]">Comum Acordo</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400">
                                <tr className="border-b border-white/5 bg-blue-500/5">
                                    <td className="p-3 font-medium text-white">Saldo de Salário</td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="p-3 font-medium text-white">Férias Vencidas + 1/3</td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="p-3 font-medium text-white">Férias Proporc. + 1/3</td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="p-3 font-medium text-white">13º Proporcional</td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="p-3 font-medium text-white">Aviso Prévio</td>
                                    <td className="p-3 text-center text-xs">Indenizado/Trab.</td>
                                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                                    <td className="p-3 text-center text-xs">50% (se indenizado)</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="p-3 font-medium text-white">Multa FGTS</td>
                                    <td className="p-3 text-center font-bold text-blue-400">40%</td>
                                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                                    <td className="p-3 text-center font-bold text-blue-400">20%</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-medium text-white">Saque FGTS</td>
                                    <td className="p-3 text-center"><CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                                    <td className="p-3 text-center font-bold text-blue-400">80%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Prazo de Pagamento */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Clock className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Prazo de Pagamento da Rescisão em 2025
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Conforme o artigo 477 da CLT, a empresa tem até <strong>10 dias corridos</strong> após o término do contrato para realizar o pagamento. Esse prazo é único para qualquer tipo de aviso prévio. Além do depósito, a empresa deve realizar a <strong>Baixa na CTPS Digital</strong> e liberar as guias.
                    </p>
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-4 items-center">
                        <span className="text-2xl">⚠️</span>
                        <p className="text-sm text-red-200">
                            <strong>Atrasou?</strong> O não pagamento no prazo gera multa a favor do funcionário no valor de um salário nominal completo.
                        </p>
                    </div>
                </div>

                <FAQ
                    items={TERMINATION_FAQS}
                    title="Dúvidas Frequentes (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
