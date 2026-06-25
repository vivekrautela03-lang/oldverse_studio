import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Categories",
  description: "Explore different universes and formats at The OldVerse.",
  path: "/categories"
});

const universes = [
  { id: "action", name: "Action", icon: "💥", count: "3 Shows" },
  { id: "romance", name: "Romance", icon: "❤️", count: "5 Shows" },
  { id: "drama", name: "Drama", icon: "🎭", count: "8 Shows" },
  { id: "comedy", name: "Comedy", icon: "🍿", count: "2 Shows" },
  { id: "horror", name: "Horror", icon: "👻", count: "4 Shows" },
  { id: "documentary", name: "Documentary", icon: "📹", count: "3 Shows" },
  { id: "animation", name: "Animation", icon: "🎨", count: "1 Show" },
  { id: "music", name: "Music", icon: "🎵", count: "6 Shows" },
  { id: "travel", name: "Travel", icon: "✈️", count: "2 Shows" },
  { id: "student-life", name: "Student Life", icon: "🎒", count: "3 Shows" },
  { id: "poetry", name: "Poetry", icon: "✍️", count: "4 Shows" },
  { id: "experimental", name: "Experimental", icon: "🧪", count: "2 Shows" }
];

export default function CategoriesPage() {
  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-24 bg-brand-black min-h-screen">
      <Container>
        {/* Page Header */}
        <div className="border-b border-brand-slate pb-6 mb-10 text-center sm:text-left">
          <h1 className="font-bebas text-4xl tracking-wider text-brand-ivory sm:text-5xl">
            Explore Universes
          </h1>
          <p className="mt-2 font-sans text-sm text-brand-ivory/60 font-light">
            Discover stories across different formats, genres, and creative directions.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {universes.map((uni) => (
            <a
              key={uni.id}
              href="/films"
              className="group block bg-brand-graphite border border-white/5 rounded-2xl p-6 text-center hover:border-brand-gold/30 hover:bg-brand-graphite/80 transition-all duration-300 shadow-md"
            >
              <div className="text-4xl mb-4 transform transition-transform group-hover:scale-110 duration-300">
                {uni.icon}
              </div>
              <h3 className="font-space text-base font-semibold text-brand-ivory group-hover:text-brand-gold transition-colors">
                {uni.name}
              </h3>
              <p className="mt-1.5 text-[0.7rem] text-brand-ivory/40 uppercase tracking-widest font-medium">
                {uni.count}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
