import type { Metadata } from "next";

import { PageHero } from "@/components/sections/shared/page-hero";
import { InquiryForm } from "@/components/site/inquiry-form";
import { Container } from "@/components/ui/container";
import { ContactCard } from "@/components/ui/contact-card";
import { Reveal } from "@/components/ui/reveal";
import { contactMethods } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Contact The OldVerse for film production, music videos, reels, and creative collaborations.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Create Something Meaningful"
        description="Share your idea, story, or project brief and let’s shape it into a visual experience people can genuinely connect with."
      />

      <Container className="space-y-10 py-14 sm:space-y-12 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {contactMethods.map((method) => (
            <ContactCard
              key={method.label}
              label={method.label}
              value={method.value}
              href={method.href}
              description={method.description}
            />
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.35em] text-cream/50">Project Inquiry</p>
              <h2 className="font-display text-4xl text-cream sm:text-5xl">Tell us what you want to create</h2>
              <p className="text-base leading-8 text-cream/72">
                From films and reels to music videos and series concepts, we’d love to hear your creative
                direction, timelines, and the emotional world you want the work to carry.
              </p>
            </div>
          </Reveal>

          <InquiryForm />
        </div>
      </Container>
    </>
  );
}
