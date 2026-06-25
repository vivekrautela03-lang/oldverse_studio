import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Community",
  description: "Join the community and see behind-the-scenes moments at The OldVerse.",
  path: "/community"
});

const feedPosts = [
  {
    id: "post-1",
    author: "Shivanshi",
    role: "Co-Founder • Director",
    initials: "S",
    time: "2 hours ago",
    content: "Behind the scenes from our upcoming short film. The magic happens behind the camera! 🎬✨",
    img: "/frames/frame_0400.jpg",
    likes: 124,
    comments: 18
  },
  {
    id: "post-2",
    author: "Vivek Rautela",
    role: "Founder • Writer",
    initials: "VR",
    time: "1 day ago",
    content: "Writing a new script today. It's warm, quiet, and deeply personal. Can't wait to lock ourselves in the edit room and bring this story to life with Shivanshi.",
    img: null,
    likes: 245,
    comments: 42
  }
];

export default function CommunityPage() {
  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-24 bg-brand-black min-h-screen">
      <Container className="max-w-[700px]">
        {/* Page Header */}
        <div className="border-b border-brand-slate pb-4 mb-8">
          <h1 className="font-bebas text-3xl tracking-wider text-brand-ivory sm:text-4xl">
            Community Feed
          </h1>
          <p className="mt-1 font-sans text-sm text-brand-ivory/60 font-light">
            Behind the scenes, updates, and thoughts from the creators of The OldVerse.
          </p>
        </div>

        {/* Share box */}
        <div className="glass-panel rounded-2xl border border-white/10 p-5 mb-8">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-bold text-brand-gold">
              VR
            </div>
            <textarea
              className="flex-grow bg-transparent border-0 outline-none text-sm text-brand-ivory placeholder-brand-ivory/40 resize-none h-12 pt-2"
              placeholder="Share something with the community..."
            />
          </div>
          <div className="flex justify-end border-t border-brand-slate pt-3 mt-3">
            <button className="font-space text-xs font-semibold uppercase tracking-wider bg-brand-gold text-brand-black px-4 py-2 rounded-lg hover:bg-brand-ivory transition-colors">
              Post Update
            </button>
          </div>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-brand-graphite border border-white/5 rounded-2xl p-5 sm:p-6 shadow-lg"
            >
              {/* Post Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center font-semibold text-brand-gold">
                  {post.initials}
                </div>
                <div>
                  <h3 className="font-space text-sm font-semibold text-brand-ivory">
                    {post.author}
                  </h3>
                  <p className="text-[0.7rem] text-brand-ivory/50">
                    {post.role} • {post.time}
                  </p>
                </div>
              </div>

              {/* Content */}
              <p className="font-sans text-sm text-brand-ivory/80 leading-relaxed font-light mb-4">
                {post.content}
              </p>

              {/* Image attachment */}
              {post.img && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-black/20 mb-4">
                  <img
                    src={post.img}
                    alt="Behind the scenes"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex gap-6 border-t border-brand-slate pt-4 text-xs font-space text-brand-ivory/60">
                <button className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <span>{post.likes}</span>
                </button>
                
                <button className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>{post.comments} Comments</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
