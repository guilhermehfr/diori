import clsx from "clsx";
import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <h1
        className={clsx(
          "text-4xl/normal font-extrabold py-8",
          "sm:text-5xl/normal sm:py-10",
          "md:text-6xl/normal md:py-11",
          "lg:text-7xl/normal lg:py-12",
        )}
      >
        <Link href="/">
          Diori
          <span
            className={clsx(
              "text-slate-500 text-xs/relaxed font-bold",
              "sm:text-sm/relaxed",
              "md:text-base/relaxed",
              "lg:text-lg/relaxed",
              "pl-2",
            )}
          >
            Your daytime reading companion
          </span>
        </Link>
      </h1>
    </header>
  );
};
