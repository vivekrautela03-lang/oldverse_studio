"use client";

import { motion } from "framer-motion";

import { service } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ServicesSection() {
  return (
    <section id="what-we-do" className="scroll-mt-28 py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Craft" title="What We Do" />

        <Reveal delay={0.1}>
          <motion.article
            whileHover={{ y: -8 }}
            className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/10 p-6 shadow-panel sm:p-8 lg:p-10"
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#8b6f47]/20 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[0.65fr_1fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-cream/55">Signature Service</p>
                <h3 className="font-display text-4xl text-cream sm:text-5xl">{service.title}</h3>
              </div>
              <p className="max-w-2xl text-base leading-8 text-cream/74 sm:text-lg">{service.description}</p>
            </div>
          </motion.article>
        </Reveal>
      </Container>
    </section>
  );
}
