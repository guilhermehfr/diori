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

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) => or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    })

    if (!!postExists) {
      throw new Error('Post with the SLUG: ' + post.slug + ' already exists.')
    }

    logColor('Creating POST in the database', 'green')
    await drizzleDb.insert(postsTable).values(post)
    return post
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    })

    if (!oldPost) {
      throw new Error('Post with the ID: ' + id + ' was not found.')
    }

    const dateNow = new Date().toISOString()

    const postData = {
      author: newPostData.author,
      title: newPostData.title,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      updatedAt: dateNow,
    }

    await drizzleDb.update(postsTable).set(postData).where(eq(postsTable.id, id))

    return {
      ...oldPost,
      ...postData,
    }
  }
}
