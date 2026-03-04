import type { PostModel } from "@/src/models/post/post-model";

export interface PostRepository {
  getAllPosts(): Promise<PostModel[]>;
  getPostById(id: string): Promise<PostModel | null>;
}
