"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";

const castingCalls = [
  {
    id: "call-1",
    title: "Lead Actor - Romantic Short Film",
    category: "Actors",
    location: "Mumbai",
    type: "Paid Opportunity",
    posted: "Posted 2h ago",
    details: "Looking for a male lead (playing age 22-26) with excellent dialogue delivery in Hindi. Shoot starts mid-July."
  },
  {
    id: "call-2",
    title: "Cinematographer for Web Series",
    category: "Crew",
    location: "Delhi",
    type: "Paid Opportunity",
    posted: "Posted 5h ago",
    details: "Experienced DP needed for an upcoming indie web series. Familiarity with low-light cinematic grading is a plus."
  },
  {
    id: "call-3",
    title: "Female Lead - College Drama",
    category: "Actors",
    location: "Bengaluru",
    type: "Paid Opportunity",
    posted: "Posted 1d ago",
    details: "Casting female lead (playing age 18-21) for a coming-of-age short film. Prior theatre experience is appreciated."
  },
  {
    id: "call-4",
    title: "Scriptwriter - Thriller Anthology",
    category: "Writers",
    location: "Remote",
    type: "Paid Opportunity",
    posted: "Posted 3 days ago",
    details: "Looking for a scriptwriter to collaborate on a psychological thriller series. Must submit a 10-page sample script."
  }
];

export default function CastingPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  const toggleBookmark = (id: string) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(item => item !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const filteredCalls = castingCalls.filter(call => activeTab === "All" || call.category === activeTab);

  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-24 bg-brand-black min-h-screen">
      <Container className="max-w-[900px]">
        {/* Page Header */}
        <div className="border-b border-brand-slate pb-6 mb-8 text-center sm:text-left">
          <h1 className="font-bebas text-4xl tracking-wider text-brand-ivory sm:text-5xl">
            Casting Calls
          </h1>
          <p className="mt-2 font-sans text-sm text-brand-ivory/60 font-light">
            Find opportunities to showcase your talent and join our creative ecosystem.
          </p>
        </div>

        {/* Filters Tabs */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 mb-8 border-b border-brand-slate font-space text-xs uppercase tracking-wider">
          {["All", "Actors", "Crew", "Models", "Writers"].map((tab) => (
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

        {/* Listings */}
        <div className="space-y-5">
          {filteredCalls.map((call) => {
            const isBookmarked = bookmarked.includes(call.id);
            return (
              <div
                key={call.id}
                className="bg-brand-graphite border border-white/5 rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-brand-gold/20 transition-all duration-300"
              >
                <div className="space-y-3.5 flex-grow">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-space text-[0.6rem] border border-brand-gold/30 text-brand-gold rounded px-2 py-0.5 uppercase tracking-widest font-semibold">
                      {call.category}
                    </span>
                    <span className="font-sans text-[0.7rem] text-brand-ivory/40">{call.posted}</span>
                  </div>

                  <h3 className="font-space text-lg font-semibold text-brand-ivory">
                    {call.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-brand-ivory/70 font-light leading-relaxed max-w-xl">
                    {call.details}
                  </p>

                  <div className="flex flex-wrap gap-5 font-space text-[0.65rem] text-brand-ivory/50 uppercase tracking-widest pt-2">
                    <span className="flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {call.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                        <line x1="12" y1="4" x2="12" y2="20" />
                      </svg>
                      {call.type}
                    </span>
                  </div>
                </div>

                <div className="flex md:flex-col items-center gap-3 md:self-stretch justify-end md:justify-between border-t md:border-t-0 md:border-l border-brand-slate pt-4 md:pt-0 md:pl-6 min-w-[120px]">
                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(call.id)}
                    className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all md:self-end ${
                      isBookmarked
                        ? "bg-brand-gold/10 border-brand-gold/40 text-brand-gold"
                        : "border-white/10 text-brand-ivory/40 hover:text-brand-ivory hover:border-white/20"
                    }`}
                  >
                    <svg className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => alert(`Applying for ${call.title} (mock process)...`)}
                    className="flex-grow md:flex-grow-0 font-space text-xs font-semibold uppercase tracking-wider bg-brand-gold text-brand-black px-6 py-2.5 rounded-lg hover:bg-brand-ivory transition-colors shadow-glow text-center"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
