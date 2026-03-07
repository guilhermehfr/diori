import type { Metadata } from "next";
import "./globals.css";

import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Diori - A blog about wellness, health and lifestyle",
    template: "%s | Diori",
  },
  description: "Page description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
