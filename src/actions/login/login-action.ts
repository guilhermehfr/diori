'use server'

import { error } from 'console'

type LoginActionState = {
  username: string
  error: string
}

export async function loginAction(state: LoginActionState, formData: FormData) {
  if (!(formData instanceof FormData)) {
    return {
      username: state.username,
      error: 'Invalid form data',
    }
  }

  const username = formData.get('username')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  const isCredentialsValid = () => {
    return username === process.env.LOGIN_USER && password === process.env.LOGIN_PASSWORD
  }

  return {
    username: '',
    error: '',
  }
}
