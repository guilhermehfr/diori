import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page title",
  description: "Page description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
