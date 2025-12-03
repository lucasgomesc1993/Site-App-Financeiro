import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/blog';

interface CategoryListProps {
    categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link
                to="/blog"
                className="px-4 py-2 rounded-full bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors"
            >
                Todos
            </Link>
            {categories.map((category) => (
                <Link
                    key={category.id}
                    to={`/blog/${category.slug}`}
                    className="px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-primary/30 hover:text-white transition-all text-sm"
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
};
