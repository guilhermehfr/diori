import { Suspense } from "react";

import { SpinLoader } from "../components/SpinLoader";
import { PostFeatured } from "../components/PostFeatured";
import { PostList } from "../components/PostsList";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
        <PostFeatured />
        <PostList />
      </Suspense>
    </>
  );
}
