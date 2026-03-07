import { Suspense } from "react";

import { SpinLoader } from "../components/SpinLoader";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { PostFeatured } from "../components/PostFeatured";
import { PostList } from "../components/PostsList";
import { Footer } from "../components/Footer";

export default async function Home() {
  return (
    <Container>
      <Header />

      <Suspense fallback={<SpinLoader />}>
        <PostFeatured />
        <PostList />
      </Suspense>

      <Footer />
    </Container>
  );
}
