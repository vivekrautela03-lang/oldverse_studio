"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

type GalleryTileProps = {
  title: string;
  accent: string;
  size: string;
};

export function GalleryTile({ title, accent, size }: GalleryTileProps) {
  return (
    <motion.a
      href={siteConfig.instagram}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.02, y: -6 }}
      whileTap={{ scale: 0.99 }}
      className={cn("group relative mb-5 block overflow-hidden rounded-[1.75rem] border border-white/10", size)}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105", accent)} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_22%,rgba(10,8,7,0.82)_100%)]" />
      <div className="film-grain absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
      <div className="relative flex h-full items-end p-5">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-cream/55">Gallery</p>
          <h3 className="mt-2 font-display text-2xl text-cream">{title}</h3>
        </div>
      </div>
    </motion.a>
  );
}
