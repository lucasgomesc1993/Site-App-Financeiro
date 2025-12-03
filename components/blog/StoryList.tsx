import React from 'react';
import { Story } from '../../types/blog';
import { Play } from 'lucide-react';

interface StoryListProps {
    stories: Story[];
}

export const StoryList: React.FC<StoryListProps> = ({ stories }) => {
    if (stories.length === 0) return null;

    return (
        <div className="mb-20">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Web Stories</h2>
                <span className="text-sm text-primary">Ver todos</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
                {stories.map((story) => (
                    <a
                        key={story.slug}
                        href={`/stories/${story.slug}`}
                        className="flex-none w-[140px] md:w-[160px] aspect-[9/16] relative rounded-xl overflow-hidden group cursor-pointer snap-start border border-white/10"
                    >
                        <img
                            src={story.posterPortrait}
                            alt={story.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
                            <Play className="w-3 h-3 text-white fill-white" />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-white text-sm font-medium leading-tight line-clamp-3">
                                {story.title}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};
