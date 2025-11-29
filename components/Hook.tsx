
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, CheckCheck, ArrowRight, PieChart, AlertCircle, Send, Loader2, Wallet, Phone, Video, MoreVertical, ChevronLeft, Paperclip, Mic, Camera, Smile } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const ProblemCard = ({ text, delay }: { text: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="group flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a]/50 border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300"
    >
        <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
            <X size={18} className="text-gray-500 group-hover:text-red-400 transition-colors" />
        </div>
        <p className="text-gray-400 font-medium text-sm md:text-base group-hover:text-gray-200 transition-colors">
            {text}
        </p>
    </motion.div>
);

interface Transaction {
    title: string;
    value: number;
    category: string;
    type: 'expense' | 'income';
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string | Transaction;
    timestamp: string;
}

export const Hook: React.FC = () => {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'user',
            content: 'Gastei 45,90 no almoço',
            timestamp: '14:30'
        },
        {
            id: '2',
            role: 'assistant',
            content: { title: 'Almoço', value: 45.90, category: 'Alimentação', type: 'expense' },
            timestamp: '14:30'
        }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            let transaction: Transaction;

            // Attempt to use Gemini API if Key is available
            if (process.env.API_KEY) {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `Analise esta mensagem financeira: "${userMsg.content}". 
                Identifique o item, o valor e sugira uma categoria (ex: Alimentação, Transporte, Lazer, Casa, Saúde, Salário, Investimento).
                Identifique se é despesa (expense) ou receita (income).
                Retorne JSON.`,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                value: { type: Type.NUMBER },
                                category: { type: Type.STRING },
                                type: { type: Type.STRING, enum: ["expense", "income"] }
                            }
                        }
                    }
                });

                const json = JSON.parse(response.text || "{}");
                transaction = {
                    title: json.title || "Despesa",
                    value: json.value || 0,
                    category: json.category || "Geral",
                    type: json.type || "expense"
                };
            } else {
                // Fallback simulation if no API Key (for demo stability)
                // Extract number
                const numbers = userMsg.content.toString().match(/(\d+[.,]?\d*)/);
                const value = numbers ? parseFloat(numbers[0].replace(',', '.')) : 0;

                // Simple keyword matching
                const lowerText = userMsg.content.toString().toLowerCase();
                let category = "Outros";
                let type: 'expense' | 'income' = 'expense';
                let title = "Novo Lançamento";

                if (lowerText.includes('uber') || lowerText.includes('taxi') || lowerText.includes('gasolina')) category = "Transporte";
                else if (lowerText.includes('mercado') || lowerText.includes('almoço') || lowerText.includes('jantar') || lowerText.includes('ifood')) category = "Alimentação";
                else if (lowerText.includes('salário') || lowerText.includes('recebi') || lowerText.includes('pix recebido')) {
                    category = "Renda";
                    type = "income";
                } else if (lowerText.includes('luz') || lowerText.includes('internet') || lowerText.includes('aluguel')) category = "Casa";

                // Try to guess title from text (removing numbers)
                const words = lowerText.replace(/[0-9.,R$]/g, '').trim().split(' ');
                const possibleTitle = words.filter(w => w.length > 3 && !['gastei', 'comprei', 'paguei', 'no', 'na', 'com'].includes(w)).slice(0, 2).join(' ');
                if (possibleTitle) title = possibleTitle.charAt(0).toUpperCase() + possibleTitle.slice(1);

                // Simulation delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                transaction = { title, value, category, type };
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: transaction,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            console.error("AI Error:", error);
            // Silent fallback or error message in UI could be added here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-32 px-4 relative bg-background overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Left Column - Video/Demo */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative order-2 lg:order-1"
                >
                    <div className="relative w-full aspect-[9/19] max-w-sm mx-auto rounded-[3rem] overflow-hidden border-[8px] border-[#1a1a1a] shadow-2xl bg-[#111]">
                        {/* Simulated Chat Interface - WhatsApp Clone */}
                        <div className="absolute inset-0 flex flex-col h-full bg-black">
                            {/* Header */}
                            <div className="bg-[#202c33] px-2 py-3 flex items-center gap-1 z-10 shadow-sm">
                                <div className="flex items-center gap-1 text-[#00a884]">
                                    <ChevronLeft size={24} className="text-white" />
                                </div>
                                <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold border border-primary/20 mr-2 overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=FinZap&background=00a884&color=fff" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <span className="text-white font-medium text-base leading-tight">FinZap <span className="text-[#00a884] ml-1">✔</span></span>
                                    <span className="text-xs text-white/60">online</span>
                                </div>
                                <div className="flex items-center gap-4 text-white mr-2">
                                    <Video size={22} />
                                    <Phone size={20} />
                                    <MoreVertical size={20} />
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 relative bg-black overflow-hidden">
                                {/* WhatsApp Doodle Background - Fixed */}
                                <div className="absolute inset-0 opacity-[0.1] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-[length:400px_auto] pointer-events-none grayscale z-0"></div>

                                {/* Scrollable Content */}
                                <div
                                    ref={scrollRef}
                                    className="absolute inset-0 overflow-y-auto p-4 flex flex-col gap-2 z-10"
                                >
                                    {/* Date Divider */}
                                    <div className="flex justify-center mb-4 relative z-10">
                                        <span className="bg-[#1f2c34] text-[#8696a0] text-xs px-3 py-1.5 rounded-lg shadow-sm font-medium">
                                            Hoje
                                        </span>
                                    </div>

                                    {/* Static Message 1 (User) */}
                                    <div className="self-end max-w-[85%] relative z-10 group">
                                        <div className="bg-[#005c4b] text-white p-2 pl-3 pr-2 rounded-lg rounded-tr-none shadow-sm text-[14.2px] leading-[19px]">
                                            <span>Gastei 120 reais no mercado e 30 na farmácia</span>
                                            <div className="flex justify-end items-end gap-1 mt-1 -mb-1">
                                                <span className="text-[11px] text-white/60 font-medium">10:42</span>
                                                <span className="text-[#53bdeb]"><CheckCheck size={16} className="ml-0.5" /></span>
                                            </div>
                                        </div>
                                        {/* Tail */}
                                        <div className="absolute top-0 -right-2 w-3 h-3 bg-[#005c4b] [clip-path:polygon(0_0,100%_0,0_100%)]"></div>
                                    </div>

                                    {/* Static Message 2 (Bot/Other) */}
                                    <div className="self-start max-w-[85%] relative z-10 mt-1">
                                        <div className="bg-[#202c33] text-white p-2 pl-3 pr-2 rounded-lg rounded-tl-none shadow-sm text-[14.2px] leading-[19px]">
                                            <p className="font-bold text-[#00a884] text-xs mb-1">FinZap AI</p>
                                            <div className="bg-black/20 rounded-md p-2 mb-2 border-l-4 border-[#00a884]">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs text-white/80 capitalize flex items-center gap-1">
                                                        🛒 Mercado
                                                    </span>
                                                    <span className="text-xs font-bold text-white">
                                                        R$ 120,00
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-white/80 capitalize flex items-center gap-1">
                                                        💊 Saúde
                                                    </span>
                                                    <span className="text-xs font-bold text-white">
                                                        R$ 30,00
                                                    </span>
                                                </div>
                                            </div>
                                            <span>Lançamentos confirmados! ✅</span>
                                            <div className="flex justify-end items-end gap-1 mt-1 -mb-1">
                                                <span className="text-[11px] text-white/60 font-medium">10:42</span>
                                            </div>
                                        </div>
                                        {/* Tail */}
                                        <div className="absolute top-0 -left-2 w-3 h-3 bg-[#202c33] [clip-path:polygon(100%_0,0_0,100%_100%)]"></div>
                                    </div>

                                    {/* Dynamic Messages from State */}
                                    {messages.slice(2).map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10 mb-1`}>
                                            {msg.role === 'user' ? (
                                                <div className="relative max-w-[85%]">
                                                    <div className="bg-[#005c4b] text-white p-2 pl-3 pr-2 rounded-lg rounded-tr-none shadow-sm text-[14.2px] leading-[19px]">
                                                        {typeof msg.content === 'string' ? msg.content : ''}
                                                        <div className="flex justify-end items-end gap-1 mt-1 -mb-1">
                                                            <span className="text-[11px] text-white/60 font-medium">{msg.timestamp}</span>
                                                            <span className="text-[#53bdeb]"><CheckCheck size={16} className="ml-0.5" /></span>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-0 -right-2 w-3 h-3 bg-[#005c4b] [clip-path:polygon(0_0,100%_0,0_100%)]"></div>
                                                </div>
                                            ) : (
                                                <div className="relative max-w-[85%]">
                                                    <div className="bg-[#202c33] text-white p-2 pl-3 pr-2 rounded-lg rounded-tl-none shadow-sm text-[14.2px] leading-[19px]">
                                                        {typeof msg.content !== 'string' && (
                                                            <>
                                                                <p className="font-bold text-[#00a884] text-xs mb-1">FinZap AI</p>
                                                                <div className="bg-black/20 rounded-md p-2 mb-2 border-l-4 border-[#00a884]">
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-xs text-white/80 capitalize flex items-center gap-1">
                                                                            {(() => {
                                                                                const cat = msg.content.category.toLowerCase();
                                                                                if (cat.includes('alimentação') || cat.includes('mercado') || cat.includes('comida')) return '🛒';
                                                                                if (cat.includes('transporte') || cat.includes('uber') || cat.includes('gasolina')) return '🚗';
                                                                                if (cat.includes('saúde') || cat.includes('farmácia') || cat.includes('médico')) return '💊';
                                                                                if (cat.includes('lazer') || cat.includes('cinema') || cat.includes('jogo')) return '🎮';
                                                                                if (cat.includes('casa') || cat.includes('aluguel') || cat.includes('luz')) return '🏠';
                                                                                return '📝';
                                                                            })()} {msg.content.title}
                                                                        </span>
                                                                        <span className="text-xs font-bold text-white">
                                                                            R$ {msg.content.value.toFixed(2).replace('.', ',')}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <span>Lançamentos confirmados! ✅</span>
                                                            </>
                                                        )}
                                                        <div className="flex justify-end items-end gap-1 mt-1 -mb-1">
                                                            <span className="text-[11px] text-white/60 font-medium">{msg.timestamp}</span>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-0 -left-2 w-3 h-3 bg-[#202c33] [clip-path:polygon(100%_0,0_0,100%_100%)]"></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="self-start bg-[#202c33] px-3 py-2 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2 relative z-10">
                                            <Loader2 size={14} className="animate-spin text-[#00a884]" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="bg-[#202c33] p-2 flex items-end gap-2 min-h-[62px] items-center">
                                <button className="p-2 text-[#8696a0] hover:text-white transition-colors">
                                    <Smile size={24} />
                                </button>
                                <div className="flex-1 bg-[#2a3942] rounded-lg flex items-center min-h-[42px] px-3 gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Mensagem"
                                        className="flex-1 bg-transparent border-none focus:ring-0 text-white text-[15px] placeholder:text-[#8696a0] outline-none h-full py-2"
                                        disabled={isLoading}
                                    />
                                    <div className="flex items-center gap-3 text-[#8696a0]">
                                        <Paperclip size={20} className="rotate-45" />
                                        {!input && <Camera size={20} />}
                                    </div>
                                </div>
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-md hover:bg-[#008f6f] transition-colors shrink-0"
                                >
                                    {input.trim() ? <Send size={20} className="ml-0.5" /> : <Mic size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Glow behind phone */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-primary/10 blur-[80px] -z-10"></div>
                </motion.div>

                {/* Right Column - Text */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-10 order-1 lg:order-2"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-white uppercase tracking-tight">
                            Pare de sofrer com <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">planilhas</span> <br /> complexas
                        </h2>
                        <div className="h-1.5 w-24 bg-primary mt-6 rounded-full shadow-[0_0_15px_rgba(71,255,183,0.5)]"></div>
                    </div>

                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-lg border-l-2 border-white/10 pl-6">
                        Você sabe que precisa organizar o dinheiro, mas odeia abrir o Excel ou apps complicados cheios de botões.
                        <span className="text-white font-medium block mt-2">A gente te entende.</span>
                    </p>

                    <div className="flex flex-col gap-4 mt-2">

                        {/* Card 1: Problem */}
                        <div className="group flex items-center gap-5 p-5 rounded-2xl bg-[#1a0505]/50 border border-red-500/10 hover:border-red-500/30 hover:bg-[#1a0505] transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-red-500/10">
                                <X size={24} className="text-red-500" />
                            </div>
                            <p className="text-gray-300 font-medium text-lg group-hover:text-red-100 transition-colors">Apps manuais que você esquece de preencher.</p>
                        </div>

                        {/* Card 2: Problem */}
                        <div className="group flex items-center gap-5 p-5 rounded-2xl bg-[#1a0505]/50 border border-red-500/10 hover:border-red-500/30 hover:bg-[#1a0505] transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-red-500/10">
                                <X size={24} className="text-red-500" />
                            </div>
                            <p className="text-gray-300 font-medium text-lg group-hover:text-red-100 transition-colors">Planilhas que quebram e são difíceis de usar no celular.</p>
                        </div>

                        {/* Card 3: Solution */}
                        <div className="relative mt-6 p-1 rounded-[26px] bg-gradient-to-br from-primary/30 to-transparent">
                            <div className="relative p-6 rounded-3xl bg-[#051a14] border border-primary/20 overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full"></div>

                                <div className="flex items-center gap-6 relative z-10">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-[#00cc99] flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(71,255,183,0.3)] group-hover:scale-110 transition-transform duration-300">
                                        <Check size={28} className="text-black stroke-[3]" />
                                    </div>
                                    <div>
                                        <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                                            A Solução Definitiva
                                        </p>
                                        <p className="text-white font-bold text-xl md:text-2xl leading-tight">Com FinZap, é tão fácil quanto mandar um "oi".</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
};
