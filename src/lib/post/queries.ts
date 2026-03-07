import { cache } from "react";

import { postRepository } from "@/src/repositories/post";

export const getAllPublicPosts = cache(
  async () => await postRepository.getAllPublicPosts(),
);

export const getPostById = async (id: string) =>
  await postRepository.getPostById(id);
