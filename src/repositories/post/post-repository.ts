import type { PostModel } from "@/src/models/post/post-model";

export interface PostRepository {
  getAllPublicPosts(): Promise<PostModel[]>;
  getPostById(id: string): Promise<PostModel | null>;
}
