import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calculator, AlertTriangle, CheckCircle2, AlertCircle, Info, DollarSign, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const UNEMPLOYMENT_FAQS: FAQItem[] = [
    {
        question: "Qual o prazo para dar entrada no Seguro-Desemprego?",
        answer: "Para o trabalhador formal, o prazo é do 7º ao 120º dia (corridos) após a data da demissão. Para empregados domésticos, o prazo é do 7º ao 90º dia. Perder esse prazo resulta na perda do direito ao benefício."
    },
    {
        question: "Quem pede demissão tem direito ao Seguro-Desemprego?",
        answer: "Não. O benefício é exclusivo para demissões involuntárias (sem justa causa). Quem pede demissão perde o direito ao seguro, mas mantém outros direitos que podem ser calculados na nossa ferramenta de cálculo de férias."
    },
    {
        question: "O Seguro-Desemprego conta para aposentadoria?",
        answer: "Sim, mas não automaticamente. O período em que você recebe o seguro pode contar como tempo de contribuição, desde que você pague a contribuição previdenciária (confira as alíquotas na nossa calculadora de INSS) como segurado facultativo ou se houver compensação automática."
    },
    {
        question: "Recebo a primeira parcela quando?",
        answer: "A liberação da primeira parcela ocorre 30 dias após a data do requerimento (protocolo do pedido), seguindo o calendário de pagamentos da CAIXA."
    },
    {
        question: "MEI tem direito ao Seguro-Desemprego?",
        answer: "Em regra, não, pois o sistema entende que o MEI possui fonte de renda. Contudo, se você comprovar que o MEI está inativo (sem faturamento) e que sua renda vinha exclusivamente do emprego CLT, é possível conseguir o benefício mediante recurso administrativo."
    },
    {
        question: "Qual o valor máximo (teto) do Seguro-Desemprego em 2025?",
        answer: "O valor máximo que um trabalhador pode receber por parcela em 2025 é R$ 2.424,11, independentemente de quão alto era o seu salário anterior."
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

        // Se não tiver nenhum salário preenchido, reseta o resultado sem erro
        if (salaries.length === 0) {
            setResult(null);
            return;
        }

        // Regra para média salarial:
        // A média é calculada com base nos últimos 3 salários (ou quantos houver se for menos que 3)
        // O texto diz "média dos seus três últimos salários".
        // Implementação: Considerar 3, se faltar algum, usa-se a média dos que existem (lógica comum) ou força 3?
        // O texto diz "Se você não trabalhou integralmente em algum dos últimos três meses, o cálculo considera o salário do mês completo de trabalho."
        // Vamos usar a média aritmética simples dos valores preenchidos para ser mais flexível, mas o ideal é ter os 3.
        // Assumindo que o usuário preencha o que tem.

        let averageSalary = salaries.reduce((a, b) => a + b, 0) / salaries.length;

        // Se o usuário preencheu 3 campos, divide por 3.
        // Se preencheu só 2, divide por 2?
        // A lei diz: média dos salários dos últimos 3 meses anteriores à dispensa.
        // Vamos considerar divisão por 3 se todos preenchidos, ou pelos preenchidos.

        if (s1 && s2 && s3) averageSalary = (s1 + s2 + s3) / 3;
        else if (salaries.length > 0) averageSalary = salaries.reduce((a, b) => a + b, 0) / salaries.length;
        else averageSalary = 0;

        const months = parseInt(monthsWorked);
        const request = parseInt(requestCount);

        if (months === 0) {
            setResult(null);
            return;
        }

        // Tabela Oficial 2025
        let installmentValue = 0;

        if (averageSalary <= 2138.76) {
            installmentValue = averageSalary * 0.8;
        } else if (averageSalary <= 3564.96) {
            installmentValue = 1711.01 + (averageSalary - 2138.76) * 0.5;
        } else {
            installmentValue = 2424.11; // Teto Fixo
        }

        // O valor do benefício nunca será inferior ao salário mínimo (R$ 1.518,00 em 2025)
        if (installmentValue < 1518.00) {
            installmentValue = 1518.00;
        }

        // Calcular Quantidade de Parcelas
        let installmentCount = 0;

        if (request === 1) {
            if (months >= 12 && months <= 23) installmentCount = 4;
            else if (months >= 24) installmentCount = 5;
            else installmentCount = 0; // Menos de 12 meses na 1ª solicitação não dá direito
        } else if (request === 2) {
            if (months >= 9 && months <= 11) installmentCount = 3;
            else if (months >= 12 && months <= 23) installmentCount = 4;
            else if (months >= 24) installmentCount = 5;
            else installmentCount = 0;
        } else {
            // 3ª ou mais
            if (months >= 6 && months <= 11) installmentCount = 3;
            else if (months >= 12 && months <= 23) installmentCount = 4;
            else if (months >= 24) installmentCount = 5;
            else installmentCount = 0;
        }

        // Se não tiver direito a parcelas, zera o valor?
        // O usuário pode querer ver a simulação de valor mesmo sem tempo, mas o correto é dizer que não tem direito.
        // Vamos manter o cálculo de valor mas indicar 0 parcelas se for o caso, ou null.

        if (installmentCount === 0) {
            // Caso especial: mostra mensagem ou zera
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
        "name": "Calculadora Seguro-Desemprego 2025",
        "url": "https://junny.com.br/calculadoras/seguro-desemprego",
        "description": "Calcule agora o valor exato e a quantidade de parcelas do seu Seguro-Desemprego em 2025. Regras atualizadas, tabela oficial e prazos de pagamento.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "featureList": [
            "Cálculo Tabela 2025",
            "Simulação de Parcelas",
            "Regras Atualizadas",
            "Teto do Benefício"
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
                title="Calculadora Seguro-Desemprego 2025: Valor, Parcelas e Tabela Oficial"
                description="Calcule agora o valor exato e a quantidade de parcelas do seu Seguro-Desemprego em 2025. Regras atualizadas, tabela oficial e prazos de pagamento."
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Seguro Desemprego', href: '/calculadoras/seguro-desemprego' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <ShieldCheck className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Trabalhistas e Previdenciárias</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Seguro-Desemprego 2025: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">Simule Valor e Parcelas</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Perder o emprego gera incerteza financeira imediata. O Seguro-Desemprego é um direito fundamental do trabalhador CLT demitido sem justa causa. Nossa ferramenta utiliza as regras oficiais vigentes para 2025 para mostrar exatamente quanto você receberá.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
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
                                    <p className="text-xs text-gray-500">Se houver menos de 3 salários, preencha apenas os correspondentes.</p>
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
                                        <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                                <DollarSign className="w-12 h-12 text-blue-500" />
                                            </div>
                                            <span className="text-sm text-blue-400 block mb-2">Valor da Parcela</span>
                                            <span className="text-3xl md:text-4xl font-bold text-white block">
                                                {result && result.installmentCount > 0 ? `R$ ${result.installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '---'}
                                            </span>
                                            {result && result.averageSalary > 0 && (
                                                <span className="text-xs text-blue-400/60 mt-2 block">
                                                    Média Salarial: R$ {result.averageSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>
                                            )}
                                        </div>
                                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-2 opacity-5">
                                                <Calendar className="w-12 h-12 text-white" />
                                            </div>
                                            <span className="text-sm text-gray-400 block mb-2">Quantidade de Parcelas</span>
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

                    {/* Sidebar Info */}
                    <div className="lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">

                        {/* Tabela Resumo */}
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <Info className="w-5 h-5 text-blue-500" />
                                Tabela Oficial 2025
                            </h3>
                            <div className="space-y-4">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-xs text-gray-400 mb-1">Menor que R$ 2.138,76</div>
                                    <div className="text-white font-medium">Multiplica-se por 80%</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-xs text-gray-400 mb-1">De R$ 2.138,77 até R$ 3.564,96</div>
                                    <div className="text-white font-medium">Excedente x 50% + R$ 1.711,01</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-xs text-gray-400 mb-1">Acima de R$ 3.564,96</div>
                                    <div className="text-white font-medium">Valor Fixo: R$ 2.424,11 (Teto)</div>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                    * O benefício nunca será menor que R$ 1.518,00 (Salário Mínimo).
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                                Requisitos Básicos
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>Demissão sem justa causa</span>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>Estar desempregado na solicitação</span>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>Não possuir renda própria</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-12 max-w-4xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">

                    {/* Como é calculado */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Como é calculado o Seguro-Desemprego em 2025?</h2>
                        <div className="prose prose-invert max-w-none text-gray-400">
                            <p className="mb-4">
                                O cálculo baseia-se na média dos seus <strong>três últimos salários</strong> anteriores à demissão. O resultado final depende de qual "faixa" salarial essa média se encaixa, seguindo a tabela reajustada pelo Ministério do Trabalho e Emprego.
                            </p>
                            <p className="mb-6">
                                Para trabalhadores que recebem salário variável ou comissões, o cálculo da média é essencial para garantir o valor correto. Se você já tem o valor da sua rescisão em mente, vale a pena conferir nossa calculadora de <Link to="/calculadoras/rescisao" className="text-blue-400 hover:text-blue-300 underline">rescisão de contrato</Link> para ter o panorama financeiro completo.
                            </p>

                            <h3 className="text-xl font-bold text-white mb-4 mt-8">Exemplo de Cálculo Real</h3>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <p className="mb-4">Imagine que a média dos seus últimos 3 salários foi de <strong>R$ 2.500,00</strong>.</p>
                                <ol className="list-decimal list-inside space-y-2 text-gray-400">
                                    <li>Este valor está na segunda faixa da tabela.</li>
                                    <li>O que excede R$ 2.138,76 é <strong>R$ 361,24</strong> (2.500 - 2.138,76).</li>
                                    <li>Multiplicamos o excedente por 50% = <strong>R$ 180,62</strong>.</li>
                                    <li>Somamos a parcela fixa de R$ 1.711,01.</li>
                                    <li className="text-white font-medium">Valor Final da Parcela: R$ 1.891,63.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Como solicitar */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Como solicitar o Seguro-Desemprego (Passo a Passo)</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Acesse o Canal Digital</h3>
                                        <p className="text-sm text-gray-400">Entre no portal Gov.br ou baixe o aplicativo Carteira de Trabalho Digital.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Navegue pelo Menu</h3>
                                        <p className="text-sm text-gray-400">Vá na aba "Benefícios" e selecione a opção "Seguro-Desemprego".</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Inicie o Pedido</h3>
                                        <p className="text-sm text-gray-400">Clique em "Solicitar" e insira o número do Requerimento (10 dígitos).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Confirme</h3>
                                        <p className="text-sm text-gray-400">Siga as instruções, confira seus dados bancários e finalize.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quantas Parcelas */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Quantas parcelas vou receber?</h2>
                        <p className="text-gray-400 mb-6">
                            A quantidade de parcelas (3, 4 ou 5) depende de quanto tempo você trabalhou com carteira assinada nos últimos 36 meses e quantas vezes já solicitou o benefício anteriormente.
                        </p>

                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                                <div className="bg-blue-500/10 px-6 py-3 border-b border-white/5 font-semibold text-white">
                                    Primeira Solicitação
                                </div>
                                <div className="p-6 grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-gray-400">De 12 a 23 meses trabalhados</div>
                                    <div className="text-white text-right font-medium">4 parcelas</div>
                                    <div className="col-span-2 h-px bg-white/5"></div>
                                    <div className="text-gray-400">24 meses ou mais</div>
                                    <div className="text-white text-right font-medium">5 parcelas</div>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                                <div className="bg-blue-500/10 px-6 py-3 border-b border-white/5 font-semibold text-white">
                                    Segunda Solicitação
                                </div>
                                <div className="p-6 grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-gray-400">De 9 a 11 meses trabalhados</div>
                                    <div className="text-white text-right font-medium">3 parcelas</div>
                                    <div className="col-span-2 h-px bg-white/5"></div>
                                    <div className="text-gray-400">De 12 a 23 meses</div>
                                    <div className="text-white text-right font-medium">4 parcelas</div>
                                    <div className="col-span-2 h-px bg-white/5"></div>
                                    <div className="text-gray-400">24 meses ou mais</div>
                                    <div className="text-white text-right font-medium">5 parcelas</div>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                                <div className="bg-blue-500/10 px-6 py-3 border-b border-white/5 font-semibold text-white">
                                    Terceira Solicitação (ou mais)
                                </div>
                                <div className="p-6 grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-gray-400">De 6 a 11 meses trabalhados</div>
                                    <div className="text-white text-right font-medium">3 parcelas</div>
                                    <div className="col-span-2 h-px bg-white/5"></div>
                                    <div className="text-gray-400">De 12 a 23 meses</div>
                                    <div className="text-white text-right font-medium">4 parcelas</div>
                                    <div className="col-span-2 h-px bg-white/5"></div>
                                    <div className="text-gray-400">24 meses ou mais</div>
                                    <div className="text-white text-right font-medium">5 parcelas</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <p className="text-sm text-blue-200">
                                Ao organizar suas finanças, recomendamos planejar seu orçamento comparando com seu <Link to="/calculadoras/salario-liquido" className="text-white underline">salário líquido</Link> habitual e verificando seu saldo do <Link to="/calculadoras/fgts" className="text-white underline">FGTS</Link>, pois o saque-rescisão pode ser decisivo neste período.
                            </p>
                        </div>
                    </div>
                </div>

                <FAQ
                    items={UNEMPLOYMENT_FAQS}
                    title="Perguntas Frequentes (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
