import type { Metadata } from "next";

import { InstagramSection } from "@/components/sections/home/instagram-section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Films",
  description: "Explore The OldVerse catalog of short films, cinematic reels, web series, and music videos.",
  path: "/films"
});

export default function FilmsPage() {
  return <InstagramSection />;
}
