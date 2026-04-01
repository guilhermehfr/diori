import { resolve } from 'path'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

import { postsTable } from './schemas'

const sqliteDatabasePath = resolve(process.cwd(), 'db.sqlite3')
const sqliteDatabase = new Database(sqliteDatabasePath)

export const drizzleDb = drizzle(sqliteDatabase, {
  schema: {
    posts: postsTable,
  },
  logger: false,
})
