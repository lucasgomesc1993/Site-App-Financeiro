import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnergyCalculator } from './EnergyCalculator';
import { AppPromoBanner } from '../AppPromoBanner';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';

const ENERGY_FAQS = [
    {
        question: "Quanto vale 1 kWh em reais?",
        answer: "O preço do kWh pode variar por diversos fatores, tais como: prestadora de energia, região do país atendida, bandeira de consumo (verde, amarela ou vermelha), tipo de estabelecimento (residencial, industrial etc.) e horário do consumo. Porém, atualmente, o preço médio do kWh no Brasil em geral fica entre R$ 0,60 a R$ 1,00."
    },
    {
        question: "O que são bandeiras tarifárias de energia?",
        answer: "As bandeiras tarifárias são faixas de preços que indicam o valor do custo de produção da energia elétrica pelo consumidor. Criadas em 2015 pela Aneel, elas permitem que o consumidor saiba com antecedência qual será o preço cobrado em sua conta e ajuste o seu consumo para diminuir o valor da conta de luz. Atualmente, há bandeiras nas cores verde, amarela ou vermelha (nos patamares 1 e 2), que classificam as tarifas das mais baratas (verde) às mais caras (vermelhas)."
    },
    {
        question: "O que é bandeira vermelha?",
        answer: "Bandeira vermelha é o tipo de faixa tarifária aplicada pelas companhias de distribuição de energia elétrica em períodos em que os custos de produção ficam mais caros. Ela acontece quando a produção de energia se torna mais cara, especialmente por fatores climáticos, como secas e diminuição no volume de água das usinas hidrelétricas, e o valor precisa ser repassado para o consumidor."
    },
    {
        question: "Como se calcula o valor da energia elétrica?",
        answer: "Para calcular o valor de energia elétrica de forma prática e precisa, basta utilizar a Calculadora de Consumo de Energia FinZap."
    }
];

export const EnergyPage: React.FC = () => {
    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de Energia', href: '/calculadoras/energia' }
                    ]} />


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Utilidades</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Consumo de Energia</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Descubra quanto seus aparelhos domésticos consomem e economize na conta de luz com a calculadora do FinZap.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <EnergyCalculator />
                </motion.div>

                {/* SEO Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg"
                >
                    <h2 className="text-3xl font-bold text-white mb-6">Calculadora de Consumo de Energia: economize na conta de luz</h2>
                    <p className="text-gray-400 mb-8">
                        Quanto de energia seus aparelhos domésticos consomem? Descubra com a prática e fácil Calculadora de Consumo de Energia FinZap.
                    </p>

                    <h3 className="text-2xl font-bold text-white mb-4">Campos da Calculadora</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-8">
                        <li><strong className="text-white">Potência do Aparelho:</strong> Potência do Aparelho em Watts (W).</li>
                        <li><strong className="text-white">Tempo de uso diário (H):</strong> Tempo de uso por dia em horas.</li>
                        <li><strong className="text-white">Dias de uso:</strong> Número de dias de uso que deseja calcular.</li>
                        <li><strong className="text-white">Preço KWH:</strong> Preço do consumo Quilowatt-hora (R$).</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-white mb-4">Como utilizar a Calculadora de Consumo de Energia FinZap</h3>
                    <p className="text-gray-400 mb-4">Para utilizar a Calculadora de Consumo de Energia FinZap, siga os passos abaixo:</p>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-400 mb-8">
                        <li>Informe a potência do seu aparelho;</li>
                        <li>Preencha com o tempo de uso diário em horas;</li>
                        <li>Complemente com a quantidade de dias de uso;</li>
                        <li>Informe o valor do quilowatt-hora (KWH) em sua região;</li>
                        <li>Por fim, o cálculo é feito automaticamente.</li>
                    </ol>

                    <h3 className="text-2xl font-bold text-white mb-4">Como calcular seu consumo de energia</h3>
                    <p className="text-gray-400 mb-6">
                        Veja como utilizar a calculadora de energia FinZap para descobrir o consumo dos seus aparelhos nos tópicos abaixo.
                    </p>

                    <h4 className="text-xl font-bold text-white mb-3">Descubra qual é a potência do seu aparelho</h4>
                    <p className="text-gray-400 mb-6">
                        Essa informação geralmente pode ser encontrada na caixa ou na etiqueta de consumo afixada no próprio produto. Caso não encontre a caixa ou a etiqueta, também é possível encontrar a potência do seu aparelho em uma rápida pesquisa em sites buscadores como o Google. Para isso, basta informar o modelo do aparelho com a palavra "potência" na barra de busca.
                    </p>

                    <h4 className="text-xl font-bold text-white mb-3">Preencha o valor do kWh em sua região</h4>
                    <p className="text-gray-400 mb-6">
                        Em seguida, pesquise em sua conta de energia ou no site da sua operadora o valor do quilowatt-hora (KWH) em sua região. Quilowatt-hora é uma unidade de faturamento comum utilizada pelas concessionárias de energia elétrica para cobrar pelo fornecimento da energia.
                    </p>

                    <h4 className="text-xl font-bold text-white mb-3">Informe os seus dados de consumo de energia do aparelho</h4>
                    <p className="text-gray-400 mb-8">
                        Agora, basta preencher a Calculadora de Energia FinZap com os dados que você obteve e o seu tempo de consumo. O resultado aparecerá instantaneamente para você saber exatamente quanto vai gastar em um mês.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
                        <h4 className="text-xl font-bold text-white mb-4">Veja o exemplo:</h4>
                        <p className="text-gray-400 mb-4">
                            Digamos que você esteja pensando em comprar um aspirador de pó vertical, mas antes deseja saber o quanto o aparelho vai gastar por mês.
                        </p>
                        <p className="text-gray-400 mb-4">
                            Sabendo que a potência do aparelho é de 1100W e que o preço do kWh, conforme informações da prestadora local, é de R$ 1,80, é hora de preencher os dados na calculadora. Nesse exemplo, consideramos que o tempo de uso do aparelho seria de uma hora por dia e uma vez por semana, ou seja, quatro dias de uso por mês.
                        </p>
                        <p className="text-emerald-400 font-bold">
                            Resultado: Nesse caso, o custo mensal de energia para utilizar o aparelho será de R$ 7,92.
                        </p>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">Qual é a importância de saber calcular o consumo de energia dos eletrodomésticos?</h3>
                    <p className="text-gray-400 mb-6">
                        Saber quanto um aparelho gasta de energia todo mês pode ser a chave para fazer melhores escolhas e desenvolver bons hábitos. Pode ser a sua geladeira, computador de trabalho ou mesmo o seu aspirador de pó. Cada aparelho é responsável por uma parcela específica do seu cálculo de consumo de energia.
                    </p>
                    <p className="text-gray-400 mb-8">
                        Pensando nisso, o FinZap desenvolveu uma Calculadora de Consumo de Energia para você descobrir de forma automática o quanto aquele seu eletrodoméstico vai gastar, além do preço médio que irá pagar por mês.
                    </p>

                    <FAQ items={ENERGY_FAQS} title="Perguntas frequentes sobre consumo de energia" className="py-12" showSocialProof={false} />

                </motion.div>

                <AppPromoBanner />
            </div>
        </section>
    );
};
