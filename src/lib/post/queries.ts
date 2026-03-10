import { cache } from "react";
import { notFound } from "next/navigation";

import { postRepository } from "@/src/repositories/post";

export const getAllPublicPostsCached = cache(
  async () => await postRepository.getAllPublicPosts(),
);

export const getPostByIdCached = cache(
  async (id: string) => await postRepository.getPostById(id),
);

export const getPostBySlugCached = cache(async (slug: string) => {
  const post = await postRepository.getPostBySlugPublic(slug).catch(() => null);
  if (post === null) notFound();
  return post;
});
