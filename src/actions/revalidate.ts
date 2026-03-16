"use server";

import { revalidateTag } from "next/cache";

export async function revalidatePosts() {
  revalidateTag("posts");
}

export async function revalidatePostById(id: string) {
  revalidateTag(`post-${id}`);
}

export async function revalidatePostBySlug() {
  revalidateTag(`post-morning-routine-of-highly-effective-people`);
}
