import type { UnsplashImageSchema } from ".";
import { type images } from "../db/schema";

export type ImageType = Omit<typeof images.$inferInsert, "id" | "collectionId">;

export function unpslashImageToDbModel(image: UnsplashImageSchema): ImageType {
  return {
    unsplashId: image.id,
    width: image.width,
    height: image.height,
    color: image.color,
    altDescription: image.alt_description,
    url: image.urls.raw,
  };
}
