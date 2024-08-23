"use client";
import Image from "next/image";
import type { UnsplashImageSchema } from "@/server/unsplash";
import type { images } from "@/server/db/schema";

export function createImageLoader({ crop = "entropy" }: { crop?: string }) {
  return function ({
    src,
    width,
    quality = 80,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) {
    return `${src}&w=${width}&q=${quality}&crop=${crop}&auto=format`;
  };
}

export function UnsplashImage({
  image,
  dbImage,
  sizes,
}:
  | {
      dbImage?: never;
      image: UnsplashImageSchema;
      sizes: string;
    }
  | {
      image?: never;
      dbImage: typeof images.$inferSelect;
      sizes: string;
    }) {
  if (dbImage)
    return (
      <Image
        src={dbImage.url}
        loader={createImageLoader({})}
        alt={dbImage.altDescription}
        fill
        sizes={sizes}
      />
    );
  return (
    <Image
      src={image.urls.raw}
      loader={createImageLoader({})}
      alt={image.alt_description}
      placeholder="blur"
      // TODO: Blur hash isn't working!
      blurDataURL={image.blur_hash}
      fill
      sizes={sizes}
    />
  );
}
