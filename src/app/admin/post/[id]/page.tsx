import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { getPostByIdAdmin } from '@/src/lib/post/queries/admin'
import { makePublicPostFromDb } from '@/src/dto/post/dto'

import { ManagePostForm } from '@/src/components/admin/ManagePostForm'
import { SpinLoader } from '@/src/components/SpinLoader'

export const metadata: Metadata = {
  title: 'Edit Post',
}

type AdminPostIdPageProps = {
  params: Promise<{
    id: string
  }>
}

async function AdminPostIdContent({ params }: AdminPostIdPageProps) {
  const { id } = await params
  const post = await getPostByIdAdmin(id).catch(() => {
    return null
  })

  if (!post) {
    notFound()
  }

  const publicPost = makePublicPostFromDb(post)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Edit Post</h1>
      <ManagePostForm mode="update" publicPost={publicPost} />
    </div>
  )
}

export default function AdminPostIdPage(props: AdminPostIdPageProps) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <AdminPostIdContent {...props} />
    </Suspense>
  )
}
