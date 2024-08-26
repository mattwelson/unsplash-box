"use client";
import Image from "next/image";
import type { UnsplashImageSchema } from "@/server/unsplash";
import type { images } from "@/server/db/schema";
import { cn } from "@/lib/utils";
import type { ImageType } from "@/server/unsplash/convertor";

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
  className,
  image,
  sizes,
}: {
  image: ImageType;
  sizes: string;
  className?: string;
}) {
  return (
    <Image
      className={cn(className)}
      src={image.url}
      loader={createImageLoader({})}
      alt={image.altDescription}
      fill
      sizes={sizes}
    />
  );
}
