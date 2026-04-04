import sanitizeHtml from 'sanitize-html'
import { z } from 'zod'

import { isUrlOrRelativePath } from '../utils/is-url-or-relative-path'

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters long')
    .max(120, 'Title must be at most 120 characters long'),
  content: z
    .string()
    .trim()
    .min(3, 'Content is required')
    .transform((val) => sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })),
  author: z
    .string()
    .trim()
    .min(4, 'Author must be at least 4 characters long')
    .max(100, 'Author must be at most 100 characters long'),
  excerpt: z
    .string()
    .trim()
    .min(3, 'Excerpt must be at least 3 characters long')
    .max(200, 'Excerpt must be at most 200 characters long'),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message: 'Cover image URL must be a valid URL or a relative path',
  }),
  published: z
    .union([
      z.literal('on'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(undefined),
    ])
    .default(false)
    .transform((val) => val === 'on' || val === 'true' || val === true),
})

export const PostCreateSchema = PostBaseSchema

export const PostUpdateSchema = PostBaseSchema.extend({
  // id: z.string().uuid('Invalid ID'),
})
