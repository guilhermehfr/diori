import type { PostModel } from "@/src/models/post/post-model";

export interface PostRepository {
  getAllPosts(): Promise<PostModel[]>;
  getAllPublicPosts(): Promise<PostModel[]>;
  getPublicPostById(id: string): Promise<PostModel>;
  getPublicPostBySlug(slug: string): Promise<PostModel>;
  delete(id: string): Promise<PostModel>;
}
