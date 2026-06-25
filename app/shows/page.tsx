"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import Link from "next/link";

const episodes = [
  {
    num: "1",
    title: "Ek Ankahee Shuruaat",
    duration: "42:30",
    description: "Two strangers locked in their own worlds cross paths in an elevator, starting an unsaid conversation."
  },
  {
    num: "2",
    title: "Khat Jo Bheja Nahi Gaya",
    duration: "41:10",
    description: "Unsent letters accumulate in a wooden drawer, containing thoughts too raw to be shared."
  },
  {
    num: "3",
    title: "Jawaab Jo Aaya",
    duration: "29:45",
    description: "A sudden response changes the equation. Words begin to flow, bridging the distance between them."
  },
  {
    num: "4",
    title: "Kirdar Jo Badal Gaye",
    duration: "41:10",
    description: "Season Finale. The characters shift, boundaries dissolve, and a simple glance remains written in time."
  }
];

export default function ShowsPage() {
  const [activeTab, setActiveTab] = useState("Episodes");
  const [isInList, setIsInList] = useState(false);

  return (
    <section className="bg-brand-black min-h-screen">
      {/* Cinematic Banner Header */}
      <div 
        className="relative h-[55vh] sm:h-[65vh] w-full bg-cover bg-center flex items-end pb-12 pt-32"
        style={{ backgroundImage: "linear-gradient(to top, #0B0B0B 0%, rgba(11,11,11,0.3) 50%, rgba(11,11,11,0.85) 100%), url('/frames/frame_0800.jpg')" }}
      >
        <Container className="relative z-10 w-full">
          <div className="max-w-3xl">
            <span className="font-space text-xs text-brand-gold font-semibold uppercase tracking-widest">
              ROMANCE • DRAMA • 2024 • UA 16+
            </span>
            <h1 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-brand-ivory mt-3 tracking-wide">
              KIRDAR AUR KHAT
            </h1>
            <p className="mt-4 max-w-xl font-sans text-sm sm:text-base leading-relaxed text-brand-ivory/80 font-light">
              Some letters are never sent, but they change their lives forever. A cinematic journey 
              about two strangers who bridge their loneliness through written words, crafted with 
              character-driven cinematography by Vivek Rautela.
            </p>

            {/* Banner CTAs */}
            <div className="mt-8 flex flex-wrap gap-4 items-center font-space text-xs font-semibold uppercase tracking-wider">
              <Link
                href="/watch"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-gold px-7 py-3 text-brand-black transition-all hover:bg-brand-ivory hover:scale-[1.02] shadow-glow"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </Link>
              
              <button
                onClick={() => setIsInList(!isInList)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 py-3 text-brand-ivory transition-all hover:bg-white/10 hover:border-white/30"
              >
                {isInList ? (
                  <>
                    <svg className="h-4 w-4 fill-current text-brand-gold" viewBox="0 0 24 24">
                      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    Added
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add to List
                  </>
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Tabs & Content */}
      <Container className="py-12">
        {/* Tab Selector */}
        <div className="flex border-b border-brand-slate mb-8 gap-8 font-space text-xs uppercase tracking-wider overflow-x-auto pb-1.5">
          {["Episodes", "About", "Cast & Crew", "More Like This"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-semibold transition-all relative ${
                activeTab === tab ? "text-brand-gold" : "text-brand-ivory/60 hover:text-brand-ivory"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="showActiveTabLine"
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-gold"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        {activeTab === "Episodes" && (
          <div className="space-y-6">
            {/* Season Selector */}
            <div className="flex items-center gap-3">
              <span className="font-space text-xs text-brand-ivory/60 uppercase tracking-widest">Season</span>
              <select className="bg-brand-graphite border border-white/10 rounded-lg px-4 py-2 text-xs font-space text-brand-ivory focus:outline-none focus:border-brand-gold/40">
                <option>Season 1</option>
              </select>
            </div>

            {/* Episode Grid/List */}
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
              {episodes.map((ep) => (
                <Link
                  key={ep.num}
                  href="/watch"
                  className="group block bg-brand-graphite border border-white/5 rounded-2xl p-5 hover:border-brand-gold/30 hover:bg-brand-graphite/80 transition-all duration-300 shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span className="font-bebas text-2xl text-brand-gold leading-none group-hover:scale-110 transition-transform">
                        {ep.num.padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-space text-sm font-semibold uppercase tracking-wider text-brand-ivory group-hover:text-brand-gold transition-colors">
                          {ep.title}
                        </h3>
                        <p className="font-sans text-[0.65rem] text-brand-ivory/40 mt-1">
                          Episode {ep.num}
                        </p>
                      </div>
                    </div>
                    <span className="font-space text-[0.65rem] text-brand-ivory/40 whitespace-nowrap">
                      {ep.duration}
                    </span>
                  </div>
                  <p className="mt-4 font-sans text-xs text-brand-ivory/60 leading-relaxed font-light line-clamp-2">
                    {ep.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === "About" && (
          <div className="max-w-2xl font-sans text-sm text-brand-ivory/70 space-y-4 font-light leading-relaxed">
            <p>
              <strong>Kirdar Aur Khat</strong> is an exploration of human isolation in a hyper-connected city. 
              The show uses the physical space of an elevator and the handwritten medium of letters to create 
              a nostalgic contrast against modern communication.
            </p>
            <p>
              First aired in June 2024, the project represents the trademark visual style of The OldVerse, 
              focusing on warm amber and cinema gold grading, low-key lighting, and long pauses that let 
              emotions speak.
            </p>
          </div>
        )}

        {activeTab === "Cast & Crew" && (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-4">
            <div className="bg-brand-graphite border border-white/5 rounded-2xl p-5 text-center">
              <div className="h-14 w-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-bold text-brand-gold mx-auto text-sm">
                VR
              </div>
              <h4 className="font-space text-xs font-semibold uppercase mt-3 text-brand-ivory">Vivek Rautela</h4>
              <p className="text-[0.65rem] text-brand-ivory/40 uppercase tracking-wider mt-1">Writer & Director</p>
            </div>
            <div className="bg-brand-graphite border border-white/5 rounded-2xl p-5 text-center">
              <div className="h-14 w-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-bold text-brand-gold mx-auto text-sm">
                S
              </div>
              <h4 className="font-space text-xs font-semibold uppercase mt-3 text-brand-ivory">Shivanshi</h4>
              <p className="text-[0.65rem] text-brand-ivory/40 uppercase tracking-wider mt-1">Co-Director</p>
            </div>
          </div>
        )}

        {activeTab === "More Like This" && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/films"
              className="group block bg-brand-graphite border border-white/5 rounded-2xl p-3 hover:border-brand-gold/30 transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-black/10">
                <img
                  src="/frames/frame_0100.jpg"
                  alt="Nishaan"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-space text-xs font-semibold uppercase tracking-wider mt-3 text-brand-ivory group-hover:text-brand-gold transition-colors">
                Nishaan
              </h4>
            </a>
            <a
              href="/films"
              className="group block bg-brand-graphite border border-white/5 rounded-2xl p-3 hover:border-brand-gold/30 transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-black/10">
                <img
                  src="/frames/frame_0200.jpg"
                  alt="No Respawn"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-space text-xs font-semibold uppercase tracking-wider mt-3 text-brand-ivory group-hover:text-brand-gold transition-colors">
                No Respawn
              </h4>
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
