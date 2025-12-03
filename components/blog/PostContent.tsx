import React from 'react';


interface PostContentProps {
    content: string;
}

export const PostContent: React.FC<PostContentProps> = ({ content }) => {
    return (
        <div
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white prose-code:text-primary prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-white/10"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};
