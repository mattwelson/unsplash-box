"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { quantise } from "@/lib/quantise";
import type { UnsplashImage } from "@/server/unsplash";
import { ImageGridItem } from "./image-grid-item";

export function ImageGrid({ images }: { images?: UnsplashImage[] }) {
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
    <div className="mx-4 flex gap-4">
      {quantisedImages.map((col, i) => (
        <div key={i} className="flex flex-1 flex-col gap-4">
          {col.map((image) => (
            <ImageGridItem key={image.id} image={image} />
          ))}
        </div>
      ))}
    </div>
  );
}
