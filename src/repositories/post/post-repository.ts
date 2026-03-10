import type { PostModel } from "@/src/models/post/post-model";

export interface PostRepository {
  getAllPosts(): Promise<PostModel[]>;
  getAllPublicPosts(): Promise<PostModel[]>;
  getPostById(id: string): Promise<PostModel>;
  getPostBySlugPublic(slug: string): Promise<PostModel>;
}
