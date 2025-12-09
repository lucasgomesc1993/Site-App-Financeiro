import React, { useState, useEffect } from 'react';
import { Gift, Calculator, HelpCircle, Calendar, ArrowRight, AlertCircle, TrendingUp, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

// Constants for 2025
const SALARIO_MINIMO_2025 = 1518.00;
const TETO_INSS_2025 = 8157.41;
const DEPENDENT_DEDUCTION = 189.59;

const THIRTEENTH_FAQS: FAQItem[] = [
    {
        question: "Qual a data limite para pagamento do décimo terceiro em 2025?",
        answer: "Em 2025, os prazos legais caem no fim de semana e devem ser antecipados. A **1ª parcela** deve ser paga até **28 de novembro** (sexta-feira) e a **2ª parcela** até **19 de dezembro** (sexta-feira). O pagamento em parcela única também deve respeitar a data de 28 de novembro para evitar multas."
    },
    {
        question: "Qual o valor máximo (teto) que posso receber de 13º em 2025?",
        answer: `Não existe um valor máximo para o recebimento do benefício, pois ele acompanha o seu salário. No entanto, existe um teto para o desconto do INSS. Se o seu salário for superior a **R$ ${TETO_INSS_2025.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}**, o desconto previdenciário será travado no valor fixo máximo (aprox. **R$ 951,63**), mas o Imposto de Renda continuará incidindo progressivamente (27,5%) sobre o excedente.`
    },
    {
        question: "O desconto do INSS é sobre o salário total ou só a segunda parcela?",
        answer: "O desconto do INSS incide sobre o **valor total** do décimo terceiro salário. Porém, como a primeira parcela é paga sem descontos, o valor integral do imposto é descontado de uma só vez no pagamento da segunda parcela, o que faz com que ela seja visivelmente menor que a primeira."
    },
    {
        question: "É possível receber o décimo terceiro integral em novembro?",
        answer: "A lei prevê o pagamento em duas parcelas (adiantamento e quitação). No entanto, muitas empresas optam por pagar o valor integral (parcela única) até o dia **30 de novembro** (antecipado para dia 28 em 2025). O pagamento integral em dezembro é ilegal e passível de multa administrativa."
    },
    {
        question: "Estagiário tem direito a décimo terceiro?",
        answer: "Não. Pela Lei do Estágio (Lei 11.788/2008), estagiários não têm vínculo empregatício e, portanto, não recebem 13º salário nem têm desconto de INSS. Eles têm direito apenas a recesso remunerado e bolsa-auxílio. Para comparar regimes de contratação, consulte nossa ferramenta <a href='/calculadoras/clt-vs-pj' class='text-blue-400 hover:text-blue-300 underline decoration-blue-400/30'>CLT vs PJ</a>."
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
        // Step 1: Calculate INSS on the FULL amount (2025 Tables - Official)
        let inss = 0;

        if (fullThirteenth <= 1518.00) {
            inss = fullThirteenth * 0.075;
        } else if (fullThirteenth <= 2793.88) {
            inss = (fullThirteenth * 0.09) - 22.77;
        } else if (fullThirteenth <= 4190.83) {
            inss = (fullThirteenth * 0.12) - 106.59;
        } else if (fullThirteenth <= 8157.41) {
            inss = (fullThirteenth * 0.14) - 190.40;
        } else {
            // Teto (Max value ~951.63)
            inss = (8157.41 * 0.14) - 190.40;
        }
        if (inss < 0) inss = 0; // Safety check

        // Step 2: Calculate IRRF (2025 Values - Vigência Maio/2025)
        const irrfBase = fullThirteenth - inss - (deps * DEPENDENT_DEDUCTION);

        let irrf = 0;

        if (irrfBase <= 2428.80) {
            irrf = 0;
        } else if (irrfBase <= 2826.65) {
            irrf = (irrfBase * 0.075) - 182.16;
        } else if (irrfBase <= 3751.05) {
            irrf = (irrfBase * 0.15) - 394.16;
        } else if (irrfBase <= 4664.68) {
            irrf = (irrfBase * 0.225) - 675.49;
        } else {
            irrf = (irrfBase * 0.275) - 908.73;
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
        "description": "Calcule o 13º salário exato com as tabelas INSS e IRRF 2025. Veja exemplos reais de cálculo (R$ 3k e R$ 7,5k), descontos e o calendário antecipado.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Cálculo de 1ª e 2ª parcela",
            "Desconto INSS e IRRF automático 2025",
            "Cálculo proporcional",
            "Calendário antecipado 2025"
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
                description="Calcule o 13º salário exato com as tabelas INSS e IRRF 2025. Veja exemplos reais de cálculo (R$ 3k e R$ 7,5k), descontos e o calendário antecipado."
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

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Gift className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Décimo Terceiro <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500">Salário 2025</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Esta ferramenta calcula o valor real da sua gratificação natalina considerando o novo salário mínimo de <strong>R$ {SALARIO_MINIMO_2025.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> e as tabelas progressivas do INSS e IRRF vigentes em dezembro de 2025.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator */}
                    <div className="lg:col-span-7">
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
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-mono"
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
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-center"
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
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-center"
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
                                            <span className="text-sm text-blue-400 block mb-1">2ª Parcela (Quitação)</span>
                                            <span className="text-2xl font-bold text-white">
                                                {resultSecond !== null ? `R$ ${resultSecond.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                            <span className="text-xs text-blue-400/60 block mt-1">Paga até 19/Dez</span>
                                        </div>
                                    </div>

                                    {discounts && (
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-4 space-y-2 text-sm">
                                            <div className="flex justify-between text-gray-400">
                                                <span>(-) INSS Estimado (Teto R$ 951,63)</span>
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
                    <div className="lg:col-span-5 space-y-6">
                        {/* Resumo Rápido */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <Info className="w-5 h-5 text-blue-500" />
                                Resumo em 30 segundos
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex gap-2 items-start">
                                    <div className="bg-blue-500/20 p-1 rounded mt-0.5 shrink-0">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <span><strong>Salário Mínimo Base:</strong> R$ {SALARIO_MINIMO_2025.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <div className="bg-blue-500/20 p-1 rounded mt-0.5 shrink-0">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <span><strong>1ª Parcela:</strong> Vencimento antecipado para <strong>28 de novembro de 2025</strong> (sexta-feira).</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <div className="bg-blue-500/20 p-1 rounded mt-0.5 shrink-0">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <span><strong>2ª Parcela:</strong> Vencimento antecipado para <strong>19 de dezembro de 2025</strong> (sexta-feira).</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <div className="bg-blue-500/20 p-1 rounded mt-0.5 shrink-0">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <span><strong>Teto do INSS:</strong> Base limitada a R$ {TETO_INSS_2025.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white">Exemplos Práticos</h3>
                            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                                <div className="p-3 bg-white/5 rounded-xl">
                                    <strong className="text-white block mb-1">Caso 1: Salário R$ 3.000,00</strong>
                                    <ul className="list-disc pl-4 space-y-1 text-xs">
                                        <li>1ª Parcela: R$ 1.500,00</li>
                                        <li>Desc. INSS: R$ 253,41</li>
                                        <li>Desc. IRRF: R$ 23,83</li>
                                        <li><strong>2ª Parcela: R$ 1.222,76</strong></li>
                                    </ul>
                                </div>
                                <div className="p-3 bg-white/5 rounded-xl">
                                    <strong className="text-white block mb-1">Caso 2: Salário R$ 7.500,00</strong>
                                    <ul className="list-disc pl-4 space-y-1 text-xs">
                                        <li>1ª Parcela: R$ 3.750,00</li>
                                        <li>Desc. INSS: R$ 859,60</li>
                                        <li>Desc. IRRF: R$ 917,38</li>
                                        <li><strong>2ª Parcela: R$ 1.973,02</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    <div className="lg:col-span-8 space-y-12">
                        {/* Como Calcular */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Como Calcular o Décimo Terceiro</h2>
                            <div className="text-gray-400 space-y-4 leading-relaxed text-lg">
                                <p>
                                    O cálculo do 13º salário não é uma simples divisão do salário atual. Ele envolve duas etapas distintas, datas de corte específicas e deduções fiscais que só ocorrem no final do ano. Para encontrar o desconto correto do INSS sem precisar calcular faixa por faixa, utiliza-se a lógica da "Parcela a Deduzir".
                                </p>
                                <div className="bg-white/5 p-4 rounded-xl border-l-4 border-blue-500">
                                    <h4 className="text-white font-bold mb-2">Fórmula Básica</h4>
                                    <p className="font-mono text-sm text-blue-300">
                                        (Salário x Alíquota) - Parcela a Deduzir = Valor INSS
                                    </p>
                                    <p className="font-mono text-sm text-blue-300 mt-2">
                                        (Valor Total Bruto - Desconto INSS - Desconto IRRF) - Valor da 1ª Parcela = 2ª Parcela Líquida
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tabelas INSS e IRRF */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Tabelas de Referência 2025</h2>

                            <div className="space-y-8">
                                {/* Tabela INSS */}
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Contribuição Previdenciária (INSS) 2025</h3>
                                    <div className="overflow-hidden rounded-2xl border border-white/10">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-white/5 border-b border-white/10">
                                                    <th className="p-4 text-white font-semibold">Faixa Salarial (R$)</th>
                                                    <th className="p-4 text-white font-semibold">Alíquota</th>
                                                    <th className="p-4 text-white font-semibold">Parcela a Deduzir</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-400 text-sm">
                                                <tr className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="p-4">Até 1.518,00</td>
                                                    <td className="p-4">7,5%</td>
                                                    <td className="p-4">-</td>
                                                </tr>
                                                <tr className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="p-4">De 1.518,01 até 2.793,88</td>
                                                    <td className="p-4">9,0%</td>
                                                    <td className="p-4">R$ 22,77</td>
                                                </tr>
                                                <tr className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="p-4">De 2.793,89 até 4.190,83</td>
                                                    <td className="p-4">12,0%</td>
                                                    <td className="p-4">R$ 106,59</td>
                                                </tr>
                                                <tr className="hover:bg-white/5">
                                                    <td className="p-4">De 4.190,84 até {TETO_INSS_2025.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                                    <td className="p-4">14,0%</td>
                                                    <td className="p-4">R$ 190,40</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Tabela IRRF */}
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Imposto de Renda (IRRF) - Vigência Maio/2025</h3>
                                    <div className="overflow-hidden rounded-2xl border border-white/10">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-white/5 border-b border-white/10">
                                                    <th className="p-4 text-white font-semibold">Base de Cálculo (R$)</th>
                                                    <th className="p-4 text-white font-semibold">Alíquota</th>
                                                    <th className="p-4 text-white font-semibold">Parcela a Deduzir</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-400 text-sm">
                                                <tr className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="p-4">Até 2.428,80</td>
                                                    <td className="p-4">Isento</td>
                                                    <td className="p-4">0,00</td>
                                                </tr>
                                                <tr className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="p-4">De 2.428,81 até 2.826,65</td>
                                                    <td className="p-4">7,5%</td>
                                                    <td className="p-4">R$ 182,16</td>
                                                </tr>
                                                <tr className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="p-4">De 2.826,66 até 3.751,05</td>
                                                    <td className="p-4">15,0%</td>
                                                    <td className="p-4">R$ 394,16</td>
                                                </tr>
                                                <tr className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="p-4">De 3.751,06 até 4.664,68</td>
                                                    <td className="p-4">22,5%</td>
                                                    <td className="p-4">R$ 675,49</td>
                                                </tr>
                                                <tr className="hover:bg-white/5">
                                                    <td className="p-4">Acima de 4.664,68</td>
                                                    <td className="p-4">27,5%</td>
                                                    <td className="p-4">R$ 908,73</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Erros Comuns e Regra 15 Dias */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Erros Comuns e a Regra dos 15 Dias</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                                        Erro da Multiplicação
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Um equívoco frequente é aplicar a porcentagem da alíquota diretamente sobre o salário total (ex: R$ 3.000 × 12% = R$ 360,00). Isso está errado! O método correto exige subtrair a "Parcela a Deduzir", reduzindo o desconto real.
                                    </p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-blue-500" />
                                        Regra dos 15 Dias
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Para ter direito a 1/12 do benefício, você precisa ter trabalhado <strong>pelo menos 15 dias</strong> naquele mês.
                                        <span className="block mt-2 text-xs text-gray-500">
                                            Ex: Admitidos dia 17 de janeiro perdem o avo de janeiro.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Médias e Casos Especiais */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Casos Especiais e Médias</h2>
                            <div className="space-y-6 text-gray-400">
                                <p>
                                    <strong>Médias de Horas Extras e Comissões:</strong> Uma atualização importante define que o reflexo das <Link to="/calculadoras/horas-extras" className="text-blue-400 hover:text-blue-300 underline">horas extras</Link> no Descanso Semanal Remunerado (DSR) também deve compor a base de cálculo.
                                </p>
                                <p>
                                    <strong>O "Ajuste de Janeiro":</strong> Se você recebe comissões, é impossível calcular o valor exato em dezembro. As empresas pagam uma prévia e, em janeiro, fazem o ajuste final (pagando a diferença ou descontando).
                                </p>
                                <p>
                                    <strong>Aposentados e Pensionistas:</strong> O INSS costuma antecipar o pagamento. Aposentados acima de 65 anos têm uma parcela extra de isenção no IRRF.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar content */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Veja Também</h3>
                            <div className="space-y-4">
                                <Link to="/calculadoras/salario-liquido" className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <h4 className="text-blue-400 font-medium text-sm mb-1">Calculadora Salário Líquido</h4>
                                    <p className="text-xs text-gray-400">
                                        Simule seu salário mensal com os descontos de 2025.
                                    </p>
                                </Link>
                                <Link to="/calculadoras/rescisao" className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <h4 className="text-blue-400 font-medium text-sm mb-1">Calcular Rescisão</h4>
                                    <p className="text-xs text-gray-400">
                                        Veja quanto recebe ao sair da empresa.
                                    </p>
                                </Link>
                                <Link to="/calculadoras/ferias" className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <h4 className="text-blue-400 font-medium text-sm mb-1">Calculadora de Férias</h4>
                                    <p className="text-xs text-gray-400">
                                        Planeje o valor das suas férias com 1/3.
                                    </p>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="bg-yellow-500/10 p-2 rounded-lg shrink-0">
                                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                                </div>
                                <h4 className="text-white font-bold text-sm">Atenção aos Prazos</h4>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                O não pagamento da 1ª parcela até <strong>28 de Novembro</strong> ou da 2ª até <strong>19 de Dezembro</strong> pode gerar multas para a empresa.
                            </p>
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
