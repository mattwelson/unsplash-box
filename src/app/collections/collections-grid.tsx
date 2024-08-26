import { UnsplashImage } from "@/components/unsplash/unsplash-image";
import { cn } from "@/lib/utils";
import { db } from "@/server/db";
import { collections } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { cva } from "class-variance-authority";
import { eq, type asc } from "drizzle-orm";
import Link from "next/link";

export const collectionItemVariants = cva(
  "grid gap-0.5 rounded overflow-hidden aspect-[16/9] w-full",
  {
    variants: {
      items: { 1: "", 2: "grid-cols-2", 3: " grid-cols-4 grid-rows-2" },
    },
    defaultVariants: {
      items: 3,
    },
  },
);

export async function CollectionsGrid() {
  // load the collections in via a direct async call to the database
  // TODO: move to a separate class later
  const { userId } = auth();
  if (!userId) return <div>Sign in!</div>;

  const userCollections = await db.query.collections.findMany({
    where: eq(collections.userId, userId),
    with: {
      images: true,
    },
  });

  return userCollections.map((c) => (
    <Link
      key={c.id}
      className="group flex flex-col rounded-lg p-4 transition-colors hover:bg-muted"
      href={`/collections/${c.id}`}
    >
      <div
        className={cn(
          "transition-opacity group-hover:opacity-90",
          collectionItemVariants({
            items: Math.max(Math.min(3, c.images.length), 1) as 1 | 2 | 3,
          }),
        )}
      >
        <div
          className={cn("relative", {
            "col-span-3 col-start-1 row-span-2": c.images.length >= 3,
          })}
        >
          {!c.images[0] && <div className="h-full w-full bg-gray-400" />}
          {c.images[0] && (
            <UnsplashImage
              image={c.images[0]}
              sizes="(max-width:1024px): 33vw,(max-width:768px): 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        {c.images[1] && (
          <div className="relative">
            <UnsplashImage
              image={c.images[1]}
              sizes="(max-width:1024px): 33vw,(max-width:768px): 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
        {c.images[2] && (
          <div className="relative">
            <UnsplashImage
              image={c.images[2]}
              sizes="(max-width:1024px): 33vw,(max-width:768px): 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
      <h3 className="mt-4 truncate text-lg font-semibold">{c.name}</h3>
      <p className="text-sm text-muted-foreground">
        {c.images.length} photo{c.images.length !== 1 && "s"}
      </p>
    </Link>
  ));
}
