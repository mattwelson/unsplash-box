"use client";

import { Form, FormControl, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchBox } from "./search-box";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  query: z.string(),
});

export function SearchForm({ initialQuery }: { initialQuery?: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: initialQuery ?? "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/search?q=${values.query}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-xl"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => <SearchBox {...field} />}
        />
      </form>
    </Form>
  );
}
