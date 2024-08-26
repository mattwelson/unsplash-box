"use client";

import { Button } from "@/components/ui/button";
import { UnsplashImage } from "@/components/unsplash/unsplash-image";
import type { collections, images } from "@/server/db/schema";
import { Minus, Plus } from "lucide-react";
import { addImageToCollection, removeImageFromCollection } from "./actions";
import type { UnsplashImageSchema } from "@/server/unsplash";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

export function CollectionButton({
  action,
  collection,
  image,
}: {
  action: "remove" | "add";
  collection: typeof collections.$inferSelect & {
    images: (typeof images.$inferSelect)[];
  };
  image: UnsplashImageSchema;
}) {
  const add = useServerAction(addImageToCollection);
  const remove = useServerAction(removeImageFromCollection);

  async function handleClick() {
    if (action === "add") {
      const [_, err] = await add.execute({
        collectionId: collection.id,
        image,
      });

      if (err) return toast.error("Something went wrong");
      toast.success("Image added to collection");
    } else {
      const [_, err] = await remove.execute({
        collectionId: collection.id,
        unsplashId: image.id,
      });

      if (err) return toast.error("Something went wrong");
      toast.success("Image removed from collection");
    }
  }

  return (
    <Button
      variant="ghost"
      className="group h-auto w-auto justify-start gap-4 px-2 lg:-ml-2"
      onClick={handleClick}
      disabled={add.isPending || remove.isPending}
    >
      <div className="relative size-24 overflow-hidden rounded bg-muted">
        {collection.images[0] && (
          <UnsplashImage
            image={collection.images[0]}
            sizes="96px"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col items-start">
        <div className="text-lg">{collection.name}</div>
        <div className="font-light">{collection.images.length} photos</div>
      </div>
      {action === "add" ? (
        <div className="mr-4 flex gap-4 opacity-0 transition-opacity group-hover:opacity-100">
          <Plus className="size-4" />
          Add
        </div>
      ) : (
        <div className="mr-4 flex gap-4 opacity-0 transition-opacity group-hover:opacity-100">
          <Minus className="size-4" />
          Remove
        </div>
      )}
    </Button>
  );
}
