import clsx from 'clsx'
import Link from 'next/link'

import { getAllPostsAdmin } from '@/src/lib/post/queries/admin'

import { PostModel } from '@/src/models/post/post-model'

import { DeletePostButton } from '@/src/components/admin/DeletePostButton'

export async function PostsListAdmin() {
  const posts = await getAllPostsAdmin()

  return (
    <div className="mb-16">
      {posts.map((post: PostModel) => {
        return (
          <div
            className={clsx(
              'py-2 px-2',
              !post.published && 'bg-slate-300',
              'flex gap-2 items-center justify-between'
            )}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className="text-xs text-slate-600 italic">(Não publicado)</span>
            )}

            <DeletePostButton id={post.id} title={post.title} />
          </div>
        )
      })}
    </div>
  )
}
