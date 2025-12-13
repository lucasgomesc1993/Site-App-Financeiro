
import React from 'react';
import { PostCard } from '../components/blog/PostCard';
import { SEO } from '../components/SEO';
import { Post, Author } from '../types/blog';
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar, ExternalLink } from 'lucide-react';
// Layout is handled by App.tsx (Header/Footer)

import { AUTHOR } from '../constants/author';


const FAKE_POSTS: Post[] = [
    {
        id: '1',
        slug: 'como-investir-2025',
        title: 'Como Investir em 2025: Guia Completo para Iniciantes',
        excerpt: 'Descubra as melhore estratégias de investimento para o cenário econômico de 2025 e proteja seu patrimônio.',
        content: '',
        published_at: '2024-12-01T10:00:00Z',
        cover_image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1000',
        cover_image_alt: 'Gráfico financeiro em alta',
        meta_title: 'Como Investir em 2025',
        meta_description: 'Guia de investimentos para 2025.',
        author: AUTHOR,
        category: { id: '1', name: 'Investimentos', slug: 'investimentos' },
        reading_time: 5
    },
    {
        id: '2',
        slug: 'reserva-de-emergencia',
        title: 'Reserva de Emergência: Onde Colocar seu Dinheiro?',
        excerpt: 'Análise detalhada dos melhores investimentos de liquidez diária para sua reserva de emergência.',
        content: '',
        published_at: '2024-11-20T14:30:00Z',
        cover_image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1000',
        cover_image_alt: 'Cofrinho com moedas',
        meta_title: 'Reserva de Emergência',
        meta_description: 'Onde investir sua reserva de emergência.',
        author: AUTHOR,
        category: { id: '2', name: 'Planejamento', slug: 'planejamento' },
        reading_time: 4
    },
    {
        id: '3',
        slug: 'financiamento-vs-aluguel',
        title: 'Financiar ou Alugar? A Matemática Definitiva',
        excerpt: 'Pare de perder dinheiro! Entenda quando vale a pena financiar um imóvel e quando pagar aluguel é a melhor opção.',
        content: '',
        published_at: '2024-11-15T09:15:00Z',
        cover_image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000',
        cover_image_alt: 'Chaves de casa',
        meta_title: 'Financiar ou Alugar',
        meta_description: 'Calculadora de decisão entre financiar e alugar.',
        author: AUTHOR,
        category: { id: '3', name: 'Imóveis', slug: 'imoveis' },
        reading_time: 7
    }
];

export const AuthorPage: React.FC = () => {
    return (
        <>
            <SEO
                title={`${AUTHOR.name} - FinZap`}
                description={AUTHOR.role!}
                canonical="https://finzap.com.br/autor"
            />

            <div className="bg-background min-h-screen pt-28 pb-16">
                {/* Header Profile Section */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="bg-[#0d0d0d] rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background shadow-xl overflow-hidden relative group">
                                    <img
                                        src={AUTHOR.avatar_url}
                                        alt={AUTHOR.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{AUTHOR.name}</h1>
                                        <p className="text-xl text-primary font-medium">{AUTHOR.role}</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <a href={AUTHOR.social.twitter} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-[#1DA1F2] transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                        <a href={AUTHOR.linkedin_url} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-[#0077b5] transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a href={AUTHOR.social.github} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href={AUTHOR.social.email} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-primary transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" />
                                        {AUTHOR.location}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        {AUTHOR.joined}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <ExternalLink className="w-4 h-4" />
                                        finzap.com.br
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed text-lg">
                                    {AUTHOR.bio}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-8 bg-primary rounded-full" />
                        <h2 className="text-2xl font-bold text-white">Artigos Publicados</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FAKE_POSTS.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthorPage;
