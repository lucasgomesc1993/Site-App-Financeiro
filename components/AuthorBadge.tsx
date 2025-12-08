import React from 'react';
import { Link } from 'react-router-dom';
import { AUTHOR } from '../constants/author';
import { ShieldCheck } from 'lucide-react';

interface AuthorBadgeProps {
    className?: string;
}

export const AuthorBadge: React.FC<AuthorBadgeProps> = ({ className = "" }) => {
    return (
        <div className={`max-w-7xl mx-auto px-4 md:px-8 flex justify-center ${className}`}>
            <Link
                to="/autor"
                className="inline-flex items-center gap-4 bg-[#0d0d0d] border border-white/5 rounded-2xl p-4 pr-6 hover:bg-white/5 hover:border-primary/20 transition-all duration-300 group"
            >
                <div className="relative">
                    <img
                        src={AUTHOR.avatar_url}
                        alt={AUTHOR.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                        <ShieldCheck className="w-5 h-5 text-primary fill-primary/10" />
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Conteúdo revisado por</span>
                    <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                        {AUTHOR.name}
                    </span>
                    <span className="text-xs text-gray-500 line-clamp-1 max-w-[200px] md:max-w-none">
                        {AUTHOR.role}
                    </span>
                </div>
            </Link>
        </div>
    );
};
