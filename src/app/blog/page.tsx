import { getAllBlogPosts } from "@/lib/blog-content";
import BlogPageClient from "./BlogPageClient";

export default function BlogPage() {
  const posts = getAllBlogPosts();
  return <BlogPageClient posts={posts} />;
}
