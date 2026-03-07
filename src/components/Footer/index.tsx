import clsx from "clsx";

export const Footer = () => {
  return (
    <footer>
      <p
        className={clsx(
          "text-4xl/normal font-extrabold py-8",
          "sm:text-5xl/normal",
        )}
      >
        Footer
      </p>
    </footer>
  );
};
