import { searchImages } from "@/server/unsplash";
import { ImageGrid } from "./_components/image-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { unpslashImageToDbModel } from "@/server/unsplash/convertor";

export default async function ImageGridContainer({
  query,
}: {
  query?: string;
}) {
  let imageResults: Awaited<ReturnType<typeof searchImages>> | undefined;
  // Use this value to side a form
  // Use this value to search medium to get a result ON THE SERVER
  if (query && query.length > 2) {
    imageResults = await searchImages({ query });
    // console.log(JSON.stringify(imageResults));
  }
  return (
    <ImageGrid
      images={imageResults?.results.map((i) => unpslashImageToDbModel(i))}
    />
  );
}

export function ImageGridSkeleton() {
  return (
    <div className="mx-4 flex w-full gap-6">
      <div className="flex flex-1 flex-col gap-6">
        <Skeleton className="aspect-[4/3] w-full" />
        <Skeleton className="aspect-[2/3] w-full" />
        <Skeleton className="aspect-[4/2] w-full" />
      </div>
      <div className="hidden flex-1 flex-col gap-6 md:flex">
        <Skeleton className="aspect-[2/3] w-full" />
        <Skeleton className="aspect-[4/2] w-full" />
        <Skeleton className="aspect-[4/3] w-full" />
      </div>
      <div className="hidden flex-1 flex-col gap-6 lg:flex">
        <Skeleton className="aspect-[5/3] w-full" />
        <Skeleton className="aspect-[2/3] w-full" />
        <Skeleton className="aspect-[4/2] w-full" />
      </div>
      <div className="hidden flex-1 flex-col gap-6 xl:flex">
        <Skeleton className="aspect-[6/5] w-full" />
        <Skeleton className="aspect-[5/3] w-full" />
        <Skeleton className="aspect-[4/2] w-full" />
      </div>
    </div>
  );
}
