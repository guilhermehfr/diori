'use client'

import { LogInIcon } from 'lucide-react'
import { useActionState, useEffect } from 'react'

import { loginAction } from '@/src/actions/login/login-action'

import { Button } from '../../Button'
import { InputText } from '../../InputText'
import { toast } from 'react-toastify'

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  }

  const [state, action, isPending] = useActionState(loginAction, initialState)

  useEffect(() => {
    if (state.error) {
      toast.dismiss()
      toast.error(state.error)
    }
  }, [state])

  return (
    <div className="flex items-center justify-center max-w-sm mt-16 mb-36 mx-auto">
      <form action={action} className="flex-1 flex flex-col gap-6">
        <InputText
          type="text"
          name="username"
          placeholder="Your username..."
          labelText="Username"
          disabled={isPending}
          defaultValue={state.username}
          autoComplete="on"
        />
        <InputText
          type="password"
          name="password"
          placeholder="Your password..."
          labelText="Password"
          disabled={isPending}
          autoComplete="on"
        />

        <Button type="submit" className="mt-4" disabled={isPending}>
          <LogInIcon />
          Enter
        </Button>

        {!!state.error && <p className="text-red-600">{state.error}</p>}
      </form>
    </div>
  )
}
