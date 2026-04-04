import { ZodFormattedError } from 'zod'

export function getZodErrorsMessages<T>(errors: ZodFormattedError<T>): string[] {
  return Object.values(errors)
    .map((field) => {
      if (Array.isArray(field)) return field
      return field?._errors || []
    })
    .flat()
    .filter(Boolean)
}
