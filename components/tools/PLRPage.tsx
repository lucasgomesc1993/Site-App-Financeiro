import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, Briefcase, AlertCircle, CheckCircle, Percent, DollarSign, Clock, FileText, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';

const PLR_FAQS = [
    {
        question: "Qual o valor máximo da isenção da PLR em 2025?",
        answer: "O teto de isenção total na tabela de 2025 é de **R$ 8.214,40**. Isso significa que, se a soma de todas as parcelas recebidas no ano ficar abaixo desse limite, você não paga nada de Imposto de Renda. Ao usar a **Calculadora de PLR**, essa isenção é aplicada automaticamente, enquanto valores superiores são tributados progressivamente apenas sobre o excedente."
    },
    {
        question: "A PLR desconta INSS e FGTS?",
        answer: "Não. A Participação nos Lucros é totalmente isenta de encargos trabalhistas e previdenciários (INSS e FGTS) tanto para a empresa quanto para o empregado. Isso ocorre porque a Constituição Federal desvinculou a PLR da remuneração salarial. Confira o impacto financeiro disso comparando com o nosso <a href='/calculadoras/inss'>cálculo do INSS</a> sobre salários normais."
    },
    {
        question: "O banco pode descontar dívida da PLR?",
        answer: "A PLR tem caráter alimentar e não pode sofrer descontos automáticos de dívidas (como cheque especial ou empréstimos) sem autorização expressa do funcionário. No entanto, verifique se o seu contrato de abertura de conta possui cláusulas que permitem o débito em \"quaisquer créditos\", o que exigiria uma contestação formal junto ao banco."
    },
    {
        question: "Quem recebe PLR tem direito ao 13º salário sobre ela?",
        answer: "Não. A PLR não integra a remuneração para fins de reflexos em outras verbas trabalhistas. Ou seja, ela não aumenta a base de cálculo do seu <a href='/calculadoras/decimo-terceiro'>décimo terceiro</a>, férias ou aviso prévio. Trata-se de um pagamento eventual e apartado do salário contratual mensal."
    },
    {
        question: "Pensionistas pagam pensão sobre a PLR?",
        answer: "A regra geral consolidada pelo STJ (2024/2025) é que a PLR **não entra** na base de cálculo da pensão alimentícia automaticamente. Por ser uma verba indenizatória e eventual, ela só deve ser incluída se o acordo de alimentos ou a sentença judicial disser explicitamente que a pensão incide sobre \"participação nos lucros\"."
    },
    {
        question: "Quando a PLR deve ser paga?",
        answer: "A legislação exige que o pagamento ocorra em, no máximo, duas vezes ao ano, com intervalo mínimo de um trimestre civil entre as parcelas. As datas exatas (geralmente uma antecipação no meio do ano e um fechamento no ano seguinte) são definidas obrigatoriamente na Convenção Coletiva de Trabalho da sua categoria."
    },
    {
        question: "Autônomos e PJ têm direito a PLR?",
        answer: "Não. A PLR é um direito exclusivo de trabalhadores com vínculo empregatício (CLT), regidos pela <a href='http://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm'>Consolidação das Leis do Trabalho</a>. Profissionais autônomos ou contratados como PJ recebem conforme seu contrato civil de prestação de serviços, não estando sujeitos às regras de isenção fiscal da Lei 10.101/2000."
    }
];

export function PLRPage() {
    const [plrValue, setPlrValue] = useState('');
    const [result, setResult] = useState<{
        grossValue: number;
        irTax: number;
        netValue: number;
        effectiveRate: number;
        deduction: number;
        rate: number;
        tierRate: number;
    } | null>(null);

    const calculatePLR = () => {
        const gross = parseFloat(plrValue.replace(/\./g, '').replace(',', '.'));

        if (isNaN(gross)) {
            setResult(null);
            return;
        }

        let irTax = 0;
        let deduction = 0;
        let tierRate = 0;

        // Tabela PLR 2025 (Fonte: calculadora-plr.txt)
        if (gross <= 8214.40) {
            tierRate = 0;
            deduction = 0;
        } else if (gross <= 9922.28) {
            tierRate = 0.075;
            deduction = 616.08;
        } else if (gross <= 13167.00) {
            tierRate = 0.15;
            deduction = 1360.25;
        } else if (gross <= 16380.38) {
            tierRate = 0.225;
            deduction = 2347.78;
        } else {
            tierRate = 0.275;
            deduction = 3166.80;
        }

        irTax = (gross * tierRate) - deduction;

        // Ensure tax is not negative
        if (irTax < 0) irTax = 0;

        const netValue = gross - irTax;
        const effectiveRate = gross > 0 ? (irTax / gross) * 100 : 0;

        setResult({
            grossValue: gross,
            irTax,
            netValue,
            effectiveRate,
            deduction,
            rate: tierRate,
            tierRate: tierRate * 100
        });
    };

    useEffect(() => {
        calculatePLR();
    }, [plrValue]);

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
        "name": "Calculadora de PLR 2025: Simule o Valor Líquido e Imposto",
        "url": "https://www.junny.com.br/calculadoras/plr",
        "description": "Use a Calculadora de PLR 2025 para simular o valor líquido. Veja tabela de IR oficial, regras bancários e nova isenção de R$ 8.214,40.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Cálculo de PLR Líquida 2025",
            "Tabela de IR Exclusiva para PLR",
            "Isenção de R$ 8.214,40",
            "Simulação de Imposto de Renda"
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
                title="Calculadora PLR 2025: Valor Líquido e Tabela IR Oficial"
                description="Use a Calculadora de PLR 2025 para simular o valor líquido. Veja tabela de IR oficial, regras bancários e nova isenção de R$ 8.214,40."
                canonical="/calculadoras/plr"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": PLR_FAQS.map(faq => ({
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
                        { label: 'Calculadora PLR', href: '/calculadoras/plr' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Atualizado para 2025</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de PLR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">2025: Simule o Valor Líquido e Imposto</span>
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Section */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                                    <Calculator className="w-5 h-5 text-blue-500" />
                                    Simular PLR Líquida
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="plrValue" className="text-sm text-gray-400">Valor Total da PLR (Bruto)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                        <input
                                            id="plrValue"
                                            type="text"
                                            inputMode="decimal"
                                            value={plrValue}
                                            onChange={(e) => handleCurrencyInput(e.target.value, setPlrValue)}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-lg"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                {/* Result Block */}
                                <div className="pt-2">
                                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4">
                                        <span className="text-sm text-blue-400 block mb-2">
                                            Valor Líquido Estimado
                                        </span>
                                        <span className="text-4xl font-bold text-white">
                                            {result ? `R$ ${result.netValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ 0,00'}
                                        </span>

                                        {result && (
                                            <div className="flex justify-center gap-4 mt-3 text-xs">
                                                <span className="text-gray-400">Bruto: R$ {result.grossValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                <span className="text-red-400">Imposto: R$ {result.irTax.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                        )}
                                    </div>

                                    {result && (
                                        <div className="grid grid-cols-1 gap-3 text-sm">
                                            <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                <span className="text-gray-300">Valor Bruto</span>
                                                <span className="text-white font-medium">R$ {result.grossValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>

                                            {result.irTax > 0 ? (
                                                <>
                                                    <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                        <span className="text-gray-300">Alíquota Aplicada</span>
                                                        <span className="text-white font-medium">{result.tierRate.toFixed(1).replace('.', ',')}%</span>
                                                    </div>
                                                    <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                        <span className="text-gray-300">Dedução da Tabela</span>
                                                        <span className="text-white font-medium text-green-400">- R$ {result.deduction.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                    </div>
                                                    <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                                        <span className="text-red-200">Imposto Devido (IRRF)</span>
                                                        <span className="text-red-200 font-bold">- R$ {result.irTax.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                                    <span className="text-green-200">Status</span>
                                                    <span className="text-green-200 font-bold">ISENTO DE IR</span>
                                                </div>
                                            )}

                                            <div className="mt-2 text-xs text-gray-500 text-center">
                                                Alíquota Efetiva: {result.effectiveRate.toFixed(2).replace('.', ',')}%
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Content (Quick Summary) */}
                    <div className="lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Resumo Rápido (Dados Oficiais Dezembro/2025)
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1">Nova Isenção de IR</div>
                                    <div className="text-lg font-bold text-white">R$ 8.214,40</div>
                                    <div className="text-xs text-gray-400">Quem recebe até esse valor está 100% isento</div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Percent className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Alíquota Máxima:</strong> A tributação para valores acima de R$ 16.380,38 é de 27,5%, mas com dedução significativa de R$ 3.166,80.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <DollarSign className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Encargos Trabalhistas:</strong> A PLR é isenta de INSS e FGTS para o empregado, incidindo apenas o Imposto de Renda na Fonte (tributação exclusiva).</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Prazo de Pagamento:</strong> Deve ocorrer em, no máximo, duas parcelas por ano, com intervalo trimestral ou semestral, conforme acordo coletivo.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <Briefcase className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span><strong>Bancários:</strong> Segue regra específica da CCT 2024/2025 (90% do salário + fixo + parcela adicional).</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumo em 30 Segundos */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Clock className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Resumo em 30 Segundos
                        </h2>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        A **Participação nos Lucros e Resultados (PLR)** é um bônus pago pela empresa quando metas corporativas e individuais são atingidas. Diferente do salário mensal, a PLR possui **tributação exclusiva**, o que significa que ela não se soma aos seus rendimentos anuais para elevar a alíquota do seu Imposto de Renda tradicional. Em 2025, a tabela foi atualizada garantindo que mais dinheiro fique no bolso do trabalhador. Nossa **Calculadora de PLR** abaixo simplifica essa conta para você.
                    </p>
                </div>

                {/* Como funciona a PLR */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <HelpCircle className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como funciona a PLR
                        </h2>
                    </div>
                    <div className="space-y-4 text-gray-300">
                        <p>
                            Antes de utilizar a **Calculadora de PLR** para descobrir os valores líquidos, é fundamental entender a mecânica do benefício. A PLR é regulamentada pela Lei 10.101/2000 e funciona como um contrato de desempenho entre patrão e empregado. Ela não é um benefício automático; precisa ser negociada previamente por meio de comissão paritária ou convenção coletiva com o sindicato.
                        </p>
                        <p>
                            O objetivo é alinhar os interesses: a empresa busca lucro ou produtividade, e o trabalhador recebe uma fatia desse sucesso. Por ser desvinculada da remuneração salarial, a PLR não gera encargos trabalhistas tradicionais, sendo tributada exclusivamente na fonte.
                        </p>
                    </div>
                </div>

                {/* Tabela de IR sobre PLR */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Briefcase className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Tabela de IR sobre PLR (Vigência 2025)
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-8 max-w-3xl">
                        A tributação da PLR é feita "na fonte" e separada dos demais rendimentos. Abaixo, a tabela progressiva válida a partir de maio de 2025:
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/5 text-gray-300">
                                <tr>
                                    <th className="p-3">Faixa de PLR Anual (R$)</th>
                                    <th className="p-3 text-center">Alíquota (%)</th>
                                    <th className="p-3 text-center">Parcela a Deduzir do IR (R$)</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400 divide-y divide-white/5">
                                <tr><td className="p-3">De R$ 0,00 a R$ 8.214,40</td><td className="p-3 text-center font-bold text-green-400">Isento</td><td className="p-3 text-center">R$ 0,00</td></tr>
                                <tr><td className="p-3">De R$ 8.214,41 a R$ 9.922,28</td><td className="p-3 text-center">7,5%</td><td className="p-3 text-center">R$ 616,08</td></tr>
                                <tr><td className="p-3">De R$ 9.922,29 a R$ 13.167,00</td><td className="p-3 text-center">15,0%</td><td className="p-3 text-center">R$ 1.360,25</td></tr>
                                <tr><td className="p-3">De R$ 13.167,01 a R$ 16.380,38</td><td className="p-3 text-center">22,5%</td><td className="p-3 text-center">R$ 2.347,78</td></tr>
                                <tr><td className="p-3">Acima de R$ 16.380,38</td><td className="p-3 text-center">27,5%</td><td className="p-3 text-center">R$ 3.166,80</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                        <p><strong>Fonte Oficial:</strong> Dados baseados na <a href="http://www.planalto.gov.br/ccivil_03/leis/l10101.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Lei nº 10.101/2000</a> e atualizações da <a href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Receita Federal do Brasil</a>.</p>
                    </div>
                </div>

                {/* Erros Comuns */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <AlertCircle className="w-8 h-8 text-yellow-500 shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-yellow-200 mb-2">Erros Comuns ao Calcular a PLR</h3>
                            <p className="text-yellow-100/80">Ao tentar prever o valor a receber na **Calculadora de PLR**, muitos trabalhadores cometem equívocos que geram frustração no dia do pagamento.</p>
                        </div>
                    </div>
                    <ul className="space-y-4 text-yellow-100/70">
                        <li className="flex gap-3">
                            <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span><strong>1. Ignorar a Soma Anual:</strong> O Imposto de Renda é calculado sobre o total recebido no ano-calendário. Se você recebeu R$ 7.000 em fevereiro (isento) e recebe mais R$ 7.000 em dezembro, a base de cálculo será R$ 14.000. O imposto incidirá sobre o total, descontando o que já foi pago (se houver).</span>
                        </li>
                        <li className="flex gap-3">
                            <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span><strong>2. Confundir PLR com Bônus/Prêmio:</strong> Bônus discricionários (sem regras prévias em acordo coletivo) têm natureza salarial e sofrem incidência de INSS e FGTS. A PLR legítima é isenta destes encargos. Você pode conferir a diferença no valor líquido usando nossa <Link to="/calculadoras/salario-liquido" className="underline hover:text-yellow-200">calculadora de salário líquido</Link>.</span>
                        </li>
                        <li className="flex gap-3">
                            <XCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span><strong>3. Achar que incide Pensão Alimentícia automaticamente:</strong> O STJ pacificou que a PLR **não entra** na base de cálculo da pensão alimentícia, salvo se houver cláusula expressa no acordo de divórcio ou sentença judicial determinando o contrário.</span>
                        </li>
                    </ul>
                </div>

                {/* Como Calcular a PLR (Passo a Passo) */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                            <Calculator className="w-6 h-6 text-blue-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                            Como Calcular a PLR (Passo a Passo)
                        </h2>
                    </div>

                    <p className="text-gray-400 mb-6">
                        O cálculo do valor bruto depende do modelo da empresa (Metas Corporativas ou Convenção Coletiva), mas a nossa **Calculadora PLR** utiliza a lógica universal do Imposto de Renda 2025 descrita abaixo para definir o valor líquido.
                    </p>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Fórmula do Imposto Devido</h3>
                            <p className="text-sm text-gray-300 mb-3">Para encontrar o valor real que cairá na conta, utilize a fórmula:</p>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-6 font-mono text-sm text-blue-300 overflow-x-auto">
                                $$(Valor~Total~PLR \times Alíquota) - Parcela~a~Deduzir = IR~a~Pagar$$
                            </div>

                            <h3 className="text-lg font-bold text-white mb-4">Exemplo Prático 1: Analista de Marketing (Setor de Serviços)</h3>
                            <ul className="space-y-1.5 text-xs text-gray-300">
                                <li>• <strong>PLR Bruta:</strong> R$ 12.000,00</li>
                                <li>• <strong>Faixa na Tabela:</strong> De R$ 9.922,29 a R$ 13.167,00 (Alíquota de 15%)</li>
                                <li className="font-bold mt-2 text-white">Cálculo:</li>
                                <li>1. Multiplicação: R$ 12.000 × 15% = R$ 1.800,00</li>
                                <li>2. Dedução: R$ 1.800,00 - R$ 1.360,25 (da tabela)</li>
                                <li>3. <strong>Imposto Devido:</strong> R$ 439,75</li>
                                <li>4. <strong>Valor Líquido:</strong> R$ 11.560,25</li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white">Exemplo Prático 2: Executivo (Teto da Tabela)</h3>
                            <ul className="space-y-1.5 text-xs text-gray-300">
                                <li>• <strong>PLR Bruta:</strong> R$ 50.000,00</li>
                                <li>• <strong>Faixa na Tabela:</strong> Acima de R$ 16.380,38 (Alíquota de 27,5%)</li>
                                <li className="font-bold mt-2 text-white">Cálculo:</li>
                                <li>1. Multiplicação: R$ 50.000 × 27,5% = R$ 13.750,00</li>
                                <li>2. Dedução: R$ 13.750,00 - R$ 3.166,80</li>
                                <li>3. <strong>Imposto Devido:</strong> R$ 10.583,20</li>
                                <li>4. <strong>Alíquota Efetiva:</strong> Apenas 21,1% (bem abaixo dos 27,5% nominais).</li>
                            </ul>
                            <p className="text-sm text-gray-300 mt-4">
                                É esse cálculo detalhado e progressivo que a **Calculadora de PLR** executa em segundos, permitindo que você planeje seus investimentos com o valor exato. Se você deseja aplicar essa quantia, confira nosso guia sobre <Link to="/blog/investimentos" className="text-blue-400 hover:underline">investimentos para iniciantes</Link>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Regras Específicas: Calendário PLR Bancários 2025 */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Regras Específicas: Calculadora PLR Bancários 2025</h2>
                    <p className="text-gray-400 mb-6">
                        O setor bancário possui a convenção mais complexa do país. O cálculo é dividido em duas partes e possui "aceleradores" baseados no lucro do banco.
                    </p>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                            <span><strong>1. Regra Básica:</strong> 90% do Salário + Valor Fixo (ajustado pelo INPC). Se o total distribuído pelo banco for menor que 5% do lucro líquido, esse valor pode ser aumentado até chegar a 2,2 salários.</span>
                        </li>
                        <li className="flex gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                            <span><strong>2. Parcela Adicional:</strong> Distribuição linear de 2,2% do Lucro Líquido do banco dividido pelo número de funcionários, com um teto específico definido na CCT.</span>
                        </li>
                        <li className="flex gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                            <span><strong>3. Antecipação:</strong> Paga geralmente até setembro, correspondente a cerca de 60% (percentual definido na CCT) da regra básica, descontando-se do valor final em março.</span>
                        </li>
                    </ul>
                </div>

                {/* Casos Especiais e Elegibilidade */}
                <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Casos Especiais e Elegibilidade</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Fui demitido, recebo PLR?</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                Sim. A <a href="https://www.tst.jus.br/sumulas" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Súmula 451 do TST</a> garante o pagamento proporcional aos meses trabalhados para empregados demitidos sem justa causa. O cálculo é de 1/12 avos por mês trabalhado (ou fração superior a 14 dias). Para calcular exatamente suas verbas rescisórias, utilize nossa <Link to="/calculadoras/rescisao" className="text-blue-400 hover:underline">calculadora de rescisão</Link>.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Pedi demissão, tenho direito?</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                Historicamente não, mas a jurisprudência mudou em 2025. Decisões recentes (como o caso Jeitto/TST) indicam que o pedido de demissão não retira o direito à PLR proporcional, pois o funcionário contribuiu para o resultado. Consulte o acordo coletivo da sua categoria.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Estagiários e Aprendizes recebem?</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                Legalmente, não. A Lei 10.101/2000 não abrange estagiários. Se a empresa pagar PLR a estagiários nos mesmos moldes dos funcionários, corre o risco de criar vínculo empregatício. O correto para estagiários são prêmios por desempenho tributados normalmente.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-2 text-lg">Licença Maternidade e Afastamentos</h3>
                            <p className="text-sm text-gray-400 mb-3">
                                Para a PLR, a licença-maternidade é considerada tempo de serviço efetivo na maioria das convenções (como a dos bancários), não havendo desconto na proporcionalidade. Importante: O STF definiu que a licença começa a contar apenas após a alta hospitalar da mãe ou do bebê (ADI 6327), o que estende o período de estabilidade e recebimento.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <FAQ
                    items={PLR_FAQS}
                    title="Perguntas Frequentes sobre Calculadora de PLR"
                    className="py-12"
                    showSocialProof={false}
                />
            </div>
        </section>
    );
}
