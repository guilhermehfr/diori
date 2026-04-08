import { Metadata } from 'next'
import { Suspense } from 'react'

import { ManagePostForm } from '@/src/components/admin/ManagePostForm'
import { SpinLoader } from '@/src/components/SpinLoader'

export const metadata: Metadata = {
  title: 'Create New Post',
}
export default async function AdminPostNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Create New Post</h1>
      <Suspense fallback={<SpinLoader />}>
        <ManagePostForm mode="create" />
      </Suspense>
    </div>
  )
}
