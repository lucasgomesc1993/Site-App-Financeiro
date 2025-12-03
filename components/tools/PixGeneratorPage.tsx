import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Copy, Download, DollarSign, User, MapPin, AlertCircle, CheckCircle, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import { AppPromoBanner } from '../AppPromoBanner';
import { Breadcrumb } from '../Breadcrumb';
import { SEO } from '../SEO';
import { FAQ } from '../FAQ';
import { FAQItem } from '../../types';

// Função para calcular o CRC16 (obrigatório para o padrão EMVCo do Pix)
const crc16ccitt = (payload: string): string => {
    let crc = 0xFFFF;
    for (let i = 0; i < payload.length; i++) {
        crc ^= payload.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) > 0) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc = crc << 1;
            }
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
};

// Função para formatar os campos do payload Pix (TLV - Tag Length Value)
const formatField = (id: string, value: string): string => {
    const len = value.length.toString().padStart(2, '0');
    return `${id}${len}${value}`;
};

const PIX_FAQS: FAQItem[] = [
    {
        question: "É seguro gerar QR Code Pix neste site?",
        answer: "Sim, 100% seguro. O nosso gerador roda totalmente no seu navegador. Nenhuma informação bancária ou chave Pix é enviada para nossos servidores. O código é criado através de uma fórmula matemática padrão do Banco Central (BR Code) diretamente no seu dispositivo."
    },
    {
        question: "O QR Code gerado tem validade?",
        answer: "Não. Este é um QR Code estático. Ele não expira e pode ser usado indefinidamente para receber múltiplos pagamentos. É ideal para imprimir e deixar no balcão da loja, vender produtos online ou receber doações."
    },
    {
        question: "Tem taxas para receber pelo QR Code?",
        answer: "A Junny não cobra nenhuma taxa. Porém, dependendo do seu banco e tipo de conta (PJ), a instituição financeira pode cobrar tarifas por recebimento via Pix. Para pessoas físicas (PF), o recebimento costuma ser gratuito na maioria dos bancos."
    },
    {
        question: "Posso colocar um valor fixo no QR Code?",
        answer: "Sim! Se você preencher o campo 'Valor', o cliente não conseguirá alterar o montante na hora de pagar. Se deixar em branco (ou 0), o cliente poderá digitar o valor que quiser na hora do pagamento."
    },
    {
        question: "O que é o Identificador (TxID)?",
        answer: "É um código opcional para você organizar seus recebimentos. Se você colocar 'VENDA01', esse código aparecerá no seu extrato bancário, facilitando a identificação de quem pagou o quê."
    }
];

export const PixGeneratorPage: React.FC = () => {
    const [pixKey, setPixKey] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [amount, setAmount] = useState('');
    const [txid, setTxid] = useState('');
    const [payload, setPayload] = useState('');
    const [copied, setCopied] = useState(false);

    // Gera o código Pix dinamicamente
    useEffect(() => {
        if (!pixKey || !name || !city) {
            setPayload('');
            return;
        }

        const normalizedName = name.substring(0, 25).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        const normalizedCity = city.substring(0, 15).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        const normalizedTxid = txid ? txid.replace(/[^a-zA-Z0-9]/g, '') : '***';

        let amountField = '';
        if (amount) {
            const cleanAmount = amount.replace(',', '.');
            if (!isNaN(parseFloat(cleanAmount))) {
                amountField = formatField('54', parseFloat(cleanAmount).toFixed(2));
            }
        }

        const merchantAccountInfo = formatField('00', 'BR.GOV.BCB.PIX') + formatField('01', pixKey);
        const additionalData = formatField('05', normalizedTxid || '***');

        let rawPayload =
            formatField('00', '01') +
            formatField('26', merchantAccountInfo) +
            formatField('52', '0000') +
            formatField('53', '986') +
            amountField +
            formatField('58', 'BR') +
            formatField('59', normalizedName) +
            formatField('60', normalizedCity) +
            formatField('62', additionalData) +
            '6304';

        const crc = crc16ccitt(rawPayload);
        setPayload(rawPayload + crc);

    }, [pixKey, name, city, amount, txid]);

    const handleCopy = () => {
        if (!payload) return;
        navigator.clipboard.writeText(payload);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                downloadLink.download = `pix-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
            }
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
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

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Gerador de QR Code Pix Grátis - Copia e Cola Seguro"
                description="Crie QR Codes Pix personalizados gratuitamente. Gere códigos Copia e Cola instantâneos, baixe a imagem e receba pagamentos sem taxas."
                canonical="/ferramentas/gerador-pix"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": PIX_FAQS.map(faq => ({
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
                        { label: 'Ferramentas', href: '/ferramentas' },
                        { label: 'Gerador de Pix', href: '/ferramentas/gerador-pix' }
                    ]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <QrCode className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300">Pagamentos Instantâneos</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Gerador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">QR Code Pix</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Crie cobranças instantâneas sem taxas. Gere o QR Code ou o código "Copia e Cola" para receber de seus clientes agora mesmo.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-24">
                    {/* Formulário */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <QrCode className="w-5 h-5 text-primary" />
                                Dados do Pagamento
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Chave Pix (CPF, Celular, E-mail ou Aleatória)</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: 123.456.789-00 ou email@exemplo.com"
                                        value={pixKey}
                                        onChange={(e) => setPixKey(e.target.value)}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Nome do Beneficiário</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="text"
                                                placeholder="Seu Nome"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Cidade</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="text"
                                                placeholder="Sua Cidade"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valor (Opcional)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Ex: 50.00 (Deixe 0 para valor livre)"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Identificador / Código (Opcional)</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: PEDIDO123 (Sem espaços)"
                                        value={txid}
                                        onChange={(e) => setTxid(e.target.value)}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Identificador único da transação (TxID).</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-xl flex gap-3">
                            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                            <p className="text-sm text-gray-300">
                                <strong>Privacidade Total:</strong> Seus dados não são enviados para nenhum servidor. O código Pix é gerado matematicamente direto no seu navegador.
                            </p>
                        </div>
                    </div>

                    {/* Preview e Resultado */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center items-center">

                            {payload ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center w-full max-w-sm"
                                >
                                    <div className="bg-white p-4 rounded-2xl mb-6 shadow-2xl shadow-primary/20">
                                        <QRCodeSVG
                                            id="qrcode-pix"
                                            value={payload}
                                            size={250}
                                            level="M"
                                            includeMargin={false}
                                        />
                                    </div>

                                    <div className="w-full space-y-3">
                                        <button
                                            onClick={handleCopy}
                                            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-primary hover:bg-primary/90 text-black'}`}
                                        >
                                            {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                            {copied ? 'Copiado!' : 'Copiar Código Pix'}
                                        </button>

                                        <button
                                            onClick={handleDownload}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors"
                                        >
                                            <Download className="w-5 h-5" />
                                            Baixar QR Code (PNG)
                                        </button>
                                    </div>

                                    <div className="mt-6 w-full">
                                        <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold text-center">Código Copia e Cola (Payload)</label>
                                        <div className="bg-black/50 p-3 rounded-lg border border-white/5 break-all text-xs text-gray-400 font-mono text-center">
                                            {payload}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="text-center opacity-50 py-12">
                                    <QrCode className="w-24 h-24 text-gray-700 mx-auto mb-4" />
                                    <p className="text-gray-400 text-lg">Preencha os dados para gerar seu Pix</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* SEO Content (Copy Long-Form) */}
                <div className="mt-24 max-w-4xl mx-auto prose prose-invert prose-lg">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Crie seu QR Code Pix Gratuito em Segundos</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                            <p className="mb-4">
                                Precisa receber um pagamento rápido e sem taxas? O <strong>Gerador de Pix Junny</strong> é a ferramenta ideal para autônomos, lojistas e prestadores de serviço. Com ele, você cria um código oficial do Banco Central (padrão BR Code) na hora, pronto para ser lido por qualquer aplicativo de banco.
                            </p>
                            <p className="mb-4">
                                Esqueça a necessidade de imprimir folhas A4 com seus dados bancários ou ficar ditando CPF e CNPJ por mensagem. Gere um QR Code profissional, passe credibilidade para seus clientes e receba o dinheiro na hora.
                            </p>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Como Funciona o Gerador de Pix?</h2>
                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary flex items-center gap-2">
                                    <User className="w-5 h-5" /> 1. Seus Dados
                                </h3>
                                <p className="text-sm text-gray-400">Insira sua Chave Pix (CPF, CNPJ, Celular, E-mail ou Chave Aleatória), seu nome e cidade. Esses dados são obrigatórios pelo Banco Central.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary flex items-center gap-2">
                                    <DollarSign className="w-5 h-5" /> 2. O Valor
                                </h3>
                                <p className="text-sm text-gray-400">Defina um valor fixo para a cobrança ou deixe em branco (0,00) para que o cliente digite o quanto quer pagar na hora.</p>
                            </div>
                            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3 text-primary flex items-center gap-2">
                                    <Zap className="w-5 h-5" /> 3. Pronto!
                                </h3>
                                <p className="text-sm text-gray-400">O sistema gera um QR Code visual e um código "Copia e Cola". Você pode baixar a imagem ou enviar o código por WhatsApp.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Por que usar o QR Code Estático?</h2>
                        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-6">O Pix possui dois tipos de QR Code: o Dinâmico (usado em grandes e-commerces, que muda a cada venda) e o Estático (que geramos aqui). Veja as vantagens do Estático:</p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span><strong>Não Expira:</strong> Você pode imprimir e usar o mesmo código para sempre.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span><strong>Sem Integração:</strong> Não precisa de API, sistema complexo ou maquininha de cartão. É só gerar e usar.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span>
                                    <span><strong>Multiuso:</strong> Serve para balcão de loja, recebimento de aluguel, doações em lives, vaquinhas e vendas diretas.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-16">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <Smartphone className="w-5 h-5" />
                            Dica para Lojistas
                        </h3>
                        <p className="text-gray-300">
                            Imprima o QR Code gerado e plastifique. Coloque no balcão visível para o cliente. Isso agiliza o pagamento, evita erros de digitação da chave e reduz as filas. E o melhor: o dinheiro cai na hora, inclusive feriados e fins de semana.
                        </p>
                    </div>

                    <FAQ
                        items={PIX_FAQS}
                        title="Dúvidas Frequentes sobre Pix"
                        className="py-12"
                        showSocialProof={false}
                    />
                </div>

                <AppPromoBanner />
            </div>
        </section>
    );
};
