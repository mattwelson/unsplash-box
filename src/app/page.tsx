import Image from "next/image";

import HeroLeft from "@/images/hero-left.png";
import HeroRight from "@/images/hero-right.png";
import { Input } from "@/components/ui/input";
import { SearchBox } from "./search/_components/search-box";

export default function HomePage() {
  return (
    <div className="relative z-0 mt-16 min-h-full w-full">
      <div className="absolute left-0 top-0 -z-10 hidden xl:block">
        <Image src={HeroLeft} alt="" />
      </div>
      <div className="z-10 mt-40 flex flex-1 flex-col items-center gap-6 px-8">
        <h1 className="text-4xl font-semibold">Search</h1>
        <div className="">
          Search high-resolution images from{" "}
          <a
            href="https://unsplash.com"
            rel="noreferrer nofollow"
            target="_blank"
            className="font-semibold underline"
          >
            Unsplash
          </a>
        </div>
        <SearchBox />
      </div>
      <div className="absolute right-0 top-0 -z-10 hidden xl:block">
        <Image src={HeroRight} alt="" />
      </div>
    </div>
  );
}
