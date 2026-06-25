import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Creators",
  description: "Explore the profiles of creators at The OldVerse.",
  path: "/creators"
});

const creatorShows = [
  {
    id: "kirdar-aur-khat",
    title: "Kirdar Aur Khat",
    img: "/frames/frame_0800.jpg",
    tag: "NEW EPISODES",
    genre: "Romance • Drama"
  },
  {
    id: "nishaan",
    title: "Nishaan",
    img: "/frames/frame_0100.jpg",
    tag: "PART 1",
    genre: "Thriller • Drama"
  },
  {
    id: "letters-never-sent",
    title: "Letters Never Sent",
    img: "/frames/frame_0500.jpg",
    tag: "POPULAR",
    genre: "Drama • Romance"
  },
  {
    id: "no-respawn",
    title: "No Respawn",
    img: "/frames/frame_0200.jpg",
    tag: "THRILLER",
    genre: "Action • Thriller"
  }
];

export default function CreatorsPage() {
  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-24 bg-brand-black min-h-screen">
      <Container>
        {/* Creator Profile Header */}
        <div className="glass-panel rounded-3xl border border-white/10 p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 mb-12">
          {/* Avatar */}
          <div className="h-28 w-28 rounded-full border-2 border-brand-gold bg-brand-gold/10 flex items-center justify-center text-3xl font-bold text-brand-gold shadow-lg">
            VR
          </div>
          
          {/* Bio & Details */}
          <div className="flex-grow text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h1 className="font-bebas text-4xl tracking-wider text-brand-ivory">
                Vivek Rautela
              </h1>
              <span className="font-space text-xs border border-brand-gold/40 text-brand-gold rounded-full px-3 py-1 self-center md:self-auto uppercase tracking-wider">
                Filmmaker
              </span>
            </div>
            
            <p className="mt-2 font-space text-xs text-brand-ivory/60 uppercase tracking-widest">
              @vivekrautela_ • Writer & Director
            </p>
            
            <p className="mt-4 font-sans text-sm text-brand-ivory/70 max-w-xl font-light">
              Vivek shapes the emotional and visual grammar of The OldVerse through narrative structure, 
              cinematic lighting, and character-first cinematography.
            </p>
          </div>

          {/* Stats & Actions */}
          <div className="flex flex-col items-center gap-4 min-w-[200px] border-t md:border-t-0 md:border-l border-brand-slate pt-6 md:pt-0 md:pl-8">
            <div className="flex gap-6 text-center">
              <div>
                <p className="font-bebas text-2xl text-brand-gold">12</p>
                <p className="font-space text-[0.65rem] text-brand-ivory/40 uppercase tracking-wider mt-0.5">Shows</p>
              </div>
              <div>
                <p className="font-bebas text-2xl text-brand-gold">48.2K</p>
                <p className="font-space text-[0.65rem] text-brand-ivory/40 uppercase tracking-wider mt-0.5">Followers</p>
              </div>
              <div>
                <p className="font-bebas text-2xl text-brand-gold">3.2M</p>
                <p className="font-space text-[0.65rem] text-brand-ivory/40 uppercase tracking-wider mt-0.5">Views</p>
              </div>
            </div>

            <button className="w-full font-space text-xs font-semibold uppercase tracking-wider bg-brand-gold text-brand-black rounded-lg py-2.5 hover:bg-brand-ivory transition-all shadow-glow">
              Follow
            </button>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-b border-brand-slate mb-8 gap-6 font-space text-sm overflow-x-auto pb-1">
          <span className="text-brand-gold border-b-2 border-brand-gold pb-3 font-semibold cursor-pointer">Shows</span>
          <span className="text-brand-ivory/60 hover:text-brand-ivory pb-3 cursor-pointer transition-colors">Videos</span>
          <span className="text-brand-ivory/60 hover:text-brand-ivory pb-3 cursor-pointer transition-colors">About</span>
          <span className="text-brand-ivory/60 hover:text-brand-ivory pb-3 cursor-pointer transition-colors">Community</span>
        </div>

        {/* Shows Grid */}
        <h2 className="font-bebas text-2xl tracking-wider text-brand-ivory mb-6">Popular Shows</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {creatorShows.map((show) => (
            <a
              key={show.id}
              href="/films"
              className="group block bg-brand-graphite border border-white/5 rounded-2xl p-3 hover:border-brand-gold/30 transition-all duration-300 shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black/10">
                <img
                  src={show.img}
                  alt={show.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2.5 top-2.5 bg-brand-gold/90 text-brand-black font-bold text-[0.55rem] tracking-wider uppercase px-2 py-0.5 rounded">
                  {show.tag}
                </span>
              </div>
              <div className="mt-4 px-1">
                <h3 className="font-space text-base font-semibold text-brand-ivory group-hover:text-brand-gold transition-colors">
                  {show.title}
                </h3>
                <p className="mt-1 text-xs text-brand-ivory/50">
                  {show.genre}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
