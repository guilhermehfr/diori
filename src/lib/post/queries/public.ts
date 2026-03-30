"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";

import { postRepository } from "@/src/repositories/post";

export const getAllPublicPostsCached = cache(async () => {
  cacheLife("max");
  cacheTag("posts");
  return await postRepository.getAllPublicPosts();
});

export const getPostByIdCached = cache(async (id: string) => {
  cacheLife("max");
  cacheTag(`post-${id}`);
  return await postRepository.getPublicPostById(id);
});

export const getPostBySlugCached = cache(async (slug: string) => {
  cacheLife("max");
  cacheTag(`post-${slug}`);
  return await postRepository.getPublicPostBySlug(slug);
});
