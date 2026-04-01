import { getAllPublicPostsCached } from '@/src/lib/post/queries/public'

import { PostCoverImage } from '../PostCoverImage'
import { PostSummary } from '../PostSummary'

export async function PostList(): Promise<React.ReactNode> {
  // TODO: IMAGE PRIORITY IN ALL POSTS (NOT ONLY IN THE FIRST ONE)

  const posts = await getAllPublicPostsCached()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.slice(1).map((post) => {
        const postLink = `/post/${post.slug}`

        return (
          <div className="flex flex-col group gap-4" key={post.id + '_container'}>
            <PostCoverImage
              linkProps={{
                href: postLink,
                className: 'hover:shadow-small',
              }}
              imageProps={{
                src: post.coverImageUrl,
                alt: post.title,
                width: 1200,
                height: 1200,
              }}
            />

            <PostSummary
              postHeading="h2"
              postLink={postLink}
              createdAt={post.createdAt}
              title={post.title}
              excerpt={post.excerpt}
            />
          </div>
        )
      })}
    </div>
  )
}
