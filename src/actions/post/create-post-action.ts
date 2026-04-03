'use server'

import { PublicPost } from '@/src/dto/post/dto'

type CreatePostActionState = {
  formState: PublicPost
  errors: string[]
}

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData
): Promise<CreatePostActionState> {
  // TODO: Verify if the user is logged in
  const formDataToObject = Object.fromEntries(formData.entries())

  return {
    formState: { ...prevState.formState, ...formDataToObject },
    errors: [],
  }
}
