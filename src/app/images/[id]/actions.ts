"use server";

import { db } from "@/server/db";
import { createId } from "@paralleldrive/cuid2";
import { collections, images } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { createServerActionProcedure } from "zsa";
import { formSchema } from "./schema";
import { z } from "zod";
import { unsplashImageSchema } from "@/server/unsplash";
import { and, eq, like } from "drizzle-orm";
import { unpslashImageToDbModel } from "@/server/unsplash/convertor";
import { revalidatePath } from "next/cache";

const authenticatedProcedure = createServerActionProcedure().handler(() => {
  try {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");

    return {
      userId,
    };
  } catch (e) {
    console.error({ e });
    throw new Error("User not authenticated");
  }
});

const authorizedProcedure = createServerActionProcedure(authenticatedProcedure)
  .input(z.object({ collectionId: z.string() }))
  .handler(async ({ input, ctx }) => {
    const { userId } = ctx;

    const collection = await db.query.collections.findFirst({
      where: and(
        eq(collections.id, input.collectionId),
        eq(collections.userId, userId),
      ),
    });

    if (!collection) throw new Error("User not authorized");

    return { collection, userId };
  });

export const createNewCollection = authenticatedProcedure
  .createServerAction()
  .input(formSchema)
  .handler(async ({ input, ctx: { userId } }) => {
    // create a new collection
    const collection = await db
      .insert(collections)
      .values({ userId, name: input.collectionName, id: createId() })
      .returning({ id: collections.id });

    return collection;
  });

export const addImageToCollection = authorizedProcedure
  .createServerAction()
  .input(
    z.object({
      image: unsplashImageSchema,
    }),
  )
  .handler(async ({ input, ctx }) => {
    const [image] = await db
      .insert(images)
      .values({
        id: createId(),
        collectionId: ctx.collection.id,
        ...unpslashImageToDbModel(input.image),
      })
      .returning({ id: images.id, unsplashId: images.unsplashId });

    revalidatePath(`/images/${image?.unsplashId}`);

    return image;
  });

export const removeImageFromCollection = authorizedProcedure
  .createServerAction()
  .input(
    z.object({
      unsplashId: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const image = await db
      .delete(images)
      .where(
        and(
          eq(images.unsplashId, input.unsplashId),
          eq(images.collectionId, input.collectionId),
        ),
      )
      .returning({ id: images.id });

    revalidatePath(`/images/${input.unsplashId}`);

    return image;
  });

export const fetchCollections = authenticatedProcedure
  .createServerAction()
  .input(
    z.object({
      limit: z.number().default(5),
      term: z.string().default(""),
    }),
  )
  .handler(async ({ input: { limit, term }, ctx: { userId } }) => {
    const results = await db.query.collections.findMany({
      limit,
      where: and(
        eq(collections.userId, userId),
        like(collections.name, `%${term}%`),
      ),
      with: {
        images: true,
      },
    });

    return results;
  });
