"use client";

import { useInView } from "react-intersection-observer";
import { ImageGrid } from "./_components/image-grid";
import { unpslashImageToDbModel } from "@/server/unsplash/convertor";
import { useServerActionInfiniteQuery } from "@/lib/hooks";
import { searchImagesAction } from "./actions";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

// TODO: move to container
// This is a complex solution to the problem
// This isn't in the "container" because that calls to the fetch API directly, so is serverside
// It isn't in the image-grid as that is reused by the collections which don't need infinite scroll in general, though it could be applied
// Using ZSA and zsa-react-query
export function SearchableImageGrid({ query }: { query: string }) {
  const { data, isFetching, fetchNextPage } = useServerActionInfiniteQuery(
    searchImagesAction,
    {
      queryKey: ["search", query],
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      input: ({ pageParam }) => ({ query, page: pageParam }),
    },
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) void fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <>
      <ImageGrid
        images={data?.pages.flatMap((page) =>
          page.results.map((i) => unpslashImageToDbModel(i)),
        )}
      />
      <div ref={ref}>
        {isFetching && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-10 animate-spin text-primary" />
          </div>
        )}
      </div>
    </>
  );
}
