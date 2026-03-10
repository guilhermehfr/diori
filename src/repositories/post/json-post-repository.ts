import { resolve } from "path";
import { readFile } from "fs/promises";

import type { PostRepository } from "@/src/repositories/post/post-repository";
import type { PostModel } from "@/src/models/post/post-model";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "posts.json",
);

export class JsonPostRepository implements PostRepository {
  private async readFromdisk() {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf-8");
    const parsedJson: { posts: PostModel[] } = JSON.parse(jsonContent);
    if (!parsedJson.posts) {
      throw new Error("Invalid JSON structure: 'posts' key is missing");
    }
    return parsedJson.posts;
  }

  async getAllPosts(): Promise<PostModel[]> {
    const posts = await this.readFromdisk();

    if (posts.length === 0) {
      throw new Error("No posts found");
    }

    return posts;
  }

  async getAllPublicPosts(): Promise<PostModel[]> {
    const posts = await this.readFromdisk();
    const postsFiltered = posts.filter((post) => post.published);

    if (postsFiltered.length === 0) {
      throw new Error("No public posts found");
    }

    return postsFiltered;
  }

  async getPostById(id: string): Promise<PostModel> {
    const posts = await this.getAllPublicPosts();
    const post = posts.find((p) => p.id === id);

    if (!post) {
      throw new Error(`Post with ID '${id}' not found`);
    }

    return post;
  }

  async getPostBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.getAllPublicPosts();
    const post = posts.find((p) => p.slug === slug) ?? null;

    if (!post) {
      throw new Error(`Post with slug '${slug}' not found`);
    }

    return post;
  }
}
