import React, { useState } from 'react';
import { Gift, ArrowLeft, HelpCircle, Users, Shuffle, Eye, EyeOff, Trash2, Plus, Info, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../SEO';

type Participant = {
    id: string;
    name: string;
    target?: string; // The name of the person they drew
};

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

        // Assign targets in a circular loop to guarantee no self-draws and single loop
        const result = shuffled.map((p, index) => {
            const targetIndex = (index + 1) % shuffled.length;
            return {
                ...p,
                target: shuffled[targetIndex].name
            };
        });

        // Sort back by name for display if desired, or keep shuffled order.
        // Keeping shuffled order hides the loop pattern slightly better visually if listed.
        // But let's sort alphabetically for user convenience to find their name.
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

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-primary/20 selection:text-primary">
            <SEO
                title="Sorteador de Amigo Secreto Online - Rápido e Sem Papel"
                description="Vai fazer Amigo Secreto? Aposente os papeizinhos. Faça o sorteio online agora mesmo, defina o valor do presente e organize sua festa de Natal."
                canonical="/ferramentas/amigo-secreto"
            />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link to="/calculadoras" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para Ferramentas
                </Link>

                <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-red-500/10 rounded-2xl">
                                <Gift className="w-8 h-8 text-red-500" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Sorteador de Amigo Secreto
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Organize a troca de presentes da família ou empresa em segundos.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-8">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">

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
                                                        className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500/50 transition-all"
                                                    />
                                                    <button
                                                        onClick={addParticipant}
                                                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-colors"
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
                                                        <span className="font-medium">{p.name}</span>
                                                        <button
                                                            onClick={() => removeParticipant(p.id)}
                                                            className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-4 border-t border-white/5">
                                                <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                                                    <span>Total: {participants.length} participantes</span>
                                                    {participants.length < 3 && <span className="text-red-400 text-xs">Mínimo de 3 pessoas</span>}
                                                </div>
                                                <button
                                                    onClick={performDraw}
                                                    disabled={participants.length < 3}
                                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
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
                                                    <div key={p.id} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="font-bold text-lg">{p.name}</span>
                                                            <button
                                                                onClick={() => toggleReveal(p.id)}
                                                                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-colors ${revealedId === p.id ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
                                                            >
                                                                {revealedId === p.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                                                {revealedId === p.id ? 'Ocultar' : 'Ver quem tirei'}
                                                            </button>
                                                        </div>

                                                        {revealedId === p.id && (
                                                            <div className="mt-3 p-3 bg-black/40 rounded-lg text-center border border-white/5 animate-in fade-in slide-in-from-top-2">
                                                                <span className="text-xs text-gray-500 block mb-1">Você tirou:</span>
                                                                <span className="text-xl font-bold text-red-400">{p.target}</span>
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

                                <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400">
                                        <Info className="w-5 h-5" />
                                        Dica de Economia
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        Amigo Secreto é ótimo para o Natal de grandes famílias. Em vez de comprar 15 presentes baratos, você compra apenas um presente de melhor qualidade. Gasta-se menos e a qualidade aumenta para todos.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-red-500" />
                                        Por que usar o Sorteador Online?
                                    </h3>
                                    <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                        <p>
                                            O sorteio digital elimina a falha humana (ninguém tira o próprio nome) e garante imparcialidade.
                                        </p>
                                        <ul className="space-y-2 mt-2">
                                            <li className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                                <span><strong>Sem "Autosorteio":</strong> O sistema bloqueia matematicamente a chance de alguém tirar a si mesmo.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                                <span><strong>Imparcialidade:</strong> Ninguém manipula o papelzinho.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                                <span><strong>Remoto:</strong> Organize tudo pelo WhatsApp sem precisar reunir todos antes.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
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

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-lg font-semibold mb-4 text-white">Dúvidas Frequentes</h3>
                                    <div className="space-y-3 text-sm text-gray-400">
                                        <div>
                                            <strong className="text-white block">Funciona com número ímpar?</strong>
                                            <p>Sim! A lógica é circular, então sempre fecha o ciclo perfeitamente.</p>
                                        </div>
                                        <div className="border-t border-white/5 pt-3">
                                            <strong className="text-white block">Posso fazer à distância?</strong>
                                            <p>Sim! Basta realizar o sorteio e informar a cada pessoa quem ela tirou (por mensagem privada).</p>
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
