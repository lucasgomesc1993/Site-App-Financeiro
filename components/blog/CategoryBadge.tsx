import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/blog';

interface CategoryBadgeProps {
    category: Category;
    className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
    return (
        <Link
            to={`/blog/${category.slug}`}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20 whitespace-nowrap ${className}`}
        >
            {category.name}
        </Link>
    );
};
