import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export async function getBlogRoutes() {
    if (!supabase) {
        console.warn('Supabase credentials missing. Skipping blog routes generation.');
        return [];
    }

    const routes = [];

    try {
        // Get Posts
        const { data: posts, error: postsError } = await supabase
            .from('posts')
            .select('slug')
            .eq('published', true);

        if (postsError) {
            console.error('Error fetching posts for SSG:', postsError);
        } else if (posts) {
            posts.forEach(post => {
                routes.push(`/blog/${post.slug}`);
            });
        }

        // Get Categories
        const { data: categories, error: catsError } = await supabase
            .from('categories')
            .select('slug');

        if (catsError) {
            console.error('Error fetching categories for SSG:', catsError);
        } else if (categories) {
            categories.forEach(category => {
                routes.push(`/blog/categoria/${category.slug}`);
            });
        }
    } catch (e) {
        console.error('Unexpected error fetching blog routes:', e);
    }

    return routes;
}
