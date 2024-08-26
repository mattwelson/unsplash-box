import Link from "next/link";
import { UnsplashImage } from "@/components/unsplash/unsplash-image";
import { type ImageType } from "@/server/unsplash/convertor";

export function ImageGridItem({ image }: { image: ImageType }) {
  return (
    <Link
      href={`/images/${image.unsplashId}`}
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
