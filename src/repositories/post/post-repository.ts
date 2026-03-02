import { PostModel } from "@/src/models/post/post-model";

export interface PostRepository {
  getAllPosts(): Promise<PostModel[]>;
}
