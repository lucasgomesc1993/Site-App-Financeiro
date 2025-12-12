import React, { useState, useEffect } from 'react';
import { Calculator, Clock, HelpCircle, DollarSign, Calendar, AlertCircle, CheckCircle, XCircle, FileText, ArrowRight, BookOpen, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const OVERTIME_FAQS: FAQItem[] = [
    {
        question: "Qual o valor da hora extra com o salário mínimo de 2025?",
        answer: "Considerando o mínimo vigente de **R$ 1.518,00** e um divisor padrão de 220 horas mensais, sua hora normal de trabalho vale **R$ 6,90**. Ao aplicar o adicional padrão de 50% para dias úteis, a hora extra sobe para **R$ 10,35**. Já o trabalho em domingos ou feriados (100%) é remunerado em **R$ 13,80**, sendo o dobro da hora normal."
    },
    {
        question: "Como calcular hora extra no sábado?",
        answer: "Se o trabalho no sábado exceder a jornada semanal de 44 horas, ele é considerado hora extra. O adicional padrão aplicável é de **50%**. Contudo, se sua Convenção Coletiva classificar o sábado como dia de descanso remunerado ou feriado da categoria, o pagamento devido deve ser de 100% sobre o valor da hora normal. Consulte a Súmula 113 do TST."
    },
    {
        question: "Quem trabalha 40 horas usa qual divisor na calculadora?",
        answer: "Quem possui contrato de 40 horas semanais deve configurar a **Calculadora de Horas Extras** com o divisor **200**. O uso do divisor 220, destinado à jornada de 44 horas, resulta em pagamento a menor, pois reduz artificialmente o valor da hora. O cálculo correto sempre divide o salário por 200, valorizando a hora proporcionalmente."
    },
    {
        question: "O tempo de deslocamento conta como hora extra?",
        answer: "Não, de acordo com as regras pós-Reforma Trabalhista de 2017. O período gasto no trajeto entre a residência e o local de trabalho não é mais computado na jornada efetiva. Isso se aplica mesmo que a empresa forneça o transporte, exceto se houver acordo coletivo específico estipulando o contrário."
    },
    {
        question: "Posso receber horas extras fixas todo mês?",
        answer: "Não é uma prática legalmente segura, pois a pré-contratação de horas extras fixas é considerada nula pelo TST (Súmula 199). Se pagas com habitualidade, elas incorporam o salário para todos os fins. Contudo, isso não isenta a empresa de pagar as horas extras reais que excedam o limite contratual fixo."
    },
    {
        question: "Quantas horas extras posso fazer por dia (Limite Legal)?",
        answer: "Pela legislação vigente, o limite máximo permitido é de <a href='https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm#art59' target='_blank' rel='noopener noreferrer'>2 horas extras diárias</a> (Art. 59 da CLT). Exceder esse teto só é aceito em casos excepcionais de força maior ou para serviços inadiáveis que possam gerar prejuízo, devendo ser devidamente justificado. Ultrapassar o limite habitual pode gerar multas administrativas para a empresa."
    }
];

export function OvertimePage() {
    const [salary, setSalary] = useState('');
    const [hoursWorked, setHoursWorked] = useState('220');
    const [overtime50, setOvertime50] = useState('');
    const [overtime100, setOvertime100] = useState('');
    const [overtimeNight, setOvertimeNight] = useState('');
    const [businessDays, setBusinessDays] = useState('25');
    const [restDays, setRestDays] = useState('5');

    const [result, setResult] = useState<{
        hourlyRate: number;
        val50: number;
        val100: number;
        valNight: number;
        totalOvertime: number;
        dsrValue: number;
        grossTotal: number;
    } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const divisor = parseFloat(hoursWorked); // 220, 200, 180
        const ot50 = parseFloat(overtime50.replace(',', '.') || '0');
        const ot100 = parseFloat(overtime100.replace(',', '.') || '0');
        const otNight = parseFloat(overtimeNight.replace(',', '.') || '0');
        const bDays = parseFloat(businessDays) || 25;
        const rDays = parseFloat(restDays) || 5;

        if (isNaN(sal) || isNaN(divisor) || divisor === 0 || bDays === 0) {
            setResult(null);
            return;
        }

        const hourlyRate = sal / divisor;

        // 50% Overtime
        const val50 = hourlyRate * 1.5 * ot50;

        // 100% Overtime
        const val100 = hourlyRate * 2.0 * ot100;

        // Night Overtime (Extra Noturna): 50% + 20% cumulative + Fictitious Hour (52.5m = 1h)
        // Rate: Hourly * 1.2 (Night) * 1.5 (Overtime) = 1.8x
        // Fictitious Time Factor: 60 / 52.5 = 1.142857...
        const nightRateFactor = 1.2 * 1.5;
        const fictitiousTimeFactor = 60 / 52.5;
        const valNight = hourlyRate * nightRateFactor * (otNight * fictitiousTimeFactor);

        const totalOvertime = val50 + val100 + valNight;

        // DSR
        // Formula: (Total OT Value / Business Days) * Sundays/Holidays
        const dsrValue = (totalOvertime / bDays) * rDays;

        const grossTotal = sal + totalOvertime + dsrValue;

        setResult({
            hourlyRate,
            val50,
            val100,
            valNight,
            totalOvertime,
            dsrValue,
            grossTotal
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, hoursWorked, overtime50, overtime100, overtimeNight, businessDays, restDays]);

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
        "name": "Calculadora de Horas Extras 2025: Cálculo Exato e DSR",
        "description": "Calculadora de Horas Extras 2025: Valor exato com salário de R$ 1.518, DSR e tabela oficial. Calcule adicional noturno e reflexos agora.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "featureList": [
            "Cálculo de Hora Extra 50% e 100%",
            "Reflexo no Descanso Semanal Remunerado (DSR)",
            "Configuração de Jornada Mensal (220h, 200h, 180h)",
            "Cálculo de Hora Extra Noturna com Hora Ficta e Adicional",
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
                title="Calculadora de Horas Extras 2025: Cálculo Exato e DSR"
                description="Calculadora de Horas Extras 2025: Valor exato com salário de R$ 1.518, DSR e tabela oficial. Calcule adicional noturno e reflexos agora."
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

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Horas Extras 2025</span>
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
                                        <label htmlFor="hours-select" className="text-sm text-gray-400">Divisor Mensal</label>
                                        <div className="relative">
                                            <select
                                                id="hours-select"
                                                value={hoursWorked}
                                                onChange={(e) => setHoursWorked(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="220">220 (44h Semanais)</option>
                                                <option value="200">200 (40h Semanais)</option>
                                                <option value="180">180 (36h Semanais)</option>
                                                <option value="150">150 (30h Semanais)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="ot50-input" className="text-sm text-gray-400">Horas Extras 50%</label>
                                        <input
                                            id="ot50-input"
                                            type="text"
                                            inputMode="decimal"
                                            value={overtime50}
                                            onChange={(e) => setOvertime50(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="Ex: 10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="ot100-input" className="text-sm text-gray-400">Horas Extras 100%</label>
                                        <input
                                            id="ot100-input"
                                            type="text"
                                            inputMode="decimal"
                                            value={overtime100}
                                            onChange={(e) => setOvertime100(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="Domingos/Feriados"
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="otnight-input" className="text-sm text-gray-400 flex items-center gap-2">
                                            <span>Horas Extras Noturnas</span>
                                            <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">50% + 20%</span>
                                        </label>
                                        <input
                                            id="otnight-input"
                                            type="text"
                                            inputMode="decimal"
                                            value={overtimeNight}
                                            onChange={(e) => setOvertimeNight(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="Qtd. Horas no Relógio (Calculamos a ficta)"
                                        />
                                        <p className="text-xs text-gray-500">Insira as horas do relógio trabalhadas entre 22h e 5h. O sistema aplica a hora ficta.</p>
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
                                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">Total a Receber (Bruto Estimado)</span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.grossTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                        </span>
                                        <div className="mt-2 text-xs text-gray-400">
                                            Inclui reflexo no DSR
                                        </div>
                                    </div>

                                    {result && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm">
                                                <span className="text-gray-300">Valor Hora Normal</span>
                                                <span className="text-white font-medium">R$ {result.hourlyRate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            {result.val50 > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm">
                                                    <span className="text-gray-300">Total Extras 50%</span>
                                                    <span className="text-green-400 font-medium">+ R$ {result.val50.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {result.val100 > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm">
                                                    <span className="text-gray-300">Total Extras 100%</span>
                                                    <span className="text-green-400 font-medium">+ R$ {result.val100.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            {result.valNight > 0 && (
                                                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm">
                                                    <span className="text-gray-300">Extra Noturna (c/ Ficta)</span>
                                                    <span className="text-green-400 font-medium">+ R$ {result.valNight.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm">
                                                <span className="text-gray-300">Reflexo DSR</span>
                                                <span className="text-blue-400 font-medium">+ R$ {result.dsrValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        </div>
                                    )}

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
                    <div className="lg:col-span-5 space-y-8">
                        {/* Resumo Rápido */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Resumo Rápido (Dados Oficiais 2025):
                            </h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                                    <span><strong>Salário Mínimo Base:</strong> R$ 1.518,00 (Salário Mínimo Vigente - LOA 2025).</span>
                                </li>
                                <li className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                                    <span><strong>Adicionais Padrão:</strong> 50% (dias úteis) e 100% (domingos/feriados).</span>
                                </li>
                                <li className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                                    <span><strong>Adicional Noturno:</strong> 20% (Regra Geral CLT) ou 50% (se previsto em Convenção Coletiva).</span>
                                </li>
                                <li className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                                    <span><strong>Divisores:</strong> 220 (para 44h semanais) ou 200 (para 40h semanais).</span>
                                </li>
                                <li className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                                    <span><strong>Reflexos:</strong> Obrigatório integrar DSR, Férias e 13º Salário.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="max-w-4xl mx-auto space-y-12 mb-24">

                    {/* Resumo em 30 Segundos */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <Clock className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Resumo em 30 Segundos
                            </h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            A **Calculadora de Horas Extras** da Junny é a ferramenta definitiva para trabalhadores CLT e departamentos pessoais ajustarem a remuneração suplementar conforme a legislação vigente em dezembro de 2025. Com a atualização do salário mínimo para R$ 1.518,00 (consulte a <a href="https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/noticias/2024/08/orcamento-de-2025-garante-equilibrio-fiscal-e-aumento-real-do-salario-minimo" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Lei Orçamentária Anual - LOA 2025</a>) e as regras consolidadas do TST, o cálculo manual exige atenção redobrada. Esta ferramenta aplica automaticamente o divisor correto (220, 200 ou 180), considera a hora ficta noturna e projeta os reflexos no Descanso Semanal Remunerado (DSR), garantindo que você receba ou pague exatamente o que a lei determina.
                        </p>
                    </div>

                    {/* Tabela Oficial */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Tabela Oficial de Adicionais e Divisores (2025)</h2>
                        <p className="text-gray-400 mb-6">
                            Para garantir a precisão da sua **Calculadora de Horas Extras**, utilize os parâmetros abaixo, atualizados conforme as práticas de mercado e legislação.
                        </p>
                        <div className="overflow-x-auto rounded-xl border border-white/10">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 text-white">
                                    <tr>
                                        <th className="p-4">Tipo de Hora</th>
                                        <th className="p-4">Adicional Mínimo (CLT)</th>
                                        <th className="p-4">Divisor Típico</th>
                                        <th className="p-4">Observação Crítica 2025</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-400">
                                    <tr>
                                        <td className="p-4 font-semibold text-white">Extra Diurna</td>
                                        <td className="p-4 text-blue-400 font-bold">50%</td>
                                        <td className="p-4">220 / 200</td>
                                        <td className="p-4">Base salarial mínima de R$ 1.518,00.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-semibold text-white">Extra Domingo/Feriado</td>
                                        <td className="p-4 text-green-400 font-bold">100%</td>
                                        <td className="p-4">220 / 200</td>
                                        <td className="p-4">Pagamento em dobro obrigatório sem folga compensatória.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-semibold text-white">Adicional Noturno</td>
                                        <td className="p-4 text-yellow-400 font-bold">20% (Urbano)</td>
                                        <td className="p-4">-</td>
                                        <td className="p-4">Algumas Convenções Coletivas estipulam 50% (verificar sindicato).</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-semibold text-white">Extra Noturna</td>
                                        <td className="p-4 text-purple-400 font-bold">50% + 20%</td>
                                        <td className="p-4">-</td>
                                        <td className="p-4">Incide sobre a hora noturna (Súmula 60 TST).</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-semibold text-white">Intrajornada (Almoço)</td>
                                        <td className="p-4 text-blue-400 font-bold">50%</td>
                                        <td className="p-4">-</td>
                                        <td className="p-4">Natureza indenizatória (apenas tempo suprimido).</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5">
                            <p className="text-xs text-gray-500">
                                <strong>Fonte Oficial:</strong> Parâmetros baseados no <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Decreto-Lei nº 5.452 (Consolidação das Leis do Trabalho) - Planalto</a>.
                            </p>
                        </div>
                    </div>

                    {/* Como funciona */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Como funciona a Calculadora de Horas Extras</h2>
                        <p className="text-gray-400 mb-4">
                            A **Calculadora de Horas Extras** opera processando três variáveis essenciais para entregar o resultado líquido da sua jornada suplementar. Diferente de uma conta simples de multiplicação, a ferramenta considera:
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                <span><strong>1. A Base de Cálculo:</strong> Soma o salário base a outros adicionais fixos (periculosidade, insalubridade ou tempo de serviço) para encontrar o valor real da hora.</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                <span><strong>2. O Fator Multiplicador:</strong> Aplica o percentual correto (50%, 100% ou específico de CCT) sobre a hora normal.</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                <span><strong>3. A Integração de Reflexos:</strong> Calcula automaticamente o impacto dessas horas no seu descanso semanal (DSR), evitando prejuízos financeiros comuns em cálculos manuais.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Erros Comuns */}
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <AlertCircle className="w-8 h-8 text-yellow-500 shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-yellow-200 mb-2">Erros Comuns ao Calcular Horas Extras</h3>
                            </div>
                        </div>
                        <p className="text-yellow-100/80 mb-4">
                            O erro número um em 2025 não é matemático, mas conceitual: a **conversão de minutos**. O relógio segue a base 60 (sexagesimal), enquanto a folha de pagamento opera na base 100 (centesimal).
                        </p>
                        <p className="text-yellow-100/80 mb-4">
                            Muitos gestores ou trabalhadores que dispensam o uso de uma **Calculadora de Horas Extras** adequada multiplicam erroneamente os minutos do relógio pelo valor da hora.
                        </p>
                        <ul className="space-y-2 text-yellow-100/70">
                            <li className="flex gap-2">
                                <XCircle className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                                <span><strong>O Erro:</strong> Achar que 1 hora e 30 minutos é igual a 1,3.</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                                <span><strong>A Realidade:</strong> 30 minutos representam 50% de uma hora. Logo, deve-se usar <strong>1,5</strong>.</span>
                            </li>
                            <li className="flex gap-2">
                                <Percent className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                                <span><strong>Impacto:</strong> Ao digitar 1,3 em vez de 1,5, o trabalhador perde 12 minutos de pagamento a cada ocorrência.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Como Calcular (Passo a Passo) */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <BookOpen className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white leading-tight mt-1">
                                Como Calcular (Passo a Passo e Fórmulas)
                            </h2>
                        </div>

                        <div className="space-y-8">
                            {/* Fórmula Geral */}
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4">Fórmula Geral (Método Rápido)</h3>
                                <div className="font-mono text-sm text-blue-300 mb-4">
                                    Valor Total = (Salário Base / Divisor) x Fator (1,5 ou 2,0) x Qtd. Horas
                                </div>
                            </div>

                            {/* Método Detalhado */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">Método Detalhado (Passo a Passo)</h3>
                                <p className="text-gray-400 mb-4">
                                    O cálculo correto exige três etapas: encontrar o valor da hora normal, aplicar o adicional e multiplicar pela quantidade de horas (em decimal).
                                </p>

                                <div className="space-y-6">
                                    {/* Passo 1 */}
                                    <div className="pl-4 border-l-2 border-blue-500">
                                        <h4 className="text-white font-semibold mb-2">1. Encontrar o Valor da Hora Normal (VHN)</h4>
                                        <p className="text-sm text-gray-400 mb-2">Divida a remuneração total (Salário + Adicionais Fixos) pelo divisor mensal.</p>
                                        <ul className="text-xs text-gray-500 space-y-1">
                                            <li>• Jornada 44h semanais = Divisor 220.</li>
                                            <li>• Jornada 40h semanais = Divisor 200.</li>
                                        </ul>
                                    </div>

                                    {/* Passo 2 */}
                                    <div className="pl-4 border-l-2 border-blue-500">
                                        <h4 className="text-white font-semibold mb-2">2. Aplicar o Percentual da Hora Extra</h4>
                                        <p className="text-sm text-gray-400 mb-2">Multiplique o VHN pelo fator de acréscimo.</p>
                                        <ul className="text-xs text-gray-500 space-y-1">
                                            <li>• Para 50%: Multiplicar por 1,5.</li>
                                            <li>• Para 100%: Multiplicar por 2,0.</li>
                                        </ul>
                                    </div>

                                    {/* Exemplo 1 */}
                                    <div className="bg-white/5 p-5 rounded-xl border border-white/5 mt-4">
                                        <h4 className="text-md font-bold text-white mb-2">Exemplo Real 1 (Salário Mínimo Vigente)</h4>
                                        <p className="text-xs text-gray-400 mb-3">Funcionário com salário de <strong>R$ 1.518,00</strong> (jornada 44h) que fez <strong>10h30min</strong> de extras (50%) no mês.</p>
                                        <ul className="space-y-1.5 text-xs text-gray-300">
                                            <li>1. <strong>Conversão do tempo:</strong> 10h30min = 10,5 horas.</li>
                                            <li>2. <strong>Valor Hora Normal:</strong> R$ 1.518 / 220 = R$ 6,90.</li>
                                            <li>3. <strong>Valor com Adicional (50%):</strong> R$ 6,90 x 1,5 = R$ 10,35.</li>
                                            <li>4. <strong>Total a Receber:</strong> R$ 10,35 x 10,5 = <strong>R$ 108,67</strong>.</li>
                                        </ul>
                                    </div>

                                    {/* Exemplo 2 */}
                                    <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                        <h4 className="text-md font-bold text-white mb-2">Exemplo 2 (Alto Salário / Teto)</h4>
                                        <p className="text-xs text-gray-400 mb-3">Gerente ou especialista com salário de <strong>R$ 8.000,00</strong> (jornada padrão 220h) que realizou <strong>10 horas extras</strong>.</p>
                                        <ul className="space-y-1.5 text-xs text-gray-300">
                                            <li>1. <strong>Valor Hora Normal:</strong> R$ 8.000 / 220 = R$ 36,36.</li>
                                            <li>2. <strong>Valor com Adicional (50%):</strong> R$ 36,36 x 1,5 = R$ 54,55 (Valor da hora extra).</li>
                                            <li>3. <strong>Total a Receber:</strong> R$ 54,55 x 10 = <strong>R$ 545,50</strong>.</li>
                                        </ul>
                                    </div>

                                    <p className="text-sm text-gray-400 mt-4">
                                        Para um planejamento financeiro completo, insira esses valores na nossa <Link to="/calculadoras/salario-liquido" className="text-blue-400 hover:underline">calculadora de salário líquido</Link> e veja os descontos de IRRF.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reflexo DSR */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">O Reflexo no DSR (Descanso Semanal Remunerado)</h2>
                        <p className="text-gray-400 mb-4">
                            Utilizar uma **Calculadora de Horas Extras** confiável é vital para computar o DSR. As horas extras habituais geram um valor adicional a ser pago no seu dia de descanso. Em 2025, o cálculo segue rigorosamente a <a href="https://www.planalto.gov.br/ccivil_03/leis/l0605.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Lei 605/49</a> e a Súmula 172 do TST.
                        </p>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 font-mono text-sm text-blue-300 mb-4">
                            DSR = (Total Horas Extras / Dias Úteis no Mês) x Domingos e Feriados
                        </div>
                        <p className="text-gray-400">
                            <strong>Atenção:</strong> Para este cálculo, o sábado é considerado dia útil. Se você fez R$ 1.000,00 de extras em um mês com 25 dias úteis e 5 domingos/feriados, receberá mais <strong>R$ 200,00</strong> de DSR. Esse valor também impacta o cálculo na hora de <Link to="/calculadoras/ferias" className="text-blue-400 hover:underline">calcular férias</Link> e o <Link to="/calculadoras/decimo-terceiro" className="text-blue-400 hover:underline">décimo terceiro</Link>.
                        </p>
                    </div>

                    {/* Adicional Noturno */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Adicional Noturno: Regra Geral (20%) e Exceções</h2>
                        <p className="text-gray-400 mb-4">
                            É fundamental consultar a Convenção Coletiva de Trabalho (CCT) da sua categoria em 2025. Embora a **CLT (Art. 73)** determine que o adicional noturno urbano seja de **20%** sobre a hora diurna, diversas categorias podem ter negociado percentuais maiores, chegando a **50%**.
                        </p>

                        <h3 className="text-lg font-bold text-white mb-4">Hora Extra Noturna (Cumulatividade)</h3>
                        <p className="text-gray-400 mb-4">Se a hora extra for realizada entre 22h e 05h, o custo é cumulativo:</p>
                        <ul className="space-y-2 text-gray-300 mb-6">
                            <li className="flex gap-2"><ArrowRight className="w-4 h-4 mt-1 text-blue-500" /> 1. Calcula-se a hora noturna (VHN + 20% ou % da CCT).</li>
                            <li className="flex gap-2"><ArrowRight className="w-4 h-4 mt-1 text-blue-500" /> 2. Sobre esse valor majorado, aplica-se o adicional de Hora Extra (Súmula 60 do TST).</li>
                        </ul>

                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <h4 className="text-white font-bold mb-2">Exemplo de Impacto Financeiro:</h4>
                            <ul className="space-y-1 text-sm text-gray-400">
                                <li>• <strong>Regra CLT (20%):</strong> Hora Noturna vale 1,2x a hora normal.</li>
                                <li>• <strong>Exceção CCT (50%):</strong> Hora Noturna vale 1,5x a hora normal.</li>
                            </ul>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">
                            Além do valor, lembre-se da <strong>hora ficta</strong>: cada 52 minutos e 30 segundos trabalhados à noite equivalem a 1 hora remunerada.
                        </p>
                    </div>

                    {/* Casos Especiais */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Casos Especiais</h2>
                        <p className="text-gray-400 mb-6">
                            Para cobrir todas as nuances da legislação, nossa **Calculadora de Horas Extras** contempla também as situações específicas detalhadas abaixo:
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Escala 12x36 e Feriados</h3>
                                <p className="text-sm text-gray-400">
                                    Na escala 12x36, a remuneração mensal abrange o descanso. Porém, a Súmula 444 do TST e entendimentos recentes reforçam que o trabalho em **feriados** nesta escala, se não compensado, deve ser pago em dobro (adicional de 100%). O dia normal de trabalho, contudo, não gera hora extra além da 8ª hora.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Comissionistas</h3>
                                <p className="text-sm text-gray-400">
                                    Para quem recebe comissão, o cálculo é diferente (Súmula 340 do TST). Como a comissão já remunera o tempo trabalhado (através das vendas), a empresa deve pagar apenas o **adicional** de hora extra sobre a parte variável, e não a hora cheia.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Intervalo Intrajornada (Almoço)</h3>
                                <p className="text-sm text-gray-400">
                                    Se a empresa não concede a 1 hora completa de almoço, ela deve pagar o tempo suprimido como hora extra. Esse pagamento tem natureza indenizatória (não incide INSS/FGTS) e considera apenas os minutos não gozados, conforme alterações da Reforma Trabalhista.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={OVERTIME_FAQS}
                    title="Perguntas Frequentes sobre Calculadora de Horas Extras"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
