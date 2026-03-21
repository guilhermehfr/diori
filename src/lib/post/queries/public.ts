import { unstable_cache } from "next/cache";
import { cache } from "react";

import { postRepository } from "@/src/repositories/post";

export const getAllPublicPostsCached = unstable_cache(
  cache(async () => {
    return await postRepository.getAllPublicPosts();
  }),
  ["posts"],
  {
    tags: ["posts"],
  },
);

export const getPostByIdCached = (id: string) =>
  unstable_cache(
    cache(async (id: string) => {
      return await postRepository.getPostById(id);
    }),
    ["posts"],
    {
      tags: [`post-${id}`],
    },
  )(id);

export const getPostBySlugCached = cache((slug: string) => {
  return unstable_cache(
    async (slug: string) => {
      const post = await postRepository
        .getPostBySlugPublic(slug)
        .catch(() => null);
      return post;
    },
    ["posts"],
    {
      tags: [`post-${slug}`],
    },
  )(slug);
});
