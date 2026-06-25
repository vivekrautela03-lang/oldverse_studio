"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";

const allResults = [
  {
    id: "letters-never-sent",
    title: "Letters Never Sent",
    type: "Shows",
    img: "/frames/frame_0500.jpg",
    details: "Romance • Drama • 2024",
    views: "21K Views"
  },
  {
    id: "kirdar-aur-khat",
    title: "Kirdar Aur Khat",
    type: "Shows",
    img: "/frames/frame_0800.jpg",
    details: "Romance • Drama • 2024",
    views: "211K Views"
  },
  {
    id: "pehli-baarish",
    title: "Pehli Baarish",
    type: "Videos",
    img: "/frames/frame_0400.jpg",
    details: "Romance • Short Film • 2023",
    views: "98K Views"
  },
  {
    id: "unsaid-feelings",
    title: "Unsaid Feelings",
    type: "Episodes",
    img: "/frames/frame_0200.jpg",
    details: "Drama • Episode 3 • 2024",
    views: "9K Views"
  },
  {
    id: "vivek-rautela",
    title: "Vivek Rautela",
    type: "Creators",
    img: null,
    details: "Writer & Director",
    views: "12 Shows"
  }
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredResults = allResults.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    const matchesTab = activeTab === "All" || item.type === activeTab;
    return matchesQuery && matchesTab;
  });

  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-24 bg-brand-black min-h-screen">
      <Container className="max-w-[800px]">
        {/* Search Header */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search shows, creators, episodes..."
              className="w-full rounded-2xl border border-white/10 bg-brand-graphite px-6 py-4 pl-12 text-base text-brand-ivory outline-none focus:border-brand-gold/40 focus:bg-brand-graphite/80 transition-all font-space"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-ivory/40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>

        {/* Filters Tabs */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 mb-8 border-b border-brand-slate font-space text-xs uppercase tracking-wider">
          {["All", "Shows", "Creators", "Episodes", "Videos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full border transition-all ${
                activeTab === tab
                  ? "bg-brand-gold text-brand-black border-brand-gold font-semibold"
                  : "border-white/10 hover:border-white/30 text-brand-ivory/70 hover:text-brand-ivory"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <a
                key={item.id}
                href={item.type === "Creators" ? "/creators" : item.type === "Shows" ? "/shows" : "/watch"}
                className="flex items-center gap-4 bg-brand-graphite border border-white/5 p-3 rounded-2xl hover:border-brand-gold/30 hover:bg-brand-graphite/85 transition-all duration-300"
              >
                {/* Thumbnail */}
                {item.img ? (
                  <div className="relative w-28 aspect-[16/10] overflow-hidden rounded-xl bg-black/20 flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-[70px] w-[70px] rounded-full border border-brand-gold/20 bg-brand-gold/10 flex items-center justify-center font-bold text-brand-gold flex-shrink-0">
                    {item.title.split(" ").map(w => w[0]).join("")}
                  </div>
                )}

                {/* Details */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="font-space text-base font-semibold text-brand-ivory">
                      {item.title}
                    </h3>
                    <span className="font-space text-[0.6rem] border border-white/10 text-brand-ivory/50 rounded px-1.5 py-0.5 uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-xs text-brand-ivory/50">
                    {item.details}
                  </p>
                </div>

                {/* Meta */}
                <div className="text-right font-space text-[0.65rem] text-brand-ivory/40 uppercase tracking-widest hidden sm:block">
                  {item.views}
                </div>
              </a>
            ))
          ) : (
            <div className="text-center py-16 font-sans text-brand-ivory/40">
              No results found for &quot;{query}&quot;. Try typing &quot;kirdar&quot; or &quot;letters&quot;.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
