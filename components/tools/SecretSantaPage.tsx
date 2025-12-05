import React, { useState } from 'react';
import { Gift, HelpCircle, Users, Shuffle, Eye, EyeOff, Trash2, Plus, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ } from '../FAQ';
import { AppPromoBanner } from '../AppPromoBanner';
import { FAQItem } from '../../types';

type Participant = {
    id: string;
    name: string;
    target?: string;
};

const SECRET_SANTA_FAQS: FAQItem[] = [
    {
        question: "Funciona com número ímpar de pessoas?",
        answer: "Sim! A lógica do sorteio é circular (A tira B, B tira C, C tira A), então sempre funciona perfeitamente com qualquer número de participantes acima de 3."
    },
    {
        question: "Posso fazer o sorteio à distância?",
        answer: "Sim! Você pode realizar o sorteio e enviar para cada pessoa o nome de quem ela tirou (por WhatsApp ou e-mail), mantendo o sigilo."
    },
    {
        question: "O sistema garante que ninguém tire a si mesmo?",
        answer: "Sim. O algoritmo matemático utilizado bloqueia qualquer possibilidade de uma pessoa tirar o próprio nome."
    }
];

export function SecretSantaPage() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [newName, setNewName] = useState('');
    const [isDrawComplete, setIsDrawComplete] = useState(false);
    const [revealedId, setRevealedId] = useState<string | null>(null);

    const addParticipant = () => {
        if (!newName.trim()) return;
        const newParticipant: Participant = {
            id: Math.random().toString(36).substr(2, 9),
            name: newName.trim()
        };
        setParticipants([...participants, newParticipant]);
        setNewName('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addParticipant();
        }
    };

    const removeParticipant = (id: string) => {
        setParticipants(participants.filter(p => p.id !== id));
    };

    const performDraw = () => {
        if (participants.length < 3) {
            alert('Adicione pelo menos 3 participantes para realizar o sorteio.');
            return;
        }

        // Fisher-Yates Shuffle
        const shuffled = [...participants];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Assign targets in a circular loop
        const result = shuffled.map((p, index) => {
            const targetIndex = (index + 1) % shuffled.length;
            return {
                ...p,
                target: shuffled[targetIndex].name
            };
        });

        // Sort alphabetically for display
        result.sort((a, b) => a.name.localeCompare(b.name));

        setParticipants(result);
        setIsDrawComplete(true);
        setRevealedId(null);
    };

    const resetDraw = () => {
        setIsDrawComplete(false);
        setParticipants(participants.map(p => ({ ...p, target: undefined })));
        setRevealedId(null);
    };

    const toggleReveal = (id: string) => {
        if (revealedId === id) {
            setRevealedId(null);
        } else {
            setRevealedId(id);
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Sorteador de Amigo Secreto",
        "description": "Realize sorteios de Amigo Secreto online, rápido e sem papel.",
        "applicationCategory": "UtilityApplication",
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
                title="Sorteador de Amigo Secreto Online - Rápido e Sem Papel"
                description="Vai fazer Amigo Secreto? Aposente os papeizinhos. Faça o sorteio online agora mesmo, defina o valor do presente e organize sua festa de Natal."
                canonical="/calculadoras/amigo-secreto"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": SECRET_SANTA_FAQS.map(faq => ({
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
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Calculadoras', href: '/calculadoras' },
                        { label: 'Amigo Secreto', href: '/calculadoras/amigo-secreto' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Gift className="w-4 h-4 text-rose-500" />
                            <span className="text-sm text-gray-300">Dia a Dia e Utilidades</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Sorteador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Amigo Secreto</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto hidden">
                            {/* Description moved below calculator */}
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
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 min-h-[600px]">
                            {!isDrawComplete ? (
                                <>
                                    <div className="mb-6">
                                        <label className="block text-xs text-gray-500 mb-1">Adicionar Participante</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Nome da pessoa..."
                                                className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                                            />
                                            <button
                                                onClick={addParticipant}
                                                className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-xl transition-colors"
                                            >
                                                <Plus className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                        {participants.length === 0 && (
                                            <p className="text-center text-gray-500 py-4 text-sm">Nenhum participante adicionado ainda.</p>
                                        )}
                                        {participants.map(p => (
                                            <div key={p.id} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5 group">
                                                <span className="font-medium text-white">{p.name}</span>
                                                <button
                                                    onClick={() => removeParticipant(p.id)}
                                                    className="text-gray-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                                            <span>Total: {participants.length} participantes</span>
                                            {participants.length < 3 && <span className="text-rose-400 text-xs">Mínimo de 3 pessoas</span>}
                                        </div>
                                        <button
                                            onClick={performDraw}
                                            disabled={participants.length < 3}
                                            className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
                                        >
                                            <Shuffle className="w-5 h-5" />
                                            Realizar Sorteio
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center mb-6">
                                        <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                        <h3 className="text-green-400 font-bold">Sorteio Realizado!</h3>
                                        <p className="text-sm text-gray-400">Agora cada um pode ver quem tirou.</p>
                                    </div>

                                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {participants.map(p => (
                                            <div key={p.id} className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-lg text-white">{p.name}</span>
                                                    <button
                                                        onClick={() => toggleReveal(p.id)}
                                                        className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-colors ${revealedId === p.id ? 'bg-rose-500/20 text-rose-400' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
                                                    >
                                                        {revealedId === p.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                                        {revealedId === p.id ? 'Ocultar' : 'Ver quem tirei'}
                                                    </button>
                                                </div>

                                                {revealedId === p.id && (
                                                    <div className="mt-3 p-3 bg-white/5 rounded-lg text-center border border-white/5 animate-in fade-in slide-in-from-top-2">
                                                        <span className="text-xs text-gray-500 block mb-1">Você tirou:</span>
                                                        <span className="text-xl font-bold text-rose-400">{p.target}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={resetDraw}
                                        className="w-full mt-6 bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 rounded-xl transition-colors border border-white/10"
                                    >
                                        Reiniciar Sorteio
                                    </button>
                                </div>
                            )}
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
                                <Users className="w-5 h-5 text-rose-500" />
                                Por que usar o Sorteador Online?
                            </h3>
                            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    O sorteio digital elimina a falha humana (ninguém tira o próprio nome) e garante imparcialidade.
                                </p>
                                <ul className="space-y-2 mt-2">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                        <span><strong>Sem "Autosorteio":</strong> O sistema bloqueia matematicamente a chance de alguém tirar a si mesmo.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                        <span><strong>Imparcialidade:</strong> Ninguém manipula o papelzinho.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                                        <span><strong>Remoto:</strong> Organize tudo pelo WhatsApp sem precisar reunir todos antes.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400">
                                <Info className="w-5 h-5" />
                                Dica de Economia
                            </h3>
                            <p className="text-sm text-gray-300">
                                Amigo Secreto é ótimo para o Natal de grandes famílias. Em vez de comprar 15 presentes baratos, você compra apenas um presente de melhor qualidade. Gasta-se menos e a qualidade aumenta para todos.
                            </p>
                        </div>

                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white">Regras de Ouro</h3>
                            <div className="space-y-3 text-sm text-gray-400">
                                <div>
                                    <strong className="text-white block">Faixa de Preço</strong>
                                    <p>Defina um valor mínimo e máximo para garantir igualdade nos presentes.</p>
                                </div>
                                <div className="border-t border-white/5 pt-3">
                                    <strong className="text-white block">Lista de Desejos</strong>
                                    <p>Incentive cada um a dizer 3 opções de presente ou tamanho de roupa.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12">
                    <p>
                        Organize a troca de presentes da família ou empresa em segundos. Sem papelzinhos, sem repetições.
                    </p>
                </div>

                <FAQ
                    items={SECRET_SANTA_FAQS}
                    title="Dúvidas Frequentes sobre Amigo Secreto"
                    className="py-12"
                    showSocialProof={false}
                />

                <AppPromoBanner />
            </div>
        </section>
    );
}
