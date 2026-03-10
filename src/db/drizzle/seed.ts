import { drizzleDb } from ".";
import { postsTable } from "./schemas";

import { JsonPostRepository } from "@/src/repositories/post/json-post-repository";

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.getAllPosts();

  try {
    await drizzleDb.delete(postsTable);
    await drizzleDb.insert(postsTable).values(posts);

    posts.forEach((post) => {
      console.log(`Inserted post with ID: ${post.title}`);
    });
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
})();
