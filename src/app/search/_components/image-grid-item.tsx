import Link from "next/link";
import type { UnsplashImageSchema } from "@/server/unsplash";
import { UnsplashImage } from "@/components/unsplash/unsplash-image";

export function ImageGridItem({ image }: { image: UnsplashImageSchema }) {
  return (
    <Link
      href={`/images/${image.id}`}
      key={image.id}
      className="relative aspect-auto w-full overflow-hidden rounded"
      style={{
        aspectRatio: image.width / image.height,
        background: image.color,
      }}
    >
      <UnsplashImage
        image={image}
        sizes="(min-width: 1280px) 25vw,(min-width: 1024px) 33vw,(min-width: 768px) 50vw, 100vw"
      />
    </Link>
  );
}
