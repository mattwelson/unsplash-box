"use client";

import { SearchBox } from "@/app/search/_components/search-box";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { UnsplashImageSchema } from "@/server/unsplash";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateCollectionForm } from "./create-collection-form";
import { fetchCollections } from "./actions";
import { useServerAction } from "zsa-react";
import { useDebounce } from "@uidotdev/usehooks";
import { CollectionButton } from "./collection-button";

export function AddToCollectionsModal({
  image,
}: {
  image: UnsplashImageSchema;
}) {
  const [isNewCollection, setIsNewCollection] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // TODO: Need to invalidate on successful add of the image - or just close and pretend
  const {
    data: collections,
    execute,
    error,
  } = useServerAction(fetchCollections);
  const [value, setValue] = useState("");
  const term = useDebounce(value, 200);

  useEffect(() => {
    void execute({ term });
  }, [term, execute]);

  function handleOpenChange(open: boolean) {
    setIsNewCollection(false);
    setIsOpen(open);
  }

  console.log({ collections, error });

  // TODO: get count for all user collections (using a query term?)
  // TODO: Get all collections for user, set a limit and query term

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus className="mr-2 size-4" /> Add to Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add to Collections</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          {!isNewCollection && (
            <>
              <SearchBox
                value={value}
                placeholder="Lookup collection..."
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="mt-2 flex flex-col gap-2">
                {collections
                  ?.filter(
                    (collection) =>
                      !collection.images.find((i) => i.unsplashId === image.id),
                  )
                  .map((collection) => (
                    <CollectionButton
                      key={collection.id}
                      collection={collection}
                      action="add"
                      image={image}
                      onComplete={() => handleOpenChange(false)}
                    />
                  ))}
              </div>
              <Button
                variant="secondary"
                className="mt-4 w-full"
                size="lg"
                onClick={() => setIsNewCollection(true)}
              >
                Add to a new collection
              </Button>
            </>
          )}
          {isNewCollection && <CreateCollectionForm image={image} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
