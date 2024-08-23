"use client";

import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useServerAction } from "zsa-react";
import { addImageToCollection, createNewCollection } from "./actions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { UnsplashImageSchema } from "@/server/unsplash";
import { formSchema } from "./schema";

export function CreateCollectionForm({
  image,
}: {
  image: UnsplashImageSchema;
}) {
  const { isPending, execute } = useServerAction(createNewCollection);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { collectionName: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const [collectionData, err] = await execute(values);

    if (err) {
      return toast.error("Could not create collection");
    }

    toast.success("Collection created");

    const [imageData, imageErr] = await addImageToCollection({
      image,
      collectionId: collectionData[0]!.id,
    });

    // TODO: redirect to the collections/:collectionId
    console.log({ imageData, data: collectionData });

    // TODO: close instead?
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="collectionName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Collection name..." autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isPending ? "Creating..." : "Create and add"}
        </Button>
      </form>
    </Form>
  );
}
