import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { collectionItemVariants } from "./collections-grid";

export function CollectionsGridSkeleton() {
  return (
    <>
      <CollectionsGridItemSkeleton />
      <CollectionsGridItemSkeleton titleLength="lg" />
      <CollectionsGridItemSkeleton items={2} />
      <CollectionsGridItemSkeleton titleLength="sm" items={1} />
      <CollectionsGridItemSkeleton />
    </>
  );
}

const collectionItemSkeletonVariants = cva("", {
  variants: {
    titleLength: {
      sm: "w-24",
      md: "w-32",
      lg: "w-40",
    },
  },
  defaultVariants: {
    titleLength: "md",
  },
});

cx;

export function CollectionsGridItemSkeleton({
  items,
  titleLength,
}: VariantProps<typeof collectionItemVariants> &
  VariantProps<typeof collectionItemSkeletonVariants>) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className={collectionItemVariants({ items })}>
        <Skeleton
          className={cn("rounded-none", {
            "": items === 2,
            "col-span-3 col-start-1 row-span-2": (items ?? 3) === 3,
          })}
        />
        <Skeleton
          className={cn("hidden rounded-none", {
            block: (items ?? 3) >= 2,
          })}
        />
        <Skeleton
          className={cn("hidden rounded-none", {
            block: (items ?? 3) === 3,
          })}
        />
      </div>
      <Skeleton
        className={cn("h-5", collectionItemSkeletonVariants({ titleLength }))}
      />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}
