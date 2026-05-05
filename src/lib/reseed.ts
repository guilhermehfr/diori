import { resolve } from 'path'
import { readFile } from 'fs/promises'
import { put, del } from '@vercel/blob'

import type { PostModel } from '@/src/models/post/post-model'
import { postRepository } from '@/src/repositories/post'

const SEED_POSTS_PATH = resolve(process.cwd(), 'src', 'db', 'seed', 'posts.json')
const SEED_IMAGES_DIR = resolve(process.cwd(), 'public', 'images')
const SEED_IMAGE_PREFIX = 'bryen_'

async function checkBlobExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

async function getImageNameFromUrl(url: string): string | null {
  const match = url.match(/\/uploads\/(.+)$/)
  return match ? match[1] : null
}

export async function runReseed(): Promise<void> {
  const vercelBlobUrl = process.env.VERCEL_IMAGE_BLOB_URL

  if (!vercelBlobUrl) {
    console.error('Vercel Blob URL not defined')
    return
  }

  const jsonContent = await readFile(SEED_POSTS_PATH, 'utf-8')
  const { posts }: { posts: PostModel[] } = JSON.parse(jsonContent)

  console.log(`Starting reseed for ${posts.length} seed posts...`)

  for (const post of posts) {
    const imageName = post.coverImageUrl.replace('/images/', '')
    const blobUrl = `${vercelBlobUrl}/uploads/${imageName}`

    const exists = await checkBlobExists(blobUrl)

    if (exists) {
      console.log(`✓ Image ${imageName} exists, skipping...`)
      continue
    }

    console.log(`⟳ Image ${imageName} not found, re-seeding...`)

    try {
      const imagePath = resolve(SEED_IMAGES_DIR, imageName)
      const imageBuffer = await readFile(imagePath)
      const blobPath = `uploads/${imageName}`

      const blob = await put(blobPath, imageBuffer, {
        access: 'public',
      })

      const postWithNewUrl: PostModel = {
        ...post,
        coverImageUrl: blob.url,
      }

      try {
        await postRepository.getPublicPostById(post.id)
        console.log(`  ↻ Post ${post.id} exists in DB, skipping...`)
      } catch {
        await postRepository.create(postWithNewUrl)
        console.log(`  ✓ Post ${post.slug} created`)
      }
    } catch (error) {
      console.error(`  ✗ Error seeding ${imageName}:`, error)
    }
  }

  console.log('Reseed completed')
}