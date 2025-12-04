import React, { Suspense, lazy } from 'react';
import { Calculator, Plane, TrendingUp, ArrowRight, Zap, Fuel, DollarSign, Calendar, Clock, Briefcase, AlertCircle, Moon, PiggyBank, Building2, Award, Flame, BarChart3, Home, Key, Car, Smartphone, Gem, Globe, History, PieChart, CreditCard, FileText, Tag, Scale, Divide, Layers, MapPin, Users, Activity, Droplets, ChefHat, Baby, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';
import { SEO } from './SEO';
import { FAQ } from './FAQ';

const AppPromoBanner = lazy(() => import('./AppPromoBanner').then(module => ({ default: module.AppPromoBanner })));

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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/calculadoras/investimentos" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <TrendingUp className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Simulador de Investimentos</h2>
                                <p className="text-gray-400 mb-6">
                                    Compare CDB, LCI, LCA e Tesouro Direto. Descubra quanto seu dinheiro pode render com juros compostos.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/ferias" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Plane className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de Férias</h2>
                                <p className="text-gray-400 mb-6">
                                    Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/energia" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Zap className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Consumo de Energia</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra quanto seus aparelhos consomem e economize na conta de luz.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/combustivel" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Fuel className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Álcool ou Gasolina</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra qual combustível compensa mais para abastecer seu veículo e economize no posto.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/rescisao" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Calculator className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Rescisão Trabalhista</h2>
                                <p className="text-gray-400 mb-6">
                                    Simule sua rescisão CLT. Calcule saldo de salário, férias, 13º, aviso prévio e multa do FGTS.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/inss" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Calculator className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de INSS</h2>
                                <p className="text-gray-400 mb-6">
                                    Simule o desconto do INSS 2025. Tabela progressiva atualizada para CLT, Autônomos e Pro-labore.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/salario-liquido" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <DollarSign className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Salário Líquido 2025</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra quanto vai cair na conta. Cálculo exato com descontos de INSS e IRRF 2025.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/decimo-terceiro" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Calendar className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Décimo Terceiro</h2>
                                <p className="text-gray-400 mb-6">
                                    Antecipe seu planejamento. Simule o valor exato da 1ª e 2ª parcela do seu 13º salário.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/horas-extras" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Clock className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Horas Extras</h2>
                                <p className="text-gray-400 mb-6">
                                    Estendeu a jornada? Simule o valor exato com adicionais de 50%, 100% e reflexo no DSR.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/seguro-desemprego" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Briefcase className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Seguro-Desemprego</h2>
                                <p className="text-gray-400 mb-6">
                                    Foi demitido? Simule o valor exato e a quantidade de parcelas que você tem direito.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/adicional-noturno" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Moon className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Adicional Noturno</h2>
                                <p className="text-gray-400 mb-6">
                                    Trabalha a noite? Descubra o valor real com acréscimo de 20% e hora reduzida.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/fgts" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <PiggyBank className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">FGTS (Saldo Futuro)</h2>
                                <p className="text-gray-400 mb-6">
                                    Simule o rendimento do seu FGTS com depósitos mensais e juros.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/custo-funcionario" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Building2 className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Custo de Funcionário</h2>
                                <p className="text-gray-400 mb-6">
                                    Vai contratar? Descubra o custo real de um funcionário para a empresa.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/plr" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Award className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">PLR e IRRF</h2>
                                <p className="text-gray-400 mb-6">
                                    Vai receber a bolada? Simule o desconto do IR sobre a sua PLR.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/fire" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Flame className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">FIRE</h2>
                                <p className="text-gray-400 mb-6">
                                    Independência Financeira: Quanto preciso juntar para parar de trabalhar?
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/juros-compostos" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <BarChart3 className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Juros Compostos</h2>
                                <p className="text-gray-400 mb-6">
                                    Simule o crescimento exponencial do seu patrimônio com a força dos juros sobre juros.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/alugar-ou-financiar" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Home className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Alugar ou Financiar?</h2>
                                <p className="text-gray-400 mb-6">
                                    A dúvida de milhões. Descubra matematicamente se vale mais a pena comprar ou alugar.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/uber-ou-carro" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Car className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Uber ou Carro?</h2>
                                <p className="text-gray-400 mb-6">
                                    Será que vale a pena manter um carro na garagem? Descubra se é mais barato dirigir ou usar apps.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/primeiro-milhao" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Gem className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Primeiro Milhão</h2>
                                <p className="text-gray-400 mb-6">
                                    O sonho é possível. Simule quanto você precisa investir por mês para conquistar o seu primeiro milhão.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/conversor-moedas" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Globe className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Conversor de Moedas</h2>
                                <p className="text-gray-400 mb-6">
                                    Converta valores entre Real, Dólar e Euro com a cotação atualizada em tempo real.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/regra-50-30-20" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <PieChart className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Regra 50-30-20</h2>
                                <p className="text-gray-400 mb-6">
                                    Organize suas finanças. Descubra quanto gastar com necessidades, lazer e investimentos.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/das-mei" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                                    <Building2 className="text-blue-400 w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora DAS MEI</h2>
                                <p className="text-gray-400 mb-6">
                                    Calcule o valor atualizado da sua guia e monitore o limite de faturamento.
                                </p>
                                <span className="inline-flex items-center gap-2 text-blue-400 font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/markup" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
                                    <Tag className="text-purple-400 w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de Markup</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra o preço de venda exato para cobrir custos e garantir lucro real.
                                </p>
                                <span className="inline-flex items-center gap-2 text-purple-400 font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/ponto-de-equilibrio" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                                    <Scale className="text-cyan-400 w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Ponto de Equilíbrio</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra quanto sua empresa precisa vender para começar a lucrar.
                                </p>
                                <span className="inline-flex items-center gap-2 text-cyan-400 font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/simples-vs-presumido" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                    <Building2 className="text-emerald-400 w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Simples vs Presumido</h2>
                                <p className="text-gray-400 mb-6">
                                    Simule qual regime tributário é mais barato para a sua empresa.
                                </p>
                                <span className="inline-flex items-center gap-2 text-emerald-400 font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/divida-cartao-credito" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 border border-red-500/20 group-hover:scale-110 transition-transform">
                                    <CreditCard className="text-red-400 w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Dívida de Cartão</h2>
                                <p className="text-gray-400 mb-6">
                                    Simule o "Efeito Bola de Neve" dos juros rotativos.
                                </p>
                                <span className="inline-flex items-center gap-2 text-red-400 font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/custo-efetivo-total" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <FileText className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Custo Efetivo Total (CET)</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra os juros reais e taxas ocultas do seu empréstimo.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/quitacao-antecipada" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <PiggyBank className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Quitação Antecipada</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra o desconto ao antecipar parcelas do seu financiamento.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/financiamento-imobiliario" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Home className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Financiamento Imobiliário</h2>
                                <p className="text-gray-400 mb-6">
                                    SAC ou Price? Compare as tabelas e descubra qual paga menos juros.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/financiamento-veiculos" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Car className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Financiamento de Veículos</h2>
                                <p className="text-gray-400 mb-6">
                                    Simule parcelas de carro ou moto e descubra os juros reais (CET).
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/poder-de-compra" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <History className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Poder de Compra</h2>
                                <p className="text-gray-400 mb-6">
                                    Quanto valia R$ 100 em 1994? Corrija valores pela inflação (IPCA/IGP-M).
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/das-mei" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Building2 className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora DAS MEI</h2>
                                <p className="text-gray-400 mb-6">
                                    Calcule o valor do seu DAS MEI atualizado e evite multas.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/markup" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Tag className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de Markup</h2>
                                <p className="text-gray-400 mb-6">
                                    Defina o preço de venda ideal para garantir seu lucro.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/ponto-de-equilibrio" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Scale className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Ponto de Equilíbrio</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra quanto você precisa vender para não ter prejuízo.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/simples-vs-presumido" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <FileText className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Simples vs Presumido</h2>
                                <p className="text-gray-400 mb-6">
                                    Compare e descubra o melhor regime tributário para sua empresa.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/capital-de-giro" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <DollarSign className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Capital de Giro</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra quanto dinheiro sua empresa precisa ter em caixa para manter as portas abertas.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/roi" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <BarChart3 className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de ROI</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra a eficiência real dos seus investimentos em marketing e projetos.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/churrasco" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Flame className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de Churrasco</h2>
                                <p className="text-gray-400 mb-6">
                                    Calcule a quantidade ideal de carne e bebida para sua festa.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/dias-uteis" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Calendar className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de Dias Úteis</h2>
                                <p className="text-gray-400 mb-6">
                                    Conte prazos excluindo fins de semana e feriados nacionais.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/regra-de-tres" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Divide className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Regra de Três</h2>
                                <p className="text-gray-400 mb-6">
                                    Resolva problemas de proporção, porcentagem e conversões em segundos.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/porcentagem" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Percent className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de Porcentagem</h2>
                                <p className="text-gray-400 mb-6">
                                    Calcule descontos, aumentos e proporções de forma instantânea.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/horas" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Clock className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de Horas</h2>
                                <p className="text-gray-400 mb-6">
                                    Some e subtraia horas e minutos facilmente. Ideal para folha de ponto.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/tijolos-pisos" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Layers className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Tijolos e Pisos</h2>
                                <p className="text-gray-400 mb-6">
                                    Calcule a quantidade exata de material para sua obra e evite desperdícios.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/custo-viagem" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Car className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Custo de Viagem</h2>
                                <p className="text-gray-400 mb-6">
                                    Planeje seu orçamento de viagem somando combustível e pedágios.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/imc" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Activity className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de IMC</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra se seu peso está ideal segundo a OMS.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/agua" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Droplets className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Calculadora de Água</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra a meta diária exata para o seu corpo.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/conversor-culinario" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <ChefHat className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Conversor Culinário</h2>
                                <p className="text-gray-400 mb-6">
                                    Xícaras para gramas, colheres para ml. Precisão de chef.
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/calculadoras/idade-gestacional" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-pink-500/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 border border-pink-500/20 group-hover:scale-110 transition-transform">
                                    <Baby className="text-pink-400 w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Idade Gestacional</h2>
                                <p className="text-gray-400 mb-6">
                                    Descubra a data provável do parto e acompanhe sua gravidez.
                                </p>
                                <span className="inline-flex items-center gap-2 text-pink-400 font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/ferramentas/amigo-secreto" className="group">
                        <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-red-500/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 border border-red-500/20 group-hover:scale-110 transition-transform">
                                    <Gift className="text-red-500 w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Amigo Secreto</h2>
                                <p className="text-gray-400 mb-6">
                                    Sorteio rápido, imparcial e sem papelzinhos.
                                </p>
                                <span className="inline-flex items-center gap-2 text-red-500 font-bold group-hover:gap-3 transition-all">
                                    Acessar ferramenta <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>

                </div>

                {/* SEO Content Section */}
                <div className="mt-24 max-w-4xl mx-auto space-y-16">

                    {/* Introduction */}
                    <section className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Calculadoras Online: Ferramentas para Decisões Financeiras</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            As calculadoras online da Junny são ferramentas digitais desenvolvidas para facilitar o cálculo de diferentes tipos de informações de forma automatizada.
                            Elas funcionam diretamente no navegador, sem necessidade de instalação, e oferecem resultados imediatos com base nos dados fornecidos.
                            Seja para resolver questões financeiras, trabalhistas ou de planejamento, nossas ferramentas ajudam você a economizar tempo, evitar erros manuais e tomar decisões mais conscientes.
                        </p>
                    </section>

                    {/* Why Use & How to Use Grid */}
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Why Use */}
                        <section className="bg-white/5 rounded-3xl p-8 border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Zap className="text-primary w-6 h-6" />
                                Por que usar nossas calculadoras?
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                    <span><strong>Precisão nos cálculos:</strong> Reduz erros comuns em contas complexas e segue as regras vigentes.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                    <span><strong>Rapidez e praticidade:</strong> Resultados instantâneos com poucos cliques.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                    <span><strong>Gratuidade:</strong> Ferramentas 100% gratuitas e sem necessidade de cadastro.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                    <span><strong>Acessível em qualquer lugar:</strong> Funciona no celular, tablet ou computador.</span>
                                </li>
                            </ul>
                        </section>

                        {/* How to Use */}
                        <section className="bg-white/5 rounded-3xl p-8 border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Calculator className="text-primary w-6 h-6" />
                                Como usar corretamente
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
                                    <span>Escolha a calculadora adequada para sua necessidade específica.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
                                    <span>Informe os dados corretamente nos campos indicados (atenção aos valores brutos).</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span>
                                    <span>Revise os valores inseridos antes de clicar em calcular.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-400">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">4</span>
                                    <span>Analise o resultado e, se necessário, faça novas simulações com cenários diferentes.</span>
                                </li>
                            </ul>
                        </section>
                    </div>

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
        </section >
    );
};
