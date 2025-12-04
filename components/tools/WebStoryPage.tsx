import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Volume2, VolumeX, ChevronLeft, Wallet } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import storiesData from '../../data/stories.json';

// Definição da estrutura de uma história baseada no JSON
interface StorySlide {
    id: string;
    media: {
        type: 'image' | 'video';
        url: string;
        poster?: string;
    };
    text?: string;
    animation?: string;
    cta?: {
        label: string;
        url: string;
    };
    duration?: number; // em segundos
}

interface StoryData {
    slug: string;
    title: string;
    publisher: string;
    publisherLogo: string;
    posterPortrait: string;
    slides: StorySlide[];
}

export const WebStoryPage: React.FC = () => {
    const { storyId } = useParams<{ storyId: string }>();
    const navigate = useNavigate();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    // Encontrar a história pelo slug
    const story = (storiesData as StoryData[]).find(s => s.slug === storyId) || null;
    const currentSlide = story?.slides[currentSlideIndex];

    useEffect(() => {
        if (!story) return;
        // Reset logic if needed when story changes, but CSS animation handles slide changes automatically via key prop
    }, [story]);

    const goNext = () => {
        if (story && currentSlideIndex < story.slides.length - 1) {
            setCurrentSlideIndex(prev => prev + 1);
        } else {
            // End of story
            if (window.history.length > 1) {
                navigate(-1);
            } else {
                navigate('/');
            }
        }
    };

    const goPrev = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(prev => prev - 1);
        }
    };

    if (!story) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <p>História não encontrada.</p>
                <Link to="/" className="ml-4 text-primary underline">Voltar</Link>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <Helmet>
                <title>{story.title} | Web Stories</title>
                <meta name="theme-color" content="#000000" />
                <link rel="amphtml" href={`https://junny.com.br/amp-stories/${story.slug}.html`} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CreativeWork",
                        "headline": story.title,
                        "image": [story.posterPortrait],
                        "datePublished": new Date().toISOString(),
                        "author": {
                            "@type": "Organization",
                            "name": story.publisher,
                            "logo": {
                                "@type": "ImageObject",
                                "url": story.publisherLogo
                            }
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Junny",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://junny.com.br/favicon.ico"
                            }
                        }
                    })}
                </script>
            </Helmet>

            {/* Container Mobile (9:16) */}
            <motion.div
                className="relative w-full h-full md:w-[400px] md:h-[90vh] md:rounded-2xl overflow-hidden bg-gray-900 shadow-2xl"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.6 }}
                onDragEnd={(_, info) => {
                    if (info.offset.y > 100 || info.velocity.y > 200) {
                        if (window.history.length > 1) {
                            navigate(-1);
                        } else {
                            navigate('/');
                        }
                    }
                }}
            >

                {/* Barras de Progresso */}
                <div className="absolute top-4 left-0 w-full px-2 flex gap-1 z-30">
                    {story.slides.map((slide, index) => (
                        <div key={slide.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white"
                                style={{
                                    width: index < currentSlideIndex ? '100%' : index > currentSlideIndex ? '0%' : 'auto',
                                    animation: index === currentSlideIndex
                                        ? `story-progress ${(currentSlide?.duration || 5)}s linear forwards`
                                        : 'none',
                                    animationPlayState: isPaused ? 'paused' : 'running'
                                }}
                                onAnimationEnd={() => {
                                    if (index === currentSlideIndex) {
                                        goNext();
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header (Autor) */}
                <div className="absolute top-8 left-4 flex items-center gap-2 z-30">
                    <button
                        onClick={() => {
                            if (window.history.length > 1) {
                                navigate(-1);
                            } else {
                                navigate('/');
                            }
                        }}
                        className="text-white"
                    >
                        <ChevronLeft className="w-8 h-8 drop-shadow-md" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Wallet className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-white text-sm font-medium drop-shadow-md">{story.publisher}</span>
                </div>

                {/* Controles de Fechar/Mute */}
                <div className="absolute top-8 right-4 flex gap-4 z-30 text-white">
                    <button onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <VolumeX className="w-6 h-6 drop-shadow-md" /> : <Volume2 className="w-6 h-6 drop-shadow-md" />}
                    </button>
                    <button onClick={() => {
                        if (window.history.length > 1) {
                            navigate(-1);
                        } else {
                            navigate('/');
                        }
                    }}>
                        <X className="w-6 h-6 drop-shadow-md" />
                    </button>
                </div>

                {/* Área de Toque (Navegação) */}
                <div className="absolute inset-0 z-20 flex">
                    <div
                        className="w-1/3 h-full"
                        onClick={goPrev}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        onMouseDown={() => setIsPaused(true)}
                        onMouseUp={() => setIsPaused(false)}
                    />
                    <div
                        className="w-2/3 h-full"
                        onClick={goNext}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        onMouseDown={() => setIsPaused(true)}
                        onMouseUp={() => setIsPaused(false)}
                    />
                </div>

                {/* Conteúdo do Slide */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentSlide?.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Mídia de Fundo */}
                        {currentSlide?.media.type === 'video' ? (
                            <video
                                src={currentSlide.media.url}
                                poster={currentSlide.media.poster}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted={isMuted}
                                playsInline
                            />
                        ) : (
                            <img
                                src={currentSlide?.media.url}
                                alt={currentSlide?.text || story.title}
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* Overlay Gradiente para Texto */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

                        {/* Texto e CTA */}
                        <div className="absolute bottom-0 left-0 w-full p-6 pb-12 z-10 flex flex-col items-center text-center">
                            {currentSlide?.text && (
                                <p className="text-white text-xl font-bold mb-6 drop-shadow-lg leading-relaxed">
                                    {currentSlide.text}
                                </p>
                            )}

                            {currentSlide?.cta && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Link
                                        to={currentSlide.cta.url}
                                        className="bg-primary text-black font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                                    >
                                        {currentSlide.cta.label}
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
