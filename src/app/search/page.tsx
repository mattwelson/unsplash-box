import Image from "next/image";

import GradientBg from "@/images/gradiend-bg.svg";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Suspense } from "react";
import { SearchForm } from "./_components/search-form";
import { SearchableImageGrid } from "./searchable-image-grid";
import { ImageGridSkeleton } from "./_components/image-grid";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <Image
          src={GradientBg as StaticImport}
          alt=""
          className="h-28 w-full object-cover"
        />
        <div className="-translate-y-1/2">
          <SearchForm initialQuery={searchParams?.q} />
        </div>
      </div>
      <div className="my-12">
        <Suspense fallback={<ImageGridSkeleton />}>
          {searchParams?.q && searchParams.q.length > 2 && (
            <SearchableImageGrid query={searchParams?.q} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
