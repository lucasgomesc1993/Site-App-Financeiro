import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { QrCode, RefreshCw, CheckCircle2, Copy, Download } from "lucide-react";
import { motion } from "framer-motion";
import { S as SEO } from "./SEO-Cm8ngfJd.js";
import { B as Breadcrumb } from "./Breadcrumb-B-PV_K4y.js";
import { FAQ } from "./FAQ-DBChmTgn.js";
import { AppPromoBanner } from "./AppPromoBanner-DsGa7GAJ.js";
import { QRCodeSVG } from "qrcode.react";
import "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "./CalculatorContext-CjI84puU.js";
import "./author-BdzMjBtJ.js";
function crc16ccitt(str) {
  let crc = 65535;
  const strlen = str.length;
  for (let c = 0; c < strlen; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 32768) {
        crc = crc << 1 ^ 4129;
      } else {
        crc = crc << 1;
      }
    }
  }
  let hex = (crc & 65535).toString(16).toUpperCase();
  if (hex.length < 4) {
    hex = "0".repeat(4 - hex.length) + hex;
  }
  return hex;
}
const PIX_FAQS = [
  {
    question: "O QR Code Pix gerado expira?",
    answer: "Não. O QR Code estático gerado aqui não tem data de validade, a menos que você defina um identificador de transação específico que seu banco trate de forma diferente. Mas, em geral, ele pode ser usado indefinidamente."
  },
  {
    question: "Tem alguma taxa para gerar?",
    answer: "Não! Nossa ferramenta é 100% gratuita. Você não paga nada para gerar o código e nem taxas sobre as transferências recebidas (para pessoas físicas)."
  },
  {
    question: "É seguro?",
    answer: "Sim. O código é gerado diretamente no seu navegador. Nós não armazenamos seus dados bancários nem temos acesso à sua conta. O QR Code apenas contém as informações para o pagamento."
  }
];
function PixGeneratorPage() {
  const [pixKey, setPixKey] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState("***");
  const [payload, setPayload] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!pixKey || !name || !city) {
      setPayload("");
      return;
    }
    const cleanAmount = amount.replace(/\./g, "").replace(",", ".");
    const formattedAmount = cleanAmount ? parseFloat(cleanAmount).toFixed(2) : "0.00";
    const formatField = (id, value) => {
      const len = value.length.toString().padStart(2, "0");
      return `${id}${len}${value}`;
    };
    let rawPayload = formatField("00", "01");
    const gui = formatField("00", "br.gov.bcb.pix");
    const key = formatField("01", pixKey);
    const merchantAccount = formatField("26", gui + key);
    rawPayload += merchantAccount;
    rawPayload += formatField("52", "0000");
    rawPayload += formatField("53", "986");
    if (parseFloat(formattedAmount) > 0) {
      rawPayload += formatField("54", formattedAmount);
    }
    rawPayload += formatField("58", "BR");
    rawPayload += formatField("59", name.substring(0, 25));
    rawPayload += formatField("60", city.substring(0, 15));
    const txidField = formatField("05", txid || "***");
    rawPayload += formatField("62", txidField);
    rawPayload += "6304";
    const crc = crc16ccitt(rawPayload);
    setPayload(rawPayload + crc);
  }, [pixKey, name, city, amount, txid]);
  const handleCopy = () => {
    if (!payload) return;
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleDownload = () => {
    const svg = document.getElementById("qrcode-pix");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `pix-${name.replace(/\s+/g, "-").toLowerCase()}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };
  const handleCurrencyInput = (value) => {
    const number = value.replace(/\D/g, "");
    const formatted = (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    setAmount(formatted);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Gerador de QR Code Pix Grátis",
    "description": "Crie QR Codes Pix personalizados e Copia e Cola gratuitamente. Ferramenta segura para gerar cobranças instantâneas.",
    "applicationCategory": "FinanceApplication",
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
        title: "Gerador de QR Code Pix Grátis - Copia e Cola Seguro",
        description: "Crie QR Codes Pix personalizados gratuitamente. Gere códigos Copia e Cola instantâneos, baixe a imagem e receba pagamentos sem taxas.",
        canonical: "/calculadoras/gerador-pix"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": PIX_FAQS.map((faq) => ({
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
          { label: "Gerador de Pix", href: "/calculadoras/gerador-pix" }
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
                /* @__PURE__ */ jsx(QrCode, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Gerador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "QR Code Pix" })
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
            className: "lg:col-span-5",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 min-h-[600px]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 text-rose-500" }),
                "Dados do Recebedor"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Chave Pix" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: pixKey,
                      onChange: (e) => setPixKey(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                      placeholder: "CPF, CNPJ, E-mail ou Celular"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Nome do Beneficiário" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                      placeholder: "Nome completo ou Razão Social"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Cidade" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: city,
                      onChange: (e) => setCity(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                      placeholder: "Cidade do beneficiário"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor (Opcional)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        inputMode: "decimal",
                        value: amount,
                        onChange: (e) => handleCurrencyInput(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Identificador (Opcional)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: txid,
                      onChange: (e) => setTxid(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                      placeholder: "Código da transação (TXID)"
                    }
                  )
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsx("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full flex flex-col items-center justify-center text-center", children: payload ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-2xl mb-8 shadow-2xl shadow-rose-500/20", children: /* @__PURE__ */ jsx(
                QRCodeSVG,
                {
                  id: "qrcode-pix",
                  value: payload,
                  size: 250,
                  level: "H",
                  includeMargin: true
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 w-full max-w-md", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleCopy,
                    className: "flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-3 px-6 rounded-xl font-medium transition-all active:scale-95",
                    children: [
                      copied ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Copy, { className: "w-5 h-5" }),
                      copied ? "Copiado!" : "Copiar Código"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleDownload,
                    className: "flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl font-medium transition-all active:scale-95 border border-white/10",
                    children: [
                      /* @__PURE__ */ jsx(Download, { className: "w-5 h-5" }),
                      "Baixar QR Code"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-6 max-w-sm", children: 'Abra o app do seu banco, escolha "Pagar com Pix" e escaneie o código ou use a opção "Pix Copia e Cola".' })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "text-gray-500", children: [
              /* @__PURE__ */ jsx(QrCode, { className: "w-24 h-24 mx-auto mb-4 opacity-20" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Preencha os dados para gerar o QR Code" })
            ] }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12", children: /* @__PURE__ */ jsx("p", { children: "Crie cobranças instantâneas. Gere QR Codes estáticos para receber pagamentos de forma fácil e segura." }) }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: PIX_FAQS,
          title: "Dúvidas sobre Pix",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner, {})
    ] })
  ] });
}
export {
  PixGeneratorPage
};
//# sourceMappingURL=PixGeneratorPage-BQhMCz6F.js.map
