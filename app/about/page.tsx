import type { Metadata } from "next";

import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { timeline } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Learn about the belief, founders, and creative direction behind The OldVerse.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About The OldVerse"
        description="The OldVerse is a production house and creative studio built on the belief that stories should create genuine connections. Founded by Vivek Rautela and Shivanshi, The OldVerse was created to bring meaningful films and visual experiences to life."
      />

      <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-cream/50">Our Lens</p>
            <p className="font-display text-4xl leading-tight text-cream sm:text-5xl">
              We build stories that stay with people after the screen goes dark.
            </p>
            <p className="max-w-xl text-base leading-8 text-cream/72 sm:text-lg">
              The studio blends cinematic polish with emotional honesty, creating work that feels warm,
              intentional, and grounded in human connection rather than spectacle alone.
            </p>
          </div>
        </Reveal>

        <div className="space-y-6">
          {timeline.map((step, index) => (
            <Reveal key={step.year} delay={index * 0.08}>
              <article className="relative rounded-[1.8rem] border border-white/10 bg-white/5 p-6 pl-8 backdrop-blur-xl sm:p-8 sm:pl-10">
                <div className="absolute bottom-6 left-4 top-6 w-px bg-gradient-to-b from-[#f5e6d3]/70 to-transparent" />
                <p className="text-xs uppercase tracking-[0.35em] text-cream/50">{step.year}</p>
                <h2 className="mt-3 font-display text-3xl text-cream">{step.title}</h2>
                <p className="mt-4 text-sm leading-7 text-cream/72">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
