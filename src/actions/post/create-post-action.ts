'use server'

import { revalidateTag } from 'next/cache'
import slugify from 'slugify'
import { v4 as uuidv4 } from 'uuid'
import { redirect } from 'next/navigation'

import { makePartialPublicPost, PublicPost } from '@/src/dto/post/dto'
import { PostModel } from '@/src/models/post/post-model'
import { PostCreateSchema } from '@/src/lib/validation'
import { TAG_POSTS } from '@/src/lib/cache/tags'
import { verifyLoginSession } from '@/src/lib/login/manage-login'
import { getZodErrorsMessages } from '@/src/utils/get-zod-errors-messages'
import { postRepository } from '@/src/repositories/post'

type CreatePostActionState = {
  formState: PublicPost
  errors: string[]
  success?: number
}

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData
): Promise<CreatePostActionState> {
  const isAuthenticated = await verifyLoginSession()

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Invalid form data'],
    }
  }

  const formDataToObj = Object.fromEntries(formData.entries())
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj)

  if (!isAuthenticated) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Login session expired. Please login in another tab to create a post.'],
    }
  }

  if (!zodParsedObj.success) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: getZodErrorsMessages(zodParsedObj.error.format()),
    }
  }

  const validPostData = zodParsedObj.data

  const slugWithRandomString = slugify(validPostData.title, {
    lower: true,
    strict: true,
    trim: true,
  }).concat(
    // Add random string to ensure uniqueness;
    '-' + Math.random().toString(36).substring(2, 6)
  )

  const newPost: PostModel = {
    ...validPostData,
    id: uuidv4(),
    slug: slugWithRandomString,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  try {
    await postRepository.create(newPost)
  } catch (error) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: [error instanceof Error ? error.message : 'An unexpected error occurred'],
    }
  }

  revalidateTag(TAG_POSTS, 'max')
  redirect(`/admin/post/${newPost.id}?created=1`)
}
