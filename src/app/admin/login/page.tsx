import { Metadata } from 'next'

import { LoginForm } from '@/src/components/admin/LoginForm'

export const metadata: Metadata = {
  title: 'Login',
}

export default async function AdminLoginPage() {
  const loginAllowed = Boolean(Number(process.env.ALLOW_LOGIN))

  if (!loginAllowed) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl text-red-500 font-bold mb-4">403</h1>
        <h1 className="text-2xl font-bold mb-4">Login Unavailable</h1>
        <p className="text-gray-600">Login is currently disabled. Please try again later.</p>
      </div>
    )
  }

  return <LoginForm />
}
