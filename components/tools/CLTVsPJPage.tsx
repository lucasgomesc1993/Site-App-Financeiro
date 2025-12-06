import React, { useState, useEffect } from 'react';
import { Briefcase, Calculator, DollarSign, Scale, ArrowRight, Wallet, TrendingUp, AlertCircle, Building2, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const CLT_PJ_FAQS: FAQItem[] = [
    {
        question: "Quanto devo pedir a mais no PJ para valer a pena?",
        answer: "Para manter o mesmo poder de compra, o valor bruto da proposta PJ deve ser, no mínimo, de **40% a 50% superior** ao salário bruto CLT. Essa margem é essencial para cobrir impostos (DAS), custos contábeis, ausência de benefícios (como Vale Refeição) e permitir a criação de uma reserva financeira equivalente ao FGTS e 13º salário."
    },
    {
        question: "PJ tem direito a 13º salário e férias?",
        answer: "Por lei, não. PJ é uma relação comercial entre empresas (B2B). No entanto, é comum negociar no contrato um recesso remunerado ou um \"bônus\" anual, mas isso não é obrigação legal. Vale lembrar que horas trabalhadas a mais raramente são pagas, mas você pode usar nossa calculadora de [horas extras](/calculadoras/horas-extras) para precificar serviços adicionais fora do escopo."
    },
    {
        question: "O que é a \"Pejotização\"?",
        answer: "Pejotização é a prática ilegal onde uma empresa contrata um funcionário como PJ para evitar encargos trabalhistas, mas exige cumprimento de horário, subordinação direta e exclusividade. Isso configura vínculo empregatício disfarçado, gerando alto risco jurídico para o contratante e direitos trabalhistas retroativos para o profissional em caso de ação judicial."
    },
    {
        question: "Sou obrigado a ter contador sendo PJ?",
        answer: "Sim, se você for ME (Microempresa) ou EPP, a contabilidade é obrigatória para manter a escrituração fiscal em dia e distribuir lucros com isenção de IR. Apenas o MEI dispensa contador, mas o limite de faturamento do MEI (R$ 81 mil/ano) raramente atende profissionais seniores que migram da CLT."
    },
    {
        question: "Como funciona o FGTS para PJ?",
        answer: "O profissional PJ **não tem direito ao FGTS**, pois este é um benefício exclusivo da CLT. Para não ficar desprotegido, você deve calcular o valor que seria depositado (8% do salário) e investir esse montante mensalmente em uma aplicação de renda fixa segura. Use nossa [calculadora de FGTS](/calculadoras/fgts) para projetar quanto você deve guardar por conta própria."
    }
];

export function CLTVsPJPage() {
    const [salary, setSalary] = useState('');
    const [benefits, setBenefits] = useState('');
    const [pjSalary, setPjSalary] = useState('');
    const [result, setResult] = useState<{ cltTotal: number; netClt: number; netPj: number; difference: number } | null>(null);

    const calculate = () => {
        const salaryVal = parseFloat(salary.replace(/\./g, '').replace(',', '.') || '0');
        const benefitsVal = parseFloat(benefits.replace(/\./g, '').replace(',', '.') || '0');
        const pjVal = parseFloat(pjSalary.replace(/\./g, '').replace(',', '.') || '0');

        if (salaryVal === 0 && pjVal === 0) {
            setResult(null);
            return;
        }

        // CLT Calculations (Simplified 2024/2025 estimates)
        // INSS
        let inss = 0;
        if (salaryVal <= 1412.00) inss = salaryVal * 0.075;
        else if (salaryVal <= 2666.68) inss = 1412.00 * 0.075 + (salaryVal - 1412.00) * 0.09;
        else if (salaryVal <= 4000.03) inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (salaryVal - 2666.68) * 0.12;
        else if (salaryVal <= 7786.02) inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salaryVal - 4000.03) * 0.14;
        else inss = 908.85;

        // IRRF (Simplified Base)
        const irrfBase = salaryVal - inss;
        let irrf = 0;
        if (irrfBase <= 2259.20) irrf = 0;
        else if (irrfBase <= 2826.65) irrf = (irrfBase * 0.075) - 169.44;
        else if (irrfBase <= 3751.05) irrf = (irrfBase * 0.15) - 381.44;
        else if (irrfBase <= 4664.68) irrf = (irrfBase * 0.225) - 662.77;
        else irrf = (irrfBase * 0.275) - 896.00;
        if (irrf < 0) irrf = 0;

        const fgts = salaryVal * 0.08;
        const thirteenth = salaryVal / 12; // Monthly provision
        const vacation = (salaryVal + salaryVal / 3) / 12; // Monthly provision

        const netCltMonthly = salaryVal - inss - irrf;
        // Total CLT Value "Package" per month (Net + Benefits + Provisions for 13th/Vacation/FGTS)
        // Note: This is an estimation of "Total Annual Gains / 12" to compare with monthly PJ
        // const cltTotalAnnual = (netCltMonthly * 12) + (salaryVal) + (salaryVal / 3) + (fgts * 12) + (benefitsVal * 12); 
        const cltComparableMonthly = netCltMonthly + benefitsVal + fgts + thirteenth + vacation;

        // PJ Calculations (Simples Nacional Annex III approx 6% + Accountant cost)
        const pjTaxRate = 0.06; // Optimistic scenario
        const accountantCost = 300; // Est monthly
        const pjTax = pjVal * pjTaxRate;
        const netPj = pjVal - pjTax - accountantCost;

        setResult({
            cltTotal: cltComparableMonthly,
            netClt: netCltMonthly, // Just the cash in hand
            netPj: netPj,
            difference: netPj - cltComparableMonthly
        });
    };

    useEffect(() => {
        calculate();
    }, [salary, benefits, pjSalary]);

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
        "name": "Calculadora CLT vs PJ: Comparativo Completo 2025",
        "url": "https://www.junny.com.br/calculadoras/clt-vs-pj",
        "description": "Descubra o que vale mais a pena: ser funcionário CLT ou abrir empresa PJ. Compare salários, impostos, benefícios e veja o lucro real.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Comparativo Líquido CLT x PJ",
            "Cálculo de Impostos (Simples Nacional vs IRRF)",
            "Estimativa de Benefícios (Férias, 13º, FGTS)",
            "Análise de Fator R"
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
                title="Calculadora CLT x PJ 2025: Comparativo Salário Líquido e Impostos"
                description="Use nossa calculadora CLT x PJ para descobrir qual vale a pena. Aprenda a fórmula de equivalência, tabelas do Simples Nacional e direitos em 2025."
                canonical="/calculadoras/clt-vs-pj"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CLT_PJ_FAQS.map(faq => ({
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
                        { label: 'CLT vs PJ', href: '/calculadoras/clt-vs-pj' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Carreira e Contratos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">CLT vs PJ 2025</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Compare salários, impostos e benefícios. Descubra qual regime de trabalho é mais vantajoso para o seu momento financeiro.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Form */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Simule a Comparação
                                </h2>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">Opção CLT</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Salário Bruto Mensal</label>
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
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Benefícios (VR, VA, Plano)</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                                <input
                                                    type="text"
                                                    value={benefits}
                                                    onChange={(e) => handleCurrencyInput(e.target.value, setBenefits)}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                                    placeholder="0,00"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-6">
                                    <h3 className="text-sm font-medium text-indigo-400 mb-4 uppercase tracking-wider">Opção PJ</h3>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Proposta de Valor Mensal</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                            <input
                                                type="text"
                                                value={pjSalary}
                                                onChange={(e) => handleCurrencyInput(e.target.value, setPjSalary)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                                placeholder="0,00"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Considerando Simples Nacional (Anexo III) ~6%.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-5 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-center">
                            {result ? (
                                <div className="space-y-6">
                                    <div className={`p-4 rounded-xl border ${result.difference > 0 ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                                        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                            <Scale className="w-5 h-5" />
                                            Veredito:
                                        </h3>
                                        <p className="text-2xl font-bold">
                                            {result.difference > 0 ? (
                                                <span className="text-indigo-400">PJ compensa mais</span>
                                            ) : (
                                                <span className="text-blue-400">CLT compensa mais</span>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-400 mt-2">
                                            Diferença aproximada: <strong>R$ {Math.abs(result.difference).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> por mês.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                            <div>
                                                <span className="text-sm text-gray-400 block">CLT (Pacote Mensal*)</span>
                                                <span className="text-xs text-gray-500">Salário Líquido + Férias/13º diluídos</span>
                                            </div>
                                            <span className="text-lg font-bold text-white">
                                                R$ {result.cltTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                            <div>
                                                <span className="text-sm text-gray-400 block">PJ (Líquido Estimado)</span>
                                                <span className="text-xs text-gray-500">Descontando impostos e contador</span>
                                            </div>
                                            <span className="text-lg font-bold text-white">
                                                R$ {result.netPj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <h4 className="text-sm font-medium text-gray-300 mb-3">Na prática (Dinheiro na Mão):</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-xs text-gray-500 block">Salário Líquido CLT</span>
                                                <span className="text-base font-bold text-blue-300">R$ {result.netClt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 block">Entrada PJ</span>
                                                <span className="text-base font-bold text-indigo-300">R$ {result.netPj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-400 py-12">
                                    <Scale className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                                    <p>Preencha os dois lados para ver o comparativo detalhado.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Info */}
                <div className="max-w-4xl mx-auto space-y-12 mb-24 text-gray-300">

                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Calculadora CLT x PJ: Comparativo Completo para 2025</h2>
                        <div className="space-y-4 leading-relaxed">
                            <p>
                                <strong>A principal diferença entre CLT e PJ reside na tributação e nos benefícios.</strong> Enquanto o profissional CLT tem impostos (INSS e IRRF) retidos na fonte e acesso a direitos automáticos como FGTS, férias remuneradas e 13º salário, o PJ recebe o valor bruto integral, devendo assumir a responsabilidade pelo pagamento de tributos (DAS), contador e sua própria previdência privada ou pública.
                            </p>
                            <p>
                                Abaixo, detalhamos a lógica financeira que você deve dominar antes de tomar a decisão de trocar a carteira assinada pelo contrato de prestação de serviços.
                            </p>
                        </div>

                        <div className="mt-8 space-y-4">
                            <h3 className="text-xl font-semibold text-white">Diferença de cálculo: Salário Bruto CLT vs Faturamento PJ</h3>
                            <p>
                                Ao migrar para o modelo PJ, você deixa de ser um <Link to="/calculadoras/custo-funcionario" className="text-blue-400 hover:text-blue-300 underline">custo total do funcionário</Link> para a empresa (que economiza encargos trabalhistas) e passa a ser um fornecedor. O erro comum é comparar o valor nominal. Para uma equivalência real, é necessário somar os "custos invisíveis" que compõem sua remuneração atual.
                            </p>
                            <p><strong>Na CLT, seu pacote inclui automaticamente:</strong></p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-400">
                                <li><strong>8% de FGTS:</strong> Valor depositado mensalmente em conta vinculada.</li>
                                <li><strong>33% de Adicional de Férias:</strong> O terço constitucional garantido por lei sobre o salário.</li>
                                <li><strong>8,33% de <Link to="/calculadoras/decimo-terceiro" className="text-blue-400 hover:text-blue-300 underline">13º Salário</Link>:</strong> A provisão mensal equivalente a um salário extra por ano (1/12).</li>
                                <li><strong>Benefícios indiretos:</strong> Vale-refeição, vale-transporte e plano de saúde, que são isentos de IR para o funcionário na CLT, mas devem sair do seu bolso no PJ.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Calculator className="w-6 h-6 text-indigo-500" />
                            Como calcular a equivalência CLT x PJ (Fórmula)
                        </h2>
                        <div className="space-y-4 leading-relaxed">
                            <p>
                                O cálculo de equivalência consiste em somar ao salário bruto todos os benefícios da CLT (férias, 13º, FGTS) e adicionar os custos operacionais do PJ para encontrar o faturamento de empate. Essa conta revela o valor mínimo que você precisa faturar para manter o mesmo padrão de vida e segurança.
                            </p>
                            <p>
                                Se você quiser validar os números manualmente, utilize a seguinte metodologia para encontrar o "Faturamento PJ Equivalente":
                            </p>

                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 my-6">
                                <ol className="space-y-6">
                                    <li className="space-y-2">
                                        <strong className="text-white block text-lg">1. Calcule seu Ganho Anual CLT:</strong>
                                        <div className="bg-black/30 p-3 rounded-lg font-mono text-sm md:text-base text-center text-indigo-300 border border-indigo-500/30">
                                            Ganho Anual = (Salário Bruto × 13,33) + FGTS Anual + (Benefícios Mensais × 12)
                                        </div>
                                        <span className="text-xs text-gray-500 block mt-1">Nota: O multiplicador 13,33 cobre os 12 salários mensais, o 13º salário e o 1/3 de férias.</span>
                                    </li>
                                    <li>
                                        <strong className="text-white block text-lg mb-1">2. Adicione os Custos de Manutenção PJ:</strong>
                                        <p className="text-sm">Estime os custos operacionais que você terá para manter a empresa aberta (Contador + Taxas anuais + Impostos sobre a Nota Fiscal).</p>
                                    </li>
                                    <li>
                                        <strong className="text-white block text-lg mb-1">3. Aplique a Margem de Segurança:</strong>
                                        <p className="text-sm">Adicione entre 10% a 20% para cobrir a ausência de seguro-desemprego e a falta de <Link to="/calculadoras/rescisao" className="text-indigo-400 hover:text-indigo-300 underline">cálculo de rescisão</Link> garantida.</p>
                                    </li>
                                </ol>
                            </div>

                            <p className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 text-neutral-200">
                                <strong>Resultado:</strong> O valor final dividido por 12 é o faturamento mensal mínimo que você deve exigir como PJ para "empatar" com a CLT.
                            </p>

                            <p>
                                Para facilitar, você pode checar seu <Link to="/calculadoras/salario-liquido" className="text-blue-400 hover:text-blue-300 underline">salário líquido atual</Link> para ter a base de comparação inicial.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl font-bold text-white mb-4">Impostos no Simples Nacional</h3>
                            <p className="mb-4">
                                A maioria dos profissionais de tecnologia, marketing e consultoria se enquadra no <strong>Simples Nacional</strong>. O imposto que você pagará depende do fator R.
                            </p>
                            <h4 className="font-bold text-white mt-4 mb-2">O que é o Fator R?</h4>
                            <p>
                                Para pagar menos imposto (Anexo III), seu Pró-labore deve representar, no mínimo, <strong>28% do seu faturamento mensal</strong>. Caso contrário, a tributação sobe automaticamente para 15,5% (Anexo V).
                            </p>

                            <div className="mt-6 overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-gray-300 uppercase">
                                        <tr>
                                            <th className="px-3 py-3 rounded-l-lg">Faixa (12 meses)</th>
                                            <th className="px-3 py-3">Anexo III</th>
                                            <th className="px-3 py-3 rounded-r-lg">Anexo V</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-400 divide-y divide-white/5">
                                        <tr>
                                            <td className="px-3 py-3 font-medium text-white">Até R$ 180k</td>
                                            <td className="px-3 py-3 text-green-400 font-bold">6,00%</td>
                                            <td className="px-3 py-3 text-red-400">15,50%</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-3 font-medium text-white">R$ 180k a 360k</td>
                                            <td className="px-3 py-3">11,20%</td>
                                            <td className="px-3 py-3">18,00%</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-3 font-medium text-white">R$ 360k a 720k</td>
                                            <td className="px-3 py-3">13,50%</td>
                                            <td className="px-3 py-3">19,50%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs md:text-sm text-yellow-200">
                                <strong>⚠️ Atenção:</strong> Profissionais de TI e Consultoria não podem ser MEI. Para entender o custo exato, consulte nossa ferramenta de <Link to="/calculadoras/das-mei" className="underline hover:text-white">cálculo do DAS</Link>.
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl font-bold text-white mb-4">Vantagens e Riscos</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                        <h4 className="font-bold text-blue-400">CLT (Carteira Assinada)</h4>
                                    </div>
                                    <ul className="text-sm space-y-2">
                                        <li><strong>Estabilidade:</strong> Protegido na demissão (multa 40% FGTS).</li>
                                        <li><strong>Liquidez:</strong> Recebe líquido menor, benefícios retidos.</li>
                                        <li><strong>Férias:</strong> 30 dias remunerados + 1/3 garantido.</li>
                                        <li><strong>Aposentadoria:</strong> <Link to="/calculadoras/inss" className="underline hover:text-white">INSS descontado</Link> automaticamente (teto).</li>
                                    </ul>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                        <h4 className="font-bold text-indigo-400">PJ (Prestador de Serviço)</h4>
                                    </div>
                                    <ul className="text-sm space-y-2">
                                        <li><strong>Estabilidade:</strong> Contrato comercial, rescisão facilitada.</li>
                                        <li><strong>Liquidez:</strong> Recebe bruto maior. Sucesso depende de <Link to="/calculadoras/investimentos" className="underline hover:text-white">investir o excedente</Link>.</li>
                                        <li><strong>Férias:</strong> Dias não trabalhados não geram receita (salvo contrato).</li>
                                        <li><strong>Aposentadoria:</strong> Paga INSS sobre Pró-labore (minímo ou 28%).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <FAQ
                    items={CLT_PJ_FAQS}
                    title="Perguntas Frequentes sobre CLT e PJ"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
