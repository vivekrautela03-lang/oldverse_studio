import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 max-w-3xl", centered && "mx-auto text-center")}>
      {eyebrow ? (
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-cream/65">{eyebrow}</p>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl leading-tight text-cream sm:text-5xl">
          <TextReveal text={title} />
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-2xl text-base leading-8 text-cream/72 sm:text-lg">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
