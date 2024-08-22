"use client";
import Image from "next/image";
import type { UnsplashImage } from "@/server/unsplash";
import { createImageLoader } from "@/app/search/_components/image-grid-item";

export function UnsplashImage({
  image,
  sizes,
}: {
  image: UnsplashImage;
  sizes: string;
}) {
  return (
    <Image
      src={image.urls.raw}
      loader={createImageLoader({})}
      alt={image.alt_description}
      placeholder="blur"
      // TODO: Blur hash isn't working!
      blurDataURL={image.blur_hash}
      fill
      // TODO: Change this to include 25vw and 33vw
      sizes={sizes}
    />
  );
}
