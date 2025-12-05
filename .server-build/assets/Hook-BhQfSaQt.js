import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Video, Phone, MoreVertical, CheckCheck, Loader2, Smile, Paperclip, Camera, Send, Mic, X, Check } from "lucide-react";
import { GoogleGenAI, Type } from "@google/genai";
const Hook = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "user",
      content: "Gastei 45,90 no almoço",
      timestamp: "14:30"
    },
    {
      id: "2",
      role: "assistant",
      content: { title: "Almoço", value: 45.9, category: "Alimentação", type: "expense" },
      timestamp: "14:30"
    }
  ]);
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    try {
      let transaction;
      if ("AIzaSyDGjDuLqao4jlpUNsDZlC_Je1_MqtD3aZk") {
        const ai = new GoogleGenAI({ apiKey: "AIzaSyDGjDuLqao4jlpUNsDZlC_Je1_MqtD3aZk" });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
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
      }
      const botMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: transaction,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "py-32 px-4 relative bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -50 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.8 },
          className: "relative order-2 lg:order-1",
          children: [
            /* @__PURE__ */ jsx("div", { className: "relative w-full aspect-[9/19] max-w-sm mx-auto rounded-[3rem] overflow-hidden border-[8px] border-[#1a1a1a] shadow-2xl bg-[#111]", children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col h-full bg-black", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#202c33] px-2 py-3 flex items-center gap-1 z-10 shadow-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 text-[#00a884]", children: /* @__PURE__ */ jsx(ChevronLeft, { size: 24, className: "text-white" }) }),
                /* @__PURE__ */ jsx("div", { className: "w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold border border-primary/20 mr-2 overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: "https://ui-avatars.com/api/?name=Junny&background=00a884&color=fff", alt: "Profile", className: "w-full h-full object-cover" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col justify-center", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-white font-medium text-base leading-tight", children: [
                    "Junny ",
                    /* @__PURE__ */ jsx("span", { className: "text-[#00a884] ml-1", children: "✔" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-white/60", children: "online" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-white mr-2", children: [
                  /* @__PURE__ */ jsx(Video, { size: 22 }),
                  /* @__PURE__ */ jsx(Phone, { size: 20 }),
                  /* @__PURE__ */ jsx(MoreVertical, { size: 20 })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 relative bg-black overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.1] bg-[url('/whatsapp-bg.webp')] bg-repeat bg-[length:400px_auto] pointer-events-none grayscale z-0" }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    ref: scrollRef,
                    className: "absolute inset-0 overflow-y-auto p-4 flex flex-col gap-2 z-10",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4 relative z-10", children: /* @__PURE__ */ jsx("span", { className: "bg-[#1f2c34] text-[#8696a0] text-xs px-3 py-1.5 rounded-lg shadow-sm font-medium", children: "Hoje" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "self-end max-w-[85%] relative z-10 group", children: [
                        /* @__PURE__ */ jsxs("div", { className: "bg-[#005c4b] text-white p-2 pl-3 pr-2 rounded-lg rounded-tr-none shadow-sm text-[14.2px] leading-[19px]", children: [
                          /* @__PURE__ */ jsx("span", { children: "Gastei 120 reais no mercado e 30 na farmácia" }),
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-end items-end gap-1 mt-1 -mb-1", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-[11px] text-white/60 font-medium", children: "10:42" }),
                            /* @__PURE__ */ jsx("span", { className: "text-[#53bdeb]", children: /* @__PURE__ */ jsx(CheckCheck, { size: 16, className: "ml-0.5" }) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-0 -right-2 w-3 h-3 bg-[#005c4b] [clip-path:polygon(0_0,100%_0,0_100%)]" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "self-start max-w-[85%] relative z-10 mt-1", children: [
                        /* @__PURE__ */ jsxs("div", { className: "bg-[#202c33] text-white p-2 pl-3 pr-2 rounded-lg rounded-tl-none shadow-sm text-[14.2px] leading-[19px]", children: [
                          /* @__PURE__ */ jsx("p", { className: "font-bold text-[#00a884] text-xs mb-1", children: "Junny AI" }),
                          /* @__PURE__ */ jsxs("div", { className: "bg-black/20 rounded-md p-2 mb-2 border-l-4 border-[#00a884]", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-xs text-white/80 capitalize flex items-center gap-1", children: "🛒 Mercado" }),
                              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-white", children: "R$ 120,00" })
                            ] }),
                            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-xs text-white/80 capitalize flex items-center gap-1", children: "💊 Saúde" }),
                              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-white", children: "R$ 30,00" })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx("span", { children: "Lançamentos confirmados! ✅" }),
                          /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end gap-1 mt-1 -mb-1", children: /* @__PURE__ */ jsx("span", { className: "text-[11px] text-white/60 font-medium", children: "10:42" }) })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-0 -left-2 w-3 h-3 bg-[#202c33] [clip-path:polygon(100%_0,0_0,100%_100%)]" })
                      ] }),
                      messages.slice(2).map((msg) => /* @__PURE__ */ jsx("div", { className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"} relative z-10 mb-1`, children: msg.role === "user" ? /* @__PURE__ */ jsxs("div", { className: "relative max-w-[85%]", children: [
                        /* @__PURE__ */ jsxs("div", { className: "bg-[#005c4b] text-white p-2 pl-3 pr-2 rounded-lg rounded-tr-none shadow-sm text-[14.2px] leading-[19px]", children: [
                          typeof msg.content === "string" ? msg.content : "",
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-end items-end gap-1 mt-1 -mb-1", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-[11px] text-white/60 font-medium", children: msg.timestamp }),
                            /* @__PURE__ */ jsx("span", { className: "text-[#53bdeb]", children: /* @__PURE__ */ jsx(CheckCheck, { size: 16, className: "ml-0.5" }) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-0 -right-2 w-3 h-3 bg-[#005c4b] [clip-path:polygon(0_0,100%_0,0_100%)]" })
                      ] }) : /* @__PURE__ */ jsxs("div", { className: "relative max-w-[85%]", children: [
                        /* @__PURE__ */ jsxs("div", { className: "bg-[#202c33] text-white p-2 pl-3 pr-2 rounded-lg rounded-tl-none shadow-sm text-[14.2px] leading-[19px]", children: [
                          typeof msg.content !== "string" && /* @__PURE__ */ jsxs(Fragment, { children: [
                            /* @__PURE__ */ jsx("p", { className: "font-bold text-[#00a884] text-xs mb-1", children: "Junny AI" }),
                            /* @__PURE__ */ jsx("div", { className: "bg-black/20 rounded-md p-2 mb-2 border-l-4 border-[#00a884]", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                              /* @__PURE__ */ jsxs("span", { className: "text-xs text-white/80 capitalize flex items-center gap-1", children: [
                                (() => {
                                  const cat = msg.content.category.toLowerCase();
                                  if (cat.includes("alimentação") || cat.includes("mercado") || cat.includes("comida")) return "🛒";
                                  if (cat.includes("transporte") || cat.includes("uber") || cat.includes("gasolina")) return "🚗";
                                  if (cat.includes("saúde") || cat.includes("farmácia") || cat.includes("médico")) return "💊";
                                  if (cat.includes("lazer") || cat.includes("cinema") || cat.includes("jogo")) return "🎮";
                                  if (cat.includes("casa") || cat.includes("aluguel") || cat.includes("luz")) return "🏠";
                                  return "📝";
                                })(),
                                " ",
                                msg.content.title
                              ] }),
                              /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-white", children: [
                                "R$ ",
                                msg.content.value.toFixed(2).replace(".", ",")
                              ] })
                            ] }) }),
                            /* @__PURE__ */ jsx("span", { children: "Lançamentos confirmados! ✅" })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end gap-1 mt-1 -mb-1", children: /* @__PURE__ */ jsx("span", { className: "text-[11px] text-white/60 font-medium", children: msg.timestamp }) })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-0 -left-2 w-3 h-3 bg-[#202c33] [clip-path:polygon(100%_0,0_0,100%_100%)]" })
                      ] }) }, msg.id)),
                      isLoading && /* @__PURE__ */ jsx("div", { className: "self-start bg-[#202c33] px-3 py-2 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2 relative z-10", children: /* @__PURE__ */ jsx(Loader2, { size: 14, className: "animate-spin text-[#00a884]" }) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#202c33] p-2 flex items-end gap-2 min-h-[62px] items-center", children: [
                /* @__PURE__ */ jsx("button", { className: "p-2 text-[#8696a0] hover:text-white transition-colors", "aria-label": "Inserir emoji", children: /* @__PURE__ */ jsx(Smile, { size: 24 }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-[#2a3942] rounded-lg flex items-center min-h-[42px] px-3 gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: input,
                      onChange: (e) => setInput(e.target.value),
                      onKeyDown: (e) => e.key === "Enter" && handleSend(),
                      placeholder: "Mensagem",
                      className: "flex-1 bg-transparent border-none focus:ring-0 text-white text-[15px] placeholder:text-[#8696a0] outline-none h-full py-2",
                      disabled: isLoading
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#8696a0]", children: [
                    /* @__PURE__ */ jsx(Paperclip, { size: 20, className: "rotate-45" }),
                    !input && /* @__PURE__ */ jsx(Camera, { size: 20 })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleSend,
                    disabled: !input.trim() || isLoading,
                    className: "w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-md hover:bg-[#008f6f] transition-colors shrink-0",
                    "aria-label": input.trim() ? "Enviar mensagem" : "Gravar áudio",
                    children: input.trim() ? /* @__PURE__ */ jsx(Send, { size: 20, className: "ml-0.5" }) : /* @__PURE__ */ jsx(Mic, { size: 20 })
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-primary/10 blur-[80px] -z-10" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 50 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.8 },
          className: "flex flex-col gap-10 order-1 lg:order-2",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-white uppercase tracking-tight", children: [
                "Pare de sofrer com ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "planilhas" }),
                " ",
                /* @__PURE__ */ jsx("br", {}),
                " complexas"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-1.5 w-24 bg-primary mt-6 rounded-full shadow-[0_0_15px_rgba(71,255,183,0.5)]" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-lg border-l-2 border-white/10 pl-6", children: [
              "Você sabe que precisa organizar o dinheiro, mas odeia abrir o Excel ou apps complicados cheios de botões.",
              /* @__PURE__ */ jsx("span", { className: "text-white font-medium block mt-2", children: "A gente te entende." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "group flex items-center gap-5 p-5 rounded-2xl bg-[#1a0505]/50 border border-red-500/10 hover:border-red-500/30 hover:bg-[#1a0505] transition-all duration-300", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-red-500/10", children: /* @__PURE__ */ jsx(X, { size: 24, className: "text-red-500" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-300 font-medium text-lg group-hover:text-red-100 transition-colors", children: "Apps manuais que você esquece de preencher." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "group flex items-center gap-5 p-5 rounded-2xl bg-[#1a0505]/50 border border-red-500/10 hover:border-red-500/30 hover:bg-[#1a0505] transition-all duration-300", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-red-500/10", children: /* @__PURE__ */ jsx(X, { size: 24, className: "text-red-500" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-300 font-medium text-lg group-hover:text-red-100 transition-colors", children: "Planilhas que quebram e são difíceis de usar no celular." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "relative mt-6 p-1 rounded-[26px] bg-gradient-to-br from-primary/30 to-transparent", children: /* @__PURE__ */ jsxs("div", { className: "relative p-6 rounded-3xl bg-[#051a14] border border-primary/20 overflow-hidden group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
                /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 relative z-10", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-gradient-to-br from-primary to-[#00cc99] flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(71,255,183,0.3)] group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Check, { size: 28, className: "text-black stroke-[3]" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-primary text-xs font-bold uppercase tracking-[0.2em] mb-1 flex items-center gap-2", children: "A Solução Definitiva" }),
                    /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-xl md:text-2xl leading-tight", children: 'Com a Junny, é tão fácil quanto mandar um "oi".' })
                  ] })
                ] })
              ] }) })
            ] })
          ]
        }
      )
    ] })
  ] });
};
export {
  Hook
};
//# sourceMappingURL=Hook-BhQfSaQt.js.map
