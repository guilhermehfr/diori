"use client";

import { clsx } from "clsx";

export function Header() {
  return (
    <>
      <h1
        className={clsx(
          "text-xl text-center font-bold text-white py-5",
          "transition-all duration-250",
          "hover:rounded-b-4xl hover:bg-gray-700 hover:text-white hover:px-4 hover:py-10",
        )}
        onClick={() => alert("Clicado")}
      >
        Hello World!
      </h1>
    </>
  );
}
