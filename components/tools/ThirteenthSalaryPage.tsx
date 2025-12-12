import React, { useState, useEffect } from 'react';
import { Gift, Calculator, HelpCircle, Calendar, AlertCircle, Info, CheckCircle, Clock, Percent, DollarSign, FileText } from 'lucide-react';
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
const INSS_CEILING_DISCOUNT = 951.63;

const THIRTEENTH_FAQS: FAQItem[] = [
    {
        question: "Qual o prazo máximo para o pagamento da segunda parcela em 2025?",
        answer: "O prazo legal é dia 20 de dezembro. Porém, em 2025, o dia 20 cai em um sábado. Portanto, o pagamento deve ser antecipado obrigatoriamente para o dia **19 de dezembro de 2025** (sexta-feira)."
    },
    {
        question: "Qual o valor máximo do desconto de INSS no 13º em 2025?",
        answer: "Para quem recebe acima do teto previdenciário (R$ 8.157,41), o desconto máximo de INSS será de aproximadamente **R$ 951,63**. Esse valor é a soma das contribuições máximas de cada faixa progressiva e serve de dedução para a base do Imposto de Renda."
    },
    {
        question: "O INSS e o Imposto de Renda são descontados na primeira parcela?",
        answer: "Não. A primeira parcela (paga até 30/11) corresponde a 50% do salário bruto, sem descontos. Todos os encargos (INSS e IRRF) são descontados integralmente na segunda parcela, sobre o valor total do benefício."
    },
    {
        question: "Quem recebe auxílio-doença tem direito ao décimo terceiro?",
        answer: "A empresa paga apenas os avos proporcionais aos meses trabalhados (incluindo os primeiros 15 dias de afastamento). O restante do período é pago pelo INSS sob a forma de \"Abono Anual\"."
    },
    {
        question: "Como funciona o 13º salário para quem ganha comissão?",
        answer: "Calcula-se a média das comissões recebidas de janeiro a novembro para o pagamento em dezembro. Em janeiro do ano seguinte (até dia 10), a empresa deve recalcular incluindo as comissões de dezembro e pagar a diferença (ajuste)."
    },
    {
        question: "É possível receber a primeira parcela nas férias?",
        answer: "Sim, desde que o trabalhador tenha solicitado isso formalmente à empresa durante o mês de janeiro do ano corrente. Caso contrário, fica a critério do empregador antecipar ou pagar no prazo legal de novembro."
    },
    {
        question: "O desconto do INSS sobre o 13º é o mesmo do salário mensal?",
        answer: "A tabela de alíquotas é a mesma, mas o cálculo é feito em separado. O valor do 13º não se soma ao salário de dezembro para apuração do imposto; ele possui tributação exclusiva e definitiva."
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

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return (Number(number) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    const handleCurrencyInput = (value: string, setter: (value: string) => void) => {
        setter(formatCurrency(value));
    };

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
            inss = INSS_CEILING_DISCOUNT;
        }
        if (inss < 0) inss = 0;

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

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Décimo Terceiro 2025: Valor Líquido e Prazos",
        "url": "https://junny.com.br/calculadoras/decimo-terceiro",
        "description": "Calcule seu 13º Salário 2025 exato. Confira descontos de INSS/IRRF (teto R$ 8.157,41), prazos oficiais e regra de médias para pagamento líquido.",
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
                description="Calcule seu 13º Salário 2025 exato. Confira descontos de INSS/IRRF (teto R$ 8.157,41), prazos oficiais e regra de médias para pagamento líquido."
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

                    {/* Quick Summary (Right Column) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Resumo Rápido (Dados Oficiais Dezembro/2025)
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Salário Mínimo Base</div>
                                    <div className="text-lg font-bold text-white">R$ 1.518,00</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Teto do INSS</div>
                                    <div className="text-lg font-bold text-white">R$ 8.157,41</div>
                                </div>
                                <div className="space-y-3 pt-2">
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <DollarSign className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Desconto Máximo INSS:</strong> R$ 951,63.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Prazo da 2ª Parcela:</strong> Até 19 de dezembro de 2025 (Antecipado).</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Percent className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Modelo de Tributação:</strong> Progressiva (descontos incidem sobre o valor total na 2ª parcela).</span>
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
                    <p className="text-lg text-gray-300 leading-relaxed">
                        O **Décimo Terceiro Salário** é um direito fundamental que funciona como uma gratificação natalina proporcional aos meses trabalhados. Em 2025, o cálculo final exige atenção redobrada devido às novas faixas de tributação progressiva: o valor que cai na conta em dezembro (2ª parcela) sofre todos os descontos acumulados de INSS e Imposto de Renda. Use esta ferramenta para prever quanto sobrará no seu bolso após o "leão" e garantir o pagamento de dívidas ou as compras de fim de ano com segurança.
                    </p>
                </div>

                {/* Tabela Oficial Sections */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Info className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Tabela Oficial de Descontos 2025
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Para chegar ao valor líquido final, o cálculo utiliza a Tabela Progressiva do INSS (atualizada para o teto de R$ 8.157,41) e a Tabela do Imposto de Renda vigente desde maio de 2025.
                    </p>

                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-2">Como funciona a Progressividade</h3>
                        <p className="text-sm text-gray-400">
                            Diferente do modelo antigo, a alíquota não incide sobre o salário total de uma só vez. O cálculo é feito por "fatias": você paga 7,5% sobre a primeira parte do salário (até o mínimo), 9% sobre a segunda parte, e assim por diante. O valor final é a soma dessas fatias, o que torna o imposto mais justo do que a aplicação direta da alíquota maior sobre todo o montante.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* INSS Table */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">1. Tabela de Contribuição Previdenciária (INSS)</h3>
                            <div className="overflow-x-auto rounded-xl border border-white/10">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-gray-300">
                                        <tr>
                                            <th className="p-3">Faixa de Salário de Contribuição (R$)</th>
                                            <th className="p-3">Alíquota Progressiva</th>
                                            <th className="p-3">Parcela a Deduzir (R$)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400 divide-y divide-white/5">
                                        <tr><td className="p-3">Até <strong>1.518,00</strong></td><td className="p-3">7,5%</td><td className="p-3">-</td></tr>
                                        <tr><td className="p-3">De 1.518,01 até 2.793,88</td><td className="p-3">9,0%</td><td className="p-3">R$ 22,77</td></tr>
                                        <tr><td className="p-3">De 2.793,89 até 4.190,83</td><td className="p-3">12,0%</td><td className="p-3">R$ 106,59</td></tr>
                                        <tr><td className="p-3">De 4.190,84 até <strong>8.157,41</strong></td><td className="p-3">14,0%</td><td className="p-3">R$ 190,40</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 text-xs text-gray-500">
                                <strong>Fonte Oficial:</strong> Dados baseados na <a href="https://www.gov.br/inss/pt-br/noticias/confira-como-ficaram-as-aliquotas-de-contribuicao-ao-inss" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Portaria Interministerial referente aos benefícios de 2025</a> e projeções econômicas.
                            </p>
                        </div>

                        {/* IRRF Table */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">2. Tabela de Imposto de Renda (IRRF)</h3>
                            <div className="overflow-x-auto rounded-xl border border-white/10">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-gray-300">
                                        <tr>
                                            <th className="p-3">Base de Cálculo (R$)</th>
                                            <th className="p-3">Alíquota (%)</th>
                                            <th className="p-3">Parcela a Deduzir (R$)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400 divide-y divide-white/5">
                                        <tr><td className="p-3">Até <strong>2.428,80</strong></td><td className="p-3">Isento</td><td className="p-3">-</td></tr>
                                        <tr><td className="p-3">De 2.428,81 até 2.826,65</td><td className="p-3">7,5%</td><td className="p-3">R$ 182,16</td></tr>
                                        <tr><td className="p-3">De 2.826,66 até 3.751,05</td><td className="p-3">15,0%</td><td className="p-3">R$ 394,16</td></tr>
                                        <tr><td className="p-3">De 3.751,06 até 4.664,68</td><td className="p-3">22,5%</td><td className="p-3">R$ 675,49</td></tr>
                                        <tr><td className="p-3">Acima de 4.664,68</td><td className="p-3">27,5%</td><td className="p-3">R$ 908,73</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 text-xs text-gray-500">
                                <strong>Fonte Oficial:</strong> Consulte a tabela progressiva mensal vigente diretamente no site da <a href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Receita Federal</a>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Como Calcular Section */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Calculator className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como Calcular o Décimo Terceiro (Passo a Passo)
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        O cálculo exato exige atenção porque a tributação ocorre quase inteiramente na segunda parcela. A primeira parcela (adiantamento), paga até novembro, corresponde a 50% do bruto sem descontos. O "acerto de contas" acontece agora em dezembro.
                    </p>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Diferença: 1ª Parcela vs 2ª Parcela</h3>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                                    <span><strong>1ª Parcela (Adiantamento):</strong> Paga entre fevereiro e novembro. Corresponde a <strong>50% do salário bruto</strong> do mês anterior, sem nenhum desconto de impostos (INSS ou IRRF).</span>
                                </li>
                                <li className="flex gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                                    <span><strong>2ª Parcela (Quitação):</strong> Paga até 20 de dezembro (antecipado para dia 19 em 2025). É feito o cálculo do 13º integral, subtraem-se o <strong>INSS total</strong>, o <strong>IRRF total</strong> e o valor já adiantado na 1ª parcela. O saldo restante é o valor líquido.</span>
                                </li>
                            </ul>

                            <div className="bg-white/5 p-4 rounded-xl border-l-4 border-blue-500 mt-6">
                                <h4 className="text-white font-bold mb-2">A Fórmula Matemática</h4>
                                <p className="text-sm text-gray-300 mb-2">Para encontrar o valor da <strong>2ª Parcela</strong>, utilizamos a seguinte lógica:</p>
                                <p className="font-mono text-sm text-blue-300 bg-black/20 p-2 rounded">
                                    V_2parc = (V_BrutoTotal - INSS_total - IRRF_total) - V_1parc
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                <h3 className="text-md font-bold text-white mb-2">Exemplo 1: Salário Intermediário (R$ 5.000,00)</h3>
                                <p className="text-xs text-gray-400 mb-3">Trabalhador que ganha R$ 5.000,00 e trabalhou os 12 meses.</p>
                                <ul className="space-y-1.5 text-xs text-gray-300">
                                    <li>1. <strong>1ª Parcela (Adiantamento):</strong> R$ 2.500,00.</li>
                                    <li>2. <strong>Cálculo do INSS Total:</strong> O desconto total é de <strong>R$ 509,59</strong>.</li>
                                    <li>3. <strong>Cálculo do IRRF:</strong>
                                        <ul className="pl-4 mt-1 border-l border-white/10">
                                            <li>Base: R$ 4.490,41.</li>
                                            <li>Imposto: (4.490,41 × 22,5%) - 675,49 = <strong>R$ 334,85</strong>.</li>
                                        </ul>
                                    </li>
                                    <li>4. <strong>Valor Líquido da 2ª Parcela:</strong></li>
                                    <li>R$ 5.000,00 - R$ 509,59 - R$ 334,85 - R$ 2.500,00.</li>
                                    <li className="text-green-400 font-bold mt-1">A receber em Dezembro: R$ 1.655,56.</li>
                                </ul>
                            </div>

                            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                <h3 className="text-md font-bold text-white mb-2">Exemplo 2: Salário no Teto do INSS (R$ 8.157,41)</h3>
                                <ul className="space-y-1.5 text-xs text-gray-300">
                                    <li>1. <strong>1ª Parcela (Adiantamento):</strong> R$ 4.078,70.</li>
                                    <li>2. <strong>Cálculo do INSS Total:</strong> <strong>Desconto Máximo: R$ 951,63</strong>.</li>
                                    <li>3. <strong>Cálculo do IRRF:</strong>
                                        <ul className="pl-4 mt-1 border-l border-white/10">
                                            <li>Base: R$ 7.205,78.</li>
                                            <li>Imposto: (7.205,78 × 27,5%) - 908,73 = <strong>R$ 1.072,86</strong>.</li>
                                        </ul>
                                    </li>
                                    <li>4. <strong>Valor Líquido da 2ª Parcela:</strong></li>
                                    <li>R$ 8.157,41 - 951,63 - 1.072,86 - 4.078,70.</li>
                                    <li className="text-green-400 font-bold mt-1">A receber em Dezembro: R$ 2.054,22.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p className="mt-6 text-sm text-gray-400">
                        Se houver dúvidas sobre os descontos mensais regulares, compare com nossa calculadora de <Link to="/calculadoras/salario-liquido" className="text-blue-400 hover:underline">salário líquido</Link> para entender a diferença na tributação.
                    </p>
                </div>

                {/* Erros Comuns */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <AlertCircle className="w-8 h-8 text-yellow-500 shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-yellow-200 mb-2">Erros Comuns e a Regra dos 15 Dias</h3>
                        </div>
                    </div>
                    <ul className="space-y-4 text-yellow-100/70">
                        <li className="flex gap-3">
                            <span className="shrink-0">•</span>
                            <span>Um erro frequente é achar que basta dividir o salário por 12. É obrigatório aplicar a <strong>Regra do Dia 15</strong>: para ter direito a 1/12 (um avo) do benefício, você precisa ter trabalhado pelo menos 15 dias naquele mês.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="shrink-0">•</span>
                            <span><strong>O Erro da Multiplicação Simples:</strong> Um equívoco clássico é pegar o salário total (ex: R$ 5.000) e multiplicar direto pela alíquota da faixa final (14%). Isso gera um valor de desconto muito maior do que o real. O correto é sempre aplicar a tabela progressiva faixa a faixa ou usar a "Parcela a Deduzir" para corrigir o cálculo.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="shrink-0">•</span>
                            <span><strong>Faltas Injustificadas:</strong> Se você teve muitas faltas em um mês específico e trabalhou menos de 15 dias, aquele mês não conta para o cálculo.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="shrink-0">•</span>
                            <span><strong>Admissão Recente:</strong> Se foi contratado após o dia 17 do mês (em meses de 31 dias), aquele primeiro mês não entra na conta.</span>
                        </li>
                    </ul>
                    <p className="mt-4 text-sm text-yellow-100/70">
                        Se você está saindo da empresa agora, o cálculo muda e entra como verba de <Link to="/calculadoras/rescisao" className="text-yellow-200 hover:underline underline">rescisão</Link>, onde o pagamento é proporcional.
                    </p>
                </div>

                {/* Média de Horas e Casos Especiais */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Médias de Horas Extras e Comissões</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            O 13º Salário deve refletir a sua remuneração real, não apenas o salário base. Se você fez <Link to="/calculadoras/horas-extras" className="text-blue-400 hover:underline">horas extras</Link> ou recebeu comissões durante o ano, deve-se calcular a média:
                        </p>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li>
                                <strong>Horas Extras:</strong> Soma-se a <strong>quantidade</strong> de horas feitas, divide-se pelos meses trabalhados e multiplica-se pelo valor da hora em dezembro. É obrigatório incluir o reflexo do DSR (Descanso Semanal Remunerado).
                            </li>
                            <li>
                                <strong>Comissões:</strong> Faz-se a média aritmética dos valores recebidos (geralmente corrigidos) de janeiro a novembro. O ajuste referente às vendas de dezembro é pago até 10 de janeiro do ano seguinte.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Situações Especiais</h3>
                        <div className="space-y-4 text-sm text-gray-300">
                            <div>
                                <h4 className="text-blue-400 font-bold mb-1">Licença-Maternidade</h4>
                                <p>Durante a licença, o contrato não é suspenso. A empresa paga o valor integral do 13º salário (incluindo médias de variáveis dos últimos 6 meses) e depois compensa esse valor na guia de recolhimento do INSS via eSocial. Consulte as regras detalhadas de benefícios no site do <a href="https://www.gov.br/inss/pt-br/direitos-e-deveres/salario-maternidade/valor-do-salario-maternidade" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">INSS - Salário Maternidade</a>.</p>
                            </div>
                            <div>
                                <h4 className="text-blue-400 font-bold mb-1">Trabalhador Intermitente</h4>
                                <p>Nesta modalidade, não existe o pagamento acumulado em dezembro. O trabalhador recebe a proporção do 13º salário e das <Link to="/calculadoras/ferias" className="text-blue-400 hover:underline">férias</Link> ao final de cada convocação de serviço, diluído ao longo do ano.</p>
                            </div>
                            <div>
                                <h4 className="text-blue-400 font-bold mb-1">Aposentados e Pensionistas</h4>
                                <p>Aposentados a partir de 65 anos possuem uma <strong>dupla isenção</strong> de Imposto de Renda. Além da faixa de isenção normal, eles têm direito a deduzir mais R$ 1.903,98 da base de cálculo, o que reduz drasticamente o imposto a pagar sobre o benefício.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={THIRTEENTH_FAQS}
                    title="Perguntas Frequentes sobre 13º Salário"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
