import Link from "next/link";

import { Container } from "@/components/ui/container";
import { navigationItems, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[rgba(10,8,7,0.68)] py-10">
      <Container className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.9fr]">
        <div>
          <p className="font-display text-4xl text-cream">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-cream/70">
            A Creative Universe Built On Stories.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-cream/55">Navigation</p>
          <nav className="flex flex-col gap-3">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-cream/75 transition-colors hover:text-cream">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-cream/55">Connect</p>
          <div className="space-y-3 text-sm text-cream/75">
            <p>
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-cream">
                Instagram: {siteConfig.instagramHandle}
              </a>
            </p>
            <p>
              <a href={siteConfig.youtube} target="_blank" rel="noreferrer" className="transition-colors hover:text-cream">
                YouTube: {siteConfig.youtubeHandle}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-cream">
                Email: {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
      </Container>

      <Container className="mt-10 border-t border-white/10 pt-6">
        <p className="text-sm text-cream/50">© 2026 The OldVerse. All Rights Reserved.</p>
      </Container>
    </footer>
  );
}
