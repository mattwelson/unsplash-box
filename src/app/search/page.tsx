import Image from "next/image";

import { SearchBox } from "./_components/search-box";
import GradientBg from "@/images/gradiend-bg.svg";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import { searchImages } from "@/server/unsplash";
import { ImageGrid } from "./_components/image-grid";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  let imageResults: Awaited<ReturnType<typeof searchImages>> | undefined;
  // Use this value to side a form
  // Use this value to search medium to get a result ON THE SERVER
  if (searchParams?.q && searchParams?.q?.length > 2) {
    imageResults = await searchImages({ query: searchParams.q });
    console.log(JSON.stringify(imageResults));
  }

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <Image
          src={GradientBg as StaticImport}
          alt=""
          className="h-28 w-full object-cover"
        />
        <div className="-translate-y-1/2">
          <SearchBox value={searchParams?.q} />
        </div>
      </div>
      <div>
        <ImageGrid images={imageResults?.results} />
      </div>
    </div>
  );
}
