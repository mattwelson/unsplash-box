import Image from "next/image";
import { fetchImage } from "@/server/unsplash";
import Link from "next/link";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { ArrowDownCircle } from "lucide-react";
import { UnsplashImage } from "@/components/unsplash/unsplash-image";
import { AddToCollectionsModal } from "./add-to-collections-modal";
import { CollectionList } from "./collection-list";

// TODO: Skeleton?
export default async function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const image = await fetchImage({ id });
  console.log({ image });
  return (
    <div className="mt-16 grid w-full max-w-screen-2xl content-start gap-8 lg:mx-20 lg:grid-cols-12 lg:grid-rows-[auto_1fr] 2xl:mx-auto">
      <div className="flex flex-col gap-4 px-16 lg:order-1 lg:col-start-7 lg:col-end-12 lg:p-0">
        <Link
          href={image.user.links.html}
          className="flex items-center gap-4 font-semibold"
        >
          <Image
            src={image.user.profile_image.large}
            alt=""
            width={64}
            height={64}
            className="rounded-full"
          />
          {image.user.name}
        </Link>
        <div>
          Published on{" "}
          {DateTime.fromISO(image.created_at).toFormat("dd MMMM yyyy")}
        </div>
        <div className="flex gap-4">
          <AddToCollectionsModal image={image} />
          <Button variant="secondary" asChild>
            <a href={image.links.download} download>
              <ArrowDownCircle className="mr-2 size-4" /> Download
            </a>
          </Button>
        </div>
      </div>
      <div className="lg:col-span-6 lg:row-span-2">
        <div
          className="relative overflow-hidden md:mx-16 md:rounded-md lg:mx-0"
          style={{
            background: image.color,
            aspectRatio: image.width / image.height,
          }}
        >
          <UnsplashImage
            image={image}
            sizes="(min-width: 1536px) 768px,(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
      <div className="px-16 lg:order-1 lg:col-span-6 lg:col-start-7 lg:p-0">
        <CollectionList image={image} />
      </div>
    </div>
  );
}
