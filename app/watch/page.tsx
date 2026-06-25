"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

const episodes = [
  { id: "ep1", title: "Ek Ankahee Shuruaat", num: "1", duration: "42:30" },
  { id: "ep2", title: "Khat Jo Bheja Nahi Gaya", num: "2", duration: "41:10" },
  { id: "ep3", title: "Jawaab Jo Aaya", num: "3", duration: "29:45" },
  { id: "ep4", title: "Kirdar Jo Badal Gaye", num: "4", duration: "41:10" }
];

export default function WatchPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(episodes[0]);
  const [likes, setLikes] = useState(2500);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-24 bg-brand-black min-h-screen">
      <Container>
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Main Player & Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Custom Video Player */}
            <div className="relative aspect-[16/9] bg-black rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
              {/* Cover Image/Video background */}
              <img
                src="/frames/frame_0800.jpg"
                alt="Video thumbnail"
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  isPlaying ? "opacity-30" : "opacity-80"
                }`}
              />

              {/* Play Overlay */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors z-10"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-16 w-16 bg-brand-gold text-brand-black rounded-full flex items-center justify-center pl-1 shadow-glow"
                  >
                    <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </button>
              )}

              {/* Mock Playback indicators */}
              {isPlaying && (
                <div 
                  onClick={() => setIsPlaying(false)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                >
                  <p className="font-space text-xs tracking-widest text-brand-gold uppercase bg-brand-black/70 px-4 py-2 rounded-full border border-brand-gold/30">
                    Click to Pause
                  </p>
                </div>
              )}

              {/* Player UI Controls bar at bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                {/* Progress bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer relative">
                  <div className="absolute left-0 top-0 bottom-0 bg-brand-gold w-[40%] rounded-full shadow-[0_0_8px_rgba(245,166,35,0.6)]" />
                </div>
                
                {/* Control buttons */}
                <div className="flex items-center justify-between text-brand-ivory text-xs font-space">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-brand-gold">
                      {isPlaying ? (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                    <span>16:45 / 42:30</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Volume */}
                    <button className="hover:text-brand-gold">
                      <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M11 5 6 9H2v6h4l5 4V5z" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    </button>
                    {/* Settings */}
                    <button className="hover:text-brand-gold">
                      <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    </button>
                    {/* Fullscreen */}
                    <button className="hover:text-brand-gold">
                      <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Details */}
            <div className="border-b border-brand-slate pb-6">
              <span className="font-space text-xs text-brand-gold font-semibold uppercase tracking-widest">
                Kirdar Aur Khat • Season 1 • Episode {currentEpisode.num}
              </span>
              <h1 className="font-bebas text-3xl sm:text-4xl text-brand-ivory mt-2 tracking-wider">
                {currentEpisode.title}
              </h1>
              
              <p className="mt-2 font-space text-[0.7rem] text-brand-ivory/40 uppercase tracking-widest">
                2.1K Views • {likes.toLocaleString()} Likes • 120 Comments • 2024
              </p>

              <p className="mt-4 font-sans text-sm text-brand-ivory/70 leading-relaxed font-light">
                A story about two strangers who start writing letters that change their lives forever. 
                We provide the emotional layers, depth, and cinematic lighting that defines this universe.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-4 font-space text-[0.65rem] font-semibold uppercase tracking-widest">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 border rounded-full px-5 py-2.5 transition-all ${
                    isLiked 
                      ? "bg-brand-gold border-brand-gold text-brand-black" 
                      : "border-white/10 text-brand-ivory/70 hover:border-white/30 hover:text-brand-ivory"
                  }`}
                >
                  <svg className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                  Like
                </button>

                <button 
                  onClick={() => alert("Added to My List!")}
                  className="flex items-center gap-2 border border-white/10 hover:border-white/30 text-brand-ivory/70 hover:text-brand-ivory rounded-full px-5 py-2.5 transition-all"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  My List
                </button>

                <button 
                  onClick={() => alert("Link copied to clipboard!")}
                  className="flex items-center gap-2 border border-white/10 hover:border-white/30 text-brand-ivory/70 hover:text-brand-ivory rounded-full px-5 py-2.5 transition-all"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
                  </svg>
                  Share
                </button>

                <button 
                  onClick={() => alert("Mock downloading started...")}
                  className="flex items-center gap-2 border border-white/10 hover:border-white/30 text-brand-ivory/70 hover:text-brand-ivory rounded-full px-5 py-2.5 transition-all"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3" />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar: Episode Queue List */}
          <div className="glass-panel border border-white/10 rounded-2xl p-6 h-fit space-y-5">
            <h2 className="font-bebas text-2xl tracking-wider text-brand-ivory border-b border-brand-slate pb-3">
              Episodes (S1)
            </h2>
            
            <div className="space-y-3">
              {episodes.map((ep) => {
                const isActive = ep.id === currentEpisode.id;
                return (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setCurrentEpisode(ep);
                      setIsPlaying(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                      isActive 
                        ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold" 
                        : "bg-brand-graphite/40 border-white/5 text-brand-ivory/70 hover:border-white/10 hover:text-brand-ivory"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bebas text-lg leading-none text-brand-gold/80 min-w-[15px]">
                        {ep.num}
                      </span>
                      <div>
                        <h4 className="font-space text-xs font-semibold uppercase tracking-wider line-clamp-1">
                          {ep.title}
                        </h4>
                        <p className="font-sans text-[0.65rem] text-brand-ivory/40 mt-1">
                          Episode {ep.num}
                        </p>
                      </div>
                    </div>
                    <span className="font-space text-[0.65rem] text-brand-ivory/40">
                      {ep.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
