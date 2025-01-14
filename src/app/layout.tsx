import "@/styles/globals.css";

import { Be_Vietnam_Pro as FontSans } from "next/font/google";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { CommandCentre } from "@/components/command/centre";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/react-query";

export const metadata: Metadata = {
  title: "Unsplash Box",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "500", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(
          "bg-background font-sans font-light antialiased",
          fontSans.variable,
        )}
      >
        <body className="flex min-h-screen flex-col">
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main className="flex flex-1">{children}</main>
              <footer className="z-10 px-4 text-center 2xl:text-left">
                <div className="mx-auto flex max-w-lg justify-between py-8">
                  <div>
                    Made by <span className="font-semibold">@mattwelson</span>
                  </div>
                  <CommandCentre />
                </div>
              </footer>
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
