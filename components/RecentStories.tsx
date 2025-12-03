import React from 'react';

import { Play, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import storiesData from '../data/stories.json';

export const RecentStories: React.FC = () => {
    // Take the first 4 stories
    const recentStories = storiesData.slice(0, 4);

    if (recentStories.length === 0) return null;

    return (
        <section className="py-24 px-4 bg-surface/30 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-300">Dicas Rápidas</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Web Stories <span className="text-primary">FinZap</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl">
                            Conteúdo visual e direto ao ponto para você aprender sobre finanças em poucos segundos.
                        </p>
                    </div>

                    <Link
                        to="/stories"
                        className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors group"
                    >
                        Ver todas as stories
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {recentStories.map((story, index) => (
                        <a
                            key={story.slug}
                            href={`/stories/${story.slug}`}
                            className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-gray-900"
                        >
                            <img
                                src={story.posterPortrait}
                                alt={story.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-wider mb-2">
                                    <Play className="w-3 h-3 fill-current" />
                                    Web Story
                                </div>
                                <h3 className="text-white font-bold text-sm leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {story.title}
                                </h3>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
