import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    // Generate JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://finzap.com.br/" // Replace with actual domain if known, or use relative
            },
            ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": `https://finzap.com.br${item.href}`
            }))
        ]
    };

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ol className="flex items-center flex-wrap gap-2 text-sm text-gray-400">
                <li>
                    <Link to="/" className="flex items-center hover:text-white transition-colors">
                        <Home className="w-4 h-4" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                        {index === items.length - 1 ? (
                            <span className="text-primary font-medium" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <Link to={item.href} className="hover:text-white transition-colors">
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
