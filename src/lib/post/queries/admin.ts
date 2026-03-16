import { postRepository } from "@/src/repositories/post";
import { cache } from "react";

export const getPostByIdAdmin = cache(async (id: string) => {
  return postRepository.getPostById(id);
});

export const getAllPublicPostsAdmin = cache(async () => {
  return postRepository.getAllPublicPosts();
});
