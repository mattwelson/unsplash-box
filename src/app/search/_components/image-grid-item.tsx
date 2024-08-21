"use client";

import Image from "next/image";
import Link from "next/link";
import type { UnsplashImage } from "@/server/unsplash";

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

// TODO: make the number of image grid columns dynamic
export function ImageGridItem({ image }: { image: UnsplashImage }) {
  return (
    <Link
      href={`/images/${image.id}`}
      key={image.id}
      className="relative aspect-auto w-full"
      style={{
        aspectRatio: image.width / image.height,
      }}
    >
      <Image
        src={image.urls.raw}
        loader={createImageLoader({})}
        alt={image.alt_description}
        placeholder="blur"
        blurDataURL={image.blur_hash}
        fill
        // TODO: Change this to include 25vw and 33vw
        sizes="(min-width: 1280px) 25vw,(min-width: 1024px) 33vw,(min-width: 768px) 50vw, 100vw"
      />
    </Link>
  );
}
