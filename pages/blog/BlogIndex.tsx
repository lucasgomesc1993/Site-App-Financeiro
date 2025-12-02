import React, { useEffect, useState } from 'react';

import { PostCard } from '../../components/blog/PostCard';
import { Breadcrumb } from '../../components/Breadcrumb';
import { AppPromoBanner } from '../../components/AppPromoBanner';
import { blogService } from '../../services/blogService';
import { Post } from '../../types/blog';
import { SEO } from '../../components/SEO';
import { BookOpen } from 'lucide-react';

export const BlogIndex: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await blogService.getPosts();
            setPosts(data);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Blog FinZap - Dicas de Finanças e Controle de Gastos"
                description="Aprenda a controlar seus gastos, economizar dinheiro e organizar suas finanças com as dicas do blog FinZap."
                canonical="https://finzap.io/blog"
            />

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <Breadcrumb items={[{ label: 'Blog', href: '/blog' }]} />

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-300">Conteúdo Educativo</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">FinZap</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Dicas práticas para você dominar suas finanças e alcançar seus objetivos.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-96 bg-white/5 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        <h2 className="sr-only">Últimas postagens</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </>
                )}

                <div className="mt-24">
                    <AppPromoBanner />
                </div>

                {/* Disclaimer */}
                <div className="mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12">
                    <p className="text-sm text-gray-500">
                        <strong>Aviso legal:</strong> O conteúdo disponibilizado neste blog é apenas para fins informativos e educacionais.
                        Embora busquemos manter as informações atualizadas, não nos responsabilizamos por eventuais divergências ou decisões tomadas com base nos artigos.
                        Consulte sempre um profissional para orientações específicas ao seu caso.
                    </p>
                </div>
            </div>
        </section>
    );
};
