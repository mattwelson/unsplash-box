import { env } from "@/env";
import { z } from "zod";

const unsplashUrl = "https://api.unsplash.com";

export const unsplashImageSchema = z.object({
  id: z.string(),
  blur_hash: z.string(),
  alt_description: z.string(),
  width: z.number(),
  height: z.number(),
  color: z.string(),
  created_at: z.string(),
  links: z.object({
    download: z.string(),
  }),
  urls: z.object({
    raw: z.string(),
  }),
  user: z.object({
    name: z.string(),
    links: z.object({
      html: z.string(),
    }),
    profile_image: z.object({
      large: z.string(),
    }),
  }),
});

export type UnsplashImageSchema = z.infer<typeof unsplashImageSchema>;

const unsplashSearchResponseSchema = z.object({
  total: z.number(),
  total_pages: z.number(),
  results: unsplashImageSchema.array(),
});

export async function searchImages({ query }: { query: string }) {
  const response = await fetch(`${unsplashUrl}/search/photos?query=${query}`, {
    headers: {
      authorization: `Client-ID ${env.UNSPLASH_KEY}`,
    },
    cache: "force-cache",
  });

  const result = unsplashSearchResponseSchema.parse(await response.json());
  return result;
}

export async function fetchImage({ id }: { id: string }) {
  const response = await fetch(`${unsplashUrl}/photos/${id}`, {
    headers: {
      authorization: `Client-ID ${env.UNSPLASH_KEY}`,
    },
    cache: "force-cache",
  });

  const result = unsplashImageSchema.parse(await response.json());
  return result;
}
