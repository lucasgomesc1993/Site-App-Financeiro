import React from 'react';


interface PostContentProps {
    content: string;
}

export const PostContent: React.FC<PostContentProps> = ({ content }) => {
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!contentRef.current) return;

        const links = contentRef.current.getElementsByTagName('a');
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            const href = link.getAttribute('href');

            // Check if it's an internal link
            if (href && (href.startsWith('/') || href.startsWith(window.location.origin))) {
                link.removeAttribute('target');
                // Optional: remove rel="noopener noreferrer" if it was added solely for target="_blank"
                // link.removeAttribute('rel'); 
            }
        }
    }, [content]);

    return (
        <div
            ref={contentRef}
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white prose-code:text-primary prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-white/10"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};
