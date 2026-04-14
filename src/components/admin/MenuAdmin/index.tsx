'use client'

import { logoutAction } from '@/src/actions/login/logout-action'
import clsx from 'clsx'
import {
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense, useEffect, useState, useTransition } from 'react'

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    ;<Suspense>setIsOpen(false);</Suspense>
  }, [pathname])

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()

    startTransition(async () => {
      await logoutAction()
    })
  }

  const navClasses = clsx(
    'bg-slate-900 text-slate-100 rounded-lg',
    'flex flex-col  mb-8',
    'sm:flex-row sm:flex-wrap',
    !isOpen && 'h-10',
    !isOpen && 'overflow-hidden',
    'sm:overflow-visible sm:h-auto'
  )
  const linkClasses = clsx(
    '[&>svg]:w-[16px] [&>svg]:h-[16px] px-4',
    'flex items-center justify-start gap-2 cursor-pointer',
    'transition hover:bg-slate-800 rounded-lg',
    'h-10',
    'shrink-0'
  )
  const openCloseBtnClasses = clsx(linkClasses, 'text-blue-200 italic', 'sm:hidden')

  return (
    <nav className={navClasses}>
      <button onClick={() => setIsOpen((s) => !s)} className={openCloseBtnClasses}>
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}

        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>

      <a className={linkClasses} href="/" target="_blank">
        <HouseIcon />
        Home
      </a>

      <Link className={linkClasses} href="/admin/post">
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClasses} href="/admin/post/new">
        <PlusIcon />
        Criar post
      </Link>

      <a className={linkClasses} href="#" onClick={handleLogout}>
        {isPending && (
          <>
            <HourglassIcon />
            Exiting...
          </>
        )}

        {!isPending && (
          <>
            <LogOutIcon />
            Logout
          </>
        )}
      </a>
    </nav>
  )
}
