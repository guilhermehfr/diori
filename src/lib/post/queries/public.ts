'use cache'

import { cacheLife, cacheTag } from 'next/cache'

import { postRepository } from '@/src/repositories/post'
import { TAG_POSTS, tagPost } from '@/src/lib/cache/tags'

export const getAllPublicPostsCached = async () => {
  cacheLife('max')
  cacheTag(TAG_POSTS)
  return await postRepository.getAllPublicPosts()
}

export const getPostByIdCached = async (id: string) => {
  cacheLife('max')
  cacheTag(tagPost(id))
  return await postRepository.getPublicPostById(id)
}

export const getPostBySlugCached = async (slug: string) => {
  cacheLife('max')
  cacheTag(tagPost(slug))
  return await postRepository.getPublicPostBySlug(slug)
}
