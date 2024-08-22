import { env } from "@/env";

const unsplashUrl = "https://api.unsplash.com";

export interface UnsplashImage {
  id: string;
  blur_hash: string;
  alt_description: string;
  width: number;
  height: number;
  color: string;
  created_at: string;
  links: { download: string };
  urls: {
    raw: string;
    small: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
    profile_image: {
      large: string;
    };
  };
}

interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export async function searchImages({ query }: { query: string }) {
  const response = await fetch(`${unsplashUrl}/search/photos?query=${query}`, {
    headers: {
      authorization: `Client-ID ${env.UNSPLASH_KEY}`,
    },
    cache: "force-cache",
  });
  // TODO: ZOD!
  const result: UnsplashSearchResponse = await response.json();
  return result;
}

export async function fetchImage({ id }: { id: string }) {
  const response = await fetch(`${unsplashUrl}/photos/${id}`, {
    headers: {
      authorization: `Client-ID ${env.UNSPLASH_KEY}`,
    },
    cache: "force-cache",
  });

  // TODO: ZOD!
  const result: UnsplashImage = await response.json();
  return result;
}
