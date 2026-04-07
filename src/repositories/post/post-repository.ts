import type { PostModel } from '@/src/models/post/post-model'

export interface PostRepository {
  getAllPosts(): Promise<PostModel[]>
  getAllPublicPosts(): Promise<PostModel[]>
  getPublicPostById(id: string): Promise<PostModel>
  getPublicPostBySlug(slug: string): Promise<PostModel>

  // Mutations
  create(post: PostModel): Promise<PostModel>
  delete(id: string): Promise<PostModel>
  update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>
  ): Promise<PostModel>
}
