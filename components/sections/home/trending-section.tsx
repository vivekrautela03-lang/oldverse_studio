"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const trendingItems = [
  {
    id: "kirdar-aur-khat",
    title: "Kirdar Aur Khat",
    img: "/frames/frame_0800.jpg",
    badge: "NEW EPISODES",
    genre: "Romance • Drama",
    views: "21K Views"
  },
  {
    id: "letters-never-sent",
    title: "Letters Never Sent",
    img: "/frames/frame_0500.jpg",
    badge: "NEW SERIES",
    genre: "Drama • Romance",
    views: "850K Views"
  },
  {
    id: "no-respawn",
    title: "No Respawn",
    img: "/frames/frame_0200.jpg",
    badge: "NEW EPISODES",
    genre: "Action • Thriller",
    views: "3.2M Views"
  },
  {
    id: "dreams-of-kabeer",
    title: "Dreams of Kabeer",
    img: "/frames/frame_0600.jpg",
    badge: null,
    genre: "Drama • Coming of Age",
    views: "18K Views"
  },
  {
    id: "untitled",
    title: "Untitled",
    img: "/frames/frame_0300.jpg",
    badge: null,
    genre: "Experimental • Short Film",
    views: "8K Views"
  }
];

export function TrendingSection() {
  return (
    <section className="py-16 bg-brand-black">
      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-brand-slate pb-4 mb-8">
          <h2 className="font-bebas text-3xl tracking-wider text-brand-ivory">
            Trending This Week
          </h2>
          <a 
            href="/films" 
            className="font-space text-xs font-semibold uppercase tracking-wider text-brand-gold hover:text-brand-ivory transition-colors"
          >
            View All
          </a>
        </div>

        {/* Carousel / Grid of Cards */}
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {trendingItems.map((item) => (
            <motion.a
              key={item.id}
              href={`/films`}
              whileHover={{ y: -6 }}
              className="group block overflow-hidden rounded-xl bg-brand-graphite border border-white/5 p-2 transition-all duration-300"
            >
              {/* Card Image Wrapper */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black/20">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Red Badge */}
                {item.badge && (
                  <div className="absolute left-2.5 top-2.5 rounded bg-brand-crimson px-1.5 py-0.5 text-[0.55rem] font-bold tracking-wider text-white">
                    {item.badge}
                  </div>
                )}

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-brand-black shadow-lg">
                    <svg className="h-4 w-4 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Info */}
              <div className="mt-3 px-1 pb-1">
                <h3 className="font-space text-sm font-semibold text-brand-ivory truncate group-hover:text-brand-gold transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-[0.7rem] text-brand-ivory/50 truncate">
                  {item.genre}
                </p>
                <p className="mt-0.5 text-[0.65rem] font-semibold text-brand-gold">
                  {item.views}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
