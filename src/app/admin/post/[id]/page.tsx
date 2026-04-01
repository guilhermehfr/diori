// export const dynamic = "force-dynamic";

import { Suspense } from 'react'

type AdminPostIdPageProps = {
  params: Promise<{
    id: string
  }>
}

async function AdminPostIdContent({ params }: AdminPostIdPageProps) {
  const { id } = await params

  return <div className="py-16 text-6xl">AdminPostIdPage {id}</div>
}

export default function AdminPostIdPage(props: AdminPostIdPageProps) {
  return (
    <Suspense fallback={<div className="py-16 text-6xl">Loading...</div>}>
      <AdminPostIdContent {...props} />
    </Suspense>
  )
}
