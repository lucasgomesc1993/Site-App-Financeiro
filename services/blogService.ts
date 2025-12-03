import { supabase } from '../lib/supabase';
import { Post, Category } from '../types/blog';

export const blogService = {
    async getPosts(): Promise<Post[]> {
        const { data, error } = await supabase
            .from('posts')
            .select('*, author:authors(*), category:categories(*)')
            .eq('published', true)
            .order('published_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
            return [];
        }

        return data.map((post: any) => ({
            ...post,
            reading_time: Math.ceil(post.content.split(' ').length / 200)
        })) as Post[];
    },

    async getPostBySlug(slug: string): Promise<Post | null> {
        const { data, error } = await supabase
            .from('posts')
            .select('*, author:authors(*), category:categories(*)')
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error) {
            console.error(`Error fetching post with slug ${slug}:`, error);
            return null;
        }

        return {
            ...data,
            reading_time: Math.ceil(data.content.split(' ').length / 200)
        } as Post;
    },

    async getPostsByCategory(categorySlug: string): Promise<Post[]> {
        const { data, error } = await supabase
            .from('posts')
            .select('*, author:authors(*), category:categories!inner(*)')
            .eq('category.slug', categorySlug)
            .eq('published', true)
            .order('published_at', { ascending: false });

        if (error) {
            console.error(`Error fetching posts for category ${categorySlug}:`, error);
            return [];
        }

        return data.map((post: any) => ({
            ...post,
            reading_time: Math.ceil(post.content.split(' ').length / 200)
        })) as Post[];
    },

    async getAllCategories(): Promise<Category[]> {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
        return data as Category[];
    }
};
