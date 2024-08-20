"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

import Logo from "@/images/Logo.svg";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", text: "Home" },
  { href: "/collections", text: "Collections" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Image src={Logo as StaticImport} alt="UnsplashBox Logo" />
        <div className="flex gap-2">
          {navLinks.map(({ href, text }) => (
            <Button
              asChild
              key={href}
              variant={pathname === href ? "secondary" : "ghost"}
            >
              <Link href={href}>{text}</Link>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
