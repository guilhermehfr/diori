import Link from "next/link";
import { FileTextIcon, HouseIcon } from "lucide-react";
import { clsx } from "clsx";

export function MenuAdmin() {
  const navClasses = clsx(
    "bg-slate-900 text-slate-100 rounded-lg",
    "flex flex-col  mb-8",
    "sm:flex-row sm:flex-wrap",
    // 'h-10',
    // 'overflow-hidden',
  );
  const linkClasses = clsx(
    "[&>svg]:w-[16px] [&>svg]:h-[16px] px-4",
    "flex items-center justify-start gap-2",
    "transition hover:bg-slate-800 rounded-lg",
    "h-10",
    "shrink-0",
  );

  return (
    <nav className={navClasses}>
      <a href="/" target="_blank" className={linkClasses}>
        <HouseIcon />
        Home
      </a>

      <Link href="/admin/posts" className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>
    </nav>
  );
}
