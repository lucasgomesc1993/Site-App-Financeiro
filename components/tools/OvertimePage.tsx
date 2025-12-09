import React, { useState, useEffect } from 'react';
import { Calculator, Clock, HelpCircle, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const OVERTIME_FAQS: FAQItem[] = [
    {
        question: "Qual o limite de horas extras por dia?",
        answer: "Pela CLT, o limite legal é de 2 horas extras diárias. A jornada total (normal + extra) não deve ultrapassar 10 horas. No entanto, em casos de \"força maior\" ou serviços inadiáveis que possam causar prejuízo à empresa, a lei permite estender até 4 horas extras (totalizando 12h), desde que devidamente justificado."
    },
    {
        question: "Como calcular hora extra 100%?",
        answer: "A hora extra 100% ocorre em domingos e feriados não compensados. O cálculo é o dobro da hora normal: divida seu salário pelo divisor mensal para encontrar o valor da hora base e multiplique por 2. Algumas convenções coletivas (CCT) podem estipular 100% também para sábados ou horas que excedam certo limite diário."
    },
    {
        question: "Hora extra entra no banco de horas?",
        answer: "Depende do contrato. Se a empresa adota o Banco de Horas, o tempo excedente vira saldo para folgas futuras (compensação 1:1) e não é pago em dinheiro no mês. O banco de horas deve ser compensado em até 6 meses (acordo individual) ou 1 ano (acordo coletivo/sindicato). Se não compensado no prazo, a empresa deve pagar as horas com adicional."
    },
    {
        question: "O DSR é calculado sobre a hora extra?",
        answer: "Sim, o reflexo no DSR é obrigatório para horas extras habituais. O cálculo soma o valor total das horas extras do mês, divide pelo número de dias úteis (incluindo sábados trabalhados) e multiplica pelo número de domingos e feriados. Isso garante que o descanso também seja remunerado com base na \"sobrejornada\"."
    },
    {
        question: "Quem trabalha em Home Office recebe hora extra?",
        answer: "Desde a reforma e alterações recentes na lei (Lei 14.442), trabalhadores em regime de teletrabalho (Home Office) que possuem controle de jornada (ponto digital, login/logout) têm direito a horas extras normalmente. Apenas quem trabalha por produção ou tarefa, sem controle de horário fixo estipulado em contrato, fica isento do recebimento de horas adicionais."
    }
];

export function OvertimePage() {
    const [salary, setSalary] = useState('');
    const [hoursWorked, setHoursWorked] = useState('220');
    const [overtime50, setOvertime50] = useState('');
    const [overtime100, setOvertime100] = useState('');
    const [businessDays, setBusinessDays] = useState('25');
    const [restDays, setRestDays] = useState('5');

    const [result, setResult] = useState<{
        hourlyRate: number;
        val50: number;
        val100: number;
        totalOvertime: number;
        dsrValue: number;
        grossTotal: number;
    } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const hours = parseFloat(hoursWorked);
        const ot50 = parseFloat(overtime50.replace(',', '.') || '0');
        const ot100 = parseFloat(overtime100.replace(',', '.') || '0');
        const bDays = parseFloat(businessDays) || 25;
        const rDays = parseFloat(restDays) || 5;

        if (isNaN(sal) || isNaN(hours) || hours === 0 || bDays === 0) {
            setResult(null);
            return;
        }

        const hourlyRate = sal / hours;

        // Calculate OT Values
        const val50 = hourlyRate * 1.5 * ot50;
        const val100 = hourlyRate * 2.0 * ot100;

        const totalOvertime = val50 + val100;

        // Calculate DSR Reflex
        // Formula: (Total OT / Business Days) * Rest Days
        const dsrValue = (totalOvertime / bDays) * rDays;

        const grossTotal = sal + totalOvertime + dsrValue;

        setResult({
            hourlyRate,
            val50,
            val100,
            totalOvertime,
            dsrValue,
            grossTotal
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, hoursWorked, overtime50, overtime100, businessDays, restDays]);

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
        "name": "Calculadora de Horas Extras 2025: Simulação e Cálculo Exato",
        "description": "Faça o cálculo de hora extra 50% e 100% com reflexo no DSR. Simule agora o valor real a receber na folha de pagamento com as regras da CLT.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "featureList": [
            "Cálculo de Hora Extra 50% e 100%",
            "Reflexo no Descanso Semanal Remunerado (DSR)",
            "Configuração de Jornada Mensal (220h, 200h, 180h)",
            "Simulação de Salário Bruto com Adicionais"
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
                title="Calculadora de Horas Extras 2025: Simulação e Cálculo Exato"
                description="Faça o cálculo de hora extra 50% e 100% com reflexo no DSR. Simule agora o valor real a receber na folha de pagamento com as regras da CLT."
                canonical="/calculadoras/horas-extras"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": OVERTIME_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Horas Extras', href: '/calculadoras/horas-extras' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Horas Extras 2025</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            A Hora Extra é todo período trabalhado além da jornada estipulada em contrato, conforme definido pelo <strong>Art. 59 da CLT</strong>. De acordo com a legislação vigente em 2025, esse tempo excedente garante ao trabalhador um pagamento adicional de, no mínimo, <strong>50% sobre o valor da hora normal</strong>.
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
                                    Simular Hora Extra
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="salary-input" className="text-sm text-gray-400">Salário Bruto</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                            <input
                                                id="salary-input"
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
                                        <label htmlFor="hours-select" className="text-sm text-gray-400">Jornada Mensal</label>
                                        <div className="relative">
                                            <select
                                                id="hours-select"
                                                value={hoursWorked}
                                                onChange={(e) => setHoursWorked(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="220">220 horas (Padrão)</option>
                                                <option value="200">200 horas</option>
                                                <option value="180">180 horas (6h/dia)</option>
                                                <option value="150">150 horas</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="ot50-input" className="text-sm text-gray-400">Horas Extras 50%</label>
                                        <div className="relative">
                                            <input
                                                id="ot50-input"
                                                type="text"
                                                inputMode="decimal"
                                                value={overtime50}
                                                onChange={(e) => setOvertime50(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="Qtd horas (ex: 10)"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">Dias Úteis</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="ot100-input" className="text-sm text-gray-400">Horas Extras 100%</label>
                                        <div className="relative">
                                            <input
                                                id="ot100-input"
                                                type="text"
                                                inputMode="decimal"
                                                value={overtime100}
                                                onChange={(e) => setOvertime100(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="Qtd horas"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">Domingos/Feriados</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="business-days-input" className="text-sm text-gray-400 flex items-center gap-1">
                                            Dias Úteis
                                            <HelpCircle className="w-3 h-3 text-gray-400" />
                                        </label>
                                        <input
                                            id="business-days-input"
                                            type="number"
                                            value={businessDays}
                                            onChange={(e) => setBusinessDays(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="25"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="rest-days-input" className="text-sm text-gray-400 flex items-center gap-1">
                                            Domingos e Feriados
                                            <HelpCircle className="w-3 h-3 text-gray-400" />
                                        </label>
                                        <input
                                            id="rest-days-input"
                                            type="number"
                                            value={restDays}
                                            onChange={(e) => setRestDays(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="5"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Total a Receber (Bruto)</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.grossTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                        <div className="mt-2 text-xs text-gray-400">
                                            Salário + Horas Extras + DSR
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs text-gray-400">Hora Normal</span>
                                                <span className="text-sm font-semibold text-white">
                                                    {result ? `R$ ${result.hourlyRate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '--'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs text-gray-400">Total Extras (50%)</span>
                                                <span className="text-sm font-semibold text-white">
                                                    {result ? `R$ ${result.val50.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '--'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-400">Total Extras (100%)</span>
                                                <span className="text-sm font-semibold text-white">
                                                    {result ? `R$ ${result.val100.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '--'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs text-gray-400">Reflexo DSR</span>
                                                <span className="text-sm font-bold text-blue-400">
                                                    + {result ? `R$ ${result.dsrValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '--'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                                <span className="text-xs text-gray-400">Total Só de Extras</span>
                                                <span className="text-sm font-bold text-green-400">
                                                    {result ? `R$ ${(result.totalOvertime + result.dsrValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '--'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
                                        <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                                        <p className="text-xs text-yellow-200/80 leading-relaxed">
                                            <strong>Nota:</strong> Esse valor entra bruto na folha e sofre descontos de <Link to="/calculadoras/inss" className="underline hover:text-yellow-100">INSS</Link> e Imposto de Renda.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        {/* Como usar */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <HelpCircle className="w-5 h-5 text-blue-500" />
                                Como usar a calculadora
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                                    <span><strong>Salário Bruto:</strong> Seu salário base registrado na carteira, sem descontos.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                                    <span><strong>Jornada Mensal:</strong> Geralmente 220h (padrão) ou 200h.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                                    <span><strong>Horas Extras 50%:</strong> Quantidade de horas feitas em dias úteis ou sábados.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                                    <span><strong>Horas Extras 100%:</strong> Quantidade de horas feitas em domingos ou feriados.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Reflexos */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <DollarSign className="w-5 h-5 text-green-500" />
                                Reflexos: O aumento nos seus benefícios
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">
                                As horas extras habituais possuem natureza salarial e aumentam outros direitos:
                            </p>
                            <div className="space-y-3">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block text-sm mb-1">DSR</strong>
                                    <span className="text-xs text-gray-400">Descanso Semanal Remunerado sobre os dias de folga.</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <strong className="text-white block text-sm mb-1">FGTS + 13º + Férias</strong>
                                    <span className="text-xs text-gray-400">A média das horas entra no cálculo desses benefícios.</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-4 italic">
                                * Se você faz muitas horas extras, compare se <Link to="/calculadoras/clt-vs-pj" className="text-blue-400 underline">vale a pena virar PJ</Link>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="max-w-4xl mx-auto space-y-12 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* Passo a Passo */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <Calculator className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white leading-tight mt-1">
                                Como funciona o cálculo (Passo a Passo com DSR)
                            </h2>
                        </div>

                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                O cálculo da hora extra é composto pelo valor da hora normal acrescido do adicional (50% ou 100%) e do reflexo no DSR. Veja o exemplo para um salário de <strong>R$ 2.640,00</strong> (Jornada 220h):
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 mt-6">
                                <div className="bg-white/5 p-4 rounded-xl space-y-2">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Passo 1: Hora Normal</span>
                                    <div className="flex justify-between text-sm">
                                        <span>R$ 2.640 ÷ 220</span>
                                        <span className="text-white font-bold">R$ 12,00</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl space-y-2">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Passo 2: Hora Extra (50%)</span>
                                    <div className="flex justify-between text-sm">
                                        <span>R$ 12,00 + 50%</span>
                                        <span className="text-white font-bold">R$ 18,00</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl space-y-2">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Passo 3: Total (10h)</span>
                                    <div className="flex justify-between text-sm">
                                        <span>10 x R$ 18,00</span>
                                        <span className="text-white font-bold">R$ 180,00</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl space-y-2">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Passo 4: DSR (25 úteis / 5 dom)</span>
                                    <div className="flex justify-between text-sm">
                                        <span>(180 ÷ 25) x 5</span>
                                        <span className="text-white font-bold">R$ 36,00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                                <span className="text-sm text-green-400 uppercase tracking-wider font-semibold">Total Extra a Receber</span>
                                <div className="text-2xl font-bold text-white mt-1">
                                    R$ 216,00 <span className="text-sm font-normal text-gray-400">(R$ 180 + R$ 36)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divisor Table */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Qual Divisor devo usar?</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                O divisor define o valor da sua hora base. Utilizar o número errado pode causar prejuízos:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="bg-white/5 px-2 py-1 rounded text-white font-bold text-sm">220</div>
                                    <div className="text-sm text-gray-400">
                                        <strong className="text-white block">44 horas semanais</strong>
                                        Segunda a Sexta (8h) + Sábado (4h).
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-white/5 px-2 py-1 rounded text-white font-bold text-sm">200</div>
                                    <div className="text-sm text-gray-400">
                                        <strong className="text-white block">40 horas semanais</strong>
                                        Segunda a Sexta (8h), sem sábado.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-white/5 px-2 py-1 rounded text-white font-bold text-sm">180</div>
                                    <div className="text-sm text-gray-400">
                                        <strong className="text-white block">36 horas semanais</strong>
                                        Turnos de 6 horas diárias.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Tabela: Percentuais CLT</h3>
                            <div className="overflow-hidden rounded-xl border border-white/10">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/5 text-white">
                                        <tr>
                                            <th className="p-3">Tipo de Dia</th>
                                            <th className="p-3">Adicional</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-gray-400">
                                        <tr>
                                            <td className="p-3">Dias Úteis / Sábados</td>
                                            <td className="p-3 text-blue-400 font-bold">50%</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3">Domingos / Feriados</td>
                                            <td className="p-3 text-purple-400 font-bold">100%</td>
                                        </tr>
                                        <tr className="bg-white/5">
                                            <td className="p-3">Hora Noturna (22h-5h)</td>
                                            <td className="p-3 text-yellow-400 font-bold">50% + 20%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                                * Convenções Coletivas podem estipular porcentagens maiores (ex: 60%, 70% ou 100% aos sábados).
                            </p>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={OVERTIME_FAQS}
                    title="Dúvidas Frequentes"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
