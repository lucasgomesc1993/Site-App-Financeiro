import React, { useState, useEffect } from 'react';
import { Activity, ArrowLeft, HelpCircle, Calculator, User, Scale, Ruler, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';

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

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-primary/20 selection:text-primary">
            <SEO
                title="Calculadora de IMC Online - Índice de Massa Corporal"
                description="Calcule seu IMC gratuitamente. Descubra se você está no peso ideal, acima do peso ou com obesidade segundo a tabela oficial da OMS."
                canonical="/calculadoras/imc"
            />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link to="/calculadoras" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para Calculadoras
                </Link>

                <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <Activity className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Calculadora de IMC
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Índice de Massa Corporal: descubra se seu peso está ideal.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-8">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">

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
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
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
                                        <li><strong>Crianças:</strong> Usam curvas de crescimento específicas.</li>
                                    </ul>
                                </div>

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 text-white">Dúvidas Frequentes</h3>
                                    <div className="space-y-3 text-sm text-gray-400">
                                        <div>
                                            <strong className="text-white block">Qual o peso ideal?</strong>
                                            <p>É uma faixa, não um número único. Para 1,70m, o peso saudável varia entre 53,5kg e 72kg.</p>
                                        </div>
                                        <div className="border-t border-white/5 pt-3">
                                            <strong className="text-white block">IMC alto é perigoso?</strong>
                                            <p>Estatisticamente sim. Está ligado a riscos de diabetes, hipertensão e problemas cardíacos.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
