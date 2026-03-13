import { notFound } from "next/navigation";

import { postRepository } from "@/src/repositories/post";

export async function getAllPublicPostsCached() {
  "use cache";

  return postRepository.getAllPublicPosts();
}

export async function getPostByIdCached(id: string) {
  "use cache";

  return postRepository.getPostById(id);
}

export async function getPostBySlugCached(slug: string) {
  "use cache";

  const post = await postRepository.getPostBySlugPublic(slug).catch(() => null);
  if (post === null) notFound();
  return post;
}
