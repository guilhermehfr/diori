import type { Metadata } from "next";

import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ToastifyContainer } from "../components/ToastifyContainer";

import "./globals.css";

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
        <ToastifyContainer />
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
