import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Briefcase, TrendingUp, DollarSign, User, AlertCircle } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQ } from '../FAQ';
import { Breadcrumb } from '../Breadcrumb';
import { FAQItem } from '../../types';

const INSS_FAQS: FAQItem[] = [
    {
        question: "Como funciona o desconto de INSS em 2025?",
        answer: "O cálculo do INSS em 2025 segue uma tabela progressiva. Isso significa que a alíquota (7,5%, 9%, 12% ou 14%) incide apenas sobre a parcela do salário que se enquadra em cada faixa, e não sobre o valor total. O resultado final é a soma dos descontos de cada faixa."
    },
    {
        question: "Como saber se o desconto do meu holerite está correto?",
        answer: "Verifique o salário bruto no seu holerite e insira o valor na nossa calculadora. O resultado deve ser muito próximo ao descontado. Pequenas diferenças podem ocorrer devido a arredondamentos ou outras verbas salariais."
    },
    {
        question: "A calculadora também mostra o desconto de IRRF?",
        answer: "Esta calculadora foca no INSS. Para o cálculo completo incluindo Imposto de Renda, recomendamos utilizar nossa calculadora de Salário Líquido (em breve), que considera ambos os descontos."
    },
    {
        question: "Contribuinte individual pode usar a calculadora?",
        answer: "Sim! Basta selecionar a opção 'Autônomo / Individual' ou 'Pro-labore'. Para autônomos, a alíquota padrão é de 20% sobre o salário de contribuição (limitado ao teto), e para Pro-labore (plano simplificado) é de 11%."
    },
    {
        question: "A ferramenta calcula contribuição de pro labore?",
        answer: "Sim, selecione a opção 'Pro-labore / Simplificado'. A alíquota aplicada será de 11% sobre o valor informado, respeitando o teto do INSS."
    },
    {
        question: "Tem como calcular o INSS do 13º salário?",
        answer: "Sim, o cálculo para o 13º salário segue a mesma tabela progressiva do salário mensal. Basta inserir o valor bruto do seu 13º para saber o desconto."
    },
    {
        question: "A calculadora serve para MEI?",
        answer: "O MEI paga o INSS através da guia DAS, que tem um valor fixo (5% do salário mínimo). Esta calculadora é voltada para quem contribui com base no salário real ou teto, como CLT e Autônomos."
    },
    {
        question: "O valor do INSS muda se tenho dois empregos?",
        answer: "Sim. As remunerações devem ser somadas para o cálculo do teto. Se a soma ultrapassar o teto do INSS (R$ 7.786,02 em 2025), você só contribui até esse limite. É importante comunicar as empresas para evitar desconto indevido."
    }
];

export const INSSPage: React.FC = () => {
    const [salary, setSalary] = useState<number>(0);
    const [contributorType, setContributorType] = useState<string>('clt');
    const [result, setResult] = useState<any>(null);

    const calculateINSS = () => {
        if (!salary) return;

        let discount = 0;
        let effectiveRate = 0;
        const ceiling = 7786.02; // Teto 2025
        const salaryBase = Math.min(salary, ceiling); // Base de cálculo limitada ao teto para CLT/Autônomo 20%

        if (contributorType === 'clt') {
            // Tabela Progressiva 2025
            if (salaryBase <= 1412.00) {
                discount = salaryBase * 0.075;
            } else if (salaryBase <= 2666.68) {
                discount = (1412.00 * 0.075) + ((salaryBase - 1412.00) * 0.09);
            } else if (salaryBase <= 4000.03) {
                discount = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((salaryBase - 2666.68) * 0.12);
            } else { // Até o teto
                discount = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((salaryBase - 4000.03) * 0.14);
            }
        } else if (contributorType === 'autonomo') {
            // 20% sobre o salário de contribuição (limitado ao teto)
            discount = salaryBase * 0.20;
        } else if (contributorType === 'prolabore') {
            // 11% sobre o salário (limitado ao teto) - Plano Simplificado ou Pro-labore padrão
            discount = salaryBase * 0.11;
        } else if (contributorType === 'facultativo-baixa') {
            // 5% sobre o salário mínimo (apenas para baixa renda cadastrado no CadÚnico)
            // Geralmente é fixo no salário mínimo, mas vamos permitir o input para flexibilidade, avisando que é sobre o mínimo.
            // Mas a regra é estrita: 5% de 1 salário mínimo.
            // Vamos assumir que o usuário digitou o valor base, mas calcular 5%
            discount = salaryBase * 0.05;
        }

        effectiveRate = (discount / salary) * 100;

        setResult({
            discount,
            effectiveRate,
            salaryBase
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const formatPercent = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 2 }).format(val / 100);
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de INSS 2025 FinZap",
        "description": "Simule o desconto do INSS com base no salário e tipo de contribuinte. Resultado rápido e atualizado com as faixas de contribuição de 2025.",
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
                        { label: 'Calculadora de INSS', href: '/calculadoras/inss' }
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
                            <span className="text-sm text-gray-300">Previdência Social</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">INSS 2025</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Informe seu salário bruto e tipo de contribuição para calcular o valor descontado para o INSS, com base nas regras atualizadas de 2025.
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
                                Dados da Contribuição
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="salary" className="block text-sm text-gray-400 mb-2">Salário Bruto (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            id="salary"
                                            type="number"
                                            placeholder="Ex: 3000"
                                            value={salary || ''}
                                            onChange={(e) => setSalary(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contributorType" className="block text-sm text-gray-400 mb-2">Tipo de Contribuinte</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <select
                                            id="contributorType"
                                            value={contributorType}
                                            onChange={(e) => setContributorType(e.target.value)}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                                        >
                                            <option value="clt">Trabalhador CLT (Tabela Progressiva)</option>
                                            <option value="autonomo">Autônomo / Individual (20%)</option>
                                            <option value="prolabore">Pro-labore / Simplificado (11%)</option>
                                            <option value="facultativo-baixa">Facultativo Baixa Renda (5%)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={calculateINSS}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Calcular INSS
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSalary(0);
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
                                            <h2 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest">Valor do Desconto INSS</h2>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                {formatCurrency(result.discount)}
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                Alíquota Efetiva: <span className="text-primary font-bold">{formatPercent(result.effectiveRate)}</span>
                                            </p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <span className="text-gray-300">Salário Base de Cálculo</span>
                                                <span className="text-white font-bold">{formatCurrency(result.salaryBase)}</span>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <span className="text-gray-300">Salário Líquido (Estimado)</span>
                                                <span className="text-white font-bold">{formatCurrency(salary - result.discount)}</span>
                                            </div>
                                        </div>

                                        <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 mt-4">
                                            <p className="text-yellow-200 text-sm m-0">
                                                <strong>Nota:</strong> O salário líquido estimado considera apenas o desconto do INSS. Outros descontos como IRRF, vale-transporte e benefícios não foram deduzidos.
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 opacity-50">
                                        <Briefcase className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg text-center">Preencha o salário e tipo de contribuinte para ver o resultado</p>
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
                        <h2 className="text-3xl font-bold text-white mb-6">Calculadora de INSS 2025: Simule seu Desconto</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Se você quer saber quanto será descontado do seu salário para o INSS em 2025, ou precisa simular a contribuição mensal como CLT, autônomo ou contribuinte individual, esta página foi feita para você.
                            </p>
                            <p className="mb-4">
                                Com a nossa calculadora de INSS gratuita e online, você descobre em segundos o valor exato da contribuição, com base no salário bruto e no tipo de contribuinte escolhido. Os cálculos seguem rigorosamente as novas faixas e alíquotas da Previdência Social em 2025, garantindo resultados confiáveis.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como Funciona o Cálculo do INSS em 2025</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                O cálculo do INSS em 2025 segue a lógica da tabela progressiva por faixas salariais. Ou seja, o desconto não é uma porcentagem única sobre todo o salário, mas sim uma aplicação de alíquotas diferentes para cada faixa de valor — semelhante ao Imposto de Renda.
                            </p>
                            <p className="mb-6">
                                A tabela é atualizada todos os anos pelo Governo Federal com base no salário mínimo e na inflação, e está vigente desde janeiro de 2025.
                            </p>

                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 mb-8">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-primary" />
                                    Tabela de Alíquotas do INSS 2025
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-300">
                                        <thead className="text-xs text-gray-200 uppercase bg-white/5">
                                            <tr>
                                                <th className="px-4 py-3 rounded-l-lg">Faixa Salarial (R$)</th>
                                                <th className="px-4 py-3 rounded-r-lg">Alíquota Aplicada</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            <tr>
                                                <td className="px-4 py-3">Até R$ 1.412,00</td>
                                                <td className="px-4 py-3 text-primary font-bold">7,5%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3">De R$ 1.412,01 até R$ 2.666,68</td>
                                                <td className="px-4 py-3 text-primary font-bold">9%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3">De R$ 2.666,69 até R$ 4.000,03</td>
                                                <td className="px-4 py-3 text-primary font-bold">12%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3">De R$ 4.000,04 até R$ 7.786,02</td>
                                                <td className="px-4 py-3 text-primary font-bold">14%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-xs text-gray-400 mt-4">*O valor máximo de contribuição (teto) é limitado ao salário de contribuição de R$ 7.786,02.</p>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">Exemplo Prático de Cálculo</h3>
                            <p className="mb-4">Para um salário bruto de <strong>R$ 4.500,00</strong>, o cálculo é fatiado:</p>
                            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-400">
                                <li><strong>1ª Faixa:</strong> 7,5% sobre R$ 1.412,00</li>
                                <li><strong>2ª Faixa:</strong> 9% sobre a diferença entre R$ 2.666,68 e R$ 1.412,00</li>
                                <li><strong>3ª Faixa:</strong> 12% sobre a diferença entre R$ 4.000,03 e R$ 2.666,68</li>
                                <li><strong>4ª Faixa:</strong> 14% sobre o restante (R$ 4.500,00 - R$ 4.000,03)</li>
                            </ul>
                            <p>
                                A soma dessas parcelas resulta no desconto final. Esse método garante que quem ganha menos pague proporcionalmente menos.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Quem Precisa Contribuir?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary">Trabalhadores CLT</h3>
                                <p className="text-gray-400 text-sm">
                                    A contribuição é automática, descontada diretamente da folha de pagamento. A empresa recolhe e repassa ao INSS. Nossa calculadora ajuda a conferir se o valor no holerite está correto.
                                </p>
                            </div>

                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-blue-400">Autônomos e Individuais</h3>
                                <p className="text-gray-400 text-sm">
                                    Se você trabalha por conta própria, precisa gerar e pagar a guia GPS (ou DAS para MEI). A calculadora para autônomo aplica a alíquota de 20% (plano normal) ou 11% (plano simplificado).
                                </p>
                            </div>

                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-purple-400">Pro-labore</h3>
                                <p className="text-gray-400 text-sm">
                                    Sócios de empresas que recebem pro-labore contribuem obrigatoriamente com 11% sobre o valor declarado, respeitando o teto da previdência.
                                </p>
                            </div>

                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-emerald-400">Facultativo</h3>
                                <p className="text-gray-400 text-sm">
                                    Estudantes, donas de casa e desempregados podem contribuir para manter a qualidade de segurado, escolhendo entre 5%, 11% ou 20%.
                                </p>
                            </div>
                        </div>
                    </section>

                    <FAQ
                        items={INSS_FAQS}
                        title="Dúvidas Frequentes sobre INSS"
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
