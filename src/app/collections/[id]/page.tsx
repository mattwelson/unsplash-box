import NotFoundPage from "@/app/not-found";
import { ImageGrid } from "@/app/search/_components/image-grid";
import { GradientText } from "@/components/typography/gradient-text";
import { quantise } from "@/lib/quantise";
import { db } from "@/server/db";
import { collections } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function CollectionPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const collection = await db.query.collections.findFirst({
    where: and(eq(collections.userId, userId), eq(collections.id, id)),
    with: {
      images: true,
    },
  });

  if (!collection) return <NotFoundPage />;

  return (
    <div className="mt-16 flex w-full flex-col items-center">
      <div className="max-w-sm text-center">
        <h1 className="text-4xl font-semibold">
          <GradientText>{collection.name!}</GradientText>
        </h1>
        <p className="mt-4">
          {collection.images.length} photo
          {collection.images.length !== 1 && "s"}
        </p>
      </div>
      <div className="mt-16 w-full">
        <ImageGrid images={collection.images} />
      </div>
    </div>
  );
}
