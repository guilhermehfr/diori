import { Metadata } from 'next'

import { ManagePostForm } from '@/src/components/admin/ManagePostForm'

export const metadata: Metadata = {
  title: 'Create New Post',
}
export default async function AdminPostNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Create New Post</h1>
      <ManagePostForm />
    </div>
  )
}
