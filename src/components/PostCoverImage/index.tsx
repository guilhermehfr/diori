import { clsx } from "clsx";
import Link from "next/link";
import Image from "next/image";

interface PostCoverImageProps {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
}

export function PostCoverImage({ imageProps, linkProps }: PostCoverImageProps) {
  return (
    <Link
      {...linkProps}
      className={clsx(
        "overflow-hidden rounded-lg shadow-lg transition-shadow duration-300",
        linkProps.className,
      )}
    >
      <Image
        {...imageProps}
        className={clsx(
          "w-7xl h-7xl object-cover group-hover:scale-105",
          "transition-transform duration-300 ease-in-out",
          imageProps.className,
        )}
        alt={imageProps.alt || "Post cover image"}
      />
    </Link>
  );
}
