import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Studio",
  description: "Creator dashboard and video studio at The OldVerse.",
  path: "/studio"
});

const stats = [
  { label: "Views", value: "3.2M", growth: "+12.5%" },
  { label: "Watch Time", value: "120K Hrs", growth: "+8.2%" },
  { label: "Followers", value: "48.2K", growth: "+15.7%" },
  { label: "Revenue", value: "₹48,750", growth: "+9.3%" }
];

const recentUploads = [
  {
    title: "Kirdar Aur Khat - Ep 2",
    date: "5 days ago",
    views: "2.1M Views",
    likes: "32K Likes"
  },
  {
    title: "Behind The Scenes - Nishaan",
    date: "2 weeks ago",
    views: "5.4K Views",
    likes: "612 Likes"
  },
  {
    title: "Nishaan - Part 1",
    date: "1 month ago",
    views: "32K Views",
    likes: "1.2K Likes"
  }
];

export default function StudioPage() {
  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-24 bg-brand-black min-h-screen">
      <Container>
        {/* Header */}
        <div className="border-b border-brand-slate pb-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-bebas text-3xl tracking-wider text-brand-ivory sm:text-4xl">
              Creator Dashboard
            </h1>
            <p className="mt-1 font-sans text-sm text-brand-ivory/60 font-light">
              Welcome back, Vivek! Here&apos;s how your channel is performing.
            </p>
          </div>
          <button className="self-start sm:self-auto font-space text-xs font-semibold uppercase tracking-wider bg-brand-gold text-brand-black px-5 py-3 rounded-lg hover:bg-brand-ivory transition-colors shadow-glow">
            Upload Video
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-5 grid-cols-2 lg:grid-cols-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-brand-graphite border border-white/5 rounded-2xl p-5 sm:p-6 shadow-md"
            >
              <p className="font-space text-xs text-brand-ivory/40 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="font-bebas text-3xl sm:text-4xl text-brand-ivory mt-2 tracking-wide">
                {stat.value}
              </p>
              <span className="inline-block mt-2 font-space text-[0.65rem] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                {stat.growth}
              </span>
            </div>
          ))}
        </div>

        {/* Dashboard Panels */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Upload Video Panel */}
          <div className="lg:col-span-2 glass-panel rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="font-bebas text-2xl tracking-wider text-brand-ivory mb-6">
              Video Details
            </h2>
            <form className="space-y-5">
              <label className="block space-y-2">
                <span className="font-space text-xs text-brand-ivory/60 uppercase tracking-widest">Title</span>
                <input
                  type="text"
                  placeholder="Enter video title"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-brand-ivory outline-none focus:border-brand-gold/40 focus:bg-white/10"
                />
              </label>

              <label className="block space-y-2">
                <span className="font-space text-xs text-brand-ivory/60 uppercase tracking-widest">Description</span>
                <textarea
                  rows={4}
                  placeholder="Tell viewers about your video"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-brand-ivory outline-none focus:border-brand-gold/40 focus:bg-white/10 resize-none"
                />
              </label>

              {/* Drag and Drop Box */}
              <div className="border border-dashed border-white/20 rounded-xl p-8 text-center bg-white/2">
                <svg className="h-10 w-10 text-brand-gold/75 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
                <p className="font-space text-xs font-semibold text-brand-ivory uppercase tracking-wider">
                  Drag & Drop video here
                </p>
                <p className="mt-1 text-[0.7rem] text-brand-ivory/40">
                  MP4, MOV or WebM • Max 10GB
                </p>
              </div>

              <div className="flex justify-end pt-3">
                <button className="font-space text-xs font-semibold uppercase tracking-wider bg-brand-gold text-brand-black px-6 py-3 rounded-lg hover:bg-brand-ivory transition-colors shadow-glow">
                  Publish Video
                </button>
              </div>
            </form>
          </div>

          {/* Recent Uploads List */}
          <div className="bg-brand-graphite border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="font-bebas text-2xl tracking-wider text-brand-ivory mb-6">
              Recent Uploads
            </h2>
            <div className="space-y-5">
              {recentUploads.map((video) => (
                <div key={video.title} className="border-b border-brand-slate pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-space text-sm font-semibold text-brand-ivory truncate">
                    {video.title}
                  </h3>
                  <div className="mt-1 flex items-center justify-between text-[0.7rem] text-brand-ivory/50">
                    <span>{video.date}</span>
                    <span className="text-brand-gold font-medium">{video.views}</span>
                  </div>
                  <p className="mt-0.5 text-[0.65rem] text-brand-ivory/40">
                    {video.likes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
