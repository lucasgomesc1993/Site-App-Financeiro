import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Gift, Plus, Trash2, Shuffle, CheckCircle2, EyeOff, Eye, Users, Info } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
const SECRET_SANTA_FAQS = [
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
function SecretSantaPage() {
  const [participants, setParticipants] = useState([]);
  const [newName, setNewName] = useState("");
  const [isDrawComplete, setIsDrawComplete] = useState(false);
  const [revealedId, setRevealedId] = useState(null);
  const addParticipant = () => {
    if (!newName.trim()) return;
    const newParticipant = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName.trim()
    };
    setParticipants([...participants, newParticipant]);
    setNewName("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addParticipant();
    }
  };
  const removeParticipant = (id) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };
  const performDraw = () => {
    if (participants.length < 3) {
      alert("Adicione pelo menos 3 participantes para realizar o sorteio.");
      return;
    }
    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const result = shuffled.map((p, index) => {
      const targetIndex = (index + 1) % shuffled.length;
      return {
        ...p,
        target: shuffled[targetIndex].name
      };
    });
    result.sort((a, b) => a.name.localeCompare(b.name));
    setParticipants(result);
    setIsDrawComplete(true);
    setRevealedId(null);
  };
  const resetDraw = () => {
    setIsDrawComplete(false);
    setParticipants(participants.map((p) => ({ ...p, target: void 0 })));
    setRevealedId(null);
  };
  const toggleReveal = (id) => {
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
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Sorteador de Amigo Secreto Online - Rápido e Sem Papel",
        description: "Vai fazer Amigo Secreto? Aposente os papeizinhos. Faça o sorteio online agora mesmo, defina o valor do presente e organize sua festa de Natal.",
        canonical: "/calculadoras/amigo-secreto"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": SECRET_SANTA_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Amigo Secreto", href: "/calculadoras/amigo-secreto" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Gift, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dia a Dia e Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Sorteador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Amigo Secreto" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto hidden" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsx("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 min-h-[600px]", children: !isDrawComplete ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs text-gray-500 mb-1", children: "Adicionar Participante" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: newName,
                      onChange: (e) => setNewName(e.target.value),
                      onKeyDown: handleKeyDown,
                      placeholder: "Nome da pessoa...",
                      className: "flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: addParticipant,
                      className: "bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-xl transition-colors",
                      children: /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar", children: [
                participants.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 py-4 text-sm", children: "Nenhum participante adicionado ainda." }),
                participants.map((p) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5 group", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: p.name }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => removeParticipant(p.id),
                      className: "text-gray-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }, p.id))
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-white/5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Total: ",
                    participants.length,
                    " participantes"
                  ] }),
                  participants.length < 3 && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs", children: "Mínimo de 3 pessoas" })
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: performDraw,
                    disabled: participants.length < 3,
                    className: "w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20",
                    children: [
                      /* @__PURE__ */ jsx(Shuffle, { className: "w-5 h-5" }),
                      "Realizar Sorteio"
                    ]
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center mb-6", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-8 h-8 text-green-500 mx-auto mb-2" }),
                /* @__PURE__ */ jsx("h3", { className: "text-green-400 font-bold", children: "Sorteio Realizado!" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Agora cada um pode ver quem tirou." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar", children: participants.map((p) => /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0a0a] p-4 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-lg text-white", children: p.name }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => toggleReveal(p.id),
                      className: `flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-colors ${revealedId === p.id ? "bg-rose-500/20 text-rose-400" : "bg-white/10 text-gray-400 hover:bg-white/20"}`,
                      children: [
                        revealedId === p.id ? /* @__PURE__ */ jsx(EyeOff, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3" }),
                        revealedId === p.id ? "Ocultar" : "Ver quem tirei"
                      ]
                    }
                  )
                ] }),
                revealedId === p.id && /* @__PURE__ */ jsxs("div", { className: "mt-3 p-3 bg-white/5 rounded-lg text-center border border-white/5 animate-in fade-in slide-in-from-top-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 block mb-1", children: "Você tirou:" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-rose-400", children: p.target })
                ] })
              ] }, p.id)) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: resetDraw,
                  className: "w-full mt-6 bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 rounded-xl transition-colors border border-white/10",
                  children: "Reiniciar Sorteio"
                }
              )
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                  /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 text-rose-500" }),
                  "Por que usar o Sorteador Online?"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 text-sm leading-relaxed", children: [
                  /* @__PURE__ */ jsx("p", { children: "O sorteio digital elimina a falha humana (ninguém tira o próprio nome) e garante imparcialidade." }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-2 mt-2", children: [
                    /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        /* @__PURE__ */ jsx("strong", { children: 'Sem "Autosorteio":' }),
                        " O sistema bloqueia matematicamente a chance de alguém tirar a si mesmo."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        /* @__PURE__ */ jsx("strong", { children: "Imparcialidade:" }),
                        " Ninguém manipula o papelzinho."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        /* @__PURE__ */ jsx("strong", { children: "Remoto:" }),
                        " Organize tudo pelo WhatsApp sem precisar reunir todos antes."
                      ] })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400", children: [
                  /* @__PURE__ */ jsx(Info, { className: "w-5 h-5" }),
                  "Dica de Economia"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Amigo Secreto é ótimo para o Natal de grandes famílias. Em vez de comprar 15 presentes baratos, você compra apenas um presente de melhor qualidade. Gasta-se menos e a qualidade aumenta para todos." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4 text-white", children: "Regras de Ouro" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Faixa de Preço" }),
                    /* @__PURE__ */ jsx("p", { children: "Defina um valor mínimo e máximo para garantir igualdade nos presentes." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "border-t border-white/5 pt-3", children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Lista de Desejos" }),
                    /* @__PURE__ */ jsx("p", { children: "Incentive cada um a dizer 3 opções de presente ou tamanho de roupa." })
                  ] })
                ] })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Organize a troca de presentes da família ou empresa em segundos. Sem papelzinhos, sem repetições." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: SECRET_SANTA_FAQS,
          title: "Dúvidas Frequentes sobre Amigo Secreto",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  SecretSantaPage
};
//# sourceMappingURL=SecretSantaPage-RSOFwx7L.js.map
