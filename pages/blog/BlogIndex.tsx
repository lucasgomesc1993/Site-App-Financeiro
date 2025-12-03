import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

import { PostCard } from '../../components/blog/PostCard';
import { CategoryList } from '../../components/blog/CategoryList';
import { StoryList } from '../../components/blog/StoryList';

import { Breadcrumb } from '../../components/Breadcrumb';
import { AppPromoBanner } from '../../components/AppPromoBanner';
import { blogService } from '../../services/blogService';
import { Post, Category, Story } from '../../types/blog';
import { SEO } from '../../components/SEO';

// Import stories directly
import storiesData from '../../data/stories.json';

export const BlogIndex: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const [postsData, categoriesData] = await Promise.all([
                blogService.getPosts(),
                blogService.getAllCategories()
            ]);
            setPosts(postsData);
            setCategories(categoriesData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Blog FinZap - Educação Financeira Descomplicada"
                description="Dicas práticas de economia, investimentos e planejamento financeiro para você dominar seu dinheiro."
                canonical="https://finzap.io/blog"
            />

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <Breadcrumb items={[{ label: 'Blog', href: '/blog' }]} />

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">FinZap</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Domine suas finanças com conteúdos práticos e diretos ao ponto.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="O que você quer aprender hoje?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all backdrop-blur-sm"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                </div>

                {/* Categories */}
                <CategoryList categories={categories} />

                {/* Latest Posts */}
                <div className="mb-24">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">
                            {searchTerm ? 'Resultados da busca' : 'Últimos Artigos'}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-96 bg-white/5 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
                            <p className="text-gray-400 text-lg">Nenhum artigo encontrado para sua busca.</p>
                        </div>
                    )}
                </div>

                {/* Web Stories */}
                {!searchTerm && (
                    <StoryList stories={storiesData as Story[]} />
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
