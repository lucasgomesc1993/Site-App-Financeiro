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

export interface StorySlide {
    id: string;
    media: {
        type: 'image' | 'video';
        url: string;
        poster?: string;
    };
    text: string;
    animation?: string;
    cta?: {
        label: string;
        url: string;
    };
}

export interface Story {
    slug: string;
    title: string;
    publisher: string;
    publisherLogo: string;
    posterPortrait: string;
    slides: StorySlide[];
}
