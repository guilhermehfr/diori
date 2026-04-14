import { Suspense } from 'react'

import { MenuAdmin } from '@/src/components/admin/MenuAdmin'
import { requireLoginSessionOrRedirect } from '@/src/lib/login/manage-login'

async function AdminPostMenu() {
  await requireLoginSessionOrRedirect()

  return <MenuAdmin />
}

export default async function AdminPostLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense fallback={null}>
        <AdminPostMenu />
      </Suspense>
      {children}
    </>
  )
}
