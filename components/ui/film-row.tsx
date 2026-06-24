import { PosterCard } from "@/components/ui/poster-card";
import { Reveal } from "@/components/ui/reveal";

type FilmRowProps = {
  title: string;
  description: string;
  items: ReadonlyArray<{
    title: string;
    note: string;
    accent: string;
  }>;
};

export function FilmRow({ title, description, items }: FilmRowProps) {
  return (
    <section className="space-y-6">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cream/50">Category</p>
            <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl">{title}</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-cream/68">{description}</p>
        </div>
      </Reveal>

      <div className="flex snap-x gap-5 overflow-x-auto pb-3">
        {items.map((item, index) => (
          <div key={item.title} className="min-w-[280px] flex-1 snap-start md:min-w-[340px]">
            <PosterCard
              title={item.title}
              badge={title}
              description={item.note}
              accent={item.accent}
              index={index + 1}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
