import React, { Suspense, lazy } from 'react';
import { Calculator, Plane, TrendingUp, ArrowRight, Zap, Fuel, DollarSign, Calendar, Clock, Briefcase, AlertCircle, Moon, PiggyBank, Building2, Award, Flame, BarChart3, Home, Key, Car, Smartphone, Gem, Globe, History, PieChart, CreditCard, FileText, Tag, Scale, Divide, Layers, MapPin, Users, Activity, Droplets, ChefHat, Baby, Gift, Percent, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';
import { SEO } from './SEO';
import { FAQ } from './FAQ';

const AppPromoBanner = lazy(() => import('./AppPromoBanner').then(module => ({ default: module.AppPromoBanner })));

type CalculatorItem = {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
};

type CategoryGroup = {
    title: string;
    items: CalculatorItem[];
};

export const Calculators: React.FC = () => {
    const CALCULATOR_FAQS = [
        {
            question: "Qual a diferença entre simulador e calculadora?",
            answer: "Calculadoras normalmente retornam resultados diretos e exatos com base em dados objetivos e fórmulas fixas (como impostos). Simuladores projetam cenários futuros considerando variáveis dinâmicas e estimativas (como rentabilidade de investimentos)."
        },
        {
            question: "As calculadoras online são confiáveis?",
            answer: "Sim, nossas calculadoras são desenvolvidas com base nas regras, alíquotas e índices oficiais vigentes. No entanto, elas servem como ferramentas de estimativa e orientação."
        },
        {
            question: "Posso confiar nos resultados para tomar decisões financeiras?",
            answer: "Elas são ótimas para orientação inicial e planejamento, mas não substituem a análise de um profissional especializado. Sempre consulte um contador ou consultor financeiro para decisões críticas."
        },
        {
            question: "Posso usar as calculadoras pelo celular?",
            answer: "Sim! Nossa plataforma é totalmente responsiva e todas as ferramentas funcionam perfeitamente em qualquer dispositivo com acesso à internet, seja celular, tablet ou computador."
        },
        {
            question: "Como usar uma calculadora financeira corretamente?",
            answer: "O segredo é a precisão dos dados de entrada. Preencha campos como valor inicial, taxas e prazos com atenção. O resultado será calculado automaticamente com base nas fórmulas financeiras padrão do mercado."
        }
    ];

    const categories: CategoryGroup[] = [
        {
            title: "Trabalhistas e Previdenciárias",
            items: [
                { title: "Férias", description: "Calcule o valor exato das suas férias.", icon: Plane, href: "/calculadoras/ferias" },
                { title: "Rescisão", description: "Simule sua rescisão CLT completa.", icon: Calculator, href: "/calculadoras/rescisao" },
                { title: "INSS", description: "Simule o desconto do INSS 2025.", icon: Calculator, href: "/calculadoras/inss" },
                { title: "Salário Líquido", description: "Descubra quanto vai cair na conta.", icon: DollarSign, href: "/calculadoras/salario-liquido" },
                { title: "Décimo Terceiro", description: "Simule o valor do seu 13º salário.", icon: Calendar, href: "/calculadoras/decimo-terceiro" },
                { title: "Horas Extras", description: "Simule o valor com adicionais.", icon: Clock, href: "/calculadoras/horas-extras" },
                { title: "Seguro-Desemprego", description: "Simule valor e parcelas.", icon: Briefcase, href: "/calculadoras/seguro-desemprego" },
                { title: "Adicional Noturno", description: "Descubra o valor com acréscimo.", icon: Moon, href: "/calculadoras/adicional-noturno" },
                { title: "FGTS", description: "Simule o rendimento do seu FGTS.", icon: PiggyBank, href: "/calculadoras/fgts" },
                { title: "Custo Funcionário", description: "Descubra o custo real para a empresa.", icon: Building2, href: "/calculadoras/custo-funcionario" },
                { title: "PLR e IRRF", description: "Simule o desconto do IR sobre PLR.", icon: Award, href: "/calculadoras/plr" },
                { title: "Calculadora de Horas", description: "Some e subtraia horas e minutos.", icon: Clock, href: "/calculadoras/horas" },
                { title: "Dias Úteis", description: "Conte prazos excluindo feriados.", icon: Calendar, href: "/calculadoras/dias-uteis" },
            ]
        },
        {
            title: "Investimentos e Planejamento",
            items: [
                { title: "Simulador Investimentos", description: "Compare CDB, LCI, LCA e Tesouro.", icon: TrendingUp, href: "/calculadoras/investimentos" },
                { title: "FIRE", description: "Quanto juntar para parar de trabalhar?", icon: Flame, href: "/calculadoras/fire" },
                { title: "Juros Compostos", description: "Simule o crescimento do patrimônio.", icon: BarChart3, href: "/calculadoras/juros-compostos" },
                { title: "Primeiro Milhão", description: "Simule quanto investir por mês.", icon: Gem, href: "/calculadoras/primeiro-milhao" },
                { title: "Regra 50-30-20", description: "Organize suas finanças pessoais.", icon: PieChart, href: "/calculadoras/regra-50-30-20" },
                { title: "Poder de Compra", description: "Corrija valores pela inflação.", icon: History, href: "/calculadoras/poder-de-compra" },
                { title: "Conversor Moedas", description: "Converta Real, Dólar e Euro.", icon: Globe, href: "/calculadoras/conversor-moedas" },
            ]
        },
        {
            title: "Empréstimos e Financiamentos",
            items: [
                { title: "Financiamento Imóvel", description: "SAC ou Price? Compare tabelas.", icon: Home, href: "/calculadoras/financiamento-imobiliario" },
                { title: "Financiamento Veículo", description: "Simule parcelas de carro ou moto.", icon: Car, href: "/calculadoras/financiamento-veiculos" },
                { title: "Quitação Antecipada", description: "Descubra o desconto ao antecipar.", icon: PiggyBank, href: "/calculadoras/quitacao-antecipada" },
                { title: "Custo Efetivo (CET)", description: "Descubra os juros reais.", icon: FileText, href: "/calculadoras/custo-efetivo-total" },
                { title: "Dívida Cartão", description: "Simule o efeito bola de neve.", icon: CreditCard, href: "/calculadoras/divida-cartao-credito" },
            ]
        },
        {
            title: "Empresariais e Empreendedorismo",
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
            title: "Dia a Dia e Utilidades",
            items: [
                { title: "Gerador de Pix", description: "Crie QR Codes Pix personalizados.", icon: QrCode, href: "/calculadoras/gerador-pix" },
                { title: "Amigo Secreto", description: "Sorteio rápido e imparcial.", icon: Gift, href: "/calculadoras/amigo-secreto" },
                { title: "Energia", description: "Calcule o consumo de aparelhos.", icon: Zap, href: "/calculadoras/energia" },
                { title: "Combustível", description: "Álcool ou Gasolina?", icon: Fuel, href: "/calculadoras/combustivel" },
                { title: "Alugar ou Financiar", description: "Vale a pena comprar ou alugar?", icon: Home, href: "/calculadoras/alugar-ou-financiar" },
                { title: "Uber ou Carro", description: "Qual compensa mais?", icon: Car, href: "/calculadoras/uber-ou-carro" },
                { title: "Custo de Viagem", description: "Combustível e pedágios.", icon: Car, href: "/calculadoras/custo-viagem" },
                { title: "Churrasco", description: "Quantidade de carne e bebida.", icon: Flame, href: "/calculadoras/churrasco" },
                { title: "Tijolos e Pisos", description: "Quantidade de material.", icon: Layers, href: "/calculadoras/tijolos-pisos" },
                { title: "Conversor Culinário", description: "Xícaras para gramas.", icon: ChefHat, href: "/calculadoras/conversor-culinario" },
            ]
        },
        {
            title: "Matemática e Saúde",
            items: [
                { title: "Regra de Três", description: "Resolva problemas de proporção.", icon: Divide, href: "/calculadoras/regra-de-tres" },
                { title: "Porcentagem", description: "Calcule descontos e aumentos.", icon: Percent, href: "/calculadoras/porcentagem" },
                { title: "IMC", description: "Descubra se seu peso está ideal.", icon: Activity, href: "/calculadoras/imc" },
                { title: "Água", description: "Meta diária de hidratação.", icon: Droplets, href: "/calculadoras/agua" },
                { title: "Idade Gestacional", description: "Data provável do parto.", icon: Baby, href: "/calculadoras/idade-gestacional" },
            ]
        }
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadoras Financeiras Junny",
        "description": "Ferramentas gratuitas para cálculo de férias, décimo terceiro, salário líquido e mais.",
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
                title="Calculadoras Financeiras Gratuitas"
                description="Ferramentas gratuitas para cálculo de férias, décimo terceiro, salário líquido, investimentos e mais."
                canonical="/calculadoras"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": CALCULATOR_FAQS.map(faq => ({
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
                <Breadcrumb items={[{ label: 'Calculadoras', href: '/calculadoras' }]} />
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <Calculator className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-300">Calculadoras Gratuitas</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Calculadoras <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Financeiras</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Utilize nossas calculadoras gratuitas para planejar seus investimentos, calcular suas férias e organizar sua vida financeira.
                    </p>
                </div>

                <div className="space-y-16">
                    {categories.map((category, index) => (
                        <div key={index} className="space-y-6">
                            <h2 className="text-2xl font-bold text-white pl-2 border-l-4 border-primary">
                                {category.title}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                                {category.items.map((item, itemIndex) => (
                                    <Link key={itemIndex} to={item.href} className="group">
                                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-3 md:p-5 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 border border-primary/20 group-hover:scale-110 transition-transform">
                                                    <item.icon className="text-primary w-4 h-4 md:w-5 md:h-5" />
                                                </div>
                                                <h3 className="text-sm md:text-base font-bold text-white mb-1 md:mb-2 leading-tight line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-gray-400 line-clamp-2 md:line-clamp-3 mb-2 md:mb-4 flex-grow hidden md:block">
                                                    {item.description}
                                                </p>
                                                <span className="inline-flex items-center gap-1 text-primary text-xs font-bold group-hover:gap-2 transition-all mt-auto">
                                                    Acessar <ArrowRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24">
                    <FAQ
                        title="Dúvidas Frequentes sobre Calculadoras"
                        items={CALCULATOR_FAQS}
                        showSocialProof={false}
                    />
                </div>

                <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                    <AppPromoBanner />
                </Suspense>

                {/* Disclaimer */}
                <div className="mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12">
                    <p className="text-sm text-gray-400">
                        <strong>Aviso legal:</strong> As ferramentas disponibilizadas neste site são apenas para fins informativos e educacionais.
                        Embora busquemos manter os cálculos e fórmulas atualizados, não nos responsabilizamos por eventuais divergências, perdas ou decisões tomadas com base nos resultados obtidos.
                        Consulte sempre um profissional para orientações específicas ao seu caso.
                    </p>
                </div>
            </div>
        </section>
    );
};
