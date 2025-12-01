import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Briefcase, TrendingUp, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';

const TERMINATION_FAQS: FAQItem[] = [
    {
        question: "A calculadora é válida para qualquer tipo de demissão?",
        answer: "Sim, nossa calculadora cobre os principais tipos de rescisão: demissão sem justa causa, pedido de demissão, demissão por justa causa e acordo entre as partes. Basta selecionar o motivo correto para ver os direitos aplicáveis."
    },
    {
        question: "A simulação considera férias vencidas e proporcionais?",
        answer: "Sim. O cálculo leva em conta tanto as férias vencidas (se houver) quanto as férias proporcionais aos meses trabalhados no ano corrente, incluindo o terço constitucional."
    },
    {
        question: "É necessário informar o saldo de FGTS?",
        answer: "Para um cálculo preciso da multa de 40% (ou 20% em caso de acordo), é importante informar o saldo atual do FGTS. Se você não souber o valor exato, pode fazer uma estimativa ou consultar o extrato no aplicativo do FGTS."
    },
    {
        question: "A calculadora funciona para contratos de experiência?",
        answer: "Esta calculadora é otimizada para contratos por tempo indeterminado. Para contratos de experiência ou temporários, as regras podem variar ligeiramente, especialmente em relação à multa por quebra de contrato."
    },
    {
        question: "Posso simular rescisão com aviso prévio trabalhado ou indenizado?",
        answer: "Sim, você pode selecionar se o aviso prévio será trabalhado, indenizado ou não cumprido. O valor será somado ou descontado do total conforme a regra da CLT para o tipo de demissão escolhido."
    }
];

export const TerminationPage: React.FC = () => {
    const [salary, setSalary] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [reason, setReason] = useState<string>('sem-justa-causa');
    const [notice, setNotice] = useState<string>('trabalhado');
    const [hasVacationDue, setHasVacationDue] = useState<boolean>(false);
    const [fgtsBalance, setFgtsBalance] = useState<number>(0);
    const [result, setResult] = useState<any>(null);

    const calculateTermination = () => {
        if (!salary || !startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Calculate time worked
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const monthsWorked = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        // 1. Saldo de Salário
        const daysInMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
        const daysWorkedInMonth = end.getDate();
        const salaryBalance = (salary / daysInMonth) * daysWorkedInMonth;

        // 2. Aviso Prévio
        let noticeValue = 0;
        let noticeDays = 30;
        if (reason === 'sem-justa-causa') {
            const yearsWorked = Math.floor(diffDays / 365);
            noticeDays += Math.min(yearsWorked * 3, 60); // Max 90 days total
            if (notice === 'indenizado') {
                noticeValue = (salary / 30) * noticeDays;
            }
        } else if (reason === 'pedido-demissao') {
            if (notice === 'nao-cumprido') {
                noticeValue = -salary; // Discount
            }
        } else if (reason === 'acordo') {
            if (notice === 'indenizado') {
                noticeValue = (salary / 30) * noticeDays / 2; // Half notice
            }
        }

        // 3. 13º Salário Proporcional
        // Calculate months for 13th (needs >= 15 days in month)
        let months13th = end.getMonth() + (end.getDate() >= 15 ? 1 : 0);
        if (notice === 'indenizado' && reason === 'sem-justa-causa') {
            // Add notice period projection
            const projectedEnd = new Date(end);
            projectedEnd.setDate(end.getDate() + noticeDays);
            months13th = projectedEnd.getMonth() + (projectedEnd.getDate() >= 15 ? 1 : 0);
            // Simple approximation for current year. 
            // Correct logic is months worked in current year.
            // Assuming admission before current year for simplicity or handling logic:
            const startYear = start.getFullYear();
            const endYear = end.getFullYear();
            if (startYear === endYear) {
                months13th = months13th - start.getMonth(); // Approximation
            }
        }
        months13th = Math.min(months13th, 12);
        let thirteenth = 0;
        if (reason !== 'justa-causa') {
            thirteenth = (salary / 12) * months13th;
        }

        // 4. Férias
        let vacationProportional = 0;
        let vacationDue = 0;
        let vacationThird = 0;

        if (reason !== 'justa-causa') {
            // Proportional Vacation
            // Logic: Months worked since anniversary. 
            // Simplified: (months worked % 12)
            let vacationMonths = monthsWorked % 12;
            // Add projection if notice indemnified
            if (notice === 'indenizado' && reason === 'sem-justa-causa') {
                vacationMonths += 1; // Approx 1 month notice
            }
            vacationProportional = (salary / 12) * vacationMonths;

            // Overdue Vacation
            if (hasVacationDue) {
                vacationDue = salary;
            }

            // 1/3 Constitutional
            vacationThird = (vacationProportional + vacationDue) / 3;
        } else {
            // Justa causa only gets overdue vacation + 1/3
            if (hasVacationDue) {
                vacationDue = salary;
                vacationThird = vacationDue / 3;
            }
        }

        // 5. FGTS
        let fgtsFine = 0;
        if (reason === 'sem-justa-causa') {
            fgtsFine = fgtsBalance * 0.4;
        } else if (reason === 'acordo') {
            fgtsFine = fgtsBalance * 0.2;
        }

        const total = salaryBalance + noticeValue + thirteenth + vacationProportional + vacationDue + vacationThird + fgtsFine;

        setResult({
            salaryBalance,
            noticeValue,
            thirteenth,
            vacationProportional,
            vacationDue,
            vacationThird,
            fgtsFine,
            total
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Rescisão Trabalhista FinZap",
        "description": "Simule o valor da sua rescisão trabalhista CLT. Calcule saldo de salário, férias, 13º, aviso prévio e multa do FGTS.",
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
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Rescisão Trabalhista', href: '/calculadoras/rescisao' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Direitos Trabalhistas</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Rescisão CLT</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Simule sua rescisão trabalhista e entenda todos os seus direitos com orientações detalhadas.
                        </p>
                    </motion.div>
                </div>

                {/* Calculator Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid lg:grid-cols-12 gap-8 mb-24"
                >
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-primary" />
                                Dados do Contrato
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Salário Bruto (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Ex: 3000"
                                            value={salary || ''}
                                            onChange={(e) => setSalary(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Data de Admissão</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Data de Demissão</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Motivo da Saída</label>
                                    <select
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                                    >
                                        <option value="sem-justa-causa">Demissão sem Justa Causa</option>
                                        <option value="pedido-demissao">Pedido de Demissão</option>
                                        <option value="justa-causa">Demissão por Justa Causa</option>
                                        <option value="acordo">Acordo entre as Partes</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Aviso Prévio</label>
                                    <select
                                        value={notice}
                                        onChange={(e) => setNotice(e.target.value)}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                                    >
                                        <option value="trabalhado">Trabalhado</option>
                                        <option value="indenizado">Indenizado</option>
                                        <option value="nao-cumprido">Não Cumprido (Desconto)</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    <label className="text-sm text-gray-400">Tem Férias Vencidas?</label>
                                    <button
                                        onClick={() => setHasVacationDue(!hasVacationDue)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${hasVacationDue ? 'bg-primary' : 'bg-white/10'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${hasVacationDue ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Saldo FGTS (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Ex: 5000"
                                            value={fgtsBalance || ''}
                                            onChange={(e) => setFgtsBalance(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculateTermination}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Calcular
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSalary(0);
                                            setStartDate('');
                                            setEndDate('');
                                            setFgtsBalance(0);
                                            setResult(null);
                                        }}
                                        className="px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all"
                                    >
                                        Limpar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {result ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Estimativa de Rescisão</h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {formatCurrency(result.total)}
                                            </div>
                                            <p className="text-sm text-gray-500">*Valores estimados, sujeitos a descontos de INSS e IRRF.</p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <span className="text-gray-300">Saldo de Salário</span>
                                                <span className="text-white font-bold">{formatCurrency(result.salaryBalance)}</span>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <span className="text-gray-300">Aviso Prévio</span>
                                                <span className={result.noticeValue < 0 ? "text-red-400 font-bold" : "text-white font-bold"}>
                                                    {formatCurrency(result.noticeValue)}
                                                </span>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <span className="text-gray-300">13º Salário Proporcional</span>
                                                <span className="text-white font-bold">{formatCurrency(result.thirteenth)}</span>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <span className="text-gray-300">Férias (Vencidas + Prop. + 1/3)</span>
                                                <span className="text-white font-bold">{formatCurrency(result.vacationProportional + result.vacationDue + result.vacationThird)}</span>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <span className="text-gray-300">Multa FGTS</span>
                                                <span className="text-white font-bold">{formatCurrency(result.fgtsFine)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Briefcase className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados do contrato para simular a rescisão</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg"
                >
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">O Que é a Rescisão Trabalhista?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                A rescisão trabalhista ocorre quando há o encerramento do vínculo empregatício entre o empregado e o empregador. Esse processo pode acontecer por diferentes motivos, como demissão sem justa causa, pedido de demissão, acordo entre as partes ou término de contrato.
                            </p>
                            <p className="mb-4">
                                Durante a rescisão, é necessário calcular corretamente os valores devidos ao trabalhador, que incluem direitos como saldo de salário, férias proporcionais, 13º salário proporcional, entre outros benefícios garantidos pela CLT.
                            </p>
                            <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 my-6">
                                <p className="text-yellow-200 text-sm m-0">
                                    <strong>Nota legal:</strong> A calculadora de rescisão disponibilizada nesta página tem fins meramente informativos e não substitui o cálculo oficial ou suporte jurídico. Sempre consulte um especialista para confirmar os valores em situações específicas.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Tipos de Rescisão e Como Afetam o Cálculo</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">Demissão sem Justa Causa</h3>
                                <p className="text-gray-400 text-sm mb-4">O tipo mais vantajoso para o trabalhador.</p>
                                <ul className="list-disc list-inside text-gray-400 text-sm space-y-2">
                                    <li>Saldo de salário</li>
                                    <li>Férias vencidas e proporcionais + 1/3</li>
                                    <li>13º salário proporcional</li>
                                    <li>Multa de 40% do FGTS</li>
                                    <li>Saque do FGTS e Seguro-Desemprego</li>
                                </ul>
                            </div>

                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-blue-400">Pedido de Demissão</h3>
                                <p className="text-gray-400 text-sm mb-4">Iniciativa do trabalhador.</p>
                                <ul className="list-disc list-inside text-gray-400 text-sm space-y-2">
                                    <li>Saldo de salário</li>
                                    <li>Férias vencidas e proporcionais + 1/3</li>
                                    <li>13º salário proporcional</li>
                                    <li>Sem multa do FGTS e sem saque</li>
                                    <li>Sem Seguro-Desemprego</li>
                                </ul>
                            </div>

                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-red-400">Demissão por Justa Causa</h3>
                                <p className="text-gray-400 text-sm mb-4">Falta grave cometida pelo empregado.</p>
                                <ul className="list-disc list-inside text-gray-400 text-sm space-y-2">
                                    <li>Saldo de salário</li>
                                    <li>Férias vencidas + 1/3 (apenas)</li>
                                    <li>Sem 13º e sem férias proporcionais</li>
                                    <li>Sem FGTS e sem Seguro</li>
                                </ul>
                            </div>

                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-purple-400">Acordo (Reforma Trabalhista)</h3>
                                <p className="text-gray-400 text-sm mb-4">Consensual entre as partes.</p>
                                <ul className="list-disc list-inside text-gray-400 text-sm space-y-2">
                                    <li>Verbas trabalhistas integrais</li>
                                    <li>Metade do aviso prévio (se indenizado)</li>
                                    <li>Multa de 20% do FGTS</li>
                                    <li>Saque de 80% do FGTS</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Itens do Cálculo</h2>
                        <div className="space-y-6 text-gray-400">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Aviso Prévio</h3>
                                <p>Pode ser trabalhado (recebe salário normal) ou indenizado (recebe sem trabalhar). O período varia de 30 a 90 dias, dependendo do tempo de casa (3 dias a mais por ano).</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Férias e 1/3</h3>
                                <p>Inclui férias vencidas (não tiradas) e proporcionais (meses trabalhados no ano atual), sempre com o acréscimo de 1/3 constitucional.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">13º Salário Proporcional</h3>
                                <p>Calculado com base nos meses trabalhados no ano (fração de 1/12 por mês com mais de 14 dias trabalhados).</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Multa do FGTS</h3>
                                <p>40% sobre o saldo total depositado pela empresa durante o contrato (em demissão sem justa causa).</p>
                            </div>
                        </div>
                    </section>

                    <FAQ
                        items={TERMINATION_FAQS}
                        title="Dúvidas Frequentes sobre Rescisão"
                        className="py-12"
                        showSocialProof={false}
                    />
                </motion.div>

                {/* App Promo Banner */}
                <AppPromoBanner />
            </div>
        </section>
    );
};
