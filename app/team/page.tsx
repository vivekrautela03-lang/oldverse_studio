import type { Metadata } from "next";

import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { FounderCard } from "@/components/ui/founder-card";
import { Reveal } from "@/components/ui/reveal";
import { founders } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Team",
  description: "Meet Vivek Rautela and Shivanshi, the founders behind The OldVerse.",
  path: "/team"
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="The People Behind The OldVerse"
        description="A focused creative team shaping films, stories, and visual experiences with warmth, craft, and cinematic intention."
      />

      <Container className="py-14 sm:py-16">
        <Reveal>
          <p className="mb-8 max-w-2xl text-sm leading-7 text-cream/68">
            Each project is guided by complementary strengths across writing, direction, production, and
            editorial execution, allowing the studio to create cohesive stories from concept to final cut.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {founders.map((founder) => (
            <FounderCard
              key={founder.name}
              name={founder.name}
              roles={founder.roles}
              description={founder.description}
              initials={founder.initials}
              accent={founder.accent}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
