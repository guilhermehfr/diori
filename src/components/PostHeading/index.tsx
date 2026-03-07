import Link from "next/link";
import clsx from "clsx";
import type { PostHeading as PostHeadingTag } from "@/src/types";

type PostHeadingProps = {
  as: PostHeadingTag;
  url: string;
  children: React.ReactNode;
};

export function PostHeading({
  as: HeadingTag,
  url,
  children,
}: PostHeadingProps) {
  const className = {
    h1: clsx(
      "text-2xl/tight text-slate-900 font-bold sm:text-4xl/tight hover:text-slate-500 transition-colors duration-200",
    ),
    h2: clsx(
      "text-xl/tight text-slate-900 font-bold sm:text-3xl/tight hover:text-slate-500 transition-colors duration-200",
    ),
  };

  return (
    <HeadingTag className={className[HeadingTag]}>
      <Link href={url}>{children}</Link>
    </HeadingTag>
  );
}
