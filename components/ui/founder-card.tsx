"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type FounderCardProps = {
  name: string;
  roles: readonly string[];
  description: string;
  initials: string;
  accent: string;
};

export function FounderCard({ name, roles, description, initials, accent }: FounderCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="glass-panel overflow-hidden rounded-[2rem] border border-white/10"
    >
      <div className={cn("relative h-72 overflow-hidden bg-gradient-to-br", accent)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)]" />
        <div className="film-grain absolute inset-0 opacity-55" />
        <div className="absolute inset-x-8 bottom-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cream/65">Founder Portrait</p>
            <p className="mt-2 font-display text-4xl text-cream">{name}</p>
          </div>
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/20 font-display text-3xl text-cream">
            {initials}
          </div>
        </div>
      </div>

      <div className="space-y-5 px-6 py-7">
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-[0.25em] text-cream/75"
            >
              {role}
            </span>
          ))}
        </div>

        <p className="text-sm leading-7 text-cream/72">{description}</p>
      </div>
    </motion.article>
  );
}
