import { del } from '@vercel/blob'
import { postRepository } from '../repositories/post'
import { deletePostAction } from '../actions/post/delete-post-action'

/*
  IMPORTANT:
    This function is meant to be run ONLY by Vercel Cron jobs with a 24h frequency, to clean up posts that are not from the seed data.
    Since these images in Vercel Blob are not automatically deleted WHEN we delete the post from the database,
    we need to setup this cron job to delete the images from the Blob storage as well.

  You must be asking: Why that?
    - This is current a showcase project, and I want to make it as easy as possible for anyone to test it out,
      without incurring any unnecessary costs in my infrastructure :)

  You can read more about Vercel Blob pricing here: https://vercel.com/pricing#blob-storage
  And you can read more about Vercel Cron jobs here: https://vercel.com/docs/cron-jobs/overview

  OBS:
      To put this blog in production, you should remove this function and the corresponding cron job,
      since it's only necessary to clean up the seed data posts that are created in the development environment.
*/
export async function runCleanup(): Promise<void> {
  const vercelBlobUrl = process.env.VERCEL_IMAGE_BLOB_URL

  if (!vercelBlobUrl) {
    console.error(
      'Vercel Blob base URL is not defined. Please set the VERCEL_IMAGE_BLOB_URL environment variable.'
    )
    return
  }

  const baseUrl = vercelBlobUrl + '/uploads/bryen_'

  try {
    const posts = await postRepository.getAllPosts()
    const postsToDelete = posts.filter((post) => !post.coverImageUrl.startsWith(baseUrl))

    for (const post of postsToDelete) {
      try {
        console.log(
          `Deleting post with id >> ${post.id} << and image url >> ${post.coverImageUrl} << ...`
        )

        await del(post.coverImageUrl)
        await deletePostAction(post.id)

        console.log(`Deleted post with id ${post.id} and image ${post.coverImageUrl}`)
        console.log(`- - - - - - - - - - - - - - - - - - - - - - - - - -`)
      } catch (error) {
        console.error(
          `Error deleting post with id ${post.id} and image ${post.coverImageUrl}: `,
          error
        )
      }
    }
  } catch (error) {
    console.error('Error fetching posts for cleanup:', error)
    throw error
  }
}
