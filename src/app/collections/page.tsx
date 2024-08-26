import { GradientText } from "@/components/typography/gradient-text";
import { Suspense } from "react";
import { CollectionsGridSkeleton } from "./skeletons";
import { CollectionsGrid } from "./collections-grid";

export default function ColelctionsListPage() {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="mt-16 max-w-sm space-y-4 text-center">
        <GradientText className="text-4xl font-semibold">
          Collections
        </GradientText>
        <p>
          Explore the world through collections of beautiful photos free to use
          under the{" "}
          <a
            href="https://unsplash.com/license"
            className="font-semibold underline"
            target="_blank"
            rel="noreferrer nofollow"
          >
            Unsplash License
          </a>
          .
        </p>
      </div>
      <div className="my-16 grid w-full px-8 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<CollectionsGridSkeleton />}>
          <CollectionsGrid />
        </Suspense>
      </div>
    </div>
  );
}
