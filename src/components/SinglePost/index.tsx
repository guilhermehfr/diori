import Image from "next/image";

import { getPostBySlugCached } from "@/src/lib/post/queries";
import { formatDateTime } from "@/src/utils/format-datetime";

import { SafeMarkdown } from "../SafeMarkdown";
import { PostHeading } from "../PostHeading";

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await getPostBySlugCached(slug);

  return (
    <article>
      <header className="group flex flex-col gap-5 mb-4">
        <Image
          src={post.coverImageUrl}
          width={900}
          height={520}
          alt={post.title}
          className="rounded-xl hover:shadow-small"
          loading="eager"
        />

        <PostHeading as="h1" url={`/post/${slug}`}>
          {post.title}
        </PostHeading>

        <p>
          {post.author + " | "}
          <time
            className={"text-slate-600 text-sm"}
            dateTime={post.createdAt}
            title={new Date(post.createdAt).toLocaleString()}
          >
            {formatDateTime(post.createdAt)}
          </time>
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <p className="text-slate-600">{post.excerpt}</p>
        <SafeMarkdown markdown={post.content} />
      </section>
    </article>
  );
}
