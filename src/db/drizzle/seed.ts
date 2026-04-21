import { resolve } from 'path'
import { readFile } from 'fs/promises'

import type { PostModel } from '@/src/models/post/post-model'
import { drizzleDb } from '.'
import { postsTable } from './schemas'
;(async () => {
  const ROOT_DIR = process.cwd()
  const JSON_POSTS_FILE_PATH = resolve(ROOT_DIR, 'src', 'db', 'seed', 'posts.json')

  const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8')
  const parsedJson: { posts: PostModel[] } = JSON.parse(jsonContent)

  if (!parsedJson.posts) {
    throw new Error("Invalid JSON structure: 'posts' key is missing")
  }

  const posts = parsedJson.posts

  if (posts.length === 0) {
    throw new Error('No posts found')
  }

  try {
    if (process.env.SHOWCASE_MODE === 'true') {
      await drizzleDb.delete(postsTable)
    }

    await drizzleDb.insert(postsTable).values(posts)

    console.log()
    if (process.env.SHOWCASE_MODE === 'true') {
      console.log(
        'SHOWCASE_MODE is enabled. The database has been >>> CLEANED <<< and seeded with demo data.'
      )
    } else {
      console.log('Database has been seeded with demo data.')
    }

    console.log(`${posts.length} posts foram salvos na base de dados.`)
    console.log()
  } catch (e) {
    console.log()
    console.log('Ocorreu um erro...')
    console.log()
    console.log(e)
    console.log()
  }
})()
