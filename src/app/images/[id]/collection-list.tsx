import { db } from "@/server/db";
import { collections, images } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { CollectionButton } from "./collection-button";
import type { UnsplashImageSchema } from "@/server/unsplash";

export async function CollectionList({
  image,
}: {
  image: UnsplashImageSchema;
}) {
  const { userId } = auth();
  if (!userId) return null;

  // TODO: move server side - even if not a server action
  const matchingImages = (await db.query.images.findMany({
    where: eq(images.unsplashId, image.id),
    with: {
      collection: {
        where: eq(collections.userId, userId),
        with: {
          images: true,
        },
      },
    },
  })) as (typeof images.$inferSelect & {
    collection: typeof collections.$inferSelect & {
      images: (typeof images.$inferSelect)[];
    };
  })[];

  if (matchingImages.length === 0) return null;

  return (
    <>
      <h2 className="text-xl font-semibold">Collections</h2>
      <div className="my-4 flex flex-col gap-4">
        {matchingImages.map(({ collection }) => (
          <CollectionButton
            image={image}
            key={collection.id}
            collection={collection}
            action="remove"
          />
        ))}
      </div>
    </>
  );
}
