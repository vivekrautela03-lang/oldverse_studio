import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function WorkWithUsSection() {
  return (
    <section className="pb-20 pt-10 sm:pb-24">
      <Container>
        <div className="glass-panel rounded-[2rem] border border-white/10 px-6 py-12 sm:px-10 sm:py-14">
          <SectionHeading
            eyebrow="Collaborate"
            title="Work With Us"
            description="We are always looking for actors, writers, editors and creative minds."
          />

          <Reveal delay={0.15}>
            <ButtonLink href="/contact">Join The OldVerse</ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
