import { Metadata } from 'next'
import { Suspense } from 'react'

import { SpinLoader } from '@/src/components/SpinLoader'

import { PostsListAdmin } from '@/src/components/admin/PostsListAdmin'

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Post Admin',
}

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PostsListAdmin />
    </Suspense>
  )
}
