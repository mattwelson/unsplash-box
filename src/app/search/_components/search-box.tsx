import Image from "next/image";

import { Input } from "@/components/ui/input";
import SearchIcon from "@/images/Search.svg";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { ChangeEventHandler } from "react";

export function SearchBox({
  value,
  onChange,
}: {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <Input
        placeholder="Enter your keywords..."
        className="h-auto bg-background px-4 py-5"
        autoFocus
        value={value}
        onChange={onChange}
      />
      <Image
        src={SearchIcon as StaticImport}
        alt=""
        className="absolute right-4 top-5"
      />
    </div>
  );
}
