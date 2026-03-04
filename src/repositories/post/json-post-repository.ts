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
    const parsedJsonPosts: PostModel[] = JSON.parse(jsonContent);
    return parsedJsonPosts;
  }

  async getAllPosts(): Promise<PostModel[]> {
    return await this.readFromdisk();
  }

  async getPostById(id: string): Promise<PostModel | null> {
    const posts = await this.readFromdisk();
    const post = posts.find((p) => p.id === id) ?? null;
    return post;
  }
}
