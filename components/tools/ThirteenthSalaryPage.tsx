import React, { useState, useEffect } from 'react';
import { Gift, Calculator, HelpCircle, Calendar, ArrowRight, AlertCircle, TrendingUp, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const THIRTEENTH_FAQS: FAQItem[] = [
    {
        question: "Como calcular o décimo terceiro proporcional?",
        answer: "Para chegar ao valor exato, divida seu salário bruto atual por 12. Em seguida, multiplique o resultado pela quantidade de meses do ano em que você trabalhou 15 dias ou mais. Importante: médias de horas extras, comissões e <a href='https://janus.junny.com.br/calculadoras/adicional-noturno' class='text-blue-400 hover:text-blue-300 underline decoration-blue-400/30'>adicional noturno</a> variáveis também somam na base de cálculo, aumentando o valor final."
    },
    {
        question: "O INSS é descontado na primeira parcela?",
        answer: "Não. A legislação (Lei 4.749/65) define que a primeira parcela é apenas um adiantamento de 50% do salário, livre de descontos. A mordida do Leão é acumulada: o INSS e o IRRF são calculados sobre o valor total e descontados de uma só vez na segunda parcela."
    },
    {
        question: "O que acontece se a empresa atrasar o pagamento?",
        answer: "O atraso gera multa administrativa por empregado prejudicado, fiscalizada pelo Ministério do Trabalho. O funcionário deve receber o valor com correção monetária. Para empresas, evitar esse passivo é crucial, pois impacta diretamente no planejamento do <a href='https://janus.junny.com.br/calculadoras/custo-funcionario' class='text-blue-400 hover:text-blue-300 underline decoration-blue-400/30'>custo do funcionário</a> e pode gerar processos trabalhistas."
    },
    {
        question: "Quem está de licença-maternidade ou afastado pelo INSS recebe?",
        answer: "Sim. Na licença-maternidade, a empresa paga integralmente e abate na guia do INSS. No auxílio-doença (afastamento por saúde), a empresa paga proporcional aos meses trabalhados (similar a um <a href='https://janus.junny.com.br/calculadoras/rescisao' class='text-blue-400 hover:text-blue-300 underline decoration-blue-400/30'>cálculo de rescisão</a> parcial) e o INSS paga o restante como \"Abono Anual\", direto ao beneficiário."
    },
    {
        question: "Estagiário tem direito a décimo terceiro?",
        answer: "Não. A Lei do Estágio (11.788/08) define a remuneração como bolsa-auxílio, isentando o empregador de verbas trabalhistas como FGTS e 13º salário. O pagamento é facultativo e depende da política de benefícios da empresa ou do contrato de estágio assinado."
    },
    {
        question: "Posso pedir adiantamento do 13º nas férias?",
        answer: "Sim, é um direito garantido. O trabalhador pode receber a primeira parcela junto com as <a href='https://janus.junny.com.br/calculadoras/ferias' class='text-blue-400 hover:text-blue-300 underline decoration-blue-400/30'>férias</a>, mas há um prazo rígido: o pedido deve ser feito por escrito à empresa entre **1º e 31 de janeiro**. Após essa data, a concessão torna-se opcional para o empregador."
    }
];

export function ThirteenthSalaryPage() {
    const [salary, setSalary] = useState('');
    const [monthsWorked, setMonthsWorked] = useState('12');
    const [dependents, setDependents] = useState('0');

    // Results
    const [resultFirst, setResultFirst] = useState<number | null>(null);
    const [resultSecond, setResultSecond] = useState<number | null>(null);
    const [resultTotal, setResultTotal] = useState<number | null>(null);
    const [discounts, setDiscounts] = useState<{ inss: number; irrf: number } | null>(null);

    const calculate = () => {
        const sal = parseFloat(salary.replace(/\./g, '').replace(',', '.'));
        const months = parseInt(monthsWorked);
        const deps = parseInt(dependents);

        if (isNaN(sal) || isNaN(months) || months < 1 || months > 12) {
            setResultFirst(null);
            setResultSecond(null);
            setResultTotal(null);
            setDiscounts(null);
            return;
        }

        // Full 13th salary calculation (proportional)
        const fullThirteenth = (sal / 12) * months;

        // 1st Installment: 50% of the proportional value, NO discounts
        const first = fullThirteenth / 2;

        // 2nd Installment Calculation
        // Step 1: Calculate INSS on the FULL amount
        let inss = 0;
        // Tabela INSS 2024 (Progressiva)
        if (fullThirteenth <= 1412.00) {
            inss = fullThirteenth * 0.075;
        } else if (fullThirteenth <= 2666.68) {
            inss = (1412.00 * 0.075) + ((fullThirteenth - 1412.00) * 0.09);
        } else if (fullThirteenth <= 4000.03) {
            inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((fullThirteenth - 2666.68) * 0.12);
        } else if (fullThirteenth <= 7786.02) {
            inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((fullThirteenth - 4000.03) * 0.14);
        } else {
            // Teto
            inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((7786.02 - 4000.03) * 0.14);
        }

        // Step 2: Calculate IRRF
        const deductionPerDependent = 189.59;
        const irrfBase = fullThirteenth - inss - (deps * deductionPerDependent);

        let irrf = 0;
        // Tabela IRRF 2024/2025 (Simplificada) - usando padrão oficial
        if (irrfBase <= 2259.20) {
            irrf = 0;
        } else if (irrfBase <= 2826.65) {
            irrf = (irrfBase * 0.075) - 169.44;
        } else if (irrfBase <= 3751.05) {
            irrf = (irrfBase * 0.15) - 381.44;
        } else if (irrfBase <= 4664.68) {
            irrf = (irrfBase * 0.225) - 662.77;
        } else {
            irrf = (irrfBase * 0.275) - 896.00;
        }
        if (irrf < 0) irrf = 0;

        const totalDiscount = inss + irrf;

        // 2nd Installment = Full Amount - First Installment (Advance) - Discounts
        const second = fullThirteenth - first - totalDiscount;

        setResultFirst(first);
        setResultSecond(second);
        setResultTotal(second + first); // Net received over the year for 13th
        setDiscounts({ inss, irrf });
    };

    useEffect(() => {
        calculate();
    }, [salary, monthsWorked, dependents]);

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
        "name": "Calculadora de Décimo Terceiro 2025: Valor Líquido e Prazos",
        "url": "https://junny.com.br/calculadoras/decimo-terceiro",
        "description": "Calcule seu Décimo Terceiro Salário 2025. Veja o valor líquido, descontos de INSS/IRRF, exemplo prático e o calendário oficial de pagamentos.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Cálculo de 1ª e 2ª parcela",
            "Desconto INSS e IRRF automático",
            "Cálculo proporcional",
            "Calendário 2025"
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
                title="Calculadora de Décimo Terceiro 2025: Valor Líquido e Prazos"
                description="Calcule seu Décimo Terceiro Salário 2025. Veja o valor líquido, descontos de INSS/IRRF, exemplo prático e o calendário oficial de pagamentos."
                canonical="/calculadoras/decimo-terceiro"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": THIRTEENTH_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Décimo Terceiro', href: '/calculadoras/decimo-terceiro' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Gift className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Décimo Terceiro <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500">Salário 2025</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Receber o abono de fim de ano é essencial para o orçamento familiar, mas o cálculo do valor real envolve descontos que reduzem drasticamente a segunda parcela. Entenda a matemática por trás da <strong>Gratificação Natalina</strong>.
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
                                    Calcular Agora
                                </h2>
                            </div>

                            <div className="space-y-6">
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

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Meses Trabalhados</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            value={monthsWorked}
                                            onChange={(e) => setMonthsWorked(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="12"
                                            min="1"
                                            max="12"
                                        />
                                        <p className="text-xs text-gray-500">
                                            Regra: 15 dias ou mais contam como 1 mês.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Dependentes</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            value={dependents}
                                            onChange={(e) => setDependents(e.target.value)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 text-center">
                                            <span className="text-sm text-blue-400 block mb-1">1ª Parcela (Adiantamento)</span>
                                            <span className="text-2xl font-bold text-white">
                                                {resultFirst !== null ? `R$ ${resultFirst.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                            <span className="text-xs text-blue-400/60 block mt-1">Paga até 28/Nov</span>
                                        </div>
                                        <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 text-center">
                                            <span className="text-sm text-blue-400 block mb-1">2ª Parcela (Saldo)</span>
                                            <span className="text-2xl font-bold text-white">
                                                {resultSecond !== null ? `R$ ${resultSecond.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                            <span className="text-xs text-blue-400/60 block mt-1">Paga até 19/Dez</span>
                                        </div>
                                    </div>

                                    {discounts && (
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-4 space-y-2 text-sm">
                                            <div className="flex justify-between text-gray-400">
                                                <span>(-) INSS Estimado</span>
                                                <span className="text-red-400">R$ {discounts.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-400">
                                                <span>(-) IRRF Estimado</span>
                                                <span className="text-red-400">R$ {discounts.irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="h-px bg-white/10 my-2"></div>
                                            <div className="flex justify-between text-white font-medium">
                                                <span>Líquido Total no Ano</span>
                                                <span>R$ {resultTotal?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Example & Info */}
                    <div className="lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <Info className="w-5 h-5 text-blue-500" />
                                Como calcular: Exemplo Prático
                            </h3>
                            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                                <p>Imagine um profissional que recebe <strong>R$ 3.000,00</strong>.</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-2 items-start">
                                        <div className="bg-blue-500/20 p-1 rounded mt-0.5 shrink-0">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <strong className="text-white">1ª Parcela:</strong> R$ 1.500,00 (50% do bruto, sem descontos).
                                        </div>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <div className="bg-blue-500/20 p-1 rounded mt-0.5 shrink-0">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <strong className="text-white">2ª Parcela:</strong>
                                            <div className="mt-1 pl-2 border-l-2 border-white/10 space-y-1 text-xs">
                                                <p>INSS e IRRF calculados sobre o total (R$ 3.000).</p>
                                                <p>Subtrai-se o adiantamento (R$ 1.500).</p>
                                                <p className="text-white italic">Resultado: R$ 3.000 - R$ 1.500 - Impostos = R$ 1.192,00 (aprox).</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="bg-yellow-500/10 p-2 rounded-lg shrink-0">
                                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Regra de Ouro</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                        Para a lei trabalhista, ter trabalhado <strong>15 dias ou mais</strong> dentro do mesmo mês garante o direito de contá-lo como um <strong>mês integral</strong> para o cálculo do benefício.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl text-center border border-white/10">
                                <span className="text-xs text-gray-500 block mb-1">Fórmula Básica</span>
                                <span className="text-sm font-mono text-blue-400">(Salário Bruto ÷ 12) x Meses Trabalhados</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    <div className="lg:col-span-8 space-y-12">
                        {/* What is it */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">O que é o Décimo Terceiro Salário?</h2>
                            <div className="text-gray-400 space-y-4 leading-relaxed text-lg">
                                <p>
                                    O Décimo Terceiro Salário, tecnicamente chamado de <strong>Gratificação Natalina</strong>, é um benefício trabalhista obrigatório pago a trabalhadores com carteira assinada (CLT), aposentados e pensionistas.
                                </p>
                                <p>
                                    Ele corresponde a 1/12 da remuneração devida em dezembro, por mês de serviço, do ano correspondente. Na prática, funciona como um salário extra para auxiliar nas despesas típicas do período festivo.
                                </p>
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <Calendar className="w-8 h-8 text-blue-500" />
                                Calendário de Pagamento 2025
                            </h2>
                            <p className="text-gray-400 mb-6">Em 2025, as datas limites legais caem em finais de semana, obrigando as empresas a anteciparem os pagamentos.</p>

                            <div className="overflow-hidden rounded-2xl border border-white/10">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5 border-b border-white/10">
                                            <th className="p-4 text-white font-semibold">Parcela</th>
                                            <th className="p-4 text-white font-semibold hidden md:table-cell">Data Limite Legal</th>
                                            <th className="p-4 text-white font-semibold">Data de Pagamento (2025)</th>
                                            <th className="p-4 text-white font-semibold hidden md:table-cell">O que você recebe</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400 text-sm md:text-base">
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-medium text-white">1ª Parcela</td>
                                            <td className="p-4 hidden md:table-cell">30 de Novembro</td>
                                            <td className="p-4 text-blue-400 font-bold">28 de Novembro (Sexta)</td>
                                            <td className="p-4 hidden md:table-cell">Metade do salário sem descontos.</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-medium text-white">2ª Parcela</td>
                                            <td className="p-4 hidden md:table-cell">20 de Dezembro</td>
                                            <td className="p-4 text-blue-400 font-bold">19 de Dezembro (Sexta)</td>
                                            <td className="p-4 hidden md:table-cell">Saldo restante com impostos.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Taxes Table */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Tabela de Descontos e Alíquotas</h2>
                            <p className="text-gray-400 mb-6">
                                A redução no valor da segunda parcela ocorre devido à incidência da <Link to="/calculadoras/inss" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30">tabela do INSS</Link> e do Imposto de Renda Retido na Fonte (IRRF). A tributação segue a tabela progressiva oficial:
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                    <h3 className="text-lg font-bold text-white mb-4">INSS (Progressivo)</h3>
                                    <ul className="space-y-3 text-sm text-gray-400">
                                        <li className="flex justify-between border-b border-white/5 pb-2">
                                            <span>Até um salário mínimo</span>
                                            <span className="text-white font-mono">7,5%</span>
                                        </li>
                                        <li className="flex justify-between border-b border-white/5 pb-2">
                                            <span>Faixa acima do mínimo</span>
                                            <span className="text-white font-mono">9%</span>
                                        </li>
                                        <li className="flex justify-between border-b border-white/5 pb-2">
                                            <span>Salários intermediários</span>
                                            <span className="text-white font-mono">12%</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Até o teto</span>
                                            <span className="text-white font-mono">14%</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20 flex flex-col justify-center items-center text-center">
                                    <TrendingUp className="w-8 h-8 text-blue-500 mb-4" />
                                    <p className="text-sm text-gray-300 mb-4">
                                        Para obter o valor exato que sobrará no seu bolso, recomendamos usar nossa calculadora de salário líquido, pois ela aplica automaticamente essas faixas.
                                    </p>
                                    <Link to="/calculadoras/salario-liquido" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
                                        Ir para Calculadora Líquida
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar content */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                            <h3 className="text-lg font-bold text-white mb-4">Variáveis que alteram o valor final</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                                    <h4 className="text-blue-400 font-medium text-sm mb-1">Médias Salariais</h4>
                                    <p className="text-xs text-gray-400">
                                        Se você realiza <Link to="/calculadoras/horas-extras" className="text-blue-300 underline">horas extras</Link> ou recebe comissões, a média integra a base de cálculo.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                                    <h4 className="text-blue-400 font-medium text-sm mb-1">Adicionais</h4>
                                    <p className="text-xs text-gray-400">
                                        Insalubridade ou Periculosidade também compõem a base.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                                    <h4 className="text-red-400 font-medium text-sm mb-1">Faltas Injustificadas</h4>
                                    <p className="text-xs text-gray-400">
                                        Mais de 15 faltas sem justificativa no mês zeram o direito à fração de 1/12 daquele mês.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={THIRTEENTH_FAQS}
                    title="Perguntas Frequentes (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}

