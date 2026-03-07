import clsx from "clsx";

import { getAllPublicPosts } from "@/src/lib/post/queries";

import { PostCoverImage } from "../PostCoverImage";
import { PostHeading } from "../PostHeading";
import { formatDateTime } from "@/src/utils/format-datetime";

export async function PostFeatured() {
  const posts = await getAllPublicPosts();
  const post = posts[0];

  const postLink = `/post/${post.slug}`;

  return (
    <section
      className={clsx("group", "grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2")}
    >
      <PostCoverImage
        linkProps={{
          href: postLink,
          className: "hover:shadow-large",
        }}
        imageProps={{
          src: post.coverImageUrl,
          alt: post.title,
          width: 1200,
          height: 720,
          priority: true,
        }}
      />

      <div className={clsx("flex flex-col sm:justify-center", "gap-4")}>
        <time
          className={clsx("text-slate-600", "text-sm")}
          title={new Date(post.createdAt).toLocaleString()}
        >
          {formatDateTime(post.createdAt)}
        </time>

        <PostHeading as="h1" url={postLink}>
          {post.title}
        </PostHeading>

        <p>{post.excerpt}</p>
      </div>
    </section>
  );
}
