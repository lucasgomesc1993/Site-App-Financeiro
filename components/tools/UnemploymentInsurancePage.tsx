import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, Briefcase, AlertCircle, ArrowRight, Calendar, DollarSign, FileText, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

// Constants 2025
const MIN_WAGE_2025 = 1518.00;
const RANGE_1_LIMIT = 2138.76;
const RANGE_2_LIMIT = 3564.96;
const FIXED_AMOUNT_RANGE_2 = 1711.01;
const MAX_BENEFIT_2025 = 2424.11;

const UNEMPLOYMENT_FAQS: FAQItem[] = [
    {
        question: "Qual o valor máximo do Seguro-Desemprego em 2025?",
        answer: "O teto máximo da parcela em 2025 foi fixado em <strong>R$ 2.424,11</strong> para quem possui média salarial superior a R$ 3.564,96. Esse valor foi reajustado com base no INPC de 2024. Vale lembrar que ninguém recebe menos que o salário mínimo vigente de <strong>R$ 1.518,00</strong>, garantindo o piso nacional para todos os beneficiários."
    },
    {
        question: "Quem ganha R$ 2.000 recebe quanto de seguro?",
        answer: "Como a média de R$ 2.000,00 se enquadra na primeira faixa da tabela (até R$ 2.138,76), aplica-se a alíquota fixa de 80%. Portanto, o valor exato da parcela será de <strong>R$ 1.600,00</strong> (2.000 x 0,80). Este montante é isento de descontos como INSS e Imposto de Renda, sendo depositado integralmente na conta do trabalhador."
    },
    {
        question: "Qual o prazo para dar entrada no benefício?",
        answer: "O trabalhador formal deve solicitar o benefício obrigatoriamente entre o <strong>7º e o 120º dia</strong> corrido após a data da demissão. Já para empregados domésticos, o prazo máximo é de 90 dias. É crucial respeitar essa janela, pois o sistema bloqueia pedidos fora do prazo, resultando na perda irreversível do direito para aquela demissão específica."
    },
    {
        question: "Como funciona o pagamento se eu arrumar outro emprego?",
        answer: "O benefício é exclusivo para quem não possui renda. Se você for contratado com registro em carteira (CLT) durante o recebimento, o pagamento das parcelas futuras é <strong>suspenso imediatamente</strong>. O governo cruza os dados da admissão no eSocial automaticamente, não sendo necessário devolver as parcelas já recebidas antes da nova contratação, apenas cessam-se as futuras."
    },
    {
        question: "Onde posso solicitar o Seguro-Desemprego online?",
        answer: "A solicitação é realizada totalmente online pelo aplicativo <strong>Carteira de Trabalho Digital</strong> ou através da <a href=\"https://www.gov.br/pt-br/servicos/solicitar-o-seguro-desemprego\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-400 hover:text-blue-300 underline\">página oficial de serviços do Gov.br</a>. Para concluir o pedido, você precisará de uma conta Gov.br (nível Prata ou Ouro) e do número do Requerimento de Seguro-Desemprego, um documento de 10 dígitos entregue pelo empregador na rescisão."
    },
    {
        question: "O valor do seguro desconta INSS ou Imposto de Renda?",
        answer: "Não, o valor da parcela é totalmente isento de Imposto de Renda e não sofre desconto compulsório de INSS. O trabalhador recebe o montante líquido integral calculado. No entanto, o tempo recebendo o seguro não conta para aposentadoria, a menos que você pague o INSS voluntariamente como \"Segurado Facultativo\" nesse período."
    },
    {
        question: "Quem tem MEI aberto perde o direito ao seguro?",
        answer: "Sim, o sistema bloqueia o benefício automaticamente ao detectar um CNPJ ativo vinculado ao seu CPF, presumindo existência de renda própria. Se o seu MEI estiver inativo ou não gerar faturamento suficiente para subsistência, é possível reverter o bloqueio apresentando um recurso administrativo com a Declaração Anual (DASN-SIMEI) zerada ou comprovantes de ausência de renda."
    }
];

export function UnemploymentInsurancePage() {
    const [salary1, setSalary1] = useState('');
    const [salary2, setSalary2] = useState('');
    const [salary3, setSalary3] = useState('');
    const [monthsWorked, setMonthsWorked] = useState('12');
    const [requestCount, setRequestCount] = useState('1');
    const [result, setResult] = useState<{ installmentValue: number; installmentCount: number; averageSalary: number } | null>(null);

    const calculate = () => {
        const s1 = parseFloat(salary1.replace(/\./g, '').replace(',', '.') || '0');
        const s2 = parseFloat(salary2.replace(/\./g, '').replace(',', '.') || '0');
        const s3 = parseFloat(salary3.replace(/\./g, '').replace(',', '.') || '0');

        const salaries = [s1, s2, s3].filter(s => s > 0);

        // If no salary is entered, do not calculate
        if (salaries.length === 0 && !result) {
            return;
        } else if (salaries.length === 0) {
            setResult(null);
            return;
        }

        // Average Calculation
        const sum = salaries.reduce((a, b) => a + b, 0);
        const averageSalary = sum / salaries.length;

        const months = parseInt(monthsWorked) || 0;
        const request = parseInt(requestCount);

        if (months === 0) {
            setResult(null);
            return;
        }

        // Value Calculation 2025 Logic
        let installmentValue = 0;

        if (averageSalary <= RANGE_1_LIMIT) {
            installmentValue = averageSalary * 0.8;
        } else if (averageSalary <= RANGE_2_LIMIT) {
            installmentValue = FIXED_AMOUNT_RANGE_2 + (averageSalary - RANGE_1_LIMIT) * 0.5;
        } else {
            installmentValue = MAX_BENEFIT_2025;
        }

        // Floor Check (Min Wage)
        if (installmentValue < MIN_WAGE_2025) {
            installmentValue = MIN_WAGE_2025;
        }

        // Installment Count Logic
        let installmentCount = 0;

        if (request === 1) {
            if (months >= 12 && months <= 23) installmentCount = 4;
            else if (months >= 24) installmentCount = 5;
            else installmentCount = 0;
        } else if (request === 2) {
            if (months >= 9 && months <= 11) installmentCount = 3;
            else if (months >= 12 && months <= 23) installmentCount = 4;
            else if (months >= 24) installmentCount = 5;
            else installmentCount = 0;
        } else {
            // 3rd or more
            if (months >= 6 && months <= 11) installmentCount = 3;
            else if (months >= 12 && months <= 23) installmentCount = 4;
            else if (months >= 24) installmentCount = 5;
            else installmentCount = 0;
        }

        setResult({
            installmentValue,
            installmentCount,
            averageSalary
        });
    };

    useEffect(() => {
        calculate();
    }, [salary1, salary2, salary3, monthsWorked, requestCount]);

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
        "name": "Calculadora Seguro-Desemprego 2025: Valor e Tabela",
        "url": "https://junny.com.br/calculadoras/seguro-desemprego",
        "description": "Calcule agora o valor do seu Seguro-Desemprego 2025. Teto atualizado de R$ 2.424,11, piso de R$ 1.518,00 e novas regras da tabela oficial.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Cálculo Tabela CODEFAT 2025",
            "Simulação de Parcelas",
            "Teto R$ 2.424,11",
            "Regras Atualizadas"
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
                title="Calculadora Seguro-Desemprego 2025: Valor e Tabela"
                description="Calcule agora o valor do seu Seguro-Desemprego 2025. Teto atualizado de R$ 2.424,11, piso de R$ 1.518,00 e novas regras da tabela oficial."
                canonical="/calculadoras/seguro-desemprego"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": UNEMPLOYMENT_FAQS.map(faq => ({
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
                        { label: 'Seguro Desemprego', href: '/calculadoras/seguro-desemprego' }
                    ]} />

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Atualizado CODEFAT 2025</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Seguro-Desemprego <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">2025: Simule Valor e Parcelas</span>
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
                                    Simular Benefício
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Últimos 3 Salários (Bruto)</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Mês 1</span>
                                            <input
                                                type="text"
                                                value={salary1}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setSalary1)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-14 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-right"
                                                placeholder="0,00"
                                            />
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Mês 2</span>
                                            <input
                                                type="text"
                                                value={salary2}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setSalary2)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-14 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-right"
                                                placeholder="0,00"
                                            />
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Mês 3</span>
                                            <input
                                                type="text"
                                                value={salary3}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setSalary3)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-14 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-right"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400">Se houver menos de 3 salários, preencha apenas os correspondentes.</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Meses Trabalhados (nos últimos 36)</label>
                                        <input
                                            type="number"
                                            value={monthsWorked}
                                            onChange={(e) => setMonthsWorked(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Já solicitou antes?</label>
                                        <select
                                            value={requestCount}
                                            onChange={(e) => setRequestCount(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="1">1ª Solicitação</option>
                                            <option value="2">2ª Solicitação</option>
                                            <option value="3">3ª Solicitação ou mais</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                                <DollarSign className="w-12 h-12 text-blue-500" />
                                            </div>
                                            <span className="text-sm text-blue-400 block mb-2 font-medium">Valor da Parcela</span>
                                            <span className="text-3xl md:text-4xl font-bold text-white block">
                                                {result && result.installmentCount > 0 ? `R$ ${result.installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                            {result && result.averageSalary > 0 && (
                                                <span className="text-xs text-blue-400/80 mt-2 block">
                                                    Média Salarial: R$ {result.averageSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>
                                            )}
                                        </div>
                                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-2 opacity-5">
                                                <Calendar className="w-12 h-12 text-white" />
                                            </div>
                                            <span className="text-sm text-gray-400 block mb-2 font-medium">Quantidade de Parcelas</span>
                                            <span className="text-3xl md:text-4xl font-bold text-white block">
                                                {result ? (result.installmentCount > 0 ? `${result.installmentCount}x` : 'Sem direito') : '---'}
                                            </span>
                                            {result?.installmentCount === 0 && (
                                                <span className="text-xs text-red-400 mt-2 block">
                                                    Carência não atingida
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Content (Quick Summary) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Resumo Rápido (Dados Oficiais Dezembro/2025)
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Teto Máximo da Parcela</div>
                                    <div className="text-lg font-bold text-white">R$ 2.424,11</div>
                                    <div className="text-xs text-gray-400">Para médias salariais acima de R$ 3.564,96</div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Piso Mínimo</div>
                                    <div className="text-lg font-bold text-white">R$ 1.518,00</div>
                                    <div className="text-xs text-gray-400">Valor do Salário Mínimo vigente</div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Prazo para Solicitar:</strong> Entre <strong>7 e 120 dias</strong> após a data da demissão.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Calculator className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Base de Cálculo:</strong> Média dos últimos <strong>3 salários brutos</strong> anteriores à dispensa.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Quantidade de Parcelas:</strong> De 3 a 5, dependendo do tempo de vínculo e recorrência.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto space-y-12">

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
                            O <strong>Seguro-Desemprego</strong> é um benefício temporário garantido ao trabalhador demitido sem justa causa. Em 2025, o valor que você recebe não é necessariamente igual ao seu último salário, mas sim calculado sobre a <strong>média dos últimos três meses</strong> de trabalho. O sistema utiliza uma tabela progressiva com três faixas: quem ganha menos recebe proporcionalmente mais (até 80% da média), enquanto salários mais altos sofrem um redutor maior, limitados ao teto de <strong>R$ 2.424,11</strong>. É impossível receber menos que um salário mínimo (<strong>R$ 1.518,00</strong>), mesmo que o cálculo matemático resulte em valor inferior.
                        </p>
                    </div>

                    {/* Como funciona o Seguro-Desemprego */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <Briefcase className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Como funciona o Seguro-Desemprego
                            </h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            O ciclo do benefício começa obrigatoriamente pela solicitação digital, que deve ser feita pelo trabalhador entre o 7º e o 120º dia corrido após a data da demissão. Todo o procedimento é realizado via aplicativo Carteira de Trabalho Digital ou portal Gov.br, onde o sistema puxa automaticamente os dados informados pelo empregador no eSocial. Isso elimina a necessidade de filas e papelada na maioria dos casos, tornando o acesso ao direito muito mais ágil.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Após o envio, o requerimento entra em fase de análise processada pelos sistemas da Dataprev. Nessa etapa, um cruzamento de dados massivo verifica se você cumpre os requisitos legais (como tempo de carência e ausência de outra renda). Sendo aprovado, o sistema já define a quantidade de parcelas e as datas de pagamento, que serão creditadas mensalmente na conta bancária informada ou na Poupança Social Digital (Caixa Tem).
                        </p>
                    </div>

                    {/* Tabela Oficial */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <FileText className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Tabela Oficial do Seguro-Desemprego 2025
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            A tabela abaixo está vigente desde 11 de janeiro de 2025 e aplica a correção de 4,77% (INPC) sobre as faixas do ano anterior.
                        </p>

                        <div className="overflow-x-auto rounded-xl border border-white/10 mb-6">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-white/5 text-gray-300">
                                    <tr>
                                        <th className="p-4">Faixa de Salário Médio (Últimos 3 Meses)</th>
                                        <th className="p-4">Cálculo da Parcela</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-400 divide-y divide-white/5">
                                    <tr>
                                        <td className="p-4 font-medium text-white">Até R$ 2.138,76</td>
                                        <td className="p-4">Multiplica-se o salário médio por <strong>0,8</strong> (80%)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium text-white">De R$ 2.138,77 até R$ 3.564,96</td>
                                        <td className="p-4">O que exceder R$ 2.138,76 multiplica-se por <strong>0,5</strong> e soma-se a <strong>R$ 1.711,01</strong></td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium text-white">Acima de R$ 3.564,96</td>
                                        <td className="p-4">Valor fixo e invariável de <strong>R$ 2.424,11</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border-l-4 border-blue-500">
                            <p className="text-sm text-gray-300">
                                <strong>Fonte Oficial:</strong> Dados baseados na <a href="https://www.gov.br/trabalho-e-emprego/pt-br/pdfs/sei_4274391_anexo.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Tabela Oficial do Ministério do Trabalho e Emprego</a> e resoluções do CODEFAT.
                            </p>
                        </div>
                    </div>

                    {/* Erros Comuns */}
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <AlertCircle className="w-8 h-8 text-yellow-500 shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-yellow-200 mb-2">Erros Comuns ao Calcular o Benefício</h3>
                                <p className="text-yellow-100/80">Muitos trabalhadores se surpreendem com o valor depositado por cometerem erros básicos na simulação. O principal equívoco é achar que o benefício será igual ao <strong>salário líquido</strong> que caía na conta.</p>
                            </div>
                        </div>
                        <ul className="space-y-4 text-yellow-100/70">
                            <li className="flex gap-3">
                                <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                <span><strong>Confusão Bruto x Líquido:</strong> O cálculo considera o <strong>salário bruto</strong> (antes dos descontos de INSS e IR), incluindo horas extras, adicional noturno e comissões. Verbas indenizatórias (como PLR) geralmente não entram na conta.</span>
                            </li>
                            <li className="flex gap-3">
                                <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                <span><strong>Ignorar a Média:</strong> Se você teve um aumento no último mês, ele não define o benefício sozinho. A regra exige a média aritmética dos últimos 3 contracheques anteriores à dispensa.</span>
                            </li>
                            <li className="flex gap-3">
                                <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                <span><strong>Achar que é 80% de tudo:</strong> A alíquota de 80% só se aplica para a primeira faixa salarial (até R$ 2.138,76). Para valores superiores, o cálculo muda drasticamente para evitar rombos no FAT (Fundo de Amparo ao Trabalhador).</span>
                            </li>
                        </ul>
                        <p className="mt-6 text-sm text-yellow-200/60">
                            Para entender o impacto real no seu bolso após a demissão, recomendamos também simular sua <Link to="/calculadoras/rescisao" className="underline hover:text-yellow-200">Rescisão de Contrato de Trabalho</Link> completa, que inclui saldo de salário e multas.
                        </p>
                    </div>

                    {/* Como Calcular (Passo a Passo) */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <Calculator className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Como Calcular (Passo a Passo e Exemplos Reais)
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-8">O cálculo manual exige atenção às três faixas de renda. Veja como fazer:</p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">1. Calcule sua Média Salarial</h3>
                                <p className="text-gray-400">Some os 3 últimos salários brutos anteriores à demissão e divida por 3.</p>
                                <div className="mt-2 text-sm text-gray-500 bg-white/5 p-3 rounded-lg border border-white/5 inline-block">
                                    <em>Exemplo:</em> R$ 3.000 + R$ 3.000 + R$ 3.000 = R$ 9.000 ÷ 3 = <strong>R$ 3.000,00</strong>.
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">2. Identifique a Faixa e Aplique a Fórmula</h3>
                                <p className="text-gray-400 mb-4">Com a média em mãos, verifique em qual linha da tabela oficial ela se encaixa.</p>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* Cenário A */}
                                    <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                        <h4 className="font-bold text-white mb-2 text-sm border-b border-white/10 pb-2">Cenário A: Salário Inicial</h4>
                                        <ul className="space-y-2 text-xs text-gray-300">
                                            <li><strong>Trabalhador:</strong> João, Auxiliar</li>
                                            <li><strong>Média:</strong> R$ 1.850,00</li>
                                            <li><strong>Cálculo:</strong> 1.850 x 0,80 = 1.480,00</li>
                                            <li className="text-blue-300 pt-2 border-t border-white/5"><strong>Resultado:</strong> R$ 1.518,00 (Piso Mínimo)</li>
                                        </ul>
                                    </div>

                                    {/* Cenário B */}
                                    <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                        <h4 className="font-bold text-white mb-2 text-sm border-b border-white/10 pb-2">Cenário B: Salário Médio</h4>
                                        <ul className="space-y-2 text-xs text-gray-300">
                                            <li><strong>Trabalhadora:</strong> Mariana, Analista</li>
                                            <li><strong>Média:</strong> R$ 3.000,00</li>
                                            <li><strong>Exc:</strong> 3.000 - 2.138,76 = 861,24</li>
                                            <li><strong>Red:</strong> 861,24 x 0,5 = 430,62</li>
                                            <li className="text-blue-300 pt-2 border-t border-white/5"><strong>Soma:</strong> 430,62 + 1.711,01 = <strong>R$ 2.141,63</strong></li>
                                        </ul>
                                    </div>

                                    {/* Cenário C */}
                                    <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                        <h4 className="font-bold text-white mb-2 text-sm border-b border-white/10 pb-2">Cenário C: Salário Alto</h4>
                                        <ul className="space-y-2 text-xs text-gray-300">
                                            <li><strong>Trabalhador:</strong> Carlos, Eng.</li>
                                            <li><strong>Média:</strong> R$ 8.500,00</li>
                                            <li className="text-blue-300 pt-2 border-t border-white/5"><strong>Resultado:</strong> R$ 2.424,11 (Teto Fixo)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400">
                                Se você possui valores pendentes de <Link to="/calculadoras/fgts" className="text-blue-400 hover:underline">FGTS</Link>, é importante verificar se os depósitos foram feitos corretamente, pois isso impacta a comprovação do vínculo.
                            </p>
                        </div>
                    </div>

                    {/* Quem tem direito e Parcelas */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <CheckCircle className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Quem tem direito e Quantidade de Parcelas
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Para ter acesso ao benefício em 2025, não basta ser demitido. É necessário cumprir o período de <strong>carência</strong> (meses trabalhados), <a href="http://www.planalto.gov.br/ccivil_03/leis/l7998.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">conforme a Lei nº 7.998/90</a>, que varia de acordo com o número de vezes que você já pediu o seguro.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-3">Regra de Carência</h3>
                                <ul className="space-y-3 text-sm text-gray-300">
                                    <li className="flex gap-2">
                                        <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                        <span><strong>1ª Solicitação:</strong> Pelo menos <strong>12 meses</strong> trabalhados nos últimos 18 meses.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                        <span><strong>2ª Solicitação:</strong> Pelo menos <strong>9 meses</strong> trabalhados nos últimos 12 meses.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                        <span><strong>3ª+ Solicitação:</strong> Pelo menos <strong>6 meses</strong> trabalhados anteriores à dispensa.</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-3">Quantas parcelas?</h3>
                                <p className="text-xs text-gray-400 mb-2">A quantidade (3, 4 ou 5) depende do histórico do vínculo.</p>
                                <div className="space-y-2 text-sm text-gray-300">
                                    <div className="p-2 bg-white/5 rounded border border-white/5">
                                        <span className="font-bold text-blue-400">1ª Vez:</span> 12-23 meses = 4 parc | 24+ meses = 5 parc.
                                    </div>
                                    <div className="p-2 bg-white/5 rounded border border-white/5">
                                        <span className="font-bold text-blue-400">2ª Vez:</span> 9-11 meses = 3 parc | 12-23 = 4 parc | 24+ = 5.
                                    </div>
                                    <div className="p-2 bg-white/5 rounded border border-white/5">
                                        <span className="font-bold text-blue-400">3ª+ Vez:</span> 6-11 meses = 3 parc | 12-23 = 4 parc | 24+ = 5.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Casos Especiais */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <HelpCircle className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Casos Especiais e Situações Específicas
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                <h3 className="font-bold text-white mb-2">Empregado Doméstico</h3>
                                <p className="text-sm text-gray-300">
                                    O cálculo é diferente. O valor é fixo em <strong>1 Salário Mínimo (R$ 1.518,00)</strong>, independentemente da remuneração anterior. O limite máximo é de 3 parcelas e exige carência de 15 meses trabalhados nos últimos 24 meses.
                                </p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                <h3 className="font-bold text-white mb-2">MEI e Renda Extra</h3>
                                <p className="text-sm text-gray-300">
                                    Se você possui um CNPJ ativo (MEI), o sistema da Dataprev pode bloquear o benefício. Para reverter, é necessário comprovar que a empresa está inativa ou sem faturamento através de recurso administrativo.
                                </p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                <h3 className="font-bold text-white mb-2">Aposentados</h3>
                                <p className="text-sm text-gray-300">
                                    Trabalhadores aposentados que continuam trabalhando <strong>não têm direito</strong> ao Seguro-Desemprego, pois a lei veta o acúmulo. O foco deve ser o planejamento com o <Link to="/calculadoras/salario-liquido" className="text-blue-400 hover:underline">Salário Líquido</Link> da aposentadoria e a multa de 40%.
                                </p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                <h3 className="font-bold text-white mb-2">Acordo de Demissão</h3>
                                <p className="text-sm text-gray-300">
                                    Na demissão consensual (acordo), onde o trabalhador saca 80% do FGTS, <strong>não há direito ao Seguro-Desemprego</strong>. Esse modelo de desligamento exclui o benefício por lei.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={UNEMPLOYMENT_FAQS}
                    title="Perguntas Frequentes sobre Seguro-Desemprego 2025"
                    className="py-12 mt-16"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
