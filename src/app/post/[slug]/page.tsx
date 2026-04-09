import { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { getPostBySlugCached } from '@/src/lib/post/queries/public'

import { SpinLoader } from '@/src/components/SpinLoader'
import { SinglePost } from '@/src/components/SinglePost'

export async function generateMetadata({ params }: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params

  const post = await getPostBySlugCached(slug)

  if (!post) notFound()

  return {
    title: post.title,
    description: post.excerpt,
  }
}

type PostSlugPageProps = {
  params: Promise<{ slug: string }>
}

async function PostContent({ params }: PostSlugPageProps) {
  const { slug } = await params

  return <SinglePost slug={slug} />
}

export default function PostSlugPage(props: PostSlugPageProps) {
  return (
    <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
      <PostContent {...props} />
    </Suspense>
  )
}
