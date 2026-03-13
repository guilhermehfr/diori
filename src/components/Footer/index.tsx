import Link from "next/link";
import clsx from "clsx";

export const Footer = () => {
  return (
    <footer
      className={clsx(
        "width-full",
        "text-4xl/normal font-extrabold py-8",
        "sm:text-5xl/normal sm:py-10",
        "md:text-6xl/normal md:py-11",
        "lg:text-7xl/normal lg:py-12",
      )}
    >
      <p className="text-slate-500 text-xs/relaxed font-bold text-center">
        <span>Copyright &copy; 2026 -</span>
        <Link href="/" className="hover:underline">
          Diori
        </Link>
      </p>
    </footer>
  );
};
