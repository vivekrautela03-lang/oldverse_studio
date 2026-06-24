import type { Metadata } from "next";

import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { FilmRow } from "@/components/ui/film-row";
import { Reveal } from "@/components/ui/reveal";
import { filmRows } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Films",
  description: "Explore The OldVerse catalog of short films, cinematic reels, web series, and music videos.",
  path: "/films"
});

export default function FilmsPage() {
  return (
    <>
      <PageHero
        eyebrow="Film Library"
        title="Our Films"
        description="Stories crafted through emotion, creativity and cinematic expression."
      />

      <Container className="space-y-14 py-14 sm:space-y-16 sm:py-16">
        <Reveal>
          <p className="max-w-3xl text-sm leading-7 text-cream/68">
            Built in a Netflix-style rhythm, each row opens into a different tone of storytelling while
            directing viewers to the studio’s Instagram showcase.
          </p>
        </Reveal>

        {filmRows.map((row) => (
          <FilmRow key={row.title} title={row.title} description={row.description} items={row.items} />
        ))}
      </Container>
    </>
  );
}
