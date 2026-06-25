import type { Metadata } from "next";
import fs from "fs";
import path from "path";

import { InstagramSection } from "@/components/sections/home/instagram-section";
import { GallerySection } from "@/components/sections/home/gallery-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { QuoteSection } from "@/components/sections/home/quote-section";
import { ServicesSection } from "@/components/sections/home/services-section";
import { WorkWithUsSection } from "@/components/sections/home/work-with-us-section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description:
    "The OldVerse creates films, reels, web series, and music videos with cinematic storytelling and emotional connection.",
  path: "/home"
});

export default function HomePage() {
  // Read story config dynamically from public directory on the server side
  let storyData = [];
  try {
    const jsonPath = path.join(process.cwd(), "public", "story.json");
    const rawData = fs.readFileSync(jsonPath, "utf-8");
    storyData = JSON.parse(rawData);
  } catch (e) {
    console.error("Failed to read story.json on server:", e);
    // Emergency fallback data
    storyData = [
      { "chapter": "I", "title": "The Quiet Chamber", "body": "We stepped into the quiet enclosure, leaving the constant hum of the city behind." },
      { "chapter": "II", "title": "Among the Silence", "body": "Two strangers in matching uniforms, each locked inside their own world." },
      { "chapter": "III", "title": "A Distant Voice", "body": "A phone call echoed against the metal walls, breaking the heavy silence between us." },
      { "chapter": "IV", "title": "The Shared Glance", "body": "A sudden turn, a brief moment of curiosity where our eyes unexpectedly met." },
      { "chapter": "V", "title": "A Fleeting Smile", "body": "The cold tension of the morning rush dissolved into a soft, quiet smile." },
      { "chapter": "VI", "title": "A Memory Written", "body": "No words were spoken, yet that simple glance remains forever etched in time: 04.07.25." }
    ];
  }

  return (
    <>
      <HeroSection storyData={storyData} />
      <ServicesSection />
      <InstagramSection />
      <QuoteSection />
      <GallerySection />
      <WorkWithUsSection />
    </>
  );
}
