'use server'

import { revalidateTag } from 'next/cache'

import { makePartialPublicPost, makePublicPostFromDb, PublicPost } from '@/src/dto/post/dto'
import { PostModel } from '@/src/models/post/post-model'
import { TAG_POSTS, tagPost } from '@/src/lib/cache/tags'
import { PostUpdateSchema } from '@/src/lib/validation'
import { getZodErrorsMessages } from '@/src/utils/get-zod-errors-messages'
import { postRepository } from '@/src/repositories/post'

type UpdatePostActionState = {
  formState: PublicPost
  errors: string[]
  success?: number
}

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData
): Promise<UpdatePostActionState> {
  // TODO: Verify if the user is logged in

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Invalid form data'],
    }
  }

  const id = formData.get('id')?.toString() || ''

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['Invalid post ID'],
    }
  }

  const formDataToObj = Object.fromEntries(formData.entries())
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj)

  if (!zodParsedObj.success) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: getZodErrorsMessages(zodParsedObj.error.format()),
    }
  }

  const validPostData = zodParsedObj.data

  const newPost: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'> = {
    ...validPostData,
  }

  let post
  try {
    post = await postRepository.update(id, newPost)
  } catch (error) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: [error instanceof Error ? error.message : 'An unexpected error occurred'],
    }
  }

  revalidateTag(TAG_POSTS, 'max')
  revalidateTag(tagPost(post.slug), 'max')

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: Math.random() * (1000 - 1) + 1,
  }
}
