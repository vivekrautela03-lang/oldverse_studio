"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants";

// Custom SVG Icons to avoid dependencies
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" x2="21" y1="14" y2="3"/>
  </svg>
);

const ReelIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
    <path d="M3 9l4-4" />
    <path d="M9 9l4-4" />
    <path d="M15 9l4-4" />
    <path d="M9 15l5-3-5-3v6z" fill="currentColor" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const instagramPosts = [
  { id: 1, img: "/instagram/post_1.jpg", views: "2,993" },
  { id: 2, img: "/instagram/post_2.jpg", views: "1,894" },
  { id: 3, img: "/instagram/post_3.jpg", views: "14.1K" },
  { id: 4, img: "/instagram/post_4.jpg", views: "1,457" },
  { id: 5, img: "/instagram/post_5.jpg", views: "2,695" },
  { id: 6, img: "/instagram/post_6.jpg", views: "7,679" },
  { id: 7, img: "/instagram/post_7.jpg", views: "1,611" },
  { id: 8, img: "/instagram/post_8.jpg", views: "3,747" },
  { id: 9, img: "/instagram/post_9.jpg", views: "1,668" }
];

export function InstagramSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        {/* Header Block */}
        <div className="text-center flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4a06b]">
            Stories Through Lens 🎥
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
            Follow Our Journey
          </h2>
          <p className="mt-4 text-cream/70 text-sm max-w-sm sm:max-w-md">
            Explore our storytelling, behind-the-scenes moments, and creative projects on Instagram.
          </p>
          
          {/* Visit Instagram Header Button */}
          <motion.a
            href={siteConfig.instagram}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center gap-2 rounded-full p-[1.5px] bg-gradient-to-r from-[#ff6b35] via-[#ff2e93] to-[#913dec] transition-all group mt-6"
          >
            <span className="flex items-center gap-2 rounded-full bg-[rgba(10,8,7,0.92)] px-6 py-2.5 text-sm font-medium text-cream group-hover:bg-transparent transition-colors duration-300">
              <InstagramIcon className="h-4 w-4" />
              Visit Instagram
              <ExternalLinkIcon className="h-3.5 w-3.5 opacity-70" />
            </span>
          </motion.a>
        </div>

        {/* Latest From Instagram Row */}
        <div className="mt-16 flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="font-display text-lg sm:text-xl font-semibold text-cream">
            Latest From Instagram
          </h3>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-1.5 text-xs tracking-wider uppercase text-cream/60 transition-colors hover:text-cream"
          >
            View on Instagram
            <ExternalLinkIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* 3x3 Grid */}
        <div className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {instagramPosts.map((post) => (
            <motion.a
              key={post.id}
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative block aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-md"
            >
              <img
                src={post.img}
                alt={`Instagram post ${post.id}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Gradients and Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 transition-opacity duration-300 group-hover:opacity-75" />
              
              {/* Reel Icon in Top Right */}
              <div className="absolute right-4 top-4 rounded-full bg-black/40 p-1.5 text-white/90 backdrop-blur-sm shadow-md transition-transform duration-300 group-hover:scale-110">
                <ReelIcon className="h-4 w-4" />
              </div>

              {/* Views Count in Bottom Left */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <EyeIcon className="h-4 w-4 text-white/80" />
                <span className="text-sm font-semibold tracking-wide">{post.views}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* See More Bottom Button */}
        <div className="mt-12 flex justify-center">
          <motion.a
            href={siteConfig.instagram}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff6b35] via-[#ff2e93] to-[#913dec] px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-transform duration-300 hover:shadow-xl"
          >
            <InstagramIcon className="h-5 w-5" />
            See More on Instagram
            <ExternalLinkIcon className="h-4 w-4 opacity-90" />
          </motion.a>
        </div>
      </Container>
    </section>
  );
}
