"use server";

import { revalidateTag } from "next/cache";

export async function revalidatePosts() {
  // Revalidate the cache for the specific post slug
  revalidateTag(`posts`);
  revalidateTag(`post-morning-routine-of-highly-effective-people`);
}
