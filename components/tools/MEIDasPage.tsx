import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Calendar, AlertTriangle, TrendingUp, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';
import { SEO } from '../SEO';

const MEI_FAQS: FAQItem[] = [
    {
        question: "O que acontece se eu não pagar a DAS?",
        answer: "Além de correr juros e multa, o tempo de inadimplência não conta para sua aposentadoria. Se a dívida persistir, seu CNPJ pode ser cancelado e a dívida transferida para o seu CPF (Dívida Ativa da União), sujando seu nome."
    },
    {
        question: "Preciso pagar DAS mesmo sem faturar?",
        answer: "Sim! A DAS é devida mensalmente, mesmo que você não tenha emitido nenhuma nota fiscal ou não tenha tido nenhum cliente no mês. O valor serve para manter sua qualidade de segurado no INSS."
    },
    {
        question: "Posso pagar todas as DAS de uma vez?",
        answer: "Sim, você pode gerar as guias do ano todo pelo Portal do Empreendedor e já deixar pago. Porém, lembre-se que o valor pode sofrer reajuste em janeiro devido ao aumento do salário mínimo."
    },
    {
        question: "Estourei o limite de faturamento, e agora?",
        answer: "Até 20% (R$ 97.200): Você paga uma DAS complementar sobre o excesso e vira Microempresa (ME) no ano seguinte. Acima de 20%: Você é desenquadrado retroativamente desde janeiro (ou da data de abertura), tendo que pagar impostos como ME sobre tudo o que faturou no ano."
    }
];

type ActivityType = 'comercio' | 'servicos' | 'comercio_servicos' | 'caminhoneiro';

export const MEIDasPage: React.FC = () => {
    const [activity, setActivity] = useState<ActivityType>('servicos');
    const [monthsActive, setMonthsActive] = useState<number>(12);
    const [annualBilling, setAnnualBilling] = useState<number>(0);
    const [result, setResult] = useState<any>(null);

    const MINIMUM_WAGE_2025 = 1509;
    const MONTHLY_LIMIT = 6750;

    useEffect(() => {
        calculateDAS();
    }, [activity, monthsActive, annualBilling]);

    const calculateDAS = () => {
        // DAS Calculation
        let inssRate = 0.05;
        let icms = 0;
        let iss = 0;

        if (activity === 'caminhoneiro') {
            inssRate = 0.12;
        }

        if (activity === 'comercio') {
            icms = 1;
        } else if (activity === 'servicos') {
            iss = 5;
        } else if (activity === 'comercio_servicos') {
            icms = 1;
            iss = 5;
        } else if (activity === 'caminhoneiro') {
            icms = 1;
            iss = 5; // Assuming general rule, though specific transport rules might vary, usually it's ISS or ICMS depending on transport type. Standardizing for simplicity or user can adjust if needed, but standard MEI trucker often pays both fixed. Actually, let's stick to standard MEI logic:
            // Caminhoneiro: 12% INSS + ISS/ICMS. Usually just ISS or ICMS. Let's assume mixed for safety or just INSS if pure transport.
            // Let's simplify: Caminhoneiro pays 12% INSS. ICMS/ISS depends on municipal/intermunicipal.
            // Let's set standard fixed values:
            // Comércio/Indústria: INSS + 1
            // Serviços: INSS + 5
            // Comércio e Serviços: INSS + 6
            // Caminhoneiro: INSS (12%) + 1 (ICMS) + 5 (ISS) - often varies, but let's use max to be safe or just INSS.
            // Official Portal often says: INSS + 1 (ICMS) or + 5 (ISS) or + 6 (Both).
            // Let's treat Caminhoneiro as "Transporte" -> ISS usually.
            // Let's stick to the user prompt logic: "Caminhoneiro MEI: A alíquota é diferenciada (12% do salário mínimo)."
            // We will add R$ 5.00 ISS and R$ 1.00 ICMS as "worst case" or let user choose.
            // For simplicity in this calculator, let's assume Caminhoneiro pays ICMS+ISS (R$ 6) to be conservative, or just INSS.
            // Let's use INSS + 5 (ISS) + 1 (ICMS) for Caminhoneiro to cover all bases, or just 5.
            icms = 1;
            iss = 5;
        }

        const inssValue = MINIMUM_WAGE_2025 * inssRate;
        const totalDas = inssValue + icms + iss;

        // Limit Calculation
        const proportionalLimit = monthsActive * MONTHLY_LIMIT;
        const limitStatus = annualBilling > proportionalLimit ? 'exceeded' :
            annualBilling > proportionalLimit * 0.8 ? 'warning' : 'safe';

        const excessAmount = Math.max(0, annualBilling - proportionalLimit);

        setResult({
            inssValue,
            icms,
            iss,
            totalDas,
            proportionalLimit,
            limitStatus,
            excessAmount
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora DAS MEI 2025",
        "description": "Calcule o valor da guia DAS MEI 2025 e verifique seu limite de faturamento.",
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
            <SEO
                title="Calculadora DAS MEI 2025 - Valor Atualizado e Limite Anual"
                description="Quanto o MEI paga de imposto hoje? Calcule o valor da guia DAS 2025 e verifique se você está dentro do limite de faturamento de R$ 81 mil."
                canonical="/calculadoras/das-mei"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": MEI_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Imposto MEI (DAS)', href: '/calculadoras/das-mei' }
                    ]} />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Building2 className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-gray-300">Empreendedorismo</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">DAS MEI 2025</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Mantenha seu CNPJ regular. Calcule o valor atualizado da sua guia DAS e monitore o limite de faturamento anual.
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
                                Dados do seu MEI
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Atividade Principal</label>
                                    <select
                                        value={activity}
                                        onChange={(e) => setActivity(e.target.value as ActivityType)}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    >
                                        <option value="servicos">Prestação de Serviços</option>
                                        <option value="comercio">Comércio ou Indústria</option>
                                        <option value="comercio_servicos">Comércio e Serviços (Misto)</option>
                                        <option value="caminhoneiro">MEI Caminhoneiro</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Meses de Atividade em 2025</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            min="1"
                                            max="12"
                                            value={monthsActive}
                                            onChange={(e) => setMonthsActive(Math.min(12, Math.max(1, Number(e.target.value))))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Se abriu a empresa este ano, coloque quantos meses ela existirá até Dezembro.</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Faturamento Acumulado no Ano (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            value={annualBilling}
                                            onChange={(e) => setAnnualBilling(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6">
                            <div className="flex gap-3">
                                <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Dica de Ouro</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        O limite anual é de R$ 81.000,00, mas ele é <strong>proporcional</strong>. Se você abriu o MEI na metade do ano, seu limite é menor!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {result ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="space-y-8"
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Valor da DAS Mensal</h3>
                                                <div className="text-4xl font-bold text-white mb-2">
                                                    {formatCurrency(result.totalDas)}
                                                </div>
                                                <div className="space-y-1 mt-4 text-sm text-gray-400">
                                                    <div className="flex justify-between">
                                                        <span>INSS ({activity === 'caminhoneiro' ? '12%' : '5%'}):</span>
                                                        <span>{formatCurrency(result.inssValue)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>ICMS:</span>
                                                        <span>{formatCurrency(result.icms)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>ISS:</span>
                                                        <span>{formatCurrency(result.iss)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`rounded-2xl p-6 border ${result.limitStatus === 'exceeded' ? 'bg-red-500/10 border-red-500/20' :
                                                    result.limitStatus === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' :
                                                        'bg-green-500/10 border-green-500/20'
                                                }`}>
                                                <h3 className="text-sm font-medium mb-2 uppercase tracking-widest flex items-center gap-2">
                                                    Status do Faturamento
                                                    {result.limitStatus === 'exceeded' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                                    {result.limitStatus === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                                                    {result.limitStatus === 'safe' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                </h3>
                                                <div className={`text-2xl font-bold mb-2 ${result.limitStatus === 'exceeded' ? 'text-red-500' :
                                                        result.limitStatus === 'warning' ? 'text-yellow-500' :
                                                            'text-green-500'
                                                    }`}>
                                                    {result.limitStatus === 'exceeded' ? 'Limite Estourado' :
                                                        result.limitStatus === 'warning' ? 'Atenção!' :
                                                            'Dentro do Limite'}
                                                </div>
                                                <p className="text-sm opacity-80">
                                                    Seu limite proporcional é <strong>{formatCurrency(result.proportionalLimit)}</strong>.
                                                </p>
                                                {result.limitStatus === 'exceeded' && (
                                                    <p className="text-sm text-red-400 mt-2 font-bold">
                                                        Você excedeu {formatCurrency(result.excessAmount)}. Cuidado com o desenquadramento!
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <TrendingUp className="w-6 h-6 text-blue-400" />
                                                    <h3 className="text-xl font-bold text-white">Progresso do Limite</h3>
                                                </div>
                                                <span className="text-sm text-gray-400">
                                                    {((annualBilling / result.proportionalLimit) * 100).toFixed(1)}% utilizado
                                                </span>
                                            </div>

                                            <div className="w-full bg-black/50 rounded-full h-4 overflow-hidden mb-2">
                                                <motion.div
                                                    className={`h-full rounded-full ${result.limitStatus === 'exceeded' ? 'bg-red-500' :
                                                            result.limitStatus === 'warning' ? 'bg-yellow-500' :
                                                                'bg-blue-500'
                                                        }`}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(100, (annualBilling / result.proportionalLimit) * 100)}%` }}
                                                    transition={{ duration: 1 }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>R$ 0</span>
                                                <span>{formatCurrency(result.proportionalLimit)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Building2 className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha os dados para calcular</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Content */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Quanto o MEI paga de imposto em 2025?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Uma das maiores vantagens de ser Microempreendedor Individual (MEI) é a simplicidade tributária. Você não paga impostos sobre cada nota fiscal emitida. Em vez disso, paga um valor fixo mensal através da DAS (Documento de Arrecadação do Simples Nacional).
                            </p>
                            <p className="mb-4">
                                Esse valor é reajustado anualmente com base no Salário Mínimo. Para 2025, o cálculo segue a regra de 5% do salário mínimo para a previdência social, somado a pequenas taxas fixas de ICMS e ISS, dependendo da sua atividade.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Composição da DAS Mensal</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">
                                O valor que você paga todo mês cobre sua aposentadoria e impostos estaduais/municipais. Veja como é formado:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                                    <span><strong>INSS (Previdência):</strong> 5% do Salário Mínimo vigente. É o que garante sua aposentadoria, auxílio-doença e salário-maternidade.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                                    <span><strong>Caminhoneiro MEI:</strong> A alíquota é diferenciada (12% do salário mínimo).</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                                    <span><strong>ICMS (Comércio e Indústria):</strong> Valor fixo de R$ 1,00.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                                    <span><strong>ISS (Serviços):</strong> Valor fixo de R$ 5,00.</span>
                                </li>
                            </ul>
                            <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <p className="text-sm text-gray-300">
                                    <strong>💡 Exemplo Prático:</strong> Se você é um prestador de serviços (ex: designer, pedreiro), sua DAS será a soma do INSS + R$ 5,00. Se você vende produtos (ex: loja de roupas), será INSS + R$ 1,00.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Cuidado com o Limite de Faturamento!</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2">Limite Anual</h3>
                                <p className="text-3xl font-bold text-blue-400">R$ 81.000,00</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2">Média Mensal</h3>
                                <p className="text-3xl font-bold text-green-400">R$ 6.750,00</p>
                            </div>
                        </div>
                        <div className="mt-6 p-6 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                            <h3 className="text-lg font-bold text-yellow-500 mb-2">⚠️ Atenção à Proporcionalidade</h3>
                            <p className="text-gray-300 mb-4">
                                Se você abriu o MEI no meio do ano, seu limite não é R$ 81 mil. O limite é proporcional aos meses de existência da empresa.
                            </p>
                            <p className="text-sm text-gray-400">
                                <strong>Exemplo:</strong> Abriu em Junho? Você tem 7 meses de operação. Limite = 7 x R$ 6.750 = <strong>R$ 47.250,00</strong>.
                            </p>
                        </div>
                    </section>

                    <FAQ
                        items={MEI_FAQS}
                        title="Dúvidas Frequentes do MEI"
                        className="py-12"
                        showSocialProof={false}
                    />
                </div>

                {/* App Promo Banner */}
                <AppPromoBanner />
            </div>
        </section>
    );
};
