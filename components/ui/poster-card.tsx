"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

type PosterCardProps = {
  title: string;
  badge: string;
  description: string;
  accent: string;
  index?: number;
};

export function PosterCard({ title, badge, description, accent, index = 1 }: PosterCardProps) {
  return (
    <motion.a
      href={siteConfig.instagram}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -8, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-[#120e0d] shadow-panel"
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-95 transition-transform duration-500 group-hover:scale-105", accent)} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_48%)]" />
      <div className="film-grain absolute inset-0 opacity-60" />

      <div className="relative flex min-h-[21rem] flex-col justify-between p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-cream/85">
            {badge}
          </span>
          <span className="font-display text-5xl text-white/45">0{index}</span>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-cream/60">The OldVerse</p>
          <h3 className="font-display text-3xl text-cream sm:text-[2rem]">{title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-cream/78">{description}</p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cream/80">
            <span className="h-px w-10 bg-cream/35" />
            Watch on Instagram
          </div>
        </div>
      </div>
    </motion.a>
  );
}
