import clsx from "clsx";

import type { PostHeading as PostHeadingTag } from "@/src/types";
import { formatDateTime } from "@/src/utils/format-datetime";
import { PostHeading } from "../PostHeading";

type PostSummaryProps = {
  postHeading: PostHeadingTag;
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
};

export function PostSummary({
  postHeading,
  postLink,
  createdAt,
  title,
  excerpt,
}: PostSummaryProps) {
  return (
    <div className={clsx("flex flex-col sm:justify-center gap-4")}>
      <time
        className={clsx("text-slate-600", "text-sm")}
        dateTime={createdAt}
        title={new Date(createdAt).toLocaleString()}
      >
        {formatDateTime(createdAt)}
      </time>

      <PostHeading as={postHeading} url={postLink}>
        {title}
      </PostHeading>

      <p>{excerpt}</p>
    </div>
  );
}
