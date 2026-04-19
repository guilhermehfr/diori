import { drizzle } from 'drizzle-orm/node-postgres'

import { postsTable } from './schemas'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export const drizzleDb = drizzle(process.env.DATABASE_URL, {
  schema: {
    posts: postsTable,
  },
  casing: 'snake_case',
})
