import { Suspense } from 'react'

import { MenuAdmin } from '@/src/components/admin/MenuAdmin'

export default function AdminPostLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense fallback={null}>
        <MenuAdmin />
      </Suspense>
      {children}
    </>
  )
}
