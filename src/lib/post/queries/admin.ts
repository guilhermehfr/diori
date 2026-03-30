import { postRepository } from "@/src/repositories/post";
import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";

export const getPostByIdAdmin = cache(async (id: string) => {
  cacheLife("max");
  cacheTag(`post-${id}`);
  return postRepository.getPublicPostById(id);
});

export const getAllPublicPostsAdmin = cache(async () => {
  cacheLife("max");
  cacheTag("posts");
  return postRepository.getAllPublicPosts();
});

export const getAllPostsAdmin = cache(async () => {
  cacheLife("max");
  cacheTag("posts");
  return postRepository.getAllPosts();
});
