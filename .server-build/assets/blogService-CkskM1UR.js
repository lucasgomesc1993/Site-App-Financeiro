import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cfbwntkyygkqbottkktc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmYndudGt5eWdrcWJvdHRra3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDExOTAsImV4cCI6MjA3NDM3NzE5MH0.08-1PNyvfi6YsG8z3EpAkoLLYzRMcZg8jAJSKkYVfzM";
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
const blogService = {
  async getPosts() {
    const { data, error } = await supabase.from("posts").select("*, author:authors(*), category:categories(*)").eq("published", true).order("published_at", { ascending: false });
    if (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
    return data.map((post) => ({
      ...post,
      reading_time: Math.ceil(post.content.split(" ").length / 200)
    }));
  },
  async getPostBySlug(slug) {
    const { data, error } = await supabase.from("posts").select("*, author:authors(*), category:categories(*)").eq("slug", slug).eq("published", true).single();
    if (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      return null;
    }
    return {
      ...data,
      reading_time: Math.ceil(data.content.split(" ").length / 200)
    };
  },
  async getPostsByCategory(categorySlug) {
    const { data, error } = await supabase.from("posts").select("*, author:authors(*), category:categories!inner(*)").eq("category.slug", categorySlug).eq("published", true).order("published_at", { ascending: false });
    if (error) {
      console.error(`Error fetching posts for category ${categorySlug}:`, error);
      return [];
    }
    return data.map((post) => ({
      ...post,
      reading_time: Math.ceil(post.content.split(" ").length / 200)
    }));
  },
  async getAllCategories() {
    const { data, error } = await supabase.from("categories").select("*").order("name");
    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
    return data;
  }
};
export {
  blogService as b
};
//# sourceMappingURL=blogService-CkskM1UR.js.map
