import Image from "next/image";
import React from "react";

import { Input } from "@/components/ui/input";
import SearchIcon from "@/images/Search.svg";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("relative mx-auto w-full max-w-xl", className)}>
        <Input
          placeholder="Enter your keywords..."
          className="h-auto bg-background px-4 py-5"
          autoFocus
          ref={ref}
          {...props}
        />
        <Image
          src={SearchIcon as StaticImport}
          alt=""
          className="absolute right-4 top-5"
        />
      </div>
    );
  },
);
SearchBox.displayName = "SearchBox";

export { SearchBox };
