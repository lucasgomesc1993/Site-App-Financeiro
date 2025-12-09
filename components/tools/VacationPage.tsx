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
        question: "Qual o prazo legal para o pagamento das férias em 2025?",
        answer: "A empresa deve pagar as férias até 2 dias úteis antes do início do período de descanso. Se o pagamento atrasar, a empresa é obrigada a pagar o valor em dobro, conforme determina o Artigo 137 da CLT."
    },
    {
        question: "Qual o valor máximo de desconto do INSS nas férias?",
        answer: "Existe um teto. Em 2025, o desconto máximo de INSS é de R$ 951,63 (correspondente ao teto previdenciário de R$ 8.157,41). Mesmo que o valor das suas férias (salário + 1/3) ultrapasse R$ 20.000,00, o desconto do INSS não passará deste limite."
    },
    {
        question: "O novo salário mínimo de R$ 1.518,00 afeta minhas férias?",
        answer: "Sim. Se você ganha salário mínimo, suas férias não podem ser calculadas com base no valor antigo. O aumento sancionado impacta diretamente o piso das férias, que deve respeitar o valor vigente no mês do gozo."
    },
    {
        question: "Posso vender 15 ou 20 dias de férias?",
        answer: "Não. O Artigo 143 da CLT permite converter em dinheiro apenas 1/3 do período a que o empregado tiver direito. Para quem tem direito a 30 dias, o máximo permitido para venda são 10 dias."
    },
    {
        question: "Como funciona o desconto de IRRF nas férias em 2025?",
        answer: "O imposto é retido na fonte no momento do pagamento (Regime de Caixa). Em 2025, aplica-se o Desconto Simplificado de R$ 607,20 se ele for mais vantajoso que as deduções legais, reduzindo a base de cálculo para a maioria dos trabalhadores."
    }
];

export const VacationPage: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Férias 2025: Líquido e Venda (CLT)",
        "url": "https://www.junny.com.br/calculadoras/ferias",
        "description": "Calcule Férias 2025 com novas tabelas INSS e IRRF. Veja valor líquido, venda de 10 dias e desconto máximo de R$ 951,63 no teto.",
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
                title="Calculadora de Férias 2025: Líquido e Venda (CLT)"
                description="Calcule Férias 2025 com novas tabelas INSS e IRRF. Veja valor líquido, venda de 10 dias e desconto máximo de R$ 951,63 no teto."
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
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Férias 2025</span>
                        </h1>

                        {/* Resumo Rápido Box */}
                        <div className="max-w-3xl mx-auto bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 text-left">
                            <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-400" />
                                Resumo Rápido (Dados Oficiais Dezembro/2025)
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500/50">•</span>
                                    <span>Salário Mínimo Base: <strong>R$ 1.518,00</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500/50">•</span>
                                    <span>Teto do INSS: <strong>R$ 8.157,41</strong> (Max R$ 951,63)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500/50">•</span>
                                    <span>Isenção IRRF: Até <strong>R$ 2.428,80</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500/50">•</span>
                                    <span>Desconto Simplificado: <strong>R$ 607,20</strong></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 mb-24">
                    <div className="mb-8">
                        <VacationCalculator />
                    </div>

                    {/* Content Section */}
                    <div className="space-y-16 max-w-4xl mx-auto">

                        {/* Intro */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white">Resumo em 30 Segundos</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Esta ferramenta é essencial para o trabalhador CLT que busca previsibilidade financeira ao planejar o descanso.
                                Aqui você entende o impacto prático do novo salário mínimo (<strong className="text-gray-200">R$ 1.518,00</strong>)
                                e como o teto do INSS (<strong className="text-gray-200">R$ 8.157,41</strong>) protege seu salário bruto,
                                limitando o desconto a <strong className="text-gray-200">R$ 951,63</strong>.
                                Descubra se vale a pena "vender" 10 dias de férias e como a faixa de isenção de IRRF
                                (até <strong className="text-gray-200">R$ 2.428,80</strong>) pode aumentar o dinheiro no seu bolso.
                            </p>
                        </div>

                        {/* Official Tables */}
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold text-white">Tabelas Oficiais Utilizadas (Vigência 2025)</h2>

                            {/* INSS Table */}
                            <div className="bg-[#1a1a1a]/50 border border-white/5 rounded-2xl overflow-hidden">
                                <div className="p-4 bg-white/5 border-b border-white/5">
                                    <h3 className="font-semibold text-white">Tabela Progressiva INSS 2025</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-white/5 text-gray-400">
                                                <th className="p-4">Faixa Salarial (R$)</th>
                                                <th className="p-4">Alíquota</th>
                                                <th className="p-4">Parcela a Deduzir</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-300">
                                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4">Até 1.518,00</td>
                                                <td className="p-4 text-emerald-400">7,5%</td>
                                                <td className="p-4">-</td>
                                            </tr>
                                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4">De 1.518,01 até 2.793,88</td>
                                                <td className="p-4 text-emerald-400">9,0%</td>
                                                <td className="p-4">R$ 22,77</td>
                                            </tr>
                                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4">De 2.793,89 até 4.190,83</td>
                                                <td className="p-4 text-emerald-400">12,0%</td>
                                                <td className="p-4">R$ 106,59</td>
                                            </tr>
                                            <tr className="hover:bg-white/5 transition-colors">
                                                <td className="p-4">De 4.190,84 até 8.157,41</td>
                                                <td className="p-4 text-emerald-400">14,0%</td>
                                                <td className="p-4">R$ 190,40</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="bg-white/5 text-xs text-gray-500">
                                            <tr>
                                                <td colSpan={3} className="p-3">
                                                    Fonte: Portaria Interministerial MPS/MF nº 6/2025 (Reajuste pelo INPC)
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* IRRF Table */}
                            <div className="bg-[#1a1a1a]/50 border border-white/5 rounded-2xl overflow-hidden">
                                <div className="p-4 bg-white/5 border-b border-white/5">
                                    <h3 className="font-semibold text-white">Tabela IRRF 2025 (Vigente desde Maio)</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-white/5 text-gray-400">
                                                <th className="p-4">Base de Cálculo (R$)</th>
                                                <th className="p-4">Alíquota</th>
                                                <th className="p-4">Dedução (R$)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-300">
                                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4">Até 2.428,80</td>
                                                <td className="p-4 text-emerald-400 font-medium">Isento</td>
                                                <td className="p-4">0,00</td>
                                            </tr>
                                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4">De 2.428,81 até 2.826,65</td>
                                                <td className="p-4 text-emerald-400">7,5%</td>
                                                <td className="p-4">182,16</td>
                                            </tr>
                                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4">De 2.826,66 até 3.751,05</td>
                                                <td className="p-4 text-emerald-400">15,0%</td>
                                                <td className="p-4">394,16</td>
                                            </tr>
                                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4">De 3.751,06 até 4.664,68</td>
                                                <td className="p-4 text-emerald-400">22,5%</td>
                                                <td className="p-4">675,49</td>
                                            </tr>
                                            <tr className="hover:bg-white/5 transition-colors">
                                                <td className="p-4">Acima de 4.664,68</td>
                                                <td className="p-4 text-emerald-400">27,5%</td>
                                                <td className="p-4">908,73</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="bg-white/5 text-xs text-gray-500">
                                            <tr>
                                                <td colSpan={3} className="p-3">
                                                    *Desconto Simplificado automático de R$ 607,20 se for mais vantajoso.
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Erros Comuns */}
                        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-red-400 mb-4">Erros Comuns: Por que a conta manual não bate?</h2>
                            <p className="text-gray-300 mb-4">
                                A maioria faz a conta simples: <code>Salário x 1,33</code>. Isso está <strong className="text-red-400">errado</strong>.
                            </p>
                            <p className="text-gray-400">
                                O cálculo real tributa o total acumulado. Ao somar o 1/3, você frequentemente "salta" de faixa no INSS e IRRF, aumentando o desconto.
                                Além disso, faltas injustificadas no período aquisitivo podem reduzir drasticamente seus dias de direito (Art. 130 CLT).
                            </p>
                        </div>

                        {/* Como Calcular (Exemplos) */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white">Como Calcular Férias: Passo a Passo</h2>
                            <p className="text-gray-400">Confira a metodologia "em cascata" com dois exemplos práticos:</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Exemplo 1 */}
                                <div className="bg-[#1a1a1a]/50 border border-white/5 rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">1</div>
                                        <h3 className="font-semibold text-white">Salário Médio (R$ 3.000)</h3>
                                    </div>
                                    <ul className="space-y-3 text-sm text-gray-400">
                                        <li><strong>Base Bruta:</strong> R$ 4.000,00 (Sal + 1/3)</li>
                                        <li>
                                            <span className="text-red-400">INSS (12%):</span> - R$ 373,41
                                        </li>
                                        <li>
                                            <span className="text-red-400">IRRF (15%):</span> - R$ 114,76
                                            <div className="text-xs text-gray-500 mt-1">Base Reduzida: R$ 3.392,80 (Simplificado)</div>
                                        </li>
                                        <li className="pt-2 border-t border-white/5 flex justify-between text-white font-medium">
                                            <span>Líquido:</span>
                                            <span className="text-emerald-400">R$ 3.511,83</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Exemplo 2 */}
                                <div className="bg-[#1a1a1a]/50 border border-white/5 rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">2</div>
                                        <h3 className="font-semibold text-white">Salário Alto (R$ 7.500)</h3>
                                    </div>
                                    <ul className="space-y-3 text-sm text-gray-400">
                                        <li><strong>Base Bruta:</strong> R$ 10.000,00 (Sal + 1/3)</li>
                                        <li>
                                            <span className="text-red-400">INSS (Teto):</span> - R$ 951,63
                                            <div className="text-xs text-gray-500 mt-1">Travado no teto de R$ 8.157,41</div>
                                        </li>
                                        <li>
                                            <span className="text-red-400">IRRF (27.5%):</span> - R$ 1.579,57
                                        </li>
                                        <li className="pt-2 border-t border-white/5 flex justify-between text-white font-medium">
                                            <span>Líquido:</span>
                                            <span className="text-emerald-400">R$ 7.468,80</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Venda de Férias */}
                        <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-2xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-emerald-400 mb-4">Venda de Férias (Abono Pecuniário): O "Pulo do Gato"</h2>
                            <p className="text-gray-300 mb-4">
                                A conversão de 1/3 das férias em dinheiro ("venda") tem <strong>isenção total de impostos</strong>.
                                Sobre os 10 dias vendidos e seu terço não incidem INSS nem IRRF.
                            </p>
                            <p className="text-sm text-gray-400">
                                Ao optar pelo abono em nossa calculadora, você verá que o valor líquido sobe desproporcionalmente, pois é uma verba "limpa".
                            </p>
                        </div>

                        {/* Casos Especiais */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#1a1a1a]/30 p-4 rounded-xl border border-white/5">
                                <h4 className="font-medium text-white mb-2">Rescisão</h4>
                                <p className="text-xs text-gray-400">Se pediu demissão, o cálculo muda (proporcional 1/12). Use a <a href="/calculadoras/rescisao" className="text-blue-400 hover:underline">calculadora de rescisão</a>.</p>
                            </div>
                            <div className="bg-[#1a1a1a]/30 p-4 rounded-xl border border-white/5">
                                <h4 className="font-medium text-white mb-2">13º Salário</h4>
                                <p className="text-xs text-gray-400">Você pode pedir a 1ª parcela junto com as férias (metade do nominal, sem descontos).</p>
                            </div>
                            <div className="bg-[#1a1a1a]/30 p-4 rounded-xl border border-white/5">
                                <h4 className="font-medium text-white mb-2">Médias Variáveis</h4>
                                <p className="text-xs text-gray-400">Horas extras e comissões integram a base de cálculo (Súmula 347 TST).</p>
                            </div>
                        </div>

                    </div>


                </div>

                <FAQ
                    items={VACATION_FAQS}
                    title="Perguntas Frequentes (2025)"
                    className="py-12 max-w-4xl mx-auto"
                    showSocialProof={false}
                />

                <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-gray-500">Carregando oferta...</div>}>
                    <AppPromoBanner />
                </Suspense>
            </div>
        </section>
    );
};
