import { notFound } from "next/navigation";
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

export const getPostBySlugCached = (slug: string) =>
  unstable_cache(
    cache(async (slug: string) => {
      const post = await postRepository
        .getPostBySlugPublic(slug)
        .catch(() => null);
      if (post === null) notFound();
      return post;
    }),
    ["posts"],
    {
      tags: [`post-${slug}`],
    },
  )(slug);
