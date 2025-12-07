import { Calculator, Plane, TrendingUp, ArrowRight, Zap, Fuel, DollarSign, Calendar, Clock, Briefcase, AlertCircle, Moon, PiggyBank, Building2, Award, Flame, BarChart3, Home, Key, Car, Smartphone, Gem, Globe, History, PieChart, CreditCard, FileText, Tag, Scale, Divide, Layers, MapPin, Users, Activity, Droplets, ChefHat, Baby, Gift, Percent, QrCode, ShoppingBag, AlertTriangle } from 'lucide-react';

export type CalculatorItem = {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
};

export type CategoryGroup = {
    title: string;
    color: string; // Tailwind color name (e.g., 'blue', 'emerald')
    items: CalculatorItem[];
};

export const CALCULATOR_CATEGORIES: CategoryGroup[] = [
    {
        title: "Trabalhistas e Carreira",
        color: "blue",
        items: [
            { title: "Rescisão", description: "Simule sua rescisão CLT completa.", icon: Calculator, href: "/calculadoras/rescisao" },
            { title: "Salário Líquido", description: "Descubra quanto vai cair na conta.", icon: DollarSign, href: "/calculadoras/salario-liquido" },
            { title: "CLT vs PJ", description: "Compare regimes e decida melhor.", icon: Briefcase, href: "/calculadoras/clt-vs-pj" },
            { title: "Férias", description: "Calcule o valor exato das suas férias.", icon: Plane, href: "/calculadoras/ferias" },
            { title: "Décimo Terceiro", description: "Simule o valor do seu 13º salário.", icon: Calendar, href: "/calculadoras/decimo-terceiro" },
            { title: "Horas Extras", description: "Simule o valor com adicionais.", icon: Clock, href: "/calculadoras/horas-extras" },
            { title: "Calculadora de Horas", description: "Some e subtraia horas e minutos.", icon: Clock, href: "/calculadoras/horas" },
            { title: "Seguro-Desemprego", description: "Simule valor e parcelas.", icon: Briefcase, href: "/calculadoras/seguro-desemprego" },
            { title: "INSS", description: "Simule o desconto do INSS 2025.", icon: Calculator, href: "/calculadoras/inss" },
            { title: "FGTS", description: "Simule o rendimento do seu FGTS.", icon: PiggyBank, href: "/calculadoras/fgts" },
            { title: "Adicional Noturno", description: "Descubra o valor com acréscimo.", icon: Moon, href: "/calculadoras/adicional-noturno" },
            { title: "Dias Úteis", description: "Conte prazos excluindo feriados.", icon: Calendar, href: "/calculadoras/dias-uteis" },
            { title: "PLR e IRRF", description: "Simule o desconto do IR sobre PLR.", icon: Award, href: "/calculadoras/plr" },
            { title: "Custo Funcionário", description: "Descubra o custo real para a empresa.", icon: Building2, href: "/calculadoras/custo-funcionario" },
        ]
    },
    {
        title: "Investimentos e Planejamento",
        color: "emerald",
        items: [
            { title: "Juros Compostos", description: "Simule o crescimento do patrimônio.", icon: BarChart3, href: "/calculadoras/juros-compostos" },
            { title: "Simulador Investimentos", description: "Compare CDB, LCI, LCA e Tesouro.", icon: TrendingUp, href: "/calculadoras/investimentos" },
            { title: "Correção Monetária", description: "Atualize valores por IPCA, IGP-M.", icon: TrendingUp, href: "/calculadoras/correcao-monetaria" },
            { title: "Primeiro Milhão", description: "Simule quanto investir por mês.", icon: Gem, href: "/calculadoras/primeiro-milhao" },
            { title: "FIRE", description: "Quanto juntar para parar de trabalhar?", icon: Flame, href: "/calculadoras/fire" },
            { title: "Regra 50-30-20", description: "Organize suas finanças pessoais.", icon: PieChart, href: "/calculadoras/regra-50-30-20" },
        ]
    },
    {
        title: "Câmbio e Economia Global",
        color: "cyan",
        items: [
            { title: "Conversor Moedas", description: "Converta Real, Dólar e Euro.", icon: Globe, href: "/calculadoras/conversor-moedas" },
            { title: "Poder de Compra", description: "Corrija valores pela inflação.", icon: History, href: "/calculadoras/poder-de-compra" },
            { title: "Impostos de Importação", description: "Calcule taxas de compras internacionais.", icon: ShoppingBag, href: "/calculadoras/impostos-importacao" },
        ]
    },
    {
        title: "Empréstimos e Dívidas",
        color: "purple",
        items: [
            { title: "Quitação Antecipada", description: "Descubra o desconto ao antecipar.", icon: PiggyBank, href: "/calculadoras/quitacao-antecipada" },
            { title: "Juros Abusivos", description: "Verifique se está pagando demais.", icon: AlertTriangle, href: "/calculadoras/juros-abusivos" },
            { title: "Custo Efetivo (CET)", description: "Descubra os juros reais.", icon: FileText, href: "/calculadoras/custo-efetivo-total" },
            { title: "Financiamento Imóvel", description: "SAC ou Price? Compare tabelas.", icon: Home, href: "/calculadoras/financiamento-imobiliario" },
            { title: "Financiamento Veículo", description: "Simule parcelas de carro ou moto.", icon: Car, href: "/calculadoras/financiamento-veiculos" },
            { title: "Dívida Cartão", description: "Simule o efeito bola de neve.", icon: CreditCard, href: "/calculadoras/divida-cartao-credito" },
        ]
    },
    {
        title: "Empresariais e Empreendedorismo",
        color: "amber",
        items: [
            { title: "DAS MEI", description: "Calcule o valor da sua guia.", icon: Building2, href: "/calculadoras/das-mei" },
            { title: "Markup", description: "Defina o preço de venda ideal.", icon: Tag, href: "/calculadoras/markup" },
            { title: "Ponto de Equilíbrio", description: "Quanto vender para não ter prejuízo.", icon: Scale, href: "/calculadoras/ponto-de-equilibrio" },
            { title: "Simples vs Presumido", description: "Compare regimes tributários.", icon: FileText, href: "/calculadoras/simples-vs-presumido" },
            { title: "Capital de Giro", description: "Quanto ter em caixa.", icon: DollarSign, href: "/calculadoras/capital-de-giro" },
            { title: "ROI", description: "Eficiência dos investimentos.", icon: BarChart3, href: "/calculadoras/roi" },
        ]
    },
    {
        title: "Dia a Dia e Utilidades Financeiras",
        color: "rose",
        items: [
            { title: "Gerador de Pix", description: "Crie QR Codes Pix personalizados.", icon: QrCode, href: "/calculadoras/gerador-pix" },
            { title: "Alugar ou Financiar", description: "Vale a pena comprar ou alugar?", icon: Home, href: "/calculadoras/alugar-ou-financiar" },
            { title: "Uber ou Carro", description: "Qual compensa mais?", icon: Car, href: "/calculadoras/uber-ou-carro" },
            { title: "Custo de Viagem", description: "Combustível e pedágios.", icon: Car, href: "/calculadoras/custo-viagem" },
            { title: "Combustível", description: "Álcool ou Gasolina?", icon: Fuel, href: "/calculadoras/combustivel" },
            { title: "Energia", description: "Calcule o consumo de aparelhos.", icon: Zap, href: "/calculadoras/energia" },
            { title: "Amigo Secreto", description: "Sorteio rápido e imparcial.", icon: Gift, href: "/calculadoras/amigo-secreto" },
            { title: "Churrasco", description: "Quantidade de carne e bebida.", icon: Flame, href: "/calculadoras/churrasco" },
        ]
    },
    {
        title: "Matemática Financeira Básica",
        color: "blue",
        items: [
            { title: "Porcentagem", description: "Calcule descontos e aumentos.", icon: Percent, href: "/calculadoras/porcentagem" },
            { title: "Regra de Três", description: "Resolva problemas de proporção.", icon: Divide, href: "/calculadoras/regra-de-tres" },
        ]
    }
];

// Helper to get color classes safely
export const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string, text: string, bg: string, hoverBorder: string, gradient: string }> = {
        blue: {
            border: 'border-blue-500',
            text: 'text-blue-500',
            bg: 'bg-blue-500/10',
            hoverBorder: 'hover:border-blue-500/30',
            gradient: 'from-blue-500/5'
        },
        emerald: {
            border: 'border-emerald-500',
            text: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            hoverBorder: 'hover:border-emerald-500/30',
            gradient: 'from-emerald-500/5'
        },
        purple: {
            border: 'border-purple-500',
            text: 'text-purple-500',
            bg: 'bg-purple-500/10',
            hoverBorder: 'hover:border-purple-500/30',
            gradient: 'from-purple-500/5'
        },
        amber: {
            border: 'border-amber-500',
            text: 'text-amber-500',
            bg: 'bg-amber-500/10',
            hoverBorder: 'hover:border-amber-500/30',
            gradient: 'from-amber-500/5'
        },
        rose: {
            border: 'border-rose-500',
            text: 'text-rose-500',
            bg: 'bg-rose-500/10',
            hoverBorder: 'hover:border-rose-500/30',
            gradient: 'from-rose-500/5'
        },
        cyan: {
            border: 'border-cyan-500',
            text: 'text-cyan-500',
            bg: 'bg-cyan-500/10',
            hoverBorder: 'hover:border-cyan-500/30',
            gradient: 'from-cyan-500/5'
        }
    };
    return colors[color] || colors.blue;
};
