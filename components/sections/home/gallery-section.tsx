import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GalleryTile } from "@/components/ui/gallery-tile";
import { galleryItems } from "@/lib/data";

export function GallerySection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Visual Moodboard"
          title="A gallery of atmosphere, texture, and cinematic warmth"
          description="Placeholder frames for the worlds The OldVerse builds, each one imagined as a still pulled from a living story."
        />

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
          {galleryItems.map((item) => (
            <GalleryTile key={item.title} title={item.title} accent={item.accent} size={item.size} />
          ))}
        </div>
      </Container>
    </section>
  );
}
