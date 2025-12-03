import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '../../types/blog';
import { CategoryBadge } from './CategoryBadge';
import { Calendar, ArrowRight } from 'lucide-react';

interface PostCardProps {
    post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <article className="group relative flex flex-col h-full bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(71,255,183,0.1)]">
            <Link to={`/blog/${post.category?.slug || 'geral'}/${post.slug}`} className="block overflow-hidden aspect-video">
                <img
                    src={post.cover_image}
                    alt={post.cover_image_alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </Link>

            <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-3 mb-4">
                    {post.category && <CategoryBadge category={post.category} />}
                    <div className="flex items-center text-xs text-gray-400 gap-1">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={post.published_at}>
                            {format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: ptBR })}
                        </time>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link to={`/blog/${post.category?.slug || 'geral'}/${post.slug}`}>
                        {post.title}
                    </Link>
                </h3>

                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        {post.author?.avatar_url && (
                            <img src={post.author.avatar_url} alt={post.author.name} className="w-6 h-6 rounded-full" />
                        )}
                        <span className="text-xs text-gray-400">{post.author?.name}</span>
                    </div>

                    <Link to={`/blog/${post.category?.slug || 'geral'}/${post.slug}`} className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Ler artigo <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
};
