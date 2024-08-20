import { cn } from "@/lib/utils";

// TODO: change element or add as child concept?
export function GradientText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-[#F2C593] to-[#8A3282] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}
