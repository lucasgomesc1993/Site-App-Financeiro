export interface Author {
    name: string;
    avatar_url?: string;
    bio?: string;
    role?: string;
    linkedin_url?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    published_at: string;
    updated_at?: string;
    cover_image: string;
    cover_image_alt: string;
    meta_title: string;
    meta_description: string;
    author?: Author;
    category?: Category;
    faq?: FAQItem[];
    reading_time?: number;
    featured?: boolean;
}
