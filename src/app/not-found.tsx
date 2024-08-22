import { Separator } from "@/components/ui/separator";

export default function NotFoundPage() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-10 items-center gap-8 text-xl">
        <div className="font-semibold">404</div>
        <Separator orientation="vertical" />
        <div>Page not found</div>
      </div>
    </div>
  );
}
