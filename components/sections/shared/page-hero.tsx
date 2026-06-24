import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
};

export function PageHero({ eyebrow, title, description, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pt-32 sm:pt-36", className)}>
      <Container>
        <div className="glass-panel rounded-[2rem] border border-white/10 px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          {eyebrow ? (
            <Reveal>
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-cream/60">{eyebrow}</p>
            </Reveal>
          ) : null}

          <Reveal delay={0.05}>
            <h1 className="max-w-4xl font-display text-5xl leading-none text-cream sm:text-6xl lg:text-7xl">
              <TextReveal text={title} />
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-3xl text-base leading-8 text-cream/72 sm:text-lg">{description}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
