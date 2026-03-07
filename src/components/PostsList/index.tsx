import Link from "next/link";
import { clsx } from "clsx";

import { formatDateTime } from "@/src/utils/format-datetime";

import { postRepository } from "@/src/repositories/post";
import { PostCoverImage } from "../PostCoverImage";

export async function PostList(): Promise<React.ReactNode> {
  const posts = await postRepository.getAllPosts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <div className="flex flex-col group gap-4" key={post.id + "_container"}>
          <PostCoverImage
            linkProps={{
              href: `/post/${post.slug}`,
            }}
            imageProps={{
              src: post.coverImageUrl,
              alt: post.title,
              width: 1200,
              height: 1200,
            }}
          />

          <div className={clsx("flex flex-col sm:justify-center gap-4")}>
            <time
              className={clsx("text-slate-600", "text-sm")}
              dateTime={post.createdAt}
              title={new Date(post.createdAt).toLocaleString()}
            >
              {formatDateTime(post.createdAt)}
            </time>

            <h2
              className={clsx(
                "text-2xl/tight text-slate-900 font-bold sm:text-4xl/tight",
                "hover:text-slate-700 transition-colors duration-200",
              )}
            >
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </h2>

            <p>{post.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
