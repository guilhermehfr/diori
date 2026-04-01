'use cache'

import { cacheLife, cacheTag } from 'next/cache'

import { postRepository } from '@/src/repositories/post'
import { TAG_POSTS, tagPost } from '@/src/lib/cache/tags'

export const getPostByIdAdmin = async (id: string) => {
  cacheLife('max')
  cacheTag(tagPost(id))
  return postRepository.getPublicPostById(id)
}

export const getAllPublicPostsAdmin = async () => {
  cacheLife('max')
  cacheTag(TAG_POSTS)
  return postRepository.getAllPublicPosts()
}

export const getAllPostsAdmin = async () => {
  cacheLife('max')
  cacheTag(TAG_POSTS)
  return postRepository.getAllPosts()
}
