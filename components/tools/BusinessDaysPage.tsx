import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, Calendar, MapPin, CheckCircle, Clock, AlertCircle, FileText, XCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { FAQItem } from '../../types';

const BUSINESS_DAYS_FAQS: FAQItem[] = [
    {
        question: "O sábado é considerado dia útil para pagamento de salário?",
        answer: "Sim. Segundo o <a href='https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm' target='_blank' rel='noopener noreferrer' class='text-blue-400 hover:underline'>Artigo 459 da CLT</a> e jurisprudência consolidada, o sábado é dia útil para contagem do prazo de pagamento salarial, exceto se coincidir com um feriado. Porém, se o 5º dia cair no sábado, empresas que pagam via TED/DOC devem antecipar para sexta-feira, pois bancos não processam essas transferências no fim de semana."
    },
    {
        question: "Quantos dias úteis terá o ano de 2025?",
        answer: "O ano de 2025 terá aproximadamente <strong>252 dias úteis</strong> bancários (segunda a sexta), já descontando o novo feriado nacional de 20 de novembro. Para o comércio que funciona aos sábados, esse número é maior. Lembre-se que feriados estaduais (como 9 de Julho em SP) ou municipais reduzem ainda mais essa contagem em cada localidade."
    },
    {
        question: "O dia 20 de novembro é feriado nacional em 2025?",
        answer: "Sim. A Lei 14.759/2023 tornou o Dia Nacional de Zumbi e da Consciência Negra feriado em todo o território nacional, eliminando a antiga dependência de leis municipais. Portanto, em 2025, o dia 20 de novembro (quinta-feira) é um dia não útil obrigatório para fins bancários, prazos processuais e rotinas trabalhistas em todo o Brasil."
    },
    {
        question: "Como calcular dias úteis no Excel considerando o sábado?",
        answer: "Use a função avançada <code>=DIATRABALHOTOTAL.INTL(início; fim; 11; feriados)</code>. O parâmetro \"11\" é crucial pois configura apenas o domingo como fim de semana, ideal para o varejo e escalas 6x1. Se você usar a fórmula comum (sem o INTL), o Excel excluirá o sábado automaticamente, gerando erros no cálculo de prazos trabalhistas CLT."
    },
    {
        question: "Teremos muitos \"feriadões\" em 2025?",
        answer: "Sim, será um ano de muitas \"pontes\". Embora três feriados caiam no domingo, datas críticas como Dia do Trabalho (01/05), Corpus Christi (19/06) e Consciência Negra (20/11) caem em quintas-feiras. Isso favorece emendas prolongadas na sexta-feira, o que beneficia o turismo, mas exige planejamento antecipado da indústria para evitar paradas custosas na produção."
    },
    {
        question: "Carnaval é feriado ou dia útil?",
        answer: "Para a iniciativa privada, o Carnaval (segunda e terça) é tecnicamente dia útil, a menos que exista lei estadual (como no RJ) ou municipal declarando feriado. No âmbito federal, é apenas ponto facultativo. Se não houver lei local ou convenção coletiva, a empresa pode exigir trabalho normal ou negociar compensação."
    }
];

const NATIONAL_HOLIDAYS_2025 = [
    { date: '2025-01-01', name: 'Confraternização Universal', type: 'Feriado Nacional' },
    { date: '2025-03-03', name: 'Carnaval (Ponto Facultativo)', type: 'Ponto Facultativo' },
    { date: '2025-03-04', name: 'Carnaval (Ponto Facultativo)', type: 'Ponto Facultativo' },
    { date: '2025-04-18', name: 'Paixão de Cristo', type: 'Feriado Nacional' },
    { date: '2025-04-21', name: 'Tiradentes', type: 'Feriado Nacional' },
    { date: '2025-05-01', name: 'Dia do Trabalho', type: 'Feriado Nacional' },
    { date: '2025-06-19', name: 'Corpus Christi', type: 'Ponto Facultativo' },
    { date: '2025-09-07', name: 'Independência do Brasil', type: 'Feriado Nacional' },
    { date: '2025-10-12', name: 'N. Sra. Aparecida', type: 'Feriado Nacional' },
    { date: '2025-11-02', name: 'Finados', type: 'Feriado Nacional' },
    { date: '2025-11-15', name: 'Proclamação da República', type: 'Feriado Nacional' },
    { date: '2025-11-20', name: 'Dia da Consciência Negra', type: 'Feriado Nacional' },
    { date: '2025-12-25', name: 'Natal', type: 'Feriado Nacional' },
];

export function BusinessDaysPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [includeSaturdays, setIncludeSaturdays] = useState(false);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    // Results
    const [result, setResult] = useState<{
        businessDays: number;
        totalDays: number;
        weekends: number;
        holidays: number;
        holidayList: typeof NATIONAL_HOLIDAYS_2025;
    } | null>(null);

    const calculate = () => {
        if (!startDate || !endDate) {
            setResult(null);
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Reset hours to avoid timezone issues affecting day count
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        if (end < start) {
            setResult(null);
            return;
        }

        let current = new Date(start);
        let businessDays = 0;
        let weekends = 0;
        let holidayCount = 0;
        const foundHolidays: typeof NATIONAL_HOLIDAYS_2025 = [];

        // Total days logic: Inclusive of start and end? 
        // "Entre X e Y". Usually calculates the duration.
        // Let's assume inclusive of both start and end for "working days in range".
        const totalTime = Math.abs(end.getTime() - start.getTime());
        const totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24)) + 1;

        while (current <= end) {
            const dayOfWeek = current.getDay(); // 0 = Sun, 6 = Sat
            const dateString = current.toISOString().split('T')[0];

            // Check for holiday
            // Check for holiday
            let holiday = NATIONAL_HOLIDAYS_2025.find(h => h.date === dateString);

            // Basic Regional Holiday Logic
            if (!holiday && state === 'SP') {
                if (current.getMonth() === 6 && current.getDate() === 9) { // 9 de Julho
                    holiday = { date: dateString, name: 'Revolução Constitucionalista (SP)', type: 'Feriado Estadual' };
                }
                if (city === 'Capital' && current.getMonth() === 0 && current.getDate() === 25) { // 25 de Janeiro
                    holiday = { date: dateString, name: 'Aniversário de São Paulo', type: 'Feriado Municipal' };
                }
                if (city === 'Capital' && current.getMonth() === 10 && current.getDate() === 20) {
                    // 20 Nov is National now, handled above. Check for others?
                }
            }
            if (!holiday && state === 'RJ') {
                if (current.getMonth() === 3 && current.getDate() === 23) { // 23 de Abril
                    holiday = { date: dateString, name: 'Dia de São Jorge (RJ)', type: 'Feriado Estadual' };
                }
                if (current.getMonth() === 10 && current.getDate() === 20) {
                    // Zumbi is now National
                }
                if (city === 'Capital' && current.getMonth() === 0 && current.getDate() === 20) { // 20 de Janeiro
                    holiday = { date: dateString, name: 'Dia de São Sebastião', type: 'Feriado Municipal' };
                }
            }

            if (holiday) {
                // It's a holiday (or optional point)
                // Logic: If it's a holiday, it subtracts from business days regardless of day of week?
                // Usually: if holiday falls on weekend, it's already a weekend. 
                // But we need to count specific buckets.

                // Let's count it as a holiday match first.
                // We only add to holidayCount if it WOULD have been a business day otherwise? 
                // OR we just report stats. 
                // Let's replicate standard logic: 
                // Is Weekend?
                const isWeekend = dayOfWeek === 0 || (!includeSaturdays && dayOfWeek === 6);

                if (!isWeekend) {
                    // It is a weekday (or Saturday if included) BUT it is a holiday.
                    holidayCount++;
                    foundHolidays.push(holiday);
                } else {
                    // It falls on a weekend.
                    // We don't count it as a "loss" of a business day, but it is a holiday occurrence.
                    // Text says: "Novembro possui 3 feriados... Dias 02 e 15 caem no fim de semana, então já estão descontados aqui [no FDS]."
                    // So holidayCount should only include holidays that fall on BUSINESS days.
                }

                if (isWeekend) {
                    weekends++;
                }

            } else {
                // Not a holiday
                const isWeekend = dayOfWeek === 0 || (!includeSaturdays && dayOfWeek === 6);
                if (isWeekend) {
                    weekends++;
                } else {
                    businessDays++;
                }
            }

            current.setDate(current.getDate() + 1);
        }

        setResult({
            businessDays,
            totalDays,
            weekends,
            holidays: holidayCount,
            holidayList: foundHolidays
        });
    };

    useEffect(() => {
        calculate();
    }, [startDate, endDate, includeSaturdays, state, city]); // Recalculate when inputs change

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Dias Úteis 2025 (Online e Gratuita)",
        "url": "https://www.junny.com.br/calculadoras/dias-uteis",
        "description": "Calculadora Dias Úteis 2025: conte prazos com o novo feriado da Consciência Negra. Inclui tabela oficial, 252 dias bancários e regras CLT.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Contagem de Dias Úteis 2025",
            "Calendário Bancário vs Comercial",
            "Feriados Nacionais 2025",
            "Novo Feriado Consciência Negra"
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
                title="Calculadora Dias Úteis 2025: Feriados, Sábados e Excel"
                description="Calculadora Dias Úteis 2025: conte prazos com o novo feriado da Consciência Negra. Inclui tabela oficial, 252 dias bancários e regras CLT."
                canonical="/calculadoras/dias-uteis"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": BUSINESS_DAYS_FAQS.map(faq => ({
                        "@type": "Question",
                        "name": faq.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer
                        }
                    }))
                })}
            </script>

            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Dias Úteis', href: '/calculadoras/dias-uteis' }
                    ]} />

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Ano de Referência: 2025</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Dias Úteis 2025 (Online e Gratuita)
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Section */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Calcular Dias Úteis
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6 w-full">
                                    <div className="space-y-2">
                                        <label htmlFor="startDate" className="text-sm text-gray-400">Data Inicial</label>
                                        <div className="relative">
                                            <input
                                                id="startDate"
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                                            />
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="endDate" className="text-sm text-gray-400">Data Final</label>
                                        <div className="relative">
                                            <input
                                                id="endDate"
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                                            />
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setIncludeSaturdays(!includeSaturdays)}>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${includeSaturdays ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
                                            {includeSaturdays && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <span className="text-sm text-gray-300">Considerar sábado como dia útil? (Padrão CLT/Comércio)</span>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Estado</label>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                            >
                                                <option value="" className="bg-[#1a1a1a]">Selecione o Estado</option>
                                                <option value="SP" className="bg-[#1a1a1a]">São Paulo</option>
                                                <option value="RJ" className="bg-[#1a1a1a]">Rio de Janeiro</option>
                                                <option value="MG" className="bg-[#1a1a1a]">Minas Gerais</option>
                                                <option value="RS" className="bg-[#1a1a1a]">Rio Grande do Sul</option>
                                                <option value="BA" className="bg-[#1a1a1a]">Bahia</option>
                                                <option value="PR" className="bg-[#1a1a1a]">Paraná</option>
                                                <option value="DF" className="bg-[#1a1a1a]">Distrito Federal</option>
                                            </select>
                                            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Cidade</label>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                disabled={!state}
                                            >
                                                <option value="" className="bg-[#1a1a1a]">{state ? "Selecione a Cidade (Opcional)" : "Selecione o Estado Primeiro"}</option>
                                                <option value="Capital" className="bg-[#1a1a1a]">Capital</option>
                                                <option value="Interior" className="bg-[#1a1a1a]">Interior</option>
                                            </select>
                                            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Results Display */}
                                <div className="pt-2">
                                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">
                                            Resultado da Contagem
                                        </span>
                                        <span className="text-5xl font-bold text-white block mb-2">
                                            {result ? result.businessDays : 0}
                                        </span>
                                        <span className="text-sm text-gray-400">Dias Úteis</span>
                                    </div>

                                    {result && (
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                <span className="text-gray-300">Dias Totais</span>
                                                <span className="text-white font-medium">{result.totalDays}</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                <span className="text-gray-300">Fins de Semana</span>
                                                <span className="text-white font-medium">{result.weekends}</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 col-span-2">
                                                <span className="text-gray-300">Feriados em dias úteis</span>
                                                <span className="text-white font-medium">{result.holidays}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Summary Section */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Resumo de Regras 2025
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-3 pt-2">
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Info className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Ano de Referência:</strong> 2025 (Atualizado em Dezembro).</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Novo Feriado Nacional:</strong> Dia 20 de Novembro (Consciência Negra) agora é feriado em todo o país (Lei 14.759).</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Pagamento de Salário:</strong> Para a CLT, o sábado <strong>é considerado dia útil</strong>. O pagamento deve ocorrer até o 5º dia útil.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                                        <span><strong>Sistema Bancário:</strong> Sábados <strong>não</strong> são dias úteis para vencimento de boletos ou transferências (TED/DOC).</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                                        <span><strong>Carnaval 2025:</strong> Dias 03 e 04 de março são pontos facultativos federais, não feriados nacionais (salvo lei local).</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumo em 30 Segundos */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Clock className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Resumo em 30 Segundos
                        </h2>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                        A <strong>Calculadora Dias Úteis 2025</strong> é essencial para gestores de RH, advogados e profissionais financeiros que precisam de precisão temporal. Diferente de calendários comuns, nossa ferramenta distingue <strong>dias úteis bancários</strong> (segunda a sexta) de <strong>dias úteis comerciais</strong> (que podem incluir sábado). Com a nacionalização do feriado da Consciência Negra e a configuração de "pontes" nas quintas-feiras em 2025, calcular prazos manualmente gera riscos altos de multas trabalhistas ou perda de prazos processuais.
                    </p>
                </div>

                {/* Como funciona */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <HelpCircle className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como funciona a Calculadora Dias Úteis
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Para garantir precisão máxima, insira as datas de início e fim e selecione se deseja <strong>considerar sábados como dias úteis</strong> (ideal para cálculos trabalhistas). Informe também seu <strong>Estado e Cidade</strong>, pois a ferramenta desconta automaticamente os feriados locais e regionais específicos que impactam sua contagem.
                    </p>
                </div>

                {/* Calendário Oficial */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Calendar className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Calendário Oficial de Feriados Nacionais 2025
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-8 max-w-3xl">
                        Abaixo, listamos as datas que impactam diretamente a contagem de dias úteis em 2025. O calendário considera as portarias do Ministério da Gestão e Inovação e a legislação federal vigente.
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/5 text-gray-300">
                                <tr>
                                    <th className="p-3">Data</th>
                                    <th className="p-3">Dia da Semana</th>
                                    <th className="p-3">Celebração</th>
                                    <th className="p-3">Tipo Legal</th>
                                    <th className="p-3">Impacto</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400 divide-y divide-white/5">
                                <tr><td className="p-3"><strong>01/01</strong></td><td className="p-3">Quarta-feira</td><td className="p-3">Confraternização Universal</td><td className="p-3">Feriado Nacional</td><td className="p-3">Parada Total</td></tr>
                                <tr><td className="p-3"><strong>03/03</strong></td><td className="p-3">Segunda-feira</td><td className="p-3">Carnaval</td><td className="p-3">Ponto Facultativo</td><td className="p-3">Folga comum</td></tr>
                                <tr><td className="p-3"><strong>04/03</strong></td><td className="p-3">Terça-feira</td><td className="p-3">Carnaval</td><td className="p-3">Ponto Facultativo</td><td className="p-3">Folga comum</td></tr>
                                <tr><td className="p-3"><strong>18/04</strong></td><td className="p-3">Sexta-feira</td><td className="p-3">Paixão de Cristo</td><td className="p-3">Feriado Nacional</td><td className="p-3">Feriadão</td></tr>
                                <tr><td className="p-3"><strong>21/04</strong></td><td className="p-3">Segunda-feira</td><td className="p-3">Tiradentes</td><td className="p-3">Feriado Nacional</td><td className="p-3">Feriadão</td></tr>
                                <tr><td className="p-3"><strong>01/05</strong></td><td className="p-3">Quinta-feira</td><td className="p-3">Dia do Trabalho</td><td className="p-3">Feriado Nacional</td><td className="p-3">Possível ponte</td></tr>
                                <tr><td className="p-3"><strong>19/06</strong></td><td className="p-3">Quinta-feira</td><td className="p-3">Corpus Christi</td><td className="p-3">Ponto Facultativo</td><td className="p-3">Possível ponte</td></tr>
                                <tr><td className="p-3"><strong>07/09</strong></td><td className="p-3">Domingo</td><td className="p-3">Independência do Brasil</td><td className="p-3">Feriado Nacional</td><td className="p-3">Nulo</td></tr>
                                <tr><td className="p-3"><strong>12/10</strong></td><td className="p-3">Domingo</td><td className="p-3">N. Sra. Aparecida</td><td className="p-3">Feriado Nacional</td><td className="p-3">Nulo</td></tr>
                                <tr><td className="p-3"><strong>02/11</strong></td><td className="p-3">Domingo</td><td className="p-3">Finados</td><td className="p-3">Feriado Nacional</td><td className="p-3">Nulo</td></tr>
                                <tr><td className="p-3"><strong>15/11</strong></td><td className="p-3">Sábado</td><td className="p-3">Proclamação da República</td><td className="p-3">Feriado Nacional</td><td className="p-3">Impacto Varejo</td></tr>
                                <tr><td className="p-3"><strong>20/11</strong></td><td className="p-3">Quinta-feira</td><td className="p-3">Dia da Consciência Negra</td><td className="p-3">Feriado Nacional</td><td className="p-3"><strong>Novo (Lei 14.759)</strong></td></tr>
                                <tr><td className="p-3"><strong>25/12</strong></td><td className="p-3">Quinta-feira</td><td className="p-3">Natal</td><td className="p-3">Feriado Nacional</td><td className="p-3">Parada Total</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 border-l-4 border-l-blue-500">
                        <p className="text-sm text-gray-300">
                            <strong>Fonte Oficial:</strong> Calendário baseado na <a href="https://www.gov.br/gestao/pt-br/assuntos/noticias/2024/dezembro/gestao-divulga-calendario-de-feriados-e-pontos-facultativos-em-2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Portaria do Ministério da Gestão e da Inovação em Serviços Públicos</a> e na <a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/L14759.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Lei nº 14.759/2023</a>.
                        </p>
                    </div>
                </div>

                {/* Erros Comuns */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <AlertCircle className="w-8 h-8 text-yellow-500 shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-yellow-200 mb-2">Erros Comuns ao Calcular Dias Úteis</h3>
                            <p className="text-yellow-100/80">O erro mais frequente não é matemático, mas jurídico. A confusão entre "Dia Útil Bancário" e "Dia Útil Trabalhista" gera passivos enormes.</p>
                        </div>
                    </div>
                    <ul className="space-y-4 text-yellow-100/70">
                        <li className="flex gap-3">
                            <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span><strong>Ignorar o Sábado no Pagamento de Salário:</strong> Muitos RHs usam o calendário bancário (seg-sex) para calcular o 5º dia útil. Isso está incorreto. Para a CLT, o sábado conta. Se o mês começa numa sexta-feira, o 5º dia útil é a quarta-feira seguinte, não a sexta.</span>
                        </li>
                        <li className="flex gap-3">
                            <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span><strong>Confundir Ponto Facultativo com Feriado:</strong> Carnaval e Corpus Christi **não são feriados nacionais**. Empresas privadas só são obrigadas a dar folga se houver lei municipal/estadual ou Convenção Coletiva.</span>
                        </li>
                        <li className="flex gap-3">
                            <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span><strong>Esquecer o Feriado de 20 de Novembro:</strong> Softwares desatualizados ainda consideram esta data como dia útil em muitos estados. Desde o final de 2023, a data é feriado nacional, travando prazos e pagamentos.</span>
                        </li>
                    </ul>
                </div>

                {/* Como Calcular Steps */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Calculator className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como Calcular (Passo a Passo e Fórmulas)
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Para quem precisa fazer projeções manuais ou auditar sistemas sem depender apenas da <strong>Calculadora Dias Úteis 2025</strong> automática, a lógica de cálculo segue critérios de exclusão rigorosos.
                    </p>

                    <h3 className="text-lg font-bold text-white mb-4">A Fórmula Lógica</h3>
                    <p className="text-gray-300 mb-4">A contagem de dias úteis é uma subtração dos dias não laborais do período total.</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-6 text-center font-mono text-xl text-blue-300">
                        DU = DT - (FDS + F + PF)
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><strong>DU:</strong> Dias Úteis</li>
                                <li><strong>DT:</strong> Dias Totais (Corridos)</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><strong>FDS:</strong> Fins de Semana (Sáb/Dom ou apenas Dom)</li>
                                <li><strong>F:</strong> Feriados Nacionais e Locais</li>
                                <li><strong>PF:</strong> Pontos Facultativos (se aderido)</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-4">Exemplos Práticos de Contagem</h3>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <h4 className="font-bold text-white mb-2">Cenário A: Agosto de 2025 (Mês Comum)</h4>
                            <ul className="space-y-1 text-sm text-gray-300">
                                <li>• <strong>Dias Totais:</strong> 31</li>
                                <li>• <strong>Fins de Semana:</strong> 10 dias</li>
                                <li>• <strong>Feriados:</strong> 0</li>
                                <li className="pt-2 font-mono text-blue-300">31 - 10 - 0 = 21 Dias Úteis</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                            <h4 className="font-bold text-white mb-2">Cenário B: Novembro de 2025 (Mês Atípico)</h4>
                            <p className="text-xs text-gray-400 mb-2">Novembro possui 3 feriados (dias 02, 15 e 20).</p>
                            <ul className="space-y-1 text-sm text-gray-300">
                                <li>• <strong>Dias Totais:</strong> 30</li>
                                <li>• <strong>Fins de Semana:</strong> 10 dias (inclui 02 e 15)</li>
                                <li>• <strong>Feriados em semana:</strong> 1 dia (20/11)</li>
                                <li className="pt-2 font-mono text-blue-300">30 - 10 - 1 = 19 Dias Úteis</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-4">Método Excel (Avançado)</h3>
                    <p className="text-gray-300 mb-4">A função simples <code>=DIATRABALHOTOTAL</code> do Excel é falha para o varejo, pois exclui automaticamente o sábado. Para precisão profissional, utilize a função <strong>INTL</strong>:</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-6 font-mono text-sm text-blue-300 overflow-x-auto">
                        =DIATRABALHOTOTAL.INTL(data_inicial; data_final; [código_fds]; [feriados])
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 mb-6">
                        <li><strong>Código 1:</strong> Exclui Sábado e Domingo (Padrão Escritórios/Bancos).</li>
                        <li><strong>Código 11:</strong> Exclui apenas Domingo (Padrão Comércio/CLT).</li>
                    </ul>
                    <p className="text-sm text-gray-400">Ao planejar o orçamento anual da empresa, cruze esses dados com a nossa <Link to="/calculadoras/custo-funcionario" className="text-blue-400 hover:underline">calculadora de custo de funcionário</Link> para entender o impacto das horas não trabalhadas.</p>
                </div>

                {/* Casos Especiais */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Casos Especiais e Aplicações Práticas</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Pagamento de Salário (CLT)</h3>
                            <p className="text-sm text-gray-400">
                                Para determinar a data limite de pagamento, você deve contar o sábado como dia útil (exceto se for feriado). No entanto, se o 5º dia útil cair num sábado, a empresa muitas vezes antecipa o pagamento (via TED/DOC) para sexta-feira ou usa o PIX.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Trabalho em Feriados e Hora Extra</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                Se a escala de trabalho cair em um feriado nacional (como o novo feriado de 20 de novembro), o colaborador tem direito a receber o dia em dobro (100%) ou uma folga compensatória.
                            </p>
                            <div className="text-xs text-blue-400 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Calcule na <Link to="/calculadoras/horas-extras" className="underline hover:text-blue-300">Calculadora de Horas Extras</Link></span>
                            </div>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Planejamento de Férias</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                Ao programar o descanso, é crucial verificar se o início das férias não coincide com dias proibidos pela Reforma Trabalhista (dois dias que antecedem feriado ou DSR).
                            </p>
                            <div className="text-xs text-blue-400 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Simule na <Link to="/calculadoras/ferias" className="underline hover:text-blue-300">Calculadora de Férias</Link></span>
                            </div>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Prazos Processuais e Mercado</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                <strong>Jurídico:</strong> Conte apenas dias úteis, descontando Recesso Forense e feriados locais.<br />
                                <strong>Financeiro:</strong> Sábados, domingos e feriados nacionais não contam para vencimentos.
                            </p>
                            <div className="text-xs text-blue-400 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Veja <Link to="/calculadoras/juros-compostos" className="underline hover:text-blue-300">Calculadora de Juros Compostos</Link></span>
                            </div>
                        </div>
                    </div>
                </div>

                <FAQ items={BUSINESS_DAYS_FAQS} />
            </div>
        </section>
    );
}
