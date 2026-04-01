'use server'

import { revalidateTag } from 'next/cache'

// import { verifyLoginSession } from "@/src/lib/login/manage-login";
import { TAG_POSTS, tagPost } from '@/src/lib/cache/tags'
import { postRepository } from '@/src/repositories/post'

export async function deletePostAction(id: string) {
  // const isAuthenticated = await verifyLoginSession();

  // if (!isAuthenticated) {
  //   return {
  //     error: "Faça login novamente em outra aba",
  //   };
  // }

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    }
  }

  let post
  try {
    post = await postRepository.delete(id)
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      }
    }
    return {
      error: 'Erro desconhecido',
      errorObject: e,
    }
  }

  revalidateTag(TAG_POSTS, 'max')
  revalidateTag(tagPost(post.slug), 'max')

  return {
    postDeletedSlug: post.slug,
  }
}
