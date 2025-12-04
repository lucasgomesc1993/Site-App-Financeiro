import React, { useState, useEffect } from 'react';
import { Calculator, ArrowLeft, ArrowRight, HelpCircle, Lightbulb, Divide, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';

type ProportionType = 'direct' | 'inverse';

export function RuleOfThreePage() {
    const [valueA, setValueA] = useState('');
    const [valueB, setValueB] = useState('');
    const [valueC, setValueC] = useState('');
    const [resultX, setResultX] = useState<number | null>(null);
    const [type, setType] = useState<ProportionType>('direct');

    const calculate = () => {
        const a = parseFloat(valueA.replace(',', '.'));
        const b = parseFloat(valueB.replace(',', '.'));
        const c = parseFloat(valueC.replace(',', '.'));

        if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0 || c === 0) {
            setResultX(null);
            return;
        }

        let x: number;
        if (type === 'direct') {
            // A/B = C/X => X = (B * C) / A
            x = (b * c) / a;
        } else {
            // A*B = C*X => X = (A * B) / C
            x = (a * b) / c;
        }

        setResultX(x);
    };

    // Auto-calculate when inputs change
    useEffect(() => {
        calculate();
    }, [valueA, valueB, valueC, type]);

    const handleInput = (value: string, setter: (value: string) => void) => {
        // Allow numbers and one comma/dot
        if (/^[\d.,]*$/.test(value)) {
            setter(value);
        }
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-primary/20 selection:text-primary">
            <SEO
                title="Calculadora de Regra de Três Simples - Direta e Inversa"
                description="Matemática sem dor de cabeça. Resolva problemas de proporção, porcentagem e conversões com nossa calculadora de Regra de Três online."
                canonical="/calculadoras/regra-de-tres"
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
                                <Divide className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Calculadora de Regra de Três
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Resolva problemas de proporção, porcentagem e conversões em segundos.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-8">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold flex items-center gap-2">
                                            <Calculator className="w-5 h-5 text-primary" />
                                            Calcular
                                        </h2>
                                        <div className="flex bg-[#0a0a0a] rounded-lg p-1 border border-white/10">
                                            <button
                                                onClick={() => setType('direct')}
                                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${type === 'direct' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                Direta
                                            </button>
                                            <button
                                                onClick={() => setType('inverse')}
                                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${type === 'inverse' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                Inversa
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                                        {/* Row 1 */}
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 block text-center">Valor A</label>
                                            <input
                                                type="text"
                                                value={valueA}
                                                onChange={(e) => handleInput(e.target.value, setValueA)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white text-center focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                                placeholder="A"
                                            />
                                        </div>
                                        <div className="text-gray-500 font-bold">Está para</div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 block text-center">Valor B</label>
                                            <input
                                                type="text"
                                                value={valueB}
                                                onChange={(e) => handleInput(e.target.value, setValueB)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white text-center focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                                placeholder="B"
                                            />
                                        </div>

                                        {/* Separator */}
                                        <div className="col-span-3 h-px bg-white/10 my-2 relative">
                                            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#131313] px-2 text-gray-500 text-xs">Assim como</span>
                                        </div>

                                        {/* Row 2 */}
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 block text-center">Valor C</label>
                                            <input
                                                type="text"
                                                value={valueC}
                                                onChange={(e) => handleInput(e.target.value, setValueC)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white text-center focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                                placeholder="C"
                                            />
                                        </div>
                                        <div className="text-gray-500 font-bold">Está para</div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 block text-center">Valor X</label>
                                            <div className={`w-full h-[50px] rounded-xl flex items-center justify-center font-bold text-lg border transition-all ${resultX !== null ? 'bg-primary/20 border-primary text-primary' : 'bg-[#0a0a0a] border-white/10 text-gray-600'}`}>
                                                {resultX !== null ? resultX.toLocaleString('pt-BR', { maximumFractionDigits: 4 }) : 'X'}
                                            </div>
                                        </div>
                                    </div>

                                    {resultX !== null && (
                                        <div className="mt-6 p-4 bg-[#0a0a0a] rounded-xl border border-white/5 text-sm text-gray-400">
                                            <p className="mb-2 font-semibold text-white">Fórmula usada:</p>
                                            {type === 'direct' ? (
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span>X = (B × C) ÷ A</span>
                                                    <span className="text-gray-600">→</span>
                                                    <span>({valueB} × {valueC}) ÷ {valueA}</span>
                                                    <span className="text-gray-600">=</span>
                                                    <span className="text-primary font-bold">{resultX.toLocaleString('pt-BR', { maximumFractionDigits: 4 })}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span>X = (A × B) ÷ C</span>
                                                    <span className="text-gray-600">→</span>
                                                    <span>({valueA} × {valueB}) ÷ {valueC}</span>
                                                    <span className="text-gray-600">=</span>
                                                    <span className="text-primary font-bold">{resultX.toLocaleString('pt-BR', { maximumFractionDigits: 4 })}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-primary" />
                                        Entenda a Lógica
                                    </h3>
                                    <div className="space-y-4 text-gray-400 text-sm">
                                        <div>
                                            <strong className="text-white block mb-1">Proporção Direta (Mais comum)</strong>
                                            <p>Quando um lado aumenta, o outro também aumenta.</p>
                                            <p className="text-xs mt-1 text-gray-500">Ex: Se 1kg custa R$40, 2kg custam R$80.</p>
                                        </div>
                                        <div className="border-t border-white/5 pt-4">
                                            <strong className="text-white block mb-1">Proporção Inversa</strong>
                                            <p>Quando um lado aumenta, o outro diminui.</p>
                                            <p className="text-xs mt-1 text-gray-500">Ex: Mais velocidade = Menos tempo de viagem.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                        <Lightbulb className="w-5 h-5" />
                                        Dica Prática
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        Na dúvida, faça a pergunta: "Se eu aumentar o primeiro valor, o segundo deve aumentar ou diminuir?". Se aumentar, é Direta. Se diminuir, é Inversa.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold mb-4 text-white">Exemplos do Dia a Dia</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <h3 className="font-semibold text-white mb-2">Porcentagem (Direta)</h3>
                                        <p className="text-sm text-gray-400 mb-2">
                                            "Se R$ 200 é 100%, quanto é 30%?"
                                        </p>
                                        <div className="bg-[#0a0a0a] p-3 rounded-lg text-xs font-mono text-gray-300">
                                            200 --- 100<br />
                                            X --- 30
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <h3 className="font-semibold text-white mb-2">Velocidade (Inversa)</h3>
                                        <p className="text-sm text-gray-400 mb-2">
                                            "A 100km/h levo 2h. A 50km/h levo quanto?"
                                        </p>
                                        <div className="bg-[#0a0a0a] p-3 rounded-lg text-xs font-mono text-gray-300">
                                            100 --- 2<br />
                                            50 --- X
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
