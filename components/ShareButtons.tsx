import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Facebook, Linkedin, Twitter, MessageCircle, Check } from 'lucide-react';

interface ShareButtonsProps {
    className?: string;
    url?: string;
    title?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ className = "" }) => {
    const [copied, setCopied] = useState(false);

    // Get current URL and Title if not provided
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const currentTitle = typeof document !== 'undefined' ? document.title : 'FinZap Calculadoras';

    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(currentTitle);

    const shareLinks = [
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            color: 'hover:text-green-500 hover:bg-green-500/10'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'hover:text-blue-600 hover:bg-blue-600/10'
        },
        {
            name: 'Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: 'hover:text-blue-500 hover:bg-blue-500/10'
        },
        {
            name: 'X (Twitter)',
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: 'hover:text-sky-500 hover:bg-sky-500/10'
        }
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/20"></div>
                <span className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                </span>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/20"></div>
            </div>

            <div className="flex items-center gap-2">
                {shareLinks.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 transition-all duration-300 transform hover:scale-110 ${link.color}`}
                        title={`Compartilhar no ${link.name}`}
                    >
                        <link.icon className="w-5 h-5" />
                    </a>
                ))}

                <button
                    onClick={handleCopy}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 transition-all duration-300 transform hover:scale-110 hover:text-white hover:bg-white/10 group relative"
                    title="Copiar Link"
                >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5" />}

                    {copied && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-1">
                            Linkcopiado!
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};
