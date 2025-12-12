import React, { Suspense, lazy } from 'react';
import { Plane } from 'lucide-react';
import { VacationCalculator } from './VacationCalculator';
import { Breadcrumb } from '../Breadcrumb';
import { SEO } from '../SEO';
import { FAQ } from '../FAQ';
import { FAQItem } from '../../types';

const AppPromoBanner = lazy(() => import('../AppPromoBanner').then(module => ({ default: module.AppPromoBanner })));

const VACATION_FAQS: FAQItem[] = [
    {
        question: "Qual o desconto máximo de INSS nas férias em 2025?",
        answer: "O desconto máximo de contribuição previdenciária nas férias é de **R$ 951,63** em dezembro de 2025. Isso ocorre porque, mesmo que a remuneração de férias (salário + 1/3) ultrapasse o teto do INSS de R$ 8.157,41, a alíquota progressiva para de incidir sobre o valor excedente, travando o desconto da [contribuição ao INSS](https://junny.com.br/calculadoras/inss) neste limite específico."
    },
    {
        question: "Qual o prazo legal para o pagamento das férias em 2025?",
        answer: "O empregador é obrigado a efetuar o pagamento das férias até **2 dias antes** do início do período de gozo. Se houver atraso no pagamento, a empresa fica sujeita à multa administrativa. Em relação à dobra das férias (pagamento em dobro), o STF decidiu recentemente que ela se aplica principalmente à falta de concessão do descanso no prazo, e não automaticamente pelo simples atraso financeiro."
    },
    {
        question: "Posso vender 10 dias de férias? Vale a pena?",
        answer: "Sim, converter 1/3 das férias em dinheiro (abono pecuniário) é um direito do trabalhador e costuma valer a pena financeiramente. Ao simular na **Calculadora de Férias 2025**, você nota que sobre o valor desses 10 dias vendidos e seu respectivo terço constitucional **não incidem descontos de INSS e Imposto de Renda**, garantindo um valor líquido superior."
    },
    {
        question: "Como calcular férias proporcionais?",
        answer: "O direito a férias proporcionais é calculado na base de 1/12 avos da remuneração para cada mês trabalhado. Pela regra, considera-se como \"mês trabalhado\" qualquer período igual ou superior a 15 dias de serviço dentro do mês civil. Esse cálculo é comum em contratos com menos de um ano ou em rescisões contratuais."
    },
    {
        question: "O INSS incide sobre o 1/3 de férias?",
        answer: "Sim, o terço constitucional sofre tributação normal, mas com uma distinção importante. O terço referente aos dias de descanso (gozo de férias) tem incidência de INSS e IRRF. Já o terço correspondente aos dias convertidos em abono pecuniário (venda de férias) é considerado verba indenizatória, portanto, é isento de descontos."
    },
    {
        question: "Estagiário tem direito a férias?",
        answer: "O estagiário tem direito ao chamado \"Recesso Remunerado\", que consiste em 30 dias de descanso após um ano de contrato, ou proporcional ao tempo estagiado. A principal diferença é que o estagiário recebe o valor da bolsa-auxílio normal durante o recesso, mas **não tem direito ao adicional de 1/3 constitucional** e não sofre descontos previdenciários sobre esse valor."
    },
    {
        question: "Quem define a data das minhas férias?",
        answer: "Segundo a legislação trabalhista (CLT), a palavra final sobre o agendamento das férias cabe ao empregador, visando atender às necessidades da empresa. Contudo, a prática recomendada é o acordo mútuo. Além disso, é proibido por lei iniciar as férias no período de dois dias que antecede feriado ou o descanso semanal remunerado (DSR)."
    }
];

export const VacationPage: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Férias 2025: Simulação Completa (Líquido e Venda)",
        "url": "https://www.junny.com.br/calculadoras/ferias",
        "description": "Acesse a Calculadora de Férias 2025 e simule o valor líquido exato. Inclui nova tabela INSS progressiva, IRRF e cálculo de venda (abono) sem impostos.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Firefox, Edge.",
        "featureList": [
            "Cálculo de Férias + 1/3",
            "Simulação de Abono Pecuniário (Venda de 10 dias)",
            "Tabela INSS 2025 Progressiva",
            "Cálculo IRRF com Desconto Simplificado"
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
                title="Calculadora de Férias 2025: Líquido e Venda (Simulação)"
                description="Acesse a Calculadora de Férias 2025 e simule o valor líquido exato. Inclui nova tabela INSS progressiva, IRRF e cálculo de venda (abono) sem impostos."
                canonical="/calculadoras/ferias"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": VACATION_FAQS.map(faq => ({
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
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de Férias', href: '/calculadoras/ferias' }
                    ]} />

                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Plane className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-300">Atualizado 2025 • Oficial CLT</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de Férias <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">2025: Simulação Completa (Líquido e Venda)</span>
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    {/* Calculator Section */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                        <VacationCalculator />
                    </div>

                    {/* Right Side Content (Quick Summary) */}
                    <div className="lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-400" />
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
                                    <div className="text-xs text-gray-400">Desconto máximo de R$ 951,63</div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <span className="text-blue-500 font-bold">•</span>
                                        <span><strong>Isenção de IRRF:</strong> Até R$ 2.428,80.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <span className="text-blue-500 font-bold">•</span>
                                        <span><strong>Venda de Férias:</strong> 100% Isento de Impostos.</span>
                                    </div>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <span className="text-blue-500 font-bold">•</span>
                                        <span><strong>Prazo Pagamento:</strong> Até 2 dias antes do gozo.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Intro Text (Moved Below Calculator) */}
                <div className="max-w-4xl mx-auto mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        O planejamento de férias em 2025 exige atenção redobrada às novas faixas de contribuição e regras tributárias. Esta <strong>Calculadora de Férias 2025</strong> oferece a metodologia exata para simular seus recebimentos, garantindo que nenhum centavo seja deixado para trás no momento do seu descanso.
                    </p>
                </div>

                <div className="space-y-16 max-w-4xl mx-auto pb-20">

                    {/* Resposta Rápida */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Resposta Rápida: Como Calcular Férias</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Para calcular o valor das férias, soma-se o salário bruto às médias de adicionais (como horas extras e comissões dos últimos 12 meses) e acrescenta-se o terço constitucional (divisão do total por 3). Sobre esse montante bruto, aplica-se primeiro o desconto do INSS (tabela progressiva 2025) e, sobre o saldo restante, desconta-se o Imposto de Renda. Caso haja venda de dias (abono pecuniário), este valor é somado ao final, pois é totalmente isento de impostos.
                        </p>
                    </div>

                    {/* Resumo em 30 Segundos */}
                    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-8 mb-12">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                                <Plane className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                                Resumo em 30 Segundos
                            </h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Esta ferramenta aplica rigorosamente a legislação trabalhista vigente em **dezembro de 2025**. Diferente de simuladores genéricos, nosso algoritmo considera a tributação progressiva do INSS (cobrada faixa a faixa), a nova tabela de IRRF e as regras de isenção para quem vende dias.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            **Como usar a calculadora:** Insira seu salário bruto atual, informe o número de dependentes (para dedução do IR) e selecione quantos dias de férias pretende gozar (ex: 20 ou 30 dias). A **Calculadora de Férias 2025** fará o cruzamento imediato com as tabelas oficiais para exibir seu valor líquido.
                        </p>
                    </div>

                    {/* Tabelas Oficiais */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">Tabelas Oficiais para o Cálculo (2025)</h2>
                            <p className="text-gray-400">
                                Para garantir a precisão da **Calculadora de Férias 2025**, o cálculo segue rigorosamente a **Tabela Progressiva do INSS** (atualizada pelo INPC de 2024) e a **Tabela de Imposto de Renda** (Lei nº 15.191).
                            </p>
                        </div>

                        {/* Tabela INSS */}
                        <div className="bg-[#1a1a1a]/50 border border-white/5 rounded-2xl overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/5">
                                <h3 className="font-semibold text-white">Tabela de INSS 2025 (Progressiva)</h3>
                                <p className="text-xs text-gray-400 mt-1">A alíquota não é aplicada diretamente sobre o total. Ela é fatiada por faixas salariais.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5 text-gray-400">
                                            <th className="p-4 text-left">Faixa de Salário de Contribuição (R$)</th>
                                            <th className="p-4 text-center">Alíquota Nominal</th>
                                            <th className="p-4 text-center">Parcela a Deduzir (R$)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-300">
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4">Até 1.518,00</td>
                                            <td className="p-4 text-center text-emerald-400">7,5%</td>
                                            <td className="p-4 text-center">-</td>
                                        </tr>
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4">De 1.518,01 até 2.793,88</td>
                                            <td className="p-4 text-center text-emerald-400">9,0%</td>
                                            <td className="p-4 text-center">22,77</td>
                                        </tr>
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4">De 2.793,89 até 4.190,83</td>
                                            <td className="p-4 text-center text-emerald-400">12,0%</td>
                                            <td className="p-4 text-center">106,59</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-4">De 4.190,84 até 8.157,41</td>
                                            <td className="p-4 text-center text-emerald-400">14,0%</td>
                                            <td className="p-4 text-center">190,40</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 bg-white/5 border-t border-white/5 text-xs text-gray-500">
                                <div className="p-2 border-l-2 border-emerald-500 bg-emerald-500/5 text-gray-400">
                                    <strong>Fonte Oficial:</strong> Dados consolidados das <a href="https://www.gov.br/inss/pt-br/noticias/confira-como-ficaram-as-aliquotas-de-contribuicao-ao-inss" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Portarias Interministeriais da Previdência Social de 2025</a>.
                                </div>
                            </div>
                        </div>

                        {/* Tabela IRRF */}
                        <div className="bg-[#1a1a1a]/50 border border-white/5 rounded-2xl overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/5">
                                <h3 className="font-semibold text-white">Tabela de IRRF (Tabela Vigente (Dez/2025))</h3>
                                <p className="text-xs text-gray-400 mt-1">O sistema verifica automaticamente se o **Desconto Simplificado (R$ 607,20)** é mais vantajoso que as deduções legais.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5 text-gray-400">
                                            <th className="p-4 text-left">Base de Cálculo (R$)</th>
                                            <th className="p-4 text-center">Alíquota (%)</th>
                                            <th className="p-4 text-center">Parcela a Deduzir do IR (R$)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-300">
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4">Até 2.428,80</td>
                                            <td className="p-4 text-center text-emerald-400">Isento</td>
                                            <td className="p-4 text-center">0,00</td>
                                        </tr>
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4">De 2.428,81 até 2.826,65</td>
                                            <td className="p-4 text-center text-emerald-400">7,5%</td>
                                            <td className="p-4 text-center">182,16</td>
                                        </tr>
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4">De 2.826,66 até 3.751,05</td>
                                            <td className="p-4 text-center text-emerald-400">15,0%</td>
                                            <td className="p-4 text-center">394,16</td>
                                        </tr>
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4">De 3.751,06 até 4.664,68</td>
                                            <td className="p-4 text-center text-emerald-400">22,5%</td>
                                            <td className="p-4 text-center">675,49</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-4">Acima de 4.664,68</td>
                                            <td className="p-4 text-center text-emerald-400">27,5%</td>
                                            <td className="p-4 text-center">908,73</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 bg-white/5 border-t border-white/5 text-xs text-gray-500">
                                <div className="p-2 border-l-2 border-emerald-500 bg-emerald-500/5 text-gray-400">
                                    <strong>Fonte Oficial:</strong> Tabela progressiva mensal atualizada pela <a href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Receita Federal do Brasil</a>.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Erros Comuns */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Erros Comuns ao Calcular Férias em 2025</h2>
                        <p className="text-gray-400">
                            Muitos trabalhadores perdem dinheiro ou se confundem ao tentar fazer a conta "na ponta do lápis" sem considerar as nuances da legislação atual. Ao utilizar uma **Calculadora de Férias 2025** atualizada, você evita os seguintes equívocos:
                        </p>
                        <ul className="space-y-3 text-gray-400 list-disc pl-5">
                            <li>
                                <strong>Aplicar porcentagem direta do INSS:</strong> Não se multiplica o valor total das férias por 14%. O cálculo deve ser feito faixa a faixa (progressivo). Uma conta direta resulta em um desconto maior do que o devido.
                            </li>
                            <li>
                                <strong>Tributar a venda de férias (Abono):</strong> Se você optar por converter 1/3 das férias em dinheiro, **não incide INSS nem IRRF** sobre esse valor específico. Calculadoras desatualizadas aplicam impostos aqui, subestimando o valor que você tem a receber.
                            </li>
                            <li>
                                <strong>Média Financeira x Média Física:</strong> Para horas extras, não se faz a média dos valores recebidos. Faz-se a média da **quantidade de horas** nos últimos 12 meses e multiplica-se pelo valor da hora atual. Isso protege seu poder de compra contra a inflação. Você pode verificar suas médias usando nossa <a href="https://junny.com.br/calculadoras/horas-extras" className="text-blue-400 hover:underline">calculadora de horas extras</a> antes de somar ao salário base.
                            </li>
                        </ul>
                    </div>

                    {/* Como Funciona o Cálculo */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Como Funciona o Cálculo (Passo a Passo)</h2>
                        <p className="text-gray-400">
                            A base legal do cálculo de férias envolve o salário atual, médias variáveis (Art. 142 da CLT) e o adicional de 1/3 (Constituição Federal).
                        </p>

                        <h3 className="text-xl font-semibold text-white">A Fórmula Geral</h3>
                        <p className="text-gray-400">A estrutura matemática básica é:</p>
                        <div className="bg-[#1a1a1a]/50 p-4 rounded-xl border border-white/5 text-center font-mono text-emerald-400">
                            Base Férias = (Salário + Médias) + ((Salário + Médias) / 3)
                        </div>
                        <p className="text-gray-400">Dessa base bruta, subtraem-se o INSS e, em seguida, o Imposto de Renda.</p>

                        {/* Exemplo 1 */}
                        <div className="bg-[#1a1a1a]/50 border border-white/5 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Exemplo 1: Salário de R$ 3.000,00 (Faixa Intermediária)</h3>
                            <p className="text-gray-400 mb-4">
                                Vamos supor que um trabalhador ganhe R$ 3.000,00, sem dependentes, e vai tirar 30 dias de férias em dezembro de 2025. Se você fizer essa simulação na **Calculadora de Férias 2025**, verá o seguinte detalhamento:
                            </p>
                            <ol className="list-decimal pl-5 space-y-3 text-gray-300">
                                <li>
                                    <strong>Cálculo do Bruto:</strong>
                                    <ul className="list-disc pl-5 mt-1 text-gray-400">
                                        <li>Salário: R$ 3.000,00</li>
                                        <li>1/3 Constitucional: R$ 1.000,00</li>
                                        <li><strong>Total Bruto:</strong> R$ 4.000,00</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Desconto do INSS (Progressivo):</strong>
                                    <ul className="list-disc pl-5 mt-1 text-gray-400">
                                        <li>O valor cai na 3ª faixa (12%).</li>
                                        <li>Cálculo: (4.000,00 × 12%) - 106,59 (parcela a deduzir) = <strong>R$ 373,41</strong>.</li>
                                        <li><em>Nota: Se fosse aplicado 12% direto sem dedução, o desconto seria R$ 480,00 (erro comum).</em></li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Desconto do IRRF:</strong>
                                    <ul className="list-disc pl-5 mt-1 text-gray-400">
                                        <li>Base para IR: 4.000,00 - 373,41 (INSS) = R$ 3.626,59.</li>
                                        <li>O valor cai na faixa de 15%.</li>
                                        <li>Cálculo: (3.626,59 × 15%) - 394,16 (parcela a deduzir) = <strong>R$ 149,83</strong>.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Valor Líquido a Receber:</strong>
                                    <ul className="list-disc pl-5 mt-1 text-gray-400">
                                        <li>4.000,00 - 373,41 - 149,83 = <strong>R$ 3.476,76</strong>.</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>

                        {/* Exemplo 2 */}
                        <div className="bg-[#1a1a1a]/50 border border-white/5 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Exemplo 2: Salário de R$ 8.000,00 (Próximo ao Teto)</h3>
                            <p className="text-gray-400 mb-4">
                                Ao simular um alto rendimento na **Calculadora de Férias 2025**, vemos o efeito do Teto do INSS e a alíquota máxima do Imposto de Renda.
                            </p>
                            <ol className="list-decimal pl-5 space-y-3 text-gray-300">
                                <li>
                                    <strong>Cálculo do Bruto:</strong>
                                    <ul className="list-disc pl-5 mt-1 text-gray-400">
                                        <li>Salário: R$ 8.000,00</li>
                                        <li>1/3 Constitucional: R$ 2.666,67</li>
                                        <li><strong>Total Bruto:</strong> R$ 10.666,67</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Desconto do INSS (Limitado ao Teto):</strong>
                                    <ul className="list-disc pl-5 mt-1 text-gray-400">
                                        <li>Embora o bruto seja R$ 10.666,67, o INSS incide apenas até o teto de R$ 8.157,41.</li>
                                        <li>Cálculo Máximo: (8.157,41 × 14%) - 190,40 (parcela a deduzir) = <strong>R$ 951,63</strong>.</li>
                                        <li><em>Nota: Este é o desconto máximo possível em 2025.</em></li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Desconto do IRRF:</strong>
                                    <ul className="list-disc pl-5 mt-1 text-gray-400">
                                        <li>Base para IR: 10.666,67 (Bruto) - 951,63 (INSS) = R$ 9.715,04.</li>
                                        <li>O valor cai na última faixa (27,5%).</li>
                                        <li>Cálculo: (9.715,04 × 27,5%) - 908,73 (parcela a deduzir) = <strong>R$ 1.762,90</strong>.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Valor Líquido a Receber:</strong>
                                    <ul className="list-disc pl-5 mt-1 text-gray-400">
                                        <li>10.666,67 - 951,63 - 1.762,90 = <strong>R$ 7.952,14</strong>.</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* Impacto das Faltas */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Impacto das Faltas Injustificadas</h2>
                        <p className="text-gray-400">
                            O cálculo final na **Calculadora de Férias 2025** depende diretamente do seu histórico de presença, pois o Artigo 130 da CLT estabelece um sistema de proporcionalidade. Faltas sem justificativa legal (atestado, casamento, luto) durante o período aquisitivo reduzem os dias de descanso a que você tem direito.
                        </p>
                        <ul className="space-y-2 text-gray-400 list-disc pl-5">
                            <li><strong>Até 5 faltas:</strong> 30 dias de férias.</li>
                            <li><strong>6 a 14 faltas:</strong> 24 dias de férias.</li>
                            <li><strong>15 a 23 faltas:</strong> 18 dias de férias.</li>
                            <li><strong>24 a 32 faltas:</strong> 12 dias de férias.</li>
                            <li><strong>Mais de 32 faltas:</strong> Perde o direito às férias.</li>
                        </ul>
                    </div>

                    {/* Casos Especiais */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-white">Casos Especiais e Regras de 2025</h2>
                        <p className="text-gray-400">Além do cálculo padrão, a **Calculadora de Férias 2025** contempla situações específicas que exigem atenção extra:</p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Abono Pecuniário ("Venda de Férias")</h3>
                                <p className="text-gray-400">
                                    O trabalhador pode converter 1/3 do período de férias (geralmente 10 dias) em dinheiro. O prazo para solicitar isso é até 15 dias antes do término do período aquisitivo. A grande vantagem financeira é que, conforme legislação tributária, **não há desconto de impostos** sobre o valor da venda e o terço constitucional correspondente a ela.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Férias Fracionadas</h3>
                                <p className="text-gray-400">
                                    Desde a Reforma Trabalhista, e mantido em 2025, as férias podem ser divididas em até três períodos. Um deles não pode ser inferior a 14 dias corridos e os demais não podem ser inferiores a 5 dias corridos.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Terceirizados na Administração Pública</h3>
                                <p className="text-gray-400">
                                    Uma atualização importante trazida pela **Instrução Normativa nº 213/2025** exige que terceirizados com dedicação exclusiva na Administração Pública Federal planejem suas férias com 60 dias de antecedência. Consulte a norma completa no <a href="https://www.gov.br/compras/pt-br/acesso-a-informacao/noticias/governo-federal-publica-norma-para-assegurar-planejamento-antecipado-das-ferias-de-colaboradores-terceirizados" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Portal Gov.br</a>.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Rescisão de Contrato</h3>
                                <p className="text-gray-400">
                                    Se você foi demitido ou pediu demissão, o cálculo muda para "férias proporcionais" (pagas em avos) ou "férias vencidas" (se houver). Se o período concessivo já venceu, o pagamento deve ser em dobro. Para simulações de saída da empresa, recomenda-se usar especificamente a <a href="https://junny.com.br/calculadoras/rescisao" className="text-blue-400 hover:underline">calculadora de rescisão</a>.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <FAQ
                    items={VACATION_FAQS}
                    title="Perguntas Frequentes sobre Férias (FAQ)"
                    className="py-12"
                    showSocialProof={false}
                />

                <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-gray-500">Carregando oferta...</div>}>
                    <AppPromoBanner />
                </Suspense>
            </div>
        </section>
    );
};
