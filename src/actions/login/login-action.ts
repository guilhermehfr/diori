'use server'

import { redirect } from 'next/navigation'

import { createLoginSession, verifyPassword } from '@/src/lib/login/manage-login'

type LoginActionState = {
  username: string
  error: string
}

export async function loginAction(state: LoginActionState, formData: FormData) {
  const loginAllowed = Boolean(Number(process.env.ALLOW_LOGIN))

  if (!loginAllowed) {
    return {
      username: '',
      error: 'Login is not allowed',
    }
  }

  if (!(formData instanceof FormData)) {
    return {
      username: state.username,
      error: 'Invalid form data',
    }
  }

  const username = formData.get('username')?.toString().trim() || ''
  const password = formData.get('password')?.toString().trim() || ''

  if (!username || !password) {
    return {
      username,
      error: 'Type both username and password to login',
    }
  }

  const isUsernameValid = username === process.env.LOGIN_USERNAME
  const isPasswordValid = await verifyPassword(password, process.env.LOGIN_PASSWORD || '')

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username,
      error: 'Invalid username or password',
    }
  }

  await createLoginSession(username)
  redirect('/admin/post')
}
