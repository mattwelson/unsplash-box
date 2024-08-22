"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Images, MoonIcon, Search, SunIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

function cleanSearchValue(value: string) {
  return value.replace(/^search\s(for\s?)?(:\s)?/, "");
}

export function CommandCentre() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function closeAnd(fnc: (value?: string) => void) {
    return (value?: string) => {
      fnc(value);
      setOpen(false);
    };
  }

  function handleSearch(value?: string) {
    if (!value) return router.push(`/search`);
    router.push(`/search?q=${cleanSearchValue(value)}`);
  }

  return (
    <>
      <div className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={value}
          onValueChange={setValue}
          placeholder="Type a command or search..."
        />
        <CommandEmpty>No command found</CommandEmpty>
        <CommandList>
          <CommandGroup heading="Pages">
            <CommandItem
              onSelect={closeAnd(handleSearch)}
              keywords={["search"]}
              value={value}
            >
              <Search className="mr-2 size-4" />
              <span>Go to /search: {cleanSearchValue(value)}</span>
            </CommandItem>
            <CommandItem onSelect={closeAnd(() => router.push("/collections"))}>
              <Images className="mr-2 size-4" />
              <span>Go to /collections</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Settings">
            <CommandItem
              disabled={theme === "light"}
              onSelect={closeAnd(() => setTheme("light"))}
            >
              <SunIcon className="mr-2 size-4" />
              <span>Theme: Light</span>
            </CommandItem>
            <CommandItem
              disabled={theme === "dark"}
              onSelect={closeAnd(() => setTheme("dark"))}
            >
              <MoonIcon className="mr-2 size-4" />
              <span>Theme: Dark</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
