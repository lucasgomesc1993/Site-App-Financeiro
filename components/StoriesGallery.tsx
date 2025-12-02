import React from 'react';

import { Play, ArrowRight, Zap } from 'lucide-react';
import { SEO } from './SEO';
import { Breadcrumb } from './Breadcrumb';
// Importamos os dados diretamente do JSON que você já usa para gerar os HTMLs
import storiesData from '../data/stories.json';

export const StoriesGallery: React.FC = () => {
    return (
        <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
            <SEO
                title="Web Stories Financeiras - Dicas Rápidas | FinZap"
                description="Confira nossas Web Stories com dicas rápidas de finanças, FGTS, investimentos e economia em formato visual e direto ao ponto."
                canonical="/stories"
            />

            {/* Background Effects (mesmo estilo das outras páginas) */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Breadcrumb items={[
                        { label: 'Home', href: '/' },
                        { label: 'Stories', href: '/stories' }
                    ]} />
                </div>

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">Conteúdo Rápido</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        FinZap <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Stories</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Dicas financeiras, tutoriais e novidades em formato de tela cheia. Rápido de ler, fácil de entender.
                    </p>
                </div>

                {/* Grid de Stories */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {storiesData.map((story, index) => (
                        <a
                            key={story.slug}
                            href={`/stories/${story.slug}.html`} // Link direto para o HTML estático gerado
                            className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-gray-900"
                        >
                            {/* Imagem de Capa */}
                            <img
                                src={story.posterPortrait}
                                alt={story.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                loading="lazy"
                            />

                            {/* Overlay Gradiente */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                            {/* Conteúdo do Card */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                                    <Play className="w-3 h-3 fill-current" />
                                    Web Story
                                </div>
                                <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                                    {story.title}
                                </h3>
                                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium group-hover:text-white transition-colors">
                                    Ver agora <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
