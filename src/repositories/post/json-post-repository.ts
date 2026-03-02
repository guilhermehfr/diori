import { resolve } from "path";
import { readFile } from "fs/promises";

import { PostModel } from "@/src/models/post/post-model";
import { PostRepository } from "@/src/repositories/post/post-repository";

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
    const parsedJsonPosts = JSON.parse(jsonContent) as PostModel[];
    return parsedJsonPosts;
  }

  async getAllPosts(): Promise<PostModel[]> {
    return await this.readFromdisk();
  }
}

export const jsonPostRepository = new JsonPostRepository();
