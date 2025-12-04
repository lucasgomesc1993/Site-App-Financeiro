import React, { useState, useEffect } from 'react';
import { Activity, HelpCircle, User, Scale, Ruler, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

const IMC_FAQS: FAQItem[] = [
    {
        question: "O que é IMC?",
        answer: "O Índice de Massa Corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso ideal. Foi desenvolvido pelo polímata Lambert Quételet no fim do século XIX."
    },
    {
        question: "O IMC é preciso para atletas?",
        answer: "Não. O IMC não distingue massa magra (músculo) de massa gorda. Um fisiculturista pode ter IMC de 'obeso' sendo extremamente saudável. Para atletas, o ideal é medir o percentual de gordura."
    },
    {
        question: "Qual o IMC ideal para idosos?",
        answer: "Para idosos (acima de 60 anos), a classificação muda ligeiramente, pois uma reserva de peso pode ser benéfica. Geralmente, considera-se normal um IMC entre 22 e 27."
    }
];

export function IMCCalculatorPage() {
    // Inputs
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    // Results
    const [imc, setImc] = useState<number | null>(null);
    const [classification, setClassification] = useState<string>('');
    const [colorClass, setColorClass] = useState<string>('');

    const calculate = () => {
        const w = parseFloat(weight.replace(',', '.'));
        const hCm = parseFloat(height.replace(',', '.'));

        if (isNaN(w) || isNaN(hCm) || w === 0 || hCm === 0) {
            setImc(null);
            setClassification('');
            setColorClass('');
            return;
        }

        const hM = hCm / 100;
        const calculatedImc = w / (hM * hM);
        setImc(calculatedImc);

        if (calculatedImc < 18.5) {
            setClassification('Magreza');
            setColorClass('text-blue-400');
        } else if (calculatedImc < 24.9) {
            setClassification('Normal');
            setColorClass('text-green-400');
        } else if (calculatedImc < 29.9) {
            setClassification('Sobrepeso (Grau I)');
            setColorClass('text-yellow-400');
        } else if (calculatedImc < 39.9) {
            setClassification('Obesidade (Grau II)');
            setColorClass('text-orange-400');
        } else {
            setClassification('Obesidade Grave (Grau III)');
            setColorClass('text-red-500');
        }
    };

    useEffect(() => {
        calculate();
    }, [weight, height]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de IMC",
        "description": "Calcule seu Índice de Massa Corporal (IMC).",
        "applicationCategory": "HealthApplication",
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
                title="Calculadora de IMC Online - Índice de Massa Corporal"
                description="Calcule seu IMC gratuitamente. Descubra se você está no peso ideal, acima do peso ou com obesidade segundo a tabela oficial da OMS."
                canonical="/calculadoras/imc"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": IMC_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Calculadora de IMC', href: '/calculadoras/imc' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Activity className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Saúde e Bem-estar</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">IMC</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Índice de Massa Corporal: descubra se seu peso está ideal de acordo com a Organização Mundial da Saúde.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-24">
                    {/* Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                        <Scale className="w-3 h-3" /> Peso (kg)
                                    </label>
                                    <input
                                        type="text"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center text-lg"
                                        placeholder="Ex: 80"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                        <Ruler className="w-3 h-3" /> Altura (cm)
                                    </label>
                                    <input
                                        type="text"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center text-lg"
                                        placeholder="Ex: 175"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <p className="text-center text-gray-400 mb-2">Seu IMC é</p>
                                <div className={`text-6xl font-bold text-center mb-2 ${colorClass || 'text-gray-600'}`}>
                                    {imc !== null ? imc.toFixed(1) : '--.-'}
                                </div>
                                <p className={`text-center text-lg font-medium ${colorClass || 'text-gray-500'}`}>
                                    {classification || 'Aguardando dados...'}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                <HelpCircle className="w-5 h-5 text-primary" />
                                O que é o IMC?
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    O Índice de Massa Corporal (IMC) é a medida internacional usada pela OMS para avaliar se uma pessoa está no peso ideal.
                                </p>
                                <p>
                                    É um cálculo simples que relaciona seu peso com a sua altura. Embora não meça diretamente a gordura corporal, é o melhor indicador inicial para riscos de saúde.
                                </p>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <strong className="block text-white mb-1">Fórmula:</strong>
                                    <code className="text-primary">IMC = Peso ÷ (Altura × Altura)</code>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                            <h3 className="text-sm font-semibold mb-4 text-gray-300 flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Tabela de Classificação (OMS)
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between p-2 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                                    <span>Menor que 18,5</span>
                                    <span>Magreza</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-green-500/10 text-green-300 border border-green-500/20">
                                    <span>18,5 a 24,9</span>
                                    <span>Normal</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
                                    <span>25,0 a 29,9</span>
                                    <span>Sobrepeso</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">
                                    <span>30,0 a 39,9</span>
                                    <span>Obesidade II</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                                    <span>Maior que 40,0</span>
                                    <span>Obesidade III</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400">
                                <User className="w-5 h-5" />
                                Limitações do IMC
                            </h3>
                            <p className="text-sm text-gray-300 mb-2">
                                O IMC é uma ferramenta de triagem, não um diagnóstico completo. Ele pode falhar em alguns casos:
                            </p>
                            <ul className="space-y-1 text-sm text-gray-400 list-disc pl-4">
                                <li><strong>Atletas:</strong> Músculos pesam mais que gordura.</li>
                                <li><strong>Idosos:</strong> IMC levemente menor/maior pode ser normal.</li>
                                <li><strong>Gestantes:</strong> Tabela padrão não se aplica.</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <FAQ
                    items={IMC_FAQS}
                    title="Dúvidas Frequentes sobre IMC"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
