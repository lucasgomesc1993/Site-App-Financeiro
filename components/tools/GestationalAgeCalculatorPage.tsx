import React, { useState, useEffect } from 'react';
import { Baby, ArrowLeft, HelpCircle, Calendar, Clock, Info, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';

export function GestationalAgeCalculatorPage() {
    const [dum, setDum] = useState('');
    const [result, setResult] = useState<{
        dpp: string;
        weeks: number;
        days: number;
        months: number;
        trimester: number;
    } | null>(null);

    const calculate = () => {
        if (!dum) {
            setResult(null);
            return;
        }

        const dumDate = new Date(dum);
        if (isNaN(dumDate.getTime())) return;

        // DPP: DUM + 280 days (40 weeks)
        const dppDate = new Date(dumDate);
        dppDate.setDate(dumDate.getDate() + 280);

        // Gestational Age: Current Date - DUM
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - dumDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;

        // Months approximation (Weeks / 4.3 or simplified table logic)
        // Using the simplified logic from the prompt:
        // 1-13 weeks = 1-3 months
        // 14-26 weeks = 4-6 months
        // 27+ weeks = 7-9 months
        let months = 0;
        if (weeks <= 4) months = 1;
        else if (weeks <= 8) months = 2;
        else if (weeks <= 13) months = 3;
        else if (weeks <= 17) months = 4;
        else if (weeks <= 21) months = 5;
        else if (weeks <= 26) months = 6;
        else if (weeks <= 30) months = 7;
        else if (weeks <= 35) months = 8;
        else months = 9;

        let trimester = 1;
        if (weeks >= 14 && weeks <= 26) trimester = 2;
        if (weeks >= 27) trimester = 3;

        setResult({
            dpp: dppDate.toLocaleDateString('pt-BR'),
            weeks,
            days,
            months,
            trimester
        });
    };

    useEffect(() => {
        calculate();
    }, [dum]);

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-primary/20 selection:text-primary">
            <SEO
                title="Calculadora de Idade Gestacional - Data Provável do Parto (DPP)"
                description="Estou grávida de quanto tempo? Calcule sua Idade Gestacional pela DUM, descubra a Data Provável do Parto e acompanhe as semanas e meses da gravidez."
                canonical="/calculadoras/idade-gestacional"
            />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link to="/calculadoras" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para Calculadoras
                </Link>

                <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-pink-500/10 rounded-2xl">
                                <Baby className="w-8 h-8 text-pink-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Idade Gestacional (DPP)
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Descubra de quantas semanas você está e quando o bebê nasce.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-8">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">

                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> Data da Última Menstruação (DUM)
                                            </label>
                                            <input
                                                type="date"
                                                value={dum}
                                                onChange={(e) => setDum(e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-500/50 transition-all text-center text-lg [color-scheme:dark]"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <p className="text-center text-gray-400 mb-2">Data Provável do Parto</p>
                                        <div className="text-4xl font-bold text-center text-pink-400 mb-4">
                                            {result ? result.dpp : '--/--/----'}
                                        </div>

                                        {result && (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-white/5 p-4 rounded-xl text-center">
                                                    <span className="block text-xs text-gray-500 mb-1">Tempo de Gestação</span>
                                                    <span className="text-xl font-bold text-white">
                                                        {result.weeks} sem e {result.days} dias
                                                    </span>
                                                </div>
                                                <div className="bg-white/5 p-4 rounded-xl text-center">
                                                    <span className="block text-xs text-gray-500 mb-1">Mês Aproximado</span>
                                                    <span className="text-xl font-bold text-white">
                                                        {result.months}º Mês
                                                    </span>
                                                </div>
                                                <div className="col-span-2 bg-pink-500/10 p-4 rounded-xl text-center border border-pink-500/20">
                                                    <span className="block text-xs text-pink-300 mb-1 uppercase tracking-wider font-bold">Trimestre Atual</span>
                                                    <span className="text-2xl font-bold text-pink-400">
                                                        {result.trimester}º Trimestre
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                                        <Info className="w-5 h-5" />
                                        Tabela: Semanas x Meses
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between p-2 rounded bg-white/5 border border-white/5">
                                            <span>1º Trimestre</span>
                                            <span className="text-gray-400">1 a 13 semanas</span>
                                        </div>
                                        <div className="flex justify-between p-2 rounded bg-white/5 border border-white/5">
                                            <span>2º Trimestre</span>
                                            <span className="text-gray-400">14 a 26 semanas</span>
                                        </div>
                                        <div className="flex justify-between p-2 rounded bg-white/5 border border-white/5">
                                            <span>3º Trimestre</span>
                                            <span className="text-gray-400">27 a 40+ semanas</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-pink-400" />
                                        Como funciona o cálculo?
                                    </h3>
                                    <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                        <p>
                                            A medicina utiliza a <strong>Regra de Naegele</strong>, baseada no ciclo de 28 dias.
                                        </p>
                                        <p>
                                            A gestação dura oficialmente 280 dias (40 semanas) a partir do primeiro dia da sua última menstruação (DUM).
                                        </p>
                                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                            <strong className="block text-white mb-2">A Regra:</strong>
                                            <ul className="list-disc pl-4 space-y-1">
                                                <li>Pegue a data da DUM</li>
                                                <li>Adicione 7 dias</li>
                                                <li>Subtraia 3 meses</li>
                                                <li>Adicione 1 ano</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20">
                                    <h3 className="text-lg font-semibold mb-4 text-yellow-400 flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        Nota Médica
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        A DPP é uma estimativa estatística. Apenas 5% dos bebês nascem na data exata. O parto é considerado normal entre <strong>37 e 42 semanas</strong>.
                                    </p>
                                </div>

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 text-white">Dúvidas Frequentes</h3>
                                    <div className="space-y-3 text-sm text-gray-400">
                                        <div>
                                            <strong className="text-white block">E se eu não lembrar a data?</strong>
                                            <p>O cálculo mais confiável será feito pela primeira ultrassonografia (entre 6 e 12 semanas).</p>
                                        </div>
                                        <div className="border-t border-white/5 pt-3">
                                            <strong className="text-white block">São 9 meses ou 40 semanas?</strong>
                                            <p>O padrão médico é 40 semanas. Isso equivale a 10 meses lunares ou 9 meses e meio solares.</p>
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
