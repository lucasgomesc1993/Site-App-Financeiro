import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostCard } from '../../components/blog/PostCard';
import { CategoryList } from '../../components/blog/CategoryList';
import { Breadcrumb } from '../../components/Breadcrumb';
import { AppPromoBanner } from '../../components/AppPromoBanner';
import { blogService } from '../../services/blogService';
import { Post, Category } from '../../types/blog';
import { SEO } from '../../components/SEO';
import { BookOpen } from 'lucide-react';

export const CategoryPage: React.FC = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!categorySlug) return;
            setLoading(true);

            // Fetch posts for category
            const postsData = await blogService.getPostsByCategory(categorySlug);
            setPosts(postsData);

            // Fetch all categories to find the current one and display list
            const categoriesData = await blogService.getAllCategories();
            setCategories(categoriesData);

            const currentCategory = categoriesData.find(c => c.slug === categorySlug);
            setCategory(currentCategory || null);

            setLoading(false);
        };
        fetchData();
    }, [categorySlug]);

    if (!category && !loading) {
        return (
            <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
                <div className="container mx-auto px-4 text-center py-20">
                    <h1 className="text-2xl text-white">Categoria não encontrada</h1>
                </div>
            </section>
        )
    }

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title={`${category?.name || 'Categoria'} - Blog Junny`}
                description={`Artigos sobre ${category?.name || 'finanças'} no blog Junny.`}
                canonical={`https://junny.com.br/blog/${categorySlug}`}
            />

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <Breadcrumb items={[
                    { label: 'Blog', href: '/blog' },
                    { label: category?.name || 'Categoria', href: `/blog/${categorySlug}` }
                ]} />

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-300">Categoria</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {category?.name}
                    </h1>
                    {category?.description && (
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            {category.description}
                        </p>
                    )}
                </div>

                {/* Categories List */}
                <CategoryList categories={categories} />

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-96 bg-white/5 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                <div className="mt-24">
                    <div className="mt-24">
                        <AppPromoBanner />
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12">
                        <p className="text-sm text-gray-400">
                            <strong>Aviso legal:</strong> O conteúdo disponibilizado neste blog é apenas para fins informativos e educacionais.
                            Embora busquemos manter as informações atualizadas, não nos responsabilizamos por eventuais divergências ou decisões tomadas com base nos artigos.
                            Consulte sempre um profissional para orientações específicas ao seu caso.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
