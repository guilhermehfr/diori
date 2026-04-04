'use server'

import { makePartialPublicPost, PublicPost } from '@/src/dto/post/dto'
import { PostCreateSchema } from '@/src/lib/validation'
import { PostModel } from '@/src/models/post/post-model'
import { getZodErrorsMessages } from '@/src/utils/get-zod-errors-messages'
import { v4 as uuidv4 } from 'uuid'
import slugify from 'slugify'

type CreatePostActionState = {
  formState: PublicPost
  errors: string[]
}

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData
): Promise<CreatePostActionState> {
  // TODO: Verify if the user is logged in

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Invalid form data'],
    }
  }

  const formDataToObj = Object.fromEntries(formData.entries())
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj)

  if (!zodParsedObj.success) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: getZodErrorsMessages(zodParsedObj.error.format()),
    }
  }

  const validPostData = zodParsedObj.data
  const newPost: PostModel = {
    ...validPostData,
    id: uuidv4(),
    slug: slugify(validPostData.title, { lower: true, strict: true, trim: true }),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return {
    formState: newPost,
    errors: [],
  }
}
