import { PostRepository } from './post-repository'
import { drizzleDb } from '@/src/db/drizzle'

import type { PostModel } from '@/src/models/post/post-model'

import { logColor } from '@/src/utils/logColor'
import { postsTable } from '@/src/db/drizzle/schemas'
import { eq } from 'drizzle-orm'

export class DrizzlePostRepository implements PostRepository {
  async getAllPosts(): Promise<PostModel[]> {
    logColor('Fetching ALL POSTS from the database', 'green')
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    })

    return posts
  }

  async getAllPublicPosts(): Promise<PostModel[]> {
    logColor('Fetching ALL PUBLIC POSTS from the database', 'green')
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    })

    return posts
  }

  async getPublicPostById(id: string): Promise<PostModel> {
    logColor('Fetching POST by ID from the database', 'green')
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    })

    if (!post) throw new Error('Post with the ID: ' + id + ' was not found.')

    return post
  }

  async getPublicPostBySlug(slug: string): Promise<PostModel> {
    logColor('Fetching PUBLIC POST by SLUG from the database', 'green')
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) => and(eq(posts.published, true), eq(posts.slug, slug)),
    })

    if (!post) throw new Error('Post with the SLUG: ' + slug + ' was not found.')

    return post
  }

  async delete(id: string): Promise<PostModel> {
    logColor('Deleting POST from the database', 'red')
    const post = await this.getPublicPostById(id)
    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id))
    return post
  }
}
