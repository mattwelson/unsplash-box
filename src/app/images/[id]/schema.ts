import { z } from "zod";

export const formSchema = z.object({
  collectionName: z.string().min(2),
});
