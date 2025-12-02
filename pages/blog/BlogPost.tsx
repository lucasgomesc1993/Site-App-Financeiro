import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostContent } from '../../components/blog/PostContent';
import { Breadcrumb } from '../../components/Breadcrumb';
import { AppPromoBanner } from '../../components/AppPromoBanner';
import { FAQ } from '../../components/FAQ';
import { blogService } from '../../services/blogService';
import { Post } from '../../types/blog';
import { SEO } from '../../components/SEO';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'lucide-react';

import { useServerData } from '../../context/ServerContext';

export const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const serverData = useServerData();

    // Initialize with server data if available and matches current slug
    const [post, setPost] = useState<Post | null>(
        (serverData && serverData.slug === slug) ? serverData : null
    );
    const [loading, setLoading] = useState(!post);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug || post) return; // Skip if we already have the post
            const data = await blogService.getPostBySlug(slug);
            setPost(data);
            setLoading(false);
        };
        fetchPost();
    }, [slug, post]);

    if (loading) {
        return (
            <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-3xl mx-auto space-y-8 animate-pulse">
                        <div className="h-8 bg-white/5 rounded w-3/4" />
                        <div className="h-64 bg-white/5 rounded-2xl" />
                        <div className="space-y-4">
                            <div className="h-4 bg-white/5 rounded" />
                            <div className="h-4 bg-white/5 rounded" />
                            <div className="h-4 bg-white/5 rounded w-5/6" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!post) {
        return (
            <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
                <div className="container mx-auto px-4 text-center py-20">
                    <h1 className="text-2xl text-white">Post não encontrado</h1>
                </div>
            </section>
        );
    }

    // JSON-LD for BlogPosting
    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.cover_image,
        "datePublished": post.published_at,
        "dateModified": post.updated_at || post.published_at,
        "author": {
            "@type": "Person",
            "name": post.author?.name || "FinZap Team",
            "url": post.author?.linkedin_url,
            "jobTitle": post.author?.role
        },
        "publisher": {
            "@type": "Organization",
            "name": "FinZap",
            "logo": {
                "@type": "ImageObject",
                "url": "https://finzap.io/logo.png"
            }
        },
        "description": post.meta_description || post.excerpt
    };

    // JSON-LD for FAQPage (if exists)
    const faqSchema = post.faq && post.faq.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    } : null;

    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title={post.meta_title || post.title}
                description={post.meta_description || post.excerpt}
                canonical={`https://finzap.io/blog/${post.slug}`}
                image={post.cover_image}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
            />

            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <article className="max-w-7xl mx-auto relative z-10">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumb items={[
                        { label: 'Blog', href: '/blog' },
                        ...(post.category ? [{ label: post.category.name, href: `/blog/categoria/${post.category.slug}` }] : []),
                        { label: post.title, href: `/blog/${post.slug}` }
                    ]} />

                    <header className="mb-12 text-center">
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-6">
                            {post.category && (
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {post.category.name}
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: ptBR })}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-center gap-3 mt-8">
                            {post.author?.avatar_url && (
                                <img src={post.author.avatar_url} alt={post.author.name} className="w-10 h-10 rounded-full border border-white/10" />
                            )}
                            <div className="text-left">
                                <p className="text-white font-medium">{post.author?.name}</p>
                                {post.author?.role && <p className="text-xs text-primary mb-0.5">{post.author.role}</p>}
                                {post.author?.bio && <p className="text-xs text-gray-400">{post.author.bio}</p>}
                            </div>
                        </div>
                    </header>

                    <div className="mb-12 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                        <img
                            src={`${post.cover_image}?width=1200&quality=80&format=webp`}
                            srcSet={`
                                ${post.cover_image}?width=600&quality=80&format=webp 600w,
                                ${post.cover_image}?width=900&quality=80&format=webp 900w,
                                ${post.cover_image}?width=1200&quality=80&format=webp 1200w
                            `}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                            alt={post.cover_image_alt}
                            className="w-full h-auto"
                            width={1200}
                            height={630}
                            loading="eager"
                            decoding="async"
                        />
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <PostContent content={post.content} />
                    </div>
                </div>
            </article>

            {post.faq && post.faq.length > 0 && (
                <div className="mt-20 relative z-10">
                    <FAQ items={post.faq} title="Perguntas Frequentes" showSocialProof={false} />
                </div>
            )}

            <div className="container mx-auto px-4 relative z-10 mt-16">
                <AppPromoBanner />
            </div>

            {/* Disclaimer */}
            <div className="container mx-auto px-4 relative z-10">
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
