"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { quantise } from "@/lib/quantise";
import { ImageGridItem } from "./image-grid-item";
import type { ImageType } from "@/server/unsplash/convertor";
import { Skeleton } from "@/components/ui/skeleton";

export function ImageGrid({ images }: { images?: ImageType[] }) {
  let { width } = useWindowSize();
  if (!images) return null;

  width = width ?? 1100;
  let columns = 1;
  if (width >= 768) columns = 2;
  if (width >= 1024) columns = 3;
  if (width >= 1280) columns = 4;

  // Generate a column of images based on some number... then populate a grid of images for each column
  // I want image 0 in col 0, 1 in col 1, but if there was only 2 cols, image 2 would be in col 0 and 3 in col 1
  const quantisedImages = quantise(images, columns);

  return (
    <div className="mx-4 flex gap-6">
      {quantisedImages.map((col, i) => (
        <div key={i} className="flex flex-1 flex-col gap-6">
          {col.map((image) => (
            <ImageGridItem key={image.unsplashId} image={image} />
          ))}
        </div>
      ))}
    </div>
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
