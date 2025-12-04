import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogService } from '../services/blogService';
import { Post } from '../types/blog';
import { PostCard } from './blog/PostCard';

export const LatestPosts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const allPosts = await blogService.getPosts();
                setPosts(allPosts.slice(0, 3));
            } catch (error) {
                console.error('Error fetching latest posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (!loading && posts.length === 0) return null;

    return (
        <section className="py-24 bg-[#0d0d0d] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Últimas do <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Blog</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl">
                            Fique por dentro das novidades, dicas de economia e estratégias para dominar suas finanças.
                        </p>
                    </div>

                    <Link
                        to="/blog"
                        className="group flex items-center gap-2 text-primary font-medium hover:text-emerald-400 transition-colors"
                    >
                        Ver todos os artigos
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-[400px] bg-white/5 rounded-2xl animate-pulse border border-white/5" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
