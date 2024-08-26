"use server";

import { searchImages } from "@/server/unsplash";
import { z } from "zod";
import { createServerAction } from "zsa";

export const searchImagesAction = createServerAction()
  .input(
    z.object({
      query: z.string(),
      page: z.number().default(1),
    }),
  )
  .handler(async ({ input }) => {
    const result = await searchImages(input);

    return {
      ...result,
      nextPage: result.total_pages > input.page ? input.page + 1 : null,
    };
  });
