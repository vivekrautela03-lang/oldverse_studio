import { Container } from "@/components/ui/container";
import { PosterCard } from "@/components/ui/poster-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { filmCategories } from "@/lib/data";

export function FilmsPreviewSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Selected Formats"
          title="Stories made for every kind of screen"
          description="A Netflix-inspired preview of the formats we shape, each designed with cinematic texture and emotional pull."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {filmCategories.map((category, index) => (
            <PosterCard
              key={category.title}
              title={category.title}
              badge={category.badge}
              description={category.hook}
              accent={category.accent}
              index={index + 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
